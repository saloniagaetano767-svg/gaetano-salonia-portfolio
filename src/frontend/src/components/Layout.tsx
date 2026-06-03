import { CursorScrollProvider } from "@/context/CursorScrollContext";
import { LocaleProvider } from "@/i18n";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { PageBackground } from "./PageBackground";
import { ThemeToggle } from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <LocaleProvider>
      <CursorScrollProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground relative">
          <PageBackground />
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
          <ThemeToggle />
        </div>
      </CursorScrollProvider>
    </LocaleProvider>
  );
}
