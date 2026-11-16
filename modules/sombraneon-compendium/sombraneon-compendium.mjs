/**
 * Módulo de catálogo do SombraNeon: os dados ficam nos compêndios (packs/).
 * Este arquivo avisa se o sistema ativo não for o SombraNeon e traz a API dos mapas de mesa da aventura
 * "Noite das Máscaras": ligar os tokens do mapa às fichas e alternar os estados de cena (Alerta 4, apagão...).
 * Traz também a API do Compêndio de Mapas Aleatórios: sortear um mapa (d100) e importar um mapa por categoria.
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

/* ------------------------------------------------------------------ */
/* Compêndio de Mapas Aleatórios                                       */
/* ------------------------------------------------------------------ */

const MAPAS_CENAS = `${MODULE_ID}.mapas-cenas`;
const MAPAS_TABELAS = `${MODULE_ID}.mapas-tabelas`;
const MAPAS_PASTA = 'Mapas aleatórios';
const mapaFlags = (doc) => doc?.flags?.[MODULE_ID]?.mapa;
const esc = (s) => foundry.utils.escapeHTML(String(s ?? ''));

async function mapasFolder() {
  const found = game.folders.find((f) => f.type === 'Scene' && f.name === MAPAS_PASTA && !f.folder);
  return found ?? Folder.create({ name: MAPAS_PASTA, type: 'Scene', color: '#00b8d4' });
}

/** Importa a cena do compêndio para o mundo. Nunca duas vezes: se o mundo já tem a mesma cena (mesmo id de mapa), devolve a que existe. */
async function importarMapa(source) {
  const id = mapaFlags(source)?.id;
  const existente = id ? game.scenes.find((s) => mapaFlags(s)?.id === id) : null;
  if (existente) return existente;
  const pack = game.packs.get(MAPAS_CENAS);
  if (!pack) return ui.notifications.error('O compêndio "Mapas: Cenas" não foi encontrado.');
  const pasta = await mapasFolder();
  return game.scenes.importFromCompendium(pack, source.id, { folder: pasta.id }, { clearOwnership: true });
}

/** Resumo do mapa para o Mestre (só ele vê): nome, entrada, descrição e ameaças típicas. */
async function postarResumoMapa(scene) {
  const info = mapaFlags(scene);
  if (!info) return;
  const content =
    `<h3>${esc(scene.name)}</h3><p><strong>Grade:</strong> ${esc(info.grade)} casas &middot; <strong>Entrada dos runners:</strong> ${esc(info.entrada)}</p>` +
    `<p>${esc(info.resumo?.descricao)}</p><p><strong>Ameaças típicas:</strong> ${esc(info.resumo?.ameacas)}</p>`;
  await ChatMessage.create({ content, whisper: ChatMessage.getWhisperRecipients('GM').map((u) => u.id) });
}

async function perguntarAtivar(scene) {
  const ativar = await foundry.applications.api.DialogV2.confirm({
    window: { title: 'Ativar a cena?' },
    content: `<p>Ativar <strong>${esc(scene.name)}</strong> agora?</p>`,
    yes: { label: 'Ativar' },
    no: { label: 'Agora não' }
  });
  if (ativar) await scene.activate();
}

/** Documento do compêndio apontado por um resultado de tabela (formato novo documentUuid, ou o antigo coleção + id). */
async function cenaDoResultado(result) {
  const uuid = result.documentUuid ?? (result.documentCollection && result.documentId ? `Compendium.${result.documentCollection}.${result.documentId}` : null);
  return uuid ? fromUuid(uuid) : null;
}

/** Mapa aleatório (d100): rola a tabela, importa a cena sorteada, posta o resumo e pergunta se deve ativar. */
async function sortearMapa() {
  if (!game.user.isGM) return ui.notifications.warn('Só o Mestre pode sortear um mapa.');
  const pack = game.packs.get(MAPAS_TABELAS);
  const entry = pack && (await pack.getIndex()).find((e) => e.name === 'Mapa aleatório (d100)');
  if (!entry) return ui.notifications.error('A tabela "Mapa aleatório (d100)" não foi encontrada.');
  const table = await pack.getDocument(entry._id);
  const { results } = await table.draw();
  const source = results?.length ? await cenaDoResultado(results[0]) : null;
  if (!source) return ui.notifications.error('O resultado sorteado não aponta para uma cena.');
  const scene = await importarMapa(source);
  if (!scene) return;
  await postarResumoMapa(scene);
  await perguntarAtivar(scene);
}

/** Importar mapa por categoria: escolhe a categoria, depois o mapa (com miniatura), e importa. */
async function importarMapaPorCategoria() {
  if (!game.user.isGM) return ui.notifications.warn('Só o Mestre pode importar um mapa.');
  const pack = game.packs.get(MAPAS_CENAS);
  if (!pack) return ui.notifications.error('O compêndio "Mapas: Cenas" não foi encontrado.');
  const index = await pack.getIndex({ fields: ['folder', 'sort', 'thumb', `flags.${MODULE_ID}.mapa.id`] });
  const pastas = [...pack.folders].sort((a, b) => a.sort - b.sort);
  const dialog = foundry.applications.api.DialogV2;
  const categoria = await dialog.prompt({
    window: { title: 'Importar mapa: categoria' },
    content: `<div class="form-group"><label>Categoria</label><select name="categoria">${pastas.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></div>`,
    ok: { label: 'Continuar', callback: (_event, button) => button.form.elements.categoria.value },
    rejectClose: false
  });
  if (!categoria) return;
  const mapas = index.filter((e) => e.folder === categoria).sort((a, b) => a.sort - b.sort);
  if (!mapas.length) return ui.notifications.warn('Esta categoria não tem mapas.');
  const escolhido = await dialog.prompt({
    window: { title: 'Importar mapa: escolha o mapa' },
    content: `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">${mapas
      .map((m, i) => `<label style="display:flex;flex-direction:column;gap:4px;cursor:pointer"><input type="radio" name="mapa" value="${m._id}"${i === 0 ? ' checked' : ''}><img src="${esc(m.thumb)}" alt="" style="max-width:100%"><span>${esc(m.name)}</span></label>`)
      .join('')}</div>`,
    ok: { label: 'Importar', callback: (_event, button) => button.form.elements.mapa.value },
    rejectClose: false
  });
  if (!escolhido) return;
  const source = await pack.getDocument(escolhido);
  const scene = await importarMapa(source);
  if (!scene) return;
  await postarResumoMapa(scene);
  await perguntarAtivar(scene);
}

Hooks.once('init', () => {
  const module = game.modules.get(MODULE_ID);
  if (module) module.api = { linkSceneTokens, toggleLock, toggleAlert4, toggleBlackout, toggleMural, toggleShortCircuit, togglePanic, sortearMapa, importarMapaPorCategoria };
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
