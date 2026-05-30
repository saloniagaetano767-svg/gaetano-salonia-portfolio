import { useTranslation } from "@/i18n";
import type { JourneyItem } from "@/i18n/types";
import { Brain, GraduationCap, Sparkles } from "lucide-react";
import { motion } from "motion/react";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="pb-5 mb-5 border-b theme-divider last:mb-0 last:pb-0 last:border-0">
      <p className="font-mono text-[10px] text-muted-foreground/70 tracking-[0.12em] uppercase mb-1">
        {label}
      </p>
      <p className="text-[13px] text-foreground/90 font-semibold">{value}</p>
    </div>
  );
}

function JourneyNode({ item, futureIndex }: { item: JourneyItem; futureIndex?: number }) {
  const isFuture = item.phase === "future";
  const FutureIcon = futureIndex === 1 ? GraduationCap : Brain;

  const content = (
    <>
      <div className="flex flex-wrap items-baseline gap-1 mb-1">
        <h3
          className={`font-display text-[17px] font-bold ${
            isFuture ? "text-foreground/80" : "text-foreground"
          }`}
        >
          {item.role}
        </h3>
        <span className="text-[13px] text-primary font-semibold">@ {item.company}</span>
        {item.badge && (
          <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full border border-primary/30 text-primary bg-primary/10">
            {item.badge}
          </span>
        )}
      </div>
      <p className="font-mono text-[11px] text-muted-foreground/70 tracking-wider mb-2">
        {item.period}
      </p>
      <p
        className={`text-[13px] leading-relaxed max-w-xl ${
          isFuture ? "text-muted-foreground/80" : "text-muted-foreground"
        }`}
      >
        {item.description}
      </p>
    </>
  );

  if (isFuture) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.6 }}
        className="journey-future-float"
      >
        <div className="journey-future-card relative">
          <FutureIcon
            className="absolute top-3 right-3 w-4 h-4 text-primary/50"
            aria-hidden
          />
          {content}
        </div>
      </motion.div>
    );
  }

  return <div className="pb-2">{content}</div>;
}

function JourneyDot({ item }: { item: JourneyItem }) {
  if (item.phase === "current") {
    return (
      <span className="relative flex items-center justify-center w-[11px] h-[11px] mt-1 shrink-0">
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
        <span className="relative w-[11px] h-[11px] rounded-full bg-gradient-to-br from-primary to-accent journey-dot-glow" />
      </span>
    );
  }

  if (item.phase === "future") {
    return (
      <span className="w-[11px] h-[11px] rounded-full border-2 border-dashed border-primary/50 mt-1 shrink-0 bg-transparent" />
    );
  }

  return (
    <span className="w-[11px] h-[11px] rounded-full bg-gradient-to-br from-primary to-accent journey-dot-glow mt-1 shrink-0" />
  );
}

function JourneyConnector({
  dashed,
  showGlow,
}: {
  dashed?: boolean;
  showGlow?: boolean;
}) {
  return (
    <span className="relative flex-1 mt-2 min-h-[40px] w-px" aria-hidden>
      <span
        className={`absolute inset-0 w-px ${
          dashed
            ? "journey-bridge-line"
            : "bg-gradient-to-b from-primary/25 to-transparent"
        }`}
      />
      {showGlow && (
        <span className="journey-path-dot absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_oklch(var(--primary))]" />
      )}
    </span>
  );
}

export function AboutSection() {
  const { t } = useTranslation();

  const pastAndCurrent = t.journey.filter((item) => item.phase !== "future");
  const futureItems = t.journey.filter((item) => item.phase === "future");

  return (
    <section
      id="about"
      className="max-w-[1100px] mx-auto px-8 py-[90px]"
      data-ocid="about.section"
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-mono text-[11px] text-primary tracking-[0.14em] uppercase mb-3.5">
          01 / {t.about.label}
        </p>
        <h2 className="font-display font-extrabold text-[clamp(34px,5vw,52px)] tracking-tight leading-tight mb-10">
          <span className="grad-light">{t.about.titleLight}</span>
          <br />
          <span className="grad-teal">{t.about.titleAccent}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">{t.about.p1}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{t.about.p2}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{t.about.p3}</p>

          <div className="pt-8">
            <p className="font-mono text-[11px] text-primary tracking-[0.14em] uppercase mb-4">
              {t.about.rosterTitle}
            </p>
            <ul className="space-y-2">
              {t.about.roster.map((item) => (
                <li
                  key={item}
                  className="text-sm text-foreground/90 font-medium flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-card rounded-[18px] p-7"
        >
          <InfoRow label="Location" value={t.about.location} />
          <InfoRow label="Company" value={t.about.company} />
          <InfoRow label="Status" value={t.about.status} />
          <InfoRow label="Languages" value={t.about.languages} />
          <InfoRow label="Apprenticeship" value={t.about.apprenticeship} />
        </motion.aside>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-20"
      >
        <p className="font-mono text-[11px] text-primary tracking-[0.14em] uppercase mb-8">
          04 / {t.about.journeyTitle}
        </p>
        <div className="space-y-0">
          {pastAndCurrent.map((item, i) => (
            <div key={item.role} className="flex gap-5 mb-9 last:mb-0">
              <div className="flex flex-col items-center min-w-[14px]">
                <JourneyDot item={item} />
                {i < pastAndCurrent.length - 1 && <JourneyConnector />}
              </div>
              <JourneyNode item={item} />
            </div>
          ))}
        </div>

        {futureItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-12"
          >
            <div className="flex gap-5 mb-8">
              <div className="flex flex-col items-center min-w-[14px]">
                <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden />
                <JourneyConnector dashed showGlow />
              </div>
              <p className="font-mono text-[11px] text-primary tracking-[0.14em] uppercase pt-0.5">
                05 / {t.about.nextStepsTitle}
              </p>
            </div>

            <div className="space-y-0">
              {futureItems.map((item, i) => (
                <div key={item.role} className="flex gap-5 mb-9 last:mb-0">
                  <div className="flex flex-col items-center min-w-[14px]">
                    <JourneyDot item={item} />
                    {i < futureItems.length - 1 && <JourneyConnector dashed />}
                  </div>
                  <JourneyNode item={item} futureIndex={i} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
