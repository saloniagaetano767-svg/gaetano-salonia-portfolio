import { toggleTheme, type SiteTheme } from "@/lib/theme";
import { useEffect, useState } from "react";
import { ThemeFlashOverlay, useThemeFlash } from "./ThemeFlash";

export function ThemeToggle() {
  const [theme, setThemeState] = useState<SiteTheme>("dark");
  const { active: flashActive, triggerFlash } = useThemeFlash();
  const isLight = theme === "light";

  useEffect(() => {
    const current = document.documentElement.dataset.theme as SiteTheme | undefined;
    setThemeState(current === "light" ? "light" : "dark");
  }, []);

  const handleToggle = () => {
    triggerFlash();
    const next = toggleTheme();
    setThemeState(next);
  };

  const tooltip = isLight ? "Hellblau-Theme deaktivieren" : "Hellblau-Theme aktivieren";

  return (
    <>
      <ThemeFlashOverlay active={flashActive} />
      <button
        type="button"
        onClick={handleToggle}
        className="theme-switch group"
        aria-label={tooltip}
        aria-pressed={isLight}
        title={tooltip}
        data-ocid="theme.toggle"
      >
        <span className="theme-switch-track">
          <span
            className={`theme-switch-thumb ${isLight ? "is-on" : ""}`}
            aria-hidden
          />
          <span
            className={`theme-switch-label ${!isLight ? "is-active" : "is-inactive"}`}
          >
            OFF
          </span>
          <span
            className={`theme-switch-label ${isLight ? "is-active" : "is-inactive"}`}
          >
            ON
          </span>
        </span>
        <span className="theme-switch-tooltip">{tooltip}</span>
      </button>
    </>
  );
}
