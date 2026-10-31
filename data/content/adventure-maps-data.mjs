/**
 * Geometria dos 10 mapas de mesa da Noite das Máscaras (docs/noite-das-mascaras-scenes.md).
 * Todas as coordenadas estão em PIXELS DA IMAGEM (a arte em assets/.../mapas/), medidos sobre a própria
 * arte. adventure-maps.mjs converte para o tamanho da cena (quadrados x 100 px) e monta os documentos.
 *
 * Convenções: `seg` e `door` são uma parede; `box`, `ring` e `line` devolvem listas de paredes.
 * `low: true` bloqueia o movimento mas não a visão (móveis, balcões). `tag` marca a parede ou a luz
 * para os macros (alerta4, apagao, cracha4, mural, curto).
 */

export const seg = (x0, y0, x1, y1, o = {}) => ({ c: [x0, y0, x1, y1], ...o });
export const line = (pts, o = {}, closed = false) =>
  pts.slice(0, closed ? pts.length : -1).map((p, i) => {
    const q = pts[(i + 1) % pts.length];
    return seg(p[0], p[1], q[0], q[1], o);
  });
export const box = (x0, y0, x1, y1, o = {}) =>
  line(
    [
      [x0, y0],
      [x1, y0],
      [x1, y1],
      [x0, y1]
    ],
    o,
    true
  );
export const ring = (cx, cy, r, o = {}) => {
  const pts = Array.from({ length: 8 }, (_, i) => [Math.round(cx + r * Math.cos((i * Math.PI) / 4 + Math.PI / 8)), Math.round(cy + r * Math.sin((i * Math.PI) / 4 + Math.PI / 8))]);
  return line(pts, o, true);
};
/** Porta: ds 0 fechada, 1 aberta, 2 trancada. */
export const door = (x0, y0, x1, y1, o = {}) => seg(x0, y0, x1, y1, { door: 1, ds: 0, ...o });

export const light = (x, y, r, o = {}) => ({ x, y, r, ...o });

export const rect = (name, x0, y0, x1, y1, color) => ({ name, color, shape: { type: 'rectangle', x: x0, y: y0, width: x1 - x0, height: y1 - y0 } });
export const oval = (name, cx, cy, rx, ry, color) => ({ name, color, shape: { type: 'ellipse', x: cx, y: cy, radiusX: rx, radiusY: ry } });
export const poly = (name, pts, color) => ({ name, color, shape: { type: 'polygon', points: pts.flat() } });

const CYAN = '#00e5ff';
const RED = '#ff1744';
const AMBER = '#ffb300';
const GREY = '#9e9e9e';

/* Ficha de cada tipo de token. ref = pack/identifier de um ator dos compêndios. */
const hero = (n, at) => ({ name: `Runner ${n}`, at, runner: n, disp: 1, icon: 'character' });
const runners = (pts) => pts.map((p, i) => hero(i + 1, p));
const actor = (name, ref, at, o = {}) => ({ name, ref, at, disp: -1, ...o });
const extra = (name, at, o = {}) => ({ name, at, disp: 0, icon: 'npc', ...o });
const guests = (pts, name = 'Convidado') => pts.map((p, i) => extra(`${name} ${i + 1}`, p));

/* ------------------------------------------------------------------ */
/* Anel: a planta do mapa 4 é a mesma do mapa 9                        */
/* ------------------------------------------------------------------ */

