import { SN } from './config.mjs';
import { ID, tpl, renderTpl, t, uuidSync, notify, esc } from './util.mjs';
import { signed } from './logic/abilities.mjs';
import { d20Formula, resolveMode, attackOutcome, damageFormula, burstHits } from './logic/dice.mjs';
import { advantageSources, sum, diceFormula } from './logic/modifiers.mjs';
import { sneakAttackDice } from './logic/rules.mjs';

/* ------------------------------------------------------------------ */
/* Utilitários de rolagem                                              */
/* ------------------------------------------------------------------ */

export async function evaluate(formula, data = {}) {
  const roll = new Roll(formula, data);
  await roll.evaluate();
  return roll;
}

/** Faces do d20 de uma rolagem, marcando o descartado. */
export function d20Faces(roll) {
  const term = roll.dice.find((d) => d.faces === 20);
  return term ? term.results.map((r) => ({ value: r.result, discarded: !r.active })) : [];
}

export function naturalOf(roll) {
  const term = roll.dice.find((d) => d.faces === 20);
  return term?.results.find((r) => r.active)?.result ?? term?.results[0]?.result ?? 0;
}

export const MODE_LABEL = { normal: '', advantage: 'Rolls.Advantage', disadvantage: 'Rolls.Disadvantage' };

/** Estados que dão desvantagem a ataques e à próxima ação. */
function statusDisadvantages(actor, kind) {
  const out = [];
  if (!actor?.statuses) return out;
  if (kind === 'attack' && actor.statuses.has('tremor')) out.push(t('Status.tremor'));
  if (actor.statuses.has('sick')) out.push(t('Status.sick'));
  if (actor.getFlag?.(ID, 'nextActionDisadvantage')) out.push(t('Rolls.NextAction'));
  return out;
}

/** Modo de rolagem escolhido no chat (público, privado, às cegas ou para si). */
export function currentRollMode() {
  try {
    return game.settings.get('core', 'rollMode');
  } catch {
    return 'publicroll';
  }
}

/** Cria o cartão de chat com a rolagem (compatível com Dice So Nice) e flags de repetição. */
export async function postCard({ actor, template, data, rolls = [], flags = {}, flavor = '', rollMode }) {
  const content = await renderTpl(tpl(template), data);
  const messageData = {
    speaker: ChatMessage.getSpeaker({ actor }),
    content,
    flavor,
    rolls,
    flags: { [ID]: flags }
  };
  ChatMessage.applyRollMode(messageData, rollMode ?? currentRollMode());
  return ChatMessage.create(messageData);
}

const canEdge = (actor) => !!actor && actor.type === 'character' && actor.isOwner && actor.system.edge.value >= 1;

function partsText(parts) {
  return parts.map((p) => `${p.label} ${signed(p.value)}`).join(', ');
}

/* ------------------------------------------------------------------ */
/* Testes (d20 + atributo contra CD)                                   */
/* ------------------------------------------------------------------ */

/**
 * Teste de atributo (livro 1.2). `spec`: { actorUuid, ability, tags[], cd, label, mode, bonus,
 * knowledge, extraDice }. Serializável, para repetir com Edge.
 */
