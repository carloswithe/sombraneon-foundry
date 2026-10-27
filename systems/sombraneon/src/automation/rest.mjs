import { SN } from '../config.mjs';
import { ID, t, esc, DialogV2, notify } from '../util.mjs';
import { restOutcome, encounterRolls, encounterInterval } from '../logic/rules.mjs';
import { abilityMod } from '../logic/abilities.mjs';
import { evaluate, safeSetting, d20Faces, naturalOf, checkRoll } from '../rolls.mjs';
import { postEvent, rollSurge } from './casting.mjs';
import { opts } from '../apps/dialogs.mjs';

/** Estoque de ração do ator: pacotes com 3 usos (livro 8.5). */
function rationItem(actor) {
  return actor.items.find((i) => i.type === 'gear' && i.system.category === 'ration' && (i.system.uses.value > 0 || i.system.quantity > 1)) ?? null;
}

async function consumeRation(actor) {
  const item = rationItem(actor);
  if (!item) return false;
  const u = item.system.uses;
  if (u.value > 0) {
    if (u.value === 1 && item.system.quantity > 1) await item.update({ 'system.quantity': item.system.quantity - 1, 'system.uses.value': u.max });
    else await item.update({ 'system.uses.value': u.value - 1 });
  } else {
    await item.update({ 'system.quantity': item.system.quantity - 1, 'system.uses.value': u.max - 1 });
  }
  return true;
}

/** Restaura os usos que voltam por descanso (e por cena). */
async function restoreUses(actor) {
  const updates = [];
  for (const item of actor.items) {
    if (item.type === 'implant') {
      const patch = {};
      for (const q of SN.qualityOrder) {
        const u = item.system.tiers[q].uses;
        if (u.max > 0 && (u.per === 'rest' || u.per === 'scene')) patch[`system.tiers.${q}.uses.value`] = u.max;
      }
      if (Object.keys(patch).length) updates.push({ _id: item.id, ...patch });
      continue;
    }
    if (item.type === 'gear') continue;
    const u = item.system.uses;
    if (u?.max > 0 && (u.per === 'rest' || u.per === 'scene')) updates.push({ _id: item.id, 'system.uses.value': u.max });
    if (item.type === 'program' && item.system.crashed) updates.push({ _id: item.id, 'system.crashed': false });
  }
  if (updates.length) await actor.updateEmbeddedDocuments('Item', updates.reduce((acc, u) => {
    const prev = acc.find((x) => x._id === u._id);
    if (prev) Object.assign(prev, u);
    else acc.push(u);
    return acc;
  }, []));
}

/** Teste de ciberpsicose (livro 7.3): d20 + SAB contra CD 12 ou 14; falha causa Surto. */
export async function cyberpsychosisTest(actor) {
  const chrome = actor.sn?.chrome;
  if (!chrome?.cd) return null;
  const message = await checkRoll({
    actorUuid: actor.uuid,
    ability: 'sab',
    tags: ['cyberpsychosis'],
    cd: chrome.cd,
    label: t('Chrome.TestLabel')
  });
  const roll = message?.rolls?.[0];
  if (roll && roll.total < chrome.cd && naturalOf(roll) !== 20) await rollSurge(actor);
  else if (roll && naturalOf(roll) === 1) await rollSurge(actor);
  return message;
}

/**
 * Descanso (reboot, livro 1.8): ração, interrupções, restauração e ciberpsicose.
 * @param {object} options { quality, interruptions, ignoreRation }
 */
