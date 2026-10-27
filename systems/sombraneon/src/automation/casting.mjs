import { ID, t, notify, renderTpl, tpl, esc, enrichHtml } from '../util.mjs';
import { signed } from '../logic/abilities.mjs';
import { d20Formula, resolveMode, doubleDice } from '../logic/dice.mjs';
import { advantageSources } from '../logic/modifiers.mjs';
import { evaluate, d20Faces, naturalOf, postCard, safeSetting, currentRollMode } from '../rolls.mjs';
import { alertEvent, Alert } from './alert.mjs';
import { SNSocket } from './socket.mjs';

/** Cartão simples de evento (resultado de Feedback, Rejeição, Surto, descanso...). */
export async function postEvent(actor, title, lines = [], { whisper = false, rolls = [], rollMode } = {}) {
  const content = await renderTpl(tpl('chat/event.hbs'), { title, actorName: actor?.name ?? '', img: actor?.img, lines });
  const data = { speaker: ChatMessage.getSpeaker({ actor }), content, rolls };
  if (whisper) data.whisper = ChatMessage.getWhisperRecipients('GM').map((u) => u.id);
  else if (rolls.length) ChatMessage.applyRollMode(data, rollMode ?? currentRollMode());
  return ChatMessage.create(data);
}

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ------------------------------------------------------------------ */
/* Feedback (programas) e Rejeição (protocolos)                        */
/* ------------------------------------------------------------------ */

export async function rollFeedback(actor, program) {
  const absorber = actor.items.find((i) => i.type === 'feature' && i.system.automation === 'deck-absorb' && i.system.uses.value > 0);
  if (absorber) {
    await absorber.update({ 'system.uses.value': absorber.system.uses.value - 1 });
    return postEvent(actor, t('Feedback.Title'), [t('Feedback.Absorbed', { name: absorber.name })]);
  }
  const roll = await evaluate('1d6');
  const n = roll.total;
  const lines = [`${t('Feedback.Result', { n })}: ${t(`Feedback.${n}.Name`)}`, t(`Feedback.${n}.Text`)];
  const programs = actor.items.filter((i) => i.type === 'program' && i.system.kind === 'program');
  switch (n) {
    case 1: {
      const dmg = await evaluate('1d6');
      lines.push(t('Feedback.Damage', { n: dmg.total }));
      await actor.applyDamage(dmg.total, { type: 'neural' });
      await actor.setFlag(ID, 'nextActionDisadvantage', true);
      break;
    }
    case 2:
      await actor.update({ 'system.network.deckFried': true });
      break;
    case 3:
      await alertEvent(1);
      break;
    case 4:
      await actor.update({ 'system.network.traced': true });
      break;
    case 5: {
      const others = programs.filter((p) => p.id !== program?.id && !p.system.crashed);
      const pick = others.length ? sample(others) : null;
      if (pick) {
        await pick.update({ 'system.crashed': true });
        lines.push(t('Feedback.Crashed', { name: pick.name }));
      }
      break;
    }
    case 6: {
      const tier = program?.system.tier;
      const same = programs.filter((p) => p.system.tier === tier && !p.system.crashed);
      await Promise.all(same.map((p) => p.update({ 'system.crashed': true })));
      lines.push(t('Feedback.CrashedMany', { n: same.length }));
      break;
    }
  }
  return postEvent(actor, t('Feedback.Title'), lines, { rolls: [roll] });
}

