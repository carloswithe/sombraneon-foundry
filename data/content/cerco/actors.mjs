import { item } from '../lib.mjs';
import { SOURCE, ASSET_DIR, ICON, marked, noComments, toHtml, withFlags, exists } from './lib.mjs';
import { artOf } from './images.mjs';

/**
 * Ameaças (12) e NPCs (19) do capítulo 12 (marcadores ATOR). NA, CA, HP, BL, MOV, Moral e alinhamento são
 * lidos da própria ficha; os ataques estão escritos aqui e conferidos em tests/ui/cerco.test.mjs. O texto
 * restante (traços, "Nesta aventura", interpretação e segredo) vai inteiro para os traços do ator.
 */
const BLOCKS = marked('ATOR');
const MORALE_KIND = { Fraca: 'weak', Normal: 'normal', Firme: 'firm', 'Sem medo': 'fanatic' };
const MORALE_CD = { weak: 18, normal: 15, firm: 12, fanatic: 15 };

export const tokenPath = (id) => `${ASSET_DIR}/tokens/${id}.webp`;
const portraitPath = (id) => `${ASSET_DIR}/portraits/${id}.webp`;

const atk = (name, bonus, damage, range, notes = '') => ({ name, bonus, damage, range, notes, heavy: false });
const IMPROVISADO = [atk('Improvisado', 0, 'd4', 'close')];

const F_GANGUE = 'Cães de Vidro';
const F_KESSLER = 'Kessler-Tanaka';
const F_OUTRAS = 'Outras ameaças';
const F_NPC = 'Coordenadores e contatos';
const F_DOZE = 'Os doze';

const CAPTURA = { esquadrao: true };

const THREATS = [
  { id: 'capanga', name: 'Capanga (Cães de Vidro)', folder: F_GANGUE, room: 'sala-2', attacks: [atk('Facão', 1, 'd6', 'close'), atk('Pistola', 1, 'd6', 'near')] },
  { id: 'atirador-gangue', name: 'Atirador de gangue (Cães de Vidro)', folder: F_GANGUE, room: 'sala-2', attacks: [atk('Submetralhadora', 1, 'd6', 'near'), atk('Rajada', 1, 'd6', 'near', 'Um cubo Próximo à frente, contra a CA de cada alvo; precisa recarregar para repetir.')] },
  { id: 'seguranca-corporativa', name: 'Segurança corporativa (Kessler-Tanaka)', folder: F_KESSLER, room: 'sala-3', attacks: [atk('Pistola', 3, 'd6', 'near'), atk('Cassetete', 2, 'd6', 'close')], ...CAPTURA },
  { id: 'drone-vigilancia', name: 'Drone de vigilância (Kessler-Tanaka)', folder: F_KESSLER, room: 'sala-2', attacks: [] },
  { id: 'drone-combate', name: 'Drone de combate (Kessler-Tanaka)', folder: F_KESSLER, room: 'sala-3', attacks: [atk('Autocanhão', 3, 'd6', 'near'), atk('Rajada', 3, 'd6', 'near')], ...CAPTURA },
  { id: 'cao-cibernetico', name: 'Cão cibernético (Kessler-Tanaka)', folder: F_KESSLER, room: 'sala-3', attacks: [atk('Mordida', 3, 'd8', 'close')] },
  { id: 'brandt', name: 'Teodoro Brandt, Coordenador de Operações', folder: F_KESSLER, room: 'sala-4', attacks: [atk('Pistolas inteligentes (2)', 5, 'd6', 'near'), atk('Katana monofio', 5, 'd8', 'close', 'Ignora 1 de CA.')], ...CAPTURA },
  { id: 'coruja', name: 'Coruja, caçadora de sintéticos', folder: F_OUTRAS, room: 'sala-4', attacks: [atk('Pistola pesada', 5, 'd10', 'near', '2 ataques por rodada (pistola ou bastão).'), atk('Bastão de choque', 5, 'd10', 'close', '2 ataques por rodada. Contra Androides: +1d6 de dano e desliga a Interface nativa por 1d4 rodadas.')] },
  { id: 'torreta', name: 'Torreta da Rede Aurora', folder: F_OUTRAS, room: 'sala-1', disp: 1, attacks: [atk('Metralhadora', 4, 'd8', 'far', 'Rajada.')] },
  { id: 'android-seguranca', name: 'Android de segurança (Kessler-Tanaka)', folder: F_KESSLER, room: 'sala-5', bl: 1, attacks: [atk('Punhos reforçados', 5, 'd8', 'close', '2 ataques por rodada.'), atk('Pistola pesada', 5, 'd8', 'near', '2 ataques por rodada.')] },
  { id: 'enxame-ratos', name: 'Enxame de ratos', folder: F_OUTRAS, room: 'sala-5', size: [2, 2], attacks: [atk('Mordidas', 1, 'd4', 'close', 'Em todos os alvos Perto.')] },
  { id: 'van-captura', name: 'Van de captura (Kessler-Tanaka)', folder: F_KESSLER, room: 'sala-4', size: [1, 2], stats: { na: 0, ac: 11, hp: 30, bl: 1, mov: 'Vel. Normal', morale: 'fanatic', alin: 'Controle' }, attacks: [] }
];

