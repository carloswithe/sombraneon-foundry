import { SN } from '../config.mjs';
import { abilityMod, signed } from './abilities.mjs';
import { gather, sum, setValue, hasFlag, flagSources, multiplier, diceFormula, advantageSources } from './modifiers.mjs';
import { maxHp, hitDieFaces, armorClass, slotsMax, slotsUsed, xpToNext, tierMax, talentsEarned, castingKnownMax, castingCd, cyberpsychosis, sneakAttackDice } from './rules.mjs';

const first = (items, type) => items.filter((i) => i.type === type);

/** Uma arma é proficiente se casar com qualquer token da classe (família, identifier, hands:N). */
export function isProficient(weapon, cls) {
  const w = cls?.system?.weapons;
  if (!cls) return true;
  if (w?.all) return true;
  const tokens = [...(w?.allowed ?? [])];
  const s = weapon.system;
  return tokens.some((t) => {
    if (t === s.family || t === weapon.identifier) return true;
    if (t.startsWith('hands:')) return Number(s.hands) === Number(t.slice(6));
    return false;
  });
}

function bestAbility(abilities) {
  return abilities.for.mod >= abilities.des.mod ? 'for' : 'des';
}

/**
 * Deriva tudo do personagem a partir de dados simples (testável sem Foundry).
 * @param {object} input
 * @param {number} input.level
 * @param {Record<string, number>} input.abilityBase  valores base por atributo
 * @param {number[]} [input.hpRolls]
 * @param {number} [input.hpBonus]
 * @param {boolean} [input.cover]
 * @param {number|null} [input.acOverride]
 * @param {boolean} [input.immersed]
 * @param {number} [input.slotsManualBonus]
 * @param {{deckFried?:boolean, nanokitBroken?:boolean}} [input.network]
 * @param {string} [input.unarmedDie]
 * @param {object[]} input.items  { id, type, name, img, identifier, system, flags }
 */
