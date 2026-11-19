import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { useAppState } from "@/lib/app-state";
import { useMagnetic } from "@/lib/hooks";

const LINKS = [
  { id: "manifesto", label: "Manifesto" },
  { id: "stakeholder", label: "Stakeholder" },
  { id: "ecosistema", label: "Ecosistema" },
  { id: "opera", label: "L’opera" },
  { id: "impatto", label: "Impatto" },
  { id: "pacchetti", label: "Pacchetti" },
  { id: "faq", label: "FAQ" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={cn(
          "relative grid h-9 w-9 place-items-center overflow-hidden font-pixel text-[13px] leading-none",
          light ? "bg-paper-3 text-ink" : "bg-ink text-paper-3"
        )}
      >
        IM
        <span className="absolute bottom-0 right-0 h-2 w-2 bg-signal" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-extrabold tracking-[-0.02em]">Innovation</span>
        <span className="font-serif text-[17px] italic leading-[0.9] tracking-[-0.01em]">Multimedial</span>
      </span>
    </span>
  );
}

export function Navbar() {
  const { goTo } = useAppState();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const barRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.18);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Stato "scrolled" + barra di avanzamento della lettura
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll-spy
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Menu mobile: blocco scroll, Esc per chiudere, focus iniziale
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 60);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  const navigate = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    window.setTimeout(() => goTo(id), wasOpen ? 80 : 0);
    if (wasOpen) menuBtnRef.current?.focus({ preventScroll: true });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="absolute left-3 top-3 z-[60] -translate-y-24 bg-ink px-4 py-2 text-sm font-semibold text-paper-3 transition focus:translate-y-0"
      >
        Vai al contenuto
      </a>

      <div
        className={cn(
          "relative transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
          scrolled
            ? "border-b border-ink/10 bg-paper/70 shadow-[0_10px_30px_-20px_rgba(14,14,14,0.35)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent"
        )}
      >
        <nav aria-label="Navigazione principale" className="wrap flex h-[68px] items-center justify-between gap-6">
          <a href="#top" onClick={navigate("top")} aria-label="Innovation Multimedial — torna all’inizio" className="shrink-0">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={navigate(l.id)}
                  aria-current={active === l.id ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300",
                    active === l.id ? "text-ink" : "text-ink/60 hover:text-ink"
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left bg-signal transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                      active === l.id ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              ref={ctaRef}
              href="#contatti"
              onClick={navigate("contatti")}
              className="btn btn-primary magnetic hidden !min-h-11 !px-5 text-[13.5px] sm:inline-flex"
            >
              Diventa partner
              <ArrowUpRight className="btn-arrow btn-arrow-up h-4 w-4" aria-hidden="true" />
            </a>
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Chiudi il menu" : "Apri il menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-paper-3/60 backdrop-blur transition hover:border-ink/50 lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-signal" />
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-0 top-[68px] z-40 overflow-y-auto bg-paper transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div className="paper-stage !absolute" aria-hidden="true" />
        <div className="wrap relative flex min-h-full flex-col justify-between gap-10 py-8">
          <ul className="space-y-1">
            {LINKS.map((l, i) => (
              <li
                key={l.id}
                className={cn(
                  "transition-[opacity,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
                style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
              >
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${l.id}`}
                  onClick={navigate(l.id)}
                  className="group flex items-baseline gap-4 border-b border-ink/10 py-3.5"
                >
                  <span className="font-pixel text-xs text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[2rem] font-extrabold leading-none tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2">
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div
            className={cn(
              "space-y-4 transition-[opacity,transform] duration-700",
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            )}
            style={{ transitionDelay: open ? "500ms" : "0ms" }}
          >
            <a href="#contatti" onClick={navigate("contatti")} className="btn btn-primary w-full">
              Diventa partner
              <ArrowUpRight className="btn-arrow btn-arrow-up h-4 w-4" aria-hidden="true" />
            </a>
            <p className="label text-center text-graphite">Editorial First · Business by Design</p>
          </div>
        </div>
      </div>
    </header>
  );
}
