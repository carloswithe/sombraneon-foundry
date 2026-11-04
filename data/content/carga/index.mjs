import { threatActors, npcActors } from './actors.mjs';
import { runners } from './runners.mjs';
import { equipmentItems, lootItems } from './items.mjs';
import { imageJournals } from './images.mjs';
import { mapScenes } from './maps.mjs';
import { journalEntries } from './journals.mjs';
import { cargaTables } from './tables.mjs';
import { cargaMacros } from './macros.mjs';

/**
 * Compêndios do módulo CARGA SEM NOME (sombraneon-carga-sem-nome). O escopo "carga" grava em
 * modules/sombraneon-carga-sem-nome/packs. Os nomes têm o prefixo carga- para não colidir com os de outros pacotes.
 */
const pack = (name, label, docType, docs) => ({ scope: 'carga', folderSorting: 'm', name, label: `Carga Sem Nome: ${label}`, docType, docs });

export const CARGA_PACKS = [
  pack('carga-diarios', 'Diários da aventura (Mestre)', 'JournalEntry', journalEntries),
  pack('carga-imagens', 'Imagens e retratos', 'JournalEntry', imageJournals),
  pack('carga-cenas', 'Cenas (mapas de mesa)', 'Scene', mapScenes),
  pack('carga-ameacas', 'Ameaças', 'Actor', threatActors),
  pack('carga-npcs', 'NPCs e aliados', 'Actor', npcActors),
  pack('carga-runners', 'Runners prontos', 'Actor', runners),
  pack('carga-equipamentos', 'Equipamentos', 'Item', equipmentItems),
  pack('carga-tesouros', 'Tesouros e Prêmio', 'Item', lootItems),
  pack('carga-tabelas', 'Tabelas de rolagem', 'RollTable', cargaTables),
  pack('carga-macros', 'Macros', 'Macro', cargaMacros)
];

/** Pasta do menu de compêndios (packFolders do module.json). */
export const CARGA_PACK_FOLDER = { name: 'Carga Sem Nome', sorting: 'm', color: '#ff6d00', packs: CARGA_PACKS.map((p) => p.name) };

/** Quantidades esperadas (inventário da seção 15 das instruções). */
export const CARGA_COUNTS = {
  'carga-diarios': 11,
  'carga-imagens': 41,
  'carga-cenas': 5,
  'carga-ameacas': 11,
  'carga-npcs': 8,
  'carga-runners': 6,
  'carga-equipamentos': 10,
  'carga-tesouros': 6,
  'carga-tabelas': 8,
  'carga-macros': 23
};
