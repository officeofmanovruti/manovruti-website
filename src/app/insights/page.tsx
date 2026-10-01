import type { Metadata } from "next";
import { InsightsPage } from "@/components/insights/InsightsPage";

export const metadata: Metadata = {
  title: "Insights — Manovruti",
  description:
    "Statutory process for industrial projects in Dadra & Nagar Haveli, written plainly: NA permission, structural stability certification and the factory licence sequence.",
};

export default function Page() {
  return <InsightsPage />;
}
