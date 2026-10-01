import type { MetadataRoute } from "next";
import { SERVICE_STAGES } from "@/components/home/data";
import { ARTICLES } from "@/components/insights/article";
import { absoluteUrl } from "@/lib/site";

/**
 * Served at /sitemap.xml.
 *
 * The dynamic routes are derived from the same data the pages are generated from, so a new stage
 * or a newly written article appears here without anyone remembering to add it. Articles without a
 * body are not in ARTICLES and so are correctly absent — they 404, and listing them would be a
 * promise the site cannot keep.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: Array<{ path: string; priority: number; changeFrequency: "monthly" | "yearly" }> = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "yearly" },
    { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...pages.map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...SERVICE_STAGES.map((stage) => ({
      url: absoluteUrl(`/services/${stage.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.9,
    })),
    ...Object.keys(ARTICLES).map((slug) => ({
      url: absoluteUrl(`/insights/${slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
