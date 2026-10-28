import { book, html, item, M, F, ADV, DIS, SET, MUL, uses, NO_USES, splitBold, plain, slug, ICON } from './lib.mjs';

const FAMILIES = ['blades', 'blunt', 'shock', 'pistols', 'smgs', 'shotguns', 'rifles', 'heavy', 'smart'];

function feature({ name, kind, text, source, folder, sort, identifier, img, modifiers = [], usesCfg = NO_USES, activation = 'passive', choice = {}, choices = [], automation = '', stackable = false, roll = null, weapon = null, requires, flags }) {
  return item({
    type: 'feature',
    name,
    identifier,
    img: img ?? ICON(`feature-${kind}`),
    folder,
    sort,
    source,
    description: html(text),
    flags,
    system: {
      kind,
      modifiers,
      uses: usesCfg,
      activation,
      choice,
      choices,
      automation,
      stackable,
      roll,
      weapon,
      requires: requires ?? { level: 0, class: '', origin: '' }
    }
  });
}

const familyChoice = { key: 'family', kind: 'weaponFamily', options: FAMILIES };

/* ------------------------------------------------------------------ */
/* Habilidades de classe (23)                                          */
/* ------------------------------------------------------------------ */

const T = (section, name) => book.bullet(section, name);
const CLASS_SRC = (n) => `Livro v0.6, ${n}`;

function classFeatures() {
  const out = [];
  let sort = 0;
  const add = (cls, section, name, extra) => {
    sort += 100;
    out.push(
      feature({
        name,
        kind: 'class',
        text: T(section, name),
        source: CLASS_SRC(section),
        folder: `Habilidades: ${cls}`,
        sort,
        flags: { class: slug(cls) },
        ...extra
      })
    );
  };

  // Solo (4.1)
  add('Solo', '4.1', 'Domínio de arma', {
    choices: [familyChoice],
    automation: 'weapon-domain',
    modifiers: [
      M('attack.all', '1 + floor(@level / 2)', { when: 'family:@choice.family', label: 'Domínio' }),
      M('damage.all', '1 + floor(@level / 2)', { when: 'family:@choice.family', label: 'Domínio' }),
      F('flag.weaponDomain')
    ]
  });
  add('Solo', '4.1', 'Chassi', { modifiers: [M('slots.bonus', 'max(0, @abilities.con.mod)')] });
  add('Solo', '4.1', 'Resistente', {
    modifiers: [ADV('check.resist-injury'), ADV('check.resist-poison'), ADV('check.resist-chrome')]
  });
  add('Solo', '4.1', 'Duro de matar', { usesCfg: uses(3, 'rest'), automation: 'tough-as-nails' });

  // Netrunner (4.2)
  add('Netrunner', '4.2', 'Deck', {});
  add('Netrunner', '4.2', 'Programas', {});

  // Hyperdoc (4.3)
  add('Hyperdoc', '4.3', 'Nanokit', {});
  add('Hyperdoc', '4.3', 'Protocolos', {});
  add('Hyperdoc', '4.3', 'Primeiros socorros', { usesCfg: uses(1, 'scene'), activation: 'action', automation: 'first-aid' });
  add('Hyperdoc', '4.3', 'Cirurgião', {});

  // Ghost (4.4)
  add('Ghost', '4.4', 'Ataque furtivo', { automation: 'sneak-attack' });
  add('Ghost', '4.4', 'Fantasma', {
    modifiers: ['stealth', 'climb', 'disguise', 'sensors', 'delicate', 'hack-street'].map((t) => ADV(`check.${t}`))
  });
  add('Ghost', '4.4', 'Edge de rua', { automation: 'street-edge' });

  // Rocker (4.5)
  add('Rocker', '4.5', 'Rig de palco', {});
  add('Rocker', '4.5', 'Sets', {});
  add('Rocker', '4.5', 'Palco', { modifiers: [ADV('check.perform')] });
  add('Rocker', '4.5', 'Fama', {});
  add('Rocker', '4.5', 'Ressonância', { automation: 'resonance' });

  // Rigger (4.6)
  add('Rigger', '4.6', 'Drone voador', { automation: 'drone' });
  add('Rigger', '4.6', 'Voo', {});
  add('Rigger', '4.6', 'Link', {});
  add('Rigger', '4.6', 'Batedor', { modifiers: [F('initiative.advantage'), ADV('check.ambush')] });
  add('Rigger', '4.6', 'Condutor', { modifiers: [ADV('check.piloting')] });
  add('Rigger', '4.6', 'Interface veicular', {});
  add('Rigger', '4.6', 'Mecânico de campo', {});
  return out;
}

