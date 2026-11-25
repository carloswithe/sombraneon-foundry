import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { PACKS, EXPECTED_COUNTS } from '../../data/content/index.mjs';
import { CERCO_PACKS, CERCO_PACK_FOLDER, CERCO_COUNTS } from '../../data/content/cerco/index.mjs';
import { RUNNER_DEFS } from '../../data/content/cerco/runners.mjs';
import { buildRunner } from '../../data/content/carga/runners.mjs';
import { ALL_ART, IMAGES, MAPS, HANDOUTS, GM_ONLY } from '../../data/content/cerco/images.mjs';
import { LAYOUTS } from '../../data/content/cerco/maps.mjs';
import { parseLayout } from '../../data/content/cerco/layout.mjs';
import { ALERT_ROWS } from '../../data/content/cerco/tables.mjs';
import { section, tablesIn } from '../../data/content/cerco/lib.mjs';
import { makeResolver } from '../../tools/lib/refs.mjs';
import { ROOT, plain } from '../../tools/lib/book.mjs';

/**
 * Aventura "Cerco ao Refúgio" (docs/cerco-ao-refugio.md): o que vai para os compêndios do módulo
 * sombraneon-cerco-ao-refugio bate com o texto, com o inventário e com a seção 12 das instruções.
 */
const ID = 'sombraneon-cerco-ao-refugio';
const SCOPE = { system: 'sombraneon', module: 'sombraneon-compendium', carga: 'sombraneon-carga-sem-nome', cerco: ID };
const resolver = makeResolver(PACKS, (s) => SCOPE[s]);
const pack = (name) => CERCO_PACKS.find((p) => p.name === name).docs;
const byId = (name, id) => pack(name).find((d) => d.identifier === id);
const MODULE_DIR = path.join(ROOT, 'modules', ID);
const manifest = JSON.parse(fs.readFileSync(path.join(MODULE_DIR, 'module.json'), 'utf8'));
const script = fs.readFileSync(path.join(MODULE_DIR, `${ID}.mjs`), 'utf8');
const attack = (d, re) => d.system.attacks.find((a) => re.test(a.name));
const strip = (html) => plain(String(html).replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/\s+/g, ' ')).trim();
const exists = (rel) => !rel.startsWith('modules/') || fs.existsSync(path.join(ROOT, rel));
const allDocs = CERCO_PACKS.flatMap((p) => p.docs);

