import { SN } from '../config.mjs';
import { ID, t, notify, confirm, esc, DialogV2 } from '../util.mjs';
import { CompendiumIndex, getTable } from '../compendium.mjs';
import { chooseDialog, selectPrompt } from '../apps/dialogs.mjs';
import { embedCopy, askChoices, runGrants } from '../grants.mjs';
import { evaluate, safeSetting } from '../rolls.mjs';
import { postEvent } from './casting.mjs';
import { tierMax, validateLearn, levelUpHpGain } from '../logic/rules.mjs';

/* ------------------------------------------------------------------ */
/* Talentos (docs/spec/03, seção 8)                                     */
/* ------------------------------------------------------------------ */

async function createTalent(actor, doc, { roll, level, choice } = {}) {
  const created = await embedCopy(actor, doc, {
    flags: { talentRoll: roll ?? 0, talentLevel: level ?? actor.system.level },
    system: choice ? { choice } : {}
  });
  if (!choice && created.system.choices?.length) await askChoices(actor, created);
  return created;
}

/** "+2 pontos de atributo, divididos como quiser" (resultado 12): cria o talento Ajuste de atributo. */
async function createAbilityAdjust(actor, level) {
  const base = await CompendiumIndex.get('feature', 'ajuste-de-atributo');
  if (!base) return null;
  const options = SN.abilities.map((k) => ({ value: k, label: t(`Abilities.${k}`) }));
  const first = await selectPrompt({ title: t('Talent.Points'), label: t('Talent.FirstPoint'), options });
  if (!first) return null;
  const second = await selectPrompt({ title: t('Talent.Points'), label: t('Talent.SecondPoint'), options, selected: first });
  if (!second) return null;
  const tally = {};
  for (const k of [first, second]) tally[k] = (tally[k] ?? 0) + 1;
  const modifiers = Object.entries(tally).map(([k, v]) => ({ key: `abilities.${k}.value`, mode: 'add', value: String(v), when: '', label: t('Talent.Adjust') }));
  const created = await embedCopy(actor, base, { flags: { talentRoll: 12, talentLevel: level }, system: { modifiers } });
  return created;
}

/**
 * Rola o talento: 2d6 na tabela da classe, cria o item e aplica as escolhas.
 * 7-9 pergunta o atributo; 12 oferece qualquer talento da tabela ou +2 pontos.
 */
export async function rollTalent(actor, { force = false } = {}) {
  const cls = actor.selection('class');
  if (!cls) return notify('warn', 'Warn.NoClass');
  if (actor.system.talents.pending <= 0 && !force) {
    if (!(await confirm(t('Talent.NoPendingTitle'), t('Talent.NoPendingText')))) return null;
  }
  const table = await getTable(cls.system.talentTable);
  if (!table) return notify('warn', 'Warn.TableMissing', { name: cls.system.talentTable });
  const roll = await evaluate('2d6');
  const total = roll.total;
  const result = table.getResultsForRoll(total)[0];
  let doc = result?.documentUuid ? await fromUuid(result.documentUuid) : null;
  if (!doc) return notify('warn', 'Warn.TalentMissing');
  const level = actor.system.level;
  let created = null;
  let summary = doc.name;

  if (doc.system.identifier === 'escolha-livre') {
    const results = [...table.results].filter((r) => r.documentUuid && !r.range.includes(12) && r.range[0] !== 12);
    const options = [];
    for (const r of results) {
      const d = await fromUuid(r.documentUuid);
      if (d) options.push({ value: d.uuid, label: d.name, img: d.img });
    }
    options.push({ value: 'points', label: t('Talent.PointsOption'), img: `systems/${SN.id}/assets/icons/feature-talent.svg`, hint: t('Talent.PointsHint') });
    const picked = await chooseDialog({ title: t('Talent.FreeChoice'), options });
    if (!picked) return null;
    if (picked === 'points') {
      created = await createAbilityAdjust(actor, level);
      summary = created?.name ?? t('Talent.Points');
    } else {
      doc = await fromUuid(picked);
      created = await createTalent(actor, doc, { roll: total, level });
      summary = doc.name;
    }
  } else {
    created = await createTalent(actor, doc, { roll: total, level });
  }
  if (!created) return null;
  const choice = created.system.choice ? Object.values(created.system.choice).join(', ') : '';
  const line = t('Talent.Rolled', { name: actor.name, total, cls: cls.name, talent: summary + (choice ? ` (${choice})` : '') });
  if (safeSetting('talentToChat', true)) await postEvent(actor, t('Talent.Title'), [line], { rolls: [roll] });
  return created;
}

