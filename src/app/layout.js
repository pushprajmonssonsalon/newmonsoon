import localFont from "next/font/local";
import "../index.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ClientShell from "./ClientShell";
import DeferredScripts from "./DeferredScripts";
import { jsonLd, SITE_URL, organizationSchema, websiteSchema } from "../lib/seo";

// Same families as before (previously loaded from the Google Fonts stylesheet),
// now bundled in src/assets/fonts and served by next/font/local, so the build needs no internet
// and text renders without waiting on Google.
const roboto = localFont({
  src: [
    { path: "../assets/fonts/Roboto-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/Roboto-500.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/Roboto-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-roboto",
  adjustFontFallback: "Arial",
});
const jaldi = localFont({
  src: [
    { path: "../assets/fonts/Jaldi-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/Jaldi-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-jaldi",
  adjustFontFallback: "Arial",
});
const kotta = localFont({
  src: [
    { path: "../assets/fonts/KottaOne-400.woff2", weight: "400", style: "normal" },
  ],
  display: "swap",
  variable: "--font-kotta",
  adjustFontFallback: "Times New Roman",
});
const manrope = localFont({
  src: [
    { path: "../assets/fonts/Manrope-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/Manrope-600.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-manrope",
  preload: false,
  adjustFontFallback: "Arial",
});
const poppins = localFont({
  src: [
    { path: "../assets/fonts/Poppins-300.woff2", weight: "300", style: "normal" },
    { path: "../assets/fonts/Poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/Poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/Poppins-600.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-poppins",
  preload: false,
  adjustFontFallback: "Arial",
});
const cormorant = localFont({
  src: [
    { path: "../assets/fonts/CormorantGaramond-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/CormorantGaramond-600.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/CormorantGaramond-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-cormorant",
  preload: false,
  adjustFontFallback: "Times New Roman",
});
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

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={fontVars}>
      <head>
        <script {...jsonLd(organizationSchema())} />
        <script {...jsonLd(websiteSchema())} />
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
