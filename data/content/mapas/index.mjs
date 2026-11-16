import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { ROOT } from '../../../tools/lib/book.mjs';
import { ICON } from '../lib.mjs';

/**
 * Compêndio de Mapas Aleatórios (docs/sombraneon-compendio-mapas.md): 100 battlemaps como cenas prontas, com
 * diários, tabelas de sorteio e macros. Os textos vêm do catálogo (catalogo.json é a extração dele, feita por
 * scripts/extrair_mapas.py); as paredes vêm de paredes.json (Fase 2, só os mapas aprovados na conferência visual).
 * Fica no módulo sombraneon-compendium, em quatro packs com o prefixo mapas-.
 */
export const MODULE_ID = 'sombraneon-compendium';
export const ASSET_DIR = `modules/${MODULE_ID}/assets/mapas`;
const SQUARE = 100;
const METERS = 1.5;
const MARGIN = 50;

const read = (...p) => fs.readFileSync(path.join(ROOT, ...p), 'utf8').replace(/\r\n/g, '\n');
export const MAPAS = JSON.parse(read('data', 'content', 'mapas', 'catalogo.json'));
const WALLS_FILE = path.join(ROOT, 'data', 'content', 'mapas', 'paredes.json');
/** { m021: { metodo, paredes: [[x1, y1, x2, y2], ...] } }: só os mapas cuja sobreposição foi aprovada. */
export const PAREDES = fs.existsSync(WALLS_FILE) ? JSON.parse(fs.readFileSync(WALLS_FILE, 'utf8')) : {};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => marked.parseInline(s);
const upper = (m) => m.id.toUpperCase();
const titulo = (m) => `${upper(m)}. ${m.nome}`;
const byId = new Map(MAPAS.map((m) => [m.id, m]));
const sceneRef = (m, label) => `@Ref[mapas-cenas/${m.id}]{${label ?? titulo(m)}}`;

/** Categorias na ordem do catálogo: { cat, nome, mapas }. */
export const CATEGORIAS = [];
for (const m of MAPAS) {
  let c = CATEGORIAS.find((x) => x.cat === m.cat);
  if (!c) CATEGORIAS.push((c = { cat: m.cat, nome: m.cat_nome, mapas: [] }));
  c.mapas.push(m);
}

/* ------------------------------------------------------------------ */
/* Cenas                                                               */
/* ------------------------------------------------------------------ */

const ENTRADA = {
  sul: (w, h) => [w / 2, h - MARGIN],
  norte: (w) => [w / 2, MARGIN],
  leste: (w, h) => [w - MARGIN, h / 2],
  oeste: (_w, h) => [MARGIN, h / 2],
  centro: (w, h) => [w / 2, h / 2]
};
/** Escuridão-base da cena com paredes (Fase 2), conforme o tom de luz do mapa. */
export const ESCURIDAO = { claro: 0, penumbra: 0.35, escuro: 0.6 };

const sceneOf = (m, i) => {
  const walls = PAREDES[m.id]?.paredes ?? null;
  const [x, y] = ENTRADA[m.entrada](m.px_w, m.px_h).map(Math.round);
  return {
    identifier: m.id,
    name: m.nome,
    type: 'Scene',
    img: `${ASSET_DIR}/thumbs/${m.arquivo}`,
    folder: m.cat_nome,
    sort: (i + 1) * 100,
    background: `${ASSET_DIR}/maps/${m.arquivo}`,
    fit: 'fill',
    width: m.px_w,
    height: m.px_h,
    grid: { type: 1, size: SQUARE, distance: METERS, units: 'm', color: '#000000', alpha: 0.25 },
    // Fase 1: fundo e grade, luz global ligada. Fase 2 (com paredes): visão dos tokens, névoa e escuridão pelo tom do mapa.
    tokenVision: Boolean(walls),
    globalLight: !walls,
    fogExploration: Boolean(walls),
    darkness: walls ? ESCURIDAO[m.luz] : 0,
    walls: (walls ?? []).map((c) => ({ c })),
    notes: [{ text: 'Entrada dos runners', x, y }],
    flags: {
      [MODULE_ID]: {
        mapa: {
          id: m.id,
          categoria: m.cat,
          grade: m.grade,
          ambiente: m.ambiente,
          luz: m.luz,
          entrada: m.entrada,
          cor: m.cor,
          pacote: m.pacote,
          placeholder: false,
          paredes: walls ? 'auto-v1' : 'nenhuma',
          resumo: { descricao: m.descricao, ameacas: m.ameacas }
        }
      },
      sombraneon: { schemaVersion: 1, source: 'Compêndio de Mapas Aleatórios' }
    }
  };
};