export async function checkRoll(spec) {
  const actor = await fromUuid(spec.actorUuid);
  if (!actor) return null;
  const sn = actor.sn;
  const ability = spec.ability ?? 'for';
  const abilityMod = sn ? sn.abilities[ability].mod : 0;
  const parts = [{ label: ability.toUpperCase(), value: abilityMod }];
  const advSources = [];
  const disSources = [];
  let bonus = abilityMod;

  if (sn) {
    for (const tag of spec.tags ?? []) {
      const key = `check.${tag}`;
      const s = sum(sn.mods, key, {}, sn.rollData);
      bonus += s.total;
      parts.push(...s.parts);
      const a = advantageSources(sn.mods, key, {});
      advSources.push(...a.advantage);
      disSources.push(...a.disadvantage);
    }
    if (ability === 'sab' && (spec.tags ?? []).includes('cyberpsychosis') && sn.chrome.advantage) advSources.push(t('Rolls.NatTrait'));
  }
  if (spec.knowledge) advSources.push(`${t('Rolls.Knowledge')}: ${spec.knowledge}`);
  if (spec.mode === 'advantage') advSources.push(t('Rolls.Manual'));
  if (spec.mode === 'disadvantage') disSources.push(t('Rolls.Manual'));
  disSources.push(...statusDisadvantages(actor, 'check'));

  const situational = Number(spec.bonus) || 0;
  if (situational) {
    bonus += situational;
    parts.push({ label: t('Rolls.Situational'), value: situational });
  }
  const mode = resolveMode({ advantage: advSources.length > 0, disadvantage: disSources.length > 0 });
  let formula = d20Formula({ mode, bonus });
  if (spec.extraDice) formula += ` + ${spec.extraDice}`;
  const roll = await evaluate(formula);
  const natural = naturalOf(roll);
  const cd = spec.cd ? Number(spec.cd) : null;
  let outcome = 'neutral';
  if (natural === 20) outcome = 'crit';
  else if (natural === 1) outcome = 'fumble';
  else if (cd !== null) outcome = roll.total >= cd ? 'success' : 'failure';

  if (actor.getFlag(ID, 'nextActionDisadvantage')) await actor.unsetFlag(ID, 'nextActionDisadvantage');

  return postCard({
    actor,
    template: 'chat/check.hbs',
    flavor: spec.label,
    rolls: [roll],
    flags: { spec: { ...spec, kind: 'check' }, rollKind: 'check' },
    data: {
      title: spec.label || t('Rolls.Check'),
      actorName: actor.name,
      img: actor.img,
      dice: d20Faces(roll),
      total: roll.total,
      natural,
      cd,
      outcome,
      outcomeLabel: t(`Rolls.Outcome.${outcome}`),
      mode,
      modeLabel: MODE_LABEL[mode] ? t(MODE_LABEL[mode]) : '',
      advSources,
      disSources,
      partsText: partsText(parts),
      canEdge: canEdge(actor)
    }
  });
}

/* ------------------------------------------------------------------ */
/* Ataques                                                             */
/* ------------------------------------------------------------------ */

/** Localiza a linha de ataque de qualquer tipo de ator. */
export function findAttackLine(actor, attackId) {
  if (actor.type === 'character') {
    if (attackId === 'drone') return null;
    return actor.sn?.attacks.find((a) => a.id === attackId) ?? null;
  }
  if (actor.type === 'npc') {
    const l = actor.system.attackLines.find((a) => a.id === attackId);
    return l ? { ...l, attackBonus: l.bonus, dice: l.damage, damageBonus: 0, properties: [], kind: l.range === 'close' ? 'melee' : 'ranged', parts: [{ label: t('Sheet.Bonus'), value: l.bonus }], advantage: [], disadvantage: [], ignoreArmor: 0, stunOn: '' } : null;
  }
  if (actor.type === 'ice') {
    const a = actor.system.attack;
    return { id: 'ice', name: a.name || actor.name, attackBonus: a.bonus, dice: a.damage, damageBonus: 0, properties: [], kind: 'ranged', range: 'near', parts: [{ label: t('Sheet.Bonus'), value: a.bonus }], advantage: [], disadvantage: [], ignoreArmor: 0, stunOn: '', damageType: a.type, count: a.count };
  }
  if (actor.type === 'drone') {
    const s = actor.system.stats;
    if (!s || s.attack === null) return null;
    return { id: 'drone', name: actor.name, attackBonus: s.attack, dice: s.die, damageBonus: s.damageBonus, properties: [], kind: 'ranged', range: 'near', parts: [{ label: t('Sheet.Bonus'), value: s.attack }], advantage: [], disadvantage: [], ignoreArmor: 0, stunOn: '' };
  }
  return null;
}

