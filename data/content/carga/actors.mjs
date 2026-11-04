import { ICON, ASSET_DIR, block, toHtml, withFlags, esc, clone } from './lib.mjs';
import { artOf } from './images.mjs';
import { lootItems } from './items.mjs';

/**
 * Ameaças (11) e NPCs (8) do capítulo 12 de docs/carga-sem-nome.md.
 * Os números (NA, CA, HP, BL, MOV, Moral, ataques) estão escritos aqui, conferidos contra as fichas do capítulo;
 * o texto integral de cada ficha (traços, regras da casa, interpretação, segredo, modos) vem do próprio capítulo.
 */
const MORALE = { weak: 18, normal: 15, firm: 12, fanatic: 15 };
const token = (id) => `${ASSET_DIR}/tokens/${id}.png`;

const atk = (name, bonus, damage, range, notes = '', heavy = false) => ({ name, bonus, damage, range, notes, heavy });

const THREATS = [
  {
    id: 'capanga-caes', heading: 'Capanga dos Cães de Vidro', name: 'Capanga dos Cães de Vidro', folder: 'Sala 1: Ferro-Velho Tavares', room: 'sala-1', na: 1,
    ac: 12, hp: 5, bl: 0, mov: 'Próximo', moral: 'weak', alin: 'Sobrevivência',
    attacks: [atk('Facão', 1, 'd6', 'close'), atk('Pistola', 1, 'd6', 'near')]
  },
  {
    id: 'atirador-caes', heading: 'Atirador dos Cães de Vidro', name: 'Atirador dos Cães de Vidro', folder: 'Sala 1: Ferro-Velho Tavares', room: 'sala-1', na: 1,
    ac: 11, hp: 5, bl: 0, mov: 'Próximo', moral: 'weak', alin: 'Sobrevivência',
    attacks: [atk('Submetralhadora', 1, 'd6', 'near'), atk('Rajada', 1, 'd6', 'near', 'Veja a seção 1.3 do Compêndio de Ameaças.')]
  },
  {
    id: 'policial-urbano', heading: 'Policial urbano da Guarda', name: 'Policial urbano da Guarda', folder: 'Sala 2: Posto Meia-Lua', room: 'sala-2', na: 1,
    ac: 13, hp: 6, bl: 0, mov: 'Próximo', moral: 'normal', alin: 'Controle',
    attacks: [atk('Bastão de choque', 1, 'd6', 'close', 'Atordoa em 20 natural.'), atk('Pistola', 1, 'd6', 'near')]
  },
  {
    id: 'sargento-teixeira', heading: 'Sargento Teixeira', name: 'Sargento Teixeira', folder: 'Sala 2: Posto Meia-Lua', room: 'sala-4', na: 3, img: artOf('img-21').path,
    ac: 15, hp: 15, bl: 0, mov: 'Próximo', moral: 'firm', alin: 'Controle',
    attacks: [atk('Escopeta antitumulto', 3, 'd10', 'near', 'Atordoa em 20 natural.'), atk('Escudo', 3, 'd6', 'close', 'Derruba.')],
    items: ['item-cartao-comando']
  },
  {
    id: 'drone-falcao', heading: 'Falcão, drone da Aegis', name: 'Falcão (drone da Aegis)', folder: 'Sala 3: Estrada Sem Luz', room: 'sala-3', na: 1, img: artOf('img-18').path,
    ac: 13, hp: 3, bl: 0, mov: 'Próximo (voa)', moral: 'fanatic', alin: 'Controle',
    attacks: []
  },
  {
    id: 'viatura-guarda', heading: 'Viatura da Guarda', name: 'Viatura da Guarda', folder: 'Sala 3: Estrada Sem Luz', room: 'sala-5', na: 3,
    ac: 13, hp: 35, bl: 1, mov: 'Dobro Próximo', moral: 'fanatic', alin: 'Controle', size: [2, 3],
    attacks: [atk('Metralhadora leve', 4, 'd10', 'far', 'Rajada. Mais os ocupantes (2 Policiais urbanos).')]
  },
  {
    id: 'suv-aegis', heading: 'SUV tático da Aegis', name: 'SUV tático da Aegis', folder: 'Sala 5: Cela Aberta e fuga', room: 'sala-5', na: 4,
    ac: 13, hp: 45, bl: 2, mov: 'Rápida', moral: 'fanatic', alin: 'Controle', size: [2, 3],
    attacks: []
  },
  {
    id: 'jararaca', heading: 'O Jararaca', name: 'O Jararaca (blindado de custódia)', folder: 'Sala 4: Túnel Pluvial', room: 'sala-4', na: 0, img: artOf('img-05').path,
    ac: 15, hp: 90, bl: 5, mov: 'Lenta', moral: 'fanatic', alin: 'Controle', size: [2, 5],
    attacks: []
  },
  {
    id: 'torre-50', heading: 'Torre .50 e Cabo Rufino', name: 'Torre .50 e Cabo Rufino', folder: 'Sala 4: Túnel Pluvial', room: 'sala-4', na: 3, img: artOf('img-22').path,
    ac: 14, hp: 18, bl: 3, mov: 'Fixa (gira)', moral: 'normal', alin: 'Controle', size: [2, 2],
    attacks: [atk('Metralhadora pesada', 5, '2d8', 'far', 'Rajada. Ciclo: 3 rajadas e 1 rodada de recarga.', true), atk('Pistola', 3, 'd6', 'close', 'Só se alguém subir ao teto.')]
  },
  {
    id: 'cerbero', heading: 'Cérbero, robô de exclusão da Guarda', name: 'Cérbero (robô de exclusão da Guarda)', folder: 'Sala 4: Túnel Pluvial', room: 'sala-4', na: 5, img: artOf('img-23').path,
    ac: 15, hp: 30, bl: 2, mov: 'Dobro Próximo', moral: 'fanatic', alin: 'Controle', size: [2, 2],
    attacks: [
      atk('Cabeça Choque (taser)', 6, 'd6', 'close', 'Atordoa por 1 rodada (CON CD 12 resiste). 2 ataques por rodada, cada um com uma cabeça diferente.'),
      atk('Cabeça Chumbo (minicanhão)', 6, 'd8', 'near', 'Rajada.'),
      atk('Cabeça Chama', 6, 'd8', 'close', 'Fogo, cone. O alvo queima (1d4 por 1d4 rodadas).'),
      atk('Pisão', 4, 'd6', 'close', 'Derruba. Só tem este ataque com as três cabeças quebradas.')
    ],
    items: ['item-nucleo-cerbero']
  },
  {
    id: 'droid-combate', heading: 'Droid de combate', name: 'Droid de combate', folder: 'Sala 4: Túnel Pluvial', room: 'sala-4', na: 2,
    ac: 13, hp: 8, bl: 0, mov: 'Dobro Próximo (voa)', moral: 'fanatic', alin: 'Controle',
    attacks: [atk('Metralhadora leve', 3, 'd6', 'near')]
  }
];

