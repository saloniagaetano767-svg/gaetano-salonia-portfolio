import { GlassCard } from "@/components/journey/GlassCard";
import { JourneyStation } from "@/components/journey/JourneyStation";
import { useTranslation } from "@/i18n";
import type { JourneyItem } from "@/i18n/types";
import { motion } from "motion/react";

function BuoyCard({ item, index }: { item: JourneyItem; index: number }) {
  const isCurrent = item.phase === "current";
  const isFuture = item.phase === "future";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32, x: index % 2 === 0 ? -12 : 12 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      className={`relative w-full ${
        index % 2 === 0
          ? "md:mr-[calc(50%+1.5rem)] md:max-w-[calc(50%-1.5rem)]"
          : "md:ml-[calc(50%+1.5rem)] md:max-w-[calc(50%-1.5rem)]"
      }`}
    >
      <div
        className={`absolute -top-3 z-[2] ${index % 2 === 0 ? "left-5 sm:left-6" : "right-5 sm:right-6 md:left-auto"} w-3.5 h-3.5 rounded-full ${
          isCurrent
            ? "bg-[var(--ocean-sunset)] shadow-[0_0_14px_var(--ocean-sunset)]"
            : isFuture
              ? "border-2 border-dashed border-[var(--ocean-teal)]/55 bg-transparent"
              : "bg-[var(--ocean-teal-dim)] shadow-[0_0_8px_rgba(114,212,196,0.35)]"
        }`}
        aria-hidden
      />
      <GlassCard
        variant={isFuture ? "dashed" : "default"}
        className="p-5 sm:p-7"
      >
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-3">
          <h3 className="font-display text-base font-bold text-[var(--ocean-text)]">
            {item.role}
          </h3>
          <span className="text-xs text-[var(--ocean-sunset)] font-semibold">
            @ {item.company}
          </span>
          {item.badge && (
            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[var(--ocean-teal)]/30 text-[var(--ocean-teal)] bg-[var(--ocean-teal)]/8">
              {item.badge}
            </span>
          )}
        </div>
        <p className="font-mono text-[10px] text-[var(--ocean-text-dim)] tracking-wider mb-3">
          {item.period}
        </p>
        <p className="text-sm sm:text-[15px] text-[var(--ocean-text-muted)] leading-[1.7]">
          {item.description}
        </p>
      </GlassCard>
    </motion.article>
  );
}

export function JourneyMilestones() {
  const { t } = useTranslation();

  return (
    <JourneyStation id="milestones" compact>
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <p className="journey-eyebrow">{t.milestones.label}</p>
        <h2 className="journey-title">
          {t.milestones.titleLight}{" "}
          <span className="journey-title-accent">
            {t.milestones.titleAccent}
          </span>
        </h2>

        <div className="relative mt-8 sm:mt-10">
          <div
            className="journey-milestone-path hidden md:block"
            aria-hidden
          />
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {t.journey.map((item, i) => (
              <BuoyCard key={item.role} item={item} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </JourneyStation>
  );
}
