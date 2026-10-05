// Manovruti home-page content. Every fact here traces to the company brochure
// ("Manovruti_Architecture to Handover") and the founder's business card — the project's two
// primary sources. Anything added later should trace to a source too.

import type {
  CapabilityMarker, ClientLogo, ContactDetail, Credential, FooterMenuGroup,
  HeroSlide, Insight, Link, MegaPanel, Picture, Reason, Registration, ServiceStage,
} from "@/types/manovruti";

const PHOTO = "/manovruti/photos";
const LOGO = "/manovruti/logos-brand";
const CERT = "/manovruti/certificates";

export const BRAND = {
  name: "MANOVRUTI",
  tagline: "End to end services under one roof",
  /** The trading name, used everywhere the visitor reads. */
  legalName: "Manovruti",
  /** The registered entity, as printed in the company profile. Used only where a legal document
   *  has to name the entity rather than the brand — the privacy policy and the terms. */
  registeredName: "Manovruti Architecture, Interior & Civil PMC Services",
} as const;

export const CONTACT = {
  person: "Rajnikant S Rohit",
  qualification: "B.E. Civil, A.M.I.E. (India)",
  phone: "+91 97230 87807",
  phoneHref: "tel:+919723087807",
  email: "manovruti@gmail.com",
  emailHref: "mailto:manovruti@gmail.com",
  address: ["215 Landmark", "Silvassa 396230", "UT of DNH & DD"],
} as const;

export const HEADER = {
  logoHref: "/",
  logoLabel: "Manovruti home",
  menuLabel: "Menu",
  menuHiddenLabel: "Expand",
  cta: { label: "Enquire", href: "/contact" },
  skip: "Skip to content",
} as const;

/* ---------------------------------------------------------------- 01 hero */

export const HERO_TITLE = { line1: "Plan. Execute.", line2: "Deliver." } as const;

export const HERO_INTRO =
  "Integrated industrial construction — from land feasibility to handover, under one roof.";

export const HERO_SLIDES: HeroSlide[] = [
  // Buildings, not people. Three of these five were stock photographs of strangers — a site team,
  // a handshake over a model, a handshake across a desk — and a visitor's first impression of an
  // engineering practice should be what it builds, not actors standing in for its staff. The three
  // that remain also read as the arc the company sells: bare land, structure going up, plant
  // finished and running.
  //
  // Order is measured, not chosen. The bar over the hero is transparent by design, so the nav sits
  // directly on the picture, and the first slide is the one a visitor lands on. Top-strip
  // luminance and busyness: facility-dusk 0.04 / 0.1, construction 0.80 / 73, land 0.88 / 120.
  // The dark, calm frame leads. (The head gradient in Hero.tsx now carries the other two; before
  // it existed the nav measured 1.00:1 against the land frame and was simply invisible.)
  { src: `${PHOTO}/facility-dusk.jpg`, alt: "Completed industrial facility at dusk" },
  { src: `${PHOTO}/hero-construction.jpg`, alt: "Tower cranes over an industrial structure under construction" },
  { src: `${PHOTO}/hero-land.jpg`, alt: "Aerial view of an industrial land parcel" },
];

/* ------------------------------------------------- 02 pinned scroll panel */

export const HOME_SCROLL = {
  leftTitle: "One brief. One team.",
  fullTitle: "End to end services, under one roof.",
  button: { label: "About Manovruti", href: "/about" },
  note: "Planning a new plant or an expansion?",
  noteLink: { label: "Talk to our team", href: "/contact" },
  // Both picked for a calm, evenly-lit area where the copy sits, so dark type reads without a
  // scrim. The drafting close-up that was here is the second busiest photograph on the page.
  // The left panel carries ink type over its left half. This shot is uneven by measurement — a
  // bright centre ringed with dark red — but that is the intended look and the ink sits on the
  // bright centre at 12.4:1. Chosen by the owner; do not "correct" it on the numbers alone.
  leftImage: `${PHOTO}/hero-facade.jpg`,
  leftImageAlt: "Detail of a completed industrial facade",
  fullImage: `${PHOTO}/hero-development.jpg`,
  fullImageAlt: "Industrial structure rising, drawn over the frame it is built from",
} as const;

/* ----------------------------------------------- 03 the seven work stages */

export const SERVICES_SECTION = {
  title: { display: "Seven stages.", rest: "One partner." },
  description:
    "Architecture to handover, run as a single chain of work rather than six disconnected appointments.",
  cta: { label: "See all services", href: "/#services" },
} as const;

