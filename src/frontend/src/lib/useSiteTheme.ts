import { useEffect, useState } from "react";
import { type SiteTheme, getTheme } from "./theme";

function readTheme(): SiteTheme {
  const fromDom = document.documentElement.dataset.theme;
  if (fromDom === "light" || fromDom === "dark") return fromDom;
  return getTheme();
}

export function useSiteTheme(): SiteTheme {
  const [theme, setTheme] = useState<SiteTheme>(() =>
    typeof window === "undefined" ? "dark" : readTheme(),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(readTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}
