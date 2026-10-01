"use client";

import type { CSSProperties, ReactNode } from "react";
import { ArrowIcon } from "../shared/icons";
import { CLIENTELE, CLIENT_LOGOS } from "./data";

/**
 * The client wall.
 *
 * The marks come out of the brochure with the designer's own alpha channels, so they are shown in
 * full brand colour — which is how anyone who recognises them expects to see them. Colour needs a
 * light ground, so this band goes light between two dark panels.
 *
 * Desktop lays them in a connected honeycomb; below 992px it falls back to a ruled lattice,
 * because a honeycomb cannot collapse. At phone width you can fit two cells across, and two cells
 * across is not a honeycomb, it is a column of hexagons.
 *
 * On the arithmetic: 19 is prime, which defeats a ring arrangement — a two-ring flower is exactly
 * 19 cells, so a centre call to action would cost a client. Rows of 7-6-7 come to 20: nineteen
 * marks and the invitation, nothing dropped and no blank cells. The invitation closes the bottom
 * row rather than sitting in the middle, because an offset comb has no cell on the centreline of
 * a six-cell row, and because last is where the eye finishes.
 *
 * REBUILT for rendering cost. Two things changed and both are measured, not preferences:
 *   - the cells carry no `filter` (see .hexcell in globals.css). Blurring twenty clipped alpha
 *     masks per frame was the expensive thing on this page; the depth is a clipped gradient now.
 *   - the section no longer forces itself to `min-h-screen`. It was holding a full viewport open
 *     and centring the comb inside it, which cost a screen of empty white above and below on
 *     every desktop. It now takes the height its content needs.
 */

/**
 * Pointy-top: the flat sides are left and right, which is what lets rows interlock.
 *
 * Three nested hexagons per cell — cast, rim, face. The outer scale draws the comb's rule, the
 * inner one the white surface, and the cast sits a few pixels lower so only its foot shows.
 */
const HEX_CAST: CSSProperties = {
  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  transform: "translateY(7px) scale(0.955)",
};
const HEX: CSSProperties = {
  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  transform: "scale(0.955)",
};
/** The face, inset inside HEX so the rim survives around it as the cell's bevelled edge. */
const HEX_FACE: CSSProperties = { ...HEX, transform: "scale(0.965)" };

/** [first logo index, logo count] per row: 7 + 6 + 6 marks, plus the invitation closing the
 *  bottom row, which brings the comb to 7 - 6 - 7. */
const ROWS: [number, number][] = [
  [0, 7],
  [7, 6],
  [13, 6],
];

/** One cell: the shared shell, so the logo cells and the invitation cannot drift apart. */
function Cell({ children, cta = false }: { children: ReactNode; cta?: boolean }) {
  return (
    <>
      <span aria-hidden="true" style={HEX_CAST} className="hexcell__cast" />
      <span style={HEX} className={`flex h-full w-full items-center justify-center ${cta ? "hexcell__rim--cta" : "hexcell__rim"}`}>
        <span
          style={HEX_FACE}
          className={
            "flex h-full w-full items-center justify-center " +
            (cta
              ? "hexcell__face--cta flex-col gap-y-[8px] px-[12px] text-center text-[12px] font-medium uppercase leading-[1.35] tracking-[0.12em] text-white"
              : "hexcell__face px-[10px]")
          }
        >
          {children}
        </span>
      </span>
    </>
  );
}

function Mark({ logo }: { logo: (typeof CLIENT_LOGOS)[number] }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- optically sized brand mark
    <img
      src={logo.image}
      alt={logo.name}
      // Eager at low priority: nineteen small WebP marks. Lazy-loading fired them as one burst the
      // moment the section came into view, which decoded on top of the section's own paint.
      loading="eager"
      fetchPriority="low"
      decoding="async"
      // Each mark keeps its own optical height, capped to the rectangle that fits inside a
      // pointy-top hex — full width is only available across the middle half of the cell.
      style={{ maxHeight: `min(${logo.height}px, 46%)` }}
      className="block h-auto w-auto max-w-[84%] object-contain"
    />
  );
}

