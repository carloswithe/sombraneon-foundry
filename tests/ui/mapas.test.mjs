import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { PACKS } from '../../data/content/index.mjs';
import { mapScenes, mapMacros, mapGuideJournal, MAP_DEFS } from '../../data/content/adventure-maps.mjs';
import { imageSize } from '../../tools/lib/image.mjs';
import { ROOT } from '../../tools/lib/book.mjs';

/**
 * Mapas de mesa da Noite das Máscaras (docs/noite-das-mascaras-scenes.md): dez Scenes com grade,
 * paredes, portas, luzes, regiões, notas e tokens, mais os macros dos estados de cena.
 */
const pack = (name) => PACKS.find((p) => p.name === name).docs;
const byN = (n) => mapScenes[n - 1];
const SIZES = [[21, 14], [30, 20], [24, 16], [36, 24], [6, 4], [32, 18], [28, 16], [24, 16], [36, 24], [30, 20]];

describe('mapas de mesa', () => {
  it('são dez scenes com o tamanho da tabela e a grade de 1,5 m por quadrado de 100 px', () => {
    expect(mapScenes).toHaveLength(10);
    mapScenes.forEach((s, i) => {
      expect({ w: s.width, h: s.height }, s.name).toEqual({ w: SIZES[i][0] * 100, h: SIZES[i][1] * 100 });
      expect(s.grid).toMatchObject({ type: 1, size: 100, distance: 1.5, units: 'm' });
      expect(s.tokenVision).toBe(true);
      const { width, height } = imageSize(path.join(ROOT, s.background));
      expect(Math.abs(width / height - s.width / s.height) < 0.06, s.name).toBe(true);
    });
  });

  it('cada mapa tem paredes, portas, luzes, regiões, notas e quatro runners', () => {
    for (const s of mapScenes) {
      expect(s.walls.filter((w) => !w.door).length, s.name).toBeGreaterThan(3);
      expect(s.walls.filter((w) => w.door).length, s.name).toBeGreaterThan(0);
      expect(s.lights.length, s.name).toBeGreaterThan(0);
      expect(s.regions.length, s.name).toBeGreaterThan(0);
      expect(s.notes.length, s.name).toBeGreaterThan(0);
      expect(s.tokens.filter((t) => t.runner).map((t) => t.runner), s.name).toEqual([1, 2, 3, 4]);
    }
  });

  it('tudo cai dentro da cena', () => {
    for (const s of mapScenes) {
      const inside = (x, y) => x >= 0 && y >= 0 && x <= s.width && y <= s.height;
      for (const w of s.walls) expect(inside(w.c[0], w.c[1]) && inside(w.c[2], w.c[3]), `${s.name} parede ${w.c}`).toBe(true);
      for (const l of s.lights) expect(inside(l.x, l.y), `${s.name} luz`).toBe(true);
      for (const t of s.tokens) expect(inside(t.x + 50, t.y + 50), `${s.name} ${t.name}`).toBe(true);
      for (const n of s.notes) expect(inside(n.x, n.y), `${s.name} nota`).toBe(true);
    }
  });

  it('as trancas da aventura vêm trancadas, com a marca para os macros', () => {
    const door = (n, tag) => byN(n).walls.filter((w) => w.door && w.flags?.sombraneon?.tag === tag);
    expect(door(2, 'alerta4')).toHaveLength(3);
    expect(door(4, 'alerta4')).toHaveLength(3);
    expect(door(4, 'cracha4').every((w) => w.ds === 2)).toBe(true);
    expect(door(5, 'painel').every((w) => w.ds === 2)).toBe(true);
    expect(door(6, 'apagao').every((w) => w.ds === 2)).toBe(true);
    expect(door(7, 'cofre').every((w) => w.ds === 2)).toBe(true);
    expect(door(8, 'cofre').every((w) => w.ds !== 2)).toBe(true);
  });

  it('estados de cena: Mural e curto-circuito (mapa 7) e botão de pânico (mapa 8)', () => {
    const tag = (n, t) => byN(n).lights.filter((l) => l.flags.sombraneon.tag === t);
    expect(tag(7, 'mural').length).toBeGreaterThan(0);
    expect(tag(7, 'mural').every((l) => !l.hidden)).toBe(true);
    expect(tag(7, 'curto').length).toBeGreaterThan(0);
    expect(tag(7, 'curto').every((l) => l.hidden)).toBe(true);
    expect(tag(8, 'panico').every((l) => l.hidden)).toBe(true);
  });

  it('a Doca tem a câmera como luz giratória em cone e coberturas totais para as caixas', () => {
    const cam = byN(3).lights.find((l) => l.flags.sombraneon.tag === 'camera');
    expect(cam.config).toMatchObject({ angle: 70, animation: { type: 'siren' } });
    expect(byN(3).regions.filter((r) => /Cobertura total/.test(r.name)).length).toBeGreaterThanOrEqual(5);
  });

  it('o Corredor marca as faixas de parede como perigo e as três colunas como cobertura', () => {
    const regions = byN(7).regions;
    expect(regions.filter((r) => /Parede do Mural/.test(r.name))).toHaveLength(2);
    expect(regions.filter((r) => /coluna de vidro/.test(r.name))).toHaveLength(3);
  });

  it('o Cofre tem as três saídas da fuga e o Anel tem a pista de dança como multidão', () => {
    expect(byN(8).regions.filter((r) => /^Saída:/.test(r.name))).toHaveLength(3);
    expect(byN(4).regions.some((r) => /multidão/.test(r.name))).toBe(true);
    expect(byN(9).regions.some((r) => /Terreno difícil/.test(r.name))).toBe(true);
  });

  it('o Rex é um token 2 x 2 e o elenco usa as fichas do compêndio', () => {
    expect(byN(7).tokens.find((t) => t.ref === 'noite-elenco/rex-robo-de-exclusao')).toMatchObject({ width: 2, height: 2 });
    const refs = new Set(mapScenes.flatMap((s) => s.tokens.map((t) => t.ref).filter(Boolean)));
    const elenco = new Set(pack('noite-elenco').map((d) => `noite-elenco/${d.identifier}`));
    for (const r of refs) expect(elenco.has(r), r).toBe(true);
    for (const r of ['livia-aragao', 'o-curador', 'dona-ruth', 'teo-pixel', 'o-assistente', 'o-mordomo-ia']) expect(refs).toContain(`noite-elenco/${r}`);
  });

  it('o guia tem uma página por mapa, a lista de macros e os prompts, e cita cada scene', () => {
    const ids = mapGuideJournal.pages.map((p) => p.identifier);
    for (const d of MAP_DEFS) expect(ids).toContain(`mapa-${String(d.n).padStart(2, '0')}`);
    expect(ids).toEqual(expect.arrayContaining(['ja-montado', 'visao-geral', 'macros', 'checklist', 'prompts']));
    const first = mapGuideJournal.pages[0].text.content;
    for (const s of mapScenes) expect(first).toContain(`@Ref[noite-mapas/${s.identifier}`);
    const macros = mapGuideJournal.pages.find((p) => p.identifier === 'macros').text.content;
    for (const m of mapMacros) expect(macros).toContain(m.identifier);
  });

  it('todo macro chama uma função que existe na API do módulo', () => {
    const script = fs.readFileSync(path.join(ROOT, 'modules/sombraneon-compendium/sombraneon-compendium.mjs'), 'utf8');
    const api = /module\.api = \{([^}]*)\}/
      .exec(script)[1]
      .split(',')
      .map((x) => x.trim());
    expect(mapMacros.length).toBeGreaterThan(5);
    for (const m of mapMacros) {
      const fn = /\.api\.(\w+)\(/.exec(m.command)[1];
      expect(api, m.name).toContain(fn);
    }
  });

  it('o livro lista os mapas de cada capítulo', () => {
    const livro = pack('noite-aventura').find((d) => d.identifier === 'livro');
    const page = (id) => livro.pages.find((p) => p.identifier === id).text.content;
    expect(page('sala-1')).toContain('@Ref[noite-mapas/mapa-02]');
    expect(page('sala-1')).toContain('@Ref[noite-mapas/mapa-03]');
    for (const n of ['08', '09', '10']) expect(page('sala-5')).toContain(`@Ref[noite-mapas/mapa-${n}]`);
  });
});
