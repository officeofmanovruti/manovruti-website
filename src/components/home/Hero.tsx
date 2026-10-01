"use client";

import { useEffect, useRef, useState } from "react";
import { HEADER, HERO_INTRO, HERO_SLIDES, HERO_TITLE, SERVICES_SECTION } from "./data";
import { ButtonLink } from "../shared/Button";
import { gsap, prefersReducedMotion, splitTitleLines } from "../shared/gsap";
import { Media } from "../shared/Media";

/**
 * Source: `.banner.banner--home` — height 823px desktop (823/900 of the viewport), 310.38px mobile,
 * background #242a2e, overflow hidden, ``.
 * Slideshow: Swiper with EffectFade + Autoplay — loop, slidesPerView 1, effect "fade" (crossFade),
 *   speed 1500ms, autoplay delay 1500ms. Implemented here as a plain cross-fade on a timer (no Swiper needed
 *   for a 1-per-view fade), preserving the exact 1500/1500 timing.
 * Each `.slide__image` carries a bottom gradient: linear-gradient(transparent → rgba(0,0,0,.8)),
 *   background-size 100% 36.77%, background-position 0 100%.
 * Caption: absolute, top 543.96px desktop (padding 73px 0 69px), container max-width 1560px padding 0 35px,
 *   inner max-width 508px; h1 65px/71.5px Matter 400 with `.text--iskry` 62px/68.2px second line.
 *   Mobile: caption padding 54px 0 22px, container padding 0 28px, inner max-width 248px, h1 30px/33px, Iskry 28.6px.
 * The title lines animate in after the intro: from {opacity 0, rotation 6, yPercent 100, transformOrigin "bottom left"}
 *   to {opacity 1, rotation 0, yPercent 0}, duration 1, stagger 0.125, ease power1.inOut.
 * Parallax: `.banner__slideshow` has data-parallaax="0.9" — ScrollSmoother moves it at 0.9x scroll speed.
 */
// The source cross-faded for as long as it held, so two photographs were superimposed half the
// time and every frame looked like a double exposure. Hold long enough to actually look at the
// picture, and cross-fade quickly enough that the blend is not the thing you notice.
const FADE_MS = 900;
const HOLD_MS = 4600;

