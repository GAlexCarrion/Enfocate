import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router"

// Code-splitting por ruta: cada página se descarga solo cuando se visita
const Home = lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })))
const Pomodoro = lazy(() => import("./pages/Pomodoro").then((m) => ({ default: m.Pomodoro })))
const Feynman = lazy(() => import("./pages/Feynman").then((m) => ({ default: m.Feynman })))
const Cornell = lazy(() => import("./pages/Cornell").then((m) => ({ default: m.Cornell })))
const MapasMentales = lazy(() => import("./pages/MapasMentales").then((m) => ({ default: m.MapasMentales })))
const Aboutus = lazy(() => import("./pages/Aboutus").then((m) => ({ default: m.Aboutus })))
const Spotify = lazy(() => import("./pages/Spotify").then((m) => ({ default: m.Spotify })))
const Guia = lazy(() => import("./pages/Guia").then((m) => ({ default: m.Guia })))
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })))

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/feynman" element={<Feynman />} />
        <Route path="/cornell" element={<Cornell />} />
        <Route path="/mapas-mentales" element={<MapasMentales />} />
        <Route path="/sobre-nosotros" element={<Aboutus />} />
        <Route path="/spotify" element={<Spotify />} />
        <Route path="/guia/:nombre" element={<Guia />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
