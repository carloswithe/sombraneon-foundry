import { classItems, originItems, backgroundItems, alignmentItems } from '../character-items.mjs';
import { featureItems } from '../features.mjs';
import { programItems } from '../programs.mjs';
import { weaponItems, armorItems, gearItems, implantItems } from '../module-items.mjs';
import { explosiveItems } from '../companions.mjs';
import { deriveCharacter } from '../../../systems/sombraneon/src/logic/character.mjs';
import { ASSET_DIR, CHAPTERS, chap, clone, toHtml, withFlags, esc, inline } from './lib.mjs';
import { artOf } from './images.mjs';

/**
 * Os seis runners prontos de nível 1 (capítulo 15 de docs/carga-sem-nome.md), um por classe.
 * Sem marcas [F] e [C]: a aventura não tem checagem de armas, então todo o equipamento entra.
 * O Corvo é Nat e recusa o jack de interface (pilota com as mãos): não leva o implante Neural.
 * `expect` guarda os números escritos na ficha (CA, HP e slots) para a conferência de tests/ui/carga.test.mjs.
 */
export const RUNNER_DEFS = [
  {
    id: 'tijolo', name: 'Tijolo', ret: 'ret-01', cls: 'solo', origin: 'cromado', alignment: 'sobrevivencia', trigger: 'forca-do-bando', background: 'ex-seguranca-corp',
    abilities: [17, 12, 14, 8, 10, 9], talents: [{ id: 'atributo-solo', roll: 8, choice: { abilities: 'for' }, bonus: { for: 2 } }], family: 'pistols',
    implants: ['subderme-blindada', 'arma-retratil'], credits: 200, expect: { hp: 10, ac: 13, slots: 19 },
    gear: [['pistola-pesada'], ['faca'], ['jaqueta-blindada'], ['carregador', 2], ['granada-de-fragmentacao'], ['racao'], ['rig-utilitario']]
  },
  {
    id: 'bit', name: 'Bit', ret: 'ret-02', cls: 'netrunner', origin: 'nat', alignment: 'liberdade', trigger: 'sabotador', background: 'hacker-de-garagem',
    abilities: [8, 13, 12, 16, 11, 10], talents: [{ id: 'biblioteca', roll: 2 }, { id: 'atributo-netrunner', roll: 8, choice: { abilities: 'int' }, bonus: { int: 2 } }],
    programs: ['ping', 'backdoor', 'choque'], credits: 290, expect: { hp: 5, ac: 11, slots: 10 },
    gear: [['deck-de-rua'], ['pistola-leve'], ['carregador'], ['cabo-de-interface'], ['bateria'], ['racao'], ['rig-utilitario']]
  },
  {
    id: 'cinza', name: 'Cinza', ret: 'ret-03', cls: 'hyperdoc', origin: 'biomod', alignment: 'sobrevivencia', trigger: 'provisor', background: 'atendente-de-clinica',
    abilities: [8, 11, 12, 14, 17, 10], talents: [{ id: 'atributo-hyperdoc', roll: 8, choice: { abilities: 'sab' }, bonus: { sab: 2 } }],
    programs: ['nanocura', 'diagnostico'], mutations: ['tecnico-nato', 'sentidos-agudos'], credits: 80, expect: { hp: 7, ac: 11, slots: 10 },
    gear: [['nanokit'], ['kit-medico'], ['pistola-leve'], ['faca'], ['jaqueta-blindada'], ['carregador'], ['racao'], ['rig-utilitario']]
  },
  {
    id: 'cobra', name: 'Cobra', ret: 'ret-04', cls: 'ghost', origin: 'replicante', purpose: 'infiltration', alignment: 'sobrevivencia', trigger: 'camaleao', background: 'entregador',
    abilities: [8, 17, 10, 11, 12, 11], talents: [{ id: 'atributo-ghost', roll: 8, choice: { abilities: 'des' }, bonus: { des: 2 } }], credits: 260, expect: { hp: 4, ac: 14, slots: 10 },
    gear: [['pistola-leve'], ['faca'], ['jaqueta-blindada'], ['kit-de-ferramentas'], ['lanterna'], ['racao'], ['rig-utilitario']]
  },
  {
    id: 'fumaca', name: 'Fumaça', ret: 'ret-05', cls: 'rocker', origin: 'android', alignment: 'liberdade', trigger: 'agitador', background: 'dj-de-clube',
    abilities: [9, 12, 12, 10, 11, 17], talents: [{ id: 'atributo-rocker', roll: 8, choice: { abilities: 'car' }, bonus: { car: 2 } }],
    programs: ['hype', 'estatica', 'solo'], credits: 310, expect: { hp: 7, ac: 12, slots: 10 },
    gear: [['rig-de-palco'], ['pistola-leve'], ['faca'], ['gel-de-reparo', 2], ['racao'], ['rig-utilitario']]
  },
  {
    id: 'corvo', name: 'Corvo', ret: 'ret-06', cls: 'rigger', origin: 'nat', alignment: 'controle', trigger: 'executor', background: 'piloto-de-transporte',
    abilities: [9, 17, 12, 12, 11, 10], talents: [{ id: 'atributo-rigger', roll: 8, choice: { abilities: 'des' }, bonus: { des: 2 } }, { id: 'chassi-reforcado', roll: 10 }],
    credits: 220, expect: { hp: 7, ac: 14, slots: 10 },
    gear: [['pistola-leve'], ['jaqueta-blindada'], ['radio'], ['kit-de-ferramentas'], ['racao'], ['rig-utilitario']]
  }
];

