import { SN } from '../config.mjs';
import { deriveCharacter } from '../logic/character.mjs';
import { droneStats, hitDieFaces } from '../logic/rules.mjs';
import { sum, multiplier } from '../logic/modifiers.mjs';
import { snapshotItem, uuidSync, ID } from '../util.mjs';

export class SNActor extends Actor {
  /** Derivados completos do personagem (lógica pura). */
  get sn() {
    return this._sn ?? null;
  }

  /** Item selecionado de um tipo de seleção única (classe, origem, antecedente, alinhamento). */
  selection(type) {
    return this.items.find((i) => i.type === type) ?? null;
  }

  itemsOfType(type) {
    return this.items.filter((i) => i.type === type);
  }

  findItem(type, identifier) {
    return this.items.find((i) => i.type === type && i.system.identifier === identifier) ?? null;
  }

  /** Calcula os derivados do personagem sem efeitos colaterais. */
  computeCharacter() {
    const sys = this.system;
    let unarmedDie = SN.unarmedDie;
    try {
      unarmedDie = game.settings.get(ID, 'unarmedDie') || SN.unarmedDie;
    } catch {
      /* configurações ainda não registradas */
    }
    return deriveCharacter({
      level: sys.level,
      abilityBase: Object.fromEntries(SN.abilities.map((k) => [k, sys.abilities[k].base])),
      hpRolls: [...(sys.hp.rolls ?? [])],
      hpBonus: sys.hp.bonus,
      cover: sys.ac.cover,
      acOverride: sys.ac.override,
      immersed: sys.network.immersed,
      slotsManualBonus: sys.slots.manualBonus,
      network: { deckFried: sys.network.deckFried, nanokitBroken: sys.network.nanokitBroken },
      unarmedDie,
      vehicleTraining: sys.vehicleTraining,
      items: this.items.map(snapshotItem)
    });
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    if (this.type === 'character') this._prepareCharacter();
    else if (this.type === 'drone') this._prepareDrone();
    else if (this.type === 'npc') this._prepareNpc();
  }

  _prepareCharacter() {
    const sys = this.system;
    const d = this.computeCharacter();
    this._sn = d;
    for (const k of SN.abilities) Object.assign(sys.abilities[k], { value: d.abilities[k].value, mod: d.abilities[k].mod, bonus: d.abilities[k].bonus, parts: d.abilities[k].parts });
    sys.hp.max = d.hp.max;
    sys.hp.hitDie = d.hp.hitDie;
    sys.hp.pct = d.hp.max > 0 ? Math.max(0, Math.min(100, Math.round((sys.hp.value / d.hp.max) * 100))) : 0;
    sys.ac.value = d.ac.value;
    sys.ac.base = d.ac.base;
    sys.ac.parts = d.ac.parts;
    sys.ac.melee = d.ac.melee;
    sys.initiative = d.initiative;
    sys.slots.max = d.slots.max;
    sys.slots.used = d.slots.used;
    sys.slots.over = d.slots.over;
    sys.slots.parts = d.slots.parts;
    sys.xp.next = d.xp.next;
    sys.xp.ready = d.xp.next !== null && sys.xp.value >= d.xp.next;
    sys.edge.max = d.edge.max;
    sys.talents = d.talents;
    sys.casting = d.casting;
    sys.chrome = d.chrome;
    sys.vehicles = d.vehicles;
    sys.streetTitle = d.streetTitle;
    sys.attacks = d.attacks;
    sys.warnings = d.warnings;
  }

  _prepareNpc() {
    const sys = this.system;
    sys.attackLines = sys.attacks.map((a, i) => ({ ...a, id: `npc-${i}` }));
    for (const w of this.items.filter((i) => i.type === 'weapon')) {
      sys.attackLines.push({
        id: `weapon-${w.id}`,
        name: w.name,
        bonus: sys.level + w.system.attackBonus,
        damage: w.system.damage,
        range: w.system.range,
        notes: ''
      });
    }
  }

