import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { calls, setRng } from '../stub/env.mjs';
import { setup, dialogs } from '../stub/setup.mjs';

/**
 * Livro v0.5 e compêndios companheiros: veículos, Blindagem, Moral, avisos de cromo e conteúdo novo.
 */
let E;
let M;
const uuidOf = (type, identifier) => M.compendium.CompendiumIndex.resolve(type, identifier).uuid;
const doc = (type, id) => globalThis.__registry.get(uuidOf(type, id));

beforeAll(async () => {
  E = await setup();
  M = E.M;
});

beforeEach(() => {
  dialogs.queue.length = 0;
  calls.messages.length = 0;
  calls.settings.purchaseMode = 'free';
  setRng(() => 0.5);
});

const pack = (name) => E.content.PACKS.find((p) => p.name === name).docs;

describe('aviso de implantes no mesmo slot', () => {
  it('só avisa quando há mesmo dois implantes instalados no slot, e diz quais', async () => {
    const a = E.blank();
    dialogs.queue.push({ quality: 'street', clinic: false });
    await M.drop.dropItem(a, doc('implant', 'subderme-blindada'));
    dialogs.queue.push({ quality: 'street', clinic: false });
    await M.drop.dropItem(a, doc('implant', 'arma-retratil'));
    expect(a.system.warnings.filter((w) => w.code === 'slotOccupied')).toEqual([]);

    // força um segundo implante instalado no corpo
    dialogs.queue.push({ quality: 'street', clinic: false }, false);
    await M.drop.dropItem(a, doc('implant', 'coracao-cibernetico'));
    expect(a.system.warnings.filter((w) => w.code === 'slotOccupied')).toEqual([]);
    const second = a.items.find((i) => i.system.identifier === 'coracao-cibernetico');
    expect(second.system.installed).toBe(false);
    await second.update({ 'system.installed': true });
    const warn = a.system.warnings.filter((w) => w.code === 'slotOccupied');
    expect(warn).toHaveLength(1);
    expect(warn[0].args.slot).toBe('body');
    expect(warn[0].args.names).toContain('Subderme blindada');
    expect(warn[0].args.names).toContain('Coração cibernético');
  });

  it('pregens do livro não geram aviso de slot', () => {
    for (const actor of Object.values(E.actors)) {
      expect(actor.system.warnings.filter((w) => w.code === 'slotOccupied'), actor.name).toEqual([]);
    }
  });
});

describe('treino em veículos (livro 4.7)', () => {
  const trained = (a) => ['light', 'medium', 'heavy', 'mecha'].filter((c) => a.system.vehicles[c]);

  it('classe define o treino base', async () => {
    const solo = E.blank();
    dialogs.queue.push('pistols');
    await M.grants.applySelection(solo, 'class', uuidOf('class', 'solo'));
    expect(trained(solo)).toEqual(['light', 'medium', 'heavy', 'mecha']);

    const net = E.blank();
    await M.grants.applySelection(net, 'class', uuidOf('class', 'netrunner'), { suppressPrompts: true, picks: { programs: ['ping', 'backdoor'] } });
    expect(trained(net)).toEqual(['light']);
  });

  it('antecedentes somam treino e o treino pago também', async () => {
    const net = E.blank();
    await M.grants.applySelection(net, 'class', uuidOf('class', 'netrunner'), { suppressPrompts: true, picks: { programs: ['ping', 'backdoor'] } });
    await M.grants.applySelection(net, 'background', uuidOf('background', 'piloto-de-transporte'));
    expect(trained(net)).toEqual(['light', 'medium', 'heavy']);
    await net.update({ 'system.vehicleTraining': ['mecha'] });
    expect(trained(net)).toEqual(['light', 'medium', 'heavy', 'mecha']);
  });

  it('o Rigger ganha Interface veicular e Mecânico de campo', async () => {
    const a = E.blank();
    await M.grants.applySelection(a, 'class', uuidOf('class', 'rigger'));
    const features = a.items.filter((i) => i.type === 'feature').map((i) => i.system.identifier);
    expect(features).toContain('interface-veicular');
    expect(features).toContain('mecanico-de-campo');
  });
});

