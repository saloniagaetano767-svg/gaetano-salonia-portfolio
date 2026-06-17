import type { Translation } from "../types";

export const it: Translation = {
  a11y: {
    skipToContent: "Vai al contenuto principale",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
    goToSlide: "Vai alla slide",
  },
  nav: {
    about: "Chi sono",
    skills: "Competenze",
    milestones: "Percorso",
    contact: "Contatti",
  },
  preloader: {
    loading: "Caricamento",
    enter: "Entra",
  },
  intro: {
    greeting: "Benvenuto al tramonto",
    nameLine1: "Gaetano",
    nameLine2: "Salonia",
    tagline:
      "Un viaggio dal tramonto al mare aperto fino al fondale — chi sono, cosa porto con me e dove sto andando.",
    scrollHint: "Scorri per immergerti",
    cv: "CV",
  },
  depth: {
    label: "Profondità",
    sunset: "Tramonto",
    sea: "Mare",
    reef: "Fondale",
  },
  about: {
    label: "Chi sono",
    titleLight: "Chi",
    titleAccent: "sono",
    p1: "Sono Gaetano — dalla Svizzera, curioso, affidabile e con la voglia di dare vita a idee che aiutano gli altri.",
    p2: "Presso RUAG sto completando il mio apprendistato come Informatiker EFZ in sviluppo applicazioni. Accanto al lavoro continuo a imparare e cerco modi per trasformare le idee in qualcosa di concreto.",
    p3: "Ciò che mi motiva: capire i problemi, migliorare le soluzioni e collaborare con persone che apprezzano la qualità.",
    p4: "Fuori dallo schermo, valorizzo apertura, umorismo e una crescita autentica.",
    location: "🇨🇭 Svizzera",
    company: "🏢 RUAG",
    status: "🟢 Aperto al dialogo",
    languages: "🌐 DE · IT · EN",
    apprenticeship: "🎓 Informatiker EFZ",
    fields: {
      location: "Posizione",
      company: "Azienda",
      status: "Stato",
      languages: "Lingue",
      apprenticeship: "Apprendistato",
    },
  },
  milestones: {
    label: "Tappe",
    titleLight: "Fermate lungo",
    titleAccent: "il cammino",
  },
  journey: [
    {
      role: "Scuola secondaria",
      company: "Sekundarschule Rüti",
      period: "2019 — 2022",
      description:
        "Le basi: lavoro strutturato, curiosità e preparazione all'apprendistato IT.",
      phase: "past",
    },
    {
      role: "Informatiker EFZ — Sviluppo applicazioni",
      company: "Benedict Schule",
      period: "2022 — 2024",
      description:
        "Formazione professionale: sviluppo software, database, progetti di gruppo e presentazioni.",
      phase: "past",
    },
    {
      role: "Apprendista sviluppatore applicazioni",
      company: "RUAG AG",
      period: "2024 — Oggi",
      description:
        "Pratica nello sviluppo software professionale, strumenti interni e interfacce web moderne.",
      phase: "current",
    },
    {
      role: "Attestato federale — AI Business Specialist",
      company: "Esame federale",
      period: "Pianificato",
      description:
        "Unire business e IA applicata — il prossimo passo dopo l'apprendistato.",
      phase: "future",
      badge: "Prossimo passo",
    },
    {
      role: "Laurea",
      company: "Università (pianificato)",
      period: "Pianificato",
      description:
        "A lungo termine: approfondire, crescere e aprire nuove porte.",
      phase: "future",
      badge: "Visione",
    },
  ],
  services: {
    label: "Cosa porto con me",
    titleLight: "Punti di forza &",
    titleAccent: "strumenti",
    sub: "Competenze con cui trasformo le idee in realtà — tecniche e umane.",
    cardLabel: "Area",
    categories: [
      {
        title: "Linguaggi",
        items: [
          "JavaScript",
          "TypeScript",
          "HTML & CSS",
          "SQL",
          "Java",
          "C / C++",
        ],
      },
      {
        title: "Sviluppo",
        items: [
          "React",
          "Tailwind CSS",
          "REST API",
          "Design responsive",
          "Node.js",
          "Vite",
        ],
      },
      {
        title: "Strumenti",
        items: [
          "Git & GitHub",
          "VS Code",
          "Docker",
          "Debugging",
          "Linux & Windows",
        ],
      },
      {
        title: "Personale",
        items: [
          "Problem solving",
          "Apprendimento rapido",
          "Lavoro di squadra",
          "Comunicazione",
          "Affidabilità",
          "Curiosità",
        ],
      },
    ],
  },
  contact: {
    label: "Il fondale",
    titleLight: "Parliamo",
    titleAccent: "insieme.",
    sub: "Hai raggiunto il fondale — scrivimi se vuoi fare due chiacchiere.",
    email: "gaetanosalo@outlook.de",
    github: "github.com/saloniagaetano767-svg",
    linkedin: "linkedin.com/in/gaetano-salonia",
    send: "Invia messaggio",
    namePlaceholder: "Il tuo nome",
    emailPlaceholder: "La tua email",
    messagePlaceholder: "Il tuo messaggio",
    successTitle: "Messaggio inviato",
    successMessage: "Grazie — ti risponderò presto.",
    nameError: "Inserisci il tuo nome.",
    emailError: "Inserisci la tua email.",
    emailInvalid: "Inserisci un'email valida.",
    messageError: "Inserisci un messaggio.",
    sending: "Invio in corso…",
    errorFallback:
      "Qualcosa è andato storto — riprova o scrivimi direttamente.",
  },
  footer: {
    copy: "Gaetano Salonia",
    rights: "Tutti i diritti riservati.",
  },
  theme: {
    enableLight: "Attiva tema chiaro",
    disableLight: "Disattiva tema chiaro",
    buttonLight: "Chiaro",
    buttonDark: "Scuro",
  },
};
