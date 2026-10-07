"use client";

import { useEffect, useRef, useState } from "react";
import { SmoothScroll } from "../shared/SmoothScroll";
import { initAnimate } from "../shared/animate";
import { ScrollTrigger } from "../shared/gsap";
import { Header } from "../home/Header";
import { Footer } from "../home/Footer";
import { ParallaxMedia } from "../shared/ParallaxMedia";
import { ArrowIcon } from "../shared/icons";
import { BRAND, CONTACT, REGISTRATIONS } from "../home/data";
import { CONTACT_FAQ, CONTACT_PAGE } from "./data";

/** Where a successful submission lands. Kept next to the fetch so the two cannot drift apart. */
const SENT_HREF = "/thank-you";

/**
 * Contact.
 *
 * Details first, form second, and deliberately so: industrial clients phone. The number and the
 * address are the largest things on the page and both are real links — tel: and a maps query —
 * rather than text you have to copy.
 *
 * ABOUT THE FORM. It posts to Netlify Forms. The form is declared a second time as static HTML in
 * public/__forms.html, because Netlify finds forms by parsing the built HTML and a React-rendered
 * form is invisible to it; the two declarations must keep the same name and field names. There is
 * no server of our own, so submissions land in the Netlify dashboard and are emailed on from there.
 * Locally nothing is listening, so submitting shows the failure state with the phone number in it.
 */

/**
 * One question.
 *
 * A button controlling a region, not a <details>: native disclosure cannot animate its own height,
 * and the grid 0fr -> 1fr trick below opens to the answer's real height without measuring it or
 * capping it at a guessed max-height. The button owns aria-expanded and the region is labelled by
 * it, so a screen reader gets the same open/closed state the plus sign shows.
 */
