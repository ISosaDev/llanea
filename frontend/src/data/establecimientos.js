/**
 * Datos del catálogo de la Home de Llanea.
 * Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea | Ficha 3336142
 *
 * Nota: son los establecimientos de ejemplo del diseño aprobado (prototipo).
 * En producción estos datos llegarán desde la API REST del backend.
 */

// Filtros de categoría de la Home; "Todos" quita el filtro
export const categorias = ['Todos', 'Alojamiento', 'Gastronomía', 'Ecoturismo', 'Cultura'];

// Secciones de la Home, en el orden en que se dibujan en pantalla
export const secciones = [
  { id: 'destacados', titulo: 'Destacados cerca de ti', subtitulo: 'Yopal · 15 km a la redonda' },
  { id: 'alojamiento', titulo: 'Hoteles y Alojamiento', icono: '🏨' },
  { id: 'gastronomia', titulo: 'Gastronomía Llanera', icono: '🍽️' },
];

/*
 * Cada establecimiento lleva:
 *  - id: único; se usa como key de React en las listas
 *  - seccion: bloque de la Home donde aparece
 *  - categoria: valor que usa el filtro
 *  - precio y unidad: se muestran como "$280k / noche"
 *  - insignias: etiquetas de la tarjeta (VERIFICADO, NUEVO, DESTACADO, POPULAR)
 *  - imagen: ruta de la ilustración en /public; null usa la ilustración SVG de respaldo
 *    Ejemplo: imagen: '/img/establecimientos/hato-la-aurora.webp'
 */
export const establecimientos = [
  {
    id: 1, nombre: 'Hato La Aurora', municipio: 'Paz de Ariporo',
    seccion: 'destacados', categoria: 'Alojamiento',
    calificacion: 4.8, resenas: 124, precio: 280000, unidad: 'noche',
    insignias: ['VERIFICADO'], imagen: null,
  },
  {
    id: 2, nombre: 'Fogón Llanero', municipio: 'Yopal',
    seccion: 'destacados', categoria: 'Gastronomía',
    calificacion: 4.6, resenas: 38, precio: 18000, unidad: 'plato',
    insignias: ['NUEVO', 'VERIFICADO'], imagen: null,
  },
  {
    id: 3, nombre: 'Glamping Río Cravo', municipio: 'Orocué',
    seccion: 'destacados', categoria: 'Ecoturismo',
    calificacion: 4.9, resenas: 41, precio: 350000, unidad: 'noche',
    insignias: ['VERIFICADO'], imagen: null,
  },
  {
    id: 4, nombre: 'Finca Las Garzas', municipio: 'Aguazul',
    seccion: 'destacados', categoria: 'Ecoturismo',
    calificacion: 4.7, resenas: 89, precio: 180000, unidad: 'noche',
    insignias: ['DESTACADO'], imagen: null,
  },
  {
    id: 5, nombre: 'Hotel Sabana Real', municipio: 'Villanueva',
    seccion: 'alojamiento', categoria: 'Alojamiento',
    calificacion: 4.3, resenas: 67, precio: 180000, unidad: 'noche',
    insignias: ['VERIFICADO'], imagen: null,
  },
  {
    id: 6, nombre: 'Glamping Horizonte', municipio: 'Tauramena',
    seccion: 'alojamiento', categoria: 'Ecoturismo',
    calificacion: 4.9, resenas: 22, precio: 320000, unidad: 'noche',
    insignias: ['DESTACADO'], imagen: null,
  },
  {
    id: 7, nombre: 'Posada El Llano', municipio: 'Aguazul',
    seccion: 'alojamiento', categoria: 'Alojamiento',
    calificacion: 4.1, resenas: 15, precio: 95000, unidad: 'noche',
    insignias: [], imagen: null,
  },
  {
    id: 8, nombre: 'Asadero Don Ramón', municipio: 'Yopal',
    seccion: 'gastronomia', categoria: 'Gastronomía',
    calificacion: 4.5, resenas: 203, precio: 35000, unidad: 'persona',
    insignias: ['POPULAR'], imagen: null,
  },
  {
    id: 9, nombre: 'Restaurante La Sabana', municipio: 'Yopal',
    seccion: 'gastronomia', categoria: 'Gastronomía',
    calificacion: 4.7, resenas: 89, precio: 28000, unidad: 'persona',
    insignias: ['VERIFICADO'], imagen: null,
  },
  {
    id: 10, nombre: 'El Chinchorro', municipio: 'Villanueva',
    seccion: 'gastronomia', categoria: 'Gastronomía',
    calificacion: 4.8, resenas: 156, precio: 42000, unidad: 'persona',
    insignias: ['DESTACADO'], imagen: null,
  },
];
