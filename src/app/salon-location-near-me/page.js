import Locations from "../../screens/locations/Locations";
import FaqSection from "../../components/FaqSection";
import { buildMetadata, jsonLd, pageSchema, breadcrumbSchema, faqSchema, itemListSchema, SITE_URL } from "../../lib/seo";
import Link from "next/link";
import { getSalons } from "../../lib/api";
import { groupByCity } from "../../lib/cities";
import { locationsFaqs } from "../../screens/faqData";

export const revalidate = 3600;

const title = "Monsoon Salon | Salon Franchise in Chennai, Noida, Pune & More";
const description =
  "Explore Monsoon Salon – cheap and best salon franchise in Chennai, plus salon franchises in Noida, Pune, Ahmedabad, Bangalore, Kolkata, Lucknow & more.";

export const metadata = buildMetadata({
  title,
  description,
  keywords:
    "monsoon salon near me, monsoon salon near you, monsoon salon locations, citywise monsoon salon, monsoon salon franchise locations",
  path: "/salon-location-near-me",
});

export default async function Page() {
  const salons = await getSalons();
  const cities = groupByCity(salons);
  const schemas = [
    pageSchema({ type: "CollectionPage", name: title, description, path: "/salon-location-near-me" }),
    breadcrumbSchema([["Home", "/"], ["Salon Locations", "/salon-location-near-me"]]),
    itemListSchema({
      name: "Monsoon Salon locations",
      items: salons.slice(0, 100).map((s) => ({
        name: `${s.name || "Monsoon Salon"} - ${s.stateName || ""}`.trim(),
        url: `${SITE_URL}/salon-location-near-me/${s._id}`,
      })),
    }),
    faqSchema(locationsFaqs),
  ];
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <Locations initialSalons={salons} />
      <section className="px-6 py-10 bg-white">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800 text-center mb-6">Browse Monsoon Salons by city</h2>
        <ul className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-[#8f7229] underline">
          {cities.map((c) => (
            <li key={c.slug}><Link href={`/salons/${c.slug}`}>{c.name}</Link></li>
          ))}
        </ul>
      </section>
      <FaqSection faqs={locationsFaqs} />
    </>
  );
}
