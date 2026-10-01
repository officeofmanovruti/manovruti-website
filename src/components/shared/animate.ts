"use client";

/**
 * Port of the source theme's "animate" reveal system (animate.js).
 *
 *  [data-animate]           default "step-in": opacity 0→1, duration .5, ease power1.inOut, stagger .125 across [data-animate-child]
 *  [data-animate="step-up"] opacity 0→1 AND y 30→0 (same timing)
 *  [data-animate="batch"]   children set opacity 0, y 40; ScrollTrigger.batch(interval .1, batchMax 16) → opacity 1, y 0, stagger .125 each, duration .5
 *  [data-animate-start]     ScrollTrigger start (default "top 80%")
 *  [data-animate-title]     SplitText lines wrapped in .title-mask; lines from {opacity 0, rotation 6, yPercent 100, transformOrigin "bottom left"}
 *                            to {opacity 1, rotation 0, yPercent 0}, duration 1, stagger .125, ease power1.inOut
 *  [data-background="name"]  ScrollTrigger start "top center" / end "bottom center": tween body background-color + --current-background,
 *                            set data-background-current, flip data-text / header colour depending on panel darkness
 *  The source also drove a per-panel header colour from [data-header]. That is gone: the bar is
 *  frosted glass with white type at every scroll position, so there is nothing to drive.
 * All reveal triggers run once.
 */

import { gsap, ScrollTrigger, PANEL_COLOURS, isDarkPanel, prefersReducedMotion, splitTitleLines } from "./gsap";

type Cleanup = () => void;

function revealTween(el: Element, kind: string, reduce: boolean): gsap.core.Tween {
  const children = el.querySelectorAll("[data-animate-child]");
  const targets = children.length ? children : el;
  const stagger = children.length ? 0.125 : 0;
  if (kind === "step-up") {
    return gsap.fromTo(targets, { opacity: 0, y: reduce ? 0 : 30, ease: "power1.inOut" }, { duration: 0.5, opacity: 1, stagger, y: 0 });
  }
  return gsap.fromTo(targets, { opacity: 0, ease: "power1.inOut" }, { duration: 0.5, stagger, opacity: 1 });
}

function initReveals(scope: ParentNode, reduce: boolean): Cleanup[] {
  const cleanups: Cleanup[] = [];
  const seen = new WeakSet<Element>();
  scope.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => {
    const kind = el.getAttribute("data-animate") || "step-in";
    const start = el.getAttribute("data-animate-start") || "top 80%";
    if (kind === "batch") {
      const children = el.querySelectorAll<HTMLElement>("[data-animate-child]");
      if (!children.length) return;
      const batchMax = parseInt(el.getAttribute("data-batch-max") || "16", 10);
      children.forEach((c) => { if (!seen.has(c)) gsap.set(c, { opacity: 0, y: reduce ? 0 : 40 }); });
      const triggers = ScrollTrigger.batch(children, {
        interval: 0.1,
        batchMax,
        start,
        once: true,
        onEnter: (batch) => {
          const fresh = (batch as Element[]).filter((c) => !seen.has(c));
          if (!fresh.length) { gsap.set(batch, { opacity: 1, y: 0 }); return; }
          fresh.forEach((c) => seen.add(c));
          gsap.to(fresh, { opacity: 1, y: 0, stagger: { each: 0.125 }, duration: 0.5, overwrite: true });
        },
      });
      cleanups.push(() => triggers.forEach((t) => t.kill()));
      return;
    }
    const tween = revealTween(el, kind, reduce);
    const st = ScrollTrigger.create({ trigger: el, start, animation: tween, toggleActions: "play none none none", once: true });
    cleanups.push(() => { st.kill(); tween.kill(); });
  });
  return cleanups;
}

function initTitles(scope: ParentNode, reduce: boolean): Cleanup[] {
  const cleanups: Cleanup[] = [];
  scope.querySelectorAll<HTMLElement>("[data-animate-title]").forEach((el) => {
    const start = el.getAttribute("data-animate-start") || "top 80%";
    const split = splitTitleLines(el);
    gsap.set(split.lines, { opacity: 0, transformOrigin: "bottom left", rotation: reduce ? 0 : 6, yPercent: reduce ? 0 : 100 });
    const tween = gsap.to(split.lines, { duration: 1, opacity: 1, rotation: 0, yPercent: 0, stagger: split.lines.length ? 0.125 : 0, y: 0, ease: "power1.inOut", paused: true });
    const st = ScrollTrigger.create({ trigger: el, start, animation: tween, toggleActions: "play none none none", once: true });
    cleanups.push(() => { st.kill(); tween.kill(); split.revert(); });
  });
  return cleanups;
}

export function updateBodyBackground(name: string): void {
  const colour = PANEL_COLOURS[name] || PANEL_COLOURS.ebb;
  gsap.to("body", { backgroundColor: colour, "--current-background": colour });
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) gsap.to(meta, { attr: { content: colour } });
  document.body.setAttribute("data-background-current", name);
  // Body text colour rides with the background, as in the source. The header is not involved:
  // it is a fixed charcoal glass plate and its type is white regardless of the panel beneath.
  document.body.setAttribute("data-text", isDarkPanel(name) ? "light" : "dark");
}

function initBackgrounds(scope: ParentNode): Cleanup[] {
  const cleanups: Cleanup[] = [];
  scope.querySelectorAll<HTMLElement>("[data-background]").forEach((el) => {
    if (!el.offsetParent && el.offsetHeight === 0) return;
    const name = el.getAttribute("data-background") || "ebb";
    const startEdge = el.getAttribute("data-background-start") || "center";
    const endEdge = el.getAttribute("data-background-end") || "center";
    const st = ScrollTrigger.create({
      trigger: el,
      start: () => `top ${startEdge}`,
      end: () => `bottom ${endEdge}`,
      onEnter: () => updateBodyBackground(name),
      onEnterBack: () => updateBodyBackground(name),
    });
    cleanups.push(() => st.kill());
  });
  return cleanups;
}

/**
 * Initialise every reveal / background / header trigger under `scope`.
 * The source runs this on DOMContentLoaded, or after the intro fires "IntroAnimationAfterReveal".
 * Returns a cleanup that kills all triggers and reverts SplitText.
 */
export function initAnimate(scope: ParentNode = document): Cleanup {
  const reduce = prefersReducedMotion();
  const cleanups = [...initReveals(scope, reduce), ...initTitles(scope, reduce), ...initBackgrounds(scope)];
  ScrollTrigger.refresh();
  return () => cleanups.forEach((fn) => fn());
}
