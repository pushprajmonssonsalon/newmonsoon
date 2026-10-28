import About from "../../screens/about/About";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "About Monsoon Salon | Leading Salon Franchise Opportunities",
  description:
    "Monsoon Salon is a leader in salon franchise opportunities. Join our trusted brand and benefit from premium beauty services and expert franchise support.",
  keywords: "about monsoon salon, monsoon salon information, monsoon about us, monsoon salon profile",
  path: "/about-us",
});

export default function Page() {
  return <About />;
}
