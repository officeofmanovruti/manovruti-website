import NextImage from "next/image";
import { cn } from "@/lib/utils";

/**
 * A photograph that fills its positioned parent. `.image-cover` is absolute inset-0 object-cover,
 * so the parent supplies the box and this supplies the picture.
 *
 * This was a plain <img> for a while, on the grounds that these boxes are driven by GSAP and the
 * intrinsic sizing has to stay with the parent. `fill` does exactly that — it never contributes a
 * size — and the cost of the plain tag was that every photograph was served as its raw 1800px
 * JPEG whatever box it landed in: 2.8 MB of images before a single scroll, for a page whose
 * largest photograph is displayed at 1440px and whose smallest is a 420px card. Through the
 * optimiser the same hero frame is 225 KB of AVIF instead of 555 KB of JPEG.
 *
 * It still renders an <img>, so the GSAP selectors that reach for `.section__full-image img`
 * continue to work.
 */
export function Media({
  src,
  alt,
  className,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <NextImage
      src={src}
      alt={alt}
      fill
      // Without this the optimiser has to assume the full viewport and picks the largest variant.
      sizes={sizes ?? "100vw"}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      className={cn("image-cover", className)}
    />
  );
}
