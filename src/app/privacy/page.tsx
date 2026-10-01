import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { PRIVACY } from "@/components/legal/data";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What this website collects, what it does not, and what happens to anything you send us.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return <LegalPage doc={PRIVACY} />;
}
