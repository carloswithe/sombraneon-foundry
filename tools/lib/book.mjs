import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const BOOK_PATH = path.join(ROOT, 'docs', 'sombraneon.md');

export const slug = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Remove marcação de negrito/itálico/código de uma célula. */
export const plain = (s) =>
  String(s ?? '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .trim();

/** Markdown inline para HTML (negrito, itálico). */
export const inlineHtml = (s) => marked.parseInline(String(s ?? ''));

function splitRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim());
}

/**
 * Lê o livro (Markdown) e produz capítulos, seções, tabelas e marcadores.
 * Não interpreta regras: só estrutura o texto.
 */
export function parseBook(md) {
  const lines = md.split(/\r?\n/);
  const sections = {};
  let cur = null;
  let label = '';
  let table = null;

  const open = (number, title, level) => {
    cur = { number, title, level, lines: [], tables: [], bullets: {}, raw: '' };
    sections[number] = cur;
    label = '';
    table = null;
  };

  for (const line of lines) {
    const h = /^(#{2,3})\s+(\d+(?:\.\d+)?)\.?\s+(.*)$/.exec(line);
    if (h) {
      open(h[2], h[3].trim(), h[1].length);
      continue;
    }
    const hSimple = /^(#{2,3})\s+(.*)$/.exec(line);
    if (hSimple && !/^##\s+Sumário/.test(line)) {
      // cabeçalhos sem número (Sumário) não abrem seção
    }
    if (!cur) continue;
    cur.lines.push(line);
    const lab = /^\*\*([^*]+)\*\*\s*$/.exec(line.trim());
    if (lab) {
      label = lab[1].trim();
      table = null;
      continue;
    }
    if (/^\s*\|/.test(line)) {
      if (!table) {
        table = { label, header: splitRow(line), rows: [], _sep: false };
        cur.tables.push(table);
      } else if (!table._sep && /^[\s|:-]+$/.test(line)) {
        table._sep = true;
      } else {
        table.rows.push(splitRow(line));
      }
      continue;
    }
    table = null;
    const b = /^\s*-\s+\*\*(.+?)\*\*\s*(.*)$/.exec(line);
    if (b) {
      let name = b[1].trim().replace(/:$/, '');
      let rest = b[2].trim().replace(/^:\s*/, '');
      cur.bullets[name] = rest;
    }
  }
  for (const s of Object.values(sections)) {
    for (const t of s.tables) delete t._sep;
    s.raw = s.lines.join('\n').trim();
    s.text = s.raw;
  }
  return { sections };
}

export function loadBook(file = BOOK_PATH) {
  const md = fs.readFileSync(file, 'utf8');
  const book = parseBook(md);
  book.markdown = md;
  book.section = (n) => {
    const s = book.sections[n];
    if (!s) throw new Error(`Seção ${n} não encontrada no livro`);
    return s;
  };
  /** Tabela de uma seção, opcionalmente pelo rótulo em negrito que a antecede. */
  book.table = (n, labelOrIndex = 0) => {
    const s = book.section(n);
    const t = typeof labelOrIndex === 'number' ? s.tables[labelOrIndex] : s.tables.find((x) => x.label === labelOrIndex);
    if (!t) throw new Error(`Tabela ${labelOrIndex} não encontrada na seção ${n}`);
    return t;
  };
  book.bullet = (n, name) => {
    const s = book.section(n);
    if (!(name in s.bullets)) throw new Error(`Item "${name}" não encontrado na seção ${n}`);
    return s.bullets[name];
  };
  return book;
}

/** Capítulos (## N.) como Markdown completo, para o Journal. */
export function chapters(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let cur = null;
  for (const line of lines) {
    const h = /^##\s+(\d+)\.\s+(.*)$/.exec(line);
    if (h) {
      cur = { number: Number(h[1]), title: h[2].trim(), lines: [] };
      out.push(cur);
      continue;
    }
    if (cur && !/^---\s*$/.test(line)) cur.lines.push(line);
  }
  return out.map((c) => ({ ...c, markdown: c.lines.join('\n').trim() }));
}
