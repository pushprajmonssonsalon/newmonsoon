import Script from "next/script";
import NewGallery from "../../screens/gallery/NewGallery";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Monsoon Salon | Ladies Beauty Parlour, Beauty Clinic & Salon Franchise",
  description:
    "Monsoon Salon – a leading ladies beauty parlour franchise, beauty clinic franchise & ladies salon franchise with premium beauty services and proven success.",
  keywords: "monsoon salon media, salon franchise news, media coverage, franchise success stories, beauty industry news, salon updates",
  path: "/media",
});

export default function Page() {
  return (
    <>
      <Script src="https://www.instagram.com/embed.js" strategy="afterInteractive" />
      <NewGallery />
    </>
  );
}
