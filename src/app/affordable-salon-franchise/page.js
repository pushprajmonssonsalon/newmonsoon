import LandingPage, { DataTable, SectionTitle } from "../../components/landing/LandingPage";
import { buildMetadata, jsonLd, pageSchema, breadcrumbSchema, faqSchema } from "../../lib/seo";
import { INVESTMENT_BAND, MODELS, INCLUDED, affordableFaqs } from "../../lib/franchiseData";

const title = "Affordable, Low Investment Salon Franchise in India";
const description = `Monsoon Salon franchise models start from ${INVESTMENT_BAND.split(" to ")[0]}, an accessible low investment salon franchise option for first-time investors in India.`;
const path = "/affordable-salon-franchise";

export const metadata = buildMetadata({
  title,
  description,
  keywords: "affordable salon franchise, low investment salon franchise, salon franchise for first time investors",
  path,
});

export default function Page() {
  const schemas = [
    pageSchema({ type: "WebPage", name: title, description, path }),
    breadcrumbSchema([["Home", "/"], ["Franchise", "/franchise-enquiry"], ["Affordable Salon Franchise", path]]),
    faqSchema(affordableFaqs),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <LandingPage
        breadcrumbs={[["Home", "/"], ["Franchise", "/franchise-enquiry"], ["Affordable Salon Franchise", path]]}
        h1="Affordable / Low Investment Salon Franchise in India"
        answer={`Monsoon Salon franchise models start from ${INVESTMENT_BAND.split(" to ")[0]}, making it one of the accessible salon franchise options in India for first-time investors.`}
        table={
          <DataTable
            columns={["Model", "Investment band", "Area"]}
            rows={MODELS.map((m) => [m.model, m.band, m.area])}
            highlight={0}
          />
        }
        faqs={affordableFaqs}
        ctaLabel="Check Eligibility & Costing →"
      >
        <div>
          <SectionTitle>What the starting model includes</SectionTitle>
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
