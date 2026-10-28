import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { calls, setRng } from '../stub/env.mjs';
import { setup, dialogs } from '../stub/setup.mjs';

/**
 * Fluxos do sistema (seleções, concessões, soltar itens, descanso, morte, talento, nível e assistente)
 * executados contra o Foundry simulado, com respostas de diálogo programadas.
 */
let E;
let M;
const uuidOf = (type, identifier) => M.compendium.CompendiumIndex.resolve(type, identifier).uuid;
const pick = (...values) => ({ values });
const ids = (actor, type) => actor.items.filter((i) => i.type === type).map((i) => i.system.identifier);

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

describe('seleções e concessões', () => {
  it('Cromado, Solo, Ex-gangue, Sobrevivência e gatilho preenchem a ficha', async () => {
    const a = E.blank();
    const picks = { factoryImplants: ['subderme-blindada', 'reflexos-neurais'] };
    await M.grants.applySelection(a, 'origin', uuidOf('origin', 'cromado'), { suppressPrompts: true, picks });
    dialogs.queue.push('pistols'); // família do Domínio de arma
    await M.grants.applySelection(a, 'class', uuidOf('class', 'solo'));
    await M.grants.applySelection(a, 'background', uuidOf('background', 'ex-gangue'));
    await M.grants.applySelection(a, 'alignment', uuidOf('alignment', 'sobrevivencia'));
    await M.grants.selectEdgeTrigger(a, 'gatilho-cauteloso');

    expect(a.selection('origin').name).toBe('Cromado');
    expect(a.selection('class').name).toBe('Solo');
    expect(ids(a, 'implant').sort()).toEqual(['reflexos-neurais', 'subderme-blindada']);
    expect(a.items.filter((i) => i.type === 'implant').every((i) => i.system.installed && i.system.quality === 'street')).toBe(true);
    const names = ids(a, 'feature');
    for (const f of ['dominio-de-arma', 'chassi', 'resistente', 'duro-de-matar', 'cromo-estavel', 'vulneravel', 'gatilho-cauteloso']) expect(names).toContain(f);
    expect(a.items.find((i) => i.system.identifier === 'dominio-de-arma').system.choice).toEqual({ family: 'pistols' });
    expect(a.system.hp.rolls).toHaveLength(1);
    expect(a.system.hp.value).toBe(a.system.hp.max);
    expect(a.system.chrome.cd).toBeNull(); // 2 implantes, Cromado conta 1 a menos
  });

  it('é idempotente: rodar as concessões de novo não duplica nada', async () => {
    const a = E.blank();
    dialogs.queue.push('pistols');
    await M.grants.applySelection(a, 'class', uuidOf('class', 'solo'));
    const before = a.items.size;
    await M.grants.runGrants(a, a.selection('class'));
    expect(a.items.size).toBe(before);
  });

  it('trocar de classe remove só o que a classe antiga concedeu', async () => {
    const a = E.blank();
    dialogs.queue.push('pistols');
    await M.grants.applySelection(a, 'class', uuidOf('class', 'solo'));
    await a.createEmbeddedDocuments('Item', [{ name: 'Pistola leve', type: 'weapon', img: 'x.svg', system: { identifier: 'pistola-leve', kind: 'ranged', family: 'pistols', damage: 'd6', hands: 1, slots: 1 } }]);
    dialogs.queue.push(true, pick(uuidOf('program', 'ping'), uuidOf('program', 'backdoor')), pick(uuidOf('program', 'ping')));
    // escolha dos 2 programas: o seletor abre uma vez por escolha
    dialogs.queue.length = 0;
    dialogs.queue.push(true, uuidOf('program', 'ping'), uuidOf('program', 'backdoor'));
    dialogs.queue[1] = pick(uuidOf('program', 'ping'));
    dialogs.queue[2] = pick(uuidOf('program', 'backdoor'));
    // O seletor de concessão retorna um único valor por diálogo (radio), não lista.
    dialogs.queue[1] = { values: [uuidOf('program', 'ping')] };
    dialogs.queue[2] = { values: [uuidOf('program', 'backdoor')] };
    await M.grants.applySelection(a, 'class', uuidOf('class', 'netrunner'));
    expect(a.selection('class').name).toBe('Netrunner');
    const feats = ids(a, 'feature');
    expect(feats).not.toContain('dominio-de-arma');
    expect(feats).toContain('deck');
    expect(ids(a, 'weapon')).toContain('pistola-leve');
    expect(ids(a, 'program').sort()).toEqual(['backdoor', 'ping']);
  });

  it('Biomod rola 2 mutações diferentes pela tabela', async () => {
    const a = E.blank();
    let n = 0;
    setRng(() => [0.0, 0.0, 0.5, 0.5, 0.99][n++ % 5]);
    await M.grants.applySelection(a, 'origin', uuidOf('origin', 'biomod'), { suppressPrompts: true });
    const muts = a.items.filter((i) => i.type === 'feature' && i.system.kind === 'mutation');
    expect(muts).toHaveLength(2);
    expect(new Set(muts.map((m) => m.system.identifier)).size).toBe(2);
  });
});

