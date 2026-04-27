import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "../types/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
  animStyle: React.CSSProperties;
}

export function ProjectCard({
  project,
  index,
  isVisible,
  animStyle,
}: ProjectCardProps) {
  // Distinct overlay hues using CSS variables layered over the default bg image
  const overlayStyles: React.CSSProperties[] = [
    {
      backgroundImage:
        "linear-gradient(135deg, oklch(var(--primary) / 0.45) 0%, oklch(var(--background) / 0.7) 100%)",
    },
    {
      backgroundImage:
        "linear-gradient(135deg, oklch(0.38 0.14 260 / 0.65) 0%, oklch(var(--background) / 0.7) 100%)",
    },
    {
      backgroundImage:
        "linear-gradient(135deg, oklch(0.35 0.16 290 / 0.65) 0%, oklch(var(--background) / 0.7) 100%)",
    },
    {
      backgroundImage:
        "linear-gradient(135deg, oklch(0.32 0.14 160 / 0.65) 0%, oklch(var(--background) / 0.7) 100%)",
    },
    {
      backgroundImage:
        "linear-gradient(135deg, oklch(0.35 0.12 230 / 0.65) 0%, oklch(var(--background) / 0.7) 100%)",
    },
    {
      backgroundImage:
        "linear-gradient(135deg, oklch(0.32 0.12 150 / 0.65) 0%, oklch(var(--background) / 0.7) 100%)",
    },
  ];
  const overlayStyle = overlayStyles[index % overlayStyles.length];

  return (
    <div
      className="scroll-fade group"
      style={animStyle}
      data-ocid={`projects.item.${index + 1}`}
      data-visible={isVisible ? "true" : undefined}
    >
      <Card className="overflow-hidden border-border bg-card h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_oklch(var(--primary)/0.18)] hover:border-accent-glow">
        {/* Image area */}
        <div className="relative h-48 overflow-hidden">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full relative overflow-hidden">
              <img
                src="/assets/generated/project-default-bg.dim_800x450.jpg"
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-70"
                style={overlayStyle}
              />
            </div>
          )}
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-background/80 text-foreground backdrop-blur-sm text-xs font-mono border-border/60"
            >
              {project.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <h3 className="font-display text-lg font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-border/40 mt-auto">
            <Link
              to="/projects/$id"
              params={{ id: project.id.toString() }}
              className="flex-1"
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full justify-between text-primary hover:bg-primary/10 hover:text-primary font-display font-medium"
                data-ocid={`projects.view_details.${index + 1}`}
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="px-2 text-muted-foreground hover:text-foreground"
                >
                  <Github className="w-4 h-4" />
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="px-2 text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
