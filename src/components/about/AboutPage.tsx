"use client";

import { useEffect, useRef } from "react";
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
import { CLIENT_LOGOS, CONTACT } from "../home/data";
import {
  ABOUT_CLIENTS,
  CLIENT_ROW_SPLIT,
  MARQUEE_SPEED,
  ABOUT_HERO,
  ABOUT_JOIN,
  ABOUT_STATEMENT,
  ABOUT_STORY,
  COMPANY_PROFILE,
  MISSION_VISION,
  TEAM,
  TEAM_DISCIPLINES,
  formatBytes,
} from "./data";

/**
 * About — the company page.
 *
 * Built from the layout patterns of the reference the client asked for, not from its stylesheet:
 * a full-bleed opening frame, a statement, the journey, who the team is, the client wall and a
 * company-profile download. Everything that carries the brand is this site's own — white ground,
 * ink and bronze, Inter and Schibsted Grotesk, the same angled corner and the same reveal timing
 * as the portfolio. A visitor arriving from any other page should not feel they have changed site.
 *
 * Two of the reference's blocks are not reproduced as they stand. Its team section is eighty-one
 * portraits and its recruitment block quotes a headcount; we have neither, and inventing either
 * would be inventing the company. The disciplines section says what the brochure says and stops.
 */

/** The angled corner the Insights cards and the portfolio frames already use. */
const CLIP: CSSProperties = { clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)" };

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M6 1v7m0 0 3-3M6 8 3 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.5 9.5v1h9v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function LogoCell({ c }: { c: (typeof CLIENT_LOGOS)[number] }) {
  return (
    <span className="flex h-[clamp(92px,9vw,132px)] w-[clamp(148px,15vw,228px)] shrink-0 items-center justify-center px-[clamp(14px,2vw,28px)]">
      {/* eslint-disable-next-line @next/next/no-img-element -- optically sized brand mark */}
      <img
        src={c.image}
        alt={c.name}
        loading="eager"
        fetchPriority="low"
        decoding="async"
        style={{ "--logo-h": `${c.height}px` } as CSSProperties}
        className="block h-auto max-h-[calc(var(--logo-h)*0.8)] w-auto max-w-full object-contain"
      />
    </span>
  );
}

/**
 * One row of the client wall.
 *
 * The group is rendered twice and the track shifts by exactly half its own width, so the loop
 * closes on the duplicate and there is no visible seam. The duration is written here rather than
 * in the stylesheet: a fixed duration would crawl on a phone and race on a wide monitor, because
 * the distance travelled is the group's width. Dividing that width by a constant speed keeps the
 * logos moving at the same rate at every viewport — the reference measures 56 px/s.
 */
