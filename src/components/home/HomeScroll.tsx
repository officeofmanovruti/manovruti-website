"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, splitTitleLines } from "../shared/gsap";
import { ButtonLink } from "../shared/Button";
import { HOME_SCROLL } from "./data";
import { Media } from "../shared/Media";

/**
 * The signature section: a pinned, scrubbed transition from a half-width portrait panel to a
 * full-bleed image with centred copy. Desktop only (>=992px); a static stacked version renders below.
 *
 * Source timeline (scrub: true, start "top top", end "bottom -60%", pin on `.section__inner`):
 *   c = 1.25 (the shared duration for the width/parallax pair)
 *   .to(left-content,   { opacity: 0, ease: Power0.inOut, duration: .3 }, 0)
 *   .fromTo(left,       { width: "50vw" }, { width: "0vw", duration: c, ease: Power4.inOut }, 0)
 *   .fromTo(full img,   { xPercent: 25 }, { xPercent: 0, duration: c }, 0)
 *   .fromTo(full-content,{ background: rgba(36,42,46,0) }, { background: rgba(36,42,46,.7), duration: .3 }, 0)
 *   title lines           from { opacity 0, rotation 6, yPercent 100 } → { 1, 0, 0 } duration .5 stagger .125, at 0
 *   .fromTo(buttons > div,{ opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .5, stagger: .125 }, ">-0.125")
 * Entering flips body text to dark, leaving back flips it to light. The header is no longer part
 * of that: it is frosted glass with white type throughout.
 * The inset box-shadow starts as a 13.095vw (=220/1680) frame in the page ground (#ffffff) and closes to 0.
 */
function setText(mode: "light" | "dark") {
  document.body.setAttribute("data-text", mode);
}

