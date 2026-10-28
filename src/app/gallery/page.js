import Gallery from "../../screens/gallery";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Monsoon Salon | Beauty Salon & Spa Franchise in India",
  description:
    "Monsoon Salon offers the best beauty salon franchise in India. Start your own salon and spa franchise in India with expert support and high profit potential.",
  keywords: "monsoon salon , explore salon",
  path: "/gallery",
});

export default function Page() {
  return <Gallery />;
}
