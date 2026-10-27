# 05. Compêndios: conteúdo, pipeline e IDs

Este arquivo define **o que entra em cada compêndio**, **como o conteúdo é produzido** a partir do livro e **como os IDs são gerados**. A fonte do texto é sempre `docs/sombraneon.md`. A camada mecânica (modificadores, concessões, usos, handlers) é curadoria em YAML descrita aqui.

## 1. Mapa de pacotes e contagens de validação

`npm run validate` confere **todas** as contagens abaixo contra o livro (via `data/extracted/`) e contra os YAML.

### 1.1 Sistema `sombraneon` (obrigatório)

| Pack | Tipo | Conteúdo | Contagem |
|---|---|---|---|
| `classes` | Item (`class`) | Solo, Netrunner, Hyperdoc, Ghost, Rocker, Rigger | **6** |
| `origens` | Item (`origin`) | Nat, Cromado, Sintético, Biomod | **4** |
| `antecedentes` | Item (`background`) | Tabela d20 do livro 5 | **20** |
| `alinhamentos` | Item (`alignment`) | Controle, Sobrevivência, Liberdade | **3** |
| `caracteristicas` | Item (`feature`) | Habilidades de classe, traços de origem, mutações, talentos, gatilhos de Edge | **105** (ver 1.3) |
| `programas` | Item (`program`) | Programas, protocolos e Sets | **45** (22 + 17 + 6) |
| `tabelas` | RollTable | Todas as tabelas aleatórias do livro | **17** (ver seção 7) |
| `regras` | JournalEntry | O livro de regras em páginas | **1 entrada, 10 páginas** |

### 1.2 Módulo `sombraneon-compendium` (catálogo)

| Pack | Tipo | Conteúdo | Contagem |
|---|---|---|---|
| `armas` | Item (`weapon`) | 5 brancas + 7 de fogo e inteligentes | **12** |
| `armaduras` | Item (`armor`) | Jaqueta, colete, armadura pesada | **3** |
| `equipamento` | Item (`gear`) | Equipamento geral (17) + Kit de Runner | **18** |
| `implantes` | Item (`implant`) | 7 por slot, 4 slots | **28** |
| `veiculos` | Item (`gear`) | 4 veículos + 3 módulos de drone | **7** |
| `ice` | Actor (`ice`) | Sentinela, Enxame, Cão de guarda, Executor, Muralha | **5** |
| `fichas-prontas` | Actor (`character`) | Um runner de nível 1 por classe | **6** |
| `macros` | Macro | Utilitários do Mestre e do grupo | **10** (seção 10) |

### 1.3 Quebra de `caracteristicas` (105)

| Grupo | `kind` | Contagem | Origem no livro |
|---|---|---|---|
| Habilidades de classe | `class` | 23 | Capítulo 4 (Solo 4, Netrunner 2, Hyperdoc 4, Ghost 3, Rocker 5, Rigger 5) |
| Traços de origem | `origin` | 12 | Capítulo 3 (Nat 3, Cromado 3, Sintético 4, Biomod 2) |
| Mutações do Biomod | `mutation` | 20 | Tabela d20 do 3.4 |
| Talentos | `talent` | 32 | 24 específicos (4 por classe) + 6 de "+2 em atributo" (1 por classe) + 2 genéricos (`escolha-livre`, `ajuste-de-atributo`) |
| Gatilhos de Edge | `edge-trigger` | 18 | 6.1 (6 por alinhamento) |

## 2. Pipeline de produção

```
docs/sombraneon.md ──(tools/extract-book.mjs)──▶ data/extracted/*.json   (texto e tabelas, sem mecânica)
                                              │
                      curadoria (humano ou IA) ▼
                                   data/source/**/*.yml           (autoridade do conteúdo)
                                              │
                     tools/build-packs.mjs (compilePack) ▼
                         systems/sombraneon/packs/*  e  modules/sombraneon-compendium/packs/*
```

### 2.1 `tools/extract-book.mjs`

Lê o livro em Markdown e produz JSON estável: por capítulo, as tabelas (cabeçalho e linhas), os blocos de lista e os parágrafos de cada seção. Não interpreta regras. Serve para (a) **gerar o esqueleto** dos YAML (nome, descrição, números do livro) e (b) **validar contagens e textos**. Se o livro mudar, rode `npm run extract` e `npm run validate`: as divergências aparecem como lista.

### 2.2 `data/source` (YAML)

```
data/source/
  system/
    classes/        solo.yml  netrunner.yml ...
    origens/
    antecedentes/
    alinhamentos/
    caracteristicas/        _classe/  _origem/  _mutacao/  _talento/  _gatilho/
    programas/              netrunner/  hyperdoc/  rocker/
    tabelas/
    regras/                 livro.yml  pages/01-visao-geral.md ... 10-apendice.md
  module/
    armas/  armaduras/  equipamento/  implantes/  veiculos/  ice/  fichas-prontas/  macros/
```

Um arquivo por documento, exceto as RollTables (um arquivo por tabela) e o Journal (um YAML de capa mais um Markdown por página).

Formato mínimo de um documento:

```yaml
identifier: pistola-leve          # obrigatório (slug ASCII)
name: Pistola leve
type: weapon                      # tipo do documento (Item) ou da pasta
img: systems/sombraneon/assets/icons/weapon-pistol.svg
folder: Armas de fogo             # nome da pasta dentro do pack (criada no build)
sort: 100                         # ordem no compêndio (ordem do livro x 100)
system:
  description: |
    Texto do livro.
  source: "Livro v0.3, 8.3"
  kind: ranged
  family: pistols
  damage: d6
  range: near
  hands: 1
  slots: 1
  price: 100
  properties: [light]
  usesMagazines: true
flags:
  sombraneon: { schemaVersion: 1 }
```