describe('arrastar e soltar', () => {
  const doc = (type, id) => globalThis.__registry.get(uuidOf(type, id));

  it('arma: adiciona, equipa, ocupa slot e gera a linha de ataque', async () => {
    const a = E.blank();
    dialogs.queue.push('pistols');
    await M.grants.applySelection(a, 'class', uuidOf('class', 'solo'));
    await M.drop.dropItem(a, doc('weapon', 'pistola-pesada'));
    const gun = a.items.find((i) => i.system.identifier === 'pistola-pesada');
    expect(gun.system.equipped).toBe(true);
    expect(a.system.slots.used).toBe(1);
    expect(a.system.attacks.some((x) => /Pistola pesada/.test(x.name))).toBe(true);
  });

  it('armadura pesada pergunta se troca e recalcula a CA (15, sem DES)', async () => {
    const a = E.blank();
    await M.drop.dropItem(a, doc('armor', 'jaqueta-blindada'));
    expect(a.system.ac.value).toBe(11);
    dialogs.queue.push(true);
    await M.drop.dropItem(a, doc('armor', 'armadura-corp-pesada'));
    expect(a.system.ac.value).toBe(15);
    expect(a.items.filter((i) => i.type === 'armor' && i.system.equipped)).toHaveLength(1);
  });

  it('carregadores empilham em 1 slot (2 por slot)', async () => {
    const a = E.blank();
    await M.drop.dropItem(a, doc('gear', 'carregador'));
    await M.drop.dropItem(a, doc('gear', 'carregador'));
    const mags = a.items.filter((i) => i.system.identifier === 'carregador');
    expect(mags).toHaveLength(1);
    expect(mags[0].system.quantity).toBe(2);
    expect(a.system.slots.used).toBe(1);
  });

  it('implantes: vão ao slot certo, pedem substituição e avisam a ciberpsicose', async () => {
    const a = E.blank();
    dialogs.queue.push({ quality: 'street', clinic: false });
    await M.drop.dropItem(a, doc('implant', 'subderme-blindada'));
    expect(a.system.ac.value).toBe(11);
    // mesmo slot: pergunta se substitui
    dialogs.queue.push({ quality: 'corp', clinic: false }, true);
    await M.drop.dropItem(a, doc('implant', 'coracao-cibernetico'));
    expect(a.items.filter((i) => i.type === 'implant' && i.system.installed)).toHaveLength(1);
    expect(a.system.ac.value).toBe(10);
    // 3 e 4 implantes
    for (const id of ['reflexos-neurais', 'arma-retratil', 'molas-de-salto']) {
      dialogs.queue.push({ quality: 'street', clinic: false });
      await M.drop.dropItem(a, doc('implant', id));
    }
    expect(a.system.chrome.count).toBe(4);
    expect(a.system.chrome.cd).toBe(14);
    expect(a.system.attacks.some((x) => /Arma retrátil/.test(x.name))).toBe(true);
  });

  it('programa: bloqueado por classe e por tier, aceito pelo Netrunner', async () => {
    const solo = E.blank();
    dialogs.queue.push('pistols');
    await M.grants.applySelection(solo, 'class', uuidOf('class', 'solo'));
    calls.settings.__isGM = false;
    game.user.isGM = false;
    await M.drop.dropItem(solo, doc('program', 'ping'));
    expect(ids(solo, 'program')).toEqual([]);

    const doctor = E.blank();
    await M.grants.applySelection(doctor, 'class', uuidOf('class', 'hyperdoc'), { suppressPrompts: true, picks: { protocols: ['nanocura', 'antidoto'] } });
    await M.drop.dropItem(doctor, doc('program', 'choque-cardiaco'));
    expect(ids(doctor, 'program')).not.toContain('choque-cardiaco');
    game.user.isGM = true;

    const net = E.blank();
    await M.grants.applySelection(net, 'class', uuidOf('class', 'netrunner'), { suppressPrompts: true, picks: { programs: ['ping'] } });
    await M.drop.dropItem(net, doc('program', 'backdoor'));
    expect(ids(net, 'program')).toContain('backdoor');
    game.user.isGM = false;
    await M.drop.dropItem(net, doc('program', 'choque'));
    game.user.isGM = true;
    expect(ids(net, 'program')).not.toContain('choque'); // limite de 2 conhecidos no nível 1
  });
});

