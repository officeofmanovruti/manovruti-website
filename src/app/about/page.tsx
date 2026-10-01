import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About — Manovruti",
  description:
    "Manovruti delivers integrated industrial construction services from ideation to execution — architects, engineers, project managers and industry specialists under one roof since 2013.",
};

export default function Page() {
  return <AboutPage />;
}
