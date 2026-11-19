import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, ChevronDown, Plus } from "lucide-react";
import { cn } from "@/utils/cn";
import { MODULES, STAKEHOLDERS, moduleById, px, type Module, type StakeholderId } from "@/data/content";
import { useAppState } from "@/lib/app-state";
import { Em, Halftone, Reveal, SectionHeading, Tape } from "@/components/ui";
import { KpiCard } from "@/components/KpiCard";

type Filter = "tutti" | StakeholderId;

const SHORT: Record<StakeholderId, string> = {
  fondazioni: "Fondazioni & Enti",
  aziende: "Aziende & Brand",
  istituzioni: "Istituzioni & Media",
  community: "Community",
  tech: "Tech & White-label",
};

function ModuleDetail({ m, inline = false }: { m: Module; inline?: boolean }) {
  const { setFormRole, goTo } = useAppState();
  const [howOpen, setHowOpen] = useState(inline);
  useEffect(() => setHowOpen(inline), [m.id, inline]);

  return (
    <article
      key={m.id}
      aria-labelledby={`${inline ? "m-inline" : "m-detail"}-${m.id}`}
      className={cn("panel-in sheet relative border border-ink/80", inline ? "mt-2 mb-4" : "")}
    >
      {/* testata */}
      <header className="relative grid grid-cols-[1fr_auto] gap-4 border-b border-ink/15 p-5 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-7">
        <div className="relative order-2 h-24 w-20 shrink-0 sm:order-1 sm:h-32 sm:w-28">
          <Halftone src={px(m.image, 360, 460)} alt={m.imageAlt} className="h-full w-full" />
          <Tape className="-top-2.5 left-1/2 -translate-x-1/2" rotate={-6} width={56} height={16} />
        </div>
        <div className="order-1 min-w-0 sm:order-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="irid-text font-pixel text-[1.65rem] leading-none">{m.id}</span>
            <span className="label rounded-full border border-ink/20 px-2.5 py-1 text-graphite">
              {m.group === "A" ? "Pilastro" : "Estensione"}
            </span>
          </div>
          <h3
            id={`${inline ? "m-inline" : "m-detail"}-${m.id}`}
            className="balance mt-3 text-[clamp(1.25rem,2.3vw,1.7rem)] font-bold leading-[1.12] tracking-[-0.025em]"
          >
            {m.title}
          </h3>
          <p className="pretty mt-2 text-[0.95rem] leading-snug text-graphite">{m.tagline}</p>
        </div>
      </header>

      {/* doppia anima */}
      <div className="grid md:grid-cols-2">
        <div className="lined relative p-5 pl-10 sm:p-7 sm:pl-12">
          <p className="label text-graphite">Cosa vive il pubblico · valore editoriale</p>
          <p className="mt-3 font-serif text-[1.5rem] italic leading-[1.1] tracking-[-0.01em]">«{m.theme}»</p>
          <p className="pretty mt-3 text-[0.92rem] leading-relaxed text-ink/80">{m.editorial}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {m.media.map((t) => (
              <li key={t} className="rounded-full bg-ink px-2.5 py-1 text-[0.72rem] font-medium text-paper-3">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="ink-stage relative p-5 sm:p-7">
          <p className="label text-volt">Cosa ottiene il partner · impatto</p>
          <ul className="mt-4 space-y-3.5">
            {m.benefits.map((b) => (
              <li key={b} className="flex gap-3 text-[0.94rem] leading-snug text-paper/90">
                <Plus className="mt-0.5 h-4 w-4 shrink-0 text-volt" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {m.stakeholders.map((s) => (
              <span key={s} className="rounded-full border border-paper/25 px-2.5 py-1 text-[0.72rem] text-paper/75">
                {SHORT[s]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* come lo facciamo */}
      <div className="border-t border-ink/15">
        <button
          type="button"
          onClick={() => setHowOpen((v) => !v)}
          aria-expanded={howOpen}
          aria-controls={`how-${inline ? "i" : "d"}-${m.id}`}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-7"
        >
          <span className="label text-ink">Come lo facciamo · {m.how.length} attività operative</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-500", howOpen && "rotate-180")} aria-hidden="true" />
        </button>
        <div id={`how-${inline ? "i" : "d"}-${m.id}`} className="acc-panel" data-open={howOpen} inert={!howOpen}>
          <div>
            <ol className="space-y-3 px-5 pb-6 sm:px-7">
              {m.how.map((h, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-pixel text-sm text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="pretty text-[0.92rem] leading-relaxed text-ink/85">{h}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* KPI */}
      <div className="border-t border-ink/15">
        <p className="label px-5 pt-5 text-graphite sm:px-7">Metriche di impatto · target a 12 mesi</p>
        <div className="mt-4 grid gap-px bg-ink/15 sm:grid-cols-2">
          {m.kpis.map((k) => (
            <KpiCard key={k.name} kpi={k} />
          ))}
        </div>
      </div>

      <footer className="flex flex-col items-start justify-between gap-3 border-t border-ink/15 p-5 sm:flex-row sm:items-center sm:px-7">
        <p className="text-sm text-graphite">Vuoi attivare questo modulo nel tuo progetto?</p>
        <button
          type="button"
          onClick={() => {
            setFormRole(m.stakeholders[0]);
            goTo("contatti");
          }}
          className="btn btn-primary !min-h-11 text-sm"
        >
          Attiva il modulo {m.id}
          <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
        </button>
      </footer>
    </article>
  );
}

export function Ecosystem() {
  const { activeModule, setActiveModule } = useAppState();
  const [filter, setFilter] = useState<Filter>("tutti");
  const active = moduleById(activeModule);

  const matches = (m: Module) => filter === "tutti" || m.stakeholders.includes(filter);

  const applyFilter = (f: Filter) => {
    setFilter(f);
    const current = moduleById(activeModule);
    if (f !== "tutti" && !current.stakeholders.includes(f)) {
      const first = MODULES.find((m) => m.stakeholders.includes(f));
      if (first) setActiveModule(first.id);
    }
  };

  const groups: { key: "A" | "B"; title: string; sub: string }[] = [
    { key: "A", title: "I 6 pilastri fondamentali", sub: "Gruppo A" },
    { key: "B", title: "Le 7 estensioni modulari", sub: "Gruppo B" },
  ];

  return (
    <section id="ecosistema" aria-labelledby="ecosistema-title" className="relative py-20 sm:py-28">
      <div className="wrap">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading
              id="ecosistema-title"
              index="03"
              kicker="L’ecosistema · 13 moduli"
              title={
                <>
                  Sei pilastri, <Em>sette estensioni</Em>. Un’unica opera.
                </>
              }
              intro="Ogni modulo nasce come contenuto editoriale d’autore e genera, in modo nativo, un impatto misurabile. Filtra per profilo e apri una scheda: tema, attività, benefici e due KPI con target numerici."
            />
          </div>
          <Reveal delay={200} className="lg:col-span-4 lg:text-right">
            <p className="font-pixel text-[clamp(3.5rem,8vw,6.5rem)] leading-none tracking-tight">
              6<span className="text-signal">+</span>7
            </p>
            <p className="label mt-2 text-graphite">moduli · 26 indicatori</p>
          </Reveal>
        </div>

        {/* filtri */}
        <Reveal delay={100} className="mt-10">
          <div role="group" aria-label="Filtra i moduli per stakeholder" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            <button type="button" className="chip" aria-pressed={filter === "tutti"} onClick={() => applyFilter("tutti")}>
              Tutti <span className="font-mono text-[10px] opacity-60">13</span>
            </button>
            {STAKEHOLDERS.map((s) => (
              <button key={s.id} type="button" className="chip" aria-pressed={filter === s.id} onClick={() => applyFilter(s.id)}>
                {s.label}
                <span className="font-mono text-[10px] opacity-60">{MODULES.filter((m) => m.stakeholders.includes(s.id)).length}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* elenco moduli */}
          <div className="lg:col-span-5">
            {groups.map((g) => (
              <div key={g.key} className="mb-10 last:mb-0">
                <div className="flex items-baseline justify-between border-b border-ink pb-3">
                  <h3 className="text-lg font-bold tracking-[-0.02em]">{g.title}</h3>
                  <span className="label text-graphite">{g.sub}</span>
                </div>
                <ul>
                  {MODULES.filter((m) => m.group === g.key).map((m, i) => {
                    const isActive = m.id === active.id;
                    const isMatch = matches(m);
                    return (
                      <Reveal as="li" key={m.id} delay={i * 50} variant="left">
                        <button
                          type="button"
                          onClick={() => setActiveModule(m.id)}
                          aria-pressed={isActive}
                          aria-expanded={isActive}
                          className={cn(
                            "group relative flex w-full items-center gap-4 border-b border-ink/12 px-3 py-4 text-left transition-[background-color,color,opacity,padding] duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                            isActive ? "bg-ink text-paper-3 lg:pl-5" : "hover:bg-paper-3/80 hover:pl-5",
                            !isMatch && !isActive && "opacity-35"
                          )}
                          style={{ "--i": i } as CSSProperties}
                        >
                          <span
                            className={cn(
                              "w-10 shrink-0 font-pixel text-[15px]",
                              isActive ? "text-volt" : "text-signal-ink"
                            )}
                          >
                            {m.id}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold leading-snug">{m.short}</span>
                            <span className={cn("mt-0.5 block truncate font-serif text-[1.02rem] italic", isActive ? "text-paper/70" : "text-graphite")}>
                              {m.theme}
                            </span>
                          </span>
                          <span className="flex shrink-0 items-center gap-1" aria-hidden="true">
                            {m.stakeholders.map((s) => (
                              <span
                                key={s}
                                title={SHORT[s]}
                                className={cn("h-1.5 w-1.5 rounded-full", isActive ? "bg-paper/60" : "bg-ink/40")}
                              />
                            ))}
                          </span>
                          <ChevronDown
                            className={cn("h-4 w-4 shrink-0 transition-transform duration-500 lg:-rotate-90", isActive && "rotate-180 lg:rotate-0 lg:translate-x-1")}
                            aria-hidden="true"
                          />
                        </button>
                        {isActive && (
                          <div className="lg:hidden">
                            <ModuleDetail m={m} inline />
                          </div>
                        )}
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* dettaglio (desktop) */}
          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-[92px] max-h-[calc(100vh-110px)] overflow-y-auto overscroll-contain pb-2 [scrollbar-width:thin]">
              <ModuleDetail m={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