const NPCS = [
  {
    id: 'dona-ruth', heading: 'Dona Ruth', name: 'Dona Ruth', folder: 'Briefing', room: 'briefing', na: 1, img: artOf('img-01').path, disp: 0,
    ac: 11, hp: 5, bl: 0, mov: 'Próximo', moral: 'weak', alin: 'Sobrevivência',
    attacks: [atk('Pistola leve', 1, 'd6', 'near')]
  },
  {
    id: 'tavares', heading: 'Tavares, o mecânico', name: 'Tavares, o mecânico', folder: 'Sala 1: Ferro-Velho Tavares', room: 'sala-1', na: 1, img: artOf('img-07').path, disp: 0,
    ac: 11, hp: 5, bl: 0, mov: 'Próximo', moral: 'normal', alin: 'Sobrevivência',
    attacks: [atk('Chave inglesa', 1, 'd6', 'close'), atk('Pistola velha', 1, 'd6', 'near')]
  },
  {
    id: 'seu-jaci', heading: 'Seu Jaci', name: 'Seu Jaci (dono da lanchonete)', folder: 'Sala 2: Posto Meia-Lua', room: 'sala-2', na: 0, img: artOf('img-12').path, disp: 0,
    ac: 10, hp: 3, bl: 0, mov: 'Próximo', moral: 'weak', alin: 'Sobrevivência',
    attacks: [atk('Improvisado (um bule quente)', 0, 'd4', 'close')]
  },
  {
    id: 'motorista-jararaca', heading: 'Eurico', name: 'Eurico (motorista do Jararaca)', folder: 'Sala 2: Posto Meia-Lua', room: 'sala-2', na: 0, disp: 0,
    ac: 10, hp: 3, bl: 0, mov: 'Próximo', moral: 'weak', alin: 'Controle',
    attacks: []
  },
  {
    id: 'nest', heading: 'Nest (Nestor Quaresma), "o Intermediário" (aliado', name: 'Nest (Nestor Quaresma), o Intermediário', folder: 'Aliados (Nest e Daigo)', room: 'sala-5', na: 2, img: artOf('img-28').path, disp: 1,
    ac: 11, hp: 6, hpMax: 15, bl: 0, mov: 'Próximo', moral: 'firm', alin: 'Sobrevivência',
    attacks: [atk('Pistola pesada', 4, 'd8', 'near', 'Com o Kit de Resgate. Desvantagem em DES e em corpo a corpo até calibrar as próteses.'), atk('Faca', 2, 'd6', 'close', 'Corpo a corpo.')],
    extraTraits: `<p><strong>Dois estados (nota do compêndio):</strong> <em>torso sedado</em> (HP 6, CA 10, sem ataques, 1 assento como carga) e <em>equipado com o Kit de Resgate</em> (CA 11, pistola pesada +4 d8; desvantagem em DES e em corpo a corpo até calibrar). A desvantagem das próteses não é automatizada.</p>`
  },
  {
    id: 'daigo-okabe', heading: 'Daigo Okabe, o ronin', name: 'Daigo Okabe, o ronin', folder: 'Aliados (Nest e Daigo)', room: 'sala-4', na: 4, img: artOf('img-27').path, disp: 1,
    ac: 15, hp: 14, hpMax: 20, bl: 0, mov: 'Próximo', moral: 'firm', alin: 'Honra',
    attacks: [atk('Katana monofio', 6, 'd10', 'close', 'Ignora até 2 de BL. Iaijutsu: o primeiro golpe de cada luta, sacado da bainha, causa dano dobrado.'), atk('Golpes secos (sem arma)', 4, 'd6', 'close', 'Sem a lâmina, que está no compartimento da Cela A.')]
  },
  {
    id: 'capita-voss', heading: 'Capitã Ingrid Voss', name: 'Capitã Ingrid Voss', folder: 'Aegis e Mercado', room: 'sala-5', na: 5, img: artOf('img-31').path, disp: -1,
    ac: 16, hp: 28, bl: 0, mov: 'Próximo', moral: 'firm', alin: 'Controle',
    attacks: [atk('Pistolas pesadas (2)', 6, 'd8', 'near', '2 ataques por rodada (NA 5).'), atk('Fuzil', 6, 'd10', 'far', 'Rajada.')]
  },
  {
    id: 'tesoureira', heading: 'A Tesoureira do Mercado', name: 'A Tesoureira do Mercado', folder: 'Aegis e Mercado', room: 'sala-5', na: 2, disp: -1,
    ac: 12, hp: 8, bl: 0, mov: 'Próximo', moral: 'normal', alin: 'Sobrevivência',
    attacks: [atk('Pistola leve', 2, 'd6', 'near')]
  }
];

