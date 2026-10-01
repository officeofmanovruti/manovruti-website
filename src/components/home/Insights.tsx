"use client";

import type { CSSProperties, ReactNode } from "react";
import { ButtonLink } from "../shared/Button";
import { INSIGHTS, INSIGHTS_SECTION } from "./data";
import { ARTICLES } from "../insights/article";
import { Media } from "../shared/Media";

/**
 * Insights — the blog's shop window on the home page.
 *
 * A consultancy with no portfolio has one other way to demonstrate competence in public: writing
 * accurately about statutory process that clients find confusing. It is also the only part of the
 * site with a real chance of ranking, because nobody else in Silvassa is explaining NA conversion
 * or the factory licence sequence in plain English.
 *
 * Layout follows the reference: the headline block sits inside the grid rather than above it, one
 * post is featured at full height on the right, and two run beneath the headline on the left.
 *
 * Two deliberate departures from the reference. It keeps the light ground: it follows the client
 * wall, which is also light, and the page then steps down through Credentials and the prefooter to
 * the black footer. Making this dark would put three dark panels in a row at the foot of the page.
 * And there are no dates — a date is a fact about a published article, and these three
 * are commissions. The category sits in that slot instead, which is the same visual role.
 *
 * Images are placeholders. See PLACEHOLDER below for what replacing them involves.
 *
 * It hands the background to Credentials at its own bottom edge rather than at the viewport
 * centre, because Credentials paints itself from that edge down — see the note there. The gap
 * below is padding rather than margin for the same reason: the margin would have fallen inside
 * the dark band.
 */

/** An angled top corner, echoing the north-light roof the prefooter already cuts into its media. */
const CLIP_LEFT: CSSProperties = { clipPath: "polygon(0 16%, 20% 0, 100% 0, 100% 100%, 0 100%)" };
const CLIP_RIGHT: CSSProperties = { clipPath: "polygon(0 0, 80% 0, 100% 16%, 100% 100%, 0 100%)" };

/**
 * PLACEHOLDER. A tinted block carrying the mark, not a grey box — it should read as a space held
 * open rather than as a broken image. To use a real photograph, swap this element for
 * `<Media src={a.image} alt={a.imageAlt} sizes="..." />` and add those two fields to the Insight
 * type; nothing else in this file has to change.
 */
function Placeholder({ clip, large = false, slug }: { clip: CSSProperties; large?: boolean; slug?: string }) {
  const lead = slug ? ARTICLES[slug]?.lead : undefined;
  return (
    <span
      style={clip}
      className={
        "relative block w-full overflow-hidden bg-[#242a2e]/[0.07] " +
        // The featured image stretches to whatever height the two rows come to, so its foot lands
        // on the same line as the small pair's. Fixing its aspect instead left it 66px short and
        // the three captions stepped down the section at three different heights.
        (large ? "aspect-[16/10] xl:aspect-auto xl:min-h-[360px] xl:flex-1" : "aspect-[4/3]")
      }
    >
      {lead ? (
        <Media src={lead.src} alt="" sizes="(min-width: 1280px) 50vw, 100vw" />
      ) : (
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center opacity-[0.10] transition-opacity duration-500 group-hover:opacity-[0.16]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative watermark, fixed height */}
        <img src="/manovruti/brand/mark-dark.png" alt="" className={large ? "h-[74px] w-auto" : "h-[46px] w-auto"} />
      </span>
      )}
    </span>
  );
}

function Meta({ category, title, large = false }: { category: string; title: string; large?: boolean }) {
  return (
    <>
      <span className="mt-[18px] block text-label font-medium uppercase text-[var(--color-brand-deep)]">
        {category}
      </span>
      <span
        className={
          "mt-[8px] block decoration-[#242a2e]/25 underline-offset-[6px] group-[a]:group-hover:underline " +
          (large ? "text-h2" : "text-h3")
        }
      >
        {title}
      </span>
    </>
  );
}

/**
 * A card is a link only when its article exists. The three topics here are commissions, so they
 * render as plain blocks — clickable cards pointing at unwritten articles were four live 404s.
 */
function Card({ href, className, children, ...rest }: { href?: string; className: string; children: ReactNode } & Record<string, unknown>) {
  if (href) return <a href={href} className={className} {...rest}>{children}</a>;
  return <div className={className} {...rest}>{children}</div>;
}

export function Insights() {
  /**
   * Three: one featured and two beneath the headline — the layout this section was built for.
   *
   * INSIGHTS used to hold exactly three, so destructuring the whole list was safe. It holds
   * fifteen now, and without the slice this section rendered every one of them: fourteen small
   * cards stacked under the feature, with a "See all" button sitting above them pointing at a page
   * the reader had effectively already been given. The index is /insights; this is the shop window.
   */
  const [featured, ...rest] = INSIGHTS.slice(0, 3);

  return (
    <div
      id="insights"
      className="section section--insights pb-block text-[#242a2e]"
      data-background="ebb"
      data-background-end="top"
    >
      <div className="container-page">
        {/* The three-up desktop arrangement needs 1280. Held at lg (992) it gave the two small cards
            209px each and their titles wrapped to five lines; forcing them to one column instead made
            the featured image stretch to match a 1100px column. Below 1280 the section uses the same
            stacked layout it already uses on tablet, which measures clean. */}
        <div className="grid gap-y-[52px] xl:grid-cols-[1fr_1.08fr] xl:gap-x-[64px]">
          {/* headline block — part of the grid, not a banner above it */}
          <div className="xl:col-start-1 xl:row-start-1 xl:self-start">
            <h2
              className="section__title text-h1"
              data-animate-title
              aria-label={`${INSIGHTS_SECTION.title.display} ${INSIGHTS_SECTION.title.rest}`}
            >
              <span className="type-serif block">{INSIGHTS_SECTION.title.display}</span>
              {INSIGHTS_SECTION.title.rest}
            </h2>
            <div className="mt-[22px] flex flex-wrap items-center gap-x-[32px] gap-y-[20px]">
              <p className="max-w-[34ch] text-lead opacity-70" data-animate="step-up">
                {INSIGHTS_SECTION.description}
              </p>
              <div data-animate="step-up" data-animate-start="top 80%">
                <ButtonLink variant="outline-auto" iconSide="left" href={INSIGHTS_SECTION.cta.href}>
                  {INSIGHTS_SECTION.cta.label}
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* featured, full height of the right column */}
          <Card
            href={featured.href}
            className="group flex flex-col xl:col-start-2 xl:row-span-2 xl:row-start-1"
            data-animate="step-up"
            data-animate-start="top 86%"
          >
            <Placeholder clip={CLIP_LEFT} large slug={featured.slug} />
            <Meta category={featured.category} title={featured.title} large />
            <span className="mt-[10px] block max-w-[52ch] text-sm opacity-65">{featured.summary}</span>
          </Card>

          {/* the other two, beneath the headline */}
          <div className="grid grid-cols-1 gap-x-[28px] gap-y-[40px] sm:grid-cols-2 xl:col-start-1 xl:row-start-2 xl:self-end">
            {rest.map((a, i) => (
              <Card
                key={a.slug}
                href={a.href}
                className="group block"
                data-animate="step-up"
                data-animate-start="top 88%"
              >
                <Placeholder clip={i === 0 ? CLIP_RIGHT : CLIP_LEFT} slug={a.slug} />
                <Meta category={a.category} title={a.title} />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
