import LandingPage, { DataTable, SectionTitle } from "../../../components/landing/LandingPage";
import { buildMetadata, jsonLd, pageSchema, breadcrumbSchema, faqSchema, SITE_URL } from "../../../lib/seo";
import { INVESTMENT_BAND, MODELS, INCLUDED, costFaqs } from "../../../lib/franchiseData";

const title = "Monsoon Salon Franchise Cost in India (2026)";
const description = `Monsoon Salon franchise investment ranges from ${INVESTMENT_BAND}, depending on the salon model, size and city. See the models and what is included.`;
const path = "/franchise/cost";

export const metadata = buildMetadata({
  title,
  description,
  keywords: "salon franchise cost, monsoon salon franchise cost, salon franchise investment india",
  path,
});

export default function Page() {
  const schemas = [
    pageSchema({ type: "WebPage", name: title, description, path }),
    breadcrumbSchema([["Home", "/"], ["Franchise", "/franchise-enquiry"], ["Franchise Cost", path]]),
    faqSchema(costFaqs),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Salon Franchise",
      serviceType: "Salon franchise opportunity",
      description,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "India" },
      url: `${SITE_URL}${path}`,
    },
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <LandingPage
        breadcrumbs={[["Home", "/"], ["Franchise", "/franchise-enquiry"], ["Franchise Cost", path]]}
        h1="Monsoon Salon Franchise Cost in India (2026)"
        answer={`Investment ranges from ${INVESTMENT_BAND}, depending on the salon model, size and city. The franchise team shares exact figures for your location after you enquire.`}
        table={
          <DataTable
            columns={["Model", "Investment band", "Area"]}
            rows={MODELS.map((m) => [m.model, m.band, m.area])}
          />
        }
        faqs={costFaqs}
        ctaLabel="Get Detailed Costing →"
      >
        <div>
          <SectionTitle>What&apos;s included</SectionTitle>
          <ul className="grid sm:grid-cols-2 gap-4">
            {INCLUDED.map(([name, text]) => (
              <li key={name} className="bg-[#FFF5EB] rounded-2xl p-5">
                <h3 className="font-semibold text-neutral-800">{name}</h3>
                <p className="text-neutral-600 mt-1">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </LandingPage>
    </>
  );
}
