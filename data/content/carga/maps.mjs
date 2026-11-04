import path from 'node:path';
import { ROOT } from '../../../tools/lib/book.mjs';
import { imageSize } from '../../../tools/lib/image.mjs';
import { CARGA_ID, SOURCE, ASSET_DIR, pad } from './lib.mjs';
import { artOf } from './images.mjs';
import { MAP_DEFS } from './maps-data.mjs';
import { threatActors, npcActors } from './actors.mjs';
import { runners } from './runners.mjs';

/**
 * Cinco Scenes, um por mapa: grade de 1,5 m (100 px), paredes, portas (com estado e CD), luzes, regiões de
 * cobertura e de terreno, pins ligados às páginas das salas e os tokens nas posições iniciais.
 * A geometria está em maps-data.mjs, em casas de grade; aqui vira pixels da cena (casas x 100).
 */
const SQUARE = 100;
const METERS = 1.5;
const P = (v) => Math.round(v * SQUARE);
const DOOR_STATE = { fechada: 0, aberta: 1, trancada: 2 };

const actorIndex = new Map([...threatActors, ...npcActors, ...runners].map((a) => [a.identifier, a]));

function buildScene(def, index) {
  const art = artOf(def.arte);
  const [cols, rows] = def.grade;
  const width = cols * SQUARE;
  const height = rows * SQUARE;
  const { width: iw, height: ih } = imageSize(path.join(ROOT, art.path));
  if (Math.abs(iw / ih - width / height) > 0.06) throw new Error(`${def.id}: a proporção da arte (${iw} x ${ih}) não bate com a grade ${cols} x ${rows}`);

  const walls = [
    ...def.paredes.map((w) => ({
      c: w.c.map(P),
      ...(w.low ? { sight: 0, light: 0 } : {}),
      flags: {}
    })),
    ...def.portas.map((d) =>
      d.janela
        ? { c: d.c.map(P), sight: 0, light: 0, flags: { [CARGA_ID]: { id: d.id, tipo: 'janela', cd: d.cd, nota: d.nota } } }
        : { c: d.c.map(P), door: 1, ds: DOOR_STATE[d.estado], flags: { [CARGA_ID]: { id: d.id, tipo: 'porta', estado: d.estado, cd: d.cd, nota: d.nota, ...(d.tag ? { tag: d.tag } : {}) } } }
    )
  ].filter((w) => w.c[0] !== w.c[2] || w.c[1] !== w.c[3]);

  const lights = def.luzes.map((l) => ({
    x: P(l.x),
    y: P(l.y),
    rotation: 0,
    hidden: false,
    config: { dim: Math.round(l.raio * METERS * 100) / 100, bright: Math.round(l.raio * METERS * 0.3 * 100) / 100, color: l.cor, alpha: l.intensidade, angle: 360 },
    flags: { [CARGA_ID]: { nome: l.nome ?? null, tag: l.tag ?? null } }
  }));

  const regions = def.regioes.map((r) => {
    const s = r.shape;
    return { name: r.nome, color: r.cor, shapes: [{ type: 'rectangle', x: P(s.x), y: P(s.y), width: P(s.width), height: P(s.height), rotation: 0, hole: false }] };
  });

  const tokens = def.tokens.map((t) => {
    const [pack, id] = t.ator.split('/');
    const actor = actorIndex.get(id);
    if (!actor) throw new Error(`${def.id}: ator desconhecido ${t.ator}`);
    const [w, h] = t.size ?? [1, 1];
    return {
      name: t.nome,
      x: P(t.cell[0]),
      y: P(t.cell[1]),
      width: w,
      height: h,
      elevation: t.elevation ?? 0,
      disposition: actor.prototypeToken.disposition,
      hidden: Boolean(t.oculto),
      ref: t.ator,
      runner: t.runner ? 1 : undefined,
      texture: `${ASSET_DIR}/tokens/${id}.png`,
      flags: { [CARGA_ID]: { ref: `@Ref[${t.ator}]`, ...(t.nota ? { nota: t.nota } : {}), ...(t.tag ? { tag: t.tag } : {}), ...(t.runner ? { runner: true } : {}) } }
    };
  });

  const notes = def.pins.map((p) => ({
    text: p.titulo,
    x: P(p.at[0]),
    y: P(p.at[1]),
    flags: { [CARGA_ID]: { pagina: p.pagina, pin: `@Ref[carga-diarios/${p.pagina}]` } }
  }));

  return {
    identifier: def.id,
    name: `Mapa ${pad(def.n)}. ${def.nome}`,
    type: 'Scene',
    img: art.path,
    folder: def.folder,
    sort: (index + 1) * 100,
    background: art.path,
    fit: 'fill',
    width,
    height,
    grid: { type: 1, size: SQUARE, distance: METERS, units: 'm', color: '#000000', alpha: 0.25 },
    tokenVision: true,
    fogExploration: true,
    globalLight: false,
    darkness: def.escuridao,
    navigation: true,
    navOrder: def.n,
    navName: `${def.n}. ${def.nome.replace(/^Entroncamento do /, '').replace(/^Saída Sul e /, '')}`,
    initial: { x: P(def.inicio[0]), y: P(def.inicio[1]), scale: 0.8 },
    walls,
    lights,
    regions,
    tokens,
    notes,
    flags: {
      [CARGA_ID]: { id: def.id, fonte: 'Anexo A: layouts dos mapas', mapa: def.n, sala: def.sala, baseDarkness: def.escuridao },
      sombraneon: { schemaVersion: 1, source: SOURCE }
    }
  };
}

export const mapScenes = MAP_DEFS.map(buildScene);
export { MAP_DEFS };