export function Hero({ introPlaying }: { introPlaying: boolean }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  // All five slides sit in the DOM at once and all five were therefore fetched before first
  // paint — 1.35 MB of photographs to show one of them. The rest mount after load.
  const [slidesReady, setSlidesReady] = useState(false);

  useEffect(() => {
    // Deferred to the next frame rather than set inline: the server always renders this false, so
    // flipping it synchronously would both cascade a render and risk a hydration mismatch.
    let frame = 0;
    const on = () => { frame = requestAnimationFrame(() => setSlidesReady(true)); };
    if (document.readyState === "complete") on();
    else window.addEventListener("load", on, { once: true });
    return () => {
      window.removeEventListener("load", on);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Cross-fade slideshow — starts only once the intro has finished (source: autoplay.start() in the intro onComplete).
  useEffect(() => {
    if (introPlaying || !slidesReady) return;
    const slides = slidesRef.current?.querySelectorAll<HTMLElement>("[data-slide]");
    if (!slides?.length) return;
    let i = 0;
    // Five photographs cross-fade with no indication that there are five, so the change reads as
    // a glitch rather than a slideshow. The dots say how many and which.
    const markDot = (n: number) =>
      dotsRef.current?.querySelectorAll<HTMLElement>("[data-dot]").forEach((d, k) => {
        d.dataset.on = k === n ? "true" : "false";
      });
    markDot(0);
    const id = window.setInterval(() => {
      const next = (i + 1) % slides.length;
      gsap.to(slides[i], { opacity: 0, duration: FADE_MS / 1000, ease: "none" });
      gsap.to(slides[next], { opacity: 1, duration: FADE_MS / 1000, ease: "none" });
      i = next;
      markDot(next);
    }, FADE_MS + HOLD_MS);
    return () => window.clearInterval(id);
  }, [introPlaying, slidesReady]);

  // Title reveal, played when the intro completes.
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    const split = splitTitleLines(el);
    gsap.set(split.lines, { opacity: 0, transformOrigin: "bottom left", rotation: reduce ? 0 : 6, yPercent: reduce ? 0 : 100 });
    const tl = gsap.timeline({ paused: true }).to(split.lines, {
      duration: 1, opacity: 1, rotation: 0, yPercent: 0, stagger: split.lines.length ? 0.125 : 0, ease: "power1.inOut",
    });
    if (!introPlaying) tl.play();
    return () => { tl.kill(); split.revert(); };
  }, [introPlaying]);

  return (
    <div // Full viewport on both: this is the cover. svh so mobile browser chrome does not clip it.
      className="banner banner--home relative h-[100svh] overflow-hidden bg-[#242a2e] lg:h-screen lg:min-h-[620px]">
      <div className="banner__inner h-full">
        <div ref={slidesRef} className="banner__slideshow absolute inset-0" data-speed="0.9">
          {HERO_SLIDES.map((s, i) => (
            <div key={i} data-slide className="absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
              <div className="slide__image relative isolate h-full w-full bg-[linear-gradient(180deg,transparent_0,rgba(0,0,0,.01)_8.1%,rgba(0,0,0,.039)_15.5%,rgba(0,0,0,.083)_22.5%,rgba(0,0,0,.14)_29%,rgba(0,0,0,.207)_35.3%,rgba(0,0,0,.282)_41.2%,rgba(0,0,0,.36)_47.1%,rgba(0,0,0,.44)_52.9%,rgba(0,0,0,.518)_58.8%,rgba(0,0,0,.593)_64.7%,rgba(0,0,0,.66)_71%,rgba(0,0,0,.717)_77.5%,rgba(0,0,0,.761)_84.5%,rgba(0,0,0,.79)_91.9%,rgba(0,0,0,.8))] bg-[length:100%_36.77%] bg-[position:0_100%] bg-no-repeat">
                {/* `isolate` on the parent is load-bearing: the image sits at z-index -1 so the
                    foot gradient paints over it, and without a stacking context on the slide that
                    -1 escaped all the way past the section, which paints its own charcoal
                    background — so on mobile the hero showed no photograph at all. */}
                {i === 0 || slidesReady ? (
                  <Media src={s.src} alt={s.alt} priority={i === 0} sizes="(min-width: 992px) 100vw, 150vw" className="-z-[1]" />
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* A soft gradient at the foot. The slides were chosen because their caption zone is
            already dark in the original landscape frame — but a phone crops that frame to portrait
            and shows the middle instead, which on the construction slide is bright sky. Measured
            at 390px the brightest tenth of the caption band came out at 2.9:1 for white type.
            Desktop was worse still — 2.0 to 3.2:1 across all five slides — because the original
            gradient barely reached the caption. Both are now tuned against a measurement rather
            than an assumption. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[58%] bg-[linear-gradient(180deg,rgba(20,17,15,0)_0%,rgba(20,17,15,0.42)_30%,rgba(20,17,15,0.78)_100%)] lg:h-[52%] lg:bg-[linear-gradient(180deg,rgba(20,17,15,0)_0%,rgba(20,17,15,0.52)_30%,rgba(20,17,15,0.72)_70%,rgba(20,17,15,0.84)_100%)]"
        />

        {/* And one at the head, for the same reason. The bar over the hero is transparent by
            design, so the nav sits straight on the photograph. Sampling the rendered slideshow
            across all five slides, the strip behind the links failed 4.5:1 over more than half its
            area on twelve of sixteen samples, and on the land frame it ran at 1.00-1.21:1 — the
            nav was not merely dim, it was gone. Picking brighter-topped slides out is not an
            option when the client supplies the photography, so the ground is supplied here.
            The stops are solved, not guessed: the worst top strip measures 0.90 luminance, and
            white type needs the composite at or below 0.183 to clear 4.5:1, which puts the
            required alpha at 0.50. These hold 0.66 to 0.53 across the bar's full height, so the
            whole of the nav clears it with margin rather than only its first line of pixels.
            The tail is long and eased rather than linear: over a flat sky a linear ramp ends in a
            visible edge, and on the land frame that edge read as a grey band across the hills. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[280px] bg-[linear-gradient(180deg,rgba(12,15,17,0.66)_0%,rgba(12,15,17,0.56)_26%,rgba(12,15,17,0.40)_48%,rgba(12,15,17,0.22)_68%,rgba(12,15,17,0.09)_84%,rgba(12,15,17,0)_100%)]"
        />

        <div className="banner__caption absolute inset-x-0 bottom-0 z-[2] pb-[44px] pt-[56px] lg:pb-[69px] lg:pt-[73px]">
          {/* Mobile gutter matches the rest of the site (24px). The desktop value is the hero's own
              and is left alone — it is an overlay caption, not a content column. */}
          <div className="mx-auto w-full max-w-[1560px] px-[24px] lg:px-[35px]">
            {/* The 300px measure is a phone width, and it held all the way to 992 because the next step
                was lg. At 768 that squeezed the 55px headline into three lines — "Plan." /
                "Execute." / "Deliver." — on a screen with room for far more, and 640 did the same.
                sm and md now give those bands a measure of their own.
                640 at lg left the headline 27px short of fitting on one line — it needs 667px at
                65px — so it broke after the second full stop. 700 lets the whole tagline sit on one
                line from 992 up. Below that it still wraps to two; a phone needs 379px and has 300. */}
            <div className="banner__caption-inner max-w-[300px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[700px]">
              <h1
                ref={titleRef}
                aria-label={`${HERO_TITLE.line1} ${HERO_TITLE.line2}`}
                className="banner__title text-display text-white"
              >
                {HERO_TITLE.line1}{" "}
                <span>{HERO_TITLE.line2}</span>
              </h1>
              <p className="banner__intro mt-[16px] max-w-[300px] text-lead text-white/85 sm:max-w-[400px] md:max-w-[460px] lg:mt-[24px] lg:max-w-[540px]">
                {HERO_INTRO}
              </p>

              {/* The opening screen asked for nothing at all. One primary action, and one quiet
                  route into the work for people who want to look before they talk. */}
              <div className="mt-[22px] flex flex-wrap items-center gap-x-[20px] gap-y-[14px] lg:mt-[32px]">
                <ButtonLink variant="solid-white" href={HEADER.cta.href}>
                  Start a conversation
                </ButtonLink>
                <a
                  href={SERVICES_SECTION.cta.href}
                  className="tap text-[14px] font-medium text-white/80 underline decoration-white/30 underline-offset-[6px] transition-colors duration-300 hover:text-white hover:decoration-white lg:text-[16px]"
                >
                  {SERVICES_SECTION.cta.label}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators, bottom right, and a scroll cue. Both are affordances the cover was
            missing: nothing said the photograph would change, and nothing said to keep going. */}
        <div
          ref={dotsRef}
          className="absolute bottom-[26px] right-[28px] z-[2] hidden items-center gap-x-[7px] sm:flex lg:bottom-[73px] lg:right-[35px]"
          aria-hidden="true"
        >
          {HERO_SLIDES.map((_, i) => (
            <span
              key={i}
              data-dot
              data-on={i === 0 ? "true" : "false"}
              className="block h-[3px] w-[18px] bg-white/25 transition-colors duration-500 data-[on=true]:bg-white lg:w-[24px]"
            />
          ))}
        </div>

        <a
          href="#services"
          aria-label="Scroll to our services"
          className="group absolute bottom-[26px] left-1/2 z-[2] hidden -translate-x-1/2 flex-col items-center gap-y-[6px] text-white/55 transition-colors duration-300 hover:text-white lg:flex"
        >
          <span className="text-[12px] uppercase tracking-[0.12em]">Scroll</span>
          <span className="block h-[26px] w-px bg-current" />
        </a>
      </div>
    </div>
  );
}
