import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { absoluteUrl } from "@/lib/site";

/**
 * The home page keeps the layout's title and description, so it needs only the two things the
 * layout deliberately no longer broadcasts: its own canonical and its own og:url.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  // Repeating type/siteName/locale because a page-level openGraph replaces the layout's rather
  // than merging with it. Title and description fall through from the layout, which are correct
  // for this page.
  openGraph: { type: "website", siteName: "Manovruti", locale: "en_IN", url: absoluteUrl("/") },
};

export default function Page() {
  return <HomePage />;
}
