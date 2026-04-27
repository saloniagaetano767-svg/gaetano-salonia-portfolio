import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { NavLink } from "../types/portfolio";

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md border-b border-border shadow-elevated"
          : "bg-transparent"
      }`}
    >
      <nav
        className="container mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="font-display font-bold text-xl text-foreground hover:text-primary transition-colors duration-200"
          data-ocid="nav.home_link"
          aria-label="Home"
        >
          <span className="text-primary">&lt;</span>
          Gaetano
          <span className="text-primary">/&gt;</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                data-ocid={`nav.${link.label.toLowerCase()}_link`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Resume + hamburger */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-2 border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-smooth font-display"
            asChild
            data-ocid="nav.resume_button"
          >
            <a href="/cv.pdf" download aria-label="Download CV as PDF">
              <Download className="w-4 h-4" aria-hidden="true" />
              Résumé
            </a>
          </Button>

          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-card/95 backdrop-blur-md border-b border-border`}
        aria-hidden={!isOpen}
      >
        <ul className="container mx-auto px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left text-sm font-body text-muted-foreground hover:text-foreground py-2 transition-colors duration-200"
                data-ocid={`nav.mobile_${link.label.toLowerCase()}_link`}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-2 border-t border-border">
            <a
              href="/cv.pdf"
              download
              className="flex items-center gap-2 text-sm font-display text-primary hover:text-primary/80 py-2 transition-colors duration-200"
              data-ocid="nav.mobile_resume_button"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Résumé
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
