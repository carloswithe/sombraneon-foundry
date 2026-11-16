import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { PACKS } from '../../data/content/index.mjs';
import { MAPAS, PAREDES, CATEGORIAS, ESCURIDAO, mapaCenas, mapaDiarios, mapaTabelas, mapaMacros } from '../../data/content/mapas/index.mjs';
import { ROOT } from '../../tools/lib/book.mjs';
import { imageSize } from '../../tools/lib/image.mjs';

/**
 * Compêndio de Mapas Aleatórios (docs/sombraneon-compendio-mapas.md): 100 cenas com fundo, grade e nota de entrada,
 * paredes automáticas nos mapas aprovados, onze diários, quatorze tabelas de sorteio e dois macros.
 */
const pack = (name) => PACKS.find((p) => p.name === name);
const SCRIPT = fs.readFileSync(path.join(ROOT, 'modules/sombraneon-compendium/sombraneon-compendium.mjs'), 'utf8');

describe('compêndio de mapas: cenas', () => {
  it('são 100 cenas em 10 pastas, uma por categoria, na ordem do catálogo', () => {
    expect(mapaCenas).toHaveLength(100);
    expect(CATEGORIAS.map((c) => c.cat)).toEqual(['rua', 'corp', 'lei', 'saude', 'noite', 'ind', 'trans', 'mil', 'sn', 'esp']);
    for (const c of CATEGORIAS) expect(c.mapas).toHaveLength(10);
    expect(new Set(mapaCenas.map((s) => s.folder)).size).toBe(10);
    expect(mapaCenas.map((s) => s.identifier)).toEqual(MAPAS.map((m) => m.id));
  });

  it('o tamanho é grade x 100 px, com grade quadrada de 1,5 m e imagem do mesmo tamanho', () => {
    for (const s of mapaCenas) {
      const m = MAPAS.find((x) => x.id === s.identifier);
      expect({ w: s.width, h: s.height }, s.name).toEqual({ w: m.w * 100, h: m.h * 100 });
      expect(s.grid).toMatchObject({ type: 1, size: 100, distance: 1.5, units: 'm' });
      const img = imageSize(path.join(ROOT, s.background));
      expect(img, s.name).toEqual({ width: s.width, height: s.height });
      expect(fs.existsSync(path.join(ROOT, s.img)), `${s.name} miniatura`).toBe(true);
    }
  });

  it('cada cena tem uma nota Entrada dos runners a 50 px da borda indicada e dentro da cena', () => {
    for (const s of mapaCenas) {
      expect(s.notes, s.name).toHaveLength(1);
      const [n] = s.notes;
      expect(n.text).toBe('Entrada dos runners');
      expect(n.x >= 0 && n.y >= 0 && n.x <= s.width && n.y <= s.height, s.name).toBe(true);
      const e = s.flags['sombraneon-compendium'].mapa.entrada;
      if (e === 'sul') expect([n.x, n.y]).toEqual([Math.round(s.width / 2), s.height - 50]);
      if (e === 'norte') expect([n.x, n.y]).toEqual([Math.round(s.width / 2), 50]);
      if (e === 'leste') expect([n.x, n.y]).toEqual([s.width - 50, Math.round(s.height / 2)]);
      if (e === 'oeste') expect([n.x, n.y]).toEqual([50, Math.round(s.height / 2)]);
    }
  });

  it('com paredes: visão e névoa ligadas, luz global desligada e escuridão pelo tom do mapa; sem paredes: só fundo e grade', () => {
    for (const s of mapaCenas) {
      const flags = s.flags['sombraneon-compendium'].mapa;
      if (s.walls.length) {
        expect(flags.paredes, s.name).toBe('auto-v1');
        expect({ v: s.tokenVision, f: s.fogExploration, g: s.globalLight, d: s.darkness }, s.name).toEqual({ v: true, f: true, g: false, d: ESCURIDAO[flags.luz] });
      } else {
        expect(flags.paredes, s.name).toBe('nenhuma');
        expect({ v: s.tokenVision, f: s.fogExploration, g: s.globalLight, d: s.darkness }, s.name).toEqual({ v: false, f: false, g: true, d: 0 });
      }
    }
  });

  it('as paredes são segmentos dentro da cena, e os mapas da Rede ficam sem paredes', () => {
    for (const s of mapaCenas) {
      for (const w of s.walls) {
        expect(w.c, s.name).toHaveLength(4);
        const [x1, y1, x2, y2] = w.c;
        expect(x1 >= 0 && x2 >= 0 && y1 >= 0 && y2 >= 0 && x1 <= s.width && x2 <= s.width && y1 <= s.height && y2 <= s.height, `${s.name} parede ${w.c}`).toBe(true);
        expect(x1 !== x2 || y1 !== y2, `${s.name} parede sem comprimento`).toBe(true);
      }
      expect(s.walls.length, s.name).toBeLessThanOrEqual(700);
    }
    for (const id of ['m089', 'm090']) expect(mapaCenas.find((s) => s.identifier === id).walls).toHaveLength(0);
    expect(Object.keys(PAREDES).sort()).toEqual(mapaCenas.filter((s) => s.walls.length).map((s) => s.identifier).sort());
  });
});

