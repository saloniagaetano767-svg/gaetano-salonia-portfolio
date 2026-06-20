import {
  computeOceanPhases,
  journeyActToVisualPhase,
} from "@/components/ocean/oceanPhases";
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
  "intro",
  "about",
  "gallery",
  "skills",
  "milestones",
  "contact",
] as const;

export type PageSection = (typeof PAGE_SECTIONS)[number];

export type VisualPhase =
  | "loading"
  | "sunset"
  | "surface"
  | "underwater"
  | "deep";

interface JourneyScrollContextValue {
  scrollProgress: number;
  pageProgress: number;
  introProgress: number;
  introEndRatio: number;
  activeSection: PageSection;
  visualPhase: VisualPhase;
  experienceReady: boolean;
  reducedMotion: boolean;
  scrollLocked: boolean;
  setExperienceReady: (ready: boolean) => void;
  scrollToSection: (id: PageSection | string) => void;
}

const JourneyScrollContext = createContext<JourneyScrollContextValue | null>(
  null,
);

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function computeIntroProgress(scrollY: number): {
  introProgress: number;
  introEndRatio: number;
} {
  const intro = document.getElementById("intro");
  if (!intro) return { introProgress: 0, introEndRatio: 0.22 };

  const introTop = intro.offsetTop;
  const introHeight = intro.offsetHeight;
  const scrollable = Math.max(1, introHeight - window.innerHeight);
  const introProgress = clamp01((scrollY - introTop) / scrollable);

  const docMax = document.documentElement.scrollHeight - window.innerHeight;
  const introEndRatio =
    docMax > 0 ? clamp01((introTop + scrollable) / docMax) : 0.22;

  return { introProgress, introEndRatio };
}

export function JourneyScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [introProgress, setIntroProgress] = useState(0);
  const [introEndRatio, setIntroEndRatio] = useState(0.22);
  const [activeSection, setActiveSection] = useState<PageSection>("intro");
  const [experienceReady, setExperienceReady] = useState(reducedMotion);
  const lenisRef = useRef<Lenis | null>(null);

  const scrollLocked = !experienceReady;

  const updateScrollMetrics = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = lenisRef.current?.scroll ?? window.scrollY;
    const pageProgress = max > 0 ? clamp01(y / max) : 0;
    const intro = computeIntroProgress(y);
    setScrollProgress(pageProgress);
    setIntroProgress(intro.introProgress);
    setIntroEndRatio(intro.introEndRatio);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.activeSection = activeSection;
    return () => {
      delete document.documentElement.dataset.activeSection;
    };
  }, [activeSection]);

  useEffect(() => {
    document.documentElement.style.overflow = scrollLocked ? "hidden" : "";
    const lenis = lenisRef.current;
    if (lenis) {
      if (scrollLocked) lenis.stop();
      else lenis.start();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [scrollLocked]);

  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      const onScroll = () => updateScrollMetrics();
      window.addEventListener("scroll", onScroll, { passive: true });
      updateScrollMetrics();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 2.9,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 0.95,
    });
    document.documentElement.classList.add("lenis", "lenis-smooth");
    lenisRef.current = lenis;

    const onLenisScroll = () => updateScrollMetrics();
    lenis.on("scroll", onLenisScroll);
    updateScrollMetrics();

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
  }, [reducedMotion, updateScrollMetrics]);

  useEffect(() => {
    let observer: ResizeObserver | null = null;
    let pollId: number | undefined;

    const attach = () => {
      const intro = document.getElementById("intro");
      if (!intro) return false;
      observer?.disconnect();
      observer = new ResizeObserver(() => updateScrollMetrics());
      observer.observe(intro);
      observer.observe(document.documentElement);
      updateScrollMetrics();
      return true;
    };

    if (!attach()) {
      pollId = window.setInterval(() => {
        if (attach()) window.clearInterval(pollId);
      }, 120);
    }

    return () => {
      if (pollId) window.clearInterval(pollId);
      observer?.disconnect();
    };
  }, [updateScrollMetrics]);

  useEffect(() => {
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id) continue;
          ratios.set(id, entry.intersectionRatio);
        }

        let bestId: PageSection = "intro";
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
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
        rootMargin: "-18% 0px -32% 0px",
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
      lenis.scrollTo(el, { offset: -72, duration: 1.25 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    registerScrollToSection(scrollToSection);
    return () => unregisterScrollToSection();
  }, [scrollToSection]);

  const visualPhase = journeyActToVisualPhase(
    experienceReady,
    computeOceanPhases({
      introProgress,
      pageProgress: scrollProgress,
      introEndRatio,
      experienceReady,
    }).journeyAct,
  );

  const value = useMemo(
    () => ({
      scrollProgress,
      pageProgress: scrollProgress,
      introProgress,
      introEndRatio,
      activeSection,
      visualPhase,
      experienceReady,
      reducedMotion,
      scrollLocked,
      setExperienceReady,
      scrollToSection,
    }),
    [
      scrollProgress,
      introProgress,
      introEndRatio,
      activeSection,
      visualPhase,
      experienceReady,
      reducedMotion,
      scrollLocked,
      scrollToSection,
    ],
  );

  return (
    <JourneyScrollContext.Provider value={value}>
      {children}
    </JourneyScrollContext.Provider>
  );
}

export function useJourneyScroll(): JourneyScrollContextValue {
  const ctx = useContext(JourneyScrollContext);
  if (!ctx) {
    throw new Error(
      "useJourneyScroll must be used within JourneyScrollProvider",
    );
  }
  return ctx;
}
