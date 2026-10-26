import { FiClock, FiEdit3, FiGrid, FiVideo } from "react-icons/fi";
import type { IconType } from "react-icons";

export type TechniqueId = "pomodoro" | "feynman" | "cornell" | "mapasMentales";

export interface TechniqueDef {
  id: TechniqueId;
  /** nombre usado en las rutas de guía */
  rutaGuia: string;
  path: string;
  icono: IconType;
  /** clases del mosaico de ícono (gradiente identidad) */
  gradiente: string;
}

export const TECHNICAS: TechniqueDef[] = [
  {
    id: "pomodoro",
    rutaGuia: "Pomodoro",
    path: "/pomodoro",
    icono: FiClock,
    gradiente: "from-rose-400 to-orange-400",
  },
  {
    id: "feynman",
    rutaGuia: "Feynman",
    path: "/feynman",
    icono: FiVideo,
    gradiente: "from-sky-400 to-cyan-400",
  },
  {
    id: "cornell",
    rutaGuia: "Cornell",
    path: "/cornell",
    icono: FiEdit3,
    gradiente: "from-teal-400 to-emerald-400",
  },
  {
    id: "mapasMentales",
    rutaGuia: "Mapas Mentales",
    path: "/mapas-mentales",
    icono: FiGrid,
    gradiente: "from-violet-400 to-fuchsia-400",
  },
];
