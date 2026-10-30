import fs from 'node:fs';
import path from 'node:path';
import { ROOT, loadBook, slug } from '../../tools/lib/book.mjs';
import { imageSize } from '../../tools/lib/image.mjs';
import { ICON, html } from './lib.mjs';

/**
 * Imagens da aventura "Noite das Máscaras" (docs/noite-das-mascaras-imagens.md): as 24 definições
 * vêm do guia; só entram nos compêndios as que têm o arquivo em assets/noite-das-mascaras/.
 * Para acrescentar uma imagem que faltava, salve-a com o nome certo (veja IMAGE_DEFS) e rode
 * npm run build:packs.
 */
export const ASSET_DIR = 'modules/sombraneon-compendium/assets/noite-das-mascaras';
export const ASSET_URL = ASSET_DIR;

const guide = loadBook(path.join(ROOT, 'docs', 'noite-das-mascaras-imagens.md'));

const ROOMS = [
  [1, 3, 'Abertura e briefing'],
  [4, 6, 'Sala 1: Saguão Vermelho'],
  [7, 10, 'Sala 2: Baile no Anel'],
  [11, 13, 'Sala 3: Vitrine do 60º'],
  [14, 18, 'Sala 4: Corredor dos Rostos'],
  [19, 22, 'Sala 5: Cofre da Diretoria'],
  [23, 24, 'Meia-noite e fuga']
];
const roomOf = (n) => ROOMS.find(([a, b]) => n >= a && n <= b)[2];

/** Imagens que viram cenário (Scene) por serem panoramas de ambiente. Os mapas de pista ficam só como diário. */
const SCENES = [1, 2, 4, 6, 7, 11, 12, 14, 17, 19, 23, 24];

const field = (lines, label) => {
  const re = new RegExp(`^\\|\\s*\\*\\*${label}\\*\\*\\s*\\|\\s*(.*?)\\s*\\|\\s*$`);
  for (const l of lines) {
    const m = re.exec(l);
    if (m) return m[1].replace(/`/g, '');
  }
  return '';
};

const afterLabel = (lines, label) => {
  const i = lines.findIndex((l) => l.startsWith(`**${label}`));
  if (i === -1) return '';
  return lines.slice(i + 1).find((l) => l.trim()) ?? '';
};

function parse(n) {
  const section = guide.section(String(n));
  const lines = section.lines;
  const narrIndex = lines.findIndex((l) => l.startsWith('**Texto narrativo**'));
  const narrative = lines
    .slice(narrIndex + 1)
    .filter((l) => l.startsWith('>'))
    .map((l) => l.replace(/^>\s?/, ''))
    .join(' ')
    .trim();
  const fence = lines.findIndex((l) => l.startsWith('```'));
  const prompt = lines.slice(fence + 1, lines.findIndex((l, i) => i > fence && l.startsWith('```'))).join('\n');
  const tip = lines.find((l) => l.startsWith('**Dica do Mestre:**'))?.replace(/^\*\*Dica do Mestre:\*\*\s*/, '') ?? '';
  const who = field(lines, 'Para quem');
  const file = `${String(n).padStart(2, '0')}-${slug(section.title)}.jpg`;
  return {
    number: n,
    identifier: `imagem-${String(n).padStart(2, '0')}`,
    title: section.title,
    room: roomOf(n),
    when: field(lines, 'Quando mostrar'),
    who,
    careful: /cuidado|Só Mestre/i.test(who),
    ratio: field(lines, 'Proporção'),
    color: field(lines, 'Cor de destaque'),
    description: afterLabel(lines, 'Descrição da imagem'),
    narrative,
    prompt,
    tip,
    file,
    path: `${ASSET_URL}/${file}`,
    scene: SCENES.includes(n)
  };
}

/** As 24 imagens do guia, com ou sem arquivo. */
export const IMAGE_DEFS = Array.from({ length: 24 }, (_, i) => parse(i + 1));

const exists = (def) => fs.existsSync(path.join(ROOT, def.path));

/** As imagens que têm arquivo. */
export const IMAGES = IMAGE_DEFS.filter(exists);
export const MISSING_IMAGES = IMAGE_DEFS.filter((d) => !exists(d));

/** Caminho da imagem n, ou undefined se o arquivo ainda não existe. */
export const imageOf = (n) => IMAGES.find((d) => d.number === n)?.path;

/* ------------------------------------------------------------------ */
/* Diários: uma imagem por entrada, com texto para ler e notas         */
/* ------------------------------------------------------------------ */

const page = (identifier, name, sort, content) => ({
  identifier,
  name,
  type: 'text',
  sort,
  title: { show: true, level: 1 },
  text: { format: 1, content },
  ownership: { default: 0 }
});

const pad = (n) => String(n).padStart(2, '0');

function journal(def, sort) {
  const careful = def.careful ? `<p><strong>Cuidado:</strong> ${html(def.who).replace(/<\/?p>/g, '')}. Confira antes de mostrar.</p>` : '';
  const notes =
    careful +
    `<ul><li><strong>Quando mostrar:</strong> ${html(def.when).replace(/<\/?p>/g, '')}</li>` +
    `<li><strong>Para quem:</strong> ${html(def.who).replace(/<\/?p>/g, '')}</li>` +
    `<li><strong>Proporção:</strong> ${def.ratio}. <strong>Cor de destaque:</strong> ${def.color}.</li></ul>` +
    html(`**Na imagem:** ${def.description}`) +
    (def.tip ? html(`**Dica do Mestre:** ${def.tip}`) : '');
  return {
    identifier: def.identifier,
    name: `${pad(def.number)}. ${def.title}`,
    type: 'JournalEntry',
    img: ICON('journal'),
    folder: def.room,
    sort,
    pages: [
      { identifier: 'imagem', name: def.title, type: 'image', sort: 100, title: { show: false, level: 1 }, src: def.path, image: { caption: def.title } },
      page('ler', 'Para ler em voz alta', 200, `<blockquote>${html(def.narrative)}</blockquote>`),
      page('notas', 'Notas do Mestre', 300, notes),
      page('prompt', 'Prompt para gerar de novo', 400, `<pre>${def.prompt.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</pre>`)
    ],
    ownership: { default: 0 },
    flags: { sombraneon: { schemaVersion: 1, source: 'Noite das Máscaras, imagens', adventure: { id: 'noite-das-mascaras', room: 'imagens', image: def.number } } }
  };
}

export const imageJournals = IMAGES.map((def, i) => journal(def, (i + 1) * 100));

/* ------------------------------------------------------------------ */
/* Cenários: imagens de ambiente prontas para ativar como pano de fundo */
/* ------------------------------------------------------------------ */

export const imageScenes = IMAGES.filter((d) => d.scene).map((def, i) => {
  const { width, height } = imageSize(path.join(ROOT, def.path));
  return {
    identifier: `cena-${pad(def.number)}`,
    name: `${pad(def.number)}. ${def.title}`,
    type: 'Scene',
    img: def.path,
    folder: def.room,
    sort: (i + 1) * 100,
    background: def.path,
    width,
    height,
    flags: { sombraneon: { schemaVersion: 1, source: 'Noite das Máscaras, imagens', adventure: { id: 'noite-das-mascaras', room: 'cenas', image: def.number } } }
  };
});
