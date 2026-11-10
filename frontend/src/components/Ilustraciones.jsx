/**
 * Ilustraciones vectoriales de Llanea: palma, fondo del hero y tarjeta de respaldo.
 * Autor: Isael Antonio Sosa (ISosaDev) | Proyecto Llanea
 * La ilustración de tarjeta se usa mientras un establecimiento no tenga imagen propia.
 */
import { useId } from 'react';

// Palma dibujada hacia arriba desde el punto (x, y); "escala" la agranda o la reduce
export function Palma({ x, y, escala = 1, color = '#1a5c4a' }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${escala})`}
      stroke={color}
      fill="none"
      strokeLinecap="round"
    >
      {/* tronco */}
      <path d="M0 0 Q6 -30 0 -62" strokeWidth="5" />
      {/* hojas: siete arcos que salen de la copa */}
      <g strokeWidth="4">
        <path d="M0 -62 Q-26 -94 -54 -68" />
        <path d="M0 -62 Q-14 -100 -36 -94" />
        <path d="M0 -62 Q4 -88 16 -100" />
        <path d="M0 -62 Q26 -94 54 -68" />
        <path d="M0 -62 Q16 -100 38 -92" />
        <path d="M0 -62 Q-34 -72 -58 -50" />
        <path d="M0 -62 Q34 -72 58 -50" />
      </g>
    </g>
  );
}

// Ave pequeña en vuelo, dos curvas en forma de "v" suave
function Ave({ x, y, escala = 1 }) {
  return (
    <path
      d={`M${x} ${y} q${6 * escala} ${-6 * escala} ${12 * escala} 0 q${6 * escala} ${-6 * escala} ${12 * escala} 0`}
      stroke="#7a3b1c"
      strokeOpacity="0.55"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
    />
  );
}

// Paisaje llanero para el fondo del hero: cielo, nubes, colinas y palmas
export function FondoHero() {
  const idCielo = useId(); // id único para el degradado, evita choques si el SVG se repite
  return (
    <svg
      className="hero__fondo"
      viewBox="0 0 1440 340"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={idCielo} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f7ea4" />
          <stop offset="1" stopColor="#4f96b3" />
        </linearGradient>
      </defs>
      <rect width="1440" height="340" fill={`url(#${idCielo})`} />
      {/* nubes */}
      <g fill="#8dbbd0" opacity="0.6">
        <ellipse cx="190" cy="125" rx="60" ry="16" />
        <ellipse cx="160" cy="135" rx="40" ry="12" />
        <ellipse cx="830" cy="140" rx="55" ry="14" />
        <ellipse cx="1170" cy="112" rx="58" ry="15" />
        <ellipse cx="1330" cy="158" rx="55" ry="14" />
        <ellipse cx="500" cy="100" rx="45" ry="11" />
      </g>
      {/* colinas */}
      <path d="M0 240 C300 205 600 252 900 236 S1300 218 1440 230 L1440 340 L0 340Z" fill="#5a8266" />
      <path d="M0 288 C350 268 700 302 1100 282 S1350 272 1440 276 L1440 340 L0 340Z" fill="#247487" />
      {/* palmas */}
      <Palma x={130} y={330} escala={1.9} color="#12506a" />
      <Palma x={1355} y={330} escala={2.2} color="#12506a" />
      <Palma x={1392} y={330} escala={1.3} color="#12506a" />
      {/* aves */}
      <Ave x={690} y={190} escala={1.2} />
      <Ave x={1010} y={226} escala={1} />
    </svg>
  );
}

// Ilustración de respaldo de una tarjeta; "variante" cambia la posición de la palma
export function IlustracionLlanera({ variante = 0 }) {
  const idCielo = useId();
  const posiciones = [95, 305, 200]; // izquierda, derecha o centro
  const xPalma = posiciones[variante % posiciones.length];
  return (
    <svg
      className="tarjeta__ilustracion"
      viewBox="0 0 400 225"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={idCielo} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ec7f46" />
          <stop offset="1" stopColor="#f6c27a" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill={`url(#${idCielo})`} />
      <Ave x={60 + (variante % 3) * 40} y={50} />
      <Ave x={250 - (variante % 2) * 60} y={70} escala={0.8} />
      {/* dunas y colina */}
      <path d="M0 138 C100 112 200 150 400 122 L400 225 L0 225Z" fill="#f0b860" />
      <path d="M0 152 C90 124 170 166 260 140 S360 144 400 130 L400 225 L0 225Z" fill="#e2a53b" />
      <path d="M0 188 C100 166 220 202 400 176 L400 225 L0 225Z" fill="#3e9158" />
      <Palma x={xPalma} y={192} escala={1.15} />
    </svg>
  );
}
