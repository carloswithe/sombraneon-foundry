import { SN } from './config.mjs';
import { ID, t, loadTpls, notify, esc } from './util.mjs';
import { ACTOR_MODELS } from './data/actor-data.mjs';
import { ITEM_MODELS } from './data/item-data.mjs';
import { SNActor } from './documents/actor.mjs';
import { SNItem } from './documents/item.mjs';
import { SNCombatant, registerCombatHooks } from './documents/combatant.mjs';
import { SNCharacterSheet } from './sheets/character.mjs';
import { SNItemSheet } from './sheets/item.mjs';
import { SNNpcSheet, SNIceSheet, SNDroneSheet } from './sheets/other.mjs';
import { registerSettings } from './settings.mjs';
import { CompendiumIndex } from './compendium.mjs';
import { SNSocket } from './automation/socket.mjs';
import { registerDyingHooks } from './automation/dying.mjs';
import { startFirewallWatcher } from './automation/network.mjs';
import { needsDrone, ensureDrone } from './automation/drone.mjs';
import { registerChatHooks } from './chat.mjs';
import { registerHelpers } from './helpers.mjs';
import { api } from './api.mjs';
import { AlertTracker } from './apps/alert-tracker.mjs';

const T = `systems/${ID}/templates`;
const TEMPLATES = [
  'actor/character.hbs',
  'actor/npc.hbs',
  'actor/ice.hbs',
  'actor/drone.hbs',
  'item/item.hbs',
  'apps/wizard.hbs',
  'apps/alert-tracker.hbs',
  'chat/check.hbs',
  'chat/attack.hbs',
  'chat/damage.hbs',
  'chat/cast.hbs',
  'chat/event.hbs',
  'chat/info.hbs',
  'chat/alert.hbs',
  'partials/modifiers.hbs',
  'partials/feature-row.hbs'
].map((p) => `${T}/${p}`);

Hooks.once('init', () => {
  console.log(`${ID} | Iniciando o sistema SombraNeon`);
  CONFIG.SOMBRANEON = SN;

  CONFIG.Actor.documentClass = SNActor;
  CONFIG.Item.documentClass = SNItem;
  CONFIG.Combatant.documentClass = SNCombatant;
  CONFIG.Actor.dataModels = ACTOR_MODELS;
  CONFIG.Item.dataModels = ITEM_MODELS;
  CONFIG.Combat.initiative = { formula: '1d20 + @initiative.bonus', decimals: 2 };

  CONFIG.Actor.trackableAttributes = {
    character: { bar: ['hp'], value: ['edge.value', 'ac.value', 'level', 'currency.credits'] },
    npc: { bar: ['hp'], value: ['ac', 'level'] },
    ice: { bar: ['hp'], value: ['ac', 'level'] },
    drone: { bar: ['hp'], value: [] }
  };

  CONFIG.statusEffects = SN.statuses.map((id) => ({ id, name: `SOMBRANEON.Status.${id}`, img: `systems/${ID}/assets/icons/status-${id}.svg` }));
  CONFIG.specialStatusEffects.DEFEATED = 'dead';

  registerSettings(() => AlertTracker.refresh());
  registerHelpers();

  const { DocumentSheetConfig } = foundry.applications.apps;
  DocumentSheetConfig.registerSheet(Actor, ID, SNCharacterSheet, { types: ['character'], makeDefault: true, label: 'SOMBRANEON.Sheets.Character' });
  DocumentSheetConfig.registerSheet(Actor, ID, SNNpcSheet, { types: ['npc'], makeDefault: true, label: 'SOMBRANEON.Sheets.Npc' });
  DocumentSheetConfig.registerSheet(Actor, ID, SNIceSheet, { types: ['ice'], makeDefault: true, label: 'SOMBRANEON.Sheets.Ice' });
  DocumentSheetConfig.registerSheet(Actor, ID, SNDroneSheet, { types: ['drone'], makeDefault: true, label: 'SOMBRANEON.Sheets.Drone' });
  DocumentSheetConfig.registerSheet(Item, ID, SNItemSheet, { types: Object.keys(ITEM_MODELS), makeDefault: true, label: 'SOMBRANEON.Sheets.Item' });

  game.sombraneon = { api: { ...api, openAlert: () => AlertTracker.show() }, config: SN, CompendiumIndex };
  loadTpls(TEMPLATES);
});

Hooks.once('ready', async () => {
  await CompendiumIndex.load();
  SNSocket.init();
  registerDyingHooks();
  registerChatHooks();
  registerCombatHooks();
  startFirewallWatcher();
  if (!CompendiumIndex.hasCatalog && game.user.isGM) console.info(`${ID} | módulo ${SN.moduleId} não encontrado: ficha em modo sem catálogo`);
});

/** Personagem novo: abre o assistente de criação (só para quem criou). */
Hooks.on('createActor', async (actor, options, userId) => {
  if (userId !== game.user.id || actor.type !== 'character') return;
  if (actor.system.creation.completed || actor.items.size > 0) return;
  if (!game.settings.get(ID, 'openWizardOnCreate')) return;
  const { CreationWizard } = await import('./apps/wizard.mjs');
  new CreationWizard({ document: actor }).render(true);
});

/** Ficha pronta de Rigger importada: cria o drone se ainda não existir. */
Hooks.on('createActor', async (actor, options, userId) => {
  if (userId !== game.user.id || actor.type !== 'character') return;
  if (needsDrone(actor)) await ensureDrone(actor);
});

/** Arrastar linhas da ficha para a hotbar cria macros (ataque, execução, uso). */
Hooks.on('hotbarDrop', (bar, data, slot) => {
  if (data?.type !== 'SombraNeon') return;
  const commands = {
    attack: `game.sombraneon.api.attack('${data.actorUuid}', '${data.attackId}');`,
    execute: `game.sombraneon.api.execute('${data.actorUuid}', '${data.programId}');`,
    use: `game.sombraneon.api.useItem('${data.actorUuid}', '${data.itemId}');`
  };
  const command = commands[data.kind];
  if (!command) return;
  Macro.create({ name: data.name, type: 'script', img: data.img ?? `systems/${ID}/assets/icons/macro.svg`, command, flags: { [ID]: { generated: true } } }).then((macro) => game.user.assignHotbarMacro(macro, slot));
  return false;
});

/** Aviso de moral quando metade do grupo de NPCs cai (opcional). */
Hooks.on('updateActor', async (actor, changes) => {
  if (!game.user.isGM || game.users.activeGM?.id !== game.user.id) return;
  if (actor.type !== 'npc' || !foundry.utils.hasProperty(changes, 'system.hp.value')) return;
  if (!game.settings.get(ID, 'moraleHint') || !actor.system.morale.enabled) return;
  const hp = actor.system.hp;
  if (hp.max > 0 && hp.value > 0 && hp.value <= hp.max / 2 && !actor.getFlag(ID, 'moraleWarned')) {
    await actor.setFlag(ID, 'moraleWarned', true);
    ChatMessage.create({ whisper: ChatMessage.getWhisperRecipients('GM').map((u) => u.id), content: `<p class="sombraneon">${esc(t('Morale.Hint', { name: actor.name }))}</p>` });
  }
});

export { notify };