/* ------------------------------------------------------------------ */
/* Traços de origem (12)                                               */
/* ------------------------------------------------------------------ */

function originTraits() {
  const out = [];
  let sort = 0;
  const add = (origin, section, name, extra = {}) => {
    sort += 100;
    out.push(
      feature({
        name,
        kind: 'origin',
        text: T(section, name),
        source: CLASS_SRC(section),
        folder: `Traços: ${origin}`,
        sort,
        flags: { origin: slug(origin) },
        ...extra
      })
    );
  };
  add('Nat', '3.1', 'Corpo sem interface', { modifiers: [F('flag.hackImmuneWithoutNeural')] });
  add('Nat', '3.1', 'Humanidade firme', { modifiers: [F('cyber.advantage')] });
  add('Nat', '3.1', 'Ambicioso', { modifiers: [M('talents.extra', 1)] });
  add('Cromado', '3.2', 'Instalação de fábrica');
  add('Cromado', '3.2', 'Cromo estável', { modifiers: [M('cyber.adjust', -1)] });
  add('Cromado', '3.2', 'Vulnerável', { modifiers: [DIS('check.resist-hack'), DIS('check.resist-emp')] });
  // Replicante (3.3)
  add('Replicante', '3.3', 'Carne cultivada', { modifiers: [ADV('check.resist-poison'), ADV('check.resist-disease'), ADV('check.resist-fatigue')] });
  add('Replicante', '3.3', 'Propósito de fábrica', {
    choices: [{ key: 'purpose', kind: 'select', options: ['combat', 'infiltration', 'companion', 'labor'] }],
    modifiers: [F('flag.purpose.{choice.purpose}')]
  });
  add('Replicante', '3.3', 'Memória plantada', { usesCfg: uses(1, 'rest'), activation: 'free', automation: 'use' });
  add('Replicante', '3.3', 'Registro', {
    modifiers: [M('reaction.police', -2), M('reaction.execs', -2), F('flag.registeredSynthetic')]
  });
  // Android (3.4)
  add('Android', '3.4', 'Chassi', { identifier: 'chassi-android', modifiers: [F('rest.noRation'), F('flag.immunePoison'), F('flag.immuneDisease')] });
  add('Android', '3.4', 'Casco de fábrica', { modifiers: [M('ac.bonus', 1, { when: 'noArmor' })] });
  add('Android', '3.4', 'Interface nativa', { modifiers: [ADV('check.hack-street'), F('flag.nativeInterface')] });
  add('Android', '3.4', 'Mente estável', { modifiers: [M('cyber.adjust', -1)] });
  add('Android', '3.4', 'Máquina', { modifiers: [DIS('check.resist-hack'), DIS('check.resist-emp'), F('flag.noStims'), F('flag.healHalf')] });
  add('Android', '3.4', 'Visível', {
    modifiers: [M('reaction.police', -2), M('reaction.execs', -2), F('flag.visibleMachine')]
  });
  add('Biomod', '3.5', 'Genoma instável');
  add('Biomod', '3.5', 'Corpo rejeita cromo', { modifiers: [M('cyber.adjust', 1)] });
  return out;
}

/* ------------------------------------------------------------------ */
/* Mutações do Biomod (20)                                             */
/* ------------------------------------------------------------------ */

const MUTATIONS = {
  1: { modifiers: [F('flag.amphibious')] },
  2: { modifiers: [M('attack.melee', 1), M('damage.melee', 1)] },
  3: { modifiers: [M('ac.bonus', 1, { when: 'noArmor' })] },
  4: { modifiers: [F('flag.hiddenComms')] },
  5: { modifiers: [M('attack.ranged', 1), M('damage.ranged', 1)] },
  6: { modifiers: [F('flag.notSurprised')] },
  7: { weapon: { name: 'Garras, presas ou chifres', damage: 'd6', kind: 'melee', range: 'close', family: 'unarmed', notes: '' } },
  8: { modifiers: [F('flag.glide')] },
  9: { usesCfg: uses(1, 'day'), activation: 'action', automation: 'use' },
  10: { usesCfg: uses(1, 'day'), activation: 'action', automation: 'use' },
  11: {
    choices: [{ key: 'extreme', kind: 'select', options: ['fire', 'cold'] }],
    modifiers: [MUL('resist.{choice.extreme}', 0.5)]
  },
  12: { modifiers: [M('check.tech', 1)] },
  13: { modifiers: [M('check.interact-machines', 1)] },
  14: { modifiers: [MUL('resist.electric', 0.5), MUL('resist.radiation', 0.5)] },
  15: { modifiers: [MUL('resist.poison', 0.5), F('flag.toxicEnvironment')] },
  16: { modifiers: [F('flag.climbFull')] },
  17: { modifiers: [M('slots.bonus', 2), F('flag.extraNonOffensiveAction')] },
  18: { modifiers: [F('flag.extraMove')] },
  19: { modifiers: [F('initiative.advantage')] },
  20: {
    usesCfg: uses(1, 'rest'),
    activation: 'action',
    automation: 'use',
    roll: { formula: '1d6 + @level', label: 'Regeneração', healsSelf: true }
  }
};

