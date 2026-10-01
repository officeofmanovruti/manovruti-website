/**
 * Portfolio content.
 *
 * READ BEFORE PUBLISHING. Two different levels of certainty live in this file and they must not be
 * confused.
 *
 *   FACT      — the client name and its sector. These come from the nineteen logos in Manovruti's
 *               own profile deck, which is the only primary source the project has.
 *   APPROVED  — everything in `title` and `scope`. These were drafted from sector logic rather
 *               than from documented scopes, and were signed off by the owner on 24 Sep 2026 to
 *               publish as they stand. Permission to name the clients publicly was confirmed at
 *               the same time.
 *
 * If a client ever withdraws permission, the same card reads perfectly well as "A leading
 * pharmaceutical manufacturer, Silvassa" — replace `client`, leave everything else.
 */

/** Signed off 24 Sep 2026. Set true again if any entry goes back into question. */
export const DRAFT_PENDING = false;

export type Sector =
  | "Oil & Lubricants"
  | "Pharma & Chemicals"
  | "Power & Electrical"
  | "Textiles"
  | "FMCG & Warehousing"
  | "Steel & Building Materials";

export const SECTORS: Sector[] = [
  "Oil & Lubricants",
  "Pharma & Chemicals",
  "Power & Electrical",
  "Textiles",
  "FMCG & Warehousing",
  "Steel & Building Materials",
];

export type Project = {
  id: string;
  client: string;
  sector: Sector;
  location: string;
  /** DRAFT — unconfirmed. */
  title: string;
  /** DRAFT — unconfirmed. */
  scope: string[];
  stages: string[];
  // No column span here on purpose. It used to be authored per project, which tiled to twelve only
  // for the unfiltered list: pick a sector and the survivors' spans summed to whatever they summed
  // to, leaving every row ragged. The span is now derived from a card's position in whatever list
  // is on screen — see layoutSpans() in PortfolioPage.tsx.
  image?: string;
};

const P = "/manovruti/projects";

