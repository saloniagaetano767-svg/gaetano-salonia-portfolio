import { Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const YEAR = new Date().getFullYear();

interface SocialItem {
  icon: LucideIcon;
  href: string;
  label: string;
}

const SOCIAL: SocialItem[] = [
  {
    icon: Mail,
    href: "mailto:hello@gaetanosalonia.com",
    label: "Email",
  },
  {
    icon: Github,
    href: "https://github.com/saloniagaetano767-svg",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/gaetano-salonia",
    label: "LinkedIn",
  },
];

export function Footer() {
  return (
    <footer
      className="bg-card border-t border-border/60"
      data-ocid="footer.section"
    >
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="font-display font-bold text-lg text-foreground">
            <span className="text-primary">&lt;</span>
            Gaetano
            <span className="text-primary">/&gt;</span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground text-center">
            © {YEAR} Gaetano Salonia · Switzerland
          </p>

          {/* Social links */}
          <ul
            className="flex items-center gap-4"
            aria-label="Social media links"
          >
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-ocid={`footer.${label.toLowerCase()}_link`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