function mutations() {
  return book.table('3.5').rows.map((row, i) => {
    const n = Number(row[0]);
    const [name, text] = splitBold(row[1]);
    return feature({
      name,
      kind: 'mutation',
      text,
      source: 'Livro v0.6, 3.5',
      folder: 'Mutações do Biomod',
      sort: (i + 1) * 100,
      flags: { mutationRoll: n },
      ...MUTATIONS[n]
    });
  });
}

/* ------------------------------------------------------------------ */
/* Talentos (32)                                                       */
/* ------------------------------------------------------------------ */

const CLASSES = [
  { id: 'solo', label: 'Solo', section: '4.1', abilities: ['for', 'des', 'con'] },
  { id: 'netrunner', label: 'Netrunner', section: '4.2', abilities: ['int', 'des', 'con'] },
  { id: 'hyperdoc', label: 'Hyperdoc', section: '4.3', abilities: ['sab', 'int', 'con'] },
  { id: 'ghost', label: 'Ghost', section: '4.4', abilities: ['des', 'sab', 'car'] },
  { id: 'rocker', label: 'Rocker', section: '4.5', abilities: ['car', 'des', 'int'] },
  { id: 'rigger', label: 'Rigger', section: '4.6', abilities: ['des', 'int', 'con'] }
];

const programChoice = (kind) => ({ key: 'program', kind: 'knownProgram', options: [kind] });

/** Mecânica dos talentos específicos (03 seção 8.3). */
const TALENT_MECHANICS = {
  'segundo-dominio': {
    choices: [familyChoice],
    stackable: true,
    automation: 'weapon-domain',
    modifiers: [
      M('attack.all', '1 + floor(@level / 2)', { when: 'family:@choice.family', label: 'Segundo domínio' }),
      M('damage.all', '1 + floor(@level / 2)', { when: 'family:@choice.family', label: 'Segundo domínio' }),
      F('flag.weaponDomain')
    ]
  },
  'arma-afinada': { stackable: true, modifiers: [M('attack.all', 1, { when: 'domain' }), M('damage.all', 1, { when: 'domain' })] },
  'armadura-treinada': { stackable: true, modifiers: [M('ac.bonus', 1, { when: 'armor:medium|heavy' })] },
  biblioteca: { stackable: true, modifiers: [M('cast.known', 1)] },
  'programa-afinado': { stackable: true, choices: [programChoice('program')], modifiers: [M('cast.program.{choice.program}', 1)] },
  'deck-customizado': { usesCfg: uses(1, 'rest'), automation: 'deck-absorb' },
  'biblioteca-clinica': { stackable: true, modifiers: [M('cast.known', 1)] },
  'protocolo-afinado': { stackable: true, choices: [programChoice('protocol')], modifiers: [M('cast.program.{choice.program}', 1)] },
  'nanobots-em-enxame': { stackable: true, modifiers: [M('cast.heal', '1d4')] },
  'edge-extra': { stackable: true, modifiers: [M('edge.max', 1)] },
  exploit: { stackable: true, automation: 'exploit' },
  'camuflagem-optica': { usesCfg: uses(1, 'rest'), activation: 'action', automation: 'use' },
  'setlist-maior': { stackable: true, modifiers: [M('cast.known', 1)] },
  afinacao: { stackable: true, choices: [programChoice('set')], modifiers: [M('cast.program.{choice.program}', 1)] },
  'backing-track': { usesCfg: uses(1, 'rest'), activation: 'free', automation: 'use' },
  'drone-auxiliar': { automation: 'aux-drone' },
  'armamento-do-drone': { stackable: true, modifiers: [M('drone.attack', 1), M('drone.damage', 1)] },
  'chassi-reforcado': { stackable: true, modifiers: [M('drone.hp', 4), M('drone.ac', 1)] }
};

