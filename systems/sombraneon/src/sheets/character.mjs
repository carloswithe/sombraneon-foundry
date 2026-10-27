import { SN } from '../config.mjs';
import { ID, t, tExists, tpl, notify, confirm, esc, uuidSync, formatCredits } from '../util.mjs';
import { signed } from '../logic/abilities.mjs';
import { CompendiumIndex } from '../compendium.mjs';
import { SNSheetMixin, partsTooltip } from './base.mjs';
import { applySelection, removeSelection, setCustomBackground, selectEdgeTrigger, triggersFor, askImplantChoices, runGrants } from '../grants.mjs';
import { dropItem, toggleEquipped, toggleInstalled } from '../drop.mjs';
import { checkRoll, attackRoll, damageRoll, safeSetting } from '../rolls.mjs';
import { rollDialog, attackDialog, selectPrompt, numberPrompt, format } from '../apps/dialogs.mjs';
import { executeProgram } from '../automation/casting.mjs';
import { useItem } from '../automation/registry.mjs';
import { restDialog, cyberpsychosisTest } from '../automation/rest.mjs';
import { rollTalent, levelUp, learnProgram } from '../automation/progression.mjs';
import { giveEdgeAway, claimTrigger } from '../automation/edge.mjs';
import { streetHack, immerse, leaveNetwork, toggleFirewallPause, firewallRemaining } from '../automation/network.mjs';
import { stabilize, dyingTurn } from '../automation/dying.mjs';
import { needsDrone, ensureDrone, rebuildDrone } from '../automation/drone.mjs';
import { Alert } from '../automation/alert.mjs';
import { evaluate } from '../rolls.mjs';

const { ActorSheetV2 } = foundry.applications.sheets;

