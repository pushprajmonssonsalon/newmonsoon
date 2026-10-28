import Script from "next/script";
import Newfranchise from "../../screens/newfranchisepage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Best & Low Cost Beauty Salon Franchise in India | Monsoon Salon",
  description:
    "Start your business with Monsoon Salon – the best beauty salon franchise in India. Own a top, low-cost salon franchise with trusted brand support.",
  keywords:
    "monsoon salon franchise, beauty salon franchise, affordable salon franchise, salon franchise opportunity, franchise for salon",
  path: "/franchise-enquiry",
});

export default function Page() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-870359358" strategy="lazyOnload" />
      <Script id="gtag-aw" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'AW-870359358');`}
      </Script>
      <Newfranchise />
    </>
  );
}
