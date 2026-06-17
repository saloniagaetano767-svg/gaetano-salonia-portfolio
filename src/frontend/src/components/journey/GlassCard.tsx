import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "accent" | "dashed";
}

export function GlassCard({
  children,
  className = "",
  variant = "default",
}: GlassCardProps) {
  const variantClass =
    variant === "accent"
      ? "ocean-glass-accent"
      : variant === "dashed"
        ? "ocean-glass-dashed"
        : "";

  return (
    <div
      className={`ocean-glass rounded-2xl backdrop-blur-xl ${variantClass} ${className}`}
    >
      {children}
    </div>
  );
}
