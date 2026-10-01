"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { gsap, ScrollSmoother, ScrollTrigger, prefersReducedMotion } from "./gsap";

declare global {
  interface Window {
    smoother?: ScrollSmoother;
  }
}

/**
 * GSAP ScrollSmoother, matching the source site:
 *   ScrollTrigger.matchMedia({ "(min-width: 992px)": () => ScrollSmoother.create({ smooth: 1, effects: true }) })
 * `effects: true` picks up data-speed / data-lag attributes on decorative shapes.
 * The fixed header must live OUTSIDE this wrapper.
 */
/**
 * Seconds for the content to catch up with the pointer — the one number that sets the scroll feel.
 *
 * 1.35 read as glide but also as weight: Lenis, which the reference site uses, covers most of the
 * distance sooner and leaves a short tail, so it feels answered rather than towed. ScrollSmoother
 * has no easing curve to hand, only this time constant, so the way to move towards that feel is to
 * shorten it. 1.0 is the compromise: still unmistakably smoothed, no longer lagging the hand.
 *
 * Raise towards 1.4 for more float, drop towards 0.7 for something nearly immediate. Nothing else
 * needs to change with it, and it does not affect frame rate — only how far behind the pointer the
 * content sits.
 */
const SMOOTH = 1.0;

/**
 * Whether GSAP takes the wheel and touch events over from the browser.
 *
 * TRUE is what stops the scroll feeling stepped: the browser moves the page in discrete notches,
 * and without this the smoother only eases towards wherever the browser already jumped to.
 *
 * FALSE is worth trying on a Mac trackpad. macOS generates its own momentum after your fingers
 * lift, and when GSAP is also integrating those events the two can disagree about where the page
 * should be — which feels like stutter rather than like lag. Flip this to false, save, and the
 * page reloads; if the stutter goes, this was the cause and the cost is a slightly steppier wheel.
 */
const NORMALIZE = true;

export function SmoothScroll({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      const reduce = prefersReducedMotion();
      document.documentElement.classList.add("has-smoother");
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: reduce ? 0.01 : SMOOTH,
        effects: !reduce,
        /**
         * The thing that actually made it feel like every other site.
         *
         * Without this, the browser still owns the scroll: a wheel notch moves the page in its own
         * discrete step and the smoother eases the content towards wherever the browser has
         * already decided to be. The motion is smoothed, but the input is still stepped, so it
         * reads as an ordinary scroll with a delay on it. normalizeScroll hands the wheel and
         * touch events to GSAP, which integrates them into one continuous position — that is the
         * difference between "smoothed" and "smooth".
         *
         * It is inside the (min-width: 992px) branch deliberately. Normalising touch input on a
         * phone fights the browser's own scrolling and breaks nested scrollers — the portfolio
         * filter rail and the mobile sheet both scroll on their own below this width.
         */
        normalizeScroll: NORMALIZE && !reduce,
        ignoreMobileResize: true,
      });
      window.smoother = smoother;
      return () => {
        smoother.kill();
        window.smoother = undefined;
        document.documentElement.classList.remove("has-smoother");
      };
    });
    // Scroll an element under the fixed bar, through the smoother when there is one.
    const bringIntoView = (target: HTMLElement, animate: boolean) => {
      const header = document.querySelector<HTMLElement>(".header-main");
      const offset = (header?.offsetHeight ?? 0) + 8;
      if (window.smoother) {
        window.smoother.scrollTo(target, animate, `top ${offset}px`);
      } else {
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: animate ? "smooth" : "auto" });
      }
    };

    // A hash the page was OPENED with, rather than one clicked while here. Arriving at
    // /#credentials from another route left the reader at the top of the page: the browser's
    // native jump targets the element's document position, and the smoother has translated the
    // content away from it — the same reason in-page anchors need a handler, except nothing was
    // handling the load case. Measured: scrollY 0 with the section 12958px down the page.
    //
    // Twice, because the document is still growing when the first pass runs. Pinned sections add
    // their scroll distance during ScrollTrigger's setup, so a position measured before that is
    // short; the second pass corrects it once the layout has settled.
    const openedAtHash = () => {
      const hash = window.location.hash;
      if (!hash || hash === "#") return;
      let target: HTMLElement | null = null;
      try {
        target = document.querySelector<HTMLElement>(hash);
      } catch {
        return; // not a valid selector
      }
      if (!target) return;
      bringIntoView(target, false);
      window.setTimeout(() => {
        ScrollTrigger.refresh();
        bringIntoView(target as HTMLElement, false);
      }, 400);
    };
    if (document.readyState === "complete") window.setTimeout(openedAtHash, 120);
    else window.addEventListener("load", () => window.setTimeout(openedAtHash, 120), { once: true });

    // In-page anchors have to go through the smoother. The browser's native jump targets the
    // element's document position, but the smoother has translated the content away from it, so a
    // plain <a href="#id"> changed the URL and scrolled nowhere. Below 992px there is no smoother,
    // so the same handler falls back to a normal scroll with the fixed header allowed for.
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!link || !href || href === "#" || href === "/#") return;

      // Section links are written root-relative ("/#services") so they resolve from every route:
      // on a sub-page the browser navigates home and lands on the section, and here on the home
      // page we strip the slash and scroll instead of reloading. Written as bare "#services" they
      // were simply dead on /about and /portfolio — 38 of them, measured.
      const onHome = window.location.pathname === "/";
      const hash = href.startsWith("#") ? href : href.startsWith("/#") && onHome ? href.slice(1) : null;
      if (!hash) return;

      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();

      const reduce = prefersReducedMotion();

      bringIntoView(target as HTMLElement, !reduce);
      // Keep the address bar in step without letting the browser jump.
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onAnchorClick);
    return () => {
      document.removeEventListener("click", onAnchorClick);
      mm.revert();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
