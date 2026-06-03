import { useTranslation } from "@/i18n";
import { toggleTheme } from "@/lib/theme";
import { useSiteTheme } from "@/lib/useSiteTheme";
import { Moon, Sun } from "lucide-react";
import { ThemeFlashOverlay, useThemeFlash } from "./ThemeFlash";

export function ThemeToggle() {
  const { t } = useTranslation();
  const theme = useSiteTheme();
  const { active: flashActive, triggerFlash } = useThemeFlash();
  const isLight = theme === "light";

  const handleToggle = () => {
    triggerFlash();
    toggleTheme();
  };

  const label = isLight ? t.theme.buttonDark : t.theme.buttonLight;
  const tooltip = isLight ? t.theme.disableLight : t.theme.enableLight;

  return (
    <>
      <ThemeFlashOverlay active={flashActive} />
      <button
        type="button"
        onClick={handleToggle}
        className="theme-toggle-btn"
        aria-label={tooltip}
        title={tooltip}
        data-ocid="theme.toggle"
      >
        {isLight ? (
          <Moon className="size-4 shrink-0" aria-hidden />
        ) : (
          <Sun className="size-4 shrink-0" aria-hidden />
        )}
        <span>{label}</span>
      </button>
    </>
  );
}
