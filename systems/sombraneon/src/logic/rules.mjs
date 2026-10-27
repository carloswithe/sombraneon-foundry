import { SN } from '../config.mjs';
import { abilityMod } from './abilities.mjs';

/* ---------- HP ---------- */

/** HP máximo: cada rolagem + mod. de CON, mínimo 1 por nível (livro 1.5). */
export function maxHp({ rolls = [], conMod = 0, bonus = 0, extra = 0 } = {}) {
  const gains = rolls.map((r) => Math.max(1, Number(r) + conMod));
  return gains.reduce((a, b) => a + b, 0) + bonus + extra;
}

export function hitDieFaces(die) {
  const m = /d(\d+)/i.exec(String(die ?? ''));
  return m ? Number(m[1]) : 0;
}

/* ---------- CA ---------- */

/**
 * CA (livro 1.4): 10 + DES sem armadura; com armadura, o valor dela (+ DES se `addDex`).
 * Imerso: corpo indefeso, CA 5 (livro 9.7). `override` fixa a CA.
 */
export function armorClass({ dexMod = 0, armor = null, bonuses = 0, cover = false, override = null, immersed = false } = {}) {
  const parts = [];
  let base;
  if (armor) {
    base = armor.ac;
    parts.push({ label: armor.name ?? 'Armadura', value: armor.ac });
    if (armor.addDex) parts.push({ label: 'DES', value: dexMod });
  } else {
    base = 10;
    parts.push({ label: 'Base', value: 10 }, { label: 'DES', value: dexMod });
  }
  let value = base + (armor ? (armor.addDex ? dexMod : 0) : dexMod);
  const baseValue = value;
  if (bonuses) value += bonuses;
  if (cover) {
    value += 2;
    parts.push({ label: 'Cobertura', value: 2 });
  }
  if (immersed) return { value: 5, base: baseValue, parts: [{ label: 'Corpo imerso', value: 5 }] };
  if (override !== null && override !== undefined && override !== '') {
    return { value: Number(override), base: baseValue, parts: [{ label: 'Fixada pelo Mestre', value: Number(override) }] };
  }
  return { value, base: baseValue, parts };
}

/* ---------- Slots ---------- */

export function slotsMax({ forValue = 10, bonuses = 0 } = {}) {
  return Math.max(SN.slotsBase, Math.trunc(forValue)) + bonuses;
}

/**
 * Slots usados. Cada pilha ocupa ceil(quantidade / porSlot) * slots.
 * `freeFirst`: a primeira unidade de um item marcado (rig utilitário) não ocupa slot.
 * @param {{quantity?:number, perSlot?:number, slots?:number, freeFirst?:boolean}[]} stacks
 */
export function slotsUsed(stacks) {
  let freeLeft = 1;
  let used = 0;
  for (const s of stacks) {
    let qty = Math.max(0, Number(s.quantity ?? 1));
    const perSlot = Math.max(1, Number(s.perSlot ?? 1));
    const slots = Number(s.slots ?? 1);
    if (s.freeFirst && freeLeft > 0 && qty > 0) {
      qty -= 1;
      freeLeft -= 1;
    }
    used += Math.ceil(qty / perSlot) * slots;
  }
  return used;
}

/* ---------- XP e nível ---------- */

export function xpToNext(level) {
  return level * 10;
}

export function tierMax(level) {
  return Math.min(5, Math.ceil(Math.max(1, level) / 2));
}

/** Talentos ganhos: níveis da lista alcançados + extras (Nat). */
export function talentsEarned({ levels = [1, 3, 5, 7, 9], level = 1, extra = 0 } = {}) {
  return levels.filter((n) => n <= level).length + extra;
}

/** Ganho de HP ao subir de nível. */
export function levelUpHpGain({ roll, conMod }) {
  return Math.max(1, roll + conMod);
}

/* ---------- Conjuração ---------- */

/** Limite de itens conhecidos (programas, protocolos ou Sets). */
export function castingKnownMax({ kind, level = 1, extras = 0 } = {}) {
  if (kind === 'set') return 3 + [4, 7, 10].filter((n) => n <= level).length + extras;
  if (kind === 'program' || kind === 'protocol') return 2 + (level - 1) + extras;
  return 0;
}

/** CD de execução: 10 + tier (programas e protocolos) ou 12 fixa (Sets). */
export function castingCd({ kind, tier = 1 }) {
  return kind === 'set' ? 12 : 10 + tier;
}

