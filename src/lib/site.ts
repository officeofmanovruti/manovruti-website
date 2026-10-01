/**
 * Single source of truth for anything that depends on where the site is deployed.
 *
 * The canonical host is set once here so metadata, the sitemap, robots.txt and the structured data
 * on the article pages cannot drift apart.
 *
 * On Netlify the build command passes the deploy's own address in, so a demo on a `.netlify.app`
 * subdomain describes itself correctly and the day a custom domain is attached it follows without
 * anyone editing anything. The literal below is only the local-development fallback.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://manovruti.com").replace(/\/$/, "");

export const SITE_NAME = "Manovruti";

/**
 * True for anything that is not the real site — a Netlify demo or preview, or local development.
 *
 * Derived from the host rather than from a flag, deliberately. A flag has to be remembered twice:
 * set on the demo, unset at launch. Forgetting the first indexes a half-finished site; forgetting
 * the second leaves the real one invisible. The host is always right and corrects itself the
 * moment a custom domain is attached.
 */
export const IS_PREVIEW = (() => {
  try {
    const host = new URL(SITE_URL).hostname;
    return host.endsWith(".netlify.app") || host === "localhost" || host.endsWith(".local");
  } catch {
    return true; // an unparseable URL is not something to let search engines index
  }
})();

/** Absolute URL for a site-relative path, e.g. `absoluteUrl("/insights")`. */
export const absoluteUrl = (path: string): string => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
