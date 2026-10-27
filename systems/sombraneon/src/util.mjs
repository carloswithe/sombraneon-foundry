import { SN } from './config.mjs';

export const ID = SN.id;
export const TEMPLATE_ROOT = `systems/${SN.id}/templates`;
export const tpl = (name) => `${TEMPLATE_ROOT}/${name}`;

/** Texto de interface: SOMBRANEON.<chave>. Nenhuma string de UI fica fora de lang/. */
export const t = (key, data) => (data ? game.i18n.format(`SOMBRANEON.${key}`, data) : game.i18n.localize(`SOMBRANEON.${key}`));

export const tExists = (key) => game.i18n.has(`SOMBRANEON.${key}`);

export const renderTpl = (path, data) => {
  const fn = foundry.applications?.handlebars?.renderTemplate ?? globalThis.renderTemplate;
  return fn(path, data);
};

export const loadTpls = (paths) => {
  const fn = foundry.applications?.handlebars?.loadTemplates ?? globalThis.loadTemplates;
  return fn(paths);
};

export const enrichHtml = async (content, options = {}) => {
  const TE = foundry.applications?.ux?.TextEditor?.implementation ?? globalThis.TextEditor;
  return TE.enrichHTML(content ?? '', { async: true, ...options });
};

export const getDragEventData = (event) => {
  const TE = foundry.applications?.ux?.TextEditor?.implementation ?? globalThis.TextEditor;
  return TE.getDragEventData(event);
};

export const DialogV2 = () => foundry.applications.api.DialogV2;

/** Dados simples de um item para a lógica pura (usa o dado-fonte, arrays em vez de Sets). */
export function snapshotItem(item) {
  const src = item._source ?? item.toObject();
  return {
    id: item.id,
    type: item.type,
    name: item.name,
    img: item.img,
    identifier: src.system?.identifier ?? '',
    system: src.system,
    flags: src.flags ?? {}
  };
}

export const flag = (doc, key, fallback = undefined) => doc.getFlag(ID, key) ?? fallback;

export const activeGM = () => game.users?.activeGM ?? null;

export const isOwnerOrGM = (doc) => game.user.isGM || doc?.isOwner;

export const uuidToDoc = async (uuid) => (uuid ? fromUuid(uuid) : null);

export const uuidSync = (uuid) => {
  try {
    return uuid ? fromUuidSync(uuid) : null;
  } catch {
    return null;
  }
};

export const clone = (o) => foundry.utils.deepClone(o);

export const getProp = (o, p) => foundry.utils.getProperty(o, p);

export const range = (n) => Array.from({ length: n }, (_, i) => i);

export const formatCredits = (n) => `${new Intl.NumberFormat('pt-BR').format(Number(n) || 0)} cr`;

export const rollDie = async (formula) => {
  const roll = new Roll(formula);
  await roll.evaluate();
  return roll;
};

/** Pergunta simples: devolve true/false. */
export const confirm = async (title, content) =>
  DialogV2().confirm({ window: { title }, content: `<p>${content}</p>`, rejectClose: false, modal: true });

export const notify = (type, key, data) => ui.notifications[type](t(key, data), {});

export const slug = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Escapa texto para HTML. */
export const esc = (s) => foundry.utils.escapeHTML ? foundry.utils.escapeHTML(String(s ?? '')) : String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
