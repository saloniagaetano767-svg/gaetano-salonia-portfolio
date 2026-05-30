import { LanguageSwitcher, useTranslation } from "@/i18n";
import { scrollToSection } from "@/lib/motion";
import { BRAND_MARK } from "@/lib/site";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const SECTION_IDS = {
  about: "about",
  work: "work",
  services: "services",
  contact: "contact",
} as const;

export function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: t.nav.about, id: SECTION_IDS.about },
    { label: t.nav.work, id: SECTION_IDS.work },
    { label: t.nav.services, id: SECTION_IDS.services },
    { label: t.nav.contact, id: SECTION_IDS.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 px-8 flex items-center transition-all duration-400 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`}
    >
      <nav
        className="w-full max-w-[1100px] mx-auto flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="font-display font-extrabold text-xl tracking-tight"
          data-ocid="nav.home_link"
          aria-label="Home — Gaetano Salonia"
          onClick={() => scrollToSection("hero")}
        >
          <span className="grad-teal">{BRAND_MARK.replace(".", "")}</span>
          <span className="text-[#2a3a68]">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="text-[13px] font-medium text-[#6a7a98] hover:text-primary transition-colors tracking-wide bg-transparent border-none cursor-pointer font-body"
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
            className="md:hidden p-2 rounded-md text-[#6a7a98] hover:text-foreground transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
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
        <ul className="px-8 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="block w-full text-left text-sm text-[#6a7a98] hover:text-primary py-2 transition-colors"
                data-ocid={`nav.mobile_${link.id}_link`}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-2 border-t border-white/5">
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </header>
  );
}
