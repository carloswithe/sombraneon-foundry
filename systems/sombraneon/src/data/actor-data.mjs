import { SN } from '../config.mjs';
import { int, num, nullableInt, str, bool, html, obj, numArray, strArray } from './fields.mjs';

const f = () => foundry.data.fields;

const abilitySchema = () =>
  new (f().SchemaField)(
    Object.fromEntries(SN.abilities.map((k) => [k, new (f().SchemaField)({ base: int(10) })]))
  );

export class CharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      abilities: abilitySchema(),
      level: int(1, { min: 1, max: SN.maxLevel }),
      xp: new (f().SchemaField)({ value: int(0, { min: 0 }) }),
      hp: new (f().SchemaField)({ value: int(0), max: int(0), rolls: numArray(), bonus: int(0) }),
      ac: new (f().SchemaField)({ cover: bool(false), override: nullableInt() }),
      edge: new (f().SchemaField)({ value: int(0, { min: 0 }), triggerUsed: bool(false) }),
      dying: new (f().SchemaField)({
        active: bool(false),
        remaining: int(0),
        rolled: int(0),
        stable: bool(false)
      }),
      currency: new (f().SchemaField)({ credits: int(0, { min: 0 }) }),
      slots: new (f().SchemaField)({ manualBonus: int(0) }),
      vehicleTraining: strArray(),
      details: new (f().SchemaField)({
        civilName: str(),
        drive: str(),
        languages: str('Dialeto da cidade'),
        appearance: html(),
        biography: html(),
        contacts: html(),
        notes: html(),
        groupGoals: html()
      }),
      network: new (f().SchemaField)({
        immersed: bool(false),
        deckFried: bool(false),
        nanokitBroken: bool(false),
        traced: bool(false),
        firewall: new (f().SchemaField)({
          active: bool(false),
          expiresAt: nullableInt(),
          pausedAt: nullableInt()
        })
      }),
      creation: new (f().SchemaField)({ completed: bool(false), step: int(0) })
    };
  }
}

export class NpcData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      level: int(1, { min: 0 }),
      hp: new (f().SchemaField)({ value: int(4), max: int(4) }),
      ac: int(10),
      armor: int(0, { min: 0 }),
      movement: str(),
      alignment: str(),
      initiative: int(0),
      morale: new (f().SchemaField)({ enabled: bool(true), kind: str('normal'), mod: int(0), cd: int(15) }),
      attacks: new (f().ArrayField)(
        new (f().SchemaField)({ name: str(), bonus: int(0), damage: str('d6'), range: str('close'), notes: str(), heavy: bool(false) }),
        { required: true, initial: () => [] }
      ),
      traits: html(),
      loot: html(),
      credits: int(0, { min: 0 })
    };
  }
}

export class IceData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      level: int(1, { min: 1, max: 5 }),
      hp: new (f().SchemaField)({ value: int(5), max: int(5) }),
      ac: int(11),
      attack: new (f().SchemaField)({
        name: str(),
        bonus: int(0),
        damage: str('1d4'),
        count: int(1, { min: 1 }),
        type: str('neural')
      }),
      trick: new (f().SchemaField)({ name: str(), text: html() }),
      networkRole: str()
    };
  }
}

export class DroneData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ownerUuid: str(),
      kind: str('primary'),
      destroyed: bool(false),
      hp: new (f().SchemaField)({ value: int(6), max: int(6) })
    };
  }
}

export const ACTOR_MODELS = { character: CharacterData, npc: NpcData, ice: IceData, drone: DroneData };
