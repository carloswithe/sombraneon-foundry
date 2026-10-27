import { slug, plain, inlineHtml, loadBook } from '../../tools/lib/book.mjs';

export { slug, plain, inlineHtml };

export const book = loadBook();

export const ICON = (name) => `systems/sombraneon/assets/icons/${name}.svg`;

/** Texto do livro para HTML. */
export const html = (text) => (text ? `<p>${inlineHtml(text)}</p>` : '');

/* Construtores de modificadores (ver docs/spec/02, seção 6). */
const base = (key, mode, value, extra) => ({ key, mode, value: value === undefined ? '' : String(value), when: '', label: '', ...extra });
export const M = (key, value, extra = {}) => base(key, 'add', value, extra);
export const F = (key, extra = {}) => base(key, 'flag', '', extra);
export const ADV = (key, extra = {}) => base(key, 'advantage', '', extra);
export const DIS = (key, extra = {}) => base(key, 'disadvantage', '', extra);
export const SET = (key, value, extra = {}) => base(key, 'set', value, extra);
export const MUL = (key, value, extra = {}) => base(key, 'multiply', value, extra);

export const NO_USES = { max: 0, value: 0, per: '' };
export const uses = (max, per) => ({ max, value: max, per });

/** Monta um documento de Item do sistema com os campos comuns. */
export function item({ type, name, identifier, img, folder, sort, source, description = '', system = {}, flags = {} }) {
  const id = identifier ?? slug(name);
  return {
    identifier: id,
    name,
    type,
    img: img ?? ICON(type),
    folder: folder ?? null,
    sort: sort ?? 0,
    system: { identifier: id, description, source: source ?? '', ...system },
    flags: { sombraneon: { schemaVersion: 1, ...flags } }
  };
}

/** Garante texto com acento do livro; remove marcação de negrito de nomes. */
export const name = (cell) => plain(cell).replace(/:$/, '');

/** Divide "**Nome:** texto" em [nome, texto]. */
export function splitBold(cell) {
  const m = /^\*\*(.+?)\*\*:?\s*(.*)$/s.exec(cell.trim());
  if (!m) return [plain(cell), ''];
  return [m[1].replace(/:$/, '').trim(), m[2].trim()];
}

export const ABILITY_LABEL = { for: 'FOR', des: 'DES', con: 'CON', int: 'INT', sab: 'SAB', car: 'CAR' };
