import { GlassCard } from "@/components/journey/GlassCard";
import { JourneyStation } from "@/components/journey/JourneyStation";
import { useTranslation } from "@/i18n";
import { Waves } from "lucide-react";
import { motion } from "motion/react";

export function JourneySkills() {
  const { t } = useTranslation();

  return (
    <JourneyStation id="skills">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.75 }}
      >
        <p className="journey-eyebrow">{t.services.label}</p>
        <h2 className="journey-title !mb-4">
          {t.services.titleLight}{" "}
          <span className="journey-title-accent">{t.services.titleAccent}</span>
        </h2>

        <div className="journey-section-divider !mb-6" aria-hidden>
          <Waves className="journey-section-divider-icon w-4 h-4" strokeWidth={1.5} />
        </div>

        <p className="journey-lead">{t.services.sub}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {t.services.categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="relative"
            >
              <GlassCard className="relative p-5 sm:p-7 hover:border-[var(--ocean-teal)]/25 transition-colors duration-300 h-full overflow-hidden">
                <span className="journey-skill-index" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-mono text-[9px] text-[var(--ocean-sunset)]/75 tracking-wider uppercase mb-2">
                  {t.services.cardLabel}
                </p>
                <h3 className="font-display text-base sm:text-lg font-bold text-[var(--ocean-text)] mb-4 sm:mb-5 pr-10">
                  {cat.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-white/6 border border-white/10 text-[var(--ocean-text-muted)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </JourneyStation>
  );
}
