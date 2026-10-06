import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { InsightsPage } from "@/components/insights/InsightsPage";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Statutory process for industrial projects in Dadra & Nagar Haveli, written plainly: NA permission, structural stability certification and the factory licence sequence.",
  path: "/insights",
});

export default function Page() {
  return <InsightsPage />;
}
