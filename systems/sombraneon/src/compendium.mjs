import { SN } from './config.mjs';

/** Pacotes de compêndio por tipo de item. O módulo de catálogo é opcional. */
export const PACKS_BY_TYPE = {
  class: [`${SN.id}.classes`],
  origin: [`${SN.id}.origens`],
  background: [`${SN.id}.antecedentes`],
  alignment: [`${SN.id}.alinhamentos`],
  feature: [`${SN.id}.caracteristicas`],
  program: [`${SN.id}.programas`],
  weapon: [`${SN.moduleId}.armas`],
  armor: [`${SN.moduleId}.armaduras`],
  gear: [`${SN.moduleId}.equipamento`, `${SN.moduleId}.veiculos`],
  implant: [`${SN.moduleId}.implantes`]
};

const FIELDS = [
  'sort',
  'system.identifier',
  'system.kind',
  'system.tier',
  'system.slot',
  'system.category',
  'system.rollIndex',
  'system.price',
  'system.knowledge',
  'system.highlight',
  'flags.sombraneon'
];

/**
 * Índice dos compêndios, carregado uma vez no `ready` e consultado por `identifier`
 * (nunca por nome ou por _id digitado).
 */
export class CompendiumIndex {
  static #byType = new Map();
  static #loaded = false;

  static async load() {
    this.#byType.clear();
    for (const [type, packIds] of Object.entries(PACKS_BY_TYPE)) {
      const entries = [];
      for (const id of packIds) {
        const pack = game.packs.get(id);
        if (!pack) continue;
        const index = await pack.getIndex({ fields: FIELDS });
        for (const e of index) {
          entries.push({
            uuid: e.uuid,
            name: e.name,
            img: e.img,
            type,
            pack: id,
            identifier: foundry.utils.getProperty(e, 'system.identifier') ?? '',
            kind: foundry.utils.getProperty(e, 'system.kind') ?? '',
            tier: foundry.utils.getProperty(e, 'system.tier') ?? 0,
            slot: foundry.utils.getProperty(e, 'system.slot') ?? '',
            category: foundry.utils.getProperty(e, 'system.category') ?? '',
            rollIndex: foundry.utils.getProperty(e, 'system.rollIndex') ?? 0,
            price: foundry.utils.getProperty(e, 'system.price') ?? 0,
            knowledge: foundry.utils.getProperty(e, 'system.knowledge') ?? '',
            highlight: !!foundry.utils.getProperty(e, 'system.highlight'),
            bundle: foundry.utils.getProperty(e, 'flags.sombraneon.bundle') ?? null,
            alignment: foundry.utils.getProperty(e, 'flags.sombraneon.alignment') ?? '',
            classId: foundry.utils.getProperty(e, 'flags.sombraneon.class') ?? '',
            sort: e.sort ?? 0
          });
        }
      }
      entries.sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name, 'pt-BR'));
      this.#byType.set(type, entries);
    }
    this.#loaded = true;
  }

  static get loaded() {
    return this.#loaded;
  }

  static list(type) {
    return this.#byType.get(type) ?? [];
  }

  static resolve(type, identifier) {
    return this.list(type).find((e) => e.identifier === identifier) ?? null;
  }

  /** Resolve "tipo:identifier" (formato dos grants). */
  static resolveRef(ref) {
    const [type, ...rest] = String(ref).split(':');
    return this.resolve(type, rest.join(':'));
  }

  static async get(type, identifier) {
    const entry = this.resolve(type, identifier);
    return entry ? fromUuid(entry.uuid) : null;
  }

  static async getRef(ref) {
    const entry = this.resolveRef(ref);
    return entry ? fromUuid(entry.uuid) : null;
  }

  /** O módulo de catálogo está ativo e com os compêndios disponíveis? */
  static get hasCatalog() {
    return !!game.packs.get(`${SN.moduleId}.armas`);
  }
}

/** Tabela do sistema por identifier (RollTable). */
export async function getTable(identifier) {
  const pack = game.packs.get(`${SN.id}.tabelas`);
  if (!pack) return null;
  const index = await pack.getIndex({ fields: ['flags.sombraneon.identifier'] });
  const entry = [...index].find((e) => foundry.utils.getProperty(e, 'flags.sombraneon.identifier') === identifier) ?? null;
  if (entry) return pack.getDocument(entry._id);
  return null;
}
