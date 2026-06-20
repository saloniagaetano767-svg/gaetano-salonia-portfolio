import { JourneyStation } from "@/components/journey/JourneyStation";
import { SURFACE_SCROLL_START } from "@/components/ocean/oceanPhases";
import { useJourneyScroll } from "@/context/JourneyScrollContext";
import { useTranslation } from "@/i18n";
import {
  JOURNEY_CTA_PRIMARY,
  JOURNEY_CTA_SECONDARY,
  JOURNEY_FOCUS_RING,
} from "@/lib/layout";
import { motion } from "motion/react";

const heroTitleClass =
  "font-display font-extrabold text-[clamp(2.5rem,10vw,5.5rem)] leading-[0.95] tracking-tight text-[var(--ocean-text)] [text-shadow:0_2px_28px_rgba(0,0,0,0.6),0_0_80px_rgba(6,16,24,0.45)]";

export function JourneyIntro() {
  const { t } = useTranslation();
  const { experienceReady, introProgress, scrollToSection, reducedMotion } =
    useJourneyScroll();
  const hintOpacity =
    introProgress < SURFACE_SCROLL_START
      ? 1
      : Math.max(0, 1 - (introProgress - SURFACE_SCROLL_START) * 1.6);
  const contentFade = Math.max(0.4, 1 - introProgress * 0.55);
  const introHeightClass = reducedMotion
    ? "min-h-[140dvh]"
    : "min-h-[200dvh] md:min-h-[240dvh] lg:min-h-[270dvh]";

  const heroContent = (
    <>
      <p className="journey-eyebrow !mb-0 !text-[var(--ocean-sunset-bright)]/80 [text-shadow:0_1px_16px_rgba(0,0,0,0.55)]">
        {t.intro.greeting}
      </p>
      <h1 className={heroTitleClass}>
        <span className="block mb-1">{t.intro.nameLine1}</span>
        <span className="block text-[var(--ocean-sunset-bright)]">
          {t.intro.nameLine2}
        </span>
      </h1>
      <p className="text-[0.9375rem] sm:text-lg text-[var(--ocean-text-muted)] max-w-md mx-auto leading-relaxed px-2 [text-shadow:0_1px_20px_rgba(0,0,0,0.5)]">
        {t.intro.tagline}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        <a
          href="/cv.pdf"
          download
          className={`${JOURNEY_CTA_PRIMARY} ${JOURNEY_FOCUS_RING}`}
        >
          {t.intro.cv}
        </a>
        <button
          type="button"
          onClick={() => scrollToSection("gallery")}
          className={`${JOURNEY_CTA_SECONDARY} ${JOURNEY_FOCUS_RING}`}
        >
          {t.intro.viewGallery}
        </button>
      </div>
    </>
  );

  return (
    <JourneyStation
      id="intro"
      theme="sunset"
      className="!min-h-0 !py-0 !items-stretch !justify-start"
    >
      <div className={introHeightClass}>
        <div className="sticky top-0 h-[100dvh] flex flex-col px-[var(--section-px)] pt-[calc(var(--ocean-nav-height)+1.25rem)]">
          <div
            className="flex-1 flex items-center justify-center"
            style={{ opacity: contentFade }}
          >
            <div className="text-center w-full max-w-xl mx-auto space-y-5 sm:space-y-6">
              {experienceReady ? (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="space-y-5 sm:space-y-6"
                >
                  {heroContent}
                </motion.div>
              ) : (
                <div className="space-y-5 sm:space-y-6 opacity-90">
                  {heroContent}
                </div>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: experienceReady ? hintOpacity : 0 }}
            transition={{ duration: 0.6 }}
            className="shrink-0 pb-[max(10vh,env(safe-area-inset-bottom))] sm:pb-[11vh] flex flex-col items-center gap-3 sm:gap-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ocean-text-dim)] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
              {t.intro.scrollHint}
            </span>
            <div
              className="w-px h-10 sm:h-12 bg-gradient-to-b from-[var(--ocean-sunset)]/60 to-transparent motion-reduce:animate-none animate-pulse"
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
    </JourneyStation>
  );
}
