import Academy from "../../screens/academy";
import { buildMetadata, breadcrumbSchema, jsonLd } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "ARYA Fellowship | Beauty Academy in New Delhi",
  description:
    "Upgrade your skills with ARYA Fellowship in New Delhi. Explore Hair Styling, Beauty & Skin Care, Professional Makeup and Nail Art, with 250 hours of training and scholarship opportunities.",
  path: "/academy",
  image: "/images/academy/arya-fellowship.jpeg",
});

export default function Page() {
  return (
    <>
      <script {...jsonLd(breadcrumbSchema([["Home", "/"], ["Academy", "/academy"]]))} />
      <Academy />
    </>
  );
}
