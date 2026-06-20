import { useJourneyScroll } from "@/context/JourneyScrollContext";
import { LanguageSwitcher, useTranslation } from "@/i18n";
import { JOURNEY_FOCUS_RING } from "@/lib/layout";
import { BRAND_MARK, INSTAGRAM_URL } from "@/lib/site";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SECTION_IDS = [
  "about",
  "gallery",
  "skills",
  "milestones",
  "contact",
] as const;

export function MinimalNav() {
  const { t } = useTranslation();
  const { activeSection, scrollToSection, experienceReady } =
    useJourneyScroll();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const navLinks = SECTION_IDS.map((id) => ({
    id,
    label: t.nav[id],
  }));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) menuButtonRef.current?.focus();
      return;
    }
    wasOpenRef.current = true;
    const firstLink = menuRef.current?.querySelector<HTMLElement>("button, a");
    firstLink?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNav = (id: string) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  const linkClass = (id: string) =>
    `text-[11px] uppercase tracking-[0.14em] font-medium transition-colors duration-200 px-1 py-2 min-h-11 cursor-pointer ${JOURNEY_FOCUS_RING} ${
      activeSection === id
        ? "text-[var(--ocean-sunset-bright)]"
        : "text-white/70 hover:text-white"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-500 pt-[env(safe-area-inset-top)] ${
        experienceReady ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 ocean-nav-scrim pointer-events-none" aria-hidden />

      <div className="relative px-[var(--section-px)] pointer-events-none">
        <div className="max-w-[1140px] mx-auto h-[var(--ocean-nav-height)] flex items-center justify-between gap-4 pointer-events-auto">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              ref={menuButtonRef}
              type="button"
              className={`lg:hidden min-w-11 min-h-11 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200 cursor-pointer ${JOURNEY_FOCUS_RING}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t.a11y.closeMenu : t.a11y.openMenu}
              aria-expanded={isOpen}
              aria-controls="journey-mobile-menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("intro")}
              className={`font-display font-extrabold text-lg sm:text-xl tracking-tight text-white shrink-0 cursor-pointer ${JOURNEY_FOCUS_RING}`}
              aria-label={t.a11y.home}
            >
              <span>{BRAND_MARK.replace(".", "")}</span>
              <span className="text-[var(--ocean-sunset)]">.</span>
            </button>
          </div>

          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2"
            aria-label={t.a11y.mainNav}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNav(link.id)}
                className={linkClass(link.id)}
                aria-current={activeSection === link.id ? "true" : undefined}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSwitcher className="hidden sm:flex" />
            {INSTAGRAM_URL ? (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden md:inline text-[11px] uppercase tracking-[0.12em] font-medium text-white/60 hover:text-white transition-colors duration-200 px-1 min-h-11 cursor-pointer ${JOURNEY_FOCUS_RING}`}
                aria-label={`${t.nav.instagram} (${t.a11y.opensInNewTab})`}
              >
                {t.nav.instagram}
              </a>
            ) : null}
            <a
              href="/cv.pdf"
              download
              className={`text-[10px] sm:text-[11px] uppercase tracking-[0.12em] font-semibold px-3 sm:px-3.5 py-1.5 sm:py-2 min-h-11 inline-flex items-center rounded-full border border-white/20 text-white/90 hover:bg-white/8 hover:border-white/30 transition-colors duration-200 cursor-pointer ${JOURNEY_FOCUS_RING}`}
            >
              {t.intro.cv}
            </a>
          </div>
        </div>

        {!isOpen ? null : (
          <div
            ref={menuRef}
            id="journey-mobile-menu"
            className="lg:hidden pointer-events-auto mx-[var(--section-px)] -mt-1 mb-3 rounded-2xl ocean-glass backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            <ul className="py-2 px-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.id)}
                    className={`block w-full text-left px-4 py-3.5 ${linkClass(link.id)}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="border-t border-white/8 mt-1 pt-3 px-4 pb-3 flex flex-wrap items-center justify-between gap-3">
                <LanguageSwitcher />
                {INSTAGRAM_URL && (
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[11px] uppercase tracking-wider text-white/55 hover:text-white/85 min-h-11 inline-flex items-center cursor-pointer ${JOURNEY_FOCUS_RING}`}
                    aria-label={`${t.nav.instagram} (${t.a11y.opensInNewTab})`}
                  >
                    {t.nav.instagram}
                  </a>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