describe('Blindagem (BL)', () => {
  const npc = (armor) => {
    const a = new M.SNActor({ _id: `npc${Math.random().toString(36).slice(2, 6)}`, name: 'Alvo', type: 'npc', img: 'x.svg', system: { hp: { value: 30, max: 30 }, armor }, items: [] });
    a.loadItems(M.SNItem);
    return a;
  };

  it('reduz o dano de armas comuns', async () => {
    const a = npc(3);
    expect(await a.applyDamage(5)).toBe(2);
    expect(a.system.hp.value).toBe(28);
    expect(await a.applyDamage(2)).toBe(0);
  });

  it('armas Pesadas ignoram a Blindagem', async () => {
    const a = npc(5);
    expect(await a.applyDamage(8, { heavy: true })).toBe(8);
    expect(a.system.hp.value).toBe(22);
  });

  it('personagens não têm BL', async () => {
    const a = E.blank();
    await a.update({ 'system.hp.value': 10 });
    expect(await a.applyDamage(4)).toBe(4);
  });
});

describe('conteúdo dos compêndios companheiros', () => {
  it('traz 46 fichas, 10 veículos e mechas hostis, a torreta e 7 IAs', () => {
    const npcs = pack('ameacas');
    expect(npcs.filter((n) => !['IAs', 'Veículos e mechas'].includes(n.folder))).toHaveLength(46);
    expect(npcs.filter((n) => n.folder === 'Veículos e mechas')).toHaveLength(11);
    expect(npcs.filter((n) => n.folder === 'IAs')).toHaveLength(7);
  });

  it('as fichas conferem com os valores do livro', () => {
    const by = (name) => pack('ameacas').find((n) => n.name === name).system;
    const capanga = by('Capanga');
    expect([capanga.level, capanga.hp.max, capanga.ac, capanga.morale.kind, capanga.morale.cd]).toEqual([1, 5, 12, 'weak', 18]);
    const tita = by('Mecha Titã');
    expect([tita.level, tita.hp.max, tita.ac, tita.armor]).toEqual([10, 220, 17, 8]);
    expect(tita.attacks.every((x) => x.heavy)).toBe(true);
    expect(by('Brutamontes cromado').armor).toBe(1);
    expect(by('Ciberpsicopata').morale.enabled).toBe(false);
    expect(by('Atirador de elite').morale.cd).toBe(15);
  });

  it('26 veículos, 8 mechas, 3 exoesqueletos e 18 módulos', () => {
    const items = pack('veiculos');
    const veh = items.filter((i) => i.system.category === 'vehicle');
    expect(veh.filter((i) => ['light', 'medium', 'heavy'].includes(i.system.vehicle.category))).toHaveLength(26);
    expect(veh.filter((i) => i.folder === 'Mechas')).toHaveLength(8);
    expect(veh.filter((i) => i.folder === 'Exoesqueletos')).toHaveLength(3);
    expect(items.filter((i) => i.system.category === 'vehicle-module')).toHaveLength(18);
    const apc = items.find((i) => i.identifier === 'blindado-de-transporte-apc');
    expect(apc.system.vehicle).toMatchObject({ category: 'heavy', ac: 15, hp: 90, bl: 5, maneuver: -1, speed: 'Normal', hardpoints: '1M + 1L', license: 'M' });
    expect(apc.system.price).toBe(220000);
  });

  it('armas pesadas, armas montadas e explosivos', () => {
    const weapons = pack('armas');
    expect(weapons.filter((w) => w.folder === 'Armas pesadas pessoais')).toHaveLength(10);
    expect(weapons.filter((w) => w.system.properties.includes('mounted'))).toHaveLength(15);
    const rocket = weapons.find((w) => w.identifier === 'lanca-foguetes').system;
    expect(rocket.damage).toBe('3d8');
    expect(rocket.properties).toContain('heavyWeapon');
    expect(rocket.properties).not.toContain('burst');
    expect(pack('equipamento').filter((g) => g.system.category === 'explosive')).toHaveLength(8);
  });

  it('ICE adicional e malware', () => {
    const ice = pack('ice');
    expect(ice).toHaveLength(17);
    const hidra = ice.find((i) => i.name === 'Hidra').system;
    expect([hidra.level, hidra.hp.max, hidra.attack.count]).toEqual([5, 36, 3]);
    expect(ice.filter((i) => i.system.networkRole === 'malware')).toHaveLength(5);
  });

  it('tabelas do Mestre e geradores de missão cobrem todos os valores', () => {
    const all = [...pack('tabelas'), ...pack('tabelas-do-mestre')];
    const span = { '1d6': 6, '1d8': 8, '1d12': 12, '1d20': 20 };
    for (const t of all) {
      const n = span[t.formula];
      if (!n) continue;
      for (let v = 1; v <= n; v++) expect(t.results.filter((r) => v >= r.range[0] && v <= r.range[1]), `${t.identifier} ${v}`).toHaveLength(1);
    }
    for (const id of ['missao-contratante', 'missao-tipo', 'missao-local', 'missao-complicacao', 'farra']) expect(all.some((t) => t.identifier === id), id).toBe(true);
  });

  it('a nova linha de reação por facção está nos alinhamentos', () => {
    const rows = Object.fromEntries(pack('alinhamentos').map((a) => [a.identifier, a.system.reaction.mercenaries]));
    expect(rows).toEqual({ controle: 0, sobrevivencia: 1, liberdade: 0 });
  });

  it('o livro de regras tem 12 capítulos e os compêndios de referência estão no módulo', () => {
    expect(pack('regras')[0].pages).toHaveLength(12);
    expect(pack('referencias').map((j) => j.identifier)).toEqual(['compendio-de-ameacas', 'compendio-de-veiculos-e-armamento']);
    for (const j of pack('referencias')) expect(j.pages.length).toBeGreaterThan(5);
  });
});

