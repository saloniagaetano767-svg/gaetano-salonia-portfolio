import { useCursorScroll } from "@/context/CursorScrollContext";
import type { PageSection } from "@/context/CursorScrollContext";

const SPOTLIGHT_BY_SECTION: Record<
  PageSection,
  { opacity: number; size: number }
> = {
  hero: { opacity: 0.22, size: 720 },
  about: { opacity: 0.16, size: 640 },
  work: { opacity: 0.17, size: 660 },
  services: { opacity: 0.19, size: 680 },
  contact: { opacity: 0.24, size: 700 },
};

const ORB_OFFSETS = {
  primary: { factorX: 24, factorY: 20 },
  accent: { factorX: -18, factorY: 16 },
  extra: { factorX: 12, factorY: -12 },
} as const;

export function PageBackground() {
  const { cursor, scrollProgress, activeSection, reducedMotion } =
    useCursorScroll();

  const spotlight = SPOTLIGHT_BY_SECTION[activeSection];
  const cx = reducedMotion ? 50 : cursor.x * 100;
  const cy = reducedMotion ? 40 : cursor.y * 100;

  const gridShiftX = reducedMotion ? 0 : (cursor.x - 0.5) * 16;
  const gridShiftY = reducedMotion ? 0 : (cursor.y - 0.5) * 16;
  const gridOpacity = 0.85 + scrollProgress * 0.15;

  const orbPrimaryX = reducedMotion
    ? 0
    : (cursor.x - 0.5) * ORB_OFFSETS.primary.factorX;
  const orbPrimaryY = reducedMotion
    ? 0
    : (cursor.y - 0.5) * ORB_OFFSETS.primary.factorY;
  const orbAccentX = reducedMotion
    ? 0
    : (cursor.x - 0.5) * ORB_OFFSETS.accent.factorX;
  const orbAccentY = reducedMotion
    ? 0
    : (cursor.y - 0.5) * ORB_OFFSETS.accent.factorY;
  const orbExtraX = reducedMotion
    ? 0
    : (cursor.x - 0.5) * ORB_OFFSETS.extra.factorX;
  const orbExtraY = reducedMotion
    ? 0
    : (cursor.y - 0.5) * ORB_OFFSETS.extra.factorY;

  const vignetteStrength = 0.35 + scrollProgress * 0.25;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 page-bg-grid transition-[background-position,opacity] duration-500"
        style={{
          backgroundImage: "var(--grid-lines), var(--grid-dots)",
          backgroundSize: "60px 60px, 20px 20px",
          backgroundPosition: `${gridShiftX}px ${gridShiftY}px, ${gridShiftX * 0.5}px ${gridShiftY * 0.5}px`,
          opacity: gridOpacity,
        }}
      />

      <div
        className="absolute inset-0 page-bg-spotlight transition-opacity duration-700"
        style={{
          background: `radial-gradient(${spotlight.size}px circle at ${cx}% ${cy}%, var(--bg-spotlight) 0%, transparent 62%)`,
          opacity: spotlight.opacity,
        }}
      />

      <div
        className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[40px] transition-[background,transform] duration-500"
        style={{
          background:
            "radial-gradient(circle, var(--orb-primary) 0%, transparent 65%)",
          transform: `translate(${orbPrimaryX}px, ${orbPrimaryY}px)`,
        }}
      />
      <div
        className="absolute bottom-0 -right-[10%] w-[500px] h-[500px] rounded-full blur-[40px] transition-[background,transform] duration-500"
        style={{
          background:
            "radial-gradient(circle, var(--orb-accent) 0%, transparent 65%)",
          transform: `translate(${orbAccentX}px, ${orbAccentY}px)`,
        }}
      />
      <div
        className="page-bg-orb-extra absolute bottom-[10%] left-1/2 w-[700px] h-[400px] rounded-full blur-[60px] transition-[background,transform,opacity] duration-500"
        style={{
          background:
            "radial-gradient(circle, var(--orb-extra) 0%, transparent 70%)",
          transform: `translate(calc(-50% + ${orbExtraX}px), ${orbExtraY}px)`,
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 40%, var(--bg-vignette) 100%)",
          opacity: vignetteStrength,
        }}
      />
    </div>
  );
}
