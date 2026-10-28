import path from 'node:path';
import { marked } from 'marked';
import { ROOT, loadBook, chapters, slug, plain } from '../../tools/lib/book.mjs';
import { ICON, item, html, NO_USES } from './lib.mjs';
import { featureItems } from './features.mjs';
import { classItems, originItems, backgroundItems, alignmentItems } from './character-items.mjs';
import { programItems } from './programs.mjs';
import { weaponItems, armorItems, gearItems, implantItems } from './module-items.mjs';
import { threatActors } from './companions.mjs';
import { deriveCharacter } from '../../systems/sombraneon/src/logic/character.mjs';

/**
 * Aventura "Noite das Máscaras" (docs/noite-das-mascaras.md): tudo que ela usa, em compêndios próprios
 * (prefixo noite-), organizados por pastas e ligados por links no Livro da Aventura.
 */
export const ADVENTURE_ID = 'noite-das-mascaras';
const SOURCE = 'Noite das Máscaras';

const adv = loadBook(path.join(ROOT, 'docs', 'noite-das-mascaras.md'));
const chaps = chapters(adv.markdown);
const chap = (n) => {
  const c = chaps.find((x) => x.number === n);
  if (!c) throw new Error(`Capítulo ${n} não encontrado na aventura`);
  return c;
};
const md = (text) => marked.parse(text, { gfm: true, breaks: true });
const clone = (o) => JSON.parse(JSON.stringify(o));
const link = (target, label) => (label ? `@Ref[${target}]{${label}}` : `@Ref[${target}]`);

/** Texto de uma subseção (### Título) de um capítulo, sem o título. */
function slice(n, heading) {
  const lines = chap(n).markdown.split('\n');
  const start = lines.findIndex((l) => l.startsWith(`### ${heading}`));
  if (start === -1) throw new Error(`Subseção não encontrada: ${n} / ${heading}`);
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^###?\s/.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines.slice(start + 1, end).join('\n').trim();
}

/** Mantém o texto só até a primeira linha que bate com o padrão. */
const until = (text, re) => {
  const lines = text.split('\n');
  const stop = lines.findIndex((l) => re.test(l));
  return (stop === -1 ? lines : lines.slice(0, stop)).join('\n').trim();
};

const flagsOf = (room, extra = {}) => ({ sombraneon: { schemaVersion: 1, source: SOURCE, adventure: { id: ADVENTURE_ID, room }, ...extra } });

/* ------------------------------------------------------------------ */
/* Itens e butim                                                       */
/* ------------------------------------------------------------------ */

