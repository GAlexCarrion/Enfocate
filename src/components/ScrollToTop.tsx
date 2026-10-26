import { useEffect } from "react";
import { useLocation } from "react-router";

/** Al cambiar de ruta sube al inicio; si hay hash (#faq), hace scroll a esa sección.
 *  Reintenta brevemente porque con React.lazy el destino puede tardar en montarse. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let intentos = 20;
    const intentar = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (intentos-- > 0) {
        setTimeout(intentar, 100);
      } else {
        window.scrollTo(0, 0);
      }
    };
    intentar();
  }, [pathname, hash]);

  return null;
}
