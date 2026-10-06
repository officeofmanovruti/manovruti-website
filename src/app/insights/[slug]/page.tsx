import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/insights/ArticlePage";
import { ARTICLES } from "@/components/insights/article";
import { INSIGHTS } from "@/components/home/data";
import { absoluteUrl } from "@/lib/site";
import { clampDescription, pageMetadata } from "@/lib/metadata";

/** Only articles that have a body exist. The commissions generate nothing and 404. */
export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = INSIGHTS.find((a) => a.slug === slug);
  const article = ARTICLES[slug];
  if (!meta || !article) return {};
  return pageMetadata({
    title: meta.title,
    description: clampDescription(article.standfirst),
    path: `/insights/${slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = INSIGHTS.find((a) => a.slug === slug);
  const article = ARTICLES[slug];
  if (!meta || !article) notFound();

  // Article schema, so a search engine knows this is a piece of writing by a named practice
  // rather than another page of the site. The reference carries the same thing.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: article.standfirst,
    articleSection: meta.category,
    author: { "@type": "Organization", name: "Manovruti" },
    publisher: { "@type": "Organization", name: "Manovruti" },
    mainEntityOfPage: absoluteUrl(`/insights/${slug}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Escape `<` so a body containing "</script>" cannot close this tag early. The copy is
        // ours rather than a visitor's, but it is edited by hand and this costs nothing.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ArticlePage slug={slug} />
    </>
  );
}