describe('estrutura do módulo', () => {
  it('é um módulo próprio, independente, para o sistema sombraneon, com tudo o que o manifesto cita', () => {
    expect(manifest.id).toBe(ID);
    expect(manifest.title).toContain('CERCO AO REFÚGIO');
    expect(manifest.relationships.systems).toEqual([expect.objectContaining({ id: 'sombraneon', type: 'system' })]);
    expect(manifest.relationships.requires ?? []).toEqual([]);
    expect(manifest.manifest).toContain('/releases/latest/download/cerco-ao-refugio.json');
    for (const f of [...manifest.esmodules, ...manifest.styles, ...manifest.languages.map((l) => l.path)]) expect(fs.existsSync(path.join(MODULE_DIR, f)), f).toBe(true);
  });

  it('declara os compêndios do conteúdo, sem acesso dos jogadores, com as quantidades do inventário', () => {
    expect(manifest.packs.map((p) => p.name)).toEqual(CERCO_PACKS.map((p) => p.name));
    for (const p of manifest.packs) expect([p.system, p.ownership]).toEqual(['sombraneon', { PLAYER: 'NONE', ASSISTANT: 'OWNER' }]);
    for (const p of CERCO_PACKS) {
      expect(p.docs, p.name).toHaveLength(CERCO_COUNTS[p.name]);
      expect(EXPECTED_COUNTS[p.name]).toBe(CERCO_COUNTS[p.name]);
    }
    expect(manifest.packFolders).toEqual([CERCO_PACK_FOLDER]);
  });

  it('inventário (seção 15): 12 ameaças, 19 NPCs, 6 runners, 2 equipamentos, 3 tesouros e 1 Prêmio, 6 cenas, 31 imagens, 5 salas, 10 perguntas', () => {
    expect([pack('cerco-ameacas').length, pack('cerco-npcs').length, pack('cerco-runners').length, pack('cerco-equipamentos').length, pack('cerco-cenas').length, IMAGES.length, MAPS.length]).toEqual([12, 19, 6, 2, 6, 31, 6]);
    const loot = pack('cerco-tesouros');
    expect(loot.filter((i) => i.flags[ID].premio)).toHaveLength(1);
    expect(loot.filter((i) => i.flags[ID].tipo === 'tesouro')).toHaveLength(3);
    expect(byId('cerco-diarios', '02-briefing-e-faq').pages.filter((p) => /^p\d+$/.test(p.identifier))).toHaveLength(10);
    for (const id of ['sala-1', 'sala-2', 'sala-3', 'sala-4', 'sala-5']) expect(byId('cerco-diarios', id), id).toBeTruthy();
  });

  it('todo link @Ref resolve, toda imagem existe e não há travessão', () => {
    for (const d of allDocs) {
      const out = resolver.deep(JSON.parse(JSON.stringify(d)), d.identifier);
      expect(JSON.stringify(out)).not.toMatch(/[–—]/);
      const images = [d.img, d.background, ...(d.pages ?? []).map((p) => p.src), ...(d.tokens ?? []).map((t) => t.texture), d.prototypeToken?.texture.src].filter(Boolean);
      for (const m of JSON.stringify(d.pages ?? []).matchAll(/src=\\"([^"\\]+)\\"/g)) images.push(m[1]);
      for (const img of images) expect(exists(img), `${d.identifier}: ${img}`).toBe(true);
    }
    expect(script).not.toMatch(/[–—]/);
  });

  it('nenhum comentário de marcador, prompt de layout ou id solto vaza para os diários da aventura', () => {
    const text = JSON.stringify(pack('cerco-diarios'));
    expect(text).not.toContain('<!--');
    expect(text).not.toContain('Art Direction');
    expect(text).not.toContain('pcs_inicio');
    expect(text).not.toMatch(/<code>(item-|img-|mapa-)/);
  });

  it('permissões: só o briefing e os handouts são vistos pelos jogadores; o Mestre vê o resto', () => {
    const observers = [...pack('cerco-diarios'), ...pack('cerco-imagens')].filter((d) => d.ownership.default === 2).map((d) => d.identifier);
    expect(observers).toEqual(['02-briefing-e-faq', ...HANDOUTS]);
    expect(GM_ONLY).toEqual(['img-11']);
    expect(byId('cerco-imagens', 'img-11').ownership.default).toBe(0);
    const briefing = byId('cerco-diarios', '02-briefing-e-faq').pages;
    expect(briefing.find((p) => p.identifier === 'abertura').ownership.default).toBe(0);
    expect(briefing.find((p) => p.identifier === 'p1').ownership.default).toBe(2);
    // a verdade e os códigos ficam em seção secreta, num diário sem acesso
    const first = byId('cerco-diarios', '00-leia-primeiro');
    expect(first.ownership.default).toBe(0);
    expect(first.pages.find((p) => p.identifier === 'codigos-e-segredos').text.content).toContain('class="secret"');
    const handoutText = JSON.stringify(briefing.filter((p) => p.ownership.default === 2));
    for (const secret of ['Vitrola', 'Pardal', 'carga seis']) expect(handoutText, secret).not.toContain(secret);
    // nada de "Mestre:" ou "Segredo" fora da seção secreta em página que os jogadores leem
    for (const p of briefing.filter((x) => x.ownership.default === 2)) {
      const open = p.text.content.replace(/<section class="secret">[\s\S]*?<\/section>/g, '');
      expect(open, p.identifier).not.toMatch(/<strong>(Mestre|Segredo)/);
    }
  });
});

