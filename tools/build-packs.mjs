import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compilePack } from '@foundryvtt/foundryvtt-cli';
import { ROOT } from './lib/book.mjs';
import { docId, subId, folderId } from './lib/ids.mjs';
import { makeResolver } from './lib/refs.mjs';
import { PACKS } from '../data/content/index.mjs';

const SYSTEM_ID = 'sombraneon';
const MODULE_ID = 'sombraneon-compendium';
const CORE_VERSION = '13.351';
const DASH = /[–—]/;

const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const SYSTEM_VERSION = readJson('systems/sombraneon/system.json').version;

const stats = () => ({
  coreVersion: CORE_VERSION,
  systemId: SYSTEM_ID,
  systemVersion: SYSTEM_VERSION,
  createdTime: null,
  modifiedTime: null,
  lastModifiedBy: null,
  compendiumSource: null,
  duplicateSource: null,
  exportSource: null
});

const scopeId = (scope) => (scope === 'system' ? SYSTEM_ID : MODULE_ID);
const destOf = (p) =>
  path.join(ROOT, p.scope === 'system' ? 'systems/sombraneon' : 'modules/sombraneon-compendium', 'packs', p.name);

/** Índice de referências tipo:identifier -> { uuid, name, img, id }. */
function buildIndex() {
  const index = new Map();
  for (const p of PACKS) {
    for (const d of p.docs) {
      const id = docId(p.name, d.identifier);
      const uuid = `Compendium.${scopeId(p.scope)}.${p.name}.${p.docType}.${id}`;
      if (p.docType === 'Item') {
        const key = `${d.type}:${d.identifier}`;
        if (index.has(key)) throw new Error(`Identifier duplicado: ${key}`);
        index.set(key, { uuid, name: d.name, img: d.img, id, pack: p.name });
      }
    }
  }
  return index;
}

function assertNoDashes(value, label) {
  const text = JSON.stringify(value);
  if (DASH.test(text)) {
    const at = text.search(DASH);
    throw new Error(`Travessão proibido em "${label}": ...${text.slice(Math.max(0, at - 30), at + 30)}...`);
  }
}

function itemDoc(pack, d, folders, index, extra = {}) {
  const id = extra._id ?? docId(pack.name, d.identifier);
  const sourceUuid = index.get(`${d.type}:${d.identifier}`)?.uuid;
  return {
    _id: id,
    _key: extra._key ?? `!items!${id}`,
    name: d.name,
    type: d.type,
    img: d.img,
    system: d.system,
    effects: [],
    folder: d.folder ? folders.get(d.folder) : null,
    sort: d.sort ?? 0,
    ownership: { default: 0 },
    flags: d.flags ?? {},
    _stats: stats(),
    ...(extra.keepSource && sourceUuid ? { __sourceUuid: sourceUuid } : {})
  };
}

function tableDoc(pack, d, folders, index) {
  const id = docId(pack.name, d.identifier);
  const results = d.results.map((r, i) => {
    const rid = subId(pack.name, d.identifier, 'result', i);
    const base = {
      _id: rid,
      _key: `!tables.results!${id}.${rid}`,
      weight: 1,
      range: r.range,
      drawn: false,
      flags: {},
      _stats: stats()
    };
    if (r.ref) {
      const hit = index.get(r.ref);
      if (!hit) throw new Error(`Referência não resolvida na tabela ${d.identifier}: ${r.ref}`);
      return { ...base, type: 'document', name: hit.name, description: '', img: hit.img, documentUuid: hit.uuid };
    }
    return {
      ...base,
      type: 'text',
      name: r.name ?? '',
      description: r.text ? `<p>${r.text}</p>` : '',
      img: 'icons/svg/d20-black.svg'
    };
  });
  return {
    _id: id,
    _key: `!tables!${id}`,
    name: d.name,
    img: d.img,
    description: '',
    results,
    formula: d.formula,
    replacement: d.replacement,
    displayRoll: d.displayRoll,
    folder: d.folder ? folders.get(d.folder) : null,
    sort: d.sort ?? 0,
    ownership: { default: 0 },
    flags: { ...(d.flags ?? {}), sombraneon: { ...(d.flags?.sombraneon ?? {}), identifier: d.identifier } },
    _stats: stats()
  };
}

function journalDoc(pack, d, folders) {
  const id = docId(pack.name, d.identifier);
  const pages = d.pages.map((p, i) => {
    const pid = subId(pack.name, d.identifier, 'page', i);
    return {
      _id: pid,
      _key: `!journal.pages!${id}.${pid}`,
      name: p.name,
      type: p.type ?? 'text',
      title: p.title,
      text: p.text ?? {},
      image: p.image ?? {},
      video: { controls: true, volume: 0.5 },
      src: p.src ?? null,
      system: {},
      sort: p.sort,
      ownership: p.ownership ?? { default: -1 },
      flags: {},
      _stats: stats()
    };
  });
  return {
    _id: id,
    _key: `!journal!${id}`,
    name: d.name,
    pages,
    folder: d.folder ? folders.get(d.folder) : null,
    sort: d.sort ?? 0,
    ownership: d.ownership,
    flags: d.flags ?? {},
    _stats: stats()
  };
}