const anelWalls = () => [
  // parede curva esquerda, de baixo para cima
  ...line([[500, 1180], [430, 1015], [365, 1008], [360, 968], [270, 945], [190, 900], [188, 800], [185, 700], [172, 600], [150, 500], [150, 455]]),
  // vidro externo (borda interna), da esquerda até a varanda
  ...line([[150, 455], [100, 388], [230, 322], [370, 305], [470, 262], [565, 232], [670, 205], [790, 182], [900, 170], [1000, 165], [1100, 170], [1200, 180], [1330, 205], [1440, 235], [1540, 268], [1600, 300]], { low: true }),
  // varanda leste: corrimão (se vê através, não se atravessa) e porta para o salão
  ...line([[1600, 300], [1650, 165], [1955, 385], [1890, 445], [1845, 495]], { low: true }),
  door(1640, 368, 1735, 452, { tag: 'varanda' }),
  seg(1595, 305, 1640, 368),
  seg(1735, 452, 1845, 500),
  // parede direita e fundo
  seg(1855, 500, 1855, 1180),
  seg(1075, 1180, 1855, 1180),
  door(925, 1180, 1075, 1180, { ds: 1, tag: 'entrada' }),
  seg(500, 1180, 925, 1180),
  // banheiros (canto superior direito) e elevador de serviço
  ...box(1665, 505, 1855, 700),
  door(1666, 565, 1666, 625, { tag: 'banheiro' }),
  seg(1665, 700, 1665, 895),
  seg(1630, 895, 1700, 895),
  door(1700, 895, 1760, 895, { ds: 2, tag: 'cracha4' }),
  seg(1760, 895, 1855, 895),
  ...box(1790, 920, 1825, 985, { low: true }),
  // elevadores principais
  seg(1170, 1030, 1195, 1030),
  door(1195, 1030, 1295, 1030, { tag: 'alerta4' }),
  seg(1295, 1030, 1310, 1030),
  door(1310, 1030, 1415, 1030, { tag: 'alerta4' }),
  seg(1415, 1030, 1430, 1030),
  door(1430, 1030, 1535, 1030, { tag: 'alerta4' }),
  seg(1535, 1030, 1545, 1030),
  seg(1170, 1030, 1170, 1180),
  seg(1545, 945, 1545, 1180),
  seg(1300, 1030, 1300, 1180),
  seg(1422, 1030, 1422, 1180),
  // guarda-volumes
  ...box(527, 1140, 685, 1177, { low: true }),
  ...box(703, 1120, 875, 1177, { low: true }),
  // console de DJ
  ...box(265, 395, 380, 520, { low: true }),
  // balcão do bar
  ...line([[375, 715], [395, 760], [450, 830], [540, 895], [640, 935], [740, 955], [795, 945], [795, 910], [740, 915], [640, 890], [560, 850], [490, 790], [430, 730], [410, 710]], { low: true }, true),
  // mesas altas
  ...[[685, 265], [887, 308], [1138, 308], [565, 362], [727, 375], [1314, 382], [1472, 475], [1540, 670], [1105, 877]].flatMap(([x, y]) => ring(x, y, 28, { low: true })),
  // sofás e poltronas
  ...box(930, 195, 1080, 250, { low: true }),
  ...line([[1360, 275], [1385, 252], [1518, 305], [1498, 352], [1362, 292]], { low: true }, true),
  ...line([[1342, 795], [1430, 722], [1472, 748], [1385, 832]], { low: true }, true),
  ...box(205, 670, 255, 765, { low: true }),
  ...box(228, 792, 285, 890, { low: true }),
  ...box(1630, 735, 1665, 870, { low: true }),
  ...box(1130, 1030, 1170, 1168, { low: true }),
  ...box(1285, 235, 1340, 290, { low: true }),
  ...box(1285, 835, 1335, 890, { low: true }),
  // colunas
  ...box(777, 222, 815, 285),
  ...box(1218, 222, 1255, 285),
  ...box(777, 373, 823, 403),
  ...box(1210, 373, 1255, 403),
  ...box(1185, 813, 1232, 843)
];

const anelRegions = () => [
  poly('Palco (acesso livre pelos dois lados)', [[150, 450], [370, 305], [487, 405], [310, 635], [200, 630]], CYAN),
  rect('Guarda-volumes (chapeleiro)', 500, 1100, 880, 1180, GREY),
  poly('Varanda leste (Entrega aérea)', [[1640, 368], [1650, 170], [1950, 385], [1735, 452]], GREY)
];

const anelNotes = () => [
  { text: 'Palco e console (Rocker, Yara K)', at: [330, 560] },
  { text: 'Bar', at: [620, 960] },
  { text: 'Guarda-volumes (armas deixadas no Portão)', at: [780, 1100] },
  { text: 'Elevadores principais', at: [1360, 1000] },
  { text: 'Elevador de serviço (crachá nível 4)', at: [1745, 835] },
  { text: 'Painel de manutenção: Cache de Ruth, código 3110', at: [1760, 1010] },
  { text: 'Varanda leste', at: [1800, 330] },
  { text: 'Banheiros', at: [1760, 600] }
];

