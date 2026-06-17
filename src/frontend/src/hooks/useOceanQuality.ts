import { useEffect, useState } from "react";

export type OceanQualityTier = "high" | "medium" | "low";

export function useOceanQualityTier(): OceanQualityTier {
  const [tier, setTier] = useState<OceanQualityTier>(() => detectTier());

  useEffect(() => {
    const onResize = () => setTier(detectTier());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return tier;
}

function detectTier(): OceanQualityTier {
  if (typeof window === "undefined") return "medium";
  const w = window.innerWidth;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 4;
  if (w < 480 || (mem !== undefined && mem < 4) || cores < 4) return "low";
  if (w < 900) return "medium";
  return "high";
}

export function tierIsSimplified(tier: OceanQualityTier): boolean {
  return tier === "low";
}
