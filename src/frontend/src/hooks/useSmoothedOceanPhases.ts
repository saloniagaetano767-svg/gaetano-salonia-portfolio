import {
  type OceanPhases,
  type OceanProgressInput,
  OCEAN_CAMERA_DAMP,
  OCEAN_PHASE_DAMP,
  computeOceanPhases,
  createInitialOceanPhases,
  lerpOceanPhases,
} from "@/components/ocean/oceanPhases";
import { useJourneyScroll } from "@/context/JourneyScrollContext";
import { useEffect, useMemo, useRef, useState } from "react";

export function useSmoothedOceanPhases(target: OceanPhases): OceanPhases {
  const smoothedRef = useRef<OceanPhases>(target);
  const targetRef = useRef(target);
  const [, setFrame] = useState(0);

  targetRef.current = target;

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const next = lerpOceanPhases(
        smoothedRef.current,
        targetRef.current,
        OCEAN_PHASE_DAMP,
        OCEAN_CAMERA_DAMP,
      );
      smoothedRef.current = next;
      setFrame((f) => (f + 1) % 10000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return smoothedRef.current;
}

export function useOceanPhasesFromScroll(): OceanPhases {
  const { pageProgress, introProgress, introEndRatio, experienceReady } =
    useJourneyScroll();

  const target = useMemo(
    () =>
      computeOceanPhases({
        introProgress,
        pageProgress,
        introEndRatio,
        experienceReady,
      }),
    [introProgress, pageProgress, introEndRatio, experienceReady],
  );

  return useSmoothedOceanPhases(target);
}

export function useOceanPhasesFromInput(input: OceanProgressInput): OceanPhases {
  const target = useMemo(() => computeOceanPhases(input), [input]);
  return useSmoothedOceanPhases(target);
}

export function useOceanPhasesTarget(): OceanPhases {
  const { pageProgress, introProgress, introEndRatio, experienceReady } =
    useJourneyScroll();

  return useMemo(
    () =>
      computeOceanPhases({
        introProgress,
        pageProgress,
        introEndRatio,
        experienceReady,
      }),
    [introProgress, pageProgress, introEndRatio, experienceReady],
  );
}

export { createInitialOceanPhases };
