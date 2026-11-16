// CatalogoEstablecimientos.jsx: componente principal de la evidencia (catálogo con filtros).
// Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea | Ficha 3336142
import { categorias, secciones, establecimientos } from '../data/establecimientos'; // datos de ejemplo del catálogo
import FiltrosCategoria from './FiltrosCategoria'; // botones de filtro (componente hijo)
import SeccionEstablecimientos from './SeccionEstablecimientos'; // bloque con título y tarjetas (componente hijo)

// Las props llegan entre llaves: el padre (App) decide qué filtro está activo
function CatalogoEstablecimientos({ categoriaActiva, onSeleccionarCategoria, municipioActivo, onLimpiar }) {
  // La lista visible se calcula con las props; no se guarda aparte para no desincronizarla
  const visibles = establecimientos.filter(
    (e) =>
      (categoriaActiva === 'Todos' || e.categoria === categoriaActiva) && // pasa si la categoría coincide o no hay filtro
      (municipioActivo === 'Todos' || e.municipio === municipioActivo), // y si el municipio coincide o no hay filtro
  );

  return (
    // id="catalogo" es el destino al que bajan el menú y el botón Buscar
    <main id="catalogo" className="catalogo">
      {/* En React la clase CSS se escribe className, porque class es palabra reservada de JavaScript */}
      <FiltrosCategoria
        categorias={categorias} // lista de textos para dibujar un botón por categoría
        categoriaActiva={categoriaActiva} // cuál botón se ve seleccionado
        onSeleccionar={onSeleccionarCategoria} // función que se ejecuta al hacer clic en un botón
      />

      {/* map recorre las secciones y devuelve un componente por cada una */}
      {secciones.map((seccion) => {
        // Se toman solo los establecimientos visibles que pertenecen a esta sección
        const items = visibles.filter((e) => e.seccion === seccion.id);
        if (items.length === 0) return null; // sección sin resultados: no se dibuja
        // key: identificador único que React necesita para recordar cada elemento de la lista
        return <SeccionEstablecimientos key={seccion.id} seccion={seccion} items={items} />;
      })}

      {/* Renderizado condicional: si no hay tarjetas, se muestra el estado vacío */}
      {visibles.length === 0 && (
        <div className="catalogo__vacio" role="status">
          <p>
            No hay establecimientos de «{categoriaActiva === 'Todos' ? 'todas las categorías' : categoriaActiva}»
            {municipioActivo === 'Todos' ? '' : ` en ${municipioActivo}`}. Pronto sumaremos más del Casanare.
          </p>
          {/* Botón que ejecuta la función onLimpiar recibida del padre */}
          <button type="button" className="catalogo__limpiar" onClick={onLimpiar}>
            Ver todo el catálogo
          </button>
        </div>
      )}
    </main>
  );
}

export default CatalogoEstablecimientos; // exporta el componente para usarlo en App.jsx
