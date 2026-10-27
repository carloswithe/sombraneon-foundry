import { SN } from '../config.mjs';
import { t, tpl } from '../util.mjs';
import { Alert } from '../automation/alert.mjs';
import { SNSocket } from '../automation/socket.mjs';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/** Rastreador flutuante do Alerta (0 a 4), um por mundo (livro 9.4). */
export class AlertTracker extends HandlebarsApplicationMixin(ApplicationV2) {
  static #instance = null;

  static DEFAULT_OPTIONS = {
    id: 'sombraneon-alert-tracker',
    classes: ['sombraneon', 'sn-alert-app'],
    tag: 'section',
    position: { width: 320, height: 'auto' },
    window: { title: 'SOMBRANEON.Alert.Title', resizable: false },
    actions: {
      plus: () => Alert.raise(1, { silent: true }),
      minus: () => SNSocket.request('updateAlert', { delta: -1 }),
      reset: () => Alert.reset(),
      newRun: () => Alert.newRun(),
      toggle: () => SNSocket.request('updateAlert', { active: !Alert.get().active }),
      noise: () => Alert.raise(1, { silent: true })
    }
  };

  static PARTS = { body: { template: tpl('apps/alert-tracker.hbs') } };

  static show() {
    this.#instance ??= new AlertTracker();
    return this.#instance.render({ force: true });
  }

  static refresh() {
    if (this.#instance?.rendered) this.#instance.render();
  }

  async _prepareContext() {
    const state = Alert.get();
    return {
      state,
      isGM: game.user.isGM,
      pips: Array.from({ length: SN.alert.max }, (_, i) => ({ on: i < state.value, level: i + 1 })),
      atMax: state.value >= SN.alert.max,
      statusLabel: state.active ? t('Alert.Active') : t('Alert.Inactive')
    };
  }
}
