import { useCursorScroll } from "@/context/CursorScrollContext";
import { LanguageSwitcher, useTranslation } from "@/i18n";
import { FOCUS_RING } from "@/lib/layout";
import { scrollToSection } from "@/lib/motion";
import { BRAND_MARK } from "@/lib/site";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const SECTION_IDS = ["about", "work", "services", "contact"] as const;

export function Navbar() {
  const { t } = useTranslation();
  const { activeSection } = useCursorScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = SECTION_IDS.map((id) => ({
    id,
    label: t.nav[id],
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  const linkClass = (id: string) =>
    `text-base font-medium tracking-wide bg-transparent border-none cursor-pointer font-body transition-colors ${FOCUS_RING} ${
      activeSection === id
        ? "text-primary"
        : "text-muted-foreground hover:text-primary"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 px-6 sm:px-8 flex items-center transition-all duration-300 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`}
    >
      <nav
        className="w-full max-w-[1100px] mx-auto flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className={`font-display font-extrabold text-xl tracking-tight ${FOCUS_RING}`}
          data-ocid="nav.home_link"
          aria-label="Home — Gaetano Salonia"
          onClick={() => scrollToSection("hero")}
        >
          <span className="grad-teal">{BRAND_MARK.replace(".", "")}</span>
          <span className="text-[var(--brand-dot)]">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={linkClass(link.id)}
                aria-current={activeSection === link.id ? "true" : undefined}
                data-ocid={`nav.${link.id}_link`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:flex" />
          <button
            type="button"
            className={`md:hidden min-w-11 min-h-11 p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors ${FOCUS_RING}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            data-ocid="nav.hamburger_toggle"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`md:hidden absolute top-16 left-0 right-0 overflow-hidden transition-all duration-300 nav-scrolled ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <ul className="px-6 sm:px-8 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left text-base py-3 transition-colors ${linkClass(link.id)}`}
                aria-current={activeSection === link.id ? "true" : undefined}
                data-ocid={`nav.mobile_${link.id}_link`}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-2 border-t theme-divider">
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </header>
  );
}
