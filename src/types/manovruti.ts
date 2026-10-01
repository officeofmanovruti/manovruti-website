/** Content types for the Manovruti home page. */

export interface Picture {
  src: string;
  alt: string;
}

export interface Link {
  label: string;
  href: string;
}

export type HeroSlide = Picture;

/** One of the seven delivery stages. */
export interface ServiceStage {
  /** key into STAGE_FIGURES */
  icon: string;
  stage: string;
  /** Route segment for /services/<slug>. Also the key into SERVICE_COPY. */
  slug: string;
  title: string;
  phase: string;
  href: string;
  points: string[];
  image: string;
  imageAlt: string;
  readmore: string;
  /** Card panel colour, and whether its type is ink or white. */
  panel: string;
  panelTone: "light" | "dark";
}

export interface Reason {
  title: string;
  description: string;
  icon: string;
}

/** A labelled hotspot on the capability image. */
export interface CapabilityMarker {
  label: string;
  note: string;
  left: string;
  top: string;
  labelLeft: boolean;
}

export interface ClientLogo {
  name: string;
  image: string;
  sector: string;
  /** Rendered height in px, computed so every mark carries similar visual weight. */
  height: number;
}

export interface Credential {
  title: string;
  issuer: string;
  registration: string;
  image: string;
  imageAlt: string;
  featured: boolean;
}

export interface Registration {
  title: string;
  issuer: string;
  number: string;
}

export interface FooterMenuGroup {
  title: string;
  href: string;
  links: Link[];
}

export interface ContactDetail {
  title: string;
  lines: string[];
  href: string | null;
}

export interface MegaPanel {
  header: Link | null;
  groups: { title: string; href: string; links: Link[] }[];
  links: Link[];
  details: ContactDetail[];
  footer: string;
  bold: string;
}

export interface Insight {
  slug: string;
  category: string;
  title: string;
  summary: string;
  /** Reading time is a fact about the finished article, so it stays out until one exists. */
  /**
   * Optional on purpose. These three are commissions, not published articles, and a card that
   * linked to an unwritten one was a 404 — the home page shipped four of them. The type now makes
   * that impossible to reintroduce: no destination, no link. Give an article an `href` at the
   * moment it has a body, and every card that renders it becomes clickable on its own.
   */
  href?: string;
}
