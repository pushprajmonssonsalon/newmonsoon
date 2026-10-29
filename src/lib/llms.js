import { SITE_URL, ORG } from "./seo";
import { getSalons } from "./api";
import { aestheticServices, aestheticFaqs } from "../screens/aesthetics/data";
import { homeFaqs, franchiseFaqs } from "../screens/faqData";
import { groupByCity } from "./cities";
import { INVESTMENT_BAND, LAST_UPDATED, costFaqs, bestFaqs, affordableFaqs } from "./franchiseData";

const pages = [
  ["Home", "/", "Overview of Monsoon Salon, India's leading unisex salon franchise chain."],
  ["Franchise enquiry", "/franchise-enquiry", "Salon franchise models (Monsoon, Monsoon Pro, Smart Salon), benefits and the franchise enquiry form."],
  ["Franchise cost", "/franchise/cost", `Salon franchise investment: ${INVESTMENT_BAND}, by model. Last updated ${LAST_UPDATED}.`],
  ["Best salon franchise in India", "/best-salon-franchise-in-india", "How to choose a salon franchise in India and why Monsoon Salon is a strong option."],
  ["Affordable salon franchise", "/affordable-salon-franchise", `Low investment salon franchise models starting from ${INVESTMENT_BAND.split(" to ")[0]}.`],
  ["Aesthetics", "/aesthetics", "Advanced aesthetic and skin treatments: laser hair reduction, HydraFacial, HIFU, RF and more."],
  ["Salon locations", "/salon-location-near-me", "Find a Monsoon Salon near you across India."],
  ["About us", "/about-us", "About the Monsoon Salon brand, its mission and growth plan."],
  ["Contact us", "/contact-us", "Phone, email and head-office address."],
  ["Gallery", "/gallery", "Photos of Monsoon salons and work."],
  ["Media", "/media", "Media coverage and Instagram reels."],
  ["Privacy policy", "/privacypolicy", "How personal information is collected and used."],
];

const qa = (list) => list.map((f) => `**${f.title}**\n${f.details}`).join("\n\n");

export async function buildLlmsTxt() {
  return [
    `# ${ORG.name}`,
    "",
    `> Monsoon Salon, run by ${ORG.legalName}, is a unisex salon and spa chain and salon-franchise brand in India with hair, beauty, makeup, nail and aesthetic services.`,
    "",
    "## Key pages",
    ...pages.map(([name, path, desc]) => `- [${name}](${SITE_URL}${path}): ${desc}`),
    "",
    "## Aesthetic treatments",
    ...aestheticServices.map((s) => `- [${s.machine.replace(/^\d+\.\s*/, "")} - ${s.category}](${SITE_URL}/aesthetics/${s.slug}): ${s.description}`),
    "",
    "## Contact",
    `- Phone: ${ORG.phone}`,
    `- Email: ${ORG.email}`,
    `- Address: ${ORG.address.streetAddress}, ${ORG.address.addressLocality}, ${ORG.address.addressRegion} ${ORG.address.postalCode}, India`,
    "",
    "## Optional",
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    `- [Full details for LLMs](${SITE_URL}/llms-full.txt)`,
    "",
  ].join("\n");
}

export async function buildLlmsFull() {
  const salons = await getSalons();
  const byState = {};
  salons.forEach((s) => {
    const st = s.stateName || "Other";
    (byState[st] = byState[st] || []).push(s);
  });
  return [
    await buildLlmsTxt(),
    "# Franchise FAQs",
    "",
    qa(franchiseFaqs),
    "",
    "# Franchise cost FAQs",
    "",
    qa(costFaqs),
    "",
    "# Best salon franchise FAQs",
    "",
    qa(bestFaqs),
    "",
    "# Affordable salon franchise FAQs",
    "",
    qa(affordableFaqs),
    "",
    "# General FAQs",
    "",
    qa(homeFaqs),
    "",
    "# Aesthetics FAQs",
    "",
    qa(aestheticFaqs),
    "",
    `# Salons by city (${groupByCity(salons).length} cities)`,
    "",
    ...groupByCity(salons).map((c) => `- [${c.name}, ${c.state} (${c.salons.length})](${SITE_URL}/salons/${c.slug})`),
    "",
    `# Salon locations (${salons.length})`,
    "",
    ...Object.keys(byState)
      .sort()
      .map((st) => `## ${st}\n` + byState[st].map((s) => `- [${s.name || "Monsoon Salon"}${s.address2 ? " - " + s.address2 : ""}](${SITE_URL}/salon-location-near-me/${s._id})`).join("\n")),
    "",
  ].join("\n");
}
