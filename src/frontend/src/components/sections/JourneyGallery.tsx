import { JourneyStation } from "@/components/journey/JourneyStation";
import { GALLERY_ITEMS } from "@/data/galleryContent";
import { useJourneyScroll } from "@/context/JourneyScrollContext";
import { useTranslation } from "@/i18n";
import { JOURNEY_FOCUS_RING } from "@/lib/layout";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function GallerySlide({
  id,
  src,
  featured,
  placeholder,
}: (typeof GALLERY_ITEMS)[number]) {
  const { t } = useTranslation();
  const item = t.gallery.items[id as keyof typeof t.gallery.items];

  return (
    <figure
      data-gallery-id={id}
      className={`gallery-slide relative shrink-0 overflow-hidden rounded-2xl border border-[var(--ocean-border-subtle)] bg-[var(--ocean-card-bg)] ${
        featured
          ? "w-[min(88vw,42rem)] aspect-[16/10]"
          : "w-[min(74vw,22rem)] aspect-[4/5]"
      }`}
    >
      <img
        src={src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        width={featured ? 672 : 352}
        height={featured ? 420 : 440}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ocean-card-bg)]/95 via-[var(--ocean-card-bg)]/25 to-transparent" />
      {placeholder ? (
        <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full bg-black/50 text-[var(--ocean-sunset)]/90 border border-white/10">
          {t.gallery.placeholderLabel}
        </span>
      ) : null}
      <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        {item.tag ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ocean-sunset)]/80 mb-1.5">
            {item.tag}
          </p>
        ) : null}
        <p className="text-sm sm:text-[15px] text-[var(--ocean-text)] font-medium leading-snug">
          {item.caption}
        </p>
      </figcaption>
    </figure>
  );
}