describe('ameaças, NPCs e itens', () => {
  it('números das fichas do capítulo 12', () => {
    const want = {
      'cerco-ameacas': { capanga: [1, 12, 5, 0], 'atirador-gangue': [1, 11, 5, 0], 'seguranca-corporativa': [2, 13, 10, 0], 'drone-vigilancia': [1, 13, 3, 0], 'drone-combate': [2, 13, 8, 0], 'cao-cibernetico': [2, 13, 11, 0], brandt: [4, 15, 20, 0], coruja: [5, 15, 27, 0], torreta: [3, 14, 15, 0], 'android-seguranca': [4, 15, 22, 1], 'enxame-ratos': [1, 10, 10, 0], 'van-captura': [0, 11, 30, 1] },
      'cerco-npcs': { zaca: [4, 15, 22, 0], beatriz: [0, 10, 3, 0], clarice: [1, 11, 5, 0], ruth: [1, 11, 5, 0], 'ana-paz': [1, 11, 5, 0], bia: [0, 10, 3, 0], samora: [0, 10, 3, 0] }
    };
    for (const [name, ids] of Object.entries(want)) {
      for (const [id, nums] of Object.entries(ids)) {
        const d = byId(name, id);
        expect([d.system.level, d.system.ac, d.system.hp.value, d.system.armor], id).toEqual(nums);
        expect(d.type).toBe('npc');
        expect(d.prototypeToken.actorLink).toBe(name === 'cerco-npcs');
      }
    }
  });

  it('ataques e Moral', () => {
    expect(attack(byId('cerco-ameacas', 'seguranca-corporativa'), /Pistola/)).toMatchObject({ bonus: 3, damage: 'd6', range: 'near' });
    expect(attack(byId('cerco-ameacas', 'brandt'), /Katana/)).toMatchObject({ bonus: 5, damage: 'd8', range: 'close' });
    expect(attack(byId('cerco-ameacas', 'torreta'), /Metralhadora/)).toMatchObject({ bonus: 4, damage: 'd8', range: 'far' });
    expect(attack(byId('cerco-npcs', 'zaca'), /Gancho/)).toMatchObject({ bonus: 5, damage: 'd8+1' });
    expect(byId('cerco-ameacas', 'drone-vigilancia').system.attacks).toEqual([]);
    expect(byId('cerco-ameacas', 'capanga').system.morale).toMatchObject({ kind: 'weak', cd: 18 });
    expect(byId('cerco-ameacas', 'brandt').system.morale).toMatchObject({ kind: 'firm', cd: 12 });
    expect(byId('cerco-ameacas', 'drone-combate').system.morale.enabled).toBe(false);
  });

  it('o esquadrão do clímax traz os dois arsenais, com o de Captura ativo', () => {
    for (const id of ['brandt', 'seguranca-corporativa', 'drone-combate']) {
      const d = byId('cerco-ameacas', id);
      expect(d.items.map((i) => [i.name, i.flags[ID].ativo]), id).toEqual([['Arsenal: Modo Captura', true], ['Arsenal: Modo Descarte', false]]);
      expect(d.system.traits).toContain('Arsenal: Modo Descarte');
    }
  });

  it('códigos secretos nas flags e segredos em section.secret', () => {
    expect(byId('cerco-npcs', 'iris').flags[ID].palavraGatilho).toBe('Vitrola');
    expect(byId('cerco-npcs', 'tomas').flags[ID].contragatilho).toBe('Pardal');
    expect(byId('cerco-npcs', 'seu-altino').flags[ID].senha).toBe('carga seis');
    expect(byId('cerco-npcs', 'beatriz').system.traits).toMatch(/<section class="secret"><p><strong>Segredo/);
    for (const a of [...pack('cerco-ameacas'), ...pack('cerco-npcs')]) {
      const open = a.system.traits.replace(/<section class="secret">[\s\S]*?<\/section>/g, '');
      expect(open, a.identifier).not.toContain('Segredo (só');
    }
  });

  it('o butim e o Prêmio: categoria, XP e 3 cargas', () => {
    expect(['item-amostra-lote', 'item-registro-brandt', 'item-scanner-coruja'].map((id) => byId('cerco-tesouros', id).flags[ID].butim.xp)).toEqual([3, 1, 1]);
    const doze = byId('cerco-tesouros', 'item-os-doze');
    expect(doze.system.uses).toMatchObject({ max: 3, value: 3 });
    expect(doze.flags[ID].butim.xpPorGrupo).toBe(3);
  });
});