function Honeycomb() {
  const cell = "hexcell relative flex h-[var(--hex-h)] w-[var(--hex-w)] shrink-0 items-center justify-center";
  return (
    <div className="hidden lg:block" data-animate="step-up" data-animate-start="top 84%">
      {ROWS.map(([start, count], row) => {
        const last = row === ROWS.length - 1;
        return (
          <div
            key={row}
            // Rows overlap by a quarter of a cell's height, which is what interlocks them.
            className="flex justify-center [&:not(:first-child)]:mt-[calc(var(--hex-h)*-0.25)]"
          >
            {Array.from({ length: last ? count + 1 : count }).map((_, i) => {
              if (last && i === count) {
                return (
                  <a key="cta" href={CLIENTELE.cta.href} className={`${cell} group`}>
                    <Cell cta>
                      {CLIENTELE.cta.label}
                      <ArrowIcon className="block h-[11px] w-[11px] shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-[3px]" />
                    </Cell>
                  </a>
                );
              }
              const logo = CLIENT_LOGOS[start + i];
              return (
                <span key={logo.name} className={cell}>
                  <Cell>
                    <Mark logo={logo} />
                  </Cell>
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/** Below 992px, where a comb cannot go. */
function Lattice() {
  return (
    <div className="grid grid-cols-2 gap-px border border-[#242a2e]/12 bg-[#242a2e]/12 sm:grid-cols-3 lg:hidden">
      {CLIENT_LOGOS.map((c) => (
        <div key={c.name} className="hexcell__face flex h-[104px] items-center justify-center px-[16px]">
          {/* eslint-disable-next-line @next/next/no-img-element -- optically sized brand mark */}
          <img
            src={c.image}
            alt={c.name}
            loading="eager"
            fetchPriority="low"
            decoding="async"
            style={{ "--logo-h": `${c.height}px` } as CSSProperties}
            className="block h-auto max-h-[calc(var(--logo-h)*0.78)] w-auto max-w-full object-contain"
          />
        </div>
      ))}
      <a
        href={CLIENTELE.cta.href}
        className="flex h-[104px] flex-col items-center justify-center gap-y-[8px] bg-[#242a2e] px-[12px] text-center text-[12px] font-medium uppercase leading-[1.35] tracking-[0.12em] text-white"
      >
        {CLIENTELE.cta.label}
        <ArrowIcon className="block h-[11px] w-[11px] shrink-0" />
      </a>
    </div>
  );
}

export function Clientele() {
  return (
    <div
      id="clients"
      // It paints its own ground. The page tints the BODY as sections pass and the flip fires at
      // the viewport centre, which works only for type that takes its colour from the body too.
      // This section hard-codes ink and follows the dark Capability panel, so the heading would
      // otherwise arrive over a body still charcoal — 1.12:1 across 240px of scroll, measured.
      // Painting here keeps ground and type in step, and the body flip moves to the top edge.
      className="section section--testimonials bg-white py-section text-[#242a2e]"
      data-background="ebb"
      data-background-start="top"
      data-background-end="top"
      // One cell width drives the whole comb: seven across has to fit inside the container.
      style={{ "--hex-w": "min(178px, calc((100vw - 190px) / 7))", "--hex-h": "calc(var(--hex-w) * 1.1547)" } as CSSProperties}
    >
      <div className="container-page">
        <h2
          className="mb-[36px] text-h1 lg:mb-[48px]"
          data-animate-title
          aria-label={`${CLIENTELE.title.display} ${CLIENTELE.title.rest}`}
        >
          <span className="type-serif">{CLIENTELE.title.display}</span> {CLIENTELE.title.rest}
        </h2>

        <Honeycomb />
        <Lattice />
      </div>
    </div>
  );
}