export function JourneyGallery() {
  const { t } = useTranslation();
  const { reducedMotion } = useJourneyScroll();
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripInnerRef = useRef<HTMLDivElement>(null);
  const manualStripRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = GALLERY_ITEMS.length;

  const measureStrip = useCallback(() => {
    const viewport = viewportRef.current;
    const strip = stripInnerRef.current;
    if (!viewport || !strip) return;
    setMaxTranslate(Math.max(0, strip.scrollWidth - viewport.clientWidth));
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    measureStrip();
    const viewport = viewportRef.current;
    const strip = stripInnerRef.current;
    if (!viewport || !strip) return;

    const observer = new ResizeObserver(measureStrip);
    observer.observe(viewport);
    observer.observe(strip);
    window.addEventListener("resize", measureStrip);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureStrip);
    };
  }, [measureStrip, reducedMotion]);

  const updateActiveFromTranslate = useCallback((tx: number) => {
    const strip = stripInnerRef.current;
    if (!strip) return;
    const slides = strip.querySelectorAll<HTMLElement>("[data-gallery-id]");
    if (!slides.length) return;

    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;
    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - tx);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });
    setActiveIndex(closest);
  }, []);

  const updateActiveFromManualScroll = useCallback(() => {
    const strip = manualStripRef.current;
    if (!strip) return;
    const slides = strip.querySelectorAll<HTMLElement>("[data-gallery-id]");
    if (!slides.length) return;

    const stripCenter = strip.scrollLeft + strip.clientWidth / 2;
    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(stripCenter - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const updateFromScroll = () => {
      const track = trackRef.current;
      if (!track || maxTranslate <= 0) {
        setTranslateX(0);
        setScrollProgress(0);
        setActiveIndex(0);
        return;
      }

      const rect = track.getBoundingClientRect();
      const scrollRange = Math.max(1, track.offsetHeight - window.innerHeight);
      const scrolled = Math.min(scrollRange, Math.max(0, -rect.top));
      const progress = scrolled / scrollRange;
      const tx = progress * maxTranslate;

      setScrollProgress(progress);
      setTranslateX(tx);
      updateActiveFromTranslate(tx);
    };

    window.addEventListener("scroll", updateFromScroll, { passive: true });
    updateFromScroll();
    return () => window.removeEventListener("scroll", updateFromScroll);
  }, [maxTranslate, reducedMotion, updateActiveFromTranslate]);

  useEffect(() => {
    if (!reducedMotion) return;
    const strip = manualStripRef.current;
    if (!strip) return;
    strip.addEventListener("scroll", updateActiveFromManualScroll, {
      passive: true,
    });
    updateActiveFromManualScroll();
    return () =>
      strip.removeEventListener("scroll", updateActiveFromManualScroll);
  }, [reducedMotion, updateActiveFromManualScroll]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (reducedMotion) {
        const strip = manualStripRef.current;
        if (!strip) return;
        const slide = strip.querySelector<HTMLElement>(
          `[data-gallery-id="${GALLERY_ITEMS[index]?.id}"]`,
        );
        if (!slide) return;
        slide.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
        return;
      }

      const strip = stripInnerRef.current;
      const track = trackRef.current;
      if (!strip || !track || maxTranslate <= 0) return;
      const slide = strip.querySelector<HTMLElement>(
        `[data-gallery-id="${GALLERY_ITEMS[index]?.id}"]`,
      );
      if (!slide) return;

      const progress = clamp01(slide.offsetLeft / maxTranslate);
      const scrollRange = Math.max(1, track.offsetHeight - window.innerHeight);
      const rect = track.getBoundingClientRect();
      const trackDocTop = rect.top + window.scrollY;
      const targetY = trackDocTop + progress * scrollRange;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    },
    [maxTranslate, reducedMotion],
  );

  const goPrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const goNext = () => scrollToIndex(Math.min(total - 1, activeIndex + 1));

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  }

  const positionLabel = t.gallery.position
    .replace("{current}", String(activeIndex + 1))
    .replace("{total}", String(total));

  const trackHeight =
    !reducedMotion && maxTranslate > 0
      ? `calc(100dvh + ${maxTranslate}px)`
      : undefined;

  const carousel = (
    <div className="gallery-carousel relative">
      <div
        className="gallery-strip-edge gallery-strip-edge-left pointer-events-none"
        aria-hidden
      />
      <div
        className="gallery-strip-edge gallery-strip-edge-right pointer-events-none"
        aria-hidden
      />

      {reducedMotion ? (
        <div
          ref={manualStripRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="gallery-cinematic-strip -mx-[var(--section-px)] flex gap-4 sm:gap-5 overflow-x-auto overscroll-x-contain px-[var(--section-px)] pb-3 snap-x snap-mandatory scroll-px-[var(--section-px)] cursor-grab active:cursor-grabbing"
          role="region"
          aria-roledescription="carousel"
          aria-label={t.gallery.stripLabel}
        >
          {GALLERY_ITEMS.map((item) => (
            <GallerySlide key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div
          ref={viewportRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="gallery-cinematic-viewport -mx-[var(--section-px)] overflow-hidden px-[var(--section-px)] pb-3"
          role="region"
          aria-roledescription="carousel"
          aria-label={t.gallery.stripLabel}
        >
          <div
            ref={stripInnerRef}
            className="gallery-cinematic-strip-inner flex gap-4 sm:gap-5 will-change-transform"
            style={{ transform: `translate3d(-${translateX}px, 0, 0)` }}
          >
            {GALLERY_ITEMS.map((item) => (
              <GallerySlide key={item.id} {...item} />
            ))}
          </div>
        </div>
      )}

      <div
        className="gallery-scroll-progress mt-4 h-0.5 rounded-full bg-white/10 overflow-hidden"
        aria-hidden
      >
        <div
          className="gallery-scroll-progress-fill h-full rounded-full origin-left transition-none"
          style={{
            transform: `scaleX(${reducedMotion ? (activeIndex + 1) / total : scrollProgress || (activeIndex + 1) / total})`,
          }}
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIndex === 0}
            className={`gallery-nav-btn min-w-11 min-h-11 flex items-center justify-center rounded-full border border-white/15 text-[var(--ocean-text)] hover:bg-white/8 disabled:opacity-35 disabled:pointer-events-none transition-colors duration-200 cursor-pointer ${JOURNEY_FOCUS_RING}`}
            aria-label={t.gallery.prev}
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex >= total - 1}
            className={`gallery-nav-btn min-w-11 min-h-11 flex items-center justify-center rounded-full border border-white/15 text-[var(--ocean-text)] hover:bg-white/8 disabled:opacity-35 disabled:pointer-events-none transition-colors duration-200 cursor-pointer ${JOURNEY_FOCUS_RING}`}
            aria-label={t.gallery.next}
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <p
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ocean-text-dim)]"
          aria-live="polite"
        >
          {positionLabel}
        </p>
      </div>

      <p
        id="gallery-scroll-hint"
        className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ocean-text-dim)] mt-3"
      >
        {t.gallery.scrollHint}
      </p>
    </div>
  );

  return (
    <JourneyStation
      id="gallery"
      theme="surface"
      className="!min-h-0 !py-0 !items-stretch !justify-start"
    >
      <div
        ref={trackRef}
        className="gallery-scroll-track"
        style={trackHeight ? { height: trackHeight } : undefined}
      >
        <div className="sticky top-0 min-h-[100dvh] flex flex-col justify-center py-[max(5rem,calc(4rem+env(safe-area-inset-bottom)))] sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.75 }}
          >
            <p className="journey-eyebrow">{t.gallery.label}</p>
            <h2 className="journey-title">
              {t.gallery.titleLight}{" "}
              <span className="journey-title-accent">
                {t.gallery.titleAccent}
              </span>
            </h2>

            <div className="journey-section-divider" aria-hidden>
              <Camera
                className="journey-section-divider-icon w-4 h-4"
                strokeWidth={1.5}
              />
            </div>

            <p className="journey-lead journey-section-lead">{t.gallery.lead}</p>

            {carousel}
          </motion.div>
        </div>
      </div>
    </JourneyStation>
  );
}
