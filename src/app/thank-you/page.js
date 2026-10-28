import ThankYou from "../../screens/thankyoupage/thankyou";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Thank You for Connecting with Monsoon | Franchise Enquiry",
  description:
    "Thank you for connecting with Monsoon Salon. Our franchise team will review your details and contact you shortly.",
  path: "/thank-you",
  noindex: true,
});

export default function Page() {
  return <ThankYou />;
}
