import { useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useApp } from "../context/AppContext";

interface Playlist {
  src: string;
  name: string;
  playlistUrl: string;
}

const PLAYLISTS: Playlist[] = [
  {
    src: "https://4kwallpapers.com/images/wallpapers/lofi-japanese-3840x2160-14884.jpg",
    name: "Lofi Japan",
    playlistUrl: "https://open.spotify.com/playlist/5YKm5Zt0AUdKrlrvWzUV6l?si=69d0b98ad5ec4ab5",
  },
  {
    src: "https://wallpapers.com/images/hd/cool-moon-bttwowcloeskvehr.jpg",
    name: "Ambient Relaxation",
    playlistUrl: "https://open.spotify.com/playlist/5q4mxhDt3n9xG4t7d0oM3Y?si=175525828da7440f",
  },
  {
    src: "https://images5.alphacoders.com/798/thumb-1920-798722.png",
    name: "Undertale & Sleep Piano",
    playlistUrl: "https://open.spotify.com/playlist/6n6JnvohJmpiC3F2YQwU6o?si=f05cec125f3c45ff",
  },
  {
    src: "https://images6.alphacoders.com/136/thumb-1920-1361761.jpeg",
    name: "Chill Vibes",
    playlistUrl: "https://open.spotify.com/playlist/4IobLZ6VHv6bi9g36zYHJ8?si=612d680e1d774e1d",
  },
  {
    src: "https://m.gettywallpapers.com/wp-content/uploads/2023/11/Anime-Boy-Studying-4k-Wallpaper-For-PC-scaled.jpg",
    name: "Lofi Hip Hop radio",
    playlistUrl: "https://open.spotify.com/playlist/21KXYY1S0ZALYl0q3uDlUU?si=7f5c05be328c44dd",
  },
  {
    src: "https://a-static.besthdwallpaper.com/chill-shiba-sleeping-christmas-room-wallpaper-2880x1800-88233_8.jpg",
    name: "Dreamy Lofi",
    playlistUrl: "https://open.spotify.com/playlist/31BkGDoJAO042TGUN3prMu?si=29fe9121bbb14cd4",
  },
];

export function CarruselPlaylist() {
  const { noche, t } = useApp();
  const [actual, setActual] = useState(0);
  const [pausado, setPausado] = useState(false);

  const siguiente = useCallback(() => {
    setActual((i) => (i + 1) % PLAYLISTS.length);
  }, []);

  const anterior = () => {
    setActual((i) => (i - 1 + PLAYLISTS.length) % PLAYLISTS.length);
  };

  useEffect(() => {
    if (pausado) return;
    const id = setInterval(siguiente, 5000);
    return () => clearInterval(id);
  }, [siguiente, pausado]);

  return (
    <div
      className="relative mx-auto w-full max-w-5xl"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className={`relative h-80 overflow-hidden rounded-[2rem] md:h-[30rem] ${noche ? "glass-dark" : "glass-strong"} p-2`}>
        {PLAYLISTS.map((item, index) => (
          <div
            key={item.name}
            className={`absolute inset-2 overflow-hidden rounded-3xl transition-opacity duration-700 ${
              index === actual ? "z-20 opacity-100" : "pointer-events-none z-10 opacity-0"
            }`}
          >
            <img
              src={item.src}
              alt={item.name}
              loading={index === 0 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
            {index === actual && (
              <div className="absolute inset-x-0 bottom-8 z-30 flex flex-col items-center">
                <p className="mb-3 rounded-full bg-slate-950/50 px-4 py-1.5 text-sm font-bold text-white backdrop-blur">
                  {item.name}
                </p>
                <a
                  href={item.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 ${
                    noche ? "bg-cyan-500 hover:bg-cyan-400" : "bg-teal-500 hover:bg-teal-600"
                  }`}
                >
                  ▶ {t.spotify.escuchar}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-[-1.75rem] left-1/2 z-30 flex -translate-x-1/2 gap-2.5">
        {PLAYLISTS.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setActual(index)}
            aria-label={`${index + 1} · ${item.name}`}
            aria-current={index === actual ? "true" : "false"}
            className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
              index === actual
                ? noche
                  ? "w-7 bg-cyan-300"
                  : "w-7 bg-teal-600"
                : noche
                  ? "w-2.5 bg-white/30 hover:bg-white/50"
                  : "w-2.5 bg-slate-900/25 hover:bg-slate-900/40"
            }`}
          />
        ))}
      </div>

      {/* Controles */}
      <button
        type="button"
        onClick={anterior}
        aria-label="Previous"
        className={`absolute top-1/2 left-4 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full backdrop-blur transition-colors ${
          noche ? "glass-dark text-white hover:bg-white/20" : "glass-strong text-slate-800 hover:bg-white"
        }`}
      >
        <FiChevronLeft size={22} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={siguiente}
        aria-label="Next"
        className={`absolute top-1/2 right-4 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full backdrop-blur transition-colors ${
          noche ? "glass-dark text-white hover:bg-white/20" : "glass-strong text-slate-800 hover:bg-white"
        }`}
      >
        <FiChevronRight size={22} aria-hidden="true" />
      </button>
    </div>
  );
}
