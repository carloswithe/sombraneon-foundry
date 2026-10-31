import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { ROOT } from '../../tools/lib/book.mjs';
import { imageSize } from '../../tools/lib/image.mjs';
import { ICON } from './lib.mjs';
import { ASSET_DIR } from './adventure-images.mjs';
import { MAP_DEFS } from './adventure-maps-data.mjs';

/**
 * Mapas de mesa da Noite das Máscaras: 10 Scenes montados conforme docs/noite-das-mascaras-scenes.md.
 * Cada Scene traz a grade (1 quadrado = 1,5 m, 100 px), paredes, portas (trancadas quando a aventura
 * manda), luzes, regiões de cobertura e perigo, notas e os tokens nas posições iniciais.
 * A geometria fica em adventure-maps-data.mjs, em pixels da própria imagem.
 */
export const MAP_ASSET_DIR = `${ASSET_DIR}/mapas`;
const SQUARE = 100;
const METERS = 1.5;
const pad = (n) => String(n).padStart(2, '0');

const TOKEN_ICON = { character: ICON('character'), npc: ICON('npc'), drone: ICON('drone') };

function buildScene(def, index) {
  const file = `${pad(def.n)}-${def.slug}.jpg`;
  const src = `${MAP_ASSET_DIR}/${file}`;
  const { width: iw, height: ih } = imageSize(path.join(ROOT, src));
  const [cols, rows] = def.squares;
  const width = cols * SQUARE;
  const height = rows * SQUARE;
  const sx = width / iw;
  const sy = height / ih;
  const X = (v) => Math.round(v * sx);
  const Y = (v) => Math.round(v * sy);
  const tagFlags = (tag) => (tag ? { sombraneon: { tag } } : undefined);

  const walls = def.walls
    .map((w) => ({
      c: [X(w.c[0]), Y(w.c[1]), X(w.c[2]), Y(w.c[3])],
      ...(w.low ? { sight: 0, light: 0 } : {}),
      ...(w.door ? { door: w.door, ds: w.ds ?? 0 } : {}),
      ...(w.tag ? { flags: tagFlags(w.tag) } : {})
    }))
    .filter((w) => w.c[0] !== w.c[2] || w.c[1] !== w.c[3]);

  const lights = def.lights.map((l) => ({
    x: X(l.x),
    y: Y(l.y),
    rotation: l.rot ?? 0,
    hidden: Boolean(l.hidden),
    config: {
      dim: Math.round(l.r * METERS * 100) / 100,
      bright: Math.round((l.b ?? 0) * METERS * 100) / 100,
      color: l.color,
      alpha: l.alpha ?? 0.4,
      angle: l.angle ?? 360,
      ...(l.anim ? { animation: { type: l.anim, speed: 3, intensity: 3 } } : {})
    },
    flags: { sombraneon: { tag: l.tag ?? null, label: l.name ?? null } }
  }));

  const regions = def.regions.map((r) => {
    const s = r.shape;
    const shape =
      s.type === 'rectangle'
        ? { type: 'rectangle', x: X(s.x), y: Y(s.y), width: Math.round(s.width * sx), height: Math.round(s.height * sy), rotation: 0, hole: false }
        : s.type === 'ellipse'
          ? { type: 'ellipse', x: X(s.x), y: Y(s.y), radiusX: Math.round(s.radiusX * sx), radiusY: Math.round(s.radiusY * sy), rotation: 0, hole: false }
          : { type: 'polygon', points: s.points.map((v, i) => (i % 2 === 0 ? X(v) : Y(v))), hole: false };
    return { name: r.name, color: r.color, shapes: [shape] };
  });

  const tokens = def.tokens.map((t) => {
    const [w, h] = t.size ?? [1, 1];
    return {
      name: t.name,
      x: X(t.at[0]) - Math.round((w * SQUARE) / 2),
      y: Y(t.at[1]) - Math.round((h * SQUARE) / 2),
      width: w,
      height: h,
      disposition: t.disp,
      hidden: Boolean(t.hidden),
      ref: t.ref,
      runner: t.runner,
      icon: t.icon ? TOKEN_ICON[t.icon] : undefined
    };
  });

  const notes = def.notes.map((n) => ({ text: n.text, x: X(n.at[0]), y: Y(n.at[1]) }));

  return {
    identifier: `mapa-${pad(def.n)}`,
    name: `Mapa ${pad(def.n)}. ${def.title}`,
    type: 'Scene',
    img: src,
    folder: def.room,
    sort: (index + 1) * 100,
    background: src,
    fit: 'fill',
    width,
    height,
    grid: { type: 1, size: SQUARE, distance: METERS, units: 'm', color: '#000000', alpha: 0.25 },
    tokenVision: true,
    darkness: def.darkness,
    walls,
    lights,
    regions,
    tokens,
    notes,
    flags: {
      sombraneon: {
        schemaVersion: 1,
        source: 'Noite das Máscaras, mapas de mesa',
        baseDarkness: def.darkness,
        adventure: { id: 'noite-das-mascaras', room: 'mapas', map: def.n }
      }
    }
  };
}

