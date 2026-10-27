import { ID, t, esc, notify, DialogV2, confirm, activeGM } from './util.mjs';
import { checkRoll, attackRoll, damageRoll, formulaRoll, safeSetting } from './rolls.mjs';
import { executeProgram } from './automation/casting.mjs';
import { dealDamage, dealHealing } from './automation/socket.mjs';
import { approveTrigger } from './automation/edge.mjs';
import { roundFeedback } from './automation/network.mjs';

const RUNNERS = { check: checkRoll, attack: attackRoll, cast: executeProgram };

function targetActors(uuids = []) {
  const targeted = [...(game.user.targets ?? [])].map((tok) => tok.actor).filter(Boolean);
  if (targeted.length) return targeted;
  return uuids.map((u) => fromUuidSync(u)).map((d) => d?.actor ?? d).filter(Boolean);
}

/** Gasta uma ficha de Edge e repete a rolagem; o novo resultado vale (livro 1.7). */
export async function rerollWithEdge(message) {
  const flags = message.flags?.[ID];
  const spec = flags?.spec;
  if (!spec) return;
  const actor = await fromUuid(spec.actorUuid);
  if (!actor || !actor.isOwner || actor.system.edge.value < 1) return notify('warn', 'Warn.NoEdge');

  // Ressonância (Rocker): +1d6 se houver um Rocker com a habilidade no cenário
  const resonance = canvas?.tokens?.placeables.some((tok) => tok.actor?.items.some((i) => i.system?.automation === 'resonance')) ?? false;
  let withResonance = false;
  if (safeSetting('confirmEdge', true) || resonance) {
    const content = `<div class="sombraneon sn-dialog"><p>${esc(t('Edge.ConfirmText'))}</p>${resonance ? `<label class="sn-chip"><input type="checkbox" name="resonance"><span>${esc(t('Edge.Resonance'))}</span></label>` : ''}</div>`;
    const result = await DialogV2().prompt({
      window: { title: t('Edge.ConfirmTitle') },
      content,
      rejectClose: false,
      ok: { label: t('Edge.Spend'), callback: (event, button) => ({ resonance: !!button.form.elements.resonance?.checked }) }
    });
    if (!result || typeof result !== 'object') return;
    withResonance = result.resonance;
  }

  await actor.update({ 'system.edge.value': actor.system.edge.value - 1 });
  // Desfaz o efeito de estado da rolagem antiga: o novo resultado a substitui.
  if (spec.kind === 'cast') {
    const program = actor.items.get(spec.programId);
    if (program) {
      const patch = {};
      if (flags.cast?.success === false) patch['system.crashed'] = false;
      if (flags.cast?.success && program.system.kind === 'set') patch['system.crashed'] = false;
      if (flags.cast?.success && program.system.uses.max > 0) patch['system.uses.value'] = Math.min(program.system.uses.max, program.system.uses.value + 1);
      if (Object.keys(patch).length) await program.update(patch);
    }
  }
  await message.update({ [`flags.${ID}.superseded`]: true });
  const runner = RUNNERS[spec.kind];
  return runner?.({ ...spec, extraDice: withResonance ? '1d6' : spec.extraDice });
}

async function handle(message, action, button) {
  const flags = message.flags?.[ID] ?? {};
  const spec = flags.spec;
  switch (action) {
    case 'edge':
      return rerollWithEdge(message);
    case 'rollDamage':
      return damageRoll({
        actorUuid: spec.actorUuid,
        attackId: spec.attackId,
        options: flags.damageOptions ?? {},
        critical: button.dataset.critical === 'true',
        burst: flags.burst ?? null,
        stun: button.dataset.stun === 'true'
      });
    case 'applyDamage': {
      const dmg = flags.damage;
      const total = Number(button.dataset.total);
      const targets = targetActors((dmg.lines ?? []).map((l) => l.uuid).filter(Boolean));
      if (!targets.length) return notify('warn', 'Warn.NoTarget');
      const nonlethal = !!button.closest('.sn-card')?.querySelector('input[name="nonlethal"]')?.checked;
      for (const a of targets) await dealDamage(a, total, { type: dmg.type, nonlethal });
      return;
    }
    case 'applyHealing': {
      const total = Number(button.dataset.total);
      const targets = targetActors();
      const self = game.actors.get(message.speaker?.actor);
      const finalTargets = targets.length ? targets : [self].filter(Boolean);
      if (!finalTargets.length) return notify('warn', 'Warn.NoTarget');
      for (const a of finalTargets) await dealHealing(a, total);
      return;
    }
    case 'castDamage':
    case 'castHeal': {
      const cast = flags.cast;
      const actor = await fromUuid(cast.actorUuid);
      const program = actor?.items.get(cast.programId);
      if (!program) return;
      const sys = program.system;
      let formula = action === 'castDamage' ? sys.damage : button.dataset.formula || sys.healing;
      if (cast.critical) formula = formula.replace(/(\d*)d(\d+)/gi, (_, c, f) => `${(c === '' ? 1 : Number(c)) * 2}d${f}`);
      return formulaRoll({
        actor,
        formula,
        label: `${program.name}: ${t(action === 'castDamage' ? 'Rolls.Damage' : 'Rolls.Healing')}`,
        kind: action === 'castDamage' ? 'damage' : 'heal',
        save: action === 'castDamage' && sys.save?.ability ? sys.save : null
      });
    }
    case 'addToSheet': {
      const item = await fromUuid(button.dataset.uuid);
      const actor = game.user.character ?? canvas?.tokens?.controlled[0]?.actor;
      if (!item || !actor) return notify('warn', 'Warn.NoCharacter');
      const { dropItem } = await import('./drop.mjs');
      return dropItem(actor, item);
    }
    case 'approveTrigger':
      if (!game.user.isGM) return;
      await approveTrigger(button.dataset.actorUuid);
      return button.closest('.chat-message')?.querySelector('.sn-card-actions')?.remove();
    case 'denyTrigger':
      if (!game.user.isGM) return;
      return button.closest('.chat-message')?.querySelector('.sn-card-actions')?.remove();
    case 'roundFeedback': {
      if (!game.user.isGM) return;
      const actor = await fromUuid(button.dataset.actorUuid);
      return actor && roundFeedback(actor);
    }
  }
}

export function registerChatHooks() {
  Hooks.on('renderChatMessageHTML', (message, html) => {
    const flags = message.flags?.[ID];
    if (flags?.superseded) html.classList.add('sn-superseded');
    html.querySelectorAll('[data-action]').forEach((button) => {
      const action = button.dataset.action;
      const isEdge = action === 'edge';
      if (isEdge) {
        const uuid = flags?.spec?.actorUuid;
        const actor = uuid ? fromUuidSync(uuid) : null;
        if (!actor?.isOwner || flags?.superseded) {
          button.remove();
          return;
        }
      }
      if (['approveTrigger', 'denyTrigger', 'roundFeedback'].includes(action) && !game.user.isGM) {
        button.disabled = true;
        return;
      }
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        button.disabled = true;
        try {
          await handle(message, action, button);
        } finally {
          button.disabled = false;
        }
      });
    });
  });
}

export { confirm, activeGM };