export const SERVICE_STAGES: ServiceStage[] = [
  {
    icon: "land",
    stage: "01",
    slug: "land-liaisoning-feasibility",
    title: "Land Liaisoning & Feasibility",
    phase: "Pre-development statutory clearances",
    href: "/services/land-liaisoning-feasibility",
    points: [
      "NA land conversion",
      "Site feasibility",
      "Statutory guidance",
    ],
    image: `${PHOTO}/land-feasibility.jpg`,
    imageAlt: "Aerial view of agricultural land on the edge of an industrial belt",
    readmore: "Land liaisoning and feasibility",
    panel: "#625653",
    panelTone: "dark",
  },
  {
    icon: "drafting",
    stage: "02",
    slug: "architecture-planning",
    title: "Architecture & Planning",
    phase: "Concept and planning stage",
    href: "/services/architecture-planning",
    points: [
      "Concept design",
      "Master planning",
      "Layout engineering",
    ],
    image: `${PHOTO}/architecture-planning.jpg`,
    imageAlt: "A printed factory site layout on a drawing desk with a scale rule",
    readmore: "Architecture and planning",
    panel: "#925434",
    panelTone: "dark",
  },
  {
    icon: "approval",
    stage: "03",
    slug: "government-liaison-approvals",
    title: "Government Liaison & Approvals",
    phase: "Authority approval management",
    href: "/services/government-liaison-approvals",
    points: [
      "Nagar Palika approvals",
      "CP, OC & fire NOC",
      "Approval coordination",
      "Submission handling",
    ],
    image: `${PHOTO}/approvals-desk.jpg`,
    imageAlt: "Stamped approval documents and drawing rolls being sorted on a desk",
    readmore: "Government liaison and approvals",
    panel: "#C9D3DF",
    panelTone: "light",
  },
  {
    icon: "structure",
    stage: "04",
    slug: "structural-detail-engineering",
    title: "Structural Detail Engineering",
    phase: "Technical execution drawings",
    href: "/services/structural-detail-engineering",
    points: [
      "Detailed design",
      "Structural design",
      "GFC drawings",
      "Specifications & BOQ",
    ],
    image: `${PHOTO}/structural-detailing.jpg`,
    imageAlt: "An engineer working through a structural model against printed drawings",
    readmore: "Structural detail engineering",
    panel: "#707569",
    panelTone: "dark",
  },
  {
    icon: "tender",
    stage: "05",
    slug: "project-execution",
    title: "Project Execution",
    phase: "Tendering phase",
    href: "/services/project-execution",
    points: [
      "Tender documentation",
      "Pre-qualification",
      "Contractor onboarding",
      "Cost engineering",
    ],
    image: `${PHOTO}/execution-site.jpg`,
    imageAlt: "Steel frame of an industrial building going up at sunset",
    readmore: "Project execution and tendering",
    panel: "#E3C1AA",
    panelTone: "light",
  },
  {
    icon: "site",
    stage: "06",
    slug: "project-management",
    title: "Project Management",
    phase: "Core EPC stage",
    href: "/services/project-management",
    points: [
      "Construction execution",
      "Site supervision",
      "Quality & safety",
    ],
    image: `${PHOTO}/project-management.jpg`,
    imageAlt: "Two engineers reviewing a drawing at a table on a construction site",
    readmore: "Project management",
    panel: "#7D5522",
    panelTone: "dark",
  },
  {
    icon: "handover",
    stage: "07",
    slug: "testing-handover-certification",
    title: "Testing, Handover & Certification",
    phase: "Project closure stage",
    href: "/services/testing-handover-certification",
    points: [
      "Snagging & inspection",
      "Compliance verification",
      "Occupancy certificate",
      "Handover documentation",
    ],
    image: `${PHOTO}/handover-certification.jpg`,
    imageAlt: "A completed industrial facility on the day of handover",
    readmore: "Testing, handover and certification",
    panel: "#C9C3BA",
    panelTone: "light",
  },
];

/* --------------------------------------------------------- 04 our journey */

export const JOURNEY = {
  title: { display: "Since 2013,", rest: "one continuous journey." },
  paragraphs: [
    "Manovruti began in 2013 as a consulting practice for architectural and structural projects. Local compliance requirements, growing client demand and consistent results widened the scope year after year, until the company was delivering complete projects rather than drawings alone.",
    "It is now a full-service organisation taking industrial work from concept to reality, backed by architects, engineers, project managers and industry specialists.",
  ],
  button: { label: "Read the full story", href: "/about#journey" },
  note: "With thanks to the customers, well-wishers, investors and vendors who have trusted us for more than a decade.",
  noteLink: { label: "Work with us", href: "/contact" },
  image: `${PHOTO}/engineer-desk.jpg`,
  imageAlt: "Engineer working through a project at their desk",
} as const;

