"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HamburgerIcon } from "../shared/icons";
import { ButtonLink } from "../shared/Button";
import { Logo } from "../shared/Logo";
import { HEADER } from "./data";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

/**
 * Fixed header. Logo left, navigation and enquiry action right.
 *
 * Desktop shows the navigation in full — for a consultancy the services are the reason people
 * visit, so they are not hidden behind a hamburger. Below 992px the hamburger opens a full-screen
 * sheet instead. The bar is frosted charcoal glass and its type is white at every scroll position,
 * so nothing here follows the page's colour any more.
 *
 * The bar is transparent over the hero and condenses below it — see the `.header-main` rules in
 * globals.css for why. This component's only job in that is to say when: `data-condensed` flips
 * once the first screen has been scrolled past.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.setAttribute("data-menu-open", menuOpen ? "true" : "false");
  }, [menuOpen]);

  // Transparent over the opening screen, condensed below it — and out of the way entirely while
  // the reader is going down. Scrolling up is the gesture that means "I want to get somewhere", so
  // that is when the bar comes back. It also lets the full-bleed sections actually reach the top
  // of the viewport instead of losing their first 76px to a strip.
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let condensed: boolean | null = null;
    let hidden: boolean | null = null;
    let last = window.scrollY;

    /**
     * The scroll position at which the bar stops being over the opening frame.
     *
     * This was a flat 62% of the viewport height, which assumed every page opens on a full-height
     * hero. The sub-pages do not — theirs are 40-62svh — so there was a band on each of them where
     * the bar had left the dark picture but had not yet condensed, leaving white nav type on the
     * white page beneath. Measured at 1.00:1 on /contact, /about and /insights: not low contrast,
     * invisible.
     *
     * Measuring the frame instead means the bar condenses exactly when it needs a surface, whatever
     * height that page's opening happens to be. The fallback is the old behaviour, for any page
     * that has no opening section at all.
     */
    const threshold = () => {
      // Two queries, not one selector list: a list returns the first match in DOCUMENT order, and
      // the outer <section> is an ancestor of the marked block, so it always won and the marking
      // was silently ignored.
      const frame =
        document.querySelector<HTMLElement>("[data-frame]") ??
        document.querySelector<HTMLElement>("main > section, .banner");
      const barH = el.offsetHeight || 84;
      if (!frame || !frame.offsetHeight) return window.innerHeight * 0.62;
      return Math.max(0, frame.offsetHeight - barH);
    };

    /**
     * Copy the opening frame's own description onto the bar.
     *
     * A flat colour panel needs no surface behind the nav: it is already even, so the travelling
     * scrim that protects type over a photograph is just a dirty gradient across it. What it does
     * need is the right ink — three of the seven stage colours are pale enough that white type
     * falls to 1.51:1 on them — so the bar takes the panel's own tone while it is over it.
     *
     * This is a static per-page fact, read once, not the scroll-driven colour swapping that used
     * to live here. Nothing changes it mid-scroll; the moment the bar leaves the frame it
     * condenses and the glass plate takes over, as on every other page.
     */
    const adoptFrame = () => {
      // Two queries, not one selector list: a list returns the first match in DOCUMENT order, and
      // the outer <section> is an ancestor of the marked block, so it always won and the marking
      // was silently ignored.
      const frame =
        document.querySelector<HTMLElement>("[data-frame]") ??
        document.querySelector<HTMLElement>("main > section, .banner");
      const flat = frame?.dataset.frame === "flat";
      el.setAttribute("data-frame", flat ? "flat" : "media");
      el.setAttribute("data-frame-tone", flat ? frame?.dataset.frameTone || "dark" : "dark");
    };
    adoptFrame();

    const sync = () => {
      const y = window.scrollY;
      const past = y > threshold();
      if (past !== condensed) {
        condensed = past;
        el.setAttribute("data-condensed", past ? "true" : "false");
      }
      // a small threshold so a trackpad's jitter cannot flicker the bar
      const delta = y - last;
      if (Math.abs(delta) > 6) {
        const away = delta > 0 && past;
        if (away !== hidden) {
          hidden = away;
          el.setAttribute("data-hidden", away ? "true" : "false");
        }
        last = y;
      }
      if (y <= 0) {
        last = 0;
        if (hidden) { hidden = false; el.setAttribute("data-hidden", "false"); }
      }
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  // Publish the measured height so sections can offset against it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const set = () => document.documentElement.style.setProperty("--header-height", `${el.offsetHeight}px`);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  return (
    <header
      ref={headerRef}
      className="header-main fixed inset-x-0 top-0 z-[999] py-[12px] text-body [color:var(--text-color)] lg:py-[16px]"
    >
      <div className="flex w-full max-w-full items-center justify-between gap-x-[24px] px-[20px] lg:px-[40px]">
        <a href={HEADER.logoHref} className="header__logo relative block shrink-0">
          <span className="sr-hidden">{HEADER.logoLabel}</span>
          <Logo className="h-[30px] lg:h-[40px]" />
        </a>

        <div className="flex items-center gap-x-[10px] lg:gap-x-[24px]">
          <DesktopNav />

          {/* Not outline-auto: that variant picks its branch from body[data-text], so over a white
              section it would render ink on the charcoal glass plate. The bar is always dark, so
              the button is always the on-dark treatment. */}
          <div className="hidden lg:block">
            <ButtonLink variant="outline-light" href={HEADER.cta.href}>
              {HEADER.cta.label}
            </ButtonLink>
          </div>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="hamburger group relative -mr-[6px] flex h-[44px] w-[44px] cursor-pointer items-center justify-center lg:hidden"
          >
            <span className="sr-hidden">{HEADER.menuLabel}</span>
            <HamburgerIcon className="block h-[16px] w-[22px] [&_rect]:fill-current [&_rect]:origin-center [&_rect]:transition-transform [&_rect]:duration-300 [&_rect]:ease-in-out [&_.hamburger\\_\\_top]:group-hover:translate-y-[4px] [&_.hamburger\\_\\_bottom]:group-hover:-translate-y-[4px]" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
