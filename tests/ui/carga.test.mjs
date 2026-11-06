import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { PACKS, EXPECTED_COUNTS } from '../../data/content/index.mjs';
import { CARGA_PACKS, CARGA_PACK_FOLDER, CARGA_COUNTS } from '../../data/content/carga/index.mjs';
import { RUNNER_DEFS, buildRunner } from '../../data/content/carga/runners.mjs';
import { ALL_ART, IMAGES, HANDOUTS, GM_ONLY } from '../../data/content/carga/images.mjs';
import { MAP_DEFS } from '../../data/content/carga/maps.mjs';
import { cargaMacros } from '../../data/content/carga/macros.mjs';
import { section } from '../../data/content/carga/lib.mjs';
import { makeResolver } from '../../tools/lib/refs.mjs';
import { imageSize } from '../../tools/lib/image.mjs';
import { ROOT, plain } from '../../tools/lib/book.mjs';

/**
 * Aventura "Carga Sem Nome" (docs/carga-sem-nome.md): o que está nos compêndios do módulo
 * sombraneon-carga-sem-nome bate com o texto da aventura e com o inventário das instruções.
 */
const SCOPE = { system: 'sombraneon', module: 'sombraneon-compendium', carga: 'sombraneon-carga-sem-nome' };
const resolver = makeResolver(PACKS, (s) => SCOPE[s]);
const pack = (name) => CARGA_PACKS.find((p) => p.name === name).docs;
const byId = (name, id) => pack(name).find((d) => d.identifier === id);
const MODULE_DIR = path.join(ROOT, 'modules/sombraneon-carga-sem-nome');
const manifest = JSON.parse(fs.readFileSync(path.join(MODULE_DIR, 'module.json'), 'utf8'));
const script = fs.readFileSync(path.join(MODULE_DIR, 'sombraneon-carga-sem-nome.mjs'), 'utf8');
const attack = (d, re) => d.system.attacks.find((a) => re.test(a.name));
const strip = (html) => plain(html.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/\s+/g, ' ')).trim();

describe('estrutura do módulo', () => {
  it('é um módulo próprio, independente do SombraNeon: Compêndio, para o sistema sombraneon', () => {
    expect(manifest.id).toBe('sombraneon-carga-sem-nome');
    expect(manifest.relationships.systems).toEqual([expect.objectContaining({ id: 'sombraneon', type: 'system' })]);
    // o Compêndio é só recomendado (complementar): nada do módulo depende dele
    expect(manifest.relationships.requires ?? []).toEqual([]);
    expect(manifest.relationships.recommends.map((r) => r.id)).toEqual(['sombraneon-compendium']);
    expect(manifest.manifest).toContain('/releases/latest/download/carga-sem-nome.json');
    for (const p of manifest.packs) expect(p.system).toBe('sombraneon');
  });

  it('declara os dez compêndios, com as quantidades do inventário, e a pasta do menu', () => {
    expect(manifest.packs.map((p) => p.name)).toEqual(CARGA_PACKS.map((p) => p.name));
    for (const p of CARGA_PACKS) {
      expect(p.docs, p.name).toHaveLength(CARGA_COUNTS[p.name]);
      expect(EXPECTED_COUNTS[p.name]).toBe(CARGA_COUNTS[p.name]);
      expect(p.label.startsWith('Carga Sem Nome: ')).toBe(true);
    }
    expect(manifest.packFolders).toEqual([CARGA_PACK_FOLDER]);
  });

  it('o conteúdo do Mestre não vaza: nenhum compêndio dá acesso aos jogadores', () => {
    for (const p of manifest.packs) expect(p.ownership).toEqual({ PLAYER: 'NONE', ASSISTANT: 'OWNER' });
  });

  it('inventário: 11 ameaças, 8 NPCs, 6 runners, 10 equipamentos, 5 tesouros e 1 Prêmio, 5 cenas, 41 imagens, 10 perguntas', () => {
    expect([pack('carga-ameacas').length, pack('carga-npcs').length, pack('carga-runners').length, pack('carga-equipamentos').length, pack('carga-tesouros').length, pack('carga-cenas').length, IMAGES.length]).toEqual([11, 8, 6, 10, 6, 5, 41]);
    expect(pack('carga-tesouros').filter((i) => i.flags['sombraneon-carga-sem-nome'].premio)).toHaveLength(1);
    expect(byId('carga-diarios', '02-briefing-e-faq').pages.filter((p) => /^p\d+$/.test(p.identifier))).toHaveLength(10);
    expect(['sala-1', 'sala-2', 'sala-3', 'sala-4', 'sala-5'].every((id) => byId('carga-diarios', id))).toBe(true);
  });

  it('todo caminho do manifesto existe (script, estilo, idioma)', () => {
    for (const f of [...manifest.esmodules, ...manifest.styles, ...manifest.languages.map((l) => l.path)]) expect(fs.existsSync(path.join(MODULE_DIR, f)), f).toBe(true);
  });
});