- `description` aceita Markdown simples; o build converte para HTML seguro (parágrafos, listas, negrito, tabelas) e **proíbe** travessões (falha o build).
- Referências a outros documentos usam `ref: tipo:identifier` e são resolvidas no build para UUIDs de compêndio (inclusive entre sistema e módulo: o sistema não depende do módulo; o módulo pode apontar para o sistema).
- `_id` e `_key` **nunca** são escritos à mão: o build gera.

### 2.3 IDs determinísticos

Todo documento e subdocumento recebe um ID de 16 caracteres `[A-Za-z0-9]` calculado de forma pura:

```js
// tools/lib/ids.mjs
import { createHash } from 'node:crypto';
const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export function stableId(seed) {
  let n = BigInt('0x' + createHash('sha1').update(seed).digest('hex'));
  let out = '';
  while (out.length < 16) { out += ALPHABET[Number(n % 62n)]; n /= 62n; }
  return out;
}
// Documento:       stableId(`sombraneon:${packName}:${identifier}`)
// Página/Resultado: stableId(`sombraneon:${packName}:${identifier}:${subkind}:${index}`)
// Pasta:           stableId(`sombraneon:${packName}:folder:${folderName}`)
```

Regras:

1. O `identifier` **nunca muda** depois de publicado (mudar quebra UUIDs em mundos). Renomear o `name` é livre.
2. O ID é o mesmo em toda execução e em toda máquina. Um teste compara dois builds consecutivos byte a byte (os arquivos de `.ldb` podem variar; compare o conteúdo extraído).
3. UUIDs finais: `Compendium.sombraneon.classes.Item.<id>` e `Compendium.sombraneon-compendium.armas.Item.<id>`.
4. O tempo de execução resolve referências por `identifier` usando o índice (`CompendiumIndex.resolve(type, identifier)`), nunca por ID digitado.

### 2.4 Build (`tools/build-packs.mjs`)

1. Carrega e valida todos os YAML (esquema JSON por tipo em `tools/schemas/`).
2. Resolve `ref:` e pastas, converte Markdown em HTML, injeta `_id`, `_key`, `_stats` (versão do sistema e `compatibility`), `sort`.
3. Escreve a árvore compatível com `compilePack` do `@foundryvtt/foundryvtt-cli` (documentos em JSON temporário) e compila para `packs/<nome>/` (LevelDB). O formato de `_key` (`!items!<id>`, `!tables!<id>`, `!tables.results!<tabela>.<resultado>`, `!journal!<id>`, `!journal.pages!<entrada>.<pagina>`, `!actors!<id>`, `!actors.items!<ator>.<item>`, `!macros!<id>`, `!folders!<id>`) deve ser **confirmado** na versão instalada do CLI e anotado em `docs/API-NOTES.md`.
4. Teste de ida e volta: `unpack:packs` extrai para uma pasta temporária e compara com os YAML (campos relevantes). Qualquer diferença falha o `validate`.
5. Ordem de compilação não importa. Falhas dizem arquivo e campo.

Segurança de dados: o build nunca grava nada fora de `packs/`, `dist/` e `data/extracted/`.

## 3. Origens (modificadores dos traços)

Cada traço é um item `feature` (`kind: origin`) concedido pela origem. Texto do livro na descrição; mecânica abaixo.

| Origem | Traço | Mecânica |
|---|---|---|
| **Nat** | Corpo sem interface | `flag.hackImmuneWithoutNeural`. A ficha exibe o selo "Imune a hack direto" quando o slot Neural está vazio. |
| | Humanidade firme | `cyber.advantage` (flag). |
| | Ambicioso | `talents.extra +1`. |
| **Cromado** | Instalação de fábrica | Concessão `choose`: 2 itens `implant` de qualidade Rua, slots distintos, instalados e gratuitos (`from.type: implant`, `filter: { quality: street }`, `count: 2`). Exige o módulo. |
| | Cromo estável | `cyber.adjust -1`. |
| | Vulnerável | `check.resist-hack` desvantagem; `check.resist-emp` desvantagem. |
| **Sintético** | Corpo artificial | `rest.noRation` (flag); `uses 1/day` com `automation: use` ("ignore um efeito que mire sua fisiologia"). |
| | Interface nativa | `check.hack-street` vantagem; `flag.nativeInterface`. |
| | Casco de fábrica | `ac.bonus +1` com `when: noArmor`. |
| | Registro | `reaction.police -2`; `reaction.execs -2`; `flag.registeredSynthetic`. |
| **Biomod** | Genoma instável | Concessão `roll`: 2 resultados da tabela `mutacoes-biomod` (sem repetir). |
| | Corpo rejeita cromo | `cyber.adjust +1`. |

`origin.cyberAdjust` e `origin.cyberAdvantage` (campos do item `origin`) espelham as flags para leitura rápida pela interface; a fonte da verdade é o modificador do traço.

## 4. Classes

Campos comuns a todas: `talentLevels: [1,3,5,7,9]`, `talentTable: talentos-<classe>`, `startingPackage` (8.6), `grants` (habilidades base como `item`).

