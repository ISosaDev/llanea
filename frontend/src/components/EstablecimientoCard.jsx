/**
 * Tarjeta de un establecimiento (alojamiento, restaurante o experiencia).
 * Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea
 * Recibe los datos por props. Guarda dos estados locales: favorito y fallo de imagen.
 */
import { useState } from 'react';
import Icono from './Icono';
import { IlustracionLlanera } from './Ilustraciones';

// Clase de color según el tipo de insignia
const CLASE_INSIGNIA = {
  VERIFICADO: 'insignia--verificado',
  NUEVO: 'insignia--amarillo',
  DESTACADO: 'insignia--amarillo',
  POPULAR: 'insignia--naranja',
};

// Abrevia un valor en pesos: 280000 -> $280k
function abreviarPesos(valor) {
  return `$${Math.round(valor / 1000)}k`;
}

// Las props llegan desestructuradas desde SeccionEstablecimientos
function EstablecimientoCard({
  id, nombre, municipio, calificacion, resenas, precio, unidad, insignias, imagen,
}) {
  // Hook de estado: corazón de favoritos (true = marcado)
  const [favorito, setFavorito] = useState(false);
  // Hook de estado: si la imagen no carga, se muestra la ilustración de respaldo
  const [fallaImagen, setFallaImagen] = useState(false);

  const mostrarImagen = imagen && !fallaImagen;

  return (
    <article className="tarjeta">
      <div className="tarjeta__imagen">
        {mostrarImagen ? (
          <img src={imagen} alt={nombre} loading="lazy" onError={() => setFallaImagen(true)} />
        ) : (
          <IlustracionLlanera variante={id} />
        )}

        <div className="tarjeta__insignias">
          {insignias.map((insignia) => (
            <span key={insignia} className={`insignia ${CLASE_INSIGNIA[insignia]}`}>
              {insignia}
            </span>
          ))}
        </div>

        <button
          type="button"
          className={favorito ? 'tarjeta__favorito tarjeta__favorito--activo' : 'tarjeta__favorito'}
          aria-pressed={favorito}
          aria-label={favorito ? `Quitar ${nombre} de favoritos` : `Guardar ${nombre} en favoritos`}
          onClick={() => setFavorito(!favorito)}
        >
          <Icono nombre="corazon" tamano={16} relleno={favorito} />
        </button>
      </div>

      <div className="tarjeta__cuerpo">
        <h3 className="tarjeta__nombre">{nombre}</h3>
        <p className="tarjeta__municipio">
          <span className="tarjeta__pin"><Icono nombre="ubicacion" tamano={12} /></span>
          {municipio}
        </p>
        <p className="tarjeta__calificacion">
          <span className="tarjeta__estrella"><Icono nombre="estrella" tamano={12} relleno /></span>
          <strong>{calificacion.toFixed(1)}</strong> ({resenas})
        </p>
        <p className="tarjeta__precio">
          <strong>{abreviarPesos(precio)}</strong> / {unidad}
        </p>
      </div>
    </article>
  );
}

export default EstablecimientoCard;
