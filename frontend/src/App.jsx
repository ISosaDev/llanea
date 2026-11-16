// App.jsx: componente raíz de la Home de Llanea. Aquí vive el estado del filtro.
// Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea | Ficha 3336142
import { useState } from 'react'; // importa el hook useState para guardar valores que cambian
import Encabezado from './components/Encabezado'; // menú superior
import Hero from './components/Hero'; // portada con el buscador
import CatalogoEstablecimientos from './components/CatalogoEstablecimientos'; // componente principal de la evidencia
import './styles/llanea.css'; // estilos globales de la interfaz

// Los componentes son funciones; su nombre empieza en mayúscula para que React los distinga de las etiquetas HTML
function App() {
  // Estado de la categoría: [valor actual, función que lo cambia]; empieza en 'Todos'
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  // Estado del municipio: empieza en 'Todos'
  const [municipioActivo, setMunicipioActivo] = useState('Todos');

  // Función que restablece ambos filtros para volver a mostrar todo el catálogo
  const limpiarFiltros = () => {
    setCategoriaActiva('Todos'); // categoría de nuevo en 'Todos'
    setMunicipioActivo('Todos'); // municipio de nuevo en 'Todos'
  };

  // Lo que devuelve la función es JSX: la interfaz que React dibuja en pantalla
  return (
    <>
      {/* Fragmento <> </>: agrupa componentes sin crear un div de más */}
      <Encabezado
        categoriaActiva={categoriaActiva} // prop: categoría seleccionada, para marcar el enlace del menú
        onSeleccionarCategoria={setCategoriaActiva} // prop: función que el menú usa para cambiar el filtro
      />
      <Hero
        categoriaActiva={categoriaActiva} // prop: valor que muestra el selector "Tipo"
        onSeleccionarCategoria={setCategoriaActiva} // prop: el selector "Tipo" cambia el filtro
        municipioActivo={municipioActivo} // prop: valor que muestra el selector "Municipio"
        onSeleccionarMunicipio={setMunicipioActivo} // prop: el selector "Municipio" cambia el filtro
      />
      <CatalogoEstablecimientos
        categoriaActiva={categoriaActiva} // prop: categoría con la que se filtra la lista
        onSeleccionarCategoria={setCategoriaActiva} // prop: los chips cambian el filtro
        municipioActivo={municipioActivo} // prop: municipio con el que se filtra la lista
        onLimpiar={limpiarFiltros} // prop: botón "Ver todo el catálogo" del estado vacío
      />
    </>
  );
}

export default App; // exporta el componente para que main.jsx lo monte en la página
