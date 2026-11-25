import { ICON, CERCO_ID, SOURCE, ADVENTURE_ID } from './lib.mjs';

/**
 * Macros (instruções, seções 11 e 16): Alerta, relógio da história, cronômetros, relógio da Coruja, luzes da
 * cripta, marca de armadilha e a montagem dos tokens. Cada macro chama a API do módulo; só o Mestre usa.
 */
const API = `game.modules.get('${CERCO_ID}').api`;

const DEFS = [
  ['alerta-mais-1', 'Alerta +1', 'Sobe o Alerta em 1 (rastreador do sistema) e publica, só para o Mestre, o efeito do novo nível.', 'alerta(1)'],
  ['alerta-menos-1', 'Alerta -1', 'Desce o Alerta em 1 e publica o efeito do nível atual.', 'alerta(-1)'],
  ['alerta-consulta', 'Alerta: efeito do nível atual', 'Só publica o efeito do nível atual, sem mudar nada.', 'alerta(0)'],
  ['relogio-mais-5', 'Relógio: +5 minutos', 'Soma 5 minutos à hora da história (começa às 21:00) e avisa os marcos cruzados.', 'relogio(5)'],
  ['relogio-mais-10', 'Relógio: +10 minutos', 'Soma 10 minutos à hora da história.', 'relogio(10)'],
  ['relogio-mais-60', 'Relógio: +1 hora', 'Soma 1 hora (10 minutos de mesa na Preparação).', 'relogio(60)'],
  ['relogio-reiniciar', 'Relógio: voltar para 21:00', 'Reinicia a hora da história.', 'relogioReiniciar()'],
  ['cronometro-da-preparacao', 'Cronômetro da Preparação (30 min)', '30 minutos reais, com aviso a 5 e a 1 minuto. Quando zera, a Onda 1 chega.', "cronometro('preparacao')"],
  ['cronometro-da-missao', 'Cronômetro da missão (4 h)', 'A sessão em minutos reais, com aviso a 5 e a 1 minuto.', "cronometro('missao')"],
  ['coruja-avancar', 'Coruja: avançar o estágio', 'Sala 4: avança o relógio da Coruja (4 estágios) e publica o que acontece.', 'coruja(1)'],
  ['coruja-reiniciar', 'Coruja: reiniciar o relógio', 'Zera o relógio da Coruja.', 'corujaReiniciar()'],
  ['cripta-luzes', 'Cripta: acender ou apagar as luzes', 'Mapa 5: a cripta nasce no escuro; este macro liga e desliga as luzes.', "toggleLights('cripta')"],
  ['armadilha-marcar', 'Armadilha: marcar a casa do token', 'Selecione um token (ou aponte o mouse) e marque a casa. A marca só o Mestre vê. A armadilha dispara com qualquer pessoa.', 'marcarArmadilha()'],
  ['montar-tokens-da-cena', 'Montar tokens da cena', 'Importa os atores para o mundo, troca os marcadores por tokens ligados às fichas e liga os pins. Roda sozinho ao importar um mapa.', 'linkSceneTokens()']
];

export const cercoMacros = DEFS.map(([identifier, name, description, call], i) => ({
  identifier,
  name: `Cerco: ${name}`,
  type: 'script',
  docType: 'Macro',
  img: ICON('macro'),
  scope: 'global',
  command: `${API}.${call};`,
  description,
  sort: (i + 1) * 100,
  flags: { [CERCO_ID]: { id: identifier, fonte: 'Instruções, seções 11 e 16' }, sombraneon: { schemaVersion: 1, source: SOURCE, adventure: { id: ADVENTURE_ID, room: 'macros' } } }
}));
