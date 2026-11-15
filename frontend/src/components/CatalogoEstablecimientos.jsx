/**
 * Catálogo de establecimientos de la Home de Llanea con filtros por categoría y municipio.
 * Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea | Ficha 3336142
 *
 * Es el componente principal de la evidencia: recibe el filtro por props (el estado vive en
 * App y lo comparten el menú, el buscador y los chips), calcula qué tarjetas mostrar y
 * reparte los datos a los componentes hijos.
 */
import { categorias, secciones, establecimientos } from '../data/establecimientos';
import FiltrosCategoria from './FiltrosCategoria';
import SeccionEstablecimientos from './SeccionEstablecimientos';

function CatalogoEstablecimientos({ categoriaActiva, onSeleccionarCategoria, municipioActivo, onLimpiar }) {
  // Lista visible: se calcula a partir de las props, no se guarda aparte
  const visibles = establecimientos.filter(
    (e) =>
      (categoriaActiva === 'Todos' || e.categoria === categoriaActiva) &&
      (municipioActivo === 'Todos' || e.municipio === municipioActivo),
  );

  return (
    <main id="catalogo" className="catalogo">
      <FiltrosCategoria
        categorias={categorias}
        categoriaActiva={categoriaActiva}
        onSeleccionar={onSeleccionarCategoria}
      />

      {/* Las secciones sin resultados no se dibujan */}
      {secciones.map((seccion) => {
        const items = visibles.filter((e) => e.seccion === seccion.id);
        if (items.length === 0) return null;
        return <SeccionEstablecimientos key={seccion.id} seccion={seccion} items={items} />;
      })}

      {/* Estado vacío: ninguna tarjeta coincide con los filtros */}
      {visibles.length === 0 && (
        <div className="catalogo__vacio" role="status">
          <p>
            No hay establecimientos de «{categoriaActiva === 'Todos' ? 'todas las categorías' : categoriaActiva}»
            {municipioActivo === 'Todos' ? '' : ` en ${municipioActivo}`}. Pronto sumaremos más del Casanare.
          </p>
          <button type="button" className="catalogo__limpiar" onClick={onLimpiar}>
            Ver todo el catálogo
          </button>
        </div>
      )}
    </main>
  );
}

export default CatalogoEstablecimientos;
