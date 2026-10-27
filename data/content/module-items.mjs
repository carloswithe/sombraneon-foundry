import { book, html, item, M, F, ADV, SET, uses, NO_USES, plain, slug, ICON } from './lib.mjs';

const price = (cell) => Number(String(cell).replace(/[^\d]/g, '')) || 0;

/* ------------------------------------------------------------------ */
/* Armas (12)                                                          */
/* ------------------------------------------------------------------ */

const WEAPON_META = {
  faca: { family: 'blades', kind: 'melee', range: 'close', hands: 1, properties: ['light', 'thrown'] },
  soqueira: { family: 'blunt', kind: 'melee', range: 'close', hands: 1, properties: ['light'] },
  'bastao-de-choque': { family: 'shock', kind: 'melee', range: 'close', hands: 1, properties: ['light', 'stun'], stunOn: 'nat20' },
  'katana-monofio': { family: 'blades', kind: 'melee', range: 'close', hands: 1, properties: [], ignoreArmor: 1 },
  'marreta-cibernetica': { family: 'blunt', kind: 'melee', range: 'close', hands: 2, properties: ['twoHanded'] },
  'pistola-leve': { family: 'pistols', kind: 'ranged', range: 'near', hands: 1, properties: ['light'], usesMagazines: true },
  'pistola-pesada': { family: 'pistols', kind: 'ranged', range: 'near', hands: 1, properties: [], usesMagazines: true },
  submetralhadora: { family: 'smgs', kind: 'ranged', range: 'near', hands: 1, properties: ['burst'], usesMagazines: true },
  escopeta: { family: 'shotguns', kind: 'ranged', range: 'near', hands: 2, properties: ['twoHanded'], usesMagazines: true },
  fuzil: { family: 'rifles', kind: 'ranged', range: 'far', hands: 2, properties: ['twoHanded'], usesMagazines: true },
  'rifle-de-precisao': { family: 'rifles', kind: 'ranged', range: 'far', hands: 2, properties: ['twoHanded', 'aim'], usesMagazines: true },
  'arma-inteligente': { family: 'smart', kind: 'ranged', range: 'near', hands: 1, properties: [], usesMagazines: true, attackBonus: 1 }
};

function weapons() {
  const rows = [
    ...book.table('8.2').rows.map((r) => ({ section: '8.2', name: plain(r[0]), damage: r[1], slots: Number(r[2]), price: price(r[3]), notes: plain(r[4]) })),
    ...book.table('8.3').rows.map((r) => ({ section: '8.3', name: plain(r[0]), damage: r[1], slots: Number(r[3]), price: price(r[4]), notes: plain(r[5]) }))
  ];
  return rows.map((r, i) => {
    const id = slug(r.name);
    const meta = WEAPON_META[id];
    if (!meta) throw new Error(`Arma sem metadados: ${id}`);
    return item({
      type: 'weapon',
      name: r.name,
      identifier: id,
      img: ICON(meta.kind === 'melee' ? 'weapon-melee' : 'weapon-ranged'),
      folder: meta.kind === 'melee' ? 'Armas brancas' : 'Armas de fogo e inteligentes',
      sort: (i + 1) * 100,
      source: `Livro v0.5, ${r.section}`,
      description: html(r.notes ? `${r.notes}.` : ''),
      system: {
        kind: meta.kind,
        family: meta.family,
        damage: r.damage,
        range: meta.range,
        hands: meta.hands,
        slots: r.slots,
        price: r.price,
        properties: meta.properties,
        attackBonus: meta.attackBonus ?? 0,
        ignoreArmor: meta.ignoreArmor ?? 0,
        stunOn: meta.stunOn ?? '',
        usesMagazines: !!meta.usesMagazines,
        magEmpty: false,
        abilityOverride: '',
        equipped: false
      }
    });
  });
}

/* ------------------------------------------------------------------ */
/* Armaduras (3)                                                       */
/* ------------------------------------------------------------------ */

