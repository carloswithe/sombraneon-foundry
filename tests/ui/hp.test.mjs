import fs from 'node:fs';
import { describe, it, expect, beforeAll } from 'vitest';

import { setup } from '../stub/setup.mjs';

/**
 * Dano e cura digitados nas fichas (em vez de clicar de um em um): Dano segue a Blindagem e as reduções,
 * Shift aplica direto, Cura respeita o máximo. Vale para jogador, ameaça, ICE e drone.
 */
let E;
let M;
let applyHpAmount;

beforeAll(async () => {
  E = await setup();
  M = E.M;
  ({ applyHpAmount } = await import('../../systems/sombraneon/src/sheets/base.mjs'));
});

const npc = (armor = 0, hp = 30) => {
  const a = new M.SNActor({ _id: `n${Math.random().toString(36).slice(2, 8)}`, name: 'Ameaça', type: 'npc', img: 'x.svg', system: { hp: { value: hp, max: hp }, armor }, items: [] });
  a.loadItems(M.SNItem);
  return a;
};
const field = (value) => ({ value: String(value), focus() {} });

describe('ajuste direto de dano (raw)', () => {
  it('ignora a Blindagem da ameaça', async () => {
    const a = npc(3);
    expect(await a.applyDamage(5)).toBe(2);
    expect(await a.applyDamage(5, { raw: true })).toBe(5);
    expect(a.system.hp.value).toBe(23);
  });

  it('ignora a redução de dano guardada na ficha', async () => {
    const a = E.blank();
    await a.update({ 'system.hp.value': 10 });
    await a.setFlag('sombraneon', 'damageReduce', 2);
    expect(await a.applyDamage(4)).toBe(2);
    expect(await a.applyDamage(4, { raw: true })).toBe(4);
  });
});

describe('HP rápido digitado na ficha', () => {
  it('aplica o valor de uma vez na ficha de ameaça e limpa o campo', async () => {
    const a = npc(0, 30);
    const f = field(12);
    await applyHpAmount(a, f, 'damage');
    expect(a.system.hp.value).toBe(18);
    expect(f.value).toBe('');
  });

  it('o dano digitado respeita a Blindagem, e Shift aplica direto', async () => {
    const a = npc(4, 30);
    await applyHpAmount(a, field(10), 'damage');
    expect(a.system.hp.value).toBe(24);
    await applyHpAmount(a, field(10), 'damage', true);
    expect(a.system.hp.value).toBe(14);
  });

  it('cura soma até o máximo', async () => {
    const a = npc(0, 20);
    await a.update({ 'system.hp.value': 5 });
    await applyHpAmount(a, field(50), 'heal');
    expect(a.system.hp.value).toBe(20);
  });

  it('dano maior que o HP deixa em 0, sem ficar negativo', async () => {
    const a = npc(0, 8);
    await applyHpAmount(a, field(99), 'damage');
    expect(a.system.hp.value).toBe(0);
  });

  it('vazio, zero ou texto não mexem no HP e avisam', async () => {
    const a = npc(0, 8);
    for (const v of ['', '0', 'abc']) await applyHpAmount(a, field(v), 'damage');
    expect(a.system.hp.value).toBe(8);
  });

  it('funciona na ficha do jogador', async () => {
    const a = E.blank();
    await a.update({ 'system.hp.value': 9 });
    await applyHpAmount(a, field(4), 'damage');
    expect(a.system.hp.value).toBe(5);
    await applyHpAmount(a, field(2), 'heal');
    expect(a.system.hp.value).toBe(7);
  });
});

describe('modelos das fichas', () => {
  it('jogador, ameaça, ICE e drone têm o campo de valor e os botões Dano e Cura', () => {
    for (const f of ['character', 'npc', 'ice', 'drone']) {
      const html = fs.readFileSync(`systems/sombraneon/templates/actor/${f}.hbs`, 'utf8');
      expect(html, f).toContain('data-hp-amount');
      expect(html, f).toContain('data-action="hpApply" data-mode="damage"');
      expect(html, f).toContain('data-action="hpApply" data-mode="heal"');
      // o campo não pode ter name: senão o formulário tentaria gravá-lo no ator
      expect(html.match(/<input[^>]*data-hp-amount[^>]*>/)[0], f).not.toMatch(/\sname=/);
    }
  });
});

