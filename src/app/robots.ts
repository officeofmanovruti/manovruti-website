import type { MetadataRoute } from "next";
import { absoluteUrl, IS_PREVIEW } from "@/lib/site";

/**
 * Served at /robots.txt.
 *
 * On the real site everything is public and only Next's internals are withheld. On a demo or
 * preview the whole thing is closed, because a half-finished copy competing with the real site in
 * search results is a problem that is much easier to avoid than to undo.
 */
export default function robots(): MetadataRoute.Robots {
  if (IS_PREVIEW) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/_next/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
