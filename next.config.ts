import type { NextConfig } from "next";

/**
 * Security response headers.
 *
 * The CSP allows 'unsafe-inline' for scripts and styles, which is not a concession but a fact of
 * the stack: every page is prerendered to static HTML, so there is no per-request nonce to issue,
 * Next emits an inline hydration bootstrap, and GSAP animates by writing inline style attributes.
 * What the policy still buys is the part that matters here — no script, frame, font or connection
 * may come from anywhere but this origin, `object-src 'none'` kills plugin embeds, and `base-uri`
 * and `form-action` stop an injected tag redirecting relative URLs or posting the form elsewhere.
 * The site takes no user input that reaches a server, so inline execution is not the live risk;
 * loading a third-party script would be.
 */
/**
 * React's development build calls eval() to rebuild stack traces, so the dev server needs
 * 'unsafe-eval' or every page throws before it renders. It is added ONLY here: the production
 * bundle never calls eval(), and shipping this to visitors would give away most of what the
 * script policy is for.
 */
const DEV = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${DEV ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${DEV ? " ws: http://localhost:*" : ""}`,
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site asks for none of these; denying them stops an embedded third party asking either.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Ignored over plain HTTP, so it is safe to declare before TLS is in front of it.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // No `output: "standalone"`. That setting exists for self-hosting in a container; Netlify's
  // Next.js runtime expects the default build output and standalone gets in its way.
  // Nothing gains from advertising the framework and version to a scanner.
  poweredByHeader: false,
  images: {
    // The optimiser was handing back the original JPEG/PNG. AVIF first, WebP behind it: this page
    // is almost entirely photography, so the format is most of the page weight.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
