import { BRAND, CONTACT, REGISTRATIONS, SERVICE_STAGES } from "../home/data";
import { SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * Structured data — the block that tells a search engine this is a business, not just a page of
 * text about construction.
 *
 * It is what makes a practice eligible for the local results panel, which for a regional firm is
 * worth more than a position in the ordinary blue links. It renders nothing.
 *
 * EVERY VALUE HERE COMES FROM THE SAME DATA THE PAGES USE. Nothing is written specially for the
 * search engine, because structured data that disagrees with the visible page is a manual-action
 * risk, not a shortcut. For the same reason these are deliberately ABSENT rather than guessed:
 *
 *   openingHours    — not published anywhere and nobody has confirmed them
 *   priceRange      — the site quotes no prices
 *   aggregateRating — there are no reviews, and inventing them is fraud
 *   sameAs          — the practice has no social profiles yet; add the LinkedIn URL when it exists
 *
 * Add them here the moment Rajnikant supplies them, and not before.
 */
export function StructuredData() {
  const [street, cityAndPin] = CONTACT.address;
  /* The visible address abbreviates the union territory ("UT of DNH & DD"), which is right on
     the page and wrong here: a search engine matches the official name. */
  const region = "Dadra and Nagar Haveli and Daman and Diu";
  const [, locality = "Silvassa", postalCode = ""] = /^(.*?)\s+(\d{6})$/.exec(cityAndPin) ?? [];

  const business = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#practice`,
    name: BRAND.legalName,
    url: SITE_URL,
    logo: absoluteUrl("/icon.png"),
    image: absoluteUrl("/opengraph-image.png"),
    slogan: BRAND.tagline,
    description:
      "Integrated industrial construction services in Silvassa: land liaisoning and feasibility, architecture and planning, government approvals, structural engineering, tendering, project management, and handover with certification.",
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: locality,
      postalCode,
      addressRegion: region,
      addressCountry: "IN",
    },
    areaServed: ["Silvassa", "Daman", "Vapi", "Valsad", "Dadra and Nagar Haveli and Daman and Diu"].map(
      (name) => ({ "@type": "Place", name }),
    ),
    founder: {
      "@type": "Person",
      name: CONTACT.person,
      jobTitle: "Chartered Engineer",
      // The registrations as they appear on the credentials section, issuer and number included.
      hasCredential: REGISTRATIONS.map((r) => ({
        "@type": "EducationalOccupationalCredential",
        name: r.title,
        credentialCategory: "Professional registration",
        identifier: r.number,
        recognizedBy: { "@type": "Organization", name: r.issuer },
      })),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: SERVICE_STAGES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.phase,
          url: absoluteUrl(s.href),
        },
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND.legalName,
    publisher: { "@id": `${SITE_URL}/#practice` },
  };

  return (
    <script
      type="application/ld+json"
      // Escape `<` so a value containing "</script>" cannot close the tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify([business, website]).replace(/</g, "\\u003c") }}
    />
  );
}
