import { describe, it, expect } from 'vitest';
import { deriveCharacter } from '../../systems/sombraneon/src/logic/character.mjs';
import { clampExhaustion, exhaustionPenalty, exhaustionDead, criticalModifier, criticalRow, CRITICAL_ROWS } from '../../systems/sombraneon/src/logic/optional.mjs';
import { PACKS } from '../../data/content/index.mjs';

/** Regras adicionais opcionais (docs/sombraneon-regras-adicionais.md): Exaustão e Efeito crítico. */
describe('Exaustão (capítulo 2)', () => {
  it('vai de 0 a 6, a penalidade é o nível (não se soma) e o 6 é morte', () => {
    expect([-3, 0, 1, 3, 5, 6, 9, 'x'].map(clampExhaustion)).toEqual([0, 0, 1, 3, 5, 6, 6, 0]);
    expect([0, 1, 2, 3, 4, 5].map(exhaustionPenalty)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(exhaustionDead(5)).toBe(false);
    expect(exhaustionDead(6)).toBe(true);
  });

  const base = { level: 3, abilityBase: { for: 10, des: 14, con: 12, int: 10, sab: 10, car: 10 }, items: [] };
  const unarmed = (d) => d.attacks.find((a) => a.family === 'unarmed');

  it('tira o nível da iniciativa e do bônus de ataque, e informa a penalidade', () => {
    const clean = deriveCharacter(base);
    const tired = deriveCharacter({ ...base, exhaustion: 2 });
    expect(tired.initiative.bonus).toBe(clean.initiative.bonus - 2);
    expect(tired.exhaustion).toEqual({ level: 2, penalty: 2, dead: false });
    expect(clean.exhaustion).toEqual({ level: 0, penalty: 0, dead: false });
    expect(unarmed(tired).attackBonus).toBe(unarmed(clean).attackBonus - 2);
    expect(unarmed(tired).parts.some((p) => p.label === 'Exaustão' && p.value === -2)).toBe(true);
  });

  it('a penalidade não mexe no dano', () => {
    expect(unarmed(deriveCharacter({ ...base, exhaustion: 4 })).damage).toBe(unarmed(deriveCharacter(base)).damage);
  });

  it('nível 6 marca a morte', () => {
    expect(deriveCharacter({ ...base, exhaustion: 6 }).exhaustion.dead).toBe(true);
  });
});

describe('Efeito crítico (capítulo 3)', () => {
  it('o modificador é -1 para cada 10 de dano acima de 10, com máximo de -10', () => {
    const table = { 10: 0, 19: 0, 20: -1, 29: -1, 30: -2, 50: -4, 99: -8, 100: -9, 109: -9, 110: -10, 400: -10 };
    for (const [dmg, mod] of Object.entries(table)) expect(criticalModifier(Number(dmg)), `dano ${dmg}`).toBe(mod);
    expect(criticalModifier(8)).toBe(0);
  });

  it('a linha da tabela segue o total: 2 ou menos é o pior, 12 ou mais é nada', () => {
    const name = (n) => criticalRow(n).id;
    expect(name(-8)).toBe('vital');
    expect(name(2)).toBe('vital');
    expect([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15].map(name)).toEqual(['decepado', 'hemorragia', 'esmagado', 'abala', 'ferido', 'choque', 'tonto', 'derrubado', 'sem-folego', 'escapou', 'escapou']);
  });

  it('a tabela do módulo bate com a lógica (11 linhas, mesmos nomes) e a de local tem 4', () => {
    const tables = PACKS.find((p) => p.name === 'tabelas-do-mestre').docs;
    const table = tables.find((d) => d.identifier === 'efeito-critico');
    expect(table.formula).toBe('2d6');
    expect(table.results).toHaveLength(CRITICAL_ROWS.length);
    table.results.forEach((r, i) => expect(r.name.replace(/\s*\[.*\]\s*$/, '').toLowerCase()).toBe(CRITICAL_ROWS[i].name.toLowerCase()));
    const local = tables.find((d) => d.identifier === 'efeito-critico-local');
    expect(local.results.map((r) => r.name)).toEqual(['Neural', 'Corpo', 'Braços', 'Pernas']);
  });
});

describe('conteúdo das Regras adicionais no módulo', () => {
  it('o compêndio vira diário de referência com os 9 capítulos', () => {
    const j = PACKS.find((p) => p.name === 'referencias').docs.find((d) => d.identifier === 'compendio-de-regras-adicionais');
    expect(j.pages).toHaveLength(9);
    expect(j.pages.map((p) => p.name)).toContain('2. Exaustão');
  });

  it('PMB de braço e de perna: 150 cr, sem slot', () => {
    const gear = PACKS.find((p) => p.name === 'equipamento').docs;
    for (const id of ['pmb-braco', 'pmb-perna']) {
      expect(gear.find((x) => x.identifier === id).system).toMatchObject({ price: 150, slots: 0 });
    }
  });
});
