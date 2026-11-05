// Derives a clean "city" for every salon. The API has no reliable city field
// (only `address2`, free text like "Pranami Mandir Road, Siliguri"), so we
// parse it and normalise spelling variants. Used by the /salons/[city] pages.

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Orissa", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Tamilnadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "West Bangal",
  "Jammu Kashmir", "Jammu and Kashmir", "Ladakh", "Chandigarh", "Puducherry", "Andaman and Nicobar",
  "Uttar Pradesh", "UP", "U P",
];

// Display fixes for inconsistent state spellings in the data.
const STATE_FIX = {
  tamilnadu: "Tamil Nadu",
  "west bangal": "West Bengal",
  "new delhi": "Delhi",
  "jammu kashmir": "Jammu & Kashmir",
  "jammu and kashmir": "Jammu & Kashmir",
  orissa: "Odisha",
};

// Spelling variants / sub-localities -> canonical city name.
const CITY_ALIAS = [
  ["bhubaneshwar", "Bhubaneswar"],
  ["bhubaneswar", "Bhubaneswar"],
  ["gurgaon", "Gurugram"],
  ["gurugram", "Gurugram"],
  ["new delhi", "Delhi"],
  ["delhi", "Delhi"],
  ["greater noida", "Greater Noida"],
  ["gaur city", "Greater Noida"],
  ["noida extension", "Greater Noida"],
  ["noida", "Noida"],
  ["tinsukhiya", "Tinsukia"],
  ["tinsukia", "Tinsukia"],
  ["karim nagar", "Karimnagar"],
  ["rae bareli", "Raebareli"],
  ["raebareli", "Raebareli"],
  ["bangalore", "Bengaluru"],
  ["bengaluru", "Bengaluru"],
  ["east mumbai", "Mumbai"],
  ["navi mumbai", "Navi Mumbai"],
  ["mumbai", "Mumbai"],
  ["ernakulam", "Kochi"],
  ["kochi", "Kochi"],
  ["prayagraj", "Prayagraj"],
  ["allahabad", "Prayagraj"],
  ["bareilly", "Bareilly"],
  ["guwahati", "Guwahati"],
  ["kolkata", "Kolkata"],
  ["gautam buddha nagar", "Noida"],
  ["sector c", "Chandigarh"],
  ["bhojpur arrah", "Arrah"],
  ["arrah", "Arrah"],
];

// State fixes where the salon record has the wrong state for its city.
const CITY_STATE = { Kochi: "Kerala" };

const STOP = new Set(["india", "dk district", "district", "ward", "road"]);

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const stateRe = new RegExp(`\\b(${STATES.map(escapeRe).join("|")})\\b`, "gi");

const title = (s) =>
  s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function cleanPart(part) {
  return part
    .replace(/\(.*?\)/g, " ")
    .replace(/[\d\-–?.]+/g, " ")
    .replace(stateRe, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function cityOf(salon) {
  const parts = (salon?.address2 || "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  for (let i = parts.length - 1; i >= 0; i--) {
    const cleaned = cleanPart(parts[i]);
    if (!cleaned || STOP.has(cleaned.toLowerCase())) continue;
    const lower = cleaned.toLowerCase();
    const alias = CITY_ALIAS.find(([k]) => lower === k || lower.startsWith(k + " "));
    return alias ? alias[1] : title(cleaned);
  }
  return null;
}

export function stateOf(salon) {
  const raw = (salon?.stateName || "").trim();
  return STATE_FIX[raw.toLowerCase()] || raw;
}

// -> [{ slug, name, state, salons: [...] }] sorted by salon count (desc) then name
export function groupByCity(salons) {
  const map = new Map();
  for (const s of salons) {
    if (s?.active === false) continue;
    const name = cityOf(s);
    if (!name) continue;
    const slug = slugify(name);
    if (!slug) continue;
    if (!map.has(slug)) map.set(slug, { slug, name, state: CITY_STATE[name] || stateOf(s), salons: [] });
    map.get(slug).salons.push(s);
  }
  return [...map.values()].sort((a, b) => b.salons.length - a.salons.length || a.name.localeCompare(b.name));
}
