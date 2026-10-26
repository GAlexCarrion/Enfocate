import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { es } from "../i18n/es";
import { en } from "../i18n/en";
import type { Dictionary } from "../i18n/es";

export type Theme = "dia" | "noche";
export type Lang = "es" | "en";

interface AppState {
  noche: boolean;
  toggleNoche: () => void;
  lang: Lang;
  toggleLang: () => void;
  t: Dictionary;
}

const AppContext = createContext<AppState | null>(null);

const THEME_KEY = "focusup:theme";
const LANG_KEY = "focusup:lang";

function leerPreferencia<T extends string>(clave: string, valido: T[], porDefecto: T): T {
  try {
    const guardado = localStorage.getItem(clave);
    if (guardado && (valido as string[]).includes(guardado)) return guardado as T;
  } catch {
    /* localStorage puede no estar disponible */
  }
  return porDefecto;
}

function prefiereOscuroSistema(): boolean {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    /* matchMedia puede no estar disponible */
  }
  return false;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [noche, setNoche] = useState(() => {
    try {
      const guardado = localStorage.getItem(THEME_KEY);
      if (guardado === "noche") return true;
      if (guardado === "dia") return false;
    } catch {
      /* localStorage puede no estar disponible */
    }
    // Primera visita: respetar el tema del navegador del usuario
    return prefiereOscuroSistema();
  });
  const [lang, setLang] = useState<Lang>(() => leerPreferencia<Lang>(LANG_KEY, ["es", "en"], "es"));

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, noche ? "noche" : "dia");
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignorar */
    }
  }, [noche, lang]);

  const value = useMemo<AppState>(
    () => ({
      noche,
      toggleNoche: () => setNoche((v) => !v),
      lang,
      toggleLang: () => setLang((l) => (l === "es" ? "en" : "es")),
      t: lang === "es" ? es : en,
    }),
    [noche, lang],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de AppProvider");
  return ctx;
}
