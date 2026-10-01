"use client";

import { CONTACT, FOOTER, FOOTER_MENUS, REGISTRATIONS } from "./data";
import { Logo } from "../shared/Logo";
import { ButtonLink } from "../shared/Button";
import { MailFigure, PhoneFigure, PinFigure } from "../shared/figures";

/**
 * Footer. Its own black panel, ``.
 *
 * Three bands, each with one job: columns that share a baseline, a credentials strip across the
 * full width, then the legal line. The registrations were previously hover-only chips, which hid
 * the very thing a consultancy is asked to prove — they are now legible without interaction.
 */
export function Footer() {
  return (
    <footer id="contact" className="footer-main overflow-hidden bg-black pb-[40px] pt-[56px] text-[rgba(255,255,255,0.6)] lg:pt-[112px]">
      <div className="container-page">
        {/* columns, all sharing a top edge */}
        <div className="footer__inner grid grid-cols-1 gap-x-[48px] gap-y-[48px] sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.7fr)_minmax(0,0.9fr)]">
          <div className="footer__brand">
            <Logo tone="light" className="h-[36px] lg:h-[40px]" />
            <p className="mt-[20px] max-w-[320px] text-sm text-white/55">{FOOTER.brandLine}</p>
          </div>

          {FOOTER_MENUS.map((group) => (
            <nav key={group.title} aria-label={group.title} className="footer__menu">
              <h2 className="text-body font-medium text-white">{group.title}</h2>
              <ul className="mt-[16px] list-none">
                {group.links.map((l, i) => (
                  <li key={i} className="mb-[10px]">
                    <a href={l.href} className="tap text-sm transition-colors duration-300 ease-in-out hover:text-white">{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer__country">
            <h2 className="text-body font-medium text-white">{FOOTER.addressTitle}</h2>
            <address className="mt-[16px] grid grid-cols-[20px_1fr] items-start gap-x-[10px] gap-y-[10px] text-sm not-italic">
              <PinFigure className="mt-[3px] block h-[15px] w-[15px] text-[var(--color-brand-soft)]" />
              <span>{FOOTER.address.map((line) => <span key={line} className="block">{line}</span>)}</span>
              <PhoneFigure className="block h-[15px] w-[15px] text-[var(--color-brand-soft)]" />
              <a href={CONTACT.phoneHref} className="tap block transition-colors hover:text-white">{CONTACT.phone}</a>
              <MailFigure className="block h-[15px] w-[15px] text-[var(--color-brand-soft)]" />
              <a href={CONTACT.emailHref} className="tap block break-all transition-colors hover:text-white">{CONTACT.email}</a>
            </address>

            <div className="mt-[28px]">
              <ButtonLink variant="outline-light" href={FOOTER.cta.href}>{FOOTER.cta.label}</ButtonLink>
            </div>
            <p className="mt-[14px] max-w-[260px] text-xs text-white/50">{FOOTER.ctaNote}</p>
          </div>
        </div>

        {/* credentials, across the full width and legible without hovering */}
        <div className="footer__logos mt-[64px] border-t border-white/12 pt-[28px] lg:mt-[88px]">
          <h2 className="text-label font-medium uppercase text-white/50">{FOOTER.registrationsTitle}</h2>
          {/* A gold rule rather than an abbreviation: CE / SE / GV / CEOR told the reader nothing
              the title beside it did not already say, and CEOR is not a code anyone outside the
              issuing authority would recognise. */}
          <ul className="mt-[20px] grid grid-cols-1 gap-x-[40px] gap-y-[24px] sm:grid-cols-2 lg:grid-cols-4">
            {REGISTRATIONS.map((r) => (
              <li key={r.number} className="grid grid-cols-[22px_1fr] items-start gap-x-[14px]">
                <span aria-hidden="true" className="mt-[10px] block h-px w-[22px] bg-[var(--color-brand-soft)]/70" />
                <span className="block">
                  <span className="block text-sm text-white/85">{r.title}</span>
                  <span className="mt-[3px] block text-xs text-white/50">{r.issuer}</span>
                  <span className="mt-[5px] block tabular-nums text-xs text-white/55">{r.number}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* legal, full width */}
        <div className="footer__copyright mt-[48px] flex flex-col gap-y-[12px] border-t border-white/12 pt-[24px] text-xs lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            <a href={FOOTER.copyright.link.href} className="tap transition-colors hover:text-white">{FOOTER.copyright.link.label}</a>
          </p>
          <ul className="flex flex-wrap items-center gap-x-[24px] gap-y-[8px]">
            {FOOTER.copyright.links.map((l) => (
              <li key={l.label}><a href={l.href} className="tap transition-colors hover:text-white">{l.label}</a></li>
            ))}
            {FOOTER.credit && (
              <li className="opacity-65">
                {FOOTER.credit.prefix}{" "}
                {FOOTER.credit.href ? (
                  <a href={FOOTER.credit.href} target="_blank" rel="noreferrer" className="tap underline decoration-white/30 underline-offset-[4px] transition-colors hover:text-white hover:decoration-white">
                    {FOOTER.credit.label}
                  </a>
                ) : (
                  <span>{FOOTER.credit.label}</span>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