/** Texto da ficha sem as linhas que viram campos: estatísticas (CA | HP...), ATQ e Saque. */
function parts(heading) {
  const lines = block(12, heading).text.split('\n');
  const loot = lines.find((l) => l.startsWith('**Saque:**')) ?? '';
  const rest = lines.filter((l) => !l.startsWith('**CA**') && !l.startsWith('**ATQ:**') && !l.startsWith('**Saque:**')).join('\n').trim();
  return { rest, loot: loot.replace(/^\*\*Saque:\*\*\s*/, '') };
}

let sort = 0;
function make(def, type) {
  sort += 100;
  const { rest, loot } = parts(def.heading);
  const [w, h] = def.size ?? [1, 1];
  const picture = def.img ?? token(def.id);
  const doc = {
    identifier: def.id,
    name: def.name,
    type: 'npc',
    img: picture,
    folder: def.folder,
    sort,
    system: {
      level: def.na,
      hp: { value: def.hp, max: def.hpMax ?? def.hp },
      ac: def.ac,
      armor: def.bl,
      movement: def.mov,
      alignment: def.alin,
      initiative: 0,
      morale: { enabled: def.moral !== 'fanatic', kind: def.moral, mod: 0, cd: MORALE[def.moral] },
      attacks: def.attacks.map((a) => ({ ...a })),
      traits: toHtml(rest) + (def.extraTraits ?? ''),
      loot: loot ? `<p>${esc(loot)}</p>` : '',
      credits: 0
    },
    items: (def.items ?? []).map((id) => {
      const found = lootItems.find((i) => i.identifier === id);
      if (!found) throw new Error('Item embutido não encontrado: ' + id);
      return { ...clone(found), sort: 100 };
    }),
    prototypeToken: {
      name: def.name,
      disposition: def.disp ?? -1,
      actorLink: type === 'npc',
      texture: { src: token(def.id) },
      width: w,
      height: h,
      displayName: 20,
      bar1: { attribute: 'hp' }
    }
  };
  return withFlags(doc, def.id, '12. Ameaças e NPCs', { tipo: type === 'npc' ? 'npc' : 'ameaca', room: def.room, na: def.na, ...(def.items ? { itens: def.items } : {}) });
}

export const threatActors = THREATS.map((d) => make(d, 'ameaca'));
export const npcActors = NPCS.map((d) => make(d, 'npc'));
export const TOKEN_OF = (id) => token(id);
export { ICON };