function talents() {
  const out = [];
  const specificBySlot = {};
  let sort = 0;
  for (const cls of CLASSES) {
    const table = book.section(cls.section).tables.find((t) => t.header[0] === '2d6');
    for (const row of table.rows) {
      const range = row[0];
      const [name, text] = splitBold(row[1]);
      if (range === '7-9') {
        sort += 100;
        const abilityText = cls.abilities.map((a) => a.toUpperCase());
        const label = `+2 em ${abilityText.slice(0, -1).join(', ')} ou ${abilityText.at(-1)}`;
        const doc = feature({
          name: label,
          identifier: `atributo-${cls.id}`,
          kind: 'talent',
          text: `Escolha um dos atributos listados (${abilityText.join(', ')}) e some +2 ao valor dele.`,
          source: CLASS_SRC(cls.section),
          folder: `Talentos: ${cls.label}`,
          sort,
          stackable: true,
          choices: [{ key: 'abilities', kind: 'ability', options: cls.abilities }],
          modifiers: [M('abilities.{choice.abilities}.value', 2, { label: 'Talento' })],
          flags: { class: cls.id, tableRange: range }
        });
        out.push(doc);
        specificBySlot[`${cls.id}:${range}`] = doc.identifier;
        continue;
      }
      if (range === '12') {
        specificBySlot[`${cls.id}:12`] = 'escolha-livre';
        continue;
      }
      sort += 100;
      const identifier = slug(name);
      const mech = TALENT_MECHANICS[identifier];
      if (!mech) throw new Error(`Talento sem mecânica definida: ${identifier}`);
      out.push(
        feature({
          name,
          identifier,
          kind: 'talent',
          text,
          source: CLASS_SRC(cls.section),
          folder: `Talentos: ${cls.label}`,
          sort,
          stackable: true,
          flags: { class: cls.id, tableRange: range },
          ...mech
        })
      );
      specificBySlot[`${cls.id}:${range}`] = identifier;
    }
  }
  sort += 100;
  out.push(
    feature({
      name: 'Escolha livre',
      identifier: 'escolha-livre',
      kind: 'talent',
      text: 'Resultado 12 da tabela de talentos: escolha qualquer talento da tabela da sua classe ou +2 pontos de atributo, divididos como quiser.',
      source: 'Livro v0.6, 4 (tabelas de talentos)',
      folder: 'Talentos: Genéricos',
      sort,
      automation: 'talent-free-choice',
      stackable: true
    }),
    feature({
      name: 'Ajuste de atributo',
      identifier: 'ajuste-de-atributo',
      kind: 'talent',
      text: '+2 pontos de atributo, divididos como você quiser (resultado 12 da tabela de talentos). Os modificadores são preenchidos ao criar o talento.',
      source: 'Livro v0.6, 4 (tabelas de talentos)',
      folder: 'Talentos: Genéricos',
      sort: sort + 100,
      stackable: true
    })
  );
  return { items: out, slots: specificBySlot };
}

/* ------------------------------------------------------------------ */
/* Gatilhos de Edge (18)                                               */
/* ------------------------------------------------------------------ */

const ALIGNMENTS = [
  { id: 'controle', label: 'Controle', table: 'Controle' },
  { id: 'sobrevivencia', label: 'Sobrevivência', table: 'Sobrevivência' },
  { id: 'liberdade', label: 'Liberdade', table: 'Liberdade' }
];

function edgeTriggers() {
  const out = [];
  for (const al of ALIGNMENTS) {
    book.table('6.1', al.table).rows.forEach((row, i) => {
      const [name, text] = splitBold(row[1]);
      out.push(
        feature({
          name,
          kind: 'edge-trigger',
          text,
          source: 'Livro v0.6, 6.1',
          folder: `Gatilhos: ${al.label}`,
          sort: (i + 1) * 100,
          identifier: `gatilho-${slug(name)}`,
          flags: { alignment: al.id, triggerRoll: Number(row[0]) }
        })
      );
    });
  }
  return out;
}

const talentData = talents();

export const featureItems = [...classFeatures(), ...originTraits(), ...mutations(), ...talentData.items, ...edgeTriggers()];
export const talentSlots = talentData.slots;
export const classList = CLASSES;
export const alignmentList = ALIGNMENTS;
export const FAMILIES_LIST = FAMILIES;
