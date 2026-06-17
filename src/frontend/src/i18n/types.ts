export type Locale = "EN" | "DE" | "IT";

export type JourneyPhase = "past" | "current" | "future";

export interface JourneyItem {
  role: string;
  company: string;
  period: string;
  description: string;
  phase: JourneyPhase;
  badge?: string;
}

export interface ServiceCategory {
  title: string;
  items: string[];
}

export interface Translation {
  a11y: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    goToSlide: string;
  };
  nav: {
    about: string;
    skills: string;
    milestones: string;
    contact: string;
  };
  preloader: {
    loading: string;
    enter: string;
  };
  intro: {
    greeting: string;
    nameLine1: string;
    nameLine2: string;
    tagline: string;
    scrollHint: string;
    cv: string;
  };
  depth: {
    label: string;
    sunset: string;
    sea: string;
    reef: string;
  };
  about: {
    label: string;
    titleLight: string;
    titleAccent: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    location: string;
    company: string;
    status: string;
    languages: string;
    apprenticeship: string;
    fields: {
      location: string;
      company: string;
      status: string;
      languages: string;
      apprenticeship: string;
    };
  };
  milestones: {
    label: string;
    titleLight: string;
    titleAccent: string;
  };
  journey: JourneyItem[];
  services: {
    label: string;
    titleLight: string;
    titleAccent: string;
    sub: string;
    cardLabel: string;
    categories: ServiceCategory[];
  };
  contact: {
    label: string;
    titleLight: string;
    titleAccent: string;
    sub: string;
    email: string;
    github: string;
    linkedin: string;
    send: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    successTitle: string;
    successMessage: string;
    nameError: string;
    emailError: string;
    emailInvalid: string;
    messageError: string;
    sending: string;
    errorFallback: string;
  };
  footer: {
    copy: string;
    rights: string;
  };
  theme: {
    enableLight: string;
    disableLight: string;
    buttonLight: string;
    buttonDark: string;
  };
}
