"use client";

import type { CSSProperties } from "react";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../shared/gsap";
import { ChevronIcon } from "../shared/icons";
import { Media } from "../shared/Media";
import { HOME_SCROLL, SERVICES_SECTION, SERVICE_STAGES } from "./data";

/**
 * The seven delivery stages, laid out to the pattern measured off lpas.com's opening section.
 *
 * What was taken from it, all measured rather than eyeballed: a card 771px wide filling the
 * viewport height, split photograph over coloured panel; the panel's 30px side inset and 40px top
 * inset; a two-column grid of underlined links at 14px; a 45px outlined circle top-right; the
 * title at the panel's foot with a counter beneath it; and the five panel colours themselves —
 * #625653, #925434, #C9D3DF, #707569, #E3C1AA. Two more from the same family were added because
 * seven stages cannot be dressed in five colours without one repeating.
 *
 * Light panels carry ink type and dark ones white, which is what the source does — its pale blue
 * and sand cards use #262626, not white.
 *
 * The mechanism is a pinned horizontal scroll, which this section already used, so the travel is
 * still measured from the track rather than guessed: the pin lasts exactly as long as the distance
 * the cards must move.
 *
 * Two departures. The source opens the run with a video of a person; here that panel is plain and
 * carries the section's own heading, so it is obvious what the run is before it starts moving.
 * And below 992px the whole thing becomes a vertical stack — a pinned horizontal scroll fights
 * touch gestures, and the source does the same.
 */
/**
 * The reference pins its card at a hard 771px, which at a 1440 screen leaves only 1.87 of them on
 * screen. Ours holds that as a ceiling but gives way below it, so a 1440 desktop sees 2.08 cards
 * rather than one and a sliver. It is the one deliberate departure from the reference's geometry.
 */
const CARD_W = "var(--card-w)";

/** Moves the Explore disc to the pointer without a re-render. */
function trackCursor(e: React.MouseEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
}
/**
 * Widened to absorb the peek, so the opening frame is this panel and one whole card and nothing
 * else — 100vw minus the card. The next card only appears once the track starts moving.
 */
const INTRO_W = "calc(100vw - var(--card-w))";

function Panel({ stage }: { stage: (typeof SERVICE_STAGES)[number] }) {
  const light = stage.panelTone === "light";
  const ink = light ? "#262626" : "#ffffff";
  const rule = light ? "rgba(38,38,38,0.35)" : "rgba(255,255,255,0.45)";

  return (
    <div
      data-panel
      className="group/panel flex flex-col justify-between overflow-hidden px-[30px] pb-[26px] pt-[30px] lg:h-[285px]"
      style={{ backgroundColor: stage.panel, color: ink, "--panel-bg": stage.panel } as CSSProperties}
    >
      <div className="flex items-start justify-between gap-x-[24px]">
        {/* the stage's own checkpoints, in the two-column ruled grid the source uses for its
            sub-sectors — ours run longer, so the columns are wider and may take two lines */}
        <ul data-links className="grid w-full max-w-[calc(var(--card-w)*0.52)] grid-cols-1 gap-x-[16px] gap-y-[11px] sm:grid-cols-2">
          {stage.points.slice(0, 4).map((pt) => (
            <li key={pt} className="flex items-center justify-between gap-x-[10px] pb-[7px]" style={{ borderBottom: `1px solid ${rule}` }}>
              <span className="whitespace-nowrap text-[14px] leading-[18px] lg:text-[14px] lg:leading-[19px]">{pt}</span>
              <ChevronIcon className="block h-[9px] w-[6px] shrink-0 opacity-65" />
            </li>
          ))}
        </ul>
        {/* 45px, 1px rule. On hover of the panel it fills and the cross flips to the panel's
            own ink — measured off the reference, where the glyph colour goes to #262626 the moment
            the pointer enters the coloured block, not just the circle. */}
        <span
          aria-hidden="true"
          className="relative hidden h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full transition-colors duration-300 ease-out group-hover/panel:bg-current lg:flex"
          style={{ border: `1px solid ${ink}`, color: ink }}
        >
          <svg viewBox="0 0 14 14" className="block h-[13px] w-[13px] transition-colors duration-300 ease-out" aria-hidden="true">
            <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" className="group-hover/panel:stroke-[var(--panel-bg)]" />
          </svg>
        </span>
      </div>

      {/* The reference's titles are one or two words, so its right-hand phase label can share the
          row. Ours run to thirty characters — sharing the row left the title 491px and pushed it
          to three lines. The title takes the full width; the phase label is pinned to the panel's
          bottom-right corner instead, which is where it sits in the reference anyway. */}
      <div data-title className="relative mt-[6px]">
        <span className="block pr-[calc(var(--card-w)*0.195)]">
          <span data-card-title className="flex min-h-[2.2em] items-end text-[min(56px,calc(var(--card-w)*0.0727))] font-normal leading-[1.1]">{stage.title}</span>
          <span className="mt-[8px] block text-[12px] tabular-nums opacity-70">
            {stage.stage} / {String(SERVICE_STAGES.length).padStart(2, "0")}
          </span>
        </span>
        <span className="absolute bottom-[2px] right-0 block max-w-[calc(var(--card-w)*0.246)] text-right text-[14px] leading-[19px] opacity-80 lg:text-[16px] lg:leading-[21px]">
          {stage.phase}
        </span>
      </div>
    </div>
  );
}

