import { useEffect, useRef, useState } from "react";
import type { OceanPhases } from "./oceanPhases";
import { OCEAN_VIDEO_SOURCES, videoLayerWeights } from "./oceanPalette";

interface OceanCinematicVideoProps {
  phases: OceanPhases;
  enabled: boolean;
  onReady?: () => void;
}

function VideoLayer({
  src,
  opacity,
  playbackRate = 1,
  filter,
  onCanPlay,
}: {
  src: string;
  opacity: number;
  playbackRate?: number;
  filter?: string;
  onCanPlay?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reported = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.playbackRate = playbackRate;
    if (opacity > 0.02) el.play().catch(() => {});
  }, [opacity, playbackRate]);

  return (
    <video
      ref={ref}
      src={src}
      className="absolute inset-0 h-full w-full object-cover"
      style={{
        opacity,
        transform: "scale(1.06)",
        filter: filter ?? "saturate(1.12) contrast(1.06) brightness(1.02)",
        transition: "opacity 2.4s cubic-bezier(0.45, 0, 0.15, 1), filter 2.8s ease-in-out",
        willChange: "opacity, filter",
      }}
      muted
      loop
      playsInline
      preload="auto"
      onCanPlayThrough={() => {
        if (reported.current) return;
        reported.current = true;
        onCanPlay?.();
      }}
      aria-hidden
    />
  );
}

export function OceanCinematicVideo({
  phases,
  enabled,
  onReady,
}: OceanCinematicVideoProps) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const weights = videoLayerWeights(phases);

  if (!enabled || failed) return null;

  const underFilter =
    "saturate(1.4) hue-rotate(188deg) brightness(0.38) contrast(1.18) blur(0.4px)";

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#061018]" aria-hidden>
      <VideoLayer
        src={OCEAN_VIDEO_SOURCES.shore}
        opacity={weights.shore}
        playbackRate={0.78}
        onCanPlay={() => {
          setReady(true);
          onReady?.();
        }}
      />
      <VideoLayer
        src={OCEAN_VIDEO_SOURCES.shore}
        opacity={weights.underwater * 0.95}
        playbackRate={0.62}
        filter={underFilter}
      />
      <video
        className="hidden"
        src={OCEAN_VIDEO_SOURCES.shore}
        onError={() => setFailed(true)}
        aria-hidden
      />
      {!ready && (
        <div className="absolute inset-0 bg-[#061018] animate-pulse" aria-hidden />
      )}
    </div>
  );
}
