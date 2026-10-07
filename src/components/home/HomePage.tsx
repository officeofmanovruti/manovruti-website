"use client";

import { useEffect, useState } from "react";
import { SmoothScroll } from "../shared/SmoothScroll";
import { initAnimate } from "../shared/animate";
import { ScrollTrigger } from "../shared/gsap";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HomeScroll } from "./HomeScroll";
import { Services } from "./Services";
import { Journey } from "./Journey";
import { WhyChoose } from "./WhyChoose";
import { Capability } from "./Capability";
import { Clientele } from "./Clientele";
import { Insights } from "./Insights";
import { Credentials } from "./Credentials";
import { Prefooter } from "./Prefooter";
import { Footer } from "./Footer";

/**
 * Page assembly (see docs/research — the layout study this page inherits its geometry from).
 *
 * The fixed header sits OUTSIDE the ScrollSmoother wrapper so it is not transformed with the content.
 * Everything else lives inside #smooth-wrapper > #smooth-content.
 *
 * On mount the reveal/background/header triggers are registered once (the source does this on
 * DOMContentLoaded, or after the intro dispatches "IntroAnimationAfterReveal"), then ScrollTrigger is
 * refreshed after fonts settle so pinned measurements are correct.
 */
export function HomePage() {
  const [introPlaying] = useState(false);

  useEffect(() => {
    const cleanup = initAnimate(document);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); cleanup(); };
  }, []);

  return (
    <>
      <a href="#main" className="skip-to-link">Skip to content</a>
      <Header />
      <SmoothScroll>
        <main id="main" className="main-wrapper">
          <Hero introPlaying={introPlaying} />
          <HomeScroll />
          <Services />
          <Journey />
          <WhyChoose />
          <Capability />
          <Clientele />
          <Insights />
          <Credentials />
          <Prefooter />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
