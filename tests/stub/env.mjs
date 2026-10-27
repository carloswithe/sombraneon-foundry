import fs from 'node:fs';
import path from 'node:path';
import Handlebars from 'handlebars';
import { ROOT } from '../../tools/lib/book.mjs';

/**
 * Ambiente mínimo que imita as partes do Foundry v13 que o sistema usa, para testar o código de
 * runtime (modelos, documentos, fichas, templates e rolagens) fora do Foundry.
 * Não substitui testar dentro do Foundry.
 */
const lang = JSON.parse(fs.readFileSync(path.join(ROOT, 'systems/sombraneon/lang/pt-BR.json'), 'utf8'));
const lookup = (key) => key.split('.').reduce((o, k) => o?.[k], lang);

export const calls = { messages: [], created: [], settings: {} };

/* ---------- campos de dados (registram a estrutura) ---------- */
class Field {
  constructor(options = {}) {
    this.options = options;
    this.kind = this.constructor.name;
  }
}
class SchemaField extends Field {
  constructor(fields, options) {
    super(options);
    this.fields = fields;
  }
}
class ArrayField extends Field {
  constructor(element, options) {
    super(options);
    this.element = element;
  }
}
const fields = { SchemaField, ArrayField };
for (const n of ['NumberField', 'StringField', 'BooleanField', 'HTMLField', 'ObjectField']) fields[n] = { [n]: class extends Field {} }[n];

/** Preenche os valores iniciais do esquema, como o DataModel do Foundry faz. */
function fill(field, value) {
  const init = (o) => (typeof o.initial === 'function' ? o.initial() : o.initial);
  switch (field.kind) {
    case 'SchemaField': {
      if (value === null && field.options?.nullable) return null;
      if (value === undefined && field.options && 'initial' in field.options) return field.options.initial;
      const out = {};
      for (const [k, f] of Object.entries(field.fields)) out[k] = fill(f, value?.[k]);
      return out;
    }
    case 'ArrayField':
      return Array.isArray(value) ? value.map((v) => fill(field.element, v)) : (field.options?.initial ? init(field.options) : []);
    case 'ObjectField':
      return value ?? (field.options?.initial ? init(field.options) : {});
    default:
      return value !== undefined ? value : init(field.options ?? {});
  }
}
export function withDefaults(Model, system) {
  if (!Model) return JSON.parse(JSON.stringify(system ?? {}));
  const schema = new SchemaField(Model.defineSchema());
  return JSON.parse(JSON.stringify(fill(schema, system ?? {})));
}

/* ---------- utilitários ---------- */
const getProperty = (o, p) => String(p).split('.').reduce((a, k) => (a === undefined || a === null ? undefined : a[k]), o);
const setProperty = (o, p, v) => {
  const parts = String(p).split('.');
  let cur = o;
  for (const k of parts.slice(0, -1)) cur = cur[k] ??= {};
  cur[parts.at(-1)] = v;
};
const deepClone = (o) => (o === undefined ? undefined : JSON.parse(JSON.stringify(o)));
const mergeObject = (a, b) => {
  const out = deepClone(a);
  const merge = (t, s) => {
    for (const [k, v] of Object.entries(s ?? {})) {
      if (v && typeof v === 'object' && !Array.isArray(v)) t[k] = merge(t[k] && typeof t[k] === 'object' ? t[k] : {}, v);
      else t[k] = v;
    }
    return t;
  };
  return merge(out, b);
};

/* ---------- Roll com sorteio real ---------- */
const rng = { next: Math.random };
export const setRng = (fn) => (rng.next = fn ?? Math.random);
class DieTerm {
  constructor(number, faces, modifier, keep) {
    this.number = number;
    this.faces = faces;
    this.results = [];
    for (let i = 0; i < number; i++) this.results.push({ result: 1 + Math.floor(rng.next() * faces), active: true });
    if (modifier) {
      const sorted = this.results.map((r, i) => [r.result, i]).sort((a, b) => (modifier === 'kh' ? b[0] - a[0] : a[0] - b[0]));
      const keepIdx = new Set(sorted.slice(0, keep).map((x) => x[1]));
      this.results.forEach((r, i) => (r.active = keepIdx.has(i)));
    }
  }
  get total() {
    return this.results.filter((r) => r.active).reduce((n, r) => n + r.result, 0);
  }
}
class Roll {
  constructor(formula, data = {}) {
    this.formula = String(formula);
    this.data = data;
    this.dice = [];
    this.total = 0;
  }
  async evaluate() {
    const src = this.formula.replace(/@([\w.]+)/g, (_, p) => String(Number(getProperty(this.data, p)) || 0));
    const tokens = src.match(/(\d*d\d+(?:k[hl]\d*)?|\d+(?:\.\d+)?|[+-])/g) ?? [];
    let total = 0;
    let sign = 1;
    for (const tk of tokens) {
      if (tk === '+') sign = 1;
      else if (tk === '-') sign = -1;
      else if (/d/.test(tk)) {
        const m = /^(\d*)d(\d+)(?:(k[hl])(\d*))?$/.exec(tk);
        const term = new DieTerm(m[1] === '' ? 1 : Number(m[1]), Number(m[2]), m[3], m[4] === '' || !m[4] ? 1 : Number(m[4]));
        this.dice.push(term);
        total += sign * term.total;
        sign = 1;
      } else {
        total += sign * Number(tk);
        sign = 1;
      }
    }
    this.total = total;
    return this;
  }
}

