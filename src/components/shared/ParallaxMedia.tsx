import { Media } from "./Media";

/**
 * A full-bleed photograph that drifts against its own frame as the page scrolls.
 *
 * Measured off the reference and first used on the service pages: its image gains about 72px on
 * the wrapper over 1200px of scroll, which is 1.06x the page's own rate — exactly what
 * ScrollSmoother's `data-speed` takes. The layer is 116% tall and offset by 8% so the whole travel
 * happens inside the crop and no edge is ever exposed.
 *
 * ScrollSmoother only runs effects at 992px and up. Below that the layer simply sits where it is,
 * which costs an 8% crop and nothing else — no JavaScript, no fallback, nothing to go wrong.
 *
 * THE PARENT MUST BE `relative` AND `overflow-hidden`, or the oversized layer will escape its box.
 */
export function ParallaxMedia({
  src,
  alt,
  /*
   * Not "100vw". These frames are full-bleed in width but TALL, and the picture is object-cover on
   * a landscape source — so the height decides the crop, and the browser needs a source wider than
   * the viewport to fill it. On a phone the frame is roughly 390x650 against a 3:2 source, which
   * has to render about 1.5x the viewport width before it covers. Declaring 100vw there had Next
   * serving an 828px variant where about 1200px of real pixels were being displayed.
   *
   * From 992px the frames are wide rather than tall, so width drives the crop again and 100vw is
   * correct — and every source here is under 1800px, so Next caps it there rather than inventing
   * pixels.
   */
  sizes = "(min-width: 992px) 100vw, 150vw",
  priority = false,
  /** 1 is no drift. Above 1 the picture outruns the page, which is the direction that reads well. */
  speed = 1.06,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  speed?: number;
}) {
  return (
    <div className="absolute inset-x-0 -top-[8%] h-[116%]" data-speed={String(speed)}>
      <Media src={src} alt={alt} sizes={sizes} priority={priority} />
    </div>
  );
}