/** Valida o aprendizado de um programa, protocolo ou Set (03 seção 6.7). */
export function validateLearn({ classKind, item, level, knownCount, knownMax, alreadyKnown = false }) {
  if (alreadyKnown) return { ok: false, reason: 'known' };
  if (!classKind || item.kind !== classKind) return { ok: false, reason: 'kind' };
  if (item.kind !== 'set' && item.tier > tierMax(level)) return { ok: false, reason: 'tier' };
  if (knownCount >= knownMax) return { ok: false, reason: 'limit' };
  return { ok: true };
}

/* ---------- Ciberpsicose ---------- */

/** Contagem efetiva e CD do teste de SAB (livro 7.3). */
export function cyberpsychosis({ count = 0, adjust = 0 } = {}) {
  const effective = count > 0 ? Math.min(4, Math.max(0, count + adjust)) : 0;
  const cd = effective >= 4 ? SN.cyber.fourSlots : effective === 3 ? SN.cyber.threeSlots : null;
  return { effective, cd };
}

/* ---------- Ataque furtivo e domínio ---------- */

export function sneakAttackDice(level) {
  return 1 + Math.floor((Math.max(1, level) - 1) / 2);
}

export function weaponMasteryBonus(level) {
  return 1 + Math.floor(level / 2);
}

/* ---------- Morte ---------- */

/** Rodadas restantes ao cair a 0 HP: 1d4 + mod. de CON, mínimo 1 (livro 1.5). */
export function dyingRounds({ roll, conMod = 0 }) {
  return Math.max(1, roll + conMod);
}

/**
 * Um passo do morrendo no início do turno: 20 natural revive com 1 HP,
 * senão consome uma chance; ao zerar, morre.
 */
export function dyingStep({ d20, remaining }) {
  if (d20 === 20) return { outcome: 'revive', remaining };
  const left = remaining - 1;
  return left <= 0 ? { outcome: 'dead', remaining: 0 } : { outcome: 'continue', remaining: left };
}

/* ---------- Drone ---------- */

export function droneDie(level) {
  return level >= 9 ? 'd8' : level >= 5 ? 'd6' : 'd4';
}

/** Estatísticas do drone (livro 4.6) a partir do dono. */
export function droneStats({ ownerLevel = 1, desMod = 0, acBonus = 0, hpBonus = 0, attackBonus = 0, damageBonus = 0, auxiliary = false } = {}) {
  return {
    ac: 12 + acBonus,
    hpMax: 4 + 2 * ownerLevel + hpBonus,
    attack: auxiliary ? null : desMod + attackBonus,
    die: auxiliary ? null : droneDie(ownerLevel),
    damageBonus: auxiliary ? 0 : damageBonus
  };
}

/* ---------- Descanso ---------- */

/** Intervalo em horas entre encontros por qualidade da área (livro 1.8). */
export function encounterInterval(quality) {
  return SN.restQuality[quality] ?? null;
}

export function encounterRolls(quality) {
  const interval = encounterInterval(quality);
  return interval ? Math.floor(8 / interval) : 0;
}

/**
 * Resultado do descanso: cada interrupção exige CON CD 12; qualquer falha gasta a ração
 * e nada é recuperado.
 */
export function restOutcome({ interruptionTotals = [], cd = 12 }) {
  const failed = interruptionTotals.some((t) => t < cd);
  return { recovers: !failed, spendsRation: true };
}

/* ---------- Reação por facção ---------- */

export function reactionResult(total) {
  if (total <= 2) return 'hostile';
  if (total <= 5) return 'wary';
  if (total <= 8) return 'neutral';
  if (total <= 11) return 'friendly';
  return 'helpful';
}

/* ---------- Economia ---------- */

export function implantPrice({ quality, clinic = false, free = false }) {
  if (free) return 0;
  const base = SN.implantQualities[quality] ?? 0;
  return clinic ? Math.round(base * (1 + SN.clinicSurcharge)) : base;
}

export function canAfford(balance, price) {
  return balance >= price;
}

export function packageCost(items) {
  return items.reduce((sum, i) => sum + Number(i.price ?? 0) * Number(i.qty ?? 1), 0);
}

/* ---------- Assistente ---------- */

/** "Se nenhum atributo ficar em 14 ou mais, o jogador pode rolar os seis de novo." */
export function canRerollAbilities(values) {
  return values.every((v) => v < 14);
}

export { abilityMod };
