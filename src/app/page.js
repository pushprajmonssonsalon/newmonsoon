import Home from "../screens/homepage/home";
import { getBanners } from "../lib/api";
import { buildMetadata, jsonLd, pageSchema, breadcrumbSchema, faqSchema } from "../lib/seo";
import FaqSection from "../components/FaqSection";
import { homeFaqs } from "../screens/faqData";

const title = "Monsoon Salon | India’s Leading Salon Franchise Chain";
const description =
  "Join Monsoon Salon – the best unisex salon franchise in India. Explore top salon brands, compare the top 10 salon franchises, and start your business today!";

export const metadata = buildMetadata({
  title,
  description,
  keywords: "salon franchise, best salon franchise, affordable salon franchise, salon franchise booking portal, unisex salon franchise",
  path: "/",
});

export const revalidate = 3600;

export default async function Page() {
  const banners = await getBanners();
  const schemas = [
    pageSchema({ type: "WebPage", name: title, description, path: "/" }),
    faqSchema(homeFaqs),
  ];
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <Home initialBanners={banners} />
      <FaqSection faqs={homeFaqs} />
    </>
  );
}
