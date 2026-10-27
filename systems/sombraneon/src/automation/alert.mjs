import { SN } from '../config.mjs';
import { ID, t, renderTpl, tpl, notify } from '../util.mjs';
import { SNSocket } from './socket.mjs';
import { safeSetting } from '../rolls.mjs';

const KEY = 'alert';
const DEFAULT = { value: 0, active: false, label: '', erased: false };

/** Rastreador de Alerta da invasão (livro 9.4): um por mundo, de 0 a 4. */
export const Alert = {
  get() {
    try {
      return { ...DEFAULT, ...(game.settings.get(ID, KEY) ?? {}) };
    } catch {
      return { ...DEFAULT };
    }
  },

  /** Executado pelo Mestre: aplica a mudança e avisa quando chegar ao máximo. */
  async apply({ delta, set, active, label, erased }) {
    const prev = this.get();
    const next = { ...prev };
    if (active !== undefined) next.active = active;
    if (label !== undefined) next.label = label;
    if (erased !== undefined) next.erased = erased;
    if (set !== undefined) next.value = set;
    if (delta) next.value = prev.value + delta;
    next.value = Math.max(SN.alert.min, Math.min(SN.alert.max, next.value));
    await game.settings.set(ID, KEY, next);
    if (next.value >= SN.alert.max && prev.value < SN.alert.max) await postMaxAlert();
    return next;
  },

  async raise(n = 1, { silent = false } = {}) {
    const state = this.get();
    if (!state.active) return null;
    const res = await SNSocket.request('updateAlert', { delta: n });
    if (!silent && res.ok) ui.notifications.info(t('Alert.Raised', { value: res.state.value }));
    return res.state ?? null;
  },

  async newRun(label = '') {
    return SNSocket.request('updateAlert', { set: 0, active: true, label, erased: false });
  },

  async reset() {
    return SNSocket.request('updateAlert', { set: 0 });
  }
};

async function postMaxAlert() {
  const content = await renderTpl(tpl('chat/alert.hbs'), { title: t('Alert.MaxTitle'), text: t('Alert.MaxText') });
  await ChatMessage.create({ speaker: { alias: t('Alert.Title') }, content, whisper: [], flags: { [ID]: { alertMax: true } } });
}

/**
 * Sobe o Alerta por um evento (livro 9.4: hack de rua falho, programa em Crash, Feedback, barulho).
 * Com `alertStacking` = single, vários eventos da mesma ação contam uma vez.
 */
export async function alertEvent(count = 1) {
  const n = safeSetting('alertStacking', 'literal') === 'single' ? Math.min(1, count) : count;
  return Alert.raise(n);
}

export { notify };
