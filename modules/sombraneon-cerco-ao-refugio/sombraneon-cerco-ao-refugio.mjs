/**
 * Módulo CERCO AO REFÚGIO para o sistema SombraNeon.
 * Os dados ficam nos compêndios (packs/). Este arquivo traz:
 * - a API dos macros (Alerta, relógio da história, cronômetros, relógio da Coruja, luzes, armadilhas);
 * - a ligação das cenas importadas: tokens ligados às fichas, pins ligados às páginas dos diários;
 * - a permissão de observador dos handouts, que o Foundry zera ao importar.
 * Nada aqui altera o sistema: só lê o rastreador de Alerta e o usa.
 */
const ID = 'sombraneon-cerco-ao-refugio';
const SYSTEM = 'sombraneon';
const FOLDER = 'Cerco ao Refúgio';
const COLOR = '#ffb300';

/** Textos do Alerta, iguais aos da tabela do capítulo 2 (conferidos em tests/ui/cerco.test.mjs). */
export const ALERTA = {
  0: 'Silêncio. A Kessler só tem o endereço.',
  1: 'Nada visível, só para o Mestre: uma van passa devagar na rua e o drone marca a igreja.',
  2: 'Um <strong>Drone de vigilância</strong> orbita a igreja. Testes de passar despercebido ficam com desvantagem, e a próxima onda chega informada (um ponto fraco a mais, veja a Sala 3).',
  3: '<strong>Barreira:</strong> a Kessler bloqueia o beco e liga um jammer. Rádios e o canal fechado da Ruth caem por 10 minutos. A Rota C passa a exigir um teste extra (CD 15) no primeiro lance.',
  4: '<strong>Resposta da corporação:</strong> o ataque principal (Sala 4) <strong>adianta em 1d4 rodadas</strong>, e <strong>2 Androides de segurança</strong> vão direto para a Estação do Cais e esperam lá (veja a Sala 5). Não encerra a aventura.'
};

/** Relógio da Coruja (Sala 4): 4 estágios, 1 a cada 2 rodadas. */
export const CORUJA = [
  ['A galeria do esgoto', 2, 'O Rotor ou a Véu a veem pelo drone (SAB CD 12): vantagem na emboscada.'],
  ['A porta de ferro da cripta', 4, 'Barricar ou trancar a porta (INT CD 12): <strong>+2 rodadas</strong>.'],
  ['A cripta', 6, 'Uma armadilha lá embaixo: ela leva <strong>2d6</strong> e <strong>perde 1 rodada</strong>.'],
  ['A escada para a nave', 8, 'Ela surge <strong>atrás do grupo</strong>, e o scanner marca Íris, Véu e Rotor.']
];

/** Marcos da noite, em minutos a partir da meia-noite do dia da abertura (21:00 = 1260). */
export const MARCOS = [
  [1440, '00:00: a Ruth liga e a Onda 1 chega.'],
  [1530, '01:30: Onda 2.'],
  [1550, '01:50: a Beatriz sobe à torre "para rezar".'],
  [1560, '02:00: a Kessler monta as emboscadas nas rotas A e B.'],
  [1620, '03:00: a Ruth liga. Começa a Sala 4.'],
  [1705, '04:25: hora de ligar o embaralhador (cobre até 05:05).'],
  [1710, '04:30: documentos prontos; a Ruth liga.'],
  [1737, '04:57: o homem do banco, na plataforma.'],
  [1740, '05:00: o Expresso chega (3 pessoas por minuto).'],
  [1741, '05:01: a Coruja, se sobreviveu, se revela na plataforma.'],
  [1744, '05:04: as portas fecham.']
];
const INICIO = 1260;

const CRONOMETROS = {
  preparacao: { nome: 'Cronômetro da Preparação', min: 30, fim: 'O tempo da Preparação acabou: a Onda 1 chega, esteja a casa pronta ou não.' },
  missao: { nome: 'Cronômetro da missão', min: 240, fim: 'O tempo da sessão acabou.' }
};

