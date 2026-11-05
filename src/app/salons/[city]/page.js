import Link from "next/link";
import { notFound } from "next/navigation";
import FaqSection from "../../../components/FaqSection";
import { CtaButton, DataTable, SectionTitle } from "../../../components/landing/LandingPage";
import { buildMetadata, jsonLd, pageSchema, breadcrumbSchema, faqSchema, SITE_URL, ORG } from "../../../lib/seo";
import { LAST_UPDATED, LAST_UPDATED_ISO } from "../../../lib/franchiseData";
import { getSalons } from "../../../lib/api";
import { groupByCity } from "../../../lib/cities";
import {
  SALON_TIMINGS,
  OPENING_HOURS_SCHEMA,
  SERVICE_PRICES,
  salonDisplayName,
  salonPhone,
  salonAddress,
  mapLink,
  cityFaqs,
} from "../../../lib/cityData";

export const revalidate = 3600;
export const dynamicParams = true;

async function getCity(slug) {
  const cities = groupByCity(await getSalons());
  return cities.find((c) => c.slug === slug) || null;
}

export async function generateStaticParams() {
  const cities = groupByCity(await getSalons());
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }) {
  const city = await getCity(params.city);
  if (!city) return {};
  const n = city.salons.length;
  return buildMetadata({
    title: `Best Salon in ${city.name} | Monsoon Salon`,
    description: `Visit ${n} Monsoon Salon ${n === 1 ? "outlet" : "outlets"} in ${city.name}: addresses, timings and contact numbers for hair, beauty, makeup and nail services.`,
    path: `/salons/${city.slug}`,
  });
}

export default async function Page({ params }) {
  const city = await getCity(params.city);
  if (!city) notFound();

  const path = `/salons/${city.slug}`;
  const n = city.salons.length;
  const faqs = cityFaqs(city.name, n);

  const schemas = [
    pageSchema({
      type: "CollectionPage",
      name: `Best Salon in ${city.name} – Monsoon Salon`,
      description: `Monsoon Salon outlets in ${city.name}.`,
      path,
    }),
    breadcrumbSchema([["Home", "/"], ["Salon Locations", "/salon-location-near-me"], [city.name, path]]),
    faqSchema(faqs),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Monsoon Salon outlets in ${city.name}`,
      itemListElement: city.salons.map((s, i) => {
        const phone = salonPhone(s);
        return {
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": ["HairSalon", "BeautySalon"],
            name: salonDisplayName(s),
            url: `${SITE_URL}/salon-location-near-me/${s._id}`,
            address: {
              "@type": "PostalAddress",
              streetAddress: salonAddress(s),
              addressLocality: city.name,
              addressRegion: city.state,
              addressCountry: "IN",
            },
            ...(phone ? { telephone: `+91-${phone}` } : { telephone: ORG.phone }),
            ...(s.latitude && s.longitude
              ? { geo: { "@type": "GeoCoordinates", latitude: s.latitude, longitude: s.longitude } }
              : {}),
            openingHours: OPENING_HOURS_SCHEMA,
            parentOrganization: { "@id": `${SITE_URL}/#organization` },
          },
        };
      }),
    },
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}

      <section className="px-6 pt-8 pb-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500 mb-4">
            <Link href="/" className="hover:underline">Home</Link> /{" "}
            <Link href="/salon-location-near-me" className="hover:underline">Salon Locations</Link> /{" "}
            <span aria-current="page">{city.name}</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-semibold text-neutral-800">
            Best Salon in {city.name} – Monsoon Salon
          </h1>
          <p className="text-sm text-neutral-500 mt-3">
            Last updated: <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>
          </p>

          <p className="mt-6 text-lg md:text-xl text-neutral-700 bg-[#FFF5EB] rounded-2xl p-6">
            Monsoon Salon has {n} {n === 1 ? "outlet" : "outlets"} in {city.name}, {city.state}, offering hair, skin and
            beauty, makeup and nail services by trained artists.
          </p>
          <p className="mt-3 text-sm text-neutral-600">
            Across India, Monsoon Salon has 212+ salons in 95+ cities, including upcoming locations. The outlets
            currently listed for {city.name} are shown below.
          </p>

          <div className="mt-8">
            <SectionTitle>Monsoon Salon outlets in {city.name}</SectionTitle>
            <ul className="grid md:grid-cols-2 gap-4">
              {city.salons.map((s) => {
                const phone = salonPhone(s);
                return (
                  <li key={s._id} className="bg-white rounded-2xl shadow-md p-5 border">
                    <h3 className="font-semibold text-lg text-neutral-800">
                      <Link href={`/salon-location-near-me/${s._id}`}>{salonDisplayName(s)}</Link>
                    </h3>
                    <p className="text-neutral-600 mt-2">{salonAddress(s)}</p>
                    <p className="text-neutral-600 mt-2">Timings: {SALON_TIMINGS}</p>
                    <p className="mt-2">
                      Phone:{" "}
                      <a href={`tel:+91${phone || "9315788084"}`} className="text-[#8f7229] underline">
                        {phone ? `+91 ${phone}` : ORG.phone}
                      </a>
                    </p>
                    <p className="mt-3">
                      <a href={mapLink(s)} target="_blank" rel="noopener noreferrer" className="text-[#8f7229] underline">
                        View on Google Maps
                      </a>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-10">
            <SectionTitle>Service prices in {city.name}</SectionTitle>
            <DataTable
              columns={["Service", "Starting from"]}
              rows={SERVICE_PRICES.map((p) => [p.service, p.price || "Contact the salon"])}
            />
          </div>

          <p className="mt-10 text-neutral-600">
            Interested in owning a salon?{" "}
            <Link href="/franchise-enquiry" className="text-[#8f7229] underline">
              See Monsoon Salon franchise details
            </Link>
            .
          </p>
        </div>
      </section>

      <FaqSection faqs={faqs} />

      <section className="px-6 py-12 text-center bg-white">
        <CtaButton>Enquire About a Franchise →</CtaButton>
      </section>
    </>
  );
}