describe('descanso, morte, talento e nível', () => {
  it('descanso: gasta ração, recupera HP e restaura usos', async () => {
    const a = E.actors?.Brasa ?? E.actors.Brasa;
    a.system.hp.value = 3;
    const tough = a.items.find((i) => i.system.identifier === 'duro-de-matar');
    tough.system.uses.value = 0;
    const ration = a.items.find((i) => i.system.category === 'ration');
    await M.rest.restActor(a, { quality: 'safe', interruptions: 0 });
    expect(a.system.hp.value).toBe(a.system.hp.max);
    expect(tough.system.uses.value).toBe(3);
    expect(ration.system.uses.value).toBe(2);
  });

  it('descanso sem ração é bloqueado, e a interrupção falha sem recuperar nada', async () => {
    const a = E.actors.Vetor;
    const ration = a.items.find((i) => i.system.category === 'ration');
    ration.system.uses.value = 0;
    ration.system.quantity = 1;
    a.system.hp.value = 1;
    expect(await M.rest.restActor(a, { quality: 'safe' })).toBeNull();
    ration.system.uses.value = 3;
    setRng(() => 0); // d20 = 1 em CON
    await M.rest.restActor(a, { quality: 'safe', interruptions: 1 });
    expect(a.system.hp.value).toBe(1);
    expect(ration.system.uses.value).toBe(2);
  });

  it('Android descansa sem ração', async () => {
    const a = E.actors.Névoa;
    for (const i of a.items.filter((x) => x.system.category === 'ration')) await i.delete();
    a.system.hp.value = 1;
    await M.rest.restActor(a, { quality: 'safe' });
    expect(a.system.hp.value).toBe(4);
  });

  it('0 HP: Duro de matar segura com 1 HP; sem usos, cai morrendo com 1d4 + CON', async () => {
    const a = E.actors.Brasa;
    a.system.hp.value = 0;
    setRng(() => 0.99);
    const tough = a.items.find((i) => i.system.identifier === 'duro-de-matar');
    tough.system.uses.value = 3;
    await M.dying.handleZeroHp(a);
    expect(a.system.hp.value).toBe(1);
    expect(tough.system.uses.value).toBe(2);
    tough.system.uses.value = 0;
    a.system.hp.value = 0;
    setRng(() => 0.5);
    await M.dying.handleZeroHp(a);
    expect(a.system.dying.active).toBe(true);
    expect(a.system.dying.remaining).toBe(Math.max(1, 3 + 2));
    expect(a.statuses.has('dying')).toBe(true);
  });

  it('turno do morrendo: 20 natural revive com 1 HP; senão reduz a chance', async () => {
    const a = E.actors.Brasa;
    a.system.dying = { active: true, remaining: 3, rolled: 3, stable: false };
    setRng(() => 0.3);
    await M.dying.dyingTurn(a);
    expect(a.system.dying.remaining).toBe(2);
    setRng(() => 0.99);
    await M.dying.dyingTurn(a);
    expect(a.system.dying.active).toBe(false);
    expect(a.system.hp.value).toBe(1);
  });

  it('talento: 2d6 = 8 pede o atributo e aplica +2', async () => {
    const a = E.blank();
    dialogs.queue.push('pistols');
    await M.grants.applySelection(a, 'class', uuidOf('class', 'solo'));
    setRng(() => 0.5); // 2d6 = 8
    dialogs.queue.push('des');
    const before = a.system.abilities.des.value ?? 10;
    await M.progression.rollTalent(a, { force: true });
    const talent = a.items.find((i) => i.system.kind === 'talent');
    expect(talent.system.identifier).toBe('atributo-solo');
    expect(talent.system.choice).toEqual({ abilities: 'des' });
    expect(a.system.abilities.des.value).toBe(before + 2);
  });

  it('subir de nível: HP, XP com sobra e novo nível', async () => {
    const a = E.blank();
    dialogs.queue.push('pistols');
    await M.grants.applySelection(a, 'class', uuidOf('class', 'solo'));
    a.system.xp.value = 13;
    setRng(() => 0.99); // d8 = 8
    dialogs.queue.push(true);
    await M.progression.levelUp(a);
    expect(a.system.level).toBe(2);
    expect(a.system.xp.value).toBe(3);
    expect(a.system.hp.rolls).toHaveLength(2);
    expect(a.system.hp.max).toBeGreaterThan(8);
  });
});

