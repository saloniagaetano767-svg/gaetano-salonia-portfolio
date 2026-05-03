import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/hooks/usePortfolio";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "@/hooks/useScrollAnimation";
import type { Profile } from "@/types/portfolio";

const FALLBACK_PROFILE: Profile = {
  name: "Gaetano Salonia",
  title: "Computer Science EFZ · Application Development · Switzerland",
  bio: "I am a motivated, ambitious aspiring software engineer with a vocational background in application development. During my apprenticeship and my work at RUAG, I gained hands-on experience in software development, structured problem-solving, and collaborating in professional environments.\n\nI enjoy building applications, learning new technologies, and continuously improving my craft. I am reliable, detail-oriented, and eager to grow both personally and professionally. I am currently looking for opportunities as a Software Engineer or in IT Support.\n\nOutside of delivery work, I invest time in personal projects and experimentation — staying curious, organized, and focused on outcomes that matter to users and teams.",
  skills: [
    "JavaScript",
    "TypeScript",
    "Java",
    "React",
    "Node.js",
    "Tailwind CSS",
    "Docker",
    "Git",
    "SQL",
    "C / C++",
  ],
  socialLinks: [],
};

const EXPERTISE_AREAS = [
  {
    label: "Application engineering",
    icon: "⬡",
    description:
      "End-to-end thinking: requirements, implementation, and validation",
  },
  {
    label: "Web & interfaces",
    icon: "◈",
    description: "React, responsive layouts, and accessible UI patterns",
  },
  {
    label: "Quality & data",
    icon: "◎",
    description:
      "SQL fundamentals, debugging discipline, and structured testing",
  },
  {
    label: "Team delivery",
    icon: "◇",
    description: "Git workflows, code review habits, and clear communication",
  },
];

function GeometricAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto group">
      {/* Outer geometric ring */}
      <div
        className="absolute inset-0 rounded-3xl border border-primary/30 group-hover:border-primary/60 transition-colors duration-500"
        style={{ transform: "rotate(6deg)" }}
      />
      {/* Mid geometric ring */}
      <div
        className="absolute inset-2 rounded-2xl border border-primary/15 group-hover:border-primary/35 transition-colors duration-500"
        style={{ transform: "rotate(3deg)" }}
      />
      {/* Main avatar container */}
      <div className="absolute inset-3 rounded-2xl bg-card border border-border overflow-hidden flex items-center justify-center">
        {/* Background geometric pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
          >
            <defs>
              <pattern
                id="grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="oklch(var(--primary))"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Gradient orb */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, oklch(var(--primary) / 0.18) 0%, transparent 65%)",
          }}
        />
        {/* Initials */}
        <span
          className="relative z-10 font-display text-6xl font-bold tracking-tighter text-gradient select-none"
          aria-hidden="true"
        >
          {initials}
        </span>
      </div>
      {/* Accent dot top-right */}
      <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary glow-primary translate-x-1 -translate-y-1" />
    </div>
  );
}

function ExpertiseChip({
  label,
  icon,
  description,
  style,
}: {
  label: string;
  icon: string;
  description: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="scroll-fade group flex items-start gap-3 rounded-xl border border-border bg-card/60 p-4 hover:border-primary/40 hover:bg-card transition-all duration-300"
      style={style}
    >
      <span
        className="mt-0.5 text-lg text-primary leading-none select-none flex-shrink-0"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-display text-sm font-semibold text-foreground leading-tight">
          {label}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
}

function AboutSkeleton() {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
      data-ocid="about.loading_state"
    >
      <Skeleton className="aspect-square max-w-[320px] mx-auto w-full rounded-3xl bg-muted" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full bg-muted" />
        <Skeleton className="h-4 w-5/6 bg-muted" />
        <Skeleton className="h-4 w-full bg-muted" />
        <Skeleton className="h-4 w-4/5 bg-muted" />
        <div className="grid grid-cols-2 gap-3 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutSection() {
  const { data: profile, isLoading } = useProfile();
  const { ref: sectionRef, isVisible: sectionVisible } =
    useScrollAnimation<HTMLElement>({
      threshold: 0.05,
      rootMargin: "0px 0px -40px 0px",
    });
  const { ref: headerRef, isVisible: headerVisible } =
    useScrollAnimation<HTMLDivElement>({
      threshold: 0.3,
    });
  const { ref: avatarRef, isVisible: avatarVisible } =
    useScrollAnimation<HTMLDivElement>({
      threshold: 0.2,
    });
  const { ref: textRef, isVisible: textVisible } =
    useScrollAnimation<HTMLDivElement>({
      threshold: 0.1,
    });

  const displayProfile = profile ?? FALLBACK_PROFILE;
  const paragraphs = displayProfile.bio.split("\n").filter(Boolean);
  const chipStagger = useStaggeredAnimation(EXPERTISE_AREAS.length, 0.1);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-24 bg-muted/20 scroll-fade ${sectionVisible ? "visible" : ""}`}
      data-ocid="about.section"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`mb-16 scroll-fade ${headerVisible ? "visible" : ""}`}
          data-ocid="about.header"
        >
          <p className="text-primary font-mono text-sm tracking-[0.2em] uppercase mb-3">
            01 / About
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            The engineer behind the commits
          </h2>
          {/* Animated divider */}
          <div className="mt-5 flex items-center gap-3">
            <div
              className="h-px bg-primary transition-all duration-700 ease-out"
              style={{ width: headerVisible ? "80px" : "0px" }}
            />
            <div
              className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-700 ease-out delay-300"
              style={{
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? "scale(1)" : "scale(0)",
              }}
            />
            <div
              className="h-px bg-primary/30 flex-1 transition-all duration-700 ease-out delay-500"
              style={{ opacity: headerVisible ? 1 : 0 }}
            />
          </div>
        </div>

        {isLoading ? (
          <AboutSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left column — avatar */}
            <div
              ref={avatarRef}
              className={`scroll-fade ${avatarVisible ? "visible" : ""}`}
              style={{ transitionDelay: "0.1s" }}
            >
              <GeometricAvatar name={displayProfile.name} />

              {/* Name + title badge below avatar */}
              <div className="mt-6 text-center">
                <p className="font-display text-xl font-bold text-foreground tracking-tight">
                  {displayProfile.name}
                </p>
                <p className="text-sm text-primary mt-1 font-mono tracking-wide">
                  {displayProfile.title}
                </p>
              </div>
            </div>

            {/* Right column — bio + expertise */}
            <div
              ref={textRef}
              className={`flex flex-col gap-6 scroll-fade ${textVisible ? "visible" : ""}`}
              style={{ transitionDelay: "0.2s" }}
            >
              {/* Bio paragraphs */}
              <div className="space-y-4">
                {paragraphs.map((para) => (
                  <p
                    key={para}
                    className="text-muted-foreground leading-relaxed text-base"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Expertise chips */}
              <div className="mt-4">
                <p className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-[0.18em] mb-4">
                  Focus areas
                </p>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  data-ocid="about.expertise.list"
                >
                  {EXPERTISE_AREAS.map((area, i) => (
                    <div
                      key={area.label}
                      className={`scroll-fade ${textVisible ? "visible" : ""}`}
                      style={chipStagger[i].style}
                      data-ocid={`about.expertise.item.${i + 1}`}
                    >
                      <ExpertiseChip
                        label={area.label}
                        icon={area.icon}
                        description={area.description}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
