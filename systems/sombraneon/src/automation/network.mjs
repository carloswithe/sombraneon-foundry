import { ID, t, esc, notify, confirm, activeGM } from '../util.mjs';
import { checkRoll, naturalOf, evaluate, safeSetting } from '../rolls.mjs';
import { selectPrompt } from '../apps/dialogs.mjs';
import { Alert, alertEvent } from './alert.mjs';
import { postEvent, rollFeedback } from './casting.mjs';

const HOUR = 60 * 60 * 1000;

/** Relógio do Firewall conforme a configuração (docs/spec/03, seção 12.6). */
export function nowMs() {
  return safeSetting('firewallTimer', 'real') === 'worldTime' ? game.time.worldTime * 1000 : Date.now();
}

function hasConnection(actor) {
  const sn = actor.sn;
  const jack = sn.chrome.slots.neural?.system.identifier === 'jack-de-interface';
  const cable = actor.items.some((i) => i.type === 'gear' && i.system.category === 'cable' && i.system.quantity > 0);
  return jack || cable || sn.flags.nativeInterface;
}

/** Hack de rua (livro 9.1): d20 + INT contra CD 9, 12 ou 15. */
export async function streetHack(actor, { cd } = {}) {
  const sn = actor.sn;
  const hasDeck = actor.items.some((i) => i.type === 'gear' && i.system.category === 'deck' && !actor.system.network.deckFried);
  const hasTool = hasDeck || hasConnection(actor);
  if (!hasTool && !game.user.isGM) return notify('warn', 'Warn.NoHackTool');
  if (cd === undefined) {
    const value = await selectPrompt({
      title: t('Network.StreetHack'),
      label: t('Network.HackCd'),
      options: [9, 12, 15].map((v) => ({ value: v, label: `${t(`Network.HackCdLabel.${v}`)} (${v})` })),
      selected: 12
    });
    if (value === null) return null;
    cd = Number(value);
  }
  const message = await checkRoll({
    actorUuid: actor.uuid,
    ability: 'int',
    tags: ['hack-street'],
    cd,
    label: t('Network.StreetHack'),
    mode: hasDeck ? 'normal' : 'disadvantage'
  });
  const roll = message?.rolls?.[0];
  const failed = roll && naturalOf(roll) !== 20 && (naturalOf(roll) === 1 || roll.total < cd);
  if (failed) {
    if (Alert.get().active) await alertEvent(1);
    else if (await confirm(t('Network.StartRunTitle'), t('Network.StartRunText'))) {
      await Alert.newRun();
      await alertEvent(1);
    }
  }
  return message;
}

/** Imergir na Rede (livro 9.7): gasta um Firewall, corpo indefeso (CA 5), cronômetro de 1 hora. */
export async function immerse(actor) {
  const sn = actor.sn;
  if (actor.system.network.immersed) return null;
  if (sn.casting.kind === 'program' && !sn.casting.requirement.met) return notify('warn', `Warn.Req.${sn.casting.requirement.code === 'deckFried' ? 'DeckFried' : 'NoDeck'}`);
  if (!sn.casting.deck) return notify('warn', 'Warn.Req.NoDeck');
  if (!hasConnection(actor)) return notify('warn', 'Warn.NoConnection');
  const firewall = actor.items.find((i) => i.type === 'gear' && i.system.category === 'firewall' && i.system.quantity > 0);
  if (!firewall) return notify('warn', 'Warn.NoFirewall');
  await firewall.update({ 'system.quantity': firewall.system.quantity - 1 });
  await actor.update({
    'system.network.immersed': true,
    'system.network.firewall.active': true,
    'system.network.firewall.expiresAt': nowMs() + HOUR,
    'system.network.firewall.pausedAt': null
  });
  await actor.setStatus('immersed', true);
  return postEvent(actor, t('Network.ImmersedTitle'), [t('Network.Immersed', { name: actor.name }), t('Network.WatchBody')]);
}

export async function leaveNetwork(actor) {
  if (!actor.system.network.immersed) return null;
  await actor.update({ 'system.network.immersed': false });
  await actor.setStatus('immersed', false);
  return postEvent(actor, t('Network.LeftTitle'), [t('Network.Left', { name: actor.name })]);
}

/** Corpo ferido durante a imersão: CON CD 12 para continuar conectado (livro 9.7). */
export async function woundedBody(actor) {
  const message = await checkRoll({ actorUuid: actor.uuid, ability: 'con', tags: ['stay-connected'], cd: 12, label: t('Network.WoundedBody') });
  const roll = message?.rolls?.[0];
  const held = roll && (naturalOf(roll) === 20 || (naturalOf(roll) !== 1 && roll.total >= 12));
  if (held) return message;
  await actor.update({ 'system.network.immersed': false });
  await actor.setStatus('immersed', false);
  const dmg = await evaluate('1d6');
  await actor.applyDamage(dmg.total, { type: 'neural' });
  await postEvent(actor, t('Network.ExpelledTitle'), [t('Network.Expelled', { name: actor.name, n: dmg.total })], { rolls: [dmg] });
  return message;
}

/** O Firewall queimou (livro 9.7): se imerso, 1 rodada para sair; depois Feedback por rodada. */
export async function burnFirewall(actor) {
  await actor.update({ 'system.network.firewall.active': false, 'system.network.firewall.expiresAt': null, 'system.network.firewall.pausedAt': null });
  if (!actor.system.network.immersed) return null;
  const content = `<div class="sombraneon sn-card"><header class="sn-card-head"><h3>${esc(t('Network.FirewallBurnedTitle'))}</h3></header>
    <p>${esc(t('Network.FirewallBurned', { name: actor.name }))}</p>
    <p class="sn-hint">${esc(t('Network.FirewallBurnedRule'))}</p>
    <div class="sn-card-actions"><button type="button" data-action="roundFeedback" data-actor-uuid="${actor.uuid}">${esc(t('Network.RoundFeedback'))}</button></div></div>`;
  return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content });
}

/** Pausa e retoma o cronômetro (Mestre). */
export async function toggleFirewallPause(actor) {
  const fw = actor.system.network.firewall;
  if (!fw.active) return;
  if (fw.pausedAt) {
    const extra = nowMs() - fw.pausedAt;
    await actor.update({ 'system.network.firewall.expiresAt': fw.expiresAt + extra, 'system.network.firewall.pausedAt': null });
  } else await actor.update({ 'system.network.firewall.pausedAt': nowMs() });
}

export function firewallRemaining(actor) {
  const fw = actor.system.network.firewall;
  if (!fw.active || !fw.expiresAt) return null;
  const reference = fw.pausedAt ?? nowMs();
  return Math.max(0, fw.expiresAt - reference);
}

/** O Mestre ativo confere os Firewalls a cada 15 segundos. */
export function startFirewallWatcher() {
  setInterval(async () => {
    if (game.user.id !== activeGM()?.id) return;
    if (safeSetting('firewallTimer', 'real') === 'manual') return;
    for (const actor of game.actors) {
      if (actor.type !== 'character') continue;
      const fw = actor.system.network.firewall;
      if (!fw.active || fw.pausedAt || !fw.expiresAt) continue;
      if (nowMs() >= fw.expiresAt) await burnFirewall(actor);
    }
  }, 15000);
}

export async function roundFeedback(actor) {
  return rollFeedback(actor, null);
}
