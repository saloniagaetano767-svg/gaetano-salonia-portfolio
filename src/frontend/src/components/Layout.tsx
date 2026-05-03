import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-100 dark:opacity-90"
          style={{
            background: [
              "radial-gradient(ellipse 90% 65% at 10% 15%, oklch(0.62 0.11 220 / 0.16) 0%, transparent 55%)",
              "radial-gradient(ellipse 75% 55% at 92% 22%, oklch(0.68 0.14 295 / 0.12) 0%, transparent 50%)",
              "radial-gradient(ellipse 60% 40% at 50% 100%, oklch(0.56 0.1 165 / 0.1) 0%, transparent 45%)",
            ].join(","),
          }}
        />
        <div className="absolute inset-0 bg-background/76 dark:bg-background/82" />
      </div>
      <Navbar />
      <div
        className="flex-1"
        id="main-content"
        tabIndex={-1}
        aria-label="Main content"
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
