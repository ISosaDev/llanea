/**
 * Catálogo de establecimientos de la Home de Llanea con filtro por categoría.
 * Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea | Ficha 3336142
 *
 * Es el componente principal de la evidencia: guarda el estado del filtro con
 * useState y reparte los datos a los componentes hijos por props.
 */
import { useState } from 'react';
import { categorias, secciones, establecimientos } from '../data/establecimientos';
import FiltrosCategoria from './FiltrosCategoria';
import SeccionEstablecimientos from './SeccionEstablecimientos';

function CatalogoEstablecimientos() {
  // Hook de estado: categoriaActiva guarda la selección y setCategoriaActiva la cambia.
  // Cuando cambia el estado, React vuelve a ejecutar este componente y actualiza solo lo que cambió.
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  // Lista visible: se calcula a partir del estado, no se guarda aparte
  const visibles =
    categoriaActiva === 'Todos'
      ? establecimientos
      : establecimientos.filter((e) => e.categoria === categoriaActiva);

  return (
    <main className="catalogo">
      <FiltrosCategoria
        categorias={categorias}
        categoriaActiva={categoriaActiva}
        onSeleccionar={setCategoriaActiva}
      />

      {/* Las secciones sin resultados no se dibujan */}
      {secciones.map((seccion) => {
        const items = visibles.filter((e) => e.seccion === seccion.id);
        if (items.length === 0) return null;
        return <SeccionEstablecimientos key={seccion.id} seccion={seccion} items={items} />;
      })}

      {/* Estado vacío: ninguna tarjeta coincide con el filtro */}
      {visibles.length === 0 && (
        <p className="catalogo__vacio" role="status">
          Aún no hay establecimientos en «{categoriaActiva}». Pronto sumaremos más del Casanare.
        </p>
      )}
    </main>
  );
}

export default CatalogoEstablecimientos;
