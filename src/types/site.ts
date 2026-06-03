export interface NavItem {
  label: string;
  href: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  signature: string;
  nav: NavItem[];
  faq: FaqItem[];
}

export interface ReportProduct {
  id?: string;
  title: string;
  fit: string;
  desc: string;
  cta: string;
  url?: string | null;
  sortOrder?: number;
  active?: boolean;
}

export interface BaziSubmission {
  id?: string;
  name?: string;
  gender?: string;
  birthDate?: string;
  birthTime?: string;
  birthCity?: string;
  focus?: string;
  payload?: Record<string, unknown>;
  createdAt?: string;
}