const ARMOR_META = {
  'jaqueta-blindada': { ac: 11, addDex: true, type: 'light', penalties: [] },
  'colete-tatico': { ac: 13, addDex: true, type: 'medium', penalties: ['stealth'] },
  'armadura-corp-pesada': { ac: 15, addDex: false, type: 'heavy', penalties: ['stealth', 'swim'] }
};

function armors() {
  return book.table('8.4').rows.map((r, i) => {
    const name = plain(r[0]);
    const id = slug(name);
    const meta = ARMOR_META[id];
    return item({
      type: 'armor',
      name,
      identifier: id,
      img: ICON('armor'),
      sort: (i + 1) * 100,
      source: 'Livro v0.5, 8.4',
      description: html(`CA ${plain(r[1])}. ${plain(r[4])}.`),
      system: { ...meta, slots: Number(r[2]), price: price(r[3]), equipped: false }
    });
  });
}

/* ------------------------------------------------------------------ */
/* Equipamento (18)                                                    */
/* ------------------------------------------------------------------ */

const GEAR_META = {
  'deck-de-rua': { category: 'deck', bonus: 0 },
  'deck-corp': { category: 'deck', bonus: 1 },
  'deck-militar': { category: 'deck', bonus: 2 },
  firewall: { category: 'firewall', perSlot: 2 },
  nanokit: { category: 'nanokit' },
  'kit-cirurgico': { category: 'surgical' },
  'kit-medico': { category: 'medical' },
  'kit-de-ferramentas': { category: 'tool' },
  'rig-de-palco': { category: 'stage-rig' },
  lanterna: { category: 'light' },
  bateria: { category: 'battery', perSlot: 2 },
  carregador: { category: 'ammo', perSlot: 2 },
  'cabo-de-interface': { category: 'cable' },
  stim: { category: 'stim', perSlot: 2 },
  radio: { category: 'radio' },
  'racao-3': { category: 'ration', uses: { max: 3, value: 3, per: '' }, id: 'racao' },
  'rig-utilitario': { category: 'utility-rig', freeFirst: true }
};

const gear = (over) => ({
  category: 'general',
  quantity: 1,
  slots: 1,
  perSlot: 1,
  freeFirst: false,
  price: 0,
  bonus: 0,
  uses: NO_USES,
  vehicle: { passengers: '', ac: 0, hp: 0, notes: '' },
  module: { ac: 0, effect: '' },
  ...over
});

function equipment() {
  const out = book.table('8.5').rows.map((r, i) => {
    const raw = plain(r[0]);
    const slugged = slug(raw);
    const meta = GEAR_META[slugged];
    if (!meta) throw new Error(`Equipamento sem metadados: ${slugged}`);
    const id = meta.id ?? slugged;
    const name = id === 'racao' ? 'Ração (3)' : raw;
    const { id: _ignored, ...rest } = meta;
    const notes = plain(r[3]);
    return item({
      type: 'gear',
      name,
      identifier: id,
      img: ICON(`gear-${meta.category}`),
      folder: 'Equipamento geral',
      sort: (i + 1) * 100,
      source: 'Livro v0.5, 8.5',
      description: html(notes ? `${notes}.` : ''),
      system: gear({ price: price(r[1]), ...rest, slots: /por slot/.test(r[2]) ? 1 : Number(String(r[2]).match(/\d+/)?.[0] ?? 1) })
    });
  });
  out.push(
    item({
      type: 'gear',
      name: 'Kit de Runner',
      identifier: 'kit-de-runner',
      img: ICON('gear-general'),
      folder: 'Pacotes',
      sort: 2000,
      source: 'Livro v0.5, 8.6',
      description: html('Pacote opcional de 300 cr e 4 slots: rig utilitário, 3 rações (1 pacote de 3 usos), 2 baterias, lanterna e cabo de interface.'),
      system: gear({ price: 300, slots: 4 }),
      flags: {
        bundle: [
          ['rig-utilitario', 1],
          ['racao', 1],
          ['bateria', 2],
          ['lanterna', 1],
          ['cabo-de-interface', 1]
        ]
      }
    })
  );
  return out;
}