describe('fichas dos compêndios companheiros renderizam sem erro', () => {
  it('todas as ameaças e ICE abrem na ficha', async () => {
    const { default: Handlebars } = await import('handlebars');
    const fs = await import('node:fs');
    const path = await import('node:path');
    const { ROOT } = await import('../../tools/lib/book.mjs');
    const compile = (rel) => Handlebars.compile(fs.readFileSync(path.join(ROOT, 'systems/sombraneon/templates', rel), 'utf8'));
    const npcTpl = compile('actor/npc.hbs');
    const iceTpl = compile('actor/ice.hbs');
    const bad = [/SOMBRANEON\./, /undefined/, /NaN/, /\[object Object\]/];
    for (const def of [...pack('ameacas'), ...pack('ice')]) {
      const actor = new M.SNActor({ ...def, _id: def.identifier, items: [] }).loadItems(M.SNItem);
      const Sheet = def.type === 'npc' ? M.other.SNNpcSheet : M.other.SNIceSheet;
      const html = (def.type === 'npc' ? npcTpl : iceTpl)(await new Sheet({ document: actor })._prepareContext({}));
      for (const re of bad) expect(re.exec(html)?.[0], `${def.name}: ${re}`).toBeUndefined();
    }
  });
});

describe('fichas novas e subir de nível', () => {
  it('uma ficha em branco já nasce com os derivados preparados', () => {
    const a = E.blank();
    expect(a.system.xp.next).toBe(10);
    expect(a.sn).not.toBeNull();
  });

  it('o botão Subir de nível aparece mesmo sem XP suficiente', async () => {
    const { default: Handlebars } = await import('handlebars');
    const fs = await import('node:fs');
    const path = await import('node:path');
    const { ROOT } = await import('../../tools/lib/book.mjs');
    const a = E.blank();
    const sheet = new M.sheets.SNCharacterSheet({ document: a });
    const ctx = await sheet._prepareContext({});
    expect(ctx.xp.ready).toBe(false);
    const html = Handlebars.compile(fs.readFileSync(path.join(ROOT, 'systems/sombraneon/templates/actor/character.hbs'), 'utf8'))(ctx);
    expect(html).toContain('data-action="levelUp"');
    expect(html).toContain('sn-disabled" data-action="levelUp"');
  });

  it('documentos do sistema não usam membros privados (o Foundry prepara os dados dentro do construtor)', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const { ROOT } = await import('../../tools/lib/book.mjs');
    const dir = path.join(ROOT, 'systems/sombraneon/src/documents');
    for (const f of fs.readdirSync(dir)) {
      const src = fs.readFileSync(path.join(dir, f), 'utf8');
      expect(/(^|[^\w'"`/])#[a-zA-Z_]\w*/m.exec(src)?.[0], f).toBeUndefined();
    }
  });
});
