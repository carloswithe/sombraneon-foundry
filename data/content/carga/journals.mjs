import { slug } from '../../../tools/lib/book.mjs';
import { CARGA_ID, SOURCE, ADVENTURE_ID, ICON, HEADER, chap, section, split, toHtml, textPage, ref, inline, esc } from './lib.mjs';
import { IMAGES, MAPS, HANDOUTS } from './images.mjs';
import { threatActors, npcActors } from './actors.mjs';
import { runners } from './runners.mjs';
import { equipmentItems, lootItems } from './items.mjs';
import { mapScenes } from './maps.mjs';
import { cargaMacros } from './macros.mjs';

/**
 * Diários da aventura (docs/carga-sem-nome-foundry-instrucoes.md, seção 9). Cada capítulo do texto vira
 * páginas de texto (HTML): "Para ler" em blockquote.para-ler, segredos do Mestre em section.secret.
 * Os códigos `id` do texto (atores, itens, imagens, mapas) viram links @Ref para o documento do compêndio.
 */

/* ------------------------------------------------------------------ */
/* Links                                                               */
/* ------------------------------------------------------------------ */

const registry = new Map();
for (const a of threatActors) registry.set(a.identifier, ref(`carga-ameacas/${a.identifier}`, a.name));
for (const a of npcActors) registry.set(a.identifier, ref(`carga-npcs/${a.identifier}`, a.name));
for (const a of runners) registry.set(a.identifier, ref(`carga-runners/${a.identifier}`, a.name));
for (const i of equipmentItems) registry.set(i.identifier, ref(`carga-equipamentos/${i.identifier}`, i.name));
for (const i of lootItems) registry.set(i.identifier, ref(`carga-tesouros/${i.identifier}`, i.name));
for (const a of IMAGES) registry.set(a.id, ref(`carga-imagens/${a.id}`, `${a.id}: ${a.title}`));
for (const s of mapScenes) registry.set(s.identifier, ref(`carga-cenas/${s.identifier}`, s.name));
for (const m of cargaMacros) registry.set(m.identifier, ref(`carga-macros/${m.identifier}`, m.name));

/** Troca <code>id</code> por um link para o documento do compêndio, quando o id é conhecido. */
export const linkify = (html) => html.replace(/<code>([a-z0-9-]+)<\/code>/g, (all, id) => registry.get(id) ?? all);

/** Troca as referências a arquivos que não vêm no módulo (o guia de imagens e as instruções de montagem) pelo que o módulo tem. */
const clean = (text) =>
  text
    .replace(/^\*Texto de cada imagem, prompts e disposição dos mapas:.*\*\s*$/gm, '*Cada imagem tem um diário próprio, com o texto para ler em voz alta, as notas do Mestre e o prompt para gerar de novo.*')
    .replace(/^(> )?\*\*Arquivos:\*\*.*$/m, '$1**Neste módulo:** o texto da aventura, as fichas, as imagens, os mapas de mesa (com paredes, portas, luzes e tokens), as tabelas e os macros já vêm montados. O guia de cada imagem (com os prompts) está no diário da imagem.');
const html = (text) => linkify(toHtml(clean(text)));
const link = (id) => {
  const hit = registry.get(id);
  if (!hit) throw new Error(`Link sem destino: ${id}`);
  return hit;
};
const list = (title, ids) => (ids.length ? `<li><strong>${title}:</strong> ${ids.map(link).join(', ')}</li>` : '');

/* ------------------------------------------------------------------ */
/* Peças                                                               */
/* ------------------------------------------------------------------ */

const box = (label) => `<label class="carga-caixa"><input type="checkbox"> ${label}</label>`;
const boxes = (labels) => `<p class="carga-contador">${labels.map(box).join(' ')}</p>`;

const flagsOf = (id, fonte, extra = {}) => ({
  [CARGA_ID]: { id, fonte, ...extra },
  sombraneon: { schemaVersion: 1, source: SOURCE, adventure: { id: ADVENTURE_ID, room: id } }
});

let entrySort = 0;
function entry({ id, name, folder, pages, observer = false, fonte }) {
  entrySort += 100;
  return {
    identifier: id,
    name,
    type: 'JournalEntry',
    img: ICON('journal'),
    folder,
    sort: entrySort,
    pages,
    ownership: { default: observer ? 2 : 0 },
    flags: flagsOf(id, fonte, observer ? { observer: true } : {})
  };
}

