import { Link, useParams } from "react-router";
import { NightSky } from "../components/NightSky";
import { Navegacion } from "../components/Navegacion";
import { Footer } from "../components/Footer";
import { useApp } from "../context/AppContext";
import { TECHNICAS } from "../data/techniques";
import { PASOS_GUIA } from "../data/guides";
import type { TechniqueId } from "../data/techniques";

export function Guia() {
  const { noche, t } = useApp();
  const { nombre = "" } = useParams<{ nombre: string }>();

  const tecnica = TECHNICAS.find((tec) => tec.rutaGuia === nombre);

  if (!tecnica) {
    return (
      <div className={`${noche ? "cuerpo_noche" : "cielo_animado"} relative flex min-h-screen flex-col`}>
        <Navegacion />
        <main className="flex flex-1 items-center justify-center px-6">
          <div className={`max-w-md rounded-3xl p-8 text-center ${noche ? "glass-dark" : "glass-strong"}`}>
            <p className="text-3xl">🧭</p>
            <p className={`mt-3 ${noche ? "text-gray-300" : "text-slate-700"}`}>{t.guia.noEncontrada}</p>
            <Link
              to="/"
              className={`mt-6 inline-flex rounded-xl px-5 py-2.5 text-sm font-bold text-white ${
                noche ? "bg-cyan-500 hover:bg-cyan-400" : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              {t.common.volverInicio}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const id = tecnica.id as TechniqueId;
  const info = t.tecnicas[id];
  const pasosTexto = t.guia.pasos[id];
  const imagenesPasos = PASOS_GUIA[id];

  return (
    <div className={`${noche ? "cuerpo_noche" : "cielo_animado"} relative flex min-h-screen flex-col`}>
      {noche && <NightSky />}
      <Navegacion />
      <main className="flex-1 px-6 py-12">
        <div className="container mx-auto max-w-3xl">
          {/* Encabezado */}
          <header className={`rounded-[2rem] p-8 text-center sm:p-10 ${noche ? "glass-dark" : "glass-strong"}`}>
            <span
              aria-hidden="true"
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg ${tecnica.gradiente}`}
            >
              <tecnica.icono size={26} />
            </span>
            <p className={`mt-4 text-xs font-bold tracking-[0.2em] uppercase ${noche ? "text-cyan-300" : "text-teal-600"}`}>
              {t.guia.kicker}
            </p>
            <h1 className={`mt-1 font-display text-3xl font-extrabold sm:text-4xl ${noche ? "text-white" : "text-slate-900"}`}>
              {t.guia.comoUsar} {info.nombre}
            </h1>
            <p className={`mt-4 leading-relaxed ${noche ? "text-teal-100/80" : "text-slate-600"}`}>
              {info.descripcion}
            </p>
          </header>

          {/* Pasos */}
          <ol className="mt-10 space-y-8">
            {pasosTexto.map((texto, i) => (
              <li key={i} className={`overflow-hidden rounded-3xl ${noche ? "glass-dark" : "glass"}`}>
                <div className="flex items-start gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold text-white shadow-md ${
                      noche ? "bg-cyan-500" : "bg-teal-500"
                    }`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className={`pt-1.5 leading-relaxed ${noche ? "text-gray-200" : "text-slate-800"}`}>{texto}</p>
                </div>
                <img
                  src={imagenesPasos[i]}
                  alt={`${info.nombre} · ${t.guia.kicker} ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="mx-auto mt-5 w-full max-w-xl px-6 pb-8"
                />
              </li>
            ))}
          </ol>

          {/* CTA final */}
          <div className={`mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl p-7 sm:flex-row ${noche ? "glass-dark" : "glass-strong"}`}>
            <p className={`font-display text-lg font-bold ${noche ? "text-white" : "text-slate-900"}`}>
              {t.common.usarAhora} → {info.nombre}
            </p>
            <Link
              to={tecnica.path}
              className={`shrink-0 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 ${
                noche ? "bg-linear-to-r from-cyan-500 to-teal-500" : "bg-linear-to-r from-teal-500 to-cyan-500"
              }`}
            >
              {t.guia.irTecnica}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
