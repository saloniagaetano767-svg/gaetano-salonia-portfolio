import { type Locale, useTranslation } from "./context";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useTranslation();
  const locales: Locale[] = ["EN", "DE", "IT"];

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          className={`font-mono text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-md transition-all duration-200 ${
            locale === l
              ? "btn-gradient text-[var(--btn-text)]"
              : "surface-muted text-muted-foreground hover:text-primary"
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
