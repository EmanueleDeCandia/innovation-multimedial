import { useMemo, useState } from "react";
import { ChevronDown, Download, Info } from "lucide-react";
import { cn } from "@/utils/cn";
import { MODULES, STAKEHOLDERS, type StakeholderId } from "@/data/content";
import { useAppState } from "@/lib/app-state";
import { Counter, Em, Reveal, SectionHeading, Tape } from "@/components/ui";
import { KpiCard } from "@/components/KpiCard";

type Group = "tutti" | "A" | "B";

const kpi = (moduleId: string, i: 0 | 1) => MODULES.find((m) => m.id === moduleId)!.kpis[i];

/** Aggregati derivati in modo trasparente dagli indicatori di modulo. */
function aggregates(h: 12 | 24) {
  const v = (moduleId: string, i: 0 | 1) => (h === 12 ? kpi(moduleId, i).t12 : kpi(moduleId, i).t24);
  const contracts = h === 12 ? 40 : 90;
  const revenue = v("4.1", 0) + v("4.5", 0) + v("3.1", 1) * contracts;
  const audience = v("3.5", 1) + (h === 12 ? 150000 : 400000) + v("4.4", 0);
  return [
    {
      value: revenue,
      prefix: "€",
      label: "ricavi diretti attivati",
      note: `ARR licenze + sponsor tecnici + ${contracts} contratti × ACV`,
    },
    {
      value: audience,
      label: "persone raggiunte",
      note: "diffusione phygital + reach istituzionale + guide attivate",
    },
    { value: v("3.4", 0), prefix: "€", label: "earned media value", note: "copertura a investimento media zero" },
    { value: v("4.6", 1), label: "profili consensati", note: "zero-party data, 100% GDPR" },
  ] as { value: number; prefix?: string; label: string; note: string }[];
}

