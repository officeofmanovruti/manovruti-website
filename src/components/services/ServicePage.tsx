"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { SmoothScroll } from "../shared/SmoothScroll";
import { initAnimate } from "../shared/animate";
import { ScrollTrigger } from "../shared/gsap";
import { Header } from "../home/Header";
import { Footer } from "../home/Footer";
import { Media } from "../shared/Media";
import { ButtonLink } from "../shared/Button";
import { ArrowIcon, ChevronIcon } from "../shared/icons";
import { SERVICE_STAGES } from "../home/data";
import { SERVICES_INDEX, SERVICE_COPY, STAGE_WORK } from "./data";
import { PROJECTS } from "../portfolio/data";

/**
 * A single service stage.
 *
 * Built from the reference's market-page spec, measured rather than copied: a full-height coloured
 * header carrying the title, a scrimmed image beneath it inside the same block, a two-column lead
 * statement, then an alternating run of work frames. Its own design throughout — our type scale,
 * our angled corner, our reveal timing.
 *
 * The one idea worth naming: the header takes the stage's OWN panel colour, the same one its card
 * carries on the home page. Seven pages that were all charcoal would be seven pages; coloured by
 * stage, arriving on one feels like having opened the card you clicked.
 *
 * The work frames are placeholders. We have no photography tied to a particular stage, and a stock
 * picture standing in for "this is our site supervision" would be a claim about work we cannot
 * show. They are spaces held open, and the note beside them says so.
 */

const CLIP: CSSProperties = { clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)" };
const MARK_DARK = "/manovruti/brand/mark-dark.png";

/**
 * A project frame.
 *
 * Shows a real project on which this stage was part of the scope — see STAGE_WORK. The caption
 * names the client and the job, because a photograph under a heading about delivered work has to
 * say whose work it is. If an id ever fails to resolve the frame falls back to the held-open
 * watermark rather than rendering a broken image.
 */
