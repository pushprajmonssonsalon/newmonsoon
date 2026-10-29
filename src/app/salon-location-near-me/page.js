import Locations from "../../screens/locations/Locations";
import FaqSection from "../../components/FaqSection";
import { buildMetadata, jsonLd, pageSchema, breadcrumbSchema, faqSchema, itemListSchema, SITE_URL } from "../../lib/seo";
import { getSalons } from "../../lib/api";
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
      <FaqSection faqs={locationsFaqs} />
    </>
  );
}
