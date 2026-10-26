import { NightSky } from "../components/NightSky";
import { Navegacion } from "../components/Navegacion";
import { Footer } from "../components/Footer";
import { CarruselPlaylist } from "../components/CarruselPlaylist";
import { FaSpotify } from "react-icons/fa";
import { useApp } from "../context/AppContext";

export function Spotify() {
  const { noche, t } = useApp();

  return (
    <div className={`${noche ? "cuerpo_noche" : "cielo_animado"} relative flex min-h-screen flex-col`}>
      {noche && <NightSky />}
      <Navegacion />
      <main className="flex-1 px-6 py-16 pb-24">
        <header className="mx-auto max-w-2xl text-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase ${
              noche ? "glass-dark text-green-300" : "glass text-green-700"
            }`}
          >
            <FaSpotify size={14} aria-hidden="true" />
            Spotify
          </span>
          <h1
            className={`mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl ${
              noche ? "text-white" : "text-slate-900"
            }`}
          >
            {t.spotify.titulo}
          </h1>
          <p className={`mt-4 leading-relaxed ${noche ? "text-teal-100/80" : "text-slate-700"}`}>
            {t.spotify.subtitulo}
          </p>
        </header>

        <div className="mt-12">
          <CarruselPlaylist />
        </div>
      </main>
      <Footer />
    </div>
  );
}
