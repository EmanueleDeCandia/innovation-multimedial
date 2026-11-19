import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, ChevronDown, Loader2, Mail, MapPin } from "lucide-react";
import { cn } from "@/utils/cn";
import { STAKEHOLDERS } from "@/data/content";
import { useAppState, type FormInterest, type FormRole } from "@/lib/app-state";
import { Reveal, Scribble, Tape } from "@/components/ui";

const ROLES: { id: FormRole; label: string }[] = [
  ...STAKEHOLDERS.map((s) => ({ id: s.id as FormRole, label: s.label })),
  { id: "altro", label: "Altro" },
];

const INTERESTS: { id: FormInterest; label: string }[] = [
  { id: "dossier", label: "Dossier partner (PDF)" },
  { id: "call", label: "Call conoscitiva" },
  { id: "preventivo", label: "Preventivo" },
];

type Values = { name: string; email: string; org: string; message: string; consent: boolean };
type Errors = Partial<Record<keyof Values, string>>;

function ContactForm() {
  const { formRole, setFormRole, formInterest, setFormInterest, formNote } = useAppState();
  const [values, setValues] = useState<Values>({ name: "", email: "", org: "", message: "", consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    if (formNote) setValues((v) => ({ ...v, message: formNote }));
  }, [formNote]);

  const set = <K extends keyof Values>(k: K, v: Values[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = "Inserisci nome e cognome";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) e.email = "Inserisci un indirizzo email valido";
    if (values.org.trim().length < 2) e.org = "Indica l’ente o l’organizzazione";
    if (!values.consent) e.consent = "Serve il consenso per poterti ricontattare";
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const first = (Object.keys(e) as (keyof Values)[])[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1300);
  };

  if (status === "success") {
    const first = values.name.trim().split(" ")[0];
    return (
      <div className="panel-in flex min-h-[520px] flex-col items-start justify-center" role="status" aria-live="polite">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-ink text-volt">
          <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <p className="mt-8 text-[2.4rem] font-extrabold leading-none tracking-[-0.04em]">Grazie, {first}.</p>
        <p className="mt-2 font-serif text-[1.6rem] italic leading-tight">La tua richiesta è in redazione.</p>
        <p className="pretty mt-5 max-w-md leading-relaxed text-graphite">
          {formInterest === "dossier"
            ? `Il dossier partner sta arrivando a ${values.email}.`
            : `Abbiamo ricevuto la tua richiesta di ${formInterest === "call" ? "call conoscitiva" : "preventivo"}.`}{" "}
          Una persona della redazione partnership ti contatterà entro 48 ore lavorative.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setValues({ name: "", email: "", org: "", message: "", consent: false });
          }}
          className="btn btn-ghost mt-8"
        >
          Invia un’altra richiesta
        </button>
      </div>
    );
  }

  const err = (k: keyof Values) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-1.5 text-[0.8rem] font-medium text-signal-ink">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Richiesta di partnership" className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="label text-graphite">
            Nome e cognome *
          </label>
          <input
            id="f-name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "e-name" : undefined}
            className="field"
            placeholder="Giulia Rossi"
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor="f-email" className="label text-graphite">
            Email *
          </label>
          <input
            id="f-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "e-email" : undefined}
            className="field"
            placeholder="giulia@fondazione.it"
          />
          {err("email")}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="f-org" className="label text-graphite">
            Ente / organizzazione *
          </label>
          <input
            id="f-org"
            autoComplete="organization"
            value={values.org}
            onChange={(e) => set("org", e.target.value)}
            aria-invalid={!!errors.org}
            aria-describedby={errors.org ? "e-org" : undefined}
            className="field"
            placeholder="Fondazione, azienda, festival…"
          />
          {err("org")}
        </div>
        <div>
          <label htmlFor="f-role" className="label text-graphite">
            Profilo
          </label>
          <div className="relative">
            <select
              id="f-role"
              value={formRole}
              onChange={(e) => setFormRole(e.target.value as FormRole)}
              className="field cursor-pointer appearance-none pr-8"
            >
              {ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden="true" />
          </div>
        </div>
      </div>

      <fieldset>
        <legend className="label text-graphite">Mi interessa</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTERESTS.map((i) => (
            <label key={i.id} className="cursor-pointer">
              <input
                type="radio"
                name="interest"
                value={i.id}
                checked={formInterest === i.id}
                onChange={() => setFormInterest(i.id)}
                className="peer sr-only"
              />
              <span className="chip peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper-3 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal-ink peer-focus-visible:[outline-style:solid]">
                {formInterest === i.id && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                {i.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="f-message" className="label text-graphite">
          Messaggio <span className="normal-case tracking-normal">(facoltativo)</span>
        </label>
        <textarea
          id="f-message"
          rows={3}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          className="field resize-none"
          placeholder="Raccontaci il tuo progetto, il territorio o il pubblico che vuoi raggiungere."
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.88rem] leading-snug text-graphite">
          <input
            id="f-consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "e-consent" : undefined}
            className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#0e0e0e]"
          />
          <span>
            Acconsento al trattamento dei dati personali secondo l’informativa privacy (GDPR) per essere ricontattato. *
          </span>
        </label>
        {err("consent")}
      </div>

      <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full disabled:opacity-80">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Invio in corso…
          </>
        ) : (
          <>
            Invia la richiesta
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
      <p className="text-center text-[0.78rem] text-graphite">Nessuno spam. Solo cultura, dati e proposte concrete.</p>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contatti" aria-labelledby="contatti-title" className="ink-stage relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="grid-paper-dark pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_60%_at_20%_40%,#000,transparent)]" />
      <div className="wrap relative grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal className="flex items-center gap-3">
            <span className="font-pixel text-sm text-volt">09</span>
            <span className="h-px w-10 bg-current opacity-50" />
            <span className="label text-paper/70">Contatti · Diventa partner</span>
          </Reveal>
          <Reveal as="h2" id="contatti-title" data-focus-target delay={80} className="mt-6 leading-[0.88] tracking-[-0.05em]">
            <span className="block text-[clamp(3rem,7.4vw,6.4rem)] font-black">Entra nell’</span>
            <span className="relative inline-block">
              <span className="foil-text foil-bright block pb-2 pr-3 font-serif text-[clamp(3.6rem,9vw,8rem)] italic font-normal tracking-[-0.03em]">
                ecosistema.
              </span>
              <Scribble kind="underline" strokeWidth={3} delay={400} className="absolute -bottom-1 left-0 h-4 w-[92%] text-signal" />
            </span>
          </Reveal>
          <Reveal as="p" delay={160} className="pretty mt-8 max-w-lg text-[1.08rem] leading-relaxed text-paper/70">
            Ogni grande opera ha bisogno di chi la rende possibile. Raccontaci chi sei: ti invieremo il dossier partner con la
            proposta più adatta al tuo profilo e i KPI su cui misureremo insieme l’impatto.
          </Reveal>

          <Reveal delay={240} className="vellum-dark mt-10 max-w-lg rounded-2xl p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="label text-volt">Prossima finestra editoriale</p>
              <span className="pulse-dot h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            </div>
            <p className="mt-3 text-lg font-semibold">Chiusura il 30 giugno 2026</p>
            <p className="mt-1 text-sm text-paper/60">3 capitoli sponsor e 2 edizioni territoriali ancora disponibili</p>
            <div className="mt-4 flex gap-1" aria-hidden="true">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className={cn("h-1.5 flex-1", i < 7 ? "bg-paper/80" : "bg-paper/15")} />
              ))}
            </div>
            <p className="mt-2 font-mono text-[10.5px] uppercase tracking-wider text-paper/50">7 slot su 10 già assegnati</p>
          </Reveal>

          <Reveal delay={300} as="ul" className="mt-10 space-y-3 text-paper/80">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-volt" aria-hidden="true" />
              <a href="mailto:partner@innovationmultimedial.it" className="link-underline">
                partner@innovationmultimedial.it
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-volt" aria-hidden="true" />
              Redazioni a Milano e Ancona
            </li>
          </Reveal>
        </div>

        <Reveal variant="tilt" delay={150} className="relative lg:col-span-6">
          <div className="sheet relative p-6 text-ink sm:p-10">
            <Tape className="-top-3 left-12" rotate={-5} width={120} />
            <Tape className="-right-4 top-16 hidden sm:block" rotate={80} width={70} height={22} variant="white" />
            <p className="font-serif text-[1.7rem] italic leading-tight">Ricevi il dossier partner</p>
            <p className="mt-1 text-sm text-graphite">24 pagine · proposta, pacchetti e cruscotto KPI per il tuo profilo</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