describe('ameaças e NPCs', () => {
  it('os números das fichas do capítulo 12', () => {
    const want = {
      'carga-ameacas': { 'capanga-caes': [1, 12, 5, 0], 'atirador-caes': [1, 11, 5, 0], 'policial-urbano': [1, 13, 6, 0], 'sargento-teixeira': [3, 15, 15, 0], 'drone-falcao': [1, 13, 3, 0], 'viatura-guarda': [3, 13, 35, 1], 'suv-aegis': [4, 13, 45, 2], jararaca: [0, 15, 90, 5], 'torre-50': [3, 14, 18, 3], cerbero: [5, 15, 30, 2], 'droid-combate': [2, 13, 8, 0] },
      'carga-npcs': { 'dona-ruth': [1, 11, 5, 0], tavares: [1, 11, 5, 0], 'seu-jaci': [0, 10, 3, 0], 'motorista-jararaca': [0, 10, 3, 0], nest: [2, 11, 6, 0], 'daigo-okabe': [4, 15, 14, 0], 'capita-voss': [5, 16, 28, 0], tesoureira: [2, 12, 8, 0] }
    };
    for (const [name, ids] of Object.entries(want)) {
      for (const [id, [na, ac, hp, bl]] of Object.entries(ids)) {
        const d = byId(name, id);
        expect([d.system.level, d.system.ac, d.system.hp.value, d.system.armor], id).toEqual([na, ac, hp, bl]);
        expect(d.type).toBe('npc');
      }
    }
    expect(byId('carga-npcs', 'nest').system.hp.max).toBe(15);
    expect(byId('carga-npcs', 'daigo-okabe').system.hp.max).toBe(20);
  });

  it('ataques e Moral', () => {
    const sgt = byId('carga-ameacas', 'sargento-teixeira');
    expect(sgt.system.morale).toMatchObject({ kind: 'firm', cd: 12 });
    expect(attack(sgt, /Escopeta/)).toMatchObject({ bonus: 3, damage: 'd10', range: 'near' });
    expect(attack(byId('carga-ameacas', 'torre-50'), /pesada/)).toMatchObject({ bonus: 5, damage: '2d8', range: 'far', heavy: true });
    expect(byId('carga-ameacas', 'viatura-guarda').system.attacks[0]).toMatchObject({ bonus: 4, damage: 'd10' });
    expect(byId('carga-ameacas', 'drone-falcao').system.attacks).toEqual([]);
    expect(byId('carga-ameacas', 'suv-aegis').system.attacks).toEqual([]);
    expect(attack(byId('carga-npcs', 'nest'), /Pistola pesada/)).toMatchObject({ bonus: 4, damage: 'd8' });
    expect(attack(byId('carga-npcs', 'daigo-okabe'), /Katana/)).toMatchObject({ bonus: 6, damage: 'd10' });
  });

  it('o Cérbero: quatro ataques (três cabeças e o Pisão), cabeças com CA 16, HP 6 e BL 1, e o texto dos modos', () => {
    const c = byId('carga-ameacas', 'cerbero');
    expect(c.system.attacks).toHaveLength(4);
    for (const re of [/Choque/, /Chumbo/, /Chama/, /Pisão/]) expect(attack(c, re)).toBeTruthy();
    expect(c.system.traits).toContain('CA 16, HP 6, BL 1');
    expect(c.system.traits).toContain('Espera');
    expect(c.system.traits).toContain('Coleira');
    expect(c.items.map((i) => i.identifier)).toContain('item-nucleo-cerbero');
  });

  it('o Sargento leva o Cartão de comando e a regra de rendição (Moral CD 12 aos 7 HP)', () => {
    const s = byId('carga-ameacas', 'sargento-teixeira');
    expect(s.items.map((i) => i.identifier)).toEqual(['item-cartao-comando']);
    expect(s.system.traits).toContain('7 HP ou menos');
    expect(s.system.traits).toContain('se rende');
  });

  it('o Jararaca traz as partes (cela, canil, painel leste, cabine) e a torre traz ciclo e zona morta', () => {
    const j = byId('carga-ameacas', 'jararaca').system.traits;
    for (const part of ['Casco', 'Porta de uma cela', 'Porta do canil', 'Painel leste e porta de serviço', 'Cabine']) expect(j).toContain(part);
    const t = byId('carga-ameacas', 'torre-50').system.traits;
    expect(t).toContain('Ciclo');
    expect(t).toContain('Zona morta');
  });

  it('Nest tem os dois estados nas notas; Nest e Daigo são amigáveis; os segredos do Mestre ficam em section.secret', () => {
    expect(byId('carga-npcs', 'nest').system.traits).toContain('torso sedado');
    expect(byId('carga-npcs', 'nest').system.traits).toContain('Kit de Resgate');
    for (const id of ['nest', 'daigo-okabe']) expect(byId('carga-npcs', id).prototypeToken.disposition).toBe(1);
    for (const d of [...pack('carga-ameacas'), ...pack('carga-npcs')]) {
      if (/Segredo/.test(d.system.traits)) expect(d.system.traits, d.identifier).toContain('<section class="secret">');
    }
  });

  it('prototype dos tokens: ameaças hostis e sem vínculo, NPCs únicos vinculados, imagem e tamanho', () => {
    for (const d of pack('carga-ameacas')) {
      expect(d.prototypeToken.disposition, d.identifier).toBe(-1);
      expect(d.prototypeToken.actorLink, d.identifier).toBe(false);
    }
    for (const d of pack('carga-npcs')) expect(d.prototypeToken.actorLink, d.identifier).toBe(true);
    expect(byId('carga-ameacas', 'cerbero').prototypeToken).toMatchObject({ width: 2, height: 2 });
    for (const d of [...pack('carga-ameacas'), ...pack('carga-npcs'), ...pack('carga-runners')]) {
      expect(fs.existsSync(path.join(ROOT, d.prototypeToken.texture.src)), `${d.identifier}: ${d.prototypeToken.texture.src}`).toBe(true);
      expect(fs.existsSync(path.join(ROOT, d.img)), `${d.identifier}: ${d.img}`).toBe(true);
    }
  });
});