const gmOnly = () => {
  if (game.user.isGM) return true;
  ui.notifications.warn('Só o Mestre pode usar este macro.');
  return false;
};

export const hhmm = (minutes) => {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

const get = (key) => game.settings.get(ID, key);
const set = (key, value) => game.settings.set(ID, key, value);

/** Cartão de chat só para o Mestre. */
async function card(title, body) {
  const content = `<div class="cerco-card"><h3>${title}</h3>${body}</div>`;
  return ChatMessage.create({ content, speaker: { alias: FOLDER }, whisper: game.users.filter((u) => u.isGM).map((u) => u.id) });
}

/* ------------------------------------------------------------------ */
/* Alerta, relógios e contadores                                       */
/* ------------------------------------------------------------------ */

/** Alerta de 0 a 4: usa o rastreador do próprio sistema SombraNeon e publica o efeito do nível. */
async function alerta(delta = 0) {
  if (!gmOnly()) return;
  let state;
  try {
    state = foundry.utils.deepClone(game.settings.get(SYSTEM, 'alert') ?? {});
  } catch {
    return ui.notifications.warn('O rastreador de Alerta do sistema SombraNeon não está disponível neste mundo.');
  }
  const prev = Number(state.value ?? 0);
  const value = Math.min(4, Math.max(0, prev + delta));
  if (delta) await game.settings.set(SYSTEM, 'alert', { label: '', erased: false, ...state, value, active: true });
  const extra = value === 4 && prev < 4 ? '<p><strong>Alerta 4:</strong> role 1d4 (rodadas adiantadas no ataque principal) e coloque os 2 Androides na estação.</p>' : '';
  return card(`Alerta ${value}${delta ? ` (era ${prev})` : ''}`, `<p>${ALERTA[value]}</p>${extra}`);
}

/** Hora da história: começa às 21:00 e avança por minutos, avisando os marcos cruzados. */
async function relogio(delta = 0) {
  if (!gmOnly()) return;
  const prev = get('relogio');
  const value = prev + delta;
  await set('relogio', value);
  const crossed = MARCOS.filter(([at]) => at > prev && at <= value).map(([, text]) => `<li>${text}</li>`);
  return card(`Hora da história: ${hhmm(value)}`, crossed.length ? `<ul>${crossed.join('')}</ul>` : '<p>Diga o horário em voz alta.</p>');
}

async function relogioReiniciar() {
  if (!gmOnly()) return;
  await set('relogio', INICIO);
  return card(`Hora da história: ${hhmm(INICIO)}`, '<p>Relógio reiniciado.</p>');
}

/** Relógio da Coruja: avança um estágio. */
async function coruja(delta = 1) {
  if (!gmOnly()) return;
  const stage = Math.min(CORUJA.length, Math.max(0, get('coruja') + delta));
  await set('coruja', stage);
  if (!stage) return card('Coruja', '<p>Ela ainda não entrou.</p>');
  const [onde, rodada, texto] = CORUJA[stage - 1];
  return card(`Coruja, estágio ${stage} de ${CORUJA.length}: ${onde}`, `<p>Rodada ${rodada}. ${texto}</p>`);
}

async function corujaReiniciar() {
  if (!gmOnly()) return;
  await set('coruja', 0);
  return card('Coruja', '<p>Relógio zerado.</p>');
}

/* ------------------------------------------------------------------ */
/* Cronômetros (minutos reais)                                         */
/* ------------------------------------------------------------------ */

let timers = [];
function armar({ tipo, fim }) {
  timers.forEach(clearTimeout);
  timers = [];
  const def = CRONOMETROS[tipo];
  if (!def) return;
  const agora = Date.now();
  for (const [min, texto] of [[5, 'Faltam 5 minutos.'], [1, 'Falta 1 minuto.'], [0, def.fim]]) {
    const quando = fim - min * 60000;
    if (quando > agora) timers.push(setTimeout(() => card(def.nome, `<p>${texto}</p>`), quando - agora));
  }
}

async function cronometro(tipo = 'preparacao') {
  if (!gmOnly()) return;
  const def = CRONOMETROS[tipo];
  if (!def) return;
  const state = { tipo, fim: Date.now() + def.min * 60000 };
  await set('cronometro', state);
  armar(state);
  return card(def.nome, `<p>Contagem de ${def.min} minutos iniciada. Termina às ${new Date(state.fim).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}, com aviso a 5 e a 1 minuto. Só um cronômetro roda por vez.</p>`);
}

/* ------------------------------------------------------------------ */
/* Cena: luzes e armadilhas                                            */
/* ------------------------------------------------------------------ */

const tagOf = (doc) => doc.flags?.[ID]?.tag;

async function toggleLights(tag, scene) {
  if (!gmOnly()) return;
  scene ??= canvas.scene;
  const lights = scene?.lights.filter((l) => tagOf(l) === tag) ?? [];
  if (!lights.length) return ui.notifications.warn('Esta cena não tem luz para este macro.');
  const show = lights.every((l) => l.hidden);
  await scene.updateEmbeddedDocuments('AmbientLight', lights.map((l) => ({ _id: l.id, hidden: !show })));
  ui.notifications.info(show ? 'Luzes acesas.' : 'Luzes apagadas.');
}

/** Marca, só para o Mestre, a casa de uma armadilha (token selecionado ou posição do mouse). */
async function marcarArmadilha() {
  if (!gmOnly()) return;
  const scene = canvas.scene;
  if (!scene) return;
  const size = scene.grid.size;
  const token = canvas.tokens.controlled[0];
  const point = token ? { x: token.document.x, y: token.document.y } : canvas.mousePosition;
  const x = Math.floor(point.x / size) * size;
  const y = Math.floor(point.y / size) * size;
  await scene.createEmbeddedDocuments('Drawing', [
    { x, y, shape: { type: 'r', width: size, height: size }, hidden: true, strokeColor: '#ff1744', strokeWidth: 4, strokeAlpha: 1, fillType: 1, fillColor: '#ff1744', fillAlpha: 0.25, text: 'Armadilha', fontSize: 20, flags: { [ID]: { armadilha: true } } }
  ]);
  ui.notifications.info('Armadilha marcada (só o Mestre vê): DES CD 12 ou 2d6 em raio Perto, com qualquer pessoa.');
}

/* ------------------------------------------------------------------ */
/* Cenas importadas: tokens ligados às fichas e pins ligados aos diários */
/* ------------------------------------------------------------------ */

const uuidOf = (text) => /@UUID\[([^\]]+)\]/.exec(text ?? '')?.[1];