describe('runners prontos', () => {
  it('HP, CA, slots e ataques batem com as fichas do capítulo 15', () => {
    for (const def of RUNNER_DEFS) {
      const { derived } = buildRunner(def);
      expect(derived.hp.max, `${def.id} hp`).toBe(def.expect.hp);
      expect(derived.ac.total ?? derived.ac.value, `${def.id} ca`).toBe(def.expect.ac);
      expect(derived.slots.max, `${def.id} slots`).toBe(def.expect.slots);
      expect(derived.slots.used, `${def.id} usados`).toBe(def.expect.sistema ?? def.expect.used);
      for (const [name, [bonus, damage]] of Object.entries(def.expect.attacks)) {
        const hit = derived.attacks.find((a) => a.name === name);
        expect(hit, `${def.id} ${name}`).toBeTruthy();
        expect([hit.bonus ?? hit.attackBonus, hit.damage ?? hit.formula], `${def.id} ${name}`).toEqual([bonus, damage]);
      }
      expect(derived.warnings.map((w) => w.code), def.id).toEqual([]);
    }
  });

  it('fichas vinculadas, com visão e a aba Bio vazia', () => {
    for (const r of pack('cerco-runners')) {
      expect(r.prototypeToken).toMatchObject({ actorLink: true, disposition: 1, sight: { enabled: true } });
      expect(r.system.details.biography).toBeUndefined();
      expect(r.system.details.drive.length).toBeGreaterThan(10);
    }
  });
});