/* ------------------------------------------------------ 05 why choose us */

export const WHY_CHOOSE = {
  title: { display: "Why", rest: "choose Manovruti" },
  description:
    "Industrial projects rarely fail on design. They fail in the gaps between consultants, approvals and contractors. Those gaps are what we remove.",
  button: { label: "How we work", href: "/#services" },
  image: `${PHOTO}/handshake-desk.jpg`,
  imageAlt: "Agreement reached at a project meeting",
} as const;

export const REASONS: Reason[] = [
  {
    title: "Integrated approach",
    description: "All services delivered under one roof, so coordination is ours to manage, not yours.",
    icon: "integrated",
  },
  {
    title: "On-time delivery",
    description: "Well-planned timelines and disciplined project management keep completion dates realistic.",
    icon: "schedule",
  },
  {
    title: "Expert team",
    description: "Experienced professionals with strong technical knowledge handle every stage of the project.",
    icon: "team",
  },
  {
    title: "Customised solutions",
    description: "Solutions shaped around industry requirements, site conditions and future expansion plans.",
    icon: "custom",
  },
  {
    title: "Compliance first",
    description: "Strict adherence to statutory regulations, legal requirements and safety standards.",
    icon: "compliance",
  },
  {
    title: "Cost-effective execution",
    description: "Optimised budgeting and resource planning to maximise efficiency and return on investment.",
    icon: "cost",
  },
];

/* ----------------------------------------------- 06 capability (dark panel) */

export const CAPABILITY = {
  title: { pre: "We hold the", display: "whole", rest: "thread." },
  description:
    "Clearances, drawings, tendering, construction and certification are one continuous chain. Manovruti runs the whole chain, so an approval delay is our problem to solve before it becomes your delay.",
  buttons: [
    { label: "Explore our services", href: "/#services" },
    { label: "Start a conversation", href: "/contact" },
  ] as Link[],
  image: `${PHOTO}/chain-phases.jpg`,
  imageAlt: "One industrial facility shown in four phases across a single view: excavated footings, structural wireframe, erected steel under scaffold, and the finished clad building",
} as const;

// Positioned against the phased render, which reads left to right: excavated footings, then the
// building as a white wireframe, then erected steel under scaffold, then the finished envelope.
// Checked by compositing these percentages onto the image — the previous set was tuned to a
// different picture and put "Handover" in blank sky above the roof.
export const CAPABILITY_MARKERS: CapabilityMarker[] = [
  { label: "Feasibility & clearances", note: "Stages 01–03", left: "15.00%", top: "80.00%", labelLeft: false },
  { label: "Design & drawings", note: "Stage 04", left: "22.00%", top: "47.00%", labelLeft: false },
  { label: "Tender & execution", note: "Stages 05–06", left: "47.00%", top: "40.00%", labelLeft: false },
  { label: "Handover & OC", note: "Stage 07", left: "76.00%", top: "47.00%", labelLeft: true },
];

/* ------------------------------------------------ 07 clientele (dark panel) */

