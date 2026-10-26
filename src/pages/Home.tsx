import { useState } from "react";
import { NightSky } from "../components/NightSky";
import { Navegacion } from "../components/Navegacion";
import { Footer } from "../components/Footer";
import { TechniquePicker } from "../components/TechniquePicker";
import { Hero } from "../components/home/Hero";
import { TechniquesSection } from "../components/home/TechniquesSection";
import { HowItWorks, FeaturesGrid, CtaSection } from "../components/home/Sections";
import { FaqSection } from "../components/home/FaqSection";
import { useApp } from "../context/AppContext";

export function Home() {
  const [pickerAbierto, setPickerAbierto] = useState(false);
  const { noche } = useApp();

  return (
    <div className={`${noche ? "cuerpo_noche" : "cielo_animado"} relative flex min-h-screen flex-col`}>
      {noche && <NightSky />}
      <Navegacion />
      <main className="flex-1">
        <Hero onComenzar={() => setPickerAbierto(true)} />
        <TechniquesSection />
        <HowItWorks />
        <FeaturesGrid />
        <CtaSection onComenzar={() => setPickerAbierto(true)} />
        <FaqSection />
      </main>
      <Footer />
      <TechniquePicker abierto={pickerAbierto} cerrar={() => setPickerAbierto(false)} />
    </div>
  );
}
