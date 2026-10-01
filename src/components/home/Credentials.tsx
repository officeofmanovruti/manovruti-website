"use client";

import { ButtonLink } from "../shared/Button";
import { Media } from "../shared/Media";
import { CREDENTIALS, CREDENTIALS_SECTION } from "./data";

/**
 * Credentials — the three held certificates. Grid geometry follows the layout study
 * (`.section--explore-blog`): two narrow columns and one wide featured column on desktop.
 *
 * It declares its own dark background. It used to ride on whatever the panel above had set, but
 * Clientele now turns the page light, and white type on bone is unreadable.
 *
 * It takes the background on the normal edge. Holding the handover to "top" — which was once
 * needed so a white nav would not land on Clientele's white logo sheet — left this section's white
 * type sitting on the bone panel for 700px of scroll before the dark arrived. The condensed header
 * bar solves the sheet problem properly now, by painting its own surface.
 */
/**
 * It paints its own panel.
 *
 * The page normally tints the BODY as sections scroll past, cross-fading between them, and the
 * trigger fires when a section's top reaches the middle of the viewport. That works for sections
 * whose type takes its colour from the body too. This one hardcodes white, so for the 450px of
 * scroll between the heading entering the viewport and the section reaching the middle, the whole
 * block — title, description and button — sat white on bone at 1.25:1. Measured, not guessed.
 *
 * So the dark ground is painted here instead of being borrowed from the body, and the body flip is
 * moved to the top edge, where the panel already covers the viewport. Insights hands the background
 * back at the same edge, so scrolling up is symmetric. The prefooter below is the same colour and
 * paints itself too, which makes the two read as one band running down to the black footer.
 *
 * Because the panel owns the gap above and below it now, the vertical rhythm moved inside as
 * padding — a margin would have left a strip of bone inside the band.
 */
export function Credentials() {
  return (
    <div
      id="credentials"
      className="section section--explore-blog bg-[#2c343a] pb-section pt-section text-white"
      data-background="ebonyclay"
      data-background-start="top"
      data-background-end="top"
    >
      <div className="container-page">
        <div className="section__header mb-block lg:flex lg:items-end lg:justify-between">
          <div className="lg:max-w-[720px]">
            <h2
              className="section__title text-h1"
              data-animate-title
              aria-label={`${CREDENTIALS_SECTION.title.display} ${CREDENTIALS_SECTION.title.rest}`}
            >
              <span className="type-serif">{CREDENTIALS_SECTION.title.display}</span> {CREDENTIALS_SECTION.title.rest}
            </h2>
            <p className="mt-[16px] max-w-[540px] text-lead text-white/65" data-animate="step-up">
              {CREDENTIALS_SECTION.description}
            </p>
          </div>
          <div className="mt-[24px] shrink-0 lg:mt-0" data-animate="step-up" data-animate-start="top 60%">
            <ButtonLink
              variant="outline-light"
              href={CREDENTIALS_SECTION.cta.href}
              target="_blank"
              rel="noreferrer"
              srLabel="opens the credentials PDF in a new tab"
            >
              {CREDENTIALS_SECTION.cta.label}
            </ButtonLink>
          </div>
        </div>

        {/* Three equal cards. The old layout gave one credential a 594px feature column and the
            other two 276px each, so the third card's title sat 240px below its siblings and the
            row had no baseline at all. They are the same kind of thing; they get the same box. */}
        <div className="grid grid-cols-1 gap-x-[40px] gap-y-[44px] sm:grid-cols-2 lg:grid-cols-3">
          {CREDENTIALS.map((c) => (
            <Card key={c.registration} c={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ c }: { c: (typeof CREDENTIALS)[number] }) {
  return (
    <article className="group block" data-animate="step-up" data-animate-start="top 82%">
      {/* Cropped to the head of the document, not fitted whole. Three scans of 1.41, 1.41 and 0.71
          aspect cannot share a frame with object-contain without one of them floating in white.
          Cropping to the top also keeps the letterhead and seal — the part that reads as proof —
          and leaves the rest of the page, which on one of these is a residential address and a
          passport photograph, out of frame. */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <Media
          src={c.image}
          alt={c.imageAlt}
          sizes="(min-width: 992px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-[18px] text-h3">{c.title}</h3>
      <p className="mt-[6px] text-sm text-white/60">{c.issuer}</p>
      <p className="mt-[4px] tabular-nums text-[12px] leading-[20px] text-[var(--color-brand-soft)]">Reg. {c.registration}</p>
    </article>
  );
}
