// Pre-compiles every route of a running `next dev` so the first real visit isn't slow.
// Usage: start `npm run dev` in one terminal, then `npm run dev:warm` in another.
const base = process.env.WARM_URL || "http://localhost:3000";
const routes = [
  "/",
  "/about-us",
  "/contact-us",
  "/franchise-enquiry",
  "/gallery",
  "/media",
  "/privacypolicy",
  "/salon-location-near-me",
  "/thank-you",
  "/aesthetics",
  "/aesthetics/laser-hair-reduction",
];

(async () => {
  for (const r of routes) {
    const t = Date.now();
    try {
      const res = await fetch(base + r);
      console.log(`${res.status} ${r} ${Date.now() - t}ms`);
    } catch (e) {
      console.log(`ERR ${r} ${e.message}`);
    }
  }
})();
