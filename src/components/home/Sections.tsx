import { FiBookOpen, FiFileText, FiHeadphones, FiLayout, FiMoon, FiVideo } from "react-icons/fi";
import type { IconType } from "react-icons";
import { useApp } from "../../context/AppContext";
import { SectionHeading } from "../SectionHeading";

const ICONOS: IconType[] = [FiBookOpen, FiFileText, FiVideo, FiHeadphones, FiLayout, FiMoon];

export function HowItWorks() {
  const { noche, t } = useApp();
  const borde = noche ? "border-white/10" : "border-slate-900/10";

  return (
    <section className="px-6 py-20">
      <div className="container mx-auto">
        <SectionHeading oscuro={noche} kicker={t.home.como.kicker} titulo={t.home.como.titulo} subtitulo={t.home.como.subtitulo} />

        <ol className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {t.home.como.pasos.map((paso, i) => (
            <li key={paso.titulo} className="relative">
              {/* Conector punteado entre pasos (escritorio) */}
              {i < 2 && (
                <span
                  aria-hidden="true"
                  className={`absolute top-1/2 -right-4 hidden h-0.5 w-8 border-t-2 border-dashed md:block ${
                    noche ? "border-cyan-400/40" : "border-teal-500/40"
                  }`}
                />
              )}
              <div className={`flex h-full flex-col rounded-3xl border p-8 ${noche ? "bg-white/5 backdrop-blur-xl" : "bg-white/55 backdrop-blur-xl"} ${borde}`}>
                <span className={`font-display text-5xl font-extrabold ${noche ? "text-cyan-300/30" : "text-teal-600/25"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`mt-3 font-display text-lg font-bold ${noche ? "text-white" : "text-slate-900"}`}>
                  {paso.titulo}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${noche ? "text-gray-300" : "text-slate-600"}`}>{paso.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FeaturesGrid() {
  const { noche, t } = useApp();

  return (
    <section className="px-6 py-20">
      <div className="container mx-auto">
        <SectionHeading oscuro={noche} kicker={t.home.features.kicker} titulo={t.home.features.titulo} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.home.features.items.map((item, i) => {
            const Icono = ICONOS[i % ICONOS.length];
            return (
              <li
                key={item.titulo}
                className={`flex gap-4 rounded-2xl p-6 transition-transform hover:-translate-y-1 ${
                  noche ? "glass-dark" : "glass"
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    noche ? "bg-cyan-400/15 text-cyan-300" : "bg-teal-500/15 text-teal-700"
                  }`}
                >
                  <Icono size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className={`font-bold ${noche ? "text-white" : "text-slate-900"}`}>{item.titulo}</h3>
                  <p className={`mt-1.5 text-sm leading-relaxed ${noche ? "text-gray-300" : "text-slate-600"}`}>
                    {item.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function CtaSection({ onComenzar }: { onComenzar: () => void }) {
  const { noche, t } = useApp();

  return (
    <section className="px-6 py-20">
      <div className="container mx-auto">
        <div
          className={`relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] px-8 py-16 text-center sm:py-20 ${
            noche ? "glass-dark" : "glass-strong"
          }`}
        >
          {/* Brillo decorativo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-linear-to-br from-teal-400/40 to-cyan-500/40 blur-3xl"
          />
          <h2 className={`font-display relative text-3xl font-extrabold tracking-tight text-balance sm:text-4xl ${noche ? "text-white" : "text-slate-900"}`}>
            {t.home.cta.titulo}
          </h2>
          <p className={`relative mt-3 text-lg ${noche ? "text-teal-100/80" : "text-slate-700"}`}>{t.home.cta.subtitulo}</p>
          <button
            type="button"
            onClick={onComenzar}
            className={`relative mt-8 inline-flex cursor-pointer items-center rounded-xl px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-teal-600/30 transition-all hover:-translate-y-0.5 focus:ring-4 focus:outline-none ${
              noche ? "bg-linear-to-r from-cyan-500 to-teal-500" : "bg-linear-to-r from-teal-500 to-cyan-500"
            }`}
          >
            {t.home.cta.boton}
          </button>
        </div>
      </div>
    </section>
  );
}