export async function restActor(actor, options = {}) {
  if (actor.type !== 'character') return null;
  const quality = options.quality ?? 'safe';
  const lines = [];
  const sn = actor.sn;
  const noRation = sn.flags.restNoRation || safeSetting('restRequiresRation', true) === false;

  if (!noRation && !options.ignoreRation && !rationItem(actor)) {
    notify('warn', 'Warn.NoRation');
    return null;
  }
  if (!noRation) {
    const had = rationItem(actor);
    if (had) await consumeRation(actor);
    lines.push(t('Rest.RationSpent'));
  } else if (sn.flags.restNoRation) lines.push(t('Rest.NoRationNeeded'));

  // Interrupções: CON CD 12; qualquer falha gasta a ração e nada é recuperado.
  const totals = [];
  const conMod = sn.abilities.con.mod;
  const rolls = [];
  for (let i = 0; i < (options.interruptions ?? 0); i++) {
    const r = await evaluate(`1d20 + ${conMod}`);
    rolls.push(r);
    totals.push(r.total);
    lines.push(t('Rest.Interruption', { n: i + 1, total: r.total, result: r.total >= 12 ? t('Rest.Held') : t('Rest.Failed') }));
  }
  const outcome = restOutcome({ interruptionTotals: totals });
  if (!outcome.recovers) {
    lines.push(t('Rest.NothingRecovered'));
    return postEvent(actor, t('Rest.Title', { name: actor.name }), lines, { rolls });
  }

  // Restauração
  const hpBefore = actor.system.hp.value;
  const patch = {
    'system.hp.value': actor.system.hp.max,
    'system.network.deckFried': false,
    'system.network.immersed': false,
    'system.network.firewall.active': false,
    'system.edge.triggerUsed': false,
    'system.dying.active': false,
    'system.dying.stable': false
  };
  if (sn.cls?.identifier === 'ghost' || actor.items.some((i) => i.system.automation === 'street-edge')) {
    if (actor.system.edge.value === 0) {
      patch['system.edge.value'] = 1;
      lines.push(t('Rest.StreetEdge'));
    }
  }
  await actor.update(patch);
  await restoreUses(actor);
  for (const f of ['nextActionDisadvantage', 'aimed']) if (actor.getFlag(ID, f)) await actor.unsetFlag(ID, f);
  if (actor.statuses.has('dying') || actor.statuses.has('unconscious')) {
    await actor.setStatus('dying', false);
    await actor.setStatus('unconscious', false);
  }
  if (actor.statuses.has('immersed')) await actor.setStatus('immersed', false);
  lines.push(t('Rest.Recovered', { hp: actor.system.hp.max - hpBefore }));
  lines.push(t('Rest.UsesRestored'));

  // Encontros (informativo, para o Mestre)
  const nEnc = encounterRolls(quality);
  const encRolls = [];
  if (nEnc > 0 && options.rollEncounters !== false) {
    const results = [];
    for (let i = 0; i < nEnc; i++) {
      const r = await evaluate('1d6');
      encRolls.push(r);
      results.push(r.total);
    }
    const hits = results.filter((x) => x === 1).length;
    lines.push(t('Rest.Encounters', { n: nEnc, hours: encounterInterval(quality), hits }));
  } else lines.push(t('Rest.NoEncounters'));

  const card = await postEvent(actor, t('Rest.Title', { name: actor.name }), lines, { rolls: [...rolls, ...encRolls] });
  if (safeSetting('autoCyberpsychosisOnRest', true) && actor.sn?.chrome?.cd) await cyberpsychosisTest(actor);
  return card;
}

/** Janela de descanso. */
export async function restDialog(actor) {
  const sn = actor.sn;
  const noRation = sn?.flags.restNoRation;
  const quality = SN.restQuality;
  const qualityOptions = Object.keys(quality).map((k) => ({ value: k, label: t(`Rest.Quality.${k}`) }));
  const ration = rationItem(actor);
  const content = `<div class="sombraneon sn-dialog">
    <label>${esc(t('Rest.AreaQuality'))}<select name="quality">${opts(qualityOptions, safeSetting('restQuality', 'safe'))}</select></label>
    <label>${esc(t('Rest.InterruptionsLabel'))}<input type="number" name="interruptions" min="0" value="0"></label>
    <p class="sn-hint">${esc(noRation ? t('Rest.NoRationNeeded') : ration ? t('Rest.HasRation') : t('Rest.MissingRation'))}</p>
    ${game.user.isGM && !noRation && !ration ? `<label class="sn-chip"><input type="checkbox" name="ignoreRation"><span>${esc(t('Rest.IgnoreRation'))}</span></label>` : ''}
  </div>`;
  const result = await DialogV2().prompt({
    window: { title: t('Rest.DialogTitle', { name: actor.name }) },
    content,
    rejectClose: false,
    ok: {
      label: t('Rest.Rest'),
      callback: (event, button) => ({
        quality: button.form.elements.quality.value,
        interruptions: Number(button.form.elements.interruptions.value) || 0,
        ignoreRation: !!button.form.elements.ignoreRation?.checked
      })
    }
  });
  if (!result || typeof result !== 'object') return null;
  return restActor(actor, result);
}

export { abilityMod, d20Faces };
