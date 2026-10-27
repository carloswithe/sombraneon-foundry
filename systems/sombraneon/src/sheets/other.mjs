import { SN } from '../config.mjs';
import { ID, t, tpl, notify } from '../util.mjs';
import { SNSheetMixin, partsTooltip } from './base.mjs';
import { attackRoll, evaluate, naturalOf } from '../rolls.mjs';
import { postEvent } from '../automation/casting.mjs';
import { Alert } from '../automation/alert.mjs';
import { rebuildDrone } from '../automation/drone.mjs';
import { signed } from '../logic/abilities.mjs';

const { ActorSheetV2 } = foundry.applications.sheets;

/* ------------------------------------------------------------------ */
/* NPC                                                                  */
/* ------------------------------------------------------------------ */

export class SNNpcSheet extends SNSheetMixin(ActorSheetV2) {
  static DEFAULT_TAB = 'main';
  static PLAY_MODE = false;
  static DEFAULT_OPTIONS = {
    classes: ['sombraneon', 'sheet', 'actor', 'npc'],
    position: { width: 540, height: 640 },
    actions: {
      rollAttack(event, target) {
        return attackRoll({ actorUuid: this.document.uuid, attackId: target.dataset.attackId });
      },
      async rollInit() {
        const actor = this.document;
        const roll = await evaluate(`1d20 + ${actor.system.initiative}`);
        return postEvent(actor, t('Sheet.Initiative'), [`${t('Sheet.Initiative')}: ${roll.total}`], { rolls: [roll] });
      },
      async moraleCheck() {
        const actor = this.document;
        const m = actor.system.morale;
        const roll = await evaluate(`1d20 + ${m.mod}`);
        const fled = roll.total < m.cd && naturalOf(roll) !== 20;
        return postEvent(actor, t('Morale.Title'), [t('Morale.Result', { name: actor.name, total: roll.total, cd: m.cd, result: fled ? t('Morale.Flees') : t('Morale.Holds') })], { rolls: [roll] });
      },
      addAttack() {
        const list = foundry.utils.deepClone(this.document._source.system.attacks ?? []);
        list.push({ name: t('Npc.NewAttack'), bonus: 0, damage: 'd6', range: 'close', notes: '' });
        return this.document.update({ 'system.attacks': list });
      },
      removeAttack(event, target) {
        const list = foundry.utils.deepClone(this.document._source.system.attacks ?? []);
        list.splice(Number(target.dataset.index), 1);
        return this.document.update({ 'system.attacks': list });
      }
    }
  };
  static PARTS = { body: { template: tpl('actor/npc.hbs'), scrollable: ['.sn-scroll'] } };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const sys = this.document.system;
    return {
      ...context,
      attacks: sys.attackLines.map((a, i) => ({ ...a, index: i, bonusText: signed(a.bonus), editable: a.id.startsWith('npc-'), rangeLabel: t(`Range.${a.range}`) })),
      traits: await this.enrich(sys.traits),
      loot: await this.enrich(sys.loot),
      hasLoot: !!sys.loot
    };
  }

  async _dropItem(item) {
    const { dropItem } = await import('../drop.mjs');
    return dropItem(this.document, item);
  }
}

/* ------------------------------------------------------------------ */
/* ICE                                                                  */
/* ------------------------------------------------------------------ */

export class SNIceSheet extends SNSheetMixin(ActorSheetV2) {
  static DEFAULT_TAB = 'main';
  static PLAY_MODE = false;
  static DEFAULT_OPTIONS = {
    classes: ['sombraneon', 'sheet', 'actor', 'ice'],
    position: { width: 480, height: 560 },
    actions: {
      async attackIce() {
        const count = this.document.system.attack.count;
        for (let i = 0; i < count; i++) await attackRoll({ actorUuid: this.document.uuid, attackId: 'ice' });
      },
      alarm() {
        return Alert.raise(1);
      }
    }
  };
  static PARTS = { body: { template: tpl('actor/ice.hbs'), scrollable: ['.sn-scroll'] } };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const sys = this.document.system;
    return {
      ...context,
      attackText: `${sys.attack.count > 1 ? `${sys.attack.count} × ` : ''}${sys.attack.name || t('Ice.Attack')} ${signed(sys.attack.bonus)} (${sys.attack.damage} ${sys.attack.type})`,
      trick: await this.enrich(sys.trick.text),
      isAlarm: /alarme/i.test(sys.trick.name)
    };
  }
}

/* ------------------------------------------------------------------ */
/* Drone                                                                */
/* ------------------------------------------------------------------ */

export class SNDroneSheet extends SNSheetMixin(ActorSheetV2) {
  static DEFAULT_TAB = 'main';
  static PLAY_MODE = true;
  static DEFAULT_OPTIONS = {
    classes: ['sombraneon', 'sheet', 'actor', 'drone'],
    position: { width: 480, height: 520 },
    actions: {
      attackDrone() {
        return attackRoll({ actorUuid: this.document.uuid, attackId: 'drone' });
      },
      rebuild() {
        return rebuildDrone(this.document);
      },
      async deleteDroneItem(event, target) {
        return this.document.items.get(target.dataset.itemId)?.delete();
      },
      async openOwner() {
        return (await fromUuid(this.document.system.ownerUuid))?.sheet.render(true);
      }
    }
  };
  static PARTS = { body: { template: tpl('actor/drone.hbs'), scrollable: ['.sn-scroll'] } };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const sys = this.document.system;
    const s = sys.stats ?? {};
    const modules = this.document.items.filter((i) => i.type === 'gear').map((i) => ({ id: i.id, name: i.name, img: i.img, effect: i.system.module?.effect ?? '' }));
    return {
      ...context,
      stats: { ac: s.ac, hpMax: s.hpMax, attack: s.attack === null ? null : signed(s.attack ?? 0), die: s.die, damageBonus: s.damageBonus ? signed(s.damageBonus) : '' },
      auxiliary: sys.kind === 'auxiliary',
      ownerName: sys.ownerName,
      modules,
      notes: ['Fly', 'Noise', 'Cargo', 'Hacked', 'Link'].map((k) => t(`Drone.Notes.${k}`))
    };
  }

  async _dropItem(item) {
    const { dropItem } = await import('../drop.mjs');
    return dropItem(this.document, item);
  }
}

export { SN, ID, notify, partsTooltip };
