import { book, html, splitBold, plain, slug, ICON } from './lib.mjs';
import { classList, alignmentList, talentSlots } from './features.mjs';

/**
 * RollTables do livro. Cada resultado tem `range`, `ref` (tipo:identifier, resolvido no build)
 * ou texto. Ver docs/spec/05, seção 7.
 */

export const table = ({ identifier, name, formula, results, flags = {}, folder = null }) => ({
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
  flags: { sombraneon: { schemaVersion: 1, ...flags } }
});

const single = (n) => [n, n];

/** Resultado de texto com título opcional (negrito do livro). */
export function textResult(range, cell) {
  const [title, rest] = splitBold(cell);
  const hasTitle = /^\*\*/.test(cell.trim());
  return hasTitle ? { range, name: title, text: rest } : { range, name: '', text: cell };
}

function simpleTable(identifier, name, formula, section, tableRef = 0, folder) {
  const t = book.table(section, tableRef);
  return table({
    identifier,
    name,
    formula,
    folder,
    results: t.rows.map((row) => textResult(single(Number(row[0])), row[1]))
  });
}

function tables() {
  const out = [];
  out.push(simpleTable('objetivos-do-grupo', 'Objetivos do grupo', '1d6', '2', 0, 'Criação'));

  out.push(
    table({
      identifier: 'mutacoes-biomod',
      name: 'Mutações do Biomod',
      formula: '1d20',
      folder: 'Criação',
      results: book.table('3.4').rows.map((row) => ({ range: single(Number(row[0])), ref: `feature:${slug(splitBold(row[1])[0])}` }))
    })
  );

  out.push(
    table({
      identifier: 'antecedentes',
      name: 'Antecedentes',
      formula: '1d20',
      folder: 'Criação',
      results: book.table('5').rows.map((row) => ({ range: single(Number(row[0])), ref: `background:${slug(plain(row[1]))}` }))
    })
  );

  for (const al of alignmentList) {
    out.push(
      table({
        identifier: `gatilhos-${al.id}`,
        name: `Gatilhos de Edge: ${al.label}`,
        formula: '1d6',
        folder: 'Gatilhos de Edge',
        flags: { alignment: al.id },
        results: book.table('6.1', al.table).rows.map((row) => ({
          range: single(Number(row[0])),
          ref: `feature:gatilho-${slug(splitBold(row[1])[0])}`
        }))
      })
    );
  }

  const ranges = [
    ['2', [2, 2]],
    ['3-6', [3, 6]],
    ['7-9', [7, 9]],
    ['10-11', [10, 11]],
    ['12', [12, 12]]
  ];
  for (const cls of classList) {
    out.push(
      table({
        identifier: `talentos-${cls.id}`,
        name: `Talentos: ${cls.label}`,
        formula: '2d6',
        folder: 'Talentos',
        flags: { class: cls.id },
        results: ranges.map(([key, range]) => ({ range, ref: `feature:${talentSlots[`${cls.id}:${key}`]}` }))
      })
    );
  }

  out.push(simpleTable('feedback', 'Feedback (programas)', '1d6', '9.2', 0, 'Hacking'));
  out.push(simpleTable('rejeicao', 'Rejeição (protocolos)', '1d6', '9.3', 0, 'Hacking'));
  out.push(simpleTable('surto', 'Surto de ciberpsicose', '1d6', '7.3', 0, 'Cromo'));

  const reaction = book.section('6.2').tables.find((t) => t.header[0] === '2d6');
  const open = [
    [-100, 2],
    [3, 5],
    [6, 8],
    [9, 11],
    [12, 100]
  ];
  out.push(
    table({
      identifier: 'reacao',
      name: 'Reação (2d6 + modificador de alinhamento)',
      formula: '2d6',
      folder: 'Mestre',
      results: reaction.rows.map((row, i) => textResult(open[i], row[1]))
    })
  );

  out.push(simpleTable('gerador-de-rede', 'Gerador de Rede', '1d6', '9.6', 0, 'Hacking'));

  // Capítulo 10: geradores de missão e Farra
  const missionRows = (n, titled) =>
    book.section('10.2').tables[n].rows.map((row) => ({
      range: single(Number(row[0])),
      ...(titled ? { name: plain(row[1]), text: plain(row[2]) } : textResult(single(Number(row[0])), row[1]))
    }));
  out.push(table({ identifier: 'missao-contratante', name: 'Missão: contratante', formula: '1d6', folder: 'Missões', results: missionRows(0, true) }));
  out.push(table({ identifier: 'missao-tipo', name: 'Missão: tipo e Prêmio', formula: '1d12', folder: 'Missões', results: missionRows(1, true) }));
  out.push(table({ identifier: 'missao-local', name: 'Missão: local', formula: '1d8', folder: 'Missões', results: missionRows(2) }));
  out.push(table({ identifier: 'missao-complicacao', name: 'Missão: complicação', formula: '1d8', folder: 'Missões', results: missionRows(3) }));
  const farra = book.section('10.5').tables.find((t) => t.header[0] === 'd6');
  out.push(table({ identifier: 'farra', name: 'Farra (regra opcional)', formula: '1d6', folder: 'Missões', results: farra.rows.map((row) => textResult(single(Number(row[0])), row[1])) }));
  return out;
}

export const tableDocs = tables();

export { html };
