import { buildRunner } from '../carga/runners.mjs';
import { marked, withFlags } from './lib.mjs';
import { artOf } from './images.mjs';
import { tokenPath } from './actors.mjs';

/**
 * Os seis runners prontos de nível 1 (capítulo 15), um por classe. Montados pelo mesmo caminho da
 * Carga Sem Nome (buildRunner): classe, origem, talentos, programas e equipamento do catálogo.
 * `expect` guarda os números escritos na ficha (HP, CA, slots máximos, slots usados e ataques) para a
 * conferência de tests/ui/cerco.test.mjs. Só entram os ataques das armas que começam equipadas (a escopeta
 * ocupa as duas mãos do Torre; a pistola e a faca aparecem ao equipar). `sistema` aparece quando o sistema soma diferente da ficha: ele
 * arredonda cada pilha de meio slot para cima, e a ficha soma as metades (ver o relatório).
 */
export const RUNNER_DEFS = [
  {
    id: 'torre', name: 'Torre', ret: 'ret-01', cls: 'solo', origin: 'nat', alignment: 'sobrevivencia', trigger: 'forca-do-bando', background: 'mercenario',
    abilities: [13, 17, 14, 8, 11, 10], family: 'shotguns',
    talents: [{ id: 'atributo-solo', roll: 8, choice: { abilities: 'des' }, bonus: { des: 2 } }, { id: 'arma-afinada', roll: 5 }],
    credits: 220, gear: [['escopeta'], ['pistola-pesada'], ['jaqueta-blindada'], ['faca'], ['carregador', 3], ['racao'], ['rig-utilitario']],
    expect: { hp: 10, ac: 14, slots: 15, used: 8, attacks: { Escopeta: [5, 'd10+2'] } }
  },
  {
    id: 'cabo', name: 'Cabo', ret: 'ret-02', cls: 'netrunner', origin: 'cromado', alignment: 'controle', trigger: 'advogado-do-diabo', background: 'hacker-de-garagem',
    abilities: [9, 13, 12, 18, 11, 8], talents: [{ id: 'atributo-netrunner', roll: 8, choice: { abilities: 'int' }, bonus: { int: 2 } }],
    programs: ['ping', 'choque'], implants: ['jack-de-interface', 'subderme-blindada'],
    credits: 240, gear: [['deck-de-rua'], ['pistola-leve'], ['carregador'], ['cabo-de-interface'], ['bateria', 2], ['firewall'], ['racao'], ['rig-utilitario']],
    expect: { hp: 5, ac: 12, slots: 10, used: 6, sistema: 7, attacks: { 'Pistola leve': [1, 'd6'] } }
  },
  {
    id: 'sutura', name: 'Sutura', ret: 'ret-03', cls: 'hyperdoc', origin: 'biomod', alignment: 'liberdade', trigger: 'libertador', background: 'medico-de-beco',
    abilities: [10, 11, 13, 12, 16, 11], talents: [{ id: 'protocolo-afinado', roll: 4, choice: { program: 'nanocura' } }],
    programs: ['nanocura', 'analgesia'], mutations: ['regeneracao', 'sentidos-agudos'],
    credits: 80, gear: [['nanokit'], ['kit-medico'], ['pistola-leve'], ['faca'], ['carregador'], ['jaqueta-blindada'], ['stim'], ['racao'], ['rig-utilitario']],
    expect: { hp: 7, ac: 11, slots: 10, used: 7, sistema: 8, attacks: { 'Pistola leve': [0, 'd6'], Faca: [0, 'd4'] } }
  },
  {
    id: 'veu', name: 'Véu', ret: 'ret-04', cls: 'ghost', origin: 'replicante', purpose: 'infiltration', alignment: 'sobrevivencia', trigger: 'camaleao', background: 'entregador',
    abilities: [9, 16, 11, 12, 13, 10], talents: [{ id: 'camuflagem-optica', roll: 10 }],
    credits: 210, gear: [['pistola-leve'], ['faca'], ['jaqueta-blindada'], ['kit-de-ferramentas'], ['lanterna'], ['bateria', 2], ['racao'], ['rig-utilitario']],
    expect: { hp: 4, ac: 14, slots: 10, used: 7, attacks: { 'Pistola leve': [3, 'd6'], Faca: [3, 'd4'] } }
  },
  {
    id: 'coro', name: 'Coro', ret: 'ret-05', cls: 'rocker', origin: 'nat', alignment: 'liberdade', trigger: 'agitador', background: 'dj-de-clube',
    abilities: [9, 13, 12, 10, 11, 18], talents: [{ id: 'atributo-rocker', roll: 8, choice: { abilities: 'car' }, bonus: { car: 2 } }, { id: 'afinacao', roll: 5, choice: { program: 'refrao' } }],
    programs: ['hype', 'refrao', 'estatica'],
    credits: 130, gear: [['rig-de-palco'], ['pistola-leve'], ['jaqueta-blindada'], ['faca'], ['carregador'], ['bateria', 2], ['racao'], ['rig-utilitario']],
    expect: { hp: 7, ac: 12, slots: 10, used: 7, attacks: { 'Pistola leve': [1, 'd6'], Faca: [1, 'd4'] } }
  },
  {
    id: 'rotor', name: 'Rotor', ret: 'ret-06', cls: 'rigger', origin: 'android', alignment: 'sobrevivencia', trigger: 'catador', background: 'mecanico',
    abilities: [11, 15, 12, 14, 10, 8], talents: [{ id: 'chassi-reforcado', roll: 10 }],
    credits: 170, gear: [['pistola-leve'], ['radio'], ['kit-de-ferramentas'], ['gel-de-reparo', 2], ['rig-utilitario']],
    expect: { hp: 7, ac: 13, slots: 11, used: 4, attacks: { 'Pistola leve': [2, 'd6'] } }
  }
];

const ABILITIES = ['for', 'des', 'con', 'int', 'sab', 'car'];
const BLOCKS = marked('ATOR');

/** Campo "RÓTULO: valor" do código da ficha (até o próximo rótulo na mesma linha). */
export function sheetField(id, label) {
  const code = /```\n([\s\S]*?)```/.exec(BLOCKS.get(id)?.body ?? '')?.[1] ?? '';
  const line = code.split('\n').find((l) => l.startsWith(`${label}:`));
  if (!line) throw new Error(`Campo ${label} não encontrado na ficha ${id}`);
  return line.slice(label.length + 1).trim();
}

export const runners = RUNNER_DEFS.map((def, i) => {
  const { items, base, derived } = buildRunner(def);
  const doc = {
    identifier: def.id,
    name: def.name,
    type: 'character',
    img: artOf(def.ret).path,
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
      // a aba Bio sai vazia (spoilers): o texto "Como brilha" fica no diário do Mestre
      details: { drive: sheetField(def.id, 'DRIVE'), languages: sheetField(def.id, 'TÍTULO DE RUA').split('IDIOMAS:')[1]?.trim() ?? 'dialeto da cidade', civilName: '' },
      creation: { completed: true, step: 9 }
    },
    items,
    prototypeToken: { name: def.name, disposition: 1, actorLink: true, texture: { src: tokenPath(def.id) }, displayName: 20, sight: { enabled: true }, bar1: { attribute: 'hp' } }
  };
  return withFlags(doc, def.id, '15. Fichas prontas (nível 1)', { pregen: true, classe: def.cls }, { pregen: true });
});
