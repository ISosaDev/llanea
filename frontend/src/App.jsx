// Punto de entrada de la interfaz de Llanea.
// Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea | Ficha 3336142
import Encabezado from './components/Encabezado';
import Hero from './components/Hero';
import CatalogoEstablecimientos from './components/CatalogoEstablecimientos';
import './styles/llanea.css';

// Composición de la Home: encabezado, hero con buscador y catálogo con filtros
function App() {
  return (
    <>
      <Encabezado />
      <Hero />
      <CatalogoEstablecimientos />
    </>
  );
}

export default App;
