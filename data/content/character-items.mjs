import { book, html, item, splitBold, plain, slug, ICON } from './lib.mjs';
import { alignmentList } from './features.mjs';

/* ------------------------------------------------------------------ */
/* Classes (6)                                                         */
/* ------------------------------------------------------------------ */

const grantItem = (ref, extra = {}) => ({ kind: 'item', ref, level: 1, qty: 1, from: { type: '', filter: {} }, count: 1, key: '', ...extra });
const grantChoose = (type, filter, count, extra = {}) => ({ kind: 'choose', ref: '', level: 1, qty: 1, from: { type, filter }, count, key: '', ...extra });

const CLASS_DEFS = [
  {
    id: 'solo',
    name: 'Solo',
    section: '4.1',
    hitDie: 'd8',
    keyAbilities: ['for', 'des'],
    weapons: { all: true, allowed: [] },
    armor: ['light', 'medium', 'heavy'],
    casting: null,
    features: ['dominio-de-arma', 'chassi', 'resistente', 'duro-de-matar'],
    pkg: [['pistola-pesada', 1], ['jaqueta-blindada', 1], ['faca', 1], ['carregador', 2], ['rig-utilitario', 1], ['racao', 1]]
  },
  {
    id: 'netrunner',
    name: 'Netrunner',
    section: '4.2',
    hitDie: 'd4',
    keyAbilities: ['int'],
    weapons: { all: false, allowed: ['faca', 'pistola-leve', 'bastao-de-choque'] },
    armor: ['none'],
    casting: { kind: 'program', ability: 'int', startKnown: 2, perLevel: 1, extraAtLevels: [], tierMaxByLevel: true },
    features: ['deck', 'programas'],
    choose: grantChoose('program', { kind: 'program', tier: 1 }, 2, { key: 'programs' }),
    pkg: [['deck-de-rua', 1], ['pistola-leve', 1], ['carregador', 1], ['cabo-de-interface', 1], ['bateria', 1], ['rig-utilitario', 1], ['racao', 1]]
  },
  {
    id: 'hyperdoc',
    name: 'Hyperdoc',
    section: '4.3',
    hitDie: 'd6',
    keyAbilities: ['sab'],
    weapons: { all: false, allowed: ['faca', 'pistola-leve', 'bastao-de-choque'] },
    armor: ['light', 'medium'],
    casting: { kind: 'protocol', ability: 'sab', startKnown: 2, perLevel: 1, extraAtLevels: [], tierMaxByLevel: true },
    features: ['nanokit', 'protocolos', 'primeiros-socorros', 'cirurgiao'],
    choose: grantChoose('program', { kind: 'protocol', tier: 1 }, 2, { key: 'protocols' }),
    pkg: [['nanokit', 1], ['kit-medico', 1], ['pistola-leve', 1], ['faca', 1], ['carregador', 1], ['rig-utilitario', 1], ['racao', 1]]
  },
  {
    id: 'ghost',
    name: 'Ghost',
    section: '4.4',
    hitDie: 'd4',
    keyAbilities: ['des'],
    weapons: { all: false, allowed: ['faca', 'pistola-leve', 'suppressed', 'hands:1'] },
    armor: ['light'],
    casting: null,
    features: ['ataque-furtivo', 'fantasma', 'edge-de-rua'],
    pkg: [['pistola-leve', 1], ['faca', 1], ['jaqueta-blindada', 1], ['kit-de-ferramentas', 1], ['lanterna', 1], ['rig-utilitario', 1], ['racao', 1]]
  },
  {
    id: 'rocker',
    name: 'Rocker',
    section: '4.5',
    hitDie: 'd6',
    keyAbilities: ['car'],
    weapons: { all: false, allowed: ['faca', 'pistola-leve', 'hands:1'] },
    armor: ['light'],
    casting: { kind: 'set', ability: 'car', startKnown: 3, perLevel: 0, extraAtLevels: [4, 7, 10], tierMaxByLevel: false },
    features: ['rig-de-palco', 'sets', 'palco', 'fama', 'ressonancia'],
    choose: grantChoose('program', { kind: 'set' }, 3, { key: 'sets' }),
    pkg: [['rig-de-palco', 1], ['pistola-leve', 1], ['jaqueta-blindada', 1], ['faca', 1], ['rig-utilitario', 1], ['racao', 1]]
  },
  {
    id: 'rigger',
    name: 'Rigger',
    section: '4.6',
    hitDie: 'd6',
    keyAbilities: ['des'],
    weapons: { all: false, allowed: ['pistols', 'fuzil', 'faca'] },
    armor: ['light', 'medium'],
    casting: null,
    features: ['drone-voador', 'voo', 'link', 'batedor', 'condutor'],
    pkg: [['pistola-leve', 1], ['jaqueta-blindada', 1], ['radio', 1], ['kit-de-ferramentas', 1], ['rig-utilitario', 1], ['racao', 1]]
  }
];

const classIntro = (section) => {
  const s = book.section(section);
  const m = /^\*([^*]+)\*/m.exec(s.raw);
  return m ? m[1].trim() : '';
};