async function folder(type) {
  const found = game.folders.find((f) => f.type === type && f.name === FOLDER && !f.folder);
  return found ?? Folder.create({ name: FOLDER, type, color: COLOR });
}

/** Ator do mundo que veio do UUID de um compêndio; importa na primeira vez. */
async function worldActorFor(uuid) {
  const known = game.actors.find((a) => a._stats?.compendiumSource === uuid || a.flags?.core?.sourceId === uuid);
  if (known) return known;
  const source = await fromUuid(uuid);
  if (!source) return null;
  const data = game.actors.fromCompendium(source, { clearFolder: true });
  data.folder = (await folder('Actor')).id;
  return Actor.create(data);
}

/** Troca os marcadores do Scene por tokens ligados às fichas (compêndio -> mundo). */
async function linkSceneTokens(scene) {
  if (!gmOnly()) return;
  scene ??= canvas.scene;
  if (!scene) return;
  const pending = scene.tokens.filter((t) => !t.actorId && t.flags?.[ID]?.ref);
  const remove = [];
  const create = [];
  for (const t of pending) {
    const uuid = uuidOf(t.flags[ID].ref);
    const actor = uuid ? await worldActorFor(uuid) : null;
    if (!actor) continue;
    const overrides = { x: t.x, y: t.y, elevation: t.elevation, hidden: t.hidden, width: t.width, height: t.height, disposition: t.disposition, name: t.name, flags: foundry.utils.deepClone(t.flags) };
    const doc = await actor.getTokenDocument(overrides);
    create.push(doc.toObject());
    remove.push(t.id);
  }
  if (!create.length) return ui.notifications.info('Nenhum marcador novo para ligar a uma ficha.');
  await scene.deleteEmbeddedDocuments('Token', remove);
  await scene.createEmbeddedDocuments('Token', create);
  ui.notifications.info(`${create.length} tokens ligados às fichas.`);
}

