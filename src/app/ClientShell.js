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

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="roboto-regular relative">
      <Toaster />
      {!hideChrome && <Header />}
      <div className="">{children}</div>
      {!hideChrome && <NewFooter />}
    </div>
  );
}
