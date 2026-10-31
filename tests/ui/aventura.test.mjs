import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { PACKS, EXPECTED_COUNTS } from '../../data/content/index.mjs';
import { buildRunner, RUNNER_DEFS, ADVENTURE_PACK_FOLDER, ADVENTURE_ID } from '../../data/content/adventure.mjs';
import { IMAGES, IMAGE_DEFS, MISSING_IMAGES, imageScenes, imageJournals } from '../../data/content/adventure-images.mjs';
import { imageSize } from '../../tools/lib/image.mjs';
import { makeResolver } from '../../tools/lib/refs.mjs';
import { ROOT } from '../../tools/lib/book.mjs';

/**
 * Aventura "Noite das Máscaras": o que está nos compêndios bate com o texto da aventura
 * (docs/noite-das-mascaras.md), e tudo dela é fácil de achar.
 */
const adventurePacks = PACKS.filter((p) => p.name.startsWith('noite-'));
const pack = (name) => PACKS.find((p) => p.name === name).docs;
const scopeId = (s) => (s === 'system' ? 'sombraneon' : 'sombraneon-compendium');
const resolver = makeResolver(PACKS, scopeId);
const runner = (name) => buildRunner(RUNNER_DEFS.find((d) => d.name === name));
const attack = (d, re) => d.attacks.find((a) => re.test(a.name));

describe('estrutura dos compêndios da aventura', () => {
  it('tem dez packs próprios, todos com o prefixo e a contagem esperada', () => {
    expect(adventurePacks.map((p) => p.name)).toEqual(['noite-aventura', 'noite-jogadores', 'noite-imagens', 'noite-cenas', 'noite-mapas', 'noite-elenco', 'noite-fichas', 'noite-itens', 'noite-tabelas', 'noite-macros']);
    for (const p of adventurePacks) {
      expect(p.label.startsWith('Noite das Máscaras: ')).toBe(true);
      expect(p.docs).toHaveLength(EXPECTED_COUNTS[p.name]);
    }
  });

  it('o módulo declara os packs e a pasta do menu de compêndios', () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'modules/sombraneon-compendium/module.json'), 'utf8'));
    const declared = manifest.packs.map((p) => p.name).filter((n) => n.startsWith('noite-'));
    expect(declared).toEqual(adventurePacks.map((p) => p.name));
    expect(manifest.packFolders).toEqual([ADVENTURE_PACK_FOLDER]);
    expect(ADVENTURE_PACK_FOLDER.packs).toEqual(declared);
  });

  it('o Mestre vê o livro e o elenco; os jogadores veem só o material deles e os runners', () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'modules/sombraneon-compendium/module.json'), 'utf8'));
    const access = Object.fromEntries(manifest.packs.filter((p) => p.name.startsWith('noite-')).map((p) => [p.name, p.ownership.PLAYER]));
    expect(access).toEqual({
      'noite-aventura': 'NONE',
      'noite-jogadores': 'OBSERVER',
      'noite-imagens': 'NONE',
      'noite-cenas': 'NONE',
      'noite-mapas': 'NONE',
      'noite-elenco': 'NONE',
      'noite-fichas': 'OBSERVER',
      'noite-itens': 'NONE',
      'noite-tabelas': 'NONE',
      'noite-macros': 'NONE'
    });
  });

  it('elenco e itens ficam em pastas por cena, sem documento solto', () => {
    expect([...new Set(pack('noite-elenco').map((d) => d.folder))]).toEqual([
      'Contratante',
      'Sala 1: Saguão Vermelho',
      'Sala 2: Baile no Anel',
      'Sala 3: Vitrine do 60º',
      'Sala 4: Corredor dos Rostos',
      'Sala 5: Cofre e Fuga',
      'Ajuste para nível 3'
    ]);
    expect([...new Set(pack('noite-itens').map((d) => d.folder))]).toEqual(['Cache de Ruth', 'Máscaras e adereços', 'Butim e objetos da missão']);
    expect(pack('noite-aventura').map((d) => d.folder)).toEqual(['Comece aqui', 'Comece aqui', 'Comece aqui', 'Livro da aventura']);
  });

  it('todo documento carrega a marca da aventura', () => {
    for (const p of adventurePacks) {
      for (const d of p.docs) expect(d.flags.sombraneon.adventure?.id, `${p.name}/${d.identifier}`).toBe(ADVENTURE_ID);
    }
  });
});