describe('cenas', () => {
  const scenes = pack('cerco-cenas');
  // paredes, portas, luzes, tokens de ameaça, pins (instruções, seção 15)
  const inventory = { 'mapa-01': [21, 10, 2, 7, 5], 'mapa-02': [11, 3, 1, 7, 3], 'mapa-03': [13, 6, 2, 6, 4], 'mapa-04': [21, 10, 2, 9, 5], 'mapa-05': [13, 2, 3, 2, 3], 'mapa-06': [16, 5, 2, 12, 5] };

  it('o leitor de layout entende listas e mapas em linha', () => {
    expect(parseLayout('mapa:\n  id: x\n  paredes:\n    - [0, 1, 2, 3]\n  portas:\n    - {id: a, nota: "com: dois pontos, e vírgula", estado: aberta}\n')).toEqual({ id: 'x', paredes: [[0, 1, 2, 3]], portas: [{ id: 'a', nota: 'com: dois pontos, e vírgula', estado: 'aberta' }] });
  });

  it('quantidades batem com o inventário, mais seis runners por cena', () => {
    for (const s of scenes) {
      const [walls, doors, lights, threats, pins] = inventory[s.identifier];
      expect([s.walls.filter((w) => !w.door).length, s.walls.filter((w) => w.door).length, s.lights.length, s.tokens.length - 6, s.notes.length], s.identifier).toEqual([walls, doors, lights, threats, pins]);
      expect(s.tokens.filter((t) => t.runner)).toHaveLength(6);
    }
  });

  it('grade de 1,5 m, visão ligada e sem luz global', () => {
    for (const s of scenes) {
      expect(s.grid).toMatchObject({ type: 1, size: 100, distance: 1.5, units: 'm' });
      expect([s.tokenVision, s.fogExploration, s.globalLight]).toEqual([true, true, false]);
    }
    expect(byId('cerco-cenas', 'mapa-05').lights.every((l) => l.hidden)).toBe(true);
  });

  it('tudo cai dentro da cena e todo token referencia um ator', () => {
    for (const s of scenes) {
      const inside = (x, y) => x >= 0 && y >= 0 && x <= s.width && y <= s.height;
      for (const w of s.walls) expect(inside(w.c[0], w.c[1]) && inside(w.c[2], w.c[3]), `${s.identifier} parede`).toBe(true);
      for (const l of s.lights) expect(inside(l.x, l.y), `${s.identifier} luz`).toBe(true);
      for (const n of s.notes) expect(inside(n.x, n.y), `${s.identifier} pin`).toBe(true);
      for (const t of s.tokens) {
        expect(inside(t.x, t.y) && inside(t.x + t.width * 100, t.y + t.height * 100), `${s.identifier} token ${t.name}`).toBe(true);
        const [name, id] = t.ref.split('/');
        expect(byId(name, id), t.ref).toBeTruthy();
      }
      for (const r of s.regions) for (const q of r.shapes) expect(inside(q.x, q.y) && inside(q.x + q.width, q.y + q.height)).toBe(true);
    }
  });

  it('todo pin aponta para uma página que existe no diário da sala', () => {
    for (const s of scenes) {
      for (const n of s.notes) {
        const [diary, page] = n.flags[ID].pagina.split('#');
        expect(byId('cerco-diarios', diary)?.pages.some((p) => p.identifier === page), n.flags[ID].pagina).toBe(true);
      }
    }
  });

  it('o mapa 4 repete as paredes do mapa 1 e abre o portão leste', () => {
    const [a, b] = [LAYOUTS[0], LAYOUTS[3]];
    expect(b.paredes).toEqual(a.paredes);
    expect(b.portas.map((d) => d.seg)).toEqual(a.portas.map((d) => d.seg));
    expect(b.portas.find((d) => d.id === 'portao-leste').estado).toBe('aberta');
  });

  it('a porta do Seu Altino guarda a senha e a arte tem o tamanho da grade', () => {
    expect(byId('cerco-cenas', 'mapa-06').walls.find((w) => w.flags[ID]?.id === 'porta-altino').flags[ID].senha).toBe('carga seis');
    expect(ALL_ART.every((a) => a.hasFile)).toBe(true);
  });
});

describe('tabelas, macros e script', () => {
  it('complicações d6 das cinco salas, Alerta e Rotas, com o texto da aventura', () => {
    const tables = pack('cerco-tabelas');
    expect(tables.map((t) => [t.formula, t.results.length])).toEqual([['1d6', 6], ['1d6', 6], ['1d6', 6], ['1d6', 6], ['1d6', 6], ['1d4', 4], ['1d3', 3]]);
    expect(tables[0].results[0].name).toBe(plain(tablesIn(section(4, 'Complicações').body)[0].rows[0][1]));
  });

  it('o Alerta do script é o texto da aventura', () => {
    const block = /export const ALERTA = \{([\s\S]*?)\n\};/.exec(script)[1];
    for (const [level, text] of ALERT_ROWS) {
      const line = new RegExp(`\\n  ${level}: '(.*)'`).exec(block)[1];
      expect(strip(line), `nível ${level}`).toBe(strip(plain(text)));
    }
  });

  it('todo macro chama uma função exposta na API do módulo', () => {
    const api = /module\.api = \{([^}]*)\}/.exec(script)[1].split(',').map((s) => s.trim());
    for (const m of pack('cerco-macros')) {
      const fn = /\.api\.(\w+)\(/.exec(m.command)[1];
      expect(api, m.identifier).toContain(fn);
    }
  });
});
