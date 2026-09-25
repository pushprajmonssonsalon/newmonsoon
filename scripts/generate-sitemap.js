const fs = require("fs");
const path = require("path");
const axios = require("axios");

const BASE_URL = "https://www.monsoonsalon.com/api/";
const SITE_URL = "https://monsoonsalon.com";
const OUTPUT_PATH = path.join(__dirname, "..", "public", "sitemap.xml");

const STATIC_ROUTES = [
  { loc: "/", priority: "1.0" },
  { loc: "/salon-location-near-me", priority: "0.9" },
  { loc: "/franchise-enquiry", priority: "0.9" },
  { loc: "/about-us", priority: "0.8" },
  { loc: "/contact-us", priority: "0.7" },
  { loc: "/gallery", priority: "0.6" },
  { loc: "/media", priority: "0.6" },
  { loc: "/privacypolicy", priority: "0.3" },
];

function buildUrlEntry(loc, priority, lastmod) {
  return `  <url>\n  <loc>${SITE_URL}${loc}</loc>\n  <lastmod>${lastmod}</lastmod>\n  <priority>${priority}</priority>\n  </url>\n`;
}

async function run() {
  console.log("Generating sitemap.xml...\n");

  const now = new Date().toISOString();
  let salons = [];

  try {
    const instance = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
      headers: { "X-Custom-Header": "foobar", "Content-Type": "application/json" },
    });
    const res = await instance.get("salons");
    salons = res?.data?.data || [];
    console.log(`Fetched ${salons.length} salon locations from API.`);
  } catch (err) {
    console.error("Failed to fetch salon list, aborting (keeping existing sitemap.xml untouched):", err.message);
    process.exit(1);
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const route of STATIC_ROUTES) {
    xml += buildUrlEntry(route.loc, route.priority, now);
  }

  for (const salon of salons) {
    if (!salon?._id) continue;
    xml += buildUrlEntry(`/salon-location-near-me/${salon._id}`, "0.6", now);
  }

  xml += "  </urlset>";

  fs.writeFileSync(OUTPUT_PATH, xml);
  console.log(`\nWrote ${STATIC_ROUTES.length + salons.length} URLs to ${OUTPUT_PATH}`);
}

run();
