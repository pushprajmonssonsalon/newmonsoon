"use client";
import { useEffect, useState } from "react";
import Script from "next/script";

// Analytics + chat widget are not needed for first paint. Load them after the
// first user interaction, or after 5s if the visitor doesn't interact.
export default function DeferredScripts() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const events = ["scroll", "pointerdown", "keydown", "touchstart", "mousemove"];
    const start = () => setReady(true);
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    const timer = setTimeout(start, 5000);
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, start));
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PZ4CTMVW');`}
      </Script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-4YDYK31XMS" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-4YDYK31XMS');`}
      </Script>
      <Script src="https://kavisha.ai/embed.js" data-brand="monsoonsalon" strategy="afterInteractive" />
    </>
  );
}
