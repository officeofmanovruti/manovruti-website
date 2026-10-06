import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/legal/LegalPage";
import { TERMS } from "@/components/legal/data";

export const metadata: Metadata = pageMetadata({
  title: "Terms and conditions",
  description:
    "The terms on which the Manovruti website is made available to you.",
  path: "/terms",
});

export default function Page() {
  return <LegalPage doc={TERMS} />;
}