export async function rollRejection(actor, program, targetActor) {
  const roll = await evaluate('1d6');
  const n = roll.total;
  const lines = [`${t('Rejection.Result', { n })}: ${t(`Rejection.${n}.Name`)}`, t(`Rejection.${n}.Text`)];
  const protocols = actor.items.filter((i) => i.type === 'program' && i.system.kind === 'protocol');
  switch (n) {
    case 1: {
      const dmg = await evaluate('1d4');
      lines.push(t('Rejection.Damage', { n: dmg.total }));
      if (targetActor) await SNSocket.request('applyDamage', { uuid: targetActor.uuid, amount: dmg.total });
      break;
    }
    case 2:
      if (targetActor) await SNSocket.request('setStatus', { uuid: targetActor.uuid, status: 'sick', active: true });
      break;
    case 3: {
      const others = protocols.filter((p) => p.id !== program?.id && !p.system.crashed);
      const pick = others.length ? sample(others) : null;
      if (pick) {
        await pick.update({ 'system.crashed': true });
        lines.push(t('Feedback.Crashed', { name: pick.name }));
      }
      break;
    }
    case 4: {
      const dmg = await evaluate('1d4');
      lines.push(t('Rejection.Reversed', { n: dmg.total }));
      break;
    }
    case 5:
      await actor.update({ 'system.network.nanokitBroken': true });
      break;
    case 6:
      await rollSurge(targetActor ?? actor);
      break;
  }
  return postEvent(actor, t('Rejection.Title'), lines, { rolls: [roll] });
}

/* ------------------------------------------------------------------ */
/* Surto de ciberpsicose                                               */
/* ------------------------------------------------------------------ */

export async function rollSurge(actor) {
  const roll = await evaluate('1d6');
  const n = roll.total;
  const lines = [`${t(`Surge.${n}.Name`)}: ${t(`Surge.${n}.Text`)}`];
  if (n === 1) await actor.setStatus('tremor', true);
  if (n === 3 || n === 5) lines.push(t('Surge.UntilSceneEnd'));
  if (n === 6) {
    const rounds = await evaluate('1d4');
    lines.push(t('Surge.Blackout', { n: rounds.total }));
    await actor.setStatus('unconscious', true);
  }
  return postEvent(actor, t('Surge.Title'), lines, { rolls: [roll] });
}

/* ------------------------------------------------------------------ */
/* Execução de programas, protocolos e Sets                            */
/* ------------------------------------------------------------------ */

const REQUIREMENT_KEYS = { noDeck: 'NoDeck', deckFried: 'DeckFried', noNanokit: 'NoNanokit', nanokitBroken: 'NanokitBroken', noRig: 'NoRig' };

/**
 * Executa um programa, protocolo ou Set (livro 9.2, 9.3 e 4.5).
 * Sucesso mantém o programa disponível; falha vira Crash; 1 natural dispara Feedback ou Rejeição.
 * Sets só são gastos em sucesso.
 */
