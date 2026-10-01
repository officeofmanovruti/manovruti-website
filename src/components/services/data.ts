/**
 * Per-service page copy.
 *
 * The facts come from the brochure: each stage's phase label and its checkpoints are the
 * brochure's own, and they already live in SERVICE_STAGES. What is added here is explanatory —
 * what the listed activities involve and why the stage matters in a programme. Nothing asserts a
 * number, a client, a timescale or an outcome, because the brochure documents none of those.
 *
 * Keyed by the stage's slug, so a service without an entry fails loudly at build rather than
 * rendering an empty page.
 */

export interface ServiceCopy {
  /** Lead statement. The accent half takes the serif weight, as everywhere else on the site. */
  lead: { main: string; accent: string };
  description: string;
  /** What the stage produces — the thing a client actually receives at the end of it. */
  deliverable: string;
}

export const SERVICE_COPY: Record<string, ServiceCopy> = {
  "land-liaisoning-feasibility": {
    lead: { main: "Before anything is drawn,", accent: "the land has to permit it." },
    description:
      "Non-agricultural conversion, a safety and possibility check on the parcel, and clear guidance on which rules the site actually falls under. This is the stage that decides whether a plot is worth committing to, and the one whose cost is highest when it is taken up after the money has been spent.",
    deliverable: "A feasibility position on the site, and the conversion in progress.",
  },
  "architecture-planning": {
    lead: { main: "A plan", accent: "the site can take." },
    description:
      "Concept design, master planning and layout engineering, worked against the constraints feasibility has already established. An industrial layout is a logistics problem before it is an architectural one: movement, storage, services and room to expand have to resolve before an elevation is worth discussing.",
    deliverable: "A master plan and layout the rest of the programme is drawn from.",
  },
  "government-liaison-approvals": {
    lead: { main: "The permissions,", accent: "in the order they are granted." },
    description:
      "Nagar Palika permissions, commencement and occupancy certificates, fire NOC, and the coordination and documentation between them. Approvals are sequential and each has a department that owns it, so they are run as one tracked process rather than as separate errands.",
    deliverable: "Statutory clearances held and tracked through to occupancy.",
  },
  "structural-detail-engineering": {
    lead: { main: "Drawings a contractor", accent: "can build from." },
    description:
      "Detailed architectural and structural design, good-for-construction drawings, technical specifications and bill of quantities. This is where design intent becomes buildable instruction, and where an ambiguity left on paper is paid for on site.",
    deliverable: "GFC drawings, specifications and a priced bill of quantities.",
  },
  "project-execution": {
    lead: { main: "The right contractor,", accent: "on the right terms." },
    description:
      "Tender documentation and bid management, contractor pre-qualification, vendor onboarding, and cost engineering through to contract. A tender is a specification problem: what comes back is only ever as precise as what went out.",
    deliverable: "A qualified contractor appointed against a documented scope.",
  },
  "project-management": {
    lead: { main: "Someone on site", accent: "who answers for it." },
    description:
      "Civil construction execution, site supervision, and monitoring of quality control and safety compliance. Day to day this is the stage a client feels: whether work is checked as it happens, and whether problems surface while they are still cheap to correct.",
    deliverable: "Construction run and supervised against the drawings and the programme.",
  },
  "testing-handover-certification": {
    lead: { main: "Finished means", accent: "certified and occupied." },
    description:
      "Final inspection and snag rectification, compliance verification, occupancy certificate facilitation and handover documentation. A building is not complete when construction stops; it is complete when it is permitted to be used and the record of it is in the client's hands.",
    deliverable: "Occupancy certificate and the full handover record.",
  },
};

export const SERVICES_INDEX = {
  eyebrow: "Services",
  prev: "Previous stage",
  next: "Next stage",
  includes: "What this stage covers",
  workTitle: { main: "Where this", accent: "shows up on site." },
  workNote: "Projects where this stage was part of our scope. The same site often appears under more than one stage, which is the point — the seven run as one chain of work.",
};

/**
 * Which projects to show under each stage.
 *
 * NOT a curation. Every id below was chosen because that project's own `scope` in
 * portfolio/data.ts names this stage — "Land feasibility and NA conversion" puts Gulf under stage
 * 01, "Fire NOC and municipal authority approvals" puts Castrol under stage 03, and so on. If a
 * scope line changes, re-check the entry here rather than leaving it to drift.
 *
 * Projects repeat across stages on purpose. Manovruti ran several stages on the same site, and a
 * reader seeing Castrol under both approvals and handover is seeing the chain the practice sells.
 *
 * Four ids per stage. The first three render as a row; the last is the wide frame beneath it, so
 * put the most representative project last.
 */
export const STAGE_WORK: Record<string, readonly [string, string, string, string]> = {
  "land-liaisoning-feasibility": ["02", "07", "15", "01"],
  "architecture-planning": ["13", "12", "18", "03"],
  "government-liaison-approvals": ["11", "17", "18", "06"],
  "structural-detail-engineering": ["04", "08", "19", "05"],
  "project-execution": ["05", "14", "08", "07"],
  "project-management": ["09", "14", "11", "16"],
  "testing-handover-certification": ["12", "10", "19", "06"],
};