const anelCrowd = [[800, 470], [920, 470], [1040, 470], [1160, 470], [1280, 470], [680, 590], [800, 590], [920, 590], [1280, 590], [1400, 590], [740, 710], [860, 710], [980, 710], [1100, 710], [1220, 710], [1340, 710]];

/* ------------------------------------------------------------------ */
/* Os dez mapas                                                        */
/* ------------------------------------------------------------------ */

export const MAP_DEFS = [
  {
    n: 1,
    slug: 'banca-de-dona-ruth',
    title: 'Banca de Dona Ruth',
    room: 'Abertura e briefing',
    squares: [21, 14],
    priority: 'Extra',
    when: 'Antes de 22:00 e depois da fuga',
    darkness: 0.35,
    walls: [
      ...box(68, 82, 1932, 1275),
      ...box(160, 140, 790, 470),
      ...box(1205, 140, 1840, 470),
      door(790, 410, 1205, 410, { tag: 'cortina' }),
      ...box(185, 622, 1525, 775, { low: true }),
      ...box(1735, 360, 1870, 705),
      ...box(95, 905, 250, 1120),
      ...box(1750, 895, 1870, 1090),
      ...box(230, 1105, 665, 1255),
      ...box(690, 1125, 850, 1255),
      ...box(1155, 1125, 1300, 1255),
      ...box(1360, 1105, 1800, 1255)
    ],
    lights: [light(545, 690, 3, { b: 1, color: CYAN }), light(840, 695, 3, { b: 1, color: CYAN }), light(1145, 690, 3, { b: 1, color: CYAN }), light(1430, 690, 3, { b: 1, color: CYAN })],
    regions: [rect('Corredor do mercado (runners lado a lado)', 250, 800, 1750, 1100, CYAN)],
    tokens: [
      actor('Dona Ruth', 'noite-elenco/dona-ruth', [680, 555], { disp: 0 }),
      ...runners([[600, 920], [750, 920], [900, 920], [1050, 920]]),
      ...[[1575, 550], [1575, 660], [1675, 550], [1675, 660]].map((p, i) => extra(`Capanga ${i + 1} (Rede de contatos)`, p, { disp: -1, hidden: true }))
    ],
    notes: [
      { text: 'Quatro máscaras-convite', at: [1000, 700] },
      { text: 'Cortina: acesso ao fundo', at: [1000, 330] },
      { text: 'Banca de Dona Ruth (sétimo andar do Mercado)', at: [680, 480] }
    ]
  },
  {
    n: 2,
    slug: 'saguao-vermelho',
    title: 'Saguão Vermelho',
    room: 'Sala 1: Saguão Vermelho',
    squares: [30, 20],
    priority: 'Essencial',
    when: '22:00',
    darkness: 0.2,
    walls: [
      seg(127, 180, 305, 180),
      door(305, 180, 425, 180, { tag: 'servico' }),
      seg(425, 180, 745, 180),
      door(745, 180, 895, 180, { tag: 'alerta4' }),
      seg(895, 180, 930, 180),
      door(930, 180, 1075, 180, { tag: 'alerta4' }),
      seg(1075, 180, 1105, 180),
      door(1105, 180, 1255, 180, { tag: 'alerta4' }),
      seg(1255, 180, 1875, 180),
      seg(127, 180, 127, 1205),
      seg(1875, 180, 1875, 1205),
      seg(127, 1205, 780, 1205),
      door(780, 1205, 1220, 1205, { ds: 1, tag: 'entrada' }),
      seg(1220, 1205, 1875, 1205),
      ...box(908, 330, 940, 530),
      ...box(1060, 330, 1092, 530),
      ...box(600, 375, 680, 455),
      ...box(600, 795, 680, 875),
      ...box(1320, 375, 1400, 455),
      ...box(1320, 795, 1400, 875),
      ...line([[200, 440], [280, 430], [360, 390], [420, 330], [445, 255], [478, 255], [478, 310], [440, 390], [370, 455], [300, 490], [210, 498]], { low: true }, true),
      ...box(1135, 470, 1175, 530, { low: true })
    ],
    lights: [light(1000, 560, 5, { b: 1.5, color: RED, alpha: 0.5 }), light(1000, 930, 5, { b: 1.5, color: RED, alpha: 0.5 })],
    regions: [rect('Scanner do Portão de Máscaras', 900, 320, 1100, 540, RED), rect('Fila no tapete de LED', 905, 540, 1095, 1145, RED)],
    tokens: [
      ...runners([[955, 1100], [1045, 1100], [955, 1010], [1045, 1010]]),
      actor('Segurança corporativa 1', 'noite-elenco/seguranca-corporativa', [840, 450]),
      actor('Segurança corporativa 2', 'noite-elenco/seguranca-corporativa', [1160, 420]),
      actor('Drone de vigilância', 'noite-elenco/drone-de-vigilancia', [1000, 290]),
      actor('O Mordomo (IA)', 'noite-elenco/o-mordomo-ia', [1155, 500], { disp: 0 }),
      extra('Chapeleiro', [330, 330]),
      ...guests([[960, 620], [1040, 660], [960, 720], [1040, 780], [960, 840], [1040, 900], [700, 520], [1300, 620], [1500, 720]])
    ],
    notes: [
      { text: 'Portão de Máscaras (scanner)', at: [1000, 250] },
      { text: 'Chapeleiro: suborno 300 cr, CAR CD 9', at: [330, 520] },
      { text: 'Elevadores para o Anel (Alerta 4 trava)', at: [1000, 130] },
      { text: 'Porta de serviço: leva à doca (mapa 3)', at: [365, 130] }
    ]
  },
  {
    n: 3,
    slug: 'doca-de-servico',
    title: 'Doca de Serviço',
    room: 'Sala 1: Saguão Vermelho',
    squares: [24, 16],
    priority: 'Recomendado',
    when: '22:00',
    darkness: 0.45,
    walls: [
      seg(125, 235, 955, 235),
      door(955, 235, 1045, 235, { tag: 'servico' }),
      seg(1045, 235, 1672, 235),
      seg(1672, 235, 1672, 1040),
      seg(125, 235, 125, 1040),
      seg(125, 1040, 870, 1040),
      door(870, 1040, 1130, 1040, { tag: 'portao' }),
      seg(1130, 1040, 1672, 1040),
      ...box(665, 375, 1530, 445),
      ...box(322, 432, 480, 780, { low: true }),
      ...box(1420, 395, 1550, 860, { low: true }),
      ...box(685, 170, 905, 295, { low: true }),
      ...box(668, 385, 845, 565, { low: true }),
      ...box(668, 578, 848, 838, { low: true }),
      ...box(203, 885, 465, 1035, { low: true }),
      ...box(1078, 442, 1200, 830, { low: true })
    ],
    lights: [
      light(1735, 600, 11, { b: 0, color: RED, alpha: 0.45, angle: 70, rot: 90, anim: 'siren', tag: 'camera', name: 'Câmera da doca (cone de varredura)' }),
      light(1715, 610, 1.5, { b: 0.5, color: RED, alpha: 0.6 })
    ],
    regions: [
      rect('Cobertura total (caixas do alto)', 685, 170, 905, 295, GREY),
      rect('Cobertura total (caixas do meio)', 668, 385, 845, 565, GREY),
      rect('Cobertura total (caixas do centro)', 668, 578, 848, 838, GREY),
      rect('Cobertura total (caixas e palete)', 203, 885, 465, 1035, GREY),
      rect('Cobertura total (carrinhos de buffet)', 1078, 442, 1200, 830, GREY),
      rect('Esteira de carga', 1420, 395, 1550, 860, GREY)
    ],
    tokens: [
      ...runners([[905, 990], [1000, 990], [1095, 990], [1000, 900]]),
      extra('Chapeleiro da doca', [1060, 275], { disp: -1 }),
      extra('Drone do Rigger', [1250, 1095], { disp: 1, icon: 'drone' }),
      actor('Segurança corporativa (entra no Alerta 2)', 'noite-elenco/seguranca-corporativa', [1590, 300], { hidden: true })
    ],
    notes: [
      { text: 'Câmera: varredura da cena (DES CD 12 em grupo)', at: [1620, 520] },
      { text: 'Porta de serviço: cozinha e Anel', at: [1000, 330] },
      { text: 'Portão do beco', at: [1000, 1000] },
      { text: 'Chapeleiro: a pista "antes do esperado"', at: [1180, 330] }
    ]
  },
  {
    n: 4,
    slug: 'baile-no-anel',
    title: 'Baile no Anel',
    room: 'Sala 2: Baile no Anel',
    squares: [36, 24],
    priority: 'Essencial',
    when: '22:40',
    darkness: 0.25,
    walls: anelWalls(),
    lights: [light(325, 460, 5, { b: 1.5, color: CYAN, alpha: 0.6 }), light(325, 460, 2, { b: 0.5, color: CYAN, alpha: 0.8 })],
    regions: [oval('Pista de dança (multidão: passar despercebido)', 1000, 608, 440, 210, CYAN), ...anelRegions()],
    tokens: [
      ...runners([[930, 1130], [1030, 1130], [950, 1040], [1050, 1040]]),
      actor('O Assistente (Corvo dourado)', 'noite-elenco/o-assistente', [500, 600], { disp: 0 }),
      extra('Raposa dourada (investidor)', [520, 770]),
      extra('Caveira dourada (gerente da DJ)', [450, 470]),
      extra('Arlequim dourado (médico da Vitalis)', [1405, 775]),
      extra('Sol dourado (executivo bêbado)', [1100, 610]),
      actor('Teo Pixel', 'noite-elenco/teo-pixel', [650, 850], { disp: 0 }),
      extra('Drone de selfie', [735, 815], { disp: 0, icon: 'drone' }),
      extra('DJ (máscara de gato de vidro)', [330, 580]),
      actor('Segurança de plantão', 'noite-elenco/seguranca-corporativa', [1140, 960]),
      ...guests(anelCrowd)
    ],
    notes: anelNotes()
  },
  {
    n: 5,
    slug: 'elevador-de-servico-e-a-cache',
    title: 'Elevador de Serviço e a Cache',
    room: 'Sala 2: Baile no Anel',
    squares: [6, 4],
    priority: 'Extra',
    when: 'Pouco antes de 23:10',
    darkness: 0.2,
    walls: [
      seg(405, 305, 1595, 305),
      seg(1595, 305, 1595, 1075),
      seg(1595, 1075, 1245, 1075),
      door(760, 1075, 1240, 1075, { tag: 'elevador' }),
      seg(755, 1075, 405, 1075),
      seg(405, 1075, 405, 305),
      door(890, 305, 1140, 305, { ds: 2, tag: 'painel' })
    ],
    lights: [light(695, 520, 1.5, { b: 0.5, color: RED, alpha: 0.7 }), light(1000, 820, 4, { b: 1, color: '#ffffff', alpha: 0.25 })],
    regions: [rect('Mala do eletricista (Cache de Ruth)', 450, 390, 780, 690, RED)],
    tokens: runners([[1000, 560], [1330, 560], [1000, 900], [1330, 900]]),
    notes: [
      { text: 'Painel de manutenção: código 3110', at: [1000, 430] },
      { text: 'Cache de Ruth: itens [C], 2 granadas de fragmentação, 1 de fumaça', at: [620, 760] }
    ]
  },
  {
    n: 6,
    slug: 'galeria-dos-trofeus',
    title: 'Galeria dos Troféus',
    room: 'Sala 3: Vitrine do 60º',
    squares: [32, 18],
    priority: 'Essencial',
    when: '23:10',
    darkness: 0.5,
    walls: [
      seg(175, 245, 200, 245),
      door(200, 245, 350, 245, { tag: 'elevador' }),
      seg(350, 245, 1655, 245),
      seg(1655, 245, 1655, 375),
      door(1655, 375, 1895, 375, { ds: 2, tag: 'apagao' }),
      seg(1900, 375, 1900, 852),
      seg(1900, 852, 175, 852),
      seg(175, 852, 175, 245),
      ...box(435, 180, 515, 302, { low: true }),
      ...box(1285, 180, 1365, 302, { low: true }),
      ...box(125, 355, 200, 492, { low: true }),
      ...box(425, 762, 527, 852, { low: true }),
      ...box(590, 762, 695, 852, { low: true }),
      ...box(740, 777, 792, 852, { low: true }),
      ...box(1247, 777, 1298, 852, { low: true }),
      ...box(1340, 762, 1440, 852, { low: true }),
      ...box(1480, 762, 1580, 852, { low: true }),
      ...box(630, 215, 685, 300, { low: true }),
      ...box(1440, 252, 1530, 312, { low: true }),
      ...box(958, 222, 1045, 305, { low: true }),
      ...ring(1000, 575, 65, { low: true }),
      ...box(1650, 445, 1770, 517, { low: true }),
      ...box(1630, 345, 1675, 440, { low: true }),
      ...box(1775, 700, 1840, 840, { low: true })
    ],
    lights: [light(1000, 570, 8, { b: 4, color: '#ffffff', alpha: 0.5, tag: 'galeria' }), light(1000, 555, 4, { b: 1.5, color: CYAN, alpha: 0.6 })],
    regions: [
      oval('Isca: a vitrine central avisa Aragão e Rex', 1000, 570, 150, 150, CYAN),
      rect('Cabo de energia atrás da estátua (SAB CD 12)', 510, 252, 1285, 278, AMBER),
      rect('Terminal da galeria (hack CD 12)', 1625, 340, 1680, 445, CYAN)
    ],
    tokens: [...runners([[240, 330], [330, 330], [240, 420], [330, 420]]), actor('O Curador', 'noite-elenco/o-curador', [1720, 560], { disp: 0 })],
    notes: [
      { text: 'Isca: sinalizador para Aragão e Rex', at: [1000, 700] },
      { text: 'Estátua de ouro: cabos no teto atrás dela', at: [1000, 330] },
      { text: 'Terminal: registro de acessos e nota sobre o 61º', at: [1590, 330] },
      { text: 'Porta da escada (trava no apagão)', at: [1780, 340] },
      { text: 'Elevador de serviço (chegada do grupo)', at: [275, 205] }
    ]
  },
  {
    n: 7,
    slug: 'corredor-dos-rostos',
    title: 'Corredor dos Rostos',
    room: 'Sala 4: Corredor dos Rostos',
    squares: [28, 16],
    priority: 'Essencial',
    when: '23:35',
    darkness: 0.3,
    walls: [
      seg(210, 215, 1785, 215),
      seg(1785, 215, 1785, 385),
      door(1785, 385, 1785, 725, { ds: 2, tag: 'cofre' }),
      seg(1785, 725, 1785, 895),
      seg(1785, 895, 210, 895),
      seg(210, 895, 210, 690),
      ...box(210, 650, 335, 690),
      door(210, 460, 210, 650, { tag: 'escada' }),
      ...box(210, 415, 335, 460),
      seg(210, 415, 210, 215),
      ...box(668, 332, 805, 472),
      ...box(1145, 332, 1282, 472),
      ...box(668, 645, 805, 778)
    ],
    lights: [
      light(1745, 555, 5, { b: 2, color: CYAN, alpha: 0.7 }),
      ...[500, 1000, 1500].flatMap((x) => [light(x, 190, 5, { b: 0, color: CYAN, alpha: 0.25, tag: 'mural' }), light(x, 925, 5, { b: 0, color: CYAN, alpha: 0.25, tag: 'mural' })]),
      light(900, 190, 4, { b: 1, color: AMBER, alpha: 0.7, anim: 'pulse', tag: 'curto', hidden: true }),
      light(1100, 925, 4, { b: 1, color: AMBER, alpha: 0.7, anim: 'pulse', tag: 'curto', hidden: true })
    ],
    regions: [
      rect('Parede do Mural, norte (curto-circuito: DES CD 12 ou 2d6)', 210, 215, 1785, 286, AMBER),
      rect('Parede do Mural, sul (curto-circuito: DES CD 12 ou 2d6)', 210, 824, 1785, 895, AMBER),
      rect('Cobertura: coluna de vidro (+2 CA vs Taser, Rede, Metralhadora)', 650, 315, 825, 490, GREY),
      rect('Cobertura: coluna de vidro (+2 CA vs Taser, Rede, Metralhadora)', 1127, 315, 1300, 490, GREY),
      rect('Cobertura: coluna de vidro (+2 CA vs Taser, Rede, Metralhadora)', 650, 628, 825, 796, GREY),
      oval('Placa de carregamento de Rex', 1570, 555, 75, 75, CYAN)
    ],
    tokens: [...runners([[400, 490], [400, 575], [485, 490], [485, 575]]), actor('Rex, Robô de Exclusão', 'noite-elenco/rex-robo-de-exclusao', [1570, 555], { size: [2, 2] })],
    notes: [
      { text: 'Porta da escada (entrada do grupo)', at: [270, 560] },
      { text: 'Porta dorsal de Rex: CA 16, só pelas costas ou flanco', at: [1500, 650] },
      { text: 'Porta de cofre (fim do corredor)', at: [1700, 790] }
    ]
  },
  {
    n: 8,
    slug: 'cofre-da-diretoria',
    title: 'Cofre da Diretoria',
    room: 'Sala 5: Cofre da Diretoria',
    squares: [24, 16],
    priority: 'Essencial',
    when: '23:50',
    darkness: 0,
    walls: [
      seg(88, 90, 220, 90),
      door(220, 90, 420, 90, { tag: 'emergencia' }),
      seg(420, 90, 1595, 90),
      seg(1595, 90, 1595, 1255, { low: true }),
      seg(1595, 1255, 88, 1255),
      seg(88, 1255, 88, 760),
      door(88, 565, 88, 760, { tag: 'cofre' }),
      seg(88, 565, 88, 90),
      ...box(865, 342, 1135, 445, { low: true }),
      ...line([[680, 575], [820, 555], [1000, 545], [1180, 555], [1320, 575], [1325, 770], [1180, 790], [1000, 800], [820, 790], [680, 775]], { low: true }, true),
      ...box(345, 1095, 645, 1225, { low: true }),
      ...box(205, 905, 305, 1170, { low: true }),
      ...box(220, 825, 305, 905, { low: true }),
      ...box(685, 1110, 815, 1220, { low: true }),
      ...box(635, 95, 1365, 215, { low: true })
    ],
    lights: [light(1000, 672, 4, { b: 1.5, color: CYAN, alpha: 0.7 }), light(1000, 395, 1, { b: 0.3, color: RED, alpha: 0.8, tag: 'panico', hidden: true, name: 'Botão de pânico (revele quando apertarem)' })],
    regions: [
      rect('Saída: escada de incêndio', 220, 90, 420, 200, AMBER),
      rect('Saída: duto de manutenção', 1155, 1172, 1380, 1235, AMBER),
      rect('Saída: janela com cabo (DES CD 12)', 1470, 1020, 1595, 1160, AMBER),
      oval('Mesa de reunião: o Rosto Livre no pedestal', 1000, 672, 330, 120, CYAN)
    ],
    tokens: [
      ...runners([[190, 610], [190, 710], [290, 610], [290, 710]]),
      actor('Lívia Aragão', 'noite-elenco/livia-aragao', [1000, 295]),
      actor('Drone de vigilância 1', 'noite-elenco/drone-de-vigilancia', [860, 300]),
      actor('Drone de vigilância 2', 'noite-elenco/drone-de-vigilancia', [1140, 300])
    ],
    notes: [
      { text: 'Rosto Livre (protótipo no pedestal)', at: [1000, 760] },
      { text: 'Terminal: hack CD 15 para redirecionar a transmissão', at: [750, 1060] },
      { text: 'Porta do cofre (entrada do grupo). A porta de emergência não aparece na arte: está no alto à esquerda', at: [200, 520] },
      { text: 'Argola de ancoragem (janela com cabo)', at: [1545, 1010] }
    ]
  },
  {
    n: 9,
    slug: 'anel-desmascarado',
    title: 'Anel Desmascarado',
    room: 'Meia-noite e fuga',
    squares: [36, 24],
    priority: 'Extra',
    when: 'Depois de 00:00',
    darkness: 0.45,
    walls: anelWalls(),
    lights: [
      light(640, 590, 5, { b: 1, color: RED, alpha: 0.55, name: 'Holofote de drone' }),
      light(1380, 890, 5, { b: 1, color: RED, alpha: 0.55, name: 'Holofote de drone' }),
      light(325, 460, 4, { b: 1, color: CYAN, alpha: 0.5 })
    ],
    regions: [oval('Terreno difícil: a multidão em pânico (CAR ou DES CD 12 em grupo)', 1000, 608, 700, 420, RED), ...anelRegions()],
    tokens: [
      ...runners([[1260, 980], [1340, 980], [1420, 980], [1500, 980]]),
      extra('Drone de câmera 1', [540, 500], { disp: -1, icon: 'drone' }),
      extra('Drone de câmera 2', [1380, 860], { disp: -1, icon: 'drone' }),
      ...guests(anelCrowd, 'Convidado em pânico')
    ],
    notes: [...anelNotes(), { text: 'Quem carrega o butim é o alvo. Se cair, o butim fica no chão', at: [1000, 1090] }]
  },
  {
    n: 10,
    slug: 'rua-em-frente-ao-estudio',
    title: 'Rua em frente ao Estúdio',
    room: 'Meia-noite e fuga',
    squares: [30, 20],
    priority: 'Recomendado',
    when: 'Depois de 00:00',
    darkness: 0.4,
    walls: [
      seg(195, 0, 195, 200),
      seg(195, 200, 935, 200),
      door(935, 200, 1065, 200, { ds: 1, tag: 'torre' }),
      seg(1065, 200, 1735, 200),
      seg(1735, 200, 1735, 0),
      seg(1700, 855, 1700, 1342),
      seg(1885, 855, 1885, 1342),
      ...box(330, 525, 520, 610, { low: true }),
      ...box(1250, 525, 1435, 610, { low: true }),
      ...box(525, 770, 710, 850, { low: true }),
      ...box(1425, 750, 1615, 835, { low: true }),
      ...box(395, 370, 520, 490, { low: true }),
      ...box(590, 370, 725, 480, { low: true }),
      ...box(1320, 380, 1500, 490, { low: true }),
      ...box(205, 450, 315, 495, { low: true }),
      ...box(1147, 450, 1255, 495, { low: true }),
      ...box(415, 865, 520, 910, { low: true }),
      ...box(1340, 865, 1485, 905, { low: true })
    ],
    lights: [
      light(1000, 440, 4, { b: 1.5, color: RED, alpha: 0.6 }),
      ...[[835, 415], [1777, 410], [330, 880], [878, 873], [1128, 873], [1633, 882]].map(([x, y]) => light(x, y, 4, { b: 1, color: '#ffe9b0', alpha: 0.35 }))
    ],
    regions: [
      rect('Rota de fuga: beco estreito', 1705, 860, 1880, 1340, AMBER),
      rect('Destino: escada para o Mercado (banca de Dona Ruth)', 65, 1025, 345, 1250, CYAN),
      rect('Saída da torre: tapete de LED', 955, 190, 1045, 440, RED)
    ],
    tokens: [
      ...runners([[965, 255], [1035, 255], [965, 335], [1035, 335]]),
      actor('Segurança corporativa 1', 'noite-elenco/seguranca-corporativa', [965, 160]),
      actor('Segurança corporativa 2', 'noite-elenco/seguranca-corporativa', [1035, 160]),
      extra('Drone de câmera 1', [800, 250], { disp: -1, icon: 'drone' }),
      extra('Drone de câmera 2', [1300, 350], { disp: -1, icon: 'drone' }),
      ...guests([[300, 300], [700, 330], [1180, 300], [1500, 330], [1600, 430], [250, 380], [1700, 300]], 'Figurante')
    ],
    notes: [
      { text: 'Porta da torre da Lumen', at: [1000, 100] },
      { text: 'Beco à direita: rota de fuga', at: [1790, 1000] },
      { text: 'Escada para o Mercado: destino da fuga', at: [200, 1000] },
      { text: 'Seguranças: DES CD 12 em duas rodadas', at: [1000, 480] }
    ]
  }
];
