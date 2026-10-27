import { SN } from './config.mjs';
import { ID, t, notify, confirm, esc } from './util.mjs';
import { CompendiumIndex, getTable } from './compendium.mjs';
import { chooseDialog, selectPrompt } from './apps/dialogs.mjs';
import { tierMax } from './logic/rules.mjs';
import { safeSetting, evaluate } from './rolls.mjs';

export const SELECTION_TYPES = ['class', 'origin', 'background', 'alignment'];

const sflag = (item, key) => item.getFlag(ID, key);

/** Resolve um UUID, Item ou entrada de índice para um Item. */
export async function resolveItem(source) {
  if (!source) return null;
  if (typeof source === 'string') return fromUuid(source);
  if (source instanceof Item) return source;
  if (source.uuid) return fromUuid(source.uuid);
  return null;
}

/** Cria uma cópia embutida de um item de compêndio com as marcas do sistema. */
export async function embedCopy(actor, item, { flags = {}, system = {} } = {}) {
  const data = item.toObject();
  delete data._id;
  delete data.folder;
  delete data.ownership;
  data.sort = (actor.items.size + 1) * 100;
  data.flags = foundry.utils.mergeObject(data.flags ?? {}, { [ID]: { sourceUuid: item.uuid, ...flags } });
  if (Object.keys(system).length) data.system = foundry.utils.mergeObject(data.system, system);
  const [created] = await actor.createEmbeddedDocuments('Item', [data]);
  return created;
}

/* ------------------------------------------------------------------ */
/* Escolhas dentro de um item (família de arma, atributo, programa)    */
/* ------------------------------------------------------------------ */

export async function askChoices(actor, item) {
  const choices = item.system.choices ?? [];
  if (!choices.length) return true;
  const result = {};
  for (const c of choices) {
    let options = [];
    if (c.kind === 'weaponFamily') options = c.options.map((o) => ({ value: o, label: t(`Family.${o}`) }));
    else if (c.kind === 'ability') options = c.options.map((o) => ({ value: o, label: t(`Abilities.${o}`) }));
    else if (c.kind === 'knownProgram') {
      const kind = c.options[0];
      options = actor.items.filter((i) => i.type === 'program' && i.system.kind === kind).map((i) => ({ value: i.system.identifier, label: i.name }));
    } else options = c.options.map((o) => ({ value: o, label: t(`Choice.${o}`) }));
    if (!options.length) {
      notify('warn', 'Warn.NoChoiceOptions', { name: item.name });
      return false;
    }
    const value = await selectPrompt({ title: item.name, label: t(`Choice.Label.${c.key}`), options });
    if (value === null) return false;
    result[c.key] = value;
  }
  await item.update({ 'system.choice': { ...item.system.choice, ...result } });
  return true;
}

/* ------------------------------------------------------------------ */
/* Motor de concessões                                                  */
/* ------------------------------------------------------------------ */

function matchesFilter(entry, filter = {}) {
  return Object.entries(filter).every(([k, v]) => {
    if (k === 'quality') return true; // implantes: a qualidade é aplicada ao instalar
    const value = entry[k];
    return Array.isArray(v) ? v.includes(value) : value === v;
  });
}

export function pendingGrants(source) {
  const applied = new Set(source.getFlag(ID, 'grantsApplied') ?? []);
  return (source.system.grants ?? []).map((g, i) => ({ ...g, grantId: `${g.kind}-${g.ref || g.key}-${i}`, index: i })).filter((g) => !applied.has(g.grantId));
}

/**
 * Aplica as concessões de uma classe, origem, antecedente ou alinhamento. Idempotente:
 * cada concessão concluída é registrada em `flags.sombraneon.grantsApplied`.
 * @param {object} [opts]
 * @param {boolean} [opts.suppressPrompts]  usa `picks` em vez de perguntar
 * @param {Record<string, string[]>} [opts.picks]  escolhas por `grant.key`
 */
export async function runGrants(actor, source, { suppressPrompts = false, picks = {} } = {}) {
  const level = actor.system.level;
  const done = new Set(source.getFlag(ID, 'grantsApplied') ?? []);
  const grantedBy = source.id;
  const pending = [];

  for (const g of pendingGrants(source)) {
    if (g.level > level) continue;
    try {
      let ok = true;
      if (g.kind === 'item') ok = await grantItem(actor, g, grantedBy, { suppressPrompts });
      else if (g.kind === 'choose') ok = await grantChoose(actor, source, g, grantedBy, { suppressPrompts, picks });
      else if (g.kind === 'roll') ok = await grantRoll(actor, g, grantedBy, picks);
      if (ok) done.add(g.grantId);
      else pending.push(g.grantId);
    } catch (err) {
      console.error(`${ID} | concessão ${g.grantId} falhou`, err);
      pending.push(g.grantId);
    }
  }
  await source.setFlag(ID, 'grantsApplied', [...done]);
  if (pending.length) await source.setFlag(ID, 'grantsPending', pending);
  else if (source.getFlag(ID, 'grantsPending')) await source.unsetFlag(ID, 'grantsPending');
  return pending;
}

