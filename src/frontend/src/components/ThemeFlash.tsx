import { usePrefersReducedMotion } from "@/lib/motion";
import { useCallback, useState } from "react";

export function useThemeFlash() {
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(false);

  const triggerFlash = useCallback(() => {
    if (reducedMotion) return;
    setActive(true);
    window.setTimeout(() => setActive(false), 750);
  }, [reducedMotion]);

  return { active, triggerFlash };
}

export function ThemeFlashOverlay({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="theme-flash-overlay" aria-hidden>
      <div className="theme-flash-burst" />
    </div>
  );
}
