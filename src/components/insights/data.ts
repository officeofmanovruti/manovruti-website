/**
 * Blog index copy.
 *
 * The article index itself lives in `home/data.ts` as INSIGHTS, because the home page features
 * the same set. All fifteen are written and every one carries an `href`, so every card links.
 *
 * None of them states a local statutory specific — no fee, day-count, department name or document
 * checklist. That line is what keeps them safe to publish; see the note at the top of `article.ts`.
 */

/**
 * Where images live, and why the split is what it is:
 *   photos/    site photography — page backgrounds, hero slides, anything shared between pages
 *   insights/  one image per article, named after the article
 * This is a page background, so it belongs in photos/ with the other page backgrounds.
 */
const PHOTO = "/manovruti/photos";

export const INSIGHTS_PAGE = {
  eyebrow: "Blog",
  title: "Insights",
  image: `${PHOTO}/insights-bg.jpg`,
  imageAlt: "Approval documents and drawings laid out on a desk",
  lead: {
    main: "Statutory process,",
    accent: "written down plainly.",
  },
  description:
    "The questions industrial clients in Silvassa ask before they start: which permission comes first, who is authorised to certify what, and where a programme actually loses its time.",
  /** Shown where a published article would carry its date. It is a status, not an apology. */
  pendingLabel: "In preparation",
  ask: {
    title: { main: "Not covered", accent: "here yet?" },
    description:
      "If the answer you need is not written up, ask it directly. It is the same team that would have written the article.",
  },
} as const;
