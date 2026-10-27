import { Link } from "react-router";
import { FaSpotify } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import { TECHNICAS } from "../data/techniques";
import logo from "../assets/imgs/logoSinFondo.png";

export function Footer() {
  const { noche, t } = useApp();
  const anio = new Date().getFullYear();

  const texto = noche ? "text-teal-100/80" : "text-slate-700";
  const titulo = `text-xs font-bold tracking-widest uppercase ${noche ? "text-cyan-300" : "text-teal-700"}`;
  const enlace = `block py-1 transition-colors hover:underline ${
    noche ? "hover:text-white" : "hover:text-teal-800"
  }`;

  return (
    <footer className={`mt-auto border-t backdrop-blur-xl ${noche ? "border-white/10 bg-[#0b1220]/60" : "border-white/40 bg-white/40"}`}>
      <div className="container mx-auto grid gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="" aria-hidden="true" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className={`font-display text-xl font-extrabold ${noche ? "text-white" : "text-slate-900"}`}>
              Enfocate<span className={noche ? "text-cyan-300" : "text-teal-600"}></span>
            </span>
          </div>
          <p className={`mt-3 max-w-xs text-sm leading-relaxed ${texto}`}>{t.footer.tagline}</p>
          
        </div>

        {/* Explora */}
        <nav aria-label={t.footer.colExplora}>
          <h3 className={titulo}>{t.footer.colExplora}</h3>
          <ul className={`mt-3 space-y-1 text-sm ${texto}`}>
            <li>
              <Link to="/" className={enlace}>
                {t.nav.inicio}
              </Link>
            </li>
            <li>
              <Link to="/sobre-nosotros" className={enlace}>
                {t.nav.queEs}
              </Link>
            </li>
            <li>
              <Link to="/#faq" className={enlace}>
                {t.nav.faq}
              </Link>
            </li>
            <li>
              <Link to="/spotify" className={enlace}>
                {t.nav.spotifyAria}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Técnicas */}
        <nav aria-label={t.footer.colTecnicas}>
          <h3 className={titulo}>{t.footer.colTecnicas}</h3>
          <ul className={`mt-3 space-y-1 text-sm ${texto}`}>
            {TECHNICAS.map((tec) => (
              <li key={tec.id}>
                <Link to={`/guia/${tec.rutaGuia}`} className={enlace}>
                  {t.tecnicas[tec.id].nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Recursos */}
        <div>
          <h3 className={titulo}>{t.footer.colRecursos}</h3>
          <ul className={`mt-3 space-y-1 text-sm ${texto}`}>
            <li>
              <Link to="/guia/Pomodoro" className={enlace}>
                {t.pomodoro.verGuia}
              </Link>
            </li>
            <li>
              <a
                href="https://open.spotify.com/playlist/21KXYY1S0ZALYl0q3uDlUU?si=7f5c05be328c44dd"
                target="_blank"
                rel="noopener noreferrer"
                className={`${enlace} inline-flex items-center gap-1.5`}
              >
                <FaSpotify className="text-green-500" aria-hidden="true" /> Lofi Hip Hop
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Barra inferior */}
      <div className={`border-t ${noche ? "border-white/10" : "border-white/40"}`}>
        <div className={`container mx-auto flex flex-col items-center justify-between gap-2 px-6 py-4 text-xs sm:flex-row ${texto}`}>
          <p>© {anio} Enfocate · {t.footer.proyectoDe}</p>
          <p>{t.footer.hechoCon}</p>
        </div>
      </div>
    </footer>
  );
}
