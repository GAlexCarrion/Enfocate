import { useState } from "react";
import { useNavigate } from "react-router";
import { NightSky } from "../components/NightSky";
import { Navegacion } from "../components/Navegacion";
import { Footer } from "../components/Footer";
import { TempPomodoro } from "../components/TempPomodoro";
import { ModalTarea } from "../components/ModalTarea";
import { IconoComponent } from "../components/IconoComponent";
import { useApp } from "../context/AppContext";

export function Pomodoro() {
  const [nombre, setNombre] = useState("");
  const { noche, t } = useApp();
  const navigate = useNavigate();

  return (
    <div className={`${noche ? "cuerpo_noche" : "cielo_animado"} relative flex min-h-screen flex-col`}>
      {noche && <NightSky />}
      <Navegacion />
      <IconoComponent nombre="Pomodoro" />
      <main className="flex flex-1 flex-col justify-center">
        {nombre === "" ? (
          <ModalTarea cerrar={() => navigate("/")} guardarNombre={setNombre} />
        ) : (
          <>
            <TempPomodoro tarea={nombre} cambiarTarea={() => setNombre("")} />
            {/* GIF de la chica lofi + Tip de estudio */}
            <div className="mx-auto mb-12 flex w-full max-w-4xl flex-col items-center gap-8 px-4">
              <figure className="text-center">
                <img
                  className="h-auto max-w-xs rounded-lg"
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWZ2MnZwNzZscDhxdTVubDVsbGhvMDJmZG0zMGF5cnEwMTBkaW41bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XbJYBCi69nyVOffLIU/giphy.gif"
                  alt={t.pomodoro.gifAlt}
                  width={480}
                  height={480}
                  loading="lazy"
                />
                <figcaption className={`mt-2 text-sm text-center font-semibold ${noche ? "text-teal-200" : "text-slate-700"}`}>
                  {t.pomodoro.gifPie}
                </figcaption>
              </figure>
              <div className="w-full max-w-md">
                <TipCard />
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

function TipCard() {
  const { noche, t } = useApp();
  return (
    <aside className={`rounded-3xl p-6 text-center ${noche ? "glass-dark" : "glass"}`}>
      <p className="text-2xl" aria-hidden="true">
        ☕
      </p>
      <h2 className={`font-display mt-1 font-bold ${noche ? "text-white" : "text-slate-900"}`}>{t.pomodoro.tipTitulo}</h2>
      <p className={`mt-2 text-sm leading-relaxed ${noche ? "text-gray-300" : "text-slate-600"}`}>
        {t.pomodoro.tipTexto}
      </p>
    </aside>
  );
}
