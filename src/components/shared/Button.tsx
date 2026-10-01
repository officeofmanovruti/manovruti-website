import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowIcon, ContactChevronIcon } from "./icons";

/**
 * The `.btn` system. Every value below was measured from the rendered page at 18px root text,
 * so the variants stay in step with the type scale rather than carrying their own sizes.
 *
 * Base `.btn--outline`/`.btn--solid` (font 18px/28px, mobile 16px/25.6px):
 *   display inline-block; padding .5556em .7778em .5556em 1.0556em (icon-right)  →  10px 14px 10px 19px
 *                         padding .5556em 1.0556em .5556em .7778em (icon-left)   →  10px 19px 10px 14px
 *   border-radius 100px; border 1px solid var(--btn-outline); background var(--btn-bg); color var(--btn-color)
 *   transition color .3s, border-color .3s, background .3s ease-in-out
 *   .btn__inner: grid, align-items center, column-gap 10px (icon-right) / 1.0625em=19.125px (icon-left); label text-align left
 *   .btn__icon: 25x25, font-size 12px, color var(--btn-icon-color); .btn__icon-inner: flex centre, 25x25, radius 100%,
 *   background var(--btn-icon-bg), box-shadow inset 0 0 0 1px var(--btn-icon-border, transparent); svg 12x12 fill currentColor,
 *   transition transform .3s; hover → svg translateX(3px) (icon-right) / translateX(-3px) (icon-left)
 * Variants (rest → hover):
 *   outline-auto   outline rgba(36,42,46,.2) color #242a2e icon #242a2e on rgba(36,42,46,.1)  → bg #242a2e, outline #242a2e, color #fff
 *                     (the source hovers to #fff; our ground is #fff, so that hover is invisible — see VARIANT_VARS)
 *     [data-text=light] outline rgba(255,255,255,.2) color #fff icon #fff on rgba(255,255,255,.1) → bg #fff outline #fff color #242a2e icon #242a2e on rgba(36,42,46,.1)
 *   outline-gold  outline rgba(255,255,255,.2) color #fff icon #242a2e on #d2a468 → bg #fff outline #fff color #242a2e
 *   outline-light outline rgba(255,255,255,.2) color #fff icon #242a2e on #fff → bg #fff outline #fff color #242a2e icon #242a2e on rgba(36,42,46,.1)
 *   solid-gold      bg #b5813c color #1b2126 icon on rgba(27,33,38,.1) → (on [data-text=light]) bg #fff
 *                     (#242a2e on this bronze measured 4.27:1; the deeper ink clears AA at 4.68)
 *   solid-white       bg #fff color #242a2e icon #fff on #1b2126; `.btn--medium` font-weight 500
 *   cta               header CONTACT: 19px/18px 600 uppercase tracking 1px, padding 10.56px 4px 10.56px 14.78px, icon 8x15 half-circle LEFT, gap 10px
 */
export type ButtonVariant =
  | "outline-auto"
  | "outline-ink"
  | "outline-gold"
  | "outline-light"
  | "solid-gold"
  | "solid-white"
  | "cta";

const VARIANT_VARS: Record<ButtonVariant, string> = {
  // The light-panel hover inverts to ink rather than to the source's white fill. The source sat on
  // a bone ground, where a white pill was the hover; our ground is pure #ffffff, so a white fill
  // with a white outline is the button disappearing — measured 1.00:1 for both pill and ring,
  // leaving only the label. Ink fill with white type is the same inversion `outline-ink` already
  // uses for the menu overlays. The [data-text=light] branch below is untouched: on a dark panel a
  // white fill is correct and is what the source does.
  "outline-auto":
    "[--btn-outline:rgba(36,42,46,.2)] [--btn-color:#242a2e] [--btn-icon-color:#242a2e] [--btn-icon-bg:rgba(36,42,46,.1)] " +
    "hover:[--btn-bg:#242a2e] hover:[--btn-outline:#242a2e] hover:[--btn-color:#fff] hover:[--btn-icon-color:#242a2e] hover:[--btn-icon-bg:#fff] " +
    "focus-visible:[--btn-bg:#242a2e] focus-visible:[--btn-outline:#242a2e] focus-visible:[--btn-color:#fff] focus-visible:[--btn-icon-color:#242a2e] focus-visible:[--btn-icon-bg:#fff] " +
    "[[data-text=light]_&]:[--btn-outline:rgba(255,255,255,.2)] [[data-text=light]_&]:[--btn-color:#fff] [[data-text=light]_&]:[--btn-icon-color:#fff] [[data-text=light]_&]:[--btn-icon-bg:rgba(255,255,255,.1)] " +
    "[[data-text=light]_&:hover]:[--btn-bg:#fff] [[data-text=light]_&:hover]:[--btn-outline:#fff] [[data-text=light]_&:hover]:[--btn-color:#242a2e] [[data-text=light]_&:hover]:[--btn-icon-color:#242a2e] [[data-text=light]_&:hover]:[--btn-icon-bg:rgba(36,42,46,.1)]",
  /** For overlays that are always light (the menus), so it ignores the page's data-text state. */
  "outline-ink":
    "[--btn-outline:rgba(36,42,46,.25)] [--btn-color:#242a2e] [--btn-icon-color:#242a2e] [--btn-icon-bg:rgba(36,42,46,.08)] " +
    "hover:[--btn-bg:#242a2e] hover:[--btn-outline:#242a2e] hover:[--btn-color:#fff] hover:[--btn-icon-color:#242a2e] hover:[--btn-icon-bg:#fff] " +
    "focus-visible:[--btn-bg:#242a2e] focus-visible:[--btn-outline:#242a2e] focus-visible:[--btn-color:#fff]",
  "outline-gold":
    "[--btn-outline:rgba(255,255,255,.2)] [--btn-color:#fff] [--btn-icon-color:#242a2e] [--btn-icon-bg:#d2a468] hover:[--btn-bg:#fff] hover:[--btn-outline:#fff] hover:[--btn-color:#242a2e] focus-visible:[--btn-bg:#fff] focus-visible:[--btn-outline:#fff] focus-visible:[--btn-color:#242a2e]",
  "outline-light":
    "[--btn-outline:rgba(255,255,255,.2)] [--btn-color:#fff] [--btn-icon-color:#242a2e] [--btn-icon-bg:#fff] hover:[--btn-bg:#fff] hover:[--btn-outline:#fff] hover:[--btn-color:#242a2e] hover:[--btn-icon-color:#242a2e] hover:[--btn-icon-bg:rgba(36,42,46,.1)] focus-visible:[--btn-bg:#fff] focus-visible:[--btn-outline:#fff] focus-visible:[--btn-color:#242a2e]",
  "solid-gold":
    "[--btn-bg:#b5813c] [--btn-color:#1b2126] [--btn-icon-color:#1b2126] [--btn-icon-bg:rgba(27,33,38,.1)] [[data-text=light]_&:hover]:[--btn-bg:#fff] [[data-text=light]_&:focus-visible]:[--btn-bg:#fff]",
  "solid-white": "[--btn-bg:#fff] [--btn-color:#242a2e] [--btn-icon-color:#fff] [--btn-icon-bg:#1b2126] font-medium",
  cta: "[--btn-color:var(--text-color)] [--btn-icon-color:var(--text-color)]",
};