| Classe | `hitDie` | `keyAbilities` | `weapons.allowed` | `armor` | `casting` |
|---|---|---|---|---|---|
| **Solo** | d8 | for, des | `all: true` | light, medium, heavy | nenhum |
| **Netrunner** | d4 | int | faca, pistola-leve, bastao-de-choque | none | `program`, int, início 2, +1 por nível |
| **Hyperdoc** | d6 | sab | faca, pistola-leve, bastao-de-choque | light, medium | `protocol`, sab, início 2, +1 por nível |
| **Ghost** | d4 | des | faca, pistola-leve, `suppressed`, `hands:1` | light | nenhum |
| **Rocker** | d6 | car | faca, pistola-leve, `hands:1` | light | `set`, car, início 3, extras nos níveis 4, 7, 10 |
| **Rigger** | d6 | des | família `pistols`, fuzil, faca | light, medium | nenhum |

Notas de interpretação (registre em `docs/DECISIONS.md`):

- "Armas de choque" (Netrunner) e "bastões" (Hyperdoc) resolvem para o Bastão de choque, única arma do catálogo com essas propriedades.
- "Armas silenciadas" (Ghost) não existe no catálogo v0.3; o token `suppressed` fica reservado para uma propriedade futura.
- "Fuzis leves" (Rigger) resolve para o Fuzil (o Rifle de precisão é pesado). Confirme com o autor.
- Armas naturais e implantes embutidos são sempre proficientes.
- O livro diz "DES (INT para o drone)" para o Rigger; o ataque do drone usa o mod. de DES do dono (tabela do livro), então `keyAbilities` é `des`.

### 4.1 Habilidades base (itens `feature`, `kind: class`)

| Classe | Habilidade | Mecânica |
|---|---|---|
| Solo | Domínio de arma | `choices: [{ key: family, kind: weaponFamily }]`; `attack.all` e `damage.all` = `1 + floor(@level / 2)` com `when: family:@choice.family`; `flag.weaponDomain`. |
| | Chassi | `slots.bonus` = `max(0, @abilities.con.mod)`. |
| | Resistente | `check.resist-injury`, `check.resist-poison`, `check.resist-chrome` com vantagem (testes de CON). |
| | Duro de matar | `uses 3/rest`; handler `tough-as-nails`. |
| Netrunner | Deck | Informativa: exige `gear` categoria `deck`. |
| | Programas | Informativa: regras de conhecimento e tier. |
| Hyperdoc | Nanokit | Informativa: exige `gear` categoria `nanokit`. |
| | Protocolos | Informativa. |
| | Primeiros socorros | `uses 1/scene`; handler `first-aid` (estabiliza sem teste nem protocolo). |
| | Cirurgião | Informativa: instalar e remover implantes com kit cirúrgico e 1 hora. |
| Ghost | Ataque furtivo | Handler `sneak-attack` (`3` seção 4.4). |
| | Fantasma | Vantagem em `stealth`, `climb`, `disguise`, `sensors`, `delicate`, `hack-street`. |
| | Edge de rua | Handler `street-edge` (descanso). |
| Rocker | Rig de palco | Informativa: exige `gear` categoria `stage-rig`. |
| | Sets | Informativa. |
| | Palco | `check.perform` vantagem. |
| | Fama | Chip "Fama" na janela de teste (`check.fame`), a critério do Mestre. |
| | Ressonância | Handler `resonance` (`3` seção 5.4). |
| Rigger | Drone voador | Handler `drone` (`3` seção 14). |
| | Voo | Informativa (notas do drone). |
| | Link | Informativa. |
| | Batedor | `initiative.advantage`; `check.ambush` vantagem. |
| | Condutor | `check.piloting` vantagem. |

### 4.2 Pacotes iniciais (livro 8.6)

| Classe | Itens (identifier) | Custo |
|---|---|---|
| Solo | pistola-pesada, jaqueta-blindada, faca, carregador ×2, rig-utilitario, racao | 550 |
| Netrunner | deck-de-rua, pistola-leve, carregador, cabo-de-interface, bateria, rig-utilitario, racao | 610 |
| Hyperdoc | nanokit, kit-medico, pistola-leve, faca, carregador, rig-utilitario, racao | 570 |
| Ghost | pistola-leve, faca, jaqueta-blindada, kit-de-ferramentas, lanterna, rig-utilitario, racao | 590 |
| Rocker | rig-de-palco, pistola-leve, jaqueta-blindada, faca, rig-utilitario, racao | 640 |
| Rigger | pistola-leve, jaqueta-blindada, radio, kit-de-ferramentas, rig-utilitario, racao (drone grátis) | 680 |

O `validate` **soma os preços do catálogo** e exige que o total bata com a coluna Custo. Kit de Runner: 300 cr, 4 slots (rig-utilitario, racao ×3, bateria ×2, lanterna, cabo-de-interface).

## 5. Antecedentes e alinhamentos

### 5.1 Antecedentes (20)

Itens `background` na ordem do d20 (`rollIndex` 1 a 20): `name`, `knowledge` (coluna Conhecimento), `contactPrompt: "Quem você conhece na cidade?"`. Sem modificadores. A janela de teste mostra, para o antecedente atual, um chip **"Conhecimento"** com o texto; marcá-lo concede **vantagem** no teste (o Mestre decide se se aplica; a marcação é do jogador, a aprovação é da mesa). "Fixer" e "Mercenário" aparecem em negrito no livro: marque `highlight: true` (selo na lista).

### 5.2 Alinhamentos (3)

