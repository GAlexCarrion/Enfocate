import { NightSky } from "../components/NightSky";
import { Navegacion } from "../components/Navegacion";
import { Footer } from "../components/Footer";
import { IconoComponent } from "../components/IconoComponent";
import { FiExternalLink } from "react-icons/fi";
import { useApp } from "../context/AppContext";

import mapa1 from "../assets/imgs/1.png";
import mapa2 from "../assets/imgs/2.png";
import mapa3 from "../assets/imgs/3.png";
import mapa4 from "../assets/imgs/4.png";
import mapa5 from "../assets/imgs/5.png";
import mapa6 from "../assets/imgs/6.png";
import mapa7 from "../assets/imgs/7.png";
import mapa8 from "../assets/imgs/8.png";
import mapa9 from "../assets/imgs/9.png";
import mapa10 from "../assets/imgs/10.png";
import mapa11 from "../assets/imgs/11.png";
import mapa12 from "../assets/imgs/12.png";

interface Plantilla {
  img: string;
  alt: string;
  canvaUrl: string;
}

const CANVA_BASE = "https://www.canva.com/design";

const PLANTILLAS: Plantilla[] = [
  { img: mapa1,  alt: "1",  canvaUrl: `${CANVA_BASE}/DAGoCFIxeoI/rqvCkBy-w_OMUdIyh9IWKA/edit` },
  { img: mapa2,  alt: "2",  canvaUrl: `${CANVA_BASE}/DAGoCMFYrAw/2nklJBJ0QeLnx1TZ18cbjw/edit` },
  { img: mapa3,  alt: "3",  canvaUrl: `${CANVA_BASE}/DAGoCFPilZA/bsJpQo2Z8cQKoxUtbXl2Dw/edit` },
  { img: mapa4,  alt: "4",  canvaUrl: `${CANVA_BASE}/DAGoCBe0QFI/14Q5Hifwiih-lcwIclcYyw/edit` },
  { img: mapa5,  alt: "5",  canvaUrl: `${CANVA_BASE}/DAGoCBgVaNo/LCZTip5nfke5neep3NQ-PA/edit` },
  { img: mapa6,  alt: "6",  canvaUrl: `${CANVA_BASE}/DAGoCY6Wdzo/WwRpwHCRFFe7jLgHIsB42w/edit` },
  { img: mapa7,  alt: "7",  canvaUrl: `${CANVA_BASE}/DAGoCSMjp0E/XV9y92jdaVvov3BR_9NL_Q/edit` },
  { img: mapa8,  alt: "8",  canvaUrl: `${CANVA_BASE}/DAGoCY3T0uE/MQevl2dLpykmxb5WKuSOVA/edit` },
  { img: mapa9,  alt: "9",  canvaUrl: `${CANVA_BASE}/DAGoCVvkS_A/XaY0WP63hw6qndifv4nixw/edit` },
  { img: mapa10, alt: "10", canvaUrl: `${CANVA_BASE}/DAGoCQUnoRs/2c36JyGjrSho1tqzPqYNVQ/edit` },
  { img: mapa11, alt: "11", canvaUrl: `${CANVA_BASE}/DAGoCZT72pU/9TOzHBDhgzlNXsVWRzUd1g/edit` },
  { img: mapa12, alt: "12", canvaUrl: `${CANVA_BASE}/DAGoCS9cF7s/6B6VeVainrMdOMf77NTAVQ/edit` },
];

export function MapasMentales() {
  const { noche, t } = useApp();

  return (
    <div className={`${noche ? "cuerpo_noche" : "cielo_animado"} relative flex min-h-screen flex-col`}>
      {noche && <NightSky />}
      <Navegacion />
      <IconoComponent nombre="Mapas Mentales" />
      <main className="flex-1 px-6 py-14">
        <div className="container mx-auto">
          {/* Encabezado */}
          <header className="mx-auto max-w-2xl text-center">
            <span
              className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase ${
                noche ? "glass-dark text-cyan-300" : "glass text-teal-700"
              }`}
            >
              {t.nav.tecnicas}
            </span>
            <h1
              className={`mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl ${
                noche ? "text-white" : "text-slate-900"
              }`}
            >
              {t.mapas.titulo}
            </h1>
            <p className={`mt-4 leading-relaxed ${noche ? "text-teal-100/80" : "text-slate-700"}`}>
              {t.mapas.subtitulo}
            </p>
          </header>

          {/* Galería */}
          <ul className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {PLANTILLAS.map((plantilla) => (
              <li key={plantilla.alt}>
                <a
                  href={plantilla.canvaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.mapas.editar} · ${t.mapas.plantillaAria} ${plantilla.alt}`}
                  className={`group block overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    noche ? "glass-dark hover:shadow-black/50" : "glass hover:shadow-teal-900/20"
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={plantilla.img}
                      alt={`${t.mapas.plantillaAria} ${plantilla.alt}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay con botón */}
                    <div className="absolute inset-0 flex items-end justify-center bg-linear-to-t from-slate-950/70 via-transparent to-transparent p-5 opacity-90 transition-opacity group-hover:opacity-100">
                      <span
                        className={`inline-flex translate-y-2 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform duration-300 group-hover:translate-y-0 ${
                          noche ? "bg-cyan-500 hover:bg-cyan-400" : "bg-teal-500 hover:bg-teal-600"
                        }`}
                      >
                        {t.mapas.editar}
                        <FiExternalLink size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
