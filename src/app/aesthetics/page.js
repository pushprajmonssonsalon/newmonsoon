import Aesthetics from "../../screens/aesthetics";
import { buildMetadata, jsonLd, SITE_URL, pageSchema, breadcrumbSchema } from "../../lib/seo";
import { aestheticFaqs, aestheticServices } from "../../screens/aesthetics/data";

export const metadata = buildMetadata({
  title: "Aesthetics & Advanced Skin Treatments | Monsoon Salon",
  description:
    "Advanced aesthetic treatments at Monsoon Salon - laser hair reduction, HydraFacial, HIFU, skin rejuvenation and more.",
  path: "/aesthetics",
});

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: aestheticFaqs.map((f) => ({
      "@type": "Question",
      name: f.title,
      acceptedAnswer: { "@type": "Answer", text: f.details },
    })),
  };
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Monsoon Aesthetics Treatments",
    itemListElement: aestheticServices.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.category,
      url: `${SITE_URL}/aesthetics/${s.slug}`,
    })),
  };
  return (
    <>
      <script {...jsonLd(pageSchema({ type: "CollectionPage", name: "Aesthetics & Advanced Skin Treatments | Monsoon Salon", description: metadata.description, path: "/aesthetics" }))} />
      <script {...jsonLd(breadcrumbSchema([["Home", "/"], ["Aesthetics", "/aesthetics"]]))} />
      <script {...jsonLd(faqSchema)} />
      <script {...jsonLd(listSchema)} />
      <Aesthetics />
    </>
  );
}
