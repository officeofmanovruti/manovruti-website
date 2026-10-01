/**
 * Article bodies.
 *
 * SCOPE DISCIPLINE — read before adding one.
 *
 * These pieces describe *what Manovruti does* and the order it does it in. They do not assert what
 * the law says, how long an authority takes, or what anything costs. Those are the three things
 * that damage a consultancy when they are wrong, they vary by plot and by authority, and only
 * Rajnikant can state them. Where a reader will expect a number, the text says the honest thing —
 * that it depends, and on what.
 *
 * FIFTEEN articles are written (24 Sep 2026), planned as an SEO programme — the topics, target
 * queries, outlines and publishing order are in docs/content-brief.md. Every one has an entry
 * here, so every one has an `href` and every card linking to it works. An article without a body
 * still generates no page and no link; that mechanism is unchanged — see the note on `Insight.href`.
 *
 * NONE OF THEM STATES A LOCAL STATUTORY SPECIFIC. Where a reader expects a fee, a day-count, a
 * department name or a document checklist, the text explains the principle and says the specifics
 * are established for that plot at the outset. That is deliberate and it is the line that keeps
 * this safe to publish before Rajnikant has read it.
 *
 * TWO NEED HIS SIGN-OFF BEFORE LAUNCH above all others: `factory-licence-sequence` and
 * `structural-stability-certificate`. Both describe statutory process, both are written to the
 * general shape rather than the local detail, and both are the ones a reader would act on.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "note"; text: string }
  /** A typographic break. One per piece at most — two is a pattern, three is wallpaper. */
  | { type: "quote"; text: string }
  | { type: "figure"; src: string; alt: string; caption: string };

export interface Article {
  /** Sits under the title, larger than the body. */
  standfirst: string;
  /** The service stage this belongs to, linked at the foot. */
  stageSlug: string;
  /**
   * Runs full width under the title block. Architecture journals lead with the subject.
   * The caption is optional and the lead frame does without one: a line of small type under a
   * full-bleed photograph has nothing to sit against and breaks the run from title to text.
   * Inset figures keep theirs — there the caption has a column edge to align to.
   */
  lead: { src: string; alt: string; caption?: string };
  blocks: Block[];
  /** The piece in four lines, for a reader who came for the answer and not the reasoning. */
  summary: string[];
}

