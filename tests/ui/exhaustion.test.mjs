import fs from 'node:fs';
import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { calls, setRng } from '../stub/env.mjs';
import { setup, dialogs } from '../stub/setup.mjs';

/**
 * Exaustão na ficha e no jogo (Regras adicionais, capítulo 2) e Efeito crítico (capítulo 3).
 */
let E;
let M;
let X;
let K;

beforeAll(async () => {
  E = await setup();
  M = E.M;
  X = await import('../../systems/sombraneon/src/automation/exhaustion.mjs');
  K = await import('../../systems/sombraneon/src/automation/critical.mjs');
  K.registerCriticalHooks();
});

beforeEach(() => {
  dialogs.queue.length = 0;
  calls.messages.length = 0;
  for (const k of ['ruleExhaustion', 'ruleCriticalEffect', 'criticalTrigger', 'exhaustionPerRest', 'restRequiresRation']) delete calls.settings[k];
  setRng(() => 0.5);
});

const runner = async (hp = 10, exhaustion = 0) => {
  const a = E.blank();
  await a.update({ 'system.hp.value': hp, 'system.exhaustion': exhaustion });
  return a;
};
const last = () => calls.messages.at(-1);

describe('Exaustão: penalidade nos testes', () => {
  it('o teste de atributo perde o nível de Exaustão e mostra a parcela', async () => {
    const a = await runner(10, 3);
    expect(a.sn.exhaustion.penalty).toBe(3);
    await M.rolls.checkRoll({ actorUuid: a.uuid, ability: 'for', tags: [], cd: 12, label: 'Teste' });
    expect(last().content).toContain('-3');
    expect(last().content).toContain('Exaustão');
  });

  it('com a regra desligada nas configurações, não há penalidade', async () => {
    calls.settings.ruleExhaustion = false;
    const a = await runner(10, 3);
    a.prepareDerivedData();
    expect(a.sn.exhaustion.penalty).toBe(0);
  });

  it('o ataque mostra a penalidade na linha da ficha', async () => {
    const a = await runner(10, 2);
    const unarmed = a.sn.attacks.find((l) => l.family === 'unarmed');
    expect(unarmed.parts.some((p) => p.label === 'Exaustão' && p.value === -2)).toBe(true);
  });
});

describe('Exaustão: como se ganha e se perde', () => {
  it('cair a 0 HP e apagar dá 1 nível, e o morrendo continua', async () => {
    const a = await runner(0, 0);
    await M.dying.handleZeroHp(a);
    expect(a.system.exhaustion).toBe(1);
    expect(a.system.dying.active).toBe(true);
  });

  it('cada queda conta, não cada combate', async () => {
    const a = await runner(0, 1);
    await M.dying.handleZeroHp(a);
    a.system.hp.value = 0;
    await M.dying.handleZeroHp(a);
    expect(a.system.exhaustion).toBe(3);
  });

  it('Exaustão 5 e cair a 0 HP mata na hora, sem rodadas de morrendo', async () => {
    const a = await runner(0, 5);
    await M.dying.handleZeroHp(a);
    expect(a.system.exhaustion).toBe(6);
    expect(a.system.dying.active).toBe(false);
    expect(a.statuses.has('dead')).toBe(true);
    expect(last().content).toContain('morre de Exaustão');
  });

  it('dano não letal que derruba também conta', async () => {
    const a = await runner(0, 0);
    await M.dying.handleZeroHp(a, { nonlethal: true });
    expect(a.system.exhaustion).toBe(1);
  });

  it('ficar de pé com Duro de matar não gera Exaustão', async () => {
    const a = E.actors.Brasa;
    const tough = a.items.find((i) => i.system.identifier === 'duro-de-matar');
    tough.system.uses.value = 3;
    a.system.exhaustion = 0;
    a.system.hp.value = 0;
    setRng(() => 0.99);
    await M.dying.handleZeroHp(a);
    expect(a.system.hp.value).toBe(1);
    expect(a.system.exhaustion).toBe(0);
  });

  it('ameaças e NPCs não usam Exaustão', async () => {
    const n = new M.SNActor({ _id: 'npcex1', name: 'Capanga', type: 'npc', img: 'x.svg', system: { hp: { value: 5, max: 5 } }, items: [] });
    n.loadItems(M.SNItem);
    expect(await X.gainExhaustion(n, 1)).toBeNull();
  });

  it('com a regra desligada, cair a 0 HP não dá Exaustão', async () => {
    calls.settings.ruleExhaustion = false;
    const a = await runner(0, 0);
    await M.dying.handleZeroHp(a);
    expect(a.system.exhaustion).toBe(0);
  });

  it('um descanso bem-sucedido remove 1 nível; a variante remove 2; nunca abaixo de 0', async () => {
    const a = await runner(3, 3);
    calls.settings.restRequiresRation = false;
    await M.rest.restActor(a, { quality: 'safe', interruptions: 0, ignoreRation: true });
    expect(a.system.exhaustion).toBe(2);
    calls.settings.exhaustionPerRest = 2;
    await M.rest.restActor(a, { quality: 'safe', interruptions: 0, ignoreRation: true });
    expect(a.system.exhaustion).toBe(0);
    await M.rest.restActor(a, { quality: 'safe', interruptions: 0, ignoreRation: true });
    expect(a.system.exhaustion).toBe(0);
  });

  it('descanso interrompido não remove nada', async () => {
    const a = await runner(3, 2);
    calls.settings.restRequiresRation = false;
    setRng(() => 0);
    await M.rest.restActor(a, { quality: 'safe', interruptions: 1, ignoreRation: true });
    expect(a.system.exhaustion).toBe(2);
  });

  it('Convalescer e marcar à mão: níveis ficam entre 0 e 6, e o 6 mata', async () => {
    const a = await runner(10, 1);
    await X.removeExhaustion(a, 1);
    expect(a.system.exhaustion).toBe(0);
    await X.removeExhaustion(a, 1);
    expect(a.system.exhaustion).toBe(0);
    await X.setExhaustion(a, 6);
    expect(a.statuses.has('dead')).toBe(true);
  });
});

