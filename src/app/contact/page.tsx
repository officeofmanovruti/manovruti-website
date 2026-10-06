import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Industrial construction enquiries for Silvassa, Daman, Vapi and Valsad. Call +91 97230 87807 or send the plot, the use, the stage and the deadline.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
