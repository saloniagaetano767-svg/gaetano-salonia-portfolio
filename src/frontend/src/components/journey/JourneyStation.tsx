import { StationBackdrop } from "@/components/journey/StationBackdrop";
import {
  SECTION_THEMES,
  type StationTheme,
} from "@/components/journey/StationDecor";
import type { ReactNode } from "react";

interface JourneyStationProps {
  id: string;
  children: ReactNode;
  className?: string;
  compact?: boolean;
  /** Reduced top padding for first post-intro section */
  diveEntry?: boolean;
  theme?: StationTheme;
}

export function JourneyStation({
  id,
  children,
  className = "",
  compact,
  diveEntry,
  theme,
}: JourneyStationProps) {
  const stationTheme = theme ?? SECTION_THEMES[id] ?? "sea";
  const heightClass = compact ? "min-h-[90dvh]" : "min-h-[100dvh]";
  const paddingClass = diveEntry
    ? "pt-[calc(var(--ocean-nav-height)+2rem)] pb-[max(5rem,env(safe-area-inset-bottom))] sm:pb-24"
    : compact
      ? "py-[max(5rem,calc(4rem+env(safe-area-inset-bottom)))] sm:py-24"
      : "py-[max(6rem,calc(5rem+env(safe-area-inset-bottom)))] sm:py-28";

  return (
    <section
      id={id}
      data-station-theme={stationTheme}
      className={`relative flex items-center justify-center px-[var(--section-px)] ${heightClass} ${paddingClass} ${className}`}
    >
      <StationBackdrop theme={stationTheme} />
      <div className="relative z-[1] w-full max-w-[1080px] mx-auto journey-content-frame">
        {children}
      </div>
    </section>
  );
}
