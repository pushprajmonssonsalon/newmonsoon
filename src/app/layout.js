import { Roboto, Jaldi, Kotta_One, Manrope, Poppins, Cormorant_Garamond } from "next/font/google";
import "../index.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ClientShell from "./ClientShell";
import DeferredScripts from "./DeferredScripts";
import { jsonLd, SITE_URL } from "../lib/seo";

// Same families as before (previously loaded from the Google Fonts stylesheet),
// now self-hosted + preloaded by next/font so text renders without waiting on Google.
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap", variable: "--font-roboto" });
const jaldi = Jaldi({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--font-jaldi" });
const kotta = Kotta_One({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-kotta" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600"], display: "swap", variable: "--font-manrope", preload: false });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap", variable: "--font-poppins", preload: false });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap", variable: "--font-cormorant", preload: false });
const fontVars = [roboto, jaldi, kotta, manrope, poppins, cormorant].map((f) => f.variable).join(" ");

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Monsoon Salon",
  manifest: "/manifest.json",
  icons: { icon: "/favicon.ico", apple: "/logo192.png" },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-video-preview": -1,
    "max-image-preview": "large",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Monsoon Salon",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo1024.png`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fontVars}>
      <head>
        <script {...jsonLd(organization)} />
      </head>
      <body style={{ margin: 0 }}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PZ4CTMVW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <div id="spinner" />
        <AppRouterCacheProvider>
          <ClientShell>{children}</ClientShell>
        </AppRouterCacheProvider>

        <DeferredScripts />
      </body>
    </html>
  );
}
