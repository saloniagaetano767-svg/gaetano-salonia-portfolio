import { useMouseParallax, usePrefersReducedMotion } from "@/lib/motion";
import { useEffect, useState } from "react";

const HORIZON_SRC = "/assets/images/avatar_light.png";
const FALLBACK_SRC = "/assets/images/placeholder.svg";

interface AvatarPortraitProps {
  variant?: "horizon" | "default";
}

export function AvatarPortrait({ variant = "horizon" }: AvatarPortraitProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [src, setSrc] = useState(HORIZON_SRC);
  const { ref, transform } = useMouseParallax<HTMLDivElement>({
    enabled: !reducedMotion,
    maxTilt: variant === "horizon" ? 5 : 6,
  });

  useEffect(() => {
    setSrc(HORIZON_SRC);
  }, []);

  return (
    <div
      ref={ref}
      className="group relative w-full transition-transform duration-200 ease-out"
      style={{ transform }}
      data-ocid="avatar.portrait"
    >
      <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[var(--ocean-sunset)]/25 to-[var(--ocean-teal)]/15 blur-xl opacity-70" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <img
          src={src}
          alt="Portrait of Gaetano Salonia"
          className="relative z-10 w-full h-full object-cover object-[center_15%]"
          width={480}
          height={600}
          loading="lazy"
          decoding="async"
          onError={() => setSrc(FALLBACK_SRC)}
        />
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background:
              "linear-gradient(to top, rgba(10,22,40,0.55) 0%, transparent 45%)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