describe('links entre os documentos', () => {
  it('todo @Ref e @Pack do conteúdo tem destino', () => {
    for (const p of PACKS) {
      for (const d of p.docs) expect(() => resolver.deep(JSON.parse(JSON.stringify(d)), `${p.name}/${d.identifier}`)).not.toThrow();
    }
  });

  it('o livro tem uma página por capítulo, na ordem, e o resolvedor gera UUIDs de compêndio', () => {
    const livro = pack('noite-aventura').find((d) => d.identifier === 'livro');
    expect(livro.pages).toHaveLength(14);
    expect(livro.pages.map((x) => x.identifier).slice(3, 8)).toEqual(['sala-1', 'sala-2', 'sala-3', 'sala-4', 'sala-5']);
    const hub = pack('noite-aventura')[0].pages[0].text.content;
    expect(resolver.resolve(hub)).toMatch(/@UUID\[Compendium\.sombraneon-compendium\.noite-elenco\.Actor\.[A-Za-z0-9]{16}\]\{Rex, Robô de Exclusão\}/);
    expect(resolver.resolve(hub)).toMatch(/@Compendium\[sombraneon\.regras\]/);
  });

  it('referência sem destino quebra a compilação', () => {
    expect(() => resolver.resolve('@Ref[noite-elenco/ninguem]')).toThrow(/sem destino/);
    expect(() => resolver.resolve('@Ref[noite-aventura/livro#nao-existe]')).toThrow(/Página sem destino/);
    expect(() => resolver.resolve('@Pack[pack-fantasma]')).toThrow(/Pack desconhecido/);
  });

  it('nada da aventura fica órfão: elenco, itens, runners, tabelas e material dos jogadores são citados no índice ou no livro', () => {
    const text = [...pack('noite-aventura')].flatMap((d) => d.pages.map((x) => x.text.content)).join('\n');
    for (const name of ['noite-elenco', 'noite-itens', 'noite-fichas', 'noite-tabelas', 'noite-jogadores', 'noite-imagens', 'noite-cenas', 'noite-mapas', 'noite-macros']) {
      for (const d of pack(name)) expect(text, `${name}/${d.identifier}`).toContain(`@Ref[${name}/${d.identifier}`);
    }
  });

  it('o índice cita todos os packs', () => {
    const hub = pack('noite-aventura')[0].pages[0].text.content;
    for (const p of adventurePacks) expect(hub).toContain(`@Pack[${p.name}]`);
  });
});

describe('runners prontos batem com as fichas da aventura (capítulo 14)', () => {
  it('seis runners, um por classe, com os valores impressos', () => {
    expect(RUNNER_DEFS.map((d) => d.cls).sort()).toEqual(['ghost', 'hyperdoc', 'netrunner', 'rigger', 'rocker', 'solo']);
    const sheet = {
      Ferrugem: { hp: 10, ac: 13, slots: 17 },
      Pixel: { hp: 4, ac: 12, slots: 10 },
      Agulha: { hp: 7, ac: 11, slots: 10 },
      Sombra: { hp: 4, ac: 14, slots: 10 },
      Estática: { hp: 6, ac: 12, slots: 10 },
      Faísca: { hp: 7, ac: 13, slots: 10 }
    };
    for (const [name, want] of Object.entries(sheet)) {
      const { derived: d } = runner(name);
      expect({ hp: d.hp.max, ac: d.ac.value, slots: d.slots.max }, name).toEqual(want);
    }
  });

  it('os atributos finais somam o talento já aplicado na base', () => {
    const { derived: d, base } = runner('Ferrugem');
    expect(base.con).toBe(12);
    expect(d.abilities.con.value).toBe(14);
    expect(runner('Estática').derived.abilities.car.value).toBe(16);
    expect(runner('Faísca').derived.abilities.des.value).toBe(15);
  });

  it('ataques e programas', () => {
    expect(attack(runner('Ferrugem').derived, /Arma retrátil/).attackBonus).toBe(3);
    expect(attack(runner('Ferrugem').derived, /Charuteira/).attackBonus).toBe(1);
    expect(attack(runner('Sombra').derived, /Bengala/).attackBonus).toBe(3);
    expect(runner('Sombra').derived.sneakDice).toBe(1);
    expect(runner('Faísca').derived.initiative.advantage).toBe(true);
    const pixel = runner('Pixel').derived.casting;
    expect(pixel.execBonus).toBe(2);
    expect(pixel.cdBase + 1).toBe(11);
    expect(pixel.known.count).toBe(3);
    const agulha = runner('Agulha').derived.casting;
    expect(agulha.programBonus.nanocura.total).toBe(3);
    expect(agulha.programBonus.analgesia.total).toBe(2);
    const estatica = runner('Estática').derived.casting;
    expect([estatica.programBonus.hype.total, estatica.programBonus.estatica.total, estatica.programBonus.solo.total]).toEqual([4, 3, 3]);
  });

  it('o espaço ocupado bate com a lista de equipamento da ficha', () => {
    const used = Object.fromEntries(RUNNER_DEFS.map((d) => [d.name, buildRunner(d).derived.slots.used]));
    expect(used).toEqual({ Ferrugem: 5, Pixel: 6, Agulha: 7, Sombra: 7, Estática: 5, Faísca: 6 });
  });

  it('cada runner traz sua persona, máscara e marcações [F] e [C]', () => {
    const actors = pack('noite-fichas');
    for (const a of actors) {
      const masks = a.items.filter((i) => i.identifier.startsWith('mascara-'));
      expect(masks, a.name).toHaveLength(1);
      expect(masks[0].system.slots).toBe(0);
      expect(a.system.details.biography).toContain(a.system.details.civilName);
      expect(a.system.details.biography).toContain('Plano de armas');
      expect(a.system.edge.value).toBe(1);
    }
    const ferrugem = actors.find((a) => a.name === 'Ferrugem');
    const origins = Object.fromEntries(ferrugem.items.filter((i) => i.flags.sombraneon.adventure?.source).map((i) => [i.identifier, i.flags.sombraneon.adventure.source]));
    expect(origins).toMatchObject({ 'jaqueta-blindada': 'portao', charuteira: 'portao', faca: 'cache', 'pistola-pesada': 'cache', carregador: 'cache' });
    const pistola = ferrugem.items.find((i) => i.identifier === 'pistola-pesada');
    expect(pistola.system.description).toContain('Cache de Ruth');
  });

  it('a origem Android e a Replicante vêm com as escolhas certas', () => {
    const pixel = pack('noite-fichas').find((a) => a.name === 'Pixel');
    expect(pixel.items.some((i) => i.identifier === 'chassi-android')).toBe(true);
    const agulha = pack('noite-fichas').find((a) => a.name === 'Agulha');
    expect(agulha.items.find((i) => i.identifier === 'proposito-de-fabrica').system.choice).toEqual({ purpose: 'companion' });
  });

  it('o créditos que sobram são os da ficha', () => {
    expect(Object.fromEntries(pack('noite-fichas').map((a) => [a.name, a.system.currency.credits]))).toEqual({ Ferrugem: 450, Pixel: 290, Agulha: 180, Sombra: 310, Estática: 60, Faísca: 290 });
  });
});

