import { SN } from '../config.mjs';
import { ID, t, tpl, esc, notify, confirm, DialogV2 } from '../util.mjs';
import { CompendiumIndex, getTable } from '../compendium.mjs';
import { abilityMod, signed } from '../logic/abilities.mjs';
import { canRerollAbilities, implantPrice, slotsUsed, tierMax, packageCost } from '../logic/rules.mjs';
import { cyberpsychosis } from '../logic/rules.mjs';
import { evaluate } from '../rolls.mjs';
import { chooseDialog, selectPrompt, format } from './dialogs.mjs';
import { applySelection, setCustomBackground, selectEdgeTrigger, triggersFor, embedCopy } from '../grants.mjs';
import { ensureDrone } from '../automation/drone.mjs';
import { postEvent } from '../automation/casting.mjs';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

const STEPS = ['intro', 'abilities', 'origin', 'class', 'background', 'alignment', 'chrome', 'gear', 'talents', 'review'];
const DRIVES = ['hunt', 'chrome', 'rank', 'fame', 'secrets', 'survive'];

const blankDraft = () => ({
  step: 0,
  name: '',
  civilName: '',
  abilities: [10, 10, 10, 10, 10, 10],
  fullRolls: 0,
  origin: null,
  originPicks: { factoryImplants: [], mutations: [] },
  class: null,
  classPicks: { family: '', programs: [], protocols: [], sets: [] },
  background: { uuid: '', custom: '', contact: '' },
  alignment: null,
  trigger: null,
  credits: null,
  implants: [],
  cart: [],
  talents: [],
  drive: '',
  appearance: '',
  language: ''
});

const rollTotal = async (formula) => (await evaluate(formula)).total;

/**
 * Assistente de criação (docs/spec/03, seção 3): conduz os 7 passos do capítulo 2 do livro.
 * O rascunho fica em flags.sombraneon.wizardDraft; nada é gravado na ficha até Concluir.
 */
export class CreationWizard extends HandlebarsApplicationMixin(ApplicationV2) {
  constructor(options = {}) {
    super(options);
    this.actor = options.document;
    this.draft = foundry.utils.mergeObject(blankDraft(), this.actor.getFlag(ID, 'wizardDraft') ?? {}, { inplace: false });
    this.shopTab = 'weapon';
  }

  static DEFAULT_OPTIONS = {
    classes: ['sombraneon', 'sn-wizard'],
    tag: 'section',
    position: { width: 900, height: 720 },
    window: { title: 'SOMBRANEON.Wizard.Title', resizable: true },
    actions: {
      next: CreationWizard.#next,
      back: CreationWizard.#back,
      goto: CreationWizard.#goto,
      rollAbilities: CreationWizard.#rollAbilities,
      pickOrigin: CreationWizard.#pickOrigin,
      pickClass: CreationWizard.#pickClass,
      rollBackground: CreationWizard.#rollBackground,
      pickAlignment: CreationWizard.#pickAlignment,
      pickTrigger: CreationWizard.#pickTrigger,
      rollTrigger: CreationWizard.#rollTrigger,
      addImplant: CreationWizard.#addImplant,
      removeImplant: CreationWizard.#removeImplant,
      addPackage: CreationWizard.#addPackage,
      addKit: CreationWizard.#addKit,
      addCart: CreationWizard.#addCart,
      removeCart: CreationWizard.#removeCart,
      shopTab: CreationWizard.#shopTab,
      rollTalent: CreationWizard.#rollTalent,
      finish: CreationWizard.#finish,
      pickDrive: CreationWizard.#pickDrive
    }
  };

  static PARTS = { body: { template: tpl('apps/wizard.hbs'), scrollable: ['.sn-wizard-body'] } };

  get title() {
    return `${t('Wizard.Title')}: ${this.draft.name || this.actor.name}`;
  }

