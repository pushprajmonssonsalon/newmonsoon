#!/usr/bin/env node
/**
 * AI visibility check: asks ChatGPT (web search), Claude (web search) and Perplexity
 * the buying questions we want Monsoon Salon to show up for, and appends one CSV row
 * per (provider, prompt) to ai-visibility.csv:
 *
 *   date, provider, model, prompt, monsoon_mentioned, position, cited_urls, note
 *
 * Usage:
 *   npm run ai-check
 *   npm run ai-check -- --providers=openai,perplexity
 *   npm run ai-check -- --prompt="best salon in Delhi"
 *
 * Keys (put them in .env.local - .env is tracked in git):
 *   OPENAI_API_KEY, ANTHROPIC_API_KEY, PERPLEXITY_API_KEY
 * Optional model overrides: OPENAI_MODEL, ANTHROPIC_MODEL, PERPLEXITY_MODEL
 */
const fs = require("fs");
const path = require("path");

for (const file of [".env.local", ".env"]) {
  const full = path.join(__dirname, "..", file);
  if (fs.existsSync(full)) {
    try {
      process.loadEnvFile(full); // Node >= 20.12; does not override variables already set
    } catch {
      /* ignore unreadable env file */
    }
  }
}

const PROMPTS = [
  "best salon franchise in India",
  "affordable salon franchise in India",
  "low investment salon franchise India",
  "best salon in Delhi",
  "best salon chain in India",
];

const BRAND = /monsoon/i;
const OUT_FILE = path.join(__dirname, "..", "ai-visibility.csv");
const HEADER = ["date", "provider", "model", "prompt", "monsoon_mentioned", "position", "cited_urls", "note"];
const TIMEOUT_MS = 180000;

// ---------------------------------------------------------------- helpers

