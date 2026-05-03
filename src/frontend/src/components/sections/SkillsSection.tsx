import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "@/hooks/useScrollAnimation";

interface Skill {
  name: string;
  icon?: string;
}

interface SkillCategory {
  label: string;
  accentClass: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "Programming languages",
    accentClass: "accent-cyan",
    skills: [
      { name: "JavaScript & TypeScript" },
      { name: "Java" },
      { name: "Python" },
      { name: "C#" },
      { name: "C" },
      { name: "C++" },
      { name: "HTML & CSS" },
    ],
  },
  {
    label: "Frameworks & libraries",
    accentClass: "accent-violet",
    skills: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Tailwind CSS" },
      { name: "Vite" },
    ],
  },
  {
    label: "Tools & technologies",
    accentClass: "accent-emerald",
    skills: [
      { name: "Git & GitHub" },
      { name: "Docker" },
      { name: "SQL" },
      { name: "Linux & Windows" },
      { name: "REST APIs" },
      { name: "VS Code" },
      { name: "Microsoft Office" },
    ],
  },
  {
    label: "Professional skills",
    accentClass: "accent-amber",
    skills: [
      { name: "Problem-solving" },
      { name: "Structured delivery" },
      { name: "Testing & QA mindset" },
      { name: "Technical documentation" },
      { name: "Teamwork & code review" },
      { name: "Customer-oriented service" },
      { name: "Communication & conflict resolution" },
      { name: "Self-driven & proactive" },
    ],
  },
  {
    label: "Languages",
    accentClass: "accent-rose",
    skills: [
      { name: "German (C2 / mother tongue level)" },
      { name: "Italian (mother tongue)" },
      { name: "English (B1 / B2)" },
      { name: "French (A1)" },
    ],
  },
];

// Each accent uses inline CSS variables derived from design tokens.
// --accent-h is the hue, --accent-c is the chroma; both are injected via style prop.
interface AccentStyle {
  hue: number;
  chroma: number;
}

const ACCENT_DEFS: Record<string, AccentStyle> = {
  "accent-cyan": { hue: 200, chroma: 0.13 },
  "accent-violet": { hue: 265, chroma: 0.14 },
  "accent-emerald": { hue: 165, chroma: 0.12 },
  "accent-amber": { hue: 78, chroma: 0.14 },
  "accent-rose": { hue: 18, chroma: 0.12 },
};

interface SkillBadgeProps {
  skill: Skill;
  accentClass: string;
  style?: React.CSSProperties;
  visible: boolean;
}

function SkillBadge({ skill, accentClass, style, visible }: SkillBadgeProps) {
  const def = ACCENT_DEFS[accentClass] ?? { hue: 200, chroma: 0.13 };
  const color = `oklch(0.75 ${def.chroma} ${def.hue})`;
  const borderColor = `oklch(0.72 ${def.chroma} ${def.hue} / 0.35)`;
  const bgColor = `oklch(0.72 ${def.chroma} ${def.hue} / 0.07)`;
  return (
    <span
      style={{
        ...style,
        borderColor,
        backgroundColor: bgColor,
        color,
      }}
      className={[
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
        "border transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      ].join(" ")}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      {skill.name}
    </span>
  );
}

interface CategoryCardProps {
  category: SkillCategory;
  sectionVisible: boolean;
  categoryIndex: number;
}

function CategoryCard({
  category,
  sectionVisible,
  categoryIndex,
}: CategoryCardProps) {
  const delays = useStaggeredAnimation(category.skills.length, 0.06);
  const def = ACCENT_DEFS[category.accentClass] ?? {
    hue: 200,
    chroma: 0.13,
  };
  const dotColor = `oklch(0.72 ${def.chroma} ${def.hue})`;
  const cardDelay = categoryIndex * 0.1;

  return (
    <div
      className={[
        "rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm",
        "transition-all duration-700",
        sectionVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6",
      ].join(" ")}
      style={{ transitionDelay: `${cardDelay}s` }}
    >
      {/* Category heading */}
      <div className="flex items-center gap-2.5 mb-5">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: dotColor }}
        />
        <h3 className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
          {category.label}
        </h3>
      </div>

      {/* Skill badges */}
      <div
        className="flex flex-wrap gap-2"
        data-ocid={`skills.${category.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.list`}
      >
        {category.skills.map((skill, i) => (
          <SkillBadge
            key={skill.name}
            skill={skill}
            accentClass={category.accentClass}
            style={{
              ...delays[i].style,
              transitionDelay: sectionVisible
                ? `${cardDelay + 0.12 + i * 0.06}s`
                : "0s",
            }}
            visible={sectionVisible}
          />
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px",
  });

  return (
    <section
      id="skills"
      className="py-24 bg-muted/10 border-t border-border/30"
      data-ocid="skills.section"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <div
          className={[
            "mb-14 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3 font-display">
            Technical profile
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Skills &{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, oklch(var(--accent)) 0%, oklch(0.58 0.14 200) 100%)",
              }}
            >
              strengths
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-xl leading-relaxed">
            Shaped by vocational training, day-to-day delivery at RUAG (NavData,
            SODC), and side projects — aligned with my CV: Java through C++,
            React, Node, Docker, Linux, and Office tooling.
          </p>
        </div>

        {/* Category grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          data-ocid="skills.categories.list"
        >
          {SKILL_CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.label}
              category={cat}
              sectionVisible={isVisible}
              categoryIndex={i}
            />
          ))}
        </div>

        {/* Subtle bottom decoration */}
        <div
          className={[
            "mt-12 flex items-center gap-4 transition-all duration-700 delay-500",
            isVisible ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <div className="h-px flex-1 bg-border/30" />
          <span className="text-xs text-muted-foreground font-display tracking-widest uppercase">
            Always learning
          </span>
          <div className="h-px flex-1 bg-border/30" />
        </div>
      </div>
    </section>
  );
}
