/**
 * Módulo CARGA SEM NOME para o sistema SombraNeon.
 * Os dados ficam nos compêndios (packs/). Este arquivo traz:
 * - a API dos macros (Alerta, relógio da história, Folga, relógio do Posto, torre, Viatura Beta, Cérbero,
 *   mostrador de dificuldade, luzes e portas do Túnel, cronômetro);
 * - a ligação das cenas importadas: tokens ligados às fichas, pins ligados às páginas dos diários;
 * - a permissão de observador dos handouts, que o Foundry zera ao importar.
 * Nada aqui altera o sistema: só lê o rastreador de Alerta e o usa.
 */
const ID = 'sombraneon-carga-sem-nome';
const SYSTEM = 'sombraneon';
const FOLDER = 'Carga Sem Nome';
const ALIAS = 'Carga Sem Nome';
const L = () => CONST.WALL_DOOR_STATES;

/** Textos do Alerta, iguais aos da tabela da seção 2 da aventura (conferidos em tests/ui/carga.test.mjs). */
export const ALERTA = {
  0: 'Nada a registrar.',
  1: 'Nada visível. O Falcão vira a câmera na direção do grupo (só o Mestre vê).',
  2: 'A escolta confere o rádio a cada minuto. Testes de passar despercebido contra a Guarda têm desvantagem.',
  3: 'O comboio <strong>acelera</strong>: chega ao Túnel 2 minutos mais cedo (corte 2 min da folga da Sala 3). Policiais urbanos nas barreiras checam crachás (CD 15 para blefar). O Sargento deixa o Cérbero <strong>pronto para soltar</strong> (a soltura na Sala 4 leva 1 rodada a menos).',
  4: '<strong>Resposta:</strong> a Guarda chama reforço. <strong>2 Viaturas da Guarda</strong> (NA 3 cada) chegam em <strong>1d4 + 2 rodadas</strong> ao local do último incidente. A Aegis não ajuda. No clímax da Sala 4 nada muda: o reforço já é a contagem de rodadas da Viatura Beta.'
};

/** Marcos do Posto Meia-Lua (Sala 2). */
export const POSTO = [
  ['03:30', 'O grupo chega e se posiciona. Cada ação grande gasta <strong>2 minutos</strong>.'],
  ['03:40', 'O comboio estaciona. A Alfa na entrada, o Jararaca na baia 3, a Beta na saída leste.'],
  ['03:44', 'O Sargento abre a <strong>escotilha do lado da lanchonete</strong> (Cela A) e confere o preso.'],
  ['03:46', 'O Sargento dá a volta pela frente e abre a <strong>escotilha do lado da estrada</strong> (Cela B).'],
  ['03:49', 'O Sargento confere o carregador e a bateria nova.'],
  ['03:52', 'O comboio parte. Quem ainda estiver no Posto perdeu o comboio.']
];

/** Mostrador de dificuldade da Sala 4. */
export const MOSTRADOR = {
  leve: { rajadas: 2, texto: 'O Cérbero sai com a <strong>Cabeça Chama</strong> pifada (só dois ataques). A torre dispara só <strong>2</strong> rajadas antes de recarregar. O Sargento se rende à primeira falha de Moral. Sem droids.' },
  padrao: { rajadas: 3, texto: 'O descrito no texto: NA 8 (Cérbero e torre) com o Sargento como gatilho.' },
  brutal: { rajadas: 4, texto: '<strong>2 Droids de combate</strong> (NA 2 cada) saem do canil com o Cérbero. A torre faz <strong>4</strong> rajadas antes de recarregar. A Beta entra no combate em vez de recuar (NA +2).' }
};

const gmOnly = () => {
  if (game.user.isGM) return true;
  ui.notifications.warn('Só o Mestre pode usar este macro.');
  return false;
};

