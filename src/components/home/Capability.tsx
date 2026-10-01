"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "../shared/Button";
import { Media } from "../shared/Media";
import { CAPABILITY, CAPABILITY_MARKERS } from "./data";

/**
 * A site photograph annotated with four hotspots, one per phase of the chain.
 * Marker mechanics follow the layout study: icon scales 0.3 -> 1, a 23.33px white ring grows behind it,
 * and the label expands from 0 to its width on hover or focus.
 */
export function Capability() {
  const [open, setOpen] = useState<number | null>(null);

  return (
      // Spacing is mb-section only, the same as Journey and Why choose. It used to carry
      // pt-section and pb-section as well as 110px on the inner grid — padding on both sides of
      // its own box, on top of the previous section's margin. That read as presence while the
      // panel was charcoal and the padding was part of the dark field; on white it is just void,
      // measured at 317px of empty above and 343px below against 103-153px everywhere else.
      //
      // It paints its own ground. The page tints the BODY as sections pass and the flip fires at the
      // viewport centre, which works only for type that takes its colour from the body too. This
      // section hard-codes its type colour, so on the way in there was a window where the body still
      // held the previous section's colour and the heading sat on it at 1.25:1 — measured, and the
      // same fault Credentials had. Painting here keeps ground and type in step; the body flip moves
      // to the top edge, where the panel already covers the viewport.
    <div
      className="section section--specifications relative mb-section overflow-hidden bg-white text-[#242a2e]"
      data-background="white"
      data-background-start="top"
      data-background-end="top">
      <div className="container-page">
        {/* Fractional columns, not a fixed 760px. Pinned, the illustration took 760 of the 880
              available at 1024 and left the copy 244px — a heading, a paragraph and two actions in
              a column narrower than a phone. 3fr/2fr keeps the proportion at every width. */}
          <div className="section__inner grid grid-cols-1 items-center gap-y-[40px] lg:grid-cols-[3fr_2fr] lg:gap-x-[clamp(48px,5vw,90px)]">
          {/* annotated image */}
          <div className="section__aside relative">
            <div className="section__image relative aspect-[3/2] w-full overflow-hidden">
              <Media src={CAPABILITY.image} alt={CAPABILITY.imageAlt} sizes="(min-width: 992px) 60vw, 100vw" />
              {CAPABILITY_MARKERS.map((m, i) => {
                const active = open === i;
                return (
                  <button
                    key={m.label}
                    type="button"
                    style={{ left: m.left, top: m.top }}
                    // These were onMouseEnter + onFocus + a toggling onClick, which cancelled out on
                    // touch. A tap emits the whole emulated sequence — mouseover, mouseenter, focus,
                    // then click — so hover opened the label, focus held it, and the click toggled it
                    // straight back shut. Instrumented on an iPhone 13 profile: the label ended every
                    // tap at max-width 0, opacity 0. The dots simply did not work on a phone.
                    // Now each input method owns one path. Mouse hovers, keyboard focuses, touch taps,
                    // and none of them fires the others' handler.
                    onPointerEnter={(e) => { if (e.pointerType === "mouse") setOpen(i); }}
                    onPointerLeave={(e) => { if (e.pointerType === "mouse") setOpen((v) => (v === i ? null : v)); }}
                    onPointerUp={(e) => { if (e.pointerType !== "mouse") setOpen((v) => (v === i ? null : i)); }}
                    // :focus-visible is false for touch-initiated focus, so this stays keyboard-only.
                    onFocus={(e) => { if (e.currentTarget.matches(":focus-visible")) setOpen(i); }}
                    onBlur={() => setOpen((v) => (v === i ? null : v))}
                    aria-label={`${m.label} — ${m.note}`}
                    // The dot is 18px and the button was 26x44 — under the 44px minimum on its narrow
                    // axis. 13px of padding widens the hit area without moving the dot.
                    //
                    // The horizontal anchor is the DOT, not the button's centre. -translate-x-1/2
                    // centred the whole button, so opening a label widened it from 52px to 233px and
                    // the dot slid half that distance: measured, marker 1's dot centre went from x=47
                    // to x=-43, right off the picture, taking the first characters of its own label
                    // with it — "Feasibility" rendered as "asibility". Translating by the dot's own
                    // offset instead (13px padding + 9px half-width) pins it to the marker point at
                    // any label width.
                    className={cn(
                      "marker absolute z-[2] -translate-y-1/2 cursor-pointer p-[13px]",
                      m.labelLeft ? "translate-x-[calc(-100%+22px)]" : "-translate-x-[22px]",
                    )}
                  >
                    <span className="relative flex items-center">
                      {m.labelLeft ? <MarkerLabel m={m} active={active} side="left" /> : null}
                      <span
                        className={cn(
                          "relative flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-[#1b2126]/25 transition-[box-shadow,transform] duration-500 [transition-timing-function:cubic-bezier(0,0.53,0.26,1)]",
                          active
                            ? "scale-100 shadow-[0_0_0_10px_rgba(27,33,38,0.28)]"
                            : "scale-[0.9] shadow-[0_0_0_6px_rgba(27,33,38,0.2)]",
                        )}
                      >
                        <span className="block h-[6px] w-[6px] rounded-full bg-[#1b2126]" />
                      </span>
                      {!m.labelLeft ? <MarkerLabel m={m} active={active} side="right" /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* copy */}
          <div className="section__content flex flex-col justify-center">
            <h2
              className="section__title mb-[24px] text-h1"
              data-animate-title
              aria-label={`${CAPABILITY.title.pre} ${CAPABILITY.title.display} ${CAPABILITY.title.rest}`}
            >
              {CAPABILITY.title.pre} <span className="type-serif">{CAPABILITY.title.display}</span> {CAPABILITY.title.rest}
            </h2>
            <p className="mb-[32px] max-w-[540px] text-lead opacity-75" data-animate="step-up">
              {CAPABILITY.description}
            </p>
            {/* One primary action, one text link. Two pills of near-identical weight made the reader
                choose between them instead of acting, so the second is plain underlined text.
                The pill is outline-auto, the same as every other light section — it was
                solid-white, which was right on the charcoal this panel used to be and is invisible
                on the white it is now. */}
            <div className="section__buttons flex flex-wrap items-center justify-center gap-x-[22px] gap-y-[14px] lg:justify-start" data-animate="step-up">
              {CAPABILITY.buttons.map((b, i) =>
                i === 0 ? (
                  <ButtonLink key={b.label} variant="outline-auto" href={b.href}>
                    {b.label}
                  </ButtonLink>
                ) : (
                  <a
                    key={b.label}
                    href={b.href}
                    className="tap text-[14px] font-medium text-[#242a2e]/75 underline decoration-[#242a2e]/30 underline-offset-[6px] transition-colors duration-300 hover:text-[#242a2e] hover:decoration-[#242a2e] lg:text-[16px]"
                  >
                    {b.label}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarkerLabel({ m, active, side }: { m: { label: string; note: string }; active: boolean; side: "left" | "right" }) {
  return (
    <span
      className={cn(
        "block overflow-hidden whitespace-nowrap bg-white text-[#242a2e] transition-[max-width,padding,opacity] duration-500 [transition-timing-function:cubic-bezier(0,0.53,0.26,1)]",
        side === "left" ? "mr-[8px] text-right" : "ml-[8px] text-left",
        // Tighter below sm. Measured at 320px: marker 3 sits at 47% with 127px of frame to its
        // right, and the label wanted 153px (129 of text plus 24 of padding), so it ran past the
        // edge by 26px. Flipping sides does not help — the left has 111px, less still. 12px text
        // with 6px padding brings it to about 123px and it fits. Full size returns at 640.
        active
          ? "max-w-[220px] px-[6px] py-[7px] opacity-100 sm:px-[12px]"
          : "max-w-0 px-0 py-[7px] opacity-0",
      )}
    >
      <span className="block text-[12px] font-medium leading-[15px] sm:text-[14px] sm:leading-[16px]">{m.label}</span>
      <span className="block text-[11px] leading-[13px] opacity-55 sm:text-[12px] sm:leading-[14px]">{m.note}</span>
    </span>
  );
}