const ABILITIES = ['for', 'des', 'con', 'int', 'sab', 'car'];
const catalog = [...weaponItems, ...armorItems, ...gearItems, ...explosiveItems];

const byId = (list, id) => {
  const found = list.find((x) => x.identifier === id);
  if (!found) throw new Error(`Item não encontrado: ${id}`);
  return found;
};

/** Monta os itens embutidos de um runner com as mesmas concessões do sistema (classe, origem, talentos, equipamento). */
export function buildRunner(def) {
  const items = [];
  let n = 0;
  const push = (doc, extraFlags = {}) => {
    const copy = clone(doc);
    copy.sort = n += 100;
    copy.flags = { ...copy.flags, sombraneon: { ...copy.flags?.sombraneon, ...extraFlags } };
    items.push(copy);
    return copy;
  };
  const cls = byId(classItems, def.cls);
  const origin = byId(originItems, def.origin);
  push(origin);
  push(cls);
  push(byId(backgroundItems, def.background));
  push(byId(alignmentItems, def.alignment));
  push(byId(featureItems, `gatilho-${def.trigger}`), { grantedBy: '@alignment' });

  const grantFeatures = (source, tag) => {
    for (const [i, g] of source.system.grants.entries()) {
      if (g.kind !== 'item') continue;
      const feat = byId(featureItems, g.ref.split(':')[1]);
      const doc = push(feat, { grantedBy: tag, grantId: `item-${i}` });
      if (feat.identifier === 'dominio-de-arma') doc.system.choice = { family: def.family ?? 'blades' };
      if (feat.identifier === 'proposito-de-fabrica') doc.system.choice = { purpose: def.purpose };
    }
  };
  grantFeatures(origin, '@origin');
  grantFeatures(cls, '@class');

  for (const id of def.programs ?? []) push(byId(programItems, id), { grantedBy: '@class' });
  for (const id of def.mutations ?? []) push(byId(featureItems, id), { grantedBy: '@origin' });
  for (const id of def.implants ?? []) {
    const imp = push(byId(implantItems, id), { grantedBy: '@origin' });
    imp.system.installed = true;
    imp.system.quality = 'street';
  }
  for (const t of def.talents ?? []) {
    const doc = push(byId(featureItems, t.id), { talentRoll: t.roll, talentLevel: 1 });
    if (t.choice) doc.system.choice = t.choice;
  }

  let hands = 0;
  let armorOn = false;
  for (const [id, qty] of def.gear) {
    const cat = byId(catalog, id);
    const doc = push(cat);
    if (cat.type === 'gear' && qty) doc.system.quantity = qty;
    if (cat.type === 'weapon' && cat.system.hands + hands <= 2) {
      doc.system.equipped = true;
      hands += cat.system.hands;
    }
    if (cat.type === 'armor' && !armorOn) {
      doc.system.equipped = true;
      armorOn = true;
    }
  }

  const base = Object.fromEntries(ABILITIES.map((k, i) => [k, def.abilities[i] - (def.talents ?? []).reduce((s, t) => s + (t.bonus?.[k] ?? 0), 0)]));
  const faces = Number(/d(\d+)/.exec(cls.system.hitDie)[1]);
  const input = { level: 1, abilityBase: base, hpRolls: [faces], items: items.map((it, i) => ({ id: `tmp${i}`, ...it, system: it.system })) };
  return { items, base, derived: deriveCharacter(input), input };
}

