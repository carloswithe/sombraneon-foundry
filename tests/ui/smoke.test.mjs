import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import Handlebars from 'handlebars';
import { calls, setRng } from '../stub/env.mjs';
import { setup } from '../stub/setup.mjs';
import { ROOT } from '../../tools/lib/book.mjs';

/**
 * Testes de fumaça do runtime: carregam o código do sistema contra um Foundry simulado,
 * conferem o esquema dos dados, renderizam todas as fichas e templates e rodam as rolagens.
 */
let M = {};
let content;
const actors = {};

const compiled = new Map();
const render = (rel, ctx) => {
  if (!compiled.has(rel)) compiled.set(rel, Handlebars.compile(fs.readFileSync(path.join(ROOT, 'systems/sombraneon/templates', rel), 'utf8')));
  return compiled.get(rel)(ctx);
};
const BAD = [/SOMBRANEON\./, /undefined/, /NaN/, /\[object Object\]/];
const assertClean = (html, label) => {
  for (const re of BAD) {
    const m = re.exec(html);
    expect(m, `${label}: encontrou "${m?.[0]}" perto de "${m ? html.slice(Math.max(0, m.index - 80), m.index + 80).replace(/\s+/g, ' ') : ''}"`).toBeNull();
  }
};
const text = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

beforeAll(async () => {
  const env = await setup();
  M = env.M;
  content = env.content;
  Object.assign(actors, env.actors);
});

describe('esquema dos dados', () => {
  const walk = (field, value, where, errors) => {
    const k = field.kind;
    if (value === null || value === undefined) {
      if (!field.options?.nullable && k !== 'ObjectField' && field.options?.required !== false) errors.push(`${where}: nulo`);
      return;
    }
    if (k === 'SchemaField') {
      for (const key of Object.keys(value)) {
        if (!(key in field.fields)) errors.push(`${where}.${key}: campo desconhecido no esquema`);
        else walk(field.fields[key], value[key], `${where}.${key}`, errors);
      }
    } else if (k === 'ArrayField') {
      if (!Array.isArray(value)) errors.push(`${where}: esperava lista`);
      else value.forEach((v, i) => walk(field.element, v, `${where}[${i}]`, errors));
    } else if (k === 'NumberField' && typeof value !== 'number') errors.push(`${where}: esperava número, veio ${typeof value}`);
    else if ((k === 'StringField' || k === 'HTMLField') && typeof value !== 'string') errors.push(`${where}: esperava texto, veio ${typeof value}`);
    else if (k === 'BooleanField' && typeof value !== 'boolean') errors.push(`${where}: esperava booleano`);
  };

  it('todo item do conteúdo respeita o esquema do tipo', () => {
    const errors = [];
    for (const pack of content.PACKS.filter((p) => p.docType === 'Item')) {
      for (const d of pack.docs) {
        const Model = M.itemData.ITEM_MODELS[d.type];
        if (!Model) {
          errors.push(`${d.identifier}: tipo ${d.type} sem modelo`);
          continue;
        }
        const schema = new foundry.data.fields.SchemaField(Model.defineSchema());
        walk(schema, d.system, `${pack.name}/${d.identifier}`, errors);
      }
    }
    expect(errors).toEqual([]);
  });

  it('os atores do conteúdo respeitam o esquema do tipo', () => {
    const errors = [];
    for (const pack of content.PACKS.filter((p) => p.docType === 'Actor')) {
      for (const d of pack.docs) {
        const schema = new foundry.data.fields.SchemaField(M.actorData.ACTOR_MODELS[d.type].defineSchema());
        walk(schema, d.system, `${pack.name}/${d.identifier}`, errors);
        for (const it of d.items ?? []) {
          const s = new foundry.data.fields.SchemaField(M.itemData.ITEM_MODELS[it.type].defineSchema());
          walk(s, it.system, `${pack.name}/${d.identifier}/${it.identifier}`, errors);
        }
      }
    }
    expect(errors).toEqual([]);
  });
});

