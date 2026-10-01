"use client";

import { ButtonLink } from "../shared/Button";
import { PREFOOTER } from "./data";
import { Media } from "../shared/Media";

/**
 * It declares its own dark background. It had none and rode on whatever the section above set,
 * which worked only while that was Credentials. Insights sits between them now and turns the page
 * light, so white type landed on bone — the same fault Credentials had for the same reason. Any
 * section with fixed-colour type needs to name its own panel.
 *
 * Source: `.section--prefooter` — ``, container `.container--1330`
 * (max-width 1400px, padding 0 35px, margin 0 20px).
 * Desktop: a flex row aligned to the bottom. The media column comes first (order -1, 591x571)
 *   and holds a 591x758 block pulled up by margin-bottom -187px and clipped with an SVG arch
 *   (`clipPath #video-arch`, objectBoundingBox units). Copy sits right with padding-left 159px
 *   and margin-bottom 143px; title 85px/90px; a solid white button follows.
 * Mobile: stacks to a column.
 *
 * The title was on its own clamp topping out at 85px, which made it the largest type on the page —
 * bigger than the hero. It is the closing call, not a second opening, so it now shares the hero step
 * (--text-display, 36 -> 65). That also removes the 75px tier that sat between display and h1.
 */
export function Prefooter() {
  return (
    <div
      className="section section--prefooter bg-[#2c343a] pb-[64px] text-white lg:pb-[96px]"
      data-background="ebonyclay"
      data-background-start="top"
    >
      {/* Roof profile, declared once for the media block below.
          Symmetric, with both top corners intact. The previous path stepped down from peak to
          valley left to right, so it ended on a valley at x=1 and bit a deep triangle out of the
          top-right corner — on a photograph that reads as a crop gone wrong, not as a roof. */}
      <svg aria-hidden className="absolute h-0 w-0" focusable="false">
        <defs>
          <clipPath id="video-sawtooth" clipPathUnits="objectBoundingBox">
            <path d="M0,1 L0,0.035 L0.25,0.145 L0.5,0.035 L0.75,0.145 L1,0.035 L1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="container-page">
        {/* Mobile stacks the copy and the picture into one grid cell so the words sit on the
            photograph, the way the hero does. Measured first: the top third of this frame in its
            phone crop runs 0.039-0.066 luminance at 0.1 busyness — dead calm dark sky, white type
            at 9 to 11.7:1, better than the hero's own caption zone.
            Phones only. At 768 the same crop turns landscape, the sunset moves into the text zone
            and the description measured 33% of its area under 4.5:1, so tablets keep the stack and
            desktop keeps the flex row. */}
        <div className="grid md:flex md:flex-col lg:flex-row lg:items-center">
          {/* media */}
          <div className="section__aside [grid-area:1/1] md:order-last md:[grid-area:auto] lg:order-first lg:w-[46%] lg:max-w-[591px] lg:shrink-0">
            <div
              // Full-bleed on mobile: the horizontal negative margin matches the container gutter.
              // No negative bottom margin — it used to pull the picture 96px (123 on mobile) past
              // the foot of the section and into the footer's black band.
              className="section__video relative -mx-[24px] h-[660px] overflow-hidden bg-white/10 md:h-[500.2px] lg:mx-0 lg:h-[640px] lg:w-full"
              style={{ clipPath: "url(#video-sawtooth)" }}
            >
              <Media src={PREFOOTER.image} alt={PREFOOTER.imageAlt} sizes="(min-width: 992px) 591px, 100vw" />
              {/* Shaped for where the copy actually sits. Centred on the frame it spans 36-70% of
                  the height, which is the sunset band — busyness 288 and bright highlights that took
                  the description to 1.78:1 over 37% of its area. The scrim now holds 0.80 down to
                  0.64 across that whole run and only releases below 70%, so the building still reads
                  at the foot. Phones only. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[88%] bg-[linear-gradient(180deg,rgba(20,24,27,0.80)_0%,rgba(20,24,27,0.76)_28%,rgba(20,24,27,0.72)_52%,rgba(20,24,27,0.64)_70%,rgba(20,24,27,0.26)_88%,rgba(20,24,27,0)_100%)] md:hidden"
              />
            </div>
          </div>

          {/* copy */}
          <div className="section__content relative z-[1] self-center [grid-area:1/1] md:z-auto md:self-auto md:[grid-area:auto] lg:min-w-0 lg:flex-1 lg:pl-[clamp(40px,6vw,110px)]">
            <h2
              className="section__title mb-[32px] text-display"
              data-animate-title
              aria-label={`${PREFOOTER.title.line1} ${PREFOOTER.title.display}`}
            >
              {PREFOOTER.title.line1}
              <span className="block">{PREFOOTER.title.display}</span>
            </h2>
            <p className="section__description mb-[28px] max-w-[46ch] text-lead opacity-70">
              {PREFOOTER.description}
            </p>
            <div className="section__buttons" data-animate="step-up">
              <ButtonLink variant="solid-white" href={PREFOOTER.cta.href}>{PREFOOTER.cta.label}</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