/* ------------------------------------------------------------------ */
/* Veículos e módulos de drone (7)                                     */
/* ------------------------------------------------------------------ */

function vehicles() {
  const vs = [].map((r, i) => {
    const name = plain(r[0]);
    const [ac, hp] = plain(r[3]).split('/').map((n) => Number(n.trim()));
    return item({
      type: 'gear',
      name,
      identifier: slug(name),
      img: ICON('gear-vehicle'),
      folder: 'Veículos',
      sort: (i + 1) * 100,
      source: 'Livro v0.5, 8.7',
      description: html(`${plain(r[4]) ? `${plain(r[4])}. ` : ''}Manobras sob pressão exigem teste de DES CD 12.`),
      system: gear({
        category: 'vehicle',
        slots: 0,
        price: price(r[1]),
        vehicle: { passengers: plain(r[2]), ac, hp, notes: plain(r[4]) }
      })
    });
  });
  const MODULES = { 'sensor-termico': 0, 'compartimento-de-carga': 0, 'placa-de-impacto': 1 };
  const ms = book.section('8.7').tables.find((t) => /^Módulo/.test(t.header[0])).rows.map((r, i) => {
    const name = plain(r[0]);
    const id = slug(name);
    return item({
      type: 'gear',
      name,
      identifier: id,
      img: ICON('gear-drone-module'),
      folder: 'Módulos de drone',
      sort: (i + 1) * 100,
      source: 'Livro v0.5, 8.7',
      description: html(plain(r[2])),
      system: gear({ category: 'drone-module', slots: 0, price: price(r[1]), module: { ac: MODULES[id], effect: plain(r[2]) } })
    });
  });
  return [...vs, ...ms];
}

/* ------------------------------------------------------------------ */
/* Implantes (28)                                                      */
/* ------------------------------------------------------------------ */

const TIER = (modifiers = [], extra = {}) => ({
  modifiers,
  uses: NO_USES,
  weapon: null,
  choices: [],
  flags: [],
  ...extra
});

const W = (damage, range, extra = {}) => ({ name: '', damage, range, kind: '', family: '', ignoreArmor: 0, stunOn: '', notes: '', properties: [], ...extra });

/**
 * Mecânica de cada implante (05 seção 9). `modifiers` e `weapon` de cada qualidade trazem o
 * conjunto TOTAL daquela qualidade, não deltas.
 */
