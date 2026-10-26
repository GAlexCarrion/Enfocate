import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FiPause, FiPlay, FiRotateCcw, FiSkipForward } from "react-icons/fi";
import { useApp } from "../context/AppContext";

type Modo = "trabajo" | "descansoCorto" | "descansoLargo";

const DURACION: Record<Modo, number> = {
  trabajo: 25 * 60,
  descansoCorto: 5 * 60,
  descansoLargo: 15 * 60,
};

const STATS_KEY = "focusup:sessions";

interface Stats {
  total: number;
  porDia: Record<string, number>;
}

function leerStats(): Stats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) return JSON.parse(raw) as Stats;
  } catch {
    /* ignorar */
  }
  return { total: 0, porDia: {} };
}

function registrarBloqueTrabajo() {
  const stats = leerStats();
  const hoy = new Date().toISOString().slice(0, 10);
  stats.total += 1;
  stats.porDia[hoy] = (stats.porDia[hoy] ?? 0) + 1;
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    /* ignorar */
  }
  return leerStats();
}

/** Timbre agradable con Web Audio API (dos notas ascendentes) */
function sonarTimbre() {
  try {
    const ctx = new AudioContext();
    const ahora = ctx.currentTime;
    [
      { freq: 784, t: 0 },
      { freq: 1046.5, t: 0.18 },
    ].forEach(({ freq, t }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ahora + t);
      gain.gain.linearRampToValueAtTime(0.25, ahora + t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ahora + t + 0.6);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ahora + t);
      osc.stop(ahora + t + 0.65);
    });
    setTimeout(() => void ctx.close(), 1200);
  } catch {
    /* audio no disponible */
  }
}

interface Props {
  tarea: string;
  cambiarTarea: () => void;
}