const gearSys = (over = {}) => ({
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

const weaponSys = (over = {}) => ({
  kind: 'melee',
  family: 'blades',
  damage: 'd4',
  range: 'close',
  hands: 1,
  slots: 0,
  price: 0,
  properties: ['light'],
  attackBonus: 0,
  ignoreArmor: 0,
  stunOn: '',
  usesMagazines: false,
  magEmpty: false,
  abilityOverride: '',
  equipped: false,
  ...over
});

const F_CACHE = 'Cache de Ruth';
const F_MASKS = 'Máscaras e adereços';
const F_LOOT = 'Butim e objetos da missão';

let itemSort = 0;
const advItem = (opts) => {
  itemSort += 100;
  return item({ source: SOURCE, sort: itemSort, ...opts, flags: { adventure: { id: ADVENTURE_ID, room: opts.room ?? '' }, ...(opts.flags ?? {}) } });
};

const PERSONAS = adv.table('3', 0).rows.map((r) => {
  const [who, role] = plain(r[0]).split(/,\s*/);
  return { name: who, role, mask: plain(r[1]), hook: plain(r[2]), prop: plain(r[3]) };
});
const persona = (name) => {
  const p = PERSONAS.find((x) => x.name === name);
  if (!p) throw new Error(`Persona não encontrada: ${name}`);
  return p;
};
const maskId = (p) => `mascara-${slug(p.mask)}`;

const maskItems = PERSONAS.map((p) =>
  advItem({
    type: 'gear',
    name: `Máscara holográfica (${p.mask})`,
    identifier: maskId(p),
    img: ICON('gear-general'),
    folder: F_MASKS,
    room: 'briefing',
    description: html(
      `Máscara-convite da persona **${p.name}**, ${p.role}. Cobre o rosto, não ocupa slot e, se for arrancada, mostra o rosto real. Uma vez por sessão, a persona dá vantagem em um teste social ligado a ela. Gancho: ${p.hook} Adereço: ${p.prop}`
    ),
    system: gearSys({ slots: 0 })
  })
);

const propItems = [
  advItem({
    type: 'weapon',
    name: 'Bengala-bastão',
    identifier: 'bengala-bastao',
    img: ICON('weapon-melee'),
    folder: F_MASKS,
    room: 'briefing',
    description: html('Adereço de Cassius Vento: um bastão de choque disfarçado de bengala. d6, Leve, atordoa em 20 natural. Passa pelo scanner do Portão.'),
    system: weaponSys({ family: 'shock', damage: 'd6', slots: 1, properties: ['light', 'stun'], stunOn: 'nat20' })
  }),
  advItem({
    type: 'weapon',
    name: 'Charuteira (pistola de polímero)',
    identifier: 'charuteira',
    img: ICON('weapon-ranged'),
    folder: F_MASKS,
    room: 'briefing',
    description: html('Adereço de Bruno Alcântara: esconde 1 pistola de polímero (d6, Próximo, 2 disparos, sem recarga). Num 1 natural no ataque, quebra. Indetectável por scanner de metal.'),
    system: weaponSys({ kind: 'ranged', family: 'pistols', damage: 'd6', range: 'near', properties: [] })
  }),
  advItem({
    type: 'weapon',
    name: 'Bisturis de cerâmica (3)',
    identifier: 'bisturis-de-ceramica',
    img: ICON('weapon-melee'),
    folder: F_MASKS,
    room: 'briefing',
    description: html('Vêm no estojo cirúrgico da Dra. Marta Ibsen, junto do kit médico. d4, Leve, arremessável. Passam pelo scanner.'),
    system: weaponSys({ properties: ['light', 'thrown'] })
  }),
  advItem({
    type: 'weapon',
    name: 'Lâmina de cerâmica (bota)',
    identifier: 'lamina-de-ceramica',
    img: ICON('weapon-melee'),
    folder: F_MASKS,
    room: 'briefing',
    description: html('Escondida no salto da bota de Yara K, junto do case de sintetizador. d4, Leve. Passa pelo scanner.'),
    system: weaponSys()
  }),
  advItem({
    type: 'gear',
    name: 'Broche (drone dobrado)',
    identifier: 'broche-drone',
    img: ICON('gear-general'),
    folder: F_MASKS,
    room: 'briefing',
    description: html('Adereço de Tereza Mares: o drone do Rigger dobrado como joia. Passa pelo scanner como bijuteria.'),
    system: gearSys({ slots: 0 })
  })
];

const cacheItems = [
  advItem({
    type: 'gear',
    name: 'Cache de Ruth',
    identifier: 'cache-de-ruth',
    img: ICON('gear-explosive'),
    folder: F_CACHE,
    room: 'sala-3',
    description: html(
      'Equipamento que Dona Ruth deixou no elevador de serviço do Anel, atrás do painel de manutenção (código **3110**). Contém 2 granadas de fragmentação (2d6, raio Perto, ignoram a Blindagem), 1 granada de fumaça e tudo que as fichas prontas marcam com [C]. Pegar leva 1 minuto. O elevador sobe do Anel ao 60º e só abre com um crachá nível 4. Arraste para uma ficha e confirme para dividir nas granadas.'
    ),
    system: gearSys({ slots: 0 }),
    flags: {
      bundle: [
        ['granada-de-fragmentacao', 2],
        ['granada-de-fumaca', 1]
      ]
    }
  }),
  advItem({
    type: 'weapon',
    name: 'Pistola de polímero (descartável)',
    identifier: 'pistola-de-polimero',
    img: ICON('weapon-ranged'),
    folder: F_CACHE,
    room: 'briefing',
    description: html('Pedida a Dona Ruth antes da festa. d6, Próximo, 1 slot, 2 disparos e sem recarga. Num 1 natural no ataque, quebra. Indetectável por scanner de metal.'),
    system: weaponSys({ kind: 'ranged', family: 'pistols', damage: 'd6', range: 'near', slots: 1, properties: [] })
  }),
  advItem({
    type: 'gear',
    name: 'Embaralhador',
    identifier: 'embaralhador',
    img: ICON('gear-utility-rig'),
    folder: F_CACHE,
    room: 'briefing',
    description: html('Entregue por Dona Ruth a Replicantes e Androides. Cobre o registro (número de série e tipo de chassi) por 1 hora. Sem ele, o scanner do Portão identifica o runner e o Alerta sobe em 1.'),
    system: gearSys({ slots: 0 })
  }),
  advItem({
    type: 'gear',
    name: 'Pele cosmética descartável',
    identifier: 'pele-cosmetica-descartavel',
    img: ICON('gear-general'),
    folder: F_CACHE,
    room: 'briefing',
    description: html('Entregue por Dona Ruth a Androides. Cobre o chassi por 12 horas para passar por humano no Portão. Sem ela, o runner é identificado e o Alerta sobe em 1.'),
    system: gearSys({ slots: 0 })
  })
];

const lootItems = [
  advItem({
    type: 'gear',
    name: 'Rosto Livre (protótipo)',
    identifier: 'rosto-livre',
    img: ICON('gear-general'),
    folder: F_LOOT,
    room: 'sala-5',
    description: html('O Prêmio da missão: um protótipo de implante neural que troca rosto e voz. Valioso, 3 XP. Fica no cofre da Diretoria, no 62º.'),
    system: gearSys({ slots: 1 }),
    flags: { loot: { category: 'valuable', xp: 3 } }
  }),
  advItem({
    type: 'gear',
    name: 'Dossiê do Desmascaramento',
    identifier: 'dossie-do-desmascaramento',
    img: ICON('gear-general'),
    folder: F_LOOT,
    room: 'sala-5',
    description: html('A prova do plano de Aragão. Valioso, 3 XP, digital. Download de 1d4 rodadas no terminal do cofre, e o Alerta sobe em 1 ao começar. Interromper perde os dados.'),
    system: gearSys({ slots: 0 }),
    flags: { loot: { category: 'valuable', xp: 3 } }
  }),
  advItem({
    type: 'gear',
    name: 'Registro de acessos do crachá',
    identifier: 'registro-de-acessos-do-cracha',
    img: ICON('gear-general'),
    folder: F_LOOT,
    room: 'sala-3',
    description: html('Mostra o acesso ao "Cofre da Diretoria, 62º, via 61º" e uma nota: "61º: unidade de guarda sem conexão, só manutenção local". Normal, 1 XP, digital. Hack de rua CD 12 no terminal da galeria, 1 rodada.'),
    system: gearSys({ slots: 0 }),
    flags: { loot: { category: 'normal', xp: 1 } }
  }),
  advItem({
    type: 'gear',
    name: 'Uísque de barril de servidor',
    identifier: 'uisque-de-barril-de-servidor',
    img: ICON('gear-general'),
    folder: F_LOOT,
    room: 'sala-2',
    description: html('Servido no bar do Anel. Normal, 1 XP, 1 slot.'),
    system: gearSys({ slots: 1 }),
    flags: { loot: { category: 'normal', xp: 1 } }
  }),
  advItem({
    type: 'gear',
    name: 'Núcleo de guarda de Rex',
    identifier: 'nucleo-de-guarda-de-rex',
    img: ICON('gear-general'),
    folder: F_LOOT,
    room: 'sala-4',
    description: html('Só existe se Rex chegar a 0 HP. Uma peça de valor para a Aegis Vanta. Normal, 1 XP, 1 slot.'),
    system: gearSys({ slots: 1 }),
    flags: { loot: { category: 'normal', xp: 1 } }
  }),
  advItem({
    type: 'gear',
    name: 'Crachá de acesso nível 4',
    identifier: 'cracha-de-acesso-nivel-4',
    img: ICON('gear-general'),
    folder: F_LOOT,
    room: 'sala-2',
    description: html('Credencial do Assistente da Diretora. Abre o elevador de serviço do Anel ao 60º. Pode ser roubada, persuadida ou clonada (hack de rua CD 15).'),
    system: gearSys({ slots: 0 })
  }),
  advItem({
    type: 'gear',
    name: 'Réplica de exibição (isca)',
    identifier: 'replica-de-exibicao',
    img: ICON('gear-general'),
    folder: F_LOOT,
    room: 'sala-3',
    description: html('A "máscara" da vitrine do 60º, com um sinalizador que avisa a Diretora e Rex quando alguém a toca. Sucata, 0 XP.'),
    system: gearSys({ slots: 1 }),
    flags: { loot: { category: 'scrap', xp: 0 } }
  })
];

export const adventureItems = [...cacheItems, ...maskItems, ...propItems, ...lootItems];

/* ------------------------------------------------------------------ */
/* Elenco e inimigos                                                   */
/* ------------------------------------------------------------------ */

const F_RUTH = 'Contratante';
const F_S1 = 'Sala 1: Saguão Vermelho';
const F_S2 = 'Sala 2: Baile no Anel';
const F_S3 = 'Sala 3: Vitrine do 60º';
const F_S4 = 'Sala 4: Corredor dos Rostos';
const F_S5 = 'Sala 5: Cofre e Fuga';
const F_L3 = 'Ajuste para nível 3';

const MORALE_CD = { weak: 18, normal: 15, firm: 12, fanatic: 15 };
const p = (text) => `<p>${text}</p>`;
let npcSort = 0;

function npc({ name, folder, room, level, hp, ac, armor = 0, movement = 'Próximo', alignment = 'Controle', morale = 'normal', attacks = [], traits, loot = '', img = ICON('npc'), disposition = -1 }) {
  npcSort += 100;
  return {
    identifier: slug(name),
    name,
    type: 'npc',
    img,
    folder,
    sort: npcSort,
    system: {
      level,
      hp: { value: hp, max: hp },
      ac,
      armor,
      movement,
      alignment,
      initiative: 0,
      morale: { enabled: morale !== 'fanatic', kind: morale, mod: 0, cd: MORALE_CD[morale] },
      attacks: attacks.map((a) => ({ notes: '', heavy: false, ...a })),
      traits,
      loot,
      credits: 0
    },
    prototypeToken: { name, disposition, actorLink: false, bar1: { attribute: 'hp' } },
    flags: flagsOf(room)
  };
}

const fromThreat = (name, over) => {
  const base = threatActors.find((a) => a.name === name);
  if (!base) throw new Error(`Ameaça base não encontrada: ${name}`);
  const doc = clone(base);
  npcSort += 100;
  return { ...doc, folder: over.folder, sort: npcSort, flags: flagsOf(over.room), system: { ...doc.system, traits: doc.system.traits + over.extra } };
};

const rexBlock = slice(7, 'Ficha: REX');

const rexMk2 = adv.section('13').lines.find((l) => l.startsWith('- **Rex Mk II'));

export const adventureNpcs = [
  npc({
    name: 'Dona Ruth',
    folder: F_RUTH,
    room: 'briefing',
    level: 1,
    hp: 5,
    ac: 11,
    alignment: 'Sobrevivência',
    morale: 'weak',
    disposition: 0,
    traits:
      p('<em>Fixer do Mercado do Sétimo Andar. Seca, conta créditos enquanto fala, fuma um cigarro eletrônico de menta. Não conhece o cliente e acha isso um bom sinal.</em>') +
      p('<strong>Rede de contatos:</strong> 1 vez por cena, chama 1d4 Capangas.') +
      p('<strong>Negociadora:</strong> vantagem em CAR.') +
      p('Ela foi enganada também: não sabe nada sobre a assinatura da Obelisco. A banca dela fica no sétimo andar do Mercado, onde o Prêmio é entregue.'),
    loot: p('<strong>Pagamento:</strong> d6 x 150 cr por runner, menos 10% de comissão, rolado no Debrief.')
  }),
  npc({
    name: 'O Mordomo (IA)',
    folder: F_S1,
    room: 'sala-1',
    level: 0,
    hp: 3,
    ac: 10,
    movement: '',
    morale: 'fanatic',
    img: ICON('ice'),
    traits:
      p('<em>Mordomo holográfico, elegante e sorridente, que recebe a fila do Portão de Máscaras.</em>') +
      p('<strong>Núcleo:</strong> CA 10 | HP 3 | Hack +0 | 1 ação.') +
      p('<strong>Domínio:</strong> o saguão (portão, câmeras, scanner). Sem ataques.') +
      p('<strong>Motivação:</strong> servir a Diretora. <strong>Fraqueza:</strong> obedece a quem tiver a senha.') +
      p('<strong>Pista da reviravolta:</strong> ao liberar a entrada, diz: "Seus convites chegaram antes do esperado. A Diretora ficará encantada em conhecê-los."')
  }),
  fromThreat('Segurança corporativa', {
    folder: F_S1,
    room: 'sala-1',
    extra: p('<strong>Na aventura:</strong> duas guardam o Portão (Sala 1). Com o Alerta 4, duas chegam em 1d4 rodadas, e na fuga duas vêm atrás dos runners (NA 4 no total).')
  }),
  fromThreat('Drone de vigilância', {
    folder: F_S1,
    room: 'sala-1',
    extra: p('<strong>Na aventura:</strong> um cobre o Portão (Sala 1), e dois cercam Aragão no cofre (Sala 5). O Rigger pode distrair o drone da doca de serviço com o próprio drone.')
  }),
  npc({
    name: 'O Assistente',
    folder: F_S2,
    room: 'sala-2',
    level: 0,
    hp: 3,
    ac: 10,
    alignment: 'Controle',
    morale: 'weak',
    disposition: 0,
    traits:
      p('<em>Assistente da Diretora, escondido entre os convidados de máscara dourada (Corvo dourado). Está ali para ser roubado.</em>') +
      p('<strong>Sinais:</strong> não bebe, olha o relógio a cada poucos minutos e tem a mão esquerda cromada.') +
      p('<strong>Pista da reviravolta:</strong> se o crachá for roubado, ele não reage, nem a mão treme, e ainda sorri. Se for persuadido, entrega o crachá com muita facilidade.')
  }),
  npc({
    name: 'Teo Pixel',
    folder: F_S2,
    room: 'sala-2',
    level: 0,
    hp: 3,
    ac: 10,
    alignment: 'Sobrevivência',
    morale: 'weak',
    disposition: 0,
    traits:
      p('<em>Influenciador bêbado e fofoqueiro, rival de feed de Cassius Vento.</em>') +
      p('<strong>Informação:</strong> um drinque (20 cr) e a conversa é automática; sem drinque, CAR CD 9. Revela que o Corvo dourado "não bebe" e "olha o relógio".')
  }),
  npc({
    name: 'O Curador',
    folder: F_S3,
    room: 'sala-3',
    level: 0,
    hp: 3,
    ac: 10,
    alignment: 'Controle',
    morale: 'weak',
    disposition: 0,
    traits:
      p('<em>Guarda civil da Galeria dos Troféus, apaixonado por arte.</em>') +
      p('<strong>Informação:</strong> fala por 100 cr ou por conversa (CAR CD 12, com vantagem para Nico Prisma). Diz onde a Diretora guarda "o de verdade" e avisa do robô do corredor.')
  }),
  npc({
    name: 'Rex, Robô de Exclusão',
    folder: F_S4,
    room: 'sala-4',
    level: 4,
    hp: 26,
    ac: 14,
    armor: 1,
    morale: 'fanatic',
    attacks: [
      { name: 'Taser de punho (Contenção)', bonus: 4, damage: 'd6', range: 'close', notes: 'Atordoa: o alvo só pode se mover ou agir na rodada seguinte.' },
      { name: 'Metralhadora de ombro (Letal)', bonus: 4, damage: 'd8', range: 'near', notes: 'Rajada: um único teste atinge todos num cubo Próximo à frente cuja CA seja igual ou menor que o resultado. Depois, Rex gasta uma ação para recarregar.' },
      { name: 'Lâminas monofio de punho (Letal)', bonus: 5, damage: 'd8', range: 'close', notes: 'Ignora 1 de CA do alvo.' },
      { name: 'Soco hidráulico', bonus: 5, damage: 'd8', range: 'close', notes: 'O alvo faz FOR CD 12 ou cai.' },
      { name: 'Varredura', bonus: 4, damage: 'd6', range: 'close', notes: 'Um único movimento atinge todos os runners Perto dele.' }
    ],
    traits:
      md(rexBlock) +
      p('<strong>Rede magnética (Contenção):</strong> ataque +4, Próximo, sem dano. DES CD 12 ou o alvo fica preso. Máximo de 2 por combate. <strong>Agarrar:</strong> ataque +5, Perto, prende o alvo. <strong>Esmagar (Letal):</strong> automático, 2d6, só contra um alvo já agarrado.'),
    loot: p('<strong>Núcleo de guarda de Rex</strong> (só se Rex chegar a 0 HP): Normal, 1 XP, 1 slot.')
  }),
  npc({
    name: 'Lívia Aragão',
    folder: F_S5,
    room: 'sala-5',
    level: 3,
    hp: 15,
    ac: 13,
    morale: 'normal',
    attacks: [{ name: 'Pistola pesada', bonus: 4, damage: 'd8', range: 'near' }],
    traits:
      p('<em>Diretora de Conteúdo da Lumen e a cliente anônima de Dona Ruth. Calorosa, elegante e tranquila, vestida de branco, com uma taça na mão.</em>') +
      p('<strong>Influência:</strong> 1 vez por cena, dá uma ordem a um NPC de Controle, que a obedece sem questionar.') +
      p('<strong>Botão de pânico:</strong> sobe o Alerta a 4.') +
      p('<strong>Em volta dela:</strong> 2 Drones de vigilância. Com eles, eliminar a Diretora é um combate Normal, e a segurança chega em 1d4 rodadas.'),
    loot: p('<strong>Credstick:</strong> d6 x 100 cr. <strong>Equipamento:</strong> 1 item Normal em metade dos casos.')
  }),
  npc({
    name: 'Rex Mk II (nível 3)',
    folder: F_L3,
    room: 'nivel-3',
    level: 6,
    hp: 38,
    ac: 16,
    armor: 2,
    morale: 'fanatic',
    attacks: [
      { name: 'Taser de punho (Contenção)', bonus: 6, damage: 'd8', range: 'close', notes: 'Atordoa.' },
      { name: 'Metralhadora de ombro (Letal)', bonus: 6, damage: '2d6', range: 'near', notes: 'Rajada.' },
      { name: 'Lâminas monofio de punho (Letal)', bonus: 6, damage: '2d6', range: 'close', notes: 'Ignora 1 de CA do alvo.' },
      { name: 'Soco hidráulico', bonus: 6, damage: '2d6', range: 'close', notes: 'O alvo faz FOR CD 12 ou cai.' }
    ],
    traits:
      p('<em>Versão do Rex para o tier Corp (soma de níveis 12, Normal = NA 9). Mesmas regras do Rex, com os números abaixo.</em>') +
      md(rexMk2) +
      p('<strong>Em Modo Letal, faz dois ataques por rodada.</strong> A invasão física na porta dorsal exige CD 20. Vem com 1 Drone de combate (NA 2, Rajada), total NA 8, Normal. Lâminas e Varredura seguem a mesma regra de "um passo acima" (d8 vira 2d6, d6 vira d8).') +
      p('<strong>Alerta 4:</strong> um esquadrão de 4 Seguranças com um Agente corporativo de campo (NA 4). Veja o capítulo 13 do Livro da Aventura.'),
    loot: p('<strong>Núcleo de guarda de Rex</strong> (só se chegar a 0 HP): Normal, 1 XP, 1 slot. Pagamento do nível 3: d6 x 500 cr por runner.')
  })
];

/* ------------------------------------------------------------------ */
/* Runners prontos (nível 1)                                           */
/* ------------------------------------------------------------------ */

/** abilities: valores finais da ficha, com o bônus de talento já somado; `bonus` desfaz isso para a base. */
const RUNNERS = [
  {
    name: 'Ferrugem',
    cls: 'solo',
    origin: 'cromado',
    alignment: 'sobrevivencia',
    trigger: 'forca-do-bando',
    background: 'ex-seguranca-corp',
    persona: 'Bruno Alcântara',
    abilities: [15, 12, 14, 8, 10, 10],
    talents: [{ id: 'atributo-solo', roll: 8, choice: { abilities: 'con' }, bonus: { con: 2 } }],
    family: 'blades',
    implants: ['subderme-blindada', 'arma-retratil'],
    credits: 450,
    drive: 'Evoluir o cromo de Rua para Corp (livro 10.6).',
    gear: [['jaqueta-blindada', 'F'], ['charuteira', 'F'], ['faca', 'C'], ['pistola-pesada', 'C'], ['carregador', 'C', 2], ['rig-utilitario', 'F'], ['racao', 'F']]
  },
  {
    name: 'Pixel',
    cls: 'netrunner',
    origin: 'android',
    alignment: 'liberdade',
    trigger: 'sabotador',
    background: 'hacker-de-garagem',
    persona: 'Nico Prisma',
    abilities: [8, 13, 10, 15, 12, 9],
    talents: [{ id: 'biblioteca', roll: 2 }],
    programs: ['ping', 'backdoor', 'loop-de-camera'],
    credits: 290,
    drive: 'Descobrir quem escreveu o código-mestre de obediência dos Androides.',
    gear: [['deck-de-rua', 'F'], ['cabo-de-interface', 'F'], ['bateria', 'F'], ['pistola-leve', 'C'], ['carregador', 'C'], ['kit-de-ferramentas', 'C'], ['rig-utilitario', 'F']]
  },
  {
    name: 'Agulha',
    cls: 'hyperdoc',
    origin: 'replicante',
    purpose: 'companion',
    alignment: 'liberdade',
    trigger: 'libertador',
    background: 'atendente-de-clinica',
    persona: 'Dra. Marta Ibsen',
    abilities: [9, 11, 12, 12, 15, 12],
    talents: [{ id: 'protocolo-afinado', roll: 6, choice: { program: 'nanocura' } }],
    programs: ['nanocura', 'analgesia'],
    credits: 180,
    drive: 'Apagar o número de série da própria nuca.',
    gear: [['nanokit', 'F'], ['kit-medico', 'F'], ['bisturis-de-ceramica', 'F'], ['jaqueta-blindada', 'F'], ['pistola-leve', 'C'], ['faca', 'C'], ['carregador', 'C'], ['racao', 'F'], ['rig-utilitario', 'F']]
  },
  {
    name: 'Sombra',
    cls: 'ghost',
    origin: 'biomod',
    alignment: 'sobrevivencia',
    trigger: 'cauteloso',
    background: 'entregador',
    persona: 'Cassius Vento',
    abilities: [9, 16, 11, 10, 13, 12],
    talents: [{ id: 'camuflagem-optica', roll: 10 }],
    mutations: ['sentidos-agudos', 'escalador-nato'],
    credits: 310,
    drive: 'Quitar a dívida da família com o Banco Cobalto.',
    gear: [['jaqueta-blindada', 'F'], ['bengala-bastao', 'F'], ['pistola-leve', 'C'], ['faca', 'C'], ['kit-de-ferramentas', 'C'], ['lanterna', 'C'], ['racao', 'F'], ['rig-utilitario', 'F']]
  },
  {
    name: 'Estática',
    cls: 'rocker',
    origin: 'nat',
    alignment: 'liberdade',
    trigger: 'agitador',
    background: 'dj-de-clube',
    persona: 'Yara K',
    abilities: [9, 13, 11, 12, 10, 16],
    talents: [
      { id: 'atributo-rocker', roll: 8, choice: { abilities: 'car' }, bonus: { car: 2 } },
      { id: 'afinacao', roll: 5, choice: { program: 'hype' } }
    ],
    programs: ['hype', 'estatica', 'solo'],
    credits: 60,
    drive: 'Tocar ao vivo na transmissão da Lumen.',
    gear: [['rig-de-palco', 'F'], ['lamina-de-ceramica', 'F'], ['jaqueta-blindada', 'F'], ['pistola-leve', 'C'], ['faca', 'C'], ['racao', 'F'], ['rig-utilitario', 'F']]
  },
  {
    name: 'Faísca',
    cls: 'rigger',
    origin: 'cromado',
    alignment: 'controle',
    trigger: 'exorcista',
    background: 'piloto-de-transporte',
    persona: 'Tereza Mares',
    abilities: [8, 15, 12, 13, 12, 10],
    talents: [{ id: 'atributo-rigger', roll: 8, choice: { abilities: 'des' }, bonus: { des: 2 } }],
    implants: ['jack-de-interface', 'cabo-gancho'],
    credits: 290,
    drive: 'Juntar 15.000 cr para um hoverbike próprio.',
    gear: [['jaqueta-blindada', 'F'], ['broche-drone', 'F'], ['radio', 'F'], ['pistola-leve', 'C'], ['carregador', 'C'], ['kit-de-ferramentas', 'C'], ['racao', 'F'], ['rig-utilitario', 'F']]
  }
];

const byId = (list, id) => {
  const found = list.find((x) => x.identifier === id);
  if (!found) throw new Error(`Item não encontrado: ${id}`);
  return found;
};

const ABILITIES = ['for', 'des', 'con', 'int', 'sab', 'car'];
const catalog = [...weaponItems, ...armorItems, ...gearItems, ...adventureItems];

const fichaBlock = (name) => {
  const lines = chap(14).markdown.split('\n');
  const start = lines.findIndex((l) => l.startsWith('### Ficha') && l.toUpperCase().includes(name.toUpperCase()));
  if (start === -1) throw new Error(`Ficha ${name} não encontrada`);
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].startsWith('### Ficha')) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join('\n');
};