export function HomeScroll() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 992px)", () => {
      const reduce = prefersReducedMotion();
      const c = 1.25;
      const q = gsap.utils.selector(root);
      // The panel behind the header changes during this scrub: it is the bone frame while the
      // photograph is still inset, then the darkened photograph once the frame closes. Rather than
      // guess a progress number, read the frame's actual thickness each tick and flip once it no
      // longer reaches under the bar. Self-correcting if the frame's timing is ever retuned.
      let headerIsLight: boolean | null = null;
      const frameInset = () => {
        const el = q(".section__full-content")[0];
        if (!el) return 0;
        // computed box-shadow reads "<colour> 0px 0px 0px <spread> inset"
        const lens = getComputedStyle(el).boxShadow.match(/-?\d*\.?\d+px/g);
        return lens && lens.length >= 4 ? parseFloat(lens[3]) : 0;
      };
      const syncHeader = () => {
        // Compare against where the nav type actually sits, not the bar's full height: the frame
        // only stops mattering once it no longer reaches the glyphs.
        const nav = document.querySelector<HTMLElement>(".header-main nav");
        const navTop = nav ? nav.getBoundingClientRect().top : 34;
        const wantLight = frameInset() <= navTop;
        if (wantLight !== headerIsLight) { headerIsLight = wantLight; setText(wantLight ? "light" : "dark"); }
      };
      const titleEl = q(".section__full-title")[0];
      const split = titleEl ? splitTitleLines(titleEl) : null;
      if (split) gsap.set(split.lines, { opacity: 0, transformOrigin: "bottom left", rotation: reduce ? 0 : 6, yPercent: reduce ? 0 : 100 });
      gsap.set(q(".section__full-buttons > div"), { opacity: 0, y: reduce ? 0 : 30 });
      gsap.set(q(".section__full-image img"), { scale: reduce ? 1 : 1.12, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root, scrub: true, pin: q(".section__inner")[0], start: "top top", end: "+=160%",
          anticipatePin: 1, pinSpacing: true, invalidateOnRefresh: true,
          // The panel starts light (a white frame behind the header) and ends dark (scrim over the
          // full-bleed image), so the header colour follows the scrub rather than the enter/leave edges.
          onUpdate: syncHeader,
          onEnter: syncHeader,
          onEnterBack: syncHeader,
          onLeaveBack: () => { headerIsLight = null; setText("light"); },
        },
      });
      // The left copy used to start fading at 0, so it was gone while the panel was still half the
      // screen — a large empty field with nothing in it. The panel barely moves for the first
      // third anyway (power4.inOut), so the words can stay for it.
      tl.to(q(".section__left-content"), { opacity: 0, ease: "power1.inOut", duration: 0.3 }, 0.5)
        .fromTo(q(".section__left"), { width: "50vw" }, { width: "0vw", duration: reduce ? 0.001 : c, ease: "power4.inOut" }, 0)
        // A scale, not an x-shift: shifting the image sideways exposed a bare strip beside it
        // while the left panel was still open.
        .fromTo(q(".section__full-image img"), { scale: reduce ? 1 : 1.12 }, { scale: 1, duration: c, ease: "power2.out" }, 0)
        // White copy needs the picture darkened; 0.62 is the measured minimum that takes the
        // headline to 4.5:1 against the brightest part of the drawing beneath it (0.55 gives 4.06,
        // which fails). It leads the copy in, so the surface is ready before the type lands.
        .fromTo(q(".section__full-content"), { backgroundColor: "rgba(20,24,27,0.16)" },
                { backgroundColor: "rgba(20,24,27,0.62)", duration: 0.5, ease: "none" }, 0.55)
        // The frame is the whole effect: the photograph starts as a small inset panel floating in
        // the page's bone field and opens to full bleed as you scroll. 13.095vw is the source's
        // value. Kept as its own tween — sharing a fromTo with the scrim re-seeds the colour and
        // wipes it halfway through.
        .fromTo(q(".section__full-content"), { boxShadow: "inset 0 0 0 13.095vw #ffffff" },
                { boxShadow: "inset 0 0 0 0vw #ffffff", duration: 0.9375, ease: "none" }, 0.3125);
      // The copy is white, and for the first two thirds of the scrub most of the panel is still
      // the bone frame — so revealing it at 0 put white type on a bone field and it simply was not
      // there. It now lands once the frame is about three quarters open and the scrim is down.
      if (split) tl.to(split.lines, { opacity: 1, rotation: 0, yPercent: 0, duration: 0.5, stagger: 0.125, ease: "power1.inOut" }, 1.0);
      tl.to(q(".section__full-buttons > div"), { opacity: 1, y: 0, duration: 0.5, stagger: 0.125 }, ">-0.125");

      return () => { tl.kill(); split?.revert(); ScrollTrigger.refresh(); };
    });
    return () => mm.revert();
  }, []);

  return (
    <>
      {/* Desktop: pinned + scrubbed */}
      {/* No bottom gap. The section-to-section rhythm is right between two padded sections, but this
          one ends on a full-bleed photograph and Services begins on one, so 104px of white between
          them read as a seam that had failed to close rather than as breathing room. Full bleed to
          full bleed cuts straight. */}
      <div ref={rootRef} className="section section--home-scroll relative hidden overflow-hidden lg:block">
        <div className="section__inner flex h-screen w-full max-w-full">
          <div className="section__left relative h-full w-[50vw] shrink-0 overflow-hidden">
            <div className="section__left-inner h-full">
              <div className="section__left-content relative z-[2] flex h-full max-w-[50vw] flex-col justify-center pl-[clamp(40px,7vw,110px)] pr-[40px]">
                <h2 className="section__title section__left-title mb-[32px] max-w-[30rem] text-display font-normal text-[#242a2e]">
                  {HOME_SCROLL.leftTitle}
                </h2>
              </div>
              <div className="section__image absolute left-[720px] top-1/2 h-full min-h-full w-[787.5px] -translate-x-full -translate-y-1/2">
                <Media src={HOME_SCROLL.leftImage} alt={HOME_SCROLL.leftImageAlt} sizes="788px" />
              </div>
            </div>
          </div>

          <div className="section__full relative h-full min-w-0 flex-1">
            <div className="section__full-inner h-full">
              <div className="section__full-content relative z-[2] flex h-full w-full flex-col items-center justify-center text-center">
                <div className="section__full-content-inner">
                  <div className="mx-auto w-full max-w-[1350px] px-[35px]">
                    <h2
                      className="section__title section__full-title mx-auto mb-[32px] max-w-[48.25rem] text-display font-normal text-white"
                      aria-label={HOME_SCROLL.fullTitle}
                    >
                      {HOME_SCROLL.fullTitle}
                    </h2>
                    <div className="section__full-buttons flex flex-wrap items-center justify-center gap-x-[36px] gap-y-[20px]">
                      <div>
                        <ButtonLink variant="solid-white" href={HOME_SCROLL.button.href}>{HOME_SCROLL.button.label}</ButtonLink>
                      </div>
                      <div className="section__full-note text-[16px] text-white/75">
                        <p>
                          {HOME_SCROLL.note}{" "}
                          <a href={HOME_SCROLL.noteLink.href} className="underline transition-colors duration-300 ease-in-out hover:text-[var(--color-brand)]">
                            {HOME_SCROLL.noteLink.label}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section__image section__full-image absolute inset-0 overflow-hidden">
                <Media src={HOME_SCROLL.fullImage} alt={HOME_SCROLL.fullImageAlt} sizes="100vw" className="-z-[1]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: static stack (source: .section--home-scroll-mobile) */}
      {/* py-section rather than the clone's bare pt-[68px]: the block had no bottom padding at
          all, so the note ran straight into the dark Services panel below it. The token is the
          same vertical rhythm every other section uses. */}
      <div className="section section--home-scroll-mobile overflow-hidden py-section text-[#242a2e] lg:hidden">
        <div className="section__inner">
          <div className="section__left">
            <div className="section__left-inner flex flex-col justify-end pb-[40px]">
              <div className="section__left-content px-[var(--page-gutter,24px)]">
                {/* No width cap, and balanced. The cap was 250px inside a 320px column, which forced the
                    break after "One" and left "team." alone on line two. Balancing splits it at the
                    sentence instead: "One brief." / "One team." SplitText measures the rendered
                    lines, so it picks up the balanced break rather than fighting it. */}
                <h2 className="section__title section__left-title text-balance text-display font-normal" data-animate-title aria-label={HOME_SCROLL.leftTitle}>
                  {HOME_SCROLL.leftTitle}
                </h2>
              </div>
            </div>
          </div>
          <div className="section__full relative z-[2]">
            <div className="section__full-inner grid grid-cols-1">
              {/* Aspect ratio, not the clone's fixed 281.59px: the box now scales with the gutter
                  instead of being one height that only suited a 320px column. 8/7 reproduces the
                  proportion it had at 390. */}
              <div className="section__image section__full-image relative mx-[var(--page-gutter,24px)] mb-[40px] aspect-[8/7]">
                {/* Tall crop on a landscape source — sizes must allow for the cover, see ParallaxMedia. */}
                <Media src={HOME_SCROLL.fullImage} alt={HOME_SCROLL.fullImageAlt} sizes="(min-width: 992px) 100vw, 150vw" />
              </div>
              <div className="section__full-content">
                <div className="px-[var(--page-gutter,24px)]">
                  <h2 className="section__title section__full-title text-pretty text-display font-normal" data-animate-title aria-label={HOME_SCROLL.fullTitle}>
                    {HOME_SCROLL.fullTitle}
                  </h2>
                  <div className="section__full-buttons mt-[clamp(28px,7vw,36px)] flex flex-col items-start gap-y-[20px]" data-animate="step-up">
                    <div data-animate-child>
                      <ButtonLink variant="solid-gold" href={HOME_SCROLL.button.href}>{HOME_SCROLL.button.label}</ButtonLink>
                    </div>
                    <div className="section__full-note max-w-[34ch] text-[14px] leading-[1.5] opacity-75" data-animate-child>
                      <p>
                        {HOME_SCROLL.note}{" "}
                        <a href={HOME_SCROLL.noteLink.href} className="tap whitespace-nowrap underline decoration-current/40 underline-offset-[4px] transition-colors hover:decoration-current">
                          {HOME_SCROLL.noteLink.label}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