export function TempPomodoro({ tarea, cambiarTarea }: Props) {
  const { noche, t } = useApp();
  const navigate = useNavigate();

  const [modo, setModo] = useState<Modo>("trabajo");
  const [restante, setRestante] = useState(DURACION.trabajo);
  const [estado, setEstado] = useState<"inactivo" | "activo" | "pausado">("inactivo");
  const [bloquesHechos, setBloquesHechos] = useState(0); // bloques de trabajo completados en esta tarea
  const [modalFin, setModalFin] = useState(false);
  const [felicitacion, setFelicitacion] = useState(false);
  const [statsHoy, setStatsHoy] = useState(() => leerStats().porDia[new Date().toISOString().slice(0, 10)] ?? 0);

  const modoRef = useRef(modo);
  useEffect(() => {
    modoRef.current = modo;
  }, [modo]);

  // Cuenta atrás con intervalo limpio
  useEffect(() => {
    if (estado !== "activo") return;
    const id = setInterval(() => {
      setRestante((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [estado]);

  // Transiciones al llegar a cero
  useEffect(() => {
    if (restante > 0 || estado === "inactivo") return;

    sonarTimbre();
    if (modoRef.current === "trabajo") {
      const nuevos = bloquesHechos + 1;
      setBloquesHechos(nuevos);
      setStatsHoy(registrarBloqueTrabajo().porDia[new Date().toISOString().slice(0, 10)] ?? 0);
      if (nuevos % 4 === 0) {
        // Ciclo de 4 completado: preguntar si terminó la tarea
        setEstado("inactivo");
        setModalFin(true);
      } else {
        setModo("descansoCorto");
        setRestante(DURACION.descansoCorto);
      }
    } else {
      setModo("trabajo");
      setRestante(DURACION.trabajo);
      setEstado("inactivo");
    }
  }, [restante, estado]); // eslint-disable-line react-hooks/exhaustive-deps

  // Título del documento mientras corre
  useEffect(() => {
    if (estado === "activo") {
      document.title = `${formatear(restante)} · ${tarea}`;
    } else {
      document.title = "FocusUp · Técnicas de estudio para concentrarte mejor";
    }
    return () => {
      document.title = "FocusUp · Técnicas de estudio para concentrarte mejor";
    };
  }, [restante, estado, tarea]);

  const reiniciarModo = useCallback(() => {
    setEstado("inactivo");
    setRestante(DURACION[modo]);
  }, [modo]);

  const terminarCiclo = () => {
    if (modo === "trabajo") {
      const nuevos = bloquesHechos + 1;
      setBloquesHechos(nuevos);
      setStatsHoy(registrarBloqueTrabajo().porDia[new Date().toISOString().slice(0, 10)] ?? 0);
      if (nuevos % 4 === 0) {
        // Ciclo de 4 completado: preguntar si terminó la tarea
        setEstado("inactivo");
        setModalFin(true);
      } else {
        setModo("descansoCorto");
        setRestante(DURACION.descansoCorto);
        setEstado("inactivo");
      }
    } else {
      setModo("trabajo");
      setRestante(DURACION.trabajo);
      setEstado("inactivo");
    }
  };

  function formatear(segundos: number) {
    const m = Math.floor(segundos / 60).toString().padStart(2, "0");
    const s = (segundos % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // Anillo SVG
  const total = DURACION[modo];
  const radio = 118;
  const circunferencia = 2 * Math.PI * radio;
  const progreso = restante / total;
  const colorTrazo =
    modo === "trabajo"
      ? noche
        ? "#22d3ee"
        : "#14b8a6"
      : noche
        ? "#a78bfa"
        : "#818cf8";

  const etiquetaModo =
    modo === "trabajo"
      ? t.pomodoro.trabajando
      : modo === "descansoLargo"
        ? t.pomodoro.descansoLargo
        : t.pomodoro.descansoCorto;

  const btnPrimario = `inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 focus:ring-4 focus:outline-none ${
    noche ? "bg-linear-to-r from-cyan-500 to-teal-500 shadow-teal-900/40" : "bg-linear-to-r from-teal-500 to-cyan-500 shadow-teal-600/30"
  }`;
  const btnSecundario = `inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold backdrop-blur transition-all hover:-translate-y-0.5 ${
    noche ? "border-white/20 text-white hover:bg-white/10" : "border-slate-900/20 text-slate-800 hover:bg-white/60"
  }`;

  return (
    <div className="flex flex-col items-center px-4 py-8">
      {/* Encabezado */}
      <span className={`inline-flex max-w-full items-center gap-2 truncate rounded-full px-4 py-1.5 text-sm font-semibold ${noche ? "glass-dark text-cyan-200" : "glass text-teal-800"}`}>
        <span className={`h-2 w-2 shrink-0 rounded-full ${noche ? "bg-cyan-300" : "bg-teal-500"}`} aria-hidden="true" />
        {tarea}
      </span>
      <button
        type="button"
        onClick={cambiarTarea}
        className={`mt-2 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold underline underline-offset-4 transition-colors ${
          noche
            ? "text-cyan-300 hover:bg-white/10 hover:text-cyan-200"
            : "text-teal-700 hover:bg-teal-500/10 hover:text-teal-800"
        }`}
      >
        {t.pomodoro.cambiarTarea}
      </button>

      {/* Anillo */}
      <div className="relative mt-10 h-68 w-68 sm:h-80 sm:w-80">
        <svg viewBox="0 0 280 280" className="h-full w-full -rotate-90">
          <circle cx="140" cy="140" r={radio} fill="none" strokeWidth="12" className={noche ? "stroke-white/10" : "stroke-slate-900/10"} />
          <circle
            cx="140"
            cy="140"
            r={radio}
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            stroke={colorTrazo}
            strokeDasharray={circunferencia}
            strokeDashoffset={circunferencia * (1 - progreso)}
            style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className={`text-xs font-bold tracking-widest uppercase ${modo === "trabajo" ? (noche ? "text-cyan-300" : "text-teal-700") : noche ? "text-violet-300" : "text-indigo-500"}`}>
            {etiquetaModo}
          </p>
          <p className={`tnum font-display mt-1 text-6xl font-extrabold tabular-nums sm:text-7xl ${noche ? "text-white" : "text-slate-900"}`}>
            {formatear(restante)}
          </p>
          {/* Puntos de ciclo */}
          <div className="mt-3 flex gap-2" role="img" aria-label={`${bloquesHechos % 4} / 4`}>
            {[0, 1, 2, 3].map((i) => {
              const llenos = bloquesHechos % 4;
              const lleno = i < llenos;
              return (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    lleno ? (noche ? "bg-cyan-300" : "bg-teal-500") : noche ? "bg-white/15" : "bg-slate-900/15"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {estado !== "activo" ? (
          <button type="button" onClick={() => setEstado("activo")} className={btnPrimario}>
            <FiPlay aria-hidden="true" />
            {estado === "pausado" ? t.pomodoro.reanudar : t.pomodoro.comenzar}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEstado("pausado")}
            className={btnPrimario}
          >
            <FiPause aria-hidden="true" />
            {t.pomodoro.pausar}
          </button>
        )}
        <button type="button" onClick={reiniciarModo} className={btnSecundario}>
          <FiRotateCcw aria-hidden="true" />
          {t.pomodoro.reiniciar}
        </button>
        {estado !== "inactivo" && (
          <button type="button" onClick={terminarCiclo} className={btnSecundario}>
            <FiSkipForward aria-hidden="true" />
            {t.pomodoro.terminarCiclo}
          </button>
        )}
      </div>

      {/* Progreso persistente */}
      <p className={`mt-6 text-sm font-semibold ${noche ? "text-teal-100/70" : "text-slate-600"}`}>
        {t.pomodoro.ciclos}: <strong>{bloquesHechos}</strong> · {statsHoy} {t.pomodoro.sesionesHoy} 🔥
      </p>

      {/* Modal fin de ciclos */}
      {modalFin && (
        <ModalBase noche={noche}>
          <h2 className={`font-display text-2xl font-bold ${noche ? "text-white" : "text-slate-900"}`}>
            {t.pomodoro.finCiclosTitulo}
          </h2>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setModalFin(false);
                setFelicitacion(true);
              }}
              className={`cursor-pointer rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-colors ${
                noche ? "bg-cyan-500 hover:bg-cyan-400" : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              {t.pomodoro.si}
            </button>
            <button
              type="button"
              onClick={() => {
                setModalFin(false);
                setModo("descansoLargo");
                setRestante(DURACION.descansoLargo);
                setEstado("activo");
              }}
              className={`cursor-pointer rounded-xl border px-5 py-2.5 text-sm font-bold transition-colors ${
                noche ? "border-white/20 text-white hover:bg-white/10" : "border-slate-900/20 text-slate-800 hover:bg-slate-100"
              }`}
            >
              {t.pomodoro.no}
            </button>
          </div>
        </ModalBase>
      )}

      {/* Felicitación */}
      {felicitacion && (
        <ModalBase noche={noche}>
          <p className="text-5xl">🎉</p>
          <h2 className={`font-display mt-3 text-2xl font-bold ${noche ? "text-white" : "text-slate-900"}`}>
            {t.pomodoro.felicTitulo}
          </h2>
          <p className={`mt-2 ${noche ? "text-gray-300" : "text-slate-600"}`}>{t.pomodoro.felicTexto}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className={`cursor-pointer rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-colors ${
                noche ? "bg-cyan-500 hover:bg-cyan-400" : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              {t.common.volverInicio}
            </button>
            <button
              type="button"
              onClick={() => {
                setFelicitacion(false);
                setBloquesHechos(0);
                setModo("trabajo");
                setRestante(DURACION.trabajo);
                cambiarTarea();
              }}
              className={`cursor-pointer rounded-xl border px-5 py-2.5 text-sm font-bold transition-colors ${
                noche ? "border-white/20 text-white hover:bg-white/10" : "border-slate-900/20 text-slate-800 hover:bg-slate-100"
              }`}
            >
              {t.pomodoro.nuevaTarea}
            </button>
          </div>
        </ModalBase>
      )}
    </div>
  );
}

function ModalBase({ noche, children }: { noche: boolean; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 text-center backdrop-blur-md">
      <div className={`animate-fade-up w-full max-w-sm rounded-3xl p-8 ${noche ? "glass-dark" : "glass-strong"}`}>
        {children}
      </div>
    </div>
  );
}
