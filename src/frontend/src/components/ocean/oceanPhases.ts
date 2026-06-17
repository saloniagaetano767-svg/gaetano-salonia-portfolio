function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Smooth hermite edge 0→1 between a and b. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Quintic ease — slower, more cinematic transitions. */
export function easeInOutQuint(x: number): number {
  const t = clamp01(x);
  return t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2;
}

/** Intro progress where sea-surface / underwater descent begins (~scroll hint). */
export const SURFACE_SCROLL_START = 0.38;

/** Intro progress where sunset act ends and sea act begins. */
export const SUNSET_ACT_END = 0.75;

/** Page progress where reef / contact act begins. */
export const REEF_ACT_START = 0.78;

export type JourneyAct = "sunset" | "sea" | "reef";

export interface OceanPhases {
  sunsetT: number;
  underwaterT: number;
  skyOpacity: number;
  underwater: number;
  beachOpacity: number;
  descent: number;
  cameraY: number;
  cameraZ: number;
  lookAtY: number;
  lookAtZ: number;
  fogStrength: number;
  sunHeight: number;
  journeyAct: JourneyAct;
  depthSymbolic: number;
  reefT: number;
  sunsetWeight: number;
  seaWeight: number;
  reefWeight: number;
}

export interface OceanProgressInput {
  introProgress: number;
  pageProgress: number;
  introEndRatio: number;
  experienceReady: boolean;
}

function remapProgress(value: number, start: number, end: number): number {
  if (end <= start) return 0;
  return easeInOutQuint(smoothstep(start, end, value));
}

export function journeyActFromWeights(
  sunsetWeight: number,
  seaWeight: number,
  reefWeight: number,
): JourneyAct {
  if (sunsetWeight >= seaWeight && sunsetWeight >= reefWeight) return "sunset";
  if (seaWeight >= reefWeight) return "sea";
  return "reef";
}

export function journeyActToVisualPhase(
  experienceReady: boolean,
  act: JourneyAct,
): "loading" | "sunset" | "surface" | "underwater" | "deep" {
  if (!experienceReady) return "loading";
  if (act === "sunset") return "sunset";
  if (act === "sea") return "underwater";
  return "deep";
}

/** Overlapping act blend weights for smooth crossfades. */
function computeActWeights(
  intro: number,
  page: number,
  reefPageStart: number,
  experienceReady: boolean,
): { sunsetWeight: number; seaWeight: number; reefWeight: number } {
  if (!experienceReady) {
    return { sunsetWeight: 1, seaWeight: 0, reefWeight: 0 };
  }

  const sunsetOut = easeInOutQuint(smoothstep(0.6, 0.88, intro));
  const seaIn = easeInOutQuint(smoothstep(0.62, 0.9, intro));
  const seaOut = easeInOutQuint(smoothstep(reefPageStart - 0.1, reefPageStart + 0.06, page));
  const reefIn = easeInOutQuint(smoothstep(reefPageStart - 0.08, reefPageStart + 0.14, page));

  const sunsetWeight = clamp01(1 - sunsetOut);
  const seaWeight = clamp01(seaIn * (1 - seaOut));
  const reefWeight = clamp01(reefIn);

  const sum = sunsetWeight + seaWeight + reefWeight || 1;
  return {
    sunsetWeight: sunsetWeight / sum,
    seaWeight: seaWeight / sum,
    reefWeight: reefWeight / sum,
  };
}

/**
 * Three-act scroll model: sunset (intro) → sea (main) → reef (contact/footer).
 */
