import { inlineHtml, plain } from '../../../tools/lib/book.mjs';
import { ICON, CERCO_ID, SOURCE, ADVENTURE_ID, section, tablesIn } from './lib.mjs';

/** Tabelas de rolagem: as complicações de cada sala (d6), o Alerta e as Rotas (consulta). Texto da aventura. */
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
  flags: { [CERCO_ID]: { id: identifier, fonte: name }, sombraneon: { schemaVersion: 1, source: SOURCE, adventure: { id: ADVENTURE_ID, room: 'tabelas' } } }
});

/** Complicações: | d6 | Complicação | Efeito | Saída | */
const complication = (room, chapter) => {
  const table = tablesIn(section(chapter, 'Complicações').body)[0];
  if (table.rows.length !== 6) throw new Error(`Sala ${room}: a tabela de complicações deve ter 6 linhas`);
  return mk(
    `complicacoes-sala-${room}`,
    `Complicações: Sala ${room}`,
    '1d6',
    table.rows.map((r) => ({ range: [Number(r[0]), Number(r[0])], name: plain(r[1]), text: `${rich(r[2])} <strong>Saída:</strong> ${rich(r[3])}` })),
    'Complicações'
  );
};

export const complicationTables = [complication(1, 4), complication(2, 5), complication(3, 6), complication(4, 7), complication(5, 8)];

/** Textos do Alerta (0 a 4), da tabela do capítulo 2. */
export const ALERT_ROWS = tablesIn(section(2, 'O Alerta').body)[0].rows;
if (ALERT_ROWS.length !== 5) throw new Error('A tabela do Alerta deve ter 5 linhas (níveis 0 a 4)');

export const alertTable = mk(
  'alerta',
  'Alerta: efeitos por nível (consulta, 1d4)',
  '1d4',
  ALERT_ROWS.slice(1).map((r) => ({ range: [Number(r[0]), Number(r[0])], name: `Alerta ${r[0]}`, text: rich(r[1]) })),
  'Consulta'
);

/** As três rotas da Sala 5: | Rota | Tempo base | Status | Chega a |, com a saída às 04:30. */
const routeRows = tablesIn(section(8, 'O desafio').body)[0] && tablesIn(section(8, 'O desafio').body).find((t) => t.header[0] === 'Rota');
if (routeRows?.rows.length !== 3) throw new Error('A tabela das rotas deve ter 3 linhas');
export const routeTable = mk(
  'rotas',
  'Rotas: tempo, estado e chegada (consulta, 1d3)',
  '1d3',
  routeRows.rows.map((r, i) => {
    const minutes = Number(/\d+/.exec(r[1])[0]);
    const at = 4 * 60 + 30 + minutes;
    return {
      range: [i + 1, i + 1],
      name: plain(r[0]),
      text: `<strong>Tempo base:</strong> ${rich(r[1])}. <strong>Estado:</strong> ${rich(r[2])}. <strong>Chega a:</strong> ${rich(r[3])}. Saindo às 04:30 e sem falhas: ${String(Math.floor(at / 60)).padStart(2, '0')}:${String(at % 60).padStart(2, '0')}.`
    };
  }),
  'Consulta'
);

export const cercoTables = [...complicationTables, alertTable, routeTable];
