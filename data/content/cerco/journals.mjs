import { slug } from '../../../tools/lib/book.mjs';
import { ICON, HEADER, chap, section, split, toHtml, textPage, ref, inline, flagsOf, noComments, marked } from './lib.mjs';
import { IMAGES, MAPS, HANDOUTS, artOf } from './images.mjs';
import { threatActors, npcActors } from './actors.mjs';
import { runners } from './runners.mjs';
import { equipmentItems, lootItems } from './items.mjs';
import { mapScenes } from './maps.mjs';
import { cercoMacros } from './macros.mjs';

/**
 * Diários da aventura (instruções, seção 9). Cada capítulo vira páginas de texto (HTML): "Para ler" em
 * blockquote.para-ler, segredos do Mestre em section.secret. Os códigos `id` do texto (atores, itens,
 * imagens, mapas) viram links @Ref para o documento do compêndio.
 */

/* ------------------------------------------------------------------ */
/* Links                                                               */
/* ------------------------------------------------------------------ */

const registry = new Map();
for (const a of threatActors) registry.set(a.identifier, ref(`cerco-ameacas/${a.identifier}`, a.name));
for (const a of npcActors) registry.set(a.identifier, ref(`cerco-npcs/${a.identifier}`, a.name));
for (const a of runners) registry.set(a.identifier, ref(`cerco-runners/${a.identifier}`, a.name));
for (const i of equipmentItems) registry.set(i.identifier, ref(`cerco-equipamentos/${i.identifier}`, i.name));
for (const i of lootItems) registry.set(i.identifier, ref(`cerco-tesouros/${i.identifier}`, i.name));
for (const a of IMAGES) registry.set(a.id, ref(`cerco-imagens/${a.id}`, `${a.id}: ${a.title}`));
for (const s of mapScenes) registry.set(s.identifier, ref(`cerco-cenas/${s.identifier}`, s.name));
for (const m of cercoMacros) registry.set(m.identifier, ref(`cerco-macros/${m.identifier}`, m.name));

/** Troca <code>id</code> por um link para o documento do compêndio, quando o id é conhecido. */
export const linkify = (html) => html.replace(/<code>([a-z0-9-]+)<\/code>/g, (all, id) => registry.get(id) ?? all);
const html = (text, opts) => linkify(toHtml(noComments(text), opts));
const link = (id) => {
  const hit = registry.get(id);
  if (!hit) throw new Error(`Link sem destino: ${id}`);
  return hit;
};
const links = (ids) => ids.map(link).join(', ');
const list = (title, ids) => (ids.length ? `<li><strong>${title}:</strong> ${links(ids)}</li>` : '');

/* ------------------------------------------------------------------ */
/* Peças                                                               */
/* ------------------------------------------------------------------ */

const box = (label) => `<label class="cerco-caixa"><input type="checkbox"> ${label}</label>`;
const boxes = (labels) => `<p class="cerco-contador">${labels.map(box).join(' ')}</p>`;

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

const asPages = (list) => list.map((p, i) => textPage(p.id, p.name, (i + 1) * 100, p.content, p.ownership ? { ownership: p.ownership } : {}));

/** Páginas a partir das subseções (###) de um capítulo, com o título virando nome e identificador. */
function pagesFromSections(markdown, { replace = [] } = {}) {
  const seen = new Set();
  return split(markdown).sections.map((s) => {
    const id = slug(s.title);
    if (seen.has(id)) throw new Error(`Título de página repetido: ${s.title}`);
    seen.add(id);
    const swap = replace.find(([start]) => s.title.startsWith(start));
    return { id, name: s.title, content: swap ? swap[1](s) : html(s.body) };
  });
}

