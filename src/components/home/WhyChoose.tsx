"use client";

import { ButtonLink } from "../shared/Button";
import { Media } from "../shared/Media";
import { REASON_FIGURES } from "../shared/figures";
import { REASONS, WHY_CHOOSE } from "./data";

/**
 * Why choose Manovruti — the brochure's six reasons, laid out as a two-column list beside a photograph.
 * Two columns keep this section close to the reference height of the single-column three-item original.
 *
 * The columns are a ratio, not two fixed pixel widths. 795.42px + 644.58px + the gap came to more
 * than the container, so the grid overflowed and pushed the photograph off the right of the
 * viewport — the text stayed inside its gutter while the image ran off the edge, which read as a
 * bug rather than a bleed. 5fr/4fr keeps the original proportion without the decimals, which
 * Tailwind dropped, silently collapsing the whole thing to one column.
 */
export function WhyChoose() {
  return (
    <div
      id="why"
      className="section section--5050-list relative mb-section text-[#242a2e]"
      data-background="ebb"
      // Capability below paints itself from its top edge, so this has to let go at the same
      // edge. Otherwise scrolling back up leaves the body charcoal under this section's ink.
      data-background-end="top"
    >
      <div className="container-page">
        <div className="section__inner grid grid-cols-1 gap-y-[40px] lg:grid-cols-[5fr_4fr] lg:gap-x-[60px]">
          {/* copy + reasons */}
          <div className="section__content">
            <h2
              className="section__title mb-[20px] text-h1"
              data-animate-title
              aria-label={`${WHY_CHOOSE.title.display} ${WHY_CHOOSE.title.rest}`}
            >
              <span className="type-serif">{WHY_CHOOSE.title.display}</span> {WHY_CHOOSE.title.rest}
            </h2>
            <p className="mb-[40px] max-w-[620px] text-lead opacity-70" data-animate="step-up">
              {WHY_CHOOSE.description}
            </p>

            {/* One column through the laptop band. The section splits to copy-plus-image at 992, which
              leaves the copy 518px; two reason columns inside that gave each one 187px of text and
              the blurbs wrapped at 17 characters a line, measured. Full width there takes them to
              about 44. Two columns return at 1280, where the copy column can carry them. */}
            <ul className="grid grid-cols-1 gap-x-[48px] gap-y-[32px] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {REASONS.map((r) => {
                const Figure = REASON_FIGURES[r.icon as keyof typeof REASON_FIGURES];
                return (
                <li key={r.icon} className="grid grid-cols-[48px_1fr] items-start" data-animate="step-up" data-animate-start="top 80%">
                  <span aria-hidden="true" className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[var(--color-brand-deep)]/10 text-[var(--color-brand-deep)]">
                    <Figure className="block h-[18px] w-[18px]" />
                  </span>
                  <span className="block">
                    <span className="block text-h3">{r.title}</span>
                    <span className="mt-[6px] block text-sm opacity-70">{r.description}</span>
                  </span>
                </li>
                );
              })}
            </ul>

            <div className="mt-[40px]" data-animate="step-up">
              <ButtonLink variant="outline-auto" href={WHY_CHOOSE.button.href}>{WHY_CHOOSE.button.label}</ButtonLink>
            </div>
          </div>

          {/* media */}
          <div className="section__aside relative">
            <div className="section__image relative h-[280px] w-full overflow-hidden lg:h-full lg:min-h-[520px]">
              <Media src={WHY_CHOOSE.image} alt={WHY_CHOOSE.imageAlt} sizes="(min-width: 992px) 645px, 100vw" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
