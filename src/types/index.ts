export interface CompanyConfig {
  name: string;
  tagline: string;
  industry: string;
  description: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  addressNotice: string;
  whatsappNumber: string | null; // null until genuine business number is provided
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  imageAlt: string;
  deliverables: string[];
  keyHighlights: string[];
}

export type ProjectCategory = 'All' | 'Steel Structures' | 'PEB Sheds' | 'RCC Buildings' | 'Industrial Construction';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  isSamplePlaceholder: true;
  summary: string;
  scopeOverview: string;
  keyDetails: {
    structuralType: string;
    designScope: string;
    detailingStandard: string;
    deliverableType: string;
  };
  image: string;
  imageAlt: string;
  technicalNotes: string;
}

export interface ApproachStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  focusAreas: string[];
}

export interface EnquiryPayload {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  serviceRequired: string;
  projectLocation?: string;
  projectScope: string;
  consent: boolean;
  honeypot?: string; // Anti-spam field
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  data?: T;
  isDiagnosticMode?: boolean;
}
