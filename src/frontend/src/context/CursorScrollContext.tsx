import {
  registerScrollToSection,
  unregisterScrollToSection,
  usePrefersReducedMotion,
} from "@/lib/motion";
import Lenis from "lenis";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const PAGE_SECTIONS = [
  "hero",
  "about",
  "work",
  "services",
  "contact",
] as const;

export type PageSection = (typeof PAGE_SECTIONS)[number];

export interface CursorPosition {
  x: number;
  y: number;
}

interface CursorScrollContextValue {
  cursor: CursorPosition;
  scrollProgress: number;
  activeSection: PageSection;
  reducedMotion: boolean;
  scrollToSection: (id: PageSection | string) => void;
}

const CursorScrollContext = createContext<CursorScrollContextValue | null>(
  null,
);

const LERP = 0.1;
const DEFAULT_CURSOR: CursorPosition = { x: 0.5, y: 0.5 };

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function CursorScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const [cursor, setCursor] = useState<CursorPosition>(DEFAULT_CURSOR);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<PageSection>("hero");

  const targetCursor = useRef<CursorPosition>(DEFAULT_CURSOR);
  const currentCursor = useRef<CursorPosition>(DEFAULT_CURSOR);
  const lenisRef = useRef<Lenis | null>(null);
  const rafId = useRef<number | null>(null);

  const updateScrollProgress = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = lenisRef.current?.scroll ?? window.scrollY;
    setScrollProgress(max > 0 ? clamp01(y / max) : 0);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.activeSection = activeSection;
    return () => {
      delete document.documentElement.dataset.activeSection;
    };
  }, [activeSection]);

  useEffect(() => {
    if (reducedMotion) {
      setCursor(DEFAULT_CURSOR);
      return;
    }

    const onMove = (e: MouseEvent) => {
      targetCursor.current = {
        x: clamp01(e.clientX / window.innerWidth),
        y: clamp01(e.clientY / window.innerHeight),
      };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const tick = () => {
      const tx = targetCursor.current.x;
      const ty = targetCursor.current.y;
      const cx = currentCursor.current.x;
      const cy = currentCursor.current.y;
      const nx = cx + (tx - cx) * LERP;
      const ny = cy + (ty - cy) * LERP;
      currentCursor.current = { x: nx, y: ny };

      if (Math.abs(nx - tx) > 0.0005 || Math.abs(ny - ty) > 0.0005) {
        setCursor({ x: nx, y: ny });
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      const onScroll = () => updateScrollProgress();
      window.addEventListener("scroll", onScroll, { passive: true });
      updateScrollProgress();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });
    document.documentElement.classList.add("lenis", "lenis-smooth");
    lenisRef.current = lenis;

    const onLenisScroll = () => updateScrollProgress();
    lenis.on("scroll", onLenisScroll);
    updateScrollProgress();

    const lenisRaf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(lenisRaf);
    };
    const lenisRafId = requestAnimationFrame(lenisRaf);

    return () => {
      cancelAnimationFrame(lenisRafId);
      lenis.off("scroll", onLenisScroll);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion, updateScrollProgress]);

  useEffect(() => {
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id) continue;
          ratios.set(id, entry.intersectionRatio);
        }

        let bestId: PageSection = "hero";
        let bestRatio = 0;
        for (const section of PAGE_SECTIONS) {
          const ratio = ratios.get(section) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = section;
          }
        }
        if (bestRatio > 0) setActiveSection(bestId);
      },
      {
        threshold: [0, 0.15, 0.35, 0.5, 0.65, 0.85, 1],
        rootMargin: "-20% 0px -35% 0px",
      },
    );

    for (const section of PAGE_SECTIONS) {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: PageSection | string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    registerScrollToSection(scrollToSection);
    return () => unregisterScrollToSection();
  }, [scrollToSection]);

  const value = useMemo(
    () => ({
      cursor,
      scrollProgress,
      activeSection,
      reducedMotion,
      scrollToSection,
    }),
    [cursor, scrollProgress, activeSection, reducedMotion, scrollToSection],
  );

  return (
    <CursorScrollContext.Provider value={value}>
      {children}
    </CursorScrollContext.Provider>
  );
}

export function useCursorScroll(): CursorScrollContextValue {
  const ctx = useContext(CursorScrollContext);
  if (!ctx) {
    throw new Error("useCursorScroll must be used within CursorScrollProvider");
  }
  return ctx;
}
