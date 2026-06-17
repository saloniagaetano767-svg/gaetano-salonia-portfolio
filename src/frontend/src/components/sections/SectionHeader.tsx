import { SECTION_EYEBROW, SECTION_TITLE } from "@/lib/layout";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  index: string;
  label: string;
  titleLight: string;
  titleAccent: string;
  subtitle?: ReactNode;
  className?: string;
}

export function SectionHeader({
  index,
  label,
  titleLight,
  titleAccent,
  subtitle,
  className = "mb-10",
}: SectionHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      <p className={SECTION_EYEBROW}>
        {index} / {label}
      </p>
      <h2 className={SECTION_TITLE}>
        <span className="grad-light">{titleLight}</span>
        <br />
        <span className="grad-teal">{titleAccent}</span>
      </h2>
      {subtitle}
    </motion.header>
  );
}
