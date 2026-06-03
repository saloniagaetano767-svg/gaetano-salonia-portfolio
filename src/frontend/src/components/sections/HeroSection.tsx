import { AvatarPortrait } from "@/components/AvatarPortrait";
import { useTranslation } from "@/i18n";
import { scrollToSection } from "@/lib/motion";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const { t, locale } = useTranslation();
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const roleKey = `${locale}-${roleIdx}`;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.92]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [1, 1, 0.5],
  );
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % t.hero.roles.length);
        setRoleVisible(true);
      }, 380);
    }, 2800);
    return () => clearInterval(interval);
  }, [t.hero.roles.length]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[135vh]"
      data-ocid="hero.section"
    >
      <div className="sticky top-0 min-h-screen flex items-center pt-24 pb-16 px-8">
        <motion.div
          className="relative z-10 w-full max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          style={{
            scale: contentScale,
            opacity: contentOpacity,
            y: contentY,
          }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3.5 py-1.5 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary badge-dot shadow-[0_0_8px] shadow-primary" />
              <span className="font-mono text-[11px] text-primary font-semibold tracking-wider">
                {t.about.status} · RUAG · 🇨🇭
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-[17px] text-muted-foreground font-medium mb-2"
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14 }}
              style={{ y: nameY }}
              className="font-display font-extrabold text-[clamp(52px,8vw,84px)] leading-none tracking-tight mb-4"
            >
              <span className="grad-light block">Gaetano</span>
              <span className="grad-teal block">Salonia</span>
            </motion.h1>

            <div className="h-8 overflow-hidden mb-6" key={locale}>
              <p
                key={roleKey}
                className={`font-mono text-base text-primary font-semibold transition-all duration-350 ${
                  roleVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                {"// "}
                {t.hero.roles[roleIdx % t.hero.roles.length]}
              </p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="text-[15px] text-muted-foreground leading-relaxed max-w-md mb-9"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36 }}
              className="flex flex-wrap gap-3"
            >
              <button
                type="button"
                onClick={() => scrollToSection("work")}
                className="btn-gradient font-bold text-sm px-6 py-3 rounded-[11px] hover:-translate-y-0.5 cta-glow transition-all duration-200"
                data-ocid="hero.primary_button"
              >
                {t.hero.cta}
              </button>
              <a
                href="/cv.pdf"
                download
                className="font-semibold text-sm px-6 py-3 rounded-[11px] surface-border text-foreground/90 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                data-ocid="hero.secondary_button"
              >
                {t.hero.cv}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.48 }}
              className="flex flex-wrap gap-5 mt-11"
            >
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/70 text-xs font-semibold tracking-wider hover:text-primary transition-colors"
              >
                ⌘ {t.hero.github}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/70 text-xs font-semibold tracking-wider hover:text-primary transition-colors"
              >
                ◈ {t.hero.linkedin}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-muted-foreground/70 text-xs font-semibold tracking-wider hover:text-primary transition-colors"
              >
                ✉ {t.hero.email}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-first lg:order-last"
          >
            <AvatarPortrait />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