async function grantItem(actor, g, grantedBy, { suppressPrompts }) {
  const entry = CompendiumIndex.resolveRef(g.ref);
  if (!entry) {
    notify('warn', 'Warn.GrantMissing', { ref: g.ref });
    return false;
  }
  const exists = actor.items.find((i) => i.system.identifier === entry.identifier && i.type === entry.type && sflag(i, 'grantedBy') === grantedBy);
  if (exists) return true;
  const item = await fromUuid(entry.uuid);
  const created = await embedCopy(actor, item, { flags: { grantedBy, grantId: g.grantId } });
  if (created.system.choices?.length && !suppressPrompts) await askChoices(actor, created);
  return true;
}

async function grantChoose(actor, source, g, grantedBy, { suppressPrompts, picks }) {
  const type = g.from.type;
  if ((type === 'implant') && !CompendiumIndex.hasCatalog) {
    notify('warn', 'Warn.CatalogMissing');
    return false;
  }
  const taken = new Set(actor.items.filter((i) => sflag(i, 'grantedBy') === grantedBy && i.type === type).map((i) => i.system.identifier));
  let entries = CompendiumIndex.list(type).filter((e) => matchesFilter(e, g.from.filter));
  if (type === 'program') {
    const cls = actor.selection('class');
    const max = tierMax(actor.system.level);
    entries = entries.filter((e) => e.kind === 'set' || e.tier <= max);
    if (cls) entries = entries.filter((e) => e.kind === cls.system.casting.kind);
  }
  entries = entries.filter((e) => !taken.has(e.identifier) && !actor.items.some((i) => i.type === type && i.system.identifier === e.identifier));
  const chosen = [];
  const preset = picks[g.key] ?? [];
  if (suppressPrompts && preset.length) {
    for (const id of preset) {
      const e = CompendiumIndex.resolve(type, id);
      if (e) chosen.push(e);
    }
  } else {
    const usedSlots = new Set();
    for (let n = 0; n < g.count; n++) {
      const pool = entries.filter((e) => !chosen.includes(e) && (type !== 'implant' || !usedSlots.has(e.slot)));
      const options = pool.map((e) => ({ value: e.uuid, label: e.name, img: e.img, hint: type === 'implant' ? t(`Slot.${e.slot}`) : e.tier ? t('Program.TierN', { n: e.tier }) : '' }));
      const uuid = await chooseDialog({ title: `${source.name}: ${t(`Grant.${g.key || type}`)} (${n + 1}/${g.count})`, options });
      if (!uuid) return false;
      const picked = pool.find((e) => e.uuid === uuid);
      chosen.push(picked);
      if (picked.slot) usedSlots.add(picked.slot);
    }
  }
  for (const e of chosen) {
    const item = await fromUuid(e.uuid);
    const system = type === 'implant' ? { installed: true, quality: 'street' } : {};
    const created = await embedCopy(actor, item, { flags: { grantedBy, grantId: g.grantId }, system });
    if (created.system.choices?.length && !suppressPrompts) await askChoices(actor, created);
    if (type === 'implant') await askImplantChoices(actor, created);
  }
  return chosen.length >= g.count;
}

/** Implantes com escolha (por exemplo, atributo do Potencializador mental) na qualidade atual. */
export async function askImplantChoices(actor, implant) {
  const tier = implant.system.tiers[implant.system.quality];
  const result = {};
  for (const c of tier?.choices ?? []) {
    const options = c.options.map((o) => ({ value: o, label: t(`Abilities.${o}`) }));
    const value = await selectPrompt({ title: implant.name, label: t(`Choice.Label.${c.key}`), options });
    if (value) result[c.key] = value;
  }
  if (Object.keys(result).length) await implant.update({ 'system.choice': { ...implant.system.choice, ...result } });
}

async function grantRoll(actor, g, grantedBy, picks = {}) {
  const table = await getTable(g.ref);
  if (!table) {
    notify('warn', 'Warn.TableMissing', { name: g.ref });
    return false;
  }
  const have = new Set(actor.items.filter((i) => i.type === 'feature').map((i) => i.system.identifier));
  const rolled = [];
  for (const id of picks[g.key] ?? []) {
    const entry = CompendiumIndex.resolve('feature', id);
    const item = entry ? await fromUuid(entry.uuid) : null;
    if (item && !have.has(item.system.identifier)) {
      have.add(item.system.identifier);
      rolled.push({ item, total: 0 });
    }
  }
  let guard = 0;
  while (rolled.length < g.count && guard++ < 200) {
    const roll = await evaluate(table.formula);
    const result = table.getResultsForRoll(roll.total)[0];
    if (!result?.documentUuid) continue;
    const item = await fromUuid(result.documentUuid);
    if (!item || have.has(item.system.identifier)) continue;
    have.add(item.system.identifier);
    rolled.push({ item, total: roll.total });
  }
  for (const { item } of rolled) {
    const created = await embedCopy(actor, item, { flags: { grantedBy, grantId: g.grantId } });
    if (created.system.choices?.length) await askChoices(actor, created);
  }
  if (rolled.length) {
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: `<div class="sombraneon sn-card"><header class="sn-card-head"><h3>${esc(t('Grant.RollTitle', { name: actor.name }))}</h3></header><ul>${rolled
        .map((r) => `<li><strong>${esc(r.item.name)}</strong>${r.total ? ` (${r.total})` : ''}</li>`)
        .join('')}</ul></div>`
    });
  }
  return rolled.length >= g.count;
}

