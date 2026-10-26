
import "../styles/fondosMain.css";

export const NightSky = () => {
  // Detecta si es móvil
  const isMobile = window.innerWidth < 768;
  const numStars = isMobile ? 4 : 20;

  const stars = Array.from({ length: numStars }, (_, i) => (
    <div key={i} className="shooting_star"></div>
  ));

  return <div className="night">{stars}</div>;
};