| Alinhamento | `mapsTo` | `edgeTriggerTable` | `reaction` (polícia, execs, cidadãos, gangues, mercado negro, cultos, punks, sintéticos livres) |
|---|---|---|---|
| Controle | order | `gatilhos-controle` | +2, +2, +1, -1, -1, -1, -2, -1 |
| Sobrevivência | neutral | `gatilhos-sobrevivencia` | 0, 0, 0, +1, +2, 0, 0, 0 |
| Liberdade | chaos | `gatilhos-liberdade` | -2, -2, -1, +1, 0, +1, +2, +2 |

Os 18 gatilhos são itens `feature` (`kind: edge-trigger`), 6 por alinhamento, numerados no `sort` pelo d6 do livro e ligados às tabelas.

## 6. Características

### 6.1 Talentos (32)

Para cada classe, quatro talentos específicos, o "+2 em atributo" da classe e (em comum) o `escolha-livre` e o `ajuste-de-atributo`.

| Classe | 2 | 3-6 | 7-9 (+2) | 10-11 | 12 |
|---|---|---|---|---|---|
| Solo | Segundo domínio | Arma afinada | FOR, DES ou CON | Armadura treinada | `escolha-livre` |
| Netrunner | Biblioteca | Programa afinado | INT, DES ou CON | Deck customizado | `escolha-livre` |
| Hyperdoc | Biblioteca clínica | Protocolo afinado | SAB, INT ou CON | Nanobots em enxame | `escolha-livre` |
| Ghost | Edge extra | Exploit | DES, SAB ou CAR | Camuflagem óptica | `escolha-livre` |
| Rocker | Setlist maior | Afinação | CAR, DES ou INT | Backing track | `escolha-livre` |
| Rigger | Drone auxiliar | Armamento do drone | DES, INT ou CON | Chassi reforçado | `escolha-livre` |

Mecânica dos específicos: `03` seção 8.3. O "+2": `choices: [{ key: abilities, kind: ability, options: [...] }]` e `modifiers: [{ key: 'abilities.{choice.abilities}.value', value: '2' }]`. `escolha-livre`: handler `talent-free-choice`; `ajuste-de-atributo`: criado dinamicamente a partir de um molde com modificadores preenchidos pelo handler.

### 6.2 Mutações do Biomod (20)

| d20 | Mutação | Mecânica |
|---|---|---|
| 1 | Anfíbio | `flag.amphibious` |
| 2 | Poderoso | `attack.melee +1`, `damage.melee +1` |
| 3 | Pele blindada | `ac.bonus +1` com `when: noArmor` |
| 4 | Comunicação oculta | `flag.hiddenComms` |
| 5 | Mira biológica | `attack.ranged +1`, `damage.ranged +1` |
| 6 | Sentidos agudos | `flag.notSurprised` |
| 7 | Arma natural | `weapon`: Garras, presas ou chifres (nome editável), `d6`, `melee`, `family: unarmed`, proficiente |
| 8 | Planador | `flag.glide` |
| 9 | Camuflagem | `uses 1/day`, `automation: use` (3 rodadas de invisibilidade) |
| 10 | Faro de caçador | `uses 1/day`, `automation: use` |
| 11 | Adaptado a extremos | `choices: [{ key: extreme, options: [fire, cold] }]`; `resist.{choice.extreme}` multiplica por 0,5 |
| 12 | Técnico nato | `check.tech +1` |
| 13 | Afinidade com vivos e máquinas | `check.interact-machines +1` (animais, drones e robôs) |
| 14 | Resistência a choque e radiação | `resist.electric` e `resist.radiation` por 0,5 |
| 15 | Filtro tóxico | `resist.poison` por 0,5; `flag.toxicEnvironment` |
| 16 | Escalador nato | `flag.climbFull`; reduz a CD de escalada em uma categoria (nota) |
| 17 | Braços extras | `slots.bonus +2`; `flag.extraNonOffensiveAction` |
| 18 | Pernas extras | `flag.extraMove` |
| 19 | Reflexos acelerados | `initiative.advantage` |
| 20 | Regeneração | `uses 1/rest`; `roll { formula: '1d6 + @level', healsSelf: true }`; `automation: use` |

### 6.3 Handler genérico `use`

Boa parte das habilidades com "N vezes por descanso" não precisa de código próprio. O handler `use`: valida `uses.value > 0`, decrementa, posta um cartão com o nome, a descrição e, se houver `roll`, rola a fórmula (cura no próprio ator quando `healsSelf`). Só o que muda estado de forma específica ganha handler dedicado (seção 8).

## 7. Tabelas (17)

RollTables com `formula` e resultados com **faixas** exatas do livro. Resultados que correspondem a itens usam o tipo documento com o UUID do item (resolvido no build); os demais são texto.

| Identifier | Fórmula | Resultados | Observações |
|---|---|---|---|
| `objetivos-do-grupo` | 1d6 | 6 | Texto. |
| `mutacoes-biomod` | 1d20 | 20 | Documentos (`caracteristicas`). |
| `antecedentes` | 1d20 | 20 | Documentos (`antecedentes`). |
| `gatilhos-controle` | 1d6 | 6 | Documentos. |
| `gatilhos-sobrevivencia` | 1d6 | 6 | Documentos. |
| `gatilhos-liberdade` | 1d6 | 6 | Documentos. |
| `talentos-solo` | 2d6 | 5 (2; 3-6; 7-9; 10-11; 12) | Documentos. |
| `talentos-netrunner` | 2d6 | 5 | Documentos. |
| `talentos-hyperdoc` | 2d6 | 5 | Documentos. |
| `talentos-ghost` | 2d6 | 5 | Documentos. |
| `talentos-rocker` | 2d6 | 5 | Documentos. |
| `talentos-rigger` | 2d6 | 5 | Documentos. |
| `feedback` | 1d6 | 6 | Texto (a automação usa os índices 1 a 6, ver `03` 7.3). |
| `rejeicao` | 1d6 | 6 | Texto (ver `03` 7.4). |
| `surto` | 1d6 | 6 | Texto (ver `03` 11.2). |
| `reacao` | 2d6 | 5 (2 ou menos; 3-5; 6-8; 9-11; 12 ou mais) | Texto. Faixas abertas: use `range: [-100, 2]` e `[12, 100]`. |
| `gerador-de-rede` | 1d6 | 6 | Texto (nós da Rede, 9.6). |

