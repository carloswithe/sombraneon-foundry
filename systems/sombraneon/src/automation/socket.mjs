import { ID, activeGM, notify, uuidToDoc } from '../util.mjs';

const CHANNEL = `system.${ID}`;
const TIMEOUT = 10000;

/**
 * Operações que um jogador não pode fazer sozinho passam pelo Mestre ativo (docs/spec/03, seção 17).
 * O executor revalida tudo e responde com o mesmo requestId.
 */
export const HANDLERS = {
  async applyDamage({ uuid, amount, type, nonlethal, heavy }) {
    const actor = await resolveActor(uuid);
    if (!actor) return { ok: false };
    return { ok: true, applied: await actor.applyDamage(amount, { type, nonlethal, heavy }) };
  },
  async applyHealing({ uuid, amount, protocol }) {
    const actor = await resolveActor(uuid);
    if (!actor) return { ok: false };
    return { ok: true, applied: await actor.applyHealing(amount, { protocol }) };
  },
  async grantEdge({ uuid, amount }) {
    const actor = await resolveActor(uuid);
    if (!actor) return { ok: false };
    return { ok: true, gained: await actor.giveEdge(amount ?? 1) };
  },
  async transferEdge({ fromUuid: from, toUuid }) {
    const a = await resolveActor(from);
    const b = await resolveActor(toUuid);
    if (!a || !b || a.system.edge.value < 1) return { ok: false };
    if (b.system.edge.value >= b.system.edge.max) return { ok: false, reason: 'max' };
    await a.update({ 'system.edge.value': a.system.edge.value - 1 });
    await b.giveEdge(1);
    return { ok: true };
  },
  async updateAlert({ delta, set, active, label, erased }, userId) {
    const { Alert } = await import('./alert.mjs');
    const user = game.users.get(userId);
    // Jogadores só podem subir o Alerta (docs/spec/03, seção 17).
    if (!user?.isGM && ((delta ?? 0) < 0 || set !== undefined || active === false)) return { ok: false };
    return { ok: true, state: await Alert.apply({ delta, set, active, label, erased }) };
  },
  async createDrone({ ownerUuid, kind }) {
    const { createDrone } = await import('./drone.mjs');
    const drone = await createDrone(ownerUuid, kind);
    return { ok: !!drone, uuid: drone?.uuid };
  },
  async setStatus({ uuid, status, active }) {
    const actor = await resolveActor(uuid);
    if (!actor) return { ok: false };
    await actor.setStatus(status, active);
    return { ok: true };
  },
  async restoreRest({ uuid, options }) {
    const { restActor } = await import('./rest.mjs');
    const actor = await resolveActor(uuid);
    if (!actor) return { ok: false };
    await restActor(actor, options);
    return { ok: true };
  }
};

async function resolveActor(uuid) {
  const doc = await uuidToDoc(uuid);
  return doc?.documentName === 'Token' || doc?.documentName === 'TokenDocument' ? doc.actor : doc?.actor ?? doc;
}

export class SNSocket {
  static #pending = new Map();

  static init() {
    game.socket.on(CHANNEL, (message) => this.#onMessage(message));
  }

  /**
   * Pede ao Mestre ativo para executar uma operação. O próprio Mestre executa direto.
   * @returns {Promise<{ok:boolean}>}
   */
  static async request(action, payload) {
    const gm = activeGM();
    if (!gm) {
      notify('warn', 'Warn.NoGM');
      return { ok: false, reason: 'noGM' };
    }
    if (gm.id === game.user.id) return HANDLERS[action]?.(payload, game.user.id) ?? { ok: false };
    const requestId = foundry.utils.randomID();
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        this.#pending.delete(requestId);
        resolve({ ok: false, reason: 'timeout' });
      }, TIMEOUT);
      this.#pending.set(requestId, { resolve, timer });
      game.socket.emit(CHANNEL, { type: 'request', requestId, action, payload, userId: game.user.id, to: gm.id });
    });
  }

  static async #onMessage(msg) {
    if (msg.to !== game.user.id) return;
    if (msg.type === 'response') {
      const p = this.#pending.get(msg.requestId);
      if (!p) return;
      clearTimeout(p.timer);
      this.#pending.delete(msg.requestId);
      p.resolve(msg.result);
      return;
    }
    if (msg.type === 'request') {
      if (activeGM()?.id !== game.user.id) return;
      const handler = HANDLERS[msg.action];
      let result = { ok: false };
      try {
        if (handler) result = await handler(msg.payload, msg.userId);
      } catch (err) {
        console.error(`${ID} | erro na operação ${msg.action}`, err);
      }
      game.socket.emit(CHANNEL, { type: 'response', requestId: msg.requestId, result, to: msg.userId });
    }
  }
}

/** Aplica dano a um ator: direto se o usuário é dono, senão via Mestre. */
export async function dealDamage(actor, amount, options = {}) {
  if (!actor) return { ok: false };
  if (actor.isOwner) return { ok: true, applied: await actor.applyDamage(amount, options) };
  return SNSocket.request('applyDamage', { uuid: actor.uuid, amount, ...options });
}

export async function dealHealing(actor, amount, { protocol = false } = {}) {
  if (!actor) return { ok: false };
  if (actor.isOwner) return { ok: true, applied: await actor.applyHealing(amount, { protocol }) };
  return SNSocket.request('applyHealing', { uuid: actor.uuid, amount, protocol });
}
