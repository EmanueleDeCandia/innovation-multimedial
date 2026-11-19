import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { useAppState } from "@/lib/app-state";
import { useMagnetic, usePointerParallax } from "@/lib/hooks";
import { IMG, px } from "@/data/content";
import { Counter, Em, Halftone, PixelGlyph, Scribble, Tape } from "@/components/ui";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Pezzo del collage: posizionamento assoluto + parallasse + ingresso animato. */
function Piece({
  x,
  y,
  w,
  h,
  depth = 10,
  delay = 0,
  r0 = -14,
  className,
  innerClassName,
  children,
}: {
  x: string;
  y: string;
  w: string;
  h?: string;
  depth?: number;
  delay?: number;
  r0?: number;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("parallax absolute", className)}
      style={{ left: x, top: y, width: w, height: h, "--depth": depth } as Vars}
    >
      <div className={cn("letter-in h-full w-full", innerClassName)} style={{ "--d": `${delay}ms`, "--r0": `${r0}deg` } as Vars}>
        {children}
      </div>
    </div>
  );
}

function NeonZ() {
  return (
    <svg viewBox="0 0 100 116" className="h-full w-full" aria-hidden="true">
      <defs>
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4.5" result="b1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.1" result="b2" />
          <feMerge>
            <feMergeNode in="b1" />
            <feMergeNode in="b1" />
            <feMergeNode in="b2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="neon-flicker">
        <path
          d="M22 28 H78 L24 88 H80"
          stroke="#FF2D73"
          strokeWidth="11"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#neon-glow)"
        />
        <path d="M22 28 H78 L24 88 H80" stroke="#FFE94D" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="31" y="22" width="5" height="12" rx="1" fill="#a1a1a1" opacity=".5" />
      <rect x="64" y="82" width="5" height="12" rx="1" fill="#a1a1a1" opacity=".5" />
    </svg>
  );
}

