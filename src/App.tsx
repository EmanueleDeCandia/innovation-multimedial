import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import { AppStateProvider } from "@/lib/app-state";
import { prefersReducedMotion } from "@/lib/hooks";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { SocialProof } from "@/sections/SocialProof";
import { Manifesto } from "@/sections/Manifesto";
import { Stakeholders } from "@/sections/Stakeholders";
import { Ecosystem } from "@/sections/Ecosystem";
import { Showcase } from "@/sections/Showcase";
import { Impact } from "@/sections/Impact";
import { Testimonials } from "@/sections/Testimonials";
import { Pricing } from "@/sections/Pricing";
import { FAQ } from "@/sections/FAQ";
import { Contact } from "@/sections/Contact";

const WORD_STYLES = [
  "foil-text font-black uppercase tracking-[-0.05em] [font-stretch:115%]",
  "outline-text font-black uppercase tracking-[-0.04em]",
  "font-serif italic font-normal tracking-[-0.02em]",
  "font-pixel uppercase text-[0.78em]",
];

/** Fascia tipografica cinetica legata allo scroll. */
function ScrollBand({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track || prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -200 || r.top > vh + 200) return;
      const p = (vh - r.top) / (vh + r.height);
      const shift = (p - 0.5) * 28 * (reverse ? 1 : -1) - 16;
      track.style.transform = `translate3d(${shift}%,0,0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reverse]);

  const items = [...words, ...words, ...words];
  return (
    <div ref={wrapRef} aria-hidden="true" className="relative overflow-hidden border-y border-ink py-5 sm:py-7">
      <div ref={trackRef} className="flex w-max items-center gap-8 whitespace-nowrap will-change-transform sm:gap-12" style={{ transform: "translate3d(-16%,0,0)" }}>
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-8 sm:gap-12">
            <span className={cn("text-[clamp(2.6rem,7.5vw,6.5rem)] leading-none", WORD_STYLES[i % WORD_STYLES.length])}>{w}</span>
            <span className="text-[clamp(1.2rem,2.5vw,2rem)] text-signal">✶</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <div className="paper-stage" aria-hidden="true" />
      <div className="relative overflow-x-clip">
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <SocialProof />
          <ScrollBand words={["Danza", "Cultura", "Impatto", "Territorio", "Comunità"]} />
          <Manifesto />
          <Stakeholders />
          <Ecosystem />
          <Showcase />
          <Impact />
          <ScrollBand reverse words={["Mecenati", "non protagonisti", "Opera", "misurabile"]} />
          <Testimonials />
          <Pricing />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </AppStateProvider>
  );
}
