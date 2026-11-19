import { useState, type FormEvent, type MouseEvent } from "react";
import { ArrowUp, ArrowRight, Check } from "lucide-react";
import { STAKEHOLDERS, type StakeholderId } from "@/data/content";
import { useAppState } from "@/lib/app-state";
import { Logo } from "./Navbar";
import { PixelGlyph } from "./ui";

export function Footer() {
  const { goTo, setStakeholder } = useAppState();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const nav = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    goTo(id);
  };
  const toStakeholder = (id: StakeholderId) => (e: MouseEvent) => {
    e.preventDefault();
    setStakeholder(id);
    goTo("stakeholder");
  };
  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Inserisci un indirizzo email valido");
      return;
    }
    setError("");
    setDone(true);
  };

  const columns = [
    {
      title: "Ecosistema",
      links: [
        { label: "Manifesto", id: "manifesto" },
        { label: "13 moduli", id: "ecosistema" },
        { label: "Dentro l’opera", id: "opera" },
        { label: "Cruscotto KPI", id: "impatto" },
      ],
    },
    {
      title: "Risorse",
      links: [
        { label: "Pacchetti", id: "pacchetti" },
        { label: "Calcolatore d’impatto", id: "calcolatore" },
        { label: "Domande frequenti", id: "faq" },
        { label: "Dossier partner", id: "contatti" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden pb-8 pt-20" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Informazioni su Innovation Multimedial
      </h2>
      <div className="wrap">
        {/* wordmark gigante */}
        <div aria-hidden="true" className="relative select-none border-b border-ink pb-8">
          <p className="flex flex-wrap items-end gap-x-[2vw] leading-[0.8]">
            <span className="text-[clamp(3.2rem,12.5vw,11.5rem)] font-black tracking-[-0.06em]">Innovation</span>
            <span className="irid mb-[1.2vw] hidden h-[clamp(2.5rem,7vw,6.5rem)] w-[clamp(2.5rem,7vw,6.5rem)] rounded-full sm:block" />
          </p>
          <p className="mt-2 flex items-end justify-between gap-6 leading-[0.8]">
            <span className="font-serif text-[clamp(3.4rem,13vw,12rem)] italic tracking-[-0.03em]">Multimedial</span>
            <PixelGlyph char="M" seed={23} className="mb-[1vw] hidden w-[clamp(3rem,7vw,6rem)] md:grid" />
          </p>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="pretty mt-5 max-w-sm leading-relaxed text-graphite">
              Editoria d’innovazione per la danza e le arti performative. Un libro multimediale che diventa ecosistema
              culturale, di sviluppo e di advocacy.
            </p>
            <form onSubmit={subscribe} className="mt-8 max-w-sm" noValidate>
              <label htmlFor="newsletter" className="label text-graphite">
                Ricevi le Cronache del Movimento
              </label>
              {done ? (
                <p className="mt-3 flex items-center gap-2 font-semibold" role="status">
                  <Check className="h-4 w-4" aria-hidden="true" /> Iscrizione confermata: la prossima puntata arriva a te.
                </p>
              ) : (
                <>
                  <div className="mt-3 flex border-b-[1.5px] border-ink/30 focus-within:border-ink">
                    <input
                      id="newsletter"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="la-tua@email.it"
                      aria-invalid={!!error}
                      aria-describedby={error ? "newsletter-error" : undefined}
                      className="min-w-0 flex-1 bg-transparent py-3 outline-none placeholder:text-ink/35"
                    />
                    <button type="submit" aria-label="Iscriviti alla newsletter" className="group grid w-11 place-items-center">
                      <ArrowRight className="btn-arrow h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  {error && (
                    <p id="newsletter-error" className="mt-1.5 text-[0.8rem] font-medium text-signal-ink">
                      {error}
                    </p>
                  )}
                </>
              )}
            </form>
          </div>

          <nav aria-label="Stakeholder" className="md:col-span-3">
            <p className="label text-graphite">Stakeholder</p>
            <ul className="mt-5 space-y-2.5">
              {STAKEHOLDERS.map((s) => (
                <li key={s.id}>
                  <a href="#stakeholder" onClick={toStakeholder(s.id)} className="link-underline font-medium">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title} className="md:col-span-2">
              <p className="label text-graphite">{c.title}</p>
              <ul className="mt-5 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={`#${l.id}`} onClick={nav(l.id)} className="link-underline font-medium">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* riga social, come nel poster */}
        <div className="flex flex-col gap-6 border-t border-ink/15 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.12em]">
            <li>
              Instagram <b>@innovation.multimedial</b>
            </li>
            <li>
              LinkedIn <b>innovation-multimedial</b>
            </li>
            <li>
              Vimeo <b>/innovationmultimedial</b>
            </li>
            <li>
              Podcast <b>cronache del movimento</b>
            </li>
          </ul>
          <div className="flex items-center justify-between gap-6">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-graphite">
              © 2026 Innovation Multimedial · Privacy · Cookie · Accessibilità
            </p>
            <a
              href="#top"
              onClick={nav("top")}
              aria-label="Torna all’inizio della pagina"
              className="group grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-paper-3 transition hover:bg-signal-ink"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
