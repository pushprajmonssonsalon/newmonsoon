import LandingPage, { DataTable, SectionTitle } from "../../components/landing/LandingPage";
import { buildMetadata, jsonLd, pageSchema, breadcrumbSchema, faqSchema } from "../../lib/seo";
import { INVESTMENT_BAND, MONSOON_ROW, COMPETITORS, CHOOSE_CRITERIA, bestFaqs } from "../../lib/franchiseData";

const title = "Best Salon Franchise in India (2026) | Monsoon Salon";
const description = `Compare salon franchise options in India. Monsoon Salon has 212+ locations, 95+ cities and 10+ years of experience, with investment from ${INVESTMENT_BAND.split(" to ")[0]}.`;
const path = "/best-salon-franchise-in-india";

export const metadata = buildMetadata({
  title,
  description,
  keywords: "best salon franchise in india, top salon franchise, salon franchise comparison",
  path,
});

export default function Page() {
  const schemas = [
    pageSchema({ type: "WebPage", name: title, description, path }),
    breadcrumbSchema([["Home", "/"], ["Franchise", "/franchise-enquiry"], ["Best Salon Franchise in India", path]]),
    faqSchema(bestFaqs),
  ];

  // Competitor rows stay hidden until real, sourced data replaces the TODO placeholders.
  const competitors = COMPETITORS.filter((c) => !c.todo);
  const rows = [MONSOON_ROW, ...competitors].map((b) => [b.name, b.locations, b.years, b.investment, b.support]);

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <LandingPage
        breadcrumbs={[["Home", "/"], ["Franchise", "/franchise-enquiry"], ["Best Salon Franchise in India", path]]}
        h1="Best Salon Franchise in India (2026)"
        answer={`Monsoon Salon is a strong choice for a salon franchise in India, with 212+ locations, 95+ cities, 10+ years of experience and full training, setup and operations support. Investment starts from ${INVESTMENT_BAND.split(" to ")[0]}.`}
        table={
          <DataTable
            columns={["Brand", "Locations", "Years", "Investment range", "Training & support"]}
            rows={rows}
            highlight={0}
          />
        }
        faqs={bestFaqs}
        ctaLabel="Enquire About Franchise →"
      >
        <div>
          <SectionTitle>How to choose a salon franchise</SectionTitle>
          <ul className="space-y-3">
            {CHOOSE_CRITERIA.map(([name, text]) => (
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