describe('documentos (fichas prontas)', () => {
  const expected = {
    Brasa: { hp: 10, ac: 13, slots: 17 },
    Vetor: { hp: 4, ac: 11, slots: 10 },
    Sutura: { hp: 7, ac: 11, slots: 10 },
    Névoa: { hp: 4, ac: 14, slots: 10 },
    Riff: { hp: 6, ac: 12, slots: 10 },
    Zangão: { hp: 7, ac: 14, slots: 10 }
  };
  for (const [name, e] of Object.entries(expected)) {
    it(`${name}: HP, CA e slots derivados`, () => {
      const a = actors[name];
      expect(a.system.hp.max).toBe(e.hp);
      expect(a.system.ac.value).toBe(e.ac);
      expect(a.system.slots.max).toBe(e.slots);
      expect(a.system.warnings.map((w) => w.code)).not.toContain('pendingChoice');
    });
  }
  it('Brasa tem ataque +3 com d8+2 e iniciativa com vantagem', () => {
    const a = actors['Brasa'];
    const gun = a.system.attacks.find((x) => /Pistola pesada/.test(x.name));
    expect(gun.attackBonus).toBe(3);
    expect(gun.damage).toBe('d8+2');
    expect(a.system.initiative.advantage).toBe(true);
  });
});

describe('templates das fichas', () => {
  it('renderiza a ficha de cada ficha pronta sem textos quebrados', async () => {
    for (const [name, actor] of Object.entries(actors)) {
      const sheet = new M.sheets.SNCharacterSheet({ document: actor });
      const ctx = await sheet._prepareContext({});
      for (const tab of ['summary', 'attacks', 'chrome', 'programs', 'gear', 'network', 'bio']) {
        sheet._tab = tab;
        const html = render('actor/character.hbs', await sheet._prepareContext({}));
        assertClean(html, `${name}/${tab}`);
      }
      const html = render('actor/character.hbs', ctx);
      expect(html).toContain(`value="${actor.name}"`);
    }
  });

  it('a ficha de Brasa mostra ataque, atributos e classe', async () => {
    const sheet = new M.sheets.SNCharacterSheet({ document: actors['Brasa'] });
    const html = text(render('actor/character.hbs', await sheet._prepareContext({})));
    expect(html).toContain('Pistola pesada');
    expect(html).toContain('+3');
    expect(html).toContain('Solo');
    expect(html).toContain('Subderme blindada');
    expect(html).toContain('Domínio de arma');
  });

  it('a ficha do Netrunner mostra programas conhecidos e CD', async () => {
    const sheet = new M.sheets.SNCharacterSheet({ document: actors['Vetor'] });
    const html = text(render('actor/character.hbs', await sheet._prepareContext({})));
    expect(html).toContain('Ping');
    expect(html).toContain('Backdoor');
    expect(html).toContain('2 / 2');
  });

  it('renderiza a ficha de item de todos os tipos e os 28 implantes', async () => {
    let n = 0;
    for (const pack of content.PACKS.filter((p) => p.docType === 'Item')) {
      for (const d of pack.docs) {
        const item = new M.SNItem({ ...d, _id: d.identifier }, null);
        item.pack = 'x';
        const sheet = new M.itemSheet.SNItemSheet({ document: item });
        for (const tab of ['description', 'details', 'modifiers', 'tiers', 'grants']) {
          sheet._tab = tab;
          const html = render('item/item.hbs', await sheet._prepareContext({}));
          assertClean(html, `${pack.name}/${d.identifier}/${tab}`);
        }
        n += 1;
      }
    }
    expect(n).toBeGreaterThan(200);
  }, 60000);

  it('renderiza NPC, ICE e drone', async () => {
    const npc = new M.SNActor({ name: 'Segurança', type: 'npc', img: 'x.svg', _id: 'npc1', system: { level: 1, hp: { value: 4, max: 4 }, ac: 11, initiative: 1, morale: { enabled: true, mod: 0, cd: 15 }, attacks: [{ name: 'Pistola', bonus: 2, damage: 'd6', range: 'near', notes: '' }], traits: '<p>x</p>', loot: '', credits: 0 } }).loadItems(M.SNItem);
    const npcHtml = render('actor/npc.hbs', await new M.other.SNNpcSheet({ document: npc })._prepareContext({}));
    assertClean(npcHtml, 'npc');
    const iceDef = content.PACKS.find((p) => p.name === 'ice').docs[0];
    const ice = new M.SNActor({ ...iceDef, _id: 'ice1', items: [] }).loadItems(M.SNItem);
    const iceHtml = render('actor/ice.hbs', await new M.other.SNIceSheet({ document: ice })._prepareContext({}));
    assertClean(iceHtml, 'ice');
    expect(text(iceHtml)).toContain('Alarme');
    const drone = new M.SNActor({ name: 'Drone de Zangão', type: 'drone', img: 'x.svg', _id: 'dr1', system: { ownerUuid: actors['Zangão'].uuid, kind: 'primary', destroyed: false, hp: { value: 6, max: 6 } } }).loadItems(M.SNItem);
    expect(drone.system.stats).toMatchObject({ ac: 12, hpMax: 6, attack: 3, die: 'd4', damageBonus: 1 });
    const droneHtml = render('actor/drone.hbs', await new M.other.SNDroneSheet({ document: drone })._prepareContext({}));
    assertClean(droneHtml, 'drone');
  });

  it('renderiza o rastreador de Alerta', async () => {
    const html = render('apps/alert-tracker.hbs', await new M.alertApp.AlertTracker()._prepareContext());
    assertClean(html, 'alert');
  });
});

