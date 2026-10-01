"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "../shared/icons";
import { MEGA_MENU } from "./data";

/**
 * Desktop navigation (>=992px): a visible horizontal bar with hover/focus dropdowns.
 *
 * A consultancy's services are the reason people visit, so they are on the page rather than behind
 * a hamburger. Each item with children opens a panel anchored beneath it; the panel closes on
 * Escape, on pointer leave, and when focus moves out of the group.
 */
const panelKey = (label: string) => label.toLowerCase().replace(/\s*&\s*/g, "-").replace(/\s+/g, "-");

export function DesktopNav() {
  const [open, setOpen] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); if (closeTimer.current) clearTimeout(closeTimer.current); };
  }, []);

  // A short delay stops the panel flickering when the pointer crosses the gap to it.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };
  const cancelClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };

  return (
    <nav ref={rootRef} aria-label="Primary" className="hidden lg:block" onMouseLeave={scheduleClose}>
      <ul className="flex items-center gap-x-[6px]">
        {MEGA_MENU.items.map((item) => {
          const key = panelKey(item.label);
          const panel = MEGA_MENU.panels[key];
          const groups = panel?.groups ?? [];
          const flat = panel ? [...groups.flatMap((g) => g.links), ...panel.links] : [];
          const hasPanel = item.hasSub && flat.length > 0;
          const isOpen = open === key;

          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => { cancelClose(); setOpen(hasPanel ? key : null); }}
              onFocus={() => { cancelClose(); setOpen(hasPanel ? key : null); }}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose(); }}
            >
              <a
                href={item.href}
                aria-expanded={hasPanel ? isOpen : undefined}
                className="group flex items-center gap-x-[6px] whitespace-nowrap px-[16px] py-[10px] text-sm font-medium transition-opacity duration-300 ease-in-out hover:opacity-70"
              >
                {item.label}
                {hasPanel ? (
                  <ChevronDownIcon className={cn("block h-[9px] w-[10px] shrink-0 transition-transform duration-300 ease-in-out", isOpen && "rotate-180")} />
                ) : null}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-x-[14px] bottom-[4px] block h-px origin-left bg-[var(--color-brand)] transition-transform duration-300 ease-in-out",
                    isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </a>

              {hasPanel ? (
                <div
                  onMouseEnter={cancelClose}
                  className={cn(
                    "absolute left-1/2 top-full z-[2] -translate-x-1/2 pt-[10px] transition-[opacity,transform] duration-300 ease-out",
                    isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-[6px] opacity-0",
                  )}
                >
                  <div
                    className={cn(
                      // grouped panels need room for two columns of service names; flat lists do not
                      "border border-[rgba(36,42,46,0.08)] bg-white p-[24px] text-[#242a2e] shadow-[0_24px_60px_rgba(0,0,0,0.14)]",
                      groups.length > 1 ? "w-[min(620px,calc(100vw-80px))]" : "w-[max-content] min-w-[240px] max-w-[min(360px,calc(100vw-80px))]",
                    )}
                  >
                    {groups.length ? (
                      <div className={cn("grid gap-x-[32px] gap-y-[16px]", groups.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
                        {groups.map((g) => (
                          <div key={g.title}>
                            <h3 className="mb-[10px] whitespace-nowrap text-label font-medium uppercase text-[var(--color-brand)]">{g.title}</h3>
                            <ul className="list-none">
                              {g.links.map((l, i) => (
                                <li key={i}>
                                  <a href={l.href} className="block whitespace-nowrap py-[5px] text-sm transition-colors duration-300 ease-in-out hover:text-[var(--color-brand)]">
                                    {l.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="list-none">
                        {flat.map((l, i) => (
                          <li key={i}>
                            <a href={l.href} className="block whitespace-nowrap py-[6px] text-sm transition-colors duration-300 ease-in-out hover:text-[var(--color-brand)]">
                              {l.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}

                    {panel?.header ? (
                      <a
                        href={panel.header.href}
                        className="mt-[16px] inline-flex items-center gap-x-[8px] border-t border-[rgba(36,42,46,0.1)] pt-[16px] text-sm font-medium text-[var(--color-brand)]"
                      >
                        {panel.header.label}
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
