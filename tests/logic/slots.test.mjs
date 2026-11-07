import { describe, it, expect } from 'vitest';
import { deriveCharacter } from '../../systems/sombraneon/src/logic/character.mjs';

/** Posses: o contador, a grade e as linhas leem o mesmo cálculo (slots.byItem). */
const item = (id, type, system) => ({ id, type, name: id, img: '', identifier: id, system, flags: {} });
const derive = (items) => deriveCharacter({ level: 1, abilityBase: { for: 10, des: 10, con: 10, int: 10, sab: 10, car: 10 }, items });

describe('slots de Posses', () => {
  const items = [
    item('pistola', 'weapon', { slots: 1, equipped: true }),
    item('jaqueta', 'armor', { slots: 1, ac: 12, equipped: true }),
    item('rig', 'gear', { category: 'utility-rig', quantity: 1, slots: 1, perSlot: 1, freeFirst: true }),
    item('carregador', 'gear', { category: 'ammo', quantity: 3, slots: 1, perSlot: 2 }),
    item('racao', 'gear', { category: 'ration', quantity: 1, slots: 1, perSlot: 1 })
  ];

  it('conta só o que ocupa slot: o primeiro rig é grátis e o carregador conta 2 por slot', () => {
    const d = derive(items);
    expect(d.slots.byItem).toEqual({ pistola: 1, jaqueta: 1, rig: 0, carregador: 2, racao: 1 });
    expect(d.slots.used).toBe(5);
  });

  it('veículo não ocupa slot e não entra na conta', () => {
    const d = derive([...items, item('moto', 'gear', { category: 'vehicle', quantity: 2, slots: 1, perSlot: 1 })]);
    expect(d.slots.used).toBe(5);
    expect(d.slots.byItem.moto).toBeUndefined();
  });

  it('a soma de byItem é sempre o total usado e muda com a quantidade', () => {
    const more = items.map((i) => (i.id === 'racao' ? { ...i, system: { ...i.system, quantity: 4 } } : i));
    const d = derive(more);
    expect(Object.values(d.slots.byItem).reduce((a, b) => a + b, 0)).toBe(d.slots.used);
    expect(d.slots.used).toBe(8);
  });

  it('passar do máximo marca o excesso', () => {
    const many = Array.from({ length: 12 }, (_, k) => item('x' + k, 'gear', { category: 'general', quantity: 1, slots: 1, perSlot: 1 }));
    const d = derive(many);
    expect(d.slots.used).toBe(12);
    expect(d.slots.over).toBe(true);
  });
});