const stripHtml = (html, max = 140) => {
  const text = String(html ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
};

/** Rótulo de uma escolha gravada (família, atributo ou programa) para exibir na ficha. */
const choiceLabel = (actor, value) => {
  for (const ns of ['Family', 'Abilities', 'Choice.Value']) if (tExists(`${ns}.${value}`)) return t(`${ns}.${value}`);
  return actor.items.find((i) => i.type === 'program' && i.system.identifier === value)?.name ?? String(value);
};

const itemOf = (sheet, target) => sheet.document.items.get(target.closest('[data-item-id]')?.dataset.itemId ?? target.dataset.itemId);

const formatDuration = (ms) => {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
};

/* ------------------------------------------------------------------ */
/* Ações (data-action)                                                  */
/* ------------------------------------------------------------------ */

async function rollAbility(event, target) {
  const key = target.dataset.ability;
  const spec = { actorUuid: this.document.uuid, ability: key, tags: [], label: t(`Abilities.${key}`) };
  if (event.ctrlKey || event.metaKey || event.altKey) {
    const bg = this.document.selection('background');
    const data = await rollDialog({ title: spec.label, ability: key, knowledge: bg?.system.knowledge ?? '' });
    if (!data) return;
    return checkRoll({ ...spec, ...data });
  }
  return checkRoll(spec);
}

async function openCheck() {
  const bg = this.document.selection('background');
  const data = await rollDialog({ title: t('Roll.Check'), knowledge: bg?.system.knowledge ?? '' });
  if (!data) return;
  return checkRoll({ actorUuid: this.document.uuid, label: t('Roll.Check'), ...data });
}

async function rollInitiative() {
  const actor = this.document;
  const combat = game.combat;
  const token = actor.getActiveTokens()[0];
  if (combat && token) {
    const combatant = combat.combatants.find((c) => c.actorId === actor.id);
    if (combatant) return combat.rollInitiative([combatant.id]);
  }
  return checkRoll({ actorUuid: actor.uuid, ability: 'des', tags: ['initiative'], label: t('Sheet.Initiative'), mode: actor.sn.initiative.advantage ? 'advantage' : 'normal', bonus: actor.sn.initiative.bonus - actor.sn.abilities.des.mod });
}

async function attack(event, target) {
  const id = target.dataset.attackId;
  const actor = this.document;
  const line = actor.sn.attacks.find((a) => a.id === id);
  if (!line) return;
  const spec = { actorUuid: actor.uuid, attackId: id };
  if (event.ctrlKey || event.metaKey || event.altKey || target.dataset.options === 'true') {
    const hasSneak = actor.sn.sneakDice > 0;
    const hasCharge = actor.sn.mods.some((m) => m.key === 'damage.charge');
    const weapons = actor.items.filter((i) => i.type === 'weapon' && i.system.equipped);
    const canTwin = weapons.length === 2 && weapons[0].system.identifier === weapons[1].system.identifier;
    const data = await attackDialog({ line, hasSneak, hasCharge, canTwin });
    if (!data) return;
    return attackRoll({ ...spec, mode: data.mode, options: data.options });
  }
  return attackRoll(spec);
}

async function rollDamageOnly(event, target) {
  const actor = this.document;
  const id = target.dataset.attackId;
  return damageRoll({ actorUuid: actor.uuid, attackId: id, options: {}, critical: false });
}

async function reload(event, target) {
  const weapon = this.document.items.get(target.dataset.itemId);
  const ammo = this.document.items.find((i) => i.type === 'gear' && i.system.category === 'ammo' && i.system.quantity > 0);
  if (!ammo) return notify('warn', 'Warn.NoMagazines');
  await ammo.update({ 'system.quantity': ammo.system.quantity - 1 });
  await weapon?.update({ 'system.magEmpty': false });
}

async function aim(event, target) {
  await this.document.setFlag(ID, 'aimed', true);
  notify('info', 'Info.Aimed');
}

async function equip(event, target) {
  const item = itemOf(this, target);
  if (item) return toggleEquipped(this.document, item);
}

async function install(event, target) {
  const item = itemOf(this, target);
  if (item) return toggleInstalled(this.document, item);
}

async function use(event, target) {
  const item = itemOf(this, target);
  if (item) return useItem(this.document, item);
}

async function showItem(event, target) {
  const item = itemOf(this, target);
  if (item) return item.toChat();
}

async function editItem(event, target) {
  const item = itemOf(this, target);
  if (item) return item.sheet.render(true);
}

async function deleteItem(event, target) {
  const item = itemOf(this, target);
  if (!item) return;
  const grantedBy = item.getFlag(ID, 'grantedBy');
  const text = grantedBy ? t('Item.DeleteGranted', { name: item.name }) : t('Item.DeleteText', { name: item.name });
  if (await confirm(t('Item.DeleteTitle'), text)) await item.delete();
}

async function qtyAdjust(event, target) {
  const item = itemOf(this, target);
  if (!item) return;
  const delta = Number(target.dataset.delta) * (event.shiftKey ? 5 : 1);
  const next = Math.max(0, item.system.quantity + delta);
  if (next === 0 && (await confirm(t('Item.DeleteTitle'), t('Item.DeleteText', { name: item.name })))) return item.delete();
  if (next > 0) await item.update({ 'system.quantity': next });
}

async function usesAdjust(event, target) {
  const item = itemOf(this, target);
  if (!item) return;
  const { path, uses } = item.usesInfo;
  if (!path) return;
  const next = Math.max(0, Math.min(uses.max, uses.value + Number(target.dataset.delta)));
  return item.update({ [`${path}.value`]: next });
}

async function hpAdjust(event, target) {
  const actor = this.document;
  const delta = Number(target.dataset.delta) * (event.shiftKey ? 5 : 1);
  if (delta < 0) return actor.applyDamage(-delta);
  return actor.applyHealing(delta);
}

/** Mantém só o primeiro implante instalado de cada slot e desinstala os que sobram. */
async function fixSlots() {
  const seen = new Set();
  const extras = [];
  for (const imp of this.document.items.filter((i) => i.type === 'implant' && i.system.installed)) {
    if (seen.has(imp.system.slot)) extras.push(imp);
    else seen.add(imp.system.slot);
  }
  for (const imp of extras) await imp.update({ 'system.installed': false });
  if (extras.length) ui.notifications.info(t('Warning.slotsFixed', { names: extras.map((i) => i.name).join(', ') }));
}

async function toggleVehicle(event, target) {
  const key = target.dataset.category;
  const list = new Set(this.document.system.vehicleTraining ?? []);
  if (list.has(key)) list.delete(key);
  else list.add(key);
  return this.document.update({ 'system.vehicleTraining': [...list] });
}

async function toggleCover() {
  return this.document.update({ 'system.ac.cover': !this.document.system.ac.cover });
}

async function removeSel(event, target) {
  return removeSelection(this.document, target.dataset.type);
}

async function rollBackground() {
  const roll = await evaluate('1d20');
  const entry = CompendiumIndex.list('background').find((e) => e.rollIndex === roll.total);
  if (!entry) return;
  ui.notifications.info(t('Selection.RolledBackground', { n: roll.total, name: entry.name }));
  return applySelection(this.document, 'background', entry.uuid);
}

async function rollTrigger() {
  const alignment = this.document.selection('alignment');
  if (!alignment) return notify('warn', 'Warn.NoAlignment');
  const roll = await evaluate('1d6');
  const pool = triggersFor(alignment.system.identifier);
  const entry = pool.find((e, i) => i + 1 === roll.total) ?? pool[0];
  if (entry) {
    ui.notifications.info(t('Selection.RolledTrigger', { n: roll.total, name: entry.name }));
    return selectEdgeTrigger(this.document, entry.identifier);
  }
}

async function openInfo(event, target) {
  const item = this.document.selection(target.dataset.type);
  if (item) return item.sheet.render(true);
}

async function openWizard() {
  const { CreationWizard } = await import('../apps/wizard.mjs');
  return new CreationWizard({ document: this.document }).render(true);
}

const actions = {
  rollAbility,
  openCheck,
  rollInitiative,
  attack,
  rollDamageOnly,
  reload,
  aim,
  equip,
  install,
  use,
  showItem,
  editItem,
  deleteItem,
  qtyAdjust,
  usesAdjust,
  hpAdjust,
  toggleCover,
  toggleVehicle,
  fixSlots,
  removeSel,
  rollBackground,
  rollTrigger,
  openInfo,
  openWizard,
  rest() {
    return restDialog(this.document);
  },
  levelUp() {
    return levelUp(this.document);
  },
  rollTalent() {
    return rollTalent(this.document);
  },
  learnProgram() {
    return learnProgram(this.document, { force: game.user.isGM });
  },
  async executeProgram(event, target) {
    const spec = { actorUuid: this.document.uuid, programId: target.dataset.itemId };
    return executeProgram(spec);
  },
  async restoreProgram(event, target) {
    return itemOf(this, target)?.update({ 'system.crashed': false });
  },
  giveEdge() {
    return giveEdgeAway(this.document);
  },
  claimTrigger() {
    return claimTrigger(this.document);
  },
  streetHack() {
    return streetHack(this.document);
  },
  immerse() {
    return immerse(this.document);
  },
  leaveNetwork() {
    return leaveNetwork(this.document);
  },
  pauseFirewall() {
    return toggleFirewallPause(this.document);
  },
  openAlert() {
    return import('../apps/alert-tracker.mjs').then((m) => m.AlertTracker.show());
  },
  cyberTest() {
    return cyberpsychosisTest(this.document);
  },
  dyingTurn() {
    return dyingTurn(this.document);
  },
  async stabilize() {
    const healer = game.user.character ?? canvas?.tokens?.controlled.find((tk) => tk.actor?.type === 'character' && tk.actor.id !== this.document.id)?.actor ?? this.document;
    return stabilize(this.document, healer);
  },
  async adjustCredits(event, target) {
    const sign = Number(target.dataset.sign);
    const input = this.element.querySelector('[data-credits-delta]');
    const amount = Math.abs(Number(input?.value) || 0);
    if (!amount) return;
    const next = Math.max(0, this.document.system.currency.credits + sign * amount);
    await this.document.update({ 'system.currency.credits': next });
    const list = [...(this.document.getFlag(ID, 'ledger') ?? []), { t: Date.now(), item: t('Sheet.ManualAdjust'), value: sign * amount }].slice(-50);
    await this.document.setFlag(ID, 'ledger', list);
  },
  async createDrone() {
    return ensureDrone(this.document);
  },
  async attackDrone(event, target) {
    const uuid = target.dataset.droneUuid;
    return attackRoll({ actorUuid: uuid, attackId: 'drone' });
  },
  async openDrone(event, target) {
    return (await fromUuid(target.dataset.droneUuid))?.sheet.render(true);
  },
  async rebuildDrone(event, target) {
    const drone = await fromUuid(target.dataset.droneUuid);
    return drone && rebuildDrone(drone);
  },
  async addStarterPackage() {
    return addStarterPackage(this.document);
  },
  async resumeGrants() {
    for (const type of ['origin', 'class']) {
      const s = this.document.selection(type);
      if (s) await runGrants(this.document, s);
    }
  }
};

/** Pacote inicial da classe (livro 8.6): adiciona os itens do catálogo sem cobrar. */
export async function addStarterPackage(actor) {
  const cls = actor.selection('class');
  if (!cls) return notify('warn', 'Warn.NoClass');
  if (!CompendiumIndex.hasCatalog) return notify('warn', 'Warn.CatalogMissing');
  const { embedCopy } = await import('../grants.mjs');
  let hands = actor.items.filter((i) => i.type === 'weapon' && i.system.equipped).reduce((n, i) => n + i.system.hands, 0);
  let armorOn = actor.items.some((i) => i.type === 'armor' && i.system.equipped);
  for (const { ref, qty } of cls.system.startingPackage) {
    const entry = ['weapon', 'armor', 'gear'].map((type) => CompendiumIndex.resolve(type, ref)).find(Boolean);
    if (!entry) continue;
    const doc = await fromUuid(entry.uuid);
    const existing = doc.type === 'gear' ? actor.items.find((i) => i.type === 'gear' && i.system.identifier === ref) : null;
    if (existing) {
      await existing.update({ 'system.quantity': existing.system.quantity + qty });
      continue;
    }
    const system = {};
    if (doc.type === 'gear') system.quantity = qty;
    if (doc.type === 'weapon' && hands + doc.system.hands <= 2) {
      system.equipped = true;
      hands += doc.system.hands;
    }
    if (doc.type === 'armor' && !armorOn) {
      system.equipped = true;
      armorOn = true;
    }
    await embedCopy(actor, doc, { flags: { fromPackage: true }, system });
  }
  ui.notifications.info(t('Sheet.PackageAdded'));
}

/* ------------------------------------------------------------------ */
/* Ficha                                                                */
/* ------------------------------------------------------------------ */

export class SNCharacterSheet extends SNSheetMixin(ActorSheetV2) {
  static DEFAULT_TAB = 'summary';
  static PLAY_MODE = true;

  static DEFAULT_OPTIONS = {
    classes: ['sombraneon', 'sheet', 'actor', 'character'],
    position: { width: 900, height: 820 },
    actions
  };

  static PARTS = { body: { template: tpl('actor/character.hbs'), scrollable: ['.sn-scroll'] } };

  get title() {
    return this.document.name;
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.document;
    const sys = actor.system;
    const sn = actor.sn;

    const selector = (type) => {
      const current = actor.selection(type);
      return {
        type,
        current,
        name: current?.name ?? '',
        img: current?.img,
        options: CompendiumIndex.list(type).map((e) => ({ value: e.uuid, label: e.name, selected: !!current && current.system.identifier === e.identifier }))
      };
    };
    const alignment = actor.selection('alignment');
    const trigger = actor.items.find((i) => i.type === 'feature' && i.system.kind === 'edge-trigger') ?? null;
    const selectors = {
      origin: selector('origin'),
      class: selector('class'),
      background: selector('background'),
      alignment: selector('alignment'),
      trigger: {
        current: trigger,
        disabled: !alignment,
        options: alignment ? triggersFor(alignment.system.identifier).map((e) => ({ value: e.identifier, label: e.name, selected: trigger?.system.identifier === e.identifier })) : []
      }
    };
    selectors.background.custom = !!actor.selection('background')?.getFlag(ID, 'custom');

    const abilities = SN.abilities.map((key) => {
      const a = sys.abilities[key];
      return { key, label: t(`Abilities.${key}`), base: a.base, value: a.value, mod: a.mod, modText: signed(a.mod), bonus: a.bonus, hasBonus: a.bonus !== 0, tooltip: partsTooltip([{ label: t('Sheet.Base'), value: a.base }, ...a.parts]) };
    });

    const pct = sys.hp.pct;
    const hp = { value: sys.hp.value, max: sys.hp.max, pct, color: pct <= 25 ? 'danger' : pct <= 50 ? 'warn' : 'ok', tooltip: `${sys.hp.hitDie || '-'}  CON ${signed(sn.abilities.con.mod)}` };

    const edge = { value: sys.edge.value, max: sys.edge.max, pips: Array.from({ length: sys.edge.max }, (_, i) => ({ on: i < sys.edge.value })), canClaim: !!trigger && sys.edge.value < sys.edge.max && !sys.edge.triggerUsed };

    const slots = { used: sys.slots.used, max: sys.slots.max, over: sys.slots.over, tooltip: partsTooltip(sys.slots.parts) };
    const xp = { value: sys.xp.value, next: sys.xp.next, ready: sys.xp.ready, canLevel: sys.level < SN.maxLevel, pct: sys.xp.next ? Math.min(100, Math.round((sys.xp.value / sys.xp.next) * 100)) : 100 };

    const warnings = sn.warnings
      .filter((w) => !(w.code === 'noProficiency' && safeSetting('proficiencyPenalty', 'warn') === 'none'))
      .map((w) => t(`Warning.${w.code}`, w.args.slot ? { ...w.args, slot: t(`Slot.${w.args.slot}`) } : w.args));
    for (const g of actor.items.filter((i) => i.getFlag(ID, 'grantsPending'))) warnings.push(t('Warning.grantsPending', { name: g.name }));

    // Habilidades
    const featureRow = (i) => ({
      id: i.id,
      name: i.name,
      img: i.img,
      kind: i.system.kind,
      description: stripHtml(i.system.description, 200),
      hasUses: i.hasUses,
      uses: i.system.uses,
      activation: t(`Activation.${i.system.activation}`),
      manual: !i.system.modifiers.length && !i.system.automation && !i.system.weapon && !i.system.roll,
      granted: !!i.getFlag(ID, 'grantedBy'),
      canUse: i.hasUses || !!i.system.automation,
      choice: Object.values(i.system.choice ?? {}).map((v) => choiceLabel(actor, v)).join(', ')
    });
    const feats = actor.items.filter((i) => i.type === 'feature');
    const classFeatures = feats.filter((i) => i.system.kind === 'class').map(featureRow);
    const originFeatures = feats.filter((i) => ['origin', 'mutation'].includes(i.system.kind)).map(featureRow);
    const trigRow = trigger ? featureRow(trigger) : null;
    const groups = new Map();
    for (const i of feats.filter((f) => f.system.kind === 'talent')) {
      const key = i.system.identifier;
      if (!groups.has(key)) groups.set(key, { ...featureRow(i), count: 0 });
      groups.get(key).count += 1;
    }
    const talents = [...groups.values()];

    // Ataques
    const attacks = sn.attacks.map((a) => ({
      ...a,
      label: a.source === 'unarmed' ? t('Attack.Unarmed') : a.source === 'thrown' ? t('Attack.Thrown', { name: a.name }) : a.name,
      image: a.img || `systems/${SN.id}/assets/icons/weapon-melee.svg`,
      bonusText: signed(a.attackBonus),
      rangeLabel: t(`Range.${a.range}`),
      props: [...a.properties.map((p) => t(`Prop.${p}`)), ...(a.ignoreArmor ? [t('Prop.ignoreArmor')] : []), ...(!a.proficient && safeSetting('proficiencyPenalty', 'warn') === 'warn' ? [t('Prop.noProficiency')] : [])],
      tooltip: partsTooltip(a.parts),
      damageTooltip: partsTooltip(a.damageParts),
      isEquippedWeapon: a.source === 'weapon',
      hasAim: a.properties.includes('aim')
    }));

    // Drone
    let drone = null;
    const droneUuid = actor.getFlag(ID, 'droneUuid');
    const droneDoc = droneUuid ? uuidSync(droneUuid) : null;
    if (droneDoc) {
      const s = droneDoc.system;
      drone = { uuid: droneDoc.uuid, name: droneDoc.name, hp: s.hp.value, hpMax: s.hp.max, ac: s.stats?.ac, attack: signed(s.stats?.attack ?? 0), damage: `${s.stats?.die}${s.stats?.damageBonus ? signed(s.stats.damageBonus) : ''}`, destroyed: s.destroyed };
    }

    // Conjuração
    const c = sn.casting;
    const programs = actor.items.filter((i) => i.type === 'program');
    const tiers = new Map();
    for (const p of programs.filter((x) => x.system.kind === c.kind || !c.kind)) {
      const tier = p.system.tier;
      if (!tiers.has(tier)) tiers.set(tier, { tier, label: tier ? t('Program.TierN', { n: tier }) : t('Program.Sets'), items: [] });
      const info = c.programBonus?.[p.system.identifier];
      tiers.get(tier).items.push({
        id: p.id,
        name: p.name,
        img: p.img,
        kind: p.system.kind,
        tier,
        description: stripHtml(p.system.effect || p.system.description, 160),
        range: p.system.range ? t(`Range.${p.system.range}`) : '',
        crashed: p.system.crashed,
        state: p.system.crashed ? (p.system.kind === 'set' ? 'spent' : 'crash') : 'ready',
        bonusText: info ? signed(info.total) : '',
        cd: p.system.kind === 'set' ? 12 : 10 + tier,
        damage: p.system.damage,
        healing: p.system.healing,
        hasUses: p.hasUses,
        uses: p.system.uses,
        granted: !!p.getFlag(ID, 'grantedBy'),
        tooltip: info ? partsTooltip(info.parts) : ''
      });
    }
    const casting = {
      kind: c.kind,
      label: c.kind ? t(`Program.Kind.${c.kind}`) : '',
      known: c.known,
      tierMax: c.tierMax,
      execBonus: signed(c.execBonus ?? 0),
      cdBase: c.cdBase,
      requirement: c.requirement && !c.requirement.met ? t(`Warn.Req.${{ noDeck: 'NoDeck', deckFried: 'DeckFried', noNanokit: 'NoNanokit', nanokitBroken: 'NoNanokit', noRig: 'NoRig' }[c.requirement.code] ?? 'NoDeck'}`) : '',
      groups: [...tiers.values()].sort((a, b) => a.tier - b.tier),
      tooltip: partsTooltip(c.parts ?? []),
      canLearn: !!c.kind
    };

    // Cromo
    const slotLabels = { neural: 'Neural', body: 'Body', arms: 'Arms', legs: 'Legs' };
    const chromeSlots = SN.implantSlots.map((key) => {
      const snap = sn.chrome.slots[key];
      const imp = snap ? actor.items.get(snap.id) : null;
      const nextQuality = imp ? SN.qualityOrder[SN.qualityOrder.indexOf(imp.system.quality) + 1] : null;
      return {
        key,
        label: t(`Slot.${key}`),
        item: imp ? {
          id: imp.id,
          name: imp.name,
          img: imp.img,
          quality: imp.system.quality,
          qualities: SN.qualityOrder.map((q) => ({ value: q, label: t(`Quality.${q}`), selected: q === imp.system.quality })),
          summary: imp.system.tiers[imp.system.quality].summary,
          next: nextQuality ? imp.system.tiers[nextQuality].delta : '',
          hasUses: imp.hasUses,
          uses: imp.usesInfo.uses,
          canUse: imp.hasUses || !!imp.tier?.automation,
          weapon: !!imp.system.tiers[imp.system.quality].weapon
        } : null
      };
    });
    const stored = actor.items.filter((i) => i.type === 'implant' && !i.system.installed).map((i) => ({ id: i.id, name: i.name, img: i.img, slot: t(`Slot.${i.system.slot}`), quality: t(`Quality.${i.system.quality}`) }));
    const ch = sn.chrome;
    const chrome = {
      slots: chromeSlots,
      stored,
      count: ch.count,
      adjust: ch.adjust,
      effective: ch.effective,
      cd: ch.cd,
      advantage: ch.advantage,
      text: ch.cd ? t('Chrome.Risk', { cd: ch.cd }) : t('Chrome.NoRisk'),
      catalog: CompendiumIndex.hasCatalog
    };

    // Posses
    const wRow = (i) => ({ id: i.id, name: i.name, img: i.img, damage: i.system.damage, hands: i.system.hands, slots: i.system.slots, price: format(i.system.price), equipped: i.system.equipped, magEmpty: i.system.magEmpty, family: t(`Family.${i.system.family}`), usesMagazines: i.system.usesMagazines, props: i.system.properties.map((p) => t(`Prop.${p}`)).join(', ') });
    const gearRows = actor.items.filter((i) => i.type === 'gear').map((i) => ({ id: i.id, name: i.name, img: i.img, category: i.system.category, categoryLabel: t(`Gear.${i.system.category}`), quantity: i.system.quantity, slots: Math.ceil(i.system.quantity / i.system.perSlot) * i.system.slots, price: format(i.system.price), hasUses: i.hasUses, uses: i.system.uses, vehicle: i.system.category === 'vehicle', bonus: i.system.bonus }));
    const cells = [];
    const classes = { weapon: 'w', armor: 'a', gear: 'g' };
    const stackCells = (cls, n) => {
      for (let k = 0; k < n; k++) cells.push(cls);
    };
    for (const i of actor.items.filter((x) => ['weapon', 'armor'].includes(x.type))) stackCells(classes[i.type], i.system.slots);
    for (const g of gearRows.filter((x) => !x.vehicle)) stackCells(g.category === 'ammo' || g.category === 'battery' ? 'c' : 'g', g.slots);
    while (cells.length < slots.max) cells.push('');
    const slotGrid = cells.map((cls, idx) => ({ n: idx + 1, cls, over: idx >= slots.max }));
    const inventory = {
      weapons: actor.items.filter((i) => i.type === 'weapon').map(wRow),
      armors: actor.items.filter((i) => i.type === 'armor').map((i) => ({ id: i.id, name: i.name, img: i.img, ac: i.system.ac, addDex: i.system.addDex, slots: i.system.slots, price: format(i.system.price), equipped: i.system.equipped, type: t(`Armor.Type.${i.system.type}`) })),
      gear: gearRows.filter((g) => !g.vehicle),
      vehicles: gearRows.filter((g) => g.vehicle),
      credits: sys.currency.credits,
      creditsText: formatCredits(sys.currency.credits),
      ledger: [...(actor.getFlag(ID, 'ledger') ?? [])].reverse().slice(0, 12).map((e) => ({ item: e.item, value: `${e.value > 0 ? '+' : ''}${format(e.value)}`, date: new Date(e.t).toLocaleDateString('pt-BR') })),
      hasPackage: !!actor.selection('class') && !actor.items.some((i) => i.getFlag(ID, 'fromPackage'))
    };

    // Rede
    const alert = Alert.get();
    const remaining = firewallRemaining(actor);
    const network = {
      alert,
      alertPips: Array.from({ length: SN.alert.max }, (_, i) => ({ on: i < alert.value })),
      immersed: sys.network.immersed,
      firewallActive: sys.network.firewall.active,
      firewallTime: remaining === null ? '' : formatDuration(remaining),
      paused: !!sys.network.firewall.pausedAt,
      deckFried: sys.network.deckFried,
      nanokitBroken: sys.network.nanokitBroken,
      traced: sys.network.traced,
      hackImmune: sn.flags.hackImmune && !sn.chrome.slots.neural,
      canImmerse: sn.casting.kind === 'program'
    };

    // Morrendo
    const dying = { active: sys.dying.active, remaining: sys.dying.remaining, stable: sys.dying.stable, rolled: sys.dying.rolled };

    // Bio
    const bio = {};
    for (const key of ['appearance', 'biography', 'contacts', 'notes', 'groupGoals']) bio[key] = { raw: sys.details[key], html: await this.enrich(sys.details[key]) };
    const reaction = alignment ? SN.factions.map((f) => ({ label: t(`Faction.${f}`), value: signed(alignment.system.reaction[f] ?? 0) })) : [];

    const veh = sn.vehicles ?? {};
    const vehicleChips = SN.vehicleCategories.map((key) => ({ key, label: t(`Vehicle.CategoryPlural.${key}`), trained: !!veh[key], fixed: !!veh.fromClass?.[key] }));
    const streetTitle = sn.streetTitle && tExists(`StreetTitle.${sn.streetTitle.classId}.${sn.streetTitle.band}`) ? t(`StreetTitle.${sn.streetTitle.classId}.${sn.streetTitle.band}`) : '';

    return {
      ...context,
      sn,
      hasSlotConflict: sn.warnings.some((w) => w.code === 'slotOccupied'),
      vehicleChips,
      streetTitle,
      selectors,
      abilities,
      hp,
      edge,
      slots,
      xp,
      warnings,
      classFeatures,
      originFeatures,
      trigger: trigRow,
      talents,
      attacks,
      attackSummary: attacks.slice(0, 3),
      drone,
      needsDrone: needsDrone(actor),
      casting,
      chrome,
      inventory,
      slotGrid,
      network,
      dying,
      bio,
      reaction,
      level: sys.level,
      initiativeText: signed(sys.initiative.bonus),
      acTooltip: partsTooltip(sys.ac.parts),
      acMelee: sys.ac.melee,
      wizard: !sys.creation.completed,
      knowledge: actor.selection('background')?.system.knowledge ?? '',
      statuses: [...actor.statuses].map((id) => ({ id, label: t(`Status.${id}`) })),
      talentsPending: sys.talents.pending,
      hasPendingGrants: actor.items.some((i) => i.getFlag(ID, 'grantsPending')),
      tabs: [
        { id: 'summary', label: t('Tabs.Summary') },
        { id: 'attacks', label: t('Tabs.Attacks') },
        { id: 'chrome', label: t('Tabs.Chrome') },
        { id: 'programs', label: t('Tabs.Programs') },
        { id: 'gear', label: t('Tabs.Gear') },
        { id: 'network', label: t('Tabs.Network') },
        { id: 'bio', label: t('Tabs.Bio') }
      ].map((tab) => ({ ...tab, active: tab.id === this.tab }))
    };
  }

  async _onChangeAction(action, event, input) {
    const actor = this.document;
    switch (action) {
      case 'selectOrigin':
      case 'selectClass':
      case 'selectAlignment': {
        const type = action.slice(6).toLowerCase();
        const uuid = input.value;
        if (!uuid) return;
        const result = await applySelection(actor, type, uuid);
        if (!result) this.render();
        return;
      }
      case 'selectBackground':
        if (input.value) {
          const result = await applySelection(actor, 'background', input.value);
          if (!result) this.render();
        }
        return;
      case 'customBackground':
        return setCustomBackground(actor, input.value);
      case 'selectTrigger':
        return input.value && selectEdgeTrigger(actor, input.value);
      case 'implantQuality': {
        const item = actor.items.get(input.dataset.itemId);
        if (!item) return;
        await item.update({ 'system.quality': input.value });
        await askImplantChoices(actor, item);
        return;
      }
    }
  }

  async _dropItem(item) {
    const created = await dropItem(this.document, item);
    return created;
  }
}

export { esc, numberPrompt, selectPrompt };