/* ---------- coleção e documentos ---------- */
class Collection extends Map {
  [Symbol.iterator]() {
    return this.values();
  }
  filter(fn) {
    return [...this.values()].filter(fn);
  }
  map(fn) {
    return [...this.values()].map(fn);
  }
  find(fn) {
    return [...this.values()].find(fn);
  }
  some(fn) {
    return [...this.values()].some(fn);
  }
  reduce(fn, init) {
    return [...this.values()].reduce(fn, init);
  }
  get contents() {
    return [...this.values()];
  }
}

class FakeDocument {
  getFlag(scope, key) {
    return getProperty(this.flags?.[scope] ?? {}, key);
  }
  async setFlag(scope, key, value) {
    this.flags[scope] ??= {};
    setProperty(this.flags[scope], key, value);
  }
  async unsetFlag(scope, key) {
    delete this.flags?.[scope]?.[key];
  }
  async update(data) {
    for (const [k, v] of Object.entries(data)) setProperty(this, k.startsWith('system') ? k : k, v);
    this.prepareData?.();
  }
}
class Item extends FakeDocument {
  constructor(data, parent = null) {
    super();
    this.id = data._id ?? data.id ?? `item${Math.random().toString(36).slice(2, 8)}`;
    this.type = data.type;
    this.name = data.name;
    this.img = data.img;
    this.system = withDefaults(globalThis.__models?.item?.[data.type], data.system);
    this._source = deepClone({ ...data, system: this.system, flags: data.flags ?? {} });
    this.flags = deepClone(data.flags ?? {});
    this.parent = parent;
    this.uuid = parent ? `${parent.uuid}.Item.${this.id}` : `Compendium.fake.${this.id}`;
    this.isOwner = true;
    this.pack = null;
    this.prepareDerivedData();
  }
  prepareDerivedData() {}
  toObject() {
    return deepClone({ ...this._source, system: this.system, flags: this.flags });
  }
  toDragData() {
    return { type: 'Item', uuid: this.uuid };
  }
  async update(data) {
    for (const [k, v] of Object.entries(data)) {
      setProperty(this, k, v);
      if (k.startsWith('system.')) setProperty(this._source, k, v);
    }
    if (this.parent) this.parent.prepareData();
  }
  async delete() {
    this.parent?.items.delete(this.id);
    this.parent?.prepareData();
  }
}
class Actor extends FakeDocument {
  constructor(data) {
    super();
    this.id = data._id ?? `actor${Math.random().toString(36).slice(2, 8)}`;
    this.uuid = `Actor.${this.id}`;
    this.name = data.name;
    this.type = data.type;
    this.img = data.img;
    this.system = withDefaults(globalThis.__models?.actor?.[data.type], data.system);
    this.flags = deepClone(data.flags ?? {});
    this.statuses = new Set();
    this.isOwner = true;
    this.items = new Collection();
    this.sheet = { render() {} };
    this._rawItems = data.items ?? [];
  }
  /** Chamado após construir a classe filha (precisa de SNItem). */
  loadItems(ItemClass) {
    this.items.clear();
    for (const d of this._rawItems) {
      const it = new ItemClass(d, this);
      this.items.set(it.id, it);
    }
    this.prepareData();
    return this;
  }
  prepareData() {
    this.prepareDerivedData();
  }
  prepareDerivedData() {}
  getRollData() {
    return deepClone(this.system);
  }
  async update(data) {
    for (const [k, v] of Object.entries(data)) setProperty(this, k, v);
    this.prepareData();
  }
  async createEmbeddedDocuments(type, list) {
    const created = list.map((d) => {
      const it = new this.constructor.ItemClass(d, this);
      this.items.set(it.id, it);
      return it;
    });
    this.prepareData();
    return created;
  }
  async updateEmbeddedDocuments(type, updates) {
    for (const { _id, ...data } of updates) await this.items.get(_id)?.update(data);
  }
  async deleteEmbeddedDocuments(type, ids) {
    ids.forEach((id) => this.items.delete(id));
    this.prepareData();
  }
  async toggleStatusEffect(id, { active }) {
    if (active) this.statuses.add(id);
    else this.statuses.delete(id);
  }
  getActiveTokens() {
    return [];
  }
}
Item.prototype.documentName = 'Item';
Actor.prototype.documentName = 'Actor';
class Combatant extends FakeDocument {}

/* ---------- aplicações ---------- */
class ApplicationV2 {
  static DEFAULT_OPTIONS = {};
  constructor(options = {}) {
    this.options = options;
    this.document = options.document;
  }
  get isEditable() {
    return true;
  }
  async _prepareContext() {
    return { document: this.document };
  }
  async _onRender() {}
  async render() {
    return this;
  }
  close() {}
}

