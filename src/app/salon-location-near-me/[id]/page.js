import SingleLocation from "../../../screens/locations/SingleLocation";
import { buildMetadata, jsonLd, SITE_URL, DEFAULT_OG_IMAGE } from "../../../lib/seo";
import { getSalonById } from "../../../lib/api";
import { getSalonMeta } from "../../../screens/locations/salonMeta";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const salon = await getSalonById(params.id);
  const { title, description } = getSalonMeta(salon?.stateName);
  return buildMetadata({
    title,
    description,
    path: `/salon-location-near-me/${params.id}`,
    image: salon?.images?.length > 0 ? salon.images[0] : DEFAULT_OG_IMAGE,
  });
}

export default async function Page({ params }) {
  const salon = await getSalonById(params.id);
  const url = `${SITE_URL}/salon-location-near-me/${params.id}`;
  const schemas = salon?.stateName
    ? [
        {
          "@context": "https://schema.org",
          "@type": "HairSalon",
          name: `Monsoon Salon - ${salon.stateName}`,
          image: salon.images?.length > 0 ? salon.images[0] : DEFAULT_OG_IMAGE,
          address: {
            "@type": "PostalAddress",
            streetAddress: salon.address || "",
            addressRegion: salon.stateName || "",
            addressCountry: "IN",
          },
          ...(salon.latitude && salon.longitude
            ? { geo: { "@type": "GeoCoordinates", latitude: salon.latitude, longitude: salon.longitude } }
            : {}),
          url,
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Salon Locations", item: `${SITE_URL}/salon-location-near-me` },
            { "@type": "ListItem", position: 3, name: `Monsoon Salon - ${salon.stateName}`, item: url },
          ],
        },
      ]
    : [];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <SingleLocation />
    </>
  );
}
