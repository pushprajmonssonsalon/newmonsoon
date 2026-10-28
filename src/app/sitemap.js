import { getSalons } from "../lib/api";
import { aestheticServices } from "../screens/aesthetics/data";

const SITE_URL = "https://monsoonsalon.com";

export const revalidate = 3600;

export default async function sitemap() {
  const now = new Date();
  const staticRoutes = [
    ["/", 1.0],
    ["/salon-location-near-me", 0.9],
    ["/franchise-enquiry", 0.9],
    ["/aesthetics", 0.8],
    ["/about-us", 0.8],
    ["/contact-us", 0.7],
    ["/gallery", 0.6],
    ["/media", 0.6],
    ["/privacypolicy", 0.3],
  ].map(([path, priority]) => ({ url: `${SITE_URL}${path}`, lastModified: now, priority }));

  const services = aestheticServices.map((s) => ({
    url: `${SITE_URL}/aesthetics/${s.slug}`,
    lastModified: now,
    priority: 0.7,
  }));

  const salons = (await getSalons())
    .filter((s) => s?._id)
    .map((s) => ({ url: `${SITE_URL}/salon-location-near-me/${s._id}`, lastModified: now, priority: 0.6 }));

  return [...staticRoutes, ...services, ...salons];
}