export const PROJECTS: Project[] = [
  { id: "01", client: "Gulf Oil Lubricants", sector: "Oil & Lubricants", location: "Silvassa, D&NH",
    title: "Lubricant Blending & Drum Storage Facility",  image: `${P}/01-gulf-oil-drum-storage.jpg`,
    scope: ["Land feasibility and NA conversion for the blending and storage plot",
            "Layout planning and GFC drawings for the drum storage shed and dispatch bay",
            "Fire NOC and statutory approval coordination through to occupancy"],
    stages: ["Land Liaisoning", "Structural Engineering", "Approvals"] },
  { id: "02", client: "Hindustan Petroleum", sector: "Oil & Lubricants", location: "Valsad–Vapi belt",
    title: "Retail Outlet Development — Multi-Site", image: `${P}/02-hpcl-retail-outlet.jpg`,
    scope: ["Land safety and project possibility checks along the highway belt",
            "NA permission and government rules guidance for multiple plots",
            "Canopy, sales building and driveway GFC drawings with CC and OC facilitation"],
    stages: ["Land Liaisoning", "Approvals", "Execution"] },
  { id: "03", client: "Emami Group", sector: "FMCG & Warehousing", location: "Dadra & Nagar Haveli",
    title: "FMCG Plant Expansion Block",  image: `${P}/03-emami-warehouse.jpg`,
    scope: ["Master planning and site planning for the expansion block",
            "Structural design and construction drawings for the finished-goods warehouse",
            "Municipal approvals and statutory documentation handling"],
    stages: ["Architecture Planning", "Structural Engineering", "Approvals"] },
  { id: "04", client: "Sun Pharma", sector: "Pharma & Chemicals", location: "Silvassa, D&NH",
    title: "Formulation Support & Utility Block", image: `${P}/04-sun-pharma-utility-block.jpg`,
    scope: ["Architectural layout coordination for the utility block",
            "Structural detail engineering for the utility structures and ETP platform",
            "Technical specifications and BOQ preparation for tendering"],
    stages: ["Architecture Planning", "Structural Engineering", "Execution"] },
  { id: "05", client: "Reliance Industries", sector: "Pharma & Chemicals", location: "Vapi–Silvassa belt",
    title: "Warehouse & Utility Structures", image: `${P}/05-reliance-warehouse.jpg`,
    scope: ["Structural detail engineering and GFC drawings",
            "Contractor pre-qualification and cost engineering for the civil package",
            "Site supervision with quality control and safety compliance monitoring"],
    stages: ["Structural Engineering", "Execution", "Project Management"] },
  { id: "06", client: "Castrol", sector: "Oil & Lubricants", location: "Silvassa, D&NH",
    title: "Filling Line Shed & Warehouse", image: `${P}/06-castrol-filling-line.jpg`,
    scope: ["Layout engineering and GFC drawings for the filling line shed",
            "Fire NOC and municipal authority approvals",
            "Final inspection, snag rectification and handover documentation"],
    stages: ["Architecture Planning", "Approvals", "Handover"] },
  { id: "07", client: "Aditya Birla Group", sector: "Textiles", location: "Silvassa, D&NH",
    title: "Unit Expansion — Feasibility to Tender", image: `${P}/07-aditya-birla-unit-expansion.jpg`,
    scope: ["Feasibility assessment for the expansion footprint",
            "Concept and detailed design coordination",
            "Tender documentation and contractor onboarding"],
    stages: ["Land Liaisoning", "Architecture Planning", "Execution"] },
  { id: "08", client: "Adani Power", sector: "Power & Electrical", location: "Dadra & Nagar Haveli",
    title: "Equipment Foundations & Civil Works", image: `${P}/08-adani-power-equipment-foundations.jpg`,
    scope: ["Structural design of equipment foundations",
            "Civil works drawings and specifications",
            "Site supervision through commissioning"],
    stages: ["Structural Engineering", "Execution", "Project Management"] },
  { id: "09", client: "Owens Corning", sector: "Steel & Building Materials", location: "Silvassa, D&NH",
    title: "Production Line Foundations & Flooring", image: `${P}/09-owens-corning-production-line.jpg`,
    scope: ["Foundation design for the production line",
            "Industrial flooring specification and detailing",
            "Quality monitoring during execution"],
    stages: ["Structural Engineering", "Execution"] },
  { id: "10", client: "JAK Power", sector: "Power & Electrical", location: "Silvassa, D&NH",
    title: "Manufacturing Shed — Concept to Handover", image: `${P}/10-jak-power-manufacturing-shed.jpg`,
    scope: ["Concept design and master planning",
            "Structural engineering and GFC drawings",
            "Approvals, execution supervision and handover documentation"],
    stages: ["Architecture Planning", "Structural Engineering", "Handover"] },
  { id: "11", client: "Raj Petro Specialities", sector: "Oil & Lubricants", location: "Silvassa, D&NH",
    title: "Tank Farm & Bund Wall", image: `${P}/11-raj-petro-tank-farm.jpg`,
    scope: ["Tank farm layout and bund wall structural design",
            "Statutory clearances for hazardous storage",
            "Execution supervision and compliance verification"],
    stages: ["Structural Engineering", "Approvals", "Execution"] },
  { id: "12", client: "Powerica", sector: "Power & Electrical", location: "Silvassa, D&NH",
    title: "Assembly & Testing Facility", image: `${P}/12-powerica-assembly-testing.jpg`,
    scope: ["Layout planning for assembly and testing bays",
            "Structural detail engineering",
            "Municipal approvals and occupancy certificate"],
    stages: ["Architecture Planning", "Structural Engineering", "Approvals"] },
  { id: "13", client: "Ipca Laboratories", sector: "Pharma & Chemicals", location: "Silvassa, D&NH",
    title: "Formulation Block Planning", image: `${P}/13-ipca-formulation-block.jpg`,
    scope: ["Architectural planning for the formulation block",
            "Coordination with process and utility requirements",
            "Statutory documentation"],
    stages: ["Architecture Planning", "Approvals"] },
  { id: "14", client: "Sudhir Power", sector: "Power & Electrical", location: "Silvassa, D&NH",
    title: "Pre-Engineered Building & Civil Works", image: `${P}/14-sudhir-power-peb.jpg`,
    scope: ["PEB coordination and foundation design",
            "Civil works detailing and BOQ",
            "Site supervision"],
    stages: ["Structural Engineering", "Execution"] },
  { id: "15", client: "Savita Oil Technologies", sector: "Oil & Lubricants", location: "Silvassa, D&NH",
    title: "Blending Plant Expansion", image: `${P}/15-savita-oil-blending-plant.jpg`,
    scope: ["Expansion feasibility and layout engineering",
            "Structural design for the blending plant extension",
            "Approvals and handover"],
    stages: ["Land Liaisoning", "Structural Engineering", "Handover"] },
  { id: "16", client: "Sanathan Textiles", sector: "Textiles", location: "Silvassa, D&NH",
    title: "Spinning Unit Civil & Utility Works", image: `${P}/16-sanathan-textiles-spinning-unit.jpg`,
    scope: ["Civil works design for the spinning unit",
            "Utility block structural engineering",
            "Execution supervision"],
    stages: ["Structural Engineering", "Execution"] },
  { id: "17", client: "Silox India", sector: "Pharma & Chemicals", location: "Silvassa, D&NH",
    title: "Process Block & Effluent Treatment Civil", image: `${P}/17-silox-india-process-block.jpg`,
    scope: ["Process block structural design",
            "ETP civil works detailing",
            "Environmental compliance coordination"],
    stages: ["Structural Engineering", "Approvals"] },
  { id: "18", client: "James Walker", sector: "Steel & Building Materials", location: "Silvassa, D&NH",
    title: "Manufacturing & Administration Block", image: `${P}/18-james-walker-manufacturing-admin.jpg`,
    scope: ["Manufacturing and admin block planning",
            "Structural engineering and drawings",
            "Approvals through occupancy"],
    stages: ["Architecture Planning", "Structural Engineering", "Approvals"] },
  { id: "19", client: "Gee Aar Power Steel", sector: "Steel & Building Materials", location: "Silvassa, D&NH",
    title: "Rolling Mill Shed & Crane Gantry", image: `${P}/19-gee-aar-power-steel-rolling-mill.jpg`,
    scope: ["Rolling mill shed structural design",
            "Crane gantry engineering and detailing",
            "Execution supervision and handover"],
    stages: ["Structural Engineering", "Execution", "Handover"] },
];

export const PORTFOLIO_INTRO = {
  eyebrow: "Our Work",
  title: "Portfolio",
  note: "Images are representative.",
};