const paragraphOf = (block, label) => {
  const line = block.split('\n').find((l) => l.startsWith(`**${label}:**`));
  if (!line) throw new Error(`Parágrafo "${label}" não encontrado`);
  return line;
};

/** Monta os itens embutidos de um runner da aventura com as mesmas concessões do sistema. */
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

  const mask = PERSONAS.find((x) => x.name === def.persona);
  const entries = [...def.gear, [maskId(mask), 'F']];
  // o que passa pelo Portão é empunhado primeiro; o que vem da Cache entra depois, se houver mão livre
  const ordered = [...entries.filter((e) => e[1] === 'F'), ...entries.filter((e) => e[1] === 'C')];
  let hands = 0;
  let armorOn = false;
  for (const [id, where, qty] of ordered) {
    const cat = byId(catalog, id);
    const doc = push(cat, { adventure: { id: ADVENTURE_ID, source: where === 'C' ? 'cache' : 'portao' } });
    if (cat.type === 'gear' && qty) doc.system.quantity = qty;
    if (where === 'C') doc.system.description += html('Cache de Ruth: este item só chega ao runner no elevador de serviço do Anel (Sala 3), a menos que o plano de armas dele diga outra coisa.');
    if (cat.type === 'weapon' && cat.system.hands + hands <= 2 && cat.identifier !== 'bisturis-de-ceramica') {
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
  const input = {
    level: 1,
    abilityBase: base,
    hpRolls: [faces],
    items: items.map((it, i) => ({ id: `tmp${i}`, ...it, system: it.system }))
  };
  return { items, base, derived: deriveCharacter(input), input };
}

function runnerActors() {
  return RUNNERS.map((def, i) => {
    const { items, base, derived } = buildRunner(def);
    const pers = persona(def.persona);
    const block = fichaBlock(def.name);
    const plan = paragraphOf(block, 'Plano de armas');
    const biography =
      `<h2>Persona da festa</h2>` +
      html(`**${pers.name}**, ${pers.role}. Máscara: ${pers.mask}. Gancho: ${pers.hook} Adereço: ${pers.prop}`) +
      `<h2>Plano de armas</h2>` +
      md(plan.replace(/^\*\*Plano de armas:\*\*\s*/, '')) +
      html('Itens marcados com a origem "cache" ficam na Cache de Ruth até o elevador de serviço (Sala 3). Os demais passam pelo scanner do Portão.');
    return {
      identifier: slug(def.name),
      name: def.name,
      type: 'character',
      img: ICON('character'),
      sort: (i + 1) * 100,
      system: {
        abilities: Object.fromEntries(ABILITIES.map((k) => [k, { base: base[k] }])),
        level: 1,
        xp: { value: 0 },
        hp: { value: derived.hp.max, rolls: [Number(/d(\d+)/.exec(derived.hp.hitDie)[1])], bonus: 0 },
        ac: { cover: false, override: null },
        edge: { value: 1, triggerUsed: false },
        currency: { credits: def.credits },
        details: { drive: def.drive, languages: 'Dialeto da cidade', civilName: pers.name, biography },
        creation: { completed: true, step: 9 }
      },
      items,
      prototypeToken: { name: def.name, disposition: 1, actorLink: true, bar1: { attribute: 'hp' } },
      flags: flagsOf('runners', { pregen: true, persona: pers.name })
    };
  });
}

export const adventureRunners = runnerActors();
export const RUNNER_DEFS = RUNNERS;

/* ------------------------------------------------------------------ */
/* Tabelas                                                             */
/* ------------------------------------------------------------------ */

const mkTable = (identifier, name, results) => ({
  identifier,
  name,
  type: 'RollTable',
  img: ICON('table'),
  folder: null,
  sort: 0,
  formula: '1d6',
  replacement: true,
  displayRoll: true,
  results,
  flags: flagsOf('mesa')
});

export const adventureTables = [
  mkTable(
    'persona-do-runner',
    'Persona do runner (d6)',
    PERSONAS.map((x, i) => ({ range: [i + 1, i + 1], name: x.name, text: `${x.role}. Máscara: ${x.mask}. Adereço: ${x.prop}` }))
  ),
  mkTable(
    'pagamento-por-runner',
    'Pagamento por runner (d6 x 150 cr)',
    [1, 2, 3, 4, 5, 6].map((v) => ({ range: [v, v], name: `${v * 150} cr`, text: `Pagamento integral por runner, antes dos 10% de comissão de Dona Ruth. Exposto como "ladrão da Obelisco": metade. Acordo com Aragão: ela paga este valor no lugar de Ruth. Prêmio perdido: nada.` }))
  )
];

/* ------------------------------------------------------------------ */
/* Livro da Aventura                                                   */
/* ------------------------------------------------------------------ */

const PAGE_IDS = {
  1: 'visao-geral',
  2: 'antes-da-mesa',
  3: 'briefing',
  4: 'sala-1',
  5: 'sala-2',
  6: 'sala-3',
  7: 'sala-4',
  8: 'sala-5',
  9: 'debrief',
  10: 'checklist',
  11: 'cortes',
  12: 'fichas-rapidas',
  13: 'nivel-3',
  14: 'fichas-prontas'
};

const NPC = (id, label) => link(`noite-elenco/${id}`, label);
const ITEM = (id, label) => link(`noite-itens/${id}`, label);
const RUNNER = (id) => link(`noite-fichas/${id}`);

/** Caixa "Nesta cena" no fim de cada página do livro: onde achar cada ficha e item. */
const HERE = {
  3: {
    elenco: [NPC('dona-ruth')],
    itens: [
      ITEM('cache-de-ruth'),
      ITEM('pistola-de-polimero'),
      ITEM('embaralhador'),
      ITEM('pele-cosmetica-descartavel'),
      ...PERSONAS.map((x) => link(`noite-itens/${maskId(x)}`, `Máscara: ${x.mask}`)),
      ITEM('bengala-bastao'),
      ITEM('charuteira'),
      ITEM('bisturis-de-ceramica'),
      ITEM('lamina-de-ceramica'),
      ITEM('broche-drone')
    ],
    mesa: [link('noite-tabelas/persona-do-runner'), link('noite-jogadores/briefing-de-dona-ruth'), link('noite-jogadores/mascaras-e-personas'), link('noite-jogadores/armas-na-festa')]
  },
  4: { elenco: [NPC('o-mordomo-ia'), NPC('seguranca-corporativa'), NPC('drone-de-vigilancia')], itens: [], mesa: [link('noite-jogadores/escala-do-alerta')] },
  5: { elenco: [NPC('o-assistente'), NPC('teo-pixel')], itens: [ITEM('cracha-de-acesso-nivel-4'), ITEM('uisque-de-barril-de-servidor')], mesa: [] },
  6: { elenco: [NPC('o-curador')], itens: [ITEM('replica-de-exibicao'), ITEM('registro-de-acessos-do-cracha'), ITEM('cache-de-ruth')], mesa: [] },
  7: { elenco: [NPC('rex-robo-de-exclusao')], itens: [ITEM('nucleo-de-guarda-de-rex'), link('equipamento/granada-de-fragmentacao'), link('equipamento/granada-de-fumaca')], mesa: [] },
  8: { elenco: [NPC('livia-aragao'), NPC('drone-de-vigilancia')], itens: [ITEM('rosto-livre'), ITEM('dossie-do-desmascaramento')], mesa: [link('noite-tabelas/pagamento-por-runner')] },
  9: { elenco: [NPC('dona-ruth')], itens: [ITEM('rosto-livre'), ITEM('dossie-do-desmascaramento'), ITEM('registro-de-acessos-do-cracha'), ITEM('uisque-de-barril-de-servidor'), ITEM('nucleo-de-guarda-de-rex')], mesa: [link('noite-tabelas/pagamento-por-runner')] },
  12: { elenco: [NPC('seguranca-corporativa'), NPC('drone-de-vigilancia'), NPC('o-mordomo-ia'), NPC('rex-robo-de-exclusao'), NPC('livia-aragao'), NPC('o-assistente'), NPC('teo-pixel'), NPC('o-curador'), NPC('dona-ruth')], itens: [ITEM('pistola-de-polimero')], mesa: [] },
  13: { elenco: [NPC('rex-mk-ii-nivel-3'), link('ameacas/drone-de-combate'), link('ameacas/agente-corporativo-de-campo'), link('ice/sentinela'), link('ice/cao-de-guarda')], itens: [], mesa: [] },
  14: { elenco: [], itens: [], mesa: [], runners: RUNNERS.map((r) => RUNNER(slug(r.name))) }
};

const hereBox = (n) => {
  const h = HERE[n];
  if (!h) return '';
  const list = (title, arr) => (arr?.length ? `<li><strong>${title}:</strong> ${arr.join(', ')}</li>` : '');
  const body = [list('Elenco e inimigos', h.elenco), list('Itens e butim', h.itens), list('Runners prontos', h.runners), list('Tabelas e material dos jogadores', h.mesa)].join('');
  return `<hr><h3>Nesta cena: onde achar tudo</h3><ul>${body}</ul>`;
};

const bookPages = chaps.map((c) => ({
  identifier: PAGE_IDS[c.number],
  name: `${c.number}. ${c.title}`,
  type: 'text',
  sort: c.number * 100,
  title: { show: true, level: 1 },
  text: { format: 1, content: md(c.markdown) + hereBox(c.number) }
}));

const quickGuide = [
  `<h2>As três pistas</h2>${md(slice(1, 'As três pistas'))}`,
  `<h2>Mapa de tempo</h2>${md(slice(2, 'Mapa de tempo'))}`,
  `<h2>Regras de ritmo</h2>${md(slice(2, 'Regras de ritmo'))}`,
  `<h2>O Alerta</h2>${md(slice(2, 'O Alerta'))}`,
  `<h2>Cortes, se o tempo apertar</h2>${md(chap(11).markdown)}`
].join('');

const R = (rows) => rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('');
const room = (page, label) => link(`noite-aventura/livro#${page}`, label);

const hub =
  `<p><em>Aventura de assalto para SombraNeon v0.6. Quatro runners de nível 1, uma sessão de até 4 horas. Tudo que a aventura usa está nos compêndios desta pasta.</em></p>` +
  `<h2>Compêndios da aventura</h2><ul>` +
  `<li>@Pack[noite-aventura]: este índice, o guia rápido e o Livro da Aventura (só o Mestre).</li>` +
  `<li>@Pack[noite-jogadores]: o que entregar à mesa (briefing, personas, armas na festa e escala do Alerta).</li>` +
  `<li>@Pack[noite-elenco]: todos os NPCs e inimigos, em pastas por sala.</li>` +
  `<li>@Pack[noite-fichas]: os seis runners prontos de nível 1.</li>` +
  `<li>@Pack[noite-itens]: Cache de Ruth, máscaras e adereços, butim e objetos da missão.</li>` +
  `<li>@Pack[noite-tabelas]: persona do runner e pagamento.</li></ul>` +
  `<h2>Sala por sala</h2><table><thead><tr><th>Cena</th><th>Hora</th><th>Elenco</th><th>Itens e butim</th></tr></thead><tbody>` +
  R([
    [room('briefing', 'Briefing'), 'antes das 22:00', NPC('dona-ruth'), `${ITEM('cache-de-ruth')}, ${ITEM('pistola-de-polimero')}, ${ITEM('embaralhador')}, ${ITEM('pele-cosmetica-descartavel')}, máscaras e adereços`],
    [room('sala-1', 'Sala 1: Saguão Vermelho'), '22:00', `${NPC('o-mordomo-ia')}, ${NPC('seguranca-corporativa')}, ${NPC('drone-de-vigilancia')}`, 'nenhum'],
    [room('sala-2', 'Sala 2: Baile no Anel'), '22:40', `${NPC('o-assistente')}, ${NPC('teo-pixel')}`, `${ITEM('cracha-de-acesso-nivel-4')}, ${ITEM('uisque-de-barril-de-servidor')}`],
    [room('sala-3', 'Sala 3: Vitrine do 60º'), '23:10', NPC('o-curador'), `${ITEM('replica-de-exibicao')}, ${ITEM('registro-de-acessos-do-cracha')}, ${ITEM('cache-de-ruth')}`],
    [room('sala-4', 'Sala 4: Corredor dos Rostos'), '23:35', NPC('rex-robo-de-exclusao'), `${ITEM('nucleo-de-guarda-de-rex')}, ${link('equipamento/granada-de-fragmentacao')}`],
    [room('sala-5', 'Sala 5: Cofre e Fuga'), '23:50', `${NPC('livia-aragao')}, ${NPC('drone-de-vigilancia')}`, `${ITEM('rosto-livre')}, ${ITEM('dossie-do-desmascaramento')}`],
    [room('debrief', 'Debrief'), 'depois', NPC('dona-ruth'), link('noite-tabelas/pagamento-por-runner')],
    [room('nivel-3', 'Ajuste para nível 3'), 'opcional', NPC('rex-mk-ii-nivel-3'), 'mesmo butim, com itens Valiosos extras']
  ]) +
  `</tbody></table>` +
  `<h2>Runners prontos</h2><table><thead><tr><th>Ficha</th><th>Classe</th><th>Origem</th><th>Persona</th></tr></thead><tbody>` +
  R(
    RUNNERS.map((r) => [
      RUNNER(slug(r.name)),
      byId(classItems, r.cls).name,
      byId(originItems, r.origin).name,
      persona(r.persona).name
    ])
  ) +
  `</tbody></table>` +
  `<p>Escolha 4 das 6 fichas. O Rex não se hackeia, então Solo, Ghost e Rocker pesam mais na luta, e o Hyperdoc mantém o grupo de pé. Veja ${room('fichas-prontas', 'o capítulo 14 do livro')}.</p>` +
  `<h2>Livro de regras e compêndios de referência</h2><ul>` +
  `<li>@Pack[regras]{Livro de Regras}: capítulos 9 e 10 (invasão, missões, XP).</li>` +
  `<li>${link('referencias/compendio-de-ameacas')} e ${link('referencias/compendio-de-veiculos-e-armamento')}.</li>` +
  `<li>@Pack[ameacas]{Ameaças} e @Pack[equipamento]{Equipamento} para o que a mesa quiser acrescentar.</li></ul>` +
  `<h2>Antes de começar</h2><ul>` +
  `<li>Imprima ou abra ${link('noite-jogadores/escala-do-alerta')}, ${link('noite-jogadores/mascaras-e-personas')} e as fichas dos runners.</li>` +
  `<li>Dê 1 ficha de Edge a cada jogador e deixe um cronômetro de celular pronto para a Sala 5.</li>` +
  `<li>Releia ${room('visao-geral', 'a verdade (só para o Mestre)')} e ${room('briefing', 'o briefing e o plano de armas')}.</li>` +
  `<li>Arraste o Rex, os Seguranças e os Drones para a cena só quando precisar, pela pasta da sala.</li></ul>`;

export const adventureJournals = [
  {
    identifier: 'indice',
    name: '00. Índice: onde achar tudo',
    type: 'JournalEntry',
    img: ICON('journal'),
    folder: 'Comece aqui',
    sort: 100,
    pages: [{ identifier: 'indice', name: 'Índice da aventura', type: 'text', sort: 100, title: { show: true, level: 1 }, text: { format: 1, content: hub } }],
    ownership: { default: 0 },
    flags: flagsOf('indice')
  },
  {
    identifier: 'guia-rapido',
    name: '01. Guia rápido da mesa',
    type: 'JournalEntry',
    img: ICON('journal'),
    folder: 'Comece aqui',
    sort: 200,
    pages: [{ identifier: 'guia-rapido', name: 'Guia rápido da mesa', type: 'text', sort: 100, title: { show: true, level: 1 }, text: { format: 1, content: quickGuide } }],
    ownership: { default: 0 },
    flags: flagsOf('guia')
  },
  {
    identifier: 'livro',
    name: 'Noite das Máscaras: Livro da Aventura',
    type: 'JournalEntry',
    img: ICON('journal'),
    folder: 'Livro da aventura',
    sort: 300,
    pages: bookPages,
    ownership: { default: 0 },
    flags: flagsOf('livro')
  }
];

const handout = (identifier, name, sort, content) => ({
  identifier,
  name,
  type: 'JournalEntry',
  img: ICON('journal'),
  folder: null,
  sort,
  pages: [{ identifier, name, type: 'text', sort: 100, title: { show: true, level: 1 }, text: { format: 1, content } }],
  ownership: { default: 0 },
  flags: flagsOf('jogadores')
});

const ruthSpeech = slice(3, 'Dona Ruth')
  .split('\n')
  .filter((l) => l.startsWith('>'))
  .join('\n');

export const adventureHandouts = [
  handout(
    'briefing-de-dona-ruth',
    'Briefing de Dona Ruth',
    100,
    `<p><em>Dona Ruth, fixer do Mercado do Sétimo Andar. Seca, conta créditos enquanto fala, fuma um cigarro eletrônico de menta.</em></p>${md(ruthSpeech)}` +
      `<h2>O contrato</h2><ul><li>Alvo: o <strong>Rosto Livre</strong>, protótipo de implante neural que troca rosto e voz, no cofre da Diretoria, 62º andar da torre da Lumen.</li><li>Prazo: antes da meia-noite, quando a Lumen faz o Desmascaramento ao vivo.</li><li>Pagamento: d6 x 150 cr por runner, rolado no Debrief, menos 10% de comissão.</li><li>Entrega: na banca de Ruth, no sétimo andar do Mercado.</li><li>Você recebe um convite, uma máscara e uma persona. Não tire a máscara.</li></ul>`
  ),
  handout('mascaras-e-personas', 'Máscaras-convite e personas', 200, md(slice(3, 'Máscaras-convite e personas'))),
  handout('armas-na-festa', 'Armas na festa', 300, md(until(slice(3, 'Armas na festa'), /^\*\*Rede de segurança/))),
  handout('escala-do-alerta', 'Escala do Alerta (0 a 4)', 400, md(until(slice(2, 'O Alerta'), /^\*\*Exceção/)))
];

/* ------------------------------------------------------------------ */
/* Packs                                                               */
/* ------------------------------------------------------------------ */

export const ADVENTURE_PACKS = [
  { scope: 'module', folderSorting: 'm', name: 'noite-aventura', label: 'Noite das Máscaras: Livro da Aventura (Mestre)', docType: 'JournalEntry', docs: adventureJournals },
  { scope: 'module', folderSorting: 'm', name: 'noite-jogadores', label: 'Noite das Máscaras: Material dos Jogadores', docType: 'JournalEntry', docs: adventureHandouts },
  { scope: 'module', folderSorting: 'm', name: 'noite-elenco', label: 'Noite das Máscaras: Elenco e Inimigos', docType: 'Actor', docs: adventureNpcs },
  { scope: 'module', folderSorting: 'm', name: 'noite-fichas', label: 'Noite das Máscaras: Runners Prontos', docType: 'Actor', docs: adventureRunners },
  { scope: 'module', folderSorting: 'm', name: 'noite-itens', label: 'Noite das Máscaras: Itens e Butim', docType: 'Item', docs: adventureItems },
  { scope: 'module', folderSorting: 'm', name: 'noite-tabelas', label: 'Noite das Máscaras: Tabelas', docType: 'RollTable', docs: adventureTables }
];

/** Pasta do menu de compêndios (packFolders do module.json), na ordem em que aparecem. */
export const ADVENTURE_PACK_FOLDER = {
  name: 'Noite das Máscaras',
  sorting: 'm',
  color: '#c2185b',
  packs: ADVENTURE_PACKS.map((x) => x.name)
};