describe('runners prontos', () => {
  it('seis runners, um por classe, com a CA, o HP e os slots escritos na ficha', () => {
    expect(RUNNER_DEFS.map((d) => d.cls)).toEqual(['solo', 'netrunner', 'hyperdoc', 'ghost', 'rocker', 'rigger']);
    for (const def of RUNNER_DEFS) {
      const { derived } = buildRunner(def);
      expect(derived.hp.max, `${def.id} HP`).toBe(def.expect.hp);
      expect(derived.ac.value ?? derived.ac, `${def.id} CA`).toBe(def.expect.ac);
      expect(derived.slots.max ?? derived.slots, `${def.id} slots`).toBe(def.expect.slots);
    }
  });

  it('os ataques e o treino em veículos da ficha (capítulo 15) batem com o cálculo do sistema', () => {
    const atk = (id, re) => buildRunner(RUNNER_DEFS.find((d) => d.id === id)).derived.attacks.find((a) => re.test(a.name));
    expect([atk('tijolo', /Pistola pesada/).attackBonus, atk('tijolo', /Pistola pesada/).damage]).toEqual([2, 'd8+1']);
    expect([atk('tijolo', /Arma retrátil/).attackBonus, atk('tijolo', /Arma retrátil/).damage]).toEqual([3, 'd6']);
    expect(atk('tijolo', /Faca/).attackBonus).toBe(3);
    expect([atk('bit', /Pistola leve/).attackBonus, atk('cinza', /Pistola leve/).attackBonus, atk('cobra', /Pistola leve/).attackBonus, atk('fumaca', /Pistola leve/).attackBonus, atk('corvo', /Pistola leve/).attackBonus]).toEqual([1, 0, 3, 1, 3]);
    const training = (id) => {
      const v = buildRunner(RUNNER_DEFS.find((d) => d.id === id)).derived.vehicles;
      return ['light', 'medium', 'heavy', 'mecha'].filter((k) => v[k]);
    };
    expect(training('tijolo')).toEqual(['light', 'medium', 'heavy', 'mecha']);
    expect(training('corvo')).toEqual(['light', 'medium', 'heavy', 'mecha']);
    expect(training('bit')).toEqual(['light']);
    for (const id of ['cinza', 'cobra', 'fumaca']) expect(training(id), id).toEqual(['light', 'medium']);
  });

  it('os atributos finais da ficha (com o bônus do talento somado), os créditos e o Drive', () => {
    const want = { tijolo: [17, 12, 14, 8, 10, 9], bit: [8, 13, 12, 16, 11, 10], cinza: [8, 11, 12, 14, 17, 10], cobra: [8, 17, 10, 11, 12, 11], fumaca: [9, 12, 12, 10, 11, 17], corvo: [9, 17, 12, 12, 11, 10] };
    const credits = { tijolo: 200, bit: 290, cinza: 80, cobra: 260, fumaca: 310, corvo: 220 };
    for (const def of RUNNER_DEFS) {
      const { base } = buildRunner(def);
      const bonus = (k) => def.talents.reduce((s, t) => s + (t.bonus?.[k] ?? 0), 0);
      expect(['for', 'des', 'con', 'int', 'sab', 'car'].map((k) => base[k] + bonus(k)), def.id).toEqual(want[def.id]);
      const actor = byId('carga-runners', def.id);
      expect(actor.system.currency.credits, def.id).toBe(credits[def.id]);
      expect(actor.system.details.drive.length, def.id).toBeGreaterThan(20);
      expect(actor.system.level).toBe(1);
      expect(actor.system.edge.value).toBe(1);
      // a aba Bio vem sempre vazia (spoilers da aventura)
      for (const k of ['civilName', 'biography', 'appearance', 'contacts', 'notes', 'groupGoals']) expect(actor.system.details[k] ?? '', `${def.id}.${k}`).toBe('');
    }
  });

  it('origens e particularidades: Fumaça é Android, Corvo é Nat e não leva o jack Neural, Tijolo leva o cromo de Rua', () => {
    const items = (id) => byId('carga-runners', id).items.map((i) => i.identifier);
    expect(items('fumaca')).toContain('android');
    expect(items('cobra')).toContain('replicante');
    expect(items('corvo')).toContain('nat');
    expect(items('corvo')).not.toContain('jack-de-interface');
    expect(items('tijolo')).toEqual(expect.arrayContaining(['cromado', 'subderme-blindada', 'arma-retratil']));
    expect(items('bit')).toEqual(expect.arrayContaining(['ping', 'backdoor', 'choque']));
    expect(items('cinza')).toEqual(expect.arrayContaining(['nanocura', 'diagnostico']));
    expect(items('fumaca')).toEqual(expect.arrayContaining(['hype', 'estatica', 'solo']));
  });

  it('todo equipamento entra (sem marcas [F] e [C]) e o token é vinculado, com visão, simpático', () => {
    for (const d of pack('carga-runners')) {
      expect(JSON.stringify(d.items)).not.toMatch(/"source":"(cache|portao)"/);
      expect(d.prototypeToken).toMatchObject({ actorLink: true, disposition: 1, sight: { enabled: true } });
      expect(d.flags['sombraneon-carga-sem-nome'].pregen).toBe(true);
    }
    const tijolo = byId('carga-runners', 'tijolo').items.filter((i) => i.type !== 'class');
    expect(tijolo.find((i) => i.identifier === 'carregador').system.quantity).toBe(2);
    expect(tijolo.find((i) => i.identifier === 'granada-de-fragmentacao')).toBeTruthy();
  });
});