const IMPLANTS = {
  'reflexos-neurais': {
    slot: 'neural',
    street: TIER([F('initiative.advantage')]),
    corp: TIER([F('initiative.advantage'), M('check.avoid-danger', 1)]),
    military: TIER([F('initiative.advantage'), M('check.avoid-danger', 1), F('initiative.first')], { automation: 'neural-first' })
  },
  'alvejador-neural': {
    slot: 'neural',
    street: TIER([M('attack.ranged', 1)]),
    corp: TIER([M('attack.ranged', 1), F('flag.ignoreCover')]),
    military: TIER([M('attack.ranged', 1), F('flag.ignoreCover'), M('damage.ranged', 1)])
  },
  'potencializador-mental': {
    slot: 'neural',
    street: TIER([M('abilities.{choice.a}.value', 1)], { choices: [{ key: 'a', kind: 'ability', options: ['int', 'sab'] }] }),
    corp: TIER([M('abilities.int.value', 1), M('abilities.sab.value', 1)]),
    military: TIER(
      [
        M('abilities.int.value', 2, { when: 'choice:major=int' }),
        M('abilities.sab.value', 1, { when: 'choice:major=int' }),
        M('abilities.sab.value', 2, { when: 'choice:major=sab' }),
        M('abilities.int.value', 1, { when: 'choice:major=sab' })
      ],
      { choices: [{ key: 'major', kind: 'ability', options: ['int', 'sab'] }] }
    )
  },
  'jack-de-interface': {
    slot: 'neural',
    street: TIER([M('cast.bonus', 1, { when: 'class:netrunner' }), F('flag.directInterface')]),
    corp: TIER([M('cast.bonus', 1, { when: 'class:netrunner' }), F('flag.directInterface'), F('flag.remoteCable')]),
    military: TIER([M('cast.bonus', 1, { when: 'class:netrunner' }), F('flag.directInterface'), F('flag.remoteCable'), ADV('check.stay-connected')])
  },
  'filtro-de-dor': {
    slot: 'neural',
    street: TIER([], { uses: uses(1, 'rest'), automation: 'pain-filter' }),
    corp: TIER([], { uses: uses(2, 'rest'), automation: 'pain-filter' }),
    military: TIER([F('flag.immuneStun'), F('flag.immuneFear')], { uses: uses(2, 'rest'), automation: 'pain-filter' })
  },
  'olhos-termicos': {
    slot: 'neural',
    street: TIER([F('flag.darkvisionNear')]),
    corp: TIER([F('flag.darkvisionFar'), F('flag.seeHeat')]),
    military: TIER([F('flag.darkvisionFar'), F('flag.seeHeat'), ADV('check.perceive'), F('flag.ignoreDarkSmoke')])
  },
  'memoria-estendida': {
    slot: 'neural',
    street: TIER([ADV('check.recall')]),
    corp: TIER([ADV('check.recall'), F('flag.perfectRecall')]),
    military: TIER([ADV('check.recall'), F('flag.perfectRecall')], { uses: uses(1, 'rest'), automation: 'memory-boost' })
  },

  'subderme-blindada': {
    slot: 'body',
    street: TIER([M('ac.bonus', 1)]),
    corp: TIER([M('ac.bonus', 2)]),
    military: TIER([M('ac.bonus', 2), F('crit.immune')])
  },
  'quadro-cinetico': {
    slot: 'body',
    street: TIER([M('abilities.{choice.a}.value', 1)], { choices: [{ key: 'a', kind: 'ability', options: ['for', 'des'] }] }),
    corp: TIER([M('abilities.{choice.a}.value', 2)], { choices: [{ key: 'a', kind: 'ability', options: ['for', 'des'] }] }),
    military: TIER(
      [
        M('abilities.for.value', 2, { when: 'choice:a=for' }),
        M('abilities.des.value', 1, { when: 'choice:a=for' }),
        M('abilities.des.value', 2, { when: 'choice:a=des' }),
        M('abilities.for.value', 1, { when: 'choice:a=des' })
      ],
      { choices: [{ key: 'a', kind: 'ability', options: ['for', 'des'] }] }
    )
  },
  'coracao-cibernetico': {
    slot: 'body',
    street: TIER([M('abilities.con.value', 1)]),
    corp: TIER([M('abilities.con.value', 2)]),
    military: TIER([M('abilities.con.value', 2), SET('dying.die', 'd6')])
  },
  'protocolo-social': {
    slot: 'body',
    street: TIER([M('abilities.car.value', 1)]),
    corp: TIER([M('abilities.car.value', 2)]),
    military: TIER([M('abilities.car.value', 2), ADV('check.social')])
  },
  contrapeso: {
    slot: 'body',
    street: TIER([M('slots.bonus', 2)]),
    corp: TIER([M('slots.bonus', 4)]),
    military: TIER([M('slots.bonus', 4), ADV('check.lift')])
  },
  'sistema-de-estimulantes': {
    slot: 'body',
    street: TIER([], { uses: uses(1, 'rest'), automation: 'stim-system' }),
    corp: TIER([], { uses: uses(2, 'rest'), automation: 'stim-system' }),
    military: TIER([], { uses: uses(2, 'rest'), automation: 'stim-system' })
  },
  'pulmoes-filtrantes': {
    slot: 'body',
    street: TIER([F('flag.immuneGas')]),
    corp: TIER([F('flag.immuneGas'), ADV('check.resist-poison'), ADV('check.resist-disease')]),
    military: TIER([F('flag.immuneGas'), ADV('check.resist-poison'), ADV('check.resist-disease'), F('flag.breatheVacuum10min')])
  },

  'arma-retratil': {
    slot: 'arms',
    street: TIER([], { weapon: W('d6', 'close', { name: 'Arma retrátil', kind: 'melee', family: 'blades', properties: ['light'] }) }),
    corp: TIER([], { weapon: W('d8', 'close', { name: 'Arma retrátil', kind: 'melee', family: 'blades', properties: ['light'] }) }),
    military: TIER([], { weapon: W('d8', 'close', { name: 'Lâmina monofio', kind: 'melee', family: 'blades', properties: ['light'], ignoreArmor: 1 }) })
  },
  'mao-tatica': {
    slot: 'arms',
    street: TIER([], { weapon: W('d6', 'near', { name: 'Mão tática', kind: 'ranged', family: 'pistols' }) }),
    corp: TIER([], { weapon: W('d8', 'near', { name: 'Mão tática', kind: 'ranged', family: 'pistols' }) }),
    military: TIER([], { weapon: W('d8', 'far', { name: 'Mão tática', kind: 'ranged', family: 'pistols' }) })
  },
  'garras-de-pressao': {
    slot: 'arms',
    street: TIER([ADV('check.strength-arms'), M('damage.unarmed', 1)]),
    corp: TIER([ADV('check.strength-arms'), M('damage.unarmed', 2)]),
    military: TIER([ADV('check.strength-arms'), M('damage.unarmed', 2)], {
      weapon: W('d8', 'close', { name: 'Soco', kind: 'melee', family: 'unarmed', ignoreArmor: 1 })
    })
  },
  'mao-de-precisao': {
    slot: 'arms',
    street: TIER([ADV('check.delicate')]),
    corp: TIER([ADV('check.delicate'), F('flag.toolkitBuiltIn')]),
    military: TIER([ADV('check.delicate'), F('flag.toolkitBuiltIn'), M('attack.ranged', 1), ADV('check.disarm')])
  },
  'escudo-cinetico': {
    slot: 'arms',
    street: TIER([M('ac.melee', 1)]),
    corp: TIER([M('ac.melee', 2)]),
    military: TIER([M('ac.melee', 2)], { uses: uses(1, 'rest'), automation: 'kinetic-negate' })
  },
  'cabo-gancho': {
    slot: 'arms',
    street: TIER([F('flag.grapple18m')]),
    corp: TIER([F('flag.grapple18m'), F('flag.pullLight'), F('flag.climbFull')]),
    military: TIER([F('flag.grapple18m'), F('flag.pullLight'), F('flag.climbFull'), F('flag.grabTarget')])
  },
  'injetor-embutido': {
    slot: 'arms',
    street: TIER([], { uses: uses(1, 'rest'), automation: 'injector' }),
    corp: TIER([], { uses: uses(2, 'rest'), automation: 'injector' }),
    military: TIER([], { uses: uses(3, 'rest'), automation: 'injector' })
  },

  'molas-de-salto': {
    slot: 'legs',
    street: TIER([F('flag.jump2x'), F('flag.fallImmune6m')]),
    corp: TIER([F('flag.jump2x'), F('flag.fallImmune12m')]),
    military: TIER([F('flag.jump2x'), F('flag.fallImmune18m'), F('flag.verticalJumpNear')])
  },
  'motor-de-sprint': {
    slot: 'legs',
    street: TIER([F('flag.doubleMove')]),
    corp: TIER([F('flag.doubleMove'), M('damage.charge', '1d4')]),
    military: TIER([F('flag.doubleMove'), SET('damage.charge', '1d6')])
  },
  'passos-silenciosos': {
    slot: 'legs',
    street: TIER([ADV('check.stealth')]),
    corp: TIER([ADV('check.stealth'), F('flag.sensorDisadvantage')]),
    military: TIER([ADV('check.stealth'), F('flag.sensorDisadvantage')], { uses: uses(1, 'rest'), automation: 'use' })
  },
  estabilizadores: {
    slot: 'legs',
    street: TIER([ADV('check.avoid-knockdown')]),
    corp: TIER([ADV('check.avoid-knockdown'), F('flag.ignoreDifficultTerrain')]),
    military: TIER([ADV('check.avoid-knockdown'), F('flag.ignoreDifficultTerrain'), F('flag.immuneKnockdown')])
  },
  'ancoras-magneticas': {
    slot: 'legs',
    street: TIER([F('flag.magneticWalk')]),
    corp: TIER([F('flag.magneticWalk'), F('flag.magneticCeiling')]),
    military: TIER([F('flag.magneticWalk'), F('flag.magneticCeiling'), F('flag.magneticMeleeAC')])
  },
  'sub-rotina-de-passo': {
    slot: 'legs',
    street: TIER([], { uses: uses(1, 'day'), automation: 'step-subroutine' }),
    corp: TIER([], { uses: uses(1, 'rest'), automation: 'step-subroutine' }),
    military: TIER([], { uses: uses(2, 'rest'), automation: 'step-subroutine' })
  },
  'pernas-de-combate': {
    slot: 'legs',
    street: TIER([F('flag.kickKnockdown')], { weapon: W('d6', 'close', { name: 'Chute', kind: 'melee', family: 'unarmed' }) }),
    corp: TIER([F('flag.kickKnockdown')], { weapon: W('d8', 'close', { name: 'Chute', kind: 'melee', family: 'unarmed' }) }),
    military: TIER([F('flag.kickKnockdown'), M('attack.unarmed', 1)], {
      weapon: W('d8', 'close', { name: 'Chute', kind: 'melee', family: 'unarmed', stunOn: 'nat20' })
    })
  }
};

