import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';

const ROOT = path.resolve(import.meta.dirname, '../../systems/sombraneon');
const SHEETS = ['actor/character', 'actor/npc', 'actor/ice', 'actor/drone', 'item/item'];

describe('fichas: o envio do formulário', () => {
  it('nenhum template de ficha tem <form> próprio (a janela já é o form; dois forms aninhados salvam dados vazios)', () => {
    for (const name of SHEETS) {
      const html = fs.readFileSync(path.join(ROOT, 'templates', `${name}.hbs`), 'utf8');
      expect(/<\/?form\b/i.test(html), name).toBe(false);
      expect(html.trimStart().startsWith('<div'), name).toBe(true);
    }
  });

  it('a base das fichas declara a janela como form com salvamento ao sair do campo', () => {
    const src = fs.readFileSync(path.join(ROOT, 'src/sheets/base.mjs'), 'utf8');
    expect(src).toMatch(/tag:\s*'form'/);
    expect(src).toMatch(/submitOnChange:\s*true/);
  });

  it('os campos da Bio e o botão Salvar existem na ficha de personagem', () => {
    const html = fs.readFileSync(path.join(ROOT, 'templates/actor/character.hbs'), 'utf8');
    for (const f of ['biography', 'contacts', 'groupGoals', 'notes', 'appearance', 'civilName']) expect(html).toContain(`name="system.details.${f}"`);
    expect(html).toContain('data-action="saveSheet"');
  });
});
