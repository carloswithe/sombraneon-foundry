/**
 * Constantes de regra do SombraNeon (livro v0.5). Sem dependência do Foundry.
 */
export const SN = {
  id: 'sombraneon',
  moduleId: 'sombraneon-compendium',
  abilities: ['for', 'des', 'con', 'int', 'sab', 'car'],
  difficulty: { easy: 9, normal: 12, hard: 15, extreme: 18 },
  modTable: [
    [1, 3, -4],
    [4, 5, -3],
    [6, 7, -2],
    [8, 9, -1],
    [10, 11, 0],
    [12, 13, 1],
    [14, 15, 2],
    [16, 17, 3],
    [18, 99, 4]
  ],
  ranges: { close: '1,5 m', near: '9 m', far: 'linha de visão', distant: 'além da linha de visão' },
  maxLevel: 10,
  implantSlots: ['neural', 'body', 'arms', 'legs'],
  implantQualities: { street: 300, corp: 1000, military: 3000 },
  qualityOrder: ['street', 'corp', 'military'],
  creditsPerGold: 10,
  startingCredits: '2d6 * 100',
  slotsBase: 10,
  alert: { min: 0, max: 4 },
  cyber: { threeSlots: 12, fourSlots: 14 },
  weaponFamilies: ['blades', 'blunt', 'shock', 'pistols', 'smgs', 'shotguns', 'rifles', 'heavy', 'smart', 'unarmed'],
  unarmedDie: 'd4',
  clinicSurcharge: 0.1,
  droneRebuildCost: 250,
  gearCategories: [
    'general', 'tool', 'medical', 'ammo', 'battery', 'ration', 'stim', 'deck', 'firewall', 'nanokit',
    'surgical', 'stage-rig', 'utility-rig', 'radio', 'light', 'cable', 'vehicle', 'drone-module'
  ],
  restQuality: { safe: null, unsafe: 3, risky: 2, deadly: 1 },
  checkTags: [
    'stealth', 'climb', 'disguise', 'sensors', 'delicate', 'hack-street', 'resist-hack', 'resist-emp',
    'cyberpsychosis', 'tech', 'recall', 'social', 'lift', 'piloting', 'track', 'avoid-danger', 'perceive',
    'interact-machines', 'resist-injury', 'resist-poison', 'resist-disease', 'resist-chrome', 'disarm',
    'stay-connected', 'perform', 'fame', 'ambush', 'strength-arms', 'avoid-knockdown'
  ],
  factions: ['police', 'execs', 'citizens', 'gangs', 'blackMarket', 'cults', 'punks', 'syntheticsFree', 'mercenaries'],
  reaction: {
    controle: { police: 2, execs: 2, citizens: 1, gangs: -1, blackMarket: -1, cults: -1, punks: -2, syntheticsFree: -1, mercenaries: 0 },
    sobrevivencia: { police: 0, execs: 0, citizens: 0, gangs: 1, blackMarket: 2, cults: 0, punks: 0, syntheticsFree: 0, mercenaries: 1 },
    liberdade: { police: -2, execs: -2, citizens: -1, gangs: 1, blackMarket: 0, cults: 1, punks: 2, syntheticsFree: 2, mercenaries: 0 }
  },
  vehicleCategories: ['light', 'medium', 'heavy', 'mecha'],
  vehicleTerrains: ['land', 'air', 'water'],
  vehicleLicenses: ['C', 'R', 'M', 'I'],
  moraleKinds: { weak: 18, normal: 15, firm: 12, fanatic: null },
  statuses: [
    'dead', 'unconscious', 'dying', 'stunned', 'blind', 'immobile', 'sick', 'frightened', 'surprised',
    'immersed', 'prone', 'invisible', 'tremor'
  ]
};