const SLOT_LABEL = { neural: 'Neural', body: 'Corpo', arms: 'Braços', legs: 'Pernas' };

function implants() {
  const out = [];
  const labels = { Neural: 'neural', Corpo: 'body', 'Braços': 'arms', Pernas: 'legs' };
  let n = 0;
  for (const [label, slot] of Object.entries(labels)) {
    for (const row of book.table('7.4', label).rows) {
      n += 1;
      const name = plain(row[0]);
      const id = slug(name);
      const meta = IMPLANTS[id];
      if (!meta) throw new Error(`Implante sem metadados: ${id}`);
      const tiers = {};
      const cols = { street: row[1], corp: row[2], military: row[3] };
      for (const q of ['street', 'corp', 'military']) {
        const t = meta[q];
        const { automation, flags, ...rest } = t;
        tiers[q] = {
          summary: plain(cols[q]),
          delta: q === 'street' ? '' : plain(cols[q]),
          modifiers: rest.modifiers,
          uses: rest.uses,
          weapon: rest.weapon,
          choices: rest.choices,
          automation: automation ?? ''
        };
      }
      tiers.street.delta = '';
      const text = ['street', 'corp', 'military']
        .map((q, i) => `<p><strong>${['Rua', 'Corp', 'Militar'][i]}:</strong> ${plain(cols[q])}</p>`)
        .join('');
      out.push(
        item({
          type: 'implant',
          name,
          identifier: id,
          img: ICON(`implant-${slot}`),
          folder: SLOT_LABEL[slot],
          sort: n * 100,
          source: 'Livro v0.5, 7.4',
          description: text,
          system: { slot, quality: 'street', installed: false, choice: {}, tiers }
        })
      );
    }
  }
  return out;
}

export const weaponItems = weapons();
export const armorItems = armors();
export const gearItems = equipment();
export const vehicleItems = vehicles();
export const implantItems = implants();
export const IMPLANT_META = IMPLANTS;