describe('elenco e itens', () => {
  const npc = (name) => pack('noite-elenco').find((d) => d.name.startsWith(name));

  it('Rex segue a ficha da Sala 4', () => {
    const rex = npc('Rex, ');
    expect(rex.system).toMatchObject({ level: 4, ac: 14, armor: 1, hp: { max: 26 } });
    expect(rex.system.morale.enabled).toBe(false);
    expect(rex.system.attacks.map((a) => a.name)).toEqual([
      'Taser de punho (Contenção)',
      'Metralhadora de ombro (Letal)',
      'Lâminas monofio de punho (Letal)',
      'Soco hidráulico',
      'Varredura'
    ]);
    expect(rex.system.traits).toContain('Isolado da Rede');
    expect(rex.system.traits).toContain('Porta dorsal');
  });

  it('Rex Mk II e os demais seguem o capítulo 12 e 13', () => {
    expect(npc('Rex Mk II').system).toMatchObject({ level: 6, ac: 16, armor: 2, hp: { max: 38 } });
    expect(npc('Lívia Aragão').system).toMatchObject({ level: 3, ac: 13, hp: { max: 15 } });
    expect(npc('Segurança corporativa').system).toMatchObject({ level: 2, ac: 13, hp: { max: 10 } });
    expect(npc('Drone de vigilância').system).toMatchObject({ level: 1, ac: 13, hp: { max: 3 } });
    expect(npc('Dona Ruth').system).toMatchObject({ level: 1, ac: 11, hp: { max: 5 } });
    for (const n of ['O Assistente', 'Teo Pixel', 'O Curador']) expect(npc(n).system).toMatchObject({ level: 0, ac: 10, hp: { max: 3 } });
  });

  it('o butim tem a categoria e o XP do Debrief', () => {
    const loot = Object.fromEntries(pack('noite-itens').filter((d) => d.flags.sombraneon.loot).map((d) => [d.identifier, d.flags.sombraneon.loot.xp]));
    expect(loot).toEqual({ 'rosto-livre': 3, 'dossie-do-desmascaramento': 3, 'registro-de-acessos-do-cracha': 1, 'uisque-de-barril-de-servidor': 1, 'nucleo-de-guarda-de-rex': 1, 'replica-de-exibicao': 0 });
  });

  it('a Cache de Ruth se divide nas granadas do catálogo', () => {
    const cache = pack('noite-itens').find((d) => d.identifier === 'cache-de-ruth');
    const equipamento = pack('equipamento').map((d) => d.identifier);
    expect(cache.flags.sombraneon.bundle).toEqual([
      ['granada-de-fragmentacao', 2],
      ['granada-de-fumaca', 1]
    ]);
    for (const [id] of cache.flags.sombraneon.bundle) expect(equipamento).toContain(id);
  });

  it('a pistola de polímero é a do livro: d6, Próximo, 1 slot', () => {
    const gun = pack('noite-itens').find((d) => d.identifier === 'pistola-de-polimero');
    expect(gun.system).toMatchObject({ damage: 'd6', range: 'near', slots: 1, usesMagazines: false });
  });

  it('as tabelas cobrem o d6 inteiro', () => {
    for (const t of pack('noite-tabelas')) {
      expect(t.formula).toBe('1d6');
      expect(t.results.map((r) => r.range[0])).toEqual([1, 2, 3, 4, 5, 6]);
    }
    expect(pack('noite-tabelas').find((t) => t.identifier === 'pagamento-por-runner').results.map((r) => r.name)).toEqual(['150 cr', '300 cr', '450 cr', '600 cr', '750 cr', '900 cr']);
  });

  it('o material dos jogadores não entrega segredos do Mestre', () => {
    const text = pack('noite-jogadores').flatMap((d) => d.pages.map((x) => x.text.content)).join('\n');
    expect(text).not.toMatch(/Lívia Aragão|3110|Obelisco|Rede de segurança|Exceção na Sala 4/);
    expect(pack('noite-jogadores').map((d) => d.name)).toContain('Escala do Alerta (0 a 4)');
    expect(text).toContain('Desmascaramento antecipado');
  });
});