/* ------------------------------------------------------------------ */
/* Seleção de classe, origem, antecedente e alinhamento                 */
/* ------------------------------------------------------------------ */

async function rollFirstHp(actor, cls) {
  const faces = Number(/d(\d+)/.exec(cls.system.hitDie)?.[1] ?? 6);
  const mode = safeSetting('hpLevel1Mode', 'roll');
  let value = faces;
  if (mode === 'roll') value = (await evaluate(`1d${faces}`)).total;
  await actor.update({ 'system.hp.rolls': [value] });
  await actor.update({ 'system.hp.value': actor.system.hp.max });
}

/** Remove a seleção e tudo que ela concedeu (itens com `grantedBy`). */
export async function removeSelection(actor, type, { ask = true } = {}) {
  const current = actor.selection(type);
  if (!current) return true;
  if (ask && !(await confirm(t('Selection.RemoveTitle'), t('Selection.RemoveText', { name: current.name })))) return false;
  const ids = actor.items.filter((i) => sflag(i, 'grantedBy') === current.id).map((i) => i.id);
  await actor.deleteEmbeddedDocuments('Item', [...ids, current.id]);
  return true;
}

/**
 * Escolher classe, origem, antecedente ou alinhamento: cria o item e roda as concessões.
 * Trocar pede confirmação e remove só o que o item antigo concedeu.
 */
export async function applySelection(actor, type, source, opts = {}) {
  if (!SELECTION_TYPES.includes(type)) return null;
  const item = await resolveItem(source);
  if (!item || item.type !== type) {
    notify('error', 'Warn.SelectionInvalid');
    return null;
  }
  const existing = actor.selection(type);
  if (existing) {
    if (existing.system.identifier === item.system.identifier) return existing;
    const ok = !opts.suppressPrompts
      ? await confirm(t('Selection.SwapTitle'), t('Selection.SwapText', { from: existing.name, to: item.name }))
      : true;
    if (!ok) return null;
    await removeSelection(actor, type, { ask: false });
  }
  const created = await embedCopy(actor, item);
  await runGrants(actor, created, opts);
  if (type === 'class' && actor.system.hp.rolls.length === 0) await rollFirstHp(actor, created);
  if (type === 'alignment') {
    const stale = actor.items.filter((i) => i.type === 'feature' && i.system.kind === 'edge-trigger');
    if (stale.length) await actor.deleteEmbeddedDocuments('Item', stale.map((i) => i.id));
  }
  if (safeSetting('announceSelections', false)) {
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content: `<p>${esc(t('Selection.Announce', { name: actor.name, item: created.name }))}</p>` });
  }
  return created;
}

/** Antecedente em texto livre (sem concessões). */
export async function setCustomBackground(actor, text) {
  const name = String(text ?? '').trim();
  if (!name) return null;
  const existing = actor.selection('background');
  if (existing) await actor.deleteEmbeddedDocuments('Item', [existing.id]);
  const [created] = await actor.createEmbeddedDocuments('Item', [
    {
      name,
      type: 'background',
      img: `systems/${SN.id}/assets/icons/background.svg`,
      system: { identifier: 'custom', knowledge: '', contactPrompt: t('Wizard.ContactPrompt'), rollIndex: 0 },
      flags: { [ID]: { custom: true } }
    }
  ]);
  return created;
}

/** Gatilho de Edge: um item `feature` (edge-trigger) concedido pelo alinhamento. */
export async function selectEdgeTrigger(actor, identifier) {
  const alignment = actor.selection('alignment');
  if (!alignment) {
    notify('warn', 'Warn.NoAlignment');
    return null;
  }
  const entry = CompendiumIndex.resolve('feature', identifier);
  if (!entry) return null;
  const stale = actor.items.filter((i) => i.type === 'feature' && i.system.kind === 'edge-trigger');
  if (stale.length) await actor.deleteEmbeddedDocuments('Item', stale.map((i) => i.id));
  const item = await fromUuid(entry.uuid);
  return embedCopy(actor, item, { flags: { grantedBy: alignment.id } });
}

/** Gatilhos de Edge disponíveis para um alinhamento (identifier: controle, sobrevivencia, liberdade). */
export function triggersFor(alignmentIdentifier) {
  return CompendiumIndex.list('feature').filter((e) => e.kind === 'edge-trigger' && e.alignment === alignmentIdentifier);
}

export { selectPrompt };
