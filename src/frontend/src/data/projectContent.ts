import type { Project } from "@/types/portfolio";

export interface CaseStudy {
  problem: string;
  role: string;
  outcomes: string[];
  timeline: string;
}

const FITNESS_LIVE = "https://gasalruag.github.io";
const FITNESS_GH = "https://github.com/gasalruag/gasalruag.github.io";

/** Fallback projects when the on-chain actor has no data */
export const SAMPLE_PROJECTS: Project[] = [
  {
    id: BigInt(1),
    title: "Personal Portfolio Platform",
    featured: true,
    description:
      "A public calling card with a rich hero, project case studies, and a contact flow — built for fast static hosting (e.g. Vercel), clear typography, and a strong first impression for applications.",
    category: "Web Application",
    techStack: [
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "Responsive UI",
      "SPA routing",
    ],
    imageUrl: "",
    githubUrl: "https://github.com/saloniagaetano767-svg",
    liveUrl: "",
  },
  {
    id: BigInt(2),
    title: "NavData workflow & dashboard patterns",
    featured: true,
    description:
      "Internal-style patterns for navigation-related data: role-aware views, exportable summaries, and REST-driven visuals — informed by enterprise data-quality practice (generic demo content only).",
    category: "Full-Stack patterns",
    techStack: ["React", "TypeScript", "REST APIs", "Validation", "Git"],
    imageUrl: "",
    githubUrl: "https://github.com/saloniagaetano767-svg",
    liveUrl: "",
  },
  {
    id: BigInt(3),
    title: "Fitness tracker",
    featured: true,
    description:
      "A deployed web experience for tracking workouts and progress — structured UI, persisted habits, and a live demo on GitHub Pages at gasalruag.github.io.",
    category: "Web Application",
    techStack: ["HTML", "CSS", "JavaScript", "Git", "GitHub Pages"],
    imageUrl: "",
    githubUrl: FITNESS_GH,
    liveUrl: FITNESS_LIVE,
  },
  {
    id: BigInt(4),
    title: "Team task board",
    featured: true,
    description:
      "A Kanban board with columns, filters, and local persistence — focused on state handling, UX polish, and maintainable React structure.",
    category: "Frontend",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Local state", "Git"],
    imageUrl: "",
    githubUrl: "https://github.com/saloniagaetano767-svg",
    liveUrl: "",
  },
  {
    id: BigInt(5),
    title: "Markdown documentation hub",
    featured: true,
    description:
      "A lightweight static documentation site built from Markdown with navigation, search, and syntax-highlighted code — low-cost hosting for school and team hand-ins.",
    category: "Content & Automation",
    techStack: ["TypeScript", "Vite", "Markdown", "CSS", "GitHub Pages"],
    imageUrl: "",
    githubUrl: "https://github.com/saloniagaetano767-svg",
    liveUrl: "",
  },
];

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "1": {
    problem:
      "Early-career developers need a portfolio that feels credible: fast loading, readable type, and a narrative that connects work to real skills — not filler copy.",
    role: "Owned information architecture, React + Tailwind UI, animation tuned for reduced-motion, Vite builds, and static-friendly deploys.",
    outcomes: [
      "Clear hierarchy and lighthouse-friendly delivery",
      "Reusable sections for iterating on copy quickly",
      "Case study pages that explain stack and impact in one flow",
      "Responsive navigation plus contact fallback without a proprietary backend",
    ],
    timeline: "Ongoing (2025–2026)",
  },
  "2": {
    problem:
      "Operational teams bounce between spreadsheets and one-off exports; a dedicated web surface makes recurring KPIs easier to revisit.",
    role: "Typed REST data hooks, chart-ready summaries, and CSV exports with deliberate loading / empty states for production-adjacent UX.",
    outcomes: [
      "Less context switching when demoing repeatable reports",
      "Retry and edge-case behaviour for flaky endpoints",
      "Design tokens that match this site’s professional dark theme",
    ],
    timeline: "Multi-month school / hobby build",
  },
  "3": {
    problem:
      "Fitness goals slip when tracking is inconvenient; a tiny dedicated site keeps workouts and milestones visible.",
    role: "Implemented structured screens for logging activity, sensible defaults for repeat use, and a static deploy on GitHub Pages so the demo stays reachable.",
    outcomes: [
      "Always-on public demo at github.io for recruiters and classmates",
      "Simple stack that emphasizes HTML/CSS/JS fundamentals",
      "Repository separate from templated placeholders for authenticity",
    ],
    timeline: "Side project · live on GitHub Pages",
  },
  "4": {
    problem:
      "Linear todos break down for multi-step, collaborative efforts; a board view keeps priorities visible and handoffs understandable.",
    role: "Column layout with keyboard-friendly controls, optimistic moves between columns, and persistence so refreshes retain state.",
    outcomes: [
      "Shows composition and disciplined state in React",
      "Responsive layout where columns behave well on narrow viewports",
      "Seed tooling for demos and screenshots",
    ],
    timeline: "~6 weeks (school / personal)",
  },
  "5": {
    problem:
      "Technical notes scattered across chats and disks; one static docs URL speeds onboarding and assignment reviews.",
    role: "Markdown pipeline, cohesive layout shell, lightweight client-side search, and deployments from main.",
    outcomes: [
      "Sticky navigation for hopping between chapters quickly",
      "Code samples with workable contrast in dark mode",
      "Hosting cost kept low with plain static assets only",
    ],
    timeline: "~2 months alongside other work",
  },
};
