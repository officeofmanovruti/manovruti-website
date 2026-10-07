"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { SmoothScroll } from "../shared/SmoothScroll";
import { initAnimate } from "../shared/animate";
import { gsap, ScrollTrigger } from "../shared/gsap";
import { Header } from "../home/Header";
import { Footer } from "../home/Footer";
import { Media } from "../shared/Media";
import { ParallaxMedia } from "../shared/ParallaxMedia";
import { ButtonLink } from "../shared/Button";
import { ArrowIcon } from "../shared/icons";
import { INSIGHTS, SERVICE_STAGES } from "../home/data";
import { ARTICLES, type Block } from "./article";

/**
 * A single article, set as an architecture practice's journal rather than as a blog post.
 *
 * The rules it follows, and why:
 *
 *  MEASURE. 66 characters is the target; the long-form range is 45-90. Below 45 the eye returns
 *  too often, above 90 it loses the line. It lives on the COLUMN, in pixels — see below.
 *
 *  ONE COLUMN, RIGHT-ALIGNED. Rail left, text right, and the text's single edge lands on the page
 *  gutter so the article keeps the same 72px margins as every other page on the site. A short
 *  brand rule above each heading carries the rhythm.
 *
 *  IMAGE-LED. A full-bleed lead frame under the title and one inset figure in the body. Every
 *  picture here is of the subject: the parcel, the paperwork. Stock architecture standing in for
 *  an idea would be decoration pretending to be evidence. The lead frame carries no caption —
 *  small type under a full-bleed photograph has no edge to sit against.
 *
 *  ONE BREAK. A single pull quote. Two is a pattern and three is wallpaper.
 *
 *  NO FURNITURE. No author card, no reading-progress bar — a hairline that fills across the top
 *  of the page reads as something loading, which is the last thing a reader needs to wonder
 *  about. The contents rail earns its place because the piece is long; nothing else does.
 */

/**
 * One measure, on the column, in pixels.
 *
 * It was `58ch` on every block, and `ch` scales with font-size — so each block resolved to a
 * DIFFERENT width and the column had three right edges: headings 978px, the lede 851, body copy
 * 659. That ragged 320px step down the right-hand side is what read as "too much gap"; the page
 * gutter was 72px, the same as everywhere else on the site.
 *
 * 700px gives about 68 characters at the body size and 56 at the lede — both inside the 45-90
 * band, with the 66 target between them. The column is right-aligned in the grid so its single
 * edge lands on the page gutter, and the space the measure does not need falls between the rail
 * and the text, where it reads as margin rather than as a hole.
 */
const MEASURE = "w-full";

/**
 * Reading size, not interface size.
 *
 * The body was `text-lead`, which renders 18px — the size the rest of the site uses for a standfirst
 * beside a heading. In a reading column that forced a choice between a narrow column (leaving a
 * 170px right margin against a 72px left one) and a line of 100 characters. Raising the body to
 * 21px resolves it: the column can now run the full width the grid gives it and still land at
 * 85-90 characters, so the right margin comes back to the page gutter.
 */
const BODY = "text-[19px] leading-[1.62] sm:text-[21px]";

/** The angled corner the index cards and the portfolio frames already use. */
const CLIP: CSSProperties = { clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)" };

