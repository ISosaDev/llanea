// SeccionEstablecimientos.jsx: bloque de la Home con título, enlace "Ver todo" y cuadrícula de tarjetas.
// Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea
import EstablecimientoCard from './EstablecimientoCard'; // tarjeta individual (componente hijo)

// seccion: datos del encabezado | items: establecimientos ya filtrados para esta sección
function SeccionEstablecimientos({ seccion, items }) {
  return (
    // aria-labelledby enlaza la sección con su título para lectores de pantalla
    <section className="seccion" aria-labelledby={`titulo-${seccion.id}`}>
      <header className="seccion__cabecera">
        <div>
          <h2 id={`titulo-${seccion.id}`}>
            {/* && dibuja el icono solo si la sección tiene uno */}
            {seccion.icono && <span aria-hidden="true">{seccion.icono} </span>}
            {seccion.titulo}
          </h2>
          {/* El subtítulo también es opcional */}
          {seccion.subtitulo && <p className="seccion__subtitulo">{seccion.subtitulo}</p>}
        </div>
        <a className="seccion__ver-todo" href="#">Ver todo ›</a>
      </header>

      <div className="cuadricula">
        {/* map crea una tarjeta por cada establecimiento recibido */}
        {items.map((establecimiento) => (
          // key = id del establecimiento; {...establecimiento} pasa todos sus campos como props
          <EstablecimientoCard key={establecimiento.id} {...establecimiento} />
        ))}
      </div>
    </section>
  );
}

export default SeccionEstablecimientos; // exporta el componente