export function deriveCharacter(input) {
  const {
    level = 1,
    abilityBase = {},
    hpRolls = [],
    hpBonus = 0,
    cover = false,
    acOverride = null,
    immersed = false,
    slotsManualBonus = 0,
    network = {},
    unarmedDie = SN.unarmedDie,
    vehicleTraining = [],
    items = []
  } = input;

  const warnings = [];
  const warn = (code, args = {}) => warnings.push({ code, args });

  /* ---- 1. Partição ---- */
  const pick = (type) => {
    const list = first(items, type);
    if (list.length > 1) warn('multipleSelection', { type });
    return list[0] ?? null;
  };
  const cls = pick('class');
  const origin = pick('origin');
  const background = pick('background');
  const alignment = pick('alignment');
  const features = first(items, 'feature');
  const implants = first(items, 'implant');
  const weapons = first(items, 'weapon');
  const armors = first(items, 'armor');
  const gear = first(items, 'gear');
  const programs = first(items, 'program');

  /* ---- 2. Modificadores ---- */
  const sources = [];
  const addSource = (item, modifiers, extra = '') =>
    sources.push({ label: item.name + extra, modifiers, choice: item.system?.choice ?? {} });
  for (const f of features) addSource(f, f.system.modifiers);
  if (cls) addSource(cls, cls.system.modifiers);
  if (origin) addSource(origin, origin.system.modifiers);
  const installed = implants.filter((i) => i.system.installed);
  for (const imp of installed) {
    const q = imp.system.quality;
    addSource(imp, imp.system.tiers?.[q]?.modifiers ?? [], ` (${q})`);
  }
  const { list: mods, pending } = gather(sources);
  for (const p of pending) warn('pendingChoice', { name: p });

  /* ---- 3. Atributos ---- */
  const abilities = {};
  const baseRoll = { level };
  for (const key of SN.abilities) {
    const base = Number(abilityBase[key] ?? 10);
    const { total, parts } = sum(mods, `abilities.${key}.value`, {}, baseRoll);
    const value = base + total;
    abilities[key] = { base, bonus: total, value, mod: abilityMod(value), parts };
  }
  const rollData = {
    level,
    abilities: Object.fromEntries(SN.abilities.map((k) => [k, { value: abilities[k].value, mod: abilities[k].mod }]))
  };
  const mod = (k) => abilities[k].mod;

  /* ---- 4. HP ---- */
  const hitDie = cls?.system.hitDie ?? '';
  const hpExtra = sum(mods, 'hp.max', {}, rollData).total;
  const hpMax = maxHp({ rolls: hpRolls, conMod: mod('con'), bonus: hpBonus, extra: hpExtra });

  /* ---- 5. CA ---- */
  const armorsEquipped = armors.filter((a) => a.system.equipped);
  if (armorsEquipped.length > 1) warn('multipleArmor');
  const armorItem = armorsEquipped[0] ?? null;
  const armorType = armorItem?.system.type ?? null;
  const acCtx = { armorType, classId: cls?.identifier, originId: origin?.identifier };
  const acBonus = sum(mods, 'ac.bonus', acCtx, rollData);
  const ac = armorClass({
    dexMod: mod('des'),
    armor: armorItem ? { ac: armorItem.system.ac, addDex: armorItem.system.addDex, name: armorItem.name } : null,
    bonuses: acBonus.total,
    cover,
    override: acOverride,
    immersed
  });
  if (!immersed && (acOverride === null || acOverride === undefined || acOverride === '')) {
    for (const p of acBonus.parts) ac.parts.push(p);
  }
  const acMelee = sum(mods, 'ac.melee', acCtx, rollData);
  if (armorItem && !isArmorProficient(armorItem, cls)) warn('noArmorProficiency', { name: armorItem.name });

  /* ---- 6. Slots ---- */
  const slotBonus = sum(mods, 'slots.bonus', {}, rollData);
  const stacks = [
    ...weapons.map((w) => ({ quantity: 1, slots: w.system.slots })),
    ...armors.map((a) => ({ quantity: 1, slots: a.system.slots })),
    ...gear.map((g) => ({
      quantity: g.system.quantity,
      perSlot: g.system.perSlot,
      slots: g.system.slots,
      freeFirst: g.system.freeFirst
    }))
  ];
  const slotParts = [{ label: 'FOR', value: Math.max(SN.slotsBase, abilities.for.value) }, ...slotBonus.parts];
  if (slotsManualBonus) slotParts.push({ label: 'Ajuste do Mestre', value: slotsManualBonus });
  const slots = {
    max: slotsMax({ forValue: abilities.for.value, bonuses: slotBonus.total + slotsManualBonus }),
    used: slotsUsed(stacks),
    parts: slotParts
  };
  slots.over = slots.used > slots.max;
  if (slots.over) warn('slotsOver', { used: slots.used, max: slots.max });

  /* ---- 7. Iniciativa, Edge, XP, talentos ---- */
  const initiative = {
    bonus: mod('des') + sum(mods, 'initiative.bonus', {}, rollData).total,
    advantage: hasFlag(mods, 'initiative.advantage'),
    first: hasFlag(mods, 'initiative.first'),
    sources: flagSources(mods, 'initiative.advantage')
  };
  const edge = { max: 1 + sum(mods, 'edge.max', {}, rollData).total };
  const xp = { next: level >= SN.maxLevel ? null : xpToNext(level) };
  const talents = {
    earned: talentsEarned({
      levels: cls?.system.talentLevels ?? [1, 3, 5, 7, 9],
      level,
      extra: sum(mods, 'talents.extra', {}, rollData).total
    }),
    rolled: features.filter((f) => f.system.kind === 'talent' && f.flags?.sombraneon?.talentRoll !== undefined).length
  };
  talents.pending = Math.max(0, talents.earned - talents.rolled);

  /* ---- 8. Conjuração ---- */
  const casting = deriveCasting({ cls, level, mods, rollData, programs, gear, network, immersed, abilities, warn });

  /* ---- 9. Cromo ---- */
  const chromeSlots = { neural: null, body: null, arms: null, legs: null };
  const conflicts = {};
  for (const imp of installed) {
    const s = imp.system.slot;
    if (chromeSlots[s]) (conflicts[s] ??= [chromeSlots[s].name]).push(imp.name);
    else chromeSlots[s] = imp;
  }
  for (const [slot, names] of Object.entries(conflicts)) warn('slotOccupied', { slot, names: names.join(', ') });
  const count = Object.values(chromeSlots).filter(Boolean).length;
  const adjust = sum(mods, 'cyber.adjust', {}, rollData).total;
  const cy = cyberpsychosis({ count, adjust });
  const chrome = {
    slots: chromeSlots,
    count,
    adjust,
    effective: cy.effective,
    cd: cy.cd,
    advantage: hasFlag(mods, 'cyber.advantage')
  };

  /* ---- 10. Ataques ---- */
  const domains = new Set(
    mods.filter((m) => m.key === 'flag.weaponDomain' && m.choice?.family).map((m) => m.choice.family)
  );
  const baseCtx = { armorType, classId: cls?.identifier, originId: origin?.identifier, domains };
  const attacks = [];

  const buildLine = (line) => {
    const { name, img, source, itemId, kind, range, hands = 1, properties = [], dice, family, proficient = true } = line;
    const weapon = { kind, family, properties, hands, identifier: line.identifier };
    const ctx = { ...baseCtx, weapon, unarmed: family === 'unarmed' };
    let ability;
    if (line.ability) ability = line.ability;
    else if (source === 'thrown') ability = 'des';
    else if (properties.includes('light')) ability = bestAbility(abilities);
    else ability = kind === 'ranged' ? 'des' : 'for';
    const parts = [{ label: ability.toUpperCase(), value: mod(ability) }];
    let attackBonus = mod(ability);
    const add = (key) => {
      const r = sum(mods, key, ctx, rollData);
      attackBonus += r.total;
      parts.push(...r.parts);
    };
    if (line.attackBonus) {
      attackBonus += line.attackBonus;
      parts.push({ label: line.name, value: line.attackBonus });
    }
    add('attack.all');
    add(`attack.${kind}`);
    if (ctx.unarmed) add('attack.unarmed');
    let damageBonus = 0;
    const dparts = [];
    for (const key of ['damage.all', `damage.${kind}`, ...(ctx.unarmed ? ['damage.unarmed'] : [])]) {
      const r = sum(mods, key, ctx, rollData);
      damageBonus += r.total;
      dparts.push(...r.parts);
    }
    const advantage = advantageSources(mods, `attack.${kind}`, ctx);
    const row = {
      id: line.id,
      itemId,
      name,
      img,
      source,
      kind,
      range,
      hands,
      properties,
      family,
      ability,
      attackBonus,
      dice,
      damageBonus,
      damage: damageBonus ? `${dice}${signed(damageBonus)}` : dice,
      ignoreArmor: line.ignoreArmor ?? 0,
      stunOn: line.stunOn ?? '',
      magEmpty: !!line.magEmpty,
      usesMagazines: !!line.usesMagazines,
      proficient,
      parts,
      damageParts: dparts,
      advantage: advantage.advantage,
      disadvantage: advantage.disadvantage,
      notes: line.notes ?? ''
    };
    if (!proficient) warn('noProficiency', { name });
    attacks.push(row);
  };

  let hands = 0;
  for (const w of weapons) {
    const s = w.system;
    if (!s.equipped) continue;
    hands += Number(s.hands);
    const properties = [...(s.properties ?? [])];
    const line = {
      id: `weapon-${w.id}`,
      itemId: w.id,
      name: w.name,
      img: w.img,
      identifier: w.identifier,
      source: 'weapon',
      kind: s.kind,
      range: s.range,
      hands: s.hands,
      properties,
      dice: s.damage,
      family: s.family,
      attackBonus: s.attackBonus,
      ignoreArmor: s.ignoreArmor,
      stunOn: s.stunOn,
      magEmpty: s.magEmpty,
      usesMagazines: s.usesMagazines,
      proficient: isProficient(w, cls),
      ability: s.abilityOverride && properties.includes('light') ? s.abilityOverride : undefined
    };
    buildLine(line);
    if (properties.includes('thrown')) {
      buildLine({ ...line, id: `thrown-${w.id}`, source: 'thrown', kind: 'ranged', range: 'near', properties: properties.filter((p) => p !== 'light'), ability: 'des' });
    }
  }
  if (hands > 2) warn('tooManyHands', { hands });

  for (const imp of installed) {
    const w = imp.system.tiers?.[imp.system.quality]?.weapon;
    if (!w || !w.damage) continue;
    buildLine({
      id: `implant-${imp.id}`,
      itemId: imp.id,
      name: w.name || imp.name,
      img: imp.img,
      source: 'implant',
      kind: w.kind || (w.range === 'close' || !w.range ? 'melee' : 'ranged'),
      range: w.range || 'close',
      properties: w.properties ?? [],
      dice: w.damage,
      family: w.family || (w.range === 'close' ? 'unarmed' : 'pistols'),
      ignoreArmor: w.ignoreArmor,
      stunOn: w.stunOn,
      notes: w.notes
    });
  }
  for (const f of features) {
    const w = f.system.weapon;
    if (!w || !w.damage) continue;
    buildLine({
      id: `natural-${f.id}`,
      itemId: f.id,
      name: w.name || f.name,
      img: f.img,
      source: 'natural',
      kind: w.kind || 'melee',
      range: w.range || 'close',
      dice: w.damage,
      family: w.family || 'unarmed',
      notes: w.notes
    });
  }
  buildLine({
    id: 'unarmed',
    name: 'unarmed',
    source: 'unarmed',
    kind: 'melee',
    range: 'close',
    dice: setValue(mods, 'unarmed.die', { unarmed: true }) ?? unarmedDie,
    family: 'unarmed',
    properties: []
  });

  /* ---- 11. Furtivo ---- */
  const sneak = features.some((f) => f.identifier === 'ataque-furtivo') ? sneakAttackDice(level) : 0;

  /* ---- 12. Veículos (livro 4.7) e título de rua (10.8) ---- */
  const trained = new Set([...(cls?.system.vehicles ?? []), ...(background?.system.vehicles ?? []), ...(vehicleTraining ?? [])]);
  const vehicles = Object.fromEntries(SN.vehicleCategories.map((c) => [c, trained.has(c)]));
  vehicles.fromClass = Object.fromEntries(SN.vehicleCategories.map((c) => [c, (cls?.system.vehicles ?? []).includes(c) || (background?.system.vehicles ?? []).includes(c)]));
  const streetTitle = cls ? { classId: cls.identifier, band: Math.min(5, Math.ceil(Math.max(1, level) / 2)) } : null;

  /* ---- 13. Avisos restantes ---- */
  if (casting.kind) {
    if (casting.known.count > casting.known.max) warn('knownOver', { count: casting.known.count, max: casting.known.max });
    for (const p of programs) {
      if (casting.kind !== 'set' && p.system.tier > casting.tierMax) warn('tierOver', { name: p.name });
    }
  }

  return {
    cls,
    origin,
    background,
    alignment,
    abilities,
    level,
    hp: { max: hpMax, hitDie, faces: hitDieFaces(hitDie), extra: hpExtra },
    ac: { ...ac, melee: acMelee.total, meleeParts: acMelee.parts, armor: armorItem },
    initiative,
    edge,
    xp,
    talents,
    slots,
    casting,
    chrome,
    vehicles,
    streetTitle,
    attacks,
    domains: [...domains],
    sneakDice: sneak,
    hands,
    mods,
    flags: {
      hackImmune: hasFlag(mods, 'flag.hackImmuneWithoutNeural'),
      restNoRation: hasFlag(mods, 'rest.noRation'),
      critImmune: hasFlag(mods, 'crit.immune'),
      ignoreCover: hasFlag(mods, 'flag.ignoreCover'),
      nativeInterface: hasFlag(mods, 'flag.nativeInterface'),
      noStims: hasFlag(mods, 'flag.noStims'),
      healHalf: hasFlag(mods, 'flag.healHalf'),
      immunePoison: hasFlag(mods, 'flag.immunePoison'),
      immuneDisease: hasFlag(mods, 'flag.immuneDisease')
    },
    dyingDie: setValue(mods, 'dying.die') ?? 'd4',
    rollData,
    warnings
  };
}

