import { item, NO_USES } from '../lib.mjs';
import { SOURCE, ICON, ADVENTURE_ID, block, toHtml, withFlags } from './lib.mjs';
import { artOf } from './images.mjs';

/**
 * Equipamentos (10), Tesouros (5) e o Prêmio (1) da aventura, conforme o capítulo 13 de docs/carga-sem-nome.md.
 * Cada butim guarda, em flags[sombraneon-carga-sem-nome].butim, categoria, XP, venda, slots, se é digital,
 * onde está e como pegar. O Prêmio leva também a flag premio = true.
 */
let sort = 0;

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

/** O texto do bloco da aventura vira a descrição. */
function make({ id, heading, name, folder, room, img, system, butim, premio = false, extra = {} }) {
  sort += 100;
  const b = block(13, heading);
  const base = item({
    type: 'gear',
    name,
    identifier: id,
    img: img ?? ICON('gear-general'),
    folder,
    sort,
    source: `${SOURCE}, capítulo 13`,
    description: toHtml(b.text),
    system,
    flags: butim ? { loot: { category: butim.categoria, xp: butim.xp } } : {}
  });
  return withFlags(base, id, '13. Equipamentos, tesouros e Prêmio', { room, ...(butim ? { butim } : {}), ...(premio ? { premio: true } : {}), ...extra }, { adventure: { id: ADVENTURE_ID, room } });
}

const F_PREMIO = 'Prêmio';
const F_TESOURO = 'Tesouros';
const F_KITS = 'Kits e veículos do Tavares';
const F_EMBOSCADA = 'Kit de Emboscada';
const F_LOJA = 'À venda no Ferro-Velho';

/* Prêmio e tesouros */

export const prizeItems = [
  make({
    id: 'item-nest',
    heading: 'Nest (Nestor Quaresma), "o Intermediário" (Carga 4417-X)',
    name: 'Nest (Nestor Quaresma), o Intermediário (Carga 4417-X)',
    folder: F_PREMIO,
    room: 'sala-4',
    img: artOf('img-26').path,
    system: gearSys({ slots: 0 }),
    premio: true,
    butim: { categoria: 'Valioso', xp: 3, venda: 'não se vende (é uma pessoa)', slots: '1 assento num veículo', digital: false, onde: 'Cela B do Jararaca (lado oeste), sedado e restrito numa cadeira de contenção (Sala 4).', como: 'Abrir a cela (cartão, chave do Eurico, cabo na porta de serviço, Carga ou Maçarico), soltar as tiras e carregá-lo (uma mão ocupada) até receber as próteses do Kit de Resgate.' }
  })
];

export const treasureItems = [
  make({
    id: 'item-rastreador-b',
    heading: 'Rastreador B-subdérmico da Aegis',
    name: 'Rastreador B-subdérmico da Aegis',
    folder: F_TESOURO,
    room: 'sala-5',
    img: artOf('img-32').path,
    system: gearSys({ slots: 1 }),
    butim: { categoria: 'Valioso', xp: 3, venda: 'd10 x 1.000 cr (tecnologia da Aegis, com selo)', slots: 1, digital: false, onde: 'Sob a pele da nuca de Nest, ao lado da vértebra.', como: 'Cirurgia do Hyperdoc, INT CD 15 com Nanokit (falhou: o emissor queima e Nest sofre d6). O Netrunner o acha com Ping (Hack CD 12).' }
  }),
  make({
    id: 'item-cartao-comando',
    heading: 'Cartão de comando penitenciário',
    name: 'Cartão de comando penitenciário',
    folder: F_TESOURO,
    room: 'sala-4',
    img: artOf('img-33').path,
    system: gearSys({ slots: 1 }),
    butim: { categoria: 'Normal', xp: 1, venda: 'd10 x 100 cr', slots: 1, digital: false, onde: 'Pendurado no pescoço do Sargento Teixeira, por dentro da gola (Sala 4).', como: 'DES CD 15 contra o Sargento de pé (Ghost tem vantagem; risco: coronhada d6), ou ele entrega ao se render (Moral CD 12 aos 7 HP).' }
  }),
  make({
    id: 'item-caderneta',
    heading: 'Caderneta do Intermediário',
    name: 'Caderneta do Intermediário',
    folder: F_TESOURO,
    room: 'sala-5',
    img: artOf('img-33').path,
    system: gearSys({ slots: 1 }),
    butim: { categoria: 'Normal', xp: 1, venda: 'd10 x 100 cr (o valor real é narrativo: prova a traição da Tesoureira)', slots: 1, digital: false, onde: 'No locker acima da cadeira de Nest, destrancado, junto com os pertences confiscados (Sala 5).', como: 'Uma ação.' }
  }),
  make({
    id: 'item-celula-militar',
    heading: 'Célula de potência militar',
    name: 'Célula de potência militar',
    folder: F_TESOURO,
    room: 'sala-2',
    system: gearSys({ slots: 1 }),
    butim: { categoria: 'Sucata', xp: 0, venda: '300 cr', slots: 1, digital: false, onde: 'Oficina trancada do Posto Meia-Lua (zona E, Sala 2).', como: 'DES CD 12 (Ghost, Rigger), ou Seu Jaci vende por 300 cr. Se o Sargento notar o roubo, o Alerta sobe em 1.' }
  }),
  make({
    id: 'item-nucleo-cerbero',
    heading: 'Núcleo do Cérbero',
    name: 'Núcleo do Cérbero',
    folder: F_TESOURO,
    room: 'sala-4',
    system: gearSys({ slots: 1 }),
    butim: { categoria: 'Normal', xp: 1, venda: 'd10 x 100 cr (tecnologia da Aegis, com selo de série)', slots: 1, digital: false, onde: 'No tórax do Cérbero derrubado (0 HP) ou em Espera (Sala 4).', como: 'INT CD 12, uma ação, com uma ferramenta; falhou, 1d6 de choque.' }
  })
];

