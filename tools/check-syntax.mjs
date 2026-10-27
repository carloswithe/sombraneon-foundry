import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import Handlebars from 'handlebars';
import { ROOT } from './lib/book.mjs';

/** Verifica a sintaxe de todo .mjs, .hbs e .json dos pacotes (não depende do Foundry). */
const roots = ['systems/sombraneon', 'modules/sombraneon-compendium', 'tools', 'data', 'tests'].map((p) => path.join(ROOT, p));
const skip = new Set(['node_modules', 'packs', 'fonts', '.build']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (skip.has(e.name)) return [];
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

let errors = 0;
let count = 0;
for (const file of roots.flatMap(walk)) {
  const rel = path.relative(ROOT, file);
  try {
    if (file.endsWith('.mjs')) {
      const r = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
      if (r.status !== 0) throw new Error(r.stderr.trim().split('\n').slice(0, 4).join(' | '));
    } else if (file.endsWith('.hbs')) {
      Handlebars.precompile(fs.readFileSync(file, 'utf8'));
    } else if (file.endsWith('.json')) {
      JSON.parse(fs.readFileSync(file, 'utf8'));
    } else continue;
    count += 1;
  } catch (err) {
    errors += 1;
    console.error(`ERRO ${rel}: ${err.message}`);
  }
}
console.log(errors ? `${errors} arquivo(s) com erro.` : `Sintaxe ok em ${count} arquivos.`);
process.exit(errors ? 1 : 0);
