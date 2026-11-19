import { useState, type CSSProperties } from "react";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { cn } from "@/utils/cn";
import { PLANS } from "@/data/content";
import { useAppState } from "@/lib/app-state";
import { formatIt } from "@/lib/format";
import { Em, Reveal, SectionHeading, Sticker, Tape } from "@/components/ui";

const TIERS = [
  { min: 100, price: 16, label: "100+" },
  { min: 500, price: 13.8, label: "500+" },
  { min: 2000, price: 11.5, label: "2.000+" },
  { min: 5000, price: 9.5, label: "5.000+" },
];
const COVER = 24;
const ACTIVATION = 0.85;
const K_FACTOR = 0.45;
const MINUTES_PER_READER = 42;
const MIN = 100;
const MAX = 10000;
const STEP = 100;

function Calculator() {
  const { setFormRole, setFormInterest, setFormNote, goTo } = useAppState();
  const [n, setN] = useState(2000);
  const tierIndex = TIERS.reduce((acc, t, i) => (n >= t.min ? i : acc), 0);
  const tier = TIERS[tierIndex];
  const total = n * tier.price;
  const readers = Math.round(n * ACTIVATION * (1 + K_FACTOR));
  const hours = Math.round((readers * MINUTES_PER_READER) / 60);
  const perReader = total / readers;
  const saving = Math.round((1 - tier.price / COVER) * 100);
  const p = ((n - MIN) / (MAX - MIN)) * 100;
  const clamp = (v: number) => Math.max(MIN, Math.min(MAX, v));

  const results = [
    { label: "Investimento totale", value: `€${formatIt(total)}`, note: `${formatIt(n)} licenze × €${formatIt(tier.price, tier.price % 1 ? 2 : 0)}` },
    { label: "Lettori stimati", value: formatIt(readers), note: `${Math.round(ACTIVATION * 100)}% attivazione · K-factor ${formatIt(K_FACTOR, 2)}` },
    { label: "Ore di fruizione culturale", value: formatIt(hours), note: `${MINUTES_PER_READER} min medi per lettore` },
    { label: "Costo per lettore", value: `€${formatIt(perReader, 2)}`, note: `contro €${COVER} della copia singola` },
  ];

  return (
    <div id="calcolatore" className="sheet relative mt-16 scroll-mt-28 border border-ink">
      <Tape className="-top-3 left-10" rotate={-4} width={120} />
      <div className="grid lg:grid-cols-12">
        <div className="border-b border-ink/15 p-6 sm:p-9 lg:col-span-6 lg:border-b-0 lg:border-r">
          <p className="label text-signal-ink">Calcolatore d’impatto · Mecenate</p>
          <h3 className="balance mt-3 text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Quante licenze vuoi <Em>donare</Em> al tuo territorio?
          </h3>

          <div className="mt-8 flex items-end justify-between gap-4">
            <p className="text-[clamp(2.6rem,6vw,4rem)] font-extrabold leading-none tracking-[-0.05em]">
              {formatIt(n)}
              <span className="ml-2 text-base font-semibold tracking-normal text-graphite">licenze</span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setN((v) => clamp(v - 500))}
                aria-label="Diminuisci di 500 licenze"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 transition hover:bg-ink hover:text-paper-3"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setN((v) => clamp(v + 500))}
                aria-label="Aumenta di 500 licenze"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 transition hover:bg-ink hover:text-paper-3"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <label htmlFor="licenze" className="sr-only">
            Numero di licenze
          </label>
          <input
            id="licenze"
            type="range"
            min={MIN}
            max={MAX}
            step={STEP}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            aria-valuetext={`${formatIt(n)} licenze, €${formatIt(tier.price, 2)} per licenza`}
            className="range mt-6"
            style={{ "--p": `${p}%` } as CSSProperties}
          />

          <ol className="mt-5 grid grid-cols-4 gap-1.5" aria-label="Fasce di prezzo">
            {TIERS.map((t, i) => (
              <li
                key={t.min}
                aria-current={i === tierIndex ? "true" : undefined}
                className={cn(
                  "border-t-[3px] pt-2 transition-colors duration-500",
                  i === tierIndex ? "border-signal" : i < tierIndex ? "border-ink" : "border-ink/15"
                )}
              >
                <span className="block font-mono text-[10.5px] uppercase tracking-wider text-graphite">{t.label}</span>
                <span className={cn("block text-sm font-bold", i === tierIndex ? "text-ink" : "text-ink/60")}>
                  €{formatIt(t.price, t.price % 1 ? 2 : 0)}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-sm font-semibold text-paper-3">
            −{saving}% sul prezzo di copertina
          </p>
        </div>

        <div className="flex flex-col p-6 sm:p-9 lg:col-span-6">
          <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-8" aria-live="polite">
            {results.map((r) => (
              <div key={r.label} className="flex flex-col-reverse gap-1.5">
                <dt>
                  <span className="block text-[0.92rem] font-semibold">{r.label}</span>
                  <span className="mt-0.5 block text-[0.78rem] leading-snug text-graphite">{r.note}</span>
                </dt>
                <dd className="text-[clamp(1.6rem,3.2vw,2.5rem)] font-extrabold leading-none tracking-[-0.04em] tabular-nums">{r.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-3 border-t border-ink/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.82rem] leading-snug text-graphite">Stime basate sui target del modulo 3.1. IVA esclusa.</p>
            <button
              type="button"
              onClick={() => {
                setFormRole("fondazioni");
                setFormInterest("preventivo");
                setFormNote(`Vorremmo una proposta per ${formatIt(n)} licenze personalizzate (fascia ${tier.label}).`);
                goTo("contatti");
              }}
              className="btn btn-primary shrink-0"
            >
              Richiedi questa proposta
              <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  const { setFormRole, setFormInterest, setFormNote, goTo } = useAppState();

  return (
    <section id="pacchetti" aria-labelledby="pacchetti-title" className="relative py-20 sm:py-28">
      <div aria-hidden="true" className="beige-patch torn absolute inset-x-0 top-40 -z-10 h-[62%] opacity-60 sm:inset-x-8" />
      <div className="wrap">
        <SectionHeading
          id="pacchetti-title"
          index="07"
          kicker="Pacchetti di partnership"
          align="center"
          title={
            <>
              Scegli come <Em>abilitare</Em> l’opera.
            </>
          }
          intro="Quattro modi di entrare nell’ecosistema, dal kit per una scuola all’edizione dedicata a un intero territorio. Ogni pacchetto include l’accesso al cruscotto KPI. Prezzi IVA esclusa."
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan, i) => {
            const featured = "featured" in plan && plan.featured;
            return (
              <Reveal as="li" key={plan.id} delay={i * 90} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col p-7 transition-[translate,box-shadow] duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-2",
                    featured
                      ? "ink-stage shadow-[0_40px_80px_-30px_rgba(14,14,14,0.85)] xl:-my-4 xl:py-11"
                      : "sheet border border-ink/10 hover:shadow-[0_34px_60px_-30px_rgba(14,14,14,0.5)]"
                  )}
                >
                  {featured && (
                    <div className="absolute -right-4 -top-8">
                      <Sticker text="PIÙ SCELTO DAI BRAND · PIÙ SCELTO DAI BRAND · " size={96} className="bg-volt text-ink shadow-xl">
                        <span className="font-pixel text-[11px]">★</span>
                      </Sticker>
                    </div>
                  )}
                  <p className={cn("font-pixel text-sm", featured ? "text-volt" : "text-signal-ink")}>0{i + 1}</p>
                  <h3 className="mt-4 text-[1.6rem] font-extrabold tracking-[-0.03em]">{plan.name}</h3>
                  <p className={cn("mt-1 text-[0.88rem]", featured ? "text-paper/60" : "text-graphite")}>{plan.audience}</p>

                  <p className="mt-7 flex items-baseline gap-1.5">
                    {plan.prefix && <span className={cn("text-sm", featured ? "text-paper/60" : "text-graphite")}>{plan.prefix}</span>}
                    <span className="text-[2.6rem] font-extrabold leading-none tracking-[-0.045em]">€{formatIt(plan.price)}</span>
                  </p>
                  <p className={cn("mt-1 font-mono text-[11px] uppercase tracking-wider", featured ? "text-paper/55" : "text-graphite")}>
                    {plan.unit}
                  </p>
                  <p className={cn("pretty mt-5 font-serif text-[1.15rem] italic leading-snug", featured ? "text-paper/85" : "text-ink/85")}>
                    {plan.description}
                  </p>

                  <ul className={cn("mt-6 flex-1 space-y-3 border-t pt-6", featured ? "border-paper/15" : "border-ink/12")}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[0.92rem] leading-snug">
                        <span
                          className={cn(
                            "mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center",
                            featured ? "bg-volt text-ink" : "bg-ink text-paper-3"
                          )}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => {
                      if (plan.id === "mecenate") {
                        goTo("calcolatore");
                        return;
                      }
                      setFormRole(plan.role);
                      setFormInterest("preventivo");
                      setFormNote(`Siamo interessati al pacchetto «${plan.name}».`);
                      goTo("contatti");
                    }}
                    className={cn("btn mt-8 w-full", featured ? "btn-light" : "btn-primary")}
                  >
                    {plan.cta}
                    <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal>
          <Calculator />
        </Reveal>
      </div>
    </section>
  );
}