const hhmm = (minutes) => {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

const get = (key) => game.settings.get(ID, key);
const set = (key, value) => game.settings.set(ID, key, value);

/** Cartão de chat só para o Mestre. */
async function card(title, body) {
  const content = `<div class="carga-card"><h3>${title}</h3>${body}</div>`;
  return ChatMessage.create({ content, speaker: { alias: ALIAS }, whisper: game.users.filter((u) => u.isGM).map((u) => u.id) });
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
  const extra = value === 4 && prev < 4 ? '<p><strong>Alerta 4:</strong> avise o reforço. Rolagem: 1d4 + 2 rodadas.</p>' : '';
  return card(`Alerta ${value}${delta ? ` (era ${prev})` : ''}`, `<p>${ALERTA[value]}</p>${extra}`);
}

/** Hora da história: começa às 02:20 e avança por minutos. */
async function relogio(delta = 0) {
  if (!gmOnly()) return;
  const value = get('relogio') + delta;
  await set('relogio', value);
  const notes = [];
  if (value >= 245 && value < 259) notes.push('Janela de cortesia do Túnel: luzes e câmeras apagadas (04:05 a 04:19).');
  if (value >= 270) notes.push('O comboio chegou ao Meridiano (04:30): a extração custa o Mercado.');
  return card(`Hora da história: ${hhmm(value)}`, notes.length ? `<p>${notes.join(' ')}</p>` : '<p>Diga o horário em voz alta.</p>');
}

/** Sala 2: avança o marco do relógio do Posto e acerta a hora da história. */
async function postoProximo() {
  if (!gmOnly()) return;
  const next = (get('posto') + 1) % POSTO.length;
  await set('posto', next);
  const [hora, texto] = POSTO[next];
  const [h, m] = hora.split(':').map(Number);
  await set('relogio', h * 60 + m);
  return card(`Posto Meia-Lua, ${hora}`, `<p>${texto}</p><p class="carga-nota">Marco ${next + 1} de ${POSTO.length}.</p>`);
}

/** Sala 3: a Folga, em minutos (começa em 8). */
async function folga(delta = 0) {
  if (!gmOnly()) return;
  const value = get('folga') + delta;
  await set('folga', value);
  const body = value <= 0 ? '<p><strong>A Folga acabou:</strong> o comboio aparece com a armadilha incompleta e a Surpresa da Sala 4 se perde.</p>' : `<p>Faltam ${value} minuto(s) até o comboio.</p>`;
  return card(`Folga: ${value} min`, body);
}

/** Sala 4: o ciclo da torre .50 (rajadas e uma recarga). */
async function torre() {
  if (!gmOnly()) return;
  const rajadas = MOSTRADOR[get('mostrador')]?.rajadas ?? 3;
  const step = (get('torre') % (rajadas + 1)) + 1;
  await set('torre', step);
  const body =
    step <= rajadas
      ? `<p><strong>Rajada ${step} de ${rajadas}.</strong> A torre atira primeiro em quem está na passarela ou na pista aberta, a Longe, e ignora quem está na zona morta (junto do casco).</p>`
      : '<p><strong>Recarga.</strong> A torre não dispara nesta rodada: é a janela do grupo.</p>';
  return card('Torre .50 (Cabo Rufino)', body);
}

/** Sala 4: o relógio da Viatura Beta. */
async function beta(delta = 1) {
  if (!gmOnly()) return;
  const rodada = Math.max(0, get('beta') + delta);
  await set('beta', rodada);
  const alvo = get('betaAlvo');
  const body = rodada >= alvo ? `<p><strong>O reforço chega agora:</strong> 2 Viaturas da Guarda (NA 3 cada) ao fim da rodada ${alvo}. O grupo precisa estar saindo.</p>` : `<p>Rodada ${rodada} de ${alvo}. O reforço chega ao fim da rodada ${alvo}.</p>`;
  return card('Viatura Beta', body);
}

/** Sala 4: ajusta a rodada do reforço (6 padrão, 8 com o pneu cortado, 10 com o rádio cortado). */
async function betaAlvo(rodada) {
  if (!gmOnly()) return;
  await set('betaAlvo', rodada);
  return card('Viatura Beta', `<p>O reforço agora chega ao fim da rodada <strong>${rodada}</strong>.</p>`);
}

/** Sala 4: uma cabeça do Cérbero quebrou. */
async function cabecaQuebrada() {
  if (!gmOnly()) return;
  const quebradas = Math.min(3, get('cabecas') + 1);
  await set('cabecas', quebradas);
  const roll = await new Roll('1d6').evaluate();
  const cego = quebradas >= 3 ? ' <strong>Com as três quebradas, o Cérbero fica cego</strong> (desvantagem em tudo) e só tem o Pisão (+4, d6, Perto, derruba).' : '';
  return card('Cérbero: cabeça quebrada', `<p>Cabeças quebradas: <strong>${quebradas} de 3</strong>. A cabeça perde o ataque. Aplique <strong>${roll.total}</strong> (1d6) de dano ao corpo, sem Blindagem.${cego}</p>`);
}

/** Sala 4: mostrador Leve, Padrão ou Brutal. */
async function mostrador(nivel) {
  if (!gmOnly()) return;
  if (!MOSTRADOR[nivel]) return;
  await set('mostrador', nivel);
  const nome = { leve: 'Leve', padrao: 'Padrão', brutal: 'Brutal' }[nivel];
  return card(`Mostrador: ${nome}`, `<p>${MOSTRADOR[nivel].texto}</p>`);
}

/* ------------------------------------------------------------------ */
/* Cronômetro da missão (minutos reais)                                */
/* ------------------------------------------------------------------ */

const MISSAO_MIN = 235;
let timers = [];
function armar(fim) {
  timers.forEach(clearTimeout);
  timers = [];
  const agora = Date.now();
  for (const [min, texto] of [[5, 'Faltam 5 minutos para o fim da sessão.'], [1, 'Falta 1 minuto para o fim da sessão.'], [0, 'O tempo da sessão acabou.']]) {
    const quando = fim - min * 60000;
    if (quando > agora) timers.push(setTimeout(() => card('Cronômetro da missão', `<p>${texto}</p>`), quando - agora));
  }
}

async function cronometro() {
  if (!gmOnly()) return;
  const fim = Date.now() + MISSAO_MIN * 60000;
  await set('cronometro', { fim });
  armar(fim);
  return card('Cronômetro da missão', `<p>Contagem de ${MISSAO_MIN} minutos iniciada. Termina às ${new Date(fim).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}, com aviso a 5 e a 1 minuto.</p>`);
}

/* ------------------------------------------------------------------ */
/* Estados da cena: luzes, escuridão, portas e tokens ocultos          */
/* ------------------------------------------------------------------ */

const tagOf = (doc) => doc.flags?.[ID]?.tag;
const baseDarkness = (scene) => scene.flags?.[ID]?.baseDarkness ?? 0;

async function toggleLights(tag, scene) {
  if (!gmOnly()) return;
  scene ??= canvas.scene;
  const lights = scene?.lights.filter((l) => tagOf(l) === tag) ?? [];
  if (!lights.length) return ui.notifications.warn('Esta cena não tem luz para este macro.');
  const show = lights.every((l) => l.hidden);
  await scene.updateEmbeddedDocuments('AmbientLight', lights.map((l) => ({ _id: l.id, hidden: !show })));
  ui.notifications.info(show ? 'Luzes acesas.' : 'Luzes apagadas.');
}

/** Escuridão total, ou de volta à escuridão-base do mapa. */
async function apagao(scene) {
  if (!gmOnly()) return;
  scene ??= canvas.scene;
  if (!scene) return;
  const on = scene.environment.darknessLevel < 1;
  await scene.update({ 'environment.darknessLevel': on ? 1 : baseDarkness(scene) });
  ui.notifications.info(on ? 'Apagão: escuridão total.' : 'A escuridão volta ao normal do mapa.');
}

async function setDoors(scene, tag, state) {
  const walls = scene.walls.filter((w) => w.door && tagOf(w) === tag);
  if (!walls.length) return 0;
  await scene.updateEmbeddedDocuments('Wall', walls.map((w) => ({ _id: w.id, ds: state })));
  return walls.length;
}

async function reveal(scene, test) {
  const tokens = scene.tokens.filter((t) => t.hidden && test(t));
  if (tokens.length) await scene.updateEmbeddedDocuments('Token', tokens.map((t) => ({ _id: t.id, hidden: false })));
  return tokens.length;
}

/** O cartão do Sargento no painel leste: o canil abre e o Cérbero sai (os droids só no Brutal). */
async function canil(scene) {
  if (!gmOnly()) return;
  scene ??= canvas.scene;
  if (!scene) return;
  const brutal = get('mostrador') === 'brutal';
  const doors = await setDoors(scene, 'canil', L().OPEN);
  const shown = await reveal(scene, (t) => t.name.startsWith('Cérbero') || (brutal && tagOf(t) === 'droid'));
  if (!doors && !shown) return ui.notifications.warn('Esta cena não tem canil.');
  return card('O canil abre', `<p>O Cérbero sai do canil${brutal ? ' com os 2 Droids de combate (Brutal)' : ''}. Ele ataca o mais próximo sem o transponder da Guarda; se alguém carrega Nest, persegue o carregador. Ciclo da torre e relógio da Beta seguem.</p>`);
}

/** Abre a Cela A (Daigo, lado leste) ou a Cela B (Nest, lado oeste) e revela o preso. */
async function cela(letra, scene) {
  if (!gmOnly()) return;
  scene ??= canvas.scene;
  if (!scene) return;
  const a = letra === 'a';
  const doors = await setDoors(scene, a ? 'cela-a' : 'cela-b', L().OPEN);
  const shown = await reveal(scene, (t) => t.name.includes(a ? 'Daigo' : 'Nest'));
  if (!doors && !shown) return ui.notifications.warn('Esta cena não tem esta cela.');
  const outro = scene.tokens.find((t) => !t.hidden && t.name.includes(a ? 'Nest' : 'Daigo'));
  const aviso = outro ? '<p><strong>Atenção:</strong> os dois presos estão visíveis. Eles não podem se ver sem a cena do encontro (Sala 5, "O ronin").</p>' : '';
  return card(a ? 'Cela A aberta' : 'Cela B aberta', `<p>${a ? 'Daigo Okabe, o ronin' : 'Nest, o Intermediário'} aparece. Perder uma rodada abrindo a cela errada é o preço de chutar.</p>${aviso}`);
}

/* ------------------------------------------------------------------ */
/* Cenas importadas: tokens ligados às fichas e pins ligados aos diários */
/* ------------------------------------------------------------------ */

const uuidOf = (text) => /@UUID\[([^\]]+)\]/.exec(text ?? '')?.[1];

async function folder(type, color = '#ff6d00') {
  const found = game.folders.find((f) => f.type === type && f.name === FOLDER && !f.folder);
  return found ?? Folder.create({ name: FOLDER, type, color });
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
  reg('relogio', Number, 140);
  reg('folga', Number, 8);
  reg('posto', Number, -1);
  reg('torre', Number, 0);
  reg('beta', Number, 0);
  reg('betaAlvo', Number, 6);
  reg('cabecas', Number, 0);
  reg('mostrador', String, 'padrao');
  reg('cronometro', Object, { fim: 0 });
  const module = game.modules.get(ID);
  if (module) module.api = { alerta, relogio, postoProximo, folga, torre, beta, betaAlvo, cabecaQuebrada, mostrador, cronometro, toggleLights, apagao, canil, cela, linkSceneTokens, linkSceneNotes };
});

Hooks.once('ready', () => {
  if (game.system.id !== SYSTEM) ui.notifications.warn(game.i18n.localize('SOMBRANEON_CARGA.WrongSystem'), { permanent: true });
  if (game.user.isGM) {
    const fim = get('cronometro')?.fim ?? 0;
    if (fim > Date.now()) armar(fim);
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
