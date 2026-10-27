import { SN } from './config.mjs';
import { ID, t, notify, confirm } from './util.mjs';
import { CompendiumIndex } from './compendium.mjs';
import { applySelection, SELECTION_TYPES, embedCopy, askChoices, askImplantChoices } from './grants.mjs';
import { purchaseDialog, qualityDialog, format } from './apps/dialogs.mjs';
import { safeSetting } from './rolls.mjs';
import { validateLearn } from './logic/rules.mjs';
import { implantPrice } from './logic/rules.mjs';
import { installDroneModule } from './automation/drone.mjs';

/** Registra a operação no extrato (últimas 50, docs/spec/03 seção 6.10). */
async function ledger(actor, item, value) {
  const list = [...(actor.getFlag(ID, 'ledger') ?? []), { t: Date.now(), item, value }].slice(-50);
  await actor.setFlag(ID, 'ledger', list);
}

/**
 * Compra ao soltar (livro 8; modo `purchaseMode`: free, buy ou ask).
 * Itens vindos de outra ficha são transferência e nunca cobram.
 * @returns {Promise<{ok:boolean, paid:number}>}
 */
export async function purchase(actor, item, price, { transfer = false, label } = {}) {
  if (transfer || price <= 0) return { ok: true, paid: 0 };
  let mode = safeSetting('purchaseMode', 'ask');
  const balance = actor.system.currency.credits;
  if (mode === 'ask') {
    mode = await purchaseDialog({ name: label ?? item.name, price, balance });
    if (!mode) return { ok: false, paid: 0 };
  }
  if (mode === 'buy') {
    if (balance < price) {
      notify('warn', 'Warn.NoCreditsFor', { price: format(price), balance: format(balance) });
      return { ok: false, paid: 0 };
    }
    await actor.update({ 'system.currency.credits': balance - price });
    await ledger(actor, label ?? item.name, -price);
    return { ok: true, paid: price };
  }
  return { ok: true, paid: 0 };
}

const handsUsed = (actor) => actor.items.filter((i) => i.type === 'weapon' && i.system.equipped).reduce((n, i) => n + i.system.hands, 0);

async function dropWeapon(actor, item, ctx) {
  const buy = await purchase(actor, item, item.system.price, ctx);
  if (!buy.ok) return null;
  const free = 2 - handsUsed(actor) >= item.system.hands;
  const created = await embedCopy(actor, item, { system: { equipped: free, magEmpty: false } });
  if (!free) notify('warn', 'Warn.NoFreeHands');
  const ammo = actor.items.some((i) => i.type === 'gear' && i.system.category === 'ammo');
  if (created.system.usesMagazines && !ammo) notify('info', 'Info.NoMagazines');
  return created;
}

async function dropArmor(actor, item, ctx) {
  const buy = await purchase(actor, item, item.system.price, ctx);
  if (!buy.ok) return null;
  const current = actor.items.find((i) => i.type === 'armor' && i.system.equipped);
  let equip = true;
  if (current) {
    equip = await confirm(t('Armor.SwapTitle'), t('Armor.SwapText', { from: current.name, to: item.name }));
    if (equip) await current.update({ 'system.equipped': false });
  }
  return embedCopy(actor, item, { system: { equipped: equip } });
}

/** Desmembra o Kit de Runner nos itens que ele contém. */
async function unbundle(actor, item) {
  const bundle = item.getFlag(ID, 'bundle') ?? CompendiumIndex.resolve('gear', item.system.identifier)?.bundle ?? [];
  for (const [id, qty] of bundle) {
    const entry = CompendiumIndex.resolve('gear', id);
    if (!entry) continue;
    await addGear(actor, await fromUuid(entry.uuid), qty);
  }
}

async function addGear(actor, item, qty = 1) {
  const sys = item.system;
  const stackable = !['vehicle'].includes(sys.category);
  const existing = stackable ? actor.items.find((i) => i.type === 'gear' && i.system.identifier === sys.identifier && i.system.category === sys.category) : null;
  if (existing) {
    await existing.update({ 'system.quantity': existing.system.quantity + qty });
    return existing;
  }
  return embedCopy(actor, item, { system: { quantity: qty } });
}

async function dropGear(actor, item, ctx) {
  const sys = item.system;
  const qty = ctx.transfer ? sys.quantity : 1;
  const bundle = item.getFlag?.(ID, 'bundle') ?? CompendiumIndex.resolve('gear', sys.identifier)?.bundle;
  const buy = await purchase(actor, item, sys.price * qty, ctx);
  if (!buy.ok) return null;
  if (bundle && !ctx.transfer) {
    const split = await confirm(t('Bundle.Title'), t('Bundle.Text', { name: item.name }));
    if (split) {
      await unbundle(actor, item);
      return null;
    }
  }
  const created = await addGear(actor, item, qty);
  if (sys.category === 'drone-module') {
    const droneUuid = actor.getFlag(ID, 'droneUuid');
    const drone = droneUuid ? await fromUuid(droneUuid) : null;
    if (drone && (await confirm(t('Drone.InstallTitle'), t('Drone.InstallText', { name: item.name })))) await installDroneModule(drone, item);
  }
  return created;
}

