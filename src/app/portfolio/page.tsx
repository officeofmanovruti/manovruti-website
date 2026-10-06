import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Industrial projects delivered across Silvassa, Daman, Vapi and Valsad — from raw land to occupancy certificate.",
  path: "/portfolio",
});

export default function Page() {
  return <PortfolioPage />;
}
