import { useMouseParallax, usePrefersReducedMotion } from "@/lib/motion";
import { useState } from "react";

const AVATAR_SRC = "/assets/images/avatar.png";
const FALLBACK_SRC = "/assets/images/placeholder.svg";

export function AvatarPortrait() {
  const reducedMotion = usePrefersReducedMotion();
  const [src, setSrc] = useState(AVATAR_SRC);
  const { ref, transform } = useMouseParallax<HTMLDivElement>({
    enabled: !reducedMotion,
    maxTilt: 6,
  });

  return (
    <div
      ref={ref}
      className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto transition-transform duration-200 ease-out"
      style={{ transform }}
      data-ocid="hero.avatar"
    >
      <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-xl opacity-60 avatar-rim-glow" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 avatar-rim-glow">
        <img
          src={src}
          alt="Portrait of Gaetano Salonia"
          className="w-full h-full object-cover object-[center_15%]"
          width={480}
          height={600}
          loading="eager"
          decoding="async"
          onError={() => setSrc(FALLBACK_SRC)}
        />
        {!reducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none opacity-0 animate-[blink_6s_ease-in-out_infinite]"
            style={{
              background:
                "linear-gradient(to bottom, transparent 38%, rgba(7,11,20,0.15) 42%, transparent 46%)",
            }}
            aria-hidden
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(7,11,20,0.5) 0%, transparent 40%)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
