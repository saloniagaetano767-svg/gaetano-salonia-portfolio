import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NAME = "Gaetano Salonia";
const TITLE = "Software Engineer · Switzerland";
const LOCATION = "Based in Switzerland · RUAG · Open to Software Engineer & IT Support roles";
const VALUE_PROP =
  "I build reliable applications with clean architecture — from requirements to delivery — combining apprenticeship rigor with curiosity for modern web technology.";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Staggered entrance
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Animated particle mesh background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion — skip animation entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 70;
    const CONNECTION_DIST = 160;
    const CYAN = "68% 0.12 200";

    function resize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.15,
        });
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `oklch(${CYAN} / ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(${CYAN} / ${p.opacity})`;
        ctx.fill();
      }
    }

    function tick() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      draw();
      rafRef.current = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => {
      resize();
      init();
    });
    ro.observe(canvas.parentElement ?? canvas);
    resize();
    init();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  function scrollToProjects() {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function scrollDown() {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      data-ocid="hero.section"
    >
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-mesh-bg.dim_1600x900.jpg')",
        }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/70" aria-hidden="true" />

      {/* Animated gradient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 60% 45%, oklch(0.62 0.12 200 / 0.11) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Particle mesh canvas */}
      <div className="absolute inset-0" aria-hidden="true">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-6">
        {/* Eyebrow label */}
        <div
          className="flex items-center gap-3"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            transitionDelay: "0.05s",
          }}
        >
          <div className="h-px w-8 bg-primary" />
          <span className="text-primary font-mono text-sm tracking-[0.2em] uppercase">
            {TITLE}
          </span>
        </div>
        <p
          className="text-muted-foreground/90 font-mono text-xs sm:text-sm tracking-wide max-w-2xl"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            transitionDelay: "0.12s",
          }}
        >
          {LOCATION}
        </p>

        {/* Name heading */}
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
            transitionDelay: "0.18s",
          }}
        >
          <span className="text-gradient">{NAME}</span>
        </h1>

        {/* Value proposition */}
        <p
          className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
            transitionDelay: "0.34s",
          }}
        >
          {VALUE_PROP}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center gap-4 pt-2"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
            transitionDelay: "0.50s",
          }}
        >
          <Button
            type="button"
            size="lg"
            onClick={scrollToProjects}
            className="font-display font-semibold tracking-wide px-8 py-6 text-base glow-primary transition-smooth hover:scale-[1.04] active:scale-[0.98]"
            data-ocid="hero.primary_button"
          >
            View selected work
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            asChild
            className="font-display font-semibold tracking-wide px-8 py-6 text-base border-border hover:border-primary hover:text-primary transition-smooth hover:scale-[1.04] active:scale-[0.98]"
            data-ocid="hero.secondary_button"
          >
            <a href="/cv.pdf" download aria-label="Download CV as PDF">
              Download CV
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-smooth group"
        aria-label="Scroll down"
        data-ocid="hero.scroll_indicator"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.7s ease-out",
          transitionDelay: "0.8s",
        }}
      >
        <span className="text-xs font-mono tracking-[0.15em] uppercase opacity-60 group-hover:opacity-100 transition-smooth">
          Scroll
        </span>
        <ChevronDown
          className="animate-bounce w-5 h-5 opacity-60 group-hover:opacity-100"
          strokeWidth={1.5}
        />
      </button>
    </section>
  );
}
