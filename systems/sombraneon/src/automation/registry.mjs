import { ID, t, esc, notify, renderTpl, tpl, enrichHtml } from '../util.mjs';
import { evaluate, formulaRoll } from '../rolls.mjs';
import { postEvent } from './casting.mjs';
import { dealHealing } from './socket.mjs';

/**
 * Handlers de automação por `identifier` (docs/spec/05, seção 8). Habilidade sem handler é só texto.
 * O handler genérico `use` consome 1 uso, posta um cartão e rola `roll` se houver.
 */

function automationOf(item) {
  return item.type === 'implant' ? item.tier?.automation : item.system.automation;
}

async function consume(item) {
  const { path, uses } = item.usesInfo;
  if (!path || !uses || uses.max <= 0) return true;
  if (uses.value <= 0) {
    notify('warn', 'Warn.NoUses', { name: item.name });
    return false;
  }
  await item.update({ [`${path}.value`]: uses.value - 1 });
  return true;
}

async function infoCard(actor, item, lines = []) {
  const description = await enrichHtml(item.system.description);
  const content = await renderTpl(tpl('chat/info.hbs'), { name: item.name, img: item.img, type: lines.join(' '), description, uuid: item.uuid, canAdd: false });
  return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content });
}

const level = (actor) => actor.system.level;

export const HANDLERS = {
  /** Genérico: consome uso, mostra o texto e rola a fórmula (cura em si mesmo se `healsSelf`). */
  async use(actor, item) {
    if (!(await consume(item))) return null;
    await infoCard(actor, item);
    const roll = item.system.roll;
    if (roll?.formula) {
      const data = actor.getRollData();
      const r = await evaluate(roll.formula, data);
      if (roll.healsSelf) await dealHealing(actor, r.total);
      await postEvent(actor, roll.label || item.name, [t('Use.Rolled', { total: r.total })], { rolls: [r] });
    }
    return true;
  },

  async 'stim-system'(actor, item) {
    if (actor.sn?.flags.noStims) return notify('warn', 'Warn.NoStims');
    if (!(await consume(item))) return null;
    const r = await evaluate('1d6 + @level', actor.getRollData());
    await dealHealing(actor, r.total);
    const military = item.system.quality === 'military';
    if (military) await actor.setFlag(ID, 'nextAttackAdvantage', true);
    return postEvent(actor, item.name, [t('Use.Healed', { total: r.total }), ...(military ? [t('Use.NextAttackAdvantage')] : [])], { rolls: [r] });
  },

  async injector(actor, item) {
    if (actor.sn?.flags.noStims) return notify('warn', 'Warn.NoStims');
    if (!(await consume(item))) return null;
    const military = item.system.quality === 'military';
    const r = await evaluate(military ? '1d6 + 1d4' : '1d6');
    await dealHealing(actor, r.total);
    return postEvent(actor, item.name, [t('Use.Healed', { total: r.total })], { rolls: [r] });
  },

  async 'kinetic-negate'(actor, item) {
    if (!(await consume(item))) return null;
    return postEvent(actor, item.name, [t('Use.KineticNegate')]);
  },

  async 'step-subroutine'(actor, item) {
    if (!(await consume(item))) return null;
    return postEvent(actor, item.name, [t('Use.StepSubroutine')]);
  },

  async 'memory-boost'(actor, item) {
    if (!(await consume(item))) return null;
    const r = await evaluate('1d6');
    return postEvent(actor, item.name, [t('Use.MemoryBoost', { n: r.total })], { rolls: [r] });
  },

  async 'eco-digital'(actor, item) {
    return infoCard(actor, item, [t('Use.EcoDigital')]);
  },

  async 'first-aid'(actor, item) {
    const target = [...(game.user.targets ?? [])][0]?.actor ?? null;
    if (!target) return notify('warn', 'Warn.NoTarget');
    if (!(await consume(item))) return null;
    await target.update({ 'system.dying.stable': true });
    return postEvent(actor, item.name, [t('Use.FirstAid', { name: target.name })]);
  },

  async 'deck-absorb'(actor, item) {
    return infoCard(actor, item, [t('Use.Passive')]);
  },

  async 'pain-filter'(actor, item) {
    return infoCard(actor, item, [t('Use.Passive')]);
  },

  async 'tough-as-nails'(actor, item) {
    return infoCard(actor, item, [t('Use.Passive')]);
  }
};

/** Usa uma habilidade, talento ou implante: handler registrado, genérico `use` ou só o texto. */
export async function useItem(actor, item) {
  const key = automationOf(item);
  const handler = HANDLERS[key];
  if (handler) return handler(actor, item);
  if (item.hasUses) return HANDLERS.use(actor, item);
  return infoCard(actor, item);
}

export { level, esc, formulaRoll };
