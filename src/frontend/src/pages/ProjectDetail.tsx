import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CASE_STUDIES, SAMPLE_PROJECTS } from "@/data/projectContent";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers,
} from "lucide-react";
import { useProject } from "../hooks/usePortfolio";

function LoadingSkeleton() {
  return (
    <div
      className="max-w-4xl mx-auto px-6 pt-28 pb-16"
      data-ocid="project_detail.loading_state"
    >
      <Skeleton className="h-5 w-32 mb-8" />
      <Skeleton className="h-10 w-3/4 mb-4" />
      <Skeleton className="h-6 w-24 mb-8" />
      <Skeleton className="h-72 w-full rounded-xl mb-10" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      data-ocid="project_detail.error_state"
    >
      <div className="text-center space-y-3">
        <p className="font-mono text-primary text-sm tracking-widest uppercase">
          404
        </p>
        <h1 className="font-display text-4xl font-bold text-foreground">
          Project Not Found
        </h1>
        <p className="text-muted-foreground max-w-sm">
          This project doesn't exist or may have been removed.
        </p>
      </div>
      <Link to="/" data-ocid="project_detail.back_home_link">
        <Button type="button" variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Button>
      </Link>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams({ from: "/projects/$id" });
  const idBigInt = (() => {
    try {
      return BigInt(id);
    } catch {
      return null;
    }
  })();

  const { data: backendProject, isLoading } = useProject(idBigInt ?? BigInt(0));

  if (idBigInt === null) return <NotFound />;
  if (isLoading) return <LoadingSkeleton />;

  // Resolve project: backend data first, then sample fallback
  const project =
    backendProject ?? SAMPLE_PROJECTS.find((p) => p.id === idBigInt) ?? null;

  if (!project) return <NotFound />;

  const caseStudy = CASE_STUDIES[id] ?? {
    problem:
      "Solving complex engineering challenges with modern distributed systems.",
    role: "Full-stack engineering lead responsible for architecture, implementation, and delivery.",
    outcomes: [
      "Delivered on time and within scope",
      "Positive stakeholder feedback",
    ],
    timeline: "Several months",
  };

  return (
    <main
      className="min-h-screen bg-background pt-24 pb-20"
      data-ocid="project_detail.page"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-10 fade-in">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm group"
            data-ocid="project_detail.back_link"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10 slide-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-primary" />
            <Badge
              variant="secondary"
              className="font-mono text-xs bg-primary/10 text-primary border-primary/30"
            >
              {project.category}
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            {project.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  type="button"
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  data-ocid="project_detail.live_url_button"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Demo
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 border-border hover:border-primary/50"
                  data-ocid="project_detail.github_url_button"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </Button>
              </a>
            )}
          </div>
        </header>

        {/* Hero image */}
        <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-14 border border-border/40 shadow-[0_20px_60px_oklch(var(--primary)/0.12)] slide-up">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <img
                src="/assets/generated/project-default-bg.dim_800x450.jpg"
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(var(--primary) / 0.45) 0%, oklch(var(--background) / 0.55) 100%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white/90 text-center px-8 drop-shadow-lg">
                  {project.title}
                </h2>
              </div>
            </>
          )}
        </div>

        {/* Case study sections */}
        <div className="grid gap-10">
          {/* Tech stack */}
          <section
            className="scroll-fade visible"
            data-ocid="project_detail.tech_stack"
          >
            <div className="flex items-center gap-3 mb-5">
              <Layers className="w-5 h-5 text-primary" />
              <h2 className="font-display text-xl font-semibold text-foreground">
                Tech Stack
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-sm px-3 py-1.5 rounded-lg bg-card border border-border text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <div className="h-px bg-border/40" />

          {/* Timeline */}
          <section
            className="scroll-fade visible"
            data-ocid="project_detail.timeline"
          >
            <div className="flex items-center gap-3 mb-3">
              <CalendarDays className="w-5 h-5 text-primary" />
              <h2 className="font-display text-xl font-semibold text-foreground">
                Timeline
              </h2>
            </div>
            <p className="text-muted-foreground font-mono text-sm">
              {caseStudy.timeline}
            </p>
          </section>

          <div className="h-px bg-border/40" />

          {/* Problem statement */}
          <section
            className="scroll-fade visible"
            data-ocid="project_detail.problem_section"
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Problem Statement
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base">
              {caseStudy.problem}
            </p>
          </section>

          <div className="h-px bg-border/40" />

          {/* Role & Approach */}
          <section
            className="scroll-fade visible"
            data-ocid="project_detail.role_section"
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              My Role &amp; Approach
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base">
              {caseStudy.role}
            </p>
          </section>

          <div className="h-px bg-border/40" />

          {/* Outcomes */}
          <section
            className="scroll-fade visible"
            data-ocid="project_detail.outcomes_section"
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-5">
              Outcomes &amp; Impact
            </h2>
            <ul className="space-y-3">
              {caseStudy.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground leading-relaxed">
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer navigation */}
        <div className="mt-16 pt-8 border-t border-border/40 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm group"
            data-ocid="project_detail.footer_back_link"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to all projects
          </Link>
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground hover:text-foreground"
                  data-ocid="project_detail.footer_github_button"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground hover:text-foreground"
                  data-ocid="project_detail.footer_live_button"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
