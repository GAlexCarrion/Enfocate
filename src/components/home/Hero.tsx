import { FiArrowDown, FiPlay } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { TECHNICAS } from "../../data/techniques";
import logo from "../../assets/imgs/logoSinFondo.png";

interface Props {
  onComenzar: () => void;
}

export function Hero({ onComenzar }: Props) {
  const { noche, t } = useApp();

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 pt-10 pb-16 text-center">
      {/* Orbes decorativos */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute -top-20 left-[15%] h-72 w-72 rounded-full blur-3xl ${noche ? "bg-cyan-500/15" : "bg-white/50"}`} />
        <div className={`absolute right-[12%] bottom-1/4 h-80 w-80 rounded-full blur-3xl ${noche ? "bg-indigo-500/15" : "bg-teal-300/40"}`} />
      </div>

      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="animate-fade-up animate-float relative mb-6 h-24 w-24 object-contain drop-shadow-xl md:h-28 md:w-28"
        width={96}
        height={96}
      />

      <span
        className={`animate-fade-up delay-100 relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide ${
          noche ? "glass-dark text-cyan-200" : "glass text-teal-800"
        }`}
      >
        {t.home.hero.badge}
      </span>

      <h1 className="animate-fade-up delay-200 font-display relative mt-5 max-w-3xl text-5xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
        <span className={noche ? "text-white" : "text-slate-900"}>{t.home.hero.titulo1}</span>{" "}
        <span className="bg-linear-to-r from-teal-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
          {t.home.hero.titulo2}
        </span>
      </h1>

      <p
        className={`animate-fade-up delay-300 mt-6 max-w-2xl text-lg leading-relaxed ${
          noche ? "text-teal-100/85" : "text-slate-700"
        }`}
      >
        {t.home.hero.subtitulo}
      </p>

      <div className="animate-fade-up delay-500 relative mt-9 flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onComenzar}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-teal-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-500/40 focus:ring-4 focus:outline-none ${
            noche ? "bg-linear-to-r from-cyan-500 to-teal-500" : "bg-linear-to-r from-teal-500 to-cyan-500"
          }`}
        >
          <FiPlay aria-hidden="true" />
          {t.home.hero.ctaPrimario}
        </button>
        <a
          href="#tecnicas"
          className={`inline-flex items-center gap-2 rounded-xl border px-7 py-3.5 text-base font-bold backdrop-blur transition-all hover:-translate-y-0.5 ${
            noche ? "border-white/25 text-white hover:bg-white/10" : "border-slate-900/20 text-slate-800 hover:bg-white/50"
          }`}
        >
          {t.home.hero.ctaSecundario}
        </a>
      </div>

      {/* Accesos rápidos a las técnicas */}
      <ul className="animate-fade-up delay-500 relative mt-12 flex flex-wrap items-center justify-center gap-2.5">
        {TECHNICAS.map((tec) => {
          const Icono = tec.icono;
          return (
            <li key={tec.id}>
              <a
                href={`#tecnicas`}
                title={t.tecnicas[tec.id].nombre}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:-translate-y-1 ${
                  noche ? "glass-dark text-gray-100" : "glass text-slate-700"
                }`}
              >
                <Icono size={18} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>

      <a
        href="#tecnicas"
        aria-label={t.common.scrollHint}
        className={`animate-scroll-hint absolute bottom-6 flex h-10 w-10 items-center justify-center rounded-full ${
          noche ? "text-teal-300" : "text-teal-700"
        }`}
      >
        <FiArrowDown size={22} aria-hidden="true" />
      </a>
    </section>
  );
}