export function installGlobals() {
  globalThis.Handlebars = Handlebars;
  globalThis.Roll = Roll;
  globalThis.Actor = Actor;
  globalThis.Item = Item;
  globalThis.Combatant = Combatant;
  globalThis.Folder = class {};
  globalThis.Macro = class {};
  globalThis.Hooks = { handlers: {}, once(n, f) { (this.handlers[n] ??= []).push(f); }, on(n, f) { (this.handlers[n] ??= []).push(f); }, callAll() {} };
  globalThis.CONFIG = { Actor: {}, Item: {}, Combatant: {}, Combat: {}, specialStatusEffects: {}, ux: {} };
  globalThis.ChatMessage = {
    getSpeaker: ({ actor } = {}) => ({ actor: actor?.id, alias: actor?.name }),
    getWhisperRecipients: () => [],
    applyRollMode: () => {},
    create: async (data) => {
      calls.messages.push(data);
      return { ...data, rolls: data.rolls, update: async () => {} };
    }
  };
  globalThis.ui = { notifications: { info: () => {}, warn: (m) => calls.messages.push({ warn: m }), error: () => {} } };
  const dm = { isGM: true, id: 'gm', targets: new Set(), character: null, can: () => true };
  globalThis.game = {
    i18n: {
      localize: (k) => (typeof lookup(k) === 'string' ? lookup(k) : k),
      format: (k, d = {}) => String(typeof lookup(k) === 'string' ? lookup(k) : k).replace(/\{(\w+)\}/g, (_, n) => d[n] ?? `{${n}}`),
      has: (k) => typeof lookup(k) === 'string'
    },
    settings: {
      get: (id, key) => {
        const defaults = { unarmedDie: 'd4', showTargetResult: true, purchaseMode: 'ask', alertStacking: 'literal', proficiencyPenalty: 'warn', wizardAllowManualAbilities: true, burstDamage: 'perTarget', talentToChat: true, xpOnLevelUp: 'carry', hpLevel1Mode: 'roll', announceSelections: false, restRequiresRation: true, autoCyberpsychosisOnRest: true, restQuality: 'safe', confirmEdge: false, firewallTimer: 'real', alert: { value: 0, active: false, label: '', erased: false }, rollMode: 'publicroll' };
        return calls.settings[key] ?? defaults[key];
      },
      set: async (id, key, value) => (calls.settings[key] = value),
      register: (id, key, cfg) => (calls.settings[`__reg_${key}`] = cfg)
    },
    user: dm,
    users: { activeGM: dm, get: () => dm },
    actors: [],
    packs: new Map(),
    folders: [],
    time: { worldTime: 0 },
    socket: { on() {}, emit() {} },
    system: { id: 'sombraneon' }
  };
  const registry = new Map();
  globalThis.fromUuid = async (uuid) => registry.get(uuid) ?? null;
  globalThis.fromUuidSync = (uuid) => registry.get(uuid) ?? null;
  globalThis.__registry = registry;
  globalThis.foundry = {
    abstract: { TypeDataModel: class { static defineSchema() { return {}; } } },
    data: { fields },
    utils: { getProperty, setProperty, deepClone, mergeObject, hasProperty: (o, p) => getProperty(o, p) !== undefined, randomID: () => Math.random().toString(36).slice(2, 10), escapeHTML: (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]) },
    applications: {
      api: { ApplicationV2, HandlebarsApplicationMixin: (Base) => class extends Base {}, DialogV2: class { static async wait() { return null; } static async prompt() { return null; } static async confirm() { return true; } } },
      sheets: { ActorSheetV2: class extends ApplicationV2 {}, ItemSheetV2: class extends ApplicationV2 {} },
      apps: { DocumentSheetConfig: { registerSheet: (...a) => (calls.sheets ??= []).push(a) } },
      ux: { FormDataExtended: class {}, TextEditor: { implementation: { enrichHTML: async (h) => h, getDragEventData: () => ({}) } } },
      handlebars: {
        renderTemplate: async (p, data) => {
          const file = path.join(ROOT, p);
          return Handlebars.compile(fs.readFileSync(file, 'utf8'))(data);
        },
        loadTemplates: async () => {}
      }
    }
  };
  Handlebars.registerHelper('localize', (key, options) => {
    const hash = options?.hash ?? {};
    return Object.keys(hash).length ? game.i18n.format(key, hash) : game.i18n.localize(key);
  });
  globalThis.Item.fromDropData = undefined;
  return { registry, Collection };
}

/** Registra os parciais usados via {{> "caminho"}}. */
export function registerPartials() {
  const dir = path.join(ROOT, 'systems/sombraneon/templates/partials');
  for (const f of fs.readdirSync(dir)) {
    Handlebars.registerPartial(`systems/sombraneon/templates/partials/${f}`, fs.readFileSync(path.join(dir, f), 'utf8'));
  }
}

export { Collection, Roll, Actor, Item };
