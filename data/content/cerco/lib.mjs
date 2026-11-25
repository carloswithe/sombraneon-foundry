import fs from 'node:fs';
import path from 'node:path';
import { ROOT, chapters } from '../../../tools/lib/book.mjs';
// Peças puras (Markdown para HTML, páginas, referências) são as mesmas da Carga Sem Nome.
import { toHtml as baseHtml, inline, textPage, split, ref, esc, clone, pad, exists } from '../carga/lib.mjs';

export { inline, textPage, split, ref, esc, clone, pad, exists };

/**
 * Markdown para HTML. Nesta aventura as notas "Mestre:" e "Segredo (só Mestre):" vêm coladas à linha anterior:
 * separá-las em parágrafo próprio é o que as leva para section.secret (e impede que vazem aos jogadores).
 */
const LABEL_LINE = /\n(?=\*\*(?:Mestre|Segredo|Dados|Traços|Interpretação|Nesta aventura|Moral|Quem responde))/g;
export const toHtml = (text, opts) => baseHtml(String(text).replace(LABEL_LINE, '\n\n'), opts);

/**
 * Aventura "Cerco ao Refúgio": módulo independente (sombraneon-cerco-ao-refugio) para o sistema SombraNeon.
 * Fonte do texto: docs/cerco-ao-refugio.md. Imagens: docs/cerco-ao-refugio-imagens.md.
 * Montagem: docs/cerco-ao-refugio-foundry-instrucoes.md.
 */
export const CERCO_ID = 'sombraneon-cerco-ao-refugio';
export const ADVENTURE_ID = 'cerco-ao-refugio';
export const SOURCE = 'Cerco ao Refúgio';
export const ASSET_DIR = `modules/${CERCO_ID}/assets`;
export const ICON = (name) => `systems/sombraneon/assets/icons/${name}.svg`;

/** O módulo guarda o que é do módulo na própria chave (e o que é do sistema na chave do sistema). */
export const withFlags = (doc, id, fonte, extra = {}, systemExtra = {}) => ({
  ...doc,
  flags: { ...(doc.flags ?? {}), [CERCO_ID]: { id, fonte, ...extra }, sombraneon: { ...(doc.flags?.sombraneon ?? {}), schemaVersion: 1, source: SOURCE, ...systemExtra } }
});

export const flagsOf = (id, fonte, extra = {}, room = id) => ({
  [CERCO_ID]: { id, fonte, ...extra },
  sombraneon: { schemaVersion: 1, source: SOURCE, adventure: { id: ADVENTURE_ID, room } }
});

/* ------------------------------------------------------------------ */
/* Texto da aventura                                                   */
/* ------------------------------------------------------------------ */

export const SOURCE_TEXT = fs.readFileSync(path.join(ROOT, 'docs', 'cerco-ao-refugio.md'), 'utf8').replace(/\r\n/g, '\n');
export const CHAPTERS = chapters(SOURCE_TEXT);
export const chap = (n) => {
  const c = CHAPTERS.find((x) => x.number === n);
  if (!c) throw new Error(`Capítulo ${n} não encontrado em docs/cerco-ao-refugio.md`);
  return c;
};

/** Cabeçalho do arquivo (antes da seção 1): formato, tema, tier e o aviso da reviravolta. */
export const HEADER = SOURCE_TEXT.slice(0, SOURCE_TEXT.search(/^## 1\./m));

/** Remove os comentários HTML (os marcadores ATOR, ITEM, IMG, MAP e FAQ). */
export const noComments = (text) => text.replace(/<!--[\s\S]*?-->\n?/g, '');

/** Blocos delimitados por <!-- KIND id="..." ... --> e <!-- /KIND -->: Map id -> { id, attrs, body }. */
export function marked(kind) {
  const re = new RegExp(`<!-- ${kind} ([^>]*?)-->\\n([\\s\\S]*?)<!-- /${kind} -->`, 'g');
  const out = new Map();
  for (const m of SOURCE_TEXT.matchAll(re)) {
    const attrs = Object.fromEntries([...m[1].matchAll(/([a-z]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
    if (out.has(attrs.id)) throw new Error(`Marcador ${kind} repetido: ${attrs.id}`);
    out.set(attrs.id, { id: attrs.id, attrs, body: m[2].trim() });
  }
  return out;
}

/** Subseção (###) de um capítulo, pelo começo do título. */
export function section(n, startsWith) {
  const hit = split(chap(n).markdown).sections.find((s) => s.title.startsWith(startsWith));
  if (!hit) throw new Error(`Subseção não encontrada: capítulo ${n} / ${startsWith}`);
  return hit;
}

/** Linhas de todas as tabelas Markdown de um texto. */
export function tablesIn(body) {
  const tables = [];
  let cur = null;
  for (const line of body.split('\n')) {
    if (/^\s*\|/.test(line)) {
      if (!cur) {
        cur = { header: null, rows: [] };
        tables.push(cur);
      }
      if (/^[\s|:-]+$/.test(line)) continue;
      const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
      if (!cur.header) cur.header = cells;
      else cur.rows.push(cells);
    } else cur = null;
  }
  return tables;
}
