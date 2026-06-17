import { type Locale, useTranslation } from "./context";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useTranslation();
  const locales: Locale[] = ["EN", "DE", "IT"];

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full p-1 bg-white/6 border border-white/10 ${className}`}
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          className={`font-mono text-[10px] font-semibold tracking-wider min-w-[2.25rem] px-2.5 py-1.5 rounded-full transition-all duration-200 ${
            locale === l
              ? "bg-[var(--ocean-sunset)]/90 text-[#1a1208] shadow-sm"
              : "text-white/55 hover:text-white/85"
          }`}
          aria-pressed={locale === l}
          aria-label={`Switch language to ${l}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
