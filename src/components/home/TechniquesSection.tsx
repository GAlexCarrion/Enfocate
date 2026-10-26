import { Link } from "react-router";
import { useApp } from "../../context/AppContext";
import { TECHNICAS } from "../../data/techniques";
import { ArrowLink, SectionHeading } from "../SectionHeading";

export function TechniquesSection() {
  const { noche, t } = useApp();

  return (
    <section id="tecnicas" className="scroll-mt-20 px-6 py-24">
      <div className="container mx-auto">
        <SectionHeading
          oscuro={noche}
          kicker={t.home.tecnicas.kicker}
          titulo={t.home.tecnicas.titulo}
          subtitulo={t.home.tecnicas.subtitulo}
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TECHNICAS.map((tec) => {
            const Icono = tec.icono;
            const info = t.tecnicas[tec.id];
            return (
              <li
                key={tec.id}
                className={`group flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  noche ? "glass-dark hover:shadow-black/40" : "glass hover:shadow-teal-900/20"
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 ${tec.gradiente}`}
                >
                  <Icono size={24} aria-hidden="true" />
                </span>
                <h3 className={`mt-5 font-display text-xl font-bold ${noche ? "text-white" : "text-slate-900"}`}>
                  {info.nombre}
                </h3>
                <p className={`mt-0.5 text-xs font-bold tracking-widest uppercase ${noche ? "text-cyan-300" : "text-teal-600"}`}>
                  {info.lema}
                </p>
                <p className={`mt-3 flex-1 text-sm leading-relaxed ${noche ? "text-gray-300" : "text-slate-600"}`}>
                  {info.descripcion}
                </p>
                <div className={`mt-6 flex items-center justify-between border-t pt-4 ${noche ? "border-white/10" : "border-slate-900/10"}`}>
                  <ArrowLink to={tec.path} oscuro={noche}>
                    {t.common.usarAhora}
                  </ArrowLink>
                  <Link
                    to={`/guia/${tec.rutaGuia}`}
                    className={`shrink-0 text-xs font-semibold transition-opacity hover:opacity-100 ${
                      noche ? "opacity-70 text-teal-200" : "opacity-70 text-slate-600"
                    }`}
                  >
                    {t.common.verGuia}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
