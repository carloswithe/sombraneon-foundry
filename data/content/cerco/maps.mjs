import path from 'node:path';
import { ROOT } from '../../../tools/lib/book.mjs';
import { imageSize } from '../../../tools/lib/image.mjs';
import { CERCO_ID, SOURCE, ADVENTURE_ID, marked, pad } from './lib.mjs';
import { artOf } from './images.mjs';
import { parseLayout } from './layout.mjs';
import { threatActors, npcActors, tokenPath } from './actors.mjs';
import { runners } from './runners.mjs';

/**
 * Seis Scenes, uma por bloco MAP. A geometria é a do próprio YAML da aventura, em casas de grade (1 casa =
 * 1,5 m = 100 px): a arte de cada mapa foi gerada a partir dessa mesma planta, então não há medição à parte.
 */
const SQUARE = 100;
const METERS = 1.5;
const P = (v) => Math.round(v * SQUARE);
const DOOR_STATE = { fechada: 0, aberta: 1, trancada: 2 };

/** O que o YAML não diz: sala, escuridão do texto de cada cena e o nome curto da navegação. */
export const SCENE_META = {
  'mapa-01': { sala: 'sala-1', darkness: 0.5, nav: '1. Igreja' },
  'mapa-02': { sala: 'sala-2', darkness: 0.5, nav: '2. Pátio' },
  'mapa-03': { sala: 'sala-3', darkness: 0.5, nav: '3. Nave' },
  'mapa-04': { sala: 'sala-4', darkness: 0.55, nav: '4. Cerco' },
  // a cripta já nasce no escuro (instruções, seção 16): luzes apagadas, o Mestre as acende por macro
  'mapa-05': { sala: 'sala-4', darkness: 1, nav: '4b. Cripta', lightsOff: 'cripta' },
  'mapa-06': { sala: 'sala-5', darkness: 0.35, nav: '5. Estação' }
};

const actorIndex = new Map();
for (const a of threatActors) actorIndex.set(a.identifier, { pack: 'cerco-ameacas', actor: a });
for (const a of npcActors) actorIndex.set(a.identifier, { pack: 'cerco-npcs', actor: a });

const MAP_BLOCKS = marked('MAP');

export const LAYOUTS = [...MAP_BLOCKS.values()].map((b) => {
  const yaml = /```yaml\n([\s\S]*?)```/.exec(b.body)?.[1];
  if (!yaml) throw new Error(`${b.id}: sem o bloco yaml do layout`);
  const layout = parseLayout(yaml);
  if (layout.id !== b.id) throw new Error(`${b.id}: o layout diz ${layout.id}`);
  return layout;
});

