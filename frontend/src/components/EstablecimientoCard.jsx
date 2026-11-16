// EstablecimientoCard.jsx: tarjeta de un establecimiento (alojamiento, restaurante o experiencia).
// Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea
// Recibe los datos por props y guarda dos estados locales: favorito y fallo de imagen.
import { useState } from 'react'; // hook para guardar valores que cambian
import Icono from './Icono'; // iconos SVG de la interfaz
import { IlustracionLlanera } from './Ilustraciones'; // dibujo de respaldo si no hay foto

// Clase de color según el tipo de insignia
const CLASE_INSIGNIA = {
  VERIFICADO: 'insignia--verificado', // azul
  NUEVO: 'insignia--amarillo', // amarillo
  DESTACADO: 'insignia--amarillo', // amarillo
  POPULAR: 'insignia--naranja', // naranja
};

// Abrevia un valor en pesos: 280000 -> $280k
function abreviarPesos(valor) {
  return `$${Math.round(valor / 1000)}k`; // divide por mil, redondea y agrega $ y k
}

// Las props llegan desestructuradas desde SeccionEstablecimientos
function EstablecimientoCard({
  id, nombre, municipio, calificacion, resenas, precio, unidad, insignias, imagen,
}) {
  // Estado del corazón de favoritos: false = sin marcar, true = marcado
  const [favorito, setFavorito] = useState(false);
  // Estado de fallo de imagen: si la foto no carga se muestra la ilustración
  const [fallaImagen, setFallaImagen] = useState(false);

  // Se muestra la foto solo si existe la ruta y no ha fallado la carga
  const mostrarImagen = imagen && !fallaImagen;

  return (
    <article className="tarjeta">
      <div className="tarjeta__imagen">
        {/* Operador ternario: foto si se puede mostrar, de lo contrario la ilustración */}
        {mostrarImagen ? (
          <img src={imagen} alt={nombre} loading="lazy" onError={() => setFallaImagen(true)} />
        ) : (
          <IlustracionLlanera variante={id} />
        )}

        <div className="tarjeta__insignias">
          {/* Una etiqueta por cada insignia del establecimiento */}
          {insignias.map((insignia) => (
            <span key={insignia} className={`insignia ${CLASE_INSIGNIA[insignia]}`}>
              {insignia}
            </span>
          ))}
        </div>

        <button
          type="button"
          // Cambia la clase cuando el favorito está marcado
          className={favorito ? 'tarjeta__favorito tarjeta__favorito--activo' : 'tarjeta__favorito'}
          aria-pressed={favorito} // informa el estado a lectores de pantalla
          aria-label={favorito ? `Quitar ${nombre} de favoritos` : `Guardar ${nombre} en favoritos`}
          onClick={() => setFavorito(!favorito)} // evento: invierte el valor del estado
        >
          {/* Etiqueta que se cierra sola con />: en JSX toda etiqueta debe cerrarse */}
          <Icono nombre="corazon" tamano={16} relleno={favorito} />
        </button>
      </div>

      <div className="tarjeta__cuerpo">
        <h3 className="tarjeta__nombre">{nombre}</h3> {/* las llaves insertan valores de JavaScript */}
        <p className="tarjeta__municipio">
          <span className="tarjeta__pin"><Icono nombre="ubicacion" tamano={12} /></span>
          {municipio}
        </p>
        <p className="tarjeta__calificacion">
          <span className="tarjeta__estrella"><Icono nombre="estrella" tamano={12} relleno /></span>
          <strong>{calificacion.toFixed(1)}</strong> ({resenas}) {/* un decimal: 4.8 */}
        </p>
        <p className="tarjeta__precio">
          <strong>{abreviarPesos(precio)}</strong> / {unidad}
        </p>
      </div>
    </article>
  );
}

export default EstablecimientoCard; // exporta el componente
