export default function robots() {
  const bots = ["OAI-SearchBot", "Bingbot", "GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended"];
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...bots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://monsoonsalon.com/sitemap.xml",
  };
}
