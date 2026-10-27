import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { extractPack } from '@foundryvtt/foundryvtt-cli';
import { ROOT } from './lib/book.mjs';
import { PACKS } from '../data/content/index.mjs';

/** Ida e volta: extrai cada pack compilado para uma pasta temporária e confere a contagem de arquivos. */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sn-unpack-'));
let bad = 0;
for (const p of PACKS) {
  const src = path.join(ROOT, p.scope === 'system' ? 'systems/sombraneon' : 'modules/sombraneon-compendium', 'packs', p.name);
  const dest = path.join(tmp, p.name);
  await extractPack(src, dest, { yaml: false, log: false });
  const files = fs
    .readdirSync(dest, { recursive: true })
    .filter((f) => String(f).endsWith('.json'))
    .filter((f) => !String(JSON.parse(fs.readFileSync(path.join(dest, String(f)), 'utf8'))._key ?? '').startsWith('!folders!'));
  const ok = files.length === p.docs.length;
  if (!ok) bad += 1;
  console.log(`${ok ? 'ok  ' : 'ERRO'} ${p.name}: ${files.length}/${p.docs.length}`);
}
fs.rmSync(tmp, { recursive: true, force: true });
process.exit(bad ? 1 : 0);
