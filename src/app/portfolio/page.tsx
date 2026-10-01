import type { Metadata } from "next";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio — Manovruti",
  description:
    "Industrial projects delivered across Silvassa, Daman, Vapi and Valsad — from raw land to occupancy certificate.",
};

export default function Page() {
  return <PortfolioPage />;
}
