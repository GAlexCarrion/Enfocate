import { Link } from "react-router";
import { FiHome } from "react-icons/fi";
import { NightSky } from "../components/NightSky";
import { useApp } from "../context/AppContext";

export function NotFound() {
  const { t } = useApp();

  return (
    <div className="cuerpo_noche relative flex min-h-screen flex-col">
      <NightSky />
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-8xl font-extrabold tracking-tight text-white sm:text-9xl">
          <span className="bg-linear-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">404</span>
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">{t.notFound.titulo}</h1>
        <p className="mt-2 max-w-md text-teal-100/70">{t.notFound.texto}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-teal-500 to-cyan-500 px-6 py-3 font-bold text-white shadow-lg shadow-teal-600/30 transition-transform hover:-translate-y-0.5"
        >
          <FiHome aria-hidden="true" />
          {t.notFound.boton}
        </Link>
      </main>
    </div>
  );
}
