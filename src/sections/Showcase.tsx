import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type FormEvent, type KeyboardEvent } from "react";
import {
  Check,
  ChevronLeft,
  Copy,
  FileText,
  Film,
  Lock,
  LockOpen,
  Map as MapIcon,
  Pause,
  Play,
  RotateCcw,
  Send,
  Vote,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { IMG, MAP_PINS, POLL_OPTIONS, px } from "@/data/content";
import { Em, Halftone, Reveal, SectionHeading, Sticker, Tape } from "@/components/ui";
import { formatIt } from "@/lib/format";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const TABS = [
  { id: "film", icon: Film, title: "Documentario 4K", text: "Atlante Vivo: le mani che fanno danzare, in 12 minuti d’autore." },
  { id: "map", icon: MapIcon, title: "Mappa viva", text: "Teatri storici, spazi non convenzionali e tappe dei contest." },
  { id: "poll", icon: Vote, title: "Sondaggio d’autore", text: "Dati dichiarativi, con consenso, restituiti come infografiche." },
  { id: "referral", icon: LockOpen, title: "Referral culturale", text: "Invita 3 colleghi e sblocca la masterclass. Mai uno sconto." },
  { id: "blank", icon: FileText, title: "La Pagina Bianca", text: "Quando il silenzio di un’istituzione diventa notizia." },
] as const;

type TabId = (typeof TABS)[number]["id"];

function TopBar({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-ink/10 bg-paper-3/90 px-[4cqw] py-[1.8cqw] text-[clamp(9px,1.7cqw,12px)] backdrop-blur @xl:px-[2.6cqw] @xl:py-[1.3cqw] @xl:text-[clamp(9px,1.2cqw,12px)]">
      <span className="flex min-w-0 items-center gap-1.5 font-semibold">
        <ChevronLeft className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate">{left}</span>
      </span>
      <span className="shrink-0 font-mono uppercase tracking-wider text-graphite">{right}</span>
    </div>
  );
}

const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/* ─── 1 · Documentario ───────────────────────────────────────── */
function ScreenFilm() {
  const total = 768;
  const chapters = [
    { t: 0, label: "La forma" },
    { t: 192, label: "Il raso" },
    { t: 460, label: "La prova" },
    { t: 665, label: "Il palco" },
  ];
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(127);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setT((v) => (v + 1) % total), 250);
    return () => window.clearInterval(id);
  }, [playing]);

  const current = [...chapters].reverse().find((c) => t >= c.t) ?? chapters[0];

  return (
    <div className="flex h-full flex-col">
      <TopBar left="Atlante Vivo · Cap. 03" right="pag. 48 / 212" />
      <div className="flex flex-1 flex-col gap-[3cqw] p-[4cqw] @xl:gap-[2cqw] @xl:p-[2.6cqw]">
        <div className="relative flex-1 overflow-hidden bg-ink">
          <Halftone src={px(IMG.pointeAdjust, 1000, 640)} alt="Una danzatrice sistema la scarpetta da punta" className="absolute inset-0" zoom={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          <div className="absolute left-[4cqw] top-[4cqw] flex items-center gap-2 @xl:left-[2.4cqw] @xl:top-[2.4cqw]">
            <span className="rounded-sm bg-signal px-1.5 py-0.5 font-mono text-[10px] font-bold text-paper-3">4K HDR</span>
            <span className="rounded-sm bg-paper-3/90 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink">CC · IT/EN</span>
          </div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Metti in pausa il documentario" : "Riproduci il documentario"}
            className="absolute left-1/2 top-1/2 grid h-[clamp(44px,11cqw,76px)] w-[clamp(44px,11cqw,76px)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper-3 text-ink shadow-2xl transition-transform duration-500 hover:scale-110"
          >
            {playing ? <Pause className="h-1/3 w-1/3" aria-hidden="true" /> : <Play className="ml-1 h-1/3 w-1/3" aria-hidden="true" />}
          </button>
          <div className="absolute inset-x-[4cqw] bottom-[3.5cqw] text-paper-3 @xl:inset-x-[2.4cqw] @xl:bottom-[2.2cqw]">
            <p className="font-serif text-[clamp(16px,4.6cqw,30px)] italic leading-none">Le mani che fanno danzare</p>
            <div className="mt-[2cqw] flex items-center gap-3 font-mono text-[10.5px]">
              <span aria-live="off">{mmss(t)}</span>
              <div className="relative h-[3px] flex-1 bg-paper/25">
                <div className="absolute inset-y-0 left-0 bg-signal" style={{ width: `${(t / total) * 100}%` }} />
                {chapters.map((c) => (
                  <span key={c.t} className="absolute -top-[3px] h-[9px] w-[2px] bg-paper-3/80" style={{ left: `${(c.t / total) * 100}%` }} />
                ))}
              </div>
              <span>{mmss(total)}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[1.6cqw] @xl:grid-cols-4 @xl:gap-[1.2cqw]">
          {chapters.map((c, i) => (
            <button
              key={c.t}
              type="button"
              onClick={() => setT(c.t)}
              className={cn(
                "flex items-center justify-between gap-2 border px-[2.4cqw] py-[1.6cqw] text-left text-[clamp(10px,2cqw,13px)] transition-colors @xl:px-[1.4cqw] @xl:py-[1cqw] @xl:text-[clamp(10px,1.25cqw,13px)]",
                current.t === c.t ? "border-ink bg-ink text-paper-3" : "border-ink/15 hover:border-ink/50"
              )}
            >
              <span className="font-semibold">
                <span className="font-pixel text-[0.85em] opacity-70">0{i + 1}</span> {c.label}
              </span>
              <span className="font-mono text-[0.85em] opacity-70">{mmss(c.t)}</span>
            </button>
          ))}
        </div>
        <p className="font-serif text-[clamp(13px,2.6cqw,18px)] italic leading-snug text-ink/80 @xl:text-[clamp(13px,1.6cqw,18px)]">
          «In bottega, ogni scarpetta richiede quattro ore e undici passaggi a mano.»
        </p>
      </div>
    </div>
  );
}

