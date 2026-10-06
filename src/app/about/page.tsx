import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Manovruti delivers integrated industrial construction services from ideation to execution — architects, engineers, project managers and industry specialists under one roof since 2013.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
