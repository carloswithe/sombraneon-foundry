import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/book.mjs';

/**
 * Confere se toda chave de interface usada no código e nos templates existe em lang/pt-BR.json.
 * Chaves dinâmicas (template literals) são checadas por prefixo e conjunto de valores.
 */
const SYS = path.join(ROOT, 'systems', 'sombraneon');
const lang = JSON.parse(fs.readFileSync(path.join(SYS, 'lang', 'pt-BR.json'), 'utf8'));
const flat = new Set();
(function walk(o, p = '') {
  for (const [k, v] of Object.entries(o)) {
    const key = p ? `${p}.${k}` : k;
    if (v && typeof v === 'object') walk(v, key);
    else flat.add(key);
  }
})(lang.SOMBRANEON);

function files(dir, exts) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? files(p, exts) : exts.some((x) => p.endsWith(x)) ? [p] : [];
  });
}

const used = new Map();
const add = (key, file) => {
  if (!used.has(key)) used.set(key, new Set());
  used.get(key).add(path.relative(ROOT, file));
};
const dynamic = new Map();

for (const file of files(SYS, ['.mjs', '.hbs'])) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/SOMBRANEON\.([A-Za-z0-9_.]+)/g)) {
    if (!m[1].endsWith('.')) add(m[1], file);
  }
  if (file.endsWith('.mjs')) {
    for (const m of text.matchAll(/\bt\(\s*'([A-Za-z0-9_.]+)'/g)) add(m[1], file);
    for (const m of text.matchAll(/notify\(\s*'[a-z]+',\s*'([A-Za-z0-9_.]+)'/g)) add(m[1], file);
    for (const m of text.matchAll(/\bt\(\s*`([A-Za-z0-9_.]+)\.\$\{/g)) {
      if (!dynamic.has(m[1])) dynamic.set(m[1], new Set());
      dynamic.get(m[1]).add(path.relative(ROOT, file));
    }
  }
}

const missing = [...used.keys()].filter((k) => !flat.has(k)).sort();
const prefixes = [...dynamic.keys()].filter((p) => ![...flat].some((k) => k.startsWith(`${p}.`))).sort();

if (missing.length) {
  console.log(`Chaves ausentes (${missing.length}):`);
  for (const k of missing) console.log(`  ${k}   <- ${[...used.get(k)].join(', ')}`);
}
if (prefixes.length) {
  console.log(`Prefixos dinâmicos sem nenhuma chave (${prefixes.length}):`);
  for (const p of prefixes) console.log(`  ${p}.*   <- ${[...dynamic.get(p)].join(', ')}`);
}
if (!missing.length && !prefixes.length) console.log(`Idioma ok: ${used.size} chaves estáticas e ${dynamic.size} prefixos dinâmicos conferidos.`);
process.exit(missing.length || prefixes.length ? 1 : 0);