describe('itens, tesouros e Prêmio', () => {
  const loot = (id) => byId('carga-tesouros', id).flags['sombraneon-carga-sem-nome'].butim;

  it('o butim soma 9 XP: Prêmio 3, rastreador 3, cartão 1, caderneta 1, núcleo 1 (a célula é Sucata)', () => {
    const xp = Object.fromEntries(pack('carga-tesouros').map((i) => [i.identifier, i.flags['sombraneon-carga-sem-nome'].butim.xp]));
    expect(xp).toEqual({ 'item-nest': 3, 'item-rastreador-b': 3, 'item-cartao-comando': 1, 'item-caderneta': 1, 'item-celula-militar': 0, 'item-nucleo-cerbero': 1 });
    expect(Object.values(xp).reduce((a, b) => a + b, 0)).toBe(9);
    expect(loot('item-nest').categoria).toBe('Valioso');
    expect(loot('item-celula-militar').categoria).toBe('Sucata');
    for (const i of pack('carga-tesouros')) {
      const b = i.flags['sombraneon-carga-sem-nome'].butim;
      expect(Object.keys(b).sort()).toEqual(['categoria', 'como', 'digital', 'onde', 'slots', 'venda', 'xp']);
      expect(b.digital).toBe(false);
      expect(i.flags.sombraneon.loot).toEqual({ category: b.categoria === 'Valioso' ? 'Valioso' : b.categoria, xp: b.xp });
    }
  });

  it('o Furgão e as motos são veículos com os números do texto', () => {
    const f = byId('carga-equipamentos', 'item-furgao-tavares').system;
    expect(f.vehicle).toMatchObject({ ac: 11, hp: 30, bl: 1, maneuver: 0, speed: 'Normal', passengers: '1+5', cargo: 20 });
    expect(f.price).toBe(12000);
    const m = byId('carga-equipamentos', 'item-motos-tavares').system;
    expect(m.quantity).toBe(2);
    expect(m.vehicle).toMatchObject({ ac: 12, hp: 10, bl: 0, maneuver: 3, speed: 'Rápida' });
  });

  it('preços e slots do capítulo 13', () => {
    const e = (id) => byId('carga-equipamentos', id).system;
    expect([e('item-tapete-espinhos').slots, e('item-tapete-espinhos').price]).toEqual([2, 150]);
    expect([e('item-carga-demolicao').slots, e('item-carga-demolicao').price]).toEqual([2, 500]);
    expect([e('item-macarico-brecha').price, e('item-manta-faraday').price, e('item-radio-interceptor').price]).toEqual([300, 50, 200]);
    expect(e('item-kit-resgate').slots).toBe(3);
    expect(e('item-granadas').quantity).toBe(2);
    expect(byId('carga-equipamentos', 'item-granadas').flags['sombraneon-carga-sem-nome'].nota).toContain('Granada EMP');
  });
});

