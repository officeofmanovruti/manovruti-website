"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Route transitions.
 *
 * Navigation is intercepted here rather than by swapping 51 `<a>` tags for `next/link`. A plain
 * anchor is what a crawler and a screen reader want, and a single delegated listener cannot fall
 * out of step with a call site that forgot to use the special component. Modified clicks, new
 * tabs, downloads, external hosts and in-page hashes are all handed straight back to the browser —
 * the hash case belongs to SmoothScroll, which scrolls through the smoother instead of jumping.
 *
 * The panel is one continuous movement across the two pages: it rises from below to cover the old
 * page, the new page is pushed behind it, and it keeps travelling off the top to reveal. Covering
 * first is the point — it hides the scroll reset and the moment ScrollTrigger re-measures a
 * freshly mounted page, which is the part that otherwise looks broken.
 */
const COVER = 0.42;
const REVEAL = 0.58;
/** If a route ever fails to resolve, the panel must not be left sitting over the site. */
const SAFETY_MS = 2500;

export function PageTransition() {
  const panel = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  /** Set while a covered navigation is in flight; the reveal only runs for one we started. */
  const navigating = useRef(false);
  const safety = useRef<number | undefined>(undefined);

  /**
   * GSAP parses whatever transform is already on the element into its own `y`, so the inline
   * translateY(-100%) that keeps the panel off-screen before hydration was being *added* to
   * yPercent: the rest position came out at -1800px and the cover ran inverted. Pinning `y: 0`
   * every time makes yPercent the only vertical source.
   */
  const park = useCallback(() => {
    // visibility: hidden, not just off-screen. A fixed, full-viewport element with a background
    // stays a compositing layer even when translated away, and it sits above every other layer on
    // the page. Hidden, it costs nothing between transitions.
    if (panel.current) {
      gsap.set(panel.current, { y: 0, yPercent: -100, pointerEvents: "none", visibility: "hidden" });
    }
    if (mark.current) gsap.set(mark.current, { opacity: 0 });
  }, []);

  const reveal = useCallback(() => {
    const el = panel.current;
    if (!el) return;
    window.clearTimeout(safety.current);

    // The new page mounted under the panel at whatever offset the old one left behind.
    window.smoother?.scrollTo(0, false);
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();

    if (prefersReducedMotion()) {
      park();
      return;
    }
    gsap
      .timeline({ onComplete: park })
      .to(mark.current, { opacity: 0, duration: 0.2, ease: "power1.out" }, 0)
      .to(el, { y: 0, yPercent: -100, duration: REVEAL, ease: "power3.inOut" }, 0.04);
  }, [park]);

  // First paint, and any navigation we did not cover (back/forward): park it, do not play a wipe
  // the reader never asked for.
  useEffect(() => {
    park();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount only
  }, []);

  useEffect(() => {
    if (!navigating.current) return;   // only reveal a cover we put up ourselves
    navigating.current = false;
    reveal();
  }, [pathname, reveal]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || link.hasAttribute("download") || link.getAttribute("target") === "_blank") return;
      // Hashes, mailto:, tel: and anything off-site are not ours.
      if (!href.startsWith("/") || href.startsWith("/#")) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // A link to the page we are already on is not a navigation, with or without a hash. The
      // `&& !url.hash` that used to be here let "/about#journey" through while on /about — the
      // footer renders exactly that link on every page. The panel then covered the screen and
      // `reveal` never ran, because it is driven by a pathname change that never came, so the
      // visitor sat under a full-screen panel until the safety timer fired. Same-page hashes
      // belong to SmoothScroll, which scrolls through the smoother and allows for the header.
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      if (navigating.current) return;
      navigating.current = true;

      const el = panel.current;
      if (!el || prefersReducedMotion()) {
        // Release the flag: this branch raises no panel, so nothing else will clear it. Left set,
        // the guard above swallowed every later click and navigation died for the session.
        navigating.current = false;
        router.push(href);
        return;
      }
      // Covered navigations can outlive the animation, so the panel is only released by `reveal`.
      safety.current = window.setTimeout(() => { navigating.current = false; reveal(); }, SAFETY_MS);
      gsap.set(el, { pointerEvents: "auto", visibility: "visible" });
      gsap
        .timeline({ onComplete: () => router.push(href) })
        .fromTo(el, { y: 0, yPercent: 100 }, { yPercent: 0, duration: COVER, ease: "power3.inOut" }, 0)
        .fromTo(mark.current, { opacity: 0 }, { opacity: 1, duration: 0.24, ease: "power1.out" }, 0.16);
    };

    /**
     * Warm the route before the click so the cover is not hiding a network wait.
     *
     * `pointerenter` does not bubble, so reaching it needed a capture listener — which fires for
     * every element the pointer crosses, not just links. Moving the mouse while the page scrolled
     * ran this hundreds of times a second and re-requested the same route on each one. `pointerover`
     * bubbles, so one delegated listener is enough; the Set makes each route cost exactly one
     * prefetch; and the idle callback keeps it off the frames the scroll is using.
     */
    const warmed = new Set<string>();
    const onOver = (e: Event) => {
      const link = (e.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("/#") || warmed.has(href)) return;
      warmed.add(href);
      const idle = window.requestIdleCallback ?? window.setTimeout;
      idle(() => router.prefetch(href));
    };

    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", onOver);
      window.clearTimeout(safety.current);
    };
  }, [router, reveal]);

  return (
    <div
      ref={panel}
      aria-hidden="true"
      // Above the header (z-999) and the mobile menu (z-998): anything left showing through reads
      // as a seam rather than as chrome, and the mark on the panel carries the branding meanwhile.
      className="pointer-events-none fixed inset-0 z-[1000] flex items-center justify-center bg-[#1b2126]"
      style={{ transform: "translateY(-100%)", visibility: "hidden" }}
    >
      <div ref={mark} style={{ opacity: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed-height brand asset */}
        <img src="/manovruti/brand/mark-light.png" alt="" className="h-[52px] w-auto" />
      </div>
    </div>
  );
}