/** Diário do mundo que veio de um diário do compêndio; importa na primeira vez. */
async function worldJournalFor(source) {
  const key = source.flags?.[ID]?.id;
  const known = game.journal.find((j) => j.flags?.[ID]?.id === key && key);
  if (known) return known;
  const data = game.journal.fromCompendium(source, { clearFolder: true });
  data.folder = (await folder('JournalEntry')).id;
  return JournalEntry.create(data);
}

/** Liga cada pin à página do diário da sala (importa o diário se ainda não estiver no mundo). */
async function linkSceneNotes(scene) {
  if (!gmOnly()) return;
  scene ??= canvas.scene;
  if (!scene) return;
  const updates = [];
  for (const note of scene.notes) {
    const uuid = uuidOf(note.flags?.[ID]?.pin);
    if (!uuid || note.entryId) continue;
    const page = await fromUuid(uuid);
    const entry = page?.parent;
    if (!entry) continue;
    const world = await worldJournalFor(entry);
    const worldPage = world?.pages.find((p) => p.name === page.name);
    if (worldPage) updates.push({ _id: note.id, entryId: world.id, pageId: worldPage.id });
  }
  if (!updates.length) return;
  await scene.updateEmbeddedDocuments('Note', updates);
  ui.notifications.info(`${updates.length} pins ligados aos diários.`);
}

/* ------------------------------------------------------------------ */
/* Ganchos                                                             */
/* ------------------------------------------------------------------ */

Hooks.once('init', () => {
  const reg = (key, type, initial) => game.settings.register(ID, key, { scope: 'world', config: false, type, default: initial });
  reg('relogio', Number, INICIO);
  reg('coruja', Number, 0);
  reg('cronometro', Object, { tipo: '', fim: 0 });
  const module = game.modules.get(ID);
  if (module) module.api = { alerta, relogio, relogioReiniciar, coruja, corujaReiniciar, cronometro, toggleLights, marcarArmadilha, linkSceneTokens, linkSceneNotes };
});

Hooks.once('ready', () => {
  if (game.system.id !== SYSTEM) ui.notifications.warn(game.i18n.localize('SOMBRANEON_CERCO.WrongSystem'), { permanent: true });
  if (game.user.isGM) {
    const state = get('cronometro');
    if (state?.fim > Date.now()) armar(state);
  }
});

/** Ao importar um mapa, liga os tokens às fichas e os pins aos diários, sem o Mestre precisar fazer nada. */
Hooks.on('createScene', async (scene, _options, userId) => {
  if (userId !== game.user.id || !game.user.isGM) return;
  if (!scene.flags?.[ID]?.mapa) return;
  try {
    await linkSceneTokens(scene);
    await linkSceneNotes(scene);
  } catch (error) {
    console.warn(`${ID} | não foi possível ligar a cena importada:`, error);
  }
});

/** O Foundry zera a permissão ao importar do compêndio: os handouts voltam a ser vistos pelos jogadores (observador). */
Hooks.on('createJournalEntry', async (entry, _options, userId) => {
  if (userId !== game.user.id || !game.user.isGM) return;
  if (!entry.flags?.[ID]?.observer) return;
  await entry.update({ 'ownership.default': CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER });
});