const NPCS = [
  { id: 'zaca', name: 'Zaca', folder: F_DOZE, room: 'sala-1', disp: 1, attacks: [atk('Gancho de estivador', 5, 'd8+1', 'close'), atk('Escudo de chapa', 4, 'd6+1', 'close', 'Derruba.')] },
  { id: 'beatriz', name: 'Irmã Beatriz', folder: F_NPC, room: 'sala-1', disp: 0, img: 'img-07', attacks: [atk('Improvisado', 0, 'd4', 'close')] },
  { id: 'jonas', name: 'Jonas Trilho', folder: F_NPC, room: 'sala-1', disp: 0, attacks: IMPROVISADO },
  { id: 'clarice', name: 'Dra. Clarice', folder: F_NPC, room: 'sala-1', disp: 0, attacks: [atk('Bisturi', 1, 'd4', 'close')] },
  { id: 'seu-altino', name: 'Seu Altino', folder: F_NPC, room: 'sala-5', disp: 0, attacks: IMPROVISADO, flags: { senha: 'carga seis' } },
  { id: 'hayashi', name: 'Dr. Hayashi', folder: F_NPC, room: 'sala-5', disp: 0, img: 'img-22', attacks: [atk('Bengala', 0, 'd4', 'close')] },
  { id: 'ruth', name: 'Dona Ruth', folder: F_NPC, room: 'briefing', disp: 1, attacks: [atk('Pistola leve', 1, 'd6', 'near')] },
  { id: 'ana-paz', name: 'Ana Paz', folder: F_NPC, room: 'sala-1', disp: 1, attacks: [atk('Pistola leve', 1, 'd6', 'near')] },
  { id: 'iris', name: 'Íris', folder: F_DOZE, room: 'sala-4', disp: 1, attacks: IMPROVISADO, flags: { palavraGatilho: 'Vitrola' } },
  { id: 'tomas', name: 'Tomás', folder: F_DOZE, room: 'sala-4', disp: 1, attacks: IMPROVISADO, flags: { contragatilho: 'Pardal' } },
  { id: 'dona-nena', name: 'Dona Nena', folder: F_DOZE, room: 'sala-1', disp: 1, attacks: IMPROVISADO },
  { id: 'antonio', name: 'Antônio', folder: F_DOZE, room: 'sala-1', disp: 1, attacks: [atk('Improvisado', 1, 'd4+1', 'close')] },
  { id: 'luzia', name: 'Luzia', folder: F_DOZE, room: 'sala-4', disp: 1, attacks: IMPROVISADO },
  { id: 'caio', name: 'Caio', folder: F_DOZE, room: 'sala-5', disp: 1, attacks: IMPROVISADO },
  {
    id: 'bia', name: 'Bia', folder: F_DOZE, room: 'sala-4', disp: 1, attacks: IMPROVISADO, flags: { alvoDeCaptura: true },
    extra: '<section class="secret"><p><strong>Modo Descarte (só Mestre):</strong> a Bia é a única exceção: os Seguranças ainda tentam levá-la viva.</p></section>'
  },
  { id: 'nzinga', name: 'Nzinga', folder: F_DOZE, room: 'sala-4', disp: 1, attacks: [atk('Pistola leve do kit', 0, 'd6+1', 'near', 'Já com Mira biológica (+1) e a mira torta (-1).')] },
  { id: 'tembo', name: 'Tembo', folder: F_DOZE, room: 'sala-5', disp: 1, attacks: IMPROVISADO },
  { id: 'graca', name: 'Graça', folder: F_DOZE, room: 'sala-3', disp: 1, attacks: IMPROVISADO },
  { id: 'samora', name: 'Samora', folder: F_DOZE, room: 'sala-1', disp: 1, attacks: IMPROVISADO }
];

/** Ficha Civil dos doze (capítulo 12.3): "Todos usam a ficha Civil (NA 0)". */
const CIVIL = { alin: 'Sobrevivência' };

const plainCell = (s) => s.replace(/\*\*/g, '').trim();

