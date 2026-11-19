import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { StakeholderId } from "@/data/content";
import { prefersReducedMotion } from "./hooks";

export type FormRole = StakeholderId | "altro";
export type FormInterest = "dossier" | "call" | "preventivo";

interface AppState {
  stakeholder: StakeholderId;
  setStakeholder: (id: StakeholderId) => void;
  activeModule: string;
  setActiveModule: (id: string) => void;
  formRole: FormRole;
  setFormRole: (r: FormRole) => void;
  formInterest: FormInterest;
  setFormInterest: (i: FormInterest) => void;
  formNote: string;
  setFormNote: (n: string) => void;
  goTo: (id: string) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [stakeholder, setStakeholder] = useState<StakeholderId>("fondazioni");
  const [activeModule, setActiveModule] = useState("3.1");
  const [formRole, setFormRole] = useState<FormRole>("fondazioni");
  const [formInterest, setFormInterest] = useState<FormInterest>("dossier");
  const [formNote, setFormNote] = useState("");

  const goTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = prefersReducedMotion();
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    const target = el.querySelector<HTMLElement>("[data-focus-target]") ?? el;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    window.setTimeout(() => target.focus({ preventScroll: true }), reduce ? 0 : 700);
    if (typeof history !== "undefined") history.replaceState(null, "", `#${id}`);
  }, []);

  const value = useMemo(
    () => ({
      stakeholder,
      setStakeholder,
      activeModule,
      setActiveModule,
      formRole,
      setFormRole,
      formInterest,
      setFormInterest,
      formNote,
      setFormNote,
      goTo,
    }),
    [stakeholder, activeModule, formRole, formInterest, formNote, goTo]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState deve essere usato dentro AppStateProvider");
  return ctx;
}