  async #save() {
    await this.actor.setFlag(ID, 'wizardDraft', this.draft);
  }

  /* ---------- derivados do rascunho ---------- */

  #cls() {
    return this.draft.class ? CompendiumIndex.resolve('class', this.draft.class) : null;
  }

  async #classDoc() {
    const e = this.#cls();
    return e ? fromUuid(e.uuid) : null;
  }

  /** Pacote inicial da classe com preços do catálogo. */
  async #package() {
    const doc = await this.#classDoc();
    if (!doc) return [];
    const out = [];
    for (const { ref, qty } of doc.system.startingPackage) {
      const entry = ['weapon', 'armor', 'gear'].map((type) => CompendiumIndex.resolve(type, ref)).find(Boolean);
      if (entry) out.push({ type: entry.type, identifier: ref, qty, price: entry.price, name: entry.name });
    }
    return out;
  }

  #spent() {
    const implants = this.draft.implants.reduce((n, i) => n + implantPrice({ quality: i.quality, clinic: i.clinic }), 0);
    const cart = this.draft.cart.reduce((n, c) => n + (CompendiumIndex.resolve(c.type, c.identifier)?.price ?? 0) * c.qty, 0);
    return implants + cart;
  }

  #implantCount() {
    const origin = this.draft.origin;
    const factory = origin === 'cromado' ? this.draft.originPicks.factoryImplants.length : 0;
    return factory + this.draft.implants.length;
  }

  /* ---------- contexto ---------- */

  async _prepareContext() {
    const d = this.draft;
    const stepId = STEPS[d.step];
    const mods = d.abilities.map((v) => abilityMod(v));
    const abilities = SN.abilities.map((key, i) => ({ key, label: t(`Abilities.${key}`), value: d.abilities[i], mod: signed(mods[i]) }));
    const canReroll = d.fullRolls === 1 && canRerollAbilities(d.abilities);
    const cards = (type, selected) =>
      CompendiumIndex.list(type).map((e) => ({ id: e.identifier, uuid: e.uuid, name: e.name, img: e.img, selected: e.identifier === selected, summary: '' }));
    const origins = cards('origin', d.origin).map((c) => ({ ...c, summary: t(`Wizard.Origin.${c.id}`) }));
    const classes = cards('class', d.class).map((c) => ({ ...c, summary: t(`Wizard.Class.${c.id}`) }));
    const aligns = cards('alignment', d.alignment).map((c) => ({ ...c, summary: t(`Wizard.Alignment.${c.id}`) }));
    const cls = this.#cls();
    const chosenClass = await this.#classDoc();
    const key = chosenClass?.system.keyAbilities ?? [];
    const keyWarn = key.length && !key.some((k) => abilityMod(d.abilities[SN.abilities.indexOf(k)]) > 0) ? t('Wizard.KeyAbilityWeak', { abilities: key.map((k) => t(`Abilities.${k}`)).join('/') }) : '';
    const catalog = CompendiumIndex.hasCatalog;
    const spent = this.#spent();
    const pkg = await this.#package();
    const pkgCost = packageCost(pkg);
    const cy = cyberpsychosis({ count: this.#implantCount(), adjust: d.origin === 'cromado' ? -1 : d.origin === 'biomod' ? 1 : 0 });
    const triggers = d.alignment ? triggersFor(d.alignment).map((e) => ({ id: e.identifier, name: e.name, selected: d.trigger === e.identifier })) : [];
    const backgrounds = CompendiumIndex.list('background').map((e) => ({ uuid: e.uuid, name: e.name, knowledge: e.knowledge, highlight: e.highlight, selected: d.background.uuid === e.uuid }));
    const shopType = this.shopTab;
    const shop = catalog ? CompendiumIndex.list(shopType).filter((e) => !(shopType === 'gear' && ['vehicle', 'vehicle-module'].includes(e.category)) && !e.mount).map((e) => ({ type: e.type, id: e.identifier, name: e.name, img: e.img, price: format(e.price) })) : [];
    const cart = d.cart.map((c, i) => {
      const e = CompendiumIndex.resolve(c.type, c.identifier);
      return { index: i, name: e?.name ?? c.identifier, qty: c.qty, price: format((e?.price ?? 0) * c.qty) };
    });
    const implantOptions = catalog ? CompendiumIndex.list('implant').map((e) => ({ id: e.identifier, name: e.name, slot: t(`Slot.${e.slot}`), slotKey: e.slot })) : [];
    const stacks = d.cart.map((c) => ({ quantity: c.qty, slots: 1, perSlot: ['carregador', 'bateria', 'stim', 'firewall'].includes(c.identifier) ? 2 : 1 }));
    const balance = d.credits === null ? null : d.credits - spent;
    const talentCount = 1 + (d.origin === 'nat' ? 1 : 0);
    return {
      stepId,
      stepIndex: d.step,
      steps: STEPS.map((id, i) => ({ id, label: t(`Wizard.Steps.${id}`), n: i + 1, index: i, active: i === d.step, done: i < d.step })),
      isFirst: d.step === 0,
      isLast: d.step === STEPS.length - 1,
      d,
      abilities,
      canRerollAbilities: canReroll,
      rolledOnce: d.fullRolls >= 1,
      allowManual: game.settings.get(ID, 'wizardAllowManualAbilities') || game.user.isGM,
      origins,
      classes,
      aligns,
      chosenClass: chosenClass ? { name: chosenClass.name, hitDie: chosenClass.system.hitDie, key: key.map((k) => t(`Abilities.${k}`)).join('/'), kind: chosenClass.system.casting.kind } : null,
      keyWarn,
      classPickLabel: this.#classPickLabel(),
      originPickLabel: this.#originPickLabel(),
      originNeedsCatalog: d.origin === 'cromado' && !catalog,
      backgrounds,
      aligns,
      triggers,
      catalog,
      credits: d.credits,
      balance,
      spent: format(spent),
      balanceText: balance === null ? '' : format(balance),
      overspent: balance !== null && balance < 0,
      cyberText: cy.cd ? t('Chrome.Risk', { cd: cy.cd }) : t('Chrome.NoRisk'),
      cyberCount: this.#implantCount(),
      implantOptions,
      chosenImplants: d.implants.map((i, index) => ({ index, name: CompendiumIndex.resolve('implant', i.identifier)?.name ?? i.identifier, quality: t(`Quality.${i.quality}`), price: format(implantPrice({ quality: i.quality, clinic: i.clinic })) })),
      factoryImplants: d.originPicks.factoryImplants.map((id) => CompendiumIndex.resolve('implant', id)?.name ?? id),
      mutations: d.originPicks.mutations.map((id) => CompendiumIndex.resolve('feature', id)?.name ?? id),
      package: pkg.map((p) => ({ ...p, priceText: format(p.price * p.qty) })),
      packageCost: format(pkgCost),
      shopTab: shopType,
      shopTabs: [['weapon', 'Wizard.Shop.weapon'], ['armor', 'Wizard.Shop.armor'], ['gear', 'Wizard.Shop.gear']].map(([id, label]) => ({ id, label: t(label), active: id === shopType })),
      shop,
      cart,
      slotUsed: slotsUsed(stacks),
      talentsRolled: d.talents.map((tl) => ({ ...tl, name: CompendiumIndex.resolve('feature', tl.id)?.name ?? tl.id })),
      talentsLeft: talentCount - d.talents.length,
      talentCount,
      drives: DRIVES.map((k) => ({ id: k, label: t(`Wizard.Drive.${k}`) })),
      summary: this.#summary(chosenClass, abilities),
      canFinish: !!(d.origin && d.class && d.alignment && d.trigger && (d.background.uuid || d.background.custom))
    };
  }

  #classPickLabel() {
    const d = this.draft;
    if (d.class === 'solo') return d.classPicks.family ? t(`Family.${d.classPicks.family}`) : '';
    const key = { netrunner: 'programs', hyperdoc: 'protocols', rocker: 'sets' }[d.class];
    if (!key) return '';
    return d.classPicks[key].map((id) => CompendiumIndex.resolve('program', id)?.name ?? id).join(', ');
  }

  #originPickLabel() {
    const d = this.draft;
    if (d.origin === 'cromado') return d.originPicks.factoryImplants.map((id) => CompendiumIndex.resolve('implant', id)?.name ?? id).join(', ');
    if (d.origin === 'biomod') return d.originPicks.mutations.map((id) => CompendiumIndex.resolve('feature', id)?.name ?? id).join(', ');
    return '';
  }

  #summary(chosenClass, abilities) {
    const d = this.draft;
    const name = (type, id) => (id ? CompendiumIndex.resolve(type, id)?.name ?? id : '-');
    const bg = d.background.custom || CompendiumIndex.list('background').find((e) => e.uuid === d.background.uuid)?.name || '-';
    return [
      [t('Wizard.Summary.Name'), d.name || this.actor.name],
      [t('Wizard.Summary.Abilities'), abilities.map((a) => `${a.label} ${a.value} (${a.mod})`).join('  ')],
      [t('Wizard.Summary.Origin'), name('origin', d.origin)],
      [t('Wizard.Summary.Class'), name('class', d.class)],
      [t('Wizard.Summary.Background'), bg],
      [t('Wizard.Summary.Alignment'), `${name('alignment', d.alignment)} / ${name('feature', d.trigger)}`],
      [t('Wizard.Summary.Chrome'), [...this.draft.originPicks.factoryImplants, ...this.draft.implants.map((i) => i.identifier)].map((id) => name('implant', id)).join(', ') || '-'],
      [t('Wizard.Summary.Gear'), d.cart.map((c) => `${CompendiumIndex.resolve(c.type, c.identifier)?.name ?? c.identifier}${c.qty > 1 ? ` ×${c.qty}` : ''}`).join(', ') || '-'],
      [t('Wizard.Summary.Talents'), d.talents.map((tl) => CompendiumIndex.resolve('feature', tl.id)?.name ?? tl.id).join(', ') || '-'],
      [t('Wizard.Summary.Credits'), d.credits === null ? '-' : format(d.credits - this.#spent())]
    ];
  }

  async _onRender(context, options) {
    await super._onRender(context, options);
    const el = this.element;
    el.querySelectorAll('[data-wiz]').forEach((input) => {
      input.addEventListener('change', async (event) => {
        await this.#onField(input.dataset.wiz, input, event);
      });
    });
  }

  async #onField(field, input) {
    const d = this.draft;
    switch (field) {
      case 'name':
        d.name = input.value;
        break;
      case 'civilName':
        d.civilName = input.value;
        break;
      case 'ability':
        d.abilities[Number(input.dataset.index)] = Math.max(3, Math.min(18, Number(input.value) || 10));
        break;
      case 'contact':
        d.background.contact = input.value;
        break;
      case 'customBackground':
        d.background.custom = input.value;
        if (input.value) d.background.uuid = '';
        break;
      case 'pickBackground':
        d.background.uuid = input.value;
        if (input.value) d.background.custom = '';
        break;
      case 'drive':
        d.drive = input.value;
        break;
      case 'appearance':
        d.appearance = input.value;
        break;
      case 'language':
        d.language = input.value;
        break;
    }
    await this.#save();
    return this.render();
  }

  /* ---------- navegação ---------- */

  static async #next() {
    const d = this.draft;
    // Entrar no passo de cromo rola os créditos iniciais (uma vez)
    if (STEPS[d.step + 1] === 'chrome' && d.credits === null) d.credits = (await rollTotal('2d6')) * 100;
    if (d.step < STEPS.length - 1) d.step += 1;
    await this.#save();
    return this.render();
  }

  static async #back() {
    if (this.draft.step > 0) this.draft.step -= 1;
    await this.#save();
    return this.render();
  }

  static async #goto(event, target) {
    const n = Number(target.dataset.step);
    if (n <= this.draft.step) this.draft.step = n;
    await this.#save();
    return this.render();
  }

  /* ---------- passo 1: atributos ---------- */

  static async #rollAbilities() {
    const d = this.draft;
    if (d.fullRolls >= 2) return;
    if (d.fullRolls === 1 && !canRerollAbilities(d.abilities)) return notify('warn', 'Wizard.NoReroll');
    const values = [];
    for (let i = 0; i < 6; i++) values.push(await rollTotal('3d6'));
    d.abilities = values;
    d.fullRolls += 1;
    await this.#save();
    return this.render();
  }

  /* ---------- passo 2: origem ---------- */

  static async #pickOrigin(event, target) {
    const d = this.draft;
    const id = target.dataset.id;
    d.origin = id;
    d.originPicks = { factoryImplants: [], mutations: [] };
    if (id === 'cromado') {
      if (!CompendiumIndex.hasCatalog) notify('warn', 'Warn.CatalogMissing');
      else {
        const used = new Set();
        for (let n = 0; n < 2; n++) {
          const pool = CompendiumIndex.list('implant').filter((e) => !used.has(e.slot));
          const picked = await chooseDialog({
            title: `${t('Wizard.FactoryImplants')} (${n + 1}/2)`,
            options: pool.map((e) => ({ value: e.identifier, label: e.name, img: e.img, hint: t(`Slot.${e.slot}`) }))
          });
          if (!picked) break;
          d.originPicks.factoryImplants.push(picked);
          used.add(CompendiumIndex.resolve('implant', picked).slot);
        }
      }
    }
    if (id === 'biomod') await this.#rollMutations();
    await this.#save();
    return this.render();
  }

  async #rollMutations() {
    const table = await getTable('mutacoes-biomod');
    if (!table) return notify('warn', 'Warn.TableMissing', { name: 'mutacoes-biomod' });
    const picked = [];
    let guard = 0;
    while (picked.length < 2 && guard++ < 100) {
      const total = await rollTotal('1d20');
      const result = table.getResultsForRoll(total)[0];
      const item = result?.documentUuid ? await fromUuid(result.documentUuid) : null;
      if (item && !picked.includes(item.system.identifier)) picked.push(item.system.identifier);
    }
    this.draft.originPicks.mutations = picked;
  }

  /* ---------- passo 3: classe ---------- */

  static async #pickClass(event, target) {
    const d = this.draft;
    const id = target.dataset.id;
    d.class = id;
    d.classPicks = { family: '', programs: [], protocols: [], sets: [] };
    if (id === 'solo') {
      const value = await selectPrompt({
        title: t('Wizard.WeaponFamily'),
        label: t('Choice.Label.family'),
        options: SN.weaponFamilies.filter((f) => f !== 'unarmed').map((f) => ({ value: f, label: t(`Family.${f}`) }))
      });
      if (value) d.classPicks.family = value;
    } else if (['netrunner', 'hyperdoc', 'rocker'].includes(id)) {
      const kind = { netrunner: 'program', hyperdoc: 'protocol', rocker: 'set' }[id];
      const key = { netrunner: 'programs', hyperdoc: 'protocols', rocker: 'sets' }[id];
      const count = id === 'rocker' ? 3 : 2;
      const pool = CompendiumIndex.list('program').filter((e) => e.kind === kind && (kind === 'set' || e.tier === 1));
      const picked = await chooseDialog({
        title: t(`Wizard.Pick.${kind}`, { count }),
        multiple: true,
        count,
        options: pool.map((e) => ({ value: e.identifier, label: e.name, img: e.img }))
      });
      if (picked?.length === count) d.classPicks[key] = picked;
    }
    await this.#save();
    return this.render();
  }

  /* ---------- passo 4: antecedente ---------- */

  static async #rollBackground() {
    const n = await rollTotal('1d20');
    const entry = CompendiumIndex.list('background').find((e) => e.rollIndex === n);
    if (entry) {
      this.draft.background.uuid = entry.uuid;
      this.draft.background.custom = '';
      ui.notifications.info(t('Selection.RolledBackground', { n, name: entry.name }));
    }
    await this.#save();
    return this.render();
  }

  /* ---------- passo 5: alinhamento ---------- */

  static async #pickAlignment(event, target) {
    const d = this.draft;
    if (d.alignment !== target.dataset.id) d.trigger = null;
    d.alignment = target.dataset.id;
    await this.#save();
    return this.render();
  }

  static async #pickTrigger(event, target) {
    this.draft.trigger = target.dataset.id;
    await this.#save();
    return this.render();
  }

  static async #rollTrigger() {
    const d = this.draft;
    if (!d.alignment) return;
    const n = await rollTotal('1d6');
    const pool = triggersFor(d.alignment);
    const pick = pool[n - 1] ?? pool[0];
    d.trigger = pick?.identifier ?? null;
    await this.#save();
    return this.render();
  }

  /* ---------- passo 6: cromo ---------- */

  static async #addImplant(event, target) {
    const d = this.draft;
    const entry = CompendiumIndex.resolve('implant', target.dataset.id);
    if (!entry) return;
    if (d.implants.some((i) => CompendiumIndex.resolve('implant', i.identifier)?.slot === entry.slot) || d.originPicks.factoryImplants.some((id) => CompendiumIndex.resolve('implant', id)?.slot === entry.slot)) return notify('warn', 'Wizard.SlotTaken');
    const doc = await fromUuid(entry.uuid);
    const quality = await chooseDialog({
      title: doc.name,
      options: SN.qualityOrder.map((q) => ({ value: q, label: `${t(`Quality.${q}`)} (${format(SN.implantQualities[q])})`, hint: doc.system.tiers[q].delta || doc.system.tiers[q].summary }))
    });
    if (!quality) return;
    d.implants.push({ identifier: entry.identifier, quality, clinic: false });
    await this.#save();
    return this.render();
  }

  static async #removeImplant(event, target) {
    this.draft.implants.splice(Number(target.dataset.index), 1);
    await this.#save();
    return this.render();
  }

  /* ---------- passo 7: equipamento ---------- */

  static async #addPackage() {
    const pkg = await this.#package();
    for (const p of pkg) this.#addToCart(p.type, p.identifier, p.qty);
    await this.#save();
    return this.render();
  }

  static async #addKit() {
    for (const [id, qty] of [['kit-de-runner', 1]]) this.#addToCart('gear', id, qty);
    await this.#save();
    return this.render();
  }

  #addToCart(type, identifier, qty = 1) {
    const existing = this.draft.cart.find((c) => c.type === type && c.identifier === identifier);
    if (existing && type === 'gear') existing.qty += qty;
    else this.draft.cart.push({ type, identifier, qty });
  }

  static async #addCart(event, target) {
    this.#addToCart(target.dataset.type, target.dataset.id, 1);
    await this.#save();
    return this.render();
  }

  static async #removeCart(event, target) {
    this.draft.cart.splice(Number(target.dataset.index), 1);
    await this.#save();
    return this.render();
  }

  static async #shopTab(event, target) {
    this.shopTab = target.dataset.tab;
    return this.render();
  }

  /* ---------- passo 8: talentos ---------- */

  static async #rollTalent() {
    const d = this.draft;
    const cls = d.class;
    if (!cls) return;
    const table = await getTable(`talentos-${cls}`);
    if (!table) return notify('warn', 'Warn.TableMissing', { name: `talentos-${cls}` });
    const total = await rollTotal('2d6');
    const result = table.getResultsForRoll(total)[0];
    let doc = result?.documentUuid ? await fromUuid(result.documentUuid) : null;
    if (!doc) return;
    let entry = { id: doc.system.identifier, roll: total, choice: {} };
    if (entry.id === 'escolha-livre') {
      const options = [];
      for (const r of table.results.contents.filter((x) => x.documentUuid && x.range[0] !== 12)) {
        const dd = await fromUuid(r.documentUuid);
        if (dd) options.push({ value: dd.system.identifier, label: dd.name, img: dd.img });
      }
      options.push({ value: 'points', label: t('Talent.PointsOption'), hint: t('Talent.PointsHint') });
      const picked = await chooseDialog({ title: t('Talent.FreeChoice'), options });
      if (!picked) return;
      if (picked === 'points') {
        const first = await selectPrompt({ title: t('Talent.Points'), label: t('Talent.FirstPoint'), options: SN.abilities.map((k) => ({ value: k, label: t(`Abilities.${k}`) })) });
        const second = await selectPrompt({ title: t('Talent.Points'), label: t('Talent.SecondPoint'), options: SN.abilities.map((k) => ({ value: k, label: t(`Abilities.${k}`) })), selected: first });
        if (!first || !second) return;
        entry = { id: 'ajuste-de-atributo', roll: total, choice: {}, points: [first, second] };
      } else {
        entry.id = picked;
        doc = await CompendiumIndex.get('feature', picked);
      }
    }
    // escolhas do talento (família, atributo, programa já escolhido)
    for (const c of doc.system.choices ?? []) {
      let options = [];
      if (c.kind === 'ability') options = c.options.map((o) => ({ value: o, label: t(`Abilities.${o}`) }));
      else if (c.kind === 'weaponFamily') options = c.options.map((o) => ({ value: o, label: t(`Family.${o}`) }));
      else if (c.kind === 'knownProgram') {
        const picks = Object.values(d.classPicks).flat().filter((x) => typeof x === 'string' && CompendiumIndex.resolve('program', x));
        options = picks.map((id) => ({ value: id, label: CompendiumIndex.resolve('program', id).name }));
      } else options = c.options.map((o) => ({ value: o, label: t(`Choice.Value.${o}`) }));
      if (!options.length) continue;
      const value = await selectPrompt({ title: doc.name, label: t(`Choice.Label.${c.key}`), options });
      if (value) entry.choice[c.key] = value;
    }
    d.talents.push(entry);
    await this.#save();
    return this.render();
  }

  static async #pickDrive(event, target) {
    this.draft.drive = t(`Wizard.Drive.${target.dataset.id}`);
    await this.#save();
    return this.render();
  }

  /* ---------- conclusão ---------- */

  static async #finish() {
    const d = this.draft;
    const actor = this.actor;
    if (!(d.origin && d.class && d.alignment && d.trigger && (d.background.uuid || d.background.custom))) return notify('warn', 'Wizard.Incomplete');
    if (d.credits !== null && d.credits - this.#spent() < 0 && !(await confirm(t('Wizard.OverspentTitle'), t('Wizard.OverspentText')))) return;
    const pending = [];
    const originEntry = CompendiumIndex.resolve('origin', d.origin);
    const classEntry = CompendiumIndex.resolve('class', d.class);
    const alignEntry = CompendiumIndex.resolve('alignment', d.alignment);
    if (!originEntry || !classEntry || !alignEntry) return notify('error', 'Wizard.MissingPacks');

    // 1. atributos e nome
    const abilityPatch = Object.fromEntries(SN.abilities.map((k, i) => [`system.abilities.${k}.base`, d.abilities[i]]));
    await actor.update({ name: d.name || actor.name, 'system.level': 1, 'system.details.civilName': d.civilName, ...abilityPatch });
    const picks = {
      factoryImplants: d.originPicks.factoryImplants,
      mutations: d.originPicks.mutations,
      programs: d.classPicks.programs,
      protocols: d.classPicks.protocols,
      sets: d.classPicks.sets
    };
    try {
      // 2. origem, classe, antecedente, alinhamento (com as escolhas do rascunho)
      await applySelection(actor, 'origin', originEntry.uuid, { suppressPrompts: true, picks });
      await applySelection(actor, 'class', classEntry.uuid, { suppressPrompts: true, picks });
      if (d.classPicks.family) {
        const dom = actor.items.find((i) => i.type === 'feature' && i.system.identifier === 'dominio-de-arma');
        if (dom) await dom.update({ 'system.choice': { family: d.classPicks.family } });
      }
      if (d.background.custom) await setCustomBackground(actor, d.background.custom);
      else await applySelection(actor, 'background', d.background.uuid, { suppressPrompts: true });
      await applySelection(actor, 'alignment', alignEntry.uuid, { suppressPrompts: true });
      await selectEdgeTrigger(actor, d.trigger);
    } catch (err) {
      console.error(`${ID} | erro ao aplicar seleções`, err);
      pending.push(t('Wizard.PendingSelections'));
    }

    // 3. itens comprados e implantes
    try {
      let hands = 0;
      let armorOn = false;
      for (const c of d.cart) {
        const entry = CompendiumIndex.resolve(c.type, c.identifier);
        if (!entry) continue;
        const doc = await fromUuid(entry.uuid);
        const system = {};
        if (doc.type === 'gear') system.quantity = c.qty;
        if (doc.type === 'weapon' && hands + doc.system.hands <= 2) {
          system.equipped = true;
          hands += doc.system.hands;
        }
        if (doc.type === 'armor' && !armorOn) {
          system.equipped = true;
          armorOn = true;
        }
        const existing = doc.type === 'gear' ? actor.items.find((i) => i.type === 'gear' && i.system.identifier === c.identifier) : null;
        if (existing) await existing.update({ 'system.quantity': existing.system.quantity + c.qty });
        else await embedCopy(actor, doc, { flags: { fromWizard: true }, system });
      }
      for (const i of d.implants) {
        const entry = CompendiumIndex.resolve('implant', i.identifier);
        if (!entry) continue;
        await embedCopy(actor, await fromUuid(entry.uuid), { system: { installed: true, quality: i.quality } });
      }
    } catch (err) {
      console.error(`${ID} | erro ao criar itens`, err);
      pending.push(t('Wizard.PendingItems'));
    }

    // 4. talentos
    try {
      for (const tl of d.talents) {
        const entry = CompendiumIndex.resolve('feature', tl.id);
        if (!entry) continue;
        const doc = await fromUuid(entry.uuid);
        let system = { choice: tl.choice ?? {} };
        if (tl.points) {
          const tally = {};
          for (const k of tl.points) tally[k] = (tally[k] ?? 0) + 1;
          system.modifiers = Object.entries(tally).map(([k, v]) => ({ key: `abilities.${k}.value`, mode: 'add', value: String(v), when: '', label: t('Talent.Adjust') }));
        }
        await embedCopy(actor, doc, { flags: { talentRoll: tl.roll, talentLevel: 1 }, system });
      }
    } catch (err) {
      console.error(`${ID} | erro ao criar talentos`, err);
      pending.push(t('Wizard.PendingTalents'));
    }

    // 5. créditos, objetivo, idioma e contato
    const remaining = d.credits === null ? 0 : Math.max(0, d.credits - this.#spent());
    await actor.update({
      'system.currency.credits': remaining,
      'system.details.drive': d.drive,
      'system.details.languages': [t('Sheet.CityDialect'), d.language].filter(Boolean).join(', '),
      'system.details.contacts': d.background.contact ? `<p>${esc(d.background.contact)}</p>` : '',
      'system.details.appearance': d.appearance ? `<p>${esc(d.appearance)}</p>` : ''
    });
    await actor.update({ 'system.hp.value': actor.system.hp.max });

    // 6. drone do Rigger
    try {
      await ensureDrone(actor);
    } catch (err) {
      console.error(`${ID} | erro ao criar o drone`, err);
      pending.push(t('Wizard.PendingDrone'));
    }

    await actor.update({ 'system.creation.completed': true, 'system.creation.step': STEPS.length });
    await actor.unsetFlag(ID, 'wizardDraft');
    const lines = [`${t('Wizard.Summary.Abilities')}: ${d.abilities.join(', ')}`, `${t('Wizard.Summary.Credits')}: ${format(d.credits ?? 0)}`, ...d.talents.map((x) => `${t('Wizard.Summary.Talents')}: ${CompendiumIndex.resolve('feature', x.id)?.name ?? x.id} (${x.roll})`), ...pending];
    await postEvent(actor, t('Wizard.Created', { name: actor.name }), lines);
    this.close();
    actor.sheet.render(true);
  }
}

export { tierMax, DialogV2 };
