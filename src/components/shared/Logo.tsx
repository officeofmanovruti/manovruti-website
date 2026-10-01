import { cn } from "@/lib/utils";

const BRAND_DIR = "/manovruti/brand";

/**
 * The horizontal lockup: mark plus wordmark, no taglines and no ® — neither survives below about
 * 90px tall, which is well above any header. Both tones are rendered and cross-faded by the page's
 * `data-text` state so the logo tracks the page colour without any JavaScript. Inside the
 * header a stronger rule overrides that with the bar's own tone — see globals.css.
 */
export function Logo({
  className,
  variant = "lockup",
  tone = "auto",
  alt = "Manovruti",
}: {
  className?: string;
  variant?: "lockup" | "mark" | "stacked";
  /** "auto" follows the page's data-text state; the fixed tones are for surfaces that never change. */
  tone?: "auto" | "dark" | "light";
  alt?: string;
}) {
  const base = variant === "mark" ? "mark" : variant === "stacked" ? "lockup" : "lockup-h";

  if (tone !== "auto") {
    return (
      <span className={cn("relative block", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed-height brand asset */}
        <img src={`${BRAND_DIR}/${base}-${tone}.png`} alt={alt} className="block h-full w-auto" />
      </span>
    );
  }

  return (
    <span className={cn("relative block", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed-height brand asset */}
      <img
        src={`${BRAND_DIR}/${base}-dark.png`}
        alt={alt}
        data-logo="dark"
        className="block h-full w-auto transition-opacity duration-300 ease-in-out [[data-text=light]_&]:opacity-0"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- paired light tone, cross-faded */}
      <img
        src={`${BRAND_DIR}/${base}-light.png`}
        alt=""
        aria-hidden="true"
        data-logo="light"
        className="absolute inset-0 block h-full w-auto opacity-0 transition-opacity duration-300 ease-in-out [[data-text=light]_&]:opacity-100"
      />
    </span>
  );
}
