import { Skeleton } from "@/components/ui/skeleton";
import { SAMPLE_PROJECTS } from "@/data/projectContent";
import { useFeaturedProjects } from "@/hooks/usePortfolio";
import { useTranslation } from "@/i18n";
import { projectCode } from "@/lib/motion";
import type { Project } from "@/types/portfolio";
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

function WorkSlide({
  project,
  index,
  total,
}: { project: Project; index: number; total: number }) {
  const { t } = useTranslation();
  const code = projectCode(project.title);
  const tags = project.techStack.slice(0, 6);

  return (
    <div className="min-w-0 flex-[0_0_100%] px-1">
      <Link
        to="/projects/$id"
        params={{ id: project.id.toString() }}
        className="block glass-card rounded-[18px] p-8 md:p-12 relative overflow-hidden group hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-400"
        data-ocid={`work.slide.${index + 1}`}
      >
        <div
          className="absolute top-0 right-0 w-40 h-40 pointer-events-none bg-[radial-gradient(circle,var(--orb-primary)_0%,transparent_70%)]"
          aria-hidden
        />
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <div>
            <p className="font-mono text-[10px] text-muted-foreground/70 tracking-[0.14em] uppercase mb-2">
              {t.work.client}
            </p>
            <p className="font-display text-5xl md:text-7xl font-extrabold grad-teal leading-none mb-4">
              {code}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{project.category}</p>
          </div>
          <p className="font-mono text-sm text-primary font-bold shrink-0">
            {index + 1}/{total}
          </p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-8">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md surface-muted text-foreground/90"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
          {t.work.viewProject}
          <span aria-hidden>→</span>
        </span>
      </Link>
    </div>
  );
}

export function WorkSection() {
  const { t } = useTranslation();
  const { data: backendProjects, isLoading } = useFeaturedProjects();
  const projects =
    backendProjects && backendProjects.length > 0
      ? backendProjects
      : SAMPLE_PROJECTS;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="work"
      className="max-w-[1100px] mx-auto px-8 py-[90px]"
      data-ocid="work.section"
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-mono text-[11px] text-primary tracking-[0.14em] uppercase mb-3.5">
          02 / {t.work.label}
        </p>
        <h2 className="font-display font-extrabold text-[clamp(34px,5vw,52px)] tracking-tight leading-tight mb-10">
          <span className="grad-light">{t.work.titleLight}</span>
          <br />
          <span className="grad-teal">{t.work.titleAccent}</span>
        </h2>
      </motion.div>

      {isLoading ? (
        <Skeleton className="h-80 w-full rounded-[18px] bg-muted" />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {projects.map((project, i) => (
                  <WorkSlide
                    key={project.id.toString()}
                    project={project}
                    index={i}
                    total={projects.length}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={scrollPrev}
                  className="w-10 h-10 rounded-lg surface-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                  aria-label={t.work.prev}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  className="w-10 h-10 rounded-lg surface-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                  aria-label={t.work.next}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-1.5">
                {projects.map((p, i) => (
                  <button
                    key={p.id.toString()}
                    type="button"
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === selectedIndex ? "w-8 bg-primary" : "w-2 bg-[var(--surface-border)]"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
