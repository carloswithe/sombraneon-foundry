/**
 * Geometria dos cinco mapas de mesa da Carga Sem Nome (Anexo A de docs/carga-sem-nome-foundry-instrucoes.md).
 *
 * Todas as coordenadas estão em CASAS de grade (1 casa = 1,5 m = 100 px na cena); a cena tem exatamente
 * largura x altura casas e a arte entra esticada para cobri-la. O Anexo A descreve a planta em casas;
 * como a arte gerada não coincide linha a linha com a planta, as paredes, portas, luzes, regiões, pins e
 * tokens abaixo foram medidos sobre a própria arte (grade de conferência 1 x 1), mantendo do Anexo A tudo
 * o que é regra: ids das portas, estados (aberta, fechada, trancada), CDs, notas, quem fica onde e as
 * posições de partida. As diferenças estão listadas em docs/carga-sem-nome-relatorio.md.
 *
 * Tokens: `cell` é a casa do canto superior esquerdo [coluna, linha]; `size` é [largura, altura] em casas.
 */

export const seg = (x1, y1, x2, y2, o = {}) => ({ c: [x1, y1, x2, y2], ...o });
/** Polilinha (aberta) ou polígono (fechado) como paredes. */
export const line = (pts, o = {}, closed = false) => pts.slice(0, closed ? pts.length : -1).map((p, i) => seg(p[0], p[1], pts[(i + 1) % pts.length][0], pts[(i + 1) % pts.length][1], o));
export const box = (x1, y1, x2, y2, o = {}) =>
  line(
    [
      [x1, y1],
      [x2, y1],
      [x2, y2],
      [x1, y2]
    ],
    o,
    true
  );
/** Porta: estado fechada (ds 0), aberta (ds 1) ou trancada (ds 2). `tipo: janela` não é porta: bloqueia o movimento e deixa passar visão e luz. */
export const door = (id, c, estado, cd, nota, o = {}) => ({ id, c, door: true, estado, cd, nota, ...o });
export const win = (id, c, cd, nota) => ({ id, c, janela: true, cd, nota });
export const low = (x1, y1, x2, y2) => box(x1, y1, x2, y2, { low: true });

export const light = (x, y, raio, cor, intensidade, o = {}) => ({ x, y, raio, cor, intensidade, ...o });
export const rect = (nome, x1, y1, x2, y2, cor) => ({ nome, cor, shape: { type: 'rectangle', x: x1, y: y1, width: x2 - x1, height: y2 - y1 } });

const RED = '#ff1744';
const AMBER = '#ffab00';
const CYAN = '#00e5ff';
const ORANGE = '#ff6d00';
const GREY = '#9e9e9e';
const COVER = (n, x1, y1, x2, y2) => rect(`Cobertura: ${n} (+2 de CA)`, x1, y1, x2, y2, GREY);

/** Ficha de cada token. ator = pack/identifier. */
const A = (nome, ator, cell, o = {}) => ({ nome, ator, cell, ...o });
const R = (id, cell) => ({ nome: id[0].toUpperCase() + id.slice(1), ator: `carga-runners/${id}`, cell, runner: true });

