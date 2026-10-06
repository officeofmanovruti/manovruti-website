import type { Metadata } from "next";
import { absoluteUrl } from "./site";

/**
 * Page metadata, built in one place.
 *
 * WHY THIS EXISTS. `alternates.canonical` used to be set once in the root layout as "/". Next
 * merges metadata down the tree, so every page that did not override it inherited the literal
 * homepage URL: twenty-five indexable pages, including all fifteen articles, told a search engine
 * they were duplicates of the home page. That is the worst thing a site can say about itself, and
 * nothing on the page shows it — it was only visible in the served HTML.
 *
 * The same shape of bug applied to Open Graph. `openGraph` was declared once in the layout, so
 * every page shared one title and one description when shared to WhatsApp or LinkedIn, and
 * `og:url` was never emitted at all.
 *
 * Both now come from the same argument as the visible title, so a page cannot describe itself
 * correctly to a reader and wrongly to a crawler. `path` is required: there is no default that
 * could be silently wrong.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Without the brand. The layout's template appends "| Manovruti". */
  title: string;
  description: string;
  /** Site-relative, with the leading slash, e.g. "/about". */
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      // Next REPLACES openGraph rather than merging it, so everything the layout declares has to
      // be repeated here. Omitting `type` and `siteName` silently dropped them from every page
      // that used this helper, and a shared link lost its preview card.
      type: "website",
      siteName: "Manovruti",
      locale: "en_IN",
      title: `${title} | Manovruti`,
      description,
      url: absoluteUrl(path),
      // The app/opengraph-image.png file convention supplies this on routes that declare no
      // openGraph of their own, but a declared block does not inherit it. Without this, a page
      // shared to WhatsApp or LinkedIn arrives as a bare link with no card.
      images: [{ url: absoluteUrl("/opengraph-image.png"), width: 1200, height: 630 }],
    },
  };
}

/**
 * Shorten a description for a meta tag without cutting a word in half.
 *
 * The service pages used `.slice(0, 180)` and every one of the seven ended mid-word — "design
 * intent becomes buildable instruc". A description is the sentence under the blue link in a search
 * result; a broken word there reads as a broken site.
 *
 * Limit is 160 by default, which is roughly where Google stops rendering.
 */
export function clampDescription(text: string, limit = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit);
  // Prefer a sentence end, then a word boundary, and never return a fragment shorter than half the
  // limit — a very long first word would otherwise collapse the whole description.
  const sentence = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  if (sentence > limit / 2) return cut.slice(0, sentence + 1);
  const word = cut.lastIndexOf(" ");
  return `${word > limit / 2 ? cut.slice(0, word) : cut}…`;
}
