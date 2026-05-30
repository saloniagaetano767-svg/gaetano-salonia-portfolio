export type Locale = "EN" | "DE" | "IT";

export interface JourneyItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ServiceCategory {
  code: string;
  title: string;
  items: string[];
}

export interface Translation {
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
    location: string;
    company: string;
    status: string;
    languages: string;
    apprenticeship: string;
    rosterTitle: string;
    roster: string[];
    journeyTitle: string;
  };
  journey: JourneyItem[];
  services: {
    label: string;
    titleLight: string;
    titleAccent: string;
    sub: string;
    categories: ServiceCategory[];
    pills: string[];
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
}
