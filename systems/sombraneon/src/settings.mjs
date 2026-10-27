import { ID } from './util.mjs';

const reg = (key, config) => game.settings.register(ID, key, { name: `SOMBRANEON.Settings.${key}.Name`, hint: `SOMBRANEON.Settings.${key}.Hint`, ...config });

/** Configurações do sistema (docs/spec/03, seção 18). Nomes e dicas ficam em lang/. */
export function registerSettings(onAlertChange) {
  const world = { scope: 'world', config: true };
  const client = { scope: 'client', config: true };

  reg('hpLevel1Mode', { ...world, type: String, default: 'roll', choices: { roll: 'SOMBRANEON.Settings.hpLevel1Mode.roll', max: 'SOMBRANEON.Settings.hpLevel1Mode.max' } });
  reg('xpOnLevelUp', { ...world, type: String, default: 'carry', choices: { carry: 'SOMBRANEON.Settings.xpOnLevelUp.carry', reset: 'SOMBRANEON.Settings.xpOnLevelUp.reset' } });
  reg('proficiencyPenalty', { ...world, type: String, default: 'warn', choices: { warn: 'SOMBRANEON.Settings.proficiencyPenalty.warn', none: 'SOMBRANEON.Settings.proficiencyPenalty.none' } });
  reg('unarmedDie', { ...world, type: String, default: 'd4' });
  reg('burstDamage', { ...world, type: String, default: 'perTarget', choices: { perTarget: 'SOMBRANEON.Settings.burstDamage.perTarget', single: 'SOMBRANEON.Settings.burstDamage.single' } });
  reg('alertStacking', { ...world, type: String, default: 'literal', choices: { literal: 'SOMBRANEON.Settings.alertStacking.literal', single: 'SOMBRANEON.Settings.alertStacking.single' } });
  reg('firewallTimer', { ...world, type: String, default: 'real', choices: { real: 'SOMBRANEON.Settings.firewallTimer.real', worldTime: 'SOMBRANEON.Settings.firewallTimer.worldTime', manual: 'SOMBRANEON.Settings.firewallTimer.manual' } });
  reg('restRequiresRation', { ...world, type: Boolean, default: true });
  reg('autoCyberpsychosisOnRest', { ...world, type: Boolean, default: true });
  reg('talentToChat', { ...world, type: Boolean, default: true });
  reg('wizardAllowManualAbilities', { ...world, type: Boolean, default: true });
  reg('announceSelections', { ...world, type: Boolean, default: false });
  reg('moraleHint', { ...world, type: Boolean, default: true });
  reg('showTargetResult', { ...client, type: Boolean, default: true });
  reg('purchaseMode', { ...client, type: String, default: 'ask', choices: { ask: 'SOMBRANEON.Settings.purchaseMode.ask', free: 'SOMBRANEON.Settings.purchaseMode.free', buy: 'SOMBRANEON.Settings.purchaseMode.buy' } });
  reg('confirmEdge', { ...client, type: Boolean, default: true });
  reg('openWizardOnCreate', { ...client, type: Boolean, default: true });
  reg('debugModifiers', { ...client, type: Boolean, default: false });

  game.settings.register(ID, 'restQuality', { scope: 'world', config: false, type: String, default: 'safe' });
  game.settings.register(ID, 'schemaVersion', { scope: 'world', config: false, type: Number, default: 1 });
  game.settings.register(ID, 'alert', {
    scope: 'world',
    config: false,
    type: Object,
    default: { value: 0, active: false, label: '', erased: false },
    onChange: () => onAlertChange?.()
  });
}