export function computeOceanPhases({
  introProgress,
  pageProgress,
  introEndRatio,
  experienceReady,
}: OceanProgressInput): OceanPhases {
  const intro = clamp01(introProgress);
  const page = clamp01(pageProgress);
  const endRatio = clamp01(introEndRatio);

  const reefPageStart = Math.max(REEF_ACT_START, endRatio + 0.42);
  const { sunsetWeight, seaWeight, reefWeight } = computeActWeights(
    intro,
    page,
    reefPageStart,
    experienceReady,
  );
  const journeyAct = journeyActFromWeights(
    sunsetWeight,
    seaWeight,
    reefWeight,
  );

  const sunsetT = experienceReady
    ? easeInOutQuint(smoothstep(0, SUNSET_ACT_END + 0.05, intro))
    : 0;

  const surfaceApproach = easeInOutQuint(smoothstep(0, SURFACE_SCROLL_START, intro));
  const introSubmerge = easeInOutQuint(
    smoothstep(SURFACE_SCROLL_START, 0.99, intro),
  );
  const pageSubmerge = remapProgress(page, endRatio * 0.85, reefPageStart + 0.04);
  const underwaterT = experienceReady
    ? clamp01(introSubmerge * 0.4 + pageSubmerge * 0.6)
    : 0;

  const reefT = experienceReady
    ? easeInOutQuint(smoothstep(reefPageStart - 0.06, 0.99, page))
    : 0;

  const depthFromActs =
    sunsetWeight * 15 +
    seaWeight * 50 +
    reefWeight * 85 +
    underwaterT * 12 +
    reefT * 8;
  const depthSymbolic = experienceReady ? clamp01(depthFromActs / 100) * 100 : 0;

  const skyOpacity = clamp01(
    sunsetWeight * 0.85 +
      seaWeight * 0.35 * (1 - underwaterT * 0.5) +
      reefWeight * 0.08,
  );
  const underwater = easeInOutQuint(smoothstep(0.03, 0.92, underwaterT));
  const beachOpacity = clamp01(
    sunsetWeight * 0.95 +
      seaWeight * 0.25 * (1 - underwaterT * 0.6) +
      reefWeight * 0.02,
  );

  const descent = clamp01(sunsetT * 0.12 + underwaterT * 0.68 + reefT * 0.2);

  const shoreCameraY = lerp(3.2, 0.6, surfaceApproach);
  const shoreCameraZ = lerp(28, 18, surfaceApproach);
  const shoreLookY = lerp(2.9, 0.5, surfaceApproach);
  const shoreLookZ = lerp(-2800, -1200, surfaceApproach);

  const submerge = easeInOutQuint(smoothstep(0, 1, underwaterT));
  const seaCameraY = lerp(shoreCameraY, -4.8, submerge);
  const seaCameraZ = lerp(shoreCameraZ, 8, submerge);
  const seaLookY = lerp(shoreLookY, -1.8, submerge);
  const seaLookZ = lerp(shoreLookZ, -280, submerge);

  const reefCameraY = lerp(seaCameraY, -10.5, reefT);
  const reefCameraZ = lerp(seaCameraZ, 14, reefT);
  const reefLookY = lerp(seaLookY, -13.5, reefT);
  const reefLookZ = lerp(seaLookZ, -60, reefT);

  const fogStrength = easeInOutQuint(
    smoothstep(0.08, 0.96, underwaterT + reefT * 0.25),
  );
  const sunHeight = lerp(1, 0.02, sunsetT);

  return {
    sunsetT,
    underwaterT,
    skyOpacity,
    underwater,
    beachOpacity,
    descent,
    cameraY: reefCameraY,
    cameraZ: reefCameraZ,
    lookAtY: reefLookY,
    lookAtZ: reefLookZ,
    fogStrength,
    sunHeight,
    journeyAct,
    depthSymbolic,
    reefT,
    sunsetWeight,
    seaWeight,
    reefWeight,
  };
}

export const OCEAN_PHASE_DAMP = 0.042;
export const OCEAN_CAMERA_DAMP = 0.045;

export function lerpOceanPhases(
  current: OceanPhases,
  target: OceanPhases,
  damp: number,
  cameraDamp: number,
): OceanPhases {
  const l = (a: number, b: number, rate: number) => a + (b - a) * rate;
  const sunsetWeight = l(current.sunsetWeight, target.sunsetWeight, damp);
  const seaWeight = l(current.seaWeight, target.seaWeight, damp);
  const reefWeight = l(current.reefWeight, target.reefWeight, damp);

  return {
    sunsetT: l(current.sunsetT, target.sunsetT, damp),
    underwaterT: l(current.underwaterT, target.underwaterT, damp),
    skyOpacity: l(current.skyOpacity, target.skyOpacity, damp),
    underwater: l(current.underwater, target.underwater, damp),
    beachOpacity: l(current.beachOpacity, target.beachOpacity, damp),
    descent: l(current.descent, target.descent, damp),
    cameraY: l(current.cameraY, target.cameraY, cameraDamp),
    cameraZ: l(current.cameraZ, target.cameraZ, cameraDamp),
    lookAtY: l(current.lookAtY, target.lookAtY, cameraDamp),
    lookAtZ: l(current.lookAtZ, target.lookAtZ, cameraDamp),
    fogStrength: l(current.fogStrength, target.fogStrength, damp),
    sunHeight: l(current.sunHeight, target.sunHeight, damp),
    depthSymbolic: l(current.depthSymbolic, target.depthSymbolic, damp),
    reefT: l(current.reefT, target.reefT, damp),
    sunsetWeight,
    seaWeight,
    reefWeight,
    journeyAct: journeyActFromWeights(sunsetWeight, seaWeight, reefWeight),
  };
}

export function createInitialOceanPhases(): OceanPhases {
  return computeOceanPhases({
    introProgress: 0,
    pageProgress: 0,
    introEndRatio: 0.22,
    experienceReady: false,
  });
}