describe('assistente de criação (concluir)', () => {
  it('cria um runner completo a partir do rascunho', async () => {
    const actor = E.blank('Novo');
    actor.sheet = { render() {} };
    actor.system.creation.completed = false;
    const wiz = new M.wizard.CreationWizard({ document: actor });
    Object.assign(wiz.draft, {
      name: 'Brasa Nova',
      abilities: [15, 12, 14, 8, 10, 9],
      fullRolls: 1,
      origin: 'cromado',
      class: 'solo',
      alignment: 'sobrevivencia',
      trigger: 'gatilho-cauteloso',
      credits: 700,
      drive: 'Sobreviver',
      talents: [{ id: 'arma-afinada', roll: 5, choice: {} }]
    });
    wiz.draft.originPicks.factoryImplants = ['subderme-blindada', 'reflexos-neurais'];
    wiz.draft.classPicks.family = 'pistols';
    wiz.draft.background.uuid = uuidOf('background', 'ex-gangue');
    wiz.draft.cart = [{ type: 'weapon', identifier: 'pistola-pesada', qty: 1 }, { type: 'armor', identifier: 'jaqueta-blindada', qty: 1 }, { type: 'gear', identifier: 'carregador', qty: 2 }];
    await M.wizard.CreationWizard.DEFAULT_OPTIONS.actions.finish.call(wiz);
    expect(actor.system.creation.completed).toBe(true);
    expect(actor.name).toBe('Brasa Nova');
    expect(actor.selection('class').name).toBe('Solo');
    expect(actor.system.abilities.for.base).toBe(15);
    expect(actor.system.hp.value).toBe(actor.system.hp.max);
    expect(actor.system.currency.credits).toBe(700 - 250 - 150 - 60);
    const gun = actor.system.attacks.find((x) => /Pistola pesada/.test(x.name));
    expect(gun.attackBonus).toBe(3);
    expect(gun.damage).toBe('d8+2');
    expect(actor.system.ac.value).toBe(13);
    expect(ids(actor, 'feature')).toContain('arma-afinada');
    expect(actor.system.details.drive).toBe('Sobreviver');
  });
});
