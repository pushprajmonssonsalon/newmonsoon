import Link from "next/link";
import FaqSection from "../FaqSection";
import { LAST_UPDATED, LAST_UPDATED_ISO } from "../../lib/franchiseData";

export const ENQUIRY_HREF = "/franchise-enquiry#firstName";

export function CtaButton({ children }) {
  return (
    <Link
      href={ENQUIRY_HREF}
      className="inline-block bg-[#8f7229] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#7d6323] transition-all duration-300 shadow-md"
    >
      {children}
    </Link>
  );
}

export function DataTable({ columns, rows, highlight = -1 }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-md bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-neutral-800 text-white">
            {columns.map((c) => (
              <th key={c} scope="col" className="px-4 py-3 text-sm md:text-base font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-t ${i === highlight ? "bg-[#FFF5EB] font-semibold" : ""}`}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-sm md:text-base text-neutral-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// H1 -> short direct answer -> table -> details -> FAQs -> CTA
export default function LandingPage({
  breadcrumbs,
  h1,
  answer,
  table,
  children,
  faqs,
  ctaLabel,
}) {
  return (
    <>
      <section className="px-6 pt-8 pb-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500 mb-4">
            {breadcrumbs.map(([name, href], i) => (
              <span key={href}>
                {i > 0 && " / "}
                {i < breadcrumbs.length - 1 ? (
                  <Link href={href} className="hover:underline">
                    {name}
                  </Link>
                ) : (
                  <span aria-current="page">{name}</span>
                )}
              </span>
            ))}
          </nav>

          <h1 className="text-3xl md:text-5xl font-semibold text-neutral-800">{h1}</h1>
          <p className="text-sm text-neutral-500 mt-3">
            Last updated: <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>
          </p>

          <p className="mt-6 text-lg md:text-xl text-neutral-700 bg-[#FFF5EB] rounded-2xl p-6">{answer}</p>

          {table && <div className="mt-8">{table}</div>}

          <div className="mt-10 space-y-10">{children}</div>

          <p className="mt-10 text-neutral-600">
            Want the full picture? See{" "}
            <Link href="/franchise-enquiry" className="text-[#8f7229] underline">
              all Monsoon Salon franchise details
            </Link>{" "}
            or read about{" "}
            <Link href="/franchise/cost" className="text-[#8f7229] underline">
              franchise cost
            </Link>
            .
          </p>
        </div>
      </section>

      {faqs && <FaqSection faqs={faqs} />}

      <section className="px-6 py-12 text-center bg-white">
        <CtaButton>{ctaLabel}</CtaButton>
      </section>
    </>
  );
}

export function SectionTitle({ children }) {
  return <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800 mb-4">{children}</h2>;
}