const csvCell = (v) => {
  const s = v == null ? "" : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const cleanUrl = (u) => {
  try {
    const url = new URL(u);
    ["utm_source", "utm_medium", "utm_campaign"].forEach((k) => url.searchParams.delete(k));
    return url.toString();
  } catch {
    return u;
  }
};

const uniq = (arr) => [...new Set(arr.filter(Boolean).map(cleanUrl))];

/**
 * Position of the first list item that mentions Monsoon (1-based), or "" if the answer
 * mentions Monsoon outside any list / does not mention it at all.
 * List items = numbered lines ("1." / "1)"), bullets, or numbered headings ("### 1. Name").
 */
function monsoonPosition(text) {
  const lines = String(text || "").split(/\r?\n/);
  const itemRe = /^\s{0,3}(?:#{2,4}\s*)?(?:\d+[.)]|[-*•])\s+/;
  const numberedRe = /^\s{0,3}(?:#{2,4}\s*)?\d+[.)]\s+/;
  const hasNumbered = lines.some((l) => numberedRe.test(l));
  const re = hasNumbered ? numberedRe : itemRe;

  let n = 0;
  let found = "";
  let current = -1;
  const blocks = []; // item text blocks (an item and its continuation lines)
  for (const line of lines) {
    if (re.test(line)) {
      n += 1;
      current = blocks.push(line) - 1;
    } else if (current >= 0 && line.trim() && !/^\s{0,3}#{1,6}\s/.test(line)) {
      blocks[current] += " " + line;
    } else if (!line.trim()) {
      // blank line keeps the current block open (answers often put detail below a heading)
    } else {
      current = -1;
    }
  }
  const idx = blocks.findIndex((b) => BRAND.test(b));
  if (idx >= 0) found = idx + 1;
  return found;
}

async function postJson(url, headers, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    const msg = json?.error?.message || json?.detail || json?.raw || res.statusText;
    const err = new Error(`HTTP ${res.status}: ${String(msg).slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }
  return json;
}

// ---------------------------------------------------------------- providers

async function askOpenAI(prompt) {
  const model = process.env.OPENAI_MODEL || "gpt-4.1";
  const headers = { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` };
  const call = (toolType) =>
    postJson("https://api.openai.com/v1/responses", headers, {
      model,
      input: prompt,
      tools: [{ type: toolType }],
    });

  let data;
  try {
    data = await call("web_search");
  } catch (e) {
    if (e.status === 400) data = await call("web_search_preview"); // older tool name
    else throw e;
  }
  return parseOpenAI(data, model);
}

function parseOpenAI(data, fallbackModel) {
  let text = "";
  const urls = [];
  for (const item of data.output || []) {
    if (item.type !== "message") continue;
    for (const part of item.content || []) {
      if (part.type === "output_text") {
        text += part.text + "\n";
        for (const a of part.annotations || []) if (a.type === "url_citation") urls.push(a.url);
      }
    }
  }
  return { model: data.model || fallbackModel, text, urls: uniq(urls) };
}

async function askAnthropic(prompt) {
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
  const headers = { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" };
  const messages = [{ role: "user", content: prompt }];
  const blocks = [];
  let usedModel = model;

  for (let turn = 0; turn < 4; turn++) {
    const data = await postJson("https://api.anthropic.com/v1/messages", headers, {
      model,
      max_tokens: 4096,
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }],
      messages,
    });
    usedModel = data.model || model;
    blocks.push(...(data.content || []));
    if (data.stop_reason !== "pause_turn") break;
    messages.push({ role: "assistant", content: data.content }); // let the server tool continue
  }
  return parseAnthropic(blocks, usedModel);
}

function parseAnthropic(blocks, model) {
  let text = "";
  const cited = [];
  const searched = [];
  for (const b of blocks) {
    if (b.type === "text") {
      text += b.text;
      for (const c of b.citations || []) if (c.url) cited.push(c.url);
    } else if (b.type === "web_search_tool_result" && Array.isArray(b.content)) {
      for (const r of b.content) if (r.url) searched.push(r.url);
    }
  }
  // Prefer URLs the answer actually cites; fall back to pages the search returned.
  return { model, text, urls: uniq(cited.length ? cited : searched) };
}

async function askPerplexity(prompt) {
  const model = process.env.PERPLEXITY_MODEL || "sonar";
  const data = await postJson(
    "https://api.perplexity.ai/chat/completions",
    { Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}` },
    { model, messages: [{ role: "user", content: prompt }] }
  );
  return parsePerplexity(data, model);
}

function parsePerplexity(data, fallbackModel) {
  const text = data.choices?.[0]?.message?.content || "";
  const urls = [...(data.citations || []), ...(data.search_results || []).map((r) => r.url)];
  return { model: data.model || fallbackModel, text, urls: uniq(urls) };
}

const PROVIDERS = {
  openai: { key: "OPENAI_API_KEY", ask: askOpenAI },
  anthropic: { key: "ANTHROPIC_API_KEY", ask: askAnthropic },
  perplexity: { key: "PERPLEXITY_API_KEY", ask: askPerplexity },
};

// ---------------------------------------------------------------- main

function parseArgs(argv) {
  const args = {};
  for (const a of argv) {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) args[m[1]] = m[2];
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const wanted = (args.providers ? args.providers.split(",") : Object.keys(PROVIDERS)).map((s) => s.trim());
  const prompts = args.prompt ? [args.prompt] : PROMPTS;

  const active = wanted.filter((name) => {
    const p = PROVIDERS[name];
    if (!p) {
      console.warn(`Unknown provider "${name}" - skipped`);
      return false;
    }
    if (!process.env[p.key]) {
      console.warn(`${p.key} not set - skipping ${name}`);
      return false;
    }
    return true;
  });
  if (!active.length) {
    console.error("No API keys found. Add OPENAI_API_KEY / ANTHROPIC_API_KEY / PERPLEXITY_API_KEY to .env.local");
    process.exit(1);
  }

  if (!fs.existsSync(OUT_FILE) || fs.statSync(OUT_FILE).size === 0) {
    fs.writeFileSync(OUT_FILE, HEADER.join(",") + "\n");
  }

  const date = new Date().toISOString();
  let rows = 0;
  let hits = 0;

  for (const prompt of prompts) {
    for (const name of active) {
      let row;
      try {
        const { model, text, urls } = await PROVIDERS[name].ask(prompt);
        const mentioned = BRAND.test(text);
        const position = mentioned ? monsoonPosition(text) : "";
        if (mentioned) hits += 1;
        row = [date, name, model, prompt, mentioned ? "yes" : "no", position, urls.join(" | "), ""];
        console.log(`${name.padEnd(10)} | ${prompt} | monsoon=${mentioned ? "yes" : "no"} pos=${position || "-"} urls=${urls.length}`);
      } catch (e) {
        row = [date, name, "", prompt, "", "", "", `error: ${e.message}`];
        console.error(`${name.padEnd(10)} | ${prompt} | ERROR ${e.message}`);
      }
      fs.appendFileSync(OUT_FILE, row.map(csvCell).join(",") + "\n");
      rows += 1;
    }
  }
  console.log(`\nDone: ${rows} rows appended to ${path.relative(process.cwd(), OUT_FILE)} (Monsoon mentioned in ${hits}).`);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = { monsoonPosition, parseOpenAI, parseAnthropic, parsePerplexity, csvCell };
