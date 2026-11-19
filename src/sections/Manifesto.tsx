import { useEffect, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Feather, Layers, Play, ShieldCheck } from "lucide-react";
import { cn } from "@/utils/cn";
import { IMG, px } from "@/data/content";
import { useInView, prefersReducedMotion } from "@/lib/hooks";
import { Em, Halftone, Reveal, Scribble, SectionHeading, Tape } from "@/components/ui";

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Nessuna autocelebrazione",
    text: "Startup, sponsor ed enti sostenitori non sono il soggetto del racconto: sono i mecenati e gli abilitatori di un’opera culturale autorevole.",
    rot: "-rotate-1",
  },
  {
    icon: Feather,
    title: "Valore intrinseco per il lettore",
    text: "Ogni capitolo, video, mappa o inchiesta regge il confronto con le migliori riviste culturali, i saggi d’arte e i documentari d’autore.",
    rot: "rotate-1",
  },
  {
    icon: Layers,
    title: "Integrazione nativa",
    text: "Referral, sponsorizzazioni, raccolta dati e advocacy vivono intorno al valore culturale, in continuità — mai interrompendolo.",
    rot: "-rotate-[0.6deg]",
  },
];

/* ─── Slider "doppia anima" ──────────────────────────────────── */
function TextLines({ n, dark = false, className }: { n: number; dark?: boolean; className?: string }) {
  return (
    <div className={cn("space-y-[0.55em]", className)} aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className={cn("h-[0.42em] rounded-full", dark ? "bg-paper/15" : "bg-ink/15")}
          style={{ width: `${i === n - 1 ? 58 : 88 + ((i * 37) % 12)}%` }}
        />
      ))}
    </div>
  );
}

function Annotation({ className, label, value }: { className?: string; label: string; value: string }) {
  return (
    <div className={cn("absolute flex items-center gap-2", className)}>
      <span className="h-2 w-2 shrink-0 rounded-full bg-volt shadow-[0_0_0_4px_rgba(255,233,77,0.18)]" />
      <span className="rounded-sm bg-volt px-1.5 py-0.5 font-mono text-[clamp(8px,1.05cqw,11px)] font-bold uppercase tracking-wider text-ink">
        {value}
      </span>
      <span className="hidden font-mono text-[clamp(8px,1cqw,10.5px)] uppercase tracking-wider text-paper/70 sm:inline">{label}</span>
    </div>
  );
}

