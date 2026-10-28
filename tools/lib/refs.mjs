import { docId, subId } from './ids.mjs';

/**
 * Referências entre documentos dos compêndios, escritas no conteúdo como:
 *   @Ref[pack/identifier]{Rótulo}          -> @UUID[Compendium...]{Rótulo}
 *   @Ref[pack/identifier#pagina]{Rótulo}   -> link para uma página de um Journal
 *   @Pack[pack]{Rótulo}                    -> @Compendium[...]{Rótulo}
 * O rótulo é opcional (usa o nome do documento ou do pack). Referência sem destino é erro.
 */
const REF = /@Ref\[([a-z0-9-]+)\/([a-z0-9-]+)(?:#([a-z0-9-]+))?\](?:\{([^}]*)\})?/g;
const PACK = /@Pack\[([a-z0-9-]+)\](?:\{([^}]*)\})?/g;

export function makeResolver(packs, scopeId) {
  const byName = new Map(packs.map((p) => [p.name, p]));

  const packOf = (name, where) => {
    const pack = byName.get(name);
    if (!pack) throw new Error(`Pack desconhecido "${name}" em ${where}`);
    return pack;
  };

  const resolve = (text, where = '?') =>
    text
      .replace(REF, (all, packName, identifier, page, label) => {
        const pack = packOf(packName, where);
        const doc = pack.docs.find((d) => d.identifier === identifier);
        if (!doc) throw new Error(`Referência sem destino: ${all} em ${where}`);
        let uuid = `Compendium.${scopeId(pack.scope)}.${pack.name}.${pack.docType}.${docId(pack.name, identifier)}`;
        let name = doc.name;
        if (page) {
          const index = (doc.pages ?? []).findIndex((p) => p.identifier === page);
          if (index === -1) throw new Error(`Página sem destino: ${all} em ${where}`);
          uuid += `.JournalEntryPage.${subId(pack.name, identifier, 'page', index)}`;
          name = doc.pages[index].name;
        }
        return `@UUID[${uuid}]{${label ?? name}}`;
      })
      .replace(PACK, (all, packName, label) => {
        const pack = packOf(packName, where);
        return `@Compendium[${scopeId(pack.scope)}.${pack.name}]{${label ?? pack.label}}`;
      });

  const deep = (value, where) => {
    if (typeof value === 'string') return value.includes('@Ref[') || value.includes('@Pack[') ? resolve(value, where) : value;
    if (Array.isArray(value)) return value.map((v) => deep(v, where));
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deep(v, where)]));
    return value;
  };

  return { resolve, deep };
}
