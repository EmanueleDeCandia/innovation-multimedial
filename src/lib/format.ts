import type { Kpi } from "@/data/content";

/** Formattazione numerica italiana deterministica: 8500 → "8.500", 9.4 → "9,4". */
export function formatIt(n: number, decimals = 0): string {
  const fixed = Math.abs(n).toFixed(decimals);
  const [int, dec] = fixed.split(".");
  const intWithDots = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (n < 0 ? "-" : "") + intWithDots + (dec ? "," + dec : "");
}

export function kpiAffixes(kpi: Pick<Kpi, "unit">): { prefix: string; suffix: string } {
  switch (kpi.unit) {
    case "currency":
      return { prefix: "€", suffix: "" };
    case "percent":
      return { prefix: "", suffix: "%" };
    case "minutes":
      return { prefix: "", suffix: " min" };
    case "ratio":
      return { prefix: "", suffix: "×" };
    default:
      return { prefix: "", suffix: "" };
  }
}

/** Valore compatto per spazi stretti: 220000 → "220k", 1200000 → "1,2M". */
export function compact(n: number): string {
  if (n >= 1_000_000) return formatIt(n / 1_000_000, n % 1_000_000 === 0 ? 0 : 1) + "M";
  if (n >= 10_000) return formatIt(Math.round(n / 1000)) + "k";
  return formatIt(n, Number.isInteger(n) ? 0 : 1);
}

export function formatKpi(kpi: Kpi, value: number): string {
  const { prefix, suffix } = kpiAffixes(kpi);
  return `${prefix}${formatIt(value, kpi.decimals ?? 0)}${suffix}`;
}

/** Scostamento rispetto al benchmark, espresso nel modo più leggibile. */
export function uplift(kpi: Kpi, value: number): { label: string; tone: "up" | "new" } {
  if (kpi.baselineValue === 0) return { label: "Nuovo asset · da zero", tone: "new" };
  if (kpi.unit === "percent") {
    const diff = value - kpi.baselineValue;
    const dec = Number.isInteger(diff) ? 0 : 1;
    return { label: `+${formatIt(diff, dec)} pt vs benchmark`, tone: "up" };
  }
  const ratio = value / kpi.baselineValue;
  const dec = ratio >= 10 ? 0 : 1;
  return { label: `${formatIt(ratio, dec)}× il benchmark`, tone: "up" };
}
