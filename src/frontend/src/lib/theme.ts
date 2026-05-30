export type SiteTheme = "dark" | "light";

const STORAGE_KEY = "portfolio-theme";

function normalizeStored(value: string | null): SiteTheme {
  if (value === "light" || value === "spectral") return "light";
  return "dark";
}

export function getTheme(): SiteTheme {
  if (typeof window === "undefined") return "dark";
  return normalizeStored(localStorage.getItem(STORAGE_KEY));
}

export function setTheme(theme: SiteTheme): void {
  const root = document.documentElement;
  root.dataset.theme = theme;

  if (theme === "light") {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  } else {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  }

  localStorage.setItem(STORAGE_KEY, theme);
}

export function toggleTheme(): SiteTheme {
  const next: SiteTheme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

export function initTheme(): void {
  setTheme(getTheme());
}
