import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { FaSpotify } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import { TECHNICAS } from "../data/techniques";
import logo from "../assets/imgs/logoSinFondo.png";

export function Navegacion() {
  const { noche, toggleNoche, lang, toggleLang, t } = useApp();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const location = useLocation();

  // Cierra menús al cambiar de ruta
  useEffect(() => {
    setMenuAbierto(false);
    setDropdownAbierto(false);
  }, [location.pathname]);

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    if (!dropdownAbierto) return;
    const cerrar = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownAbierto(false);
      }
    };
    document.addEventListener("mousedown", cerrar);
    return () => document.removeEventListener("mousedown", cerrar);
  }, [dropdownAbierto]);

  const linkBase = "rounded-lg px-3 py-2 text-sm font-semibold transition-colors";
  const linkClases = `${linkBase} ${
    noche ? "text-teal-100 hover:bg-white/10 hover:text-white" : "text-slate-700 hover:bg-white/50 hover:text-teal-800"
  }`;

  return (
    <header className={`sticky top-0 z-40 ${noche ? "nav-glass nav-noche" : "nav-glass"}`}>
      <nav className="container mx-auto flex items-center justify-between px-4 py-3" aria-label="Principal">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src={logo} alt="" aria-hidden="true" width={36} height={36} className="h-9 w-9 object-contain" />
          <span
            className={`font-display text-xl font-extrabold tracking-tight ${noche ? "text-white" : "text-slate-900"}`}
          >
            Focus<span className={noche ? "text-cyan-300" : "text-teal-600"}>Up</span>
          </span>
        </Link>

        {/* Enlaces escritorio */}
        <ul className="hidden items-center gap-1 md:flex">
          <li>
            <Link to="/" className={linkClases}>
              {t.nav.inicio}
            </Link>
          </li>
          <li ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownAbierto((v) => !v)}
              aria-expanded={dropdownAbierto}
              aria-haspopup="true"
              className={`${linkClases} inline-flex cursor-pointer items-center gap-1`}
            >
              {t.nav.tecnicas}
              <svg
                className={`h-4 w-4 transition-transform ${dropdownAbierto ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {dropdownAbierto && (
              <ul
                className={`absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 overflow-hidden rounded-xl p-1.5 ${
                  noche ? "glass-dark" : "glass-strong"
                }`}
              >
                {TECHNICAS.map((tec) => {
                  const Icono = tec.icono;
                  return (
                    <li key={tec.id}>
                      <Link
                        to={tec.path}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                          noche ? "text-gray-100 hover:bg-white/10" : "text-slate-800 hover:bg-teal-500/15"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br text-white ${
                            tec.gradiente
                          }`}
                        >
                          <Icono size={16} aria-hidden="true" />
                        </span>
                        {t.tecnicas[tec.id].nombre}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
          <li>
            <Link to="/sobre-nosotros" className={linkClases}>
              {t.nav.queEs}
            </Link>
          </li>
          <li>
            <Link to="/#faq" className={linkClases}>
              {t.nav.faq}
            </Link>
          </li>
          <li>
            <Link to="/spotify" aria-label={t.nav.spotifyAria} className={`${linkClases} !px-2`}>
              <FaSpotify className="text-xl" aria-hidden="true" />
            </Link>
          </li>
          
        </ul>

        {/* Controles: idioma, tema y hamburguesa */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.nav.cambiarIdioma}
            title={t.nav.cambiarIdioma}
            className={`flex h-9 cursor-pointer items-center gap-1 rounded-lg border px-2.5 text-xs font-bold uppercase tracking-wide transition-colors ${
              noche
                ? "border-white/20 text-teal-200 hover:bg-white/10"
                : "border-slate-900/15 text-slate-700 hover:bg-white/60"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2c2.5 2.6 4 6 4 10s-1.5 7.4-4 10c-2.5-2.6-4-6-4-10s1.5-7.4 4-10z" />
            </svg>
            {lang === "es" ? "ES" : "EN"}
          </button>

          <button
            type="button"
            onClick={toggleNoche}
            aria-label={noche ? t.nav.activarDia : t.nav.activarNoche}
            title={noche ? t.nav.activarDia : t.nav.activarNoche}
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition-colors ${
              noche
                ? "border-white/20 text-amber-300 hover:bg-white/10"
                : "border-slate-900/15 text-slate-700 hover:bg-white/60"
            }`}
          >
            {noche ? <FiSun size={17} aria-hidden="true" /> : <FiMoon size={16} aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            aria-expanded={menuAbierto}
            aria-label={menuAbierto ? t.nav.cerrarMenu : t.nav.abrirMenu}
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border md:hidden ${
              noche ? "border-white/20 text-white" : "border-slate-900/15 text-slate-800"
            }`}
          >
            {menuAbierto ? <FiX size={18} aria-hidden="true" /> : <FiMenu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className={`border-t md:hidden ${noche ? "border-white/10 bg-[#0b1220]/95" : "border-white/40 bg-white/80"} backdrop-blur-xl`}>
          <ul className="container mx-auto space-y-1 px-4 py-3">
            <li>
              <Link to="/" className={`${linkClases} block`}>
                {t.nav.inicio}
              </Link>
            </li>
            <li>
              <p className={`px-3 pt-2 pb-1 text-xs font-bold tracking-widest uppercase ${noche ? "text-teal-300/70" : "text-teal-700/70"}`}>
                {t.nav.tecnicas}
              </p>
            </li>
            {TECHNICAS.map((tec) => {
              const Icono = tec.icono;
              return (
                <li key={tec.id}>
                  <Link to={tec.path} className={`${linkClases} flex items-center gap-3`}>
                    <span className={`flex h-7 w-7 items-center justify-center rounded-md bg-linear-to-br text-white ${tec.gradiente}`}>
                      <Icono size={14} aria-hidden="true" />
                    </span>
                    {t.tecnicas[tec.id].nombre}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link to="/sobre-nosotros" className={`${linkClases} block`}>
                {t.nav.queEs}
              </Link>
            </li>
            <li>
              <Link to="/#faq" className={`${linkClases} block`}>
                {t.nav.faq}
              </Link>
            </li>
            <li>
              <Link to="/spotify" className={`${linkClases} flex items-center gap-2`}>
                <FaSpotify className="text-lg text-green-500" aria-hidden="true" /> {t.nav.spotifyAria}
              </Link>
            </li>
            <li>
              <a
                href="https://ko-fi.com/luiscr918"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClases} block`}
              >
                {t.nav.apoya}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
