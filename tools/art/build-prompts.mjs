// Gera docs/sombraneon-arte-prompts.md a partir de data/art/catalog.mjs e confere a cobertura contra os compêndios.
// Uso: node tools/art/build-prompts.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PACKS } from '../../data/content/index.mjs';
import { GROUPS, REUSE, COLORS, STYLE, flatCatalog } from '../../data/art/catalog.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const catalog = flatCatalog();

const docOf = (scope, pack, id) => PACKS.find((p) => p.scope === scope && p.name === pack)?.docs.find((d) => d.identifier === id);

// 1. Todo item do catálogo existe nos compêndios
const missing = catalog.filter((e) => !docOf(e.scope, e.pack, e.id));
if (missing.length) throw new Error(`Sem documento no compêndio: ${missing.map((m) => `${m.scope}/${m.pack}/${m.id}`).join(', ')}`);
const dup = catalog.map((e) => `${e.scope}/${e.pack}/${e.id}`).filter((k, i, a) => a.indexOf(k) !== i);
if (dup.length) throw new Error(`Duplicados: ${dup}`);

// 2. Cobertura: itens e atores dos módulos que ainda usam ícone genérico ou token de iniciais
const covered = new Set([...catalog.map((e) => `${e.scope}/${e.pack}/${e.id}`), ...REUSE.map(([to]) => to)]);
const uncovered = [];
for (const p of PACKS) {
  if (!['module', 'carga'].includes(p.scope) || !['Item', 'Actor'].includes(p.docType)) continue;
  for (const d of p.docs) {
    const generic = d.img.includes('/assets/icons/');
    if (generic && !covered.has(`${p.scope}/${p.name}/${d.identifier}`)) uncovered.push(`${p.scope}/${p.name}/${d.identifier}`);
  }
}
console.log(`Catálogo: ${catalog.length} imagens novas + ${REUSE.length} reaproveitadas. Sem cobertura: ${uncovered.length}`);
if (uncovered.length) console.log(uncovered.join('\n'));

// 3. Markdown
const nameOf = (e) => docOf(e.scope, e.pack, e.id).name;
const packLabel = (scope, pack) => PACKS.find((p) => p.scope === scope && p.name === pack)?.label ?? pack;
const lines = [];
const push = (s = '') => lines.push(s);

