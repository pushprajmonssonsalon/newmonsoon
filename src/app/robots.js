const SITE_URL = "https://monsoonsalon.com";

// Search engines + AI search/answer crawlers are explicitly welcome.
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "cohere-ai",
];

export default function robots() {
  const common = { allow: "/", disallow: ["/thank-you"] };
  return {
    rules: [
      { userAgent: "*", ...common },
      ...aiBots.map((userAgent) => ({ userAgent, ...common })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
