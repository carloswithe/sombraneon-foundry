import { SN } from '../config.mjs';
import { ID, t, tpl, tExists, slug } from '../util.mjs';
import { MODES } from '../logic/modifiers.mjs';
import { SNSheetMixin } from './base.mjs';

const { ItemSheetV2 } = foundry.applications.sheets;

const opt = (values, ns) => values.map((v) => ({ value: v, label: tExists(`${ns}.${v}`) ? t(`${ns}.${v}`) : v }));

const ABILITIES = SN.abilities;
const FAMILIES = SN.weaponFamilies;

const text = (path) => ({ path, kind: 'text' });
const number = (path) => ({ path, kind: 'number' });
const check = (path) => ({ path, kind: 'check' });
const select = (path, options) => ({ path, kind: 'select', options });
const list = (path) => ({ path, kind: 'list' });

/** Campos de detalhe por tipo de item (formulário declarativo). */
const DETAILS = {
  class: () => [
    select('system.hitDie', opt(['d4', 'd6', 'd8', 'd10'], 'Choice.Value')),
    list('system.keyAbilities'),
    check('system.weapons.all'),
    list('system.weapons.allowed'),
    list('system.armor'),
    text('system.casting.kind'),
    text('system.casting.ability'),
    number('system.casting.startKnown'),
    number('system.casting.perLevel'),
    list('system.casting.extraAtLevels'),
    check('system.casting.tierMaxByLevel'),
    text('system.talentTable'),
    list('system.talentLevels'),
    list('system.vehicles')
  ],
  origin: () => [number('system.extraTalents'), number('system.cyberAdjust'), check('system.cyberAdvantage')],
  background: () => [text('system.knowledge'), text('system.contactPrompt'), number('system.rollIndex'), check('system.highlight'), list('system.vehicles')],
  alignment: () => [
    text('system.mapsTo'),
    text('system.summary'),
    text('system.edgeTriggerTable'),
    ...['police', 'execs', 'citizens', 'gangs', 'blackMarket', 'cults', 'punks', 'syntheticsFree', 'mercenaries'].map((k) => number(`system.reaction.${k}`))
  ],
  feature: () => [
    select('system.kind', opt(['class', 'origin', 'talent', 'mutation', 'edge-trigger', 'background', 'other'], 'Feature.Kind')),
    select('system.activation', opt(['passive', 'action', 'free', 'reaction'], 'Activation')),
    number('system.uses.max'),
    number('system.uses.value'),
    select('system.uses.per', [{ value: '', label: '-' }, ...opt(['rest', 'day', 'scene'], 'Per')]),
    text('system.automation'),
    check('system.stackable')
  ],
  weapon: () => [
    select('system.kind', opt(['melee', 'ranged'], 'Weapon.Kind')),
    select('system.family', opt(FAMILIES, 'Family')),
    text('system.damage'),
    select('system.range', opt(['close', 'near', 'far', 'distant'], 'Range')),
    number('system.hands'),
    number('system.slots'),
    number('system.price'),
    list('system.properties'),
    number('system.attackBonus'),
    number('system.ignoreArmor'),
    select('system.stunOn', [{ value: '', label: '-' }, ...opt(['hit', 'nat20'], 'Stun')]),
    check('system.usesMagazines'),
    select('system.abilityOverride', [{ value: '', label: t('Fields.auto') }, ...opt(['for', 'des'], 'Abilities')]),
    text('system.mount'),
    number('system.crew'),
    check('system.equipped')
  ],
  armor: () => [
    number('system.ac'),
    check('system.addDex'),
    select('system.type', opt(['light', 'medium', 'heavy'], 'Armor.Type')),
    number('system.slots'),
    number('system.price'),
    list('system.penalties'),
    check('system.equipped')
  ],
  gear: () => [
    select('system.category', opt(SN.gearCategories, 'Gear')),
    number('system.quantity'),
    number('system.slots'),
    number('system.perSlot'),
    check('system.freeFirst'),
    number('system.price'),
    number('system.bonus'),
    number('system.uses.max'),
    number('system.uses.value'),
    select('system.vehicle.category', [{ value: '', label: '-' }, ...opt(SN.vehicleCategories, 'Vehicle.Category')]),
    select('system.vehicle.terrain', [{ value: '', label: '-' }, ...opt(SN.vehicleTerrains, 'Vehicle.Terrain')]),
    text('system.vehicle.passengers'),
    number('system.vehicle.ac'),
    number('system.vehicle.hp'),
    number('system.vehicle.bl'),
    number('system.vehicle.maneuver'),
    text('system.vehicle.speed'),
    number('system.vehicle.cargo'),
    text('system.vehicle.hardpoints'),
    text('system.vehicle.license'),
    text('system.vehicle.size'),
    number('system.vehicle.strength'),
    text('system.vehicle.strike'),
    number('system.vehicle.extraSlots'),
    text('system.vehicle.notes'),
    number('system.module.ac'),
    text('system.module.effect')
  ],
  implant: () => [
    select('system.slot', opt(SN.implantSlots, 'Slot')),
    select('system.quality', opt(SN.qualityOrder, 'Quality')),
    check('system.installed')
  ],
  program: () => [
    select('system.kind', opt(['program', 'protocol', 'set'], 'Program.Kind')),
    number('system.tier'),
    select('system.range', [{ value: '', label: '-' }, ...opt(['close', 'near', 'far'], 'Range')]),
    text('system.damage'),
    text('system.healing'),
    select('system.save.ability', [{ value: '', label: '-' }, ...opt(ABILITIES, 'Abilities')]),
    number('system.save.cd'),
    check('system.save.half'),
    number('system.alertDelta'),
    number('system.uses.max'),
    number('system.uses.value'),
    check('system.crashed'),
    text('system.automation')
  ]
};

