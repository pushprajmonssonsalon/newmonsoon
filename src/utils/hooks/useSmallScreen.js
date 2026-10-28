import { useEffect, useState } from "react";

const TABLET_BREAKPOINT = 768;

export const useIsSmallScreen = () => {
  // Start false so server and first client render match (no hydration mismatch).
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < TABLET_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isSmallScreen;
};
