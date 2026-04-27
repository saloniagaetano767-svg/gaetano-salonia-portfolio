import type { Project } from "@/types/portfolio";

export interface CaseStudy {
  problem: string;
  role: string;
  outcomes: string[];
  timeline: string;
}

/** Fallback projects when the on-chain actor has no data */
export const SAMPLE_PROJECTS: Project[] = [
  {
    id: BigInt(1),
    title: "Personal Portfolio Platform",
    featured: true,
    description:
      "A production-grade portfolio with animated hero, project case studies, and a contact flow — engineered for clarity, performance, and strong first impressions with hiring managers.",
    category: "Web Application",
    techStack: ["TypeScript", "React", "Vite", "Tailwind CSS", "Responsive UI"],
    imageUrl: "",
    githubUrl: "https://github.com/saloniagaetano767-svg",
    liveUrl: "",
  },
  {
    id: BigInt(2),
    title: "Operations Insight Dashboard",
    featured: true,
    description:
      "An internal-style web dashboard for monitoring operational data with role-aware views, exportable summaries, and REST-driven charts — inspired by real enterprise workflows.",
    category: "Full-Stack",
    techStack: ["React", "TypeScript", "REST APIs", "Chart patterns", "Git"],
    imageUrl: "",
    githubUrl: "https://github.com/saloniagaetano767-svg",
    liveUrl: "",
  },
  {
    id: BigInt(3),
    title: "API Validation & Log Toolkit",
    featured: true,
    description:
      "A developer utility that batches REST requests, validates JSON schemas, and writes structured logs — built to speed up debugging during integration work.",
    category: "Developer Tools",
    techStack: ["TypeScript", "Node.js", "REST", "CLI patterns", "Git"],
    imageUrl: "",
    githubUrl: "https://github.com/saloniagaetano767-svg",
    liveUrl: "",
  },
  {
    id: BigInt(4),
    title: "Team Task Board",
    featured: true,
    description:
      "A Kanban-style task board with drag-and-drop columns, filters, and persistence — a focused exercise in state management, UX polish, and maintainable React structure.",
    category: "Frontend",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Local state", "Git"],
    imageUrl: "",
    githubUrl: "https://github.com/saloniagaetano767-svg",
    liveUrl: "",
  },
  {
    id: BigInt(5),
    title: "Markdown Documentation Hub",
    featured: true,
    description:
      "A lightweight documentation site that turns Markdown sources into navigable pages with search and syntax-highlighted code blocks — ideal for teams and school deliverables.",
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
      "Developers early in their careers need a portfolio that feels credible: fast loading, readable typography, and a narrative that connects projects to real skills — not generic template filler.",
    role: "End-to-end ownership: information architecture, UI implementation with React and Tailwind, animation tuning for reduced-motion accessibility, and build optimization with Vite.",
    outcomes: [
      "Lighthouse-friendly static delivery with clear content hierarchy",
      "Reusable section components for rapid iteration on copy and layout",
      "Case-study pages that explain context, stack, and results in one flow",
      "Fully responsive navigation and touch-friendly targets on mobile",
    ],
    timeline: "Ongoing (2025–2026)",
  },
  "2": {
    problem:
      "Operational teams often juggle spreadsheets and ad-hoc reports. A single web surface reduces context switching and makes recurring metrics visible without manual assembly.",
    role: "Implemented typed data hooks against REST endpoints, built chart-ready summaries, and added CSV export — with loading and empty states for production-like UX.",
    outcomes: [
      "Cut manual report prep time in demo scenarios by consolidating views",
      "Error boundaries and retry patterns for flaky network conditions",
      "Consistent design tokens aligned with a dark, professional theme",
    ],
    timeline: "3 months (sample case study)",
  },
  "3": {
    problem:
      "When integrating third-party APIs, teams waste cycles on one-off curl scripts and inconsistent logging — especially when schemas change between environments.",
    role: "Designed a small CLI-oriented workflow: config-driven endpoints, schema checks, and structured log output for CI or local debugging.",
    outcomes: [
      "Faster feedback loop when validating staging vs. production payloads",
      "Reusable command structure for future endpoints",
      "Documentation embedded in the tool’s help output",
    ],
    timeline: "4 weeks (sample case study)",
  },
  "4": {
    problem:
      "Simple todo lists break down when work is multi-step and collaborative. A board view keeps priorities visible and supports handoffs between teammates.",
    role: "Built columnar layout with keyboard-accessible controls, optimistic updates for moves, and persistence so refreshes do not lose progress.",
    outcomes: [
      "Demonstrates component composition and state discipline in React",
      "Mobile layout that collapses columns into a swipe-friendly flow",
      "Seed data generator for demos and screenshots",
    ],
    timeline: "6 weeks (academic / personal)",
  },
  "5": {
    problem:
      "Technical write-ups scatter across drives and chats. A static documentation hub gives one link for onboarding, APIs, and runbooks.",
    role: "Parsed Markdown with a consistent layout, added client-side search, and automated deploys from the main branch.",
    outcomes: [
      "Readers find sections in seconds with sticky navigation",
      "Code samples use accessible contrast in dark mode",
      "Low hosting cost — static assets only",
    ],
    timeline: "2 months (sample case study)",
  },
};
