import { item, NO_USES } from '../lib.mjs';
import { SOURCE, ASSET_DIR, ICON, ADVENTURE_ID, marked, noComments, toHtml, withFlags, exists } from './lib.mjs';

/**
 * Os seis itens do capítulo 13 (marcadores ITEM): 2 equipamentos, 3 tesouros e o Prêmio.
 * O butim guarda categoria, XP, venda, slots, se é digital, onde está e como pegar.
 */
const BLOCKS = marked('ITEM');

const gearSys = (over = {}) => ({
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

let sort = 0;
function make({ id, name, folder, room, system, butim, premio = false, extra = {} }) {
  sort += 100;
  const block = BLOCKS.get(id);
  if (!block) throw new Error(`Marcador ITEM ausente: ${id}`);
  const body = noComments(block.body).replace(/^####.*\n/, '');
  const picture = `${ASSET_DIR}/items/${id}.webp`;
  const base = item({
    type: 'gear',
    name,
    identifier: id,
    img: exists(picture) ? picture : ICON('gear-general'),
    folder,
    sort,
    source: `${SOURCE}, capítulo 13`,
    description: toHtml(body),
    system,
    flags: butim ? { loot: { category: butim.categoria, xp: butim.xp } } : {}
  });
  return withFlags(base, id, '13. Equipamentos, tesouros e Prêmio', { room, tipo: block.attrs.tipo, ...(butim ? { butim } : {}), ...(premio ? { premio: true } : {}), ...extra }, { adventure: { id: ADVENTURE_ID, room } });
}

export const equipmentItems = [
  make({
    id: 'item-kit-rede',
    name: 'Kit da Rede Aurora (a casa, de segunda mão)',
    folder: 'Kit da Rede Aurora',
    room: 'sala-1',
    system: gearSys({ slots: 0 }),
    extra: { quem: 'O grupo, ao chegar. Guardado na igreja: a Ana Paz o mostra antes de sair.' }
  }),
  make({
    id: 'item-embaralhador',
    name: 'Embaralhador de série',
    folder: 'Kit da Rede Aurora',
    room: 'sala-1',
    system: gearSys({ slots: 1 }),
    extra: { quem: 'O grupo (o kit da Rede).' }
  })
];

export const treasureItems = [
  make({
    id: 'item-amostra-lote',
    name: 'Amostra do Lote (frasco da Dra. Clarice)',
    folder: 'Tesouros',
    room: 'sala-3',
    system: gearSys({ slots: 1 }),
    butim: { categoria: 'Valioso', xp: 3, venda: 'd10 x 1.000 cr (a Kessler paga mais, e esse é o risco)', slots: 1, digital: false, onde: 'Na maleta da Dra. Clarice.', como: 'Ela a entrega se confiarem nela (CAR CD 12), ou o grupo a encontra (INT CD 12).' }
  }),
  make({
    id: 'item-registro-brandt',
    name: 'Registro de comando do Brandt',
    folder: 'Tesouros',
    room: 'sala-4',
    system: gearSys({ slots: 0 }),
    butim: { categoria: 'Normal', xp: 1, venda: 'd10 x 100 cr', slots: 0, digital: true, onde: 'O tablet dele, na van, ou o neural dele se for nocauteado.', como: 'Cabo, hack de rua CD 15. Download de 1 rodada, sem subir o Alerta (livro 10.3.3).' }
  }),
  make({
    id: 'item-scanner-coruja',
    name: 'Scanner de série da Coruja',
    folder: 'Tesouros',
    room: 'sala-4',
    system: gearSys({ slots: 1 }),
    butim: { categoria: 'Normal', xp: 1, venda: 'd10 x 100 cr (a Rede Aurora e a Aegis Vanta pagam mais)', slots: 1, digital: false, onde: 'Com a Coruja, na cripta (Sala 4).', como: 'A Coruja o perde se for acuada e derrotada na cripta.' }
  }),
  make({
    id: 'item-os-doze',
    name: 'Os Doze (o Prêmio, por grupo)',
    folder: 'Prêmio',
    room: 'sala-5',
    system: gearSys({ slots: 0, uses: { max: 3, value: 3, per: '' } }),
    premio: true,
    butim: { categoria: 'Valioso', xp: 9, xpPorGrupo: 3, grupos: ['Casal', 'Família', 'Grupo de 5'], venda: 'não se vende, são pessoas', slots: 0, digital: false, onde: 'Sala 5, no embarque do Expresso Interzonas (05:00 a 05:04, 3 pessoas por minuto).', como: 'Documentos do Seu Altino (12 passagens e 12 rostos novos), entregues às 04:30 a quem diz "carga seis". Cada grupo que não embarca inteiro perde os 3 XP dele.' }
  })
];

/** Tesouros e Prêmio ficam no mesmo compêndio. */
export const lootItems = [...treasureItems];
