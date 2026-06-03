import { useMouseParallax, usePrefersReducedMotion } from "@/lib/motion";
import type { SiteTheme } from "@/lib/theme";
import { useSiteTheme } from "@/lib/useSiteTheme";
import { useEffect, useState } from "react";

const AVATAR_BY_THEME: Record<SiteTheme, string> = {
  dark: "/assets/images/avatar_dark.png",
  light: "/assets/images/avatar_light.png",
};
const FALLBACK_SRC = "/assets/images/placeholder.svg";

export function AvatarPortrait() {
  const reducedMotion = usePrefersReducedMotion();
  const theme = useSiteTheme();
  const avatarSrc = AVATAR_BY_THEME[theme];
  const [src, setSrc] = useState(avatarSrc);

  useEffect(() => {
    setSrc(avatarSrc);
  }, [avatarSrc]);
  const { ref, transform } = useMouseParallax<HTMLDivElement>({
    enabled: !reducedMotion,
    maxTilt: 6,
  });

  return (
    <div
      ref={ref}
      className="group relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto transition-transform duration-200 ease-out cursor-default"
      style={{ transform }}
      data-ocid="hero.avatar"
    >
      <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-xl opacity-60 avatar-rim-glow" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl surface-border avatar-rim-glow avatar-haunt-frame">
        <img
          src={src}
          alt="Portrait of Gaetano Salonia"
          className="relative z-10 w-full h-full object-cover object-[center_15%] avatar-haunt-base"
          width={480}
          height={600}
          loading="eager"
          decoding="async"
          onError={() => setSrc(FALLBACK_SRC)}
        />
        {!reducedMotion && (
          <>
            <img
              src={src}
              alt=""
              aria-hidden
              className="avatar-haunt-ghost absolute inset-0 w-full h-full object-cover object-[center_15%] pointer-events-none z-20"
              width={480}
              height={600}
            />
            <div
              className="avatar-haunt-chroma-left pointer-events-none"
              aria-hidden
            />
            <div
              className="avatar-haunt-chroma-right pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-0 animate-[blink_6s_ease-in-out_infinite] z-30"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 38%, var(--vignette) 42%, transparent 46%)",
              }}
              aria-hidden
            />
          </>
        )}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background:
              "linear-gradient(to top, var(--vignette) 0%, transparent 40%)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