describe('Efeito crítico', () => {
  it('rola 2d6 com o modificador do dano e mostra a linha e o local', async () => {
    const a = await runner(30, 0);
    const r = await K.rollCriticalEffect(a, 20);
    expect(r.total).toBeGreaterThan(-20);
    expect(last().content).toContain('20 de dano');
    expect(last().content).toContain(r.row.name);
  });

  it('usa a coluna Cromo quando o local tem implante', async () => {
    const a = await runner(30, 0);
    await a.createEmbeddedDocuments('Item', [{ name: 'Mão tática', type: 'implant', img: 'x.svg', system: { identifier: 'mao-tatica', slot: 'arms', installed: true } }]);
    // todos os dados no mesmo valor: 2d6 = 6 (Golpe que abala) e 1d4 = 3 (Braços)
    let n = 0;
    setRng(() => [0.4, 0.4, 0.5][n++ % 3]);
    const r = await K.rollCriticalEffect(a, 10);
    expect(r.row.id).toBe('abala');
    expect(r.place).toBe('arms');
    expect(r.chrome).toBe(true);
    expect(last().content).toContain('Mão tática');
    expect(last().content).toContain('desligado até o próximo descanso');
  });

  it('Choque dá 1 nível de Exaustão ao runner', async () => {
    const a = await runner(30, 0);
    setRng(() => 0.5); // 4 + 4 = 8: Choque
    const r = await K.rollCriticalEffect(a, 10);
    expect(r.row.id).toBe('choque');
    expect(a.system.exhaustion).toBe(1);
  });

  it('com 12 ou mais, nada acontece', async () => {
    const a = await runner(30, 0);
    setRng(() => 0.99);
    const r = await K.rollCriticalEffect(a, 10);
    expect(r.row.id).toBe('escapou');
    expect(a.system.exhaustion).toBe(0);
  });

  it('o gancho do dano só dispara com a regra ligada, no gatilho e para runners', async () => {
    const a = await runner(40, 0);
    const fire = async (dmg) => {
      // o stub não dispara os ganchos: chama o último registrado, como o Foundry faria
      await Hooks.handlers['sombraneon.damageApplied'].at(-1)(a, dmg, {});
    };
    await fire(12);
    expect(calls.messages.length).toBe(0);
    calls.settings.ruleCriticalEffect = true;
    await fire(9);
    expect(calls.messages.length).toBe(0);
    calls.settings.criticalTrigger = 8;
    await fire(9);
    expect(calls.messages.length).toBeGreaterThan(0);
  });
});

describe('Exaustão na ficha', () => {
  const tpl = fs.readFileSync('systems/sombraneon/templates/actor/character.hbs', 'utf8');

  it('o modelo tem o marcador de 1 a 6 com a caveira no 6, e botões de mais e menos', () => {
    expect(tpl).toContain('data-action="exhaustionSet"');
    expect(tpl).toContain('data-action="exhaustionAdjust" data-delta="-1"');
    expect(tpl).toContain('data-action="exhaustionAdjust" data-delta="1"');
    expect(tpl).toContain('fa-skull');
  });

  it('o campo de Exaustão é do personagem e vai de 0 a 6', async () => {
    const a = E.blank();
    expect(a.system.exhaustion).toBe(0);
    await a.update({ 'system.exhaustion': 4 });
    expect(a.system.exhaustion).toBe(4);
  });
});
