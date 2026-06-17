import { FrameSequencePlayer } from "@/components/journey/FrameSequencePlayer";
import { useJourneyScroll } from "@/context/JourneyScrollContext";
import { useJourneyAssets } from "@/hooks/useJourneyAssets";
import { useTranslation } from "@/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

export function JourneyPreloader() {
  const { t } = useTranslation();
  const reducedMotion = usePrefersReducedMotion();
  const { experienceReady, setExperienceReady } = useJourneyScroll();
  const { frames, progress, allReady } = useJourneyAssets();
  const [phase, setPhase] = useState<
    "loading" | "playing" | "revealing" | "done"
  >("loading");
  const [playFrames, setPlayFrames] = useState(false);

  useEffect(() => {
    if (!allReady || phase !== "loading") return;
    if (reducedMotion) {
      setPhase("revealing");
      return;
    }
    setPhase("playing");
    setPlayFrames(true);
  }, [allReady, phase, reducedMotion]);

  const handleSequenceComplete = useCallback(() => {
    setPhase("revealing");
  }, []);

  useEffect(() => {
    if (phase !== "revealing") return;
    const delay = reducedMotion ? 280 : 1000;
    const timer = window.setTimeout(() => {
      setPhase("done");
      setExperienceReady(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [phase, reducedMotion, setExperienceReady]);

  const visible = !experienceReady && phase !== "done";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#020608]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0.3 : 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-busy={!allReady}
          aria-label={t.preloader.loading}
        >
          <motion.div
            className="flex flex-col items-center gap-8"
            animate={
              phase === "revealing"
                ? { opacity: 0, scale: 1.04, filter: "blur(6px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{
              duration: reducedMotion ? 0.28 : 0.85,
              ease: "easeInOut",
            }}
          >
            {frames.length > 0 ? (
              <FrameSequencePlayer
                frames={frames}
                playing={playFrames && phase === "playing"}
                fps={24}
                onComplete={handleSequenceComplete}
                className="drop-shadow-[0_0_40px_rgba(255,140,60,0.25)]"
              />
            ) : (
              <div
                className="rounded-full border border-white/10"
                style={{
                  width: "min(72vw, 280px)",
                  height: "min(72vw, 280px)",
                }}
              />
            )}

            <div className="flex flex-col items-center gap-3 w-48">
              <div className="w-full h-px bg-white/10 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--ocean-sunset)] to-[var(--ocean-sunset-bright)] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.25 }}
                />
              </div>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50"
                aria-live="polite"
              >
                {allReady
                  ? t.preloader.enter
                  : `${t.preloader.loading} ${progress}%`}
              </p>
            </div>
          </motion.div>

          {phase === "revealing" && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(2,6,8,0.4) 55%, #020608 100%)",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