export const ARTICLES: Record<string, Article> = {
  "na-permission-dnh": {
    standfirst:
      "Agricultural land cannot carry a factory. Converting it is the first gate on an industrial project in Dadra & Nagar Haveli, and the one most often reached too late.",
    stageSlug: "land-liaisoning-feasibility",
    lead: {
      src: "/manovruti/photos/hero-land.jpg",
      alt: "Aerial view of an agricultural land parcel in the Silvassa belt",
    },
    blocks: [
      {
        type: "p",
        text: "Non-agricultural conversion — NA permission — is the change of a plot's recorded use from agriculture to something else. Until it is done, an industrial building on that land is not a building the authorities will certify, however well it is designed. It is the first thing we check when a client brings us a site, and the answer decides whether the rest of the programme is worth planning yet.",
      },
      { type: "h2", text: "It is a question about the plot, not about the building" },
      {
        type: "p",
        text: "What the conversion needs depends on the land, not on what you intend to put on it. The record of rights, the current use, where the plot sits against the development plan, whether it is encumbered, whether access exists in law as well as on the ground — these are properties of the parcel. Two neighbouring plots can sit at very different distances from a permission.",
      },
      {
        type: "p",
        text: "That is why we look at the land before anyone draws anything. A layout worked up against a plot that cannot be converted, or can only be converted in part, is a layout that has to be done again.",
      },
      { type: "h2", text: "What we ask a client for" },
      {
        type: "list",
        items: [
          "The survey number and village, so the parcel can be identified in the record.",
          "The 7/12 extract or equivalent record of rights, and any mutation entries.",
          "Whatever documents exist on ownership, tenancy and encumbrance.",
          "What you intend to build, and roughly how much covered area.",
          "When you need to be operating — it changes what we run in parallel.",
        ],
      },
      {
        type: "p",
        text: "With those, the first assessment can say whether conversion is straightforward, conditional or unlikely, and what the next step is in each case. Without them, any answer is a guess dressed up as advice.",
      },
      {
        type: "figure",
        src: "/manovruti/photos/approvals.jpg",
        alt: "Statutory approval documents being checked",
        caption: "The record has to agree with the ground before an application is worth filing.",
      },
      { type: "h2", text: "Where the time actually goes" },
      {
        type: "p",
        text: "In our experience the delay is rarely the decision itself. It is the preparation: a record that does not match the ground, an entry that was never mutated, an access that everyone has always used but nobody has ever documented. Each of those is fixable, and each is far cheaper to fix before an application than after a query.",
      },
      {
        type: "quote",
        text: "The delay is rarely the decision. It is everything that should have been tidied up before the application went in.",
      },
      {
        type: "note",
        text: "Timelines and fees are not published here on purpose. They depend on the plot, the authority and the year, and a number that is out of date is worse than no number. Ask us about a specific site and you will get a specific answer.",
      },
      { type: "h2", text: "Running it alongside the rest" },
      {
        type: "p",
        text: "Conversion does not have to be finished before everything else starts. Concept design, site planning and the approval strategy can be developed against a plot whose conversion is in progress, as long as the design respects what the conversion is likely to permit. Running them in sequence rather than in parallel is one of the most common ways an industrial programme loses a quarter.",
      },
    ],
    summary: [
      "NA conversion changes a plot's recorded use. Until it is done, an industrial building on that land cannot be certified.",
      "What it takes depends on the parcel, not on what you intend to build — two neighbouring plots can sit very differently.",
      "Most of the delay is preparation, not the decision: records that do not match the ground, unmutated entries, undocumented access.",
      "Design and approval strategy can run alongside a conversion in progress. Running them in sequence is how a quarter goes missing.",
    ],
  },

  "buying-industrial-land-silvassa-checklist": {
    standfirst:
      "Most of what goes wrong on an industrial project was decided before the plot was bought. These are the checks that are cheap now and expensive later.",
    stageSlug: "land-liaisoning-feasibility",
    lead: {
      src: "/manovruti/insights/land-checklist.jpg",
      alt: "A survey map and a satellite view compared at the edge of an agricultural plot",
    },
    blocks: [
      {
        type: "p",
        text: "A plot is not a plot. Two parcels on the same road, at the same rate, can carry completely different programmes: one gets you to a commencement certificate in a season, the other has a restriction on it that no amount of design will move. The difference is almost never visible standing on the ground, and it is almost always visible in the paperwork.",
      },
      {
        type: "p",
        text: "What follows is the check we run before we let a client put money down. None of it requires us — a careful buyer can do most of it — but doing it in this order saves the two expensive discoveries, which are finding out after purchase that the land cannot carry what you intended, and finding out mid-approval that the record does not match the ground.",
      },
      { type: "h2", text: "Start with the zone, not the price" },
      {
        type: "p",
        text: "Before anything else, find out which zone the survey number sits in under the development plan. Zoning decides what may be built there at all. A plot zoned for something other than industrial use is not an industrial plot at a discount; it is a different asset with a different, and often unavailable, path to conversion.",
      },
      {
        type: "p",
        text: "Sellers describe land by what is around it. An authority describes it by what is recorded against it. Where those two disagree, the record wins, and the record is a matter of public verification rather than negotiation.",
      },
      { type: "h2", text: "Find out whether it is already non-agricultural" },
      {
        type: "p",
        text: "Agricultural land cannot carry a factory until its recorded use is converted. If conversion has already been done, ask to see the order itself rather than a statement that it exists, and check that it covers the whole parcel you are buying and the use you intend. Partial conversions and conversions granted for a different use are both common and both discovered late.",
      },
      {
        type: "p",
        text: "If it has not been done, that is not a reason to walk away — it is a line item with a timeline attached, and it should be priced into the offer rather than absorbed after it.",
      },
      { type: "h2", text: "Check who can sell it" },
      {
        type: "list",
        items: [
          "Ownership and possession are different things, and the record shows both. Confirm the seller appears as the holder, not merely as an occupant.",
          "Look for charges: a mortgage or a lien travels with the land, not with the person.",
          "In Dadra & Nagar Haveli, land recorded as tribal carries restrictions on who may acquire it. This is the single most consequential thing to establish early, and it is established from the record.",
          "Where the holding has passed by inheritance, check that the mutation has actually been effected. An unrecorded succession stalls everything downstream.",
        ],
      },
      { type: "h2", text: "Stand on it and look at the access" },
      {
        type: "p",
        text: "A parcel with no legal access is landlocked whatever its area. Establish the width of the approach road, who owns it, and whether the right of way is recorded or merely customary. Industrial traffic needs more than a farm track, and widening an approach across somebody else's land after purchase is a negotiation conducted from the weakest possible position.",
      },
      {
        type: "p",
        text: "While you are there, look at levels and drainage. Land that holds water in monsoon is land that will need fill, and fill is measured in truckloads.",
      },
      { type: "h2", text: "Ask what the plot can actually be served with" },
      {
        type: "p",
        text: "Power is the one that catches people. A plot near a line is not a plot with a connection; the sanctioned load available at that point, and what it costs to bring more, is a question for the distribution licensee and worth asking before purchase rather than after. The same applies to water supply and to where effluent, if you will generate any, is permitted to go.",
      },
      {
        type: "quote",
        text: "Everything on this list is answerable before you sign. Almost none of it is answerable cheaply afterwards.",
      },
      { type: "h2", text: "Then work out what will fit" },
      {
        type: "p",
        text: "Only once the above is clear is it worth testing the building against the plot. Setbacks, ground coverage and permissible height together decide how much covered area a parcel can actually carry, and that number is frequently smaller than the number a buyer had in mind. It is better to discover that with a sketch than with a rejected drawing.",
      },
      {
        type: "note",
        text: "If you are weighing a specific plot, send us the survey number and village and what you intend to build. The first reply will tell you which of these checks the plot has already cleared and which it has not.",
      },
    ],
    summary: [
      "Zoning decides what may be built at all. Confirm the zone against the survey number before the price.",
      "If conversion has been done, read the order itself — partial conversions and wrong-use conversions are common.",
      "Ownership, charges, tribal-land status and effected mutations are all matters of record, not of assurance.",
      "Access, levels, power and water are answerable before purchase and expensive to fix after it.",
    ],
  },

  "what-a-pmc-actually-does": {
    standfirst:
      "Contractor, architect, project management consultant — the three get used interchangeably and they carry completely different risk. Here is where the lines actually fall.",
    stageSlug: "project-management",
    lead: {
      src: "/manovruti/insights/pmc-role.jpg",
      alt: "A site meeting around a drawing on a half-built industrial floor",
    },
    blocks: [
      {
        type: "p",
        text: "A project management consultant is the party that owns the programme rather than any single trade within it. The architect is responsible for the design. The contractor is responsible for building what the drawings say. The PMC is responsible for the fact that the drawings, the approvals, the procurement and the site all arrive at the same point in the same week.",
      },
      {
        type: "p",
        text: "That sounds like coordination, and it is, but coordination is not the useful description. The useful description is this: a PMC is the party whose interests are aligned with the building being finished, certified and usable, rather than with any one contract inside it being closed out.",
      },
      { type: "h2", text: "The three roles, plainly" },
      {
        type: "list",
        items: [
          "The architect decides what the building is, and is accountable for the design meeting the brief and the regulations.",
          "The contractor decides how it gets built, and is accountable for executing the drawings to specification, on the rate agreed.",
          "The PMC is accountable for the sequence: that the approval which unlocks the next stage was applied for in time, that the drawing the contractor needs exists before he needs it, and that what is built is what was approved.",
        ],
      },
      { type: "h2", text: "What single-point responsibility means when something goes wrong" },
      {
        type: "p",
        text: "On a project with separate appointments, a delay produces a conversation in which the contractor says the drawing was late, the designer says the approval changed the drawing, and the approval consultant says the application reflected the information available. Each of them is telling the truth about their own scope. Nobody is accountable for the gap between the scopes, because the gap was never in anybody's contract.",
      },
      {
        type: "p",
        text: "That gap is what a PMC is appointed to own. It is also why the appointment is worth least on a small, simple, single-trade job and worth most on a programme where statutory approvals, structural design, long-lead procurement and site work all have to interlock.",
      },
      { type: "h2", text: "What it does not mean" },
      {
        type: "p",
        text: "A PMC does not replace the contractor and does not make the building cheaper by being present. What it changes is where the risk sits and how early problems surface. The savings, where there are any, come from decisions taken in the right order — a foundation designed after the soil is known, an approval applied for with a complete file, a long-lead item ordered before it is on the critical path — rather than from a better rate.",
      },
      {
        type: "quote",
        text: "The question is not whether you can manage it yourself. It is what it costs you to be wrong once.",
      },
      { type: "h2", text: "When you probably do not need one" },
      {
        type: "p",
        text: "If you are extending an existing building by a small area, using a contractor you have worked with repeatedly, with no new statutory approval involved, appointing a PMC is an overhead without a matching risk. We will say so. The honest test is whether the project has more than one dependency that somebody has to hold in their head at once — and whether that somebody has the time to do it.",
      },
      { type: "h2", text: "What to ask before you appoint one" },
      {
        type: "list",
        items: [
          "Which stages are in scope, and which are not. A proposal that does not itemise this is not a proposal.",
          "Who actually attends site, and how often.",
          "What happens to the fee if the programme extends for reasons outside your control.",
          "What you receive at handover — drawings, approvals, test certificates and as-builts are the deliverable, not just the building.",
        ],
      },
      {
        type: "note",
        text: "We are appointed for full programmes and for single stages. If you tell us the plot, the intended use and the deadline, the first reply will say which of the two your project actually needs.",
      },
    ],
    summary: [
      "The architect owns the design, the contractor owns the execution, the PMC owns the sequence between them.",
      "The value is in the gap between scopes — the place where, on a split appointment, nobody is accountable.",
      "A PMC does not make a project cheaper by being present. It changes when problems surface and who carries them.",
      "On a small single-trade job with no new approval, you probably do not need one. We will tell you that.",
    ],
  },

  "reading-land-records-before-you-buy": {
    standfirst:
      "The record tells you what the land is. The seller tells you what it looks like. When the two disagree, the record is the one an authority will act on.",
    stageSlug: "land-liaisoning-feasibility",
    lead: {
      src: "/manovruti/insights/land-records.jpg",
      alt: "A land record document and reading glasses on a desk",
    },
    blocks: [
      {
        type: "p",
        text: "Most industrial buyers see a land record once, at the point of purchase, and read it the way you read a receipt — checking the name and the area and moving on. It is worth more attention than that, because almost everything that later becomes an approval problem is legible in it beforehand.",
      },
      { type: "h2", text: "What the record is for" },
      {
        type: "p",
        text: "A land record is the state's account of a parcel: who holds it, how large it is, what its recorded use is, and what claims exist against it. It is maintained by the revenue administration and it is the document every downstream authority will refer back to. An approval application is, in effect, a request to do something to the parcel the record describes — so where the application and the record disagree, the application is the thing that gets corrected.",
      },
      { type: "h2", text: "Read these four things first" },
      {
        type: "list",
        items: [
          "The survey number and area. Confirm they match what is being sold, and that any sub-division has actually been recorded rather than merely agreed between family members.",
          "The holder's name. Ownership is what you are buying; occupation is not the same thing, and both can appear.",
          "The recorded use. Agricultural means agricultural until an order says otherwise, regardless of what is standing on it.",
          "Encumbrances and other entries. A mortgage, a lien, a court matter or a government acquisition note all attach to the land and survive the sale.",
        ],
      },
      { type: "h2", text: "The entries people skip" },
      {
        type: "p",
        text: "Two categories cause most of the trouble. The first is an unrecorded succession: the holder shown has died and the heirs have agreed among themselves who gets what, but the mutation has never been effected. Everyone on the ground knows the position; the record does not, and no authority will act on what everyone knows.",
      },
      {
        type: "p",
        text: "The second is a restriction on transfer. In this territory the most consequential is land recorded as tribal, which limits who may acquire it. This is not a technicality to be resolved later; it determines whether the transaction can happen at all, and it is visible from the outset to anybody who looks.",
      },
      {
        type: "quote",
        text: "Nothing in a land record is a surprise. It is only ever a thing that was not read.",
      },
      { type: "h2", text: "Match the record to the ground" },
      {
        type: "p",
        text: "Recorded area and measured area diverge more often than buyers expect, particularly on older holdings where boundaries have moved with use. Walk the parcel against the map. Where they differ materially, establish which one the authority will proceed on before you commit, because a building designed to the larger figure and approved against the smaller one is a redesign.",
      },
      { type: "h2", text: "What to collect before you talk to anybody" },
      {
        type: "p",
        text: "A complete set at the outset makes every later conversation shorter: the current record extract, the conversion order if one exists, any approved layout, the sale deed chain, and a site plan showing access. With those, a consultant can tell you in one reading whether the plot supports the programme you have in mind. Without them, any answer is a guess dressed as advice.",
      },
      {
        type: "note",
        text: "Send us what you have and we will tell you what is missing, which is usually the more useful answer at this stage.",
      },
    ],
    summary: [
      "The record is what every downstream authority acts on. Where it disagrees with the ground, the application gets corrected, not the record.",
      "Read four things first: survey number and area, holder, recorded use, and encumbrances.",
      "Unrecorded successions and transfer restrictions cause most late-stage failures, and both are visible from the start.",
      "Recorded and measured area diverge more often than buyers expect. Establish which one governs before you commit.",
    ],
  },

  "why-approvals-get-delayed": {
    standfirst:
      "The statutory clock is not the problem on most industrial projects. The file going back and forth before the clock ever starts is the problem.",
    stageSlug: "government-liaison-approvals",
    lead: {
      src: "/manovruti/insights/approval-delay.jpg",
      alt: "A returned application file waiting on an empty office counter",
    },
    blocks: [
      {
        type: "p",
        text: "When a client asks how long an approval takes, the honest answer has two halves. The half nobody controls is the authority's own processing time once a complete application is accepted. The half that is almost entirely controllable is everything before that acceptance — and in our experience that is where most of the lost months actually sit.",
      },
      { type: "h2", text: "The clock starts later than people think" },
      {
        type: "p",
        text: "An application is not a submission date. It is a date on which a department agreed the file was complete enough to act on. A file returned for a missing document has not started a clock and then paused it; it has not started one. Two rounds of that, each with its own waiting period before anybody looks, and a project has lost a season without a single authority having been slow.",
      },
      { type: "h2", text: "The four causes we see most" },
      {
        type: "list",
        items: [
          "An incomplete file. The most common and the most preventable — a document that was always going to be required, gathered only when it was asked for.",
          "Drawings that do not match the application. An area stated one way in the form and drawn another way is a rejection regardless of which one is right.",
          "A change made mid-application. Every alteration to the scheme after submission restarts something, and the restart is rarely explained to the client in those terms.",
          "Dependencies applied for in the wrong order. Some permissions require another's output as an input; applying in parallel to save time produces a file that cannot be assessed.",
        ],
      },
      { type: "h2", text: "What a consultant can and cannot do about it" },
      {
        type: "p",
        text: "We cannot make a department decide faster, and anybody who implies otherwise should be treated with suspicion. What we can do is make sure a file is complete the first time, that what is drawn is what is stated, that the sequence respects the dependencies, and that when a query comes back it is answered in days rather than weeks. That is not an exciting promise, but it is the one that moves programmes.",
      },
      {
        type: "quote",
        text: "The delay you can do something about is almost always the one that happened before the application was accepted.",
      },
      { type: "h2", text: "What you can do as the client" },
      {
        type: "p",
        text: "Two things, both unglamorous. Get the land documentation complete and consistent before design begins, because most missing-document rejections trace back to it. And resist changing the scheme once an application is in, or if you must change it, decide to change it properly and resubmit rather than attempting to amend in flight.",
      },
      { type: "h2", text: "Planning around it honestly" },
      {
        type: "p",
        text: "A programme that assumes every approval arrives at the earliest possible date is not a programme, it is a hope. We build the sequence with the dependencies marked, so you can see which items have slack and which are genuinely on the critical path. That way a delay in one place is a known consequence rather than a surprise, and the things that can proceed in parallel actually do.",
      },
      {
        type: "note",
        text: "If an application of yours has come back more than once, send us what was submitted and what was returned. The pattern is usually visible immediately.",
      },
    ],
    summary: [
      "The statutory clock starts when a file is accepted as complete, not when it is submitted.",
      "Most lost time is pre-acceptance: incomplete files, drawings that contradict the form, mid-application changes, wrong sequence.",
      "No consultant can make a department decide faster. What is controllable is completeness, consistency, order and response time.",
      "Plan with dependencies marked, so a delay is a known consequence rather than a surprise.",
    ],
  },

  "occupancy-certificate-why-it-matters": {
    standfirst:
      "Construction stopping and a building being finished are two different events. The gap between them is where a lot of industrial projects quietly lose a quarter.",
    stageSlug: "testing-handover-certification",
    lead: {
      src: "/manovruti/insights/occupancy-certificate.jpg",
      alt: "A finished but empty industrial unit, daylight across the concrete floor",
    },
    blocks: [
      {
        type: "p",
        text: "An occupancy certificate is the authority's confirmation that what was built matches what was approved, and that the building may lawfully be used for its intended purpose. Until it exists, a completed factory is a structure you own rather than a facility you may operate.",
      },
      {
        type: "p",
        text: "Most owners understand this in principle. What catches them is that the certificate is not a formality applied for at the end — it is the settlement of every commitment made during design and approval, and it can only be obtained if those commitments were actually kept on site.",
      },
      { type: "h2", text: "What it is actually checking" },
      {
        type: "p",
        text: "The question behind the inspection is narrow: is this the building that was permitted? Setbacks as approved, heights as approved, covered area as approved, the safety provisions the design promised actually installed and working. A building can be well built, structurally sound and entirely usable, and still fail on a deviation that was convenient during construction and is expensive afterwards.",
      },
      { type: "h2", text: "Why deviations happen" },
      {
        type: "list",
        items: [
          "A change made on site for a practical reason, agreed verbally, never reflected in a revised drawing.",
          "An area added late because the space was there and the cost was marginal.",
          "A service routed differently from the approved layout because the approved route clashed with something.",
          "A safety provision value-engineered out during procurement without anybody connecting it to the approval it was promised in.",
        ],
      },
      {
        type: "p",
        text: "None of these are reckless. Each is a sensible decision taken in isolation by somebody who was not holding the approval in mind. That is precisely the gap a project manager exists to close.",
      },
      {
        type: "quote",
        text: "Every deviation is cheap on the day it is decided and expensive on the day it is inspected.",
      },
      { type: "h2", text: "What operating without one exposes you to" },
      {
        type: "p",
        text: "The practical consequences accumulate quietly. Financing and insurance both tend to assume a lawfully occupiable building, and a claim is a poor moment to discover the assumption. A subsequent approval — an expansion, a licence renewal, a change of use — will look for it. And at resale it becomes the buyer's first question and your weakest point in the negotiation.",
      },
      { type: "h2", text: "How to make it a formality" },
      {
        type: "p",
        text: "Treat it as a design-stage obligation rather than a completion-stage task. That means: every site change that touches an approved parameter gets a revised drawing, not an agreement; the test certificates and completion documents are collected as the work happens rather than reconstructed afterwards; and somebody is holding the approved set against the as-built condition throughout, not for the first time in the final week.",
      },
      {
        type: "note",
        text: "If you are approaching completion and are not certain the as-built matches the approval, the cheapest moment to find out is now. Send us the approved drawings and we will tell you where to look.",
      },
    ],
    summary: [
      "An occupancy certificate confirms that what was built is what was approved, and that the building may be used.",
      "It is the settlement of design-stage commitments, not a final formality — deviations made on site surface here.",
      "Operating without one affects financing, insurance, later approvals and, eventually, resale.",
      "It becomes a formality only if every approved parameter that changes on site gets a revised drawing.",
    ],
  },

  "shed-or-rcc-factory-building": {
    standfirst:
      "A steel portal frame and a concrete frame are not two prices for the same building. They suit different spans, different timelines and different futures.",
    stageSlug: "structural-detail-engineering",
    lead: {
      src: "/manovruti/insights/shed-or-rcc.jpg",
      alt: "A steel portal frame and a concrete framed structure on adjacent plots",
    },
    blocks: [
      {
        type: "p",
        text: "The question usually arrives as a cost comparison, and it is not really one. A pre-engineered steel building and a reinforced concrete frame answer different structural problems, and the right choice is usually decided by span, programme and what you expect the building to become — not by the rate per square foot on the day you ask.",
      },
      { type: "h2", text: "Where steel is the obvious answer" },
      {
        type: "p",
        text: "Long clear spans are what steel is for. If the process inside needs uninterrupted floor area — a production hall, a warehouse, anything where a column in the middle is an operational problem — a portal frame gets you there with less material and less depth than concrete will.",
      },
      {
        type: "p",
        text: "It is also fast. The frame is fabricated off site while foundations are cast, and erection is measured in weeks. On a programme where the building is holding up commissioning of equipment that is already ordered, that difference is worth more than the structure costs.",
      },
      { type: "h2", text: "Where concrete earns its place" },
      {
        type: "list",
        items: [
          "Multi-storey. Once you are stacking floors with real live loads, a concrete frame is usually the simpler and stiffer answer.",
          "Heavy or vibrating equipment. Mass helps, and concrete has mass.",
          "Wet, corrosive or high-temperature processes, where the maintenance liability of exposed steelwork is a recurring cost rather than a one-off.",
          "Where fire performance is a design driver and you would otherwise be paying to protect steel.",
        ],
      },
      { type: "h2", text: "The question people forget to ask" },
      {
        type: "p",
        text: "What happens when you expand? A portal frame designed with extension in mind can be opened at the gable and lengthened with relatively little disruption to what is operating inside. A frame designed without that in mind, or a concrete structure that was sized exactly for today, makes the same expansion a much larger intervention.",
      },
      {
        type: "p",
        text: "This is worth deciding at the outset because it costs very little to accommodate and a great deal to retrofit. If there is any realistic prospect of the facility growing, say so before the structural scheme is fixed.",
      },
      {
        type: "quote",
        text: "The cheapest structure for the building you need today is often the most expensive one for the building you will need in five years.",
      },
      { type: "h2", text: "Cost, honestly" },
      {
        type: "p",
        text: "We will not print a comparative rate, because it moves with steel prices, with span, with the loading and with what the foundations meet when they get there. What we will say is that the comparison is only meaningful once the span, the loading and the soil are known — and that a decision made before the soil investigation is a decision made on an assumption about the most expensive part of the building.",
      },
      {
        type: "note",
        text: "Tell us the clear span you need, the loads, and whether the facility is likely to grow. That is enough to say which system the project should be priced on.",
      },
    ],
    summary: [
      "Steel suits long clear spans and fast programmes; the frame fabricates while foundations are cast.",
      "Concrete suits multi-storey, heavy or vibrating equipment, aggressive environments and fire-driven designs.",
      "Design for expansion at the outset — it is nearly free to accommodate and expensive to retrofit.",
      "A cost comparison is only meaningful once span, loading and soil are known.",
    ],
  },

  "documents-to-keep-from-a-project": {
    standfirst:
      "Five years after handover, the building is fine and the paperwork has scattered. Here is the set that turns out to matter, and what each one is for.",
    stageSlug: "testing-handover-certification",
    lead: {
      src: "/manovruti/insights/project-documents.jpg",
      alt: "An archive shelf of labelled project files and rolled drawings",
    },
    blocks: [
      {
        type: "p",
        text: "Nobody plans to lose project records. They disperse: the approved drawings stay with the architect, the test certificates stay with the contractor, the approvals sit in a file somebody has since left with, and the as-built exists only as a set of marked-up prints in a site office that no longer exists.",
      },
      {
        type: "p",
        text: "It becomes a problem at exactly four moments — an expansion, a licence renewal, an insurance claim, and a sale — and at each of those the cost of reconstruction is far higher than the cost of having kept them.",
      },
      { type: "h2", text: "The set worth keeping" },
      {
        type: "list",
        items: [
          "The approved drawings, as stamped. Not the working set, not the latest revision — the set the approval was granted against.",
          "The structural design calculations and the drawings they belong to. Required for any future expansion or stability assessment, and effectively impossible to reproduce afterwards.",
          "Every statutory approval, in its original form, with its conditions.",
          "Material and works test certificates — concrete cube results, steel test certificates, any specialist testing.",
          "Completion and occupancy documentation.",
          "As-built drawings, particularly the services. This is the one most often missing and most often needed.",
          "The soil investigation report.",
          "Warranties and operating documentation for installed equipment and systems.",
        ],
      },
      { type: "h2", text: "Why the as-built is the one that bites" },
      {
        type: "p",
        text: "Structure rarely moves after handover. Services always do. When somebody needs to cut a trench, add a machine, extend a line or find out why a drain is where it is, the approved drawing tells them what was intended and the as-built tells them what exists. Without one, the answer is exploratory excavation, which is slow, disruptive and occasionally destructive.",
      },
      {
        type: "quote",
        text: "The cheapest moment to produce an as-built is while somebody still remembers what was done.",
      },
      { type: "h2", text: "How to keep it so it survives" },
      {
        type: "p",
        text: "Two rules. Keep a complete digital set, scanned at a resolution where the dimensions and the stamps are legible, held somewhere that is not one person's laptop. And keep the originals of anything bearing a seal or signature, because a scan of a stamped approval is not always accepted as one.",
      },
      {
        type: "p",
        text: "Name the files so that somebody who was not on the project can navigate them. A folder of numbered scans is technically a record and practically a search problem.",
      },
      { type: "h2", text: "Ask for it at handover, in writing" },
      {
        type: "p",
        text: "The handover documentation set should be a named deliverable in the appointment, not a favour requested afterwards. The difference in how completely it arrives is considerable, and the moment of maximum leverage is before the final payment rather than after it.",
      },
      {
        type: "note",
        text: "If you are appointing for a project now, ask what the handover set contains. If you are five years past one and cannot find it, we can tell you what is reconstructable and what is not.",
      },
    ],
    summary: [
      "Records matter at four moments: expansion, licence renewal, insurance claim and sale.",
      "Keep the stamped approved drawings, structural calculations, approvals with conditions, test certificates, completion documents, as-builts and the soil report.",
      "The as-built services drawing is the one most often missing and the most expensive to do without.",
      "Make the handover set a named deliverable in the appointment, not a request after final payment.",
    ],
  },

  "chartered-engineer-structural-engineer-valuer": {
    standfirst:
      "Three registrations, three different signatures, three different things they are allowed to certify. Knowing which one you need saves a wasted appointment.",
    stageSlug: "structural-detail-engineering",
    lead: {
      src: "/manovruti/insights/engineer-credentials.jpg",
      alt: "Professional certificates on a desk beside a pen and an engineer's stamp",
    },
    blocks: [
      {
        type: "p",
        text: "Clients frequently arrive asking for the wrong professional, because the titles sound adjacent and the work overlaps. They are not interchangeable: each registration is granted by a different body, for a different purpose, and permits its holder to sign a different set of documents.",
      },
      { type: "h2", text: "Chartered Engineer" },
      {
        type: "p",
        text: "A professional registration granted by a national engineering institution on the basis of qualification and experience. In practice it is what banks, insurers, government departments and overseas authorities look for when they need an engineer's certification of value, condition, quantity or specification from somebody accountable to a professional body.",
      },
      {
        type: "p",
        text: "You want one when a third party needs an independent engineering statement they can rely on — a bank requiring a certificate, a department requiring a professional attestation, a counterparty requiring verification of what was built or installed.",
      },
      { type: "h2", text: "Registered or licensed structural engineer" },
      {
        type: "p",
        text: "A registration held with the local development or planning authority, which permits the holder to design and sign structural drawings and calculations for submission in that jurisdiction. It is jurisdictional: a registration held with one authority does not automatically carry to another.",
      },
      {
        type: "p",
        text: "You want one whenever a structure needs designing or a structural document needs submitting to the authority — a new building, an extension, a change of loading on an existing frame, or a stability assessment where the recipient requires a registered signatory.",
      },
      { type: "h2", text: "Government approved valuer" },
      {
        type: "p",
        text: "A registration for the valuation of assets, granted through the relevant professional institution. A valuer determines what something is worth, for a purpose that usually involves a third party relying on the figure — lending, taxation, insurance, dispute, acquisition or disposal.",
      },
      {
        type: "p",
        text: "Valuation is a distinct discipline from design. An engineer who can tell you exactly how a building is constructed is not, by that fact, able to sign a valuation that a bank will accept.",
      },
      {
        type: "quote",
        text: "The question is never who is most qualified. It is whose signature the recipient will accept.",
      },
      { type: "h2", text: "Working out which one you need" },
      {
        type: "list",
        items: [
          "Start from the recipient. Whoever is asking for the document usually specifies the registration they require — read that line before appointing anybody.",
          "If it is a structural design or a submission to the planning authority, it is the structural registration, and it must be current in that jurisdiction.",
          "If it is a figure of worth for a bank, an insurer or a tax purpose, it is the valuer.",
          "If it is an independent engineering attestation for a third party, it is the Chartered Engineer.",
        ],
      },
      {
        type: "p",
        text: "One practical note: it is entirely normal for a single practice to hold more than one of these, and it saves time when it does — the same firm can carry a project from structural design through to a certificate a bank will accept without a handover in the middle.",
      },
      {
        type: "note",
        text: "Manovruti holds all three, along with registration as a Government Registered Engineer. The certificates and their numbers are on the credentials section of this site.",
      },
    ],
    summary: [
      "The three registrations come from different bodies and permit different signatures. They are not interchangeable.",
      "Chartered Engineer: an independent engineering attestation a third party will rely on.",
      "Registered structural engineer: structural design and submissions, and it is jurisdictional.",
      "Approved valuer: a figure of worth for lending, tax, insurance or dispute. Start from what the recipient specifies.",
    ],
  },

  "soil-investigation-before-design": {
    standfirst:
      "The most expensive part of an industrial building is usually the part nobody sees. Designing it on an assumption is the most common avoidable cost on a project.",
    stageSlug: "structural-detail-engineering",
    lead: {
      src: "/manovruti/insights/soil-investigation.jpg",
      alt: "A soil boring rig and extracted samples on open ground",
    },
    blocks: [
      {
        type: "p",
        text: "A soil investigation tells you what the ground beneath a plot can carry and how it will behave under load. Everything structural follows from that: foundation type, foundation depth, how much concrete goes into the ground, and whether the floor slab of a warehouse will stay flat under racking.",
      },
      {
        type: "p",
        text: "It is a small, early, unglamorous cost, and it is skipped more often than any other item on an industrial programme — usually on the reasoning that the neighbouring plot was fine.",
      },
      { type: "h2", text: "Why the neighbour's plot does not tell you" },
      {
        type: "p",
        text: "Ground conditions change over short distances, particularly on land that has been filled, farmed, levelled or drained. A parcel that was low and has been made up to road level may have several metres of uncontrolled fill under it that looks identical to the plot next door from the surface. Foundations designed for the neighbour's conditions and built on that fill are the classic and costly mistake.",
      },
      { type: "h2", text: "What the report actually gives you" },
      {
        type: "list",
        items: [
          "The bearing capacity available, and at what depth you have to go to get it.",
          "The soil profile — what the layers are, and where the changes occur.",
          "The water table, which governs both construction method and long-term durability.",
          "Settlement behaviour, which is what decides whether a large floor slab stays level.",
          "Any chemical aggressiveness in the ground that the concrete specification has to answer.",
        ],
      },
      { type: "h2", text: "What skipping it costs" },
      {
        type: "p",
        text: "Two outcomes, and they are opposite. Either the foundations are over-designed against the unknown, and you pay for concrete and steel you never needed across the whole footprint — or they are under-designed, which surfaces during excavation at best and after occupation at worst. The first is a quiet, permanent overspend. The second is a redesign with the contractor already mobilised.",
      },
      {
        type: "quote",
        text: "A soil report costs a fraction of one foundation. It is priced against the whole substructure.",
      },
      { type: "h2", text: "When to commission it" },
      {
        type: "p",
        text: "After the plot is secured and before the structural scheme is fixed. Earlier than that and you may be paying to investigate land you do not buy; later and the design is already committed to assumptions the report may contradict. The ideal moment is alongside concept design, so the structural engineer receives it before the scheme is priced.",
      },
      {
        type: "p",
        text: "Make sure the borehole locations reflect the actual building footprint rather than the convenient corners of the site, and that the depth explored is appropriate for the loads intended. A report from three shallow holes in the wrong places is a document, not an investigation.",
      },
      {
        type: "note",
        text: "If you have a report already, send it with your enquiry. It is the single document that most improves the accuracy of a first response.",
      },
    ],
    summary: [
      "Soil investigation decides foundation type and depth — the most expensive and least visible part of the building.",
      "Ground conditions change over short distances. The neighbouring plot is not evidence, particularly on filled land.",
      "Skipping it produces either a permanent overspend on over-design, or a redesign discovered during excavation.",
      "Commission it after the plot is secured and before the structural scheme is fixed.",
    ],
  },

  "expanding-an-existing-factory": {
    standfirst:
      "An extension is rarely a smaller version of a new build. It is a new building with an occupied one attached to it, and that changes almost everything.",
    stageSlug: "project-execution",
    lead: {
      src: "/manovruti/insights/factory-expansion.jpg",
      alt: "A steel frame extension being erected against an operating factory",
    },
    blocks: [
      {
        type: "p",
        text: "Owners tend to approach an expansion as a simpler project than the original, because the land is already theirs, the approvals were obtained once, and the building works. Each of those is true and none of them makes it simpler. An extension has two constraints a new build does not: an existing structure it has to relate to, and an operation it must not stop.",
      },
      { type: "h2", text: "The approval is not automatic" },
      {
        type: "p",
        text: "The original permission was granted for a specific covered area, footprint and use. Adding to any of those is a fresh application against the current rules, which may not be the rules that applied when the original was granted. Setbacks, ground coverage, parking provision and safety requirements can all have moved.",
      },
      {
        type: "p",
        text: "It is also assessed against the whole site, not just the new part. An expansion can push a plot past a threshold — of area, of height, of occupancy — that brings requirements into play which the existing building has never had to meet. That is a discovery worth making before design, not during assessment.",
      },
      { type: "h2", text: "The existing structure is now a design input" },
      {
        type: "list",
        items: [
          "If you are building onto the existing frame, its capacity has to be verified rather than assumed. The original design carried the original loads.",
          "Foundations adjacent to existing ones need care in both design and excavation sequence.",
          "Differential settlement between old and new is a real risk and is designed for, usually with a movement joint.",
          "Where the original drawings and calculations cannot be found, the assessment starts with surveying and testing what is there — which is slower and more expensive than reading a file.",
        ],
      },
      { type: "h2", text: "Building next to a working factory" },
      {
        type: "p",
        text: "The operational constraint usually drives the programme more than the construction does. Access routes for materials, crane positions, noise and dust affecting the process next door, temporary disconnection of services, and safety segregation between a live workforce and a construction site all have to be planned rather than improvised.",
      },
      {
        type: "p",
        text: "This is the part most often underestimated in a price. A contractor who quoted for a clear site and is handed a live one will find the difference, and the finding will not be in your favour.",
      },
      {
        type: "quote",
        text: "The cost of an extension is decided less by what you are building than by what you cannot stop.",
      },
      { type: "h2", text: "The licence and the certificate follow too" },
      {
        type: "p",
        text: "Adding covered area or changing what happens inside it generally has consequences for the statutory registrations the facility already holds. Plan for the amendment alongside the construction rather than after it, so that the expanded facility is lawfully usable on the day it is ready rather than some months later.",
      },
      {
        type: "note",
        text: "Send the original approved drawings with your enquiry if you have them. Whether they exist changes the first stage of the work substantially.",
      },
    ],
    summary: [
      "An extension is a fresh application assessed against current rules and against the whole site, not just the new part.",
      "The existing structure becomes a design input — capacity verified, not assumed; differential settlement designed for.",
      "The operational constraint usually drives the programme more than the construction does.",
      "Statutory registrations follow the expansion. Plan the amendment alongside the build, not after it.",
    ],
  },

  "fire-noc-industrial-building": {
    standfirst:
      "Fire requirements are a design input, not a final inspection. Treating them as the last hurdle is how they become a redesign.",
    stageSlug: "government-liaison-approvals",
    lead: {
      src: "/manovruti/insights/fire-noc.jpg",
      alt: "A hydrant riser and hose reel cabinet on an industrial building wall",
    },
    blocks: [
      {
        type: "p",
        text: "The most common misunderstanding about fire clearance is its position in the sequence. Owners tend to picture an inspection near completion, at which equipment is checked and a certificate issued. The inspection is real, but by the time it happens almost everything it examines was determined at design stage — and if it was not, the remedy is construction rather than procurement.",
      },
      { type: "h2", text: "What fire safety asks of the building itself" },
      {
        type: "p",
        text: "Long before any equipment is specified, fire requirements shape the architecture. How far a person may have to travel to reach an exit governs the plan. The number, width and position of exits govern the elevation. Separation between the building and its boundary governs the footprint. Compartmentation between different activities governs the internal layout.",
      },
      {
        type: "p",
        text: "These are not adjustments. Changing travel distance after the frame is up is not an adjustment; it is a new opening, a new route, and sometimes a new staircase.",
      },
      { type: "h2", text: "What varies, and why we will not print numbers" },
      {
        type: "p",
        text: "The thresholds that decide which provisions apply — heights, areas, occupancy classifications, the hazard category of what you are storing or making — differ by jurisdiction and by what the building actually does. A figure that is right for one facility is wrong and potentially dangerous for another. Those specifics are established for your building at the start of design, from the authority that will assess it.",
      },
      {
        type: "p",
        text: "What is universal is the principle: the higher the hazard and the larger the building, the more the requirements move from passive measures into active systems, and the earlier they have to be in the design.",
      },
      { type: "h2", text: "The provisions that most often arrive too late" },
      {
        type: "list",
        items: [
          "Water storage dedicated to firefighting, which needs space and structural provision.",
          "Pump room location and access, which is an architectural decision, not a services one.",
          "Access for a fire tender — width, turning circle and hardstanding around the building.",
          "Separation distances to the boundary and to adjacent structures.",
          "Compartmentation between storage, production and office areas.",
        ],
      },
      {
        type: "quote",
        text: "Everything on that list is nearly free on a drawing and expensive on a site.",
      },
      { type: "h2", text: "How to keep it simple" },
      {
        type: "p",
        text: "Establish the classification of your building and the requirements that follow from it before the plan is fixed, and design to them from the first sketch. Then the clearance is a confirmation that what was designed was built — which is a straightforward thing to demonstrate — rather than a negotiation about what can be accepted.",
      },
      {
        type: "note",
        text: "Tell us what will be made or stored and the covered area you have in mind, and the fire requirements can be established at concept stage rather than discovered at completion.",
      },
    ],
    summary: [
      "Fire clearance examines decisions taken at design stage. By inspection, most of them are built.",
      "Travel distance, exits, separation and compartmentation shape the plan, elevation and footprint.",
      "Thresholds vary by jurisdiction, occupancy and hazard, and are established for your building at the start of design.",
      "Water storage, pump room, tender access and separation distances are the provisions that most often arrive too late.",
    ],
  },

  "approvals-sequence-industrial-building": {
    standfirst:
      "Industrial permissions are not a checklist to be worked through in any order. Each one consumes the output of the one before it, and that is what makes the sequence unforgiving.",
    stageSlug: "government-liaison-approvals",
    lead: {
      src: "/manovruti/insights/approval-sequence.jpg",
      alt: "Stamped application folders arranged in sequence",
    },
    blocks: [
      {
        type: "p",
        text: "The single most useful thing to understand about industrial approvals is that they form a chain rather than a list. A list can be worked in parallel. A chain cannot, because each link needs something the previous link produced — a converted land use, an approved layout, a sanctioned plan — before it can be assessed at all.",
      },
      {
        type: "p",
        text: "Applications made out of order are not merely early. They are incomplete, they are returned, and the time spent waiting for the return is lost rather than overlapped.",
      },
      { type: "h2", text: "The shape of the chain" },
      {
        type: "p",
        text: "Stated generally, and leaving the jurisdiction-specific department names and thresholds to be established for your plot: the land's recorded use must permit the activity before a layout can be approved against it. The layout must be approved before a building plan can be sanctioned on it. The plan must be sanctioned before construction may lawfully commence. And the completed construction must be certified as matching the sanctioned plan before the facility may be occupied and operated.",
      },
      {
        type: "p",
        text: "Alongside that spine sit the consents specific to what the facility does — fire, environmental, labour and power among them. Several of these have their own internal sequences, and some of them need the building plan as an input, which is why they cannot simply be started on day one.",
      },
      { type: "h2", text: "What can genuinely run in parallel" },
      {
        type: "list",
        items: [
          "Concept design and site planning can proceed while land conversion is in progress, provided the design respects what the conversion is likely to permit.",
          "Soil investigation and topographic survey are independent of every approval and should be done early.",
          "Long-lead equipment enquiry and specification can run throughout.",
          "Consents that take the building plan as an input can be prepared — documents gathered, drawings made ready — before the plan is sanctioned, so they are filed the week it is.",
        ],
      },
      {
        type: "quote",
        text: "Parallel means preparing the next application while the current one is assessed. It does not mean submitting both.",
      },
      { type: "h2", text: "Why the order gets broken" },
      {
        type: "p",
        text: "Almost always because of commercial pressure. Equipment has been ordered, a lease is expiring, a customer has been promised a date — and starting something, anything, feels like progress. It rarely is. An application filed without its input is a queue position surrendered rather than gained.",
      },
      { type: "h2", text: "Planning it properly" },
      {
        type: "p",
        text: "The useful artefact is not a list of approvals but a dependency map: what each one needs, what it produces, and which of them is genuinely on the critical path. With that, you can see which delays matter and which do not, and you can compress the programme where compression is actually available rather than where it feels available.",
      },
      {
        type: "note",
        text: "The exact departments, thresholds and order applicable to your plot are established at the outset of the work. Send the survey number and the intended use, and the first response will set out the chain for that specific site.",
      },
    ],
    summary: [
      "Approvals form a chain, not a list. Each consumes the output of the one before it.",
      "The spine: recorded land use, then layout, then building plan, then occupancy. Activity-specific consents sit alongside it.",
      "Design, survey, soil investigation and equipment specification genuinely can run in parallel.",
      "Parallel means preparing the next application, not submitting it early. Early filing surrenders a queue position.",
    ],
  },

  "structural-stability-certificate": {
    standfirst:
      "A structural stability certificate is a named professional putting their registration behind a statement that a building is safe to work in. That is why not everyone can sign one.",
    stageSlug: "structural-detail-engineering",
    lead: {
      src: "/manovruti/insights/stability-certificate.jpg",
      alt: "An engineer checking a concrete column against a structural drawing",
    },
    blocks: [
      {
        type: "p",
        text: "A stability certificate states that a building, as it stands, is structurally capable of the use being made of it. For industrial premises it is a recurring requirement rather than a one-off: it is typically sought when a facility is first licensed, when it is extended or altered, and at renewal.",
      },
      {
        type: "p",
        text: "It is worth being clear about what it is not. It is not a snag list, not a valuation, and not a general statement that the building is in good condition. It is a specific structural opinion, issued by someone whose registration permits them to issue it, and it carries their liability.",
      },
      { type: "h2", text: "Who can issue one" },
      {
        type: "p",
        text: "Not any engineer. The recipient — usually a factory inspectorate — specifies the registration it will accept, and that generally means a registered or chartered engineer recognised for structural work in that jurisdiction. This is the first thing to establish, because a certificate from someone whose registration the recipient does not accept is a certificate you have paid for twice.",
      },
      {
        type: "p",
        text: "Before appointing anyone, read the line in the requirement that names the registration, and confirm the signatory holds it and that it is current.",
      },
      { type: "h2", text: "What the assessment involves" },
      {
        type: "list",
        items: [
          "Reading the approved drawings and the original structural design, where they exist.",
          "Inspecting the structure against them — has what was built stayed what was designed, and has anything been altered since.",
          "Looking for distress: cracking, deflection, corrosion of reinforcement or steelwork, settlement, water ingress at structural elements.",
          "Establishing the loads actually being applied, which on an industrial building frequently differ from the loads designed for.",
          "Verifying the design calculations against that reality, and testing where the evidence is insufficient.",
        ],
      },
      { type: "h2", text: "The thing that causes most failures" },
      {
        type: "p",
        text: "Loading that has changed without anyone recalculating. Industrial buildings accumulate: heavier machinery replaces lighter, racking goes up another tier, a mezzanine is added for storage, equipment is hung from a roof structure that was never intended to carry it. Each is a reasonable operational decision and none of them is visible in the original design.",
      },
      {
        type: "p",
        text: "An assessment against the drawings alone will not find this. It is found by looking at what is actually in the building and comparing it to what the frame was designed to carry.",
      },
      {
        type: "quote",
        text: "The certificate is about the building as it is used, not the building as it was drawn.",
      },
      { type: "h2", text: "How to make it straightforward" },
      {
        type: "p",
        text: "Keep the original structural drawings and calculations, and keep a record of any structural alteration or significant change in loading. Where those exist, the assessment is an inspection and a verification. Where they do not, it begins with establishing what the structure is — measurement, and sometimes testing of materials — which takes longer and costs more.",
      },
      {
        type: "note",
        text: "Requirements differ by authority and by what the building does. Send us the requirement you have been given along with the drawings you hold, and we will confirm what the assessment involves for your building.",
      },
    ],
    summary: [
      "A stability certificate is a structural opinion that a building is safe for its actual use, carrying the signatory's liability.",
      "The recipient specifies the registration it accepts. Confirm the signatory holds it before appointing.",
      "The assessment compares what was designed, what was built, and what the building is now carrying.",
      "Changed loading is the most common cause of failure, and it is not visible in the original drawings.",
    ],
  },

  "factory-licence-sequence": {
    standfirst:
      "The licence is not the first permission and it is not the last. Where it sits in the sequence is what owners most often get wrong, and it is an expensive place to be wrong.",
    stageSlug: "government-liaison-approvals",
    lead: {
      src: "/manovruti/insights/factory-licence.jpg",
      alt: "A framed licence certificate on a factory office wall",
    },
    blocks: [
      {
        type: "p",
        text: "A factory licence permits a premises to operate as a factory. It is granted by the labour administration rather than the planning authority, and it is concerned with a different question: not whether the building was permitted to be built, but whether it is fit for people to work in.",
      },
      {
        type: "p",
        text: "That distinction explains most of the confusion. A building can hold a sanctioned plan and a completion certificate and still not be licensable, because the two authorities are assessing different things.",
      },
      { type: "h2", text: "Plan approval comes before the licence" },
      {
        type: "p",
        text: "The step most often missed is that the factory authority generally wants to approve the plans of the premises before the licence is applied for — and, importantly, before the building is built. It examines layout from a workplace standpoint: how people move, how they get out, where hazardous processes sit relative to everything else, ventilation, lighting, sanitary provision.",
      },
      {
        type: "p",
        text: "Applying for the licence on a finished building whose plans were never approved by that authority is where projects lose the most time, because the remedy at that point is physical.",
      },
      { type: "h2", text: "What the licence is tied to" },
      {
        type: "list",
        items: [
          "The premises, as approved — so alterations to layout or covered area have consequences for it.",
          "The manufacturing process declared, which is why a change of product can require an amendment.",
          "The number of workers and the power employed, both of which affect applicability and category.",
          "A named occupier and manager, which is an administrative matter that nonetheless holds up grants when left late.",
        ],
      },
      { type: "h2", text: "What sits alongside it" },
      {
        type: "p",
        text: "A licence is rarely sufficient on its own. Depending on the process, consents relating to fire safety, environment and effluent, power, and the building's own occupancy certification all form part of being lawfully operational. Several of them take the approved building plan as an input, which is another reason the plan stage governs the programme.",
      },
      {
        type: "quote",
        text: "Being permitted to build and being permitted to operate are two different permissions from two different authorities.",
      },
      { type: "h2", text: "Renewal is not automatic" },
      {
        type: "p",
        text: "Licences run for a period and are renewed. Renewal is the moment at which accumulated change surfaces — an extension never notified, a process altered, a mezzanine added, loading increased. The straightforward path is to notify changes as they happen rather than to present them all at renewal.",
      },
      { type: "h2", text: "The practical advice" },
      {
        type: "p",
        text: "Engage the factory authority at design stage, not at completion. The layout decisions it cares about — exits, circulation, segregation of hazardous areas, welfare provision — are nearly free to accommodate on a drawing and structural on a built facility. Everything else is documentation, which is a matter of being organised rather than being lucky.",
      },
      {
        type: "note",
        text: "The applicable thresholds, forms, department and order differ by jurisdiction and by what your facility does. Those specifics are established for your project at the outset — tell us the process and the intended workforce and we will set out the sequence that applies.",
      },
    ],
    summary: [
      "A factory licence permits operation, and comes from a different authority than the one that permitted the building.",
      "Plan approval by the factory authority generally precedes the licence — and precedes construction.",
      "The licence is tied to the premises, the declared process, the workforce and the power employed. Changes to any have consequences.",
      "Notify changes as they happen. Renewal is where accumulated, unnotified change surfaces.",
    ],
  },
};