export async function executeProgram(spec) {
  const actor = await fromUuid(spec.actorUuid);
  const program = actor?.items.get(spec.programId);
  if (!actor || !program) return null;
  const sn = actor.sn;
  const casting = sn.casting;
  const sys = program.system;
  if (casting.kind !== sys.kind) return notify('warn', 'Warn.WrongKind');
  if (!casting.requirement.met && !spec.force) return notify('warn', `Warn.Req.${REQUIREMENT_KEYS[casting.requirement.code]}`);
  if (sys.crashed) return notify('warn', 'Warn.Crashed', { name: program.name });
  if (sys.uses.max > 0 && sys.uses.value <= 0) return notify('warn', 'Warn.NoUses', { name: program.name });

  const isSet = sys.kind === 'set';
  const cd = isSet ? 12 : 10 + sys.tier;
  const info = casting.programBonus[sys.identifier] ?? { total: casting.execBonus, parts: casting.parts };
  const advSources = [];
  const disSources = [];
  if (spec.mode === 'advantage') advSources.push(t('Rolls.Manual'));
  if (spec.mode === 'disadvantage') disSources.push(t('Rolls.Manual'));
  if (actor.getFlag(ID, 'nextActionDisadvantage')) disSources.push(t('Rolls.NextAction'));
  const mods = advantageSources(sn.mods, 'cast.all', {});
  advSources.push(...mods.advantage);
  disSources.push(...mods.disadvantage);
  const mode = resolveMode({ advantage: advSources.length > 0, disadvantage: disSources.length > 0 });
  const bonus = info.total + (Number(spec.bonus) || 0);
  const roll = await evaluate(d20Formula({ mode, bonus }) + (spec.extraDice ? ` + ${spec.extraDice}` : ""));
  const natural = naturalOf(roll);
  const crit = !isSet && natural === 20;
  const fumble = !isSet && natural === 1;
  const success = crit || (!fumble && roll.total >= cd);

  const result = { success, crit, fumble };
  const notes = [];
  let crashed = false;

  if (actor.getFlag(ID, 'nextActionDisadvantage')) await actor.unsetFlag(ID, 'nextActionDisadvantage');

  if (success) {
    if (isSet) {
      await program.update({ 'system.crashed': true });
    }
    if (sys.uses.max > 0) await program.update({ 'system.uses.value': sys.uses.value - 1 });
    if (sys.automation === 'erase-trace' && Alert.get().active) {
      const state = Alert.get();
      if (!state.erased) {
        await SNSocket.request('updateAlert', { delta: -1, erased: true });
        notes.push(t('Cast.EraseTrace'));
      }
    }
    if (sys.automation === 'collapse') {
      await SNSocket.request('updateAlert', { set: 4 });
      notes.push(t('Cast.Collapse'));
    }
    if (crit) notes.push(sys.damage || sys.healing ? t('Cast.CritDice') : t('Cast.CritDouble'));
  } else if (!isSet) {
    await program.update({ 'system.crashed': true });
    crashed = true;
    if (sys.kind === 'program') await alertEvent(1);
  }

  const effect = await enrichHtml(sys.effect || sys.description);
  const message = await postCard({
    actor,
    template: 'chat/cast.hbs',
    flavor: program.name,
    rolls: [roll],
    flags: {
      spec: { ...spec, kind: 'cast' },
      rollKind: 'cast',
      cast: { actorUuid: actor.uuid, programId: program.id, critical: crit, success }
    },
    data: {
      title: program.name,
      kindLabel: t(`Program.Kind.${sys.kind}`),
      tier: isSet ? null : sys.tier,
      actorName: actor.name,
      img: program.img || actor.img,
      dice: d20Faces(roll),
      total: roll.total,
      natural,
      cd,
      outcome: crit ? 'crit' : fumble ? 'fumble' : success ? 'success' : 'failure',
      outcomeLabel: t(`Cast.Outcome.${crit ? 'crit' : fumble ? 'fumble' : success ? 'success' : 'failure'}`),
      mode,
      modeLabel: mode === 'normal' ? '' : t(`Roll.${mode === 'advantage' ? 'Advantage' : 'Disadvantage'}`),
      partsText: [...info.parts, ...(spec.bonus ? [{ label: t('Rolls.Situational'), value: Number(spec.bonus) }] : [])].map((p) => `${p.label} ${signed(p.value)}`).join(', '),
      effect: success ? effect : '',
      crashed,
      spent: success && isSet,
      notes,
      damage: success && sys.damage ? sys.damage : '',
      healing: success && sys.healing ? healingFormula(sn, sys) : '',
      save: success && sys.save?.ability ? sys.save : null,
      canEdge: actor.type === 'character' && actor.isOwner && actor.system.edge.value >= 1
    }
  });

  if (fumble) {
    const target = [...(game.user.targets ?? [])][0]?.actor ?? null;
    if (sys.kind === 'program') await rollFeedback(actor, program);
    else if (sys.kind === 'protocol') await rollRejection(actor, program, target);
  }
  return message ?? result;
}

function healingFormula(sn, sys) {
  const extra = sys.kind === 'protocol' && sn.casting.healDice ? ` + ${sn.casting.healDice}` : '';
  return `${sys.healing}${extra}`;
}

export { doubleDice, esc };
