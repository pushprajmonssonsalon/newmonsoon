import { NextResponse } from "next/server";
import { groupByCity } from "./lib/cities";
import { SHOW_AESTHETICS } from "./lib/features";
import { SITE_URL } from "./lib/seo";

// Legacy (old WordPress site) URLs -> current pages, one 301 hop each, with or without a trailing slash.
//   /best-salon-in-{city}/  /best-salon-in-{city}-monsoon-salon-{city}/  /monsoon-salon-{city}/
//        -> /salons/{city}   (or /salon-location-near-me when that city has no page)
//   /eshop/*     -> https://theprofessionalworld.com/
//   /services/*  -> closest Aesthetics page, otherwise /
// Next's own trailing-slash redirect is off (skipTrailingSlashRedirect in next.config.js) so this
// file is the only thing that decides where a URL with a trailing slash goes.

const API_SALONS = "https://www.monsoonsalon.com/api/salons";
const FALLBACK = "/salon-location-near-me";
const ESHOP = "https://theprofessionalworld.com/";

// Old / misspelt city names -> the slug used by /salons/[city] (src/lib/cities.js).
const CITY_ALIASES = {
  dharbhanga: "darbhanga",
  bhubaneshwar: "bhubaneswar",
  bhubaneshwer: "bhubaneswar",
  gurgaon: "gurugram",
  "new-delhi": "delhi",
  bangalore: "bengaluru",
  bangaluru: "bengaluru",
  "rae-bareli": "raebareli",
  "rai-bareli": "raebareli",
  tinsukhiya: "tinsukia",
  "karim-nagar": "karimnagar",
  ernakulam: "kochi",
  cochin: "kochi",
  allahabad: "prayagraj",
  mangaluru: "mangalore",
  rajahmundry: "rajamahendravaram",
  baroda: "vadodara",
  calcutta: "kolkata",
  bombay: "mumbai",
  madras: "chennai",
  poona: "pune",
  "east-mumbai": "mumbai",
  "gautam-buddha-nagar": "noida",
  "noida-extension": "greater-noida",
  "gaur-city": "greater-noida",
  "bhojpur-arrah": "arrah",
  "jammu-kashmir": "jammu",
};

// /services/* keyword -> Aesthetics page (first match wins). Anything else (hair, nails, bridal, makeup...) -> home.
const SERVICE_RULES = [
  [/laser.*hair|hair.*(laser|reduction|removal)/, "laser-hair-reduction"],
  [/laser|pigment|tattoo|mole|acne-scar/, "laser-skin-treatments"],
  [/hifu|lifting|lift/, "non-surgical-skin-lifting"],
  [/tighten|firming/, "skin-tightening-and-firming"],
  [/rejuvenat|anti-?ag|wrinkle|rf-|radio-?frequency/, "skin-rejuvenation-and-tightening"],
  [/facial|hydra|cleanup|clean-up|skin-?care|skin-?polish/, "advanced-facial-treatments"],
  [/body|fat|slim|sculpt|weight/, "body-sculpting-and-fat-reduction"],
  [/skin-?analysis|assessment/, "skin-analysis-and-assessment"],
];

// Probe / scanner paths that must answer a real 404 straight away (no redirect first).
const PROBE = /^\/(cgi-bin|wp-admin|wp-content|wp-includes|wp-json)(\/|$)/i;

// Salon city slugs, cached for an hour (only legacy city URLs ever trigger the fetch).
let cache = { at: 0, slugs: null };
async function citySlugs() {
  if (cache.slugs && Date.now() - cache.at < 3600 * 1000) return cache.slugs;
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 4000);
    const res = await fetch(API_SALONS, { signal: ctl.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const salons = (await res.json())?.data;
    if (!Array.isArray(salons) || !salons.length) throw new Error("empty");
    cache = { at: Date.now(), slugs: new Set(groupByCity(salons).map((c) => c.slug)) };
    return cache.slugs;
  } catch {
    return cache.slugs; // stale copy if we have one, else null -> fallback page
  }
}

function resolveCity(raw, slugs) {
  if (!slugs) return null;
  const tokens = raw.split("-").filter(Boolean);
  // longest leading part wins: "patna-bihar" -> patna, "greater-noida" -> greater-noida
  for (let k = tokens.length; k >= 1; k--) {
    const cand = tokens.slice(0, k).join("-");
    const slug = CITY_ALIASES[cand] || cand;
    if (slugs.has(slug)) return slug;
  }
  return null;
}

// Next only accepts an absolute Location here; internal targets go to the canonical www host.
const go = (location, status = 301) =>
  new NextResponse(null, { status, headers: { Location: location.startsWith("/") ? `${SITE_URL}${location}` : location } });

export async function middleware(req) {
  const { pathname, search } = req.nextUrl;
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname; // no trailing slash
  const lower = path.toLowerCase();

  if (PROBE.test(pathname)) {
    return NextResponse.rewrite(new URL("/__not-found__", req.url));
  }

  if (lower === "/eshop" || lower.startsWith("/eshop/")) return go(ESHOP);

  const cityMatch = lower.match(/^\/(?:best-salon-in|monsoon-salon)-(.+)$/);
  if (cityMatch) {
    let raw = cityMatch[1].split("-monsoon-salon-")[0];
    try {
      raw = decodeURIComponent(raw);
    } catch {}
    raw = raw.replace(/[^a-z0-9-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    const slug = resolveCity(raw, await citySlugs());
    return go(slug ? `/salons/${slug}` : FALLBACK);
  }

  if (lower === "/services" || lower.startsWith("/services/")) {
    const rule = SHOW_AESTHETICS ? SERVICE_RULES.find(([re]) => re.test(lower.slice("/services".length))) : null;
    return go(rule ? `/aesthetics/${rule[1]}` : "/");
  }

  // Everything else: keep Next's old behaviour of dropping a trailing slash (308), without a chain.
  if (pathname.length > 1 && pathname.endsWith("/")) return go(path + search, 308);

  return NextResponse.next();
}

export const config = {
  // Skip Next internals, /api and files with an extension (images, sitemap.xml, robots.txt ...).
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]{2,5}$).*)"],
};
