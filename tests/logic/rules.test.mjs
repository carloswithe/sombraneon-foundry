import { describe, it, expect } from 'vitest';
import { abilityMod } from '../../systems/sombraneon/src/logic/abilities.mjs';
import { evalFormula } from '../../systems/sombraneon/src/logic/formulas.mjs';
import * as R from '../../systems/sombraneon/src/logic/rules.mjs';
import * as D from '../../systems/sombraneon/src/logic/dice.mjs';
import { gather, sum, whenMatches, advantageSources, hasFlag, diceFormula, setValue, multiplier } from '../../systems/sombraneon/src/logic/modifiers.mjs';

describe('abilityMod', () => {
  const table = { 1: -4, 3: -4, 4: -3, 5: -3, 6: -2, 7: -2, 8: -1, 9: -1, 10: 0, 11: 0, 12: 1, 13: 1, 14: 2, 15: 2, 16: 3, 17: 3, 18: 4, 30: 4 };
  for (const [v, m] of Object.entries(table)) it(`${v} -> ${m}`, () => expect(abilityMod(Number(v))).toBe(m));
  it('é monótona', () => {
    let prev = -99;
    for (let v = 1; v <= 40; v++) {
      const m = abilityMod(v);
      expect(m).toBeGreaterThanOrEqual(prev);
      prev = m;
    }
  });
});

describe('formulas', () => {
  it('avalia números, variáveis e funções', () => {
    expect(evalFormula('1 + floor(@level / 2)', { level: 5 })).toBe(3);
    expect(evalFormula('max(0, @abilities.con.mod)', { abilities: { con: { mod: -1 } } })).toBe(0);
    expect(evalFormula('max(0, @abilities.con.mod)', { abilities: { con: { mod: 3 } } })).toBe(3);
    expect(evalFormula('-2 + 5')).toBe(3);
    expect(evalFormula('2 * (3 + 1)')).toBe(8);
  });
  it('rejeita código arbitrário', () => {
    expect(() => evalFormula('process.exit()')).toThrow();
    expect(() => evalFormula('constructor')).toThrow();
  });
  it('variável ausente vale 0', () => expect(evalFormula('@nada.aqui + 1', {})).toBe(1));
});

describe('hp, ca, slots', () => {
  it('maxHp: mínimo 1 por nível', () => {
    expect(R.maxHp({ rolls: [5, 3], conMod: -1 })).toBe(6);
    expect(R.maxHp({ rolls: [1], conMod: -4 })).toBe(1);
    expect(R.maxHp({ rolls: [4], conMod: 2, bonus: 3 })).toBe(9);
  });
  it('armorClass', () => {
    expect(R.armorClass({ dexMod: 2 }).value).toBe(12);
    expect(R.armorClass({ dexMod: 2, armor: { ac: 11, addDex: true } }).value).toBe(13);
    expect(R.armorClass({ dexMod: 2, armor: { ac: 15, addDex: false } }).value).toBe(15);
    expect(R.armorClass({ dexMod: 2, armor: { ac: 15, addDex: false }, cover: true }).value).toBe(17);
    expect(R.armorClass({ dexMod: 2, immersed: true }).value).toBe(5);
    expect(R.armorClass({ dexMod: 2, override: 20 }).value).toBe(20);
    expect(Number.isNaN(R.armorClass({}).value)).toBe(false);
  });
  it('slotsMax', () => {
    expect(R.slotsMax({ forValue: 8 })).toBe(10);
    expect(R.slotsMax({ forValue: 14 })).toBe(14);
    expect(R.slotsMax({ forValue: 14, bonuses: 3 })).toBe(17);
  });
  it('slotsUsed: pilhas, rig utilitário grátis', () => {
    expect(R.slotsUsed([{ quantity: 3, perSlot: 2, slots: 1 }])).toBe(2);
    expect(R.slotsUsed([{ quantity: 1, freeFirst: true }])).toBe(0);
    expect(R.slotsUsed([{ quantity: 2, freeFirst: true }])).toBe(1);
    expect(R.slotsUsed([{ quantity: 1, slots: 3 }])).toBe(3);
  });
});