describe('cenas (mapas)', () => {
  const scenes = pack('carga-cenas');
  const SIZES = { 'mapa-01': [30, 20], 'mapa-02': [30, 20], 'mapa-03': [36, 24], 'mapa-04': [36, 24], 'mapa-05': [36, 24] };
  const ameacasPorMapa = { 'mapa-01': 4, 'mapa-02': 10, 'mapa-03': 3, 'mapa-04': 16, 'mapa-05': 4 };

  it('cinco scenes com a grade de 1,5 m (100 px), fundo na proporção da arte e navegação em ordem', () => {
    expect(scenes.map((s) => s.identifier)).toEqual(Object.keys(SIZES));
    scenes.forEach((s, i) => {
      const [cols, rows] = SIZES[s.identifier];
      expect({ w: s.width, h: s.height }, s.name).toEqual({ w: cols * 100, h: rows * 100 });
      expect(s.grid).toMatchObject({ type: 1, size: 100, distance: 1.5, units: 'm' });
      expect(s).toMatchObject({ tokenVision: true, fogExploration: true, globalLight: false, navigation: true, navOrder: i + 1 });
      const { width, height } = imageSize(path.join(ROOT, s.background));
      expect(Math.abs(width / height - s.width / s.height) < 0.06, s.name).toBe(true);
      expect(s.navName).toMatch(new RegExp(`^${i + 1}\\. `));
      expect(s.initial.scale).toBeGreaterThan(0);
    });
  });

  it('tokens: ameaças e NPCs do inventário mais os seis runners, todos ligados a um ator que existe', () => {
    const actors = new Set([...pack('carga-ameacas'), ...pack('carga-npcs'), ...pack('carga-runners')].map((d) => d.identifier));
    for (const s of scenes) {
      expect(s.tokens.length, s.name).toBe(ameacasPorMapa[s.identifier] + 6);
      expect(s.tokens.filter((t) => t.runner), s.name).toHaveLength(6);
      for (const t of s.tokens) {
        const ref = t.flags['sombraneon-carga-sem-nome'].ref;
        expect(ref, t.name).toMatch(/^@Ref\[carga-(ameacas|npcs|runners)\/[a-z0-9-]+\]$/);
        expect(actors.has(ref.split('/')[1].replace(']', '')), t.name).toBe(true);
        expect(fs.existsSync(path.join(ROOT, t.texture)), t.texture).toBe(true);
      }
    }
  });

  it('tudo cai dentro da cena: paredes, portas, luzes, tokens, pins e regiões', () => {
    for (const s of scenes) {
      const inside = (x, y) => x >= 0 && y >= 0 && x <= s.width && y <= s.height;
      for (const w of s.walls) expect(inside(w.c[0], w.c[1]) && inside(w.c[2], w.c[3]), `${s.name} parede ${w.c}`).toBe(true);
      for (const l of s.lights) expect(inside(l.x, l.y), `${s.name} luz`).toBe(true);
      for (const t of s.tokens) expect(inside(t.x + 1, t.y + 1) && inside(t.x + t.width * 100 - 1, t.y + t.height * 100 - 1), `${s.name} ${t.name}`).toBe(true);
      for (const n of s.notes) expect(inside(n.x, n.y), `${s.name} pin`).toBe(true);
      for (const r of s.regions) for (const sh of r.shapes) expect(inside(sh.x, sh.y) && inside(sh.x + sh.width, sh.y + sh.height), `${s.name} ${r.name}`).toBe(true);
    }
  });

  it('as portas do Anexo A, com estado e CD', () => {
    const door = (n, id) => scenes[n - 1].walls.find((w) => w.flags['sombraneon-carga-sem-nome']?.id === id);
    const f = (w) => w.flags['sombraneon-carga-sem-nome'];
    expect([door(1, 'porta-portao').ds, f(door(1, 'porta-portao')).cd]).toEqual([2, 12]);
    expect(door(1, 'porta-galpao').ds).toBe(1);
    expect(door(1, 'muro-baixo').door).toBeUndefined();
    expect(f(door(1, 'muro-baixo')).tipo).toBe('janela');
    for (const id of ['escotilha-cela-a', 'escotilha-cela-b']) expect([door(2, id).ds, f(door(2, id)).cd]).toEqual([0, 18]);
    expect(door(2, 'porta-oficina').ds).toBe(2);
    expect([door(2, 'porta-canil').ds, f(door(2, 'porta-canil')).cd]).toEqual([2, 18]);
    expect(door(3, 'rampa-aqueduto').ds).toBe(1);
    expect(door(3, 'porta-manutencao').ds).toBe(2);
    expect(door(4, 'porta-canil').ds).toBe(2);
    for (const id of ['porta-cela-a', 'porta-cela-b']) expect([door(4, id).ds, f(door(4, id)).cd]).toEqual([2, 18]);
    expect([door(4, 'porta-servico').ds, f(door(4, 'porta-servico')).cd]).toEqual([2, 15]);
    expect(door(4, 'porta-dutos').ds).toBe(0);
    expect(door(5, 'cancela-pedagio').ds).toBe(0);
    expect(door(5, 'galpao-docas').ds).toBe(1);
  });

  it('mapa 4: o Cérbero, os droids, Daigo e Nest começam ocultos; Daigo na Cela A (leste) e Nest na Cela B (oeste)', () => {
    const t = scenes[3].tokens;
    for (const name of ['Cérbero', 'Droid de combate 1', 'Droid de combate 2', 'Daigo Okabe (Cela A)', 'Nest (Cela B)']) expect(t.find((x) => x.name === name).hidden, name).toBe(true);
    const daigo = t.find((x) => x.name.startsWith('Daigo'));
    const nest = t.find((x) => x.name.startsWith('Nest'));
    expect(daigo.x).toBeGreaterThan(nest.x);
    expect(t.find((x) => x.name === 'Jararaca').flags['sombraneon-carga-sem-nome'].ref).toContain('carga-ameacas/jararaca');
    expect(scenes[1].tokens.find((x) => x.name.startsWith('Cérbero')).hidden).toBe(true);
    expect(t.filter((x) => x.name.startsWith('Droid')).every((x) => x.flags['sombraneon-carga-sem-nome'].tag === 'droid')).toBe(true);
  });

  it('mapa 4: zona morta da torre, pilares, passarela e o canil marcados nas regiões e nas portas', () => {
    const names = scenes[3].regions.map((r) => r.name).join('|');
    for (const part of ['Zona morta oeste', 'Zona morta leste', 'Pilar NO', 'Pilar NE', 'Pilar SO', 'Pilar SE', 'Passarela elevada', 'Carcaças do bloqueio']) expect(names).toContain(part);
    const tags = (n) => scenes[3][n].map((x) => x.flags['sombraneon-carga-sem-nome']?.tag).filter(Boolean);
    expect(tags('walls')).toEqual(expect.arrayContaining(['canil', 'cela-a', 'cela-b', 'painel']));
    expect(tags('lights').filter((t) => t === 'emergencia').length).toBeGreaterThan(2);
  });

  it('todo pin aponta para uma página que existe no diário da sala', () => {
    for (const s of scenes) {
      for (const n of s.notes) {
        const [entry, page] = n.flags['sombraneon-carga-sem-nome'].pagina.split('#');
        const journal = byId('carga-diarios', entry);
        expect(journal, `${s.name}: ${n.text}`).toBeTruthy();
        expect(journal.pages.map((p) => p.identifier), `${s.name}: ${n.text}`).toContain(page);
        expect(n.flags['sombraneon-carga-sem-nome'].pin).toBe(`@Ref[carga-diarios/${n.flags['sombraneon-carga-sem-nome'].pagina}]`);
      }
    }
    expect(scenes.map((s) => s.notes.length)).toEqual([4, 7, 4, 6, 4]);
  });

  it('a disposição das ameaças do texto concorda com os tokens de cada mapa', () => {
    const counts = (s) => s.tokens.reduce((m, t) => ({ ...m, [t.flags['sombraneon-carga-sem-nome'].ref.split('/')[1].replace(']', '')]: (m[t.flags['sombraneon-carga-sem-nome'].ref.split('/')[1].replace(']', '')] ?? 0) + 1 }), {});
    const c1 = counts(pack('carga-cenas')[0]);
    expect([c1['capanga-caes'], c1['atirador-caes'], c1.tavares]).toEqual([2, 1, 1]);
    const c2 = counts(pack('carga-cenas')[1]);
    expect([c2['policial-urbano'], c2.jararaca, c2['torre-50'], c2['sargento-teixeira'], c2['motorista-jararaca'], c2.cerbero]).toEqual([4, 1, 1, 1, 1, 1]);
    const c4 = counts(pack('carga-cenas')[3]);
    expect([c4['droid-combate'], c4['policial-urbano'], c4['viatura-guarda'], c4.cerbero, c4['daigo-okabe'], c4.nest]).toEqual([2, 4, 2, 1, 1, 1]);
    const c5 = counts(pack('carga-cenas')[4]);
    expect([c5['viatura-guarda'], c5['suv-aegis'], c5['drone-falcao']]).toEqual([2, 1, 1]);
  });

  it('as definições vêm do Anexo A: mesmos ids de porta onde a arte tem a porta', () => {
    const ids = (n) => MAP_DEFS[n - 1].portas.map((d) => d.id);
    expect(ids(1)).toEqual(['porta-portao', 'porta-galpao', 'muro-baixo']);
    expect(ids(4)).toEqual(expect.arrayContaining(['boca-norte', 'saida-sul', 'porta-dutos', 'porta-bombas', 'porta-canil', 'porta-cela-a', 'porta-cela-b']));
  });
});

