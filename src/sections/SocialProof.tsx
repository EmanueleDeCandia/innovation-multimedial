import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";
import { PARTNERS, PILOT_STATS } from "@/data/content";
import { Counter, Reveal, Tape } from "@/components/ui";

const STYLE: Record<string, string> = {
  serif: "font-serif italic text-[1.9rem] tracking-[-0.01em]",
  heavy: "font-black uppercase text-[1.35rem] tracking-[-0.03em] [font-stretch:125%]",
  mono: "font-mono text-[1.05rem] tracking-[0.04em]",
  pixel: "font-pixel text-[1.15rem]",
  wide: "font-light uppercase text-[1.05rem] tracking-[0.32em]",
};

function Wordmarks({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {PARTNERS.map((p) => (
        <li key={p.name} className="flex items-center">
          <span className={cn("whitespace-nowrap px-8 text-ink/75 transition-colors duration-300 hover:text-ink", STYLE[p.style])}>
            {p.name}
          </span>
          <span aria-hidden="true" className="text-signal">
            ✶
          </span>
        </li>
      ))}
    </ul>
  );
}

export function SocialProof() {
  return (
    <section id="pilota" aria-labelledby="pilota-title" className="relative py-16 sm:py-20">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 border-t border-ink pt-6 md:flex-row md:items-end">
          <Reveal>
            <p className="label text-graphite">
              <span className="font-pixel text-signal-ink">00</span> &nbsp;Programma pilota 2025 · 3 edizioni · 6 mesi
            </p>
            <h2
              id="pilota-title"
              className="balance mt-3 max-w-xl text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]"
            >
              Il pilota ha già dimostrato che la cultura, se è autorevole,{" "}
              <em className="font-serif font-normal italic">si legge fino in fondo.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="label max-w-xs text-graphite md:text-right">
            Dati rilevati dal cruscotto di piattaforma, conformi al GDPR
          </Reveal>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-ink/15 bg-ink/15 lg:grid-cols-4">
          {PILOT_STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 90}
              className="group relative flex flex-col-reverse justify-end gap-3 bg-paper-3/70 p-5 backdrop-blur-sm transition-colors duration-500 hover:bg-paper-3 sm:p-7"
            >
              <dt>
                <span className="block text-[0.95rem] font-semibold leading-snug">{s.label}</span>
                <span className="mt-1 block text-[0.82rem] leading-snug text-graphite">{s.note}</span>
              </dt>
              <dd className="text-[clamp(2.2rem,4.6vw,3.6rem)] font-extrabold leading-none tracking-[-0.045em]">
                <Counter value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
              </dd>
              {i === 0 && <Tape className="-top-2 right-6" rotate={8} width={64} height={18} />}
              {i === 2 && (
                <span
                  aria-hidden="true"
                  className="irid absolute right-5 top-5 h-5 w-5 rounded-full transition-transform duration-700 group-hover:scale-125"
                />
              )}
            </Reveal>
          ))}
        </dl>

        <div className="mt-14">
          <p className="label text-center text-graphite">Hanno sostenuto, distribuito o raccontato il pilota</p>
          <div
            className="marquee-wrap relative mt-6 overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
            aria-label="Partner del programma pilota"
            role="region"
          >
            <div className="marquee" style={{ "--dur": "48s" } as CSSProperties}>
              <Wordmarks />
              <Wordmarks hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
