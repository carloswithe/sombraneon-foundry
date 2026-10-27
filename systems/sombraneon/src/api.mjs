import { SN } from './config.mjs';
import { ID, t, esc, notify, DialogV2, uuidToDoc } from './util.mjs';
import { getTable } from './compendium.mjs';
import { evaluate, checkRoll, attackRoll, naturalOf } from './rolls.mjs';
import { rollDialog, selectPrompt, opts } from './apps/dialogs.mjs';
import { executeProgram, postEvent } from './automation/casting.mjs';
import { restActor } from './automation/rest.mjs';
import { grantEdge } from './automation/edge.mjs';
import { Alert } from './automation/alert.mjs';
import { useItem } from './automation/registry.mjs';
import { reactionResult } from './logic/rules.mjs';

/** Atores dos tokens selecionados; sem seleção, o personagem do usuário. */
export function selectedActors({ type } = {}) {
  let actors = canvas?.tokens?.controlled.map((tk) => tk.actor).filter(Boolean) ?? [];
  if (!actors.length && game.user.character) actors = [game.user.character];
  return type ? actors.filter((a) => a.type === type) : actors;
}

const gmOnly = () => {
  if (!game.user.isGM) {
    notify('warn', 'Warn.GMOnly');
    return false;
  }
  return true;
};

const stripTags = (html) => String(html ?? '').replace(/<[^>]+>/g, '').trim();

async function drawTable(identifier) {
  const table = await getTable(identifier);
  if (!table) return notify('warn', 'Warn.TableMissing', { name: identifier });
  return table.draw();
}

