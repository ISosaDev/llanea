/**
 * Hero de la Home: propuesta de valor sobre el paisaje llanero y buscador.
 * Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea
 */
import { useState } from 'react';
import { FondoHero } from './Ilustraciones';
import BuscadorRapido from './BuscadorRapido';

function Hero() {
  // Estado: si la fotografía no carga, se dibuja el paisaje vectorial de respaldo
  const [fallaImagen, setFallaImagen] = useState(false);

  return (
    <section className="hero">
      {fallaImagen ? (
        <FondoHero />
      ) : (
        // srcSet entrega la versión liviana (960 px) a pantallas pequeñas y la grande (1920 px) a las demás
        <img
          className="hero__fondo hero__foto"
          src="/img/hero-llanea-1920.webp"
          srcSet="/img/hero-llanea-960.webp 960w, /img/hero-llanea-1920.webp 1920w"
          sizes="100vw"
          alt=""
          fetchPriority="high"
          onError={() => setFallaImagen(true)}
        />
      )}
      {/* Velo oscuro para que el texto blanco se lea sobre cualquier imagen */}
      <div className="hero__velo" aria-hidden="true" />

      <div className="hero__contenido">
        <span className="hero__etiqueta">Alojamiento · Gastronomía · Ecoturismo</span>
        <h1>Descubre el Casanare como un local.</h1>
        <p>
          Hatos, gastronomía llanera y ecoturismo en los 19 municipios. Todo verificado.
          Todo reservable en línea.
        </p>
      </div>
      <BuscadorRapido />
    </section>
  );
}

export default Hero;
