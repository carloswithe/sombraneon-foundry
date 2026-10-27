import { loadBook, chapters, ROOT } from '../../tools/lib/book.mjs';
import { marked } from 'marked';
import path from 'node:path';
import { html, item, plain, slug, inlineHtml, splitBold, ICON, NO_USES } from './lib.mjs';

/**
 * Conteúdo dos dois compêndios companheiros do livro v0.5:
 *   docs/sombraneon-ameacas.md          (Compêndio de Ameaças)
 *   docs/sombraneon-veiculos-armas.md   (Compêndio de Veículos e Armamento)
 * Tudo aqui é extraído dos arquivos Markdown; só a camada mecânica (tipos e propriedades) é declarada.
 */

const threatsBook = loadBook(path.join(ROOT, 'docs', 'sombraneon-ameacas.md'));
const vehiclesBook = loadBook(path.join(ROOT, 'docs', 'sombraneon-veiculos-armas.md'));

const price = (cell) => Number(String(cell).replace(/[^\d]/g, '')) || 0;
const num = (cell) => Number(String(plain(cell)).replace(/[^\d-]/g, '')) || 0;
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/* ------------------------------------------------------------------ */
/* Fichas de ameaça (NPC)                                              */
/* ------------------------------------------------------------------ */

const RANGE = { Perto: 'close', Próximo: 'near', Longe: 'far', Distante: 'distant' };
const MORALE = { Fraca: 'weak', Normal: 'normal', Firme: 'firm', Fanática: 'fanatic', 'Sem medo': 'fanatic' };
const MORALE_CD = { weak: 18, normal: 15, firm: 12, fanatic: 15 };

function splitOutsideParens(text, sep) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (depth === 0 && text.startsWith(sep, i)) {
      parts.push(text.slice(start, i));
      start = i + sep.length;
      i += sep.length - 1;
    }
  }
  parts.push(text.slice(start));
  return parts;
}

const COMPLETE = /([+-]\d+(\s*\(.*\))?|\(CD \d+\)|\(\*\*Hack\*\*\s*[+-]\d+\))$/;

function parseOneAttack(frag) {
  const text = frag.trim();
  let m = /^(?:(\d+)\s+)?(.+?)\s+\(\*\*Hack\*\*\s*([+-]\d+)\)$/.exec(text);
  if (m) return { name: cap(`${m[1] ? `${m[1]} ` : ''}${m[2]}`), bonus: Number(m[3]), damage: '', range: 'near', notes: 'Hack', heavy: false };
  m = /^(?:(\d+)\s+)?(.+?)\s+([+-]\d+)(?:\s*\((.*)\))?$/.exec(text);
  if (!m) {
    const cd = /^(?:(\d+)\s+)?(.+?)\s+\(CD (\d+)\)$/.exec(text);
    if (cd) return { name: cap(`${cd[1] ? `${cd[1]} ` : ''}${cd[2]}`), bonus: 0, damage: '', range: 'near', notes: `CD ${cd[3]}`, heavy: false };
    throw new Error(`Ataque não reconhecido: ${frag}`);
  }
  const [, count, rawName, bonus, inner = ''] = m;
  const tokens = inner ? splitOutsideParens(inner, ', ').map((s) => s.trim()) : [];
  let damage = '';
  let range = '';
  let heavy = false;
  const notes = [];
  for (const tk of tokens) {
    const dm = /^(\d*d\d+(?:[+-]\d+)?)(?:\s*\+\s*(.*))?$/.exec(tk);
    if (dm && !damage) {
      damage = dm[1];
      if (dm[2]) notes.push(dm[2]);
    } else if (RANGE[tk] && !range) range = RANGE[tk];
    else if (tk === 'Pesada') heavy = true;
    else notes.push(tk);
  }
  if (!range) range = /granada/i.test(rawName) ? 'near' : 'close';
  return { name: cap(`${count ? `${count} ` : ''}${rawName}`), bonus: Number(bonus), damage, range, notes: notes.join(', '), heavy };
}

