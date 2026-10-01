import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { TERMS } from "@/components/legal/data";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "The terms on which the Manovruti website is made available to you.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return <LegalPage doc={TERMS} />;
}
