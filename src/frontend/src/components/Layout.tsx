import { CursorScrollProvider } from "@/context/CursorScrollContext";
import { LocaleProvider, useTranslation } from "@/i18n";
import { FOCUS_RING } from "@/lib/layout";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { PageBackground } from "./PageBackground";
import { ThemeToggle } from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main-content"
      className={`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-background focus:text-foreground focus:shadow-elevated ${FOCUS_RING}`}
    >
      {t.a11y.skipToContent}
    </a>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <LocaleProvider>
      <CursorScrollProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground relative">
          <SkipLink />
          <PageBackground />
          <Navbar />
          <main className="flex-1" id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <ThemeToggle />
        </div>
      </CursorScrollProvider>
    </LocaleProvider>
  );
}