function buildScene(def, index) {
  const meta = SCENE_META[def.id];
  const art = artOf(def.id);
  const n = Number(def.id.slice(-2));
  const cols = def.grade.largura;
  const rows = def.grade.altura;
  const width = cols * SQUARE;
  const height = rows * SQUARE;
  const { width: iw, height: ih } = imageSize(path.join(ROOT, art.path));
  if (Math.abs(iw / ih - width / height) > 0.01) throw new Error(`${def.id}: a proporção da arte (${iw} x ${ih}) não bate com a grade ${cols} x ${rows}`);

  const walls = [
    ...def.paredes.map((c) => ({ c: c.map(P), flags: {} })),
    ...def.portas.map((d) => {
      const flags = { [CERCO_ID]: { id: d.id, tipo: d.tipo, estado: d.estado, cd: d.cd, nota: d.nota, ...(d.id === 'porta-altino' ? { senha: 'carga seis' } : {}) } };
      if (d.tipo === 'janela') return { c: d.seg.map(P), sight: 0, light: 0, flags };
      return { c: d.seg.map(P), door: d.tipo === 'secreta' ? 2 : 1, ds: DOOR_STATE[d.estado], flags };
    })
  ];

  const lights = def.luzes.map((l) => ({
    x: P(l.x),
    y: P(l.y),
    rotation: 0,
    hidden: Boolean(meta.lightsOff),
    config: { dim: Math.round(l.raio * METERS * 100) / 100, bright: Math.round(l.raio * METERS * 0.3 * 100) / 100, color: l.cor, alpha: l.intensidade, angle: 360 },
    flags: { [CERCO_ID]: { tag: meta.lightsOff ?? null } }
  }));

  const regions = def.cobertura.map((c) => ({
    name: `Cobertura: ${c.nome} (+${c.bonus_ca} de CA)`,
    color: '#9e9e9e',
    shapes: [{ type: 'rectangle', x: P(c.ret[0]), y: P(c.ret[1]), width: P(c.ret[2] - c.ret[0]), height: P(c.ret[3] - c.ret[1]), rotation: 0, hole: false }]
  }));

  const threats = def.ameacas.map((t) => {
    const hit = actorIndex.get(t.ator);
    if (!hit) throw new Error(`${def.id}: ator desconhecido ${t.ator}`);
    const ref = `${hit.pack}/${t.ator}`;
    const [w, h] = [hit.actor.prototypeToken.width, hit.actor.prototypeToken.height];
    return {
      name: t.nome,
      x: P(t.pos[0]),
      y: P(t.pos[1]),
      width: w,
      height: h,
      disposition: hit.actor.prototypeToken.disposition,
      hidden: Boolean(t.oculto),
      ref,
      texture: tokenPath(t.ator),
      flags: { [CERCO_ID]: { ref: `@Ref[${ref}]`, ator: t.ator, nota: t.nota } }
    };
  });

  const party = def.pcs_inicio.map((pos, i) => {
    const runner = runners[i];
    const ref = `cerco-runners/${runner.identifier}`;
    return {
      name: runner.name,
      x: P(pos[0]),
      y: P(pos[1]),
      width: 1,
      height: 1,
      disposition: 1,
      hidden: false,
      ref,
      runner: 1,
      texture: tokenPath(runner.identifier),
      flags: { [CERCO_ID]: { ref: `@Ref[${ref}]`, ator: runner.identifier, runner: true } }
    };
  });

  const notes = def.pins.map((p) => ({
    text: p.titulo,
    x: P(p.pos[0]),
    y: P(p.pos[1]),
    flags: { [CERCO_ID]: { pagina: `${p.pagina}#abertura`, pin: `@Ref[cerco-diarios/${p.pagina}#abertura]` } }
  }));

  const cx = def.pcs_inicio.reduce((s, p) => s + p[0], 0) / def.pcs_inicio.length;
  const cy = def.pcs_inicio.reduce((s, p) => s + p[1], 0) / def.pcs_inicio.length;

  return {
    identifier: def.id,
    name: `Mapa ${pad(n)}. ${def.nome}`,
    type: 'Scene',
    img: art.path,
    folder: art.group,
    sort: (index + 1) * 100,
    background: art.path,
    fit: 'fill',
    width,
    height,
    grid: { type: 1, size: SQUARE, distance: METERS, units: 'm', color: '#000000', alpha: 0.25 },
    tokenVision: true,
    fogExploration: true,
    globalLight: false,
    darkness: meta.darkness,
    navigation: true,
    navOrder: n,
    navName: meta.nav,
    initial: { x: P(cx), y: P(cy), scale: 0.8 },
    walls,
    lights,
    regions,
    tokens: [...threats, ...party],
    notes,
    flags: {
      [CERCO_ID]: { id: def.id, fonte: `Layout do ${def.id} (capítulos 4 a 8)`, mapa: n, sala: meta.sala, baseDarkness: meta.darkness, cobertura: def.cobertura.map((c) => `${c.nome} (+${c.bonus_ca} de CA)`) },
      sombraneon: { schemaVersion: 1, source: SOURCE, adventure: { id: ADVENTURE_ID, room: meta.sala } }
    }
  };
}

export const mapScenes = LAYOUTS.map(buildScene);
