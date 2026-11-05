import ContactUs from "../../screens/contactus";
import { buildMetadata, jsonLd, pageSchema, breadcrumbSchema } from "../../lib/seo";

const title = "Contact Us | Monsoon Salon Franchise Team";
const description =
  "Reach out to Monsoon Salon today and explore exciting opportunities to join our growing saloon franchise business network in India.";

export const metadata = buildMetadata({
  title,
  description,
  keywords: "monsoon salon contact details, monsoon salon address, monsoon salon phone number, monsoon salon email",
  path: "/contact-us",
});

export default function Page() {
  const schemas = [
    pageSchema({ type: "ContactPage", name: title, description, path: "/contact-us" }),
    breadcrumbSchema([["Home", "/"], ["Contact Us", "/contact-us"]]),
  ];
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} {...jsonLd(s)} />
      ))}
      <ContactUs />
    </>
  );
}