const HAS_MODIFIERS = new Set(['class', 'origin', 'feature']);
const HAS_GRANTS = new Set(['class', 'origin']);

const BLANK_MOD = JSON.stringify({ key: '', mode: 'add', value: '', when: '', label: '' });
const BLANK_GRANT = JSON.stringify({ kind: 'item', ref: '', level: 1, qty: 1, from: { type: '', filter: {} }, count: 1, key: '' });

function fieldRows(item, descriptors) {
  return descriptors.map((d) => {
    const name = d.path.replace(/^system\./, '').replace(/\./g, '_');
    const raw = foundry.utils.getProperty(item._source, d.path);
    return {
      ...d,
      name,
      fieldName: d.path,
      label: tExists(`Fields.${name}`) ? t(`Fields.${name}`) : name,
      value: d.kind === 'list' ? (raw ?? []).join(', ') : raw,
      options: d.options?.map((o) => ({ ...o, selected: String(o.value) === String(raw) })),
      isText: d.kind === 'text',
      isNumber: d.kind === 'number',
      isCheck: d.kind === 'check',
      isSelect: d.kind === 'select',
      isList: d.kind === 'list',
      numeric: d.kind === 'list' && d.path.match(/Levels|extraAtLevels/)
    };
  });
}

function modifierRows(list, path) {
  return {
    path,
    blank: BLANK_MOD,
    rows: (list ?? []).map((m, index) => ({ ...m, index, modes: MODES.map((v) => ({ value: v, label: v, selected: v === m.mode })), unknownKey: false }))
  };
}

export class SNItemSheet extends SNSheetMixin(ItemSheetV2) {
  static DEFAULT_TAB = 'description';
  static PLAY_MODE = false;

  static DEFAULT_OPTIONS = {
    classes: ['sombraneon', 'sheet', 'item'],
    position: { width: 640, height: 720 },
    actions: {
      genIdentifier() {
        return this.document.update({ 'system.identifier': slug(this.document.name) });
      },
      addWeaponLine(event, target) {
        const path = target.dataset.path;
        return this.document.update({ [path]: { name: '', damage: 'd6', kind: 'melee', range: 'close', family: 'unarmed', ignoreArmor: 0, stunOn: '', notes: '', properties: [] } });
      },
      removeWeaponLine(event, target) {
        return this.document.update({ [target.dataset.path]: null });
      },
      toChat() {
        return this.document.toChat();
      },
      addToSheet() {
        const actor = game.user.character;
        if (!actor) return ui.notifications.warn(t('Warn.NoCharacter'));
        return import('../drop.mjs').then((m) => m.dropItem(actor, this.document));
      }
    }
  };

  static PARTS = { body: { template: tpl('item/item.hbs'), scrollable: ['.sn-scroll'] } };

  get title() {
    return this.document.name;
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const item = this.document;
    const type = item.type;
    const details = fieldRows(item, DETAILS[type]?.() ?? []);
    const modifierBlocks = [];
    if (HAS_MODIFIERS.has(type)) modifierBlocks.push({ title: t('Item.Modifiers'), ...modifierRows(item._source.system.modifiers, 'system.modifiers') });
    const tiers = [];
    if (type === 'implant') {
      for (const q of SN.qualityOrder) {
        const tier = item._source.system.tiers[q];
        tiers.push({
          key: q,
          label: t(`Quality.${q}`),
          price: SN.implantQualities[q],
          summary: tier.summary,
          delta: tier.delta,
          automation: tier.automation,
          usesMax: tier.uses.max,
          usesValue: tier.uses.value,
          usesPath: `system.tiers.${q}.uses`,
          weapon: tier.weapon,
          weaponPath: `system.tiers.${q}.weapon`,
          modifiers: modifierRows(tier.modifiers, `system.tiers.${q}.modifiers`)
        });
      }
    }
    const grants = HAS_GRANTS.has(type)
      ? (item._source.system.grants ?? []).map((g, index) => ({ ...g, index, filter: JSON.stringify(g.from?.filter ?? {}), kinds: ['item', 'choose', 'roll', 'prompt'].map((v) => ({ value: v, label: v, selected: v === g.kind })) }))
      : null;
    const pkg = type === 'class' ? (item._source.system.startingPackage ?? []).map((p, index) => ({ ...p, index })) : null;
    const tabs = [
      { id: 'description', label: t('Item.Tabs.Description') },
      { id: 'details', label: t('Item.Tabs.Details') },
      ...(modifierBlocks.length ? [{ id: 'modifiers', label: t('Item.Tabs.Modifiers') }] : []),
      ...(tiers.length ? [{ id: 'tiers', label: t('Item.Tabs.Tiers') }] : []),
      ...(grants ? [{ id: 'grants', label: t('Item.Tabs.Grants') }] : [])
    ].map((tab) => ({ ...tab, active: tab.id === this.tab }));
    return {
      ...context,
      type,
      typeLabel: t(`Item.Types.${type}`),
      tabs,
      details,
      modifierBlocks,
      tiers,
      grants,
      pkg,
      blankGrant: BLANK_GRANT,
      blankPkg: JSON.stringify({ ref: '', qty: 1 }),
      description: await this.enrich(item.system.description),
      rawDescription: item._source.system.description,
      hasUsesFeature: false,
      readOnly: !this.isEditable,
      locked: !!item.pack,
      isImplant: type === 'implant'
    };
  }
}

export { ID, SN };