Regras de dados:

- A faixa do resultado deve cobrir **todos** os valores possíveis da fórmula sem lacunas ou sobreposição; o `validate` testa isso para cada tabela.
- `displayRoll: true`, `replacement: true` (padrão) e `drawn: false`.
- As tabelas de talento têm `flags.sombraneon.class` com o identifier da classe.
- Os resultados de documento exibem o nome do item e o ícone dele.

## 8. Handlers (`automation/registry.mjs`)

Identificadores usados pelos itens do conteúdo. Handlers sem linha aqui não existem.

| Handler | Itens que usam | Ganchos | Comportamento resumido |
|---|---|---|---|
| `use` | muitos (6.3) | `onUse` | Consome 1 uso, posta cartão, rola `roll` se houver. |
| `weapon-domain` | Domínio de arma, Segundo domínio | `onGrant` | Pede a família; marca `flag.weaponDomain` (condição `domain`). |
| `tough-as-nails` | Duro de matar | `onZeroHp` | Teste CON CD 15; ver `03` 9.1. |
| `pain-filter` | Filtro de dor | `onZeroHp` | Consome 1 uso; HP = 1. |
| `sneak-attack` | Ataque furtivo | `onRoll` (opção) | Dados extras (`03` 4.4). |
| `street-edge` | Edge de rua | `onRest` | +1 Edge se vazio. |
| `exploit` | Exploit | `onRoll` | Escolha de efeito e estado por 1d4 rodadas. |
| `deck-absorb` | Deck customizado | `onFeedback` | Absorve o primeiro Feedback do descanso. |
| `first-aid` | Primeiros socorros | `onUse` | Estabiliza (`dying.stable`). |
| `resonance` | Ressonância | `onEdge` | Oferece +1d6 no reroll. |
| `drone`, `aux-drone` | Drone voador, Drone auxiliar | `onGrant` | Cria atores `drone`. |
| `talent-free-choice` | `escolha-livre` | `onGrant` | Diálogo do 12 (`03` 8.2). |
| `neural-first` | Reflexos neurais (Militar) | `onCombatStart` | Age primeiro na rodada 1 se não surpreendido. |
| `stim-system` | Sistema de estimulantes | `onUse` | Cura `1d6 + nível`; Militar: próximo ataque com vantagem. |
| `injector` | Injetor embutido | `onUse` | Usa um stim guardado sem ação (cura 1d6; Militar +1d4). |
| `kinetic-negate` | Escudo cinético (Militar) | `onUse` | Nega um ataque corpo a corpo que acertaria. |
| `step-subroutine` | Sub-rotina de passo | `onUse` | Evita um ataque que acertaria. |
| `memory-boost` | Memória estendida (Militar) | `onRoll` | +1d6 num teste de INT, 1 por descanso. |
| `eco-digital` | Eco digital | `onUse` | Lembrete de dois programas por 1d4 rodadas. |

Se uma habilidade do livro não tem handler nem modificador, ela é **informativa**: aparece com o texto, sem automação, e tem a marca "Manual" na ficha (assim o jogador sabe que depende da mesa).

## 9. Implantes (28)

Cada implante é um item `implant` com `tiers.street`, `tiers.corp` e `tiers.military`. **`modifiers` de cada qualidade traz o conjunto total** naquela qualidade (não deltas). `summary` e `delta` vêm do livro (colunas "Rua", "Corp acrescenta", "Militar acrescenta") via extração, não digitados à mão. Preço pela qualidade (300, 1.000, 3.000 cr).

Abreviações: `m:` modificador; `u:` usos; `w:` linha de arma; `f:` flag; `c:` escolha; `H:` handler. Condições entre parênteses.

### 9.1 Neural (7)

| Implante | Rua | Corp (total) | Militar (total) |
|---|---|---|---|
| Reflexos neurais | m: `initiative.advantage` | + m: `check.avoid-danger +1` (DES) | + f: `initiative.first`; H: `neural-first` |
| Alvejador neural | m: `attack.ranged +1` | + f: `ignoreCover` | + m: `damage.ranged +1` |
| Potencializador mental | c: `a` (int ou sab); m: `abilities.{a}.value +1` | m: `abilities.int.value +1`, `abilities.sab.value +1` | c: `major` (int ou sab); `+2` no escolhido e `+1` no outro (usar `when: choice:major=int` e o espelho) |
| Jack de interface | m: `cast.bonus +1` (`when: class:netrunner`); f: `directInterface` | + f: `remoteCable` | + m: `check.stay-connected` vantagem |
| Filtro de dor | u: 1/rest; H: `pain-filter` | u: 2/rest | + f: `immuneStun`, `immuneFear` |
| Olhos térmicos | f: `darkvision.near` | f: `darkvision.far`, `seeHeat` | + m: `check.perceive` vantagem; f: `ignoreDarkSmoke` |
| Memória estendida | m: `check.recall` vantagem | + f: `perfectRecall` | + u: 1/rest; H: `memory-boost` |

