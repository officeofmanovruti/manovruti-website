import type { Metadata } from "next";
import { Inter, Schibsted_Grotesk } from "next/font/google";
import { SITE_URL, IS_PREVIEW } from "@/lib/site";
import { PageTransition } from "@/components/shared/PageTransition";
import { StructuredData } from "@/components/shared/StructuredData";
import "./globals.css";

/**
 * Two faces, each with one job.
 *
 * Schibsted Grotesk carries the headlines. It is a neutral grotesque — precise rather than warm,
 * which is what a structural engineering practice should sound like — and it replaces both Jost
 * and the serif accent that used to sit inside headlines. Three families was one more than a site
 * this size can keep consistent.
 *
 * Inter carries everything functional: body, navigation, buttons, labels and numbers. It was drawn
 * for screens, and its tabular figures suit the registration numbers. It stays for body because
 * the Insights articles need a face built for long reading.
 *
 * Where a headline used to change family mid-sentence it now changes weight instead: the emphasis
 * is carried by the same face at a lighter cut, which is the discipline the reference site uses.
 */
const body = Inter({ variable: "--font-body-src", subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap" });
const display = Schibsted_Grotesk({ variable: "--font-display-src", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Manovruti — Industrial Construction, Architecture to Handover",
    template: "%s | Manovruti",
  },
  description:
    "Integrated industrial construction services in Silvassa and across India: land liaisoning and feasibility, architecture and planning, government approvals, structural engineering, tendering, project management, handover and certification.",
  keywords: [
    "industrial construction company Silvassa",
    "civil engineering consultancy DNH",
    "structural engineering consultant",
    "land liaisoning and NA conversion",
    "government liaison and approvals",
    "factory construction Gujarat",
    "turnkey industrial project management",
  ],
  applicationName: "Manovruti",
  authors: [{ name: "Manovruti" }],
  // No `alternates` here on purpose. Metadata inherits down the tree, so a canonical set at the
  // root is claimed by every page that does not override it — which is how 25 pages came to
  // declare themselves duplicates of the home page. Each page sets its own via pageMetadata().
  openGraph: {
    // Only the parts that are genuinely the same everywhere. Title, description and url are
    // per-page; declaring them here made every share preview identical.
    type: "website",
    siteName: "Manovruti",
    locale: "en_IN",
  },
  // robots.txt is a request; the meta tag is the instruction. A demo carries both.
  robots: IS_PREVIEW ? { index: false, follow: false } : { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body
        className="min-h-full"
        data-background-initial="ebb"
        data-background-current="ebb"
        data-text="light"
        data-menu-open="false"
      >
        {/* Outside {children} on purpose: it must survive the route change it is animating. */}
        <StructuredData />
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
