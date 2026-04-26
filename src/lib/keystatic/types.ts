/** Inferred content types for Keystatic singletons */

export interface HomepageContent {
  meta: { title: string; description: string };
  hero: {
    title: string;
    subtitle?: string | null;
    cta: string;
    ctaSecondary: string;
    contextNote: string;
  };
  context: {
    title?: string | null;
    paragraph1: string;
    paragraph2?: string | null;
    paragraph3?: string | null;
    stats: Array<{ value: string; label: string }>;
  };
  audience: {
    title: string;
    cards: Array<{ key: string; title: string; description: string; cta: string }>;
  };
  messages: {
    title: string;
    items: Array<{ title: string; text: string }>;
  };
  verticals: {
    title: string;
    subtitle: string;
    cta: string;
    items: Array<{ key: string; title: string; description: string }>;
  };
  team?: {
    title?: string | null;
    text?: string | null;
    cta?: string | null;
  } | null;
  cta: {
    title: string;
    subtitle: string;
    button: string;
    buttonSecondary: string;
  };
}

export interface ServiciosContent {
  meta: { title: string; description: string };
  title: string;
  subtitle: string;
  program: { name: string; fullName: string; description: string };
  cta: string;
}

export interface MetodologiaContent {
  meta: { title: string; description: string };
  title: string;
  subtitle: string;
  description: string;
  phases: Array<{ title: string; description: string }>;
  nda: string;
  cta: string;
}

export interface NosotrosContent {
  meta: { title: string; description: string };
  title: string;
  subtitle: string;
  narrative: { title: string; paragraph1: string; paragraph2: string; vision: string };
  founders: {
    title: string;
    profiles: Array<{ title: string; text: string }>;
  };
  vision: {
    title: string;
    phases: Array<{ title: string; text: string }>;
  };
  cta: string;
}

export interface ContactContent {
  meta: { title: string; description: string };
  title: string;
  subtitle: string;
  info: {
    title: string;
    addressTitle: string;
    addressLine1: string;
    addressLine2: string;
    emailTitle: string;
    emailValue: string;
  };
}

export interface SectoresContent {
  meta: { title: string; description: string };
  title: string;
  subtitle: string;
  intro: string;
  originSection: { title: string; subtitle: string };
  cta: string;
}

export interface VerticalContent {
  title: string;
  description: string;
  meta: { title: string; description: string };
  subcategories: Array<{ key: string; title: string; description: string }>;
}

export interface SectoresVerticalsContent {
  terrestrial: VerticalContent;
  naval: VerticalContent;
  aeronautics: VerticalContent;
  aerospace: VerticalContent;
  c4isr: VerticalContent;
  cyber: VerticalContent;
  uav: VerticalContent;
  armament: VerticalContent;
  simulation: VerticalContent;
  auxiliary: VerticalContent;
}

export interface LegalContent {
  meta: { title: string; description: string };
  title: string;
  lastUpdated: string;
  sections: Array<{ key: string; title: string; content: string }>;
}

export interface LandingContent {
  meta: { title: string; description: string };
  title: string;
  subtitle: string;
  valueProps: Array<{ text: string }>;
  cta: string;
}
