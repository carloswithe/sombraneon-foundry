/**
 * Módulo de catálogo do SombraNeon: os dados ficam nos compêndios (packs/).
 * Este arquivo avisa se o sistema ativo não for o SombraNeon e traz a API dos mapas de mesa da aventura
 * "Noite das Máscaras": ligar os tokens do mapa às fichas e alternar os estados de cena (Alerta 4, apagão...).
 */
const MODULE_ID = 'sombraneon-compendium';
const FOLDER_NAME = 'Noite das Máscaras';

Hooks.once('ready', () => {
  if (game.system.id !== 'sombraneon') {
    ui.notifications.warn(game.i18n.localize('SOMBRANEON_COMPENDIUM.WrongSystem'), { permanent: true });
  }
});

/* ------------------------------------------------------------------ */
/* Tokens dos mapas                                                    */
/* ------------------------------------------------------------------ */

const hasPlayerOwner = (actor) =>
  Object.entries(actor.ownership ?? {}).some(([userId, level]) => userId !== 'default' && level >= CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER && game.users.get(userId) && !game.users.get(userId).isGM);

async function adventureFolder() {
  const found = game.folders.find((f) => f.type === 'Actor' && f.name === FOLDER_NAME && !f.folder);
  return found ?? Folder.create({ name: FOLDER_NAME, type: 'Actor', color: '#c2185b' });
}

/** Ator do mundo que veio do UUID de um compêndio; importa na primeira vez. */
async function worldActorFor(uuid) {
  const known = game.actors.find((a) => a._stats?.compendiumSource === uuid || a.flags?.core?.sourceId === uuid);
  if (known) return known;
  const source = await fromUuid(uuid);
  if (!source) return null;
  const data = game.actors.fromCompendium(source, { clearFolder: true });
  data.folder = (await adventureFolder()).id;
  return Actor.create(data);
}

/**
 * Troca os marcadores do Scene por tokens ligados às fichas: elenco pelo UUID guardado no token,
 * runners pelos personagens com dono jogador (em ordem de nome). Marcadores sem ficha ficam como estão.
 */
async function linkSceneTokens(scene) {
  if (!game.user.isGM) return ui.notifications.warn('Só o Mestre pode montar os tokens da cena.');
  scene ??= canvas.scene;
  if (!scene) return;
  const pending = scene.tokens.filter((t) => !t.actorId && (t.flags?.sombraneon?.ref || t.flags?.sombraneon?.runner));
  const heroes = game.actors.filter((a) => a.type === 'character' && hasPlayerOwner(a)).sort((a, b) => a.name.localeCompare(b.name, 'pt'));
  const remove = [];
  const create = [];
  for (const t of pending) {
    const { ref, runner } = t.flags.sombraneon;
    const actor = ref ? await worldActorFor(ref) : (heroes[runner - 1] ?? null);
    if (!actor) continue;
    const overrides = { x: t.x, y: t.y, elevation: t.elevation, hidden: t.hidden, width: t.width, height: t.height, disposition: t.disposition };
    if (ref) overrides.name = t.name;
    const doc = await actor.getTokenDocument(overrides);
    create.push(doc.toObject());
    remove.push(t.id);
  }
  if (!create.length) return ui.notifications.info('Nenhum marcador novo para ligar a uma ficha.');
  await scene.deleteEmbeddedDocuments('Token', remove);
  await scene.createEmbeddedDocuments('Token', create);
  ui.notifications.info(`${create.length} tokens ligados às fichas.`);
}

/* ------------------------------------------------------------------ */
/* Estados de cena                                                     */
/* ------------------------------------------------------------------ */

const tagOf = (doc) => doc.flags?.sombraneon?.tag;
const baseDarkness = (scene) => scene.flags?.sombraneon?.baseDarkness ?? 0;

async function toggleLock(scene, tag) {
  scene ??= canvas.scene;
  const walls = scene.walls.filter((w) => w.door && tagOf(w) === tag);
  if (!walls.length) return ui.notifications.warn('Esta cena não tem porta para este macro.');
  const lock = walls.some((w) => w.ds !== CONST.WALL_DOOR_STATES.LOCKED);
  await scene.updateEmbeddedDocuments('Wall', walls.map((w) => ({ _id: w.id, ds: lock ? CONST.WALL_DOOR_STATES.LOCKED : CONST.WALL_DOOR_STATES.CLOSED })));
  ui.notifications.info(lock ? 'Portas trancadas.' : 'Portas destrancadas.');
}

async function toggleHidden(scene, tag, labels) {
  scene ??= canvas.scene;
  const lights = scene.lights.filter((l) => tagOf(l) === tag);
  if (!lights.length) return ui.notifications.warn('Esta cena não tem luz para este macro.');
  const show = lights.every((l) => l.hidden);
  await scene.updateEmbeddedDocuments('AmbientLight', lights.map((l) => ({ _id: l.id, hidden: !show })));
  ui.notifications.info(show ? labels[0] : labels[1]);
}

const toggleAlert4 = (scene) => toggleLock(scene, 'alerta4');
const toggleShortCircuit = (scene) => toggleHidden(scene, 'curto', ['Curto-circuito ligado.', 'Curto-circuito desligado.']);
const togglePanic = (scene) => toggleHidden(scene, 'panico', ['Botão de pânico revelado.', 'Botão de pânico escondido.']);

/** Apagão da Galeria: escuridão total e porta da escada travada; de novo, volta ao normal. */
async function toggleBlackout(scene) {
  scene ??= canvas.scene;
  const on = scene.environment.darknessLevel < 1;
  await scene.update({ 'environment.darknessLevel': on ? 1 : baseDarkness(scene) });
  const doors = scene.walls.filter((w) => w.door && tagOf(w) === 'apagao');
  if (doors.length) await scene.updateEmbeddedDocuments('Wall', doors.map((w) => ({ _id: w.id, ds: on ? CONST.WALL_DOOR_STATES.LOCKED : CONST.WALL_DOOR_STATES.CLOSED })));
  ui.notifications.info(on ? 'Apagão: câmeras caem, fechaduras travam.' : 'A luz voltou.');
}

/** Mural do Corredor: apagar as luzes ciano deixa o corredor no escuro (Rex continua enxergando). */
async function toggleMural(scene) {
  scene ??= canvas.scene;
  const lights = scene.lights.filter((l) => tagOf(l) === 'mural');
  if (!lights.length) return ui.notifications.warn('Esta cena não tem Mural.');
  const off = lights.some((l) => !l.hidden);
  await scene.updateEmbeddedDocuments('AmbientLight', lights.map((l) => ({ _id: l.id, hidden: off })));
  await scene.update({ 'environment.darknessLevel': off ? 1 : baseDarkness(scene) });
  ui.notifications.info(off ? 'Mural desligado: corredor no escuro.' : 'Mural ligado.');
}

Hooks.once('init', () => {
  const module = game.modules.get(MODULE_ID);
  if (module) module.api = { linkSceneTokens, toggleLock, toggleAlert4, toggleBlackout, toggleMural, toggleShortCircuit, togglePanic };
});

/** Ao importar um mapa da aventura, liga os tokens às fichas sem o Mestre precisar fazer nada. */
Hooks.on('createScene', async (scene, _options, userId) => {
  if (userId !== game.user.id || !game.user.isGM) return;
  if (!scene.flags?.sombraneon?.adventure?.map) return;
  try {
    await linkSceneTokens(scene);
  } catch (error) {
    console.warn(`${MODULE_ID} | não foi possível ligar os tokens do mapa:`, error);
  }
});