/** Páginas a partir das subseções (###) de um capítulo, com o título virando nome e identificador. */
function pagesFromSections(markdown, { skip = [], replace = {}, ownership } = {}) {
  const seen = new Set();
  const out = [];
  for (const s of split(markdown).sections) {
    if (skip.includes(s.title)) continue;
    const id = slug(s.title);
    if (seen.has(id)) throw new Error(`Título de página repetido: ${s.title}`);
    seen.add(id);
    const body = replace[s.title] ? replace[s.title](s) : html(s.body);
    out.push({ id, name: s.title, content: body, ownership });
  }
  return out;
}

const asPages = (list, start = 1) => list.map((p, i) => textPage(p.id, p.name, (i + start) * 100, p.content, p.ownership ? { ownership: p.ownership } : {}));

/* ------------------------------------------------------------------ */
/* 00 Leia primeiro                                                    */
/* ------------------------------------------------------------------ */

const header = HEADER.split('\n')
  .filter((l) => l.startsWith('>'))
  .map((l) => l.replace(/^>\s?/, ''))
  .join('\n\n');
const overview = split(chap(1).markdown);
const part = (title) => overview.sections.find((s) => s.title.startsWith(title)) ?? (() => { throw new Error(`Seção 1 sem ${title}`); })();
const verdade = split(section(1, 'A verdade').body, 4);

const ch2 = split(chap(2).markdown);
const sec2 = (title) => ch2.sections.find((s) => s.title.startsWith(title)) ?? (() => { throw new Error(`Seção 2 sem ${title}`); })();

const ch12 = chap(12).markdown;
const ch15 = split(chap(15).markdown);

