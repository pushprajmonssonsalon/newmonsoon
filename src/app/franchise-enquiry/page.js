import Script from "next/script";
import Newfranchise from "../../screens/newfranchisepage";
import FaqSection from "../../components/FaqSection";
import { buildMetadata, jsonLd, pageSchema, breadcrumbSchema, faqSchema, SITE_URL } from "../../lib/seo";
import { franchiseFaqs } from "../../screens/faqData";

const title = "Best & Low Cost Beauty Salon Franchise in India | Monsoon Salon";
const description =
  "Start your business with Monsoon Salon – the best beauty salon franchise in India. Own a top, low-cost salon franchise with trusted brand support.";

export const metadata = buildMetadata({
  title,
  description,
  keywords:
    "monsoon salon franchise, beauty salon franchise, affordable salon franchise, salon franchise opportunity, franchise for salon",
  path: "/franchise-enquiry",
});

export default function Page() {
  const schemas = [
    pageSchema({ type: "WebPage", name: title, description, path: "/franchise-enquiry" }),
    breadcrumbSchema([["Home", "/"], ["Franchise", "/franchise-enquiry"]]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Monsoon Salon Franchise",
      serviceType: "Salon franchise opportunity",
      description,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "India" },
      url: `${SITE_URL}/franchise-enquiry`,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Salon franchise models",
        itemListElement: ["Monsoon Salon", "Monsoon Pro Salon", "Smart Salon (Pro Plus)"].map((n) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: `${n} franchise` },
        })),
      },
    },
    faqSchema(franchiseFaqs),
  ];
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-870359358" strategy="lazyOnload" />
      <Script id="gtag-aw" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'AW-870359358');`}
      </Script>
      <Newfranchise />
      <FaqSection faqs={franchiseFaqs} />
    </>
  );
}
