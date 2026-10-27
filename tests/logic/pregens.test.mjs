import { describe, it, expect } from 'vitest';
import { buildPregen, PREGEN_DEFS } from '../../data/content/module-actors.mjs';

const get = (name) => buildPregen(PREGEN_DEFS.find((d) => d.name === name));
const line = (d, nameRe) => d.attacks.find((a) => nameRe.test(a.name));

/** Quadro de valores esperados: docs/spec/05, seção 11.6 (cenários A1 a A6). */
describe('fichas prontas', () => {
  it('A1 Brasa (Solo)', () => {
    const { derived: d, spent } = get('Brasa');
    expect(d.hp.max).toBe(10);
    expect(d.ac.value).toBe(13);
    expect(d.slots.max).toBe(17);
    const gun = line(d, /Pistola pesada/);
    expect(gun.attackBonus).toBe(3);
    expect(gun.damage).toBe('d8+2');
    expect(d.initiative.advantage).toBe(true);
    expect(spent).toBe(550);
    expect(d.chrome.count).toBe(2);
    expect(d.chrome.cd).toBeNull();
  });

  it('A2 Vetor (Netrunner)', () => {
    const { derived: d, spent } = get('Vetor');
    expect(d.hp.max).toBe(4);
    expect(d.ac.value).toBe(11);
    expect(d.casting.kind).toBe('program');
    expect(d.casting.execBonus).toBe(3);
    expect(d.casting.programBonus.ping.total).toBe(4);
    expect(d.casting.cdBase + 1).toBe(11);
    expect(d.casting.known.count).toBe(2);
    expect(d.casting.requirement.met).toBe(true);
    expect(spent).toBe(610);
  });

  it('A3 Sutura (Hyperdoc)', () => {
    const { derived: d, spent } = get('Sutura');
    expect(d.hp.max).toBe(7);
    expect(d.ac.value).toBe(11);
    expect(d.casting.execBonus).toBe(2);
    expect(d.casting.healDice).toBe('1d4');
    expect(spent).toBe(570);
  });

  it('A4 Névoa (Ghost)', () => {
    const { derived: d, spent } = get('Névoa');
    expect(d.hp.max).toBe(4);
    expect(d.ac.value).toBe(14);
    expect(line(d, /Pistola leve/).attackBonus).toBe(3);
    expect(d.sneakDice).toBe(1);
    expect(spent).toBe(590);
  });

  it('A5 Riff (Rocker)', () => {
    const { derived: d, spent } = get('Riff');
    expect(d.hp.max).toBe(6);
    expect(d.ac.value).toBe(12);
    expect(d.casting.kind).toBe('set');
    expect(d.casting.execBonus).toBe(3);
    expect(d.casting.cdBase).toBe(12);
    expect(d.casting.programBonus.refrao.total).toBe(4);
    expect(d.talents.earned).toBe(2);
    expect(spent).toBe(640);
  });

  it('A6 Zangão (Rigger)', () => {
    const { derived: d, spent } = get('Zangão');
    expect(d.hp.max).toBe(7);
    expect(d.ac.value).toBe(14);
    expect(line(d, /Pistola leve/).attackBonus).toBe(3);
    expect(spent).toBe(680);
    const droneMods = d.mods.filter((m) => m.key.startsWith('drone.'));
    expect(droneMods.map((m) => m.key).sort()).toEqual(['drone.attack', 'drone.damage']);
  });

  it('o pacote inicial de cada classe bate com o custo do livro', () => {
    const costs = { Brasa: 550, Vetor: 610, Sutura: 570, Névoa: 590, Riff: 640, Zangão: 680 };
    for (const [name, cost] of Object.entries(costs)) expect(get(name).spent).toBe(cost);
  });
});