function parseAttacks(line) {
  const text = line.replace(/^\*\*ATQ:\*\*\s*/, '').trim().replace(/\.$/, '').replace(/,\s*mais .*$/, '');
  if (/^nenhum/i.test(text)) return [];
  const out = [];
  let acc = '';
  for (const frag of splitOutsideParens(text, ' ou ')) {
    acc = acc ? `${acc} ou ${frag}` : frag;
    if (COMPLETE.test(acc.trim())) {
      for (const part of splitOutsideParens(acc, ' e ').flatMap((x) => splitOutsideParens(x, ', '))) out.push(parseOneAttack(part));
      acc = '';
    }
  }
  if (acc) out.push(parseOneAttack(acc));
  return out;
}

/** Saque por NA (Compêndio de Ameaças, 1.5). */
function lootFor(na) {
  const rows = threatsBook.table('1.5').rows.map((r) => ({ range: plain(r[0]), money: plain(r[1]), gear: plain(r[2]) }));
  const row = rows.find((r) => {
    const [a, b] = r.range.split(/\s+a\s+/).map(Number);
    return na >= a && na <= (b ?? a);
  });
  return row ? `<p><strong>Credstick:</strong> ${row.money}. <strong>Equipamento:</strong> ${row.gear}</p>` : '';
}

