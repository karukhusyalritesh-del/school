import { useEffect, useState } from "react";

const useForceDesktop = () => {
  const [forceDesktop, setForceDesktop] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isMobileDevice =
      /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua);
    const isDesktopMode =
      window.innerWidth < 1024 && (ua.includes("chrome") || ua.includes("safari"));

    // user is on mobile, but browser is pretending desktop
    if (isMobileDevice && isDesktopMode) {
      setForceDesktop(true);
    }
  }, []);

  return forceDesktop;
};

export default useForceDesktop;