export const mapaCenas = MAPAS.map(sceneOf);

/* ------------------------------------------------------------------ */
/* Diários                                                             */
/* ------------------------------------------------------------------ */

const catalog = read('docs', 'sombraneon-compendio-mapas.md');

/** Corpo de uma seção "## Título" do catálogo, até o próximo "## ". */
function section(heading) {
  const start = catalog.indexOf(`\n## ${heading}\n`);
  if (start === -1) throw new Error(`Seção não encontrada no catálogo: ${heading}`);
  const rest = catalog.slice(start + heading.length + 5);
  const end = rest.search(/^## /m);
  return (end === -1 ? rest : rest.slice(0, end)).trim();
}

/** Troca cada id de mapa citado (m071) por um link para a cena; "m001 a m010" vira dois links curtos. */
function linkIds(html) {
  return html
    .replace(/\bm(\d{3}) a m(\d{3})\b/g, (all, a, b) => (byId.has(`m${a}`) && byId.has(`m${b}`) ? `${sceneRef(byId.get(`m${a}`), `M${a}`)} a ${sceneRef(byId.get(`m${b}`), `M${b}`)}` : all))
    .replace(/(?<![\w@/])m(\d{3})\b(?![^<]*>)/g, (all, n) => (byId.has(`m${n}`) ? sceneRef(byId.get(`m${n}`)) : all));
}
const toHtml = (md) => linkIds(marked.parse(md.trim()));

const textPage = (identifier, name, sort, content) => ({ identifier, name, type: 'text', sort, title: { show: true, level: 1 }, text: { format: 1, content }, ownership: { default: -1 } });

const SEM_ARQUIVOS = /Este arquivo é o \*\*catálogo\*\*\.[\s\S]*$/;
const oQueE = section('1. O que é este compêndio').replace(SEM_ARQUIVOS, '').trim();

const comNoModulo =
  `<p>Os 100 mapas vêm como <strong>cenas prontas</strong> no compêndio @Pack[mapas-cenas]{Mapas: Cenas}, em dez pastas (uma por categoria). Cada cena traz o fundo no tamanho certo, a grade quadrada de 100 px (1 casa = 1,5 m) e uma nota <em>Entrada dos runners</em> na borda indicada no diário do mapa.</p>` +
  `<h2>Paredes automáticas</h2>` +
  `<p>Os mapas de arte final foram passados por uma detecção de paredes sobre as faixas pretas grossas da própria arte, e cada resultado foi conferido numa sobreposição. As cenas aprovadas vêm com paredes, visão dos tokens e névoa de exploração ligadas, iluminação global desligada e escuridão pelo tom de luz do mapa (claro 0, penumbra 0,35, escuro 0,6). Cenas sem paredes vêm só com fundo e grade, luz global ligada e escuridão 0. A flag <code>paredes</code> de cada cena diz qual é o caso (<code>auto-v1</code> ou <code>nenhuma</code>).</p>` +
  `<ul><li><strong>Portas e janelas não são detectadas.</strong> As paredes bloqueiam movimento, visão, luz e som por inteiro. Para abrir uma passagem, marque uma porta à mão com a imagem aberta.</li>` +
  `<li><strong>Luz.</strong> Com a iluminação global desligada, o mapa escuro só se revela com a luz dos tokens e das luzes que o Mestre pôr. Para jogar sem montar luzes, ligue <em>Iluminação global</em> na configuração da cena.</li>` +
  `<li><strong>A arte nem sempre bate com a grade.</strong> Ajuste a escala e a posição do fundo pela ferramenta de grade da cena, usando as portas (cerca de 1 casa) como referência. Se mudar a escala do fundo, as paredes precisam acompanhar.</li>` +
  `<li><strong>Mapas da Rede</strong> (@Ref[mapas-cenas/m089]{M089}, @Ref[mapas-cenas/m090]{M090}) são espaços virtuais: sem paredes.</li></ul>` +
  `<h2>Macros</h2><p>No compêndio @Pack[mapas-macros]{Mapas: Macros}: <em>Mapa aleatório (d100)</em> rola, importa a cena sorteada e posta um resumo no chat; <em>Importar mapa por categoria</em> abre uma escolha com miniaturas. Cada diário de categoria tem, por mapa, uma página de texto e uma página de imagem para mostrar aos jogadores.</p>`;

const leiaPrimeiro = {
  identifier: 'leia-primeiro',
  name: '00 Leia primeiro',
  type: 'JournalEntry',
  img: ICON('journal'),
  sort: 100,
  pages: [
    textPage('o-que-e', 'O que é', 100, toHtml(oQueE)),
    textPage('no-modulo', 'Cenas, paredes e macros neste módulo', 150, comNoModulo),
    textPage('como-usar', 'Como usar na mesa', 200, toHtml(section('2. Como usar na mesa'))),
    textPage('grade', 'Grade, escala e tamanhos', 300, toHtml(section('3. Grade, escala e tamanhos'))),
    textPage('tabelas', 'Tabelas de sorteio', 400, toHtml(section('4. Tabelas de sorteio')) + `<p>Compêndio @Pack[mapas-tabelas]{Mapas: Tabelas de sorteio}.</p>`),
    textPage('cores', 'Legenda da cor de destaque', 500, toHtml(section('5. Legenda da cor de destaque'))),
    textPage('pacote', 'Pacote essencial', 600, toHtml(section('6. Pacote essencial (os 20 primeiros)'))),
    textPage('arte', 'Direção de arte', 700, toHtml(section('8. Direção de arte dos mapas'))),
    textPage('notas', 'Notas finais', 800, toHtml(section('10. Notas finais')))
  ],
  ownership: { default: 0 },
  flags: { sombraneon: { schemaVersion: 1, source: 'Compêndio de Mapas Aleatórios' } }
};

const LUZ = { claro: 'luz clara', penumbra: 'penumbra', escuro: 'escuro' };
const rows = (m) => m.areas.map((a) => `<tr><td>${inline(a.area)}</td><td>${inline(a.funcao)}</td></tr>`).join('');

function mapPages(m, n) {
  const thumb = `${ASSET_DIR}/thumbs/${m.arquivo}`;
  const html =
    `<p><strong>Categoria:</strong> ${m.cat_nome} &middot; <strong>Grade:</strong> ${m.w} x ${m.h} (${m.px_w} x ${m.px_h} px) &middot; <strong>Ambiente:</strong> ${m.ambiente}, ${LUZ[m.luz]} &middot; <strong>Entrada:</strong> ${m.entrada} &middot; <strong>Cor:</strong> ${m.cor_pt}</p>` +
    `<p>${sceneRef(m, 'Abrir a cena')}</p>` +
    `<img src="${thumb}" alt="${esc(m.nome)}">` +
    `<h3>Descrição</h3><p>${inline(m.descricao)}</p>` +
    `<h3>Áreas e pontos de interesse</h3><table><thead><tr><th>Área</th><th>Função no jogo</th></tr></thead><tbody>${rows(m)}</tbody></table>` +
    `<h3>Cobertura e perigos</h3><p>${inline(m.cobertura)}</p>` +
    `<h3>Ganchos de uso</h3><ol>${m.ganchos.map((g) => `<li>${inline(g)}</li>`).join('')}</ol>` +
    `<h3>Ameaças típicas</h3><p>${inline(m.ameacas)}</p>` +
    `<details><summary>Prompt para regerar (Gemini)</summary><pre>${esc(m.prompt)}</pre></details>`;
  return [
    textPage(m.id, titulo(m), n * 20 + 100, html),
    { identifier: `${m.id}-imagem`, name: `Imagem: ${upper(m)}`, type: 'image', sort: n * 20 + 110, title: { show: false, level: 1 }, src: `${ASSET_DIR}/maps/${m.arquivo}`, ownership: { default: -1 } }
  ];
}

const categoryJournals = CATEGORIAS.map((c, i) => ({
  identifier: c.cat,
  name: `${String(i + 1).padStart(2, '0')} ${c.nome}`,
  type: 'JournalEntry',
  img: ICON('journal'),
  sort: (i + 2) * 100,
  pages: c.mapas.flatMap((m, n) => mapPages(m, n)),
  ownership: { default: 0 },
  flags: { sombraneon: { schemaVersion: 1, source: 'Compêndio de Mapas Aleatórios' } }
}));

export const mapaDiarios = [leiaPrimeiro, ...categoryJournals];

/* ------------------------------------------------------------------ */
/* Tabelas                                                             */
/* ------------------------------------------------------------------ */

const D20 = 'icons/svg/d20-black.svg';
const table = (identifier, name, formula, description, results, sort) => ({
  identifier,
  name,
  type: 'RollTable',
  img: D20,
  description,
  formula,
  replacement: true,
  displayRoll: true,
  results,
  sort,
  flags: { sombraneon: { schemaVersion: 1, source: 'Compêndio de Mapas Aleatórios' } }
});
const sceneResult = (m, n) => ({ range: [n, n], ref: `Scene:${m.id}`, label: titulo(m) });

/** Ids da coluna "Mapas sugeridos" da tabela 4.2 ("m011, m012, m031 a m040"), expandindo as faixas. */
function expandIds(cell) {
  const ids = [];
  for (const part of cell.split(',').map((s) => s.trim())) {
    const range = /^m(\d{3}) a m(\d{3})$/.exec(part);
    if (range) for (let n = Number(range[1]); n <= Number(range[2]); n++) ids.push(`m${String(n).padStart(3, '0')}`);
    else if (/^m\d{3}$/.test(part)) ids.push(part);
    else throw new Error(`Célula da tabela 4.2 não reconhecida: ${part}`);
  }
  return ids;
}

const tabelas = section('4. Tabelas de sorteio');
const localRows = tabelas
  .slice(tabelas.indexOf('### 4.2'), tabelas.indexOf('### 4.3'))
  .split('\n')
  .filter((l) => /^\| [1-8] \|/.test(l))
  .map((l) => l.split('|').map((s) => s.trim()))
  .map(([, d, local, mapas]) => ({ d: Number(d), local, ids: expandIds(mapas) }));
if (localRows.length !== 8) throw new Error(`Tabela 4.2 do catálogo: esperava 8 linhas, achei ${localRows.length}`);

export const mapaTabelas = [
  table('d100', 'Mapa aleatório (d100)', '1d100', '<p>Role d100 e use o número como id do mapa: 01 é m001, 57 é m057, 100 é m100. O resultado abre a cena no compêndio.</p>', MAPAS.map((m, i) => sceneResult(m, i + 1)), 100),
  table(
    'categoria',
    'Categoria de mapa (d10)',
    '1d10',
    '<p>Role d10 para a categoria. Depois role a tabela <em>Mapas</em> da categoria (d10): o resultado é a posição do mapa dentro dela, e 10 é o último.</p>',
    CATEGORIAS.map((c, i) => ({ range: [i + 1, i + 1], name: c.nome, text: `${c.mapas[0].id} a ${c.mapas[9].id}. Role em @Ref[mapas-tabelas/cat-${c.cat}]{Mapas: ${c.nome} (d10)}.` })),
    200
  ),
  ...CATEGORIAS.map((c, i) =>
    table(`cat-${c.cat}`, `Mapas: ${c.nome} (d10)`, '1d10', `<p>Role d10: o resultado é a posição do mapa nesta categoria (m${String(i * 10 + 1).padStart(3, '0')} a m${String(i * 10 + 10).padStart(3, '0')}).</p>`, c.mapas.map((m, n) => sceneResult(m, n + 1)), 300 + i * 10)
  ),
  table(
    'local',
    'Local do contrato (d8)',
    '1d8',
    '<p>Role o d8 do livro (Cap. 10) para o local do contrato. O resultado traz o tipo de local e os mapas sugeridos, com link para cada cena.</p>',
    localRows.map((r) => ({ range: [r.d, r.d], name: r.local, text: r.ids.map((id) => sceneRef(byId.get(id))).join(', ') })),
    500
  ),
  table('pacote', 'Pacote essencial (d20)', '1d20', '<p>Role d20 para sortear um dos 20 mapas do pacote essencial, os que cobrem a maioria das situações de improviso.</p>', MAPAS.filter((m) => m.pacote).map((m, i) => sceneResult(m, i + 1)), 600)
];

/* ------------------------------------------------------------------ */
/* Macros                                                              */
/* ------------------------------------------------------------------ */

const API = `game.modules.get('${MODULE_ID}').api`;
const MACROS = [
  ['mapa-aleatorio', 'Mapas: Mapa aleatório (d100)', 'Rola a tabela d100, importa a cena sorteada para o mundo (pasta Mapas aleatórios), posta no chat o resumo para o Mestre e pergunta se deve ativar a cena.', 'sortearMapa()'],
  ['importar-por-categoria', 'Mapas: Importar mapa por categoria', 'Escolhe uma categoria e depois um mapa dela, com miniaturas, e importa a cena para o mundo.', 'importarMapaPorCategoria()']
];

export const mapaMacros = MACROS.map(([identifier, name, description, call], i) => ({
  identifier,
  name,
  type: 'script',
  docType: 'Macro',
  img: ICON('macro'),
  scope: 'global',
  command: `${API}.${call};`,
  description,
  sort: (i + 1) * 100,
  flags: { sombraneon: { schemaVersion: 1, source: 'Compêndio de Mapas Aleatórios' } }
}));

/* ------------------------------------------------------------------ */
/* Packs                                                               */
/* ------------------------------------------------------------------ */

const pack = (name, label, docType, docs) => ({ scope: 'module', folderSorting: 'm', name, label, docType, docs });

export const MAPAS_PACKS = [
  pack('mapas-cenas', 'Mapas: Cenas', 'Scene', mapaCenas),
  pack('mapas-diarios', 'Mapas: Diários', 'JournalEntry', mapaDiarios),
  pack('mapas-tabelas', 'Mapas: Tabelas de sorteio', 'RollTable', mapaTabelas),
  pack('mapas-macros', 'Mapas: Macros', 'Macro', mapaMacros)
];

/** Pasta do menu de compêndios (packFolders do module.json). */
export const MAPAS_PACK_FOLDER = { name: 'Mapas Aleatórios', sorting: 'm', color: '#00b8d4', packs: MAPAS_PACKS.map((p) => p.name) };

export const MAPAS_COUNTS = {
  'mapas-cenas': 100,
  'mapas-diarios': 11,
  'mapas-tabelas': 14,
  'mapas-macros': 2
};
