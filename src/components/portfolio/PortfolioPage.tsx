"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { SmoothScroll } from "../shared/SmoothScroll";
import { initAnimate } from "../shared/animate";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../shared/gsap";
import { Header } from "../home/Header";
import { Footer } from "../home/Footer";
import { Media } from "../shared/Media";
import { ParallaxMedia } from "../shared/ParallaxMedia";
// DRAFT_PENDING still lives in ./data. The on-page notice it used to render was removed at the
// client's request; the flag remains so the notice can be brought back if an entry is questioned.
import { PORTFOLIO_INTRO, PROJECTS, SECTORS, type Project, type Sector } from "./data";

/**
 * Portfolio — the archive page.
 *
 * Built from layout patterns rather than from anyone's stylesheet: a full-bleed opening frame, a
 * filter rail, and a twelve-column grid whose cards take different spans so the rows vary instead
 * of marching in equal thirds. Rows sit on a shared baseline, which is what stops a mixed-span grid
 * reading as an accident.
 *
 * Everything that carries the brand is this site's own — bone/ink/bronze, Inter and Schibsted
 * Grotesk, the same angled corner the Insights cards use, the same reveal timing as every other
 * section. A visitor arriving from the home page should not feel they have changed websites.
 */

const MARK = "/manovruti/brand/mark-dark.png";
const HERO = "/manovruti/photos/hero-construction.jpg";

/** The angled corner already used on the Insights cards, so the two pages share a device. */
const CLIP: CSSProperties = { clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)" };

function Frame({ p }: { p: Project }) {
  return (
    <span style={CLIP} className="relative block aspect-[16/10] w-full overflow-hidden bg-[#242a2e]/[0.07]">
      {p.image ? (
        <Media src={p.image} alt="" sizes="(min-width: 992px) 50vw, 100vw" />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-[0.10]">
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative watermark, fixed height */}
          <img src={MARK} alt="" className="h-[58px] w-auto" />
        </span>
      )}
    </span>
  );
}

/** Card face stays quiet: what it is and where. Scope lines belong in the detail view, where
 *  someone has chosen to read them, rather than shouted on the index. */
function Card({ p }: { p: Project }) {
  return (
    <article className="group block" data-animate="step-up" data-animate-start="top 90%">
      <Frame p={p} />
      <h2 className="mt-[18px] text-h3 font-medium">{p.client}</h2>
      <p className="mt-[4px] text-sm opacity-60">{p.location}</p>
    </article>
  );
}

type Span = 6 | 4 | 3;

const SPAN: Record<Span, string> = {
  6: "lg:col-span-6",
  4: "lg:col-span-4",
  3: "lg:col-span-3",
};

/**
 * The row shapes. All sum to twelve; the grid alternates trio, pair, trio, pair.
 *
 * TRIO is the feature row — one half-measure card with two quarter-measure ones beside it, which
 * is the pairing the row drift is built around. It faces alternate ways each time it appears: wide
 * card on the left, then on the right, then left again. Three identical trios stacked down the page
 * put every wide card in the same column and read as a template; swapping the side turns the same
 * shape into a rhythm, and the drift reads better for it because the pair of short cards changes
 * corner. PAIR is two equal halves and never drifts, since its cards are already the same height.
 */
const TRIO: readonly Span[] = [6, 3, 3];
const TRIO_MIRRORED: readonly Span[] = [3, 3, 6];
const PAIR: readonly Span[] = [6, 6];

/**
 * Column spans for `count` cards, derived from position rather than authored per project.
 *
 * Two things were wrong before. The spans lived in the data, so they only tiled for the full
 * nineteen — filter to a sector and the survivors summed to ten, or nine, and every row ended
 * short. And the rhythm cycled four different shapes, so the sequence never repeated closely
 * enough to be read as one: three unlike three-card rows with a pair turning up at irregular
 * intervals is not a pattern, it is an absence of one.
 *
 * So: trio, pair, trio, pair. A reader learns it at the second row and every row still sums to
 * twelve for every filter.
 *
 * Where it cannot hold. The unit is five cards and the archive is nineteen, so the alternation
 * runs three full times and leaves four over. Four cannot be a trio without stranding a single
 * card on a row of its own, which looks like a loading failure rather than a decision, so the
 * tail falls back to pairs: nineteen lays out 3-2-3-2-3-2-2-2. The alternation is intact for the
 * first six rows and the repetition at the end is the least conspicuous place to put the seam.
 * A twentieth project would make it exact.
 */
function layoutSpans(count: number): Span[] {
  const spans: Span[] = [];
  let wantTrio = true;
  let mirrored = false;
  while (spans.length < count) {
    const left = count - spans.length;
    if (left === 1) { spans.push(6); break; }
    if (left === 2) { spans.push(...PAIR); break; }

    let trio: boolean;
    if (left === 3) {
      trio = true;
    } else {
      trio = wantTrio;
      // never leave a single card stranded on a row of its own
      if (left - (trio ? TRIO.length : PAIR.length) === 1) trio = !trio;
    }

    if (trio) {
      spans.push(...(mirrored ? TRIO_MIRRORED : TRIO));
      mirrored = !mirrored;
    } else {
      spans.push(...PAIR);
    }
    wantTrio = !trio;
  }
  return spans;
}

