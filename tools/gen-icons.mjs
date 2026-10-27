import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/book.mjs';

/** Gera os ícones SVG originais do sistema (neon sobre fundo escuro). Rode: node tools/gen-icons.mjs */
const OUT = path.join(ROOT, 'systems', 'sombraneon', 'assets', 'icons');
fs.mkdirSync(OUT, { recursive: true });

const CYAN = '#19e3ff';
const MAG = '#ff2e88';
const YEL = '#ffe14a';
const GRN = '#3dff9a';

/* Glifos desenhados em um quadro de 64x64 (traço de 3 px). */
const G = {
  hex: '<path d="M32 12 50 22v20L32 52 14 42V22z"/><path d="M32 24v16M24 28l8 4 8-4"/>',
  bolt: '<path d="M36 10 18 36h12l-4 18 20-28H34z"/>',
  shield: '<path d="M32 10 50 17v14c0 11-8 18-18 23-10-5-18-12-18-23V17z"/>',
  chip: '<rect x="20" y="20" width="24" height="24" rx="2"/><path d="M26 12v8M32 12v8M38 12v8M26 44v8M32 44v8M38 44v8M12 26h8M12 32h8M12 38h8M44 26h8M44 32h8M44 38h8"/>',
  cross: '<path d="M26 12h12v14h14v12H38v14H26V38H12V26h14z"/>',
  eye: '<path d="M8 32c8-12 16-18 24-18s16 6 24 18c-8 12-16 18-24 18S16 44 8 32z"/><circle cx="32" cy="32" r="7"/>',
  gear: '<circle cx="32" cy="32" r="9"/><path d="M32 10v8M32 46v8M10 32h8M46 32h8M16 16l6 6M42 42l6 6M48 16l-6 6M22 42l-6 6"/>',
  target: '<circle cx="32" cy="32" r="18"/><circle cx="32" cy="32" r="8"/><path d="M32 8v10M32 46v10M8 32h10M46 32h10"/>',
  skull: '<path d="M16 30c0-10 7-18 16-18s16 8 16 18c0 6-3 9-6 11v7H22v-7c-3-2-6-5-6-11z"/><circle cx="25" cy="30" r="3"/><circle cx="39" cy="30" r="3"/>',
  wave: '<path d="M8 32c6 0 6-16 12-16s6 32 12 32 6-32 12-32 6 16 12 16"/>',
  cube: '<path d="M32 10 50 20v24L32 54 14 44V20z"/><path d="M14 20l18 10 18-10M32 30v24"/>',
  star: '<path d="m32 10 6 16h16l-13 10 5 16-14-10-14 10 5-16L10 26h16z"/>',
  circuit: '<path d="M12 20h14l6 8h16M12 44h10l6-8h10M52 44H40"/><circle cx="12" cy="20" r="3"/><circle cx="52" cy="28" r="3"/><circle cx="12" cy="44" r="3"/><circle cx="52" cy="44" r="3"/>',
  blade: '<path d="M44 10 22 40l-6 2-2 8 8-2 2-6 24-30z"/><path d="M20 44l-8 8"/>',
  gun: '<path d="M10 24h34l4 6H34l-4 12H20l2-12h-8zM44 30l4-6"/>',
  book: '<path d="M14 12h26a8 8 0 0 1 8 8v32H22a8 8 0 0 1-8-8z"/><path d="M22 20h18M22 28h18"/>',
  dice: '<rect x="14" y="14" width="36" height="36" rx="6"/><circle cx="26" cy="26" r="2.5"/><circle cx="38" cy="38" r="2.5"/><circle cx="26" cy="38" r="2.5"/><circle cx="38" cy="26" r="2.5"/>',
  user: '<circle cx="32" cy="22" r="9"/><path d="M14 52c2-12 9-18 18-18s16 6 18 18z"/>',
  drone: '<circle cx="32" cy="32" r="7"/><path d="M20 20l8 8M44 20l-8 8M20 44l8-8M44 44l-8-8"/><circle cx="16" cy="16" r="5"/><circle cx="48" cy="16" r="5"/><circle cx="16" cy="48" r="5"/><circle cx="48" cy="48" r="5"/>',
  car: '<path d="M10 38l6-14c1-3 3-4 6-4h20c3 0 5 1 6 4l6 14v8H10z"/><circle cx="22" cy="46" r="4"/><circle cx="42" cy="46" r="4"/>',
  heart: '<path d="M32 52C16 40 10 30 10 22a11 11 0 0 1 22-4 11 11 0 0 1 22 4c0 8-6 18-22 30z"/>',
  battery: '<rect x="12" y="22" width="36" height="20" rx="3"/><path d="M52 28v8M20 28v8M28 28v8"/>',
  cable: '<path d="M10 40c10 0 10-16 20-16s10 16 20 16"/><rect x="48" y="34" width="10" height="12" rx="2"/>',
  box: '<path d="M12 22 32 12l20 10v22L32 54 12 44z"/><path d="M12 22l20 10 20-10M32 32v22"/>',
  syringe: '<path d="M44 12l8 8M38 18l8 8-20 20-8 0 0-8zM18 46l-8 8"/>',
  flame: '<path d="M32 10c2 10 14 14 14 28a14 14 0 0 1-28 0c0-6 3-10 6-13 0 5 3 7 5 7 0-8-2-14 3-22z"/>',
  mic: '<rect x="25" y="10" width="14" height="26" rx="7"/><path d="M16 30a16 16 0 0 0 32 0M32 46v8M24 54h16"/>',
  lock: '<rect x="16" y="28" width="32" height="24" rx="3"/><path d="M22 28v-6a10 10 0 0 1 20 0v6"/>',
  radio: '<path d="M12 28h40v22H12zM20 28 40 12"/><circle cx="26" cy="39" r="5"/><path d="M38 36h10M38 42h10"/>',
  tool: '<path d="M44 12a10 10 0 0 0-10 14L12 48l4 4 22-22a10 10 0 0 0 14-10l-6 6-6-2-2-6z"/>',
  moon: '<path d="M40 12a20 20 0 1 0 12 28 16 16 0 0 1-12-28z"/>'
};