/* ─── 2 · Mappa ──────────────────────────────────────────────── */
function ScreenMap() {
  const [sel, setSel] = useState(6);
  const pin = MAP_PINS[sel];
  return (
    <div className="flex h-full flex-col">
      <TopBar left="Cronache del Movimento · Ep. 06" right={`${MAP_PINS.length} luoghi`} />
      <div className="grid flex-1 grid-rows-[1fr_auto] gap-[3cqw] p-[4cqw] @xl:grid-cols-[1.1fr_1fr] @xl:grid-rows-1 @xl:gap-[2.6cqw] @xl:p-[2.6cqw]">
        <div className="grid-paper relative min-h-0 overflow-hidden border border-ink/10 bg-paper">
          <div className="absolute inset-[6%] mx-auto aspect-[4/5] max-h-full max-w-full">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <polyline
                points={MAP_PINS.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="#0e0e0e"
                strokeOpacity=".35"
                strokeWidth=".5"
                strokeDasharray="1.4 1.4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {MAP_PINS.map((p, i) => (
              <button
                key={p.city}
                type="button"
                onClick={() => setSel(i)}
                aria-pressed={sel === i}
                aria-label={`${p.city}: ${p.kind}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span
                  className={cn(
                    "block rounded-full border-2 border-paper-3 transition-all duration-300",
                    sel === i ? "pulse-dot h-4 w-4 bg-signal" : "h-2.5 w-2.5 bg-ink group-hover:scale-150"
                  )}
                />
                <span
                  className={cn(
                    "pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-wider transition-opacity",
                    sel === i ? "font-bold text-ink opacity-100" : "text-graphite opacity-0 group-hover:opacity-100 @md:opacity-70"
                  )}
                >
                  {p.city}
                </span>
              </button>
            ))}
          </div>
          <span className="label absolute left-2 top-2 text-graphite">Italia · 1:6.000.000</span>
        </div>
        <div key={pin.city} className="panel-in flex flex-col justify-between gap-3 @xl:py-2" aria-live="polite">
          <div>
            <span className="label inline-block bg-ink px-2 py-1 text-paper-3">{pin.kind}</span>
            <p className="mt-[2cqw] text-[clamp(22px,6cqw,42px)] font-extrabold leading-none tracking-[-0.04em] @xl:text-[clamp(22px,4.2cqw,42px)]">
              {pin.city}
            </p>
            <p className="mt-[1.6cqw] font-serif text-[clamp(14px,3cqw,20px)] italic leading-snug text-ink/80 @xl:text-[clamp(14px,1.9cqw,20px)]">
              {pin.detail}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold text-paper-3">
              <Play className="h-3 w-3" aria-hidden="true" /> Micro-documentario
            </span>
            <span className="rounded-full border border-ink/20 px-3 py-1.5 text-[11px] font-semibold">Audio-guida</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 3 · Sondaggio ──────────────────────────────────────────── */
function ScreenPoll() {
  const [voted, setVoted] = useState<string | null>(null);
  const base = 2384;
  return (
    <div className="flex h-full flex-col">
      <TopBar left="Ritratti del Pubblico · Test 04" right="Zero-party · GDPR" />
      <div className="flex flex-1 flex-col justify-center gap-[3cqw] p-[5cqw] @xl:gap-[2cqw] @xl:p-[4cqw]">
        <p className="label text-graphite">Domanda d’autore</p>
        <p className="balance font-serif text-[clamp(20px,5.4cqw,40px)] italic leading-[1.05] @xl:text-[clamp(20px,3.6cqw,40px)]">
          Quale stile coreografico racconta la tua estetica?
        </p>
        <div className="grid gap-[1.6cqw] @xl:grid-cols-2 @xl:gap-[1.2cqw]" role="group" aria-label="Opzioni del sondaggio">
          {POLL_OPTIONS.map((o) => {
            const share = voted ? (o.id === voted ? o.share + 1 : o.share) : 0;
            return (
              <button
                key={o.id}
                type="button"
                disabled={!!voted}
                onClick={() => setVoted(o.id)}
                aria-pressed={voted === o.id}
                className={cn(
                  "relative overflow-hidden border px-[3cqw] py-[2.4cqw] text-left transition-colors @xl:px-[1.8cqw] @xl:py-[1.5cqw]",
                  voted === o.id ? "border-ink" : "border-ink/20 enabled:hover:border-ink",
                  "disabled:cursor-default"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("absolute inset-y-0 left-0 transition-[width] duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)]", voted === o.id ? "bg-volt" : "bg-ink/8")}
                  style={{ width: `${share}%` }}
                />
                <span className="relative flex items-center justify-between gap-2 text-[clamp(12px,2.6cqw,15px)] font-semibold @xl:text-[clamp(12px,1.6cqw,15px)]">
                  {o.label}
                  {voted && <span className="font-mono">{share}%</span>}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-graphite" aria-live="polite">
          {voted ? (
            <>
              <span>
                Grazie! {formatIt(base + 1)} risposte · i risultati diventano un’infografica nel prossimo capitolo.
              </span>
              <button type="button" onClick={() => setVoted(null)} className="inline-flex items-center gap-1 font-semibold text-ink underline-offset-4 hover:underline">
                <RotateCcw className="h-3 w-3" aria-hidden="true" /> Rivota
              </button>
            </>
          ) : (
            <span>{formatIt(base)} lettori hanno già risposto · consenso esplicito e revocabile</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── 4 · Referral ───────────────────────────────────────────── */
function ScreenReferral() {
  const [invites, setInvites] = useState(2);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const unlocked = invites >= 3;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Inserisci un indirizzo email valido");
      return;
    }
    setError("");
    setEmail("");
    setInvites((n) => Math.min(3, n + 1));
  };

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText("https://innovationmultimedial.it/invito/atlante-vivo");
    } catch {
      /* clipboard non disponibile: mostriamo comunque il feedback */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex h-full flex-col">
      <TopBar left="Fine capitolo 05 · Contenuto sbloccabile" right={`${invites}/3 inviti`} />
      <div className="grid flex-1 gap-[3cqw] p-[4cqw] @xl:grid-cols-2 @xl:gap-[2.6cqw] @xl:p-[2.6cqw]">
        <div className="relative min-h-[34cqw] overflow-hidden bg-ink @xl:min-h-0">
          <div className={cn("absolute inset-0 transition-[filter] duration-1000", unlocked ? "blur-0" : "blur-[6px]")}>
            <Halftone src={px(IMG.performance, 800, 700)} alt="Anteprima della masterclass filmata" className="absolute inset-0" zoom={false} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
          <div className="absolute inset-0 grid place-items-center">
            <span
              className={cn(
                "grid h-14 w-14 place-items-center rounded-full transition-all duration-700",
                unlocked ? "scale-110 bg-volt text-ink" : "bg-paper-3/90 text-ink"
              )}
            >
              {unlocked ? <Play className="ml-0.5 h-6 w-6" aria-hidden="true" /> : <Lock className="h-6 w-6" aria-hidden="true" />}
            </span>
          </div>
          <p className="absolute bottom-[3cqw] left-[3cqw] right-[3cqw] font-serif text-[clamp(15px,3.6cqw,24px)] italic leading-tight text-paper-3 @xl:text-[clamp(15px,2.3cqw,24px)]">
            Masterclass filmata · 48 min di prove commentate
          </p>
        </div>
        <div className="flex flex-col justify-center gap-[2.4cqw] @xl:gap-[1.6cqw]">
          <p className="text-[clamp(17px,4cqw,28px)] font-extrabold leading-[1.05] tracking-[-0.03em] @xl:text-[clamp(17px,2.6cqw,28px)]">
            {unlocked ? "Masterclass sbloccata. Buona visione!" : "Invita 3 colleghi o appassionati."}
          </p>
          <div className="flex gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className={cn("h-1.5 flex-1 transition-colors duration-500", i < invites ? "bg-ink" : "bg-ink/15")} />
            ))}
          </div>
          <p className="text-[12.5px] leading-snug text-graphite">Niente sconti: in cambio ricevi cultura in più. Ogni invito è tracciato con trasparenza.</p>
          {unlocked ? (
            <button
              type="button"
              onClick={() => setInvites(2)}
              className="inline-flex w-fit items-center gap-1.5 text-[12.5px] font-semibold underline-offset-4 hover:underline"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Riprova la demo
            </button>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-1.5" noValidate>
              <label htmlFor="ref-email" className="sr-only">
                Email del collega da invitare
              </label>
              <div className="flex border border-ink/30 focus-within:border-ink">
                <input
                  id="ref-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@collega.it"
                  aria-invalid={!!error}
                  aria-describedby={error ? "ref-error" : undefined}
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-[13px] outline-none placeholder:text-ink/35"
                />
                <button type="submit" className="inline-flex items-center gap-1.5 bg-ink px-3 text-[12.5px] font-semibold text-paper-3 transition hover:bg-signal-ink">
                  <Send className="h-3.5 w-3.5" aria-hidden="true" /> Invita
                </button>
              </div>
              {error && (
                <span id="ref-error" className="text-[11.5px] font-medium text-signal-ink">
                  {error}
                </span>
              )}
            </form>
          )}
          <button
            type="button"
            onClick={copy}
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-ink/20 px-3 py-1.5 text-[11.5px] font-semibold transition hover:border-ink"
          >
            {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
            <span aria-live="polite">{copied ? "Link copiato" : "Copia link d’invito"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── 5 · Pagina Bianca ──────────────────────────────────────── */
function ScreenBlank() {
  return (
    <div className="flex h-full flex-col">
      <TopBar left="Stati Generali della Danza · Dossier 02" right="pag. 117" />
      <div className="flex flex-1 flex-col gap-[2.4cqw] p-[5cqw] @xl:gap-[1.6cqw] @xl:p-[3.6cqw]">
        <p className="label text-signal-ink">La Pagina Bianca</p>
        <p className="text-[clamp(18px,4.6cqw,34px)] font-extrabold leading-none tracking-[-0.035em] @xl:text-[clamp(18px,3cqw,34px)]">
          Tre domande al decisore pubblico
        </p>
        <p className="font-mono text-[10.5px] uppercase tracking-wider text-graphite">
          Inviate il 12 marzo 2026 · Chiusura redazionale il 30 aprile 2026
        </p>
        <ol className="hidden space-y-1 text-[12.5px] leading-snug text-ink/80 @lg:block">
          <li>1. Quali risorse strutturali per le carriere dei danzatori nel prossimo triennio?</li>
          <li>2. Con quali criteri verranno riformati i finanziamenti alle compagnie?</li>
          <li>3. Come garantire l’accesso alla danza nei territori senza teatri?</li>
        </ol>
        <div className="relative mt-1 grid flex-1 place-items-center border border-dashed border-ink/25 bg-paper-3">
          <div className="-rotate-[8deg] border-[3px] border-signal px-[3cqw] py-[1.5cqw] text-center text-signal mix-blend-multiply">
            <p className="text-[clamp(13px,3.2cqw,24px)] font-black uppercase leading-none tracking-[-0.01em] @xl:text-[clamp(13px,2.2cqw,24px)]">
              Nessuna risposta pervenuta
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider">entro la chiusura redazionale</p>
          </div>
        </div>
        <p className="font-serif text-[clamp(12px,2.4cqw,16px)] italic leading-snug text-graphite @xl:text-[clamp(12px,1.5cqw,16px)]">
          Questa pagina resta deliberatamente bianca. Sarà aggiornata se e quando arriverà una presa di posizione ufficiale.
        </p>
      </div>
    </div>
  );
}

const SCREENS: Record<TabId, ComponentType> = {
  film: ScreenFilm,
  map: ScreenMap,
  poll: ScreenPoll,
  referral: ScreenReferral,
  blank: ScreenBlank,
};

export function Showcase() {
  const [tab, setTab] = useState<TabId>("film");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const idx = TABS.findIndex((t) => t.id === tab);
  const Screen = SCREENS[tab];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const n = TABS.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (idx + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (idx - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setTab(TABS[next].id);
      refs.current[next]?.focus();
    }
  };

  return (
    <section id="opera" aria-labelledby="opera-title" className="ink-stage relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="grid-paper-dark pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_60%_50%,#000,transparent)]" />
      <div className="wrap relative">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              dark
              id="opera-title"
              index="04"
              kicker="Dentro l’opera · Product showcase"
              title={
                <>
                  Sfoglia un libro che <Em className="text-volt">si muove</Em>.
                </>
              }
              intro="Cinque esperienze native che il lettore vive pagina dopo pagina. Tocca le schede ed esplora l’interfaccia: tutto ciò che vedi è interattivo."
            />
          </div>
          <Reveal delay={200} className="hidden justify-end lg:col-span-5 lg:flex">
            <Sticker text="4K · MAPPE · VOCI · DATI · INCHIESTE · " size={128} className="text-paper/80">
              <span className="font-pixel text-xs text-volt">IM</span>
            </Sticker>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* schede */}
          <div className="lg:col-span-4">
            <div
              role="tablist"
              aria-label="Esperienze dell’opera"
              aria-orientation="vertical"
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
            >
              {TABS.map((t, i) => {
                const selected = t.id === tab;
                return (
                  <button
                    key={t.id}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    role="tab"
                    type="button"
                    id={`show-tab-${t.id}`}
                    aria-selected={selected}
                    aria-controls="show-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTab(t.id)}
                    onKeyDown={onKey}
                    className={cn(
                      "group relative flex shrink-0 items-start gap-4 rounded-full border px-4 py-2.5 text-left transition-colors duration-500 lg:rounded-none lg:border-0 lg:border-b lg:px-0 lg:py-5",
                      selected ? "border-paper-3 bg-paper-3 text-ink lg:bg-transparent lg:text-paper-3" : "border-paper/15 text-paper/60 hover:text-paper-3",
                      "lg:border-paper/12"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-500 max-lg:hidden",
                        selected ? "bg-volt text-ink" : "bg-paper/8 text-paper/70 group-hover:bg-paper/15"
                      )}
                    >
                      <t.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="flex items-center gap-2 text-[0.95rem] font-semibold">
                        <t.icon className="h-4 w-4 lg:hidden" aria-hidden="true" />
                        {t.title}
                      </span>
                      <span className="mt-1 hidden text-[0.88rem] leading-snug text-paper/55 lg:block">{t.text}</span>
                    </span>
                    {selected && (
                      <span aria-hidden="true" className="absolute -bottom-px left-0 hidden h-[2px] w-full origin-left bg-volt lg:block panel-in" />
                    )}
                  </button>
                );
              })}
            </div>
            <ul className="mt-8 hidden flex-wrap gap-2 lg:flex">
              {["4K HDR", "Audio spaziale", "Offline", "WCAG 2.2 AA", "Multi-device", "Puntate mensili"].map((s) => (
                <li key={s} className="rounded-full border border-paper/15 px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider text-paper/60">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* dispositivo */}
          <Reveal variant="scale" className="relative lg:col-span-8">
            <div aria-hidden="true" className="absolute -inset-8 bg-[radial-gradient(closest-side,rgba(255,45,115,0.22),transparent)] blur-2xl" />
            <div className="relative rounded-[2rem] bg-[#141414] p-[10px] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.95),inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:p-[14px]">
              <span aria-hidden="true" className="absolute left-1/2 top-[3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#2c2c2c] sm:top-[4px]" />
              <div
                id="show-panel"
                role="tabpanel"
                aria-labelledby={`show-tab-${tab}`}
                className="@container relative aspect-[4/5] overflow-hidden rounded-[1.3rem] bg-paper-3 text-ink sm:aspect-[4/3]"
              >
                <div key={tab} className="panel-in absolute inset-0">
                  <Screen />
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.14),transparent_32%)]" />
              </div>
            </div>
            <Tape className="-top-3 left-10" rotate={-8} width={110} />
            <Tape className="-bottom-3 right-12" rotate={6} width={90} variant="white" />
            <div aria-hidden="true" className="foil float absolute -right-4 top-1/3 hidden h-14 w-14 rounded-full shadow-2xl sm:block" />
            <p aria-hidden="true" className="label absolute -bottom-9 left-2 text-paper/45" style={{ "--d": "0ms" } as Vars}>
              fig. {String(idx + 1).padStart(2, "0")} — {TABS[idx].title}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
