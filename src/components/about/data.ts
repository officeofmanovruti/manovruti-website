/**
 * About page content.
 *
 * SOURCE DISCIPLINE. Everything here is traceable to the company profile PDF
 * (`public/manovruti/manovruti-company-profile.pdf`), which is the only primary source the project
 * has. The "Who we are" statement, the mission and the vision are the brochure's own words, with
 * spelling brought into line with the rest of the site (British, as used everywhere else) and
 * nothing added. The journey paragraph is the brochure's, already used on the home page.
 *
 * WHAT IS DELIBERATELY ABSENT. The reference this page is modelled on carries eighty-one team
 * portraits and a headcount. We have neither: the brochure names the disciplines the team is made
 * of and stops there, so this page does the same. No names, no faces, no numbers. If Rajnikant
 * supplies photographs and a headcount, TEAM_DISCIPLINES is where the section grows from.
 */

const PHOTO = "/manovruti/photos";

export const ABOUT_HERO = {
  eyebrow: "Who we are",
  title: "About",
  image: `${PHOTO}/hero-site-team.jpg`,
  imageAlt: "Manovruti site team reviewing work in progress",
} as const;

/** The brochure's opening statement, verbatim but for spelling. */
export const ABOUT_STATEMENT = {
  lead: { display: "One partner", rest: "for the whole of an industrial project." },
  paragraphs: [
    "Manovruti delivers integrated industrial construction services, taking a project through every phase from ideation to execution. A single point of responsibility removes the coordination gaps that cost industrial projects their time, and holds quality, compliance and consistency steady at every stage.",
    "The company is backed by architects, engineers, project managers and industry specialists, and builds infrastructure that is scalable, compliant and sustainable — shaped to what an industrial site actually needs.",
  ],
} as const;

/** Brochure, "Mission & Vision". */
export const MISSION_VISION = [
  {
    label: "Mission",
    text: "To empower industries with world-class construction services that are timely, cost-effective and future-ready.",
  },
  {
    label: "Vision",
    text: "To become the most trusted industrial construction partner in India, recognised for innovation, integrity and excellence in execution.",
  },
] as const;

export const ABOUT_STORY = {
  eyebrow: "Our journey",
  title: { display: "Since 2013,", rest: "one continuous journey." },
  paragraphs: [
    "Manovruti began in 2013 as a consulting firm providing solutions for architectural and structural projects.",
    "Local compliance requirements, growing customer demand and consistent results widened the scope year after year, until the company was delivering complete projects rather than drawings alone. It is now a full-service organisation taking industrial work from concept to reality.",
  ],
  note: "With thanks to the customers, well-wishers, investors and vendors who have trusted us for more than a decade.",
  images: [
    { src: `${PHOTO}/engineer-desk.jpg`, alt: "Engineer working through a project at their desk" },
    { src: `${PHOTO}/team-drawings.jpg`, alt: "Drawings reviewed together at the office" },
  ],
} as const;

/**
 * The disciplines the brochure names, each described by the work it actually does in the seven
 * documented service stages. Nothing here is a claim the service list does not already make.
 */
export const TEAM = {
  eyebrow: "The team",
  title: { display: "Four disciplines,", rest: "one chain of work." },
  description:
    "Industrial projects fail in the gaps between consultants, approvals and contractors. Keeping every discipline in one office is how those gaps are closed.",
} as const;

export const TEAM_DISCIPLINES = [
  { title: "Architects", work: "Concept design, master planning, site planning and layout engineering." },
  { title: "Engineers", work: "Structural design, construction and GFC drawings, technical specifications and BOQ." },
  { title: "Project managers", work: "Tendering, contractor onboarding, site supervision, quality and safety monitoring." },
  { title: "Industry specialists", work: "Land liaisoning, NA conversion, authority approvals and occupancy certification." },
] as const;

export const ABOUT_CLIENTS = {
  /** Big word, then a line whose closing phrase carries the serif accent — the reference's shape. */
  heading: "Clients",
  lead: { main: "Trusted by", accent: "manufacturers across the belt." },
} as const;

/** The marquee runs at a constant speed whatever the viewport; the reference measures 56 px/s. */
export const MARQUEE_SPEED = 56;

/** Ten on the top row travelling right, nine on the bottom travelling left. */
export const CLIENT_ROW_SPLIT = 10;

export const ABOUT_JOIN = {
  title: { display: "Work", rest: "with us." },
  description:
    "Whether you have a site to develop or you build for a living, the conversation starts the same way.",
} as const;

/**
 * The download. `bytes` is the real file size and is shown on the control, so nobody on a phone
 * connection is caught out by it. The print original was 22.3 MB; the served copy is the same
 * eight pages with the images resampled to 150 DPI, which is print quality thrown away and screen
 * quality kept. Re-measure `bytes` if the file is ever replaced.
 */
export const COMPANY_PROFILE = {
  /** Main word plus a serif accent, as the reference sets it. No year: the brochure carries none
   *  and inventing an edition would be inventing a fact. */
  title: { main: "Company", accent: "Profile" },
  spread: "/manovruti/photos/company-profile-spread.jpg",
  spreadAlt: "Pages from the Manovruti company profile",
  description:
    "The full profile: who we are, the seven stages we run, our certificates and the organisations we have delivered for.",
  file: "/manovruti/manovruti-company-profile.pdf",
  fileName: "Manovruti-Company-Profile.pdf",
  format: "PDF",
  pages: 8,
  bytes: 3_512_075,
} as const;

/** "21.3 MB" — one decimal, binary megabytes, so it matches what a download manager reports. */
export function formatBytes(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
