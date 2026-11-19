import { TrendingUp, Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Kpi } from "@/data/content";
import { useInView } from "@/lib/hooks";
import { formatKpi, kpiAffixes, uplift } from "@/lib/format";
import { Counter } from "./ui";

export function KpiCard({
  kpi,
  horizon = 12,
  dark = false,
  className,
}: {
  kpi: Kpi;
  horizon?: 12 | 24;
  dark?: boolean;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const value = horizon === 12 ? kpi.t12 : kpi.t24;
  const other = horizon === 12 ? kpi.t24 : kpi.t12;
  const { prefix, suffix } = kpiAffixes(kpi);
  const up = uplift(kpi, value);
  const fill = Math.min(100, (value / kpi.t24) * 100);
  const tick = kpi.baselineValue > 0 ? Math.min(100, (kpi.baselineValue / kpi.t24) * 100) : null;

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-full flex-col p-5 sm:p-6",
        dark ? "bg-ink-2 text-paper-3" : "bg-paper-3",
        className
      )}
    >
      <p className="text-[0.95rem] font-semibold leading-snug">{kpi.name}</p>
      <p className={cn("mt-1.5 text-[0.84rem] leading-snug", dark ? "text-paper/60" : "text-graphite")}>{kpi.definition}</p>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <p className="text-[clamp(2.1rem,3.6vw,2.9rem)] font-extrabold leading-none tracking-[-0.045em]">
          <Counter value={value} decimals={kpi.decimals ?? 0} prefix={prefix} suffix={suffix} duration={1300} />
        </p>
        <p className={cn("pb-1 font-mono text-[11px] uppercase tracking-wider", dark ? "text-paper/55" : "text-graphite")}>
          {horizon === 12 ? "24 mesi" : "12 mesi"} → {formatKpi(kpi, other)}
        </p>
      </div>

      {/* barra: valore sul target a 24 mesi + tacca benchmark */}
      <div className="relative mt-4" aria-hidden="true">
        <div className={cn("h-[5px] w-full", dark ? "bg-paper/10" : "bg-ink/10")}>
          <div
            className={cn("h-full transition-[width] duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)]", dark ? "bg-volt" : "bg-ink")}
            style={{ width: inView ? `${fill}%` : "0%" }}
          />
        </div>
        {tick !== null && (
          <span className="absolute -top-1 h-[13px] w-[2px] bg-signal" style={{ left: `calc(${tick}% - 1px)` }} title="benchmark" />
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.75rem] font-semibold",
            up.tone === "up"
              ? dark
                ? "bg-volt text-ink"
                : "bg-ink text-paper-3"
              : "bg-signal text-paper-3"
          )}
        >
          {up.tone === "up" ? <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" /> : <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />}
          {up.label}
        </span>
        <span className={cn("text-[0.8rem]", dark ? "text-paper/60" : "text-graphite")}>
          <span className="mr-1 inline-block h-2 w-[2px] bg-signal align-middle" aria-hidden="true" />
          {kpi.baseline}
        </span>
      </div>

      {kpi.extra && (
        <p className={cn("mt-3 border-l-2 pl-3 text-[0.84rem] leading-snug", dark ? "border-volt/60 text-paper/75" : "border-signal text-ink/80")}>
          {kpi.extra}
        </p>
      )}

      <p
        className={cn(
          "mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4 font-mono text-[10.5px] uppercase tracking-wider",
          dark ? "text-paper/45" : "text-smoke"
        )}
      >
        <span>Frequenza · {kpi.frequency}</span>
        <span>Fonte · {kpi.source}</span>
      </p>
    </div>
  );
}
