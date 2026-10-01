import type { SVGProps } from "react";

/**
 * Line figures for the seven delivery stages, the six reasons and the contact details.
 * One 24x24 grid, 1.5 stroke, round caps, `currentColor` throughout, so they sit on any panel and
 * inherit the surrounding colour. Drawn rather than borrowed so they read as construction work.
 */
export type FigureProps = SVGProps<SVGSVGElement>;

function Figure({ children, ...props }: FigureProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---- the seven stages ---- */

/** Land parcel with a boundary marker. */
export function LandFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <path d="M2 17.5 9 21l6-2.5L22 22V9l-7-3.5L9 8 2 4.5v13Z" />
      <path d="M9 8v13M15 5.5v13" />
      <circle cx="12" cy="12" r="1.4" />
    </Figure>
  );
}

/** Drawing sheet with a set square. */
export function DraftingFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M7 17 13 7l5 10H7Z" />
      <path d="M3 8h4M3 12h2" />
    </Figure>
  );
}

/** Document carrying an authority seal. */
export function ApprovalFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <path d="M13 2H6a1.5 1.5 0 0 0-1.5 1.5v17A1.5 1.5 0 0 0 6 22h9a1.5 1.5 0 0 0 1.5-1.5V8.5L13 2Z" />
      <path d="M13 2v6.5h6.5M7.5 12h6M7.5 15.5h4" />
      <circle cx="17" cy="17.5" r="3" />
      <path d="m15.6 20 .4 2.5 1-.7 1 .7.4-2.5" />
    </Figure>
  );
}

/** Portal frame: two columns, a beam and its bracing. */
export function StructureFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <path d="M3 21V6h18v15M3 6h18M5.5 21V9M18.5 21V9" />
      <path d="M5.5 9 18.5 21M18.5 9 5.5 21" opacity="0.45" />
      <path d="M2 21h20" />
    </Figure>
  );
}

/** Tender documents on a clipboard. */
export function TenderFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <path d="M8 4H6a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 6 22h12a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 18 4h-2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M8 11h8M8 14.5h8M8 18h5" />
    </Figure>
  );
}

/** Site management: a helmet above a level line. */
export function SiteFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <path d="M2.5 16.5a9.5 9.5 0 0 1 19 0" />
      <path d="M8.5 7.4V4.5A1.5 1.5 0 0 1 10 3h4a1.5 1.5 0 0 1 1.5 1.5v2.9" />
      <path d="M1.5 16.5h21M12 16.5V20" />
      <path d="M8 20h8" />
    </Figure>
  );
}

/** Handover: a key against a completed block. */
export function HandoverFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <path d="M3 21V8l7-5 7 5v13" />
      <path d="M2 21h20M7 21v-5h6v5" />
      <circle cx="18.5" cy="9.5" r="2.5" />
      <path d="M18.5 12v6.5M17 16h3M17 18.5h3" />
    </Figure>
  );
}

/* ---- the six reasons ---- */

/** Interlocking planes: one team, one chain. */
export function IntegratedFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <rect x="3" y="3" width="10" height="10" rx="1.5" />
      <rect x="11" y="11" width="10" height="10" rx="1.5" />
      <path d="M11 11h2v2" />
    </Figure>
  );
}

export function ScheduleFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.5V12l4 2.5" />
    </Figure>
  );
}

export function TeamFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5.4a3.2 3.2 0 0 1 0 5.2M17.5 14.4A6.5 6.5 0 0 1 21.5 20" />
    </Figure>
  );
}

export function CustomFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
      <circle cx="9" cy="6" r="2" />
      <circle cx="15" cy="12" r="2" />
      <circle cx="7.5" cy="18" r="2" />
    </Figure>
  );
}

export function ComplianceFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <path d="M12 2.5 20 5.5v6c0 5-3.4 8.9-8 10.5-4.6-1.6-8-5.5-8-10.5v-6l8-3Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </Figure>
  );
}

export function CostFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <path d="M3 20h18M6 20v-6M11 20V8M16 20v-9M21 20V4" opacity="0.5" />
      <path d="M3 13.5 8 9l4 3 8-7" />
      <path d="M16 5h4v4" />
    </Figure>
  );
}

/* ---- contact ---- */

export function PhoneFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <path d="M6 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2L21 15v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
    </Figure>
  );
}

export function MailFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="m3 6.5 9 6 9-6" />
    </Figure>
  );
}

export function PinFigure(p: FigureProps) {
  return (
    <Figure {...p}>
      <path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Figure>
  );
}

export const STAGE_FIGURES = {
  land: LandFigure,
  drafting: DraftingFigure,
  approval: ApprovalFigure,
  structure: StructureFigure,
  tender: TenderFigure,
  site: SiteFigure,
  handover: HandoverFigure,
} as const;

export const REASON_FIGURES = {
  integrated: IntegratedFigure,
  schedule: ScheduleFigure,
  team: TeamFigure,
  custom: CustomFigure,
  compliance: ComplianceFigure,
  cost: CostFigure,
} as const;

/* ---- edge accents ---- */

/** A quarter disc, used quietly at section edges the way the source uses its colour shapes. */
export function QuarterDisc(p: FigureProps) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" stroke="none" aria-hidden="true" focusable="false" {...p}>
      <path d="M100 100H0C0 44.8 44.8 0 100 0v100Z" />
    </svg>
  );
}

/** A half disc. */
export function HalfDisc(p: FigureProps) {
  return (
    <svg viewBox="0 0 100 50" fill="currentColor" stroke="none" aria-hidden="true" focusable="false" {...p}>
      <path d="M0 50C0 22.4 22.4 0 50 0s50 22.4 50 50H0Z" />
    </svg>
  );
}