export function PortfolioPage() {
  const [active, setActive] = useState<Sector | "All">("All");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = initAnimate(document);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); cleanup(); };
  }, []);

  const shown = useMemo(
    () => (active === "All" ? PROJECTS : PROJECTS.filter((p) => p.sector === active)),
    [active],
  );

  const spans = useMemo(() => layoutSpans(shown.length), [shown.length]);

  useEffect(() => { ScrollTrigger.refresh(); }, [shown.length]);

  /**
   * The row drift.
   *
   * A row mixes a wide card with narrow ones, and every frame is 16:10, so a half-width card is
   * about twice the height of a quarter-width one. The cards start with their tops on the row's
   * top edge and, as the row crosses the viewport, the short ones slide down until every card in
   * the row ends on the same bottom edge.
   *
   * The travel is measured, not a parallax speed: each card moves by exactly the difference
   * between its own height and the tallest card's, so the landing is the shared baseline rather
   * than wherever a speed multiplier happened to leave it. It is recomputed on refresh, because
   * the heights depend on the column width and on whether a caption wrapped to two lines.
   */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const mm = gsap.matchMedia();
    // 62rem is where the twelve-column grid starts; below it the cards are one or two per row and
    // already share an edge, so there is nothing to drift.
    mm.add("(min-width: 62rem)", () => {
      if (prefersReducedMotion()) return;
      // Grid items in the same row share an offsetTop once the grid is top-aligned. offsetTop and
      // offsetHeight are layout values, so neither the drift transform nor the smoother's own
      // transform on #smooth-content perturbs the measurement.
      const rows = new Map<number, HTMLElement[]>();
      for (const el of Array.from(grid.children) as HTMLElement[]) {
        const key = Math.round(el.offsetTop);
        const row = rows.get(key);
        if (row) row.push(el);
        else rows.set(key, [el]);
      }

      // An element's position in document coordinates. offsetTop is a layout value, so this is
      // unaffected both by a card's own drift transform and by the translate ScrollSmoother keeps
      // on #smooth-content — which getBoundingClientRect would fold in.
      const documentTop = (el: HTMLElement) => {
        let y = 0;
        let n: HTMLElement | null = el;
        while (n) {
          y += n.offsetTop;
          n = n.offsetParent as HTMLElement | null;
        }
        return y;
      };

      const tweens: gsap.core.Tween[] = [];
      for (const row of rows.values()) {
        if (row.length < 2) continue;
        const tallest = row.reduce((a, b) => (b.offsetHeight > a.offsetHeight ? b : a));
        // The tallest card is the row's box, so the range is measured against it. Scroll positions
        // rather than "top bottom"-style edges, because the range has to be clamped:
        //
        //   start — the row's bottom reaching the foot of the viewport, i.e. the row fully in view,
        //           but never earlier than scroll 0. The first row is already on screen when the
        //           page loads, so an entry-based start had it a sixth of the way through the drift
        //           before the reader had scrolled at all: its cards sat 33px below the wide one's
        //           top instead of level with it. Clamping to 0 means every row, including that
        //           one, is level with its neighbours until the reader moves.
        //   end   — the row's bottom reaching the middle of the viewport. It finishes while the row
        //           is still on screen, so the landing is something you see rather than something
        //           that has already happened by the time the row arrives.
        const rowBottom = () => documentTop(tallest) + tallest.offsetHeight;
        const startAt = () => Math.max(0, rowBottom() - window.innerHeight);
        const endAt = () => Math.max(startAt() + 120, rowBottom() - window.innerHeight / 2);

        for (const el of row) {
          if (el === tallest || tallest.offsetHeight - el.offsetHeight < 8) continue;
          tweens.push(
            gsap.fromTo(
              el,
              { y: 0 },
              {
                y: () => tallest.offsetHeight - el.offsetHeight,
                ease: "none",
                scrollTrigger: {
                  trigger: tallest,
                  start: startAt,
                  end: endAt,
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              },
            ),
          );
        }
      }
      return () => {
        for (const t of tweens) {
          t.scrollTrigger?.kill();
          t.kill();
        }
      };
    });
    return () => mm.revert();
  }, [shown]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of PROJECTS) m.set(p.sector, (m.get(p.sector) ?? 0) + 1);
    return m;
  }, []);

  return (
    <>
      <a href="#main" className="skip-to-link sr-hidden focus:not-sr-only">Skip to content</a>
      <Header />
      <SmoothScroll>
        <main id="main" className="main-wrapper bg-white text-[#242a2e]" data-background="ebb">
          {/* ---------- opening frame ---------- */}
          <section className="relative h-[clamp(420px,62svh,640px)] w-full overflow-hidden bg-[#1b2126]">
            <ParallaxMedia src={HERO} alt="Industrial structure under construction" priority />
            {/* Two scrims: one for the fixed bar, one for the type at the foot. They overlap by
                design — sized to meet at 240px and 38% they left an undarkened band across the
                middle of the picture that read as a bright stripe. 54% and 72% overlap instead. */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[54%] bg-[linear-gradient(180deg,rgba(12,15,17,0.68)_0%,rgba(12,15,17,0.46)_38%,rgba(12,15,17,0.2)_72%,rgba(12,15,17,0)_100%)]" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(180deg,rgba(12,15,17,0)_0%,rgba(12,15,17,0.28)_30%,rgba(12,15,17,0.62)_62%,rgba(12,15,17,0.84)_100%)]" />
            <div className="container-page relative flex h-full flex-col justify-end pb-[clamp(36px,5vw,64px)]">
              <p className="text-label uppercase text-white/70">{PORTFOLIO_INTRO.eyebrow}</p>
              <h1 className="mt-[14px] text-display text-white" data-animate-title>
                {PORTFOLIO_INTRO.title}
              </h1>
            </div>
          </section>

          {/* ---------- filter rail ---------- */}
          <section className="container-page pt-section">
            {/* flex-wrap with flex-none children. Shrink-to-fit inline-blocks laid out at 32px each
                while their labels measured 114, so every label painted across its neighbour;
                flex-none (flex: 0 0 auto) sizes each button to its content and refuses to shrink. */}
            {/* The rule lives on the wrapper, not the scroller, so it stays put while the buttons
                travel under it. */}
            <div className="border-b border-current/12">
              {/* One line that scrolls sideways below 992px, rather than wrapping. Seven sector
                  names wrapped to five lines on a phone, which pushed the first project most of a
                  screen below the fold — the filters took more room than the work. A single row
                  that runs off the right edge also says "there is more here" in a way a wrapped
                  block cannot. Above 992px they all fit, so it goes back to ordinary flow.
                  overflow-x makes overflow-y compute to auto, so the active indicator sits at
                  bottom-0 rather than hanging a pixel below the box where it would be clipped. */}
              <div className="scrollbar-none flex items-center gap-x-[28px] overflow-x-auto overscroll-x-contain lg:flex-wrap lg:overflow-x-visible">
              {(["All", ...SECTORS] as const).map((s) => {
                const on = active === s;
                const n = s === "All" ? PROJECTS.length : counts.get(s) ?? 0;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setActive(s)}
                    aria-pressed={on}
                    // vertical-align is ignored on flex items, so a <sup> in a flex row rendered as
                    // an ordinary block above the label instead of raised beside it. Hence inline flow.
                    //
                    // flex-none keeps each button at its content width. Note the <sup> still works
                    // here because the label sits in its own inline <span> child, not as a direct
                    // flex item.
                    className={
                      "relative flex-none whitespace-nowrap py-[13px] text-sm leading-[1.4] transition-opacity duration-200 " +
                      (on ? "opacity-100" : "opacity-55 hover:opacity-100")
                    }
                  >
                    <span>
                      {s}
                      <sup className="ml-[4px] text-[0.68em] tabular-nums font-normal opacity-60 top-[-0.5em]">{n}</sup>
                    </span>
                    <span
                      aria-hidden="true"
                      className={
                        "absolute inset-x-0 bottom-0 h-[2px] origin-left bg-current transition-transform duration-300 " +
                        (on ? "scale-x-100" : "scale-x-0")
                      }
                    />
                  </button>
                );
              })}
              </div>
            </div>
          </section>

          {/* ---------- grid ---------- */}
          <section className="container-page pb-section pt-block">
            {/* Twelve columns, cards taking 6 / 4 / 3 of them. The row ends on a shared baseline so
                the captions line up even when the frames above them differ in height — without that
                a mixed-span grid just looks broken. At twelve columns that baseline is arrived at
                rather than set: the cards start top-aligned and the short ones drift down onto it
                as the row scrolls. See the row drift effect above; anyone who has asked for less
                motion gets the baseline immediately instead. */}
            <div
              ref={gridRef}
              className="portfolio-grid grid grid-cols-1 items-end gap-x-[clamp(16px,2vw,28px)] gap-y-[clamp(44px,5vw,76px)] sm:grid-cols-2 lg:grid-cols-12 lg:items-start"
            >
              {shown.map((p, i) => (
                <div key={p.id} className={"sm:col-span-1 " + SPAN[spans[i]]}>
                  <Card p={p} />
                </div>
              ))}
            </div>

            {shown.length === 0 ? (
              <p className="py-[80px] text-center text-lead opacity-60">No projects in this sector yet.</p>
            ) : null}

            <p className="mt-section text-label uppercase opacity-45">{PORTFOLIO_INTRO.note}</p>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
