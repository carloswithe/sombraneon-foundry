import { installGlobals, registerPartials, Collection } from './env.mjs';

/** Respostas programadas para DialogV2 (wait, prompt e confirm). Cada resposta é o valor final. */
export const dialogs = { queue: [], seen: [] };

let memo = null;

/** Carrega o sistema inteiro contra o Foundry simulado (uma vez por arquivo de teste). */
export async function setup() {
  if (memo) return memo;
  installGlobals();
  registerPartials();
  const answer = async (cfg) => {
    dialogs.seen.push(cfg);
    const a = dialogs.queue.shift();
    return typeof a === 'function' ? a(cfg) : a ?? null;
  };
  Object.assign(foundry.applications.api.DialogV2, {
    wait: answer,
    prompt: answer,
    confirm: async (cfg) => {
      dialogs.seen.push(cfg);
      return dialogs.queue.length ? dialogs.queue.shift() : true;
    }
  });

  const M = {};
  M.actorData = await import('../../systems/sombraneon/src/data/actor-data.mjs');
  M.itemData = await import('../../systems/sombraneon/src/data/item-data.mjs');
  M.SNActor = (await import('../../systems/sombraneon/src/documents/actor.mjs')).SNActor;
  M.SNItem = (await import('../../systems/sombraneon/src/documents/item.mjs')).SNItem;
  M.helpers = await import('../../systems/sombraneon/src/helpers.mjs');
  M.helpers.registerHelpers();
  M.compendium = await import('../../systems/sombraneon/src/compendium.mjs');
  M.sheets = await import('../../systems/sombraneon/src/sheets/character.mjs');
  M.itemSheet = await import('../../systems/sombraneon/src/sheets/item.mjs');
  M.other = await import('../../systems/sombraneon/src/sheets/other.mjs');
  M.wizard = await import('../../systems/sombraneon/src/apps/wizard.mjs');
  M.alertApp = await import('../../systems/sombraneon/src/apps/alert-tracker.mjs');
  M.rolls = await import('../../systems/sombraneon/src/rolls.mjs');
  M.casting = await import('../../systems/sombraneon/src/automation/casting.mjs');
  M.rest = await import('../../systems/sombraneon/src/automation/rest.mjs');
  M.dying = await import('../../systems/sombraneon/src/automation/dying.mjs');
  M.progression = await import('../../systems/sombraneon/src/automation/progression.mjs');
  M.registry = await import('../../systems/sombraneon/src/automation/registry.mjs');
  M.network = await import('../../systems/sombraneon/src/automation/network.mjs');
  M.alert = await import('../../systems/sombraneon/src/automation/alert.mjs');
  M.chat = await import('../../systems/sombraneon/src/chat.mjs');
  M.grants = await import('../../systems/sombraneon/src/grants.mjs');
  M.drop = await import('../../systems/sombraneon/src/drop.mjs');
  M.api = await import('../../systems/sombraneon/src/api.mjs');
  M.index = await import('../../systems/sombraneon/src/index.mjs');
  const content = await import('../../data/content/index.mjs');
  content.pregenActors = (await import('../../data/content/module-actors.mjs')).pregenActors;
  M.SNActor.ItemClass = M.SNItem;
  globalThis.__models = { actor: M.actorData.ACTOR_MODELS, item: M.itemData.ITEM_MODELS };

  // compêndios simulados a partir do conteúdo real
  const scope = { system: 'sombraneon', module: 'sombraneon-compendium' };
  for (const pack of content.PACKS) {
    const id = `${scope[pack.scope]}.${pack.name}`;
    if (pack.docType === 'Item') {
      const docs = pack.docs.map((d) => {
        const item = new M.SNItem({ ...d, _id: d.identifier }, null);
        item.uuid = `Compendium.${id}.Item.${d.identifier}`;
        globalThis.__registry.set(item.uuid, item);
        return { _id: d.identifier, name: d.name, img: d.img, uuid: item.uuid, sort: d.sort, system: d.system, flags: d.flags };
      });
      game.packs.set(id, { getIndex: async () => docs });
    }
  }
  const refToUuid = (ref) => {
    const [type, ...rest] = ref.split(':');
    const identifier = rest.join(':');
    for (const pack of content.PACKS.filter((p) => p.docType === 'Item')) {
      if (pack.docs.some((d) => d.type === type && d.identifier === identifier)) return `Compendium.${scope[pack.scope]}.${pack.name}.Item.${identifier}`;
    }
    return null;
  };
  const tablePack = content.PACKS.find((p) => p.name === 'tabelas');
  const tables = tablePack.docs.map((d) => {
    const results = d.results.map((r) => ({ range: r.range, documentUuid: r.ref ? refToUuid(r.ref) : undefined, name: r.name ?? '', description: r.text ? `<p>${r.text}</p>` : '' }));
    const coll = Object.assign([...results], { contents: results });
    return { _id: d.identifier, formula: d.formula, identifier: d.identifier, results: coll, getResultsForRoll: (total) => results.filter((r) => total >= r.range[0] && total <= r.range[1]) };
  });
  game.packs.set('sombraneon.tabelas', {
    getIndex: async () => tables.map((t) => ({ _id: t._id, name: t.identifier, flags: { sombraneon: { identifier: t.identifier } } })),
    getDocument: async (id) => tables.find((t) => t._id === id)
  });
  await M.compendium.CompendiumIndex.load();

  const actors = {};
  for (const def of content.pregenActors) {
    const actor = new M.SNActor({ ...def, _id: def.identifier, items: def.items.map((i, n) => ({ ...i, _id: `${def.identifier}-${n}` })) });
    actor.loadItems(M.SNItem);
    actors[def.name] = actor;
    globalThis.__registry.set(actor.uuid, actor);
  }
  /** Personagem em branco, pronto para receber seleções. */
  const blank = (name = 'Teste') => {
    const actor = new M.SNActor({ _id: `blank${Math.random().toString(36).slice(2, 6)}`, name, type: 'character', img: 'x.svg', system: {}, items: [] });
    actor.loadItems(M.SNItem);
    globalThis.__registry.set(actor.uuid, actor);
    return actor;
  };
  memo = { M, content, actors, blank, Collection };
  return memo;
}
