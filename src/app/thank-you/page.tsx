import type { Metadata } from "next";
import { ThankYouPage } from "@/components/contact/ThankYouPage";

/**
 * Not indexed, and not in the sitemap. The page only makes sense immediately after a submission;
 * a search result landing a stranger here would promise a receipt that does not exist.
 */
export const metadata: Metadata = {
  title: "Thank you",
  description: "Your enquiry has reached Manovruti.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

export default function Page() {
  return <ThankYouPage />;
}