function Question({ q, a, open, onToggle, index }: { q: string; a: string; open: boolean; onToggle: () => void; index: number }) {
  const id = `faq-${index}`;
  return (
    <li className="border-b border-current/15">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-start gap-x-[20px] py-[clamp(18px,2vw,26px)] text-left"
      >
        <span className="flex-1 text-h3">{q}</span>
        <span
          aria-hidden="true"
          className="relative mt-[6px] block h-[16px] w-[16px] shrink-0"
        >
          <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-current" />
          <span
            className={
              "absolute left-1/2 top-0 block h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-out " +
              (open ? "scale-y-0" : "scale-y-100")
            }
          />
        </span>
      </button>
      <div
        id={id}
        role="region"
        className={"grid transition-[grid-template-rows] duration-400 ease-out " + (open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className="overflow-hidden">
          <p className="max-w-[62ch] pb-[clamp(18px,2vw,26px)] pr-[36px] text-lead opacity-70">{a}</p>
        </div>
      </div>
    </li>
  );
}

/**
 * Boxed rather than a bottom rule. An underlined field is quieter but it is also a smaller target
 * and a weaker affordance — on a phone the tappable area was the text line alone. These are 52px
 * tall with a real border and a filled ground, and the focus state moves the border to the brand
 * rather than relying on the browser's outline.
 */
const FIELD =
  "mt-[6px] w-full rounded-[8px] border border-[#242a2e]/15 bg-[#faf8f5] px-[14px] py-[13px] text-[16px] leading-[24px] outline-none transition-colors duration-200 placeholder:text-[#242a2e]/35 focus:border-[var(--color-brand-deep)]";

export function ContactPage() {
  // One open at a time, and the first open on arrival so the block does not read as a closed wall.
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [detail, setDetail] = useState("");
  /** Left empty by people, filled in by bots. Netlify drops the submission when it has a value. */
  const [honey, setHoney] = useState("");
  /** Clicked on a successful send; see the note in `submit`. */
  const leave = useRef<HTMLAnchorElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const cleanup = initAnimate(document);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); cleanup(); };
  }, []);

  /**
   * Netlify Forms.
   *
   * The submission is posted as a form encoding to /__forms.html, the static file where the form is
   * declared for Netlify's build-time parser — a React-rendered form is invisible to it. `form-name`
   * must match that declaration or the post is rejected as an unknown form.
   *
   * This only works on Netlify. Running locally there is nothing listening, so the catch below
   * reports the failure and the page offers the email address and the phone number instead, which
   * are the routes most of these clients use anyway.
   */
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "project-enquiry",
          name, email, company, detail, "company-website": honey,
        }).toString(),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      // The in-place success state below is only a fallback. What the visitor actually lands on is
      // /thank-you, reached by clicking a real anchor rather than by calling the router:
      // PageTransition intercepts clicks, so this takes the same covered route every other
      // navigation on the site takes. Calling router.push here would swap the page with no cover.
      setStatus("sent");
      leave.current?.click();
    } catch {
      setStatus("error");
    }
  };

  const mapQuery = encodeURIComponent(`${BRAND.legalName}, ${CONTACT.address.join(", ")}`);

  return (
    <>
      <a href="#main" className="skip-to-link">Skip to content</a>
      <Header />
      <SmoothScroll>
        <main id="main" className="main-wrapper bg-white text-[#242a2e]" data-background="ebb">
          {/* ---------- the opening ----------
              One section instead of a photo band followed by a white row. The band-then-columns
              version worked but read as a spec sheet: a stack of thin rules in a narrow column
              with a flat panel beside it and nothing holding the two together.
              This puts everything a visitor needs in one composed frame — the photograph carries
              the whole width, the ways in sit on it in white, and the form is a white card resting
              on top. The card is what the eye lands on, which is correct: it is the only thing on
              this page that converts.
              The section is dark across its full width rather than split down the middle, because
              the fixed bar sits over the top of it. A half-dark, half-white split would have put
              white nav type over a white panel on the right — the same 1.00:1 fault just fixed
              elsewhere. Dark all the way across means the bar is legible before it condenses. */}
          <section className="relative w-full overflow-hidden bg-[#141719]">
            <ParallaxMedia src={CONTACT_PAGE.image} alt={CONTACT_PAGE.imageAlt} priority />
            {/* Heavy and even, not a gradient: type sits across the whole height here, not just at
                the foot, so there is no part of the picture that can be left bright. */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0f1214]/78" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[linear-gradient(180deg,rgba(10,13,15,0.55)_0%,rgba(10,13,15,0)_100%)]" />

            <div className="container-page relative pb-[clamp(48px,6vw,88px)] pt-[calc(var(--header-height,84px)+clamp(40px,6vw,96px))]">
              <div className="grid grid-cols-1 gap-x-[clamp(40px,5vw,88px)] gap-y-[clamp(36px,5vw,56px)] lg:grid-cols-[5fr_6fr]">

                {/* ways in */}
                <div className="text-white">
                  {/* These muted whites are 70/65, not the usual 50/55. On a scrimmed photograph
                      a 12px label at 50% measured 4.03:1 — under AA for small text. The picture is
                      not a flat colour, so the margin has to come from the type. */}
                  <p className="text-label uppercase text-white/70">{CONTACT_PAGE.eyebrow}</p>
                  <h1
                    className="mt-[14px] max-w-[18ch] text-h1"
                    data-animate-title
                    aria-label={`${CONTACT_PAGE.title.main} ${CONTACT_PAGE.title.accent}`}
                  >
                    {CONTACT_PAGE.title.main} <span className="type-serif">{CONTACT_PAGE.title.accent}</span>
                  </h1>
                  <p className="mt-[20px] max-w-[46ch] text-lead text-white/70">{CONTACT_PAGE.description}</p>

                  <div className="mt-[clamp(28px,4vw,44px)] flex flex-col gap-y-[clamp(18px,2vw,26px)]">
                    <a href={CONTACT.phoneHref} className="group block">
                      <span className="block text-label uppercase text-white/70">Call</span>
                      <span className="mt-[6px] block tabular-nums text-h2 leading-[1.05] decoration-white/30 underline-offset-[8px] group-hover:underline">
                        {CONTACT.phone}
                      </span>
                    </a>
                    <a href={CONTACT.emailHref} className="group block">
                      <span className="block text-label uppercase text-white/70">Email</span>
                      <span className="mt-[6px] block break-all text-h3 decoration-white/30 underline-offset-[8px] group-hover:underline">
                        {CONTACT.email}
                      </span>
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group block"
                    >
                      <span className="block text-label uppercase text-white/70">Office</span>
                      <span className="mt-[6px] block text-h3 decoration-white/30 underline-offset-[8px] group-hover:underline">
                        {CONTACT.address.join(", ")}
                      </span>
                      <span className="mt-[8px] inline-flex items-center gap-x-[8px] text-sm text-white/65">
                        Open in Maps
                        <ArrowIcon className="block h-[10px] w-[10px] shrink-0 transition-transform duration-300 group-hover:translate-x-[3px]" />
                      </span>
                    </a>
                  </div>

                  <p className="mt-[clamp(26px,3vw,40px)] max-w-[46ch] border-t border-white/15 pt-[16px] text-sm text-white/65">
                    {CONTACT_PAGE.replyNote} {CONTACT_PAGE.answeredBy}{" "}
                    <span className="text-white">{CONTACT.person}</span>, {CONTACT.qualification}.
                  </p>
                </div>

                {/* the form, resting on the picture */}
                <div className="self-start rounded-[12px] bg-white p-[clamp(24px,3vw,44px)] text-[#242a2e] shadow-[0_30px_70px_rgba(6,9,11,0.42)]">
                  <h2 className="text-h3" aria-label={`${CONTACT_PAGE.formTitle.main} ${CONTACT_PAGE.formTitle.accent}`}>
                    {CONTACT_PAGE.formTitle.main} <span className="type-serif">{CONTACT_PAGE.formTitle.accent}</span>
                  </h2>
                  {status === "sent" ? (
                    <div className="mt-[clamp(20px,2vw,28px)]" role="status">
                      <p className="text-h3">Thank you — that has reached us.</p>
                      <p className="mt-[12px] text-sm opacity-70">{CONTACT_PAGE.replyNote}</p>
                      <button
                        type="button"
                        onClick={() => { setStatus("idle"); setName(""); setEmail(""); setCompany(""); setDetail(""); }}
                        className="mt-[18px] text-sm font-medium underline decoration-current/30 underline-offset-[6px] hover:decoration-current"
                      >
                        Send another
                      </button>
                    </div>
                  ) : (
                    <>
                    {/* Not a link anyone can reach: it exists so the send can navigate through the
                        same click path as every other route change. aria-hidden and tabIndex keep it
                        out of the tab order and off the accessibility tree. */}
                    <a ref={leave} href={SENT_HREF} aria-hidden="true" tabIndex={-1} className="hidden" />
                    <form
                      name="project-enquiry"
                      method="POST"
                      data-netlify="true"
                      onSubmit={submit}
                      className="mt-[clamp(20px,2vw,28px)] flex flex-col gap-y-[16px]"
                    >
                      <input type="hidden" name="form-name" value="project-enquiry" />
                      {/* Honeypot: off-screen and hidden from assistive tech, so only a bot fills it. */}
                      <p className="hidden" aria-hidden="true">
                        <label>
                          Do not fill this in
                          <input
                            tabIndex={-1}
                            autoComplete="off"
                            name="company-website"
                            value={honey}
                            onChange={(e) => setHoney(e.target.value)}
                          />
                        </label>
                      </p>
                      <label className="block">
                        <span className="text-label uppercase opacity-70">Your name</span>
                        <input className={FIELD} name="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" autoComplete="name" />
                      </label>
                      <label className="block">
                        <span className="text-label uppercase opacity-70">Email</span>
                        <input className={FIELD} name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email" />
                      </label>
                      <label className="block">
                        <span className="text-label uppercase opacity-70">Company</span>
                        <input className={FIELD} name="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" autoComplete="organization" />
                      </label>
                      <label className="block">
                        <span className="text-label uppercase opacity-70">The project</span>
                        <textarea
                          className={FIELD + " min-h-[132px] resize-y"}
                          name="detail"
                          required
                          value={detail}
                          onChange={(e) => setDetail(e.target.value)}
                          placeholder={"Plot:\nUse:\nStage:\nDeadline:"}
                        />
                      </label>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group mt-[8px] inline-flex w-full items-center justify-center gap-x-[12px] rounded-full bg-[#242a2e] px-[26px] py-[16px] text-[15px] font-medium text-white transition-colors duration-300 hover:bg-[var(--color-brand-deep)] focus-visible:bg-[var(--color-brand-deep)] disabled:opacity-60 sm:w-max"
                      >
                        {status === "sending" ? "Sending…" : "Send the enquiry"}
                        <ArrowIcon className="block h-[12px] w-[12px] shrink-0 transition-transform duration-300 group-hover:translate-x-[3px]" />
                      </button>
                      {status === "error" && (
                        <p className="text-sm text-[#b3261e]" role="alert">
                          That did not send. Please email{" "}
                          <a className="underline underline-offset-[4px]" href={CONTACT.emailHref}>{CONTACT.email}</a>{" "}
                          or call <a className="underline underline-offset-[4px]" href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
                        </p>
                      )}
                      {/*
                        Notice and consent, not a cookie banner. A form is personal data the
                        visitor chooses to hand over, so what the law wants is that they are told
                        what happens to it before they send it — India's DPDP Act 2023 calls this
                        notice. A banner would be the wrong instrument: it asks about storing
                        things on their device, and this site stores nothing.
                      */}
                      <p className="text-sm opacity-70">
                        {CONTACT_PAGE.formNote}{" "}
                        <a href="/privacy" className="tap underline decoration-current/40 underline-offset-[4px] transition-colors hover:decoration-current">
                          How we handle it
                        </a>
                        .
                      </p>
                    </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ---------- what to send ----------
              Self-qualification, which both references call for: say what a useful enquiry contains
              rather than letting someone send three words and wait. */}
          <section className="container-page mb-section pt-section">
            <p className="text-label uppercase text-[var(--color-brand-deep)]">{CONTACT_PAGE.sendTitle}</p>
            <ul className="mt-[clamp(20px,2.5vw,34px)] grid grid-cols-1 gap-x-[clamp(32px,5vw,80px)] sm:grid-cols-2" data-animate="batch">
              {CONTACT_PAGE.send.map((item, i) => (
                <li key={item.title} data-animate-child>
                  <span className="flex items-baseline gap-x-[18px] border-b border-current/15 py-[clamp(16px,1.8vw,24px)]">
                    <span className="tabular-nums text-label opacity-40">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">
                      <span className="block text-h3">{item.title}</span>
                      <span className="mt-[6px] block text-sm opacity-60">{item.note}</span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ---------- registered practice ----------
              Out of the dark frame and onto the page. It is corroboration, not a way in, so it
              belongs after the enquiry rather than competing with it. */}
          <section className="container-page mb-section">
            <p className="text-label uppercase text-[var(--color-brand-deep)]">{CONTACT_PAGE.trustTitle}</p>
            <div className="mt-[clamp(20px,2.4vw,32px)] grid grid-cols-1 gap-x-[clamp(24px,3vw,44px)] border-t border-current/12 sm:grid-cols-2 lg:grid-cols-4" data-animate="batch">
              {REGISTRATIONS.map((r) => (
                <div key={r.number} className="border-b border-current/12 py-[clamp(18px,2vw,28px)] lg:border-b-0" data-animate-child>
                  <p className="text-h3">{r.title}</p>
                  <p className="mt-[8px] text-sm opacity-60">{r.issuer}</p>
                  <p className="mt-[4px] tabular-nums text-[12px] leading-[20px] text-[var(--color-brand-deep)]">{r.number}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ---------- questions ----------
              Below the form, which is where both references put the FAQ: it answers the objection
              that stops someone sending, so it belongs after the thing they might not send.
              A standalone /faq would become a dumping ground and compete with the service pages in
              search; statutory questions belong on the stage they concern. */}
          <section className="container-page mb-section">
            <div className="grid grid-cols-1 gap-x-[clamp(32px,6vw,90px)] gap-y-[24px] lg:grid-cols-[4fr_7fr]">
              <h2 className="text-h1" aria-label={`${CONTACT_PAGE.faqTitle.main} ${CONTACT_PAGE.faqTitle.accent}`}>
                {CONTACT_PAGE.faqTitle.main} <span className="type-serif">{CONTACT_PAGE.faqTitle.accent}</span>
              </h2>
              <ul className="border-t border-current/15">
                {CONTACT_FAQ.map((item, i) => (
                  <Question
                    key={item.q}
                    index={i}
                    q={item.q}
                    a={item.a}
                    open={openFaq === i}
                    onToggle={() => setOpenFaq((v) => (v === i ? null : i))}
                  />
                ))}
              </ul>
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