/** Estatísticas da linha "**CA** 10 | **HP** 3 | **MOV** ... | **Moral** ... | **Alinh.** ...". */
function readStats(block, def) {
  if (def.stats) return def.stats;
  const heading = block.body.split('\n').find((l) => l.startsWith('#### '));
  const na = Number(/NA (\d+)/.exec(heading)?.[1]);
  const line = block.body.split('\n').find((l) => l.startsWith('**CA**'));
  if (!line || Number.isNaN(na)) throw new Error(`${def.id}: ficha sem NA ou sem linha de CA`);
  const cell = Object.fromEntries(
    plainCell(line)
      .split('|')
      .map((c) => c.trim())
      .map((c) => {
        const m = /^(CA|HP|MOV|Moral|Alinh\.)\s+(.*)$/.exec(c);
        return m ? [m[1], m[2]] : [c, ''];
      })
  );
  return {
    na,
    ac: Number(cell.CA),
    hp: Number(cell.HP),
    bl: def.bl ?? 0,
    mov: cell.MOV,
    morale: MORALE_KIND[cell.Moral] ?? (() => { throw new Error(`${def.id}: Moral desconhecida ${cell.Moral}`); })(),
    alin: cell['Alinh.'] ?? CIVIL.alin
  };
}

/** Os dois arsenais do clímax (instruções, seção 16): o ator começa com o de Captura ativo; a troca é do Mestre. */
const ARSENAIS = [
  ['arsenal-captura', 'Arsenal: Modo Captura', true, '<p>Munição de contenção, redes magnéticas, sedativo e cassetetes. A 0 HP o alvo <strong>nocauteia</strong>, sem estar morrendo; quem cai é levado à van.</p>'],
  ['arsenal-descarte', 'Arsenal: Modo Descarte', false, '<p>Armas letais. A 0 HP o alvo fica <strong>morrendo</strong> (1d4 + CON rodadas). A igreja queima.</p>']
];
const GATILHO = '<p><strong>Troca de modo (do Mestre):</strong> quando <strong>a van é destruída à vista de todos</strong> ou <strong>metade do esquadrão cai</strong> (2 de 4). A ficha começa em Modo Captura; nada é automatizado.</p>';

const arsenalItems = () =>
  ARSENAIS.map(([id, name, active, description]) =>
    withFlags(
      item({ type: 'feature', name, identifier: id, img: ICON('feature'), source: `${SOURCE}, Sala 4`, description: description + GATILHO, system: { kind: 'npc', modifiers: [], choice: {}, uses: { max: 0, value: 0, per: '' } } }),
      id,
      '7. SALA 4',
      { ativo: active }
    )
  );

const arsenalHtml = `<hr><h3>Arsenal: Modo Captura (ativo) e Modo Descarte</h3>${ARSENAIS.map(([, name, , d]) => `<p><strong>${name}.</strong></p>${d}`).join('')}${GATILHO}`;

let sort = 0;
function make(def, type) {
  sort += 100;
  const block = BLOCKS.get(def.id);
  if (!block) throw new Error(`Marcador ATOR ausente: ${def.id}`);
  if (block.attrs.tipo !== type) throw new Error(`${def.id}: tipo ${block.attrs.tipo}, esperado ${type}`);
  const s = readStats(block, def);
  const body = noComments(block.body)
    .split('\n')
    .filter((l) => !l.startsWith('#### ') && !l.startsWith('**CA**') && !l.startsWith('**ATQ:**'))
    .join('\n')
    // cada rótulo (Traços, Interpretação, Segredo) vira um parágrafo: assim o segredo vai para a seção secreta
    .replace(/\n(?=\*\*)/g, '\n\n')
    .trim();
  const atqLine = noComments(block.body).split('\n').find((l) => l.startsWith('**ATQ:**'));
  const [w, h] = def.size ?? [1, 1];
  const picture = def.img ? artOf(def.img).path : exists(portraitPath(def.id)) ? portraitPath(def.id) : tokenPath(def.id);
  const disposition = def.disp ?? -1;
  const doc = {
    identifier: def.id,
    name: def.name,
    type: 'npc',
    img: picture,
    folder: def.folder,
    sort,
    system: {
      level: s.na,
      hp: { value: s.hp, max: s.hp },
      ac: s.ac,
      armor: s.bl,
      movement: s.mov,
      alignment: s.alin,
      initiative: 0,
      morale: { enabled: s.morale !== 'fanatic', kind: s.morale, mod: 0, cd: MORALE_CD[s.morale] },
      attacks: def.attacks.map((a) => ({ ...a })),
      traits: (atqLine ? toHtml(atqLine) : '') + toHtml(body) +(def.extra ?? '') + (def.esquadrao ? arsenalHtml : ''),
      loot: '',
      credits: 0
    },
    items: def.esquadrao ? arsenalItems().map((it, i) => ({ ...it, sort: (i + 1) * 100 })) : [],
    prototypeToken: {
      name: def.name,
      disposition,
      actorLink: type === 'npc',
      texture: { src: tokenPath(def.id) },
      width: w,
      height: h,
      displayName: 20,
      bar1: { attribute: 'hp' }
    }
  };
  return withFlags(doc, def.id, '12. Ameaças e NPCs', { tipo: type, room: def.room, na: s.na, ...(def.flags ?? {}) });
}

export const threatActors = THREATS.map((d) => make(d, 'ameaca'));
export const npcActors = NPCS.map((d) => make(d, 'npc'));