function classes() {
  return CLASS_DEFS.map((c, i) => {
    const grants = c.features.map((f) => grantItem(`feature:${f}`));
    if (c.choose) grants.push(c.choose);
    const s = book.section(c.section);
    const armas = s.bullets['Armas'] ?? '';
    const text = [classIntro(c.section), `Dado de vida: ${c.hitDie}.`, armas ? `Armas: ${armas}` : ''].filter(Boolean);
    return item({
      type: 'class',
      name: c.name,
      identifier: c.id,
      img: ICON('class'),
      sort: (i + 1) * 100,
      source: `Livro v0.3, ${c.section}`,
      description: text.map((t) => html(t)).join(''),
      system: {
        hitDie: c.hitDie,
        keyAbilities: c.keyAbilities,
        weapons: c.weapons,
        armor: c.armor,
        casting: c.casting ?? { kind: '', ability: '', startKnown: 0, perLevel: 0, extraAtLevels: [], tierMaxByLevel: false },
        talentTable: `talentos-${c.id}`,
        talentLevels: [1, 3, 5, 7, 9],
        grants,
        startingPackage: c.pkg.map(([ref, qty]) => ({ ref, qty })),
        modifiers: [],
        choice: {}
      }
    });
  });
}

/* ------------------------------------------------------------------ */
/* Origens (4)                                                         */
/* ------------------------------------------------------------------ */

const ORIGIN_DEFS = [
  { id: 'nat', name: 'Nat', section: '3.1', traits: ['corpo-sem-interface', 'humanidade-firme', 'ambicioso'], extraTalents: 1, cyberAdjust: 0, cyberAdvantage: true },
  { id: 'cromado', name: 'Cromado', section: '3.2', traits: ['instalacao-de-fabrica', 'cromo-estavel', 'vulneravel'], extraTalents: 0, cyberAdjust: -1, cyberAdvantage: false },
  { id: 'sintetico', name: 'Sintético', section: '3.3', traits: ['corpo-artificial', 'interface-nativa', 'casco-de-fabrica', 'registro'], extraTalents: 0, cyberAdjust: 0, cyberAdvantage: false },
  { id: 'biomod', name: 'Biomod', section: '3.4', traits: ['genoma-instavel', 'corpo-rejeita-cromo'], extraTalents: 0, cyberAdjust: 1, cyberAdvantage: false }
];

function originIntro(section) {
  const s = book.section(section);
  const first = s.lines.map((l) => l.trim()).find((l) => l && !l.startsWith('-') && !l.startsWith('|') && !l.startsWith('**'));
  return first ?? '';
}

function origins() {
  return ORIGIN_DEFS.map((o, i) => {
    const grants = o.traits.map((t) => grantItem(`feature:${t}`));
    const needsChoices = [];
    if (o.id === 'cromado') {
      grants.push(grantChoose('implant', { quality: 'street' }, 2, { key: 'factoryImplants' }));
      needsChoices.push({ key: 'factoryImplants', kind: 'implants', count: 2, quality: 'street' });
    }
    if (o.id === 'biomod') {
      grants.push({ kind: 'roll', ref: 'mutacoes-biomod', level: 1, qty: 1, from: { type: '', filter: {} }, count: 2, key: 'mutations' });
      needsChoices.push({ key: 'mutations', kind: 'roll', count: 2, table: 'mutacoes-biomod' });
    }
    return item({
      type: 'origin',
      name: o.name,
      identifier: o.id,
      img: ICON('origin'),
      sort: (i + 1) * 100,
      source: `Livro v0.3, ${o.section}`,
      description: html(originIntro(o.section)),
      system: {
        grants,
        modifiers: [],
        extraTalents: o.extraTalents,
        cyberAdjust: o.cyberAdjust,
        cyberAdvantage: o.cyberAdvantage,
        needsChoices,
        choice: {}
      }
    });
  });
}

/* ------------------------------------------------------------------ */
/* Antecedentes (20)                                                   */
/* ------------------------------------------------------------------ */

function backgrounds() {
  return book.table('5').rows.map((row) => {
    const n = Number(row[0]);
    const name = plain(row[1]);
    const knowledge = plain(row[2]);
    const highlight = row[1].includes('**');
    return item({
      type: 'background',
      name,
      identifier: slug(name),
      img: ICON('background'),
      sort: n * 100,
      source: 'Livro v0.3, 5',
      description: html(`**Conhecimento:** ${knowledge}`),
      system: { knowledge, contactPrompt: 'Quem você conhece na cidade?', rollIndex: n, highlight }
    });
  });
}

/* ------------------------------------------------------------------ */
/* Alinhamentos (3)                                                    */
/* ------------------------------------------------------------------ */

const REACTIONS = {
  controle: { police: 2, execs: 2, citizens: 1, gangs: -1, blackMarket: -1, cults: -1, punks: -2, syntheticsFree: -1 },
  sobrevivencia: { police: 0, execs: 0, citizens: 0, gangs: 1, blackMarket: 2, cults: 0, punks: 0, syntheticsFree: 0 },
  liberdade: { police: -2, execs: -2, citizens: -1, gangs: 1, blackMarket: 0, cults: 1, punks: 2, syntheticsFree: 2 }
};
const MAPS_TO = { controle: 'order', sobrevivencia: 'neutral', liberdade: 'chaos' };

function alignments() {
  const rows = book.table('6').rows;
  return alignmentList.map((a, i) => {
    const row = rows.find((r) => plain(r[0]) === a.label);
    return item({
      type: 'alignment',
      name: a.label,
      identifier: a.id,
      img: ICON(`alignment-${a.id}`),
      sort: (i + 1) * 100,
      source: 'Livro v0.3, 6',
      description: html(`${plain(row[2])} (equivale a ${plain(row[1])} no Shadowdark).`),
      system: {
        mapsTo: MAPS_TO[a.id],
        edgeTriggerTable: `gatilhos-${a.id}`,
        reaction: REACTIONS[a.id],
        summary: plain(row[2])
      }
    });
  });
}

export const classItems = classes();
export const originItems = origins();
export const backgroundItems = backgrounds();
export const alignmentItems = alignments();
export const CLASS_PACKAGES = Object.fromEntries(CLASS_DEFS.map((c) => [c.id, c.pkg]));
