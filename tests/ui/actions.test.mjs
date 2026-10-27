import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

/** Ações que o ApplicationV2 do núcleo já trata: usar o mesmo nome desvia o clique para o núcleo. */
const RESERVED = ['tab', 'close', 'toggleControls', 'configurePrototypeToken', 'configureSheet', 'showPortraitArtwork', 'copyUuid', 'toggleSheet', 'toggleLock'];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
}

describe('nomes de ações dos templates', () => {
  it('nenhum usa ação reservada do núcleo', () => {
    const bad = [];
    for (const file of walk('systems/sombraneon/templates')) {
      const text = fs.readFileSync(file, 'utf8');
      for (const m of text.matchAll(/data-action="([^"{]+)"/g)) if (RESERVED.includes(m[1])) bad.push(`${file}: ${m[1]}`);
    }
    expect(bad).toEqual([]);
  });
});
