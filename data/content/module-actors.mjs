import { book, html, plain, slug, ICON } from './lib.mjs';
import { featureItems } from './features.mjs';
import { classItems, originItems, backgroundItems, alignmentItems, CLASS_PACKAGES } from './character-items.mjs';
import { programItems } from './programs.mjs';
import { weaponItems, armorItems, gearItems, implantItems } from './module-items.mjs';
import { deriveCharacter } from '../../systems/sombraneon/src/logic/character.mjs';
import { packageCost } from '../../systems/sombraneon/src/logic/rules.mjs';

/* ------------------------------------------------------------------ */
/* ICE (5)                                                             */
/* ------------------------------------------------------------------ */

function parseAttack(text) {
  const count = Number(/^(\d+)\s+ataques?/i.exec(text)?.[1] ?? 1);
  const bonus = Number(/\+(\d+)/.exec(text)?.[1] ?? 0);
  const damage = /\((\d*d\d+)/.exec(text)?.[1] ?? '1d4';
  const type = /neural/.test(text) ? 'neural' : '';
  const name = count > 1 ? 'Ataque' : text.split('+')[0].trim();
  return { name, bonus, damage, count, type };
}

function ice() {
  return book.table('9.5').rows.map((r, i) => {
    const name = plain(r[0]);
    const [trickName, trickText] = [plain(r[5]).split(':')[0], plain(r[5]).split(':').slice(1).join(':').trim()];
    const hp = Number(r[3]);
    return {
      identifier: slug(name),
      name,
      type: 'ice',
      img: ICON('ice'),
      sort: (i + 1) * 100,
      system: {
        level: Number(r[1]),
        hp: { value: hp, max: hp },
        ac: Number(r[2]),
        attack: parseAttack(plain(r[4])),
        trick: { name: trickName, text: html(trickText) },
        networkRole: ''
      },
      prototypeToken: { name, disposition: -1, actorLink: false, bar1: { attribute: 'hp' } },
      flags: { sombraneon: { schemaVersion: 1 } }
    };
  });
}

/* ------------------------------------------------------------------ */
/* Macros (10)                                                         */
/* ------------------------------------------------------------------ */

const MACROS = [
  ['Descanso em grupo', 'restGroup()', 'Mestre'],
  ['Dar Edge', 'giveEdge()', 'Mestre'],
  ['Alerta +1', 'raiseAlert(1)', 'Mestre'],
  ['Nova invasão', 'newRun()', 'Mestre'],
  ['Reação de facção', 'reaction()', 'Mestre'],
  ['Gerador de Rede', 'rollNetwork()', 'Mestre'],
  ['Gerador de missão', 'rollMission()', 'Mestre'],
  ['Encontro por local', 'rollEncounter()', 'Mestre'],
  ['Objetivos do grupo', 'rollGroupGoals()', 'Mestre'],
  ['Teste rápido de grupo', 'groupCheck()', 'Mestre'],
  ['Teste de moral', 'moraleCheck()', 'Mestre'],
  ['Iniciativa por grupo', 'rollGroupInitiative()', 'Mestre']
];

function macros() {
  return MACROS.map(([name, call], i) => ({
    identifier: slug(name),
    name,
    type: 'script',
    docType: 'Macro',
    img: ICON('macro'),
    scope: 'global',
    command: `game.sombraneon.api.${call};`,
    sort: (i + 1) * 100,
    flags: { sombraneon: { schemaVersion: 1 } }
  }));
}

/* ------------------------------------------------------------------ */
/* Fichas prontas (6)                                                  */
/* ------------------------------------------------------------------ */

const PREGENS = [
  { name: 'Brasa', cls: 'solo', origin: 'cromado', alignment: 'sobrevivencia', trigger: 'cauteloso', background: 'ex-gangue', abilities: [15, 12, 14, 8, 10, 9], family: 'pistols', implants: ['subderme-blindada', 'reflexos-neurais'], talents: [{ id: 'arma-afinada', roll: 5 }], drive: 'Juntar créditos e cromo raros.' },
  { name: 'Vetor', cls: 'netrunner', origin: 'nat', alignment: 'liberdade', trigger: 'sabotador', background: 'hacker-de-garagem', abilities: [7, 12, 10, 16, 11, 9], programs: ['ping', 'backdoor'], talents: [{ id: 'programa-afinado', roll: 4, choice: { program: 'ping' } }, { id: 'deck-customizado', roll: 10 }], drive: 'Descobrir segredos e intrigas.' },
  { name: 'Sutura', cls: 'hyperdoc', origin: 'biomod', alignment: 'controle', trigger: 'executor', background: 'medico-de-beco', abilities: [9, 11, 12, 13, 15, 10], programs: ['nanocura', 'antidoto'], mutations: ['pele-blindada', 'reflexos-acelerados'], talents: [{ id: 'nanobots-em-enxame', roll: 10 }], drive: 'Simplesmente sobreviver.' },
  { name: 'Névoa', cls: 'ghost', origin: 'sintetico', alignment: 'liberdade', trigger: 'rebelde', background: 'entregador', abilities: [8, 16, 10, 12, 13, 11], talents: [{ id: 'exploit', roll: 5 }], drive: 'Crescer na fama da rua.' },
  { name: 'Riff', cls: 'rocker', origin: 'nat', alignment: 'sobrevivencia', trigger: 'provisor', background: 'dj-de-clube', abilities: [9, 12, 11, 10, 8, 16], programs: ['hype', 'refrao', 'solo'], talents: [{ id: 'afinacao', roll: 4, choice: { program: 'refrao' } }, { id: 'backing-track', roll: 10 }], drive: 'Crescer na fama da rua.' },
  { name: 'Zangão', cls: 'rigger', origin: 'cromado', alignment: 'controle', trigger: 'faxineiro', background: 'mecanico', abilities: [10, 15, 12, 14, 11, 8], implants: ['alvejador-neural', 'subderme-blindada'], talents: [{ id: 'armamento-do-drone', roll: 5 }], drive: 'Subir na hierarquia da corporação.' }
];

const byId = (list, id) => {
  const found = list.find((x) => x.identifier === id);
  if (!found) throw new Error(`Item não encontrado: ${id}`);
  return found;
};
const clone = (o) => JSON.parse(JSON.stringify(o));

export const AVERAGE_CREDITS = 700;

/** Monta os itens embutidos de uma ficha pronta usando as mesmas concessões do sistema. */
export function buildPregen(def) {
  const items = [];
  let n = 0;
  const push = (doc, extraFlags = {}) => {
    const copy = clone(doc);
    copy.sort = (n += 100);
    copy.flags = { ...copy.flags, sombraneon: { ...copy.flags?.sombraneon, ...extraFlags } };
    items.push(copy);
    return copy;
  };
  const cls = byId(classItems, def.cls);
  const origin = byId(originItems, def.origin);
  const alignment = byId(alignmentItems, def.alignment);
  push(origin);
  push(cls);
  push(byId(backgroundItems, def.background));
  push(alignment);
  push(byId(featureItems, `gatilho-${def.trigger}`), { grantedBy: '@alignment' });

  const grantFeatures = (source, tag) => {
    for (const [i, g] of source.system.grants.entries()) {
      if (g.kind !== 'item') continue;
      const feat = byId(featureItems, g.ref.split(':')[1]);
      const doc = push(feat, { grantedBy: tag, grantId: `item-${i}` });
      if (feat.identifier === 'dominio-de-arma') doc.system.choice = { family: def.family };
    }
  };
  grantFeatures(origin, '@origin');
  grantFeatures(cls, '@class');

  for (const id of def.programs ?? []) push(byId(programItems, id), { grantedBy: '@class' });
  for (const id of def.mutations ?? []) push(byId(featureItems, id), { grantedBy: '@origin' });

  // Pacote inicial da classe (livro 8.6)
  const catalog = [...weaponItems, ...armorItems, ...gearItems];
  const pkg = CLASS_PACKAGES[def.cls];
  let hands = 0;
  let armorOn = false;
  const priced = [];
  for (const [id, qty] of pkg) {
    const cat = byId(catalog, id);
    const doc = push(cat);
    if (cat.type === 'gear') doc.system.quantity = qty;
    priced.push({ price: cat.system.price, qty });
    if (cat.type === 'weapon' && hands + cat.system.hands <= 2) {
      doc.system.equipped = true;
      hands += cat.system.hands;
    }
    if (cat.type === 'armor' && !armorOn) {
      doc.system.equipped = true;
      armorOn = true;
    }
  }
  let spent = packageCost(priced);

  // Implantes iniciais (Cromado: grátis, qualidade Rua)
  for (const id of def.implants ?? []) {
    const imp = push(byId(implantItems, id), { grantedBy: '@origin' });
    imp.system.installed = true;
    imp.system.quality = 'street';
  }

  // Talentos rolados
  for (const t of def.talents ?? []) {
    const doc = push(byId(featureItems, t.id), { talentRoll: t.roll, talentLevel: 1 });
    if (t.choice) doc.system.choice = t.choice;
  }

  const hitDieFaces = Number(/d(\d+)/.exec(cls.system.hitDie)[1]);
  const input = {
    level: 1,
    abilityBase: Object.fromEntries(['for', 'des', 'con', 'int', 'sab', 'car'].map((k, i) => [k, def.abilities[i]])),
    hpRolls: [hitDieFaces],
    items: items.map((it, i) => ({ id: `tmp${i}`, ...it, system: it.system }))
  };
  const derived = deriveCharacter(input);
  return { items, spent, derived, input };
}

function pregens() {
  return PREGENS.map((def, i) => {
    const { items, spent, derived } = buildPregen(def);
    const abilities = Object.fromEntries(['for', 'des', 'con', 'int', 'sab', 'car'].map((k, idx) => [k, { base: def.abilities[idx] }]));
    const hitDie = Number(/d(\d+)/.exec(derived.hp.hitDie)[1]);
    return {
      identifier: slug(def.name),
      name: def.name,
      type: 'character',
      img: ICON('character'),
      sort: (i + 1) * 100,
      system: {
        abilities,
        level: 1,
        xp: { value: 0 },
        hp: { value: derived.hp.max, rolls: [hitDie], bonus: 0 },
        ac: { cover: false, override: null },
        edge: { value: 0, triggerUsed: false },
        currency: { credits: AVERAGE_CREDITS - spent },
        details: { drive: def.drive, languages: 'Dialeto da cidade', civilName: '' },
        creation: { completed: true, step: 9 }
      },
      items,
      prototypeToken: { name: def.name, disposition: 1, actorLink: true, bar1: { attribute: 'hp' } },
      flags: { sombraneon: { schemaVersion: 1, pregen: true } }
    };
  });
}

export const iceActors = ice();
export const macroDocs = macros();
export const pregenActors = pregens();
export const PREGEN_DEFS = PREGENS;
