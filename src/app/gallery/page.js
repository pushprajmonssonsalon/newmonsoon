import Gallery from "../../screens/gallery";
import { buildMetadata, jsonLd, pageSchema, breadcrumbSchema } from "../../lib/seo";

const title = "Monsoon Salon | Beauty Salon & Spa Franchise in India";
const description =
  "Monsoon Salon offers the best beauty salon franchise in India. Start your own salon and spa franchise in India with expert support and high profit potential.";

export const metadata = buildMetadata({
  title,
  description,
  keywords: "monsoon salon , explore salon",
  path: "/gallery",
});

export default function Page() {
  const schemas = [
    pageSchema({ type: "CollectionPage", name: title, description, path: "/gallery" }),
    breadcrumbSchema([["Home", "/"], ["Gallery", "/gallery"]]),
  ];
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <Gallery />
    </>
  );
}
