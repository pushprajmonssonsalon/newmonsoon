import { getSalons } from "../lib/api";
import { aestheticServices } from "../screens/aesthetics/data";
import { groupByCity } from "../lib/cities";

const SITE_URL = "https://monsoonsalon.com";

export const revalidate = 3600;

export default async function sitemap() {
  const now = new Date();
  const staticRoutes = [
    ["/", 1.0, "daily"],
    ["/salon-location-near-me", 0.9, "weekly"],
    ["/franchise-enquiry", 0.9, "weekly"],
    ["/aesthetics", 0.8, "weekly"],
    ["/franchise/cost", 0.8, "monthly"],
    ["/best-salon-franchise-in-india", 0.8, "monthly"],
    ["/affordable-salon-franchise", 0.8, "monthly"],
    ["/about-us", 0.7, "monthly"],
    ["/contact-us", 0.7, "monthly"],
    ["/gallery", 0.6, "monthly"],
    ["/media", 0.6, "monthly"],
    ["/privacypolicy", 0.3, "yearly"],
  ].map(([path, priority, changeFrequency]) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority }));

  const services = aestheticServices.map((s) => ({
    url: `${SITE_URL}/aesthetics/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const allSalons = await getSalons();

  const cities = groupByCity(allSalons).map((c) => ({
    url: `${SITE_URL}/salons/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const salons = allSalons
    .filter((s) => s?._id)
    .map((s) => ({ url: `${SITE_URL}/salon-location-near-me/${s._id}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 }));

  return [...staticRoutes, ...services, ...cities, ...salons];
}
