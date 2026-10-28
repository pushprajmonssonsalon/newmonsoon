import Locations from "../../screens/locations/Locations";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Monsoon Salon | Salon Franchise in Chennai, Noida, Pune & More",
  description:
    "Explore Monsoon Salon – cheap and best salon franchise in Chennai, plus salon franchises in Noida, Pune, Ahmedabad, Bangalore, Kolkata, Lucknow & more.",
  keywords: "monsoon salon near me, monsoon salon near you, monsoon salon locations, citywise monsoon salon, monsoon salon franchise locations",
  path: "/salon-location-near-me",
});

export default function Page() {
  return <Locations />;
}