function targetsFromUser() {
  return [...(game.user.targets ?? [])].map((tok) => ({ uuid: tok.document.uuid, name: tok.name, ac: tok.actor?.targetAc ?? null, surprised: !!tok.actor?.statuses?.has('surprised') }));
}

/** Aciona a rolagem de ataque. `spec`: { actorUuid, attackId, mode, options, targets }. */
export async function attackRoll(spec) {
  const actor = await fromUuid(spec.actorUuid);
  if (!actor) return null;
  const line = findAttackLine(actor, spec.attackId);
  if (!line) return notify('warn', 'Warn.NoAttack');
  const options = spec.options ?? {};
  const targets = spec.targets ?? targetsFromUser();
  const advSources = [...line.advantage];
  const disSources = [...line.disadvantage, ...statusDisadvantages(actor, 'attack')];
  if (spec.mode === 'advantage') advSources.push(t('Rolls.Manual'));
  if (spec.mode === 'disadvantage') disSources.push(t('Rolls.Manual'));
  if (options.unaware || targets.some((x) => x.surprised)) advSources.push(t('Rolls.Unaware'));
  if (actor.getFlag(ID, 'nextAttackAdvantage')) {
    advSources.push(t('Rolls.StimAdvantage'));
    await actor.unsetFlag(ID, 'nextAttackAdvantage');
  }

  const parts = [...line.parts];
  let bonus = line.attackBonus;
  if (options.aim) {
    bonus += 2;
    parts.push({ label: t('Rolls.Aim'), value: 2 });
  }
  const situational = Number(options.situational) || 0;
  if (situational) {
    bonus += situational;
    parts.push({ label: t('Rolls.Situational'), value: situational });
  }
  const mode = resolveMode({ advantage: advSources.length > 0, disadvantage: disSources.length > 0 });
  const roll = await evaluate(d20Formula({ mode, bonus }) + (spec.extraDice ? ` + ${spec.extraDice}` : ""));
  const natural = naturalOf(roll);

  // CA do primeiro alvo, descontando "ignora CA" da arma
  let acText = null;
  let outcome = attackOutcome({ natural, total: roll.total });
  let burst = null;
  const showTarget = safeSetting('showTargetResult', true);
  if (targets.length && showTarget) {
    const ac = targets[0].ac === null ? null : targets[0].ac - (line.ignoreArmor ?? 0);
    outcome = attackOutcome({ natural, total: roll.total, ac });
    if (ac !== null) acText = t('Rolls.VsAc', { ac });
  }
  if (options.burst && targets.length) {
    burst = burstHits(roll.total, targets.map((x) => ({ ...x, ac: x.ac === null ? 99 : x.ac - (line.ignoreArmor ?? 0) }))).map((x) => ({ name: x.name, uuid: x.uuid, ac: x.ac, hit: natural === 20 ? true : natural === 1 ? false : x.hit }));
  }

  const ownMag = line.source === 'weapon' && line.usesMagazines;
  if (natural === 1 && line.kind === 'ranged' && ownMag && line.itemId) {
    await actor.items.get(line.itemId)?.update({ 'system.magEmpty': true });
  }
  if (options.burst && ownMag) {
    const ammo = actor.items.find((i) => i.type === 'gear' && i.system.category === 'ammo' && i.system.quantity > 0);
    if (ammo) await ammo.update({ 'system.quantity': ammo.system.quantity - 1 });
  }
  if (options.aim && actor.getFlag(ID, 'aimed')) await actor.unsetFlag(ID, 'aimed');
  if (actor.getFlag(ID, 'nextActionDisadvantage')) await actor.unsetFlag(ID, 'nextActionDisadvantage');

  const hitState = outcome.critical ? 'crit' : outcome.fumble ? 'fumble' : outcome.hit === true ? 'success' : outcome.hit === false ? 'failure' : 'neutral';
  return postCard({
    actor,
    template: 'chat/attack.hbs',
    flavor: line.name,
    rolls: [roll],
    flags: { spec: { ...spec, kind: 'attack', targets }, rollKind: 'attack', hit: outcome.hit, critical: outcome.critical, damageOptions: options, burst },
    data: {
      title: line.name,
      actorName: actor.name,
      img: line.img || actor.img,
      dice: d20Faces(roll),
      total: roll.total,
      natural,
      outcome: hitState,
      outcomeLabel: t(`Rolls.Outcome.${hitState}`),
      acText,
      mode,
      modeLabel: MODE_LABEL[mode] ? t(MODE_LABEL[mode]) : '',
      advSources,
      disSources,
      partsText: partsText(parts),
      damage: line.damageBonus ? `${line.dice}${signed(line.damageBonus)}` : line.dice,
      stun: line.stunOn === 'hit' || (line.stunOn === 'nat20' && natural === 20),
      magEmpty: natural === 1 && line.kind === 'ranged' && ownMag,
      burst,
      targets: targets.map((x) => x.name),
      canEdge: canEdge(actor),
      canDamage: outcome.hit !== false
    }
  });
}

