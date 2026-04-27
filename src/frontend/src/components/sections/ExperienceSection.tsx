import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "@/hooks/useScrollAnimation";
import { Building2, GraduationCap, MapPin } from "lucide-react";

const TIMELINE = [
  {
    icon: Building2,
    period: "Present",
    title: "RUAG",
    subtitle: "Technical / IT-related role · Switzerland",
    description:
      "Contributing in a professional engineering environment: collaborating on software-related work, following structured development practices, and strengthening problem-solving in real product contexts.",
  },
  {
    icon: GraduationCap,
    period: "Apprenticeship",
    title: "Computer Science EFZ — Application Development",
    subtitle: "Vocational diploma (Informatiker EFZ)",
    description:
      "Comprehensive training in application development: requirements, implementation, testing, databases, and teamwork — with a strong foundation in software engineering principles and delivery discipline.",
  },
];

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px",
  });
  const stagger = useStaggeredAnimation(TIMELINE.length, 0.12);

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 bg-muted/15 border-t border-border/30"
      data-ocid="experience.section"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          className={`mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-[0.2em] uppercase mb-3">
            <MapPin className="w-4 h-4" aria-hidden />
            Switzerland
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Experience &{" "}
            <span className="text-gradient">Education</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-2xl leading-relaxed">
            A concise view of where I work, how I was trained, and the
            professional standards I bring to every task.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {TIMELINE.map((item, i) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={`rounded-2xl border border-border/60 bg-card/80 p-8 backdrop-blur-sm transition-all duration-700 hover:border-primary/35 hover:shadow-[0_20px_50px_oklch(var(--primary)/0.08)] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={stagger[i].style}
                data-ocid={`experience.card.${i + 1}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="min-w-0 space-y-2">
                    <p className="text-xs font-mono uppercase tracking-widest text-primary/90">
                      {item.period}
                    </p>
                    <h3 className="font-display text-xl font-semibold text-foreground leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/50">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
