import { threatActors, npcActors } from './actors.mjs';
import { runners } from './runners.mjs';
import { equipmentItems, lootItems } from './items.mjs';
import { imageJournals } from './images.mjs';
import { mapScenes } from './maps.mjs';
import { journalEntries } from './journals.mjs';
import { cercoTables } from './tables.mjs';
import { cercoMacros } from './macros.mjs';

/**
 * Compêndios do módulo CERCO AO REFÚGIO (sombraneon-cerco-ao-refugio). O escopo "cerco" grava em
 * modules/sombraneon-cerco-ao-refugio/packs. O prefixo cerco- evita colisão com outros pacotes.
 */
const pack = (name, label, docType, docs) => ({ scope: 'cerco', folderSorting: 'm', name, label: `Cerco ao Refúgio: ${label}`, docType, docs });

export const CERCO_PACKS = [
  pack('cerco-diarios', 'Diários da aventura (Mestre)', 'JournalEntry', journalEntries),
  pack('cerco-imagens', 'Imagens e retratos', 'JournalEntry', imageJournals),
  pack('cerco-cenas', 'Cenas (mapas de mesa)', 'Scene', mapScenes),
  pack('cerco-ameacas', 'Ameaças', 'Actor', threatActors),
  pack('cerco-npcs', 'NPCs e os doze', 'Actor', npcActors),
  pack('cerco-runners', 'Runners prontos', 'Actor', runners),
  pack('cerco-equipamentos', 'Equipamentos', 'Item', equipmentItems),
  pack('cerco-tesouros', 'Tesouros e Prêmio', 'Item', lootItems),
  pack('cerco-tabelas', 'Tabelas de rolagem', 'RollTable', cercoTables),
  pack('cerco-macros', 'Macros', 'Macro', cercoMacros)
];

/** Pasta do menu de compêndios (packFolders do module.json). */
export const CERCO_PACK_FOLDER = { name: 'Cerco ao Refúgio', sorting: 'm', color: '#ffb300', packs: CERCO_PACKS.map((p) => p.name) };

/** Quantidades esperadas (inventário da seção 15 das instruções, mais diários, tabelas e macros). */
export const CERCO_COUNTS = {
  'cerco-diarios': 12,
  'cerco-imagens': 31,
  'cerco-cenas': 6,
  'cerco-ameacas': 12,
  'cerco-npcs': 19,
  'cerco-runners': 6,
  'cerco-equipamentos': 2,
  'cerco-tesouros': 4,
  'cerco-tabelas': 7,
  'cerco-macros': 14
};
