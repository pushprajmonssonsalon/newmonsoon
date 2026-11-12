// Shared data for the /salons/[city] pages and the salon detail pages.
import { cityOf, stateOf, areaOf } from "./cities";

// Same timings the Locations page already shows for every salon.
export const SALON_TIMINGS = "10:00 AM - 10:00 PM, all days";
export const OPENING_HOURS_SCHEMA = "Mo-Su 10:00-22:00";

// TODO: fill `price` (e.g. "₹499") with real starting prices. While null, the
// table shows "Contact the salon" - no prices are invented.
export const SERVICE_PRICES = [
  { service: "Haircut & styling", price: null },
  { service: "Hair colour", price: null },
  { service: "Hair spa & treatments", price: null },
  { service: "Facial & skin care", price: null },
  { service: "Manicure & pedicure", price: null },
  { service: "Makeup (party & bridal)", price: null },
];

export const salonDisplayName = (salon) =>
  !salon?.name || salon.name === "Monsoon" ? "Monsoon Salon" : `Monsoon Salon – ${salon.name}`;

export const salonPhone = (salon) => {
  const digits = String(salon?.phone || salon?.phoneNumber || salon?.contactNumber || "").replace(/\D/g, "");
  return digits.length >= 10 ? digits.slice(-10) : null;
};

export const salonAddress = (salon) => [salon?.address, salon?.address2].filter(Boolean).join(", ");

export const mapLink = (salon) =>
  salon?.latitude && salon?.longitude
    ? `https://www.google.com/maps?q=${salon.latitude},${salon.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salonAddress(salon))}`;

// ---- salon detail page SEO ------------------------------------------------

const GENERIC_NAME = /^monsoon( salon)?$/i;

// "Monsoon Salon {Area}, {City}" for every salon, made unique: when two salons would share a label
// (same area or no area) each gets its name, then its street, added so no two pages have the same title.
export function salonLabels(salons) {
  const place = (s) => [areaOf(s), cityOf(s)].filter(Boolean).join(", ");
  const groups = new Map();
  for (const s of salons || []) {
    const label = `Monsoon Salon ${place(s)}`.trim();
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(s);
  }
  const out = new Map();
  for (const [label, list] of groups) {
    if (list.length === 1) {
      out.set(list[0]._id, label);
      continue;
    }
    const used = new Set();
    list.forEach((s, i) => {
      const nm = s.name && !GENERIC_NAME.test(s.name.trim()) ? s.name.trim() : "";
      const street = (s.address || "").split(",")[0].trim();
      const withExtra = (x) => `Monsoon Salon ${x}, ${place(s)}`;
      const candidates = [nm && withExtra(nm), street && withExtra(street), nm && street && withExtra(`${nm}, ${street}`)];
      const pick = candidates.find((c) => c && !used.has(c)) || `${label} (${i + 1})`;
      used.add(pick);
      out.set(s._id, pick);
    });
  }
  return out;
}

const clip = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/[\s,.;:-]+\S*$/, "") + "…");

// Everything the salon page needs to be unique and server-rendered. `salons` = full list (for unique titles).
export function salonSeo(salon, salons = []) {
  const city = cityOf(salon);
  const state = stateOf(salon);
  const area = areaOf(salon);
  const pool = salons.some((s) => s._id === salon._id) ? salons : [...salons, salon];
  const label = salonLabels(pool).get(salon._id) || `Monsoon Salon ${city || ""}`.trim();
  const phone = salonPhone(salon);
  const address = salonAddress(salon).replace(/\s+/g, " ").trim();
  const tail = ` Open 10 AM - 10 PM daily.${phone ? ` Call +91 ${phone}.` : ""}`;
  const head = `${label}: `;
  const addr = clip(address, 160 - head.length - tail.length - 1);
  const description = `${head}${addr}${addr.endsWith("…") ? "" : "."}${tail}`;
  return {
    city,
    state,
    area,
    label,
    phone,
    address,
    title: `${label} | Address, Timings & Services`,
    description,
  };
}

export const cityFaqs = (city, count) => [
  {
    title: `Which is the best salon in ${city}?`,
    details: `Monsoon Salon has ${count} ${count === 1 ? "outlet" : "outlets"} in ${city}, offering hair, skin and beauty, makeup and nail services by trained artists. Open the outlet pages for addresses, timings and contact numbers.`,
  },
  {
    title: `What are the salon prices in ${city}?`,
    details: `Prices depend on the service and the outlet. Please call the Monsoon Salon outlet in ${city} for current prices and offers.`,
  },
  {
    title: `Where is the nearest Monsoon Salon in ${city}?`,
    details: `The outlet addresses, map links and phone numbers for ${city} are listed on this page. You can also use the Locations page to find the salon closest to you.`,
  },
];
