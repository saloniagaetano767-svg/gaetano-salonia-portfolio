import { useTranslation } from "@/i18n";
import { motion } from "motion/react";

export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className="max-w-[1100px] mx-auto px-8 py-[90px]"
      data-ocid="services.section"
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-mono text-[11px] text-primary tracking-[0.14em] uppercase mb-3.5">
          03 / {t.services.label}
        </p>
        <h2 className="font-display font-extrabold text-[clamp(34px,5vw,52px)] tracking-tight leading-tight mb-4">
          <span className="grad-light">{t.services.titleLight}</span>
          <br />
          <span className="grad-teal">{t.services.titleAccent}</span>
        </h2>
        <p className="text-sm text-[#5a6a88] max-w-md leading-relaxed mb-10">
          {t.services.sub}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {t.services.categories.map((cat, i) => (
          <motion.article
            key={cat.code}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="glass-card rounded-[18px] p-7 hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-300 group"
            data-ocid={`services.card.${cat.code}`}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="font-mono text-[10px] text-[#3a4a68] tracking-[0.12em] uppercase mb-1">
                  SERVICE
                </p>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {cat.title}
                </h3>
              </div>
              <span className="font-display text-3xl font-extrabold grad-teal opacity-80 group-hover:opacity-100 transition-opacity">
                {cat.code}
              </span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[#8a9ab8] group-hover:border-primary/25 group-hover:text-primary transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex flex-wrap gap-2.5 mt-14"
      >
        {t.services.pills.map((pill) => (
          <span
            key={pill}
            className="font-mono text-xs font-semibold px-4 py-2 rounded-[11px] bg-white/[0.04] border border-white/[0.08] text-[#8a9ab8] hover:border-primary/30 hover:text-primary hover:bg-primary/[0.05] transition-all cursor-default"
          >
            {pill}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
