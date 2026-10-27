import { marked } from 'marked';
import { book, ICON } from './lib.mjs';
import { chapters } from '../../tools/lib/book.mjs';

marked.setOptions({ gfm: true, breaks: false });

/** O livro de regras como uma JournalEntry com uma página por capítulo (05 seção 12). */
function buildJournal() {
  const pages = chapters(book.markdown).map((c) => ({
    identifier: `capitulo-${c.number}`,
    name: `${c.number}. ${c.title}`,
    type: 'text',
    sort: c.number * 100,
    title: { show: true, level: 1 },
    text: { format: 1, content: marked.parse(c.markdown) }
  }));
  return {
    identifier: 'livro-de-regras',
    name: 'SombraNeon, Livro de Regras',
    type: 'JournalEntry',
    img: ICON('journal'),
    pages,
    ownership: { default: 2 },
    flags: { sombraneon: { schemaVersion: 1 } }
  };
}

export const journalDoc = buildJournal();
