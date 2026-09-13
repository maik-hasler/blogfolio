/**
 * Erzeugt src/assets/piston.svg: ein eigener, isometrischer Piston-Block als
 * Pixel-Art (keine Mojang-Textur). Drei Gruppen, damit CSS den Kopf ausfahren kann:
 *   .piston-base  - Steinsockel und die Innenfläche, die beim Ausfahren sichtbar wird
 *   .piston-arm   - Holzstange zwischen Sockel und Kopf
 *   .piston-head  - Holzdeckel mit Metallwinkeln plus das obere Holzband der Seiten
 *
 * Aufruf: npm run piston
 */
import { writeFileSync } from 'node:fs';

const N = 16; // Pixel je Kante
const HEAD_ROWS = 4; // Holzband = Kopf, darunter Stein = Sockel
const LIFT = 9.5; // Hub des Kopfes in SVG-Einheiten (muss zu PistonBlock.astro passen)

// Deterministischer Zufall, damit der Build reproduzierbar bleibt.
function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const random = mulberry32(7);
const pick = (list) => list[Math.floor(random() * list.length)];
const chance = (p) => random() < p;
const int = (max) => Math.floor(random() * max);

const PLANK = ['#c39a5a', '#c9a05f', '#bd9454', '#c69c5c'];
const PLANK_SEAM = '#8e6a36';
const PLANK_HI = '#d6ad6a';
const GRAIN = '#b08a4e';
const METAL = '#d9d9d6';
const METAL_DK = '#a5a5a1';
const METAL_LT = '#f0f0ee';
const STONE = ['#8f8f8f', '#9a9a9a', '#858585', '#a3a3a3', '#7c7c7c', '#939393'];
const STONE_DK = '#6b6b6b';
const STONE_CRACK = '#5e5e5e';
const INNER = ['#6f6f6f', '#767676', '#696969', '#7c7c7c', '#727272'];

const grid = (fill) => Array.from({ length: N }, () => Array.from({ length: N }, fill));

/** Deckel: vier Bretterreihen mit versetzten Fugen und vier Metallwinkeln. */
function plankTop() {
  const px = grid(() => pick(PLANK));
  for (let y = 0; y < N; y++) {
    if (y % 4 === 3) px[y].fill(PLANK_SEAM);
    else if (y % 4 === 0) for (let x = 0; x < N; x++) if (chance(0.55)) px[y][x] = PLANK_HI;
  }
  for (let row = 0; row < 4; row++) {
    const offset = (row * 6) % N;
    for (let k = 0; k < 2; k++) {
      const x = (offset + k * 8) % N;
      for (let y = row * 4; y < row * 4 + 3; y++) px[y][x] = PLANK_SEAM;
    }
  }
  for (let i = 0; i < 18; i++) {
    const x = int(N), y = int(N);
    if (px[y][x] !== PLANK_SEAM) px[y][x] = GRAIN;
  }
  for (const [cx, cy, dx, dy] of [[0, 0, 1, 1], [N - 1, 0, -1, 1], [0, N - 1, 1, -1], [N - 1, N - 1, -1, -1]]) {
    for (let i = 0; i < 4; i++) {
      for (let t = 0; t < 2; t++) {
        px[cy + t * dy][cx + i * dx] = METAL;
        px[cy + i * dy][cx + t * dx] = METAL;
      }
    }
    px[cy][cx] = METAL_LT;
    px[cy + 3 * dy][cx] = METAL_DK;
    px[cy][cx + 3 * dx] = METAL_DK;
  }
  return px;
}

/** Seite: oben ein Holzband, darunter Stein mit Rissen; `shade` dunkelt die rechte Seite ab. */
function stoneSide(shade) {
  const px = grid(() => null);
  for (let y = 0; y < HEAD_ROWS; y++) {
    for (let x = 0; x < N; x++) px[y][x] = y === HEAD_ROWS - 1 ? PLANK_SEAM : pick(PLANK);
    if (y === 0) for (let x = 0; x < N; x++) if (chance(0.5)) px[0][x] = PLANK_HI;
  }
  for (const x of [3, 11]) for (let y = 0; y < 3; y++) px[y][x] = PLANK_SEAM;
  for (let y = HEAD_ROWS; y < N; y++) for (let x = 0; x < N; x++) px[y][x] = pick(STONE);
  for (let i = 0; i < 7; i++) {
    let x = int(N), y = 5 + int(N - 5);
    const length = 3 + int(4);
    for (let k = 0; k < length; k++) {
      if (x >= 0 && x < N && y >= HEAD_ROWS && y < N) px[y][x] = chance(0.6) ? STONE_CRACK : STONE_DK;
      x += int(3) - 1;
      y += int(2);
    }
  }
  for (let x = 0; x < N; x++) if (chance(0.7)) px[N - 1][x] = STONE_DK;
  if (!shade) return px;
  const dark = (hex) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * 0.78).toString(16).padStart(2, '0')).join('');
  return px.map((row) => row.map(dark));
}

