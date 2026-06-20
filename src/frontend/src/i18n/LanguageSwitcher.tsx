import { type Locale, useTranslation } from "./context";
import { JOURNEY_FOCUS_RING } from "@/lib/layout";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useTranslation();
  const locales: Locale[] = ["EN", "DE", "IT"];

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full p-1 bg-white/6 border border-white/10 ${className}`}
      role="group"
      aria-label={t.a11y.language}
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          className={`font-mono text-[10px] font-semibold tracking-wider min-w-[2.25rem] px-2.5 py-1.5 min-h-9 rounded-full transition-all duration-200 cursor-pointer ${JOURNEY_FOCUS_RING} ${
            locale === l
              ? "bg-[var(--ocean-sunset)]/90 text-[var(--ocean-cta-text)] shadow-sm"
              : "text-white/55 hover:text-white/85"
          }`}
          aria-pressed={locale === l}
          aria-label={t.a11y.switchLanguage.replace("{locale}", l)}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