/** Rola o dano de um ataque. */
export async function damageRoll(spec) {
  const actor = await fromUuid(spec.actorUuid);
  if (!actor) return null;
  const line = findAttackLine(actor, spec.attackId);
  if (!line) return notify('warn', 'Warn.NoAttack');
  const options = spec.options ?? {};
  const sn = actor.sn;
  const faces = Number(/d(\d+)/.exec(line.dice)?.[1] ?? 6);
  const extra = [];
  if (options.sneak && sn?.sneakDice) extra.push(`${sn.sneakDice}d${faces}`);
  if (options.charge && sn) {
    const charge = diceFormula(sn.mods, 'damage.charge', {});
    if (charge) extra.push(charge);
  }
  const rolls = [];
  const lines = [];
  const targets = spec.burst?.length ? spec.burst.filter((x) => x.hit) : [{ uuid: null, name: '' }];
  const once = spec.burst?.length && safeSetting('burstDamage', 'perTarget') === 'single';
  for (const [i, target] of targets.entries()) {
    if (once && i > 0) {
      lines.push({ ...lines[0], target: target.name, uuid: target.uuid });
      continue;
    }
    const formula = damageFormula({ dice: line.dice, bonus: line.damageBonus, extraDice: extra.join(' + '), critical: !!spec.critical, advantage: !!options.twin });
    const roll = await evaluate(formula);
    rolls.push(roll);
    lines.push({ formula, total: roll.total, target: target.name, uuid: target.uuid });
  }
  return postCard({
    actor,
    template: 'chat/damage.hbs',
    flavor: `${line.name}: ${t('Rolls.Damage')}`,
    rolls,
    flags: { rollKind: 'damage', damage: { type: line.damageType ?? '', lines: lines.map((l) => ({ total: l.total, uuid: l.uuid })), nonlethal: false } },
    data: {
      title: `${line.name}: ${t('Rolls.Damage')}`,
      actorName: actor.name,
      img: actor.img,
      critical: !!spec.critical,
      lines,
      ignoreArmor: line.ignoreArmor,
      stun: !!spec.stun
    }
  });
}

/** Rolagem simples de uma fórmula com cartão (cura, dano de programa etc.). */
export async function formulaRoll({ actor, formula, label, kind = 'heal', targets = [], type = '', save = null }) {
  const roll = await evaluate(formula, actor?.getRollData?.() ?? {});
  return postCard({
    actor,
    template: 'chat/damage.hbs',
    flavor: label,
    rolls: [roll],
    flags: { rollKind: kind, damage: { type, kind, lines: [{ total: roll.total, uuid: null }], save } },
    data: {
      title: label,
      actorName: actor?.name ?? '',
      img: actor?.img,
      lines: [{ formula: roll.formula, total: roll.total, target: '' }],
      healing: kind === 'heal',
      save
    }
  });
}

export function safeSetting(key, fallback) {
  try {
    return game.settings.get(ID, key);
  } catch {
    return fallback;
  }
}

export { esc, uuidSync, SN, sneakAttackDice };
