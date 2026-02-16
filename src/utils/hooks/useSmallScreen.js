import { useEffect, useState } from "react";

const TABLET_BREAKPOINT = 768;

export const useIsSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined"
      ? window.innerWidth < TABLET_BREAKPOINT
      : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < TABLET_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isSmallScreen;
};
