/**
 * Barra de búsqueda rápida del hero: municipio, tipo y fechas.
 * Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea
 * Es solo interfaz: la búsqueda real se conecta cuando exista la API del backend.
 */
import Icono from './Icono';

// Cada campo: etiqueta visible, nombre accesible y opciones del selector
const CAMPOS = [
  { id: 'municipio', etiqueta: 'Municipio', opciones: ['Yopal', 'Aguazul', 'Paz de Ariporo', 'Villanueva', 'Tauramena', 'Orocué'] },
  { id: 'tipo', etiqueta: 'Tipo', opciones: ['Alojamiento', 'Gastronomía', 'Ecoturismo'] },
  { id: 'fechas', etiqueta: 'Fechas', opciones: ['Esta semana', 'Este fin de semana', 'Próximo mes'] },
];

function BuscadorRapido() {
  return (
    <form className="buscador" onSubmit={(evento) => evento.preventDefault()} role="search">
      {CAMPOS.map((campo) => (
        <div key={campo.id} className="buscador__campo">
          <label htmlFor={`buscador-${campo.id}`}>{campo.etiqueta}</label>
          <select id={`buscador-${campo.id}`} defaultValue={campo.opciones[0]}>
            {campo.opciones.map((opcion) => (
              <option key={opcion}>{opcion}</option>
            ))}
          </select>
        </div>
      ))}
      <button type="submit" className="buscador__boton">
        <Icono nombre="buscar" tamano={16} /> Buscar
      </button>
    </form>
  );
}

export default BuscadorRapido;
