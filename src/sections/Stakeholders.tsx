import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ArrowRight, ArrowUpRight, Briefcase, Check, Cpu, Landmark, Newspaper, Users } from "lucide-react";
import { cn } from "@/utils/cn";
import { STAKEHOLDERS, moduleById, px, type StakeholderId } from "@/data/content";
import { useAppState } from "@/lib/app-state";
import { Counter, Em, Halftone, Reveal, SectionHeading, Tape } from "@/components/ui";
import { formatIt } from "@/lib/format";

const ICONS: Record<StakeholderId, typeof Landmark> = {
  fondazioni: Landmark,
  aziende: Briefcase,
  istituzioni: Newspaper,
  community: Users,
  tech: Cpu,
};

const BARS: Record<StakeholderId, number[]> = {
  fondazioni: [34, 46, 52, 61, 74, 88],
  aziende: [28, 40, 38, 57, 69, 92],
  istituzioni: [22, 35, 49, 58, 66, 84],
  community: [40, 44, 58, 63, 79, 90],
  tech: [18, 30, 42, 55, 71, 86],
};

export function Stakeholders() {
  const { stakeholder, setStakeholder, setActiveModule, setFormRole, goTo } = useAppState();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const activeIndex = STAKEHOLDERS.findIndex((s) => s.id === stakeholder);
  const s = STAKEHOLDERS[activeIndex] ?? STAKEHOLDERS[0];
  const Icon = ICONS[s.id];

  const measure = () => {
    const el = tabRefs.current[activeIndex];
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  };

  useLayoutEffect(measure, [activeIndex]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // tieni visibile la tab attiva su mobile
  useEffect(() => {
    const el = tabRefs.current[activeIndex];
    const list = listRef.current;
    if (!el || !list) return;
    const target = el.offsetLeft - list.clientWidth / 2 + el.offsetWidth / 2;
    list.scrollTo({ left: target, behavior: "smooth" });
  }, [activeIndex]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const n = STAKEHOLDERS.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (activeIndex + 1) % n;
    else if (e.key === "ArrowLeft") next = (activeIndex - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setStakeholder(STAKEHOLDERS[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section id="stakeholder" aria-labelledby="stakeholder-title" className="relative py-20 sm:py-28">
      <div aria-hidden="true" className="beige-patch torn absolute inset-x-0 top-24 -z-10 h-[78%] opacity-70 sm:inset-x-6" />
      <div className="wrap">
        <SectionHeading
          id="stakeholder-title"
          index="02"
          kicker="Per ogni stakeholder"
          title={
            <>
              Un’opera, <Em>cinque modi</Em> di farne parte.
            </>
          }
          intro="Scegli il tuo profilo. Per ciascuno trovi cosa vive il pubblico, cosa ottieni tu e gli indicatori che misurano il ritorno — con target numerici verificabili."
        />

        {/* Tabs */}
        <Reveal delay={120} className="relative mt-12">
          <div
            ref={listRef}
            role="tablist"
            aria-label="Profili di stakeholder"
            className="no-scrollbar relative -mx-5 flex gap-1 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0"
          >
            <span
              aria-hidden="true"
              className="absolute bottom-1 top-0 rounded-full bg-ink transition-[left,width] duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{ left: indicator.left, width: indicator.width }}
            />
            {STAKEHOLDERS.map((st, i) => {
              const TabIcon = ICONS[st.id];
              const selected = st.id === stakeholder;
              return (
                <button
                  key={st.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${st.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${st.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setStakeholder(st.id)}
                  onKeyDown={onKeyDown}
                  className={cn(
                    "relative z-10 inline-flex min-h-12 shrink-0 items-center gap-2.5 rounded-full px-5 text-[0.92rem] font-semibold transition-colors duration-300",
                    selected ? "text-paper-3" : "text-ink/65 hover:text-ink"
                  )}
                >
                  <TabIcon className="h-4 w-4" aria-hidden="true" />
                  {st.label}
                </button>
              );
            })}
          </div>
          <div className="mt-1 h-px bg-ink/15" aria-hidden="true" />
        </Reveal>

        {/* Pannello */}
        <div
          key={s.id}
          role="tabpanel"
          id={`panel-${s.id}`}
          aria-labelledby={`tab-${s.id}`}
          tabIndex={0}
          className="panel-in mt-10 grid gap-12 focus-visible:outline-offset-8 lg:grid-cols-12 lg:gap-14"
        >
          <div className="lg:col-span-7">
            <p className="label flex items-center gap-2 text-graphite">
              <Icon className="h-3.5 w-3.5" aria-hidden="true" /> Per · {s.target}
            </p>
            <h3 className="balance mt-5 text-[clamp(1.9rem,3.8vw,3.05rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
              {s.headline} <Em className="text-signal-ink">{s.highlight}</Em>.
            </h3>
            <p className="pretty mt-5 max-w-2xl text-[1.06rem] leading-relaxed text-graphite">{s.body}</p>

            <div className="mt-8 grid gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-2">
              <div className="bg-paper-3/80 p-5">
                <p className="label text-graphite">Il pubblico vive · valore editoriale</p>
                <p className="mt-2 font-serif text-[1.3rem] italic leading-snug">{s.publicLives}</p>
              </div>
              <div className="bg-ink p-5 text-paper-3">
                <p className="label text-volt">Tu ottieni · impatto & KPI</p>
                <p className="mt-2 font-serif text-[1.3rem] italic leading-snug">{s.partnerGets}</p>
              </div>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {s.benefits.map((b, i) => (
                <li key={b} className="fade-up flex gap-3" style={{ "--d": `${120 + i * 70}ms` } as CSSProperties}>
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center bg-ink text-paper-3">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="leading-snug">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="label text-graphite">Target a 12 mesi</p>
              <dl className="mt-3 grid grid-cols-3 gap-4 border-y border-ink/15 py-5">
                {s.kpis.map((k) => (
                  <div key={k.label} className="flex flex-col-reverse gap-1.5">
                    <dt className="text-[0.8rem] leading-snug text-graphite">{k.label}</dt>
                    <dd className="text-[clamp(1.5rem,3.2vw,2.4rem)] font-extrabold leading-none tracking-[-0.04em]">
                      <Counter value={k.value} decimals={k.decimals ?? 0} prefix={k.prefix ?? ""} suffix={k.suffix ?? ""} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8">
              <p className="label text-graphite">Moduli dell’ecosistema consigliati</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.modules.map((id) => {
                  const m = moduleById(id);
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModule(id);
                          goTo("ecosistema");
                        }}
                        className="chip group"
                      >
                        <span className="font-pixel text-[11px] text-signal-ink group-hover:text-ink">{id}</span>
                        {m.short}
                        <ArrowUpRight className="btn-arrow-up h-3.5 w-3.5 opacity-50 transition group-hover:opacity-100" aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setFormRole(s.id);
                  goTo("contatti");
                }}
                className="btn btn-primary"
              >
                {s.cta}
                <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
              </button>
              <span className="text-sm text-graphite">Risposta entro 48 ore lavorative</span>
            </div>
          </div>

          {/* Visual collage */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:sticky lg:top-28">
              <div className="relative rotate-[1.5deg] bg-paper-3 p-3 pb-14 shadow-[0_30px_60px_-30px_rgba(14,14,14,0.55)]">
                <Halftone src={px(s.image, 800, 1000)} alt={s.imageAlt} className="aspect-[4/5] w-full" />
                <p className="absolute bottom-4 left-4 font-serif text-xl italic">Per {s.label}</p>
                <span className="label absolute bottom-5 right-4 text-graphite">fig. {String(activeIndex + 1).padStart(2, "0")}</span>
                <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={-3} width={120} />
              </div>

              {/* report in vetro "carta da lucido" */}
              <div className="vellum float-slow absolute -bottom-10 -left-4 w-[68%] rounded-2xl p-4 sm:-left-10">
                <div className="flex items-center justify-between">
                  <p className="label text-graphite">Report d’impatto · T2</p>
                  <span className="pulse-dot h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
                </div>
                <div className="mt-3 flex h-20 items-end gap-1.5" aria-hidden="true">
                  {BARS[s.id].map((h, i) => (
                    <span
                      key={i}
                      className={cn("fade-up flex-1 origin-bottom", i === 5 ? "bg-signal" : "bg-ink/80")}
                      style={{ height: `${h}%`, "--d": `${200 + i * 70}ms` } as CSSProperties}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm font-semibold">
                  {s.kpis[0].prefix}
                  {formatIt(s.kpis[0].value, s.kpis[0].decimals ?? 0)}
                  {s.kpis[0].suffix} <span className="font-normal text-graphite">· {s.kpis[0].label}</span>
                </p>
              </div>

              <div className="neon-box absolute -right-3 -top-6 rotate-[8deg] px-4 py-3.5 shadow-xl sm:-right-6">
                <span className="neon-flicker block whitespace-nowrap font-pixel text-[12px] leading-none text-neon [text-shadow:0_0_6px_rgba(255,45,115,0.9),0_0_16px_rgba(255,45,115,0.6)]">
                  {s.short.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
