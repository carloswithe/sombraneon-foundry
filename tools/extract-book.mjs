import fs from 'node:fs';
import path from 'node:path';
import { loadBook, ROOT } from './lib/book.mjs';

/** Extrai a estrutura do livro (seções, tabelas e marcadores) para data/extracted/book.json. */
const book = loadBook();
const out = Object.fromEntries(Object.entries(book.sections).map(([n, s]) => [n, { title: s.title, tables: s.tables, bullets: s.bullets }]));
fs.mkdirSync(path.join(ROOT, 'data', 'extracted'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'data', 'extracted', 'book.json'), JSON.stringify(out, null, 2));
console.log(`${Object.keys(out).length} seções extraídas.`);
