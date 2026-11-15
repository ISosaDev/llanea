// Punto de entrada de la interfaz de Llanea.
// Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea | Ficha 3336142
import { useState } from 'react';
import Encabezado from './components/Encabezado';
import Hero from './components/Hero';
import CatalogoEstablecimientos from './components/CatalogoEstablecimientos';
import './styles/llanea.css';

// Composición de la Home: encabezado, hero con buscador y catálogo con filtros
function App() {
  // Estado compartido ("elevar el estado"): el menú, el buscador y los chips leen y
  // cambian los mismos dos valores, así los tres controles siempre muestran lo mismo.
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [municipioActivo, setMunicipioActivo] = useState('Todos');

  // Vuelve a mostrar todo el catálogo
  const limpiarFiltros = () => {
    setCategoriaActiva('Todos');
    setMunicipioActivo('Todos');
  };

  return (
    <>
      <Encabezado categoriaActiva={categoriaActiva} onSeleccionarCategoria={setCategoriaActiva} />
      <Hero
        categoriaActiva={categoriaActiva}
        onSeleccionarCategoria={setCategoriaActiva}
        municipioActivo={municipioActivo}
        onSeleccionarMunicipio={setMunicipioActivo}
      />
      <CatalogoEstablecimientos
        categoriaActiva={categoriaActiva}
        onSeleccionarCategoria={setCategoriaActiva}
        municipioActivo={municipioActivo}
        onLimpiar={limpiarFiltros}
      />
    </>
  );
}

export default App;
