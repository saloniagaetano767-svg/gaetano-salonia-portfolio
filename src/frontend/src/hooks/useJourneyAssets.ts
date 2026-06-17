import { isWebglReady, onWebglReady } from "@/lib/journeyReady";
import { usePrefersReducedMotion } from "@/lib/motion";
import {
  PRELOADER_FRAME_COUNT,
  generatePreloaderFrames,
} from "@/lib/preloaderFrames";
import { useEffect, useState } from "react";

const WATER_NORMALS = "/assets/ocean/waternormals.jpg";

export interface JourneyAssetsState {
  frames: HTMLCanvasElement[];
  progress: number;
  framesReady: boolean;
  texturesReady: boolean;
  webglReady: boolean;
  allReady: boolean;
}

export function useJourneyAssets(): JourneyAssetsState {
  const reducedMotion = usePrefersReducedMotion();
  const frameCount = reducedMotion ? 12 : PRELOADER_FRAME_COUNT;
  const [frames, setFrames] = useState<HTMLCanvasElement[]>([]);
  const [framesReady, setFramesReady] = useState(false);
  const [texturesReady, setTexturesReady] = useState(false);
  const [webglReady, setWebglReady] = useState(isWebglReady());

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      const generated = generatePreloaderFrames(frameCount);
      if (!cancelled) {
        setFrames(generated);
        setFramesReady(true);
      }
    };
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(run, { timeout: 120 });
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
      };
    }
    const id = window.setTimeout(run, 0);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [frameCount]);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setTexturesReady(true);
    };
    img.onerror = () => {
      if (!cancelled) setTexturesReady(true);
    };
    img.src = WATER_NORMALS;
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => onWebglReady(() => setWebglReady(true)), []);

  const frameProgress = framesReady ? 1 : 0;
  const textureProgress = texturesReady ? 1 : 0;
  const glProgress = webglReady ? 1 : 0;
  const progress = Math.round(
    ((frameProgress + textureProgress + glProgress) / 3) * 100,
  );
  const allReady = framesReady && texturesReady && webglReady;

  return {
    frames,
    progress,
    framesReady,
    texturesReady,
    webglReady,
    allReady,
  };
}
