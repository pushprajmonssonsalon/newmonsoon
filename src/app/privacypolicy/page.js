import PrivacyPolicy from "../../screens/privacypolicy";
import { buildMetadata, jsonLd, pageSchema, breadcrumbSchema } from "../../lib/seo";

const title = "Privacy Policy | Monsoon Salon";
const description =
  "Read Monsoon Salon's privacy policy to understand how we collect, use, and protect your personal information across our website, app, and services.";

export const metadata = buildMetadata({
  title,
  description,
  keywords: "privacy policy, data protection, personal information, user privacy",
  path: "/privacypolicy",
});

export default function Page() {
  const schemas = [
    pageSchema({ type: "WebPage", name: title, description, path: "/privacypolicy" }),
    breadcrumbSchema([["Home", "/"], ["Privacy Policy", "/privacypolicy"]]),
  ];
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <PrivacyPolicy />
    </>
  );
}
