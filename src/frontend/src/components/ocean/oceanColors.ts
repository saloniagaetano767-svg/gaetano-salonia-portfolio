import type { JourneyAct, OceanPhases } from "./oceanPhases";

function lerpColor(a: string, b: string, t: number): string {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    return [
      Number.parseInt(h.slice(0, 2), 16),
      Number.parseInt(h.slice(2, 4), 16),
      Number.parseInt(h.slice(4, 6), 16),
    ] as const;
  };
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const bl = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

/** Sky gradient for static fallback only. */
export function skyGradientAt(sunsetT: number): string {
  const p = Math.min(1, Math.max(0, sunsetT));
  const top = lerpColor("#1e4a78", "#0c1445", p * 0.65);
  const midHigh = lerpColor("#5aa0d0", "#ff6b35", p * 0.85);
  const mid = lerpColor("#ffb347", "#d44a72", p * 0.9);
  const low = lerpColor("#ffd9b0", "#4a2868", p);
  const haze = lerpColor("#ffe8cc", "#061018", p * 0.95);
  return `linear-gradient(180deg, ${top} 0%, ${midHigh} 20%, ${mid} 40%, ${low} 58%, ${haze} 78%, #061018 100%)`;
}

/** Full-scene backdrop for CSS static fallback only. */
export function sceneBackdropAt(phases: OceanPhases): string {
  const deep = lerpColor("#031018", "#000306", phases.underwater);
  const mid = lerpColor("#0a3048", "#010408", phases.underwater);
  const surface = lerpColor("#1a5a72", "#041018", phases.underwater * 0.55);

  if (phases.skyOpacity > 0.02) {
    const sky = skyGradientAt(phases.sunsetT);
    const waterBand = `linear-gradient(180deg, transparent 52%, ${surface} 72%, ${mid} 88%, ${deep} 100%)`;
    return `${waterBand}, ${sky}`;
  }

  const u = phases.underwaterT;
  return `linear-gradient(180deg, ${surface} 0%, ${mid} ${38 + u * 12}%, ${deep} 100%)`;
}

/** Symbolic depth 0–100 tied to the three journey acts. */
export function depthProgress(phases: OceanPhases): number {
  return clamp01(phases.depthSymbolic / 100);
}

export function depthPhaseLabel(
  phases: OceanPhases,
  labels: { sunset: string; sea: string; reef: string },
): string {
  const map: Record<JourneyAct, string> = {
    sunset: labels.sunset,
    sea: labels.sea,
    reef: labels.reef,
  };
  return map[phases.journeyAct];
}
