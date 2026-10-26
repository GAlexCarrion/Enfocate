import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useApp } from "../context/AppContext";

interface Props {
  cerrar: () => void;
  guardarNombre: (nombre: string) => void;
}

export function ModalTarea({ cerrar, guardarNombre }: Props) {
  const { noche, t } = useApp();
  const [nombreTarea, setNombreTarea] = useState("");
  const [error, setError] = useState<string | null>(null);

  const guardar = () => {
    if (nombreTarea.trim() === "") {
      setError(t.pomodoro.errorVacia);
      return;
    }
    guardarNombre(nombreTarea);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={t.pomodoro.ingresaTarea}
    >
      <div className={`animate-fade-up w-full max-w-md rounded-3xl p-8 text-center ${noche ? "glass-dark" : "glass-strong"}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 text-left">
            <h2 className={`font-display text-xl font-extrabold ${noche ? "text-white" : "text-slate-900"}`}>
              {t.pomodoro.ingresaTarea}
            </h2>
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

        <input
          type="text"
          value={nombreTarea}
          onChange={(e) => {
            setError(null);
            const valor = e.target.value;
            if (valor.length === 1 && valor[0] === " ") {
              setError(t.pomodoro.errorEspacio);
              return;
            }
            setNombreTarea(valor);
          }}
          onKeyDown={(e) => e.key === "Enter" && guardar()}
          placeholder={t.pomodoro.tareaPlaceholder}
          aria-label={t.pomodoro.ingresaTarea}
          aria-invalid={!!error}
          maxLength={80}
          className={`mt-5 w-full rounded-xl border px-4 py-3 text-center text-sm outline-none transition-colors ${
            error ? "border-red-400" : ""
          } ${
            noche
              ? "border-white/15 bg-white/10 text-white placeholder:text-gray-400 focus:border-cyan-300/60"
              : "border-slate-900/15 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500"
          }`}
        />
        {error && <p className="mt-2 text-xs font-semibold text-red-500">{error}</p>}

        <button
          type="button"
          onClick={guardar}
          className={`mt-6 w-full cursor-pointer rounded-xl px-6 py-3 font-bold text-white shadow-lg shadow-teal-600/30 transition-all hover:-translate-y-0.5 focus:ring-4 focus:outline-none ${
            noche ? "bg-linear-to-r from-cyan-500 to-teal-500" : "bg-linear-to-r from-teal-500 to-cyan-500"
          }`}
        >
          {t.pomodoro.guardar}
        </button>
      </div>
    </div>
  );
}