/** API pública (`game.sombraneon.api`), usada pelas macros do módulo (docs/spec/05, seção 10). */
export const api = {
  async restGroup() {
    if (!gmOnly()) return;
    const actors = selectedActors({ type: 'character' });
    if (!actors.length) return notify('warn', 'Warn.NoSelection');
    const quality = await selectPrompt({
      title: t('Rest.GroupTitle'),
      label: t('Rest.AreaQuality'),
      options: Object.keys(SN.restQuality).map((k) => ({ value: k, label: t(`Rest.Quality.${k}`) }))
    });
    if (!quality) return;
    for (const actor of actors) await restActor(actor, { quality, interruptions: 0, rollEncounters: false, ignoreRation: false });
    const rolls = SN.restQuality[quality];
    if (rolls) await drawTable('gerador-de-rede').catch(() => null);
  },

  async giveEdge() {
    if (!gmOnly()) return;
    const actors = selectedActors({ type: 'character' });
    if (!actors.length) return notify('warn', 'Warn.NoSelection');
    return grantEdge(actors, 1);
  },

  raiseAlert(n = 1) {
    return Alert.raise(n);
  },

  newRun() {
    if (!gmOnly()) return;
    return Alert.newRun();
  },

  /** Reação de facção: 2d6 + modificador do alinhamento (livro 6.2). */
  async reaction() {
    if (!gmOnly()) return;
    const factions = SN.factions.map((f) => ({ value: f, label: t(`Faction.${f}`) }));
    const aligns = Object.keys(SN.reaction).map((a) => ({ value: a, label: t(`Alignment.${a}`) }));
    const content = `<div class="sombraneon sn-dialog">
      <label>${esc(t('Reaction.Faction'))}<select name="faction">${opts(factions)}</select></label>
      <label>${esc(t('Reaction.Alignment'))}<select name="alignment">${opts(aligns)}</select></label>
    </div>`;
    const result = await DialogV2().prompt({
      window: { title: t('Reaction.Title') },
      content,
      rejectClose: false,
      ok: { label: t('Roll.Roll'), callback: (event, button) => ({ faction: button.form.elements.faction.value, alignment: button.form.elements.alignment.value }) }
    });
    if (!result || typeof result !== 'object') return;
    const mod = SN.reaction[result.alignment][result.faction];
    const roll = await evaluate(`2d6 + ${mod}`);
    const key = reactionResult(roll.total);
    return postEvent(null, t('Reaction.Title'), [
      `${t(`Faction.${result.faction}`)} / ${t(`Alignment.${result.alignment}`)}: 2d6 ${mod >= 0 ? '+' : ''}${mod} = ${roll.total}`,
      `${t(`Reaction.${key}.Name`)}: ${t(`Reaction.${key}.Text`)}`
    ], { rolls: [roll] });
  },

  /** Gerador de Rede: de 3 a 5 nós (livro 9.6). */
  async rollNetwork() {
    if (!gmOnly()) return;
    const table = await getTable('gerador-de-rede');
    if (!table) return notify('warn', 'Warn.TableMissing', { name: 'gerador-de-rede' });
    const count = 3 + Math.floor(Math.random() * 3);
    const lines = [];
    const rolls = [];
    for (let i = 0; i < count; i++) {
      const roll = await evaluate('1d6');
      rolls.push(roll);
      const r = table.getResultsForRoll(roll.total)[0];
      lines.push(`${i + 1}. ${r.name ? `${r.name}: ` : ''}${r.description?.replace(/<[^>]+>/g, '') ?? ''}`);
    }
    return postEvent(null, t('Network.GeneratorTitle', { n: count }), lines, { rolls });
  },

  /** Objetivos do grupo: 2 resultados diferentes do d6 (livro 2). */
  async rollGroupGoals() {
    if (!gmOnly()) return;
    const table = await getTable('objetivos-do-grupo');
    if (!table) return notify('warn', 'Warn.TableMissing', { name: 'objetivos-do-grupo' });
    const picked = new Set();
    const rolls = [];
    while (picked.size < 2) {
      const roll = await evaluate('1d6');
      rolls.push(roll);
      picked.add(roll.total);
    }
    const lines = [...picked].map((n) => table.getResultsForRoll(n)[0]?.description.replace(/<[^>]+>/g, '') ?? '');
    return postEvent(null, t('Goals.Title'), lines, { rolls });
  },

  /** Gerador de missão (livro 10.2): contratante, tipo, local e complicação. */
  async rollMission() {
    if (!gmOnly()) return;
    const specs = [
      ['missao-contratante', 'Mission.Contractor'],
      ['missao-tipo', 'Mission.Type'],
      ['missao-local', 'Mission.Location'],
      ['missao-complicacao', 'Mission.Complication']
    ];
    const lines = [];
    const rolls = [];
    for (const [id, label] of specs) {
      const table = await getTable(id);
      if (!table) return notify('warn', 'Warn.TableMissing', { name: id });
      const roll = await evaluate(table.formula);
      rolls.push(roll);
      const r = table.getResultsForRoll(roll.total)[0];
      lines.push(`${t(label)}: ${r.name ? `${r.name}. ` : ''}${stripTags(r.description)}`);
      // contratante anônimo: role a complicação duas vezes
      if (id === 'missao-contratante' && roll.total === 6) specs.push(['missao-complicacao', 'Mission.Complication']);
    }
    return postEvent(null, t('Mission.Title'), lines, { rolls });
  },

  /** Encontro aleatório por local (Compêndio de Ameaças, capítulo 8). */
  async rollEncounter() {
    if (!gmOnly()) return;
    const places = [
      ['torre-corporativa', 'Torre corporativa'],
      ['laboratorio-ou-clinica-subterranea', 'Laboratório ou clínica subterrânea'],
      ['armazem-no-porto-ou-zona-industrial', 'Armazém no porto ou zona industrial'],
      ['boate-de-elite-ou-cassino', 'Boate de elite ou cassino'],
      ['colmeia-favela-vertical', 'Colmeia (favela vertical)'],
      ['data-center', 'Data center'],
      ['estacao-de-transporte-ou-trem', 'Estação de transporte ou trem'],
      ['zona-abandonada', 'Zona abandonada']
    ];
    const place = await selectPrompt({ title: t('Encounter.Title'), label: t('Encounter.Location'), options: places.map(([value, label]) => ({ value, label })) });
    if (!place) return;
    const table = await getTable(`encontros-${place}`);
    if (!table) return notify('warn', 'Warn.TableMissing', { name: place });
    const roll = await evaluate(table.formula);
    const r = table.getResultsForRoll(roll.total)[0];
    return postEvent(null, `${t('Encounter.Title')}: ${places.find(([v]) => v === place)[1]}`, [stripTags(r.description)], { rolls: [roll] });
  },

  /** Teste rápido de grupo: cada personagem selecionado rola o atributo contra uma CD. */
  async groupCheck() {
    if (!gmOnly()) return;
    const actors = selectedActors({ type: 'character' });
    if (!actors.length) return notify('warn', 'Warn.NoSelection');
    const data = await rollDialog({ title: t('Roll.GroupCheck') });
    if (!data) return;
    for (const actor of actors) {
      await checkRoll({ actorUuid: actor.uuid, ability: data.ability, tags: data.tags, cd: data.cd, label: t('Roll.GroupCheck'), mode: data.mode, bonus: data.bonus });
    }
  },

  /** Teste de moral (livro 1.4): d20 + mod. contra a CD (padrão 15). */
  async moraleCheck() {
    if (!gmOnly()) return;
    const actors = selectedActors({ type: 'npc' });
    if (!actors.length) return notify('warn', 'Warn.NoSelection');
    for (const actor of actors) {
      const m = actor.system.morale;
      const roll = await evaluate(`1d20 + ${m.mod}`);
      const fled = roll.total < m.cd && naturalOf(roll) !== 20;
      await postEvent(actor, t('Morale.Title'), [t('Morale.Result', { name: actor.name, total: roll.total, cd: m.cd, result: fled ? t('Morale.Flees') : t('Morale.Holds') })], { rolls: [roll] });
    }
  },

  /** Iniciativa por grupo: NPCs com o mesmo nome base compartilham o resultado (livro 1.4). */
  async rollGroupInitiative() {
    if (!gmOnly()) return;
    const combat = game.combat;
    if (!combat) return notify('warn', 'Warn.NoCombat');
    const groups = new Map();
    for (const c of combat.combatants) {
      if (c.actor?.type === 'character' || c.initiative !== null) continue;
      const key = c.getFlag(ID, 'group') ?? c.name.replace(/\s*\d+$/, '');
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(c);
    }
    const updates = [];
    for (const members of groups.values()) {
      const roll = await members[0].getInitiativeRoll().evaluate();
      for (const m of members) updates.push({ _id: m.id, initiative: roll.total });
    }
    if (updates.length) await combat.updateEmbeddedDocuments('Combatant', updates);
  },

  async attack(actorUuid, attackId) {
    return attackRoll({ actorUuid, attackId });
  },

  async execute(actorUuid, programId) {
    return executeProgram({ actorUuid, programId });
  },

  async useItem(actorUuid, itemId) {
    const actor = await uuidToDoc(actorUuid);
    const item = actor?.items.get(itemId);
    return item && useItem(actor, item);
  }
};
