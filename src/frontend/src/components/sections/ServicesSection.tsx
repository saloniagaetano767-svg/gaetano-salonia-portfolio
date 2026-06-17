import { SectionHeader } from "@/components/sections/SectionHeader";
import { useTranslation } from "@/i18n";
import { SECTION_CONTAINER } from "@/lib/layout";
import { motion } from "motion/react";

export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className={SECTION_CONTAINER}
      data-ocid="services.section"
    >
      <SectionHeader
        index={t.sections.services}
        label={t.services.label}
        titleLight={t.services.titleLight}
        titleAccent={t.services.titleAccent}
        subtitle={
          <p className="text-base text-muted-foreground max-w-md leading-relaxed mt-4">
            {t.services.sub}
          </p>
        }
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {t.services.categories.map((cat, i) => (
          <motion.article
            key={cat.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="glass-card rounded-[18px] p-7 hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-300 group"
            data-ocid={`services.card.${cat.title}`}
          >
            <div className="mb-5">
              <p className="font-mono text-[10px] text-muted-foreground/70 tracking-[0.12em] uppercase mb-1">
                {t.services.cardLabel}
              </p>
              <h3 className="font-display text-xl font-bold text-foreground">
                {cat.title}
              </h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md surface-muted text-muted-foreground group-hover:border-primary/25 group-hover:text-primary transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
