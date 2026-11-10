/**
 * Hero de la Home: propuesta de valor sobre el paisaje llanero y buscador.
 * Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea
 */
import { FondoHero } from './Ilustraciones';
import BuscadorRapido from './BuscadorRapido';

function Hero() {
  return (
    <section className="hero">
      <FondoHero />
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