function DualSoulSlider() {
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "0px 0px -25% 0px" });

  // micro-interazione: piccola oscillazione dimostrativa alla prima apparizione
  useEffect(() => {
    if (!inView || touched || prefersReducedMotion()) return;
    let raf = 0;
    const start = performance.now();
    const dur = 2200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setPos(50 + Math.sin(t * Math.PI * 2) * 20 * (1 - t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    const timeout = window.setTimeout(() => (raf = requestAnimationFrame(tick)), 500);
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [inView, touched]);

  const spread = (dark: boolean) => (
    <div className="absolute inset-0 grid grid-cols-[1fr_1.15fr]">
      <div className="relative">
        {dark ? (
          <div className="grid-paper-dark absolute inset-[6%] border border-dashed border-paper/30">
            <span className="absolute left-2 top-2 font-mono text-[clamp(8px,1cqw,10.5px)] uppercase tracking-wider text-paper/50">
              video-esploso 4K
            </span>
          </div>
        ) : (
          <Halftone src={px(IMG.silhouette, 700, 900)} alt="" className="absolute inset-0" zoom={false} />
        )}
      </div>
      <div className="relative flex flex-col p-[6%] text-[clamp(10px,1.45cqw,15px)]">
        <p className={cn("font-mono text-[0.72em] uppercase tracking-[0.14em]", dark ? "text-paper/50" : "text-graphite")}>
          Cap. 07 · L’Ingegneria dell’Invisibile
        </p>
        <p
          className={cn(
            "mt-[0.5em] font-serif text-[2.3em] italic leading-[0.95] tracking-[-0.01em]",
            dark ? "text-paper/30 [-webkit-text-stroke:1px_rgba(247,245,241,0.6)]" : "text-ink"
          )}
        >
          La luce che nessuno vede
        </p>
        <TextLines n={5} dark={dark} className="mt-[1.1em]" />
        <div className={cn("mt-[1em] border-l-2 pl-[0.8em]", dark ? "border-volt/70" : "border-signal")}>
          <p className={cn("font-serif text-[1.15em] italic leading-snug", dark ? "text-paper/40" : "text-ink")}>
            «Un proiettore sbagliato può cancellare un passo a due.»
          </p>
        </div>
        <TextLines n={3} dark={dark} className="mt-[1em]" />
        <div
          className={cn(
            "mt-auto inline-flex w-fit items-center gap-[0.5em] rounded-full px-[0.9em] py-[0.45em] text-[0.8em] font-semibold",
            dark ? "border border-dashed border-paper/40 text-paper/60" : "bg-ink text-paper-3"
          )}
        >
          <Play className="h-[1em] w-[1em]" aria-hidden="true" /> Video-esploso · 4:12
        </div>
      </div>
    </div>
  );

  return (
    <div ref={ref} className="relative">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="label inline-flex items-center gap-2">
          <span className="h-2 w-2 bg-ink" /> Cosa vive il pubblico
        </span>
        <span className="label inline-flex items-center gap-2 text-right">
          Cosa ottiene il partner <span className="h-2 w-2 bg-volt ring-1 ring-ink" />
        </span>
      </div>

      <div
        className="sheet relative aspect-[16/11] w-full overflow-hidden border border-ink/80 [container-type:inline-size] sm:aspect-[16/10]"
        style={{ "--pos": `${pos}%` } as CSSProperties}
      >
        {/* livello editoriale */}
        <div className="absolute inset-0 bg-paper-3">{spread(false)}</div>

        {/* livello partner (radiografia KPI) */}
        <div className="ink-stage absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }} aria-hidden="true">
          {spread(true)}
          <Annotation className="left-[8%] top-[12%]" value="7,5 min" label="tempo medio" />
          <Annotation className="left-[49%] top-[22%]" value="18%" label="riscatto CRM" />
          <Annotation className="left-[49%] top-[56%]" value="35%" label="sondaggio" />
          <Annotation className="left-[8%] top-[78%]" value="300" label="lead B2B" />
          <Annotation className="left-[60%] top-[84%]" value="K 0,45" label="referral" />
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(pos)}
          onChange={(e) => {
            setTouched(true);
            setPos(Number(e.target.value));
          }}
          onPointerDown={() => setTouched(true)}
          aria-label="Confronta il valore editoriale per il pubblico con l’impatto per il partner"
          aria-valuetext={`${Math.round(100 - pos)}% vista partner`}
          className="peer absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />

        {/* maniglia */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-signal peer-focus-visible:[&>div]:outline-2 peer-focus-visible:[&>div]:outline-offset-4 peer-focus-visible:[&>div]:outline-signal-ink peer-focus-visible:[&>div]:[outline-style:solid]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ink bg-signal text-paper-3 shadow-[3px_3px_0_#0e0e0e]">
            <span className="flex">
              <ChevronLeft className="-mr-1 h-4 w-4" />
              <ChevronRight className="-ml-1 h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px] text-graphite">
        Trascina o usa le frecce: stessa pagina, doppia anima.
      </p>
    </div>
  );
}

export function Manifesto() {
  return (
    <section id="manifesto" aria-labelledby="manifesto-title" className="relative py-20 sm:py-28">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionHeading
              id="manifesto-title"
              index="01"
              kicker="Manifesto · La regola d’oro"
              title={
                <>
                  Editorial First,{" "}
                  <span className="relative inline-block">
                    <Em>Business by Design.</Em>
                    <Scribble kind="underline" strokeWidth={3} delay={500} className="absolute -bottom-2 left-0 h-3 w-full text-signal" />
                  </span>
                </>
              }
              intro="Per funzionare come leva di marketing, fundraising e posizionamento, il libro non deve mai sembrare una brochure promozionale. Ogni capitolo è un’opera da leggere; ogni meccanismo di crescita vive intorno a quel valore, mai al suo posto."
            />
          </div>
          <Reveal variant="tilt" delay={200} className="relative self-end lg:col-span-5">
            <blockquote className="lined relative px-7 pb-7 pt-9 shadow-[0_24px_40px_-26px_rgba(14,14,14,0.5)] sm:px-9">
              <Tape className="-top-3 left-8" rotate={-5} width={110} />
              <p className="font-serif text-[1.65rem] italic leading-[1.15] tracking-[-0.01em] sm:text-[1.9rem]">
                «Gli sponsor non sono i protagonisti della storia. Sono la ragione per cui la storia può essere raccontata.»
              </p>
              <footer className="label mt-5 text-graphite">— Principio non negoziabile n. 1</footer>
            </blockquote>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 110} variant="up">
              <article
                className={cn(
                  "sheet group relative h-full p-7 transition-[rotate,translate,box-shadow] duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5 hover:rotate-0 sm:p-8",
                  p.rot
                )}
              >
                <Tape className="-top-3 right-8" rotate={i % 2 ? 6 : -7} width={78} height={22} variant={i === 1 ? "white" : "kraft"} />
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-2xl text-signal-ink">0{i + 1}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 transition-colors duration-500 group-hover:bg-ink group-hover:text-paper-3">
                    <p.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-8 text-[1.4rem] font-bold leading-tight tracking-[-0.02em]">{p.title}</h3>
                <p className="pretty mt-3 leading-relaxed text-graphite">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </ul>

        <div className="mt-24 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="label text-graphite">La doppia anima</p>
              <h3 className="balance mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
                Una pagina, <Em>due valori</Em> che non si ostacolano mai.
              </h3>
              <p className="pretty mt-5 leading-relaxed text-graphite">
                Ogni modulo mostra sempre il binomio: <strong className="font-semibold text-ink">cosa legge e vive il pubblico</strong>{" "}
                — il valore editoriale — e <strong className="font-semibold text-ink">cosa ottiene il partner</strong> — impatto e
                KPI misurabili. Il lettore vede un’opera; il partner vede i dati che la rendono sostenibile.
              </p>
            </Reveal>
          </div>
          <Reveal variant="scale" delay={150} className="lg:col-span-8">
            <DualSoulSlider />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