/* Equipamentos */

export const equipmentItems = [
  make({
    id: 'item-kit-resgate',
    heading: 'Kit de Resgate de Nest',
    name: 'Kit de Resgate de Nest',
    folder: F_KITS,
    room: 'sala-1',
    img: artOf('img-35').path,
    system: gearSys({ slots: 3 }),
    extra: { quem: 'Tavares, num armário atrás da bancada (Sala 1). Só sai a quem pedir.' }
  }),
  make({
    id: 'item-furgao-tavares',
    heading: 'Furgão do Tavares (van de carga)',
    name: 'Furgão do Tavares (van de carga)',
    folder: F_KITS,
    room: 'sala-1',
    img: ICON('gear-vehicle'),
    system: gearSys({
      category: 'vehicle',
      slots: 0,
      price: 12000,
      vehicle: { category: 'medium', terrain: 'land', passengers: '1+5', ac: 11, hp: 30, bl: 1, maneuver: 0, speed: 'Normal', cargo: 20, hardpoints: '', license: 'C', size: '', strength: 0, strike: '', extraSlots: 0, notes: 'Módulos: Fumaça e chaff (1 uso por cena) e Pneus reforçados (ignora a Avaria 1).' }
    }),
    extra: { quem: 'O grupo, no galpão do Tavares (Sala 1), se mostrar a ficha de ouro de Ruth.' }
  }),
  make({
    id: 'item-motos-tavares',
    heading: 'Duas motos urbanas do Tavares',
    name: 'Duas motos urbanas do Tavares',
    folder: F_KITS,
    room: 'sala-1',
    img: ICON('gear-vehicle'),
    system: gearSys({
      category: 'vehicle',
      slots: 0,
      quantity: 2,
      price: 3000,
      vehicle: { category: 'light', terrain: 'land', passengers: '1+1', ac: 12, hp: 10, bl: 0, maneuver: 3, speed: 'Rápida', cargo: 2, hardpoints: '', license: 'C', size: '', strength: 0, strike: '', extraSlots: 0, notes: 'Abertas: os ocupantes não têm cobertura.' }
    }),
    extra: { quem: 'O grupo, no galpão do Tavares (Sala 1).' }
  }),
  make({
    id: 'item-tapete-espinhos',
    heading: 'Tapete de Espinhos',
    name: 'Tapete de Espinhos',
    folder: F_EMBOSCADA,
    room: 'sala-1',
    img: artOf('img-34').path,
    system: gearSys({ slots: 2, price: 150 }),
    extra: { quem: 'No Kit de Emboscada, dentro do Furgão (Sala 1).' }
  }),
  make({
    id: 'item-granadas',
    heading: 'Duas granadas de fragmentação',
    name: 'Duas granadas de fragmentação',
    folder: F_EMBOSCADA,
    room: 'sala-1',
    img: ICON('gear-explosive'),
    system: gearSys({ category: 'explosive', quantity: 2, slots: 1, perSlot: 1, price: 100 }),
    extra: { quem: 'No Kit de Emboscada, dentro do Furgão (Sala 1). Tavares vende mais (fumaça 50, atordoamento 80, EMP 300, termita 250 cr).', nota: 'A Granada EMP (300 cr) é vendida pelo Tavares: raio Perto, eletrônicos e implantes desativados por 1d4 rodadas.' }
  }),
  make({
    id: 'item-carga-demolicao',
    heading: 'Carga de Demolição',
    name: 'Carga de Demolição',
    folder: F_EMBOSCADA,
    room: 'sala-1',
    img: ICON('gear-explosive'),
    system: gearSys({ category: 'explosive', slots: 2, perSlot: 1, price: 500 }),
    extra: { quem: 'No Kit de Emboscada, dentro do Furgão (Sala 1).' }
  }),
  make({
    id: 'item-macarico-brecha',
    heading: 'Maçarico de Brecha',
    name: 'Maçarico de Brecha',
    folder: F_LOJA,
    room: 'sala-1',
    system: gearSys({ slots: 1, price: 300 }),
    extra: { quem: 'À venda no Ferro-Velho do Tavares (Sala 1).' }
  }),
  make({
    id: 'item-manta-faraday',
    heading: 'Manta Faraday',
    name: 'Manta Faraday',
    folder: F_LOJA,
    room: 'sala-1',
    system: gearSys({ slots: 1, price: 50 }),
    extra: { quem: 'À venda no Ferro-Velho do Tavares (Sala 1).' }
  }),
  make({
    id: 'item-radio-interceptor',
    heading: 'Rádio Interceptor da Guarda',
    name: 'Rádio Interceptor da Guarda',
    folder: F_LOJA,
    room: 'sala-1',
    img: ICON('gear-radio'),
    system: gearSys({ category: 'radio', slots: 1, price: 200 }),
    extra: { quem: 'À venda no Ferro-Velho do Tavares (Sala 1).' }
  }),
  make({
    id: 'item-cracha-manutencao',
    heading: 'Coletes e crachás da Ouroboros',
    name: 'Coletes e crachás da Ouroboros',
    folder: F_KITS,
    room: 'sala-1',
    system: gearSys({ slots: 1, price: 0 }),
    extra: { quem: 'Com Tavares, no galpão (Sala 1). Emprestado.' }
  })
];

/** Tesouros e Prêmio ficam no mesmo compêndio. */
export const lootItems = [...prizeItems, ...treasureItems];
