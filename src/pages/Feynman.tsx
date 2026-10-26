import { useEffect, useRef, useState } from "react";
import { NightSky } from "../components/NightSky";
import { Navegacion } from "../components/Navegacion";
import { Footer } from "../components/Footer";
import { IconoComponent } from "../components/IconoComponent";
import { FiCamera, FiDownload, FiPause, FiPlay, FiSquare, FiRefreshCw, FiInfo } from "react-icons/fi";
import { useApp } from "../context/AppContext";

export function Feynman() {
  const { noche, t } = useApp();

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [grabando, setGrabando] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [urlVideo, setUrlVideo] = useState<string | null>(null);
  const [tema, setTema] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [falloCamara, setFalloCamara] = useState(false);
  const [permisoBloqueado, setPermisoBloqueado] = useState(false);

  // Encender cámara (solo bajo demanda del usuario)
  const activarCamara = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      setError(null);
      setFalloCamara(false);
      setPermisoBloqueado(false);
    } catch (err) {
      const nombre = err instanceof DOMException ? err.name : "";
      setFalloCamara(true);
      if (nombre === "NotAllowedError" || nombre === "SecurityError") {
        setPermisoBloqueado(true);
        setError(t.feynman.permisoBloqueado);
      } else {
        setPermisoBloqueado(false);
        setError(t.feynman.errorCamara);
      }
    }
  };

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const empezarGrabacion = () => {
    if (!mediaStream) {
      setError(t.feynman.errorStream);
      return;
    }
    chunksRef.current = [];
    setUrlVideo((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setError(null);

    const recorder = new MediaRecorder(mediaStream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setUrlVideo(URL.createObjectURL(blob));
    };

    recorder.start();
    setGrabando(true);
    setPausado(false);
  };

  const pausarGrabacion = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.pause();
      setPausado(true);
    }
  };

  const reanudarGrabacion = () => {
    if (mediaRecorderRef.current?.state === "paused") {
      mediaRecorderRef.current.resume();
      setPausado(false);
    }
  };

  const detenerGrabacion = () => {
    if (mediaRecorderRef.current && grabando) {
      mediaRecorderRef.current.stop();
      setGrabando(false);
      setPausado(false);
    }
  };

  const descargar = () => {
    if (chunksRef.current.length === 0) return;
    const blob = new Blob(chunksRef.current, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tema.trim() || "feynman"}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reiniciar = async () => {
    setUrlVideo((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    chunksRef.current = [];
    setGrabando(false);
    setPausado(false);
    setError(null);
    setFalloCamara(false);
    setPermisoBloqueado(false);
    setTema("");
  };

  const inputClases = `block w-full rounded-xl border p-3.5 text-sm outline-none transition-colors ${
    noche
      ? "border-white/15 bg-white/10 text-white placeholder:text-gray-400 focus:border-cyan-300/60"
      : "border-slate-900/15 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500"
  }`;

  const btnBase =
    "flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40";

  const pasos = [t.feynman.paso1, t.feynman.paso2, t.feynman.paso3, t.feynman.paso4];

  return (
    <div className={`${noche ? "cuerpo_noche" : "cielo_animado"} relative flex min-h-screen flex-col`}>
      {noche && <NightSky />}
      <Navegacion />
      <IconoComponent nombre="Feynman" />
      <main className="flex-1 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Encabezado */}
          <header className="mb-8 text-center">
            <span
              className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase ${
                noche ? "glass-dark text-cyan-300" : "glass text-teal-700"
              }`}
            >
              {t.nav.tecnicas}
            </span>
            <h1 className={`mt-3 font-display text-4xl font-extrabold tracking-tight ${noche ? "text-white" : "text-slate-900"}`}>
              {t.feynman.titulo}
            </h1>
          </header>

          {/* Pasos rápidos */}
          <ol className="mb-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {pasos.map((paso, i) => (
              <li key={i} className={`flex items-start gap-2.5 rounded-xl p-3 text-xs leading-relaxed ${noche ? "glass-dark text-gray-200" : "glass text-slate-700"}`}>
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white ${
                    noche ? "bg-cyan-500" : "bg-teal-500"
                  }`}
                >
                  {i + 1}
                </span>
                {paso}
              </li>
            ))}
          </ol>

          {/* Panel principal */}
          <div className={`rounded-[2rem] p-6 sm:p-8 ${noche ? "glass-dark" : "glass-strong"}`}>
            <label htmlFor="tema" className={`sr-only`}>
              {t.feynman.nombreTarea}
            </label>
            <input
              id="tema"
              type="text"
              placeholder={t.feynman.temaPlaceholder}
              value={tema}
              onChange={(e) => {
                const valor = e.target.value;
                if (valor.length === 1 && valor[0] === " ") {
                  setError(t.feynman.errorEspacio);
                  return;
                }
                setError(null);
                setTema(valor);
              }}
              disabled={grabando}
              maxLength={80}
              aria-label={t.feynman.nombreTarea}
              className={`${inputClases} text-center`}
            />

            {error && (
              <p role="alert" className="mt-3 text-center text-sm font-semibold text-red-500">
                {error}
              </p>
            )}

            <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
              {/* Video */}
              <div className="flex flex-col">
                {mediaStream ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="aspect-video w-full rounded-2xl border border-slate-900/10 bg-black object-cover"
                      aria-label={t.feynman.camaraActiva}
                    />
                    <p className={`mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold ${noche ? "text-teal-200" : "text-slate-600"}`}>
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${noche ? "bg-cyan-300" : "bg-teal-500"}`} />
                        <span className={`relative inline-flex h-2 w-2 rounded-full ${noche ? "bg-cyan-300" : "bg-teal-500"}`} />
                      </span>
                      {t.feynman.camaraActiva}
                    </p>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={activarCamara}
                    className={`flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-colors ${
                      noche ? "border-white/20 text-gray-300 hover:border-cyan-300/50 hover:text-white" : "border-slate-900/20 text-slate-500 hover:border-teal-500 hover:text-teal-700"
                    }`}
                  >
                    <FiCamera size={36} aria-hidden="true" />
                    <span className="font-bold">{t.feynman.activarCamara}</span>
                  </button>
                )}

                {!mediaStream && falloCamara && (
                  <div className={`mt-4 rounded-xl p-4 text-center ${noche ? "bg-white/5" : "bg-slate-900/5"}`}>
                    {permisoBloqueado && (
                      <p className={`text-xs leading-relaxed ${noche ? "text-gray-300" : "text-slate-600"}`}>
                        {t.feynman.permisoAyuda}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={activarCamara}
                      className={`mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                        noche
                          ? "bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30"
                          : "bg-teal-500/15 text-teal-700 hover:bg-teal-500/25"
                      }`}
                    >
                      <FiRefreshCw size={13} aria-hidden="true" />
                      {t.feynman.reintentarAcceso}
                    </button>
                  </div>
                )}

                {urlVideo && (
                  <div className="mt-5">
                    <h2 className={`mb-2 font-display font-bold ${noche ? "text-white" : "text-slate-900"}`}>
                      🎬 {t.feynman.vistaPrevia}
                    </h2>
                    <video src={urlVideo} controls className="aspect-video w-full rounded-2xl border border-slate-900/10 bg-black" />
                  </div>
                )}
              </div>

              {/* Controles */}
              <div className="flex flex-col gap-2.5">
                {!grabando && !urlVideo && (
                  <button
                    type="button"
                    onClick={empezarGrabacion}
                    disabled={!mediaStream || !tema.trim()}
                    className={`${btnBase} bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600`}
                  >
                    <span className="h-3.5 w-3.5 rounded-full bg-white ring-4 ring-red-300/60" aria-hidden="true" />
                    {t.feynman.grabar}
                  </button>
                )}
                {grabando && !pausado && (
                  <button type="button" onClick={pausarGrabacion} className={`${btnBase} bg-yellow-400 text-yellow-950 hover:bg-yellow-300`}>
                    <FiPause aria-hidden="true" /> {t.feynman.pausar}
                  </button>
                )}
                {grabando && pausado && (
                  <button type="button" onClick={reanudarGrabacion} className={`${btnBase} bg-green-500 text-white hover:bg-green-600`}>
                    <FiPlay aria-hidden="true" /> {t.feynman.reanudar}
                  </button>
                )}
                {grabando && (
                  <button type="button" onClick={detenerGrabacion} className={`${btnBase} bg-slate-800 text-white hover:bg-slate-900`}>
                    <FiSquare aria-hidden="true" /> {t.feynman.detener}
                  </button>
                )}
                <button
                  type="button"
                  onClick={descargar}
                  disabled={!urlVideo}
                  className={`${btnBase} bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600`}
                >
                  <FiDownload aria-hidden="true" /> {t.feynman.descargar}
                </button>
                <button
                  type="button"
                  onClick={reiniciar}
                  disabled={!urlVideo}
                  className={`${btnBase} border border-slate-900/15 ${
                    noche ? "border-white/20 text-white hover:bg-white/10" : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <FiRefreshCw aria-hidden="true" /> {t.feynman.nuevaGrabacion}
                </button>

                {/* Recordatorio de la técnica */}
                <aside className={`mt-auto flex items-start gap-2.5 rounded-xl p-3.5 text-xs leading-relaxed ${noche ? "bg-white/5 text-gray-300" : "bg-teal-500/10 text-slate-700"}`}>
                  <FiInfo size={15} aria-hidden="true" className={`mt-0.5 shrink-0 ${noche ? "text-cyan-300" : "text-teal-600"}`} />
                  {t.feynman.explicacion}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
