import { JourneyStation } from "@/components/journey/JourneyStation";
import { GALLERY_ITEMS } from "@/data/galleryContent";
import { useTranslation } from "@/i18n";
import { JOURNEY_FOCUS_RING } from "@/lib/layout";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

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
      className={`gallery-slide relative shrink-0 snap-center overflow-hidden rounded-2xl border border-[var(--ocean-border-subtle)] bg-[var(--ocean-card-bg)] ${
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
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = GALLERY_ITEMS.length;

  const updateActiveIndex = useCallback(() => {
    const strip = stripRef.current;
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
    const strip = stripRef.current;
    if (!strip) return;
    strip.addEventListener("scroll", updateActiveIndex, { passive: true });
    updateActiveIndex();
    return () => strip.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToIndex = useCallback((index: number) => {
    const strip = stripRef.current;
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
  }, []);

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

  return (
    <JourneyStation id="gallery" theme="surface" compact>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.75 }}
      >
        <p className="journey-eyebrow">{t.gallery.label}</p>
        <h2 className="journey-title">
          {t.gallery.titleLight}{" "}
          <span className="journey-title-accent">{t.gallery.titleAccent}</span>
        </h2>

        <div className="journey-section-divider" aria-hidden>
          <Camera
            className="journey-section-divider-icon w-4 h-4"
            strokeWidth={1.5}
          />
        </div>

        <p className="journey-lead journey-section-lead">{t.gallery.lead}</p>

        <div className="gallery-carousel relative">
          <div
            className="gallery-strip-edge gallery-strip-edge-left pointer-events-none"
            aria-hidden
          />
          <div
            className="gallery-strip-edge gallery-strip-edge-right pointer-events-none"
            aria-hidden
          />

          <div
            ref={stripRef}
            data-lenis-prevent
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
      </motion.div>
    </JourneyStation>
  );
}
