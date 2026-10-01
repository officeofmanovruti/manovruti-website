"use client";

import { ButtonLink } from "../shared/Button";
import { Media } from "../shared/Media";
import { PortalFrameIcon } from "../shared/icons";
import { QuarterDisc } from "../shared/figures";
import { JOURNEY } from "./data";

/**
 * Our journey — a 50/50 panel: photograph on the left, the company story on the right.
 * Geometry follows the layout study (`.section--5050`): 230px rail, 490px media, 720px copy on desktop.
 */
export function Journey() {
  return (
    <div id="about" className="section section--5050 relative mb-section overflow-hidden text-[#242a2e]" data-background="ebb">
      {/* A quiet edge accent. It sits flush to the right edge so the straight sides land on the
          viewport and the curve faces into the page — the translate that used to push it further
          out just made the section look as though it had been cropped by accident. */}
      <QuarterDisc
        aria-hidden="true"
        data-speed="1.06"
        className="pointer-events-none absolute right-0 top-[16%] hidden lg:block"
        style={{ width: 220, height: 220, transform: "rotate(180deg)", color: "rgba(181,129,60,0.16)" }}
      />

      <div className="container-page">
        {/* Proportional tracks capped at the desktop total, not fixed pixels. 490 + 100 + 720 needs
            1310px of container, so from 992 up to 1310 the grid overflowed and the section's
            overflow-hidden silently cut the copy off: 390px of the heading gone at 992, still
            102px at 1280 — the whole laptop range. Capping at 1310 keeps the desktop sizes exact
            (490/720 at any width above that) and lets the pair scale together below it. */}
        <div className="section__inner grid grid-cols-1 gap-y-[40px] lg:max-w-[1310px] lg:grid-cols-[490fr_720fr] lg:gap-x-[clamp(32px,7vw,100px)]">
          {/* media */}
          <div className="section__aside relative">
            <div className="section__image relative h-[305px] w-full overflow-hidden lg:h-[560px]">
              <Media src={JOURNEY.image} alt={JOURNEY.imageAlt} sizes="(min-width: 992px) 840px, 150vw" />
            </div>
            <PortalFrameIcon
              aria-hidden="true"
              data-speed="0.92"
              className="pointer-events-none absolute -bottom-[34px] -left-[40px] -z-[1] hidden h-[200px] w-[286px] text-[var(--color-brand)]/25 lg:block"
            />
          </div>

          {/* copy */}
          <div className="section__content flex flex-col justify-center">
            <h2
              className="section__title mb-[28px] text-h1"
              data-animate-title
              aria-label={`${JOURNEY.title.display} ${JOURNEY.title.rest}`}
            >
              <span className="type-serif">{JOURNEY.title.display}</span> {JOURNEY.title.rest}
            </h2>
            {JOURNEY.paragraphs.map((t) => (
              <p key={t.slice(0, 24)} className="mb-[24px] max-w-[620px] text-lead opacity-80" data-animate="step-up">
                {t}
              </p>
            ))}
            <div className="section__buttons mt-[10px]" data-animate="step-up">
              <ButtonLink variant="outline-auto" href={JOURNEY.button.href}>{JOURNEY.button.label}</ButtonLink>
            </div>
            <p className="section__note mt-[32px] max-w-[520px] border-t border-current/15 pt-[20px] text-sm opacity-60">
              {JOURNEY.note}{" "}
              <a href={JOURNEY.noteLink.href} className="tap underline decoration-current/40 underline-offset-4 transition-colors hover:decoration-current">
                {JOURNEY.noteLink.label}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