describe('compêndio de mapas: diários', () => {
  it('são 11 diários: o Leia primeiro e um por categoria, só para o Mestre', () => {
    expect(mapaDiarios).toHaveLength(11);
    expect(mapaDiarios.map((d) => d.identifier)).toEqual(['leia-primeiro', ...CATEGORIAS.map((c) => c.cat)]);
    for (const d of mapaDiarios) expect(d.ownership).toEqual({ default: 0 });
  });

  it('cada categoria tem duas páginas por mapa (texto e imagem), com link para a cena', () => {
    for (const d of mapaDiarios.slice(1)) {
      expect(d.pages, d.name).toHaveLength(20);
      for (const [i, p] of d.pages.entries()) {
        if (i % 2 === 0) {
          expect(p.type).toBe('text');
          expect(p.text.content).toContain('@Ref[mapas-cenas/');
          expect(p.text.content).toContain('<h3>Ameaças típicas</h3>');
        } else {
          expect(p.type).toBe('image');
          expect(fs.existsSync(path.join(ROOT, p.src)), p.name).toBe(true);
        }
      }
    }
  });

  it('o Leia primeiro tem as páginas do catálogo e cita as cenas do pacote essencial', () => {
    const leia = mapaDiarios[0];
    expect(leia.pages.map((p) => p.identifier)).toEqual(['o-que-e', 'no-modulo', 'como-usar', 'grade', 'tabelas', 'cores', 'pacote', 'arte', 'notas']);
    const pacote = leia.pages.find((p) => p.identifier === 'pacote').text.content;
    for (const m of MAPAS.filter((x) => x.pacote)) expect(pacote, m.id).toContain(`@Ref[mapas-cenas/${m.id}]`);
  });
});

describe('compêndio de mapas: tabelas e macros', () => {
  it('são 14 tabelas: d100, categoria, uma por categoria, local (d8) e pacote (d20)', () => {
    expect(mapaTabelas.map((t) => t.identifier)).toEqual(['d100', 'categoria', ...CATEGORIAS.map((c) => `cat-${c.cat}`), 'local', 'pacote']);
    const formulas = Object.fromEntries(mapaTabelas.map((t) => [t.identifier, t.formula]));
    expect(formulas.d100).toBe('1d100');
    expect(formulas.categoria).toBe('1d10');
    expect(formulas.local).toBe('1d8');
    expect(formulas.pacote).toBe('1d20');
  });

  it('a d100 aponta para as 100 cenas na ordem, cada categoria para as suas 10 e o pacote para as 20 essenciais', () => {
    const d100 = mapaTabelas.find((t) => t.identifier === 'd100');
    expect(d100.results.map((r) => r.ref)).toEqual(MAPAS.map((m) => `Scene:${m.id}`));
    for (const c of CATEGORIAS) {
      const t = mapaTabelas.find((x) => x.identifier === `cat-${c.cat}`);
      expect(t.results.map((r) => r.ref)).toEqual(c.mapas.map((m) => `Scene:${m.id}`));
    }
    const pacote = mapaTabelas.find((t) => t.identifier === 'pacote');
    expect(pacote.results.map((r) => r.ref)).toEqual(MAPAS.filter((m) => m.pacote).map((m) => `Scene:${m.id}`));
    expect(pacote.results).toHaveLength(20);
  });

  it('o local do contrato traz as cenas sugeridas da tabela 4.2, com as faixas expandidas', () => {
    const local = mapaTabelas.find((t) => t.identifier === 'local');
    expect(local.results).toHaveLength(8);
    const refs = (n) => [...local.results[n - 1].text.matchAll(/@Ref\[mapas-cenas\/(m\d{3})\]/g)].map((x) => x[1]);
    expect(refs(2)).toEqual(Array.from({ length: 10 }, (_, i) => `m${String(31 + i).padStart(3, '0')}`));
    expect(refs(1)).toEqual(['m011', 'm012', 'm013', 'm018', 'm019', 'm020', 'm009']);
    expect(refs(3)).toContain('m098');
    expect(refs(8)).toEqual(['m085', 'm086', 'm091', 'm095', 'm098', 'm099']);
  });

  it('são dois macros, e cada um chama uma função que existe na API do módulo', () => {
    expect(mapaMacros).toHaveLength(2);
    const api = /module\.api = \{([^}]*)\}/.exec(SCRIPT)[1].split(',').map((x) => x.trim());
    for (const m of mapaMacros) expect(api, m.name).toContain(/\.api\.(\w+)\(/.exec(m.command)[1]);
  });

  it('os quatro packs estão declarados no módulo e na contagem esperada', () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'modules/sombraneon-compendium/module.json'), 'utf8'));
    const nomes = ['mapas-cenas', 'mapas-diarios', 'mapas-tabelas', 'mapas-macros'];
    for (const n of nomes) {
      expect(manifest.packs.find((p) => p.name === n), n).toBeTruthy();
      expect(pack(n).scope).toBe('module');
    }
    expect(manifest.packFolders.find((f) => f.name === 'Mapas Aleatórios').packs).toEqual(nomes);
  });
});
