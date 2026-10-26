import { useEffect } from "react";
import { Link } from "react-router";
import { FiX } from "react-icons/fi";
import { useApp } from "../context/AppContext";
import { TECHNICAS } from "../data/techniques";

interface Props {
  abierto: boolean;
  cerrar: () => void;
}

/** Modal para elegir una técnica y saltar directo a ella o a su guía */
export function TechniquePicker({ abierto, cerrar }: Props) {
  const { noche, t } = useApp();

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [abierto, cerrar]);

  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-md"
      onClick={cerrar}
      role="dialog"
      aria-modal="true"
      aria-label={t.home.picker.titulo}
    >
      <div
        className={`animate-fade-up w-full max-w-lg rounded-3xl p-5 sm:p-6 ${noche ? "glass-dark" : "glass-strong"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className={`font-display text-2xl font-extrabold ${noche ? "text-white" : "text-slate-900"}`}>
              {t.home.picker.titulo}
            </h2>
            <p className={`mt-1 text-sm ${noche ? "text-teal-100/70" : "text-slate-600"}`}>{t.home.picker.subtitulo}</p>
          </div>
          <button
            type="button"
            onClick={cerrar}
            aria-label={t.common.cerrar}
            autoFocus
            className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${
              noche ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-900/10 text-slate-700 hover:bg-slate-900/20"
            }`}
          >
            <FiX size={18} aria-hidden="true" />
          </button>
        </div>

        <ul className="mt-5 space-y-3">
          {TECHNICAS.map((tec) => {
            const Icono = tec.icono;
            const info = t.tecnicas[tec.id];
            return (
              <li key={tec.id} className={`relative overflow-hidden rounded-2xl border transition-all ${noche ? "border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-white/10" : "border-slate-900/10 bg-white/60 hover:border-teal-500/50 hover:bg-white"}`}>
                {/* Enlace principal: usar la técnica */}
                <Link to={tec.path} className="flex items-center gap-3 p-4 pb-12 sm:gap-4 sm:p-4 sm:pr-28">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-lg ${tec.gradiente}`}
                  >
                    <Icono size={22} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className={`block font-display font-bold ${noche ? "text-white" : "text-slate-900"}`}>
                      {info.nombre}
                    </span>
                    <span className={`block truncate text-xs ${noche ? "text-teal-100/70" : "text-slate-600"}`}>
                      {info.lema}
                    </span>
                  </span>
                </Link>
                {/* Enlace secundario: guía */}
                <Link
                  to={`/guia/${tec.rutaGuia}`}
                  className={`absolute right-4 bottom-3 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold underline-offset-2 hover:underline sm:right-14 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 ${
                    noche ? "bg-white/10 text-cyan-300" : "bg-teal-500/15 text-teal-700"
                  }`}
                >
                  {t.common.verGuia}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
