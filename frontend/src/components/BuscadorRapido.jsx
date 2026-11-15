/**
 * Barra de búsqueda rápida del hero: municipio, tipo y fechas.
 * Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea
 * Municipio y Tipo son selectores controlados: leen y cambian el filtro que vive en App.
 * Fechas queda deshabilitado hasta que exista el módulo de reservas.
 */
import { categorias, establecimientos } from '../data/establecimientos';
import Icono from './Icono';

// Municipios que realmente tienen establecimientos, sin repetir y en orden alfabético
const MUNICIPIOS = [...new Set(establecimientos.map((e) => e.municipio))].sort();

function BuscadorRapido({ categoriaActiva, onSeleccionarCategoria, municipioActivo, onSeleccionarMunicipio }) {
  // Buscar aplica de inmediato (el filtro ya cambió al elegir) y baja al catálogo
  const buscar = (evento) => {
    evento.preventDefault();
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <form id="buscador" className="buscador" onSubmit={buscar} role="search">
      <div className="buscador__campo">
        <label htmlFor="buscador-municipio">Municipio</label>
        <select
          id="buscador-municipio"
          value={municipioActivo}
          onChange={(evento) => onSeleccionarMunicipio(evento.target.value)}
        >
          <option value="Todos">Todos los municipios</option>
          {MUNICIPIOS.map((municipio) => (
            <option key={municipio} value={municipio}>{municipio}</option>
          ))}
        </select>
      </div>

      <div className="buscador__campo">
        <label htmlFor="buscador-tipo">Tipo</label>
        <select
          id="buscador-tipo"
          value={categoriaActiva}
          onChange={(evento) => onSeleccionarCategoria(evento.target.value)}
        >
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria === 'Todos' ? 'Todos los tipos' : categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="buscador__campo">
        <label htmlFor="buscador-fechas">Fechas</label>
        <select id="buscador-fechas" disabled title="Disponible cuando se active el módulo de reservas">
          <option>Próximamente</option>
        </select>
      </div>

      <button type="submit" className="buscador__boton">
        <Icono nombre="buscar" tamano={16} /> Buscar
      </button>
    </form>
  );
}

export default BuscadorRapido;
