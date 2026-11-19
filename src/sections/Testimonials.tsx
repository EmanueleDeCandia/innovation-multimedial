import { Quote } from "lucide-react";
import { cn } from "@/utils/cn";
import { TESTIMONIALS } from "@/data/content";
import { Em, Reveal, Scribble, SectionHeading, Tape } from "@/components/ui";

const AVATAR: Record<string, string> = {
  irid: "irid text-paper-3",
  foil: "foil text-ink",
  ink: "bg-paper-3 text-ink",
  red: "bg-signal text-paper-3",
  paper: "bg-ink text-paper-3",
  volt: "bg-volt text-ink",
};

const ROT = ["-rotate-[0.8deg]", "rotate-[0.6deg]", "-rotate-[0.4deg]", "rotate-[0.9deg]", "-rotate-[0.6deg]", "rotate-[0.5deg]"];

export function Testimonials() {
  return (
    <section id="voci" aria-labelledby="voci-title" className="relative overflow-hidden py-20 sm:py-28">
      <div className="wrap">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading
              id="voci-title"
              index="06"
              kicker="Voci dal programma pilota"
              title={
                <>
                  Chi l’ha resa possibile, <Em>racconta</Em>.
                </>
              }
              intro="Fondazioni, brand, festival, enti locali, scuole e giornalisti: sei punti di vista sullo stesso ecosistema, ciascuno con un risultato misurato."
            />
          </div>
          <Reveal delay={200} className="relative hidden h-24 lg:col-span-4 lg:block">
            <Scribble kind="arrow" strokeWidth={2.4} className="absolute bottom-0 right-10 h-20 w-40 rotate-[18deg] text-signal" />
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const dark = t.tone === "ink";
            const lined = t.tone === "paper";
            return (
              <Reveal as="li" key={t.name} delay={(i % 3) * 110} variant="tilt">
                <figure
                  className={cn(
                    "group relative flex h-full flex-col p-7 transition-[rotate,translate,box-shadow] duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5 hover:rotate-0 sm:p-8",
                    ROT[i],
                    dark ? "ink-stage shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]" : lined ? "lined pl-12 shadow-[0_24px_44px_-28px_rgba(14,14,14,0.5)]" : "sheet"
                  )}
                >
                  {i % 2 === 0 && <Tape className="-top-3 left-8" rotate={i % 4 ? 5 : -6} width={84} height={22} variant={dark ? "white" : "kraft"} />}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={cn("text-[2.4rem] font-extrabold leading-none tracking-[-0.045em]", dark && "text-volt")}>{t.metric}</p>
                      <p className={cn("label mt-2", dark ? "text-paper/60" : "text-graphite")}>{t.metricLabel}</p>
                    </div>
                    <Quote className={cn("h-7 w-7 shrink-0", dark ? "text-paper/30" : "text-ink/20")} aria-hidden="true" />
                  </div>
                  <blockquote className="mt-6 flex-1">
                    <p className={cn("pretty font-serif text-[1.32rem] italic leading-[1.3]", dark ? "text-paper-3" : "text-ink")}>
                      «{t.quote}»
                    </p>
                  </blockquote>
                  <figcaption className={cn("mt-8 flex items-center gap-4 border-t pt-5", dark ? "border-paper/15" : "border-ink/12")}>
                    <span
                      aria-hidden="true"
                      className={cn("grid h-12 w-12 shrink-0 place-items-center font-pixel text-sm transition-transform duration-700 group-hover:rotate-[8deg]", AVATAR[t.tone])}
                    >
                      <span className={cn(t.tone === "irid" || t.tone === "foil" ? "bg-ink px-1.5 py-1 text-paper-3" : "")}>
                        {t.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-tight">{t.name}</span>
                      <span className={cn("block text-[0.85rem] leading-snug", dark ? "text-paper/60" : "text-graphite")}>
                        {t.role}, {t.org}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "ml-auto hidden shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider sm:inline-block",
                        dark ? "border-paper/25 text-paper/70" : "border-ink/20 text-graphite"
                      )}
                    >
                      {t.stakeholder}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
