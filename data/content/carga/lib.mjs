import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { ROOT, chapters, inlineHtml } from '../../../tools/lib/book.mjs';

/**
 * Aventura "Carga Sem Nome": módulo independente (sombraneon-carga-sem-nome) para o sistema SombraNeon.
 * Fonte do texto: docs/carga-sem-nome.md. Imagens: docs/carga-sem-nome-imagens.md. Montagem: docs/carga-sem-nome-foundry-instrucoes.md.
 */
export const CARGA_ID = 'sombraneon-carga-sem-nome';
export const ADVENTURE_ID = 'carga-sem-nome';
export const SOURCE = 'Carga Sem Nome';
export const ASSET_DIR = `modules/${CARGA_ID}/assets`;
export const ICON = (name) => `systems/sombraneon/assets/icons/${name}.svg`;

/** Flags de origem: a marca do módulo (id e seção da aventura) e a do sistema (versão do esquema). */
export const flagsOf = (id, fonte, extra = {}) => ({
  [CARGA_ID]: { id, fonte, ...extra },
  sombraneon: { schemaVersion: 1, source: SOURCE }
});

/** O módulo guarda o que é do módulo na própria chave (e o que é do sistema na chave do sistema). */
export const withFlags = (doc, id, fonte, extra = {}, systemExtra = {}) => ({
  ...doc,
  flags: { ...(doc.flags ?? {}), [CARGA_ID]: { id, fonte, ...extra }, sombraneon: { ...(doc.flags?.sombraneon ?? {}), schemaVersion: 1, source: SOURCE, ...systemExtra } }
});

export const clone = (o) => JSON.parse(JSON.stringify(o));
export const pad = (n) => String(n).padStart(2, '0');
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ------------------------------------------------------------------ */
/* Texto da aventura                                                   */
/* ------------------------------------------------------------------ */

const raw = fs.readFileSync(path.join(ROOT, 'docs', 'carga-sem-nome.md'), 'utf8').replace(/\r\n/g, '\n');
export const SOURCE_TEXT = raw;
export const CHAPTERS = chapters(raw);
export const chap = (n) => {
  const c = CHAPTERS.find((x) => x.number === n);
  if (!c) throw new Error(`Capítulo ${n} não encontrado em docs/carga-sem-nome.md`);
  return c;
};

/** Cabeçalho do arquivo (antes da seção 1): formato, tema, tier e o aviso da reviravolta. */
export const HEADER = raw.slice(0, raw.search(/^## 1\./m));

/** Divide um texto em { intro, sections: [{ title, body }] } pelos títulos do nível dado (### por padrão). */
export function split(markdown, level = 3) {
  const re = new RegExp(`^#{${level}}\\s+(.*)$`);
  const lines = markdown.split('\n');
  const sections = [];
  const intro = [];
  let cur = null;
  for (const line of lines) {
    const m = re.exec(line);
    if (m) {
      cur = { title: m[1].trim(), lines: [] };
      sections.push(cur);
    } else if (cur) cur.lines.push(line);
    else intro.push(line);
  }
  return { intro: intro.join('\n').trim(), sections: sections.map((s) => ({ title: s.title, body: s.lines.join('\n').trim() })) };
}

/** Subseção (###) de um capítulo, pelo começo do título. */
export function section(n, startsWith) {
  const hit = split(chap(n).markdown).sections.find((s) => s.title.startsWith(startsWith));
  if (!hit) throw new Error(`Subseção não encontrada: capítulo ${n} / ${startsWith}`);
  return hit;
}

/* ------------------------------------------------------------------ */
/* Markdown para HTML do Foundry                                       */
/* ------------------------------------------------------------------ */

marked.setOptions({ gfm: true, breaks: true });

/**
 * Convenções do módulo (docs/carga-sem-nome-foundry-instrucoes.md, seção 9):
 * - blockquote vira a caixa "Para ler" (classe para-ler);
 * - parágrafos "Mestre:" e "Segredo (só Mestre)" viram <section class="secret">, de modo que
 *   mesmo páginas legíveis pelos jogadores não vazem;
 * - blocos de código viram <pre>; tabelas ficam como <table>.
 */
export function toHtml(text, { secret = false } = {}) {
  let out = marked.parse(String(text).trim());
  out = out.replace(/<blockquote>/g, '<blockquote class="para-ler">');
  out = out.replace(/<p>(<strong>(?:Mestre|Segredo \(só Mestre\)):?<\/strong>[\s\S]*?)<\/p>/g, '<section class="secret"><p>$1</p></section>');
  return secret ? `<section class="secret">${out}</section>` : out;
}

/** Texto corrido curto (uma linha) em HTML. */
export const inline = (text) => inlineHtml(text);

/** Página de texto de um diário. */
export const textPage = (identifier, name, sort, content, { ownership } = {}) => ({
  identifier,
  name,
  type: 'text',
  sort,
  title: { show: true, level: 1 },
  text: { format: 1, content },
  ...(ownership ? { ownership } : { ownership: { default: 0 } })
});

/** Links @Ref para listas "Nesta sala". */
export const ref = (target, label) => (label ? `@Ref[${target}]{${label}}` : `@Ref[${target}]`);

export const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

/** Blocos "#### Título" de um capítulo: { title, text }. Um título ### ou ## encerra o bloco. */
export function blocks(markdown) {
  const out = [];
  let cur = null;
  for (const line of markdown.split('\n')) {
    const h = /^####\s+(.*)$/.exec(line);
    if (h) {
      cur = { title: h[1].trim(), lines: [] };
      out.push(cur);
    } else if (/^#{1,3}\s/.test(line)) cur = null;
    else if (cur) cur.lines.push(line);
  }
  return out.map((b) => ({ title: b.title, text: b.lines.join('\n').trim() }));
}

/** Bloco do capítulo n pelo começo do título. */
export function block(n, startsWith) {
  const hit = blocks(chap(n).markdown).find((b) => b.title.startsWith(startsWith));
  if (!hit) throw new Error(`Bloco não encontrado: capítulo ${n} / ${startsWith}`);
  return hit;
}
