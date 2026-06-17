import { GlassCard } from "@/components/journey/GlassCard";
import { JourneyStation } from "@/components/journey/JourneyStation";
import { useTranslation } from "@/i18n";
import { Anchor } from "lucide-react";
import { motion } from "motion/react";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="pb-4 mb-4 border-b border-white/10 last:mb-0 last:pb-0 last:border-0">
      <p className="font-mono text-[9px] text-[var(--ocean-sunset)]/70 tracking-[0.14em] uppercase mb-1.5">
        {label}
      </p>
      <p className="text-sm sm:text-[15px] text-[var(--ocean-text)] font-medium leading-snug">
        {value}
      </p>
    </div>
  );
}

export function JourneyAbout() {
  const { t } = useTranslation();

  const infoRows = [
    { label: t.about.fields.location, value: t.about.location },
    { label: t.about.fields.company, value: t.about.company },
    { label: t.about.fields.status, value: t.about.status },
    { label: t.about.fields.languages, value: t.about.languages },
    { label: t.about.fields.apprenticeship, value: t.about.apprenticeship },
  ];

  return (
    <JourneyStation id="about" diveEntry>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.75 }}
      >
        <p className="journey-eyebrow">{t.about.label}</p>
        <h2 className="journey-title">
          {t.about.titleLight}{" "}
          <span className="journey-title-accent">{t.about.titleAccent}</span>
        </h2>

        <div
          className="journey-section-divider"
          aria-hidden
        >
          <Anchor className="journey-section-divider-icon w-4 h-4" strokeWidth={1.5} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(220px,260px)_1fr] gap-[var(--section-gap)] items-start">
          <GlassCard variant="accent" className="p-5 sm:p-7 order-2 lg:order-1">
            {infoRows.map((row) => (
              <InfoRow key={row.label} label={row.label} value={row.value} />
            ))}
          </GlassCard>

          <div className="space-y-5 sm:space-y-6 order-1 lg:order-2">
            {[t.about.p1, t.about.p2, t.about.p3, t.about.p4].map(
              (paragraph, i) => (
                <motion.p
                  key={paragraph.slice(0, 20)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="text-[15px] sm:text-base text-[var(--ocean-text-muted)] leading-[1.75]"
                >
                  {paragraph}
                </motion.p>
              ),
            )}
          </div>
        </div>
      </motion.div>
    </JourneyStation>
  );
}
