"use client";

import { useEffect } from "react";
import type { CSSProperties } from "react";
import { SmoothScroll } from "../shared/SmoothScroll";
import { initAnimate } from "../shared/animate";
import { ScrollTrigger } from "../shared/gsap";
import { Header } from "../home/Header";
import { Footer } from "../home/Footer";
import { Media } from "../shared/Media";
import { ParallaxMedia } from "../shared/ParallaxMedia";
import { ButtonLink } from "../shared/Button";
import { ArrowIcon } from "../shared/icons";
import { ARTICLES } from "./article";
import { CONTACT, INSIGHTS } from "../home/data";
import { INSIGHTS_PAGE } from "./data";

/**
 * Insights — the blog index.
 *
 * Three topics, no published articles. That is the honest state of it, and the page is built to
 * say so without apologising: each card carries its category and title and, where a published
 * piece would carry a date, the words "In preparation". None of them is a link, because none of
 * them has anywhere to go — the home page used to point at all three and at this route, which was
 * four live 404s until this page existed.
 *
 * No filter rail. The portfolio has one because nineteen projects across six sectors need it;
 * three articles across three categories would give every filter a single card, which is a control
 * that does nothing. It belongs here the moment the archive is worth filtering.
 */

/** The angled corner the portfolio frames and the home insights cards already use. */
const CLIP: CSSProperties = { clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)" };

const MARK = "/manovruti/brand/mark-dark.png";

/**
 * The card image.
 *
 * It takes the article's own lead frame when the article has one, and falls back to a held-open
 * space carrying the mark when it does not — so a card lights up the moment its article gets an
 * image, with nothing to remember and no second list of image paths to keep in step.
 */
function Frame({ slug }: { slug: string }) {
  const lead = ARTICLES[slug]?.lead;
  return (
    <span style={CLIP} className="relative block aspect-[16/10] w-full overflow-hidden bg-[#242a2e]/[0.07]">
      {lead ? (
        <Media src={lead.src} alt="" sizes="(min-width: 992px) 33vw, 100vw" />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-[0.10]">
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative watermark, fixed height */}
          <img src={MARK} alt="" className="h-[52px] w-auto" />
        </span>
      )}
    </span>
  );
}

export function InsightsPage() {
  useEffect(() => {
    const cleanup = initAnimate(document);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); cleanup(); };
  }, []);

  return (
    <>
      <a href="#main" className="skip-to-link sr-hidden focus:not-sr-only">Skip to content</a>
      <Header />
      <SmoothScroll>
        <main id="main" className="main-wrapper bg-white text-[#242a2e]" data-background="ebb">
          {/* ---------- opening frame ---------- */}
          <section className="relative h-[clamp(420px,62svh,640px)] w-full overflow-hidden bg-[#1b2126]">
            <ParallaxMedia src={INSIGHTS_PAGE.image} alt={INSIGHTS_PAGE.imageAlt} priority />
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[54%] bg-[linear-gradient(180deg,rgba(12,15,17,0.68)_0%,rgba(12,15,17,0.46)_38%,rgba(12,15,17,0.2)_72%,rgba(12,15,17,0)_100%)]" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(180deg,rgba(12,15,17,0)_0%,rgba(12,15,17,0.28)_30%,rgba(12,15,17,0.62)_62%,rgba(12,15,17,0.84)_100%)]" />
            <div className="container-page relative flex h-full flex-col justify-end pb-[clamp(36px,5vw,64px)]">
              <p className="text-label uppercase text-white/70">{INSIGHTS_PAGE.eyebrow}</p>
              <h1 className="mt-[14px] text-display text-white" data-animate-title>{INSIGHTS_PAGE.title}</h1>
            </div>
          </section>

          {/* ---------- standfirst ---------- */}
          <section className="container-page mb-section pt-section">
            <div className="grid grid-cols-1 gap-x-[clamp(32px,6vw,110px)] gap-y-[24px] lg:grid-cols-[5fr_6fr]">
              <h2
                className="text-h1"
                data-animate-title
                aria-label={`${INSIGHTS_PAGE.lead.main} ${INSIGHTS_PAGE.lead.accent}`}
              >
                {INSIGHTS_PAGE.lead.main} <span className="type-serif">{INSIGHTS_PAGE.lead.accent}</span>
              </h2>
              <p className="text-lead opacity-80 lg:pt-[8px]" data-animate="step-up">
                {INSIGHTS_PAGE.description}
              </p>
            </div>
          </section>

          {/* ---------- the archive ---------- */}
          <section className="container-page mb-section">
            <div
              className="grid grid-cols-1 gap-x-[clamp(20px,2.5vw,32px)] gap-y-[clamp(44px,5vw,68px)] sm:grid-cols-2 lg:grid-cols-3"
              data-animate="batch"
            >
              {INSIGHTS.map((a) => {
                const body = (
                  <>
                    <Frame slug={a.slug} />
                    <div className="mt-[18px] flex items-baseline gap-x-[14px]">
                      <span className="text-label font-medium uppercase text-[var(--color-brand-deep)]">{a.category}</span>
                      {/* Where a published article would carry its date. */}
                      {!a.href ? <span className="text-label uppercase opacity-40">{INSIGHTS_PAGE.pendingLabel}</span> : null}
                    </div>
                    <h3 className={"mt-[10px] text-h3" + (a.href ? " decoration-[#242a2e]/25 underline-offset-[6px] group-hover:underline" : "")}>
                      {a.title}
                    </h3>
                    <p className="mt-[10px] text-sm opacity-65">{a.summary}</p>
                  </>
                );
                return a.href ? (
                  <a key={a.slug} href={a.href} className="group block" data-animate-child>{body}</a>
                ) : (
                  <article key={a.slug} className="block" data-animate-child>{body}</article>
                );
              })}
            </div>
          </section>

          {/* ---------- ask instead ----------
              The one thing the page can honestly offer while the articles are being written. */}
          <section className="container-page mb-section">
            <div className="flex flex-col items-start gap-y-[24px] border-t border-current/12 pt-[clamp(32px,4vw,56px)] lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-h1" aria-label={`${INSIGHTS_PAGE.ask.title.main} ${INSIGHTS_PAGE.ask.title.accent}`}>
                  {INSIGHTS_PAGE.ask.title.main} <span className="type-serif">{INSIGHTS_PAGE.ask.title.accent}</span>
                </h2>
                <p className="mt-[16px] max-w-[48ch] text-lead opacity-75">{INSIGHTS_PAGE.ask.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-[22px] gap-y-[14px]">
                <ButtonLink variant="outline-auto" href="/contact">Ask a question</ButtonLink>
                <a
                  href={CONTACT.emailHref}
                  className="tap group inline-flex items-center gap-x-[8px] text-[14px] font-medium opacity-75 underline decoration-current/30 underline-offset-[6px] transition-opacity duration-300 hover:opacity-100 lg:text-[16px]"
                >
                  {CONTACT.email}
                  <ArrowIcon className="block h-[10px] w-[10px] shrink-0 transition-transform duration-300 group-hover:translate-x-[3px]" />
                </a>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