describe('diários', () => {
  const journals = pack('carga-diarios');

  it('onze diários na ordem de uso, com o Briefing e o FAQ legíveis (observador) e o resto só do Mestre', () => {
    expect(journals.map((j) => j.identifier)).toEqual(['00-leia-primeiro', '01-o-alerta', '02-briefing-e-faq', 'sala-1', 'sala-2', 'sala-3', 'sala-4', 'sala-5', '08-debrief', '09-cortes-e-ajuste-de-nivel', '10-notas-de-teste']);
    for (const j of journals) expect(j.ownership.default, j.identifier).toBe(j.identifier === '02-briefing-e-faq' ? 2 : 0);
    const brief = journals[2];
    const player = brief.pages.filter((p) => p.ownership.default === 2).map((p) => p.identifier);
    expect(player).toEqual(expect.arrayContaining(['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'handouts-do-briefing']));
    for (const p of brief.pages.filter((x) => !player.includes(x.identifier))) expect(p.ownership.default, p.identifier).toBe(0);
  });

  it('o segredo do Mestre não vaza: a verdade fica em section.secret e as notas "Mestre:" do FAQ também', () => {
    const truth = journals[0].pages.find((p) => p.identifier === 'a-verdade').text.content;
    expect(truth.startsWith('<section class="secret">')).toBe(true);
    for (const p of journals[2].pages.filter((x) => /^p\d+$/.test(x.identifier))) {
      const html = p.text.content;
      expect(html, p.identifier).toContain('class="secret"');
      expect(html.replace(/<section class="secret">[\s\S]*?<\/section>/g, ''), p.identifier).not.toMatch(/<strong>Mestre:/);
    }
  });

  it('as aberturas das salas e as respostas do FAQ usam a caixa "Para ler"', () => {
    for (const id of ['sala-1', 'sala-2', 'sala-3', 'sala-4', 'sala-5']) expect(byId('carga-diarios', id).pages[0].text.content, id).toContain('<blockquote class="para-ler">');
    expect(journals[2].pages.find((p) => p.identifier === 'p1').text.content).toContain('<blockquote class="para-ler">');
  });

  it('cada sala tem o cabeçalho de links, a disposição das ameaças, as resoluções, as complicações, o butim e o que fazer se atrasar', () => {
    for (const id of ['sala-1', 'sala-2', 'sala-3', 'sala-4', 'sala-5']) {
      const j = byId('carga-diarios', id);
      const ids = j.pages.map((p) => p.identifier);
      for (const part of ['abertura', 'disposicao-das-ameacas', 'complicacoes', 'butim', 'se-atrasar', 'imagens-e-mapa-desta-sala']) {
        if (id === 'sala-5' && part === 'complicacoes') continue;
        if (id === 'sala-4' && part === 'complicacoes') continue;
        expect(ids, `${id} ${part}`).toContain(part);
      }
      expect(ids.some((x) => x.startsWith('possiveis-resolucoes') || x.startsWith('4-a-fuga')), id).toBe(true);
      expect(j.pages[0].text.content).toMatch(/@Ref\[carga-cenas\/mapa-0\d\]/);
      expect(j.pages[0].text.content).toMatch(/@Ref\[carga-(ameacas|npcs)\//);
    }
  });

  it('a Sala 4 traz os contadores (torre, Beta, cabeças do Cérbero), o mostrador e o apagão', () => {
    const s4 = byId('carga-diarios', 'sala-4');
    const html = s4.pages.find((p) => p.identifier === 'contadores-do-combate').text.content;
    expect(html).toContain('Rajada 3');
    expect(html).toContain('Recarga');
    expect(html).toContain('8 reforço (pneu)');
    expect(html).toContain('10 reforço (rádio)');
    expect((html.match(/Choque \(taser\)|Chumbo \(minicanhão\)|Chama</g) ?? []).length).toBeGreaterThanOrEqual(3);
    expect(html).toContain('Brutal');
    expect(s4.pages.map((p) => p.identifier)).toContain('apagao-do-tunel');
    expect(byId('carga-diarios', 'sala-2').pages.map((p) => p.identifier)).toContain('relogio-do-posto');
    expect(byId('carga-diarios', 'sala-3').pages.map((p) => p.identifier)).toContain('folga-contador');
    expect(byId('carga-diarios', 'sala-5').pages.map((p) => p.identifier)).toContain('faixas-da-perseguicao');
  });

  it('o ajuste de nível 3 só está documentado (sem atores Mk II)', () => {
    const cuts = byId('carga-diarios', '09-cortes-e-ajuste-de-nivel');
    expect(cuts.pages.find((p) => p.identifier === 'ajuste-para-nivel-3').text.content).toContain('Mk II');
    expect([...pack('carga-ameacas'), ...pack('carga-npcs')].some((d) => /Mk II/.test(d.name))).toBe(false);
  });

  it('nada de arquivos que não vêm no módulo, de marcação Markdown solta ou de travessão', () => {
    const text = JSON.stringify(CARGA_PACKS.map((p) => p.docs));
    expect(text).not.toMatch(/carga-sem-nome-(imagens|foundry-instrucoes)\.md/);
    expect(text).not.toMatch(/[–—]/);
    for (const j of journals) for (const p of j.pages) expect(p.text.content, `${j.identifier}/${p.identifier}`).not.toMatch(/\*\*|\n#{1,4} /);
  });

  it('todo link @Ref e @Pack dos documentos do módulo resolve', () => {
    for (const p of CARGA_PACKS) for (const d of p.docs) expect(() => resolver.deep(JSON.parse(JSON.stringify(d)), `${p.name}/${d.identifier}`), `${p.name}/${d.identifier}`).not.toThrow();
  });
});

describe('imagens', () => {
  it('41 imagens (35 + 6 retratos) mais 5 mapas, todos com arquivo', () => {
    expect(ALL_ART).toHaveLength(46);
    for (const a of ALL_ART) expect(fs.existsSync(path.join(ROOT, a.path)), a.path).toBe(true);
    expect(ALL_ART.filter((a) => a.kind === 'retrato')).toHaveLength(6);
  });

  it('os handouts vêm com acesso de observador e as imagens "só Mestre" mantêm o "Para ler" escondido', () => {
    const j = (id) => byId('carga-imagens', id);
    for (const id of HANDOUTS) {
      expect(j(id).ownership.default, id).toBe(2);
      expect(j(id).flags['sombraneon-carga-sem-nome'].observer).toBe(true);
    }
    for (const a of IMAGES.filter((x) => !HANDOUTS.includes(x.id))) expect(j(a.id).ownership.default, a.id).toBe(0);
    for (const id of GM_ONLY) expect(j(id).pages.find((p) => p.identifier === 'ler').ownership.default, id).toBe(0);
    expect(j('img-01').pages.map((p) => p.identifier)).toEqual(['imagem', 'ler', 'notas', 'prompt']);
    expect(j('img-01').pages[0].src).toContain('assets/img/img-01-ruth-e-a-rota.jpg');
  });
});

describe('tabelas', () => {
  const tables = pack('carga-tabelas');
  const span = { '1d3': 3, '1d4': 4, '1d6': 6 };

  it('oito tabelas cobrem todos os valores, sem lacuna nem sobreposição', () => {
    expect(tables.map((t) => t.identifier)).toEqual(['complicacoes-sala-1', 'complicacoes-sala-2', 'complicacoes-sala-3', 'eventos-do-combate-sala-4', 'complicacoes-da-fuga-sala-5', 'alerta', 'resolucoes-da-perseguicao', 'destino-de-daigo']);
    for (const t of tables) {
      for (let v = 1; v <= span[t.formula]; v++) expect(t.results.filter((r) => v >= r.range[0] && v <= r.range[1]), `${t.identifier} ${v}`).toHaveLength(1);
      expect(t.replacement && t.displayRoll).toBe(true);
    }
  });

  it('a fuga inclui a voz de Voss; os eventos da Sala 4 incluem o grito de Daigo; o texto é o integral', () => {
    const fuga = tables.find((t) => t.identifier === 'complicacoes-da-fuga-sala-5');
    expect(fuga.results.some((r) => /Voss/.test(r.name))).toBe(true);
    expect(tables.find((t) => t.identifier === 'eventos-do-combate-sala-4').results.some((r) => /Daigo/.test(r.name))).toBe(true);
    expect(tables.find((t) => t.identifier === 'complicacoes-sala-1').results[0].text).toContain('SAB CD 12');
    expect(tables.find((t) => t.identifier === 'resolucoes-da-perseguicao').results.every((r) => /CD 12/.test(r.text))).toBe(true);
  });
});

describe('macros e a API do módulo', () => {
  const api = /module\.api = \{([^}]*)\}/.exec(script)[1].split(',').map((x) => x.trim());

  it('todo macro chama uma função que existe na API', () => {
    expect(cargaMacros).toHaveLength(23);
    for (const m of cargaMacros) {
      const fn = /\.api\.(\w+)\(/.exec(m.command)[1];
      expect(api, m.name).toContain(fn);
      expect(m.command).toContain("game.modules.get('sombraneon-carga-sem-nome').api");
    }
  });

  it('os textos do Alerta do macro são os da tabela da aventura', () => {
    const block = /export const ALERTA = (\{[\s\S]*?\n\});/.exec(script)[1];
    const alerta = new Function(`return ${block}`)();
    const rows = section(2, 'O Alerta').body.split('\n').filter((l) => /^\| [1-4] \|/.test(l));
    expect(rows).toHaveLength(4);
    for (const row of rows) {
      const [, level, text] = /^\| (\d) \| (.*) \|$/.exec(row);
      const want = strip(text.replace(/\*\*/g, ''));
      expect(strip(alerta[level]).startsWith(want.replace(/ A Aegis não ajuda\.$/, '')), `Alerta ${level}`).toBe(true);
    }
  });

  it('o script não usa travessão e registra as configurações do mundo', () => {
    expect(script).not.toMatch(/[–—]/);
    for (const key of ['relogio', 'folga', 'posto', 'torre', 'beta', 'betaAlvo', 'cabecas', 'mostrador', 'cronometro']) expect(script).toContain(`reg('${key}'`);
  });
});