describe('assistente de criação', () => {
  it('renderiza todos os passos com o rascunho preenchido', async () => {
    const actor = new M.SNActor({ name: 'Novo', type: 'character', img: 'x.svg', _id: 'new1', system: { ...actors['Brasa'].system, creation: { completed: false, step: 0 } }, items: [] }).loadItems(M.SNItem);
    const wiz = new M.wizard.CreationWizard({ document: actor });
    wiz.draft.abilities = [15, 12, 14, 8, 10, 9];
    wiz.draft.fullRolls = 1;
    wiz.draft.origin = 'cromado';
    wiz.draft.originPicks.factoryImplants = ['subderme-blindada', 'reflexos-neurais'];
    wiz.draft.class = 'solo';
    wiz.draft.classPicks.family = 'pistols';
    wiz.draft.background.uuid = M.compendium.CompendiumIndex.list('background')[0].uuid;
    wiz.draft.alignment = 'sobrevivencia';
    wiz.draft.trigger = 'gatilho-cauteloso';
    wiz.draft.credits = 700;
    wiz.draft.cart = [{ type: 'weapon', identifier: 'pistola-pesada', qty: 1 }, { type: 'gear', identifier: 'carregador', qty: 2 }];
    wiz.draft.talents = [{ id: 'arma-afinada', roll: 5, choice: {} }];
    for (let step = 0; step < 10; step++) {
      wiz.draft.step = step;
      const html = render('apps/wizard.hbs', await wiz._prepareContext());
      assertClean(html, `wizard/passo ${step}`);
    }
    wiz.draft.step = 9;
    const review = text(render('apps/wizard.hbs', await wiz._prepareContext()));
    expect(review).toContain('Solo');
    expect(review).toContain('Pistola pesada');
  });
});

