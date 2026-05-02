import { Skeleton } from "@/components/ui/skeleton";
import { SAMPLE_PROJECTS } from "@/data/projectContent";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFeaturedProjects } from "../../hooks/usePortfolio";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "../../hooks/useScrollAnimation";
import { ProjectCard } from "../ProjectCard";

function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 flex flex-col gap-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 pt-1">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-5 w-14 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Use IntersectionObserver to apply visible class to scroll-fade items
function useApplyVisibleClass(
  ref: React.RefObject<HTMLElement | null>,
  isVisible: boolean,
) {
  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(".scroll-fade");
    if (isVisible) {
      for (const el of items) {
        el.classList.add("visible");
      }
    }
  }, [ref, isVisible]);
}

export function ProjectsSection() {
  const { data: backendProjects, isLoading } = useFeaturedProjects();
  const projects =
    backendProjects && backendProjects.length > 0
      ? backendProjects
      : SAMPLE_PROJECTS;
  const displayedProjects = projects.slice(0, 3);

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.05,
  });
  const { ref: gridRef, isVisible: gridVisible } =
    useScrollAnimation<HTMLDivElement>({
      threshold: 0.05,
    });
  const staggered = useStaggeredAnimation(displayedProjects.length, 0.1);

  useApplyVisibleClass(
    gridRef as React.RefObject<HTMLElement | null>,
    gridVisible,
  );

  return (
    <section
      id="projects"
      className="py-24 bg-muted/10 border-y border-border/30"
      data-ocid="projects.section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          ref={sectionRef as React.RefObject<HTMLDivElement>}
          className={`mb-14 scroll-fade ${sectionVisible ? "visible" : ""}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-12 bg-primary" />
            <span className="text-primary font-mono text-sm tracking-widest uppercase">
              Selected work
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            Projects &amp; <span className="text-gradient">case studies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Representative builds from apprenticeship, work, and personal
            practice — web apps, tooling, and interfaces that emphasize clear
            engineering and measurable outcomes.
          </p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="projects.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="projects.list"
          >
            {displayedProjects.map((project, i) => (
              <ProjectCard
                key={project.id.toString()}
                project={project}
                index={i}
                isVisible={gridVisible}
                animStyle={staggered[i].style}
              />
            ))}
          </div>
        )}

        {/* Scroll to projects section */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 font-display text-sm tracking-wide group"
            data-ocid="projects.view_all_link"
          >
            <span>View projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
