import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/services/ServicePage";
import { SERVICE_STAGES } from "@/components/home/data";
import { SERVICE_COPY } from "@/components/services/data";
import { clampDescription, pageMetadata } from "@/lib/metadata";

/** Only the seven stages exist; anything else is a 404 rather than an empty shell. */
export function generateStaticParams() {
  return SERVICE_STAGES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const stage = SERVICE_STAGES.find((s) => s.slug === slug);
  const copy = SERVICE_COPY[slug];
  if (!stage || !copy) return {};
  return pageMetadata({
    title: stage.title,
    description: clampDescription(copy.description),
    path: `/services/${slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stage = SERVICE_STAGES.find((s) => s.slug === slug);
  if (!stage || !SERVICE_COPY[slug]) notFound();
  return <ServicePage slug={slug} />;
}
