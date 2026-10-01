"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CloseIcon, ChevronDownIcon } from "../shared/icons";
import { ButtonLink } from "../shared/Button";
import { CONTACT, HEADER, MEGA_MENU } from "./data";
import { Logo } from "../shared/Logo";

/**
 * Mobile navigation (<992px only).
 *
 * A full-screen sheet rather than a side panel: its own bar with the wordmark and a close button,
 * then an accordion. Tapping a section with children expands them in place; tapping one without
 * children follows the link. Contact details and the enquiry call to action sit at the bottom,
 * where a thumb can reach them.
 */
const panelKey = (label: string) => label.toLowerCase().replace(/\s*&\s*/g, "-").replace(/\s+/g, "-");

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    // The sheet covers the page, so stop the page behind it from scrolling.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  const openKey = open ? expanded : null;

  return (
    <div
      id="mobile-menu"
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[998] flex flex-col bg-white text-[#242a2e] transition-[opacity,transform] duration-400 ease-out lg:hidden",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-[12px] opacity-0",
      )}
    >
      {/* its own bar, so the sheet is self-contained */}
      <div className="flex shrink-0 items-center justify-between border-b border-[#eceae6] px-[24px] py-[16px]">
        <Logo className="h-[26px]" tone="dark" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-[6px] flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full border border-[#e6e4e0]"
        >
          <CloseIcon className="block h-[13px] w-[13px]" />
        </button>
      </div>

      <nav aria-label="Primary" className="min-h-0 flex-1 overflow-y-auto px-[24px] py-[8px]">
        <ul className="list-none">
          {MEGA_MENU.items.map((item) => {
            const key = panelKey(item.label);
            const panel = MEGA_MENU.panels[key];
            const links = panel ? [...panel.groups.flatMap((g) => g.links), ...panel.links] : [];
            const hasChildren = item.hasSub && links.length > 0;
            const isOpen = openKey === key;

            return (
              <li key={item.label} className="border-b border-[#f0eeea]">
                {hasChildren ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : key)}
                      className="flex min-h-[48px] w-full cursor-pointer items-center justify-between gap-x-[16px] py-[16px] text-left text-h2"
                    >
                      {item.label}
                      <ChevronDownIcon
                        className={cn("block h-[12px] w-[13px] shrink-0 text-[var(--color-brand)] transition-transform duration-300 ease-in-out", isOpen && "rotate-180")}
                      />
                    </button>
                    <div className={cn("grid transition-[grid-template-rows] duration-400 ease-in-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                      <div className="overflow-hidden">
                        <ul className="list-none pb-[16px]">
                          {panel?.header ? (
                            <li className="mb-[10px]">
                              <a href={panel.header.href} className="flex min-h-[44px] items-center py-[10px] text-lead font-medium text-[var(--color-brand)]">{panel.header.label}</a>
                            </li>
                          ) : null}
                          {links.map((l, i) => (
                            <li key={i}>
                              <a href={l.href} onClick={onClose} className="flex min-h-[44px] items-center py-[10px] text-lead text-[rgba(36,42,46,0.72)]">{l.label}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <a href={item.href} onClick={onClose} className="flex min-h-[48px] items-center py-[16px] text-h2">{item.label}</a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* thumb zone: how to reach them, and the one action worth taking */}
      <div className="shrink-0 border-t border-[#eceae6] px-[24px] pb-[24px] pt-[20px]">
        <ButtonLink variant="outline-ink" href={HEADER.cta.href} className="w-full justify-between">
          {HEADER.cta.label}
        </ButtonLink>
        <div className="mt-[16px] text-sm text-[rgba(36,42,46,0.6)]">
          <a href={CONTACT.phoneHref} className="flex min-h-[44px] items-center font-medium text-[#242a2e]">{CONTACT.phone}</a>
          <a href={CONTACT.emailHref} className="flex min-h-[44px] items-center">{CONTACT.email}</a>
          <p className="mt-[8px] text-xs">{CONTACT.address.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
