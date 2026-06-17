import type { CSSProperties } from "react";
import { easeInOutQuint, smoothstep, type OceanPhases } from "./oceanPhases";

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Smooth cinematic blend weights for video layers — wide crossfade. */
export function videoLayerWeights(phases: OceanPhases): {
  shore: number;
  underwater: number;
} {
  const u = easeInOutQuint(phases.underwaterT);
  const s = easeInOutQuint(phases.sunsetT);

  const shore = clamp01(
    (1 - smoothstep(0.12, 0.82, u)) * lerp(1, 0.88, s * 0.12),
  );
  const underwater = smoothstep(0.2, 0.78, u);

  return { shore, underwater };
}

/** CSS color-grade overlay — subtle multiply, slow transitions. */
export function cinematicGradeStyle(phases: OceanPhases): CSSProperties {
  const u = easeInOutQuint(phases.underwaterT);
  const s = easeInOutQuint(phases.sunsetT);

  const warmR = Math.round(lerp(255, 165, s * 0.28 + u * 0.35));
  const warmG = Math.round(lerp(210, 95, s * 0.22 + u * 0.42));
  const warmB = Math.round(lerp(175, 75, s * 0.15 + u * 0.48));
  const opacity = lerp(0.04, 0.22, u) + s * 0.035;

  return {
    background: `linear-gradient(
      180deg,
      rgba(${warmR},${warmG},${warmB},${opacity * 0.3}) 0%,
      rgba(8,20,30,${opacity * 0.45}) 42%,
      rgba(2,6,10,${opacity * 0.75}) 100%
    )`,
    mixBlendMode: "multiply",
    opacity: 1,
    transition: "background 2.8s ease-in-out",
  };
}

export const OCEAN_VIDEO_SOURCES = {
  shore: "/assets/ocean/videos/sunset-shore.mp4",
} as const;
