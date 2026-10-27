import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { aestheticServices, aestheticFaqs } from "./data";
import NotFound from "../notfound";

const detailLabels = [
  ["procedureTime", "Procedure Time"],
  ["sessions", "Number of Sessions"],
  ["resultsIn", "Results seen in"],
  ["resultsLast", "Results last up to"],
  ["recoveryTime", "Recovery Time"],
];

// "4. HIFU (High-Intensity Focused Ultrasound)" -> "HIFU"
const shortName = (machine) =>
  machine.replace(/^\d+\.\s*/, "").replace(/\s*\(.*\)$/, "");

export default function AestheticDetail() {
  const { slug } = useParams();
  const service = aestheticServices.find((s) => s.slug === slug);

  if (!service) return <NotFound />;

  // Falls back to the common aesthetics FAQs until a service has its own.
  const faqs = service.faqs.length > 0 ? service.faqs : aestheticFaqs;

  return (
    <>
      <Helmet>
        <title>{`${service.machine.replace(/^\d+\.\s*/, "")} - ${service.category} | Monsoon Aesthetics`}</title>
        <meta name="description" content={service.description} />
        <link
          rel="canonical"
          href={`https://monsoonsalon.com/aesthetics/${service.slug}`}
        />
      </Helmet>

      <div className="max-w-[100vw] overflow-x-hidden bg-white">
        {/* Services tab bar */}
        <nav className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-x-1 gap-y-2">
            {aestheticServices.map((s) => {
              const active = s.slug === slug;
              return (
                <Link
                  key={s.slug}
                  to={`/aesthetics/${s.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`px-3 py-1 rounded-full font-jaldi text-sm md:text-base transition ${
                    active
                      ? "bg-amber-600 text-white font-semibold"
                      : "text-neutral-800 hover:text-amber-600"
                  }`}
                >
                  {shortName(s.machine)}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Hero */}
        <section className="py-10 md:py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <img
              src={service.img}
              alt={service.machine}
              width="540"
              height="520"
              className="w-full h-[280px] md:h-[520px] object-cover"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-kotta font-semibold text-neutral-800">
                {service.machine}
              </h1>
              <p className="text-amber-600 font-jaldi font-semibold mt-4">
                {service.category}
              </p>
              <p className="text-neutral-600 font-jaldi text-base mt-4">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* How does this work + details */}
        <section className="py-10 md:py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-kotta font-semibold text-neutral-800">
                How does this work?
              </h2>
              {service.howItWorks.length > 0 ? (
                <ul className="list-disc pl-5 mt-6 space-y-3 text-neutral-600 font-jaldi">
                  {service.howItWorks.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 text-neutral-500 font-jaldi">
                  Details coming soon.
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 mt-8">
                {detailLabels.map(([key, label]) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-neutral-700 font-jaldi">{label}</p>
                    <p className="mt-3 text-neutral-900 font-jaldi font-bold">
                      {service.details[key] || "To be updated"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <img
              src={service.img}
              alt={service.machine}
              loading="lazy"
              width="540"
              height="520"
              className="w-full h-[280px] md:h-[520px] object-cover"
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10 md:py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-kotta font-semibold text-neutral-800 mb-8">
              Some Frequently Asked Questions (FAQ's)
            </h2>
            <ul>
                {faqs.map((item) => (
                  <li
                    key={item.title}
                    className="border rounded-md mb-3 last:mb-0"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between gap-3 px-5 py-4 font-medium marker:content-none cursor-pointer list-none">
                        <span className="text-lg font-jaldi text-neutral-800">
                          {item.title}
                        </span>
                        <span className="text-xl group-open:hidden">+</span>
                        <span className="text-xl hidden group-open:inline">
                          −
                        </span>
                      </summary>
                      <article className="px-5 pb-4">
                        <p className="text-gray-600 font-jaldi">
                          {item.details}
                        </p>
                      </article>
                    </details>
                  </li>
                ))}
              </ul>
          </div>
        </section>
      </div>
    </>
  );
}
