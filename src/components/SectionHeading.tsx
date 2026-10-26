import { Link } from "react-router";

interface Props {
  kicker: string;
  titulo: string;
  subtitulo?: string;
  oscuro?: boolean;
}

/** Encabezado de sección reutilizable para la landing */
export function SectionHeading({ kicker, titulo, subtitulo, oscuro }: Props) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span
        className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase ${
          oscuro ? "glass-dark text-teal-300" : "glass text-teal-700"
        }`}
      >
        {kicker}
      </span>
      <h2
        className={`mt-4 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl ${
          oscuro ? "text-white" : "text-slate-900"
        }`}
      >
        {titulo}
      </h2>
      {subtitulo && (
        <p className={`mt-4 text-lg leading-relaxed ${oscuro ? "text-teal-100/80" : "text-slate-700"}`}>
          {subtitulo}
        </p>
      )}
    </div>
  );
}

/** Enlace de texto con flecha usado en cards y CTAs */
export function ArrowLink({
  to,
  children,
  oscuro,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  oscuro?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group inline-flex items-center gap-1.5 text-sm font-bold transition-colors ${
        oscuro ? "text-cyan-300 hover:text-cyan-200" : "text-teal-700 hover:text-teal-600"
      }`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
