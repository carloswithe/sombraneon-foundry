import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../../../tools/lib/book.mjs';
import { ICON, ASSET_DIR, CARGA_ID, ADVENTURE_ID, SOURCE, esc, exists, inline, textPage } from './lib.mjs';

/**
 * Imagens e mapas da aventura (docs/carga-sem-nome-imagens.md): 35 imagens, 6 retratos e 5 mapas.
 * O índice do guia traz o nome de arquivo sugerido (.webp); os arquivos entregues são .jpg com o mesmo nome base,
 * em assets/img, assets/portraits e assets/maps. Salvar a arte final com o mesmo nome base mantém tudo ligado.
 */
const guide = fs.readFileSync(path.join(ROOT, 'docs', 'carga-sem-nome-imagens.md'), 'utf8').replace(/\r\n/g, '\n');
const lines = guide.split('\n');

const cells = (line) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim());

const DIR = { imagem: 'img', retrato: 'portraits', mapa: 'maps' };
const KIND = { Imagem: 'imagem', Mapa: 'mapa' };

/** Linhas do índice (| Nº | Tipo | Título | Grupo | Quando | Proporção | Cor | Arquivo |). */
const indexRows = (() => {
  const start = lines.findIndex((l) => l.startsWith('| Nº | Tipo'));
  const rows = [];
  for (let i = start + 2; i < lines.length && lines[i].startsWith('|'); i++) rows.push(cells(lines[i]));
  return rows;
})();

function blockOf(title) {
  const start = lines.findIndex((l) => l === `### ${title}`);
  if (start === -1) throw new Error(`Imagem sem seção no guia: ${title}`);
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s|^###\s/.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines.slice(start + 1, end);
}

