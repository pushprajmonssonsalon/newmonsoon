import { notFound } from "next/navigation";
import SingleLocation from "../../../screens/locations/SingleLocation";
import { buildMetadata, jsonLd, SITE_URL, DEFAULT_OG_IMAGE } from "../../../lib/seo";
import { getSalonById, getSalons } from "../../../lib/api";
import { OPENING_HOURS_SCHEMA, mapLink, salonSeo } from "../../../lib/cityData";

export const revalidate = 3600;

// Unknown ids must be a real 404, not an empty page.
async function loadSalon(id) {
  const [salon, salons] = await Promise.all([getSalonById(id), getSalons()]);
  if (!salon?._id) notFound();
  return { salon, salons, seo: salonSeo(salon, salons) };
}

export async function generateMetadata({ params }) {
  const { salon, seo } = await loadSalon(params.id);
  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: `/salon-location-near-me/${params.id}`,
    image: salon?.images?.length > 0 ? salon.images[0] : DEFAULT_OG_IMAGE,
  });
}

export default async function Page({ params }) {
  const { salon, salons, seo } = await loadSalon(params.id);
  const url = `${SITE_URL}/salon-location-near-me/${params.id}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": ["HairSalon", "BeautySalon"],
      name: seo.label,
      image: salon.images?.length > 0 ? salon.images[0] : DEFAULT_OG_IMAGE,
      address: {
        "@type": "PostalAddress",
        streetAddress: seo.address,
        ...(seo.city ? { addressLocality: seo.city } : {}),
        addressRegion: seo.state || "",
        addressCountry: "IN",
      },
      ...(salon.latitude && salon.longitude
        ? { geo: { "@type": "GeoCoordinates", latitude: salon.latitude, longitude: salon.longitude } }
        : {}),
      url,
      telephone: seo.phone ? `+91-${seo.phone}` : "+91-9315788084",
      openingHours: OPENING_HOURS_SCHEMA,
      areaServed: seo.city || seo.state,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Salon Locations", item: `${SITE_URL}/salon-location-near-me` },
        { "@type": "ListItem", position: 3, name: seo.label, item: url },
      ],
    },
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <SingleLocation
        initialSalon={salon}
        initialSalons={salons}
        seo={{
          label: seo.label,
          city: seo.city,
          state: seo.state,
          area: seo.area,
          address: seo.address,
          phone: seo.phone,
          mapUrl: mapLink(salon),
          embedUrl:
            salon.latitude && salon.longitude
              ? `https://maps.google.com/maps?q=${salon.latitude},${salon.longitude}&z=15&output=embed`
              : null,
        }}
      />
    </>
  );
}