describe('imagens da aventura', () => {
  it('o guia tem as 24 imagens definidas, em ordem, com arquivo nomeado', () => {
    expect(IMAGE_DEFS.map((d) => d.number)).toEqual(Array.from({ length: 24 }, (_, i) => i + 1));
    for (const d of IMAGE_DEFS) {
      expect(d.title, d.number).toBeTruthy();
      expect(d.narrative.length, d.number).toBeGreaterThan(40);
      expect(d.prompt, d.number).toContain('Art Direction');
      expect(d.file).toMatch(/^[0-9]{2}-[a-z0-9-]+.jpg$/);
    }
    expect(IMAGE_DEFS[7].careful).toBe(true);
    expect(IMAGE_DEFS[12].careful).toBe(true);
  });

  it('cada arquivo presente tem a proporção do guia, e as que faltam estão listadas', () => {
    const ratio = { '16:9': 16 / 9, '3:2': 3 / 2, '3:4': 3 / 4, '1:1': 1 };
    expect(IMAGES.length + MISSING_IMAGES.length).toBe(24);
    for (const d of IMAGES) {
      const { width, height } = imageSize(path.join(ROOT, d.path));
      expect(width / height, `${d.number} ${d.ratio}`).toBeCloseTo(ratio[d.ratio], 1);
    }
  });

  it('um diário por imagem, com a arte e três páginas só do Mestre', () => {
    expect(imageJournals).toHaveLength(IMAGES.length);
    for (const j of imageJournals) {
      expect(j.pages.map((p) => p.identifier)).toEqual(['imagem', 'ler', 'notas', 'prompt']);
      expect(j.pages[0]).toMatchObject({ type: 'image' });
      expect(j.pages[0].src.startsWith('modules/sombraneon-compendium/assets/noite-das-mascaras/')).toBe(true);
      for (const p of j.pages.slice(1)) expect(p.ownership).toEqual({ default: 0 });
    }
    const cuidado = imageJournals.find((j) => j.name.startsWith('08.'));
    expect(cuidado.pages[2].text.content).toContain('Cuidado');
  });

  it('os cenários são gridless, do tamanho da imagem, e só de ambiente', () => {
    for (const s of imageScenes) {
      const { width, height } = imageSize(path.join(ROOT, s.background));
      expect({ w: s.width, h: s.height }, s.name).toEqual({ w: width, h: height });
      expect(width / height).toBeCloseTo(16 / 9, 1);
    }
    const numbers = imageScenes.map((s) => s.flags.sombraneon.adventure.image);
    expect(numbers).not.toContain(8);
    expect(numbers).not.toContain(13);
  });

  it('os retratos do elenco e os ícones do butim usam a arte', () => {
    const img = (pack, id) => pack.find((d) => d.identifier === id).img;
    const elenco = pack('noite-elenco');
    expect(img(elenco, 'livia-aragao')).toMatch(/livia-aragao.jpg$/);
    expect(img(elenco, 'teo-pixel')).toMatch(/teo-pixel.jpg$/);
    expect(img(pack('noite-itens'), 'nucleo-de-guarda-de-rex')).toMatch(/nucleo-de-guarda-de-rex.jpg$/);
  });
});
