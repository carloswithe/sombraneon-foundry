import { ICON, CARGA_ID, SOURCE, ADVENTURE_ID } from './lib.mjs';

/**
 * Macros da aventura (instruções, seção 11): Alerta, relógio da história, Folga, relógio do Posto, ciclo da torre,
 * relógio da Viatura Beta, cabeças do Cérbero, mostrador de dificuldade e os estados do Túnel.
 * Cada macro chama uma função da API do módulo (modules/sombraneon-carga-sem-nome/sombraneon-carga-sem-nome.mjs).
 * Os macros só funcionam para o Mestre.
 */
const API = `game.modules.get('${CARGA_ID}').api`;

const DEFS = [
  ['alerta-mais-1', 'Alerta +1', 'Sobe o Alerta em 1 (rastreador do sistema) e publica, só para o Mestre, o efeito do novo nível com o texto da aventura. No nível 4, avisa o reforço.', 'alerta(1)'],
  ['alerta-menos-1', 'Alerta -1', 'Desce o Alerta em 1 e publica o efeito do nível atual.', 'alerta(-1)'],
  ['alerta-consulta', 'Alerta: efeito do nível atual', 'Só publica o efeito do nível atual do Alerta, sem mudar nada.', 'alerta(0)'],
  ['cronometro-da-missao', 'Cronômetro da missão', 'Conta 4 horas em tempo real (a duração da sessão), com aviso a 5 e a 1 minuto. Rodar de novo reinicia a contagem.', 'cronometro()'],
  ['relogio-mais-1', 'Relógio da história: +1 minuto', 'Avança a hora da história em 1 minuto (começa às 02:20) e publica o horário.', 'relogio(1)'],
  ['relogio-mais-5', 'Relógio da história: +5 minutos', 'Avança a hora da história em 5 minutos e publica o horário.', 'relogio(5)'],
  ['relogio-do-posto-proximo-marco', 'Relógio do Posto: próximo marco', 'Sala 2: avança para o próximo marco (03:30 chegada, 03:40 o comboio estaciona, 03:44 escotilha da lanchonete, 03:46 escotilha da estrada, 03:49 checagem no carregador, 03:52 partida).', 'postoProximo()'],
  ['folga-menos-2', 'Folga da Sala 3: -2 minutos', 'Sala 3: gasta 2 minutos da Folga (falha de trecho, ou Alerta 3). A Folga começa em 8.', 'folga(-2)'],
  ['folga-mais-1', 'Folga da Sala 3: +1 minuto', 'Sala 3: devolve 1 minuto (sucesso brilhante). Com a Folga a 0 ou menos, a Surpresa da Sala 4 se perde.', 'folga(1)'],
  ['torre-avancar-o-ciclo', 'Torre .50: avançar o ciclo', 'Sala 4: avança a torre (rajada 1, 2, 3, recarga) e publica o que ela faz agora. Respeita o mostrador (Leve 2 rajadas, Padrão 3, Brutal 4).', 'torre()'],
  ['beta-mais-1-rodada', 'Viatura Beta: +1 rodada', 'Sala 4: conta uma rodada do relógio da Beta. O reforço chega ao fim da rodada 6 (8 com o pneu cortado, 10 com o rádio cortado).', 'beta(1)'],
  ['beta-reforco-em-8-pneu-cortado', 'Viatura Beta: reforço na rodada 8 (pneu cortado)', 'Sala 4: o pneu da Beta foi cortado na Sala 2: o reforço chega ao fim da rodada 8.', 'betaAlvo(8)'],
  ['beta-reforco-em-10-radio-cortado', 'Viatura Beta: reforço na rodada 10 (rádio cortado)', 'Sala 4: o rádio da Beta foi cortado ou jammado: o reforço chega ao fim da rodada 10.', 'betaAlvo(10)'],
  ['cerbero-cabeca-quebrada', 'Cérbero: cabeça quebrada', 'Sala 4: uma cabeça do Cérbero quebrou. Rola o 1d6 que o Mestre aplica ao corpo (sem BL) e conta as cabeças; com as três quebradas, ele fica cego.', 'cabecaQuebrada()'],
  ['mostrador-leve', 'Mostrador: Leve', 'Sala 4: Cabeça Chama pifada, torre com 2 rajadas, o Sargento se rende à primeira falha de Moral, sem droids.', "mostrador('leve')"],
  ['mostrador-padrao', 'Mostrador: Padrão', 'Sala 4: o descrito no texto (NA 8, Cérbero e torre, com o Sargento como gatilho).', "mostrador('padrao')"],
  ['mostrador-brutal', 'Mostrador: Brutal', 'Sala 4: 2 Droids de combate saem com o Cérbero, a torre faz 4 rajadas, a Beta entra no combate.', "mostrador('brutal')"],
  ['tunel-luzes-de-emergencia-liga-desliga', 'Túnel: luzes de emergência (liga e desliga)', 'Mapa 4: apaga ou acende as luzes de emergência vermelhas (a janela de cortesia do Túnel).', "toggleLights('emergencia')"],
  ['tunel-apagao-total-liga-desliga', 'Túnel: apagão total (liga e desliga)', 'Mapa 4: escuridão total (evento 1, queda de luz de emergência) ou volta à escuridão-base do mapa.', 'apagao()'],
  ['cartao-usar-no-painel-solta-o-canil', 'Cartão: usar no painel (abre o canil e solta o Cérbero)', 'Mapa 4: o cartão no painel leste destranca o canil e revela o Cérbero (e os droids, só no Brutal).', 'canil()'],
  ['cela-a-abrir-e-revelar-daigo', 'Cela A: abrir e revelar Daigo', 'Mapa 4: destranca a Cela A (lado leste) e revela Daigo Okabe.', "cela('a')"],
  ['cela-b-abrir-e-revelar-nest', 'Cela B: abrir e revelar Nest', 'Mapa 4: destranca a Cela B (lado oeste) e revela Nest. Nunca revele os dois ao mesmo tempo sem a cena do encontro (Sala 5, "O ronin").', "cela('b')"],
  ['montar-tokens-da-cena', 'Montar tokens da cena', 'Importa os atores dos compêndios para o mundo e troca os marcadores da cena ativa por tokens ligados às fichas, e liga os pins aos diários. Roda sozinho ao importar um mapa; use de novo se algo ficou como marcador.', 'linkSceneTokens()']
];

export const cargaMacros = DEFS.map(([identifier, name, description, call], i) => ({
  identifier,
  name: `Carga: ${name}`,
  type: 'script',
  docType: 'Macro',
  img: ICON('macro'),
  scope: 'global',
  command: `${API}.${call};`,
  description,
  sort: (i + 1) * 100,
  flags: { [CARGA_ID]: { id: identifier, fonte: 'Instruções, seção 11' }, sombraneon: { schemaVersion: 1, source: SOURCE, adventure: { id: ADVENTURE_ID, room: 'macros' } } }
}));