export const MAP_DEFS = [
  /* ---------------------------------------------------------------- */
  {
    id: 'mapa-01',
    n: 1,
    nome: 'Ferro-Velho Tavares',
    sala: 'sala-1',
    folder: 'Sala 1: Ferro-Velho Tavares',
    grade: [30, 20],
    arte: 'mapa-01',
    escuridao: 0.4,
    inicio: [3.5, 18.5],
    paredes: [
      // muro oeste (com o muro baixo por onde se entra pelos fundos) e muro leste
      seg(0.55, 7.4, 0.55, 9.5),
      seg(0.55, 12, 0.55, 14.4),
      seg(29.45, 1.5, 29.45, 14.4),
      // muro de cima, entre os contêineres e o galpão
      seg(13.8, 1.65, 17.75, 1.65),
      // pilha de contêineres no canto noroeste (a do olheiro)
      ...line([[0.9, 2.2], [2.7, 2.2], [2.7, 0.6], [9.5, 0.6], [9.5, 2.2], [13.8, 2.2], [13.8, 5.4], [4.5, 5.4], [4.5, 7.4], [0.9, 7.4]], {}, true),
      // muro da frente, com o portão no meio
      seg(0.55, 14.4, 12.9, 14.4),
      seg(17.1, 14.4, 29.45, 14.4),
      // galpão do Tavares
      seg(17.75, 1.0, 29.05, 1.0),
      seg(17.75, 1.0, 17.75, 9.05),
      seg(29.05, 1.0, 29.05, 9.05),
      seg(17.75, 9.05, 22.0, 9.05),
      seg(24.2, 9.05, 29.05, 9.05),
      ...low(20.0, 2.0, 25.0, 3.9),
      ...low(22.7, 4.5, 27.8, 7.7)
    ],
    portas: [
      door('porta-portao', [12.9, 14.4, 17.1, 14.4], 'trancada', 12, 'Portão de chapa, trinco eletrônico (hack CD 12) ou ficha de ouro de Ruth', { tag: 'portao' }),
      door('porta-galpao', [22.0, 9.05, 24.2, 9.05], 'aberta', 9, 'Porta do galpão de Tavares'),
      win('muro-baixo', [0.55, 9.5, 0.55, 12.0], 12, 'Muro baixo, escalada DES CD 12 (entrada pelos fundos)')
    ],
    luzes: [light(15, 16.9, 6, '#ff9100', 0.5, { nome: 'Lâmpada do portão' }), light(23.4, 5, 7, '#ffd180', 0.6, { nome: 'Galpão do Tavares' })],
    regioes: [
      COVER('Pilha de carcaças A', 6.2, 7.0, 9.6, 11.8),
      COVER('Pilha de carcaças B', 9.7, 7.2, 12.9, 11.8),
      COVER('Pilha de carcaças C', 0.8, 7.8, 4.2, 13.6),
      COVER('Carcaças junto ao galpão', 18.0, 9.3, 24.6, 12.2),
      COVER('Carcaças a leste', 26.0, 9.2, 29.4, 13.4),
      rect('Telhado dos contêineres (o olheiro)', 2.7, 0.6, 9.5, 5.4, RED)
    ],
    tokens: [
      A('Capanga do portão 1', 'carga-ameacas/capanga-caes', [13, 16], { nota: 'Posto fixo, pedágio' }),
      A('Capanga do portão 2', 'carga-ameacas/capanga-caes', [16, 16], { nota: 'Posto fixo, pedágio' }),
      A('Olheiro', 'carga-ameacas/atirador-caes', [6, 3], { nota: 'No telhado do contêiner', elevation: 3 }),
      A('Tavares', 'carga-npcs/tavares', [21, 4], { nota: 'Na bancada' }),
      R('tijolo', [2, 19]),
      R('bit', [3, 19]),
      R('cinza', [4, 19]),
      R('cobra', [5, 19]),
      R('fumaca', [2, 18]),
      R('corvo', [3, 18])
    ],
    pins: [
      { at: [15, 15.2], titulo: 'Portão de chapa', pagina: 'sala-1#o-desafio' },
      { at: [22.5, 2.9], titulo: 'Bancada do Tavares', pagina: 'sala-1#tavares-conhece-o-jararaca' },
      { at: [25.2, 6.1], titulo: 'Furgão e Kit de Emboscada', pagina: 'sala-1#butim' },
      { at: [27, 3.5], titulo: 'Motos urbanas', pagina: 'sala-1#o-desafio' }
    ]
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'mapa-02',
    n: 2,
    nome: 'Posto Meia-Lua',
    sala: 'sala-2',
    folder: 'Sala 2: Posto Meia-Lua',
    grade: [30, 20],
    arte: 'mapa-02',
    escuridao: 0.35,
    inicio: [4, 17.5],
    paredes: [
      // lanchonete (vista pela janela da fachada)
      seg(2.0, 0.6, 13.6, 0.6),
      seg(2.0, 0.6, 2.0, 4.95),
      seg(13.6, 0.6, 13.6, 4.95),
      ...low(3.5, 1.8, 7.0, 2.35),
      // oficina (célula de potência militar)
      seg(25.1, 0.5, 29.4, 0.5),
      seg(25.1, 0.5, 25.1, 3.3),
      seg(29.4, 0.5, 29.4, 3.3),
      seg(25.1, 3.3, 26.4, 3.3),
      seg(27.9, 3.3, 29.4, 3.3),
      // o Jararaca na baia 3 (cabine ao norte, canil ao sul, escotilhas nos flancos)
      seg(18.95, 8.1, 21.05, 8.1),
      seg(18.95, 8.1, 18.95, 9.5),
      seg(18.95, 10.9, 18.95, 12.9),
      seg(21.05, 8.1, 21.05, 9.5),
      seg(21.05, 10.9, 21.05, 12.9),
      seg(18.95, 12.9, 19.3, 12.9),
      seg(20.7, 12.9, 21.05, 12.9),
      // pilones de recarga das cinco baias e os caminhões do pátio
      ...low(9.4, 7.9, 10.5, 13.3),
      ...low(13.3, 7.9, 14.5, 13.3),
      ...low(17.2, 7.9, 18.5, 13.3),
      ...low(21.7, 7.9, 22.9, 13.3),
      ...low(25.7, 7.9, 26.9, 13.3),
      ...low(0.1, 8.0, 3.9, 9.8),
      ...low(0.1, 13.9, 3.9, 15.7)
    ],
    portas: [
      door('porta-lanchonete', [6.9, 4.95, 8.1, 4.95], 'aberta', 9, 'Entrada da lanchonete'),
      win('janela-lanchonete-oeste', [2.0, 4.95, 6.9, 4.95], 9, 'Fachada da lanchonete: vista da escotilha da Cela A (zona B)'),
      win('janela-lanchonete-leste', [8.1, 4.95, 13.6, 4.95], 9, 'Fachada da lanchonete: vista do pátio'),
      door('porta-oficina', [26.4, 3.3, 27.9, 3.3], 'trancada', 12, 'Oficina com a célula de reserva (DES CD 12 ou hack)'),
      door('escotilha-cela-a', [18.95, 9.5, 18.95, 10.9], 'fechada', 18, 'Escotilha da Cela A, lado da lanchonete (abre às 03:44 pelo Sargento)', { tag: 'cela-a' }),
      door('escotilha-cela-b', [21.05, 9.5, 21.05, 10.9], 'fechada', 18, 'Escotilha da Cela B, lado da estrada (abre às 03:46 pelo Sargento)', { tag: 'cela-b' }),
      door('porta-canil', [19.3, 12.9, 20.7, 12.9], 'trancada', 18, 'Porta traseira do canil (Cérbero em espera)', { tag: 'canil' })
    ],
    luzes: [light(18, 7.4, 9, AMBER, 0.7, { nome: 'Toldo das baias' }), light(7.5, 5.4, 6, '#ff80ab', 0.5, { nome: 'Letreiro da lanchonete' })],
    regioes: [
      COVER('Pátio de caminhões', 0, 7.8, 4, 17.4),
      COVER('Balcão da lanchonete', 3.5, 1.8, 7, 2.4),
      COVER('Pilone de recarga A', 13.3, 7.9, 14.5, 13.3),
      COVER('Pilone de recarga B', 21.7, 7.9, 22.9, 13.3),
      rect('Fosso de manutenção sob o casco (entrada pela traseira)', 19.3, 12.9, 20.7, 16.0, ORANGE),
      rect('Saída leste (Viatura Beta)', 22, 14, 29, 17, GREY)
    ],
    tokens: [
      A('Policial da Alfa 1', 'carga-ameacas/policial-urbano', [11, 15], { nota: 'Distraído, ao lado da Alfa' }),
      A('Policial da Alfa 2', 'carga-ameacas/policial-urbano', [6, 3], { nota: 'No balcão da lanchonete' }),
      A('Seu Jaci', 'carga-npcs/seu-jaci', [5, 1], { nota: 'Atrás do balcão' }),
      A('Jararaca', 'carga-ameacas/jararaca', [19, 8], { size: [2, 5], nota: 'Blindado de custódia na baia 3, cabine ao norte' }),
      A('Cabo Rufino na torre', 'carga-ameacas/torre-50', [19, 9], { size: [2, 2], nota: 'Domo do teto, escotilha aberta', elevation: 3 }),
      A('Sargento Teixeira', 'carga-ameacas/sargento-teixeira', [21, 8], { nota: 'Junto da cabine, vigia a troca, leva o cartão' }),
      A('Eurico', 'carga-npcs/motorista-jararaca', [22, 8], { nota: 'Tem a chave mecânica' }),
      A('Cérbero (em espera)', 'carga-ameacas/cerbero', [19, 11], { size: [2, 2], oculto: true, nota: 'Frio e fechado no canil' }),
      A('Policial da Beta 1', 'carga-ameacas/policial-urbano', [23, 14], { nota: 'Patrulha na saída' }),
      A('Policial da Beta 2', 'carga-ameacas/policial-urbano', [25, 14], { nota: 'Patrulha na saída' }),
      R('tijolo', [3, 17]),
      R('bit', [4, 17]),
      R('cinza', [5, 17]),
      R('cobra', [3, 18]),
      R('fumaca', [4, 18]),
      R('corvo', [5, 18])
    ],
    pins: [
      { at: [18.55, 10.2], titulo: 'Escotilha da Cela A (lado da lanchonete)', pagina: 'sala-2#o-puzzle-qual-cela-e-a-certa' },
      { at: [21.45, 10.2], titulo: 'Escotilha da Cela B (lado da estrada)', pagina: 'sala-2#o-puzzle-qual-cela-e-a-certa' },
      { at: [20, 13.4], titulo: 'Porta traseira do canil', pagina: 'sala-2#o-canil-e-a-torre-o-que-da-para-saber-aqui' },
      { at: [20, 15.5], titulo: 'Entrada do fosso de manutenção', pagina: 'sala-2#sabotagens-opcionais-vantagens-para-a-sala-4' },
      { at: [17.8, 8.7], titulo: 'Porta de dados do carregador', pagina: 'sala-2#o-puzzle-qual-cela-e-a-certa' },
      { at: [27.2, 2.2], titulo: 'Célula de potência militar', pagina: 'sala-2#butim' },
      { at: [5.2, 2.5], titulo: 'Balcão do Seu Jaci', pagina: 'sala-2#o-desafio' }
    ]
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'mapa-03',
    n: 3,
    nome: 'Estrada Sem Luz',
    sala: 'sala-3',
    folder: 'Sala 3: Estrada Sem Luz',
    grade: [36, 24],
    arte: 'mapa-03',
    escuridao: 0.6,
    inicio: [2, 12.5],
    paredes: [
      // canteiro à esquerda
      seg(0, 4.85, 4.5, 4.85),
      // rampa do Aqueduto (parede de fora, curva) e estrada de serviço
      ...line([[4.5, 8.7], [4.5, 3.4], [5.0, 2.3], [6.0, 1.6], [7.2, 1.4], [36, 1.4]]),
      // parede de dentro da rampa e calçada dos postes
      ...line([[7.0, 8.7], [7.0, 5.2], [7.4, 4.6], [8.4, 4.4], [36, 4.4]]),
      // porta de manutenção e boca do Túnel
      seg(31.7, 4.4, 31.7, 5.4),
      seg(31.7, 7.2, 31.7, 8.3),
      seg(31.7, 8.3, 34.5, 8.3),
      seg(31.7, 15.7, 34.5, 15.7),
      seg(30.4, 15.6, 31.7, 15.6),
      // galpões
      ...box(0.2, 16.3, 13.2, 23.9),
      seg(16.9, 16.3, 22.8, 16.3),
      seg(25.0, 16.3, 30.4, 16.3),
      seg(16.9, 16.3, 16.9, 23.9),
      seg(30.4, 16.3, 30.4, 23.9),
      seg(16.9, 23.9, 30.4, 23.9)
    ],
    portas: [
      door('rampa-aqueduto', [4.5, 8.6, 7.0, 8.6], 'aberta', 9, 'Rampa para a estrada de serviço do Aqueduto (rota furtiva)'),
      door('porta-manutencao', [31.7, 5.4, 31.7, 7.2], 'trancada', 12, 'Porta de manutenção do Túnel (hack CD 12 ou DES CD 12)'),
      door('beco-galpoes', [13.2, 16.1, 16.9, 16.1], 'aberta', 9, 'Beco entre galpões'),
      door('porta-galpao-b', [22.8, 16.3, 25.0, 16.3], 'fechada', 12, 'Galpão B, esconderijo para veículos'),
      door('boca-tunel', [34.5, 8.3, 34.5, 15.7], 'aberta', 9, 'Boca norte do Túnel Pluvial: a Sala 4 acontece lá dentro (mapa-04)')
    ],
    luzes: [
      light(8.7, 6.2, 5, AMBER, 0.4, { nome: 'Poste do canteiro', tag: 'postes' }),
      light(18.7, 11.9, 6, RED, 0.6, { nome: 'Barra de luz da viatura' }),
      light(23.1, 6.2, 5, AMBER, 0.4, { nome: 'Poste da avenida', tag: 'postes' }),
      light(32, 12, 4, CYAN, 0.3, { nome: 'Boca do Túnel' })
    ],
    regioes: [
      COVER('Cones e viatura da Barreira', 15.8, 10.5, 20.8, 13.7),
      COVER('Carcaças da avenida (sem arte: o Mestre põe onde a cena pedir)', 21.5, 10.0, 24.5, 12.4),
      COVER('Vans da Aegis na boca do Túnel (sem arte)', 27.0, 10.2, 30.4, 14.2),
      rect('Rampa do Aqueduto (rota furtiva)', 4.5, 1.4, 7.0, 8.7, CYAN)
    ],
    tokens: [
      A('Policial da Barreira 1', 'carga-ameacas/policial-urbano', [15, 10], { nota: 'Posto fixo, o mais velho' }),
      A('Policial da Barreira 2', 'carga-ameacas/policial-urbano', [21, 13], { nota: 'Posto fixo, o mais novo' }),
      A('Falcão', 'carga-ameacas/drone-falcao', [22, 3], { nota: 'Patrulha alta', elevation: 20 }),
      R('tijolo', [1, 11]),
      R('bit', [1, 12]),
      R('cinza', [1, 13]),
      R('cobra', [2, 11]),
      R('fumaca', [2, 12]),
      R('corvo', [2, 13])
    ],
    pins: [
      { at: [18.2, 12], titulo: 'Barreira da Guarda', pagina: 'sala-3#possiveis-resolucoes-trecho-2-a-barreira' },
      { at: [5.8, 8.2], titulo: 'Rampa do Aqueduto', pagina: 'sala-3#possiveis-resolucoes-trecho-2-a-barreira' },
      { at: [31.5, 12], titulo: 'Boca norte do Túnel', pagina: 'sala-3#a-armadilha-trecho-4' },
      { at: [31.7, 6.3], titulo: 'Porta de manutenção', pagina: 'sala-3#o-desafio' }
    ]
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'mapa-04',
    n: 4,
    nome: 'Entroncamento do Túnel Pluvial',
    sala: 'sala-4',
    folder: 'Sala 4: Túnel Pluvial',
    grade: [36, 24],
    arte: 'mapa-04',
    escuridao: 0.7,
    inicio: [20, 12.5],
    paredes: [
      // limites do mapa, com a boca norte e a saída sul abertas
      seg(0, 0, 13.2, 0),
      seg(22.8, 0, 36, 0),
      seg(36, 0, 36, 24),
      seg(0, 24, 13.2, 24),
      seg(22.8, 24, 36, 24),
      seg(0, 0, 0, 24),
      // porões dos quatro cantos (luz vermelha)
      seg(8.2, 0, 8.2, 4.3),
      seg(0, 4.3, 8.2, 4.3),
      seg(27.5, 0, 27.5, 4.4),
      seg(27.5, 4.4, 36, 4.4),
      seg(8.1, 20.1, 8.1, 24),
      seg(0, 20.1, 8.1, 20.1),
      seg(27.3, 20, 27.3, 24),
      seg(27.3, 20, 36, 20),
      // sala de dutos oeste
      seg(0, 6.8, 8.0, 6.8),
      seg(8.0, 6.8, 8.0, 11.2),
      seg(8.0, 13.0, 8.0, 16.8),
      seg(0, 16.8, 8.0, 16.8),
      // casa de bombas leste
      seg(28.4, 7.8, 36, 7.8),
      seg(28.4, 7.8, 28.4, 11.2),
      seg(28.4, 13.0, 28.4, 16.8),
      seg(28.4, 16.8, 36, 16.8),
      // o casco do Jararaca (cabine ao sul, canil ao norte), com as portas das celas, do canil e de serviço
      seg(16.0, 1.6, 17.0, 1.6),
      seg(19.2, 1.6, 20.1, 1.6),
      seg(16.0, 1.6, 16.0, 7.6),
      seg(16.0, 9.2, 16.0, 11.7),
      seg(20.1, 1.6, 20.1, 7.6),
      seg(20.1, 10.4, 20.1, 11.7),
      seg(16.0, 11.7, 20.1, 11.7),
      // pilares
      ...box(12.0, 4.8, 13.4, 8.3),
      ...box(22.6, 4.8, 24.0, 8.3),
      ...box(12.0, 15.9, 13.4, 19.0),
      ...box(22.8, 15.9, 24.0, 19.0),
      ...box(12.0, 0.2, 13.4, 3.8),
      ...box(22.6, 0.2, 24.0, 3.8),
      ...box(12.0, 21.6, 13.4, 23.8),
      ...box(22.8, 21.6, 24.0, 23.8),
      // bloqueio (carcaças e o Furgão)
      ...low(12.2, 18.2, 23.6, 21.2)
    ],
    portas: [
      door('boca-norte', [13.2, 0, 22.8, 0], 'aberta', 9, 'Boca norte do Túnel, por onde entra o comboio'),
      door('saida-sul', [13.2, 24, 22.8, 24], 'aberta', 9, 'Saída sul para a Via Expressa 12'),
      door('porta-dutos', [8.0, 11.2, 8.0, 13.0], 'fechada', 9, 'Sala de dutos oeste (curto-circuito na complicação 3)'),
      door('porta-bombas', [28.4, 11.2, 28.4, 13.0], 'trancada', 12, 'Casa de bombas leste'),
      door('porta-canil', [17.0, 1.6, 19.2, 1.6], 'trancada', 18, 'Canil do Cérbero (cartão no painel leste, emergência após 3 rodadas, ou tranca manual FOR CD 12)', { tag: 'canil' }),
      door('porta-cela-a', [20.1, 7.6, 20.1, 9.2], 'trancada', 18, 'Cela A (Daigo), lado leste. Cartão, chave do Eurico, cabo CD 15 ou brecha (HP 20, BL 3)', { tag: 'cela-a' }),
      door('porta-cela-b', [16.0, 7.6, 16.0, 9.2], 'trancada', 18, 'Cela B (Nest), lado oeste. Cartão, chave do Eurico, cabo CD 15 ou brecha (HP 20, BL 3)', { tag: 'cela-b' }),
      door('porta-servico', [20.1, 9.2, 20.1, 10.4], 'trancada', 15, 'Painel leste e porta de serviço (CA 14, HP 10, BL 1). Hack CD 15 adjacente, sem hack remoto', { tag: 'painel' })
    ],
    luzes: [
      light(18, 3.2, 5, RED, 0.25, { nome: 'Emergência do canil', tag: 'emergencia' }),
      light(18, 15.4, 5, RED, 0.25, { nome: 'Emergência da Alfa', tag: 'emergencia' }),
      light(10, 12.3, 4, RED, 0.2, { nome: 'Emergência da passarela oeste', tag: 'emergencia' }),
      light(26, 12.3, 4, RED, 0.2, { nome: 'Emergência da passarela leste', tag: 'emergencia' }),
      light(18, 7, 8, AMBER, 0.35, { nome: 'Holofote da torre' })
    ],
    regioes: [
      rect('Zona morta oeste (casco): a torre não alcança', 15.0, 1.6, 16.0, 11.7, AMBER),
      rect('Zona morta leste (casco): a torre não alcança', 20.1, 1.6, 21.1, 11.7, AMBER),
      rect('Zona morta atrás (canil): a torre não alcança', 15.0, 0.6, 21.1, 1.6, AMBER),
      COVER('Pilar NO', 12.0, 4.8, 13.4, 8.3),
      COVER('Pilar NE', 22.6, 4.8, 24.0, 8.3),
      COVER('Pilar SO', 12.0, 15.9, 13.4, 19.0),
      COVER('Pilar SE', 22.8, 15.9, 24.0, 19.0),
      rect('Passarela elevada (vantagem de altura, na linha de tiro da torre): +2 de CA', 7.2, 11.1, 29.0, 13.6, CYAN),
      COVER('Carcaças do bloqueio', 12.2, 18.2, 23.6, 21.2),
      rect('Valeta oeste (evento 2: terreno difícil por 1d4 rodadas)', 8.3, 0, 11.9, 24, CYAN),
      rect('Valeta leste (evento 2: terreno difícil por 1d4 rodadas)', 24.0, 0, 27.5, 24, CYAN),
      rect('Sala de dutos oeste (evento 3: curto-circuito, DES CD 12 ou 2d6)', 0, 6.8, 8.0, 16.8, RED)
    ],
    tokens: [
      A('Policial da Alfa 1', 'carga-ameacas/policial-urbano', [15, 14], { nota: 'Atordoado, atrás da Alfa' }),
      A('Policial da Alfa 2', 'carga-ameacas/policial-urbano', [20, 14], { nota: 'Atordoado, atrás da Alfa' }),
      A('Viatura Alfa', 'carga-ameacas/viatura-guarda', [17, 12], { size: [2, 3], nota: 'Avaria 1 (pneu), nariz no bloqueio' }),
      A('Jararaca', 'carga-ameacas/jararaca', [16, 2], { size: [4, 10], nota: 'Blindado de custódia, de frente para o sul' }),
      A('Torre .50 (Cabo Rufino)', 'carga-ameacas/torre-50', [17, 6], { size: [2, 2], nota: 'Ciclo: 3 rajadas e 1 recarga. Zona morta junto ao casco', elevation: 3 }),
      A('Sargento Teixeira', 'carga-ameacas/sargento-teixeira', [17, 10], { nota: 'Na cabine; sai na rodada 1 e vai ao painel leste (casa 20, 9)' }),
      A('Eurico', 'carga-npcs/motorista-jararaca', [18, 10], { nota: 'Tem a chave mecânica' }),
      A('Cérbero', 'carga-ameacas/cerbero', [17, 2], { size: [2, 2], oculto: true, nota: 'Dorme no canil. Sai quando o Sargento usa o cartão ou após 3 rodadas' }),
      A('Droid de combate 1', 'carga-ameacas/droid-combate', [17, 4], { oculto: true, nota: 'Só no ajuste Brutal. Sai com o Cérbero', tag: 'droid' }),
      A('Droid de combate 2', 'carga-ameacas/droid-combate', [18, 4], { oculto: true, nota: 'Só no ajuste Brutal. Sai com o Cérbero', tag: 'droid' }),
      A('Daigo Okabe (Cela A)', 'carga-npcs/daigo-okabe', [19, 8], { oculto: true, nota: 'Preso na Cela A, lado leste. Algemado, acordado' }),
      A('Nest (Cela B)', 'carga-npcs/nest', [16, 8], { oculto: true, nota: 'Torso sedado na Cela B, lado oeste, na cadeira de contenção' }),
      A('Policial da Beta 1', 'carga-ameacas/policial-urbano', [15, 0], { nota: 'Chama o reforço na rodada 1' }),
      A('Policial da Beta 2', 'carga-ameacas/policial-urbano', [20, 0], { nota: 'Chama o reforço na rodada 1' }),
      A('Viatura Beta', 'carga-ameacas/viatura-guarda', [17, 0], { size: [2, 2], nota: 'Engata a ré' }),
      A('Falcão', 'carga-ameacas/drone-falcao', [22, 1], { nota: 'Paira, não ataca', elevation: 20 }),
      R('cobra', [12, 12]),
      R('cinza', [14, 12]),
      R('bit', [26, 12]),
      R('fumaca', [27, 13]),
      R('tijolo', [22, 22]),
      R('corvo', [14, 22])
    ],
    pins: [
      { at: [20.8, 9.9], titulo: 'Painel leste (cartão libera o canil) e porta de serviço (cabo, CD 15)', pagina: 'sala-4#o-jararaca-em-numeros' },
      { at: [20.8, 8.4], titulo: 'Porta da Cela A (Daigo)', pagina: 'sala-4#possiveis-resolucoes-como-abrir-a-cela' },
      { at: [15.3, 8.4], titulo: 'Porta da Cela B (Nest)', pagina: 'sala-4#possiveis-resolucoes-como-abrir-a-cela' },
      { at: [18, 1.2], titulo: 'Porta traseira do canil', pagina: 'sala-4#a-linha-do-tempo-do-climax' },
      { at: [18, 19.7], titulo: 'Bloqueio (Furgão e carcaças)', pagina: 'sala-4#o-desafio' },
      { at: [18, 12.3], titulo: 'Passarela elevada (sobre a cabine)', pagina: 'sala-4#como-vencer-o-contrajogo' }
    ]
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'mapa-05',
    n: 5,
    nome: 'Saída Sul e Via Expressa 12',
    sala: 'sala-5',
    folder: 'Sala 5: Cela Aberta e fuga',
    grade: [36, 24],
    arte: 'mapa-05',
    escuridao: 0.45,
    inicio: [18, 5.5],
    paredes: [
      // sala do canal (rampa alagada) e boca do túnel
      seg(7.5, 0.5, 15.3, 0.5),
      seg(20.6, 0.5, 21.3, 0.5),
      seg(7.5, 0.5, 7.5, 6.3),
      seg(7.5, 6.3, 14.9, 6.3),
      seg(14.9, 0.5, 14.9, 3.4),
      seg(14.9, 5.6, 14.9, 6.3),
      // a via
      seg(14.9, 6.3, 14.9, 15.3),
      seg(21.3, 0.5, 21.3, 15.3),
      // pátio das Docas
      seg(5.9, 15.3, 14.9, 15.3),
      seg(21.3, 15.3, 30.1, 15.3),
      seg(5.9, 15.3, 5.9, 22.5),
      seg(30.1, 15.3, 30.1, 22.5),
      seg(5.9, 22.5, 14.9, 22.5),
      seg(21.3, 22.5, 30.1, 22.5),
      seg(14.9, 22.5, 14.9, 24),
      seg(21.3, 22.5, 21.3, 24),
      // guaritas do pedágio
      ...box(14.2, 10.0, 15.4, 12.5),
      ...box(17.4, 10.0, 18.6, 13.1),
      ...box(20.6, 10.0, 21.8, 12.5),
      // contêineres oeste
      ...box(6.8, 15.5, 12.3, 17.3),
      ...box(6.8, 18.0, 12.3, 20.5),
      ...box(6.8, 20.8, 8.5, 22.2),
      // galpão das Docas
      seg(22.4, 14.9, 28.5, 14.9),
      seg(22.4, 14.9, 22.4, 19.7),
      seg(28.5, 14.9, 28.5, 19.7),
      seg(22.4, 19.7, 23.7, 19.7),
      seg(25.4, 19.7, 28.5, 19.7),
      // guindastes
      ...low(13.4, 19.1, 14.6, 22.2),
      ...low(23.0, 19.5, 24.8, 22.3)
    ],
    portas: [
      door('saida-tunel', [15.3, 0.5, 20.6, 0.5], 'aberta', 9, 'Saída sul do Túnel (rampa alagada)'),
      door('cancela-pedagio', [15.4, 11.2, 17.4, 11.2], 'fechada', 12, 'Cancelas do pedágio (hack CD 12 ou pilotagem CD 12): braço do lado oeste'),
      door('cancela-pedagio-2', [18.6, 12.2, 20.6, 12.2], 'fechada', 12, 'Cancelas do pedágio (hack CD 12 ou pilotagem CD 12): braço do lado leste'),
      door('galpao-docas', [23.7, 19.7, 25.4, 19.7], 'aberta', 9, 'Galpão das Docas, esconderijo possível')
    ],
    luzes: [light(18, 3, 6, ORANGE, 0.5, { nome: 'Saída do Túnel' }), light(18, 11.2, 6, RED, 0.4, { nome: 'Praça de pedágio' }), light(18, 20, 6, ORANGE, 0.4, { nome: 'Docas' })],
    regioes: [
      COVER('Guaritas do pedágio', 14.2, 10.0, 21.8, 13.1),
      COVER('Contêineres oeste', 6.8, 15.5, 12.3, 22.2),
      COVER('Galpão das Docas (esconderijo)', 22.4, 14.9, 28.5, 19.7),
      rect('Lance 1: a rampa alagada (pilotagem CD 12)', 14.9, 0.5, 21.3, 6.3, CYAN),
      rect('Lance 2: a praça de pedágio (pilotagem ou hack CD 12)', 14.9, 9.5, 21.3, 13.5, RED),
      rect('Lance 3: as Docas (pilotagem CD 12 ou a pé)', 5.9, 15.3, 30.1, 22.5, ORANGE)
    ],
    tokens: [
      A('Viatura da Guarda 1', 'carga-ameacas/viatura-guarda', [15, 1], { size: [2, 3], nota: 'Persegue' }),
      A('Viatura da Guarda 2', 'carga-ameacas/viatura-guarda', [19, 1], { size: [2, 3], nota: 'Persegue' }),
      A('SUV da Aegis', 'carga-ameacas/suv-aegis', [12, 2], { size: [2, 3], nota: 'Segue a Longe, sem atacar' }),
      A('Falcão', 'carga-ameacas/drone-falcao', [22, 5], { nota: 'Paira alto', elevation: 20 }),
      R('tijolo', [15, 5]),
      R('bit', [16, 5]),
      R('cinza', [17, 5]),
      R('cobra', [18, 5]),
      R('fumaca', [19, 5]),
      R('corvo', [20, 5])
    ],
    pins: [
      { at: [18, 3.4], titulo: 'Lance 1: a rampa alagada', pagina: 'sala-5#4-a-fuga-em-tres-lances-a-perseguicao' },
      { at: [18, 11.6], titulo: 'Lance 2: a praça de pedágio', pagina: 'sala-5#4-a-fuga-em-tres-lances-a-perseguicao' },
      { at: [18, 21], titulo: 'Lance 3: as Docas', pagina: 'sala-5#4-a-fuga-em-tres-lances-a-perseguicao' },
      { at: [28.6, 21.2], titulo: 'Ponto de encontro (Maré / Aurora)', pagina: 'sala-5#5-o-destino-o-desfecho-que-a-cidade-ve' }
    ]
  }
];
