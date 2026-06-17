export type VisualStyle =
  | "minimal"
  | "moderno"
  | "elegante"
  | "bold"
  | "sobrio"
  | "cálido";

export type TypographyStyle = "moderna" | "serif" | "amigable" | "custom";

export type PageType = "home" | "landing" | "collection" | "product";

export type PageStatus = "draft" | "published" | "discarded";

export type SectionStatus = "generating" | "ready";

export interface BrandKit {
  id: string;
  userId: string;
  brandName: string;
  logoUrl: string | null;
  colorPrimary: string;
  colorSecondary: string;
  colorAccent: string;
  typographyStyle: TypographyStyle;
  businessDescription: string;
  tone: number; // 0 (formal) → 100 (casual)
  visualStyle: VisualStyle;
  updatedAt: string;
}

export type SectionId =
  | "hero-primary"
  | "hero-urgency"
  | "trust-strip"
  | "social-proof"
  | "product-grid"
  | "urgency-banner"
  | "testimonials"
  | "faq-objections"
  | "about-brand"
  | "cta-final"
  | "announcement-bar"
  | "collection-banner";

export type SectionCategory =
  | "hero"
  | "confianza"
  | "productos"
  | "urgencia"
  | "contenido"
  | "cierre";

export interface SectionDefinition {
  id: SectionId;
  name: string;
  croBuiltIn: string;
  usage: string;
  category: SectionCategory;
}

export interface GeneratedSection {
  id: string;
  sectionId: SectionId;
  name: string;
  description: string;
  status: SectionStatus;
  /** Contenido de la sección como props serializables que consume el renderer */
  content: Record<string, unknown>;
}

export interface BuiltPage {
  id: string;
  pageType: PageType;
  title: string;
  sections: GeneratedSection[];
  status: PageStatus;
  createdAt: string;
  updatedAt: string;
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  /** Secciones generadas asociadas a este mensaje (section cards en el chat) */
  sections?: GeneratedSection[];
  timestamp: string;
}