interface BaseProps {
  variant?: ButtonVariant;
  /** Icon side. Default right. */
  iconSide?: "left" | "right";
  /** Icon circle size in px (25 default; 30 for the prefooter / design buttons). */
  iconSize?: number;
  /** Extra classes on the outer element. */
  className?: string;
  /** Screen-reader-only suffix for the label. */
  srLabel?: string;
  children: ReactNode;
}

function Inner({ children, variant = "outline-auto", iconSide = "right", iconSize = 25, srLabel }: BaseProps) {
  const isCta = variant === "cta";
  return (
    <>
      <span className={cn("btn__label block whitespace-nowrap text-left font-medium", iconSide === "left" && "order-2")}>
        {children}
        {srLabel ? <span className="sr-hidden">{srLabel}</span> : null}
      </span>
      <span
        className={cn("btn__icon block shrink-0 text-[12px] transition-colors duration-300 ease-in-out [color:var(--btn-icon-color)]", iconSide === "left" && "order-1")}
        style={isCta ? undefined : { width: iconSize, height: iconSize }}
      >
        {isCta ? (
          <ContactChevronIcon className="block h-[15px] w-[8px]" />
        ) : (
          <span
            className="btn__icon-inner relative flex items-center justify-center rounded-full transition-[background,box-shadow] duration-300 ease-in-out [background:var(--btn-icon-bg)] [box-shadow:inset_0_0_0_1px_var(--btn-icon-border,transparent)]"
            style={{ width: iconSize, height: iconSize }}
          >
            <ArrowIcon
              className={cn(
                "block h-[12px] w-[12px] transition-[transform,opacity] duration-300 ease-in-out",
                iconSide === "left" ? "group-hover/btn:-translate-x-[3px] group-focus-visible/btn:-translate-x-[3px]" : "group-hover/btn:translate-x-[3px] group-focus-visible/btn:translate-x-[3px]",
              )}
            />
          </span>
        )}
      </span>
    </>
  );
}

function outerClass({ variant = "outline-auto", iconSide = "right", className }: BaseProps) {
  const isCta = variant === "cta";
  const solid = variant.startsWith("solid");
  return cn(
    // The button IS the flex row. An intermediate flex/grid wrapper inside an inline-block did not
    // contribute its children's widths to the box, collapsing every pill to padding + icon.
    "btn group/btn inline-flex items-center justify-between cursor-pointer text-center leading-[1.6] [color:var(--btn-color)] [background:var(--btn-bg,transparent)]",
    isCta
      ? "gap-x-[10px] px-[4px] pl-[14.78px] py-[10.56px] text-[18px] font-semibold uppercase leading-[18px] tracking-[1px] transition-colors duration-300 ease-in-out"
      : cn(
          "rounded-[100px] text-[16px] md:text-[18px] transition-[color,border-color,background] duration-300 ease-in-out",
          iconSide === "left" ? "gap-x-[1.0625em]" : "gap-x-[10px]",
          solid ? "border-0" : "border [border-color:var(--btn-outline)]",
          iconSide === "left" ? "py-[.5556em] pl-[.7778em] pr-[1.0556em]" : "py-[.5556em] pl-[1.0556em] pr-[.7778em]",
        ),
    VARIANT_VARS[variant],
    className,
  );
}

export function ButtonLink(props: BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">) {
  const { variant, iconSide, iconSize, className, srLabel, children, ...rest } = props;
  return (
    <a className={outerClass({ variant, iconSide, className, children })} {...rest}>
      <Inner variant={variant} iconSide={iconSide} iconSize={iconSize} srLabel={srLabel}>
        {children}
      </Inner>
    </a>
  );
}

export function Button(props: BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  const { variant, iconSide, iconSize, className, srLabel, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={outerClass({ variant, iconSide, className, children })} {...rest}>
      <Inner variant={variant} iconSide={iconSide} iconSize={iconSize} srLabel={srLabel}>
        {children}
      </Inner>
    </button>
  );
}
