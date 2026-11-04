import { inlineHtml, plain } from '../../../tools/lib/book.mjs';
import { ICON, CARGA_ID, SOURCE, ADVENTURE_ID, section } from './lib.mjs';

/**
 * Tabelas de rolagem (RollTable): as complicações de cada sala (d6), o Alerta (consulta, 1d4), as
 * resoluções da perseguição e o destino de Daigo. O texto é o da aventura, lido das tabelas Markdown.
 */
const rowsOf = (body) => {
  const tables = [];
  let cur = null;
  for (const line of body.split('\n')) {
    if (/^\s*\|/.test(line)) {
      if (!cur) {
        cur = { header: null, rows: [] };
        tables.push(cur);
      }
      const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
      if (/^[\s|:-]+$/.test(line)) continue;
      if (!cur.header) cur.header = cells;
      else cur.rows.push(cells);
    } else cur = null;
  }
  return tables;
};

const strip = (cell) => plain(cell);
const rich = (cell) => inlineHtml(cell).replace(/^<p>|<\/p>$/g, '');

const mk = (identifier, name, formula, results, folder) => ({
  identifier,
  name,
  type: 'RollTable',
  img: ICON('table'),
  folder,
  sort: 0,
  formula,
  replacement: true,
  displayRoll: true,
  results,
  flags: { [CARGA_ID]: { id: identifier, fonte: name }, sombraneon: { schemaVersion: 1, source: SOURCE, adventure: { id: ADVENTURE_ID, room: 'tabelas' } } }
});

/** Complicações: | d6 | Complicação | Efeito | Saída | */
const complication = (identifier, name, chapter, title, folder) => {
  const table = rowsOf(section(chapter, title).body)[0];
  if (table.rows.length !== 6) throw new Error(`${identifier}: a tabela de complicações deve ter 6 linhas`);
  return mk(
    identifier,
    name,
    '1d6',
    table.rows.map((r) => ({ range: [Number(r[0]), Number(r[0])], name: strip(r[1]), text: `${rich(r[2])} <strong>Saída:</strong> ${rich(r[3])}` })),
    folder
  );
};

const F = 'Complicações';
export const complicationTables = [
  complication('complicacoes-sala-1', 'Sala 1: Complicações (d6)', 4, 'Complicações', F),
  complication('complicacoes-sala-2', 'Sala 2: Complicações (d6)', 5, 'Complicações', F),
  complication('complicacoes-sala-3', 'Sala 3: Complicações (d6)', 6, 'Complicações', F),
  complication('eventos-do-combate-sala-4', 'Sala 4: Eventos do combate (d6, nas rodadas pares)', 7, 'Complicações (eventos do combate)', F),
  complication('complicacoes-da-fuga-sala-5', 'Sala 5: Complicações da fuga (d6, inclui a voz de Voss)', 8, 'Complicações (durante a fuga)', F)
];

/** O Alerta (0 a 4): consulta por nível, sem sorteio automático. */
const alertRows = rowsOf(section(2, 'O Alerta').body)[0].rows;
if (alertRows.length !== 4) throw new Error('A tabela do Alerta deve ter 4 linhas (níveis 1 a 4)');
export const alertTable = mk(
  'alerta',
  'Alerta: efeitos por nível (consulta, 1d4)',
  '1d4',
  alertRows.map((r) => ({ range: [Number(r[0]), Number(r[0])], name: `Alerta ${r[0]}`, text: rich(r[1]) })),
  'Alerta e Sala 5'
);

/** As resoluções da perseguição: os três lances. */
const lances = rowsOf(section(8, '4. A fuga em três lances').body).find((t) => /^Lance/.test(t.header[0]));
if (lances?.rows.length !== 3) throw new Error('A perseguição deve ter 3 lances');
const chase = mk(
  'resolucoes-da-perseguicao',
  'Resoluções da perseguição: os três lances (consulta, 1d3)',
  '1d3',
  lances.rows.map((r, i) => ({ range: [i + 1, i + 1], name: strip(r[0]), text: `${rich(r[1])}. <strong>Obstáculo:</strong> ${rich(r[2])} <strong>Teste:</strong> ${rich(r[3])} <strong>Efeito de falha:</strong> ${rich(r[4])}` })),
  'Alerta e Sala 5'
);

/** O destino de Daigo (a segunda tabela da seção "O destino"). */
const daigo = rowsOf(section(8, '5. O destino').body).find((t) => /^Escolha/.test(t.header[0]) && t.header.length === 2);
if (daigo?.rows.length !== 3) throw new Error('O destino de Daigo deve ter 3 escolhas');
const fate = mk(
  'destino-de-daigo',
  'Destino de Daigo (consulta, 1d3)',
  '1d3',
  daigo.rows.map((r, i) => ({ range: [i + 1, i + 1], name: strip(r[0]), text: rich(r[1]) })),
  'Alerta e Sala 5'
);

export const extraTables = [alertTable, chase, fate];
export const cargaTables = [...complicationTables, ...extraTables];
