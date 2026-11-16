import fs from 'node:fs';
import { flatCatalog, REUSE } from './catalog.mjs';

/**
 * Arte dos tokens e itens (gerada no Magnific, ver docs/sombraneon-arte-prompts.md).
 * Mapeia `escopo/compêndio/identifier` para o arquivo dentro do pacote dono do compêndio e aplica
 * nos documentos antes da compilação: img do item ou do ator, textura do token do ator e img dos
 * itens embutidos nas fichas.
 *
 * O módulo Carga Sem Nome é independente do Compêndio: seus documentos só apontam para arquivos
 * do próprio módulo (as imagens reaproveitadas são copiadas para lá por tools/art/process-art.py).
 */
const BASE = {
  module: 'modules/sombraneon-compendium/assets/arte',
  carga: 'modules/sombraneon-carga-sem-nome/assets/arte'
};

const artPath = (scope, pack, id) => `${BASE[scope]}/${pack}/${id}.webp`;

/** Mapa `escopo/compêndio/identifier` -> caminho do arquivo. */
export const ART = new Map();
for (const e of flatCatalog()) ART.set(`${e.scope}/${e.pack}/${e.id}`, artPath(e.scope, e.pack, e.id));
for (const [to] of REUSE) {
  const [scope, pack, id] = to.split('/');
  ART.set(to, artPath(scope, pack, id));
}

/**
 * Atores que já têm retrato da aventura (img quadrada) mas não tinham token: ganham só o token redondo
 * (data/art/portrait-tokens.json, gerado por tools/art/process-art.py a partir do retrato).
 */
export const TOKEN_ONLY = new Map();
const PORTRAIT_TOKENS = JSON.parse(fs.readFileSync(new URL('./portrait-tokens.json', import.meta.url), 'utf8'));
for (const t of PORTRAIT_TOKENS) TOKEN_ONLY.set(`${t.scope}/${t.pack}/${t.id}`, artPath(t.scope, t.pack, t.id));

/** Compêndios de itens do módulo cujos ícones valem também para os itens embutidos nas fichas do mesmo módulo. */
const ITEM_PACKS = ['armas', 'armaduras', 'equipamento', 'implantes', 'veiculos'];

/** Aplica a arte nos documentos dos compêndios (em memória, antes de compilar). */
export function applyArt(packs) {
  const embedded = new Map();
  for (const p of packs) {
    if (p.scope !== 'module' || !ITEM_PACKS.includes(p.name)) continue;
    for (const d of p.docs) {
      const art = ART.get(`module/${p.name}/${d.identifier}`);
      if (art) embedded.set(`${d.type}:${d.identifier}`, art);
    }
  }

  let applied = 0;
  for (const p of packs) {
    if (!['module', 'carga'].includes(p.scope) || !['Item', 'Actor'].includes(p.docType)) continue;
    for (const d of p.docs) {
      const art = ART.get(`${p.scope}/${p.name}/${d.identifier}`);
      if (art) {
        d.img = art;
        if (p.docType === 'Actor') d.prototypeToken = { ...d.prototypeToken, texture: { ...(d.prototypeToken?.texture ?? {}), src: art } };
        applied += 1;
      }
      const tokenOnly = TOKEN_ONLY.get(`${p.scope}/${p.name}/${d.identifier}`);
      if (tokenOnly) {
        d.prototypeToken = { ...d.prototypeToken, texture: { ...(d.prototypeToken?.texture ?? {}), src: tokenOnly } };
        applied += 1;
      }
      // itens embutidos nas fichas do módulo Compêndio (os do Carga Sem Nome são independentes)
      if (p.docType === 'Actor' && p.scope === 'module') {
        for (const it of d.items ?? []) {
          const itemArt = embedded.get(`${it.type}:${it.identifier}`);
          if (itemArt) it.img = itemArt;
        }
      }
    }
  }
  return applied;
}
