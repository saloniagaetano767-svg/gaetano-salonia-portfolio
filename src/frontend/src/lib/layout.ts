/** Shared layout tokens for page sections. */
export const SECTION_CONTAINER =
  "max-w-[1100px] mx-auto px-6 sm:px-8 py-20 sm:py-[90px]" as const;

export const SECTION_EYEBROW =
  "font-mono text-[11px] text-primary tracking-[0.14em] uppercase mb-3.5" as const;

export const SECTION_TITLE =
  "font-display font-extrabold text-[clamp(34px,5vw,52px)] tracking-tight leading-tight" as const;

export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" as const;

/** High-contrast focus ring for the ocean journey (dark canvas). */
export const JOURNEY_FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ocean-sunset)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061018]" as const;

export const JOURNEY_CTA_PRIMARY =
  "font-semibold text-sm px-6 py-3 min-h-11 rounded-full bg-[var(--ocean-sunset)] text-[var(--ocean-cta-text)] hover:bg-[var(--ocean-sunset-bright)] transition-colors duration-200 cursor-pointer" as const;

export const JOURNEY_CTA_SECONDARY =
  "font-semibold text-sm px-6 py-3 min-h-11 rounded-full border border-white/25 text-[var(--ocean-text)] hover:bg-white/8 hover:border-white/35 transition-colors duration-200 cursor-pointer" as const;
