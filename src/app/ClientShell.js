"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import ReactGA from "react-ga";
import NewFooter from "../screens/footer";
import Header from "../screens/navbar/StickyNavbar";

const TRACKING_ID = "G-H8LMPD3V4F";

export default function ClientShell({ children }) {
  const pathname = usePathname();
  const hideChrome = pathname === "/customSalon";

  // Analytics is not needed for first paint: start it on the first user interaction
  // (or after 5s), same timing as the other deferred scripts in DeferredScripts.js.
  useEffect(() => {
    let started = false;
    const events = ["scroll", "pointerdown", "keydown", "touchstart", "mousemove"];
    const start = () => {
      if (started) return;
      started = true;
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, start));
      ReactGA.initialize(TRACKING_ID);
      ReactGA.pageview(window.location.pathname + window.location.search);
    };
    const timer = setTimeout(start, 5000);
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, start));
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="roboto-regular relative">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>
      <Toaster />
      {!hideChrome && <Header />}
      <main id="main">{children}</main>
      {!hideChrome && <NewFooter />}
    </div>
  );
}