function Collage() {
  const ref = usePointerParallax<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[6/5] w-full max-w-[760px] select-none [container-type:inline-size]"
      role="img"
      aria-label="Collage tipografico della parola DANZA: ogni lettera è un linguaggio diverso — foil iridescente per il video, foil argento per la stampa, pixel per il digitale, neon per la luce di scena, corsivo per la voce."
    >
      {/* fondo in carta beige strappata */}
      <div aria-hidden="true" className="beige-patch torn absolute left-[3%] top-[6%] h-[86%] w-[78%] -rotate-2 opacity-90" />
      <div aria-hidden="true" className="absolute left-[-4%] right-[16%] top-[91.6%] h-px bg-ink/80" />

      {/* striscia di mezzetinte, come la colonna destra del poster */}
      <div aria-hidden="true" className="absolute bottom-0 right-0 top-0 flex w-[15.5%] flex-col gap-[1.2cqw]">
        {[
          { id: IMG.splitLeap, alt: "Ballerina in spaccata aerea" },
          { id: IMG.maleLeap, alt: "Danzatore in salto" },
          { id: IMG.invertedLeap, alt: "Danzatrice in salto capovolto" },
        ].map((p, i) => (
          <div key={p.id} className="letter-in relative flex-1" style={{ "--d": `${150 + i * 140}ms`, "--r0": "0deg" } as Vars}>
            <Halftone dots eager src={px(p.id, 360, 520)} alt={p.alt} className="h-full w-full" />
          </div>
        ))}
      </div>

      {/* carta a righe con scarabocchio */}
      <Piece x="50%" y="4%" w="30cqw" h="30cqw" depth={-8} delay={420} r0={10} innerClassName="rotate-[5deg]">
        <div className="lined relative h-full w-full shadow-[0_18px_30px_-18px_rgba(14,14,14,0.45)]">
          <Scribble kind="zigzag" mode="auto" delay={1300} strokeWidth={2.4} className="absolute left-[14%] top-[14%] h-[72%] w-[72%] text-ink" />
          <span className="label absolute right-[6%] top-[5%] hidden text-[max(8px,1.2cqw)] text-graphite sm:block">fig. 02 — gesto</span>
        </div>
        <Tape className="-left-[4%] -top-[5%]" rotate={-28} width="12cqw" height={20} />
      </Piece>

      {/* D — foil iridescente */}
      <Piece x="0%" y="2%" w="36cqw" h="36cqw" depth={14} delay={120} r0={-20}>
        <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_30px_50px_-25px_rgba(0,0,0,0.6)]">
          <div className="irid spin-slower absolute inset-[-22%]" />
          <span className="absolute inset-0 grid place-items-center pb-[1cqw] text-[27cqw] font-black leading-none tracking-[-0.06em] text-paper-3 [font-stretch:112%]">
            D
          </span>
        </div>
        <Tape className="right-[6%] top-[2%]" rotate={38} width="11cqw" height={18} variant="white" />
      </Piece>

      {/* A — foil argento con contorno rosso */}
      <Piece x="21%" y="-2%" w="40cqw" h="44cqw" depth={22} delay={260} r0={-24} innerClassName="-rotate-[9deg]">
        <span className="foil-text foil-outline block text-[50cqw] font-black leading-[0.86] tracking-[-0.06em] [font-stretch:110%]">
          A
        </span>
      </Piece>

      {/* N — pixel */}
      <Piece x="2%" y="54%" w="18cqw" depth={8} delay={540} r0={0}>
        <PixelGlyph char="N" seed={11} baseDelay={600} className="w-full" />
      </Piece>

      {/* Z — neon di scena */}
      <Piece x="24%" y="51%" w="24cqw" h="28cqw" depth={16} delay={680} r0={12} innerClassName="-rotate-[4deg]">
        <div className="neon-box relative h-full w-full overflow-hidden shadow-[0_26px_40px_-20px_rgba(0,0,0,0.7)]">
          <div className="absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_50%,rgba(255,45,115,0.28),transparent_70%)]" />
          <div className="absolute inset-[6%]">
            <NeonZ />
          </div>
          <span className="label absolute bottom-[5%] left-[7%] hidden text-[max(8px,1.1cqw)] text-paper/60 sm:block">luce di scena</span>
        </div>
        <Tape className="-right-[8%] -top-[4%]" rotate={30} width="10cqw" height={18} />
      </Piece>

      {/* a — corsivo in riquadro */}
      <Piece x="53%" y="50%" w="24cqw" h="26cqw" depth={-12} delay={820} r0={-10} innerClassName="rotate-[3deg]">
        <div className="sheet relative grid h-full w-full place-items-center border border-ink/80">
          <span className="outline-text -mt-[4cqw] font-serif text-[27cqw] italic leading-none">a</span>
          <span className="label absolute bottom-[5%] left-[7%] hidden text-[max(8px,1.1cqw)] text-graphite sm:block">voce · audio</span>
        </div>
        <Tape className="-bottom-[6%] left-[30%]" rotate={-4} width="11cqw" height={18} />
      </Piece>

      {/* spirale rossa */}
      <Piece x="72%" y="40%" w="11cqw" h="11cqw" depth={-18} delay={1000} r0={0}>
        <Scribble kind="spiral" mode="auto" delay={1500} strokeWidth={2} className="h-full w-full text-signal" />
      </Piece>

      {/* sfera di foil argento */}
      <Piece x="43%" y="85%" w="8cqw" h="8cqw" depth={26} delay={980} r0={0}>
        <div className="foil h-full w-full rounded-full shadow-[0_14px_22px_-10px_rgba(0,0,0,0.6)]" />
      </Piece>

      {/* multi / mediale sulla linea, come "type collage" */}
      <Piece x="55%" y="84.5%" w="28cqw" depth={4} delay={1150} r0={0}>
        <p className="text-[5.4cqw] font-extrabold lowercase leading-[0.9] tracking-[-0.04em]">
          multi
          <span className="mt-[1.6cqw] block pl-[3cqw]">mediale</span>
        </p>
      </Piece>
    </div>
  );
}