export function Services() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track || prefersReducedMotion()) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      // Measured off the reference: it moves 928px of card for every 1000px of scroll, so the pin
      // runs a little longer than the travel and each card lingers. At 1:1 ours passed a card in
      // 645px of scroll against its 831, which is why it felt hurried rather than smooth.
      const RATIO = 0.928;
      // A beat before the track moves. Without it the cards start sliding the instant the section
      // pins, so the opening panel is gone before it has been read. 500 px-equivalents comes to
      // roughly 540px of scroll once the ratio is applied — long enough to read the panel, short
      // enough that it never feels stuck.
      const LEAD = 500;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${Math.round((LEAD + distance()) / RATIO)}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      // durations in pixel-equivalents, so the scrub maps the hold and the travel linearly
      tl.to({}, { duration: LEAD });
      tl.to(track, { x: () => -distance(), ease: "none", duration: () => distance() });

      // Per-card reveal, driven from each card's measured position on every frame.
      //
      // This used GSAP's `containerAnimation`, which maps a trigger to a horizontal run by
      // assuming the timeline moves the track linearly from start to finish. The hold at the
      // beginning breaks that assumption: the timeline advanced while the track stood still, so
      // every card's panel finished collapsing during the pause and the reveal was over before
      // the card had moved. Reading the real geometry each frame is immune to that.
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
      const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
      /** progress through a window expressed in viewport fractions, entering from the right */
      const through = (f: number, from: number, to: number) => clamp01((from - f) / (from - to));

      const paint = () => {
        const vw = window.innerWidth;
        for (const card of cards) {
          const f = card.getBoundingClientRect().left / vw;
          const panel = card.querySelector<HTMLElement>("[data-panel]");
          const title = card.querySelector<HTMLElement>("[data-title]");
          const links = card.querySelector<HTMLElement>("[data-links]");
          if (panel) {
            const p = through(f, 0.98, 0.55);
            panel.style.height = `${450 - 165 * (1 - (1 - p) * (1 - p))}px`; // power2.out
          }
          if (title) {
            const p = through(f, 0.82, 0.62);
            title.style.opacity = `${p}`;
            title.style.transform = `translateY(${14 * (1 - p)}px)`;
          }
          if (links) links.style.opacity = `${through(f, 0.75, 0.57)}`;
        }
      };
      paint();
      tl.eventCallback("onUpdate", paint);
      ScrollTrigger.addEventListener("refresh", paint);
      const reveals = [{ kill: () => ScrollTrigger.removeEventListener("refresh", paint) }];

      return () => {
        reveals.forEach((r) => r.kill());
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(track, { x: 0 });
        ScrollTrigger.refresh();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      id="services"
      className="section section--designs relative mb-section overflow-hidden bg-white text-[#242a2e] lg:h-screen"
      data-background="white"
      // 710px is the ceiling; below roughly 1420 the card gives way to half the viewport, so it
      // stays responsive rather than sitting at a fixed pixel width on every screen. The intro
      // panel is the remainder, which keeps the opening frame at one card exactly.
      style={{ "--card-w": "min(710px, 50vw)" } as CSSProperties}
    >
      {/* ---------- desktop: one pinned run ---------- */}
      <div ref={trackRef} className="hidden h-full w-max lg:flex">
        {/* The run opens on the facade, shown bright rather than scrimmed — the same treatment
            the "One brief. One team." panel gives this photograph, where ink type sits on the
            frame's pale centre at better than 12:1. A dark overlay turned that centre into a flat
            grey field and lost the building entirely. */}
        <div className="relative h-full shrink-0 overflow-hidden bg-white text-[#242a2e]" style={{ width: INTRO_W }}>
          <Media src={HOME_SCROLL.leftImage} alt="" sizes="50vw" />
          {/* Centred, not sitting on the panel's floor. The frame's pale void is the middle of this
              picture, so that is both where the copy reads best and where the composition wants it —
              measured at 12-13:1 there against 1.01:1 for the scroll cue when it sat at the foot.
              It also retired the foot scrim that low reading had needed: with the copy centred the
              numbers are identical without it, so the photograph is shown bright again.
              pt clears the fixed header, which settles the block a touch below true centre — the
              right optical place for it in any case. */}
          <div className="relative flex h-full flex-col justify-center px-[44px] pb-[44px] pt-[var(--header-height,84px)]">
            <p className="text-label uppercase">Services</p>
            <h2
              className="mt-[18px] text-h1"
              aria-label={`${SERVICES_SECTION.title.display} ${SERVICES_SECTION.title.rest}`}
            >
              <span className="type-serif">{SERVICES_SECTION.title.display}</span> {SERVICES_SECTION.title.rest}
            </h2>
            <p className="mt-[18px] max-w-[40ch] text-[16px] leading-[23px] opacity-75">{SERVICES_SECTION.description}</p>
            <p className="mt-[26px] text-label uppercase">Scroll →</p>
          </div>
        </div>

        {/* No trailing panel. The travel ends the moment the last card is framed — at a 50vw card
            that leaves the last two side by side, filling the viewport — and the pin releases into
            normal vertical scroll from there. A run-out kept pushing the last card left across an
            empty field after there was nothing more to show. */}
        {SERVICE_STAGES.map((s) => (
          <a key={s.stage} data-card href={s.href} className="group flex h-full shrink-0 flex-col" style={{ width: CARD_W }}>
            <span className="group/photo relative block min-h-0 flex-1 overflow-hidden" onMouseMove={trackCursor}>
              <Media
                src={s.image}
                alt={s.imageAlt}
                sizes="771px"
                className="transition-transform duration-[900ms] ease-out group-hover/photo:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[var(--mx,50%)] top-[var(--my,50%)] flex h-[110px] w-[110px] -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-[#262626]/85 text-[14px] text-white opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover/photo:scale-100 group-hover/photo:opacity-100"
              >
                Explore
              </span>
            </span>
            <Panel stage={s} />
          </a>
        ))}
      </div>

      {/* ---------- below 992px: a vertical stack, as the source also does ---------- */}
      <div className="lg:hidden">
        {/* Same bright facade as the desktop opening panel, so the two read as one section.
            The desktop panel is tall enough that the type lands on the frame's pale centre; this
            block is short and wide, and the same crop puts the heading on the dark structure —
            measured at 1.29:1. A pale scrim lifts it back toward the white ground.
            It used to start fully transparent, which is precisely where the eyebrow label sits at
            pt-72 — so that label was on raw photograph and measured 2.32:1 at its worst. The scrim
            now starts at 0.62 and the label is no longer dimmed. */}
        <div className="relative overflow-hidden bg-white text-[#242a2e]">
          {/* Tall crop on a landscape source: see the note in ParallaxMedia. */}
          <Media src={HOME_SCROLL.leftImage} alt="" sizes="(min-width: 992px) 100vw, 150vw" />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.72)_30%,rgba(255,255,255,0.93)_62%,rgba(255,255,255,0.97)_100%)]"
          />
          <div className="relative px-[24px] pb-[44px] pt-[72px]">
            <p className="text-label uppercase">Services</p>
            <h2
              className="mt-[14px] text-h1"
              aria-label={`${SERVICES_SECTION.title.display} ${SERVICES_SECTION.title.rest}`}
            >
              <span className="type-serif">{SERVICES_SECTION.title.display}</span> {SERVICES_SECTION.title.rest}
            </h2>
            <p className="mt-[16px] text-[16px] leading-[24px] opacity-75">{SERVICES_SECTION.description}</p>
          </div>
        </div>

        {SERVICE_STAGES.map((s) => {
          const light = s.panelTone === "light";
          const ink = light ? "#262626" : "#ffffff";
          const rule = light ? "rgba(38,38,38,0.35)" : "rgba(255,255,255,0.45)";
          return (
            <a key={s.stage} className="grid grid-cols-[1fr_108px] items-stretch sm:grid-cols-[1fr_170px]" href={s.href}>
              {/* The reference's phone card carries the same content as its desktop panel — title,
                  the ruled sub-links, counter — at 44px rather than the 27px this had. Ours holds
                  the proportion but steps down, because our titles run to thirty characters. */}
              <span
                className="flex min-h-[320px] flex-col justify-between px-[24px] py-[28px]"
                style={{ backgroundColor: s.panel, color: ink } as CSSProperties}
              >
                <span className="block text-[clamp(28px,8.2vw,36px)] font-normal leading-[1.1]">{s.title}</span>
                <span className="mt-[20px] block">
                  <span className="block">
                    {s.points.slice(0, 4).map((pt) => (
                      <span
                        key={pt}
                        className="flex items-center justify-between gap-x-[10px] py-[6px] text-[14px] leading-[17px]"
                        style={{ borderBottom: `1px solid ${rule}` }}
                      >
                        {pt}
                        <ChevronIcon className="block h-[8px] w-[6px] shrink-0 opacity-65" />
                      </span>
                    ))}
                  </span>
                  <span className="mt-[12px] block text-[12px] tabular-nums opacity-70">
                    {s.stage} / {String(SERVICE_STAGES.length).padStart(2, "0")}
                  </span>
                </span>
              </span>
              <span className="relative block overflow-hidden">
                {/*
                  sizes describes WIDTH, but this box is portrait (108x320, 170x320 from 640px) and
                  the picture is object-cover on a 3:2 source — so the HEIGHT is what drives the
                  crop. To cover 320px of height a 3:2 source has to be 480px wide, and the old
                  value of 108px had Next serving a 256px variant that was then upscaled almost
                  four times. That is what made these cards look soft on a phone.
                  480px covers both breakpoints; every source here is at least 1448px wide, so the
                  2x and 3x variants are real pixels rather than an upscale. */}
                <Media src={s.image} alt={s.imageAlt} sizes="480px" />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
