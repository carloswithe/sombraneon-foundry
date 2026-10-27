import { int, num, str, bool, html, obj, strArray, numArray, modifiers, usesSchema, grants, choices, weaponLineSchema } from './fields.mjs';

const f = () => foundry.data.fields;

/** Base de todos os itens: identifier, descrição e fonte (docs/spec/02, seção 1). */
class ItemDataBase extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      identifier: str(),
      description: html(),
      source: str()
    };
  }
}

export class ClassData extends ItemDataBase {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      hitDie: str('d6'),
      keyAbilities: strArray(),
      weapons: new (f().SchemaField)({ all: bool(false), allowed: strArray() }),
      armor: strArray(),
      casting: new (f().SchemaField)({
        kind: str(),
        ability: str(),
        startKnown: int(0),
        perLevel: int(0),
        extraAtLevels: numArray(),
        tierMaxByLevel: bool(false)
      }),
      talentTable: str(),
      talentLevels: numArray(),
      vehicles: strArray(),
      grants: grants(),
      startingPackage: new (f().ArrayField)(new (f().SchemaField)({ ref: str(), qty: int(1) }), { required: true, initial: () => [] }),
      modifiers: modifiers(),
      choice: obj()
    };
  }
}

export class OriginData extends ItemDataBase {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      grants: grants(),
      modifiers: modifiers(),
      extraTalents: int(0),
      cyberAdjust: int(0),
      cyberAdvantage: bool(false),
      needsChoices: new (f().ArrayField)(obj(), { required: true, initial: () => [] }),
      choice: obj()
    };
  }
}

export class BackgroundData extends ItemDataBase {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      knowledge: str(),
      contactPrompt: str(),
      rollIndex: int(0),
      highlight: bool(false),
      vehicles: strArray()
    };
  }
}

export class AlignmentData extends ItemDataBase {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      mapsTo: str(),
      summary: str(),
      edgeTriggerTable: str(),
      reaction: new (f().SchemaField)({
        police: int(0),
        execs: int(0),
        citizens: int(0),
        gangs: int(0),
        blackMarket: int(0),
        cults: int(0),
        punks: int(0),
        syntheticsFree: int(0),
        mercenaries: int(0)
      })
    };
  }
}

export class FeatureData extends ItemDataBase {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      kind: str('other'),
      modifiers: modifiers(),
      uses: usesSchema(),
      activation: str('passive'),
      choice: obj(),
      choices: choices(),
      automation: str(),
      stackable: bool(false),
      roll: new (f().SchemaField)(
        { formula: str(), label: str(), healsSelf: bool(false) },
        { required: false, nullable: true, initial: null }
      ),
      weapon: weaponLineSchema(),
      requires: new (f().SchemaField)({ level: int(0), class: str(), origin: str() })
    };
  }
}

export class WeaponData extends ItemDataBase {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      kind: str('melee'),
      family: str('blades'),
      damage: str('d6'),
      range: str('close'),
      hands: int(1),
      slots: int(1),
      price: int(0),
      properties: strArray(),
      attackBonus: int(0),
      ignoreArmor: int(0),
      stunOn: str(),
      usesMagazines: bool(false),
      magEmpty: bool(false),
      abilityOverride: str(),
      mount: str(),
      crew: int(0),
      equipped: bool(false)
    };
  }
}

export class ArmorData extends ItemDataBase {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      ac: int(11),
      addDex: bool(true),
      type: str('light'),
      slots: int(1),
      price: int(0),
      penalties: strArray(),
      equipped: bool(false)
    };
  }
}

export class GearData extends ItemDataBase {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      category: str('general'),
      quantity: int(1, { min: 0 }),
      slots: int(1),
      perSlot: int(1, { min: 1 }),
      freeFirst: bool(false),
      price: int(0),
      bonus: int(0),
      uses: usesSchema(),
      vehicle: new (f().SchemaField)({
        category: str(),
        terrain: str(),
        passengers: str(),
        ac: int(0),
        hp: int(0),
        bl: int(0, { min: 0 }),
        maneuver: int(0),
        speed: str(),
        cargo: int(0),
        hardpoints: str(),
        license: str(),
        size: str(),
        strength: int(0),
        strike: str(),
        extraSlots: int(0),
        notes: str()
      }),
      module: new (f().SchemaField)({ ac: int(0), effect: str() })
    };
  }
}

const tierSchema = () =>
  new (f().SchemaField)({
    summary: str(),
    delta: str(),
    modifiers: modifiers(),
    uses: usesSchema(),
    weapon: weaponLineSchema(),
    choices: choices(),
    automation: str()
  });

export class ImplantData extends ItemDataBase {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      slot: str('neural'),
      quality: str('street'),
      installed: bool(false),
      choice: obj(),
      tiers: new (f().SchemaField)({ street: tierSchema(), corp: tierSchema(), military: tierSchema() })
    };
  }
}

export class ProgramData extends ItemDataBase {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      kind: str('program'),
      tier: int(1),
      range: str(),
      effect: html(),
      damage: str(),
      healing: str(),
      save: new (f().SchemaField)({ ability: str(), cd: int(0), half: bool(false) }),
      alertDelta: int(0),
      uses: usesSchema(),
      crashed: bool(false),
      automation: str()
    };
  }
}

export const ITEM_MODELS = {
  class: ClassData,
  origin: OriginData,
  background: BackgroundData,
  alignment: AlignmentData,
  feature: FeatureData,
  weapon: WeaponData,
  armor: ArmorData,
  gear: GearData,
  implant: ImplantData,
  program: ProgramData
};