/** Ficha do capítulo 15 (bloco "### Ficha N: NOME"): o código da ficha, a conta da CA, "Como brilha" e o plano de equipamento. */
function fichaBlock(name) {
  const lines = chap(15).markdown.split('\n');
  const start = lines.findIndex((l) => /^### Ficha \d+:/.test(l) && l.toUpperCase().includes(name.toUpperCase()));
  if (start === -1) throw new Error(`Ficha ${name} não encontrada no capítulo 15`);
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^### Ficha \d+:/.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines.slice(start + 1, end).join('\n');
}

const sheetLine = (block, label) => {
  const code = /```\n([\s\S]*?)```/.exec(block)?.[1] ?? '';
  const line = code.split('\n').find((l) => l.startsWith(`${label}:`));
  if (!line) throw new Error(`Campo ${label} não encontrado na ficha`);
  return line.slice(label.length + 1).trim();
};

export function runnerActors() {
  return RUNNER_DEFS.map((def, i) => {
    const { items, base, derived } = buildRunner(def);
    const block = fichaBlock(def.name);
    const drive = sheetLine(block, 'DRIVE');
    const role = sheetLine(block, 'PAPEL');
    const [papel, laco] = role.split(/\s*\|\s*Laço:\s*/);
    const code = /```\n([\s\S]*?)```/.exec(block)?.[1] ?? '';
    const after = block.slice(block.indexOf('```', block.indexOf('```') + 3) + 3).trim();
    const biography =
      `<h2>Papel na operação</h2><p>${inline(papel)}</p>` +
      `<h2>Laço</h2><p>${inline(laco.replace(/\)$/, ')'))}</p>` +
      `<h2>Ficha da aventura</h2><pre>${esc(code.trim())}</pre>` +
      toHtml(after);
    const retrato = artOf(def.ret).path;
    const doc = {
      identifier: def.id,
      name: def.name,
      type: 'character',
      img: retrato,
      folder: 'Runners prontos (nível 1)',
      sort: (i + 1) * 100,
      system: {
        abilities: Object.fromEntries(ABILITIES.map((k) => [k, { base: base[k] }])),
        level: 1,
        xp: { value: 0 },
        hp: { value: derived.hp.max, rolls: [Number(/d(\d+)/.exec(derived.hp.hitDie)[1])], bonus: 0 },
        ac: { cover: false, override: null },
        edge: { value: 1, triggerUsed: false },
        currency: { credits: def.credits },
        vehicleTraining: [],
        details: { drive, languages: 'Dialeto da cidade', civilName: '', biography },
        creation: { completed: true, step: 9 }
      },
      items,
      prototypeToken: { name: def.name, disposition: 1, actorLink: true, texture: { src: `${ASSET_DIR}/tokens/${def.id}.png` }, displayName: 20, sight: { enabled: true }, bar1: { attribute: 'hp' } }
    };
    return withFlags(doc, def.id, '15. Fichas prontas (nível 1)', { pregen: true, classe: def.cls }, { pregen: true });
  });
}

export const runners = runnerActors();
export { CHAPTERS };
