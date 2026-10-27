import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/book.mjs';

/**
 * Copia os arquivos woff2 (subconjunto latin) e as licenças OFL das fontes para o sistema
 * e gera styles/fonts.css. As fontes são embutidas, sem CDN.
 */
const OUT = path.join(ROOT, 'systems', 'sombraneon', 'fonts');
fs.mkdirSync(OUT, { recursive: true });

const FONTS = [
  { pkg: 'orbitron', family: 'Orbitron', weights: [400, 700, 900] },
  { pkg: 'rajdhani', family: 'Rajdhani', weights: [400, 500, 600, 700] },
  { pkg: 'share-tech-mono', family: 'Share Tech Mono', weights: [400] }
];

let css = '/* Gerado por tools/copy-fonts.mjs. Fontes sob SIL Open Font License (ver fonts/LICENSE-*.txt). */\n';
for (const f of FONTS) {
  const dir = path.join(ROOT, 'node_modules', '@fontsource', f.pkg);
  for (const w of f.weights) {
    const name = `${f.pkg}-latin-${w}-normal.woff2`;
    const src = path.join(dir, 'files', name);
    if (!fs.existsSync(src)) throw new Error(`Arquivo de fonte não encontrado: ${src}`);
    fs.copyFileSync(src, path.join(OUT, name));
    css += `@font-face {\n  font-family: '${f.family}';\n  font-style: normal;\n  font-weight: ${w};\n  font-display: swap;\n  src: url('../fonts/${name}') format('woff2');\n}\n`;
  }
  const lic = path.join(dir, 'LICENSE');
  if (fs.existsSync(lic)) fs.copyFileSync(lic, path.join(OUT, `LICENSE-${f.pkg}.txt`));
}
fs.writeFileSync(path.join(ROOT, 'systems', 'sombraneon', 'styles', 'fonts.css'), css);
console.log('Fontes copiadas.');