/** Os dez Scenes de mapa, na ordem do guia. */
export const mapScenes = MAP_DEFS.map(buildScene);

/** Capítulo do livro em que cada mapa é usado (para a caixa "Nesta cena"). */
export const MAPS_BY_CHAPTER = { 3: [1], 4: [2, 3], 5: [4, 5], 6: [6], 7: [7], 8: [8, 9, 10] };

/* ------------------------------------------------------------------ */
/* Macros dos estados de cena                                          */
/* ------------------------------------------------------------------ */

const API = "game.modules.get('sombraneon-compendium').api";
const MACRO_DEFS = [
  ['Montar tokens da cena', 'Importa o elenco dos compêndios para o mundo e troca os marcadores da cena ativa por tokens ligados às fichas. Roda sozinho ao importar um mapa; use de novo se faltarem jogadores.', 'linkSceneTokens(canvas.scene)'],
  ['Alerta 4: travar ou liberar elevadores', 'Mapas 2 e 4: tranca (ou destranca) as portas dos elevadores.', 'toggleAlert4(canvas.scene)'],
  ['Apagão da Galeria (liga e desliga)', 'Mapa 6: escuridão total e porta da escada travada, ou volta à luz normal.', 'toggleBlackout(canvas.scene)'],
  ['Mural do Corredor (liga e desliga)', 'Mapa 7: acende ou apaga as luzes ciano do Mural (apagar deixa o corredor no escuro).', 'toggleMural(canvas.scene)'],
  ['Curto-circuito do Mural (liga e desliga)', 'Mapa 7: mostra ou esconde as luzes âmbar piscando no trecho atingido.', 'toggleShortCircuit(canvas.scene)'],
  ['Botão de pânico de Aragão (revelar ou esconder)', 'Mapa 8: mostra ou esconde o marcador vermelho no tampo da mesa executiva.', 'togglePanic(canvas.scene)'],
  ['Crachá nível 4: destravar elevador de serviço', 'Mapa 4: tranca ou destranca a porta do elevador de serviço do Anel.', "toggleLock(canvas.scene, 'cracha4')"],
  ['Código 3110: destravar painel da Cache', 'Mapa 5: tranca ou destranca o painel de manutenção.', "toggleLock(canvas.scene, 'painel')"],
  ['Porta do cofre: travar ou destravar', 'Mapas 7 e 8: tranca ou destranca a porta de cofre.', "toggleLock(canvas.scene, 'cofre')"]
];

export const mapMacros = MACRO_DEFS.map(([name, description, call], i) => ({
  identifier: name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, ''),
  name: `Noite: ${name}`,
  type: 'script',
  docType: 'Macro',
  img: ICON('macro'),
  scope: 'global',
  command: `${API}.${call};`,
  description,
  sort: (i + 1) * 100,
  flags: { sombraneon: { schemaVersion: 1, source: 'Noite das Máscaras, mapas de mesa', adventure: { id: 'noite-das-mascaras', room: 'macros' } } }
}));

/* ------------------------------------------------------------------ */
/* Guia dos mapas (diário do Mestre), a partir de docs/noite-das-mascaras-scenes.md */
/* ------------------------------------------------------------------ */

const raw = fs.readFileSync(path.join(ROOT, 'docs', 'noite-das-mascaras-scenes.md'), 'utf8').replace(/\r\n/g, '\n');
const toHtml = (text) => marked.parse(text.trim());

const between = (start, end) => {
  const a = raw.indexOf(start);
  if (a === -1) throw new Error(`Seção não encontrada em noite-das-mascaras-scenes.md: ${start}`);
  const b = end ? raw.indexOf(end, a + start.length) : raw.length;
  return raw.slice(a + start.length, b === -1 ? raw.length : b).replace(/\n---\s*$/m, '');
};

