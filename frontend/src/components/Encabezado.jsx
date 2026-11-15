/**
 * Encabezado de la Home: marca, navegación principal y acciones del usuario.
 * Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea
 */
import Icono from './Icono';

// Categorías del menú: usan el mismo filtro que los chips del catálogo
const CATEGORIAS_MENU = ['Alojamiento', 'Gastronomía', 'Ecoturismo'];

// categoriaActiva y onSeleccionarCategoria llegan por props desde App (estado compartido)
function Encabezado({ categoriaActiva, onSeleccionarCategoria }) {
  return (
    <header className="encabezado">
      <a className="marca" href="/" aria-label="Llanea, inicio">
        <img className="marca__logo" src="/logo-llanea.png" alt="" />
        <span className="marca__texto">
          <strong>Llanea</strong>
          <small>El Casanare que buscabas.</small>
        </span>
      </a>

      <nav className="navegacion" aria-label="Secciones principales">
        {CATEGORIAS_MENU.map((categoria) => (
          // El enlace aplica el filtro y baja al catálogo con el ancla #catalogo
          <a
            key={categoria}
            href="#catalogo"
            className={categoria === categoriaActiva ? 'navegacion__enlace navegacion__enlace--activo' : 'navegacion__enlace'}
            aria-current={categoria === categoriaActiva ? 'page' : undefined}
            onClick={() => onSeleccionarCategoria(categoria)}
          >
            {categoria}
          </a>
        ))}
        {/* Municipios lleva al buscador, donde está el selector de municipio */}
        <a href="#buscador" className="navegacion__enlace">Municipios</a>
      </nav>

      <div className="acciones">
        <button type="button" className="acciones__boton" aria-label="Notificaciones">
          <Icono nombre="campana" />
        </button>
        <button type="button" className="acciones__boton" aria-label="Carrito, 0 productos">
          <Icono nombre="carrito" />
          <span className="acciones__contador">0</span>
        </button>
        <button type="button" className="acciones__boton" aria-label="Cambiar a modo oscuro">
          <Icono nombre="luna" />
        </button>
        <span className="acciones__avatar" title="Isael Sosa">IS</span>
        <button type="button" className="acciones__boton acciones__menu" aria-label="Abrir menú">
          <Icono nombre="menu" />
        </button>
      </div>
    </header>
  );
}

export default Encabezado;
