import { useTranslation } from "@/i18n";
import { motion } from "motion/react";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="pb-5 mb-5 border-b border-white/5 last:mb-0 last:pb-0 last:border-0">
      <p className="font-mono text-[10px] text-[#3a4a68] tracking-[0.12em] uppercase mb-1">
        {label}
      </p>
      <p className="text-[13px] text-[#c8d0e0] font-semibold">{value}</p>
    </div>
  );
}

export function AboutSection() {
  const { t } = useTranslation();

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
          <p className="text-sm text-[#8a9ab8] leading-relaxed">{t.about.p1}</p>
          <p className="text-sm text-[#8a9ab8] leading-relaxed">{t.about.p2}</p>
          <p className="text-sm text-[#8a9ab8] leading-relaxed">{t.about.p3}</p>

          <div className="pt-8">
            <p className="font-mono text-[11px] text-primary tracking-[0.14em] uppercase mb-4">
              {t.about.rosterTitle}
            </p>
            <ul className="space-y-2">
              {t.about.roster.map((item) => (
                <li
                  key={item}
                  className="text-sm text-[#c8d0e0] font-medium flex items-center gap-2"
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
          {t.journey.map((item, i) => (
            <div key={item.role} className="flex gap-5 mb-9 last:mb-0">
              <div className="flex flex-col items-center min-w-[14px]">
                <span className="w-[11px] h-[11px] rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_14px_rgba(94,231,208,0.3)] mt-1 shrink-0" />
                {i < t.journey.length - 1 && (
                  <span
                    className="w-px flex-1 mt-2 bg-gradient-to-b from-primary/25 to-transparent min-h-[40px]"
                    aria-hidden
                  />
                )}
              </div>
              <div className="pb-2">
                <div className="flex flex-wrap items-baseline gap-1 mb-1">
                  <h3 className="font-display text-[17px] font-bold text-foreground">
                    {item.role}
                  </h3>
                  <span className="text-[13px] text-primary font-semibold">
                    @ {item.company}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-[#3a4a68] tracking-wider mb-2">
                  {item.period}
                </p>
                <p className="text-[13px] text-[#8a9ab8] leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
