#!/usr/bin/env node
/**
 * IndexNow: tells Bing, Yandex and other IndexNow search engines which URLs exist / changed.
 * Reads the live sitemap.xml and POSTs every URL to https://api.indexnow.org/indexnow.
 *
 * Run it AFTER a deploy (the key file and sitemap must already be live on the site):
 *   npm run indexnow
 *   npm run indexnow -- --dry-run          (list what would be sent, send nothing)
 *   npm run indexnow -- --sitemap=http://127.0.0.1:3000/sitemap.xml   (read from another place)
 *
 * The key file is public/<KEY>.txt (served at https://www.monsoonsalon.com/<KEY>.txt) and must contain
 * only the key. To rotate the key: change KEY here and rename/rewrite that file.
 */
const HOST = "www.monsoonsalon.com";
const KEY = "ec9054143534178c17a38449baf9c45c";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const DEFAULT_SITEMAP = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH = 10000; // IndexNow limit per request

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const sitemapUrl = (args.find((a) => a.startsWith("--sitemap=")) || "").split("=")[1] || DEFAULT_SITEMAP;

async function main() {
  const res = await fetch(sitemapUrl);
  if (!res.ok) throw new Error(`Could not read ${sitemapUrl}: HTTP ${res.status}`);
  const xml = await res.text();

  const urls = [...new Set([...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, "&")))];
  // IndexNow only accepts URLs on the declared host.
  const valid = urls.filter((u) => {
    try {
      return new URL(u).host === HOST;
    } catch {
      return false;
    }
  });
  if (valid.length !== urls.length) console.warn(`Skipped ${urls.length - valid.length} URL(s) not on ${HOST}`);
  if (!valid.length) throw new Error("No URLs found in the sitemap.");

  console.log(`${valid.length} URL(s) from ${sitemapUrl}`);
  if (dryRun) {
    valid.slice(0, 10).forEach((u) => console.log("  " + u));
    if (valid.length > 10) console.log(`  ... and ${valid.length - 10} more`);
    console.log("Dry run: nothing was sent.");
    return;
  }

  // Confirm the key file is live, otherwise IndexNow answers 403.
  const keyRes = await fetch(KEY_LOCATION);
  const keyBody = keyRes.ok ? (await keyRes.text()).trim() : "";
  if (keyBody !== KEY) throw new Error(`Key file is not live at ${KEY_LOCATION} (HTTP ${keyRes.status}). Deploy first.`);

  let failed = false;
  for (let i = 0; i < valid.length; i += BATCH) {
    const urlList = valid.slice(i, i + BATCH);
    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
    });
    // 200 = received, 202 = received (key validation pending). Anything else is a problem.
    if (r.status === 200 || r.status === 202) {
      console.log(`Submitted ${urlList.length} URL(s): HTTP ${r.status}`);
    } else {
      failed = true;
      console.error(`Batch failed: HTTP ${r.status} ${await r.text().catch(() => "")}`);
    }
  }
  if (failed) process.exit(1);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
