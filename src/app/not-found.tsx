import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/shared/Button";
import { Logo } from "@/components/shared/Logo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * 404. Deliberately standalone: it carries no header, no footer and no ScrollSmoother, because a
 * missing page should render instantly and cannot assume any of the scroll machinery initialised.
 * The routes offered are the four a visitor arriving on a dead link is most likely to want.
 */
export default function NotFound() {
  const routes = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <main className="flex min-h-svh flex-col bg-[#1b2126] text-white" data-text="light">
      <div className="container-page flex flex-1 flex-col justify-center py-[clamp(56px,10vh,120px)]">
        <Link href="/" aria-label="Manovruti — home" className="block">
          <Logo tone="light" className="h-[34px] w-fit" />
        </Link>

        <p className="mt-[clamp(48px,8vh,96px)] text-label uppercase text-[var(--color-brand-soft)]">Error 404</p>
        <h1 className="mt-[14px] max-w-[16ch] text-display">This page does not exist</h1>
        <p className="mt-[24px] max-w-[52ch] text-lead text-white/70">
          The link may be out of date, or the address mistyped. Everything the site holds is reachable
          from the pages below.
        </p>

        <nav aria-label="Main sections" className="mt-[clamp(32px,4vw,48px)] flex flex-wrap items-center gap-x-[14px] gap-y-[12px]">
          {routes.map((r) => (
            <ButtonLink key={r.href} href={r.href} variant="outline-light">
              {r.label}
            </ButtonLink>
          ))}
        </nav>
      </div>
    </main>
  );
}
