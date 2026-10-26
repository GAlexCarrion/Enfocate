import { Link } from "react-router";
import { FiCheckCircle } from "react-icons/fi";
import { Navegacion } from "../components/Navegacion";
import { Footer } from "../components/Footer";
import { useApp } from "../context/AppContext";
import logo from "../assets/imgs/logoSinFondo.png";

export function Aboutus() {
  const { noche, t } = useApp();

  const texto = noche ? "text-teal-100/85" : "text-slate-700";

  return (
    <div className={`${noche ? "cuerpo_noche" : "cielo_animado"} relative flex min-h-screen flex-col`}>
      <Navegacion />
      <main className="flex-1 px-6 py-16">
        <div className="container mx-auto max-w-5xl">
          {/* Historia */}
          <section className={`rounded-[2rem] p-8 sm:p-12 ${noche ? "glass-dark" : "glass-strong"}`}>
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <span
                  className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase ${
                    noche ? "glass-dark text-cyan-300" : "bg-teal-500/10 text-teal-700"
                  }`}
                >
                  {t.about.kicker}
                </span>
                <h1 className={`mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl ${noche ? "text-white" : "text-slate-900"}`}>
                  {t.about.titulo}
                </h1>
                <p className={`mt-5 leading-relaxed ${texto}`}>{t.about.parrafo1}</p>
                <p className={`mt-4 leading-relaxed ${texto}`}>{t.about.parrafo2}</p>
              </div>
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                className="animate-float mx-auto h-40 w-40 object-contain drop-shadow-xl lg:h-52 lg:w-52"
                width={160}
                height={160}
              />
            </div>

            {/* Stats reales */}
            <dl className={`mt-12 grid grid-cols-2 gap-6 border-t pt-10 lg:grid-cols-4 ${noche ? "border-white/10" : "border-slate-900/10"}`}>
              {t.about.stats.map((stat) => (
                <div key={stat.etiqueta} className="text-center">
                  <dd className={`font-display text-4xl font-extrabold ${noche ? "text-cyan-300" : "text-teal-600"}`}>
                    {stat.valor}
                  </dd>
                  <dt className={`mt-1 text-sm ${texto}`}>{stat.etiqueta}</dt>
                </div>
              ))}
            </dl>
          </section>

          {/* Qué puedes hacer */}
          <section className="mt-14">
            <h2 className={`font-display text-2xl font-bold sm:text-3xl ${noche ? "text-white" : "text-slate-900"}`}>
              {t.about.puedesTitulo}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.about.puedes.map((item) => (
                <li
                  key={item}
                  className={`flex items-start gap-3 rounded-2xl p-4 ${noche ? "glass-dark" : "glass"}`}
                >
                  <FiCheckCircle
                    size={20}
                    aria-hidden="true"
                    className={`mt-0.5 shrink-0 ${noche ? "text-cyan-300" : "text-teal-600"}`}
                  />
                  <span className={`text-sm leading-relaxed ${texto}`}>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Equipo */}
          <section className="mt-14">
            <h2 className={`font-display text-2xl font-bold sm:text-3xl ${noche ? "text-white" : "text-slate-900"}`}>
              {t.about.equipoTitulo}
            </h2>
            <p className={`mt-3 max-w-2xl leading-relaxed ${texto}`}>{t.about.equipoTexto}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {t.about.equipo.map((persona) => (
                <li key={persona.nombre} className={`flex items-center gap-4 rounded-2xl p-4 ${noche ? "glass-dark" : "glass"}`}>
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-teal-400 to-cyan-500 font-display text-lg font-extrabold text-white`}
                  >
                    {persona.nombre.charAt(0)}
                  </span>
                  <div>
                    <p className={`font-bold ${noche ? "text-white" : "text-slate-900"}`}>{persona.nombre}</p>
                    <p className={`text-xs ${texto}`}>{persona.rol}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA final */}
          <div className="mt-14 text-center">
            <Link
              to="/"
              className={`inline-flex items-center rounded-xl px-7 py-3.5 font-bold text-white shadow-lg shadow-teal-600/30 transition-all hover:-translate-y-0.5 ${
                noche ? "bg-linear-to-r from-cyan-500 to-teal-500" : "bg-linear-to-r from-teal-500 to-cyan-500"
              }`}
            >
              {t.common.comenzarAhora}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
