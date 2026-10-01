"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

/** Register once, on the client only. Import `gsap` from here everywhere in the site. */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, ScrollSmoother, SplitText };

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Body background colours used by [data-background] sections (source theme names). */
export const PANEL_COLOURS: Record<string, string> = {
  // Both light panel names resolve to pure white: the owner wants #ffffff as the page ground,
  // and the two have to agree or the body tween would step between them mid-scroll.
  white: "#ffffff",
  ebb: "#ffffff",
  outerspace: "#1b2126",
  black: "#000000",
  palmgreen: "#071e13",
  ebonyclay: "#2c343a",
  thunder: "#242a2e",
  mineshaft: "#272727",
};

const DARK_PANELS = new Set(["palmgreen", "ebonyclay", "mineshaft", "black", "thunder", "outerspace"]);
export const isDarkPanel = (name: string): boolean => DARK_PANELS.has(name);

/**
 * Wraps each SplitText line in a `.title-mask` (overflow hidden) exactly like the source theme.
 * Returns the SplitText instance; caller owns `.revert()`.
 */
export function splitTitleLines(el: Element): SplitText {
  const split = new SplitText(el, { type: "lines", linesClass: "title-line" });
  split.lines.forEach((line) => {
    const mask = document.createElement("div");
    mask.classList.add("title-mask");
    line.parentNode?.insertBefore(mask, line);
    mask.appendChild(line);
  });
  gsap.set(el.querySelectorAll(".title-mask"), { overflow: "hidden" });
  return split;
}
