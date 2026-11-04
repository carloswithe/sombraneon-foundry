import { t } from '../util.mjs';
import { safeSetting } from '../rolls.mjs';
import { clampExhaustion, exhaustionDead } from '../logic/optional.mjs';
import { postEvent } from './casting.mjs';

/** A regra opcional de Exaustão (capítulo 2 das Regras adicionais) está ligada neste mundo? */
export const exhaustionEnabled = () => safeSetting('ruleExhaustion', true) !== false;

/** Exaustão não vale para ameaças e NPCs: só para personagens. */
const applies = (actor) => actor?.type === 'character' && exhaustionEnabled();

/** Morte por Exaustão: na hora, sem rodadas de morrendo e sem chance de voltar com um 20 natural. */
async function dieOfExhaustion(actor) {
  await actor.update({ 'system.dying': { active: false, remaining: 0, rolled: 0, stable: false } });
  await actor.setStatus('dying', false);
  await actor.setStatus('unconscious', true);
  await actor.setStatus('dead', true);
  return postEvent(actor, t('Exhaustion.Title'), [t('Exhaustion.Dead', { name: actor.name })]);
}

/**
 * Define o nível de Exaustão (0 a 6). No nível 6 o runner morre.
 * @returns {Promise<{level:number, dead:boolean}|null>}
 */
export async function setExhaustion(actor, level, { announce = false, reason = '' } = {}) {
  if (!applies(actor)) return null;
  const before = clampExhaustion(actor.system.exhaustion);
  const next = clampExhaustion(level);
  if (next !== before) await actor.update({ 'system.exhaustion': next });
  const dead = exhaustionDead(next);
  if (dead && !exhaustionDead(before)) await dieOfExhaustion(actor);
  else if (announce && next !== before) {
    const key = next > before ? 'Exhaustion.Gained' : 'Exhaustion.Removed';
    await postEvent(actor, t('Exhaustion.Title'), [t(key, { name: actor.name, level: next, penalty: next, reason })]);
  }
  return { level: next, dead };
}

/** Ganha níveis de Exaustão (cair a 0 HP, Choque do Efeito crítico). */
export async function gainExhaustion(actor, n = 1, options = {}) {
  if (!applies(actor)) return null;
  return setExhaustion(actor, clampExhaustion(actor.system.exhaustion) + n, { announce: true, ...options });
}

/** Remove níveis (descanso bem-sucedido, Convalescer). */
export async function removeExhaustion(actor, n = 1, options = {}) {
  if (!applies(actor)) return null;
  return setExhaustion(actor, clampExhaustion(actor.system.exhaustion) - n, { announce: true, ...options });
}