const readFirst = entry({
  id: '00-leia-primeiro',
  name: '00 Leia primeiro (só o Mestre)',
  folder: 'Comece aqui',
  fonte: '1. Visão geral para o Mestre e 2. Antes da mesa',
  pages: asPages([
    { id: 'visao-geral', name: 'Visão geral', content: `${toHtml(clean(header).replace(/^\*\*Segredo:\*\*/m, '**Segredo (só Mestre):**'))}<p>Este módulo traz tudo da aventura pronto para jogar: fichas, diários, mapas com paredes e tokens, tabelas e macros. Comece pelo @Ref[carga-diarios/00-leia-primeiro#a-versao-de-30-segundos]{resumo} e depois pela @Ref[carga-diarios/00-leia-primeiro#a-verdade]{verdade}.</p>` },
    { id: 'a-versao-de-30-segundos', name: 'A versão de 30 segundos', content: html(part('A versão de 30 segundos').body.replace(/^### .*$/gm, '')) },
    { id: 'a-verdade', name: 'A verdade (só para o Mestre)', content: toHtml(section(1, 'A verdade').body, { secret: true }) },
    { id: 'as-tres-pistas', name: 'As três pistas', content: html(section(1, 'As três pistas').body) },
    { id: 'ficha-de-missao', name: 'Ficha de missão', content: html(section(1, 'Ficha de missão').body) },
    { id: 'equipe-e-material', name: 'Equipe e material', content: html(`### Equipe\n\n${sec2('Equipe').body}\n\n### Material\n\n${sec2('Material').body}`) },
    { id: 'mapa-de-tempo', name: 'Mapa de tempo (4 horas)', content: html(sec2('Mapa de tempo').body) },
    { id: 'regras-de-ritmo', name: 'Regras de ritmo', content: html(sec2('Regras de ritmo').body) },
    { id: 'orcamento-de-na', name: 'Orçamento de NA das ameaças', content: html(split(ch12).intro.replace(/^## .*$/m, '')) },
    {
      id: 'fichas-prontas',
      name: 'Fichas prontas e composição da mesa',
      content:
        html(`${ch15.intro.replace(/^## .*$/m, '')}\n\n### Como ler as fichas\n\n${ch15.sections.find((s) => s.title.startsWith('Como ler')).body}\n\n### Quem leva o quê\n\n${ch15.sections.find((s) => s.title.startsWith('Quem leva')).body}`) +
        `<h3>Os seis runners</h3><ul>${runners.map((r) => `<li>${link(r.identifier)}</li>`).join('')}</ul>`
    }
  ])
});

/* ------------------------------------------------------------------ */
/* 01 O Alerta                                                         */
/* ------------------------------------------------------------------ */

const alertEntry = entry({
  id: '01-o-alerta',
  name: '01 O Alerta (0 a 4)',
  folder: 'Comece aqui',
  fonte: '2. Antes da mesa: O Alerta (0 a 4)',
  pages: asPages([
    { id: 'escala-do-alerta', name: 'Escala do Alerta (0 a 4)', content: html(sec2('O Alerta').body) },
    {
      id: 'como-usar',
      name: 'Como usar no Foundry',
      content:
        `<p>O Alerta é o rastreador do próprio sistema SombraNeon (o painel do Alerta). Os macros ${link('alerta-mais-1')} e ${link('alerta-menos-1')} sobem e descem o nível e publicam, só para o Mestre, o efeito exato do nível atual, com o texto desta página. No nível 4, o cartão avisa a chegada das 2 Viaturas da Guarda.</p>` +
        `<ul><li>Sobe em 1 com hack de rua falho, Crash, Feedback, barulho detectável, violência em público e pelas regras de cada sala.</li>` +
        `<li>Alerta 3: corte 2 minutos da Folga da Sala 3 (macro ${link('folga-menos-2')}).</li>` +
        `<li>Alerta 4: <em>2 Viaturas da Guarda</em> em 1d4 + 2 rodadas. No clímax da Sala 4 nada muda (o reforço já é a contagem de rodadas da Beta).</li></ul>` +
        `<p>A tabela ${ref('carga-tabelas/alerta', 'Alerta: efeitos por nível')} serve de consulta (não sorteia nada).</p>`
    }
  ])
});

/* ------------------------------------------------------------------ */
/* 02 Briefing e FAQ                                                   */
/* ------------------------------------------------------------------ */

const ch3 = split(chap(3).markdown);
const sec3 = (start) => ch3.sections.find((s) => s.title.startsWith(start)) ?? (() => { throw new Error(`Seção 3 sem ${start}`); })();
const faq = ch3.sections.filter((s) => /^P\d+\./.test(s.title));
if (faq.length !== 10) throw new Error(`O FAQ deve ter 10 perguntas, achei ${faq.length}`);

const briefing = entry({
  id: '02-briefing-e-faq',
  name: '02 Briefing e FAQ',
  folder: 'Briefing',
  observer: true,
  fonte: '3. Briefing, FAQ e preparação',
  pages: [
    ...asPages(
      [
        { id: 'o-contratante', name: 'O contratante', content: html(sec3('O contratante').body), ownership: { default: 0 } },
        { id: 'faq-as-10-perguntas', name: 'FAQ: as 10 perguntas que a mesa vai fazer', content: html(sec3('FAQ').body), ownership: { default: 0 } }
      ],
      1
    ),
    ...faq.map((q, i) => textPage(`p${i + 1}`, q.title, (i + 3) * 100, html(q.body), { ownership: { default: 2 } })),
    textPage(
      'handouts-do-briefing',
      'Handouts do briefing',
      1400,
      html(sec3('Handouts do briefing').body) + `<p>Liberados aos jogadores: ${HANDOUTS.map((id) => link(id)).join(', ')}.</p>`,
      { ownership: { default: 2 } }
    ),
    textPage('cobertura-disfarces-ou-papeis', 'Papéis na operação e laços', 1500, html(sec3('Cobertura, disfarces ou papéis').body), { ownership: { default: 0 } }),
    textPage('equipamento-e-como-entrar', 'Equipamento e como entrar', 1600, html(sec3('Equipamento e como entrar').body), { ownership: { default: 0 } }),
    textPage('preparacao', 'Preparação (10 min)', 1700, html(sec3('Preparação').body), { ownership: { default: 0 } })
  ]
});

/* ------------------------------------------------------------------ */
/* Salas 1 a 5                                                         */
/* ------------------------------------------------------------------ */

const ROOMS = [
  {
    ch: 4, id: 'sala-1', num: '03', name: 'Sala 1: O Ferro-Velho Tavares', map: 'mapa-01', imgs: ['img-06', 'img-07', 'img-08', 'img-09', 'img-34', 'img-35'],
    elenco: ['capanga-caes', 'atirador-caes', 'tavares'],
    itens: ['item-kit-resgate', 'item-furgao-tavares', 'item-motos-tavares', 'item-tapete-espinhos', 'item-granadas', 'item-carga-demolicao', 'item-macarico-brecha', 'item-manta-faraday', 'item-radio-interceptor', 'item-cracha-manutencao']
  },
  {
    ch: 5, id: 'sala-2', num: '04', name: 'Sala 2: O Posto Meia-Lua', map: 'mapa-02', imgs: ['img-10', 'img-11', 'img-12', 'img-13', 'img-14', 'img-15'],
    elenco: ['policial-urbano', 'seu-jaci', 'motorista-jararaca', 'sargento-teixeira', 'torre-50', 'jararaca', 'cerbero'], itens: ['item-celula-militar']
  },
  {
    ch: 6, id: 'sala-3', num: '05', name: 'Sala 3: A Estrada Sem Luz', map: 'mapa-03', imgs: ['img-16', 'img-17', 'img-18', 'img-19'],
    elenco: ['policial-urbano', 'drone-falcao', 'viatura-guarda'], itens: ['item-cracha-manutencao', 'item-tapete-espinhos']
  },
  {
    ch: 7, id: 'sala-4', num: '06', name: 'Sala 4: O Túnel Pluvial', map: 'mapa-04', imgs: ['img-20', 'img-21', 'img-22', 'img-23', 'img-24', 'img-25'],
    elenco: ['cerbero', 'torre-50', 'sargento-teixeira', 'policial-urbano', 'viatura-guarda', 'motorista-jararaca', 'jararaca', 'droid-combate', 'drone-falcao', 'daigo-okabe', 'nest'], itens: ['item-cartao-comando', 'item-nucleo-cerbero', 'item-carga-demolicao', 'item-macarico-brecha']
  },
  {
    ch: 8, id: 'sala-5', num: '07', name: 'Sala 5: A Cela Aberta', map: 'mapa-05', imgs: ['img-26', 'img-27', 'img-28', 'img-29', 'img-30', 'img-31', 'img-32', 'img-33'],
    elenco: ['nest', 'daigo-okabe', 'viatura-guarda', 'suv-aegis', 'drone-falcao', 'capita-voss', 'dona-ruth', 'tesoureira'], itens: ['item-nest', 'item-rastreador-b', 'item-caderneta', 'item-kit-resgate', 'item-manta-faraday']
  }
];

/** Tabela de imagens da sala + a descrição e o "Para ler" do mapa. */
function imagesPage(room) {
  const map = MAPS.find((m) => m.id === room.map);
  return (s) =>
    html(s.body) +
    `<h3>Mapa da sala</h3><p>${link(room.map)} (${esc(map.grid)}).</p>` +
    `<p><strong>No mapa:</strong> ${inline(map.description)}</p><blockquote class="para-ler">${inline(map.narrative)}</blockquote>`;
}

const tablesOf = {
  'sala-1': 'complicacoes-sala-1',
  'sala-2': 'complicacoes-sala-2',
  'sala-3': 'complicacoes-sala-3',
  'sala-4': 'eventos-do-combate-sala-4',
  'sala-5': 'complicacoes-da-fuga-sala-5'
};

const extraPages = {
  'sala-2': [
    {
      id: 'relogio-do-posto',
      name: 'Relógio do Posto (contador)',
      content:
        `<p>Diga o horário em voz alta. Marque o que já aconteceu. Cada ação grande gasta <strong>2 minutos</strong>. O macro ${link('relogio-do-posto-proximo-marco')} avança o marco e publica o aviso.</p>` +
        boxes(['03:30 o grupo chega', '03:40 o comboio estaciona', '03:44 escotilha da lanchonete (Cela A)', '03:46 escotilha da estrada (Cela B)', '03:49 checagem no carregador', '03:52 o comboio parte'])
    }
  ],
  'sala-3': [
    {
      id: 'folga-contador',
      name: 'Folga em minutos (contador)',
      content:
        `<p>Folga inicial: <strong>8 minutos</strong>, menos os minutos perdidos nas Salas 1 e 2, 2 minutos com Alerta 3, 2 minutos se o plano era o Viaduto. Mínimo 2. Cada falha: -2. Cada sucesso brilhante: +1. Macros: ${link('folga-menos-2')} e ${link('folga-mais-1')}.</p>` +
        boxes(['8', '7', '6', '5', '4', '3', '2', '1', '0 ou menos: sem Surpresa'])
    }
  ],
  'sala-4': [
    {
      id: 'contadores-do-combate',
      name: 'Contadores do combate (torre, Beta, Cérbero)',
      content:
        `<h2>Ciclo da torre .50</h2><p>Marque a rajada que acabou de disparar. Depois da última, a rodada seguinte é de recarga (a janela do grupo). Padrão: 3 rajadas. Leve: 2. Brutal: 4. Macro: ${link('torre-avancar-o-ciclo')}.</p>` +
        boxes(['Rajada 1', 'Rajada 2', 'Rajada 3', 'Recarga']) +
        `<h2>Relógio da Viatura Beta</h2><p>O reforço chega ao fim da rodada <strong>6</strong> (padrão), <strong>8</strong> se o pneu da Beta foi cortado, <strong>10</strong> se o rádio foi cortado. Macros: ${link('beta-mais-1-rodada')}, ${link('beta-reforco-em-8-pneu-cortado')} e ${link('beta-reforco-em-10-radio-cortado')}.</p>` +
        boxes(['1', '2', '3', '4', '5', '6 reforço (padrão)', '7', '8 reforço (pneu)', '9', '10 reforço (rádio)']) +
        `<h2>As três cabeças do Cérbero</h2><p>Cada cabeça: <strong>CA 16, HP 6, BL 1</strong>. Não automatize o HP delas: ao quebrar uma, ela perde o ataque e o Mestre aplica <strong>1d6 ao corpo</strong> (sem BL). Com as três quebradas o Cérbero fica cego (desvantagem em tudo) e só tem o Pisão. Macro: ${link('cerbero-cabeca-quebrada')}.</p>` +
        `<table><thead><tr><th>Cabeça</th><th>HP 6 (marque o dano)</th><th>Quebrada</th></tr></thead><tbody>` +
        ['Choque (taser)', 'Chumbo (minicanhão)', 'Chama'].map((c) => `<tr><td>${c}</td><td>${boxes(['1', '2', '3', '4', '5', '6'])}</td><td>${box('quebrada')}</td></tr>`).join('') +
        `</tbody></table>` +
        `<h2>Mostrador de dificuldade</h2><p>Escolha antes de ler o clímax. Macros: ${link('mostrador-leve')}, ${link('mostrador-padrao')} e ${link('mostrador-brutal')}.</p>` +
        `<ul><li><strong>Leve:</strong> o Cérbero sai com a Cabeça Chama pifada (só dois ataques), a torre dispara só 2 rajadas, o Sargento se rende à primeira falha de Moral, sem droids.</li>` +
        `<li><strong>Padrão:</strong> NA 8 (Cérbero e torre) com o Sargento como gatilho.</li>` +
        `<li><strong>Brutal:</strong> 2 ${link('droid-combate')} saem do canil com o Cérbero, a torre faz 4 rajadas antes de recarregar, a Beta entra no combate (NA +2). Os droids ficam ocultos por padrão (tokens ocultos no mapa).</li></ul>` +
        `<p>Estados da cena (macros): ${link('tunel-luzes-de-emergencia-liga-desliga')}, ${link('tunel-apagao-total-liga-desliga')}, ${link('cartao-usar-no-painel-solta-o-canil')}, ${link('cela-a-abrir-e-revelar-daigo')} e ${link('cela-b-abrir-e-revelar-nest')}.</p>`
    },
    {
      id: 'apagao-do-tunel',
      name: 'Apagão do Túnel (estado da cena)',
      content:
        `<p>O mapa ${link('mapa-04')} já vem no estado da janela de cortesia: luzes e câmeras do Túnel apagadas de <strong>04:05 a 04:19</strong>, só as luzes de emergência vermelhas, fracas. Se o Alerta chegar a 4 antes da Sala 4, a janela se estende em 4 minutos (até 04:23). Não há segunda cena: o estado é ligado e desligado por macro.</p>` +
        `<ul><li>${link('tunel-luzes-de-emergencia-liga-desliga')}: apaga ou acende as luzes de emergência (marca <code>emergencia</code>).</li><li>${link('tunel-apagao-total-liga-desliga')}: escuridão total (evento 1: "queda de luz de emergência", por 1 rodada).</li></ul>`
    }
  ],
  'sala-5': [
    {
      id: 'faixas-da-perseguicao',
      name: 'Faixas da perseguição (contador)',
      content:
        `<p>A perseguição é regra de mesa do Compêndio de Veículos (2.3): <em>sem automação</em>, os dados ficam na mão do Mestre. Cada rodada, perseguidor e fugitivo rolam d20 + DES + Manobra; o vencedor muda a distância em 1 faixa (2 se vencer por 5 ou mais). Marque a faixa de cada perseguidor.</p>` +
        `<table><thead><tr><th>Perseguidor</th><th>Faixa</th></tr></thead><tbody>` +
        ['Viatura da Guarda 1', 'Viatura da Guarda 2', 'SUV da Aegis (não engaja)']
          .map((v) => `<tr><td>${v}</td><td>${['Perto', 'Próximo', 'Longe', 'Fora de vista'].map((f) => `<label class="carga-caixa"><input type="radio" name="faixa-${slug(v)}"> ${f}</label>`).join(' ')}</td></tr>`)
          .join('') +
        `</tbody></table>` +
        `<p><strong>Rastreio:</strong> "Fora de vista" não encerra a perseguição enquanto o emissor estiver ligado ou o Falcão estiver vivo (regra da aventura). As tabelas ${ref('carga-tabelas/resolucoes-da-perseguicao', 'Resoluções da perseguição')} e ${ref('carga-tabelas/destino-de-daigo', 'Destino de Daigo')} ajudam na consulta.</p>`
    }
  ]
};

function roomEntry(room) {
  const sections = split(chap(room.ch).markdown);
  const scene = mapScenes.find((s) => s.identifier === room.map);
  const opening =
    html(sections.intro.replace(/^## .*$/m, '')) +
    `<hr><h3>Nesta sala</h3><ul>` +
    `<li><strong>Mapa (Scene):</strong> ${link(room.map)}</li>` +
    list('Elenco e ameaças', room.elenco) +
    list('Itens e butim', room.itens) +
    list('Imagens (diários)', room.imgs) +
    `<li><strong>Tabela de complicações:</strong> ${ref(`carga-tabelas/${tablesOf[room.id]}`)}</li>` +
    `</ul>`;
  const pages = [
    { id: 'abertura', name: 'Abertura (para ler)', content: opening },
    ...pagesFromSections(chap(room.ch).markdown, { replace: { 'Imagens e mapa desta sala': imagesPage(room) } }),
    ...(extraPages[room.id] ?? [])
  ];
  return entry({
    id: room.id,
    name: `${room.num} ${room.name}`,
    folder: 'Salas',
    fonte: `${room.ch}. ${room.name}`,
    pages: asPages(pages)
  });
}

const roomEntries = ROOMS.map(roomEntry);

/* ------------------------------------------------------------------ */
/* 08 Debrief, 09 Cortes e ajuste de nível, 10 Notas de teste           */
/* ------------------------------------------------------------------ */

const debrief = entry({
  id: '08-debrief',
  name: '08 Debrief',
  folder: 'Depois da sessão',
  fonte: '9. Debrief',
  pages: asPages([{ id: 'abertura', name: 'Debrief (15 min)', content: html(split(chap(9).markdown).intro.replace(/^## .*$/m, '')) }, ...pagesFromSections(chap(9).markdown)])
});

const cuts = entry({
  id: '09-cortes-e-ajuste-de-nivel',
  name: '09 Cortes e ajuste de nível',
  folder: 'Depois da sessão',
  fonte: '11. Cortes e 14. Ajuste de nível',
  pages: asPages([
    { id: 'cortes', name: 'Cortes, se o tempo apertar', content: html(chap(11).markdown) },
    {
      id: 'ajuste-para-nivel-3',
      name: 'Ajuste para nível 3 (Corp)',
      content: `<p><strong>Aviso:</strong> este ajuste está só aqui, como texto. O módulo <em>não</em> traz atores Mk II. Para jogar o nível 3, edite as fichas das ameaças antes da mesa.</p>${html(chap(14).markdown)}`
    }
  ])
});

const testNotes = entry({
  id: '10-notas-de-teste',
  name: '10 Notas de teste (checklist)',
  folder: 'Depois da sessão',
  fonte: '10. Notas de teste',
  pages: asPages([{ id: 'checklist', name: 'Mecânicas e perguntas finais', content: html(chap(10).markdown.replace(/\| \|\n/g, '| [ ] |\n')) }])
});

/* ------------------------------------------------------------------ */

export const journalEntries = [readFirst, alertEntry, briefing, ...roomEntries, debrief, cuts, testNotes];
