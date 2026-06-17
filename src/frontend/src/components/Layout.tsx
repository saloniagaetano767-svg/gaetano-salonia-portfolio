import { DepthIndicator } from "@/components/journey/DepthIndicator";
import { JourneyPreloader } from "@/components/journey/JourneyPreloader";
import { MinimalNav } from "@/components/nav/MinimalNav";
import { OceanScene } from "@/components/ocean/OceanScene";
import { JourneyScrollProvider } from "@/context/JourneyScrollContext";
import { LocaleProvider, useTranslation } from "@/i18n";
import { FOCUS_RING } from "@/lib/layout";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main-content"
      className={`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#0a1628] focus:text-white focus:shadow-lg ${FOCUS_RING}`}
    >
      {t.a11y.skipToContent}
    </a>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <LocaleProvider>
      <JourneyScrollProvider>
        <div className="min-h-screen flex flex-col text-white relative ocean-journey">
          <SkipLink />
          <OceanScene />
          <JourneyPreloader />
          <DepthIndicator />
          <MinimalNav />
          <main
            className="flex-1 relative z-10 md:pl-[3.25rem] lg:pl-[3.75rem]"
            id="main-content"
            tabIndex={-1}
          >
            {children}
          </main>
        </div>
      </JourneyScrollProvider>
    </LocaleProvider>
  );
}
