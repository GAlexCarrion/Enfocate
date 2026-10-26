import { FiChevronDown } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { SectionHeading } from "../SectionHeading";

/** FAQ visible en la home: refleja el JSON-LD FAQPage del index.html */
export function FaqSection() {
  const { noche, t } = useApp();

  return (
    <section id="faq" className="scroll-mt-20 px-6 py-20">
      <div className="container mx-auto max-w-3xl">
        <SectionHeading
          oscuro={noche}
          kicker={t.home.faq.kicker}
          titulo={t.home.faq.titulo}
          subtitulo={t.home.faq.subtitulo}
        />

        <div className="mt-12 space-y-3">
          {t.home.faq.preguntas.map((qa) => (
            <details
              key={qa.p}
              className={`group rounded-2xl border px-5 py-4 transition-colors ${
                noche
                  ? "border-white/10 bg-white/5 open:border-cyan-400/30"
                  : "border-slate-900/10 bg-white/60 open:border-teal-500/40"
              }`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                <span className={noche ? "text-white" : "text-slate-900"}>{qa.p}</span>
                <FiChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`shrink-0 transition-transform group-open:rotate-180 ${noche ? "text-cyan-300" : "text-teal-600"}`}
                />
              </summary>
              <p className={`mt-3 text-sm leading-relaxed ${noche ? "text-gray-300" : "text-slate-600"}`}>
                {qa.r}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