const field = (block, label) => {
  const re = new RegExp(`^\\|\\s*\\*\\*${label}\\*\\*\\s*\\|\\s*(.*?)\\s*\\|\\s*$`);
  for (const l of block) {
    const m = re.exec(l);
    if (m) return m[1].replace(/`/g, '');
  }
  return '';
};

const paragraph = (block, startsWith) => {
  const i = block.findIndex((l) => l.startsWith(startsWith));
  if (i === -1) return '';
  return block[i].slice(startsWith.length).trim();
};

const quote = (block) => {
  const i = block.findIndex((l) => l.startsWith('**Para ler:**'));
  if (i === -1) return '';
  const out = [];
  for (const l of block.slice(i + 1)) {
    if (l.startsWith('>')) out.push(l.replace(/^>\s?/, ''));
    else if (out.length) break;
  }
  return out.join(' ').trim();
};

const fence = (block) => {
  const a = block.findIndex((l) => l.startsWith('```'));
  if (a === -1) return '';
  const b = block.findIndex((l, i) => i > a && l.startsWith('```'));
  return block.slice(a + 1, b).join('\n');
};

/** Sala (ou grupo) de cada imagem, na forma do nome da pasta do compêndio. */
export const FOLDER_OF_GROUP = {
  'Briefing e handouts': 'Briefing e handouts',
  'Sala 1: O Ferro-Velho Tavares': 'Sala 1: Ferro-Velho Tavares',
  'Sala 2: O Posto Meia-Lua': 'Sala 2: Posto Meia-Lua',
  'Sala 3: A Estrada Sem Luz': 'Sala 3: Estrada Sem Luz',
  'Sala 4: O Túnel Pluvial': 'Sala 4: Túnel Pluvial',
  'Sala 5: A Cela Aberta': 'Sala 5: Cela Aberta e fuga',
  'Itens e Prêmio': 'Itens e Prêmio',
  'Fichas prontas: retratos': 'Retratos dos runners'
};

/** Todas as 46 entradas do índice: 35 imagens, 6 retratos e 5 mapas. */
export const ALL_ART = indexRows.map(([id, tipo, title, group, when, ratio, color, file]) => {
  const isPortrait = id.startsWith('ret-');
  const kind = isPortrait ? 'retrato' : KIND[tipo];
  const block = blockOf(title);
  const base = file.replace(/`/g, '').replace(/\.webp$/, '');
  const rel = `${ASSET_DIR}/${DIR[kind]}/${base}.jpg`;
  const who = field(block, 'Para quem');
  const shortTitle = title.replace(/^(Imagem|Mapa|Retrato) \d+:\s*/, '');
  return {
    id,
    kind,
    number: Number(id.replace(/\D/g, '')),
    title: shortTitle,
    fullTitle: title,
    group,
    folder: FOLDER_OF_GROUP[group],
    when,
    ratio,
    color,
    who,
    careful: /^Só Mestre/i.test(who),
    grid: field(block, 'Grade'),
    description: paragraph(block, '**Descrição da imagem:**') || paragraph(block, '**Descrição do mapa:**'),
    narrative: quote(block),
    prompt: fence(block),
    path: rel,
    hasFile: exists(rel)
  };
});

for (const a of ALL_ART) if (!a.hasFile) throw new Error(`Arquivo de imagem ausente: ${a.path}`);
if (ALL_ART.filter((a) => a.kind !== 'mapa').length !== 41) throw new Error('O pacote deve ter 41 imagens (35 + 6 retratos)');
if (ALL_ART.filter((a) => a.kind === 'mapa').length !== 5) throw new Error('O pacote deve ter 5 mapas');

export const IMAGES = ALL_ART.filter((a) => a.kind !== 'mapa');
export const MAPS = ALL_ART.filter((a) => a.kind === 'mapa');
export const artOf = (id) => {
  const hit = ALL_ART.find((a) => a.id === id);
  if (!hit) throw new Error(`Imagem desconhecida: ${id}`);
  return hit;
};
export const pathOf = (id) => artOf(id).path;

/** Handouts do briefing e da Sala 1 que o Mestre libera aos jogadores (seção 16 das instruções). */
export const HANDOUTS = ['img-01', 'img-02', 'img-03', 'img-04', 'img-05', 'img-09'];
/** Só Mestre: a imagem entrega uma pista ou um segredo. */
export const GM_ONLY = ['img-13', 'img-29', 'img-31'];

/* ------------------------------------------------------------------ */
/* Diários: uma imagem por entrada, com o texto para ler e as notas    */
/* ------------------------------------------------------------------ */

const label = (a) => `${a.kind === 'retrato' ? 'Retrato' : 'Imagem'} ${String(a.number).padStart(2, '0')}. ${a.title}`;

function journal(a, i) {
  const handout = HANDOUTS.includes(a.id);
  const careful = GM_ONLY.includes(a.id) ? `<p><strong>Só Mestre:</strong> esta imagem entrega uma pista ou um segredo. Confira antes de mostrar. ${esc(a.who.replace(/^Só Mestre\s*/i, ''))}</p>` : '';
  const notes =
    careful +
    `<ul><li><strong>Quando mostrar:</strong> ${inline(a.when)}</li>` +
    `<li><strong>Para quem:</strong> ${inline(a.who)}</li>` +
    `<li><strong>Proporção:</strong> ${a.ratio}. <strong>Cor de destaque:</strong> ${inline(a.color)}.</li></ul>` +
    `<p><strong>Na imagem:</strong> ${inline(a.description)}</p>` +
    (handout ? '<p>Handout: o Mestre libera esta imagem aos jogadores no momento indicado (botão Mostrar aos jogadores).</p>' : '');
  const pages = [{ identifier: 'imagem', name: a.title, type: 'image', sort: 100, title: { show: false, level: 1 }, src: a.path, image: { caption: a.title }, ownership: { default: -1 } }];
  if (a.narrative) pages.push(textPage('ler', 'Para ler em voz alta', 200, `<blockquote class="para-ler">${inline(a.narrative)}</blockquote>`, { ownership: { default: GM_ONLY.includes(a.id) ? 0 : -1 } }));
  pages.push(textPage('notas', 'Notas do Mestre', 300, notes, { ownership: { default: 0 } }));
  pages.push(textPage('prompt', 'Prompt para gerar de novo', 400, `<pre>${esc(a.prompt)}</pre>`, { ownership: { default: 0 } }));
  return {
    identifier: a.id,
    name: label(a),
    type: 'JournalEntry',
    img: a.path,
    folder: a.folder,
    sort: (i + 1) * 100,
    pages,
    ownership: { default: handout ? 2 : 0 },
    flags: { [CARGA_ID]: { id: a.id, fonte: 'Pacote de imagens', observer: handout }, sombraneon: { schemaVersion: 1, source: SOURCE, adventure: { id: ADVENTURE_ID, room: 'imagens', image: a.id } } }
  };
}

export const imageJournals = IMAGES.map(journal);
export const imageLabel = label;
export { ICON };