describe('conjuração', () => {
  it('tierMax', () => {
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(R.tierMax)).toEqual([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
  });
  it('castingKnownMax', () => {
    expect(R.castingKnownMax({ kind: 'program', level: 1 })).toBe(2);
    expect(R.castingKnownMax({ kind: 'program', level: 4 })).toBe(5);
    expect(R.castingKnownMax({ kind: 'protocol', level: 10, extras: 1 })).toBe(12);
    expect([1, 3, 4, 6, 7, 10].map((level) => R.castingKnownMax({ kind: 'set', level }))).toEqual([3, 3, 4, 4, 5, 6]);
  });
  it('CD de execução', () => {
    expect(R.castingCd({ kind: 'program', tier: 1 })).toBe(11);
    expect(R.castingCd({ kind: 'protocol', tier: 3 })).toBe(13);
    expect(R.castingCd({ kind: 'set' })).toBe(12);
  });
  it('validateLearn', () => {
    const ping = { kind: 'program', tier: 1 };
    expect(R.validateLearn({ classKind: 'program', item: ping, level: 1, knownCount: 0, knownMax: 2 }).ok).toBe(true);
    expect(R.validateLearn({ classKind: null, item: ping, level: 1, knownCount: 0, knownMax: 0 }).reason).toBe('kind');
    expect(R.validateLearn({ classKind: 'protocol', item: { kind: 'protocol', tier: 2 }, level: 1, knownCount: 0, knownMax: 2 }).reason).toBe('tier');
    expect(R.validateLearn({ classKind: 'program', item: ping, level: 1, knownCount: 2, knownMax: 2 }).reason).toBe('limit');
    expect(R.validateLearn({ classKind: 'program', item: ping, level: 1, knownCount: 0, knownMax: 2, alreadyKnown: true }).reason).toBe('known');
  });
});

describe('ciberpsicose', () => {
  const cases = [
    [[2, 0], null],
    [[3, 0], 12],
    [[4, 0], 14],
    [[3, -1], null],
    [[3, 1], 14],
    [[0, 1], null],
    [[4, -1], 12]
  ];
  for (const [[count, adjust], cd] of cases) it(`(${count}, ${adjust}) -> ${cd}`, () => expect(R.cyberpsychosis({ count, adjust }).cd).toBe(cd));
});

describe('progressão e morte', () => {
  it('furtivo e domínio', () => {
    expect([1, 3, 5, 9].map(R.sneakAttackDice)).toEqual([1, 2, 3, 5]);
    expect([1, 2, 4, 10].map(R.weaponMasteryBonus)).toEqual([1, 2, 3, 6]);
  });
  it('xp e talentos', () => {
    expect(R.xpToNext(3)).toBe(30);
    expect(R.talentsEarned({ level: 5 })).toBe(3);
    expect(R.talentsEarned({ level: 1, extra: 1 })).toBe(2);
    expect(R.levelUpHpGain({ roll: 1, conMod: -2 })).toBe(1);
  });
  it('morrendo', () => {
    expect(R.dyingRounds({ roll: 1, conMod: -3 })).toBe(1);
    expect(R.dyingRounds({ roll: 4, conMod: 2 })).toBe(6);
    expect(R.dyingStep({ d20: 20, remaining: 2 }).outcome).toBe('revive');
    expect(R.dyingStep({ d20: 7, remaining: 2 })).toEqual({ outcome: 'continue', remaining: 1 });
    expect(R.dyingStep({ d20: 7, remaining: 1 }).outcome).toBe('dead');
  });
  it('drone', () => {
    const s = R.droneStats({ ownerLevel: 1, desMod: 2 });
    expect(s).toMatchObject({ ac: 12, hpMax: 6, attack: 2, die: 'd4' });
    expect([4, 5, 8, 9].map(R.droneDie)).toEqual(['d4', 'd6', 'd6', 'd8']);
    expect(R.droneStats({ ownerLevel: 1, desMod: 2, hpBonus: 4, acBonus: 1, attackBonus: 1, damageBonus: 1 })).toMatchObject({ hpMax: 10, ac: 13, attack: 3, damageBonus: 1 });
    expect(R.droneStats({ ownerLevel: 1, desMod: 2, auxiliary: true }).attack).toBeNull();
  });
  it('descanso', () => {
    expect([R.encounterInterval('safe'), R.encounterInterval('unsafe'), R.encounterInterval('risky'), R.encounterInterval('deadly')]).toEqual([null, 3, 2, 1]);
    expect([R.encounterRolls('safe'), R.encounterRolls('unsafe'), R.encounterRolls('risky'), R.encounterRolls('deadly')]).toEqual([0, 2, 4, 8]);
    expect(R.restOutcome({ interruptionTotals: [14, 12] }).recovers).toBe(true);
    expect(R.restOutcome({ interruptionTotals: [14, 11] }).recovers).toBe(false);
  });
  it('reação', () => {
    expect([2, 3, 5, 6, 8, 9, 11, 12, 15].map(R.reactionResult)).toEqual(['hostile', 'wary', 'wary', 'neutral', 'neutral', 'friendly', 'friendly', 'helpful', 'helpful']);
  });
  it('economia e assistente', () => {
    expect(R.implantPrice({ quality: 'corp' })).toBe(1000);
    expect(R.implantPrice({ quality: 'street', clinic: true })).toBe(330);
    expect(R.implantPrice({ quality: 'military', free: true })).toBe(0);
    expect(R.packageCost([{ price: 100, qty: 2 }, { price: 30 }])).toBe(230);
    expect(R.canAfford(100, 101)).toBe(false);
    expect(R.canRerollAbilities([10, 9, 13, 8, 12, 11])).toBe(true);
    expect(R.canRerollAbilities([10, 9, 14, 8, 12, 11])).toBe(false);
  });
});

describe('dados', () => {
  it('vantagem e desvantagem se anulam', () => {
    expect(D.resolveMode({ advantage: true })).toBe('advantage');
    expect(D.resolveMode({ disadvantage: true })).toBe('disadvantage');
    expect(D.resolveMode({ advantage: true, disadvantage: true })).toBe('normal');
    expect(D.d20Formula({ mode: 'advantage', bonus: 3 })).toBe('2d20kh + 3');
    expect(D.d20Formula({ mode: 'disadvantage', bonus: -1 })).toBe('2d20kl - 1');
    expect(D.d20Formula({ mode: 'normal' })).toBe('1d20');
  });
  it('crítico dobra só os dados', () => {
    expect(D.doubleDice('d8 + 2')).toBe('2d8 + 2');
    expect(D.doubleDice('1d6 + 1d4 + 3')).toBe('2d6 + 2d4 + 3');
    expect(D.damageFormula({ dice: 'd8', bonus: 2, critical: true })).toBe('2d8 + 2');
    expect(D.damageFormula({ dice: 'd6', extraDice: '1d6', bonus: 0 })).toBe('1d6 + 1d6');
    expect(D.damageFormula({ dice: 'd8', advantage: true })).toBe('2d8kh1');
  });
  it('resultado do ataque', () => {
    expect(D.attackOutcome({ natural: 20, total: 5, ac: 30 })).toMatchObject({ hit: true, critical: true });
    expect(D.attackOutcome({ natural: 1, total: 25, ac: 5 })).toMatchObject({ hit: false, fumble: true });
    expect(D.attackOutcome({ natural: 10, total: 14, ac: 14 }).hit).toBe(true);
    expect(D.attackOutcome({ natural: 10, total: 13, ac: 14 }).hit).toBe(false);
    expect(D.attackOutcome({ natural: 10, total: 13 }).hit).toBeNull();
  });
  it('rajada: só CA menor ou igual ao resultado', () => {
    const r = D.burstHits(13, [{ id: 'a', ac: 12 }, { id: 'b', ac: 13 }, { id: 'c', ac: 14 }]);
    expect(r.map((t) => t.hit)).toEqual([true, true, false]);
  });
});

describe('modificadores', () => {
  const src = (label, modifiers, choice = {}) => ({ label, modifiers, choice });
  const m = (key, value, extra = {}) => ({ key, mode: 'add', value, when: '', label: '', ...extra });

  it('soma por chave e mostra de onde veio', () => {
    const { list } = gather([src('A', [m('ac.bonus', '1')]), src('B', [m('ac.bonus', '2'), m('attack.all', '1')])]);
    const r = sum(list, 'ac.bonus');
    expect(r.total).toBe(3);
    expect(r.parts.map((p) => p.label)).toEqual(['A', 'B']);
  });
  it('tokens de escolha na chave; pendente é ignorado', () => {
    const ok = gather([src('Talento', [m('abilities.{choice.abilities}.value', '2')], { abilities: 'for' })]);
    expect(sum(ok.list, 'abilities.for.value').total).toBe(2);
    const pending = gather([src('Talento', [m('abilities.{choice.abilities}.value', '2')])]);
    expect(pending.list).toHaveLength(0);
    expect(pending.pending).toEqual(['Talento']);
  });
  it('condições when', () => {
    expect(whenMatches('noArmor', { armorType: null })).toBe(true);
    expect(whenMatches('noArmor', { armorType: 'light' })).toBe(false);
    expect(whenMatches('armor:medium|heavy', { armorType: 'heavy' })).toBe(true);
    expect(whenMatches('armor:medium|heavy', { armorType: 'light' })).toBe(false);
    expect(whenMatches('family:@choice.family', { weapon: { family: 'pistols' } }, { family: 'pistols' })).toBe(true);
    expect(whenMatches('family:@choice.family', { weapon: { family: 'blades' } }, { family: 'pistols' })).toBe(false);
    expect(whenMatches('domain', { weapon: { family: 'pistols' }, domains: ['pistols'] })).toBe(true);
    expect(whenMatches('domain', { weapon: { family: 'blades' }, domains: ['pistols'] })).toBe(false);
    expect(whenMatches('weapon:light&family:pistols', { weapon: { family: 'pistols', properties: ['light'] } })).toBe(true);
    expect(whenMatches('choice:major=int', {}, { major: 'int' })).toBe(true);
    expect(whenMatches('choice:major=int', {}, { major: 'sab' })).toBe(false);
    expect(whenMatches('class:netrunner', { classId: 'netrunner' })).toBe(true);
    expect(whenMatches('termo-desconhecido', {})).toBe(false);
  });
  it('modos: flag, vantagem, dados, set e multiplicador', () => {
    const { list } = gather([
      src('X', [
        { key: 'initiative.advantage', mode: 'flag', value: '', when: '', label: '' },
        { key: 'check.stealth', mode: 'advantage', value: '', when: '', label: '' },
        { key: 'check.stealth', mode: 'disadvantage', value: '', when: '', label: 'Armadura' },
        m('cast.heal', '1d4'),
        { key: 'damage.charge', mode: 'set', value: '1d6', when: '', label: '' },
        { key: 'resist.fire', mode: 'multiply', value: '0.5', when: '', label: '' }
      ])
    ]);
    expect(hasFlag(list, 'initiative.advantage')).toBe(true);
    expect(advantageSources(list, 'check.stealth')).toEqual({ advantage: ['X'], disadvantage: ['X: Armadura'] });
    expect(diceFormula(list, 'cast.heal')).toBe('1d4');
    expect(setValue(list, 'damage.charge')).toBe('1d6');
    expect(diceFormula(list, 'damage.charge')).toBe('1d6');
    expect(multiplier(list, 'resist.fire')).toBe(0.5);
    expect(multiplier(list, 'resist.cold')).toBe(1);
  });
  it('chave desconhecida não quebra nada', () => {
    const { list } = gather([src('X', [m('chave.inventada', '5')])]);
    expect(sum(list, 'ac.bonus').total).toBe(0);
  });
});
