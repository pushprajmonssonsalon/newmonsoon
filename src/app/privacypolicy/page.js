import PrivacyPolicy from "../../screens/privacypolicy";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | Monsoon Salon",
  description:
    "Read Monsoon Salon's privacy policy to understand how we collect, use, and protect your personal information across our website, app, and services.",
  keywords: "privacy policy, data protection, personal information, user privacy",
  path: "/privacypolicy",
});

export default function Page() {
  return <PrivacyPolicy />;
}
