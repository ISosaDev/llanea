// FiltrosCategoria.jsx: barra de botones para filtrar por categoría.
// Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea
// Es un componente controlado: no guarda estado propio, lo recibe del padre por props.

// categorias: lista de textos | categoriaActiva: la seleccionada | onSeleccionar: función del padre
function FiltrosCategoria({ categorias, categoriaActiva, onSeleccionar }) {
  return (
    // role y aria-label ayudan a los lectores de pantalla a anunciar el grupo de botones
    <div className="filtros" role="group" aria-label="Filtrar por categoría">
      {/* map crea un botón por cada categoría de la lista */}
      {categorias.map((categoria) => (
        <button
          key={categoria} // key única: React identifica cada botón de la lista
          type="button" // evita que el botón envíe un formulario
          // Si es la categoría activa agrega la clase de resaltado
          className={categoria === categoriaActiva ? 'filtro filtro--activo' : 'filtro'}
          aria-pressed={categoria === categoriaActiva} // indica a lectores de pantalla si está seleccionado
          onClick={() => onSeleccionar(categoria)} // al hacer clic avisa al padre qué categoría se eligió
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}

export default FiltrosCategoria; // exporta el componente