/** Blocos de ficha (#### Nome (NA n)) de uma seção: linhas contíguas até a primeira linha em branco. */
function blocksOf(book, number) {
  const blocks = [];
  let cur = null;
  for (const raw of book.section(number).lines) {
    const h = /^####\s+(.+?)\s+\(NA\s+(\d+)\)\s*$/.exec(raw);
    if (h) {
      cur = { name: h[1].trim(), na: Number(h[2]), lines: [] };
      blocks.push(cur);
      continue;
    }
    if (!raw.trim() || /^(#{1,4}\s|>|---)/.test(raw)) {
      cur = null;
      continue;
    }
    if (cur) cur.lines.push(raw.trim());
  }
  return blocks;
}

function statPairs(line) {
  const out = {};
  for (const part of line.split(' | ')) {
    const m = /^\*\*(.+?)\*\*\s*(.*)$/.exec(part.trim());
    if (m) out[m[1].replace(/\.$/, '')] = m[2].trim();
  }
  return out;
}

const traitHtml = (lines) => lines.map((l) => `<p>${inlineHtml(l)}</p>`).join('');

function npcFromBlock(block, { folder, sort, source, kind = 'stat' }) {
  const desc = block.lines.find((l) => !l.startsWith('**'));
  const statLine = block.lines.find((l) => l.startsWith('**CA**'));
  const atqLine = block.lines.find((l) => l.startsWith('**ATQ:**'));
  const rest = block.lines.filter((l) => l !== desc && l !== statLine && l !== atqLine);
  let ac = 10;
  let hp = 1;
  let movement = '';
  let alignment = '';
  let bl = 0;
  let moraleKind = 'fanatic';
  if (statLine) {
    const s = statPairs(statLine);
    ac = Number(s.CA);
    hp = Number(s.HP);
    movement = s.MOV ?? '';
    alignment = s['Alinh'] ?? s['Alinh.'] ?? '';
    if (s.BL) bl = Number(s.BL);
    if (s.Moral) moraleKind = MORALE[s.Moral] ?? 'normal';
  } else {
    const core = block.lines.find((l) => l.startsWith('**Núcleo:**'));
    const m = /CA\s+(\d+)\s*\|\s*HP\s+(\d+)/.exec(core ?? '');
    if (m) {
      ac = Number(m[1]);
      hp = Number(m[2]);
    }
  }
  if (!bl) {
    const m = /Blindagem\s+(\d+)/.exec(rest.join(' ')) ?? /reduz em (\d+) todo dano/.exec(rest.join(' '));
    if (m) bl = Number(m[1]);
  }
  const attacks = atqLine ? parseAttacks(atqLine) : [];
  const escort = /,\s*mais (.*?)\.?$/.exec(atqLine ?? '')?.[1];
  const traits = [desc ? `<p><em>${inlineHtml(desc)}</em></p>` : '', escort ? `<p><strong>Acompanhantes:</strong> ${inlineHtml(escort)}.</p>` : '', traitHtml(rest)].join('');
  const id = slug(block.name);
  return {
    identifier: id,
    name: block.name,
    type: 'npc',
    img: ICON(kind === 'ai' ? 'ice' : 'npc'),
    folder,
    sort,
    system: {
      level: block.na,
      hp: { value: hp, max: hp },
      ac,
      armor: bl,
      movement,
      alignment,
      initiative: 0,
      morale: { enabled: moraleKind !== 'fanatic', kind: moraleKind, mod: 0, cd: MORALE_CD[moraleKind] },
      attacks,
      traits,
      loot: kind === 'ai' ? '' : lootFor(block.na),
      credits: 0
    },
    prototypeToken: { name: block.name, disposition: -1, actorLink: false, bar1: { attribute: 'hp' } },
    flags: { sombraneon: { schemaVersion: 1, source } }
  };
}

const THREAT_SECTIONS = [
  ['2.1', 'Gente da rua'],
  ['2.2', 'Gangues'],
  ['2.3', 'Lei e segurança'],
  ['2.4', 'Mercenários e militares'],
  ['2.5', 'Ciborgues, sintéticos e aberrações'],
  ['2.6', 'Máquinas'],
  ['2.7', 'Fauna urbana'],
  ['4.1', 'Executivos'],
  ['5.4', 'Hackers inimigos'],
  ['7.1', 'Cultistas']
];

function threatNpcs() {
  const out = [];
  let sort = 0;
  for (const [n, folder] of THREAT_SECTIONS) {
    for (const block of blocksOf(threatsBook, n)) {
      sort += 100;
      out.push(npcFromBlock(block, { folder, sort, source: `Compêndio de Ameaças, ${n}` }));
    }
  }
  return out;
}

function aiNpcs() {
  return blocksOf(threatsBook, '6.2').map((block, i) => {
    const doc = npcFromBlock(block, { folder: 'IAs', sort: 9000 + i * 100, source: 'Compêndio de Ameaças, 6.2', kind: 'ai' });
    doc.system.morale.enabled = false;
    doc.system.traits += `<p><strong>Servidor:</strong> CA 12 e HP ${block.na * 2} (2 x NA). Destruí-lo mata a IA, mas apaga dados e butim.</p>`;
    return doc;
  });
}

function vehicleThreatNpcs() {
  const blocks = blocksOf(vehiclesBook, '9');
  const out = blocks.map((block, i) => npcFromBlock(block, { folder: 'Veículos e mechas', sort: 12000 + i * 100, source: 'Compêndio de Veículos e Armamento, 9', kind: 'vehicle' }));
  for (const doc of out) {
    doc.img = ICON('gear-vehicle');
    doc.system.morale.enabled = false;
    doc.system.morale.kind = 'fanatic';
  }
  const turret = {
    identifier: 'torreta-sentinela-autonoma',
    name: 'Torreta sentinela autônoma',
    type: 'npc',
    img: ICON('gear-vehicle'),
    folder: 'Veículos e mechas',
    sort: 13000,
    system: {
      level: 3,
      hp: { value: 20, max: 20 },
      ac: 14,
      armor: 2,
      movement: 'Fixo',
      alignment: 'Controle',
      initiative: 0,
      morale: { enabled: false, kind: 'fanatic', mod: 0, cd: 15 },
      attacks: [{ name: 'Metralhadora pesada', bonus: 5, damage: '2d8', range: 'far', notes: 'Rajada', heavy: false }],
      traits: `<p><em>Uma torreta com sensor, bateria e uma IA simples. Dispara em quem não portar o transponder.</em></p><p><strong>Vigília:</strong> detecta movimento em até Longe e ataca quem não portar o transponder.</p><p><strong>Hackeável:</strong> hack CD 15.</p><p><strong>Máquina.</strong> Instalação: 1 hora. Bateria: 1 dia. Custo 12.000 cr, licença R.</p>`,
      loot: '',
      credits: 0
    },
    prototypeToken: { name: 'Torreta sentinela autônoma', disposition: -1, actorLink: false, bar1: { attribute: 'hp' } },
    flags: { sombraneon: { schemaVersion: 1, source: 'Compêndio de Veículos e Armamento, 7.3' } }
  };
  return [...out, turret];
}

export const threatActors = [...threatNpcs(), ...aiNpcs(), ...vehicleThreatNpcs()];

/* ------------------------------------------------------------------ */
/* ICE adicional e malware                                             */
/* ------------------------------------------------------------------ */

function parseIceAttack(text) {
  const t = plain(text);
  if (/^nenhum/i.test(t)) return { name: '', bonus: 0, damage: '', count: 1, type: '' };
  const m = /^(?:(\d+)\s+)?(.+?)(?:\s+([+-]\d+))?(?:\s*\((.*)\))?$/.exec(t);
  const count = Number(m[1] ?? 1);
  const inner = m[4] ?? '';
  const dice = /(\d*d\d+)/.exec(inner)?.[1] ?? '';
  return { name: count > 1 ? 'Ataque' : cap(m[2].trim()), bonus: Number(m[3] ?? 0), damage: dice, count, type: /neural/.test(inner) ? 'neural' : '' };
}

function iceRows(section, folder, role, base) {
  return threatsBook.table(section).rows.map((r, i) => {
    const name = plain(r[0]);
    const [trickName, trickText] = splitBold(r[5]);
    const hasTitle = /^\*\*/.test(r[5].trim());
    const hp = Number(r[3]);
    return {
      identifier: slug(name),
      name,
      type: 'ice',
      img: ICON('ice'),
      folder,
      sort: base + (i + 1) * 100,
      system: {
        level: Number(r[1]),
        hp: { value: hp, max: hp },
        ac: Number(r[2]),
        attack: parseIceAttack(r[4]),
        trick: { name: hasTitle ? trickName : 'Efeito', text: html(hasTitle ? trickText : plain(r[5])) },
        networkRole: role
      },
      prototypeToken: { name, disposition: -1, actorLink: false, bar1: { attribute: 'hp' } },
      flags: { sombraneon: { schemaVersion: 1, source: `Compêndio de Ameaças, ${section}` } }
    };
  });
}

export const extraIceActors = [...iceRows('5.2', 'ICE adicional', 'ice', 1000), ...iceRows('5.3', 'Malware', 'malware', 2000)];

/* ------------------------------------------------------------------ */
/* Veículos, módulos, exoesqueletos e mechas (itens)                   */
/* ------------------------------------------------------------------ */

const TERRAIN = { T: 'land', Ar: 'air', Aq: 'water' };
const gearBase = (over) => ({
  category: 'general',
  quantity: 1,
  slots: 1,
  perSlot: 1,
  freeFirst: false,
  price: 0,
  bonus: 0,
  uses: NO_USES,
  vehicle: { category: '', terrain: '', passengers: '', ac: 0, hp: 0, bl: 0, maneuver: 0, speed: '', cargo: 0, hardpoints: '', license: '', size: '', strength: 0, strike: '', extraSlots: 0, notes: '' },
  module: { ac: 0, effect: '' },
  ...over
});

const LICENSE = { C: 'civil', R: 'restrita', M: 'militar', I: 'ilegal' };

function notesFor(section) {
  const map = new Map();
  for (const [k, v] of Object.entries(vehiclesBook.section(section).bullets)) map.set(k.toLowerCase(), v);
  return map;
}

function noteOf(notes, fullName) {
  const key = (/^\*\*(.+?)\*\*/.exec(fullName)?.[1] ?? fullName).toLowerCase();
  for (const [k, v] of notes) if (k === key || k.startsWith(`${key} `)) return v;
  return '';
}

function vehicleItems() {
  const out = [];
  const sets = [
    ['3.1', 'light', 'Veículos leves'],
    ['3.2', 'medium', 'Veículos médios'],
    ['3.3', 'heavy', 'Veículos pesados']
  ];
  let sort = 0;
  for (const [section, category, folder] of sets) {
    const notes = notesFor(section);
    for (const r of vehiclesBook.table(section).rows) {
      sort += 100;
      const name = plain(r[0]);
      const note = noteOf(notes, r[0]);
      const license = plain(r[11]);
      const stats = `CA ${plain(r[2])}, HP ${plain(r[3])}, BL ${plain(r[4])}, Manobra ${plain(r[5])}, ${plain(r[6])}, ocupantes ${plain(r[7])}, carga ${plain(r[8])}, hardpoints ${plain(r[9])}. Licença ${license} (${LICENSE[license]}).`;
      out.push(
        item({
          type: 'gear',
          name,
          identifier: slug(name),
          img: ICON('gear-vehicle'),
          folder,
          sort,
          source: `Compêndio de Veículos e Armamento, ${section}`,
          description: html(stats) + (note ? html(note) : ''),
          system: gearBase({
            category: 'vehicle',
            slots: 0,
            price: price(r[10]),
            vehicle: {
              category,
              terrain: TERRAIN[plain(r[1])] ?? 'land',
              passengers: plain(r[7]),
              ac: num(r[2]),
              hp: num(r[3]),
              bl: num(r[4]),
              maneuver: num(r[5]),
              speed: plain(r[6]),
              cargo: num(r[8]),
              hardpoints: plain(r[9]),
              license,
              size: '',
              strength: 0,
              strike: '',
              extraSlots: 0,
              notes: note
            }
          })
        })
      );
    }
  }

  // Exoesqueletos (8.1) e mechas pilotados (8.2)
  for (const r of vehiclesBook.table('8.1').rows) {
    sort += 100;
    const name = plain(r[0]);
    const license = plain(r[8]);
    out.push(
      item({
        type: 'gear',
        name: `Exoesqueleto ${name.toLowerCase()}`,
        identifier: `exoesqueleto-${slug(name)}`,
        img: ICON('gear-vehicle'),
        folder: 'Exoesqueletos',
        sort,
        source: 'Compêndio de Veículos e Armamento, 8.1',
        description: html(`Exoesqueleto vestível. CA ${plain(r[1])}, HP ${plain(r[2])}, BL ${plain(r[3])}, FOR ${plain(r[4])}, slots extras ${plain(r[5])}, hardpoints ${plain(r[6])}. Licença ${license} (${LICENSE[license]}). Vestir leva 1 minuto; sair, uma ação. O HP do exoesqueleto absorve o dano antes do runner. Permite usar armas pesadas pessoais sem desvantagem.`),
        system: gearBase({
          category: 'vehicle',
          slots: 0,
          price: price(r[7]),
          vehicle: { category: 'mecha', terrain: 'land', passengers: '1', ac: num(r[1]), hp: num(r[2]), bl: num(r[3]), maneuver: 0, speed: '', cargo: 0, hardpoints: plain(r[6]), license, size: 'Vestível', strength: num(r[4]), strike: '', extraSlots: num(r[5]), notes: '' }
        })
      })
    );
  }
  const mechaNotes = notesFor('8.2');
  for (const r of vehiclesBook.table('8.2').rows) {
    sort += 100;
    const name = plain(r[0]);
    const note = noteOf(mechaNotes, r[0]);
    const license = plain(r[12]);
    const base = name.split('(')[0].trim();
    out.push(
      item({
        type: 'gear',
        name: /^Mecha/.test(name) ? name : `Mecha ${name}`,
        identifier: /^Mecha/.test(name) ? slug(base) : `mecha-${slug(base)}`,
        img: ICON('gear-vehicle'),
        folder: 'Mechas',
        sort,
        source: 'Compêndio de Veículos e Armamento, 8.2',
        description: html(`${plain(r[1])}. CA ${plain(r[2])}, HP ${plain(r[3])}, BL ${plain(r[4])}, FOR ${plain(r[5])}, Golpe ${plain(r[6])}, Manobra ${plain(r[7])}, ${plain(r[8])}, piloto ${plain(r[9])}, hardpoints ${plain(r[10])}. Licença ${license} (${LICENSE[license]}).`) + (note ? html(note) : ''),
        system: gearBase({
          category: 'vehicle',
          slots: 0,
          price: price(r[11]),
          vehicle: { category: 'mecha', terrain: 'land', passengers: plain(r[9]), ac: num(r[2]), hp: num(r[3]), bl: num(r[4]), maneuver: num(r[7]), speed: plain(r[8]), cargo: 0, hardpoints: plain(r[10]), license, size: plain(r[1]), strength: num(r[5]), strike: plain(r[6]), extraSlots: 0, notes: note }
        })
      })
    );
  }

  // Módulos de veículo (4)
  vehiclesBook.table('4').rows.forEach((r, i) => {
    const name = plain(r[0]).replace(/\s*\(Mechas\)$/, '');
    out.push(
      item({
        type: 'gear',
        name,
        identifier: `modulo-${slug(name)}`,
        img: ICON('gear-vehicle-module'),
        folder: 'Módulos de veículo',
        sort: 20000 + (i + 1) * 100,
        source: 'Compêndio de Veículos e Armamento, 4',
        description: html(`${plain(r[1])} Custo: ${plain(r[2])} em veículo Leve; x2 em Médio, x4 em Pesado, x3 em Mecha.`),
        system: gearBase({ category: 'vehicle-module', slots: 0, price: price(r[2]), module: { ac: 0, effect: plain(r[1]) } })
      })
    );
  });
  return out;
}

export const vehiclePackItems = vehicleItems();

/* ------------------------------------------------------------------ */
/* Armas pesadas, armas montadas e explosivos                          */
/* ------------------------------------------------------------------ */

function weaponProps(text) {
  const t = text.toLowerCase();
  const props = [];
  const add = (cond, p) => cond && props.push(p);
  add(/\bpesada\b/.test(t), 'heavyWeapon');
  add(/rajada(?! de fogo)/.test(t), 'burst');
  add(/\bmira\b/.test(t), 'aim');
  add(/duas mãos/.test(t), 'twoHanded');
  add(/guiada/.test(t), 'guided');
  add(/anti-aérea/.test(t), 'antiAir');
  add(/indireta/.test(t), 'indirect');
  add(/ignora cobertura parcial/.test(t), 'ignoreCover');
  add(/raio perto/.test(t), 'blastClose');
  add(/raio próximo/.test(t), 'blastNear');
  return props;
}

const rangeOf = (cell) => RANGE[/^(Perto|Próximo|Longe|Distante)/.exec(plain(cell))?.[1]] ?? 'far';
const diceOf = (cell) => /(\d*d\d+)/.exec(plain(cell))?.[1] ?? '';

function heavyWeapons() {
  return vehiclesBook.table('5').rows.map((r, i) => {
    const name = plain(r[0]);
    const notes = plain(r[7]);
    const fullText = `${plain(r[1])} ${plain(r[2])} ${notes}`;
    const props = weaponProps(fullText);
    const strength = /FOR 15/.test(notes) ? ' Exige FOR 15 ou exoesqueleto.' : '';
    return item({
      type: 'weapon',
      name,
      identifier: slug(name),
      img: ICON('weapon-ranged'),
      folder: 'Armas pesadas pessoais',
      sort: 5000 + (i + 1) * 100,
      source: 'Compêndio de Veículos e Armamento, 5',
      description: html(`${plain(r[1])}, alcance ${plain(r[2])}. ${notes} Munição: ${plain(r[5])}. Licença ${plain(r[6])} (${LICENSE[plain(r[6])]}). Runners com FOR menor que 12 usam armas pesadas com desvantagem, a menos que vistam um exoesqueleto.${strength}`),
      system: {
        kind: 'ranged',
        family: 'heavy',
        damage: diceOf(r[1]),
        range: rangeOf(r[2]),
        hands: 2,
        slots: Number(plain(r[3])),
        price: price(r[4]),
        properties: [...new Set([...props, 'twoHanded'])],
        attackBonus: 0,
        ignoreArmor: 0,
        stunOn: '',
        usesMagazines: /^Carregador/.test(plain(r[5])),
        magEmpty: false,
        abilityOverride: '',
        mount: '',
        crew: 0,
        equipped: false
      }
    });
  });
}

function mountedWeapons() {
  const out = [];
  let i = 0;
  for (const section of ['7.1', '7.2']) {
    for (const r of vehiclesBook.table(section).rows) {
      i++;
      const name = plain(r[0]);
      const notes = plain(r[7]);
      const mount = plain(r[3]);
      const crew = plain(r[4]).split('+').reduce((a, b) => a + Number(b), 0);
      const props = [...new Set([...weaponProps(`${plain(r[1])} ${plain(r[2])} ${notes}`), 'mounted'])];
      out.push(
        item({
          type: 'weapon',
          name,
          identifier: slug(name),
          img: ICON('weapon-ranged'),
          folder: section === '7.1' ? 'Armas montadas leves e médias' : 'Artilharia e armas de cerco',
          sort: 7000 + i * 100,
          source: `Compêndio de Veículos e Armamento, ${section}`,
          description: html(`${plain(r[1])}, alcance ${plain(r[2])}. Tamanho ${mount}, tripulação ${plain(r[4])}. ${notes} Munição: ${plain(r[6])}. Uma arma L cabe em qualquer hardpoint, M em M ou P, P só em P. Instalação: 1 hora em tripé ou base fixa, 1 dia em hardpoint de veículo.`),
          system: {
            kind: 'ranged',
            family: 'heavy',
            damage: diceOf(r[1]),
            range: rangeOf(r[2]),
            hands: 0,
            slots: 0,
            price: price(r[5]),
            properties: props,
            attackBonus: 0,
            ignoreArmor: 0,
            stunOn: '',
            usesMagazines: false,
            magEmpty: false,
            abilityOverride: '',
            mount,
            crew,
            equipped: false
          }
        })
      );
    }
  }
  return out;
}

export const companionWeapons = [...heavyWeapons(), ...mountedWeapons()];

export const explosiveItems = vehiclesBook.table('6').rows.map((r, i) => {
  const name = plain(r[0]);
  return item({
    type: 'gear',
    name,
    identifier: slug(name),
    img: ICON('gear-explosive'),
    folder: 'Explosivos',
    sort: 3000 + (i + 1) * 100,
    source: 'Compêndio de Veículos e Armamento, 6',
    description: html(`${plain(r[1])} Explosões ignoram a Blindagem. Arremessável até Próximo, 3 por slot. Quem está no raio faz DES CD 12 para sofrer metade do dano (ou resistir ao efeito).`),
    system: gearBase({ category: 'explosive', slots: 1, perSlot: 3, price: price(r[2]) })
  });
});

/* ------------------------------------------------------------------ */
/* Tabelas do Mestre (módulo)                                          */
/* ------------------------------------------------------------------ */

const mkTable = ({ identifier, name, formula, results, folder }) => ({
  identifier,
  name,
  type: 'RollTable',
  img: ICON('table'),
  folder,
  sort: 0,
  formula,
  replacement: true,
  displayRoll: true,
  results,
  flags: { sombraneon: { schemaVersion: 1 } }
});

const one = (n) => [n, n];
const withTitle = (range, cell) => {
  const [title, rest] = splitBold(cell);
  return /^\*\*/.test(cell.trim()) ? { range, name: title, text: inlineHtml(rest).replace(/^<p>|<\/p>$/g, '') } : { range, name: '', text: inlineHtml(cell) };
};

function masterTables() {
  const out = [];
  out.push(
    mkTable({
      identifier: 'perigos-do-ambiente',
      name: 'Perigos do ambiente',
      formula: '1d8',
      folder: 'Ameaças',
      results: threatsBook.table('2.8').rows.map((r) => ({ range: one(Number(r[0])), name: plain(r[1]), text: inlineHtml(r[2]) }))
    })
  );
  for (let n = 1; n <= 8; n++) {
    const section = `8.${n}`;
    const s = threatsBook.section(section);
    out.push(
      mkTable({
        identifier: `encontros-${slug(s.title)}`,
        name: `Encontros: ${s.title}`,
        formula: '1d6',
        folder: 'Encontros por local',
        results: s.tables[0].rows.map((r) => ({ range: one(Number(r[0])), name: '', text: inlineHtml(r[1]) }))
      })
    );
  }
  const npc = threatsBook.table('9.1');
  [['aparencia', 'Aparência', 1], ['motivacao', 'Motivação', 2], ['segredo', 'Segredo', 3]].forEach(([id, label, col]) =>
    out.push(mkTable({ identifier: `npc-rapido-${id}`, name: `NPC rápido: ${label}`, formula: '1d8', folder: 'Gerador de NPC', results: npc.rows.map((r) => ({ range: one(Number(r[0])), name: '', text: inlineHtml(r[col]) })) }))
  );
  const names = threatsBook.table('9.2');
  out.push(
    mkTable({
      identifier: 'nomes-de-rua',
      name: 'Nomes de rua',
      formula: '1d20',
      folder: 'Gerador de NPC',
      results: [...names.rows.map((r) => ({ range: one(Number(r[0])), name: '', text: plain(r[1]) })), ...names.rows.map((r) => ({ range: one(Number(r[2])), name: '', text: plain(r[3]) }))].sort((a, b) => a.range[0] - b.range[0])
    })
  );
  const ai = threatsBook.table('6.3');
  [['motivacao', 'Motivação', 1], ['dominio', 'Domínio', 2], ['fraqueza', 'Fraqueza', 3]].forEach(([id, label, col]) =>
    out.push(mkTable({ identifier: `ia-${id}`, name: `Criando uma IA: ${label}`, formula: '1d6', folder: 'Gerador de IA', results: ai.rows.map((r) => withTitle(one(Number(r[0])), r[col])) }))
  );
  out.push(
    mkTable({
      identifier: 'avarias-de-veiculo',
      name: 'Avarias de veículo',
      formula: '1d6',
      folder: 'Veículos',
      results: vehiclesBook.table('2.5').rows.map((r) => withTitle(one(Number(r[0])), r[1]))
    })
  );
  return out;
}

export const masterTableDocs = masterTables();

/* ------------------------------------------------------------------ */
/* Referências: os dois compêndios como diários                        */
/* ------------------------------------------------------------------ */

function referenceJournal({ identifier, name, book, source }) {
  const pages = chapters(book.markdown).map((c) => ({
    identifier: `${identifier}-${c.number}`,
    name: `${c.number}. ${c.title}`,
    type: 'text',
    sort: c.number * 100,
    title: { show: true, level: 1 },
    text: { format: 1, content: marked.parse(c.markdown, { gfm: true, breaks: true }) }
  }));
  return {
    identifier,
    name,
    type: 'JournalEntry',
    img: ICON('journal'),
    pages,
    ownership: { default: 0 },
    flags: { sombraneon: { schemaVersion: 1, source } }
  };
}

export const referenceJournals = [
  referenceJournal({ identifier: 'compendio-de-ameacas', name: 'SombraNeon, Compêndio de Ameaças', book: threatsBook, source: 'sombraneon-ameacas.md' }),
  referenceJournal({ identifier: 'compendio-de-veiculos-e-armamento', name: 'SombraNeon, Compêndio de Veículos e Armamento', book: vehiclesBook, source: 'sombraneon-veiculos-armas.md' })
];
