import { featureItems } from './features.mjs';
import { classItems, originItems, backgroundItems, alignmentItems } from './character-items.mjs';
import { programItems } from './programs.mjs';
import { tableDocs } from './tables.mjs';
import { journalDoc } from './journal.mjs';
import { weaponItems, armorItems, gearItems, vehicleItems, implantItems } from './module-items.mjs';
import { iceActors, macroDocs, pregenActors } from './module-actors.mjs';

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

  { scope: 'module', name: 'armas', label: 'Armas', docType: 'Item', docs: weaponItems },
  { scope: 'module', name: 'armaduras', label: 'Armaduras', docType: 'Item', docs: armorItems },
  { scope: 'module', name: 'equipamento', label: 'Equipamento', docType: 'Item', docs: gearItems },
  { scope: 'module', name: 'implantes', label: 'Implantes (Cromo)', docType: 'Item', docs: implantItems },
  { scope: 'module', name: 'veiculos', label: 'Veículos e Drones', docType: 'Item', docs: vehicleItems },
  { scope: 'module', name: 'ice', label: 'ICE', docType: 'Actor', docs: iceActors },
  { scope: 'module', name: 'fichas-prontas', label: 'Fichas Prontas', docType: 'Actor', docs: pregenActors },
  { scope: 'module', name: 'macros', label: 'Macros', docType: 'Macro', docs: macroDocs }
];

/** Quantidades esperadas (docs/spec/05, seção 1; ver docs/DECISIONS.md para divergências). */
export const EXPECTED_COUNTS = {
  classes: 6,
  origens: 4,
  antecedentes: 20,
  alinhamentos: 3,
  caracteristicas: 99,
  programas: 45,
  tabelas: 17,
  regras: 1,
  armas: 12,
  armaduras: 3,
  equipamento: 18,
  implantes: 28,
  veiculos: 7,
  ice: 5,
  'fichas-prontas': 6,
  macros: 10
};