### 9.2 Corpo (7)

| Implante | Rua | Corp (total) | Militar (total) |
|---|---|---|---|
| Subderme blindada | m: `ac.bonus +1` | m: `ac.bonus +2` | + f: `crit.immune` |
| Quadro cinético | c: `a` (for ou des); `abilities.{a}.value +1` | `abilities.{a}.value +2` | + `+1` no outro atributo (usar `when: choice:a=for` e o espelho) |
| Coração cibernético | m: `abilities.con.value +1` | m: `abilities.con.value +2` | + m: `dying.die` = `d6` |
| Protocolo social | m: `abilities.car.value +1` | m: `abilities.car.value +2` | + m: `check.social` vantagem |
| Contrapeso | m: `slots.bonus +2` | m: `slots.bonus +4` | + m: `check.lift` vantagem |
| Sistema de estimulantes | u: 1/rest; H: `stim-system` | u: 2/rest | + ao ativar, vantagem no próximo ataque |
| Pulmões filtrantes | f: `immuneGas` | + m: `check.resist-poison` vantagem; `check.resist-disease` vantagem | + f: `breatheVacuum10min` |

### 9.3 Braços (7)

| Implante | Rua | Corp (total) | Militar (total) |
|---|---|---|---|
| Arma retrátil | w: `d6`, melee, uma mão, embutida, sem slot, não desarmável | w: `d8` | w: `d8`, `ignoreArmor 1` (lâmina monofio) |
| Mão tática | w: `d6`, ranged, near | w: `d8` | w: `d8`, far |
| Garras de pressão | m: `check.strength-arms` vantagem; `damage.unarmed +1` | m: `damage.unarmed +2` | + w: "Soco" `d8`, melee, família `unarmed`, `ignoreArmor 1` |
| Mão de precisão | m: `check.delicate` vantagem | + f: `toolkitBuiltIn` | + m: `attack.ranged +1`; `check.disarm` vantagem |
| Escudo cinético | m: `ac.melee +1` | m: `ac.melee +2` | + u: 1/rest; H: `kinetic-negate` |
| Cabo-gancho | f: `grapple18m` | + f: `pullLight`, `climbFull` | + f: `grabTarget` (FOR disputada) |
| Injetor embutido | u: 1 (stim), H: `injector` | u: 2 | u: 3; cada stim cura `+1d4` |

### 9.4 Pernas (7)

| Implante | Rua | Corp (total) | Militar (total) |
|---|---|---|---|
| Molas de salto | f: `jump2x`, `fallImmune6m` | f: `fallImmune12m` | f: `fallImmune18m`, `verticalJumpNear` |
| Motor de sprint | f: `doubleMove` | + m: `damage.charge` = `1d4` | + `damage.charge` = `1d6` (substitui) |
| Passos silenciosos | m: `check.stealth` vantagem (ao se mover) | + f: `sensorDisadvantage` | + u: 1/rest; H: `use` (invisível a sensores por 1 minuto) |
| Estabilizadores | m: `check.avoid-knockdown` vantagem | + f: `ignoreDifficultTerrain` | + f: `immuneKnockdown` |
| Âncoras magnéticas | f: `magneticWalk` | + f: `magneticCeiling` | + f: `magneticMeleeAC` (informativo, +1 de CA corpo a corpo preso a superfície metálica) |
| Sub-rotina de passo | u: 1/day; H: `step-subroutine` | u: 1/rest | u: 2/rest |
| Pernas de combate | w: "Chute" `d6`, melee, família `unarmed`; f: `kickKnockdown` | w: `d8` | + m: `attack.unarmed +1`; w: `stunOn nat20` |

Observações:

- Todas as flags (`f:`) são **informativas** (aparecem no cartão do implante e na dica) salvo as que alguma regra consulta (`initiative.first`, `crit.immune`, `ignoreCover`, `doubleMove` no cartão de movimento).
- Implantes com `uses` mostram o botão **Usar** no cartão de Cromo.
- Implantes com `w:` geram linhas de ataque (`03` seção 4).

## 10. Macros (10) e API pública

Macros são pequenas e apenas chamam `game.sombraneon.api.*` (código fica no sistema, testável). Todas verificam permissão e ficam em `scope: global`, `type: script`.

| Macro | Chamada | Quem usa |
|---|---|---|
| Descanso em grupo | `api.restGroup()` | Mestre |
| Dar Edge | `api.giveEdge()` | Mestre |
| Alerta +1 | `api.raiseAlert(1)` | Mestre |
| Nova invasão | `api.newRun()` | Mestre |
| Reação de facção | `api.reaction()` | Mestre |
| Gerador de Rede | `api.rollNetwork()` | Mestre |
| Objetivos do grupo | `api.rollGroupGoals()` | Mestre |
| Teste rápido de grupo | `api.groupCheck()` | Mestre |
| Teste de moral | `api.moraleCheck()` | Mestre |
| Iniciativa por grupo | `api.rollGroupInitiative()` | Mestre |

`api` também expõe `attack(actorUuid, attackId)` e `execute(actorUuid, programId)` (usadas pelas macros que a hotbar cria ao arrastar linhas da ficha).

## 11. Itens do catálogo (módulo)

### 11.1 Armas (12)