/** Zeilenweise lauflängenkodiert zu <rect>-Elementen; `rows` begrenzt den Zeilenbereich. */
function faceRects(px, rows = [0, N]) {
  const out = [];
  for (let y = rows[0]; y < rows[1]; y++) {
    for (let x = 0; x < N; ) {
      const color = px[y][x];
      const start = x;
      while (x < N && px[y][x] === color) x++;
      out.push(`<rect x="${start}" y="${y}" width="${x - start}" height="1" fill="${color}"/>`);
    }
  }
  return out.join('');
}

// Isometrie: Deckel-Spitze bei (N*c, 0); links und rechts hängen an den Deckelkanten.
const c = Math.cos(Math.PI / 6);
const s = Math.sin(Math.PI / 6);
const W = 2 * N * c;
const H = N * s * 2 + N;
const f = (v) => v.toFixed(4);
const topMatrix = `matrix(${f(c)} ${f(s)} ${f(-c)} ${f(s)} ${f(N * c)} 0)`;
const innerMatrix = `matrix(${f(c)} ${f(s)} ${f(-c)} ${f(s)} ${f(N * c)} ${HEAD_ROWS})`;
const leftMatrix = `matrix(${f(c)} ${f(s)} 0 1 0 ${f(N * s)})`;
const rightMatrix = `matrix(${f(c)} ${f(-s)} 0 1 ${f(N * c)} ${N})`;

/** Holzstange: kleine Säule (Querschnitt 4x4) auf der Innenfläche, bis unter den ausgefahrenen Kopf. */
function arm() {
  const P = (u, v, dy = 0) => [N * c + (u - v) * c, (u + v) * s + HEAD_ROWS + dy];
  const [a, b, h] = [6, 10, LIFT];
  const points = (poly) => poly.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  const top = [P(a, a, -h), P(b, a, -h), P(b, b, -h), P(a, b, -h)];
  const left = [P(a, b, -h), P(b, b, -h), P(b, b), P(a, b)];
  const right = [P(b, b, -h), P(b, a, -h), P(b, a), P(b, b)];
  return `<polygon points="${points(top)}" fill="#c39a5a"/><polygon points="${points(left)}" fill="#8e6a36"/><polygon points="${points(right)}" fill="#a98149"/>`;
}

const top = plankTop();
const left = stoneSide(false);
const right = stoneSide(true);

const svg = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 ${-LIFT} ${W.toFixed(2)} ${(H + LIFT).toFixed(2)}" width="${W.toFixed(0)}" height="${(H + LIFT).toFixed(0)}" shape-rendering="crispEdges">`,
  '<g class="piston-base">',
  `<g transform="${innerMatrix}">${faceRects(grid(() => pick(INNER)))}</g>`,
  `<g transform="${leftMatrix}">${faceRects(left, [HEAD_ROWS, N])}</g>`,
  `<g transform="${rightMatrix}">${faceRects(right, [HEAD_ROWS, N])}</g>`,
  '</g>',
  `<g class="piston-arm">${arm()}</g>`,
  '<g class="piston-head">',
  `<g transform="${topMatrix}">${faceRects(top)}</g>`,
  `<g transform="${leftMatrix}">${faceRects(left, [0, HEAD_ROWS])}</g>`,
  `<g transform="${rightMatrix}">${faceRects(right, [0, HEAD_ROWS])}</g>`,
  '</g>',
  '</svg>',
].join('\n');

writeFileSync(new URL('../src/assets/piston.svg', import.meta.url), svg + '\n');
console.log(`piston.svg geschrieben (${svg.length} Bytes)`);
