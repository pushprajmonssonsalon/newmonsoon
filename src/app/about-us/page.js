import About from "../../screens/about/About";
import { buildMetadata, jsonLd, pageSchema, breadcrumbSchema, faqSchema } from "../../lib/seo";
import FaqSection from "../../components/FaqSection";
import { aboutFaqs } from "../../screens/faqData";

const title = "About Monsoon Salon | Leading Salon Franchise Opportunities";
const description =
  "Monsoon Salon is a leader in salon franchise opportunities. Join our trusted brand and benefit from premium beauty services and expert franchise support.";

export const metadata = buildMetadata({
  title,
  description,
  keywords: "about monsoon salon, monsoon salon information, monsoon about us, monsoon salon profile",
  path: "/about-us",
});

export default function Page() {
  const schemas = [
    pageSchema({ type: "AboutPage", name: title, description, path: "/about-us" }),
    breadcrumbSchema([["Home", "/"], ["About Us", "/about-us"]]),
    faqSchema(aboutFaqs),
  ];
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <About />
      <FaqSection faqs={aboutFaqs} />
    </>
  );
}
