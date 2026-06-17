/** Shared Framer Motion presets for scroll reveals. */
export const revealUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" as const },
  transition: { duration: 0.8 },
} as const;

export const revealUpSoft = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8%" as const },
  transition: { duration: 0.7 },
} as const;
