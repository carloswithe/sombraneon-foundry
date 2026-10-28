import fs from 'node:fs';
import path from 'node:path';
import { ClassicLevel } from 'classic-level';
import { ROOT } from './lib/book.mjs';
import { PACKS, EXPECTED_COUNTS } from '../data/content/index.mjs';
import { makeResolver } from './lib/refs.mjs';

/** Valida contagens, tabelas, imagens, travessões e o conteúdo dos packs compilados. */
const errors = [];
const fail = (m) => errors.push(m);
const packDir = (p) => path.join(ROOT, p.scope === 'system' ? 'systems/sombraneon' : 'modules/sombraneon-compendium', 'packs', p.name);

// 1. contagens esperadas
for (const p of PACKS) {
  if (p.docs.length !== EXPECTED_COUNTS[p.name]) fail(`${p.name}: esperado ${EXPECTED_COUNTS[p.name]}, achei ${p.docs.length}`);
}

// 2. imagens existem
const imgs = new Set();
for (const p of PACKS) {
  for (const d of p.docs) {
    imgs.add(d.img);
    for (const it of d.items ?? []) imgs.add(it.img);
  }
}
for (const img of imgs) {
  if (img?.startsWith('systems/sombraneon/') && !fs.existsSync(path.join(ROOT, 'systems/sombraneon', img.replace('systems/sombraneon/', '')))) fail(`imagem inexistente: ${img}`);
}

// 3. tabelas cobrem todos os valores da fórmula sem lacunas ou sobreposição
const span = { '1d6': [1, 6], '1d8': [1, 8], '1d12': [1, 12], '1d20': [1, 20], '2d6': [2, 12] };
const tables = PACKS.filter((p) => p.docType === 'RollTable').flatMap((p) => p.docs);
for (const t of tables) {
  const [lo, hi] = span[t.formula];
  for (let v = lo; v <= hi; v++) {
    const hits = t.results.filter((r) => v >= r.range[0] && v <= r.range[1]).length;
    if (hits !== 1) fail(`tabela ${t.identifier}: valor ${v} coberto ${hits} vezes`);
  }
}

// 4. referências de grants e pacotes iniciais resolvem
const idx = new Set(PACKS.filter((p) => p.docType === 'Item').flatMap((p) => p.docs.map((d) => `${d.type}:${d.identifier}`)));
for (const p of PACKS.filter((x) => x.name === 'classes' || x.name === 'origens')) {
  for (const d of p.docs) {
    for (const g of d.system.grants) if (g.kind === 'item' && !idx.has(g.ref)) fail(`${d.identifier}: concessão sem destino ${g.ref}`);
    for (const s of d.system.startingPackage ?? []) {
      if (!['weapon', 'armor', 'gear'].some((t) => idx.has(`${t}:${s.ref}`))) fail(`${d.identifier}: pacote inicial sem item ${s.ref}`);
    }
  }
}

// 5. travessões proibidos em textos de interface e conteúdo
const DASH = /[–—]/;
const scan = (dir, exts) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!['node_modules', 'packs', 'fonts', '.build'].includes(e.name)) scan(p, exts);
    } else if (exts.some((x) => p.endsWith(x)) && DASH.test(fs.readFileSync(p, 'utf8'))) fail(`travessão em ${path.relative(ROOT, p)}`);
  }
};
for (const d of ['systems/sombraneon/templates', 'systems/sombraneon/src', 'systems/sombraneon/lang', 'modules/sombraneon-compendium/lang', 'data/content']) scan(path.join(ROOT, d), ['.hbs', '.mjs', '.json']);

// 6. packs compilados: contagem de documentos de topo e embutidos
for (const p of PACKS) {
  const dir = packDir(p);
  if (!fs.existsSync(dir)) {
    fail(`${p.name}: pack não compilado (rode npm run build:packs)`);
    continue;
  }
  const db = new ClassicLevel(dir, { keyEncoding: 'utf8', valueEncoding: 'json' });
  await db.open();
  const keys = await db.keys().all();
  await db.close();
  const top = { Item: '!items!', RollTable: '!tables!', JournalEntry: '!journal!', Actor: '!actors!', Macro: '!macros!' }[p.docType];
  const n = keys.filter((k) => k.startsWith(top)).length;
  if (n !== p.docs.length) fail(`${p.name}: pack tem ${n} documentos, esperado ${p.docs.length}`);
  if (p.docType === 'RollTable') {
    const r = keys.filter((k) => k.startsWith('!tables.results!')).length;
    const want = p.docs.reduce((s, d) => s + d.results.length, 0);
    if (r !== want) fail(`${p.name}: ${r} resultados, esperado ${want}`);
  }
  if (p.docType === 'JournalEntry') {
    const want = p.docs.reduce((n, d) => n + d.pages.length, 0);
    const got = keys.filter((k) => k.startsWith('!journal.pages!')).length;
    if (got !== want) fail(`${p.name}: ${got} páginas, esperado ${want}`);
    if (p.name === 'regras' && got !== 12) fail('regras: o livro deve ter 12 páginas');
  }
}

// 7. manifestos
for (const f of ['systems/sombraneon/system.json', 'modules/sombraneon-compendium/module.json']) {
  const m = JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
  for (const pk of m.packs) if (!fs.existsSync(path.join(ROOT, path.dirname(f), pk.path))) fail(`${f}: pack sem pasta ${pk.path}`);
  // todo pack do conteúdo está declarado no manifesto, e só eles
  const scope = f.startsWith('systems') ? 'system' : 'module';
  const want = PACKS.filter((p) => p.scope === scope).map((p) => p.name).sort();
  const have = m.packs.map((p) => p.name).sort();
  if (want.join() !== have.join()) fail(`${f}: packs declarados diferem do conteúdo (${want.filter((n) => !have.includes(n)).join(', ') || 'nenhum faltando'} / ${have.filter((n) => !want.includes(n)).join(', ') || 'nenhum sobrando'})`);
  for (const folder of m.packFolders ?? []) for (const name of folder.packs ?? []) if (!have.includes(name)) fail(`${f}: pasta "${folder.name}" cita pack inexistente ${name}`);
}

// 8. links @Ref e @Pack do conteúdo resolvem
const resolver = makeResolver(PACKS, (s) => (s === 'system' ? 'sombraneon' : 'sombraneon-compendium'));
for (const p of PACKS) {
  for (const d of p.docs) {
    try {
      resolver.deep(JSON.parse(JSON.stringify(d)), `${p.name}/${d.identifier}`);
    } catch (e) {
      fail(e.message);
    }
  }
}

if (errors.length) {
  console.error(`Validação falhou (${errors.length}):\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(`Validação ok: ${PACKS.length} packs, ${PACKS.reduce((n, p) => n + p.docs.length, 0)} documentos.`);