function readingMinutes(blocks: Block[]): number {
  const words = blocks
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.type === "figure" ? b.caption : b.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function Figure({ src, alt, caption, bleed = false }: { src: string; alt: string; caption?: string; bleed?: boolean }) {
  return (
    <figure className={bleed ? "" : "mt-[clamp(38px,4vw,60px)]"}>
      <div className={"relative w-full overflow-hidden " + (bleed ? "aspect-[16/7]" : "aspect-[16/9]")}>
        {/* The full-bleed lead drifts like the service heroes; an inset figure sits inside the
            reading column, where a moving picture beside static text reads as a glitch. */}
        {bleed ? (
          <ParallaxMedia src={src} alt={alt} priority />
        ) : (
          <Media src={src} alt={alt} sizes="100vw" />
        )}
      </div>
      {/* The caption has to sit on the page gutter. Putting container-page and max-w on the SAME
          element made the narrower max-width win and margin-inline:auto then centred it under the
          full-bleed frame — so the wrapper carries the gutter and the measure goes inside it. */}
      {!caption ? null : bleed ? (
        <figcaption className="container-page mt-[14px] text-sm opacity-70">
          <span className="block max-w-[52ch]">{caption}</span>
        </figcaption>
      ) : (
        <figcaption className="mt-[14px] max-w-[52ch] text-sm opacity-70">{caption}</figcaption>
      )}
    </figure>
  );
}

export function ArticlePage({ slug }: { slug: string }) {
  const meta = INSIGHTS.find((a) => a.slug === slug)!;
  const article = ARTICLES[slug];
  const stage = SERVICE_STAGES.find((s) => s.slug === article.stageSlug);
  const minutes = readingMinutes(article.blocks);
  const shareUrl = absoluteUrl(`/insights/${slug}`);
  /**
   * Three, and the three that follow this one in the index, wrapping round at the end.
   *
   * It was every other article — fourteen cards in a two-column grid, seven rows of them under a
   * piece somebody had just finished reading. Three is a suggestion; fourteen is a table of
   * contents nobody asked for. Rotating from the current position means each article points
   * somewhere different, so a reader moving through the set is not shown the same three each time.
   */
  const more = useMemo(() => {
    const start = Math.max(0, INSIGHTS.findIndex((a) => a.slug === slug));
    return Array.from({ length: 3 }, (_, i) => INSIGHTS[(start + 1 + i) % INSIGHTS.length]).filter(
      (a): a is (typeof INSIGHTS)[number] => Boolean(a) && a.slug !== slug,
    );
  }, [slug]);

  const bodyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const headings = useMemo(
    () =>
      article.blocks
        .map((b, i) => (b.type === "h2" ? { id: `s${i}`, text: b.text } : null))
        .filter((x): x is { id: string; text: string } => x !== null),
    [article.blocks],
  );

  useEffect(() => {
    const cleanup = initAnimate(document);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); cleanup(); };
  }, []);

  /**
   * Hold the rail beside the article.
   *
   * `position: sticky` does NOT work here and it is worth knowing why: ScrollSmoother scrolls by
   * putting a transform on #smooth-content, and a transformed ancestor becomes the containing
   * block for its descendants, so the rail is sticking to something that never moves. Measured
   * with the CSS in place — the rail's viewport top fell straight through, 1302 to -1694, instead
   * of stopping at 112.
   *
   * ScrollTrigger's own pin is the mechanism that understands the smoother. pinSpacing is off
   * because the rail sits in its own grid column; the article next to it supplies the height.
   */
  useEffect(() => {
    const rail = railRef.current;
    const body = bodyRef.current;
    if (!rail || !body) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 62rem)", () => {
      const st = ScrollTrigger.create({
        trigger: rail,
        start: () => `top ${(document.querySelector<HTMLElement>(".header-main")?.offsetHeight ?? 84) + 32}`,
        endTrigger: body,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        // Explicit, because the default is position:fixed and fixed is exactly what cannot work
        // inside the smoother's transformed content — the same containing-block trap that broke
        // `position: sticky`. Transform pinning moves the element instead of fixing it.
        pinType: "transform",
        invalidateOnRefresh: true,
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, []);

  // Which section the reader is in, so the rail can light it up. An observer rather than a
  // scroll handler: it fires only when a heading crosses the line, not on every frame.
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      // A band across the upper third: a heading counts as "current" once it reaches the top
      // of the reading area, not when it first peeps in at the bottom.
      { rootMargin: "-18% 0px -70% 0px", threshold: 0 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [headings]);

  return (
    <>
      <a href="#main" className="skip-to-link">Skip to content</a>
      <Header />
      <SmoothScroll>
        <main id="main" className="main-wrapper bg-white text-[#242a2e]" data-background="ebb">
          {/* ---------- title ---------- */}
          <section className="w-full bg-[#1b2126] text-white">
            <div
              data-frame="flat"
              data-frame-tone="dark"
              className="container-page pb-[clamp(40px,5vw,76px)] pt-[calc(var(--header-height,84px)+clamp(36px,5vw,80px))]"
            >
              <Link href="/insights" className="tap group inline-flex items-center gap-x-[10px] text-label uppercase text-white/70 transition-colors hover:text-white">
                <ArrowIcon className="block h-[10px] w-[10px] shrink-0 rotate-180 transition-transform duration-300 group-hover:-translate-x-[3px]" />
                All insights
              </Link>
              <div className="mt-[clamp(28px,4vw,56px)] grid grid-cols-1 gap-x-[clamp(40px,5vw,90px)] gap-y-[24px] lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end">
                <div>
                  <p className="text-label uppercase text-[var(--color-brand-soft)]">{meta.category}</p>
                  <h1 className="mt-[14px] max-w-[18ch] text-display" data-animate-title>{meta.title}</h1>
                </div>
                <p className="max-w-[46ch] text-lead text-white/75 lg:pb-[10px]">{article.standfirst}</p>
              </div>
              <p className="mt-[clamp(28px,3vw,44px)] flex flex-wrap items-center gap-x-[20px] gap-y-[8px] border-t border-white/15 pt-[16px] text-label uppercase text-white/55">
                <span>{minutes} min read</span>
                <span aria-hidden="true">·</span>
                <span>{headings.length} sections</span>
                {stage ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Stage {stage.stage} — {stage.title}</span>
                  </>
                ) : null}
              </p>
            </div>
          </section>

          {/* ---------- lead frame, full bleed ---------- */}
          <Figure src={article.lead.src} alt={article.lead.alt} caption={article.lead.caption} bleed />

          {/* ---------- body ---------- */}
          <section className="container-page pb-section pt-[clamp(44px,5vw,80px)]">
            {/* Rail left, reading column right — the arrangement the reference uses, and it is
                better than mine was: the contents are read before the article rather than after
                it, and the share and the invitation ride along beside the text instead of waiting
                at the foot for a reader who may never reach it. */}
            <div className="grid grid-cols-1 gap-x-[clamp(32px,4vw,64px)] lg:grid-cols-[minmax(260px,1fr)_minmax(0,1000px)]">

              {/* rail */}
              {/* On a phone the rail DISSOLVES so its parts sit where they belong: contents
                  before the article, share and the invitation after it. `display: contents` makes
                  the children grid items in their own right, so `order` can place them around the
                  article — the technique the reference uses, and the only one that avoids
                  rendering the same controls twice.
                  From 992px both wrappers become blocks again and the three parts stack inside the
                  pinned column, where `order` has no effect because they are no longer grid items. */}
              <aside className="contents lg:block">
                {/* No `sticky` class: it cannot work inside the smoother — see the pin above. */}
                {/* The rail column is the flexible one now, so the reading column can keep its
                    1000px cap and the right margin can stay on the page gutter at any width. The
                    rail's own content stops at 340px; past about 1600px the difference shows as a
                    little more air beside the text, which is the least bad place to put it — a
                    line of 110 characters is not an option and neither is a margin that grows to
                    four times the one on the left. */}
                <div ref={railRef} className="contents lg:block lg:max-w-[340px]">
                  <div className="order-1 mb-[clamp(28px,4vw,44px)] lg:mb-0">
                  <p className="text-label uppercase opacity-70">On this page</p>
                  {/* A vertical rule the current section lights up. */}
                  <nav className="mt-[14px] border-l-2 border-current/12">
                    {headings.map((c, n) => {
                      const on = active === c.id;
                      return (
                        <a
                          key={c.id}
                          href={`#${c.id}`}
                          aria-current={on ? "true" : undefined}
                          className={
                            "-ml-[2px] flex gap-x-[12px] border-l-2 py-[9px] pl-[16px] text-sm transition-colors duration-300 " +
                            (on ? "border-[var(--color-brand-deep)] text-[#242a2e]" : "border-transparent opacity-70 hover:opacity-100")
                          }
                        >
                          <span className="tabular-nums opacity-70">{String(n + 1).padStart(2, "0")}</span>
                          <span>{c.text}</span>
                        </a>
                      );
                    })}
                  </nav>
                  </div>

                  {/* Share. WhatsApp first: in this market it is how a drawing, a quote or a link
                      actually reaches the person who needs to see it. Copy-link last, because it
                      is the one that always works — the reference carries it too, with the same
                      confirmation, and without it a reader who wants to paste the link into an
                      email has to go to the address bar for it.
                      No X: the reference has one, but the audience for DNH statutory procedure is
                      not there, and a dead share icon is worse than one fewer. */}
                  {/* Centred once the rail dissolves: with no column edge to sit against, a row
                      of three circles hard against the left margin reads as leftover rather than
                      as a control. Back to the left from 992px, where the rail returns. */}
                  <div className="order-3 mt-[clamp(30px,4vw,44px)] flex items-center justify-center gap-x-[10px] border-t border-current/12 pt-[18px] lg:mt-[clamp(26px,3vw,36px)] lg:justify-start">
                    <span className="mr-[4px] text-label uppercase opacity-70">Share</span>
                    {[
                      { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`, d: "M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.1 14.1c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.2-.9a11.4 11.4 0 0 1-4.6-4.3c-.3-.5-.9-1.5-.9-2.8s.7-2 .9-2.3a1 1 0 0 1 .7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.3.5-.3.3c-.1.2-.3.3-.1.6a9 9 0 0 0 1.6 2 8 8 0 0 0 2.3 1.4c.3.1.5.1.6-.1l.9-1c.2-.2.4-.2.6-.1l1.8.9c.3.1.5.2.5.4s0 .9-.2 1.5Z" },
                      { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, d: "M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05A4.2 4.2 0 0 1 17.6 8.7c4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21h-4V9Z" },
                    ].map((s2) => (
                      <a
                        key={s2.label}
                        href={s2.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Share on ${s2.label}`}
                        className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-current/15 transition-colors duration-300 hover:border-current/45"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-[15px] w-[15px]"><path d={s2.d} fill="currentColor" /></svg>
                      </a>
                    ))}
                    <button
                      type="button"
                      aria-label={copied ? "Link copied" : "Copy link"}
                      onClick={() => {
                        navigator.clipboard?.writeText(shareUrl).then(
                          () => { setCopied(true); window.setTimeout(() => setCopied(false), 1800); },
                          () => undefined,
                        );
                      }}
                      className={
                        "relative flex h-[36px] w-[36px] items-center justify-center rounded-full border transition-colors duration-300 " +
                        (copied ? "border-[var(--color-brand-deep)] text-[var(--color-brand-deep)]" : "border-current/15 hover:border-current/45")
                      }
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-[15px] w-[15px]">
                        {copied ? (
                          <path d="M4 12.5 9 17.5 20 6.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        ) : (
                          <path d="M9.5 14.5a3.5 3.5 0 0 0 5 0l3-3a3.54 3.54 0 0 0-5-5l-1 1m-1 7a3.5 3.5 0 0 1-5 0 3.54 3.54 0 0 1 0-5l3-3a3.5 3.5 0 0 1 5 0" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                      </svg>
                      <span
                        aria-live="polite"
                        className={
                          "pointer-events-none absolute left-1/2 top-[-30px] -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-[#242a2e] px-[8px] py-[4px] text-[11px] font-medium text-white transition-opacity duration-200 " +
                          (copied ? "opacity-100" : "opacity-0")
                        }
                      >
                        Copied
                      </span>
                    </button>
                  </div>

                  {/* The invitation, beside the text rather than only at the foot. */}
                  {/* A card with a real control in it, not a text link. The reference makes the
                      same call — full-width button, 46px minimum — and it is right: a rail CTA
                      competing with four contents links needs to look like the thing to press. */}
                  <div className="order-4 mt-[clamp(22px,2.5vw,32px)] rounded-[10px] border border-current/12 border-t-[3px] border-t-[var(--color-brand)] bg-white p-[20px]">
                    <p className="text-[15px] font-medium leading-[21px]">Have a plot you are weighing up?</p>
                    <a
                      href="/contact"
                      className="group mt-[14px] flex min-h-[46px] w-full items-center justify-center gap-x-[10px] rounded-full bg-[#242a2e] px-[18px] text-[14px] font-medium text-white transition-colors duration-300 hover:bg-[var(--color-brand-deep)]"
                    >
                      Ask about your site
                      <ArrowIcon className="block h-[11px] w-[11px] shrink-0 transition-transform duration-300 group-hover:translate-x-[3px]" />
                    </a>
                  </div>
                </div>
              </aside>

              {/* The column sits straight after the rail and is as wide as the text can bear.
                  Right-aligning it at 700px put the leftover in the MIDDLE — a 468px hole between
                  the rail and the first word, which was worse than the margin it was meant to fix.
                  With the body at reading size the column can take the full width the grid gives
                  it and still measure 85-90 characters, so the right margin returns to the page
                  gutter. The 1000px cap is only there to stop the line running away on a very
                  wide monitor. */}
              <div ref={bodyRef} className="order-2 lg:w-full lg:max-w-[1000px]">
                {article.blocks.map((b, i) => {
                  if (b.type === "h2") {
                    return (
                      // A short brand rule above each section — the reference's device, and it
                      // does what the margin numbers were doing (rhythm the reader can feel)
                      // without needing a margin the rail has now taken.
                      <h2
                        key={i}
                        id={`s${i}`}
                        className={`${MEASURE} mt-[clamp(44px,5vw,72px)] scroll-mt-[calc(var(--header-height,84px)+20px)] text-h2 before:mb-[18px] before:block before:h-[3px] before:w-[28px] before:bg-[var(--color-brand)] before:content-['']`}
                      >
                        {b.text}
                      </h2>
                    );
                  }
                  if (b.type === "list") {
                    return (
                      <ul key={i} className={`${MEASURE} mt-[26px]`}>
                        {b.items.map((item, j) => (
                          <li key={j} className="flex gap-x-[16px] border-b border-current/12 py-[13px]">
                            <span className="mt-[5px] shrink-0 tabular-nums text-label opacity-35">{String(j + 1).padStart(2, "0")}</span>
                            <span className={`${BODY} opacity-85`}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (b.type === "quote") {
                    return (
                      <blockquote key={i} className="my-[clamp(44px,5vw,80px)] max-w-[24ch] text-h1">
                        <span className="type-serif">{b.text}</span>
                      </blockquote>
                    );
                  }
                  if (b.type === "figure") {
                    return <Figure key={i} src={b.src} alt={b.alt} caption={b.caption} />;
                  }
                  if (b.type === "note") {
                    return (
                      <aside key={i} className={`${MEASURE} mt-[clamp(30px,3vw,44px)] border-l-[2px] border-[var(--color-brand-deep)] py-[6px] pl-[clamp(18px,2vw,28px)]`}>
                        <p className={`${BODY} opacity-75`}>{b.text}</p>
                      </aside>
                    );
                  }
                  // The opening paragraph carries the lede size and a raised initial.
                  const first = article.blocks.findIndex((x) => x.type === "p") === i;
                  return (
                    <p
                      key={i}
                      className={
                        `${MEASURE} mt-[26px] opacity-85 ` +
                        (first
                          ? "text-h3 font-normal leading-[1.5] opacity-100 first-letter:float-left first-letter:mr-[10px] first-letter:mt-[6px] first-letter:text-[62px] first-letter:font-medium first-letter:leading-[0.78] first-letter:text-[var(--color-brand-deep)]"
                          : BODY)
                      }
                    >
                      {b.text}
                    </p>
                  );
                })}

                {/* In short. For the reader who came for the answer and not the reasoning —
                    and, being last, it also works as the thing they take away. */}
                {article.summary?.length ? (
                  <aside className={`${MEASURE} mt-[clamp(48px,5vw,80px)] rounded-[10px] bg-[var(--bone)] p-[clamp(22px,2.5vw,34px)]`}>
                    <p className="text-label uppercase text-[var(--color-brand-deep)]">In short</p>
                    <ul className="mt-[16px]">
                      {article.summary.map((line, j) => (
                        <li key={j} className="flex gap-x-[14px] py-[7px] text-[16px] leading-[24px] opacity-85">
                          <span aria-hidden="true" className="mt-[9px] block h-[6px] w-[6px] shrink-0 bg-[var(--color-brand)]" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </aside>
                ) : null}
              </div>

            </div>
          </section>

          {/* ---------- the stage this belongs to ---------- */}
          {stage ? (
            <section className="container-page mb-section">
              <a
                href={stage.href}
                className="group grid grid-cols-1 items-center gap-y-[20px] overflow-hidden rounded-[10px] p-[clamp(24px,3vw,44px)] sm:grid-cols-[1fr_auto] sm:gap-x-[32px]"
                style={{ backgroundColor: stage.panel, color: stage.panelTone === "light" ? "#242a2e" : "#ffffff" } as CSSProperties}
              >
                <span>
                  <span className="block text-label uppercase opacity-70">The stage this belongs to</span>
                  <span className="mt-[10px] block text-h2">{stage.title}</span>
                </span>
                <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-current/45 transition-colors duration-300 group-hover:border-current">
                  <ArrowIcon className="block h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-[3px]" />
                </span>
              </a>
            </section>
          ) : null}

          {/* ---------- more from the practice ----------
              The reference has nothing here at all — its article ends and the footer begins. That
              is the one place it is beaten: a reader who has just finished two thousand words is
              the most willing reader the site will ever have, and handing them the footer wastes
              it. Cards match the index exactly, including the fact that an unwritten piece is not
              a link. */}
          <section className="container-page mb-section">
            <div className="flex flex-wrap items-end justify-between gap-x-[32px] gap-y-[12px] border-t border-current/12 pt-[clamp(28px,3vw,44px)]">
              <h2 className="text-h1" aria-label="More from the practice">
                More <span className="type-serif">from the practice</span>
              </h2>
              <Link href="/insights" className="tap group inline-flex items-center gap-x-[10px] text-sm font-medium opacity-70 transition-opacity hover:opacity-100">
                All insights
                <ArrowIcon className="block h-[11px] w-[11px] shrink-0 transition-transform duration-300 group-hover:translate-x-[3px]" />
              </Link>
            </div>
            <div className="mt-[clamp(28px,3vw,48px)] grid grid-cols-1 gap-x-[clamp(20px,2.5vw,32px)] gap-y-[clamp(32px,4vw,48px)] sm:grid-cols-3">
              {more.map((a) => {
                const inner = (
                  <>
                    <span style={CLIP} className="relative block aspect-[16/10] w-full overflow-hidden bg-[#242a2e]/[0.07]">
                      {ARTICLES[a.slug]?.lead ? (
                        <Media src={ARTICLES[a.slug].lead.src} alt="" sizes="(min-width: 640px) 33vw, 100vw" />
                      ) : (
                        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-[0.10]">
                          {/* eslint-disable-next-line @next/next/no-img-element -- decorative watermark */}
                          <img src="/manovruti/brand/mark-dark.png" alt="" className="h-[46px] w-auto" />
                        </span>
                      )}
                    </span>
                    <span className="mt-[16px] flex items-baseline gap-x-[14px]">
                      <span className="text-label uppercase text-[var(--color-brand-deep)]">{a.category}</span>
                      {!a.href ? <span className="text-label uppercase opacity-70">In preparation</span> : null}
                    </span>
                    <span className={"mt-[10px] block text-h3" + (a.href ? " decoration-[#242a2e]/25 underline-offset-[6px] group-hover:underline" : "")}>
                      {a.title}
                    </span>
                    <span className="mt-[8px] block text-sm opacity-60">{a.summary}</span>
                  </>
                );
                return a.href ? (
                  <a key={a.slug} href={a.href} className="group block">{inner}</a>
                ) : (
                  <article key={a.slug} className="block">{inner}</article>
                );
              })}
            </div>
          </section>

          {/* ---------- ask ---------- */}
          <section className="container-page mb-section">
            <div className="flex flex-col items-start gap-y-[22px] border-t border-current/12 pt-[clamp(28px,3vw,48px)] lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-h1" aria-label="A question this did not answer?">
                  A question <span className="type-serif">this did not answer?</span>
                </h2>
                <p className="mt-[14px] max-w-[46ch] text-lead opacity-75">
                  Every plot is different. Send us the site and we will tell you what it actually needs.
                </p>
              </div>
              <ButtonLink variant="outline-auto" href="/contact">Ask about your site</ButtonLink>
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
