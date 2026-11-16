// Lista o que ainda falta gerar: catálogo menos o que já está em sombraneon-arte/mapa-ids.txt.
// Uso: node tools/art/remaining.mjs [quantidade]  (imprime pack/id, assunto, foco e cor)
import fs from 'node:fs';
import { flatCatalog } from '../../data/art/catalog.mjs';
const map = 'C:/Users/pichau/Pessoal/sombraneon-arte/mapa-ids.txt';
const done = new Set(fs.readFileSync(map, 'utf8').split('\n').filter(Boolean).map((l) => l.split(' ')[1]));
const left = flatCatalog().filter((e) => !done.has(`${e.pack}/${e.id}`));
console.log(`feitos ${done.size}, faltam ${left.length}`);
for (const e of left.slice(0, Number(process.argv[2] ?? 16))) console.log(`${e.pack}/${e.id} | ${e.kind} | ${e.spot} | ${e.subject} | ${e.focus}`);