function actorDoc(pack, d, folders, index) {
  const id = docId(pack.name, d.identifier);
  const ids = (d.items ?? []).map((it, i) => subId(pack.name, d.identifier, 'item', i));
  const find = (type) => {
    const i = (d.items ?? []).findIndex((it) => it.type === type);
    return i === -1 ? null : ids[i];
  };
  const placeholders = { '@class': find('class'), '@origin': find('origin'), '@background': find('background'), '@alignment': find('alignment') };
  const items = (d.items ?? []).map((it, i) => {
    const flags = JSON.parse(JSON.stringify(it.flags ?? {}));
    flags.sombraneon ??= {};
    if (flags.sombraneon.grantedBy in placeholders) flags.sombraneon.grantedBy = placeholders[flags.sombraneon.grantedBy];
    const src = index.get(`${it.type}:${it.identifier}`);
    if (src) flags.sombraneon.sourceUuid = src.uuid;
    return {
      _id: ids[i],
      _key: `!actors.items!${id}.${ids[i]}`,
      name: it.name,
      type: it.type,
      img: it.img,
      system: it.system,
      effects: [],
      folder: null,
      sort: it.sort ?? (i + 1) * 100,
      ownership: { default: 0 },
      flags,
      _stats: stats()
    };
  });
  return {
    _id: id,
    _key: `!actors!${id}`,
    name: d.name,
    type: d.type,
    img: d.img,
    system: d.system,
    items,
    effects: [],
    prototypeToken: d.prototypeToken,
    folder: d.folder ? folders.get(d.folder) : null,
    sort: d.sort ?? 0,
    ownership: { default: 0 },
    flags: d.flags ?? {},
    _stats: stats()
  };
}

function sceneDoc(pack, d, folders) {
  const id = docId(pack.name, d.identifier);
  return {
    _id: id,
    _key: `!scenes!${id}`,
    name: d.name,
    active: false,
    navigation: false,
    navOrder: 0,
    navName: '',
    background: { src: d.background },
    thumb: d.img,
    foreground: null,
    width: d.width,
    height: d.height,
    padding: 0,
    backgroundColor: '#000000',
    grid: { type: 0 },
    tokenVision: false,
    fog: { exploration: false },
    tokens: [],
    walls: [],
    lights: [],
    sounds: [],
    notes: [],
    drawings: [],
    tiles: [],
    templates: [],
    regions: [],
    folder: d.folder ? folders.get(d.folder) : null,
    sort: d.sort ?? 0,
    ownership: { default: 0 },
    flags: d.flags ?? {},
    _stats: stats()
  };
}

function macroDoc(pack, d, folders) {
  const id = docId(pack.name, d.identifier);
  return {
    _id: id,
    _key: `!macros!${id}`,
    name: d.name,
    type: d.type,
    scope: d.scope,
    command: d.command,
    img: d.img,
    author: null,
    folder: null,
    sort: d.sort ?? 0,
    ownership: { default: 0 },
    flags: d.flags ?? {},
    _stats: stats()
  };
}

export async function buildPacks({ log = true } = {}) {
  const index = buildIndex();
  const resolver = makeResolver(PACKS, scopeId);
  const tmpRoot = path.join(ROOT, '.build');
  fs.rmSync(tmpRoot, { recursive: true, force: true });
  const summary = [];

  for (const pack of PACKS) {
    const src = path.join(tmpRoot, pack.name);
    fs.mkdirSync(src, { recursive: true });

    const folderNames = [...new Set(pack.docs.map((d) => d.folder).filter(Boolean))];
    const folders = new Map(folderNames.map((n) => [n, folderId(pack.name, n)]));
    const docs = [];
    folderNames.forEach((name, i) => {
      const id = folders.get(name);
      docs.push({
        _id: id,
        _key: `!folders!${id}`,
        name,
        type: pack.docType,
        color: null,
        sorting: pack.folderSorting ?? 'a',
        sort: (i + 1) * 100,
        folder: null,
        description: '',
        flags: {},
        _stats: stats()
      });
    });

    for (const d of pack.docs) {
      let built;
      switch (pack.docType) {
        case 'Item':
          built = itemDoc(pack, d, folders, index);
          break;
        case 'RollTable':
          built = tableDoc(pack, d, folders, index);
          break;
        case 'JournalEntry':
          built = journalDoc(pack, d, folders);
          break;
        case 'Actor':
          built = actorDoc(pack, d, folders, index);
          break;
        case 'Macro':
          built = macroDoc(pack, d, folders);
          break;
        case 'Scene':
          built = sceneDoc(pack, d, folders);
          break;
        default:
          throw new Error(`Tipo de pack desconhecido: ${pack.docType}`);
      }
      built = resolver.deep(built, `${pack.name}/${d.identifier}`);
      assertNoDashes(built, `${pack.name}/${d.identifier}`);
      docs.push(built);
    }

    for (const doc of docs) fs.writeFileSync(path.join(src, `${doc._id}.json`), JSON.stringify(doc, null, 2));

    const dest = destOf(pack);
    fs.rmSync(dest, { recursive: true, force: true });
    await compilePack(src, dest, { log: false });
    summary.push({ pack: pack.name, docs: pack.docs.length, folders: folderNames.length });
    if (log) console.log(`  ${pack.scope.padEnd(6)} ${pack.name.padEnd(16)} ${String(pack.docs.length).padStart(3)} documentos, ${folderNames.length} pastas`);
  }
  fs.rmSync(tmpRoot, { recursive: true, force: true });
  return summary;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log('Gerando compêndios...');
  await buildPacks();
  console.log('Pronto.');
}