| identifier | Nome | Família | Tipo | Dano | Alcance | Mãos | Slots | Custo | Propriedades |
|---|---|---|---|---|---|---|---|---|---|
| faca | Faca | blades | melee | d4 | close | 1 | 1 | 10 | light, thrown |
| soqueira | Soqueira | blunt | melee | d4 | close | 1 | 1 | 10 | light |
| bastao-de-choque | Bastão de choque | shock | melee | d6 | close | 1 | 1 | 100 | light; `stunOn: nat20` |
| katana-monofio | Katana monofio | blades | melee | d8 | close | 1 | 1 | 250 | `ignoreArmor: 1` |
| marreta-cibernetica | Marreta cibernética | blunt | melee | d10 | close | 2 | 2 | 150 | twoHanded |
| pistola-leve | Pistola leve | pistols | ranged | d6 | near | 1 | 1 | 100 | light; `usesMagazines` |
| pistola-pesada | Pistola pesada | pistols | ranged | d8 | near | 1 | 1 | 150 | `usesMagazines` |
| submetralhadora | Submetralhadora | smgs | ranged | d6 | near | 1 | 1 | 250 | burst; `usesMagazines` |
| escopeta | Escopeta | shotguns | ranged | d10 | near | 2 | 2 | 200 | twoHanded; `usesMagazines` |
| fuzil | Fuzil | rifles | ranged | d10 | far | 2 | 2 | 300 | twoHanded; `usesMagazines` |
| rifle-de-precisao | Rifle de precisão | rifles | ranged | d12 | far | 2 | 2 | 600 | twoHanded, aim; `usesMagazines` |
| arma-inteligente | Arma inteligente | smart | ranged | d6 | near | 1 | 1 | 500 | `attackBonus: 1`; `usesMagazines` |

(Mãos da Submetralhadora, da Arma inteligente e das armas de uma mão não estão no livro; usar 1 e registrar na DECISIONS.)

### 11.2 Armaduras (3)

| identifier | Nome | CA | `addDex` | Tipo | Slots | Custo | Penalidades |
|---|---|---|---|---|---|---|---|
| jaqueta-blindada | Jaqueta blindada | 11 | sim | light | 1 | 250 | |
| colete-tatico | Colete tático | 13 | sim | medium | 2 | 750 | stealth |
| armadura-corp-pesada | Armadura corp pesada | 15 | não | heavy | 3 | 1500 | stealth, swim |

### 11.3 Equipamento (18)

| identifier | Nome | Categoria | Custo | Slots | Notas |
|---|---|---|---|---|---|
| deck-de-rua | Deck de rua | deck | 300 | 1 | `bonus: 0` |
| deck-corp | Deck corp | deck | 1000 | 1 | `bonus: 1` |
| deck-militar | Deck militar | deck | 3000 | 1 | `bonus: 2` |
| firewall | Firewall | firewall | 100 | `perSlot: 2` | |
| nanokit | Nanokit | nanokit | 150 | 1 | |
| kit-cirurgico | Kit cirúrgico | surgical | 400 | 1 | |
| kit-medico | Kit médico | medical | 200 | 1 | |
| kit-de-ferramentas | Kit de ferramentas | tool | 50 | 1 | |
| rig-de-palco | Rig de palco | stage-rig | 200 | 1 | |
| lanterna | Lanterna | light | 100 | 1 | usa bateria |
| bateria | Bateria | battery | 50 | `perSlot: 2` | 1 hora de mesa |
| carregador | Carregador | ammo | 30 | `perSlot: 2` | |
| cabo-de-interface | Cabo de interface | cable | 50 | 1 | |
| stim | Stim | stim | 100 | `perSlot: 2` | uso único; recupera 1d6 HP |
| radio | Rádio | radio | 200 | 1 | alcance de cidade |
| racao | Ração (3) | ration | 50 | 1 | `uses { max: 3, value: 3 }` |
| rig-utilitario | Rig utilitário | utility-rig | 30 | 1 | `freeFirst: true` |
| kit-de-runner | Kit de Runner | general | 300 | 4 | Pacote opcional (contém rig utilitário, 3 rações, 2 baterias, lanterna, cabo de interface). Ao arrastar, o diálogo oferece "Desmembrar nos itens". |

### 11.4 Veículos e módulos de drone (7)

Veículos (`gear`, categoria `vehicle`, `slots: 0`): Moto urbana (3000; 1 a 2; CA 12, HP 10), Carro compacto (8000; 4; 11 / 20), Van de carga (12000; 6 e carga; 11 / 30), Aerocarro civil (40000; 4; 12 / 25; voa, exige licença). Nota: "manobras sob pressão: DES CD 12". Módulos de drone (`gear`, categoria `drone-module`): Sensor térmico (150), Compartimento de carga (100), Placa de impacto (200; `drone.ac +1`).

### 11.5 Atores `ice` (5)

| Nome | Nível | CA | HP | Ataque | Truque |
|---|---|---|---|---|---|
| Sentinela | 1 | 11 | 5 | Choque +2 (1d4 neural) | Alarme: ao ser atingido, o Alerta sobe em 1. |
| Enxame | 2 | 12 | 10 | 2 ataques +3 (1d4) em alvos diferentes | Dispersão: só sofre metade do dano de programas de alvo único. |
| Cão de guarda | 3 | 13 | 14 | Mordida +4 (1d8 neural) | Rastreio: ignora Ofuscar. |
| Executor | 4 | 14 | 22 | Golpe +5 (1d10 neural) | Trava: o alvo atingido faz teste de CON CD 12 ou 1 programa seu entra em Crash. |
| Muralha | 5 | 15 | 30 | 2 ataques +5 (1d6) | Barreira: só sofre dano de programas de tier 2 ou mais. |

