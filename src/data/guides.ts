import pomodoro1 from "../assets/imgs/tec/Pomo1.png";
import pomodoro2 from "../assets/imgs/tec/Pomo2.png";
import pomodoro3 from "../assets/imgs/tec/Pomo3.png";
import pomodoro4 from "../assets/imgs/tec/Pomo7.png";
import pomodoro5 from "../assets/imgs/tec/Pomo5.png";
import pomodoro6 from "../assets/imgs/tec/Pomo6.png";
import feynman1 from "../assets/imgs/tec/Fetman2.png";
import feynman2 from "../assets/imgs/tec/Feyman1.png";
import feynman3 from "../assets/imgs/tec/Feyman3.png";
import feynman4 from "../assets/imgs/tec/Feyman4.png";
import cornell1 from "../assets/imgs/tec/Cornell1.png";
import cornell2 from "../assets/imgs/tec/Cornell2.png";
import cornell3 from "../assets/imgs/tec/Cornell3.png";
import cornell4 from "../assets/imgs/tec/Cornell 5.png";
import mapas1 from "../assets/imgs/tec/Mapas1.png";
import mapas2 from "../assets/imgs/tec/mapas3.png";
import mapas3 from "../assets/imgs/tec/Mapas2.png";
import type { TechniqueId } from "./techniques";

export const PASOS_GUIA: Record<TechniqueId, string[]> = {
  pomodoro: [pomodoro1, pomodoro2, pomodoro3, pomodoro4, pomodoro5, pomodoro6],
  feynman: [feynman1, feynman2, feynman3, feynman4],
  cornell: [cornell1, cornell2, cornell3, cornell4],
  mapasMentales: [mapas1, mapas2, mapas3],
};