const sectionOf = (n, start) => section(n, start).body;
const intro = (n) => split(chap(n).markdown).intro.replace(/^## .*$/m, '');

/* ------------------------------------------------------------------ */
/* 00 Leia primeiro                                                    */
/* ------------------------------------------------------------------ */

const header = HEADER.split('\n')
  .filter((l) => l.startsWith('>'))
  .map((l) => l.replace(/^>\s?/, ''))
  .join('\n\n')
  .replace(/^\*\*Segredo:\*\*/m, '**Segredo (só Mestre):**');

const runnerBlocks = marked('ATOR');
/** "Como brilha" e "Plano de equipamento" de cada ficha: consulta do Mestre. */
const shine = (r) => {
  const body = runnerBlocks.get(r.identifier).body;
  const from = body.indexOf('**Como brilha:**');
  if (from === -1) throw new Error(`${r.identifier}: ficha sem "Como brilha"`);
  return `<h3>${link(r.identifier)}</h3>${html(body.slice(from))}`;
};

const readFirst = entry({
  id: '00-leia-primeiro',
  name: '00 Leia primeiro (só o Mestre)',
  folder: 'Comece aqui',
  fonte: '1. Visão geral e 2. Antes da mesa',
  pages: asPages([
    { id: 'visao-geral', name: 'Visão geral', content: `${toHtml(header)}<p>Este módulo traz a aventura pronta: fichas, diários, mapas com paredes e tokens, tabelas e macros. Comece pela <em>versão de 30 segundos</em> e depois pela <em>verdade</em>.</p>` },
    { id: 'a-versao-de-30-segundos', name: 'A versão de 30 segundos', content: html(sectionOf(1, 'A versão de 30 segundos')) },
    { id: 'a-verdade', name: 'A verdade (só para o Mestre)', content: html(sectionOf(1, 'A verdade'), { secret: true }) },
    { id: 'as-tres-pistas', name: 'As três pistas', content: html(sectionOf(1, 'As três pistas'), { secret: true }) },
    {
      id: 'codigos-e-segredos',
      name: 'Códigos e segredos (só Mestre)',
      content:
        `<section class="secret"><p><strong>Só Mestre.</strong> Nunca coloque em handout.</p><ul>` +
        `<li><strong>"carga seis"</strong>: abre a porta do ${link('seu-altino')} na Estação do Cais.</li>` +
        `<li><strong>Vitrola</strong>: a palavra-gatilho da ${link('iris')}. <strong>Pardal</strong>: o contragatilho que o ${link('tomas')} conhece.</li>` +
        `<li>A ${link('beatriz')} vendeu as rotas A e B. Os doze passaram pelo andar -4. O ${link('hayashi')} quer a ${link('bia')} de volta.</li></ul></section>`
    },
    { id: 'ficha-de-missao', name: 'Ficha de missão', content: html(sectionOf(1, 'Ficha de missão')) },
    { id: 'equipe-e-material', name: 'Equipe e material', content: html(`### Equipe\n\n${sectionOf(2, 'Equipe')}\n\n### Material\n\n${sectionOf(2, 'Material')}`) },
    { id: 'mapa-de-tempo', name: 'Mapa de tempo (4 horas)', content: html(sectionOf(2, 'Mapa de tempo')) },
    { id: 'regras-de-ritmo', name: 'Regras de ritmo', content: html(sectionOf(2, 'Regras de ritmo')) },
    { id: 'notas-das-fichas', name: 'Como ler as fichas de ameaça', content: html(intro(12)) },
    { id: 'fichas-prontas', name: 'Fichas prontas e composição da mesa', content: html(intro(15)) + `<p>Runners do compêndio: ${links(runners.map((r) => r.identifier))}.</p>` },
    { id: 'como-cada-runner-brilha', name: 'Como cada runner brilha', content: runners.map(shine).join('<hr>') }
  ])
});

/* ------------------------------------------------------------------ */
/* 01 O Alerta e o Relógio                                             */
/* ------------------------------------------------------------------ */

const alertEntry = entry({
  id: '01-o-alerta',
  name: '01 O Alerta (0 a 4)',
  folder: 'Comece aqui',
  fonte: '2. Antes da mesa: O Alerta (0 a 4)',
  pages: asPages([
    { id: 'escala-do-alerta', name: 'Escala do Alerta (0 a 4)', content: html(sectionOf(2, 'O Alerta')) + boxes(['Alerta 1', 'Alerta 2', 'Alerta 3', 'Alerta 4']) },
    {
      id: 'como-usar',
      name: 'Como usar no Foundry',
      content:
        `<p>O Alerta é o rastreador do próprio sistema SombraNeon. Os macros ${link('alerta-mais-1')} e ${link('alerta-menos-1')} sobem e descem o nível e publicam, só para o Mestre, o efeito do nível atual com o texto da aventura. ${link('alerta-consulta')} só mostra o nível.</p>` +
        `<p>A tabela ${ref('cerco-tabelas/alerta', 'Alerta: efeitos por nível')} serve de consulta (não sorteia nada).</p>`
    }
  ])
});

const clock = entry({
  id: '01b-relogio',
  name: '01b Relógio da noite',
  folder: 'Comece aqui',
  fonte: '2. Mapa de tempo; instruções, seção 16',
  pages: asPages([
    {
      id: 'abertura',
      name: 'Relógio da noite',
      content:
        `<p>O tempo de história vai das <strong>21:00</strong> às <strong>05:04</strong>. A Preparação tem cronômetro real de <strong>30 minutos</strong> (10 minutos de mesa por hora de história). As chamadas da Ruth são às <strong>00:00</strong>, <strong>03:00</strong> e <strong>04:30</strong>. O Expresso chega às <strong>05:00</strong> e fecha as portas às <strong>05:04</strong>. O ${link('item-embaralhador')} dura <strong>40 minutos</strong>: ligado às 04:25, cobre até 05:05.</p>` +
        html(sectionOf(2, 'Mapa de tempo')) +
        `<h3>Marcos</h3>` +
        boxes(['00:00 Ruth liga, Onda 1', '01:30 Onda 2', '01:50 a ligação da torre', '02:00 emboscadas montadas', '03:00 Ruth liga', '04:25 ligar o embaralhador', '04:30 documentos prontos', '04:57 o homem do banco', '05:00 Expresso chega', '05:04 portas fecham'])
    },
    {
      id: 'macros-de-tempo',
      name: 'Macros de tempo',
      content: `<ul><li>${link('relogio-mais-5')}, ${link('relogio-mais-10')} e ${link('relogio-mais-60')}: somam minutos de história, mostram a hora e avisam os marcos cruzados.</li><li>${link('relogio-reiniciar')}: volta para 21:00.</li><li>${link('cronometro-da-preparacao')}: 30 minutos reais, com aviso a 5 e a 1 minuto.</li><li>${link('cronometro-da-missao')}: a sessão de 4 horas, com os mesmos avisos.</li></ul>`
    }
  ])
});

/* ------------------------------------------------------------------ */
/* 02 Briefing e FAQ                                                   */
/* ------------------------------------------------------------------ */

const ch3 = split(chap(3).markdown);
const faq = ch3.sections.filter((s) => /^P\d+\./.test(s.title));
if (faq.length !== 10) throw new Error(`O FAQ deve ter 10 perguntas, achei ${faq.length}`);

const briefing = entry({
  id: '02-briefing-e-faq',
  name: '02 Briefing e FAQ',
  folder: 'Briefing',
  observer: true,
  fonte: '3. Briefing, FAQ e preparação',
  pages: [
    textPage('abertura', 'O contratante (só Mestre)', 100, html(sectionOf(3, 'O contratante')), { ownership: { default: 0 } }),
    ...faq.map((q, i) => textPage(`p${i + 1}`, q.title, (i + 2) * 100, html(q.body), { ownership: { default: 2 } })),
    textPage(
      'handouts-do-briefing',
      'Handouts do briefing',
      1200,
      `<p>Liberados aos jogadores:</p><ul>${HANDOUTS.map((id) => `<li>${link(id)}</li>`).join('')}</ul>`,
      { ownership: { default: 2 } }
    ),
    textPage('papeis-na-defesa', 'Papéis na defesa e como o grupo entra', 1300, html(sectionOf(3, 'Papéis na defesa')), { ownership: { default: 0 } }),
    textPage('equipamento-e-kit', 'Equipamento e o kit da Rede Aurora', 1400, html(sectionOf(3, 'Equipamento e o kit')), { ownership: { default: 0 } }),
    textPage('preparacao', 'Preparação (cronômetro real)', 1500, html(sectionOf(3, 'Preparação')), { ownership: { default: 0 } })
  ]
});

/* ------------------------------------------------------------------ */
/* Salas 1 a 5                                                         */
/* ------------------------------------------------------------------ */

const THE_TWELVE = ['iris', 'tomas', 'dona-nena', 'antonio', 'luzia', 'caio', 'bia', 'zaca', 'nzinga', 'tembo', 'graca', 'samora'];

export const ROOMS = [
  {
    ch: 4, id: 'sala-1', num: '03', maps: ['mapa-01'], imgs: ['img-05', 'img-06', 'img-07', 'img-08', 'img-23'],
    elenco: ['ana-paz', 'ruth', 'beatriz', 'jonas', 'clarice', 'drone-vigilancia', 'torreta'], doze: true,
    itens: ['item-kit-rede', 'item-embaralhador']
  },
  { ch: 5, id: 'sala-2', num: '04', maps: ['mapa-02'], imgs: ['img-09', 'img-10', 'img-11'], elenco: ['capanga', 'atirador-gangue', 'drone-vigilancia', 'torreta', 'ruth'], itens: [] },
  {
    ch: 6, id: 'sala-3', num: '05', maps: ['mapa-03'], imgs: ['img-12', 'img-13', 'img-14', 'img-15', 'img-24'],
    elenco: ['beatriz', 'jonas', 'clarice', 'seguranca-corporativa', 'drone-combate', 'drone-vigilancia', 'cao-cibernetico', 'zaca', 'torreta', 'graca', 'ruth'], itens: ['item-amostra-lote']
  },
  {
    ch: 7, id: 'sala-4', num: '06', maps: ['mapa-04', 'mapa-05'], imgs: ['img-16', 'img-17', 'img-18', 'img-19'],
    elenco: ['brandt', 'seguranca-corporativa', 'drone-combate', 'van-captura', 'coruja', 'zaca', 'torreta', 'iris', 'tomas', 'bia'], itens: ['item-registro-brandt', 'item-scanner-coruja']
  },
  {
    ch: 8, id: 'sala-5', num: '07', maps: ['mapa-06'], imgs: ['img-20', 'img-21', 'img-22', 'img-25'],
    elenco: ['seguranca-corporativa', 'drone-vigilancia', 'cao-cibernetico', 'enxame-ratos', 'android-seguranca', 'coruja', 'hayashi', 'seu-altino', 'ruth'], itens: ['item-os-doze', 'item-embaralhador']
  }
];

/** Título da sala como está no capítulo: "SALA 1: A Casa e a Preparação" vira "Sala 1: A Casa e a Preparação". */
const roomTitle = (room) => chap(room.ch).title.replace(/^SALA/, 'Sala');

/** Substitui a seção de imagens e mapas (que no texto traz prompts e YAML) pelos links e textos para ler. */
const imagesPage = (room) => () =>
  room.maps
    .map((id) => {
      const map = MAPS.find((m) => m.id === id);
      return `<h3>${link(id)}</h3><p><strong>Quando mostrar:</strong> ${inline(map.when)} (${inline(map.grid)}).</p><p><img src="${map.path}" alt="${map.title}"></p><p><strong>No mapa:</strong> ${inline(map.description)}</p><blockquote class="para-ler">${inline(map.narrative)}</blockquote>`;
    })
    .join('') +
  room.imgs
    .map((id) => {
      const a = artOf(id);
      return `<h3>${link(id)}</h3><p><strong>Quando mostrar:</strong> ${inline(a.when)}</p><p><img src="${a.path}" alt="${a.title}" width="420"></p>`;
    })
    .join('');

const coverNote = (id) => {
  const scene = mapScenes.find((s) => s.identifier === id);
  return `<li><strong>Cobertura em ${link(id)}:</strong> ${scene.flags['sombraneon-cerco-ao-refugio'].cobertura.join(', ')}.</li>`;
};

const extraPages = {
  'sala-1': [
    {
      id: 'contadores',
      name: 'Preparação: contadores',
      content:
        `<p>Macro: ${link('cronometro-da-preparacao')}. Armadilhas: selecione a casa e use ${link('armadilha-marcar')} (a marca só o Mestre vê).</p>` +
        `<h3>Tarefas</h3>${boxes(['Barricadas (6)', 'Torretas (2)', 'Armadilhas (4)', 'Papéis aos refugiados', 'Reconhecer o terreno', 'Consertar um defeito', 'Conversar com os coordenadores'])}` +
        `<h3>Trocas do kit (até 3)</h3>${boxes(['1ª troca', '2ª troca', '3ª troca'])}` +
        `<h3>Ajuda de cada refugiado (1 vez)</h3>${boxes(['Íris', 'Tomás', 'Dona Nena', 'Antônio', 'Luzia', 'Caio', 'Bia', 'Zaca', 'Nzinga', 'Tembo', 'Graça', 'Samora'])}`
    }
  ],
  'sala-2': [
    {
      id: 'ponto-fraco',
      name: 'Ponto fraco da Onda 1 (anotar)',
      content:
        `<p>Marque o que aconteceu. A Sala 3 usa para escolher quem ataca na Onda 2.</p>` +
        boxes(['Porta principal, nave ou pátio', 'Telhado ou torre', 'Cripta ou esgoto', 'Enfermaria ou beco', 'Usaram o rádio (ponto fraco extra)', 'O drone escapou'])
    }
  ],
  'sala-3': [
    {
      id: 'contadores',
      name: 'Investigação: contadores',
      content:
        `<h3>Ações de investigação</h3>${boxes(['1', '2', '3', '4', '5 (depois das 02:00)', '6 (depois das 02:00)'])}` +
        `<h3>Pistas obtidas</h3>${boxes(['Pista 1: social', 'Pista 2: hack', 'Pista 3: observação'])}` +
        `<h3>Destino da Beatriz</h3>${boxes(['Virada', 'Presa', 'Punida', 'Livre', 'Não descoberta'])}`
    }
  ],
  'sala-4': [
    {
      id: 'contadores',
      name: 'Contadores do clímax (Coruja, van, rodadas)',
      content:
        `<h3>Rodadas (teto: 8)</h3>${boxes(['1', '2', '3 a Palavra', '4', '5', '6', '7', '8 recuo'])}` +
        `<h3>Relógio da Coruja (1 estágio a cada 2 rodadas)</h3>${boxes(['1 galeria do esgoto (rodada 2)', '2 porta de ferro (rodada 4)', '3 a cripta (rodada 6)', '4 escada para a nave (rodada 8)'])}<p>Macros: ${link('coruja-avancar')} e ${link('coruja-reiniciar')}. Na cripta, ${link('cripta-luzes')} liga e desliga as luzes.</p>` +
        `<h3>Relógio da van (parte 3 rodadas depois da 1ª captura)</h3>${boxes(['1ª captura', '+1', '+2', '+3 a van parte'])}` +
        `<h3>Esquadrão caído (2 de 4 dispara o Descarte)</h3>${boxes(['Brandt', 'Segurança 1', 'Segurança 2', 'Drone de combate', 'Van destruída'])}`
    },
    {
      id: 'estados-da-cena',
      name: 'Estados da cena: Incêndio, Bia e armadilhas',
      content:
        `<p><strong>Incêndio (Modo Descarte):</strong> a nave e a sacristia em chamas, com fumaça. Não há terceira cena: descreva o fogo sobre ${link('mapa-04')} seguindo o texto do Descarte em "O desafio". O fogo avança 1 zona por rodada: pátio, nave, coro e torre, sacristia.</p>` +
        `<section class="secret"><p><strong>A Bia (só Mestre):</strong> mesmo em Descarte os Seguranças tentam levá-la viva. Ela é a única exceção.</p></section>` +
        `<p><strong>Arsenais:</strong> Brandt, as duas Seguranças e o Drone de combate trazem na ficha os dois arsenais (Captura ativo). A troca é sua: não há automação.</p>`
    }
  ],
  'sala-5': [
    {
      id: 'escolha-da-rota',
      name: 'Escolha da rota (diário)',
      content:
        `<p>Consulta: ${ref('cerco-tabelas/rotas', 'Rotas: tempo, estado e chegada')}.</p>` +
        `<table><thead><tr><th>Comboio</th><th>Quem vai</th><th>Rota</th><th>Saída</th><th>Falhas (+5 min)</th><th>Chegada</th></tr></thead><tbody>` +
        [1, 2].map((n) => `<tr><td>${n}</td><td></td><td></td><td></td><td></td><td></td></tr>`).join('') +
        `</tbody></table><h3>Lances</h3>${boxes(['Lance 1', 'Lance 2', 'Lance 3'])}<h3>Embarque (3 pessoas por minuto)</h3>${boxes(['05:00', '05:01', '05:02', '05:03', 'Altino segura +1 minuto'])}<h3>Grupos que embarcaram inteiros (3 XP cada)</h3>${boxes(['Casal', 'Família', 'Grupo de 5'])}`
    }
  ]
};

function roomEntry(room) {
  const sections = split(chap(room.ch).markdown);
  const opening =
    html(sections.intro.replace(/^## .*$/m, '')) +
    `<hr><h3>Nesta sala</h3><ul>` +
    `<li><strong>Mapa (Scene):</strong> ${links(room.maps)}</li>` +
    list('Elenco e ameaças', room.elenco) +
    (room.doze ? list('Os doze', THE_TWELVE) : '') +
    list('Itens e butim', room.itens) +
    list('Imagens (diários)', room.imgs) +
    `<li><strong>Tabela de complicações:</strong> ${ref(`cerco-tabelas/complicacoes-${room.id}`)}</li>` +
    room.maps.map(coverNote).join('') +
    `</ul>`;
  const pages = [
    { id: 'abertura', name: 'Abertura (para ler)', content: opening },
    ...pagesFromSections(chap(room.ch).markdown, { replace: [['Imagens e map', imagesPage(room)]] }),
    ...(extraPages[room.id] ?? [])
  ];
  return entry({ id: room.id, name: `${room.num} ${roomTitle(room)}`, folder: 'Salas', fonte: `${room.ch}. ${chap(room.ch).title}`, pages: asPages(pages) });
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
  pages: asPages([{ id: 'abertura', name: 'Debrief (15 min)', content: html(intro(9)) }, ...pagesFromSections(chap(9).markdown)])
});

const cuts = entry({
  id: '09-cortes-e-ajuste-de-nivel',
  name: '09 Cortes e ajuste de nível',
  folder: 'Depois da sessão',
  fonte: '11. Cortes e 14. Ajuste de nível',
  pages: asPages([
    { id: 'cortes', name: 'Cortes, se o tempo apertar', content: html(chap(11).markdown) },
    {
      id: 'ajuste-de-nivel',
      name: 'Ajuste de nível',
      content: `<p><strong>Aviso:</strong> o ajuste está só aqui, como texto. O módulo não traz variantes de atores: edite as fichas antes da mesa.</p>${html(chap(14).markdown)}`
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

export const journalEntries = [readFirst, alertEntry, clock, briefing, ...roomEntries, debrief, cuts, testNotes];
