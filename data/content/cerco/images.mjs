import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../../../tools/lib/book.mjs';
import { ASSET_DIR, CERCO_ID, flagsOf, esc, exists, inline, textPage } from './lib.mjs';

/**
 * Imagens e mapas (docs/cerco-ao-refugio-imagens.md): 25 imagens, 6 retratos e 6 mapas.
 * Os arquivos usam exatamente o nome sugerido no índice, em assets/img, assets/portraits e assets/maps.
 */
const guide = fs.readFileSync(path.join(ROOT, 'docs', 'cerco-ao-refugio-imagens.md'), 'utf8').replace(/\r\n/g, '\n');
const lines = guide.split('\n');

const cells = (line) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim());

const DIR = { imagem: 'img', retrato: 'portraits', mapa: 'maps' };

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
  const l = block.find((x) => x.startsWith(startsWith));
  return l ? l.slice(startsWith.length).trim() : '';
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

export const ALL_ART = indexRows.map(([id, , title, group, when, ratio, color, file]) => {
  const kind = id.startsWith('ret-') ? 'retrato' : id.startsWith('mapa-') ? 'mapa' : 'imagem';
  const block = blockOf(title);
  const rel = `${ASSET_DIR}/${DIR[kind]}/${file.replace(/`/g, '')}`;
  const who = field(block, 'Para quem');
  return {
    id,
    kind,
    number: Number(id.replace(/\D/g, '')),
    title: title.replace(/^(Imagem|Mapa|Retrato) \d+:\s*/, ''),
    group,
    folder: group,
    when,
    ratio,
    color,
    who,
    grid: field(block, 'Grade'),
    description: paragraph(block, '**Descrição da imagem:**') || paragraph(block, '**Descrição do mapa:**'),
    narrative: quote(block),
    prompt: fence(block),
    path: rel,
    hasFile: exists(rel)
  };
});

for (const a of ALL_ART) if (!a.hasFile) throw new Error(`Arquivo de imagem ausente: ${a.path}`);

export const IMAGES = ALL_ART.filter((a) => a.kind !== 'mapa');
export const MAPS = ALL_ART.filter((a) => a.kind === 'mapa');
export const artOf = (id) => {
  const hit = ALL_ART.find((a) => a.id === id);
  if (!hit) throw new Error(`Imagem desconhecida: ${id}`);
  return hit;
};

/** Handouts liberados aos jogadores (instruções, seção 16): img-01 a img-04 e os seis retratos. */
export const HANDOUTS = ['img-01', 'img-02', 'img-03', 'img-04', 'ret-01', 'ret-02', 'ret-03', 'ret-04', 'ret-05', 'ret-06'];
/** Só Mestre: a imagem entrega uma pista ou um segredo. */
export const GM_ONLY = ['img-11'];

/* ------------------------------------------------------------------ */
/* Diários: uma imagem por entrada, com o texto para ler e as notas    */
/* ------------------------------------------------------------------ */

const label = (a) => `${a.kind === 'retrato' ? 'Retrato' : 'Imagem'} ${String(a.number).padStart(2, '0')}. ${a.title}`;

function journal(a, i) {
  const handout = HANDOUTS.includes(a.id);
  const gm = GM_ONLY.includes(a.id);
  const notes =
    (gm ? '<p><strong>Só Mestre:</strong> esta imagem entrega uma pista ou um segredo. Confira antes de mostrar.</p>' : '') +
    `<ul><li><strong>Quando mostrar:</strong> ${inline(a.when)}</li>` +
    `<li><strong>Para quem:</strong> ${inline(a.who)}</li>` +
    `<li><strong>Proporção:</strong> ${a.ratio}. <strong>Cor de destaque:</strong> ${inline(a.color)}.</li></ul>` +
    `<p><strong>Na imagem:</strong> ${inline(a.description)}</p>` +
    (handout ? '<p>Handout: os jogadores têm acesso de observador. Mostre no momento indicado (botão Mostrar aos jogadores).</p>' : '');
  const pages = [{ identifier: 'imagem', name: a.title, type: 'image', sort: 100, title: { show: false, level: 1 }, src: a.path, image: { caption: a.title }, ownership: { default: -1 } }];
  if (a.narrative) pages.push(textPage('ler', 'Para ler em voz alta', 200, `<blockquote class="para-ler">${inline(a.narrative)}</blockquote>`, { ownership: { default: gm ? 0 : -1 } }));
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
    flags: flagsOf(a.id, 'Pacote de imagens', { observer: handout }, 'imagens')
  };
}

export const imageJournals = IMAGES.map(journal);
export { CERCO_ID };