/* ------------------------------------------------------------------ */
/* Programas, protocolos e Sets                                         */
/* ------------------------------------------------------------------ */

/** Abre o seletor de aprendizado respeitando tipo, tier máximo e limite de conhecidos. */
export async function learnProgram(actor, { force = false } = {}) {
  const sn = actor.sn;
  const casting = sn?.casting;
  if (!casting?.kind) return notify('warn', 'Warn.NoCasting');
  if (casting.known.count >= casting.known.max && !force) return notify('warn', 'Warn.KnownLimit', { max: casting.known.max });
  const max = tierMax(actor.system.level);
  const known = new Set(actor.items.filter((i) => i.type === 'program').map((i) => i.system.identifier));
  const entries = CompendiumIndex.list('program').filter((e) => e.kind === casting.kind && !known.has(e.identifier) && (casting.kind === 'set' || e.tier <= max));
  const options = entries.map((e) => ({ value: e.uuid, label: e.name, img: e.img, hint: e.tier ? t('Program.TierN', { n: e.tier }) : '' }));
  const uuid = await chooseDialog({ title: t('Program.Learn'), hint: t('Program.LearnHint', { known: casting.known.count, max: casting.known.max, tier: max }), options });
  if (!uuid) return null;
  const doc = await fromUuid(uuid);
  return embedCopy(actor, doc);
}

/* ------------------------------------------------------------------ */
/* Subir de nível (docs/spec/03, seção 8.4)                             */
/* ------------------------------------------------------------------ */

export async function levelUp(actor) {
  if (actor.type !== 'character') return null;
  const sys = actor.system;
  const cls = actor.selection('class');
  if (!cls) return notify('warn', 'Warn.NoClass');
  if (sys.level >= SN.maxLevel) return notify('warn', 'Warn.MaxLevel');
  if (!sys.xp.ready && !game.user.isGM) return notify('warn', 'Warn.XpMissing', { next: sys.xp.next });
  const newLevel = sys.level + 1;
  const ok = await confirm(t('LevelUp.Title'), t('LevelUp.Text', { name: actor.name, level: newLevel }));
  if (!ok) return null;

  const faces = actor.hitDieFaces || 6;
  const roll = await evaluate(`1d${faces}`);
  const conMod = actor.sn.abilities.con.mod;
  const gain = levelUpHpGain({ roll: roll.total, conMod });
  const carry = safeSetting('xpOnLevelUp', 'carry') === 'carry';
  const xp = carry ? Math.max(0, sys.xp.value - sys.level * 10) : 0;
  await actor.update({
    'system.level': newLevel,
    'system.xp.value': xp,
    'system.hp.rolls': [...sys.hp.rolls, roll.total],
    'system.hp.value': sys.hp.value + gain
  });

  const lines = [t('LevelUp.Hp', { gain, roll: roll.total, con: conMod })];
  for (const type of ['class', 'origin']) {
    const sel = actor.selection(type);
    if (sel) await runGrants(actor, sel);
  }
  const talentLevel = cls.system.talentLevels.includes(newLevel);
  if (talentLevel) lines.push(t('LevelUp.Talent'));
  const casting = actor.sn.casting;
  const learns = casting.kind === 'set' ? [4, 7, 10].includes(newLevel) : casting.kind === 'program' || casting.kind === 'protocol';
  if (learns) lines.push(t(`LevelUp.Learn.${casting.kind}`, { tier: tierMax(newLevel) }));
  await postEvent(actor, t('LevelUp.CardTitle', { level: newLevel }), lines, { rolls: [roll] });

  if (talentLevel) await rollTalent(actor, { force: true });
  if (learns) await learnProgram(actor, { force: false });
  return actor;
}

export { validateLearn, esc, DialogV2, ID };
