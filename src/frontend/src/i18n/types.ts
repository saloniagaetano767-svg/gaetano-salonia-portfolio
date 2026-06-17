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
  sections: {
    about: string;
    work: string;
    services: string;
    journey: string;
    nextSteps: string;
    contact: string;
  };
  nav: {
    about: string;
    work: string;
    services: string;
    contact: string;
  };
  hero: {
    greeting: string;
    roles: string[];
    tagline: string;
    cta: string;
    cv: string;
    github: string;
    linkedin: string;
    email: string;
  };
  about: {
    label: string;
    titleLight: string;
    titleAccent: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
    location: string;
    company: string;
    status: string;
    languages: string;
    apprenticeship: string;
    journeyTitle: string;
    nextStepsTitle: string;
    fields: {
      location: string;
      company: string;
      status: string;
      languages: string;
      apprenticeship: string;
    };
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
  work: {
    label: string;
    titleLight: string;
    titleAccent: string;
    client: string;
    prev: string;
    next: string;
    viewProject: string;
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