function Frame({ id, tall = false }: { id?: string; tall?: boolean }) {
  const project = id ? PROJECTS.find((p) => p.id === id) : undefined;
  return (
    <figure className="block">
      <span
        style={CLIP}
        className={"relative block w-full overflow-hidden bg-[#242a2e]/[0.07] " + (tall ? "aspect-[16/10]" : "aspect-[4/3]")}
      >
        {project?.image ? (
          <Media
            src={project.image}
            alt=""
            sizes={tall ? "(min-width: 992px) 100vw, 100vw" : "(min-width: 640px) 33vw, 100vw"}
          />
        ) : (
          <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-[0.10]">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative watermark, fixed height */}
            <img src={MARK_DARK} alt="" className={tall ? "h-[68px] w-auto" : "h-[46px] w-auto"} />
          </span>
        )}
      </span>
      {project ? (
        <figcaption className="mt-[12px]">
          <span className="block text-sm font-medium">{project.client}</span>
          <span className="mt-[2px] block text-sm opacity-70">{project.title}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * The stage switcher.
 *
 * A segmented track: one stage at a time carries its name, the rest are colour chips. Measured off
 * the reference's market control — translucent dark track at 6px radius, 21px chips, 4px rounding
 * on the outer edges.
 *
 * THE TRACK IS A FIXED WIDTH and the chips redistribute inside it. Sizing each chip to its own
 * label made the track grow and shrink as the open chip changed — 300px to 323px and back, with
 * every chip after it sliding sideways, so the thing you were reaching for moved out from under
 * the pointer. Nothing outside the chip you are on moves now.
 *
 * Inside that fixed width, the open chip takes exactly what its label needs and the six closed
 * ones share what is left equally. A flat share would leave "Project Execution" rattling around in
 * the same 232px box as "Testing, Handover & Certification"; instead a short name gives its space
 * back and the colour chips grow. The widths are measured from the rendered labels once and on
 * resize, then written in pixels, which is also what lets the change animate: a width transition
 * needs both ends in pixels, and `auto` is not one.
 *
 * Only ever ONE chip is open. Hovering closes whichever was open, including the current stage;
 * leaving the track returns it to the current stage.
 *
 * Hidden below 640px. At phone width the track and its label take a third of the header for a
 * control the prev/next pair at the foot of the page already covers.
 */
const CLOSED_MIN = 20;

function StageSwitcher({ slug, tone }: { slug: string; tone: "light" | "dark" }) {
  const activeIndex = SERVICE_STAGES.findIndex((s) => s.slug === slug);
  const [hovered, setHovered] = useState<number | null>(null);
  const open = hovered ?? activeIndex;

  const listRef = useRef<HTMLUListElement>(null);
  /** Natural width of each label including its own padding, and the track's usable inside. */
  const [labels, setLabels] = useState<number[]>([]);
  const [inner, setInner] = useState(0);

  useLayoutEffect(() => {
    const ul = listRef.current;
    if (!ul) return;
    const measure = () => {
      const spans = Array.from(ul.querySelectorAll<HTMLElement>("[data-chip-label]"));
      setLabels(spans.map((el) => Math.ceil(el.scrollWidth)));
      const cs = getComputedStyle(ul);
      setInner(ul.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight));
    };
    measure();
    // The track changes width at lg, and the labels settle once the display face has loaded.
    const ro = new ResizeObserver(measure);
    ro.observe(ul);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => ro.disconnect();
  }, []);

  const ready = inner > 0 && labels.length === SERVICE_STAGES.length;
  const openWidth = ready
    ? Math.min(labels[open] ?? 0, inner - CLOSED_MIN * (SERVICE_STAGES.length - 1))
    : 0;
  const closedWidth = ready ? (inner - openWidth) / (SERVICE_STAGES.length - 1) : 0;

  return (
    <div className="hidden items-center gap-x-[16px] sm:flex">
      <span className={"whitespace-nowrap text-label uppercase " + (tone === "light" ? "text-[#242a2e]" : "text-white")}>
        Shift to another stage
      </span>
      <ul
        ref={listRef}
        className="flex w-[320px] items-center rounded-[6px] bg-[rgba(14,14,14,0.6)] p-[4px] lg:w-[360px]"
        onMouseLeave={() => setHovered(null)}
      >
        {SERVICE_STAGES.map((st, i) => (
          <li
            key={st.slug}
            className="h-[21px] shrink-0 overflow-hidden transition-[width] duration-500 ease-out first:rounded-l-[4px] last:rounded-r-[4px]"
            style={{
              backgroundColor: st.panel,
              // Before measurement, fall back to flex so the first paint is not seven zero-width
              // chips: the open one grows, the rest sit at the minimum.
              ...(ready
                ? { width: `${i === open ? openWidth : closedWidth}px` }
                : { flexBasis: `${CLOSED_MIN}px`, flexGrow: i === open ? 1 : 0 }),
            } as CSSProperties}
          >
            <a
              href={st.href}
              aria-current={st.slug === slug ? "page" : undefined}
              aria-label={st.title}
              // Pointer, not mouse: a tap emits an emulated mouseenter, which would open the chip
              // the finger is already on and make the first tap do nothing visible.
              onPointerEnter={(e) => { if (e.pointerType === "mouse") setHovered(i); }}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className="flex h-full w-full items-center justify-center"
              style={{ color: st.panelTone === "light" ? "#242a2e" : "#ffffff" } as CSSProperties}
            >
              <span
                data-chip-label
                className={
                  "block whitespace-nowrap px-[12px] text-center text-[11px] font-medium leading-none transition-opacity duration-300 ease-out " +
                  (open === i ? "opacity-100 delay-150" : "opacity-0")
                }
              >
                {st.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicePage({ slug }: { slug: string }) {
  const index = SERVICE_STAGES.findIndex((s) => s.slug === slug);
  const stage = SERVICE_STAGES[index];
  const copy = SERVICE_COPY[slug];
  /** Projects whose own scope names this stage. Empty array keeps the held-open frames. */
  const work = STAGE_WORK[slug] ?? [];
  const prev = SERVICE_STAGES[index - 1];
  const next = SERVICE_STAGES[index + 1];
  const onLight = stage.panelTone === "light";
  const headInk = onLight ? "#242a2e" : "#ffffff";

  useEffect(() => {
    const cleanup = initAnimate(document);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); cleanup(); };
  }, []);

  return (
    <>
      <a href="#main" className="skip-to-link">Skip to content</a>
      <Header />
      <SmoothScroll>
        <main id="main" className="main-wrapper bg-white text-[#242a2e]" data-background="ebb">
          {/* ---------- coloured header ----------
              The switcher sits at the top of the block, where the reference's own top bar carries
              it, and the title sits at the FOOT of the colour with the stage's checkpoints in two
              columns beside it and a scroll cue on the right.

              The reference also splits a caption row across the middle. Ours carried the stage
              number and the phase there and it has been removed at the owner's request: the number
              is already in the switcher's position in the track, and the phase repeats what the
              title and the checkpoints below it say. The colour now runs clean from the switcher
              to the title. */}
          <section
            className="relative w-full"
            style={{ backgroundColor: stage.panel, color: headInk } as CSSProperties}
          >
            {/* The frame the bar reads is this coloured block, NOT the section — the section also
                contains the photograph below, and marking the whole thing flat left the bar in ink
                when it reached the picture: measured 2.54:1 at 600px of scroll. Measuring the
                colour alone means the bar condenses exactly as it leaves it. */}
            <div
              data-frame="flat"
              data-frame-tone={stage.panelTone}
              className="container-page flex min-h-[clamp(420px,62svh,660px)] flex-col pb-[clamp(28px,4vw,52px)] pt-[calc(var(--header-height,84px)+clamp(20px,3vw,34px))]"
            >
              <div className="flex justify-start sm:justify-end">
                <StageSwitcher slug={slug} tone={stage.panelTone} />
              </div>


              {/* Title row: name, checkpoints, scroll cue — pushed to the foot of the colour. */}
              {/* Title and scroll cue only. The stage's checkpoints used to sit beside the title
                  here, which cost the headline half the measure and wrapped every name onto two
                  lines. They have their own section in the body now, where there is room to set
                  them properly. With the width back, all seven titles set on one line from 1280
                  up. Held at 992 the two longest ran past the container — the measure there is
                  880px and "Testing, Handover & Certification" needs more at 65px — so the nowrap
                  starts at xl and the title wraps naturally below it. */}
              <div className="mt-auto flex items-end justify-between gap-x-[48px] pt-[clamp(40px,7vw,96px)]">
                <h1 className="text-display xl:whitespace-nowrap" data-animate-title>{stage.title}</h1>

                {/* The reference's circular scroll cue. It is a real control: it takes you to the
                    first block of copy through the smoother, like any other in-page anchor. */}
                <a
                  href="#stage-lead"
                  aria-label="Scroll to the detail"
                  className="hidden h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full border border-current/45 transition-colors duration-300 hover:border-current lg:flex"
                >
                  {/* One stroke: stem down, then the two wings drawn from the tip. Written as a
                      single continuous path so the join at the tip is a real corner rather than
                      three separate strokes meeting — the previous version drew the head as its own
                      subpath and it read as a detached chevron floating under a short line. */}
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-[22px] w-[22px]">
                    <path
                      d="M12 3.5V20.5M4.75 13.25 12 20.5l7.25-7.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* 70svh, which is what the reference holds at every viewport it was measured at:
                630/900, 840/1200, 560/800, 591/844 — a flat 70vh each time, not a clamp. The floor
                and ceiling here are only to stop it collapsing on a short laptop or running away
                on a very tall monitor; the ceiling is 900 so a 1200px-tall viewport still gets its
                full 70svh (840px) rather than being cut to 65. Ours was 44svh, which is why it read as a band rather than as a
                frame. */}
            <div className="relative h-[clamp(320px,70svh,900px)] w-full overflow-hidden">
              {/* The picture drifts against its own frame as the page scrolls. Measured off the
                  reference: its image is 725px inside a 630px box and gains 72px on the wrapper
                  over 1200px of scroll — about 1.06x the page's own rate, which is exactly what
                  data-speed takes. The box is 116% tall and offset by 8% so the travel happens
                  inside the crop and no edge is ever exposed.
                  ScrollSmoother only runs effects at 992px and up; below that the box simply sits
                  where it is, which costs an 8% crop and nothing else. */}
              <div className="absolute inset-x-0 -top-[8%] h-[116%]" data-speed="1.06">
                <Media src={stage.image} alt={stage.imageAlt} sizes="100vw" priority />
              </div>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,15,17,0.42)_0%,rgba(12,15,17,0.30)_45%,rgba(12,15,17,0.44)_100%)]" />
            </div>
          </section>

          {/* ---------- lead statement ---------- */}
          <section id="stage-lead" className="container-page mb-section scroll-mt-[var(--header-height,84px)] pt-section">
            <div className="grid grid-cols-1 gap-x-[clamp(32px,6vw,110px)] gap-y-[28px] lg:grid-cols-[5fr_6fr]">
              <h2 className="text-h1" data-animate-title aria-label={`${copy.lead.main} ${copy.lead.accent}`}>
                {copy.lead.main} <span className="type-serif">{copy.lead.accent}</span>
              </h2>
              <div className="lg:pt-[8px]">
                <p className="text-lead opacity-80" data-animate="step-up">{copy.description}</p>
                <p className="mt-[28px] border-t border-current/12 pt-[18px] text-sm opacity-60" data-animate="step-up">
                  <span className="font-medium opacity-100">You end up with — </span>{copy.deliverable}
                </p>
              </div>
            </div>
          </section>

          {/* ---------- what the stage covers ----------
              The ruled-and-chevroned list the reference uses for its sub-sectors, brought down out
              of the header and given the full measure: two columns, a number against each line and
              a rule under it. In the header these were 15px and squeezed into a 520px column; here
              they carry the stage's actual content at a readable size. */}
          <section className="container-page mb-section">
            <p className="text-label uppercase text-[var(--color-brand-deep)]">{SERVICES_INDEX.includes}</p>
            <ul
              className="mt-[clamp(20px,2.5vw,34px)] grid grid-cols-1 gap-x-[clamp(32px,5vw,80px)] sm:grid-cols-2"
              data-animate="batch"
            >
              {stage.points.map((pt, i) => (
                <li key={pt} data-animate-child>
                  <span className="flex items-baseline gap-x-[18px] border-b border-current/15 py-[clamp(16px,1.8vw,24px)]">
                    <span className="tabular-nums text-label opacity-40">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-h3">{pt}</span>
                    <ChevronIcon className="block h-[11px] w-[8px] shrink-0 self-center opacity-35" />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ---------- work frames ----------
              The reference alternates a three-image row with a single wide one. Same rhythm here,
              held open until there is stage photography to put in it. */}
          <section className="container-page mb-section">
            <div className="flex flex-wrap items-end justify-between gap-x-[32px] gap-y-[14px]">
              <h2 className="text-h1" aria-label={`${SERVICES_INDEX.workTitle.main} ${SERVICES_INDEX.workTitle.accent}`}>
                {SERVICES_INDEX.workTitle.main} <span className="type-serif">{SERVICES_INDEX.workTitle.accent}</span>
              </h2>
              <p className="max-w-[40ch] text-sm opacity-55">{SERVICES_INDEX.workNote}</p>
            </div>
            <div className="mt-[clamp(32px,4vw,56px)] grid grid-cols-1 gap-x-[clamp(16px,2vw,28px)] gap-y-[clamp(28px,3vw,40px)] sm:grid-cols-3" data-animate="batch">
              {work.slice(0, 3).map((id) => (
                <div key={id} data-animate-child><Frame id={id} /></div>
              ))}
            </div>
            <div className="mt-[clamp(28px,3vw,40px)]" data-animate="step-up"><Frame id={work[3]} tall /></div>
          </section>

          {/* ---------- previous / next stage ----------
              The chain reads in order, so the two neighbours are the most useful thing at the foot
              of any one of them. */}
          <section className="container-page mb-section">
            <div className="grid grid-cols-1 gap-[clamp(16px,2vw,24px)] border-t border-current/12 pt-[clamp(28px,3vw,44px)] sm:grid-cols-2">
              {[{ s: prev, label: SERVICES_INDEX.prev, align: "" }, { s: next, label: SERVICES_INDEX.next, align: "sm:text-right sm:items-end" }].map(({ s, label, align }) =>
                s ? (
                  <a key={label} href={s.href} className={"group flex flex-col " + align}>
                    <span className="text-label uppercase opacity-45">{label}</span>
                    <span className="mt-[10px] flex items-center gap-x-[12px] text-h3 group-hover:underline group-hover:decoration-[#242a2e]/25 group-hover:underline-offset-[6px]">
                      {s.title}
                      <ArrowIcon className={"block h-[12px] w-[12px] shrink-0 transition-transform duration-300 group-hover:translate-x-[3px] " + (align ? "" : "rotate-180")} />
                    </span>
                  </a>
                ) : (
                  <span key={label} aria-hidden="true" className="hidden sm:block" />
                ),
              )}
            </div>
            <div className="mt-[clamp(28px,3vw,44px)]">
              <ButtonLink variant="outline-auto" href="/#services">All seven stages</ButtonLink>
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
