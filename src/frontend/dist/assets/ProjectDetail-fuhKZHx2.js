import { c as createLucideIcon, i as useParams, j as jsxRuntimeExports, L as Link, B as Button, G as Github, d as Skeleton } from "./index-mRDVAQWc.js";
import { d as useProject, S as SAMPLE_PROJECTS, B as Badge, E as ExternalLink, C as CASE_STUDIES } from "./badge-D89uCdfC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode);
function LoadingSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-6 pt-28 pb-16",
      "data-ocid": "project_detail.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32 mb-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 mb-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 w-full rounded-xl mb-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" })
        ] })
      ]
    }
  );
}
function NotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col items-center justify-center gap-6",
      "data-ocid": "project_detail.error_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-primary text-sm tracking-widest uppercase", children: "404" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-foreground", children: "Project Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "This project doesn't exist or may have been removed." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "data-ocid": "project_detail.back_home_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Portfolio"
        ] }) })
      ]
    }
  );
}
function ProjectDetail() {
  const { id } = useParams({ from: "/projects/$id" });
  const idBigInt = (() => {
    try {
      return BigInt(id);
    } catch {
      return null;
    }
  })();
  const { data: backendProject, isLoading } = useProject(idBigInt ?? BigInt(0));
  if (idBigInt === null) return /* @__PURE__ */ jsxRuntimeExports.jsx(NotFound, {});
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, {});
  const project = backendProject ?? SAMPLE_PROJECTS.find((p) => p.id === idBigInt) ?? null;
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx(NotFound, {});
  const caseStudy = CASE_STUDIES[id] ?? {
    problem: "Solving complex engineering challenges with modern distributed systems.",
    role: "Full-stack engineering lead responsible for architecture, implementation, and delivery.",
    outcomes: [
      "Delivered on time and within scope",
      "Positive stakeholder feedback"
    ],
    timeline: "Several months"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "main",
    {
      className: "min-h-screen bg-background pt-24 pb-20",
      "data-ocid": "project_detail.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10 fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm group",
            "data-ocid": "project_detail.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" }),
              "Back to Portfolio"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-10 slide-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "font-mono text-xs bg-primary/10 text-primary border-primary/30",
                children: project.category
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6", children: project.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed max-w-3xl", children: project.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-8", children: [
            project.liveUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: project.liveUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/90",
                    "data-ocid": "project_detail.live_url_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
                      "View Live Demo"
                    ]
                  }
                )
              }
            ),
            project.githubUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: project.githubUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    className: "gap-2 border-border hover:border-primary/50",
                    "data-ocid": "project_detail.github_url_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "w-4 h-4" }),
                      "View on GitHub"
                    ]
                  }
                )
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-14 border border-border/40 shadow-[0_20px_60px_oklch(var(--primary)/0.12)] slide-up", children: project.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: project.imageUrl,
            alt: project.title,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/project-default-bg.dim_800x450.jpg",
              alt: project.title,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0",
              style: {
                backgroundImage: "linear-gradient(135deg, oklch(var(--primary) / 0.45) 0%, oklch(var(--background) / 0.55) 100%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-5xl font-bold text-white/90 text-center px-8 drop-shadow-lg", children: project.title }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              className: "scroll-fade visible",
              "data-ocid": "project_detail.tech_stack",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-5 h-5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Tech Stack" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: project.techStack.map((tech) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-sm px-3 py-1.5 rounded-lg bg-card border border-border text-foreground",
                    children: tech
                  },
                  tech
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              className: "scroll-fade visible",
              "data-ocid": "project_detail.timeline",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-5 h-5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Timeline" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-mono text-sm", children: caseStudy.timeline })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              className: "scroll-fade visible",
              "data-ocid": "project_detail.problem_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Problem Statement" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-base", children: caseStudy.problem })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              className: "scroll-fade visible",
              "data-ocid": "project_detail.role_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "My Role & Approach" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-base", children: caseStudy.role })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              className: "scroll-fade visible",
              "data-ocid": "project_detail.outcomes_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-5", children: "Outcomes & Impact" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: caseStudy.outcomes.map((outcome) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground leading-relaxed", children: outcome })
                ] }, outcome)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 pt-8 border-t border-border/40 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm group",
              "data-ocid": "project_detail.footer_back_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" }),
                "Back to all projects"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            project.githubUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: project.githubUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "gap-2 text-muted-foreground hover:text-foreground",
                    "data-ocid": "project_detail.footer_github_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "w-4 h-4" }),
                      "GitHub"
                    ]
                  }
                )
              }
            ),
            project.liveUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: project.liveUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "gap-2 text-muted-foreground hover:text-foreground",
                    "data-ocid": "project_detail.footer_live_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
                      "Live"
                    ]
                  }
                )
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
export {
  ProjectDetail as default
};