  _prepareDrone() {
    const sys = this.system;
    const owner = uuidSync(sys.ownerUuid);
    const d = owner?.type === 'character' ? owner._sn ?? owner.computeCharacter() : null;
    const mods = d?.mods ?? [];
    const rd = d?.rollData ?? { level: owner?.system?.level ?? 1 };
    const moduleAc = this.items
      .filter((i) => i.type === 'gear' && i.system.category === 'drone-module')
      .reduce((n, i) => n + (i.system.module?.ac ?? 0), 0);
    const stats = droneStats({
      ownerLevel: owner?.system?.level ?? 1,
      desMod: d?.abilities.des.mod ?? 0,
      acBonus: sum(mods, 'drone.ac', {}, rd).total + moduleAc,
      hpBonus: sum(mods, 'drone.hp', {}, rd).total,
      attackBonus: sum(mods, 'drone.attack', {}, rd).total,
      damageBonus: sum(mods, 'drone.damage', {}, rd).total,
      auxiliary: sys.kind === 'auxiliary'
    });
    sys.hp.max = stats.hpMax;
    sys.stats = stats;
    sys.ownerName = owner?.name ?? '';
  }

  /** CA para comparar com ataques. */
  get targetAc() {
    switch (this.type) {
      case 'character':
        return this.system.ac.value;
      case 'drone':
        return this.system.stats?.ac ?? 12;
      default:
        return Number(this.system.ac) || 10;
    }
  }

  /** Multiplicador de dano por tipo (resist.*). */
  damageMultiplier(type) {
    if (!type || !this._sn) return 1;
    return multiplier(this._sn.mods, `resist.${type}`, {}, this._sn.rollData);
  }

  /**
   * Aplica dano. Reduções (resist.*) arredondam o dano final para cima.
   * @returns {Promise<number>} dano efetivamente aplicado
   */
  async applyDamage(amount, { type = '', nonlethal = false, heavy = false } = {}) {
    let dmg = Math.max(0, Math.floor(Number(amount) || 0));
    // Blindagem (BL): reduz cada dano de armas comuns; armas Pesadas e explosões ignoram (compêndio de veículos, 1.2)
    const bl = this.type === 'npc' ? Number(this.system.armor) || 0 : 0;
    if (bl && !heavy) dmg = Math.max(0, dmg - bl);
    dmg = Math.ceil(dmg * this.damageMultiplier(type));
    const reduce = Number(this.getFlag(ID, 'damageReduce') ?? 0);
    if (reduce) dmg = Math.max(0, dmg - reduce);
    if (dmg <= 0) return 0;
    const hp = this.system.hp;
    const next = Math.max(0, hp.value - dmg);
    await this.update({ 'system.hp.value': next }, { sombraneon: { nonlethal, damageType: type } });
    Hooks.callAll('sombraneon.damageApplied', this, dmg, { type, nonlethal, heavy });
    return dmg;
  }

  /** `protocol`: cura de protocolo de Hyperdoc; um Android recebe só metade (arredondada para cima). */
  async applyHealing(amount, { protocol = false } = {}) {
    let heal = Math.max(0, Math.floor(Number(amount) || 0));
    if (protocol && this._sn?.flags.healHalf) heal = Math.ceil(heal / 2);
    if (!heal) return 0;
    const { value, max } = this.system.hp;
    const next = Math.min(max || value + heal, value + heal);
    await this.update({ 'system.hp.value': next });
    return next - value;
  }

  /** Dado de vida da classe como número de faces. */
  get hitDieFaces() {
    return hitDieFaces(this._sn?.hp?.hitDie);
  }

  /** Estados do token (statusEffects). */
  async setStatus(id, active = true) {
    const has = this.statuses.has(id);
    if (has === active) return;
    await this.toggleStatusEffect(id, { active });
  }

  /** Fichas de Edge, respeitando o máximo. */
  async giveEdge(n = 1) {
    if (this.type !== 'character') return 0;
    const max = this.system.edge.max;
    const value = Math.min(max, this.system.edge.value + n);
    const gained = value - this.system.edge.value;
    if (gained !== 0) await this.update({ 'system.edge.value': value });
    return gained;
  }
}