push('# SombraNeon: prompts de arte para tokens e ícones');
push();
push(`Catálogo de **${catalog.length} imagens** (mais ${REUSE.length} reaproveitadas) para os compêndios do módulo **SombraNeon: Compêndio** e da aventura **Carga Sem Nome**: ameaças, ICE e IAs, runners prontos, armas, armaduras, equipamento, implantes, veículos, mechas e módulos, e os itens das aventuras Noite das Máscaras e Carga Sem Nome. Gerado por \`tools/art/build-prompts.mjs\` a partir de \`data/art/catalog.mjs\`. Para mudar um prompt, edite o catálogo e rode o script de novo.`);
push();
push('## 1. Direção de arte (a mesma dos livros)');
push();
push('Vetor 2D chapado, contorno preto grosso e liso, cinzas em blocos, sem hachura, sem degradê e sem textura de lápis. **Tudo em cinza, inclusive pele, rosto, mãos, cabelo, roupa e fundo, exceto uma única cor de destaque, intensa e brilhante, usada com parcimônia num ponto de foco.** Sem texto, letras, números ou logotipos.');
push();
push('Blocos fixos que entram em todo prompt:');
push();
push('```text');
push(STYLE.art);
push(STYLE.atmosphere);
push(STYLE.closing);
push('```');
push();
push('### Dois formatos');
push();
push('| Formato | Uso | Enquadramento | Pós-processamento |');
push('|---|---|---|---|');
push('| **token** | Atores: ameaças, ICE, IAs, runners, elenco | Retrato da cintura para cima (humanos) ou figura inteira (máquinas e criaturas), centrado, 75% do quadro, fundo cinza liso | Recorte circular com anel na cor de destaque (PNG/WebP 400 px). Serve de retrato **e** de token do ator |');
push('| **item** | Armas, armaduras, equipamento, implantes, veículos, módulos, itens de aventura | Objeto único em três quartos, 75% do quadro, silhueta forte que lê em 64 px, fundo cinza liso | Redução para 512 px (WebP) |');
push();
push('Fundo: cinza claro chapado (`#CFCFD4`), sem degradê, sem chão e sem sombra projetada. Em geração: **1:1, 1K, Google Nano Banana 2.1 (Magnific)**, uma imagem por chamada.');
push();
push('### Cor de destaque por família');
push();
push('| Família | Cor | Observação |');
push('|---|---|---|');
const famRows = [
  ['Armas brancas', 'red'], ['Armas de fogo, ferramentas', 'amber'], ['Armas pesadas, de veículo, granadas, militares', 'orange'],
  ['Armaduras, decks, ciberneticos, IAs', 'cyan'], ['Médico e reparo, módulos de veículo, fauna, malware', 'green'],
  ['ICE, gangues', 'magenta'], ['Implantes neurais, cultos, festa', 'violet'], ['Lei e segurança, corporações', 'blue']
];
for (const [fam, c] of famRows) push(`| ${fam} | ${COLORS[c]} | |`);
push();
push('## 2. Como gerar e instalar');
push();
push('1. Para cada linha, cole o prompt no Magnific (modelo Nano Banana 2.1, 1:1, 1K).');
push('2. Salve com o nome do arquivo indicado na tabela, em `art-origem/<compêndio>/` (ex.: `art-origem/armas/faca.png`).');
push('3. Rode `python tools/art/process-art.py` (recorta os tokens em círculo, reduz os ícones e grava em `modules/<pacote>/assets/arte/`).');
push('4. Rode `npm run verify`. O mapeamento imagem -> documento está em `data/art/index.mjs`, aplicado na compilação dos compêndios.');
push();
push('## 3. Resumo');
push();
push('| Compêndio | Pacote | Formato | Imagens |');
push('|---|---|---|---|');
const byPack = new Map();
for (const e of catalog) {
  const k = `${e.scope}/${e.pack}`;
  byPack.set(k, [...(byPack.get(k) ?? []), e]);
}
for (const [k, list] of byPack) {
  const [scope, pack] = k.split('/');
  push(`| ${packLabel(scope, pack)} | ${scope === 'module' ? 'Compêndio' : 'Carga Sem Nome'} | ${list[0].kind} | ${list.length} |`);
}
push(`| **Total** | | | **${catalog.length}** |`);
push();
push('Reaproveitadas (sem gerar):');
push();
for (const [to, from] of REUSE) push(`- \`${to}\` usa a imagem de \`${from}\`.`);
push();
push('Fora do escopo (já têm arte própria das aventuras): elenco e NPCs com retrato (Dona Ruth, Rex, Lívia, Teo, Nest, Daigo, Voss...), ameaças de Carga Sem Nome com arte, retratos dos runners de Carga, itens com arte (Cache de Ruth, Rosto Livre, Dossiê, Kit de Resgate etc.). Classes, origens, antecedentes, alinhamentos, características, talentos e programas continuam com os ícones do sistema.');
push();
push('## 4. Prompts');
push();
let section = 3;
let currentPack = '';
for (const g of GROUPS) {
  const key = `${g.scope}/${g.pack}`;
  if (key !== currentPack) {
    currentPack = key;
    section += 1;
    push(`### 4.${section - 3} ${packLabel(g.scope, g.pack)} (${g.scope === 'module' ? 'Compêndio' : 'Carga Sem Nome'})`);
    push();
  }
  push(`**${g.label}** · cor de destaque: ${COLORS[g.spot]} · formato: ${g.kind}`);
  push();
  const rows = catalog.filter((e) => e.scope === g.scope && e.pack === g.pack && e.label === g.label);
  for (const e of rows) {
    push(`#### ${e.code} · ${nameOf(e)}`);
    push();
    push(`Arquivo: \`${e.file}\` · destino: \`${e.scope}/${e.pack}/${e.id}\``);
    push();
    push('```text');
    push(e.prompt);
    push('```');
    push();
  }
}
const outFile = path.join(ROOT, 'docs', 'sombraneon-arte-prompts.md');
fs.writeFileSync(outFile, lines.join('\n'));
fs.writeFileSync(path.join(ROOT, 'data', 'art', 'catalog.json'), JSON.stringify(catalog.map((e) => ({ ...e, name: nameOf(e) })), null, 1));
console.log('Gravado', outFile);
