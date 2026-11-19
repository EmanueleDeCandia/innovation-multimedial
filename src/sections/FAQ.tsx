import { useState } from "react";
import { Check, Copy, Plus } from "lucide-react";
import { cn } from "@/utils/cn";
import { FAQS } from "@/data/content";
import { Em, Reveal, SectionHeading, Tape } from "@/components/ui";

const EMAIL = "partner@innovationmultimedial.it";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(EMAIL);
    } catch {
      /* fallback silenzioso */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="faq-title"
              index="08"
              kicker="Domande frequenti"
              title={
                <>
                  Tutto quello che serve <Em>sapere</Em>.
                </>
              }
            />
            <Reveal delay={200} variant="tilt" className="relative mt-10">
              <div className="lined relative p-6 pl-11 shadow-[0_24px_44px_-28px_rgba(14,14,14,0.5)]">
                <Tape className="-top-3 right-8" rotate={7} width={80} height={22} />
                <p className="font-serif text-[1.35rem] italic leading-snug">Non trovi la risposta che cerchi?</p>
                <p className="mt-2 text-[0.92rem] text-graphite">Scrivi alla redazione partnership: rispondiamo entro 48 ore lavorative.</p>
                <button
                  type="button"
                  onClick={copy}
                  className="group mt-5 inline-flex max-w-full items-center gap-2 rounded-full bg-ink py-2 pl-4 pr-3 text-[0.85rem] font-semibold text-paper-3 transition hover:bg-signal-ink"
                >
                  <span className="truncate">{EMAIL}</span>
                  {copied ? <Check className="h-4 w-4 shrink-0" aria-hidden="true" /> : <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />}
                </button>
                <span className="sr-only" aria-live="polite">
                  {copied ? "Indirizzo email copiato negli appunti" : ""}
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-ink">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal as="li" key={f.q} delay={i * 50} className="border-b border-ink/15">
                  <h3>
                    <button
                      type="button"
                      id={`faq-btn-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start gap-5 py-6 text-left"
                    >
                      <span className="mt-1 w-7 shrink-0 font-pixel text-xs text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex-1 text-[1.12rem] font-semibold leading-snug tracking-[-0.01em] transition-transform duration-500 group-hover:translate-x-1 sm:text-[1.22rem]">
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500",
                          isOpen ? "rotate-45 border-ink bg-ink text-paper-3" : "border-ink/25 group-hover:border-ink"
                        )}
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className="acc-panel"
                    data-open={isOpen}
                    inert={!isOpen}
                  >
                    <div>
                      <p className="pretty max-w-2xl pb-7 pl-12 pr-12 leading-relaxed text-graphite">{f.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