describe('rolagens e cartões de chat', () => {
  const last = () => calls.messages.at(-1);

  it('teste de atributo com CD e vantagem do Ghost em furtividade', async () => {
    calls.messages.length = 0;
    setRng(() => 0.5);
    await M.rolls.checkRoll({ actorUuid: actors['Névoa'].uuid, ability: 'des', tags: ['stealth'], cd: 12, label: 'Furtividade' });
    const html = last().content;
    assertClean(html, 'check');
    expect(html).toContain('Vantagem');
    expect(html).toContain('CD 12');
  });

  it('ataque de Brasa: bônus +3, crítico em 20 natural e dano dobrado', async () => {
    calls.messages.length = 0;
    setRng(() => 0.99);
    const line = actors['Brasa'].system.attacks.find((a) => /Pistola pesada/.test(a.name));
    await M.rolls.attackRoll({ actorUuid: actors['Brasa'].uuid, attackId: line.id });
    const attack = last();
    assertClean(attack.content, 'attack');
    expect(attack.content).toContain('Crítico');
    expect(attack.flags.sombraneon.critical).toBe(true);
    await M.rolls.damageRoll({ actorUuid: actors['Brasa'].uuid, attackId: line.id, options: {}, critical: true });
    const dmg = last();
    assertClean(dmg.content, 'damage');
    expect(dmg.rolls[0].formula).toBe('2d8 + 2');
  });

  it('1 natural à distância com carregadores marca o carregador vazio', async () => {
    calls.messages.length = 0;
    setRng(() => 0);
    const brasa = actors['Brasa'];
    const line = brasa.system.attacks.find((a) => /Pistola pesada/.test(a.name));
    await M.rolls.attackRoll({ actorUuid: brasa.uuid, attackId: line.id });
    expect(brasa.items.get(line.itemId).system.magEmpty).toBe(true);
    expect(last().content).toContain('carregador acabou');
    await brasa.items.get(line.itemId).update({ 'system.magEmpty': false });
  });

  it('programa: sucesso, falha vira Crash e 1 natural dispara Feedback', async () => {
    const vetor = actors['Vetor'];
    const ping = vetor.items.find((i) => i.system.identifier === 'ping');
    calls.messages.length = 0;
    setRng(() => 0.9);
    await M.casting.executeProgram({ actorUuid: vetor.uuid, programId: ping.id });
    assertClean(last().content, 'cast sucesso');
    expect(ping.system.crashed).toBe(false);
    setRng(() => 0.04); // d20 = 1 e depois dados baixos
    calls.messages.length = 0;
    await M.casting.executeProgram({ actorUuid: vetor.uuid, programId: ping.id });
    expect(ping.system.crashed).toBe(true);
    const feedback = calls.messages.find((m) => m.content?.includes('Feedback') && m.rolls?.length);
    expect(feedback).toBeTruthy();
    assertClean(calls.messages.map((m) => m.content ?? '').join('\n'), 'feedback');
    ping.system.crashed = false;
    setRng();
  });

  it('Set do Rocker: sucesso gasta o Set e falha não gasta', async () => {
    const riff = actors['Riff'];
    const refrao = riff.items.find((i) => i.system.identifier === 'refrao');
    setRng(() => 0.9);
    await M.casting.executeProgram({ actorUuid: riff.uuid, programId: refrao.id });
    expect(refrao.system.crashed).toBe(true);
    refrao.system.crashed = false;
    const hype = riff.items.find((i) => i.system.identifier === 'hype');
    setRng(() => 0.05);
    await M.casting.executeProgram({ actorUuid: riff.uuid, programId: hype.id });
    expect(hype.system.crashed).toBe(false);
    setRng();
  });

  it('o cartão de informação do item renderiza', async () => {
    const html = render('chat/info.hbs', { name: 'Ping', img: 'x.svg', type: 'Programa', description: '<p>x</p>', price: 100, uuid: 'u', canAdd: true });
    assertClean(html, 'info');
  });
});

describe('inicialização do sistema', () => {
  it('o gancho init registra modelos, fichas e configurações', async () => {
    for (const fn of Hooks.handlers.init ?? []) await fn();
    expect(CONFIG.Actor.documentClass).toBe(M.SNActor);
    expect(Object.keys(CONFIG.Actor.dataModels).sort()).toEqual(['character', 'drone', 'ice', 'npc']);
    expect(Object.keys(CONFIG.Item.dataModels)).toHaveLength(10);
    expect(CONFIG.statusEffects.map((s) => s.id)).toContain('dead');
    expect(calls.sheets.length).toBe(5);
    expect(Object.keys(calls.settings).filter((k) => k.startsWith('__reg_')).length).toBeGreaterThan(15);
    expect(game.sombraneon.api.rollNetwork).toBeTypeOf('function');
  });
});