export function Impact() {
  const { setFormInterest, goTo } = useAppState();
  const [horizon, setHorizon] = useState<12 | 24>(12);
  const [group, setGroup] = useState<Group>("tutti");
  const [who, setWho] = useState<"tutti" | StakeholderId>("tutti");
  const [expanded, setExpanded] = useState(false);

  const list = useMemo(
    () =>
      MODULES.filter((m) => (group === "tutti" ? true : m.group === group)).filter((m) =>
        who === "tutti" ? true : m.stakeholders.includes(who)
      ),
    [group, who]
  );
  const visible = expanded ? list : list.slice(0, 4);
  const agg = aggregates(horizon);

  return (
    <section id="impatto" aria-labelledby="impatto-title" className="relative py-20 sm:py-28">
      <div className="wrap">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading
              id="impatto-title"
              index="05"
              kicker="Cruscotto d’impatto · 26 KPI"
              title={
                <>
                  Impatto che si può <Em>misurare</Em>, non solo raccontare.
                </>
              }
              intro="Due indicatori per ciascuno dei 13 moduli, con benchmark di partenza, target a 12 e 24 mesi, frequenza e fonte di rilevazione. Ogni partner accede ai propri dati in tempo reale."
            />
          </div>
          <Reveal delay={150} className="lg:col-span-4 lg:justify-self-end">
            {/* selettore orizzonte */}
            <div role="radiogroup" aria-label="Orizzonte temporale dei target" className="relative inline-grid grid-cols-2 rounded-full border border-ink bg-paper-3 p-1">
              <span
                aria-hidden="true"
                className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
                style={{ transform: horizon === 24 ? "translateX(100%)" : "translateX(0)" }}
              />
              {([12, 24] as const).map((h) => (
                <button
                  key={h}
                  type="button"
                  role="radio"
                  aria-checked={horizon === h}
                  onClick={() => setHorizon(h)}
                  className={cn(
                    "relative z-10 min-h-11 rounded-full px-6 text-sm font-semibold transition-colors duration-300",
                    horizon === h ? "text-paper-3" : "text-ink/70 hover:text-ink"
                  )}
                >
                  Target {h} mesi
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* aggregati */}
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-ink bg-ink lg:grid-cols-4">
          {agg.map((a, i) => (
            <Reveal key={a.label} delay={i * 80} className="relative flex flex-col-reverse justify-end gap-2 bg-paper-3 p-5 sm:p-7">
              <dt>
                <span className="block font-semibold leading-snug">{a.label}</span>
                <span className="mt-1 block text-[0.8rem] leading-snug text-graphite">{a.note}</span>
              </dt>
              <dd className="whitespace-nowrap text-[clamp(1.5rem,3vw,2.75rem)] font-extrabold leading-none tracking-[-0.045em]">
                <Counter value={a.value} prefix={a.prefix ?? ""} duration={1200} />
              </dd>
              {i === 0 && <Tape className="-top-2 right-5" rotate={-8} width={60} height={16} variant="red" />}
            </Reveal>
          ))}
        </dl>

        {/* filtri */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filtra per gruppo" className="flex flex-wrap gap-2">
            {(
              [
                { id: "tutti", label: "Tutti", n: 26 },
                { id: "A", label: "Pilastri", n: 12 },
                { id: "B", label: "Estensioni", n: 14 },
              ] as const
            ).map((g) => (
              <button key={g.id} type="button" className="chip" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
                {g.label} <span className="font-mono text-[10px] opacity-60">{g.n} KPI</span>
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-sm">
            <span className="label text-graphite">Profilo</span>
            <span className="relative">
              <select
                value={who}
                onChange={(e) => setWho(e.target.value as "tutti" | StakeholderId)}
                className="min-h-11 appearance-none rounded-full border border-ink/25 bg-paper-3 py-2 pl-4 pr-10 text-sm font-medium focus:border-ink"
              >
                <option value="tutti">Tutti gli stakeholder</option>
                {STAKEHOLDERS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden="true" />
            </span>
          </label>
        </div>

        {/* schede modulo */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2" aria-live="polite">
          {visible.map((m, i) => (
            <Reveal key={m.id} delay={(i % 2) * 90} className="border border-ink bg-paper-3">
              <div className="flex items-center justify-between gap-4 border-b border-ink px-5 py-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="font-pixel text-[15px] text-signal-ink">{m.id}</span>
                  <h3 className="truncate font-semibold">{m.short}</h3>
                </div>
                <span className="label shrink-0 text-graphite">{m.group === "A" ? "Pilastro" : "Estensione"}</span>
              </div>
              <div className="grid gap-px bg-ink/15 sm:grid-cols-2">
                {m.kpis.map((k) => (
                  <KpiCard key={k.name} kpi={k} horizon={horizon} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        {list.length === 0 && <p className="mt-8 text-graphite">Nessun modulo corrisponde ai filtri selezionati.</p>}

        {list.length > 4 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="btn btn-ghost"
            >
              {expanded ? "Mostra meno" : `Mostra tutti i ${list.length * 2} indicatori`}
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-500", expanded && "rotate-180")} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* metodo */}
        <Reveal className="mt-14 grid gap-6 border-t border-ink pt-8 md:grid-cols-12">
          <div className="flex items-start gap-3 md:col-span-8">
            <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="pretty text-[0.92rem] leading-relaxed text-graphite">
              <strong className="font-semibold text-ink">Metodo.</strong> I dati sono rilevati da analytics proprietari conformi al
              GDPR, CRM e contratti, codici di riscatto univoci, rassegna stampa monitorata e registri redazionali. I benchmark
              derivano da medie di settore dichiarate e vengono ricalibrati dopo i primi 90 giorni; la{" "}
              <span className="inline-block h-2 w-[2px] bg-signal align-middle" aria-hidden="true" /> tacca rossa indica il benchmark
              sulla scala del target a 24 mesi.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <button
              type="button"
              onClick={() => {
                setFormInterest("dossier");
                goTo("contatti");
              }}
              className="btn btn-primary"
            >
              Ricevi il cruscotto completo
              <Download className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
