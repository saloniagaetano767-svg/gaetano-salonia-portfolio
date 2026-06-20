import { depthProgress } from "@/components/ocean/oceanColors";
import { useOceanPhasesFromScroll } from "@/hooks/useSmoothedOceanPhases";
import { useJourneyScroll } from "@/context/JourneyScrollContext";
import { useTranslation } from "@/i18n";

const ACT_MARKS = [
  { act: "sunset" as const, pct: 0 },
  { act: "sea" as const, pct: 50 },
  { act: "reef" as const, pct: 100 },
];

export function DepthIndicator() {
  const { experienceReady, activeSection } = useJourneyScroll();
  const { t } = useTranslation();
  const phases = useOceanPhasesFromScroll();

  const progress = depthProgress(phases);
  const labels = {
    sunset: t.depth.sunset,
    sea: t.depth.sea,
    reef: t.depth.reef,
  };

  if (!experienceReady || activeSection === "contact") return null;

  return (
    <>
      <div
        className="fixed left-[var(--section-px)] top-[calc(50%+1.5rem)] -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4 pointer-events-none transition-opacity duration-700 opacity-100"
        aria-hidden
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--ocean-text-dim)] -rotate-90 origin-center whitespace-nowrap mb-6">
          {t.depth.label}
        </span>

        <div className="relative h-36 w-px bg-white/12 rounded-full overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--ocean-sunset)] via-[var(--ocean-teal-dim)] to-[var(--ocean-teal)]"
            style={{
              height: `${Math.max(6, progress * 100)}%`,
              transition: "height 0.1s linear",
            }}
          />
          {ACT_MARKS.map((mark) => (
            <div
              key={mark.act}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-px bg-white/30"
              style={{ bottom: `${mark.pct}%` }}
            />
          ))}
        </div>

        <div className="font-mono text-[10px] text-center leading-tight min-w-[4.5rem]">
          <span className="block text-[var(--ocean-sunset-bright)] text-[9px] uppercase tracking-wider mb-1">
            {labels[phases.journeyAct]}
          </span>
          <span className="tabular-nums text-[var(--ocean-text-muted)]">
            {Math.round(phases.depthSymbolic)}%
          </span>
        </div>
      </div>

      <div className="journey-depth-mobile sm:hidden" aria-hidden>
        <div className="journey-depth-mobile-bar">
          <div
            className="journey-depth-mobile-fill"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--ocean-sunset-bright)] whitespace-nowrap">
          {labels[phases.journeyAct]}
        </span>
        <span className="font-mono text-[9px] tabular-nums text-[var(--ocean-text-dim)]">
          {Math.round(phases.depthSymbolic)}%
        </span>
      </div>
    </>
  );
}