export const CLIENTELE = {
  title: { display: "Organisations", rest: "we have delivered for." },
  cta: { label: "Discuss your project", href: "/contact" },
} as const;

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Gulf", image: `${LOGO}/gulf.webp`, sector: "Lubricants", height: 76 },
  { name: "Hindustan Petroleum", image: `${LOGO}/hindustan-petroleum.webp`, sector: "Oil & gas", height: 84 },
  { name: "Emami Group", image: `${LOGO}/emami-group.webp`, sector: "FMCG", height: 75 },
  { name: "Sun Pharma", image: `${LOGO}/sun-pharma.webp`, sector: "Pharmaceuticals", height: 84 },
  { name: "Reliance Industries", image: `${LOGO}/reliance-industries.webp`, sector: "Conglomerate", height: 69 },
  { name: "Castrol", image: `${LOGO}/castrol.webp`, sector: "Lubricants", height: 49 },
  { name: "Aditya Birla Group", image: `${LOGO}/aditya-birla-group.webp`, sector: "Conglomerate", height: 65 },
  { name: "Adani Power", image: `${LOGO}/adani-power.webp`, sector: "Power", height: 67 },
  { name: "Owens Corning", image: `${LOGO}/owens-corning.webp`, sector: "Building materials", height: 75 },
  { name: "JAK Power", image: `${LOGO}/jak-power.webp`, sector: "Power", height: 63 },
  { name: "Raj Petro", image: `${LOGO}/raj-petro.webp`, sector: "Speciality oils", height: 52 },
  { name: "Powerica", image: `${LOGO}/powerica.webp`, sector: "Power", height: 58 },
  { name: "Ipca", image: `${LOGO}/ipca.webp`, sector: "Pharmaceuticals", height: 56 },
  { name: "Sudhir", image: `${LOGO}/sudhir.webp`, sector: "Power", height: 53 },
  { name: "Savita", image: `${LOGO}/savita.webp`, sector: "Speciality chemicals", height: 59 },
  { name: "Sanathan Textiles", image: `${LOGO}/sanathan-textiles.webp`, sector: "Textiles", height: 45 },
  { name: "Silox India", image: `${LOGO}/silox-india.webp`, sector: "Speciality chemicals", height: 60 },
  { name: "James Walker", image: `${LOGO}/james-walker.webp`, sector: "Engineering", height: 28 },
  { name: "Gee Aar Power Steel", image: `${LOGO}/gee-aar-power-steel.webp`, sector: "Steel", height: 71 },
];

/* --------------------------------------------------------- 08 credentials */

export const CREDENTIALS_SECTION = {
  title: { display: "Certified", rest: "and registered." },
  description:
    "Practice credentials held with national engineering institutions and the local development authority.",
  /**
   * Opens the credentials PDF in a new tab: a cover listing all four registrations with their
   * numbers, then a full page per certificate. Built by scripts/build-credentials-pdf.py from the
   * same images the section already shows, so the two cannot drift apart.
   */
  cta: { label: "See all credentials", href: "/manovruti/manovruti-credentials.pdf" },
} as const;

export const CREDENTIALS: Credential[] = [
  {
    title: "Licensed Structural Engineer",
    issuer: "Dharampur Nagarpalika / DNH PDA",
    registration: "DNH/PDA/SEOR-1C-01/2025/494",
    image: `${CERT}/structural-engineer-licence.jpg`,
    imageAlt: "Licence for architect, engineer and structural engineer",
    featured: true,
  },
  {
    title: "Chartered Engineer (India)",
    issuer: "The Institution of Engineers (India)",
    registration: "AM-145799/6",
    image: `${CERT}/chartered-engineer.jpg`,
    imageAlt: "Chartered Engineer certificate, Institution of Engineers India",
    featured: false,
  },
  {
    title: "Government Approved Valuer",
    issuer: "The Indian Institution of Valuers",
    registration: "CAT-1/A-2863",
    image: `${CERT}/approved-valuer.jpg`,
    imageAlt: "Approved Valuer certificate, Indian Institution of Valuers",
    featured: false,
  },
];

/** The four registrations shown as a strip in the footer. */
export const REGISTRATIONS: Registration[] = [
  { title: "Chartered Engineer", issuer: "Institution of Engineers (India), Kolkata", number: "AM-145799/6" },
  { title: "Structural Engineer", issuer: "DNH PDA", number: "DNH/PDA/SEOR-1C-01/2025/494" },
  { title: "Govt. Approved Valuer", issuer: "Indian Institution of Valuers", number: "CAT-1/A-2863" },
  { title: "Govt. Registered Engineer", issuer: "DNH PDA", number: "DNH/PDA/CEOR/2024/278" },
];

/* ------------------------------------------------------------- 08b insights */

export const INSIGHTS_SECTION = {
  title: { display: "Insights", rest: "from the practice." },
  description:
    "Statutory process in DNH, structural compliance and the sequence a new industrial unit has to follow.",
  cta: { label: "All insights", href: "/insights" },
} as const;

