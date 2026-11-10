/**
 * Sección de la Home: título, enlace "Ver todo" y cuadrícula de tarjetas.
 * Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea
 */
import EstablecimientoCard from './EstablecimientoCard';

// seccion: datos del encabezado | items: establecimientos ya filtrados para esta sección
function SeccionEstablecimientos({ seccion, items }) {
  return (
    <section className="seccion" aria-labelledby={`titulo-${seccion.id}`}>
      <header className="seccion__cabecera">
        <div>
          <h2 id={`titulo-${seccion.id}`}>
            {seccion.icono && <span aria-hidden="true">{seccion.icono} </span>}
            {seccion.titulo}
          </h2>
          {seccion.subtitulo && <p className="seccion__subtitulo">{seccion.subtitulo}</p>}
        </div>
        <a className="seccion__ver-todo" href="#">Ver todo ›</a>
      </header>

      <div className="cuadricula">
        {items.map((establecimiento) => (
          // El id del establecimiento es la key; evita confundir tarjetas al filtrar
          <EstablecimientoCard key={establecimiento.id} {...establecimiento} />
        ))}
      </div>
    </section>
  );
}

export default SeccionEstablecimientos;