function Marquee({ logos, dir }: { logos: typeof CLIENT_LOGOS; dir: "left" | "right" }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const sync = () => {
      const group = track.firstElementChild as HTMLElement | null;
      if (!group || !group.offsetWidth) return;
      track.style.setProperty("--marquee-duration", `${(group.offsetWidth / MARQUEE_SPEED).toFixed(2)}s`);
    };
    sync();
    // Logos are lazy and the marks are different widths, so the group settles after paint.
    const ro = new ResizeObserver(sync);
    ro.observe(track);
    window.addEventListener("resize", sync);
    return () => { ro.disconnect(); window.removeEventListener("resize", sync); };
  }, []);

  return (
    <div className="marquee" data-dir={dir}>
      <div ref={trackRef} className="marquee__track">
        {[false, true].map((clone) => (
          <div
            key={String(clone)}
            className="marquee__group flex shrink-0"
            data-clone={clone ? "true" : undefined}
            // The second copy exists only to close the loop; a screen reader should hear the
            // nineteen names once.
            aria-hidden={clone || undefined}
          >
            {logos.map((c) => <LogoCell key={c.name} c={c} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutPage() {
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
          {/* ---------- opening frame ---------- */}
          <section className="relative h-[clamp(420px,62svh,640px)] w-full overflow-hidden bg-[#1b2126]">
            <ParallaxMedia src={ABOUT_HERO.image} alt={ABOUT_HERO.imageAlt} priority />
            {/* Two overlapping scrims, as on the portfolio: one carries the fixed bar, one carries
                the type at the foot. Sized to meet they leave a bright band across the middle. */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[54%] bg-[linear-gradient(180deg,rgba(12,15,17,0.68)_0%,rgba(12,15,17,0.46)_38%,rgba(12,15,17,0.2)_72%,rgba(12,15,17,0)_100%)]" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(180deg,rgba(12,15,17,0)_0%,rgba(12,15,17,0.28)_30%,rgba(12,15,17,0.62)_62%,rgba(12,15,17,0.84)_100%)]" />
            <div className="container-page relative flex h-full flex-col justify-end pb-[clamp(36px,5vw,64px)]">
              <p className="text-label uppercase text-white/70">{ABOUT_HERO.eyebrow}</p>
              <h1 className="mt-[14px] text-display text-white" data-animate-title>{ABOUT_HERO.title}</h1>
            </div>
          </section>

          {/* ---------- statement ---------- */}
          <section className="container-page mb-section pt-section">
            <div className="grid grid-cols-1 gap-x-[clamp(32px,6vw,110px)] gap-y-[32px] lg:grid-cols-[5fr_6fr]">
              <h2 className="text-h1" data-animate-title aria-label={`${ABOUT_STATEMENT.lead.display} ${ABOUT_STATEMENT.lead.rest}`}>
                <span className="type-serif">{ABOUT_STATEMENT.lead.display}</span> {ABOUT_STATEMENT.lead.rest}
              </h2>
              <div className="lg:pt-[8px]">
                {ABOUT_STATEMENT.paragraphs.map((t) => (
                  <p key={t.slice(0, 24)} className="mb-[24px] text-lead opacity-80 last:mb-0" data-animate="step-up">{t}</p>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- mission & vision ---------- */}
          <section className="container-page mb-section">
            <div className="grid grid-cols-1 gap-x-[clamp(24px,4vw,64px)] gap-y-0 border-t border-current/12 sm:grid-cols-2">
              {MISSION_VISION.map((m) => (
                <div key={m.label} className="border-b border-current/12 py-[clamp(28px,3vw,44px)] sm:border-b-0" data-animate="step-up">
                  <p className="text-label uppercase text-[var(--color-brand-deep)]">{m.label}</p>
                  <p className="mt-[16px] max-w-[46ch] text-h3">{m.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ---------- journey ---------- */}
          <section id="journey" className="container-page mb-section scroll-mt-[var(--header-height,84px)]">
            <div className="grid grid-cols-1 items-center gap-x-[clamp(32px,6vw,100px)] gap-y-[40px] lg:grid-cols-[6fr_5fr]">
              <div className="grid grid-cols-2 gap-[clamp(12px,1.5vw,20px)]" data-animate="step-up">
                {ABOUT_STORY.images.map((img, i) => (
                  <span
                    key={img.src}
                    style={CLIP}
                    // The second frame is taller and sits lower, so the pair reads as a spread
                    // rather than as two thumbnails of equal weight.
                    className={"relative block w-full overflow-hidden bg-[#242a2e]/[0.07] " + (i === 0 ? "aspect-[3/4]" : "mt-[clamp(24px,4vw,56px)] aspect-[3/4]")}
                  >
                    <Media src={img.src} alt={img.alt} sizes="(min-width: 992px) 42vw, 68vw" />
                  </span>
                ))}
              </div>
              <div>
                <p className="text-label uppercase text-[var(--color-brand-deep)]">{ABOUT_STORY.eyebrow}</p>
                <h2 className="mt-[16px] text-h1" data-animate-title aria-label={`${ABOUT_STORY.title.display} ${ABOUT_STORY.title.rest}`}>
                  <span className="type-serif">{ABOUT_STORY.title.display}</span> {ABOUT_STORY.title.rest}
                </h2>
                {ABOUT_STORY.paragraphs.map((t) => (
                  <p key={t.slice(0, 24)} className="mt-[24px] max-w-[560px] text-lead opacity-80" data-animate="step-up">{t}</p>
                ))}
                <p className="mt-[32px] max-w-[520px] border-t border-current/12 pt-[20px] text-sm opacity-55" data-animate="step-up">
                  {ABOUT_STORY.note}
                </p>
              </div>
            </div>
          </section>

          {/* ---------- the team ----------
              The reference runs eighty-one portraits here. We have no photographs and no headcount,
              and the brochure names only the disciplines — so that is what this says. */}
          <section className="container-page mb-section">
            <div className="max-w-[760px]">
              <p className="text-label uppercase text-[var(--color-brand-deep)]">{TEAM.eyebrow}</p>
              <h2 className="mt-[16px] text-h1" data-animate-title aria-label={`${TEAM.title.display} ${TEAM.title.rest}`}>
                <span className="type-serif">{TEAM.title.display}</span> {TEAM.title.rest}
              </h2>
              <p className="mt-[24px] text-lead opacity-80" data-animate="step-up">{TEAM.description}</p>
            </div>
            <div className="mt-[clamp(40px,5vw,72px)] grid grid-cols-1 gap-x-[clamp(24px,3vw,40px)] border-t border-current/12 sm:grid-cols-2 lg:grid-cols-4" data-animate="batch">
              {TEAM_DISCIPLINES.map((d, i) => (
                <div key={d.title} className="border-b border-current/12 py-[clamp(24px,2.4vw,36px)] lg:border-b-0" data-animate-child>
                  <p className="tabular-nums text-label opacity-40">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-[14px] text-h3">{d.title}</h3>
                  <p className="mt-[10px] text-sm opacity-65">{d.work}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ---------- clients ----------
              Laid out as the reference lays its own: a large word, a line beneath it whose closing
              phrase carries the serif accent, then two rows of marks travelling in opposite
              directions. The home page keeps its honeycomb; this is the other page's device. */}
          <section className="mb-section">
            <div className="container-page">
              <p className="text-display leading-[1.02]" data-animate="step-up">{ABOUT_CLIENTS.heading}</p>
              <p
                className="mt-[10px] max-w-[22ch] text-h2 sm:max-w-none"
                data-animate="step-up"
                aria-label={`${ABOUT_CLIENTS.lead.main} ${ABOUT_CLIENTS.lead.accent}`}
              >
                {ABOUT_CLIENTS.lead.main} <span className="type-serif">{ABOUT_CLIENTS.lead.accent}</span>
              </p>
            </div>
            <div className="container-page mt-[clamp(32px,4vw,60px)] flex flex-col gap-y-[clamp(8px,1.4vw,20px)]">
              <Marquee logos={CLIENT_LOGOS.slice(0, CLIENT_ROW_SPLIT)} dir="right" />
              <Marquee logos={CLIENT_LOGOS.slice(CLIENT_ROW_SPLIT)} dir="left" />
            </div>
          </section>

          {/* ---------- company profile download ----------
              A 50/50 split: the document on the left running to the frame, a tinted panel on the
              right rounded on its outer corners only, and a pill that is an icon until you reach
              for it. The spread is our own eight pages, rendered from the PDF and tiled at a tilt
              by scripts/build-profile-spread.py. */}
          <section id="profile" className="container-page mb-section scroll-mt-[var(--header-height,84px)]">
            <div className="grid grid-cols-1 items-stretch overflow-hidden rounded-[8px] lg:grid-cols-2">
              <div className="relative aspect-[16/9] w-full overflow-hidden lg:aspect-auto lg:h-full">
                <Media src={COMPANY_PROFILE.spread} alt={COMPANY_PROFILE.spreadAlt} sizes="(min-width: 992px) 50vw, 100vw" />
              </div>
              <div className="flex flex-col justify-center bg-[var(--bone)] px-[clamp(24px,5vw,78px)] py-[clamp(36px,5vw,64px)]">
                <p className="text-h1" aria-label={`${COMPANY_PROFILE.title.main} ${COMPANY_PROFILE.title.accent}`}>
                  {COMPANY_PROFILE.title.main} <span className="type-serif">{COMPANY_PROFILE.title.accent}</span>
                </p>
                <p className="mt-[16px] max-w-[46ch] text-lead opacity-75">{COMPANY_PROFILE.description}</p>
                <div className="mt-[28px] flex flex-wrap items-center gap-x-[18px] gap-y-[12px]">
                  {/* The label is always on show. The reference keeps its control an icon until
                      you hover it, which is a guessing game for anyone who has not met the pattern
                      and says nothing at all on a touch screen, where there is no hover to reveal
                      it. The arrow nudges down on hover instead, which is affordance enough.

                      #921c21 is the profile's own primary, sampled from the rendered pages rather
                      than guessed: 950,248 pixels of the eight pages carry it, twenty-four times
                      the next colour. It is a deliberate exception to the brand palette, which is
                      gold on charcoal and treats the brochure maroon as superseded — this one
                      control belongs to the document beside it, so it takes the document's colour.
                      Do not "correct" it back to gold. White on it measures 8.71:1, and the hover
                      shade is the same hue at 76% value, 11.68:1. */}
                  <a
                    href={COMPANY_PROFILE.file}
                    download={COMPANY_PROFILE.fileName}
                    aria-label={`Download the company profile, ${COMPANY_PROFILE.format}, ${formatBytes(COMPANY_PROFILE.bytes)}`}
                    className="group inline-flex items-center gap-x-[12px] rounded-full bg-[#921c21] px-[24px] py-[14px] text-white transition-colors duration-300 hover:bg-[#6f1519] focus-visible:bg-[#6f1519]"
                  >
                    <span className="block whitespace-nowrap text-[15px] font-medium leading-none">
                      Download the profile
                    </span>
                    <DownloadIcon className="block h-[14px] w-[14px] shrink-0 transition-transform duration-300 ease-out group-hover:translate-y-[2px]" />
                  </a>
                  <p className="text-sm opacity-55">
                    {COMPANY_PROFILE.format} · {COMPANY_PROFILE.pages} pages · {formatBytes(COMPANY_PROFILE.bytes)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- work with us ----------
              The reference recruits here against a headcount. We have no careers content, so this
              is the one thing we can honestly offer: the same enquiry route as everywhere else. */}
          <section className="container-page mb-section">
            <div className="flex flex-col items-start gap-y-[24px] border-t border-current/12 pt-[clamp(32px,4vw,56px)] lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-h1" aria-label={`${ABOUT_JOIN.title.display} ${ABOUT_JOIN.title.rest}`}>
                  <span className="type-serif">{ABOUT_JOIN.title.display}</span> {ABOUT_JOIN.title.rest}
                </h2>
                <p className="mt-[16px] max-w-[46ch] text-lead opacity-75">{ABOUT_JOIN.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-[22px] gap-y-[14px]">
                <ButtonLink variant="outline-auto" href="/contact">Start a conversation</ButtonLink>
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