function isArmorProficient(armor, cls) {
  if (!cls) return true;
  const allowed = cls.system.armor ?? [];
  return allowed.includes(armor.system.type);
}

function deriveCasting({ cls, level, mods, rollData, programs, gear, network, immersed, abilities, warn }) {
  const c = cls?.system.casting;
  if (!c?.kind) return { kind: null, known: { max: 0, count: 0 }, tierMax: 0, execBonus: 0, requirement: null };
  const kind = c.kind;
  const ability = c.ability;
  const extras = sum(mods, 'cast.known', {}, rollData).total;
  const known = {
    max: castingKnownMax({ kind, level, extras }),
    count: programs.filter((p) => p.system.kind === kind).length
  };
  const deckItems = gear.filter((g) => g.system.category === 'deck');
  const usableDeck = network.deckFried ? null : [...deckItems].sort((a, b) => b.system.bonus - a.system.bonus)[0] ?? null;
  const hasNanokit = gear.some((g) => g.system.category === 'nanokit');
  const hasRig = gear.some((g) => g.system.category === 'stage-rig');
  let requirement = { met: true, code: '' };
  if (kind === 'program' && !usableDeck) requirement = { met: false, code: deckItems.length ? 'deckFried' : 'noDeck' };
  if (kind === 'protocol' && (!hasNanokit || network.nanokitBroken)) requirement = { met: false, code: hasNanokit ? 'nanokitBroken' : 'noNanokit' };
  if (kind === 'set' && !hasRig) requirement = { met: false, code: 'noRig' };

  const ctx = { classId: cls.identifier };
  const generic = sum(mods, 'cast.bonus', ctx, rollData);
  const parts = [{ label: ability.toUpperCase(), value: abilities[ability].mod }];
  let execBonus = abilities[ability].mod;
  if (kind === 'program' && usableDeck?.system.bonus) {
    execBonus += usableDeck.system.bonus;
    parts.push({ label: usableDeck.name, value: usableDeck.system.bonus });
  }
  execBonus += generic.total;
  parts.push(...generic.parts);
  if (immersed && kind === 'program') {
    execBonus += 1;
    parts.push({ label: 'Imersão', value: 1 });
  }
  const programBonus = {};
  for (const p of programs) {
    if (p.system.kind !== kind) continue;
    const extra = sum(mods, `cast.program.${p.identifier}`, ctx, rollData);
    programBonus[p.identifier] = { total: execBonus + extra.total, parts: [...parts, ...extra.parts] };
  }
  return {
    kind,
    ability,
    known,
    tierMax: kind === 'set' ? 0 : tierMax(level),
    execBonus,
    parts,
    cdBase: kind === 'set' ? 12 : 10,
    deck: usableDeck,
    requirement,
    programBonus,
    healDice: diceFormula(mods, 'cast.heal', ctx)
  };
}

export { castingCd, multiplier };