const ICONS = {
  character: ['user', CYAN],
  npc: ['user', MAG],
  drone: ['drone', CYAN],
  ice: ['hex', MAG],
  class: ['star', CYAN],
  origin: ['cube', GRN],
  background: ['book', YEL],
  'alignment-controle': ['lock', CYAN],
  'alignment-sobrevivencia': ['flame', YEL],
  'alignment-liberdade': ['bolt', MAG],
  'feature-class': ['star', CYAN],
  'feature-origin': ['cube', GRN],
  'feature-mutation': ['syringe', GRN],
  'feature-talent': ['bolt', YEL],
  'feature-edge-trigger': ['target', MAG],
  program: ['circuit', CYAN],
  protocol: ['cross', GRN],
  set: ['wave', MAG],
  table: ['dice', YEL],
  journal: ['book', CYAN],
  macro: ['gear', YEL],
  'weapon-melee': ['blade', MAG],
  'weapon-ranged': ['gun', MAG],
  armor: ['shield', CYAN],
  'implant-neural': ['chip', CYAN],
  'implant-body': ['heart', MAG],
  'implant-arms': ['gear', YEL],
  'implant-legs': ['bolt', GRN],
  'gear-general': ['box', CYAN],
  'gear-tool': ['tool', YEL],
  'gear-medical': ['cross', GRN],
  'gear-ammo': ['box', MAG],
  'gear-battery': ['battery', YEL],
  'gear-ration': ['box', GRN],
  'gear-stim': ['syringe', GRN],
  'gear-deck': ['chip', CYAN],
  'gear-firewall': ['shield', MAG],
  'gear-nanokit': ['cross', CYAN],
  'gear-surgical': ['syringe', MAG],
  'gear-stage-rig': ['mic', MAG],
  'gear-utility-rig': ['box', YEL],
  'gear-radio': ['radio', CYAN],
  'gear-light': ['star', YEL],
  'gear-cable': ['cable', CYAN],
  'gear-vehicle': ['car', CYAN],
  'gear-drone-module': ['drone', GRN],
  weapon: ['blade', MAG],
  gear: ['box', CYAN],
  implant: ['chip', CYAN],
  feature: ['star', CYAN],
  'status-dead': ['skull', MAG],
  'status-unconscious': ['moon', CYAN],
  'status-dying': ['heart', MAG],
  'status-stunned': ['bolt', YEL],
  'status-blind': ['eye', MAG],
  'status-immobile': ['lock', YEL],
  'status-sick': ['syringe', GRN],
  'status-frightened': ['skull', YEL],
  'status-surprised': ['star', YEL],
  'status-immersed': ['circuit', CYAN],
  'status-prone': ['wave', YEL],
  'status-invisible': ['eye', CYAN],
  'status-tremor': ['wave', MAG],
  'status-cover': ['shield', GRN]
};

for (const [name, [glyph, color]] of Object.entries(ICONS)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect x="2" y="2" width="60" height="60" rx="6" fill="#0b0d16" stroke="${color}" stroke-opacity="0.55" stroke-width="2"/>
  <g fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${G[glyph]}</g>
</svg>
`;
  fs.writeFileSync(path.join(OUT, `${name}.svg`), svg);
}
console.log(`${Object.keys(ICONS).length} ícones em ${path.relative(ROOT, OUT)}`);
