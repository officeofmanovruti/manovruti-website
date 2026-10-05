/**
 * Contact page copy.
 *
 * Everything factual here — the address, the phone number, the email, who answers — comes from
 * the business card and the brochure and already lives in CONTACT. Nothing on this page invents a
 * response time, an office count or an availability claim beyond the one the footer already makes.
 *
 * "What to send" is the useful part: an industrial enquiry that arrives with the plot, the use and
 * the deadline can be answered; one that says "need a quote for a factory" cannot.
 */

const PHOTO = "/manovruti/photos";

export const CONTACT_PAGE = {
  eyebrow: "Contact",
  /**
   * Not "Contact us". Both of the design references consulted make the same point: a contact page
   * headline should say what happens next, not name the page you are already on. This one is the
   * brief we actually want, so it doubles as the instruction.
   */
  title: { main: "Tell us the site,", accent: "the scope and the deadline." },
  image: `${PHOTO}/facility-dusk.jpg`,
  imageAlt: "Completed industrial facility at dusk",
  description:
    "We will tell you what it takes — which clearances the plot needs, what the sequence looks like and where the programme is most likely to lose time. If it is not work we should be doing, we will say that too.",
  /** The SLA, stated beside the form rather than left in the footer. */
  replyNote: "Replies to project enquiries within two working days.",
  answeredBy: "Enquiries are answered by",
  trustTitle: "Registered practice",
  sendTitle: "What to send",
  send: [
    { title: "The plot", note: "Survey number and village, or a location pin. Whether it is already non-agricultural." },
    { title: "The use", note: "What will be built and roughly how much covered area you expect." },
    { title: "The stage", note: "Raw land, drawings in hand, or a build already underway." },
    { title: "The deadline", note: "When you need to be operating. It changes the order the work is done in." },
  ],
  faqTitle: { main: "Before you", accent: "ask." },
  formTitle: { main: "Or write", accent: "to us here." },
  formNote:
    "We use what you send here only to answer your enquiry. It is not added to any mailing list.",
} as const;

/**
 * The FAQ, on this page rather than on a page of its own.
 *
 * A standalone /faq becomes a dumping ground, competes with the service pages in search, and
 * nobody navigates to it deliberately. Here it sits where the transactional questions actually
 * occur to someone — between deciding to get in touch and writing the message.
 *
 * EVERY ANSWER BELOW IS ALREADY PUBLISHED ELSEWHERE ON THIS SITE. The working area comes from the
 * project locations, the registrations from the credentials section, the reply time from the
 * footer, the person from the business card, and "what we need" from the block directly above.
 * An FAQ that restates the site stays true as the site changes.
 *
 * Price, statutory durations and capacity are deliberately not answered here. They depend on the
 * plot, the authority and the programme, so a general answer would mislead — which is exactly the
 * conversation the enquiry form is for. The shape below takes more entries as they are.
 */
export const CONTACT_FAQ = [
  {
    q: "Where do you work?",
    a: "Silvassa and the industrial belt around it — Dadra & Nagar Haveli, Daman, Vapi and Valsad. Statutory work is tied to the authority that governs the plot, so the closer a site is to the jurisdictions we file in regularly, the less time is lost learning one.",
  },
  {
    q: "Who will I be dealing with?",
    a: `${"Rajnikant S Rohit"}, B.E. Civil, A.M.I.E. (India), answers project enquiries directly. Architects, engineers, project managers and industry specialists are brought in by stage.`,
  },
  {
    q: "What are you registered to certify?",
    a: "Chartered Engineer with the Institution of Engineers (India), Kolkata; Government Registered Structural Engineer and Registered Engineer with DNH PDA; and Government Approved Valuer with the Indian Institution of Valuers. The registration numbers are listed on the home page.",
  },
  {
    q: "How soon will I hear back?",
    a: "Within two working days for project enquiries. If the answer needs a site visit or a look at the drawings before it means anything, we will say so rather than send a number we cannot stand behind.",
  },
  {
    q: "What does it cost?",
    a: "It depends on the stages you need, the size of the plot and the built-up area, so there is no rate card worth printing. Full project management is normally quoted as a percentage of project cost; a single stage — a structural design, a valuation, an approval file — is quoted as a fixed fee. Send the plot details and the scope and you will get a written fee proposal with the stages itemised, so you can take all of it or part of it.",
  },
  {
    q: "How long do the approvals take?",
    a: "The honest answer is that the statutory clock is not ours to control: each department has its own timeline and it only starts once your file is accepted as complete. What is controllable is how often a file comes back. Most delay we see is a document missing or a drawing that does not match what was applied for, and that is the part we take responsibility for. After seeing the plot and the intended use we will give you an indicative programme with the sequence and the dependencies marked — and tell you which steps historically move fastest and which do not.",
  },
  {
    q: "Can I use you for one stage only?",
    a: "Yes, and clients often do — a structural design where the architecture is already appointed, a valuation, or the approvals alone. The one thing we will do is tell you where a stage depends on decisions taken before it. Taking structural design without having seen the approved layout, for example, usually means redoing work later. We would rather flag that at the start than bill for it twice.",
  },
  {
    q: "Will my project actually get attention?",
    a: "Enquiries and project decisions come to the founder directly rather than through an account manager, and the architects, engineers, project managers and specialists are brought in by stage rather than sitting idle between them. If we do not have the capacity to run your programme to the deadline you need, we will say so when you ask rather than after you have signed.",
  },
  {
    q: "What do you need before you can say anything useful?",
    a: "The four things listed above — the plot, the use, the stage and the deadline. With those, the first reply can name the clearances involved and the order they have to happen in. Without them, any answer is a guess.",
  },
] as const;
