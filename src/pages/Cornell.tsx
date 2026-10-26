import { useState, useRef } from "react";
import { NightSky } from "../components/NightSky";
import { Navegacion } from "../components/Navegacion";
import { Footer } from "../components/Footer";
import { IconoComponent } from "../components/IconoComponent";
import { FiDownload, FiInfo } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { useApp } from "../context/AppContext";

interface Campos {
  titulo: string;
  ideasPrincipales: string;
  notasClase: string;
  resumen: string;
}

export function Cornell() {
  const { noche, t } = useApp();
  const [formulario, setFormulario] = useState<Campos>({
    titulo: "",
    ideasPrincipales: "",
    notasClase: "",
    resumen: "",
  });
  const [aviso, setAviso] = useState<string | null>(null);

  const tituloRef = useRef<HTMLTextAreaElement | null>(null);
  const ideasRef = useRef<HTMLTextAreaElement | null>(null);
  const notasRef = useRef<HTMLTextAreaElement | null>(null);
  const resumenRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const autoAltura = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
    const el = ref.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  const handlePrint = useReactToPrint({ contentRef: formRef, documentTitle: "Notas Cornell" });

  const descargar = () => {
    if (
      !formulario.titulo.trim() ||
      !formulario.ideasPrincipales.trim() ||
      !formulario.notasClase.trim() ||
      !formulario.resumen.trim()
    ) {
      setAviso(t.cornell.errorCampos);
      return;
    }
    setAviso(null);
    handlePrint();
  };

  const labelClases = `mb-2 block text-xs font-bold tracking-widest uppercase ${
    noche ? "text-cyan-300" : "text-teal-700"
  }`;
  const inputClases = `block w-full resize-none rounded-xl border p-3.5 text-sm outline-none transition-colors ${
    noche
      ? "border-white/15 bg-white/10 text-white placeholder:text-gray-400 focus:border-cyan-300/60"
      : "border-slate-900/15 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500"
  }`;

  return (
    <div className={`${noche ? "cuerpo_noche" : "cielo_animado"} relative flex min-h-screen flex-col`}>
      {noche && <NightSky />}
      <Navegacion />
      <IconoComponent nombre="Cornell" />
      <main className="flex-1 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Encabezado */}
          <header className="mb-8 text-center">
            <span
              className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase ${
                noche ? "glass-dark text-cyan-300" : "glass text-teal-700"
              }`}
            >
              {t.nav.tecnicas}
            </span>
            <h1 className={`mt-3 font-display text-4xl font-extrabold tracking-tight ${noche ? "text-white" : "text-slate-900"}`}>
              {t.cornell.titulo}
            </h1>
          </header>

          {/* Pista de uso */}
          <aside className={`mb-6 flex items-start gap-3 rounded-2xl p-4 ${noche ? "glass-dark" : "glass"}`}>
            <FiInfo size={18} aria-hidden="true" className={`mt-0.5 shrink-0 ${noche ? "text-cyan-300" : "text-teal-600"}`} />
            <p className={`text-sm leading-relaxed ${noche ? "text-gray-200" : "text-slate-700"}`}>
              {t.cornell.explicacion}
            </p>
          </aside>

          {/* Hoja Cornell */}
          <form ref={formRef} className={`rounded-[2rem] p-6 sm:p-8 ${noche ? "glass-dark" : "glass-strong"}`}>
            {/* Título */}
            <label htmlFor="titulo" className={labelClases}>
              {t.cornell.campoTitulo}
            </label>
            <textarea
              id="titulo"
              ref={tituloRef}
              rows={1}
              onInput={() => autoAltura(tituloRef)}
              className={inputClases}
              value={formulario.titulo}
              onChange={(e) => setFormulario({ ...formulario, titulo: e.target.value })}
              placeholder={t.cornell.phTitulo}
            />

            {/* Ideas + Notas */}
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="ideas-principales" className={labelClases}>
                  {t.cornell.campoIdeas}
                </label>
                <textarea
                  id="ideas-principales"
                  ref={ideasRef}
                  rows={10}
                  onInput={() => autoAltura(ideasRef)}
                  className={`${inputClases} min-h-56`}
                  value={formulario.ideasPrincipales}
                  onChange={(e) => setFormulario({ ...formulario, ideasPrincipales: e.target.value })}
                  placeholder={t.cornell.phIdeas}
                />
              </div>
              <div>
                <label htmlFor="notas-clase" className={labelClases}>
                  {t.cornell.campoNotas}
                </label>
                <textarea
                  id="notas-clase"
                  ref={notasRef}
                  rows={10}
                  onInput={() => autoAltura(notasRef)}
                  className={`${inputClases} min-h-56`}
                  value={formulario.notasClase}
                  onChange={(e) => setFormulario({ ...formulario, notasClase: e.target.value })}
                  placeholder={t.cornell.phNotas}
                />
              </div>
            </div>

            {/* Resumen */}
            <label htmlFor="resumen" className={`${labelClases} mt-5`}>
              {t.cornell.campoResumen}
            </label>
            <textarea
              id="resumen"
              ref={resumenRef}
              rows={3}
              onInput={() => autoAltura(resumenRef)}
              className={inputClases}
              value={formulario.resumen}
              onChange={(e) => setFormulario({ ...formulario, resumen: e.target.value })}
              placeholder={t.cornell.phResumen}
            />
          </form>

          {aviso && (
            <p role="alert" className="mt-4 text-center text-sm font-semibold text-red-500">
              {aviso}
            </p>
          )}

          {/* Descarga */}
          <div className="mt-7 mb-10 text-center">
            <button
              type="button"
              onClick={descargar}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-white shadow-lg shadow-teal-600/30 transition-all hover:-translate-y-0.5 focus:ring-4 focus:outline-none ${
                noche ? "bg-linear-to-r from-cyan-500 to-teal-500" : "bg-linear-to-r from-teal-500 to-cyan-500"
              }`}
            >
              <FiDownload aria-hidden="true" />
              {t.cornell.descargarPdf}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
