import { ID, t, esc, notify, DialogV2, activeGM } from '../util.mjs';
import { SNSocket } from './socket.mjs';
import { chooseDialog } from '../apps/dialogs.mjs';

/** Entrega a ficha de Edge a outro runner (livro 1.7). */
export async function giveEdgeAway(actor) {
  if (actor.system.edge.value < 1) return notify('warn', 'Warn.NoEdge');
  const others = game.actors.filter((a) => a.type === 'character' && a.id !== actor.id && a.hasPlayerOwner);
  if (!others.length) return notify('warn', 'Warn.NoOtherRunners');
  const uuid = await chooseDialog({
    title: t('Edge.GiveTitle'),
    options: others.map((a) => ({ value: a.uuid, label: a.name, img: a.img })),
    hint: t('Edge.GiveHint')
  });
  if (!uuid) return null;
  const res = await SNSocket.request('transferEdge', { fromUuid: actor.uuid, toUuid: uuid });
  if (res.ok) ui.notifications.info(t('Edge.Given'));
  else if (res.reason === 'max') notify('warn', 'Warn.EdgeMax');
  return res;
}

/** O Mestre concede Edge a personagens (por exemplo, os tokens selecionados). */
export async function grantEdge(actors, amount = 1) {
  const results = [];
  for (const a of actors) {
    const gained = await a.giveEdge(amount);
    results.push({ name: a.name, gained });
  }
  const lines = results.map((r) => (r.gained ? t('Edge.Granted', { name: r.name }) : t('Edge.AlreadyMax', { name: r.name })));
  if (results.length) await ChatMessage.create({ content: `<div class="sombraneon sn-card"><header class="sn-card-head"><h3>${esc(t('Edge.Title'))}</h3></header>${lines.map((l) => `<p>${esc(l)}</p>`).join('')}</div>` });
  return results;
}

/** "Cumpri meu gatilho": cartão sussurrado ao Mestre com Aprovar e Negar (livro 6.1). */
export async function claimTrigger(actor) {
  const trigger = actor.items.find((i) => i.type === 'feature' && i.system.kind === 'edge-trigger');
  if (!trigger) return notify('warn', 'Warn.NoTrigger');
  if (actor.system.edge.value >= actor.system.edge.max) return notify('warn', 'Warn.EdgeMax');
  if (actor.system.edge.triggerUsed) return notify('warn', 'Warn.TriggerUsed');
  const gms = ChatMessage.getWhisperRecipients('GM').map((u) => u.id);
  const content = `<div class="sombraneon sn-card"><header class="sn-card-head"><h3>${esc(t('Edge.TriggerTitle', { name: actor.name }))}</h3></header>
    <p><strong>${esc(trigger.name)}</strong></p>${trigger.system.description}
    <div class="sn-card-actions">
      <button type="button" data-action="approveTrigger" data-actor-uuid="${actor.uuid}">${esc(t('Edge.Approve'))}</button>
      <button type="button" data-action="denyTrigger" data-actor-uuid="${actor.uuid}">${esc(t('Edge.Deny'))}</button>
    </div></div>`;
  return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content, whisper: gms, flags: { [ID]: { triggerRequest: actor.uuid } } });
}

export async function approveTrigger(actorUuid) {
  const actor = await fromUuid(actorUuid);
  if (!actor) return;
  const gained = await actor.giveEdge(1);
  await actor.update({ 'system.edge.triggerUsed': true });
  ui.notifications.info(gained ? t('Edge.Granted', { name: actor.name }) : t('Edge.AlreadyMax', { name: actor.name }));
}

export { DialogV2, activeGM };