// The insight cards. A card only links if its entry carries an `href` — see the note on
// Insight.href — so an entry added before its article exists renders without becoming a dead
// link. Topics were chosen for what a practice in Silvassa is actually searched for; the bodies
// and the full set live in src/components/insights/article.ts.
export const INSIGHTS: Insight[] = [
  // Order matters: the home page features the first and shows the next two. Widest-reach and
  // highest-converting pieces lead. The full set appears on /insights.
  {
    slug: "buying-industrial-land-silvassa-checklist",
    category: "Land & approvals",
    title: "What to check before you buy industrial land in Silvassa",
    summary: "Zoning, conversion status, who can actually sell it, access, power. The checks that are cheap before you sign and expensive after.",
    href: "/insights/buying-industrial-land-silvassa-checklist",
  },
  {
    slug: "what-a-pmc-actually-does",
    category: "Project management",
    title: "What a project management consultant actually does",
    summary: "Architect, contractor, PMC — where the lines fall, who carries which risk, and when you genuinely do not need one.",
    href: "/insights/what-a-pmc-actually-does",
  },
  {
    slug: "na-permission-dnh",
    category: "Land & approvals",
    title: "NA permission in Dadra & Nagar Haveli",
    summary: "What non-agricultural conversion actually involves, what we need from you to assess a plot, and where the time really goes.",
    href: "/insights/na-permission-dnh",
  },
  {
    slug: "reading-land-records-before-you-buy",
    category: "Land & approvals",
    title: "How to read land records before you buy",
    summary: "The four entries to read first, the two that cause most late-stage failures, and why the record beats what you are told.",
    href: "/insights/reading-land-records-before-you-buy",
  },
  {
    slug: "why-approvals-get-delayed",
    category: "Approvals",
    title: "Why approvals get delayed, and what is actually controllable",
    summary: "The statutory clock starts when a file is accepted, not when it is submitted. Most lost time happens before that.",
    href: "/insights/why-approvals-get-delayed",
  },
  {
    slug: "approvals-sequence-industrial-building",
    category: "Approvals",
    title: "The order industrial approvals have to happen in",
    summary: "Permissions form a chain, not a list. What each one needs from the one before, and what can genuinely run in parallel.",
    href: "/insights/approvals-sequence-industrial-building",
  },
  {
    slug: "occupancy-certificate-why-it-matters",
    category: "Compliance",
    title: "A building is not finished until it is permitted to be used",
    summary: "What an occupancy certificate confirms, why deviations made on site surface here, and what operating without one exposes you to.",
    href: "/insights/occupancy-certificate-why-it-matters",
  },
  {
    slug: "shed-or-rcc-factory-building",
    category: "Structural engineering",
    title: "Steel shed or RCC frame: choosing a factory structure",
    summary: "Span, programme, expansion and environment decide this — not the rate per square foot on the day you ask.",
    href: "/insights/shed-or-rcc-factory-building",
  },
  {
    slug: "soil-investigation-before-design",
    category: "Structural engineering",
    title: "Why soil investigation comes before the drawings",
    summary: "The most expensive part of the building is the part nobody sees. Designing it on an assumption is the commonest avoidable cost.",
    href: "/insights/soil-investigation-before-design",
  },
  {
    slug: "structural-stability-certificate",
    category: "Structural engineering",
    title: "When you need a structural stability certificate",
    summary: "Who is authorised to issue one, what the assessment covers, and why changed loading causes most failures.",
    href: "/insights/structural-stability-certificate",
  },
  {
    slug: "factory-licence-sequence",
    category: "Compliance",
    title: "The factory licence sequence",
    summary: "Being permitted to build and being permitted to operate are two different permissions. Where the licence sits, and what it is tied to.",
    href: "/insights/factory-licence-sequence",
  },
  {
    slug: "fire-noc-industrial-building",
    category: "Compliance",
    title: "Fire NOC: what it asks of the design",
    summary: "Fire requirements shape the plan, the elevation and the footprint. Treating them as a final inspection is how they become a redesign.",
    href: "/insights/fire-noc-industrial-building",
  },
  {
    slug: "expanding-an-existing-factory",
    category: "Execution",
    title: "What changes legally when you expand an existing factory",
    summary: "An extension is a new building with an occupied one attached. Fresh approval, current rules, and an operation you must not stop.",
    href: "/insights/expanding-an-existing-factory",
  },
  {
    slug: "documents-to-keep-from-a-project",
    category: "Handover",
    title: "The documents you should still have five years after handover",
    summary: "They matter at four moments: expansion, renewal, insurance claim and sale. The as-built is the one most often missing.",
    href: "/insights/documents-to-keep-from-a-project",
  },
  {
    slug: "chartered-engineer-structural-engineer-valuer",
    category: "Credentials",
    title: "Chartered Engineer, structural engineer, approved valuer: who you need when",
    summary: "Three registrations, three different signatures, three different things they may certify. Start from what the recipient specifies.",
    href: "/insights/chartered-engineer-structural-engineer-valuer",
  },
];

/* ------------------------------------------------------------ 09 prefooter */

