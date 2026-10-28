import { featureItems } from './features.mjs';
import { classItems, originItems, backgroundItems, alignmentItems } from './character-items.mjs';
import { programItems } from './programs.mjs';
import { tableDocs } from './tables.mjs';
import { journalDoc } from './journal.mjs';
import { weaponItems, armorItems, gearItems, vehicleItems, implantItems } from './module-items.mjs';
import { iceActors, macroDocs, pregenActors } from './module-actors.mjs';
import { threatActors, extraIceActors, vehiclePackItems, companionWeapons, explosiveItems, masterTableDocs, referenceJournals } from './companions.mjs';
import { ADVENTURE_PACKS } from './adventure.mjs';

/**
 * Definição de todos os compêndios. `scope` decide onde o pack é gravado:
 * system -> systems/sombraneon/packs, module -> modules/sombraneon-compendium/packs.
 */
export const PACKS = [
  { scope: 'system', name: 'classes', label: 'Classes', docType: 'Item', docs: classItems },
  { scope: 'system', name: 'origens', label: 'Origens', docType: 'Item', docs: originItems },
  { scope: 'system', name: 'antecedentes', label: 'Antecedentes', docType: 'Item', docs: backgroundItems },
  { scope: 'system', name: 'alinhamentos', label: 'Alinhamentos', docType: 'Item', docs: alignmentItems },
  { scope: 'system', name: 'caracteristicas', label: 'Características e Talentos', docType: 'Item', docs: featureItems },
  { scope: 'system', name: 'programas', label: 'Programas, Protocolos e Sets', docType: 'Item', docs: programItems },
  { scope: 'system', name: 'tabelas', label: 'Tabelas', docType: 'RollTable', docs: tableDocs },
  { scope: 'system', name: 'regras', label: 'Livro de Regras', docType: 'JournalEntry', docs: [journalDoc] },

  { scope: 'module', name: 'armas', label: 'Armas', docType: 'Item', docs: [...weaponItems, ...companionWeapons] },
  { scope: 'module', name: 'armaduras', label: 'Armaduras', docType: 'Item', docs: armorItems },
  { scope: 'module', name: 'equipamento', label: 'Equipamento', docType: 'Item', docs: [...gearItems, ...explosiveItems] },
  { scope: 'module', name: 'implantes', label: 'Implantes (Cromo)', docType: 'Item', docs: implantItems },
  { scope: 'module', name: 'veiculos', label: 'Veículos, Mechas e Drones', docType: 'Item', docs: [...vehicleItems, ...vehiclePackItems] },
  { scope: 'module', name: 'ice', label: 'ICE e Malware', docType: 'Actor', docs: [...iceActors, ...extraIceActors] },
  { scope: 'module', name: 'ameacas', label: 'Ameaças', docType: 'Actor', docs: threatActors },
  { scope: 'module', name: 'fichas-prontas', label: 'Fichas Prontas', docType: 'Actor', docs: pregenActors },
  { scope: 'module', name: 'tabelas-do-mestre', label: 'Tabelas do Mestre', docType: 'RollTable', docs: masterTableDocs },
  { scope: 'module', name: 'referencias', label: 'Compêndios de Referência', docType: 'JournalEntry', docs: referenceJournals },
  { scope: 'module', name: 'macros', label: 'Macros', docType: 'Macro', docs: macroDocs },

  // Aventura "Noite das Máscaras": packs próprios (prefixo noite-), agrupados numa pasta do menu de compêndios
  ...ADVENTURE_PACKS
];

/** Quantidades esperadas (docs/spec/05, seção 1; ver docs/DECISIONS.md para divergências). */
export const EXPECTED_COUNTS = {
  classes: 6,
  origens: 5,
  antecedentes: 20,
  alinhamentos: 3,
  caracteristicas: 107,
  programas: 45,
  tabelas: 22,
  regras: 1,
  armas: 37,
  armaduras: 3,
  equipamento: 26,
  implantes: 28,
  veiculos: 58,
  ice: 17,
  ameacas: 66,
  referencias: 2,
  'tabelas-do-mestre': 17,
  'fichas-prontas': 6,
  macros: 12,
  'noite-aventura': 3,
  'noite-jogadores': 4,
  'noite-elenco': 10,
  'noite-fichas': 6,
  'noite-itens': 22,
  'noite-tabelas': 2
};