Token padrão: disposição hostil, sem vínculo de dados, barra 1 em HP.

### 11.6 Fichas prontas (6)

Personagens de nível 1, **gerados pelo mesmo código do assistente** (script `tools/build-pregens.mjs` usa a camada de lógica pura) para garantir consistência. Valores abaixo são definidos pelo autor deste pacote e devem ser **confirmados** na revisão da Fase 6. Cada ficha leva HP no máximo do dado (`hp.rolls: [máximo]`), créditos restantes sobre uma média de 700 cr, `creation.completed: true` e retrato padrão do sistema.

| Nome de rua | Classe | Origem | Alinhamento e gatilho | Antecedente | FOR DES CON INT SAB CAR | Escolhas | Talento |
|---|---|---|---|---|---|---|---|
| Brasa | Solo | Cromado | Sobrevivência, Cauteloso | Ex-gangue | 15 12 14 8 10 9 | Domínio: pistols. Implantes Rua: Subderme blindada, Reflexos neurais | Arma afinada |
| Vetor | Netrunner | Nat | Liberdade, Sabotador | Hacker de garagem | 7 12 10 16 11 9 | Programas: Ping, Backdoor | Programa afinado (Ping); extra Nat: Deck customizado |
| Sutura | Hyperdoc | Biomod | Controle, Executor | Médico de beco | 9 11 12 13 15 10 | Protocolos: Nanocura, Antídoto. Mutações: Pele blindada, Reflexos acelerados | Nanobots em enxame |
| Névoa | Ghost | Sintético | Liberdade, Rebelde | Entregador | 8 16 10 12 13 11 | | Exploit |
| Riff | Rocker | Nat | Sobrevivência, Provisor | DJ de clube | 9 12 11 10 8 16 | Sets: Hype, Refrão, Solo | Afinação (Refrão); extra Nat: Backing track |
| Zangão | Rigger | Cromado | Controle, Faxineiro | Mecânico | 10 15 12 14 11 8 | Implantes Rua: Alvejador neural, Subderme blindada | Armamento do drone |

Pacote inicial da classe em todas. Valores derivados esperados (usados em teste de regressão de `logic/`):

| Ficha | HP | CA | Slots (máx) | Destaques |
|---|---|---|---|---|
| Brasa | 10 | 13 | 17 | Pistola pesada: ataque +3 (DES +1, domínio +1, Arma afinada +1), dano d8+2 |
| Vetor | 4 | 11 | 10 | Execução: +3 (INT), Ping +4; CD 11 (tier 1) |
| Sutura | 7 | 11 | 10 | Execução: +2 (SAB); Nanocura cura `1d6 + 1 + 1d4` |
| Névoa | 4 | 14 | 10 | Pistola leve: +3 (usa o maior entre FOR e DES), dano d6; furtivo +1d6 |
| Riff | 6 | 12 | 10 | Set: d20 + 3 contra CD 12 (Refrão: +4) |
| Zangão | 7 | 14 | 10 | Pistola leve: +3 (DES +2, Alvejador +1); drone CA 12, HP 6, ataque +2 (+3 com o talento), dano d4+1 |

Observações: a Ghost usa o mod. de DES (+3) porque a pistola é `light` (maior entre FOR e DES). O Alvejador neural só soma em ataques à distância. A Hyperdoc Sutura tem CA 11 por Pele blindada (+1 sem armadura). Se algum número divergir do que a lógica calcular, **a lógica manda** (confira o livro e corrija este quadro).

## 12. Journal do livro (`regras`)

Uma `JournalEntry` "SombraNeon, Livro de Regras" com 10 páginas, uma por capítulo, na ordem do livro (Visão geral, Criação de personagem, Origens, Classes, Antecedentes, Alinhamentos, Cromo e implantes, Equipamento, Hacking e a Rede, Apêndice). Texto convertido do Markdown, com tabelas HTML. Âncoras entre páginas por `@UUID[...]` geradas no build. O capítulo 8 inclui a tabela de custo de vida e serviços. **Sem** texto de terceiros além do que já está no livro do autor.

Permissões: todos os jogadores `OBSERVER`. Página "Apêndice" inclui o mapa Shadowdark para SombraNeon (já no livro).

## 13. Imagens

Sem arte final nesta etapa. Convenção: `systems/sombraneon/assets/icons/<tipo>-<nome>.svg` (monocromáticos, `currentColor`), gerados por script a partir de um pequeno conjunto de formas, ou ícones do core (`icons/svg/...`) quando existirem (verifique na instalação). Todo documento deve ter `img` válido; o `validate` checa que o arquivo existe.

## 14. Atualização e migração de conteúdo

- Conteúdo muda por versão do livro. Cada release gera `CHANGELOG.md` com adições e mudanças.
- Para mudar mecânica sem quebrar mundos, **mantenha o `identifier`** e aumente `flags.sombraneon.schemaVersion`; a migração de mundo (`02` seção 8) atualiza os itens embutidos nos atores quando o conteúdo de origem ganha campos novos (opcional e sempre com backup).
- Itens embutidos em atores são **cópias**: alterar o compêndio não muda fichas já criadas. Ofereça um botão **"Sincronizar com o compêndio"** no menu do item (Mestre), que mostra a diferença e aplica sob confirmação.