const sceneSection = (n) => {
  const re = new RegExp(`^### Scene ${n}: .*$`, 'm');
  const m = re.exec(raw);
  if (!m) throw new Error(`Scene ${n} não encontrado em noite-das-mascaras-scenes.md`);
  const rest = raw.slice(m.index + m[0].length);
  const end = rest.search(/^(### Scene |## |---)/m);
  return rest.slice(0, end === -1 ? rest.length : end);
};

const promptOf = (n) => /```text\n([\s\S]*?)```/.exec(sceneSection(n))?.[1].trim() ?? '';
const withoutPrompt = (text) => text.replace(/\*\*Prompt\*\*[\s\S]*$/, '').trim();
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const count = (def, scene) => {
  const doors = scene.walls.filter((w) => w.door).length;
  return { walls: scene.walls.length - doors, doors, lights: scene.lights.length, regions: scene.regions.length, tokens: scene.tokens.length, notes: scene.notes.length };
};

const refOf = (scene, label) => `@Ref[noite-mapas/${scene.identifier}]{${label ?? scene.name}}`;

function sceneBox(def, scene) {
  const c = count(def, scene);
  const tags = [...new Set([...scene.walls, ...scene.lights].map((x) => x.flags?.sombraneon?.tag).filter((t) => t && !['entrada', 'servico', 'portao', 'camera', 'galeria', 'varanda', 'banheiro', 'cortina', 'elevador', 'torre', 'escada', 'emergencia'].includes(t)))];
  const states = tags.length ? `<li><strong>Estados:</strong> ${tags.map((t) => `<code>${t}</code>`).join(', ')} (veja a página Macros e estados).</li>` : '';
  return (
    `<hr><h3>No Foundry: já montado</h3><ul>` +
    `<li><strong>Scene:</strong> ${refOf(scene)}, ${def.squares[0]} x ${def.squares[1]} quadrados (${def.squares[0] * SQUARE} x ${def.squares[1] * SQUARE} px), grade de 100 px = 1,5 m, escuridão-base ${def.darkness}.</li>` +
    `<li><strong>Paredes e portas:</strong> ${c.walls} paredes e ${c.doors} portas (as que a aventura tranca já vêm trancadas).</li>` +
    `<li><strong>Luzes:</strong> ${c.lights}. <strong>Regiões:</strong> ${c.regions} (cobertura, terreno difícil, perigo e saídas). <strong>Notas:</strong> ${c.notes}.</li>` +
    `<li><strong>Tokens:</strong> ${c.tokens} nas posições iniciais. Runners em marcadores que viram os personagens dos jogadores; elenco ligado às fichas do compêndio.</li>${states}</ul>`
  );
}

const table = (rows) => rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('');

const sumRows = MAP_DEFS.map((def, i) => {
  const scene = mapScenes[i];
  const c = count(def, scene);
  return [refOf(scene, `${pad(def.n)}. ${def.title}`), def.room, def.when, `${def.squares[0]} x ${def.squares[1]}`, def.priority, `${c.walls}/${c.doors}/${c.lights}/${c.regions}/${c.tokens}`];
});

const ready =
  `<p>Os dez mapas do guia viraram Scenes no pack @Pack[noite-mapas]{Mapas de mesa}, organizados por sala. Cada um já vem configurado como o guia manda: grade quadrada de 100 px (1 quadrado = 1,5 m), tamanho da tabela, paredes sobre as faixas pretas, portas, luzes, regiões e tokens nas posições iniciais.</p>` +
  `<table><thead><tr><th>Mapa</th><th>Sala</th><th>Hora</th><th>Quadrados</th><th>Prioridade</th><th>Paredes/portas/luzes/regiões/tokens</th></tr></thead><tbody>${table(sumRows)}</tbody></table>` +
  `<h2>Como usar</h2><ol>` +
  `<li>Arraste o Scene do compêndio para a aba Cenas (ou clique com o botão direito e escolha Importar). Ao importar, o módulo cria no mundo os atores do elenco que a cena usa (pasta <em>Noite das Máscaras</em>) e troca os marcadores por tokens ligados a eles. Os quatro marcadores <em>Runner</em> viram os personagens dos jogadores, na ordem dos nomes.</li>` +
  `<li>Se os jogadores ainda não existiam na importação, ou se algo ficou como marcador, ative o Scene e rode o macro <em>Noite: Montar tokens da cena</em>.</li>` +
  `<li>Ative o Scene. A visão dos tokens está ligada: os jogadores só veem o que o token deles vê, com as paredes e portas do mapa.</li></ol>` +
  `<h2>O que não vem na arte</h2><ul>` +
  `<li><strong>Textos na imagem:</strong> alguns mapas saíram do gerador com rótulos em inglês (alguns com erro de grafia, como ELEVERTOR e STAFF DEOR). O prompt pedia sem texto. Se incomodar, gere de novo ou limpe a imagem: basta trocar o arquivo em <code>assets/noite-das-mascaras/mapas/</code> com o mesmo nome.</li>` +
  `<li><strong>Mapa 8:</strong> a porta de emergência da escada de incêndio não aparece na arte, então foi posta na parede de cima, à esquerda. O duto (grelha) e a argola da janela estão onde a arte os mostra.</li>` +
  `<li><strong>Luzes e escala:</strong> as luzes e regiões usam as posições da arte. Se você mudar o tamanho da cena, ajuste a escala no Foundry (a tabela de tamanhos é um alvo).</li></ul>`;

const overview = toHtml(between('## Como ler este arquivo', '## O prompt base para mapas'));
const checklist = toHtml(between('## Checklist de montagem no Foundry'));
const tips = toHtml(between('## Dicas de geração', '---'));
const baseprompt = /```text\n([\s\S]*?)```/.exec(between('## O prompt base para mapas', '## Dicas de geração'))?.[1].trim() ?? '';

const macrosPage =
  `<p>Os estados de cena do guia (Alerta 4, apagão, Mural, curto-circuito, botão de pânico, trancas) viram macros do pack @Pack[noite-macros]{Macros}. Arraste o macro para a barra de atalhos, ative o Scene certo e clique: cada um liga ou desliga o estado.</p><table><thead><tr><th>Macro</th><th>O que faz</th></tr></thead><tbody>` +
  table(mapMacros.map((m) => [`@Ref[noite-macros/${m.identifier}]{${m.name}}`, m.description])) +
  `</tbody></table>` +
  `<p>Os macros só funcionam para o Mestre. Os estados usam a escuridão da cena e as paredes, luzes e portas marcadas, e voltam à luz-base do mapa ao desligar.</p>`;

const scenePages = MAP_DEFS.map((def, i) => {
  const scene = mapScenes[i];
  const body = toHtml(withoutPrompt(sceneSection(def.n)));
  return {
    identifier: `mapa-${pad(def.n)}`,
    name: `Mapa ${pad(def.n)}: ${def.title}`,
    type: 'text',
    sort: 300 + def.n * 10,
    title: { show: true, level: 1 },
    text: { format: 1, content: `<h2>Scene ${def.n}: ${def.title}</h2>${body}${sceneBox(def, scene)}` },
    ownership: { default: 0 }
  };
});

const textPage = (identifier, name, sort, content) => ({ identifier, name, type: 'text', sort, title: { show: true, level: 1 }, text: { format: 1, content }, ownership: { default: 0 } });

/** Diário do Mestre com o guia dos mapas: o que já vem montado, o texto de cada mapa e os prompts. */
export const mapGuideJournal = {
  identifier: 'mapas-de-mesa',
  name: '02. Guia dos mapas de mesa',
  type: 'JournalEntry',
  img: ICON('journal'),
  folder: 'Comece aqui',
  sort: 250,
  pages: [
    textPage('ja-montado', 'O que já vem montado', 100, ready),
    textPage('visao-geral', 'Resumo, pacotes e pontos de atenção', 200, overview),
    textPage('macros', 'Macros e estados', 250, macrosPage),
    ...scenePages,
    textPage('checklist', 'Checklist de montagem no Foundry', 500, checklist),
    textPage('prompts', 'Prompts para gerar de novo', 600, `<h2>Prompt base</h2><pre>${esc(baseprompt)}</pre>${tips}${MAP_DEFS.map((def) => `<h2>Mapa ${pad(def.n)}: ${def.title}</h2><pre>${esc(promptOf(def.n))}</pre>`).join('')}`)
  ],
  ownership: { default: 0 },
  flags: { sombraneon: { schemaVersion: 1, source: 'Noite das Máscaras, mapas de mesa', adventure: { id: 'noite-das-mascaras', room: 'guia-mapas' } } }
};

export { MAP_DEFS };
