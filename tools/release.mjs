import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';
import { ROOT } from './lib/book.mjs';

/**
 * Gera dist/system.zip, dist/module.zip e os manifests com a versão e as URLs corretas.
 * Uso: node tools/release.mjs [versão]   (padrão: versão do system.json)
 * Os arquivos ficam na RAIZ do zip, e os packs LevelDB entram byte a byte, sem conversão de linhas.
 */
const REPO = 'carloswithe/sombraneon-foundry';
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const version = process.argv[2]?.replace(/^v/, '') ?? read('systems/sombraneon/system.json').version;
const dist = path.join(ROOT, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

const targets = [
  { key: 'system', dir: 'systems/sombraneon', manifest: 'system.json', zip: 'system.zip' },
  { key: 'module', dir: 'modules/sombraneon-compendium', manifest: 'module.json', zip: 'module.zip' }
];

for (const t of targets) {
  const manifest = read(`${t.dir}/${t.manifest}`);
  manifest.version = version;
  manifest.url = `https://github.com/${REPO}`;
  manifest.manifest = `https://github.com/${REPO}/releases/latest/download/${t.manifest}`;
  manifest.download = `https://github.com/${REPO}/releases/download/v${version}/${t.zip}`;
  manifest.bugs = `https://github.com/${REPO}/issues`;
  const manifestText = `${JSON.stringify(manifest, null, 2)}\n`;
  fs.writeFileSync(path.join(dist, t.manifest), manifestText);

  await new Promise((resolve, reject) => {
    const out = fs.createWriteStream(path.join(dist, t.zip));
    const zip = archiver('zip', { zlib: { level: 9 } });
    out.on('close', resolve);
    zip.on('error', reject);
    zip.pipe(out);
    const base = path.join(ROOT, t.dir);
    const add = (dir, rel = '') => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        const name = rel ? `${rel}/${e.name}` : e.name;
        if (e.isDirectory()) add(full, name);
        else if (e.name === 'LOCK' || (rel === '' && e.name === t.manifest)) continue;
        else zip.file(full, { name });
      }
    };
    add(base);
    zip.append(manifestText, { name: t.manifest });
    for (const f of ['LICENSE', 'README.md']) zip.file(path.join(ROOT, f), { name: f });
    zip.finalize();
  });
  console.log(`${t.zip}: ${(fs.statSync(path.join(dist, t.zip)).size / 1024).toFixed(0)} KB`);
}
console.log(`Release v${version} pronto em dist/.`);
