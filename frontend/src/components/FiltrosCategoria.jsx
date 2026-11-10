/**
 * Barra de filtros por categoría.
 * Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea
 * Componente controlado: no guarda estado propio, lo recibe del padre por props
 * y le avisa con onSeleccionar cuando el usuario elige otra categoría.
 */

// categorias: lista de textos | categoriaActiva: la seleccionada | onSeleccionar: función del padre
function FiltrosCategoria({ categorias, categoriaActiva, onSeleccionar }) {
  return (
    <div className="filtros" role="group" aria-label="Filtrar por categoría">
      {categorias.map((categoria) => (
        // key única por botón: React identifica cada elemento de la lista
        <button
          key={categoria}
          type="button"
          className={categoria === categoriaActiva ? 'filtro filtro--activo' : 'filtro'}
          aria-pressed={categoria === categoriaActiva}
          onClick={() => onSeleccionar(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}

export default FiltrosCategoria;
