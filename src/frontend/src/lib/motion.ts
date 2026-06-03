import { useEffect, useRef, useState } from "react";

/** Generate a 3-letter project code from title words. */
export function projectCode(title: string): string {
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length >= 3) {
    return words
      .slice(0, 3)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");
  }
  if (words.length === 2) {
    return (words[0].slice(0, 2) + words[1][0]).toUpperCase().slice(0, 3);
  }
  return title
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 3)
    .toUpperCase()
    .padEnd(3, "X");
}

let scrollToSectionImpl: ((id: string) => void) | null = null;

export function registerScrollToSection(fn: (id: string) => void) {
  scrollToSectionImpl = fn;
}

export function unregisterScrollToSection() {
  scrollToSectionImpl = null;
}

export function scrollToSection(id: string) {
  if (scrollToSectionImpl) {
    scrollToSectionImpl(id);
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

interface UseMouseParallaxOptions {
  maxTilt?: number;
  enabled?: boolean;
}

/** Subtle mouse parallax for avatar (Phase 2 interactivity). */
export function useMouseParallax<T extends HTMLElement>({
  maxTilt = 8,
  enabled = true,
}: UseMouseParallaxOptions = {}) {
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState(
    "perspective(800px) rotateX(0deg) rotateY(0deg)",
  );

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotateY = dx * maxTilt;
      const rotateX = -dy * maxTilt;
      setTransform(
        `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      );
    };

    const onLeave = () => {
      setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, maxTilt]);

  return { ref, transform };
}
