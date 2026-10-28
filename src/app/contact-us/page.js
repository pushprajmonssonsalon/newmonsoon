import ContactUs from "../../screens/contactus";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us | Monsoon Salon Franchise Team",
  description:
    "Reach out to Monsoon Salon today and explore exciting opportunities to join our growing saloon franchise business network in India.",
  keywords: "monsoon salon contact details, monsoon salon address, monsoon salon phone number, monsoon salon email",
  path: "/contact-us",
});

export default function Page() {
  return <ContactUs />;
}