async function dropImplant(actor, item, ctx) {
  let quality = item.system.quality;
  let clinic = false;
  const freeFactory = ctx.free === true;
  if (!ctx.transfer) {
    const picked = await qualityDialog({ implant: item, onlyStreet: freeFactory, balance: actor.system.currency.credits, mode: safeSetting('purchaseMode', 'ask') });
    if (!picked) return null;
    quality = picked.quality;
    clinic = picked.clinic;
  }
  const price = implantPrice({ quality, clinic, free: freeFactory });
  const buy = await purchase(actor, item, price, { ...ctx, label: `${item.name} (${t(`Quality.${quality}`)})` });
  if (!buy.ok) return null;
  const before = actor.sn?.chrome?.cd ?? null;
  const occupied = actor.items.find((i) => i.type === 'implant' && i.system.installed && i.system.slot === item.system.slot);
  let install = true;
  if (occupied) {
    install = await confirm(t('Implant.ReplaceTitle'), t('Implant.ReplaceText', { name: occupied.name }));
    if (install) await occupied.update({ 'system.installed': false });
  }
  const created = await embedCopy(actor, item, { system: { quality, installed: install, choice: {} } });
  await askImplantChoices(actor, created);
  const after = actor.sn?.chrome?.cd ?? null;
  if (after && after !== before) notify('warn', 'Warn.CyberRisk', { cd: after });
  return created;
}

async function dropProgram(actor, item) {
  const sn = actor.sn;
  const casting = sn.casting;
  const identifier = item.system.identifier;
  const check = validateLearn({
    classKind: casting.kind,
    item: { kind: item.system.kind, tier: item.system.tier },
    level: actor.system.level,
    knownCount: casting.known?.count ?? 0,
    knownMax: casting.known?.max ?? 0,
    alreadyKnown: actor.items.some((i) => i.type === 'program' && i.system.identifier === identifier)
  });
  if (!check.ok) {
    if (check.reason === 'known') return notify('warn', 'Warn.AlreadyKnown', { name: item.name });
    const message = t(`Warn.Learn.${check.reason}`, { name: item.name, tier: sn.casting.tierMax, max: casting.known?.max ?? 0 });
    if (!game.user.isGM) return ui.notifications.warn(message);
    if (!(await confirm(t('Program.ForceTitle'), `${message} ${t('Program.ForceText')}`))) return null;
  }
  return embedCopy(actor, item);
}

async function dropFeature(actor, item) {
  const created = await embedCopy(actor, item, { flags: item.system.kind === 'talent' ? { talentRoll: 0, talentLevel: actor.system.level } : {} });
  if (created.system.choices?.length) await askChoices(actor, created);
  const req = item.system.requires;
  if (req?.level && actor.system.level < req.level) notify('warn', 'Warn.RequiresLevel', { level: req.level });
  return created;
}

/**
 * Roteador de soltura de itens numa ficha (docs/spec/03, seção 6.1).
 * @param {SNActor} actor
 * @param {Item} item  item de compêndio, de mundo ou de outro ator
 * @param {object} [options]  { free: true } para itens iniciais gratuitos
 */
export async function dropItem(actor, item, options = {}) {
  if (!actor.isOwner) return null;
  const transfer = item.parent instanceof Actor && item.parent.uuid !== actor.uuid;
  const ctx = { transfer, free: !!options.free };

  if (actor.type !== 'character') {
    if (['drone'].includes(actor.type) && item.type === 'gear' && item.system.category === 'drone-module') return installDroneModule(actor, item);
    return embedCopy(actor, item);
  }
  if (SELECTION_TYPES.includes(item.type)) return applySelection(actor, item.type, item);
  switch (item.type) {
    case 'weapon':
      return dropWeapon(actor, item, ctx);
    case 'armor':
      return dropArmor(actor, item, ctx);
    case 'gear':
      return dropGear(actor, item, ctx);
    case 'implant':
      return dropImplant(actor, item, ctx);
    case 'program':
      return dropProgram(actor, item);
    case 'feature':
      return dropFeature(actor, item);
    default:
      return embedCopy(actor, item);
  }
}

/** Equipar ou desequipar (docs/spec/03, seção 6.11): uma armadura, no máximo duas mãos. */
export async function toggleEquipped(actor, item) {
  const equipped = !item.system.equipped;
  if (equipped && item.type === 'armor') {
    for (const other of actor.items.filter((i) => i.type === 'armor' && i.system.equipped && i.id !== item.id)) await other.update({ 'system.equipped': false });
  }
  if (equipped && item.type === 'weapon' && handsUsed(actor) + item.system.hands > 2) return notify('warn', 'Warn.NoFreeHands');
  await item.update({ 'system.equipped': equipped });
}

/** Instalar ou remover um implante (remover o deixa no inventário, 0 slots). */
export async function toggleInstalled(actor, item) {
  if (!item.system.installed) {
    const occupied = actor.items.find((i) => i.type === 'implant' && i.system.installed && i.system.slot === item.system.slot);
    if (occupied && !(await confirm(t('Implant.ReplaceTitle'), t('Implant.ReplaceText', { name: occupied.name })))) return;
    if (occupied) await occupied.update({ 'system.installed': false });
  }
  await item.update({ 'system.installed': !item.system.installed });
}

export { SN };
