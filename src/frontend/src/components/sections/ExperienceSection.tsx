import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "@/hooks/useScrollAnimation";
import { BookOpen, Building2, GraduationCap, MapPin } from "lucide-react";

const TIMELINE = [
  {
    icon: Building2,
    period: "2024 — present",
    title: "RUAG AG",
    subtitle: "Application Developer (EFZ) · Software · Switzerland",
    description:
      "Developing and maintaining applications in the context of military navigation data (NavData). Contributing to the Swiss Obstacle Database Converter (SODC) for security-relevant obstacle data. Implementing validation and processing pipelines, testing, QA, and technical documentation — working in a team with high reliability expectations.",
  },
  {
    icon: GraduationCap,
    period: "2022 — 2024",
    title: "Benedict School",
    subtitle: "Computer Science EFZ — Application Development",
    description:
      "Vocational foundation in software development and programming: object-oriented design, databases (SQL), hands-on school projects, plus documentation and presenting technical work to practitioners.",
  },
  {
    icon: BookOpen,
    period: "2019 — 2022",
    title: "Rüti Secondary School",
    subtitle: "Compulsory education",
    description:
      "Broad general education with an emphasis on structured work, analytical thinking, and preparation for a two-year IT apprenticeship — building independence and everyday teamwork.",
  },
];

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px",
  });
  const stagger = useStaggeredAnimation(TIMELINE.length, 0.08);

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
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-2xl leading-relaxed">
            How I work today at RUAG, how I trained at Benedict School, and the
            path that led there — together they show both practice and formal
            education.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {TIMELINE.map((item, i) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={`rounded-2xl border border-border/60 bg-card/80 p-8 backdrop-blur-sm transition-all duration-700 hover:border-primary/35 hover:shadow-[0_20px_50px_oklch(var(--primary)/0.08)] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
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
