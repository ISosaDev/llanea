/**
 * Encabezado de la Home: marca, navegación principal y acciones del usuario.
 * Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea
 */
import { useState } from 'react';
import Icono from './Icono';

// Enlaces de la navegación principal
const ENLACES = ['Alojamiento', 'Gastronomía', 'Ecoturismo', 'Municipios'];

function Encabezado() {
  // Estado: enlace de navegación activo (el subrayado sigue a este valor)
  const [activo, setActivo] = useState('Alojamiento');

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
        {ENLACES.map((enlace) => (
          <a
            key={enlace}
            href="#"
            className={enlace === activo ? 'navegacion__enlace navegacion__enlace--activo' : 'navegacion__enlace'}
            aria-current={enlace === activo ? 'page' : undefined}
            onClick={(evento) => {
              evento.preventDefault(); // evita que el enlace recargue la página
              setActivo(enlace);
            }}
          >
            {enlace}
          </a>
        ))}
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
