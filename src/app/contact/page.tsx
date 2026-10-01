import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact — Manovruti",
  description:
    "Industrial construction enquiries for Silvassa, Daman, Vapi and Valsad. Call +91 97230 87807 or send the plot, the use, the stage and the deadline.",
};

export default function Page() {
  return <ContactPage />;
}
