import { ID, t, activeGM } from '../util.mjs';
import { dyingRounds, dyingStep } from '../logic/rules.mjs';
import { evaluate, checkRoll, naturalOf } from '../rolls.mjs';
import { postEvent } from './casting.mjs';

/** Item com automação e usos disponíveis (Filtro de dor, Duro de matar). */
function usable(actor, automation) {
  return actor.items.find((i) => {
    if (i.type === 'implant') return i.system.installed && i.tier?.automation === automation && (i.usesInfo.uses?.value ?? 0) > 0;
    return i.type === 'feature' && i.system.automation === automation && (i.system.uses?.value ?? 0) > 0;
  });
}

async function spendUse(item) {
  const { path, uses } = item.usesInfo;
  await item.update({ [`${path}.value`]: uses.value - 1 });
}

/**
 * HP chegou a 0 (livro 1.5 e 03 seção 9.1): Filtro de dor, depois Duro de matar, depois morrendo.
 * Executado só pelo Mestre ativo.
 */
export async function handleZeroHp(actor, { nonlethal = false } = {}) {
  if (actor.type !== 'character') return handleOtherZero(actor);
  if (nonlethal) {
    await actor.setStatus('unconscious', true);
    return postEvent(actor, t('Dying.Title'), [t('Dying.Nonlethal', { name: actor.name })]);
  }
  const filter = usable(actor, 'pain-filter');
  if (filter) {
    await spendUse(filter);
    await actor.update({ 'system.hp.value': 1 });
    return postEvent(actor, t('Dying.Title'), [t('Dying.PainFilter', { name: actor.name })]);
  }
  const tough = usable(actor, 'tough-as-nails');
  if (tough) {
    await spendUse(tough);
    const message = await checkRoll({ actorUuid: actor.uuid, ability: 'con', tags: ['resist-injury'], cd: 15, label: tough.name });
    const roll = message?.rolls?.[0];
    if (roll && (naturalOf(roll) === 20 || (naturalOf(roll) !== 1 && roll.total >= 15))) {
      await actor.update({ 'system.hp.value': 1 });
      return postEvent(actor, t('Dying.Title'), [t('Dying.ToughHeld', { name: actor.name })]);
    }
  }
  const die = actor.sn?.dyingDie ?? 'd4';
  const roll = await evaluate(`1${die}`);
  const conMod = actor.sn?.abilities.con.mod ?? 0;
  const rounds = dyingRounds({ roll: roll.total, conMod });
  await actor.update({ 'system.dying': { active: true, remaining: rounds, rolled: rounds, stable: false } });
  await actor.setStatus('unconscious', true);
  await actor.setStatus('dying', true);
  return postEvent(actor, t('Dying.Title'), [t('Dying.Fell', { name: actor.name, rounds, die: die.toUpperCase(), con: conMod })], { rolls: [roll] });
}

async function handleOtherZero(actor) {
  if (actor.type === 'drone') await actor.update({ 'system.destroyed': true });
  await actor.setStatus('dead', true);
}

/** Um passo do morrendo (início do turno ou botão Avançar rodada). */
export async function dyingTurn(actor) {
  const d = actor.system.dying;
  if (!d.active || d.stable) return null;
  const roll = await evaluate('1d20');
  const step = dyingStep({ d20: roll.total, remaining: d.remaining });
  if (step.outcome === 'revive') {
    await actor.update({ 'system.hp.value': 1, 'system.dying': { active: false, remaining: 0, rolled: d.rolled, stable: false } });
    await actor.setStatus('dying', false);
    await actor.setStatus('unconscious', false);
    return postEvent(actor, t('Dying.Title'), [t('Dying.Revived', { name: actor.name })], { rolls: [roll] });
  }
  if (step.outcome === 'dead') {
    await actor.update({ 'system.dying.active': false, 'system.dying.remaining': 0 });
    await actor.setStatus('dying', false);
    await actor.setStatus('dead', true);
    return postEvent(actor, t('Dying.Title'), [t('Dying.Dead', { name: actor.name })], { rolls: [roll] });
  }
  await actor.update({ 'system.dying.remaining': step.remaining });
  return postEvent(actor, t('Dying.Title'), [t('Dying.Round', { name: actor.name, d20: roll.total, left: step.remaining })], { rolls: [roll] });
}

/** Estabilizar: INT CD 15, Perto, com kit médico (livro 1.5). */
export async function stabilize(target, healer) {
  // kit médico vale em orgânicos; em um Android vale o kit de ferramentas (livro 1.5)
  const category = target?.sn?.flags.immunePoison ? 'tool' : 'medical';
  const kit = healer?.items.some((i) => i.type === 'gear' && i.system.category === category);
  const message = await checkRoll({ actorUuid: healer.uuid, ability: 'int', tags: [], cd: 15, label: t('Dying.Stabilize'), mode: kit ? 'advantage' : 'normal' });
  const roll = message?.rolls?.[0];
  if (roll && (naturalOf(roll) === 20 || (naturalOf(roll) !== 1 && roll.total >= 15))) {
    await target.update({ 'system.dying.stable': true });
    return postEvent(target, t('Dying.Title'), [t('Dying.Stabilized', { name: target.name })]);
  }
  return null;
}

export function registerDyingHooks() {
  Hooks.on('preUpdateActor', (actor, changes, options) => {
    if (foundry.utils.hasProperty(changes, 'system.hp.value')) options.snPrevHp = actor.system.hp?.value;
  });

  Hooks.on('updateActor', async (actor, changes, options) => {
    if (game.user.id !== activeGM()?.id) return;
    if (!foundry.utils.hasProperty(changes, 'system.hp.value')) return;
    const prev = options.snPrevHp;
    const now = actor.system.hp.value;
    if (prev === undefined) return;
    if (prev > 0 && now <= 0) {
      await handleZeroHp(actor, { nonlethal: !!options.sombraneon?.nonlethal });
    } else if (prev <= 0 && now > 0 && actor.type === 'character' && actor.system.dying.active) {
      await actor.update({ 'system.dying': { active: false, remaining: 0, rolled: 0, stable: false } });
      await actor.setStatus('dying', false);
      await actor.setStatus('unconscious', false);
    } else if (prev <= 0 && now > 0 && actor.type !== 'character') {
      await actor.setStatus('dead', false);
    }
    // Imerso: corpo ferido exige CON CD 12 para continuar conectado (livro 9.7)
    if (actor.type === 'character' && actor.system.network.immersed && now < prev && now > 0) {
      const { woundedBody } = await import('./network.mjs');
      await woundedBody(actor);
    }
  });

  Hooks.on('combatTurnChange', async (combat, prior, current) => {
    if (game.user.id !== activeGM()?.id) return;
    const combatant = combat.combatants.get(current?.combatantId);
    const actor = combatant?.actor;
    if (actor?.type === 'character' && actor.system.dying.active && !actor.system.dying.stable) await dyingTurn(actor);
  });
}

export { ID };
