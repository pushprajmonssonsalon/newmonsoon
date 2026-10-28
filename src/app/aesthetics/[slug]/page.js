import { notFound } from "next/navigation";
import AestheticDetail from "../../../screens/aesthetics/AestheticDetail";
import { buildMetadata, jsonLd, SITE_URL } from "../../../lib/seo";
import { aestheticFaqs, aestheticServices } from "../../../screens/aesthetics/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return aestheticServices.map((s) => ({ slug: s.slug }));
}

const findService = (slug) => aestheticServices.find((s) => s.slug === slug);

export function generateMetadata({ params }) {
  const service = findService(params.slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.machine.replace(/^\d+\.\s*/, "")} - ${service.category} | Monsoon Aesthetics`,
    description: service.description,
    path: `/aesthetics/${service.slug}`,
  });
}

export default function Page({ params }) {
  const service = findService(params.slug);
  if (!service) notFound();

  const faqs = service.faqs.length > 0 ? service.faqs : aestheticFaqs;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.machine.replace(/^\d+\.\s*/, ""),
      serviceType: service.category,
      description: service.description,
      provider: { "@type": "Organization", name: "Monsoon Salon", url: SITE_URL },
      areaServed: { "@type": "Country", name: "India" },
      url: `${SITE_URL}/aesthetics/${service.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Aesthetics", item: `${SITE_URL}/aesthetics` },
        { "@type": "ListItem", position: 3, name: service.category, item: `${SITE_URL}/aesthetics/${service.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.title,
        acceptedAnswer: { "@type": "Answer", text: f.details },
      })),
    },
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <AestheticDetail />
    </>
  );
}
