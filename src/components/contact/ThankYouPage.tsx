"use client";

import { useEffect } from "react";
import { SmoothScroll } from "../shared/SmoothScroll";
import { initAnimate } from "../shared/animate";
import { Header } from "../home/Header";
import { Footer } from "../home/Footer";
import { ParallaxMedia } from "../shared/ParallaxMedia";
import { ArrowIcon } from "../shared/icons";
import { CONTACT } from "../home/data";
import { CONTACT_PAGE, THANK_YOU } from "./data";

/**
 * Thank you.
 *
 * Reached by the contact form on a successful send, not by a link in the navigation, and excluded
 * from the sitemap and from indexing — a search result landing here would promise something the
 * page cannot give.
 *
 * WHY A PAGE AND NOT AN IN-PLACE MESSAGE. Swapping the form for a line of text left two headings
 * stacked, gave the visitor nowhere to go, and produced no URL. A URL is the thing that can be
 * counted later: "how many people reached /thank-you" is how an enquiry becomes a measurable
 * conversion once analytics exists. It also reaches here through the ordinary route transition, so
 * the panel covers the change exactly as it does everywhere else — see PageTransition.
 *
 * NOTHING HERE IS A NEW PROMISE. The reply time is the one already published on the contact page
 * and in the footer, and the phone number and address are the same records. If the reply time ever
 * changes it changes in one place.
 */
export function ThankYouPage() {
  useEffect(() => initAnimate(), []);

  return (
    <SmoothScroll>
      <Header />
      <main id="main">
        {/* The same frame the contact page opens with, and deliberately so: the visitor arrives here
            straight off that page, and carrying the picture over makes the send feel like one
            movement rather than a jump to a bare panel. The scrim and the muted whites are also the
            contact page's — on a photograph a 12px label at 50% measured 4.03:1, under AA, so the
            margin has to come from the type. */}
        <section className="relative flex min-h-[78svh] items-center overflow-hidden bg-[#141719] text-white">
          <ParallaxMedia src={CONTACT_PAGE.image} alt="" priority />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0f1214]/80" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[linear-gradient(180deg,rgba(10,13,15,0.55)_0%,rgba(10,13,15,0)_100%)]" />
          <div className="container-page relative py-[clamp(72px,10vw,140px)] pt-[calc(var(--header-height,84px)+clamp(56px,8vw,120px))]">
            <div className="max-w-[62ch]">
              <p className="text-label uppercase text-white/70">{THANK_YOU.eyebrow}</p>
              <h1
                className="mt-[14px] text-h1"
                data-animate-title
                aria-label={`${THANK_YOU.title.main} ${THANK_YOU.title.accent}`}
              >
                {THANK_YOU.title.main} <span className="type-serif">{THANK_YOU.title.accent}</span>
              </h1>
              <p className="mt-[20px] max-w-[52ch] text-lead text-white/70">{THANK_YOU.lead}</p>

              {/* The reply time, said once, from the same record the contact page reads. */}
              <p className="mt-[clamp(26px,3vw,38px)] max-w-[52ch] border-t border-white/15 pt-[16px] text-sm text-white/65">
                {CONTACT_PAGE.replyNote} {CONTACT_PAGE.answeredBy}{" "}
                <span className="text-white">{CONTACT.person}</span>, {CONTACT.qualification}.
              </p>

              {/* Somewhere to go. A visitor who has just enquired is the warmest reader the site
                  gets; leaving them on a dead end wastes that. */}
              <nav aria-label={THANK_YOU.onwardLabel} className="mt-[clamp(28px,4vw,44px)] flex flex-wrap gap-[12px]">
                {THANK_YOU.onward.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={
                      "group inline-flex items-center gap-x-[12px] rounded-full px-[26px] py-[15px] text-[15px] font-medium transition-colors duration-300 " +
                      (i === 0
                        ? "bg-white text-[#242a2e] hover:bg-white/90"
                        : "border border-white/30 text-white hover:border-white/70")
                    }
                  >
                    {link.label}
                    <ArrowIcon className="block h-[12px] w-[12px] shrink-0 transition-transform duration-300 group-hover:translate-x-[3px]" />
                  </a>
                ))}
              </nav>

              {/* If it is urgent, a form receipt is not what they want to read. */}
              <p className="mt-[clamp(26px,3vw,38px)] text-sm text-white/65">
                {THANK_YOU.urgent}{" "}
                <a className="tap underline decoration-white/40 underline-offset-[4px] transition-colors hover:decoration-white" href={CONTACT.phoneHref}>
                  {CONTACT.phone}
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
