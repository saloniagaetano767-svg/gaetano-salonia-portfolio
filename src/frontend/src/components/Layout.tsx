import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
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