export const PREFOOTER = {
  title: { line1: "Plan your next", display: "facility." },
  description: "Tell us the site, the scope and the deadline. We will tell you what it takes.",
  cta: { label: "Start a conversation", href: "/contact" },
  // Commissioned to the layout: 0.92 portrait to match the 591x640 box, top fifth left as open
  // sky because the sawtooth clip cuts three teeth into it, and a muted dusk palette so it sits on
  // the charcoal panel instead of punching a hole in it. The blue-glass tower that was here was a
  // CBD office block under a cyan sky — wrong building, wrong colour, and the teeth had nothing
  // to cut into.
  image: `${PHOTO}/facility-dusk.jpg`,
  imageAlt: "Single-storey industrial facility at dusk, north-light roof monitors along the ridge",
} as const;

/* --------------------------------------------------------------- 10 footer */

export const FOOTER_MENUS: FooterMenuGroup[] = [
  {
    title: "Services",
    href: "/#services",
    links: SERVICE_STAGES.map((s) => ({ label: s.title, href: s.href })),
  },
  {
    title: "Company",
    href: "/about",
    links: [
      { label: "About Manovruti", href: "/about" },
      { label: "Our journey", href: "/about#journey" },
      { label: "Why choose us", href: "/#why" },
      { label: "Clientele", href: "/#clients" },
      { label: "Credentials", href: "/#credentials" },
      { label: "Insights", href: "/insights" },
    ],
  },
];

export const FOOTER = {
  brandLine: "Integrated industrial construction — land feasibility to handover, under one roof.",
  registrationsTitle: "Registered practice",
  addressTitle: "Office",
  address: CONTACT.address,
  cta: { label: "Start a conversation", href: "/contact" },
  ctaNote: "We reply to project enquiries within two working days.",
  copyright: {
    /** Rendered as `© {year}`; the year is taken from the clock so it cannot go stale. */
    link: { label: "Manovruti", href: "/" },
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ] as Link[],
  },
  /** The maker's credit. Set `href` to "" to render it as plain text, or remove `credit` to drop the line. */
  credit: { prefix: "Designed and developed by", label: "Gaatha", href: "https://gaa-tha.com/" },
} as const;

/* ------------------------------------------------------------ mega menu */

const SERVICE_LINK = (i: number): Link => ({ label: SERVICE_STAGES[i].title, href: SERVICE_STAGES[i].href });

const CONTACT_DETAILS: ContactDetail[] = [
  { title: "Office", lines: [...CONTACT.address], href: null },
  { title: "Phone", lines: [CONTACT.phone], href: CONTACT.phoneHref },
  { title: "Email", lines: [CONTACT.email], href: CONTACT.emailHref },
  { title: "Enquiries", lines: [CONTACT.person, CONTACT.qualification], href: null },
];

export const MEGA_MENU: {
  items: { label: string; href: string; hasSub: boolean }[];
  panels: Record<string, MegaPanel>;
  mobileFooter: string;
} = {
  items: [
    { label: "Services", href: "/#services", hasSub: true },
    // Sectors and its six-link dropdown are gone; Portfolio takes that slot and has its own route.
    { label: "Portfolio", href: "/portfolio", hasSub: false },
    // Company and its dropdown are gone; About is a plain link to its own route.
    { label: "About", href: "/about", hasSub: false },
    // Credentials becomes Blogs, pointing at the Insights section.
    { label: "Blogs", href: "/insights", hasSub: false },
    // Contact has its own route now; the dropdown never rendered anyway, because the
    // contact panel carries details rather than links.
    { label: "Contact", href: "/contact", hasSub: false },
  ],
  panels: {
    services: {
      header: { label: "All seven stages", href: "/#services" },
      groups: [
        { title: "Before you build", href: "/#services", links: [SERVICE_LINK(0), SERVICE_LINK(1), SERVICE_LINK(2)] },
        { title: "Engineering", href: "/#services", links: [SERVICE_LINK(3)] },
        { title: "Delivery", href: "/#services", links: [SERVICE_LINK(4), SERVICE_LINK(5), SERVICE_LINK(6)] },
      ],
      links: [],
      details: [],
      footer: "Plan. Execute. Deliver.",
      bold: "",
    },
    contact: {
      header: null,
      groups: [],
      links: [],
      details: CONTACT_DETAILS,
      footer: "",
      bold: "End to end services under one roof.",
    },
  },
  mobileFooter: "Plan. Execute. Deliver.",
};

export type { Picture };
