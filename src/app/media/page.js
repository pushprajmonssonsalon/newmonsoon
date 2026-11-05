import Script from "next/script";
import NewGallery from "../../screens/gallery/NewGallery";
import { buildMetadata, jsonLd, pageSchema, breadcrumbSchema } from "../../lib/seo";

const title = "Ladies Beauty Parlour & Salon Franchise | Monsoon Salon";
const description =
  "Monsoon Salon – a leading ladies beauty parlour franchise, beauty clinic franchise & ladies salon franchise with premium beauty services and proven success.";

export const metadata = buildMetadata({
  title,
  description,
  keywords: "monsoon salon media, salon franchise news, media coverage, franchise success stories, beauty industry news, salon updates",
  path: "/media",
});

export default function Page() {
  const schemas = [
    pageSchema({ type: "CollectionPage", name: title, description, path: "/media" }),
    breadcrumbSchema([["Home", "/"], ["Media", "/media"]]),
  ];
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <Script src="https://www.instagram.com/embed.js" strategy="afterInteractive" />
      <NewGallery />
    </>
  );
}
