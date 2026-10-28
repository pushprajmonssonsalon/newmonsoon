import Home from "../screens/homepage/home";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Monsoon Salon | India’s Leading Salon Franchise Chain",
  description:
    "Join Monsoon Salon – the best unisex salon franchise in India. Explore top salon brands, compare the top 10 salon franchises, and start your business today!",
  keywords: "salon franchise, best salon franchise, affordable salon franchise, salon franchise booking portal, unisex salon franchise",
  path: "/",
});

export default function Page() {
  return <Home />;
}
