import { describe, it, expect } from 'vitest';
import { deriveCharacter } from '../../systems/sombraneon/src/logic/character.mjs';
import { PACKS } from '../../data/content/index.mjs';

/**
 * Livro v0.7: a escolha entre FOR e DES vale só para corpo a corpo Leve e Leve arremessada; arma de fogo
 * ataca sempre com DES. Gel de reparo para Androides.
 */
const weapons = PACKS.find((p) => p.name === 'armas').docs;
const gear = PACKS.find((p) => p.name === 'equipamento').docs;
const weapon = (id) => weapons.find((w) => w.identifier === id);

/** Personagem de nível 1 com um único item equipado e os atributos pedidos. */
function derive(id, abilityBase, systemOver = {}) {
  const w = weapon(id);
  const { img, name } = w;
  const items = [{ id: 'w1', type: 'weapon', name, img, identifier: id, system: { ...w.system, equipped: true, ...systemOver }, flags: {} }];
  return deriveCharacter({ level: 1, abilityBase, items });
}
const line = (d, source) => d.attacks.find((a) => a.source === source);

describe('ataque com FOR ou DES (livro v0.7)', () => {
  const strong = { for: 16, des: 8 };
  const agile = { for: 8, des: 16 };

  it('a pistola leve não é mais Leve e ataca sempre com DES', () => {
    expect(weapon('pistola-leve').system.properties).not.toContain('light');
    const d = derive('pistola-leve', strong);
    expect(line(d, 'weapon').ability).toBe('des');
    expect(line(d, 'weapon').attackBonus).toBe(-1);
  });

  it('arma de fogo ignora a escolha manual de FOR', () => {
    const d = derive('pistola-leve', strong, { abilityOverride: 'for' });
    expect(line(d, 'weapon').ability).toBe('des');
  });

  it('corpo a corpo Leve usa o melhor entre FOR e DES, ou a escolha manual', () => {
    expect(line(derive('faca', strong), 'weapon').ability).toBe('for');
    expect(line(derive('faca', agile), 'weapon').ability).toBe('des');
    expect(line(derive('faca', strong, { abilityOverride: 'des' }), 'weapon').ability).toBe('des');
  });

  it('corpo a corpo sem Leve usa FOR', () => {
    expect(line(derive('katana-monofio', agile), 'weapon').ability).toBe('for');
  });

  it('a faca arremessada (Leve) usa FOR ou DES, o que for melhor', () => {
    expect(weapon('faca').system.properties).toEqual(expect.arrayContaining(['light', 'thrown']));
    expect(line(derive('faca', strong), 'thrown').ability).toBe('for');
    expect(line(derive('faca', agile), 'thrown').ability).toBe('des');
  });

  it('as armas de fogo do livro atacam com DES', () => {
    for (const id of ['pistola-pesada', 'submetralhadora', 'escopeta', 'fuzil', 'rifle-de-precisao', 'arma-inteligente']) {
      expect(line(derive(id, strong), 'weapon').ability, id).toBe('des');
    }
  });
});

describe('gel de reparo (livro v0.7, 8.5)', () => {
  const gel = gear.find((g) => g.identifier === 'gel-de-reparo');

  it('é um equipamento de 100 cr, 2 por slot, para Androides', () => {
    expect(gel).toBeTruthy();
    expect(gel.system.price).toBe(100);
    expect(gel.system.perSlot).toBe(2);
    expect(gel.system.category).toBe('repair-gel');
    expect(gel.system.description).toMatch(/Android/);
  });

  it('o stim agora diz que não funciona em Androides', () => {
    const stim = gear.find((g) => g.identifier === 'stim');
    expect(stim.system.description).toMatch(/Androides/);
  });

  it('o rig utilitário é a mochila do runner', () => {
    const rig = gear.find((g) => g.identifier === 'rig-utilitario');
    expect(rig.system.description).toMatch(/mochila/);
  });
});