export function Hero() {
  const { goTo, setFormInterest } = useAppState();
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.2);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-[68px]">
      {/* rail verticale sinistra */}
      <div aria-hidden="true" className="absolute bottom-10 left-3 top-24 hidden flex-col items-center justify-between xl:flex 2xl:left-6">
        <span className="vtext text-[13px] font-extrabold tracking-[0.02em]">
          <span className="text-signal">≡</span> innovation multimedial
        </span>
        <span className="vtext font-mono text-[10.5px] tracking-[0.06em] text-graphite">editoria_multimediale/danza/2026</span>
        <span className="vtext font-mono text-[10.5px] tracking-[0.1em]">
          WWW.INNOVATION<b>MULTIMEDIAL</b>.IT
        </span>
      </div>

      <div className="wrap relative grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-12">
        {/* Copy */}
        <div className="relative lg:col-span-5">
          <p className="fade-up label flex flex-wrap items-center gap-x-2 gap-y-1 text-graphite" style={{ "--d": "80ms" } as Vars}>
            <span className="pulse-dot inline-block h-2 w-2 bg-signal" aria-hidden="true" />
            Ebook multimediale <span aria-hidden="true">·</span> Danza e arti performative{" "}
            <span aria-hidden="true">·</span> 2026
          </p>

          <h1
            id="hero-title"
            className="balance mt-6 text-[clamp(2.6rem,5.1vw,4.6rem)] font-extrabold leading-[0.94] tracking-[-0.045em]"
          >
            <span className="fade-up block" style={{ "--d": "160ms" } as Vars}>
              Non un semplice ebook.
            </span>
            <span className="fade-up block" style={{ "--d": "260ms" } as Vars}>
              Un{" "}
              <span className="relative inline-block">
                <Em className="pr-1">ecosistema</Em>
                <Scribble
                  kind="underline"
                  mode="auto"
                  delay={1100}
                  strokeWidth={3}
                  className="absolute -bottom-[0.12em] left-0 h-[0.3em] w-full text-signal"
                />
              </span>{" "}
              culturale ad alto impatto.
            </span>
          </h1>

          <p
            className="fade-up pretty mt-7 max-w-xl text-[1.075rem] leading-relaxed text-graphite sm:text-lg"
            style={{ "--d": "380ms" } as Vars}
          >
            <strong className="font-semibold text-ink">Innovation Multimedial</strong> è il libro digitale sulla danza che
            intreccia documentari 4K, mappe interattive, inchieste e voci d’autore — e trasforma ogni lettura in valore
            misurabile per fondazioni, brand, istituzioni, media e community.
          </p>

          <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ "--d": "480ms" } as Vars}>
            <a
              ref={ctaRef}
              href="#stakeholder"
              onClick={(e) => {
                e.preventDefault();
                goTo("stakeholder");
              }}
              className="btn btn-primary magnetic"
            >
              Trova il tuo ruolo
              <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#contatti"
              onClick={(e) => {
                e.preventDefault();
                setFormInterest("dossier");
                goTo("contatti");
              }}
              className="btn btn-ghost"
            >
              Scarica il dossier partner
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <dl
            className="fade-up mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-ink/15 pt-6"
            style={{ "--d": "600ms" } as Vars}
          >
            {[
              { v: 13, l: "moduli editoriali" },
              { v: 26, l: "KPI misurabili" },
              { v: 5, l: "profili di partner" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col-reverse gap-1">
                <dt className="label text-graphite">{s.l}</dt>
                <dd className="text-[2.4rem] font-extrabold leading-none tracking-[-0.04em]">
                  <Counter value={s.v} duration={1400} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Collage */}
        <div className="relative lg:col-span-7">
          <Collage />
        </div>
      </div>

      {/* nota editoriale in basso */}
      <div className="wrap relative pb-10">
        <div className="flex flex-col items-start justify-between gap-4 border-t border-ink/15 pt-5 sm:flex-row sm:items-center">
          <p className="label text-graphite">
            <span className="text-ink">Editorial First, Business by Design</span> — gli sponsor sono mecenati, mai
            protagonisti.
          </p>
          <a
            href="#pilota"
            onClick={(e) => {
              e.preventDefault();
              goTo("pilota");
            }}
            className="label group inline-flex items-center gap-2 text-ink"
          >
            Scorri per scoprire
            <span className="grid h-7 w-7 place-items-center rounded-full border border-ink/30 transition group-hover:bg-ink group-hover:text-paper-3">
              <ArrowDown className="float h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
