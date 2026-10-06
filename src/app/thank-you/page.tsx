import type { Metadata } from "next";
import { ThankYouPage } from "@/components/contact/ThankYouPage";
import { pageMetadata } from "@/lib/metadata";

/**
 * Not indexed, and not in the sitemap. The page only makes sense immediately after a submission;
 * a search result landing a stranger here would promise a receipt that does not exist.
 */
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Thank you",
    description: "Your enquiry has reached Manovruti.",
    path: "/thank-you",
  }),
  // Overrides the layout rather than merging with it, which is the point: this page is noindex on
  // production too, not only on a preview.
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ThankYouPage />;
}
