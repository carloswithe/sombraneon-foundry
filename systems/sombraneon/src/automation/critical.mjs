import { t, notify, DialogV2 } from '../util.mjs';
import { evaluate, safeSetting } from '../rolls.mjs';
import { CRITICAL_LOCATIONS, CHROME_STATES, criticalModifier, criticalRow } from '../logic/optional.mjs';
import { postEvent } from './casting.mjs';
import { gainExhaustion, exhaustionEnabled } from './exhaustion.mjs';

/** A regra opcional de Efeito crítico está ligada neste mundo? */
export const criticalEnabled = () => safeSetting('ruleCriticalEffect', false) === true;

/** Gatilho em dano de um golpe só (padrão 10; 8 ou 15 por escolha da mesa). */
export const criticalTrigger = () => Number(safeSetting('criticalTrigger', 10)) || 10;

/** Cromo no local: implantes instalados no slot e PMB (braço ou perna). Androides são cromo por inteiro. */
function chromeAt(actor, place) {
  const names = [];
  if (place) {
    for (const i of actor.items ?? []) {
      if (i.type === 'implant' && i.system.installed && i.system.slot === place) names.push(i.name);
      const id = i.system?.identifier;
      if (i.type === 'gear' && ((place === 'arms' && id === 'pmb-braco') || (place === 'legs' && id === 'pmb-perna'))) names.push(i.name);
    }
  }
  const android = !!actor.sn?.flags?.immunePoison;
  return { names, android, isChrome: android || names.length > 0 };
}

/**
 * Efeito crítico (Regras adicionais, capítulo 3): 2d6 com -1 para cada 10 de dano acima de 10, local por
 * 1d4 e a coluna Carne ou Cromo. Posta o resultado no chat; o Choque (8) dá 1 nível de Exaustão ao runner.
 */
export async function rollCriticalEffect(actor, damage) {
  const dmg = Math.floor(Number(damage) || 0);
  if (!actor || dmg <= 0) return null;
  const mod = criticalModifier(dmg);
  const roll = await evaluate(mod ? `2d6 - ${-mod}` : '2d6');
  const row = criticalRow(roll.total);
  const rolls = [roll];

  // local: 1d4; linhas de membro rolam de novo se cair Neural ou Corpo
  let place = null;
  if (row.where === 'neural' || row.where === 'body') place = row.where;
  else if (row.where !== 'none') {
    let d4 = await evaluate('1d4');
    rolls.push(d4);
    place = CRITICAL_LOCATIONS[d4.total - 1];
    while (row.where === 'limb' && (place === 'neural' || place === 'body')) {
      d4 = await evaluate('1d4');
      rolls.push(d4);
      place = CRITICAL_LOCATIONS[d4.total - 1];
    }
  }

  const chrome = place ? chromeAt(actor, place) : { names: [], android: false, isChrome: false };
  const useChrome = chrome.isChrome && row.where !== 'none';
  const character = actor.type === 'character';
  const lines = [t('Crit.Hit', { damage: dmg, mod: mod ? ` ${mod}` : '' }), t('Crit.Rolled', { total: roll.total, name: row.name })];
  if (place) {
    const what = useChrome ? t('Crit.Chrome', { names: chrome.names.length ? chrome.names.join(', ') : t('Crit.Chassis') }) : t('Crit.Flesh');
    lines.push(t('Crit.Place', { place: t(`Crit.Location.${place}`), what }));
  }
  let text = useChrome ? row.chrome : row.flesh;
  if (row.exhaustion && !useChrome && !(character && exhaustionEnabled())) text = t('Crit.ShockNoExhaustion');
  lines.push(text);
  if (useChrome && row.chromeState) lines.push(CHROME_STATES[row.chromeState]);
  await postEvent(actor, t('Crit.Title'), lines, { rolls });

  if (row.exhaustion && character) await gainExhaustion(actor, row.exhaustion, { reason: t('Crit.Title') });
  return { row, place, total: roll.total, chrome: useChrome };
}

/** Ao sofrer um golpe de 10 ou mais de dano, o runner rola o Efeito crítico (se a regra está ligada). */
export function registerCriticalHooks() {
  Hooks.on('sombraneon.damageApplied', async (actor, dmg, options = {}) => {
    if (!criticalEnabled() || actor?.type !== 'character' || options.nonlethal) return;
    if (dmg >= criticalTrigger()) await rollCriticalEffect(actor, dmg);
  });
}

/** Macro: pede o dano e rola o Efeito crítico do token selecionado (para NPCs nomeados e chefes, ou a qualquer hora). */
export async function criticalEffectPrompt(actor) {
  if (!actor) return notify('warn', 'Warn.NoSelection');
  const damage = await DialogV2().prompt({
    window: { title: t('Crit.PromptTitle', { name: actor.name }) },
    content: `<div class="sombraneon sn-dialog"><label>${t('Crit.PromptDamage')}<input type="number" name="damage" min="1" value="${criticalTrigger()}" autofocus></label><p class="sn-hint">${t('Crit.PromptHint')}</p></div>`,
    rejectClose: false,
    ok: { label: t('Roll.Roll'), callback: (event, button) => Number(button.form.elements.damage.value) }
  });
  if (!damage || damage < 1) return null;
  return rollCriticalEffect(actor, damage);
}
