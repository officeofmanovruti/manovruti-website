"use client";

import { useEffect } from "react";
import { SmoothScroll } from "../shared/SmoothScroll";
import { initAnimate } from "../shared/animate";
import { ScrollTrigger } from "../shared/gsap";
import { Header } from "../home/Header";
import { Footer } from "../home/Footer";
import type { LegalDoc } from "./data";

/**
 * Privacy and terms share one layout: a dark title band, then a single measured column.
 *
 * No rail, no share row, no related reading. These pages are consulted, not read through, so the
 * headings do the navigating and anything else would be decoration on a document whose whole job
 * is to be plain. The measure matches the Insights article body so the two read alike.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
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
          <section className="w-full bg-[#1b2126] text-white">
            <div
              data-frame="flat"
              data-frame-tone="dark"
              className="container-page pb-[clamp(40px,5vw,76px)] pt-[calc(var(--header-height,84px)+clamp(36px,5vw,80px))]"
            >
              <p className="text-label uppercase text-[var(--color-brand-soft)]">{doc.eyebrow}</p>
              <h1 className="mt-[14px] max-w-[18ch] text-display" data-animate-title>{doc.title}</h1>
              <p className="mt-[clamp(18px,2vw,26px)] max-w-[58ch] text-lead text-white/70">{doc.standfirst}</p>
              <p className="mt-[clamp(20px,2.5vw,32px)] text-sm text-white/55">Last updated {doc.updated}</p>
            </div>
          </section>

          <section className="container-page mb-section pt-[clamp(44px,5vw,80px)]">
            <div className="w-full max-w-[1000px]">
              {doc.sections.map((s) => (
                <section key={s.heading} className="mt-[clamp(40px,4.5vw,64px)] first:mt-0">
                  <h2 className="text-h2 before:mb-[18px] before:block before:h-[3px] before:w-[28px] before:bg-[var(--color-brand)] before:content-['']">
                    {s.heading}
                  </h2>
                  {s.body.map((t) => (
                    <p key={t.slice(0, 28)} className="mt-[20px] text-[19px] leading-[1.62] opacity-85 sm:text-[21px]">
                      {t}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="mt-[20px] flex flex-col gap-y-[12px]">
                      {s.list.map((t) => (
                        <li
                          key={t.slice(0, 28)}
                          className="relative pl-[26px] text-[19px] leading-[1.62] opacity-85 before:absolute before:left-0 before:top-[0.62em] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[var(--color-brand)] before:content-[''] sm:text-[21px]"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
