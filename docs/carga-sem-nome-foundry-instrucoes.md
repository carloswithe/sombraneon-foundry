# Instruções para o Claude Code: módulo Foundry "CARGA SEM NOME" (sistema SombraNeon)

*Gerado em 02/11/2026. Leia este arquivo inteiro antes de escrever qualquer código.*

## 0. Objetivo

Criar um **módulo de aventura do Foundry VTT** chamado **CARGA SEM NOME** (id `sombraneon-carga-sem-nome`) para o sistema **SombraNeon** (id provável `sombraneon`, a confirmar na Fase 0), de forma que o Mestre instale, ative e jogue sem montar nada à mão. "Pronto para jogar" significa:

1. **Compêndios** com todas as fichas de **Ameaças**, **NPCs**, **Runners prontos**, **Equipamentos** e **Tesouros** (atores e itens do sistema, com imagens e descrições).
2. **Cenas** (uma por mapa) com **grade configurada, paredes, portas, luzes e tokens já posicionados**, e anotações (pins) ligadas aos diários.
3. **Diários (journals)** configurados: visão geral e verdades (só Mestre), um diário por sala com os blocos "Para ler", resoluções, complicações e disposição das ameaças, o FAQ do briefing e os handouts dos jogadores, a ficha de missão e o Debrief.
4. **Tabelas de rolagem** para as complicações de cada sala e para os efeitos do Alerta.
5. **README** de instalação e uso, e um **relatório de verificação**.

## 1. Entradas e fonte da verdade

| Arquivo | Papel |
|---|---|
| `carga-sem-nome-aventura.md` | **Fonte da verdade** do texto, das fichas e dos números. É um arquivo de leitura, **sem marcadores HTML**: localize cada ator, item e imagem pelo `id` e pelo nome nos inventários da seção 15. Os layouts de mapa estão no **Anexo A**, no fim deste arquivo. |
| `carga-sem-nome-imagens.md` | Lista de imagens e mapas com os **nomes de arquivo** que o módulo deve referenciar. |
| Pasta do sistema SombraNeon instalado | Esquema real de atores e itens (Fase 0). |

Regras de ouro:

- **Não invente nada.** Número, texto ou regra que não está na aventura vai para a lista de lacunas do relatório, não para o módulo.
- **Não altere o sistema.** O módulo só adiciona dados e, no máximo, macros e estilos próprios.
- Textos ficam em **português do Brasil**, exatamente como na aventura (sem travessões).
- O arquivo de aventura **não tem marcadores HTML**. Cada ator, item, imagem e mapa tem um `id` estável, listado nos inventários da seção 15 junto com o nome e a seção onde aparece (as fichas de atores e itens estão nas seções 12 e 13, com o nome como título; as seis fichas dos runners estão na seção 15; o FAQ são os títulos `### P1.` a `### P10.` da seção 3). Use esses `id` como slugs.

## 2. Fase 0: reconhecimento do sistema (obrigatória, antes de gerar dados)

1. Pergunte ao usuário (uma única vez) o **caminho da pasta de dados do Foundry** e a **versão do Foundry** alvo, se não conseguir descobrir sozinho. Procure `Data/systems/*` por um sistema SombraNeon (`system.json` com `id` ou `title` contendo "sombra" ou "neon").
2. Leia `system.json`, `template.json` e/ou os `DataModel` (`module/data/*.mjs`), as fichas (`sheets`), os tipos de **Actor** e de **Item** declarados e quaisquer pacotes de exemplo.
3. Escreva `MAPEAMENTO.md` com uma tabela **campo da aventura para campo do sistema**: atributos (FOR, DES, CON, INT, SAB, CAR), HP, CA, BL (Blindagem), Edge, slots, créditos, nível, XP, classe, origem, antecedente, alinhamento, Drive, talentos, programas e protocolos, cromo por slot, ataques, traços, Moral, NA, MOV. Marque o que **não tem campo** no sistema.
4. **Se o sistema não estiver instalado ou não tiver esquema utilizável:** use o **Plano B de dados** (seção 9): tipos genéricos `character`, `npc` e `loot`/`item`, com a ficha completa em HTML na biografia ou na descrição, e avise no relatório. O módulo continua jogável.
5. Só depois de `MAPEAMENTO.md` pronto, gere dados.

## 3. Estrutura do módulo

```
sombraneon-carga-sem-nome/
  module.json
  README.md
  RELATORIO.md                 # gerado ao final (seção 14)
  MAPEAMENTO.md                # gerado na Fase 0
  package.json                 # scripts: build, unpack, validar
  lang/pt-BR.json
  styles/sombraneon-carga-sem-nome.css     # caixa "Para ler", segredos, tabelas
  scripts/
    main.mjs                   # opcional: macros de Alerta e cronômetro
    importar.mjs               # Plano B: importa os JSON como documentos do mundo
  src/                         # fontes legíveis, uma pasta por compêndio
    packs/ameacas/*.yml
    packs/npcs/*.yml
    packs/runners/*.yml
    packs/equipamentos/*.yml
    packs/tesouros/*.yml
    packs/diarios/*.yml
    packs/cenas/*.yml
    packs/tabelas/*.yml
  packs/                       # compêndios compilados (LevelDB), gerados pelo build
  assets/
    maps/                      # fundos das cenas (placeholders gerados + arte final)
    img/                       # imagens de cena e handouts
    portraits/                 # retratos verticais de runners e NPCs
    tokens/                    # tokens (recorte feito pelo Mestre; placeholders no início)
    items/                     # ícones de itens
  tools/
    gerar_placeholders.py      # cria os fundos de mapa alinhados à grade
    validar.mjs                # verificações da seção 12
```

## 4. `module.json`

Campos mínimos (confirme os nomes exatos no manifesto da versão alvo do Foundry):

- `id`: `sombraneon-carga-sem-nome`; `title`: "CARGA SEM NOME"; `description`; `version`: `1.0.0`; `authors`.
- `compatibility`: `minimum`, `verified` (a versão do usuário) e, se desejar, `maximum`.
- `relationships.systems`: o sistema SombraNeon (id da Fase 0), tipo `system`.
- `packs`: um item por compêndio, com `name`, `label` (em português), `path` (`packs/<nome>`), `type` (`Actor`, `Item`, `JournalEntry`, `Scene` ou `RollTable`), `system` (id do sistema) e `ownership` (`PLAYER: "NONE"`, `ASSISTANT: "OWNER"`, para o conteúdo não vazar).
- `styles`, `esmodules` (somente se houver `main.mjs`) e `languages`.
- Pastas de compêndio (`folders` nos packs) por categoria: "Sala 1", "Sala 2" etc., "Runners", "Ameaças", "NPCs".

## 5. Convenções de dados

- **`_id` determinístico:** gere os `_id` de 16 caracteres alfanuméricos a partir do `id` (slug) com um hash estável (por exemplo, base62 do SHA-1). Assim, rebuilds não quebram links e os UUIDs ficam previsíveis: `Compendium.sombraneon-carga-sem-nome.<pack>.<Documento>.<_id>`.
- **Links cruzados:** converta menções a NPCs, itens, cenas e salas em `@UUID[...]{rótulo}` nos diários. Todo link precisa resolver (verificado na seção 12).
- **Flags de origem:** em cada documento, `flags.sombraneon-carga-sem-nome.fonte = "<seção da aventura>"` e `flags.sombraneon-carga-sem-nome.id = "<slug>"`.
- **Imagens:** use os nomes de arquivo do arquivo de imagens. Se a arte final ainda não existe, referencie o **placeholder** com o mesmo nome (seção 8.4), de modo que trocar a arte depois não exija editar dados.
- **Permissões:** conteúdo de Mestre com `ownership.default = 0` (nenhuma); handouts e páginas "para jogadores" com `ownership.default = 2` (observador); runners prontos com `default = 0` (o Mestre atribui aos jogadores).

## 6. Atores

### 6.1 Ameaças e NPCs (tipo de ator do sistema para criaturas e NPCs)

Para cada ator dos tipos `ameaca` e `npc` do inventário (seção 15), localizando a ficha pelo nome na seção 12:

- Preencha nome, NA, CA, HP (valor e máximo), BL, MOV, Moral, alinhamento e traços conforme o `MAPEAMENTO.md`.
- Ataques viram **itens embutidos** (arma/ataque) com bônus e dano, ou campos do sistema, o que o esquema pedir.
- Traços e habilidades especiais viram itens do tipo habilidade/traço (ou texto na descrição, se o sistema não tiver o tipo), **com o texto integral**, inclusive modos de combate (por exemplo, "Modo Contenção" e "Modo Letal") e gatilhos.
- Retrato (`img`) e **token prototype**: `texture.src` aponta para `assets/tokens/<id>.webp`; `disposition` -1 (hostil) para ameaças, 0 (neutro) ou 1 (amigável) para NPCs conforme a aventura; `actorLink` falso para ameaças genéricas (cada token com seu HP) e verdadeiro para NPCs únicos; tamanho (`width`/`height` em casas) conforme o porte.
- Biografia/descrição: aparência, motivação, o que sabe, segredo e a dica de interpretação, **somente visíveis ao Mestre**.

### 6.2 Runners prontos (tipo de ator para personagens jogáveis)

Para cada ator do tipo `runner` do inventário, localizando a ficha na seção 15 da aventura:

- Preencha **todos** os campos da ficha: nome de rua, origem, classe, nível, XP, antecedente, alinhamento, gatilho de Edge, Drive, atributos, HP, CA, Edge, slots, talento, habilidades, programas ou protocolos ou Sets, cromo por slot, veículos treinados, créditos.
- Armas, armaduras, equipamento e kits viram **itens embutidos** (com slots, dano e alcance). O que a ficha marca como equipamento especial da missão (acesso, cache, disfarce) mantém a marca na descrição.
- **Recalcule e confira** CA, HP máximo, slots e bônus de ataque com as regras do sistema e registre divergências no relatório. Não corrija a aventura em silêncio.
- Token prototype com `actorLink` verdadeiro, visão ativada, `disposition` 1.
- Retrato vertical em `assets/portraits/<id>.webp`.

## 7. Itens

Para cada item do inventário (`tipo` = `equipamento`, `tesouro` ou `premio`), localizando-o pelo nome na seção 13 da aventura:

- Tipo de item do sistema adequado (arma, armadura, equipamento, implante, programa, butim). Sem tipo adequado, use o tipo genérico e preencha a descrição.
- **Butim** (`tesouro` e `premio`): grave **categoria** (Sucata, Normal, Valioso, Lendário), **XP**, valor de venda, slots, se é **digital** (e a regra de download), **onde está** e **como pegar**. O `premio` recebe a flag `flags.sombraneon-carga-sem-nome.premio = true`.
- Equipamentos: dano, alcance, slots, custo, efeito e quem o recebe (cache, disfarce, loja).
- Ícone em `assets/items/<id>.webp` (placeholder se não houver arte).

## 8. Cenas (uma por mapa)

Cada mapa tem um YAML `mapa:` no **Anexo A** (fim deste arquivo), com o layout em **casas de grade**. Esquema:

```yaml
mapa:
  id: mapa-01
  nome: Nome da cena
  grade: {largura: 30, altura: 20}      # em casas; 1 casa = 1,5 m ("Perto")
  fundo: assets/maps/mapa-01-nome.webp
  paredes:                              # segmentos [x1, y1, x2, y2] em casas
    - [0, 0, 30, 0]
  portas:
    - {id: porta-a, seg: [14, 0, 16, 0], tipo: porta, estado: fechada, cd: 12, nota: "texto"}
  luzes:
    - {x: 15, y: 10, raio: 8, cor: "#ff1744", intensidade: 0.4}
  ameacas:
    - {ator: seguranca-corporativa, nome: "Segurança 1", pos: [12, 3], oculto: false, nota: "texto"}
  pcs_inicio: [[14, 18], [15, 18], [16, 18], [15, 19]]
  pins:
    - {pos: [15, 10], titulo: "Portão", pagina: "sala-1"}
  cobertura:
    - {nome: "Coluna", ret: [10, 8, 11, 9], bonus_ca: 2}
```

### 8.1 Conversão para a cena do Foundry

- **Dimensões:** `width = largura * 100` e `height = altura * 100` pixels (tamanho de grade 100 px). `padding = 0`.
- **Grade:** tipo quadrado, `size: 100`, `distance: 1.5`, `units: "m"` (objeto `grid` nas versões atuais; confirme no schema da versão alvo). Alcances do SombraNeon: Perto 1,5 m (1 casa), Próximo cerca de 9 m (6 casas), Longe é linha de visão.
- **Paredes:** cada segmento vira uma parede com `c = [x1, y1, x2, y2] * 100`. Parede comum bloqueia movimento, visão, luz e som (valores `CONST.WALL_*` normais). **Portas** viram parede com `door: 1` (porta comum) ou `2` (secreta) e `ds: 0` (fechada), `1` (aberta) ou `2` (trancada), conforme `estado`. Janelas (`tipo: janela`) bloqueiam movimento mas deixam passar visão e luz. Guarde `cd` e `nota` em `flags.sombraneon-carga-sem-nome`.
- **Luzes:** cada item vira uma luz ambiente com `x`, `y` em pixels (casas vezes 100), raio em unidades de distância (`raio * 1,5`), cor e intensidade. Cenas escuras (`apagão`, `blecaute`) ganham um segundo estado documentado no diário (não crie cenas duplicadas).
- **Tokens de ameaça:** para cada item em `ameacas`, um token do ator `ator` (UUID do compêndio) em `pos * 100`, nome em `nome`, `hidden` conforme `oculto`, `disposition` hostil, e a `nota` em `flags.sombraneon-carga-sem-nome.nota`. Crie o ator a partir do compêndio com **dados do prototype**; ameaças genéricas repetidas viram tokens separados com HP independente.
- **Tokens dos runners:** coloque os runners da **composição sugerida** da aventura em `pcs_inicio`, um por posição (tokens vinculados aos atores prontos). O Mestre apaga os que não usar.
- **Pins (notas):** cada item de `pins` vira uma nota de mapa ligada à **página** do diário da sala (`entryId` e `pageId`), em `pos * 100`.
- **Visão:** `tokenVision` ligado, `fog.exploration` ligado, `globalLight` desligado (as cenas são interiores e escuras; as luzes do layout iluminam), nível de escuridão compatível com o texto da cena.
- **Navegação:** `navName` curto ("1. Saguão"), `navigation: true`, ordem pela ordem das salas. Defina a vista inicial (`initial`) mostrando a área de `pcs_inicio`.
- **Cobertura e terreno:** sem automação. Descreva em uma nota de cena visível ao Mestre ("Cobertura: Coluna +2 de CA...").

### 8.2 Disposição das ameaças

Além dos tokens, o diário da sala traz a tabela **Disposição das ameaças** da aventura (zona, quem, quantidade, comportamento inicial, gatilho). Os tokens e a tabela precisam concordar. Se não concordarem, registre no relatório e siga o layout YAML.

### 8.3 Fundo e arte final

A arte gerada por IA não vai alinhar perfeitamente com as paredes. Por isso o módulo **sempre** entrega um fundo-placeholder alinhado à grade e deixa a troca simples: salve a arte final com o **mesmo nome de arquivo** e a **mesma proporção**, abra a cena e ajuste escala e posição do fundo até a arte bater com as paredes.

### 8.4 Placeholders (`tools/gerar_placeholders.py`)

Gere, com Pillow, para cada mapa um `.webp` de `largura*100` por `altura*100` pixels: fundo cinza escuro, grade tênue a cada 100 px, retângulos das salas, paredes em traço grosso, portas em cor de destaque, nome da sala no canto, **marcas de coordenadas a cada 5 casas**. Gere também retratos, tokens e ícones placeholder (silhueta simples com as iniciais), todos com os nomes de arquivo do arquivo de imagens. Nunca sobrescreva um arquivo que já exista em `assets/` (pode ser a arte final).

## 9. Diários (JournalEntry)

Crie um **diário por bloco** de conteúdo, com **páginas de texto** (HTML, `format: 1`). Estrutura:

| Diário | Páginas | Visível aos jogadores |
|---|---|---|
| 00 Leia primeiro | Visão geral, a versão de 30 segundos, a verdade (**segredo**), as três pistas, ficha de missão, mapa de tempo, regras de ritmo | Não |
| 01 O Alerta | Escala 0 a 4 e efeitos, regras de falha | Não |
| 02 Briefing e FAQ | O contratante e o "Para ler" do briefing; **uma página por pergunta P1 a P10**; handouts (planta, lista de pessoas, organograma, o que o grupo sabe) | **Handouts e perguntas já respondidas: sim**, o restante não |
| 03 a 07 Sala 1 a Sala 5 | Abertura ("Para ler"), o desafio, **Disposição das ameaças**, **Possíveis resoluções**, **Complicações**, pista da reviravolta, butim, se atrasar, imagens da sala | Não, exceto as imagens liberadas pelo Mestre durante o jogo |
| 08 Debrief | Pagamento, XP, ganchos | Não |
| 09 Cortes e ajuste de nível | Cortes de tempo e ajuste de nível | Não |
| 10 Notas de teste | Checklist | Não |
| Imagens | Uma página de imagem por item do arquivo de imagens, com o texto "Para ler" e a imagem (para o Mestre mostrar aos jogadores) | Não (mostrar via "Mostrar aos jogadores") |

Conversão de formatação:

- **"Para ler"** (blockquote) para `<blockquote class="para-ler">...</blockquote>`, estilizado em `styles/sombraneon-carga-sem-nome.css` (barra lateral na cor de destaque, fonte levemente maior).
- **Segredos do Mestre** (por exemplo, "A verdade") para `<section class="secret">...</section>`, de modo que mesmo páginas legíveis por jogadores não vazem.
- Tabelas Markdown para `<table>` com bordas leves; blocos de código (ficha de missão) para `<pre>`.
- **Imagens** com `<img src="modules/sombraneon-carga-sem-nome/assets/...">`.
- Cada diário de sala tem um **cabeçalho com links**: cena (`@UUID`), ameaças e NPCs da sala, itens e tesouros da sala.

## 10. Tabelas de rolagem (RollTable)

- Uma tabela **d6 por sala** com as **Complicações** (texto integral) e uma tabela do **Alerta** (resultado por nível 1 a 4, fórmula `1d4`, sem sorteio automático: serve de consulta).
- Outras tabelas d6 ou d8 que a aventura trouxer (rumores, encontros, falhas).
- `formula`, `results` com `range`, `text` e `type` de texto; `replacement` verdadeiro; `displayRoll` verdadeiro.

## 11. Macros e extras (opcionais, só se sobrar tempo)

Só depois de tudo acima estar verificado:

- **Macro "Alerta +1 / -1":** guarda o valor em uma configuração do mundo, publica um cartão de chat com o efeito do nível atual (texto da tabela do Alerta) e avisa no nível 4.
- **Macro "Cronômetro da missão":** contagem em minutos reais, com aviso a 5 e 1 minuto.
- Playlists: não crie (sem áudio na aventura).

## 12. Verificação (`tools/validar.mjs`, rode e cole o resultado no relatório)

1. `module.json` válido e com todos os campos; todos os caminhos de packs, estilos e scripts existem.
2. **Contagens batem com o inventário** (seção 15): atores, itens, cenas, diários, tabelas.
3. Todo `@UUID` dos diários resolve para um documento existente.
4. Todo caminho de imagem existe em `assets/` (placeholder ou arte final).
5. Em cada cena: todas as paredes e portas dentro de `0..largura*100` e `0..altura*100`; número de tokens igual a `ameacas` + `pcs_inicio`; todo token referencia um ator existente; todo pin referencia uma página existente.
6. Conferência matemática dos runners: CA, HP máximo, slots (confronte com o `MAPEAMENTO.md`).
7. Nenhum texto com travessão (em-dash ou en-dash).
8. `ownership` correto: runners e conteúdo de Mestre sem acesso de jogador; handouts do briefing com acesso de observador.
9. Se houver um Foundry acessível, abra o módulo num mundo de teste e registre: ativa sem erro de console, as 5 cenas abrem, as paredes bloqueiam, as luzes acendem, os diários abrem, os links funcionam, os runners abrem a ficha. **Se não for possível rodar o Foundry, diga isso explicitamente no relatório** e liste o que ficou sem teste manual.

## 13. Build e Plano B

- **Plano A (compêndios):** escreva as fontes em `src/packs/<pack>/*.yml` e compile com `@foundryvtt/foundryvtt-cli` (comando `fvtt package pack`). Os parâmetros do CLI mudam entre versões: rode `npx fvtt package --help` e `npx fvtt package pack --help` e use o que a versão instalada aceitar. Os scripts `build` e `unpack` do `package.json` encapsulam isso.
- **Plano B (importação por script):** se o build de compêndios falhar ou a versão do Foundry não aceitar o formato, entregue `scripts/importar.mjs` mais um conjunto de arquivos `data/*.json`. Uma macro "Importar CARGA SEM NOME" cria no mundo, via API (`Actor.create`, `Item.create`, `JournalEntry.create`, `Scene.create`, `RollTable.create`), os mesmos documentos, preservando `_id`. Documente qual plano foi usado.
- Registre no relatório a **versão do Foundry** e do **CLI** usadas.

## 14. README e relatório

**README.md** (para o Mestre, curto): como instalar (copiar para `Data/modules/sombraneon-carga-sem-nome` ou criar link simbólico), ativar no mundo, importar os compêndios (clique direito no compêndio, "Importar todos"), abrir a primeira cena, conceder propriedade dos runners aos jogadores, trocar placeholders pela arte final (nomes de arquivo e proporções), usar as macros opcionais.

**RELATORIO.md** (para o Mestre e para mim): o que foi gerado (contagens), decisões de mapeamento, **lacunas** (campos sem equivalente no sistema, números ausentes na aventura), **divergências** encontradas (matemática das fichas, tokens versus tabela de ameaças), resultado da verificação (seção 12), o que **não foi testado** e uma checklist manual de 12 itens para o Mestre fazer em 15 minutos.

## 15. Inventário desta aventura (gerado a partir de `carga-sem-nome-aventura.md`)

| Elemento | Quantidade |
|---|---|
| Ameaças (atores) | 11 |
| NPCs (atores) | 8 |
| Runners prontos (atores) | 6 |
| Equipamentos (itens) | 10 |
| Tesouros (itens) | 5 |
| Prêmio (item) | 1 |
| Cenas (mapas) | 5 |
| Imagens (arquivos em assets) | 41 |
| Salas (diários de sala) | 5 |
| Perguntas do FAQ (páginas de diário) | 10 |


### Atores e itens

**Atores**

| id | tipo | nome | seção da aventura |
|---|---|---|---|
| capanga-caes | ameaca | Capanga dos Cães de Vidro (NA 1) | 12. Ameaças e NPCs |
| atirador-caes | ameaca | Atirador dos Cães de Vidro (NA 1) | 12. Ameaças e NPCs |
| policial-urbano | ameaca | Policial urbano da Guarda (NA 1) | 12. Ameaças e NPCs |
| sargento-teixeira | ameaca | Sargento Teixeira (NA 3), o chefe da escolta | 12. Ameaças e NPCs |
| drone-falcao | ameaca | Falcão, drone da Aegis (NA 1) | 12. Ameaças e NPCs |
| viatura-guarda | ameaca | Viatura da Guarda (NA 3) | 12. Ameaças e NPCs |
| suv-aegis | ameaca | SUV tático da Aegis (NA 4) | 12. Ameaças e NPCs |
| jararaca | ameaca | O Jararaca (objetivo, NA 0), blindado de custódia | 12. Ameaças e NPCs |
| torre-50 | ameaca | Torre .50 e Cabo Rufino (NA 3) | 12. Ameaças e NPCs |
| cerbero | ameaca | Cérbero, robô de exclusão da Guarda (NA 5) | 12. Ameaças e NPCs |
| droid-combate | ameaca | Droid de combate (NA 2) | 12. Ameaças e NPCs |
| dona-ruth | npc | Dona Ruth (Fixer, NA 1) | 12. Ameaças e NPCs |
| tavares | npc | Tavares, o mecânico (NA 1) | 12. Ameaças e NPCs |
| seu-jaci | npc | Seu Jaci, dono da lanchonete (Civil, NA 0) | 12. Ameaças e NPCs |
| motorista-jararaca | npc | Eurico, motorista do Jararaca (Civil, NA 0) | 12. Ameaças e NPCs |
| nest | npc | Nest (Nestor Quaresma), "o Intermediário" (aliado, NA 2) | 12. Ameaças e NPCs |
| daigo-okabe | npc | Daigo Okabe, o ronin (aliado, NA 4) | 12. Ameaças e NPCs |
| capita-voss | npc | Capitã Ingrid Voss (Comandante de segurança, NA 5) | 12. Ameaças e NPCs |
| tesoureira | npc | A Tesoureira do Mercado (Contadora, NA 2) | 12. Ameaças e NPCs |
| tijolo | runner | Ficha 1: TIJOLO (Solo) | 15. Fichas prontas (nível 1) |
| bit | runner | Ficha 2: BIT (Netrunner) | 15. Fichas prontas (nível 1) |
| cinza | runner | Ficha 3: CINZA (Hyperdoc) | 15. Fichas prontas (nível 1) |
| cobra | runner | Ficha 4: COBRA (Ghost) | 15. Fichas prontas (nível 1) |
| fumaca | runner | Ficha 5: FUMAÇA (Rocker) | 15. Fichas prontas (nível 1) |
| corvo | runner | Ficha 6: CORVO (Rigger) | 15. Fichas prontas (nível 1) |

**Itens**

| id | tipo | nome | seção da aventura |
|---|---|---|---|
| item-nest | premio | Nest (Nestor Quaresma), "o Intermediário" (Carga 4417-X) | 13. Equipamentos, tesouros e Prêmio |
| item-rastreador-b | tesouro | Rastreador B-subdérmico da Aegis | 13. Equipamentos, tesouros e Prêmio |
| item-cartao-comando | tesouro | Cartão de comando penitenciário | 13. Equipamentos, tesouros e Prêmio |
| item-caderneta | tesouro | Caderneta do Intermediário | 13. Equipamentos, tesouros e Prêmio |
| item-celula-militar | tesouro | Célula de potência militar | 13. Equipamentos, tesouros e Prêmio |
| item-nucleo-cerbero | tesouro | Núcleo do Cérbero | 13. Equipamentos, tesouros e Prêmio |
| item-kit-resgate | equipamento | Kit de Resgate de Nest | 13. Equipamentos, tesouros e Prêmio |
| item-furgao-tavares | equipamento | Furgão do Tavares (van de carga) | 13. Equipamentos, tesouros e Prêmio |
| item-motos-tavares | equipamento | Duas motos urbanas do Tavares | 13. Equipamentos, tesouros e Prêmio |
| item-tapete-espinhos | equipamento | Tapete de Espinhos | 13. Equipamentos, tesouros e Prêmio |
| item-granadas | equipamento | Duas granadas de fragmentação | 13. Equipamentos, tesouros e Prêmio |
| item-carga-demolicao | equipamento | Carga de Demolição | 13. Equipamentos, tesouros e Prêmio |
| item-macarico-brecha | equipamento | Maçarico de Brecha | 13. Equipamentos, tesouros e Prêmio |
| item-manta-faraday | equipamento | Manta Faraday | 13. Equipamentos, tesouros e Prêmio |
| item-radio-interceptor | equipamento | Rádio Interceptor da Guarda | 13. Equipamentos, tesouros e Prêmio |
| item-cracha-manutencao | equipamento | Coletes e crachás da Ouroboros | 13. Equipamentos, tesouros e Prêmio |


### Cenas (mapas)

| mapa | nome | grade (casas) | fundo | paredes | portas | luzes | tokens de ameaça | início dos runners | pins |
|---|---|---|---|---|---|---|---|---|---|
| mapa-01 | Ferro-Velho Tavares | 30 x 20 | assets/maps/mapa-01-ferro-velho.webp | 14 | 3 | 2 | 4 | 6 | 4 |
| mapa-02 | Posto Meia-Lua | 30 x 20 | assets/maps/mapa-02-posto-meia-lua.webp | 18 | 5 | 2 | 10 | 6 | 7 |
| mapa-03 | Estrada Sem Luz | 36 x 24 | assets/maps/mapa-03-estrada-sem-luz.webp | 19 | 4 | 4 | 3 | 6 | 4 |
| mapa-04 | Entroncamento do Tunel Pluvial | 36 x 24 | assets/maps/mapa-04-tunel-pluvial.webp | 21 | 7 | 5 | 16 | 6 | 6 |
| mapa-05 | Saida Sul e Via Expressa 12 | 36 x 24 | assets/maps/mapa-05-via-expressa.webp | 24 | 3 | 3 | 4 | 6 | 4 |


## 16. Particularidades desta aventura

- **Chefe com gatilho e rendição:** o `sargento-teixeira` (NA 3, ficha de Tropa de choque) não tem modos. Registre no ator o **Cartão de comando** como item embutido (`item-cartao-comando`) e a regra de **Moral**: aos 7 HP ou menos, teste de Moral CD 12; falhou, se rende e entrega o cartão. O cartão abre as **celas, o painel leste e o canil**; usado no painel, solta o Cérbero. A rendição é feita pelo Mestre, não automatizada.
- **O Jararaca como objeto:** o ator `jararaca` (veículo pesado, CA 15, HP 90, BL 5, Lenta, Man. -1) tem **partes** com CA, HP e BL próprios: casco, porta de cada cela (CA 12, HP 20, BL 3), porta do canil (CA 14, HP 25, BL 3), painel leste e porta de serviço (CA 14, HP 10, BL 1, Hack CD 15, **sem hack remoto**) e cabine (CA 15, HP 25, BL 3). Documente as formas de abrir uma cela (cartão, chave do Eurico, cabo no painel leste, Carga de Demolição, Maçarico de brecha) no diário da Sala 4, e a regra **uma cela por vez**. A cena `mapa-04` leva o token do Jararaca e as portas `porta-cela-a` (leste), `porta-cela-b` (oeste) e `porta-canil`.
- **Dois presos que não se veem:** a Cela A (lado leste, lado da lanchonete no Posto) guarda `daigo-okabe`, e a Cela B (lado oeste, lado da estrada) guarda `nest`. Em `mapa-04` os dois são tokens **ocultos** (`oculto: true`); revele cada um só quando a cela dele for aberta. Nunca revele os dois ao mesmo tempo sem a cena do encontro (Sala 5, "O ronin").
- **A torre .50 e o ciclo:** o ator `torre-50` (NA 3, CA 14, HP 18, BL 3) dispara 3 rajadas e recarrega em 1 rodada. Crie um **contador de ciclo** (1, 2, 3, recarga) no diário da Sala 4. A **zona morta** é a faixa de uma casa ao redor do casco; em `mapa-04` ela aparece como regiões de cobertura. A torre não alcança quem está nela.
- **O Cérbero (três cabeças):** o ator `cerbero` (NA 5, CA 15, HP 30, BL 2, 2 ataques por rodada) tem **três cabeças** (Choque, Chumbo, Chama), cada uma com **CA 16, HP 6, BL 1**. Registre as cabeças como três linhas de HP no diário da Sala 4 (um painel com caixas de marcar) e **não automatize** o HP delas: o Mestre aplica 1d6 ao corpo quando uma cabeça quebra. Ele é **isolado da Rede** (como Rex, sem hack) e o **EMP atordoa só a primeira vez**. A **Espera** pelo cartão (CAR ou DES CD 12) dura 1d4+1 rodadas, uma vez por combate. O `item-nucleo-cerbero` é butim Normal (1 XP), extraído com INT CD 12.
- **Droids de combate (opcionais):** dois tokens **ocultos** (`droid-combate`, NA 2 cada) em `mapa-04`, só para o ajuste **Brutal**. Documente o **mostrador Leve / Padrão / Brutal** no diário da Sala 4 e deixe os droids escondidos por padrão.
- **Aliados Nest e Daigo:** `nest` (NA 2, aliado) e `daigo-okabe` (NA 4, aliado) são atores de NPC com **disposição amigável** quando libertados. O `nest` tem **dois estados**: torso sedado (HP 6, CA 10, sem ataques) e equipado com o Kit de Resgate (CA 11, pistola pesada +4 d8; desvantagem em DES e em corpo a corpo até calibrar). Registre os dois estados nas notas do ator e não automatize a desvantagem das próteses. A tabela de encontro entre os dois (Sala 5, "O ronin") fica no diário da Sala 5.
- **Kit de Resgate:** `item-kit-resgate` (próteses, sobretudo, pistola pesada) fica no armário do Tavares e **só sai a quem pedir**. Crie o item no compêndio de equipamento, sem dono. A regra de quem o esquece está na Sala 5.
- **Apagão (Sala 3 e Sala 4):** as cenas `mapa-03` e `mapa-04` têm luzes normais. Documente o estado de apagão no diário (luzes e câmeras do Túnel apagadas de 04:05 a 04:19, e a janela de cortesia se estende para 04:23 se o Alerta chegar a 4 antes da Sala 4). **Não duplique a cena**: ligue e desligue as luzes por macro ou por `flags`.
- **Relógio do Posto (Sala 2):** crie um contador com os marcos 03:30 (chegada), 03:40 (o comboio estaciona), 03:44 (escotilha do lado da lanchonete, Cela A), 03:46 (escotilha do lado da estrada, Cela B), 03:49 (checagem no carregador) e 03:52 (partida).
- **Relógio e Alerta:** crie a macro de **Alerta (0 a 4)** com os textos exatos da aventura. 1: o Falcão vira a câmera na direção do grupo (só o Mestre vê). 2: a escolta confere o rádio a cada minuto e testes de passar despercebido contra a Guarda têm desvantagem. 3: o comboio acelera (corte 2 minutos da Folga da Sala 3) e as barreiras checam crachás (CD 15 para blefar). 4: 2 Viaturas da Guarda (NA 3 cada) chegam em 1d4 + 2 rodadas; no clímax da Sala 4 nada muda, porque o reforço já é a contagem de rodadas. Crie também um **contador de Folga** (minutos, de 8 a 2) para a Sala 3.
- **Contador de rodadas da Beta:** um contador visível no diário da Sala 4 (reforço ao fim da rodada 6, 8 se o pneu da Beta foi cortado, 10 se o rádio foi cortado).
- **Handouts (liberar aos jogadores):** `img-01` (Ruth e a rota, no briefing), `img-02` (mapa da rota), `img-03` (composição do comboio), `img-04` (organograma), `img-05` (o Jararaca em corte), `img-09` (a Rota Vazada, na Sala 1). **Só Mestre:** `img-13` (log do carregador), `img-29` (rastreador, mostrar quando o grupo achar o emissor) e `img-31` (Capitã Voss, só se a voz invadir o rádio). Os demais seguem o campo "Para quem" do arquivo de imagens.
- **O rastreador como item:** o `item-rastreador-b` é butim Valioso. Crie-o como item que o Hyperdoc extrai por cirurgia (INT CD 15). Registre os cinco caminhos (cirurgia, sobrecarga com Ping + Choque, Manta Faraday, plantar o emissor em outro lugar, ignorar) no diário da Sala 5. A **Manta Faraday** corta o sinal, mas a Aegis percebe a perda.
- **Tabelas de rolagem extras:** crie tabelas para as **Complicações** de cada sala (d6 em Salas 1 a 5), as **Complicações da fuga** (d6, inclui a voz de Voss no rádio) e os **eventos do combate da Sala 4** (d6, rolado nas rodadas pares). Crie também uma tabela de **resoluções da perseguição** (os três lances: Rampa Sul CD 12, Praça de Pedágio CD 12 ou Hack CD 12, Docas CD 12) e uma de **destino de Daigo** (Sala 5).
- **Perseguição (regras do Compêndio de Veículos, 2.3):** o Furgão do Tavares (van de carga CA 11, HP 30, BL 1, Man. 0, Normal, 6 assentos, módulos Fumaça e chaff e Pneus reforçados) e as 2 motos urbanas são **atores de veículo** na cena `mapa-05`. As 2 Viaturas da Guarda (`viatura-guarda`, NA 3 cada) e o SUV da Aegis (`suv-aegis`, NA 4, não engaja) também. Documente as **faixas de distância** (Perto, Próximo, Longe, Fora de vista) e a **disputa** (d20 + DES + Manobra, vence quem rola mais; 1 faixa, ou 2 se vencer por 5 ou mais) no diário da Sala 5, sem automatizar. O Cérbero **não persegue** (coleira).
- **Cache e Kit de Emboscada:** o Furgão carrega o **Kit de Emboscada** (`item-tapete-espinhos`, `item-granadas`, `item-carga-demolicao`) e uma bolsa de Sucata (2 faixas, 1 kit médico, 1 caixa de munição). Os itens de equipamento à venda no Tavares (`item-macarico-brecha`, `item-manta-faraday`, `item-radio-interceptor`) ficam no compêndio de itens, sem dono. O `item-cracha-manutencao` fica com o Tavares. A **Granada EMP** (300 cr) é vendida pelo Tavares e está registrada na nota do `item-granadas`.
- **Sem checagem de armas:** a aventura **não usa marcas [F] e [C]**. Todas as fichas entram com todo o equipamento. Não crie marcas de origem.
- **Fichas prontas:** as seis fichas (`tijolo`, `bit`, `cinza`, `cobra`, `fumaca`, `corvo`) têm os valores de CA, HP e bônus da seção 15. Respeite os cálculos escritos. O Corvo é Nat e recusa o jack de interface (pilota com as mãos), então **não** instale o implante Neural nele. A Fumaça é Android (Casco de fábrica +1 CA sem armadura).
- **Ajuste de nível:** a variante de **nível 3 (Corp)** está na seção 14. **Não** inclua atores "Mk II" no módulo: só documente no diário.
- **Riscos conhecidos:** (1) a **perseguição por faixas** é uma regra de mesa do Compêndio de Veículos, sem automação no sistema; descreva no diário e deixe os dados na mão do Mestre. (2) O **rastreio** ("Fora de vista" não encerra a perseguição enquanto o emissor estiver ligado ou o Falcão estiver vivo) é uma regra da aventura. (3) A **Folga** em minutos é uma regra da aventura, não do sistema. (4) O **Falcão** (drone da Aegis, NA 1) não ataca e ignora o grupo; trate como ameaça sem ataques. (5) O **ciclo da torre**, as **cabeças do Cérbero**, a **Espera** e a **zona morta** são regras da aventura; o Mestre as aplica à mão.

## 17. Ordem de trabalho sugerida

1. Fase 0 e `MAPEAMENTO.md`. Pare e mostre ao usuário **só se** houver lacunas graves.
2. Esqueleto do módulo, `module.json`, estilos e `package.json`.
3. Atores (ameaças, NPCs, runners) e itens, com `_id` determinístico.
4. Placeholders de imagem e cenas (paredes, portas, luzes, tokens, pins).
5. Diários e tabelas de rolagem, com links `@UUID`.
6. Build dos compêndios (ou Plano B), validação e README.
7. Relatório final.

---

## Anexo A: layouts dos mapas (YAML)

Um bloco por cena. As coordenadas são em casas de grade (1 casa = 100 unidades no Foundry). Os ids de ator (`ator:`) estão no inventário da seção 15.


### Mapa 01: Ferro-Velho Tavares

```yaml
mapa:
  id: mapa-01
  nome: Ferro-Velho Tavares
  grade: {largura: 30, altura: 20}
  fundo: assets/maps/mapa-01-ferro-velho.webp
  paredes:
    - [0, 0, 30, 0]
    - [30, 0, 30, 20]
    - [30, 20, 0, 20]
    - [0, 20, 0, 12]
    - [0, 10, 0, 0]
    - [0, 17, 12, 17]
    - [16, 17, 30, 17]
    - [17, 0, 17, 9]
    - [17, 9, 22, 9]
    - [24, 9, 30, 9]
    - [3, 3, 9, 3]
    - [9, 3, 9, 6]
    - [9, 6, 3, 6]
    - [3, 6, 3, 3]
  portas:
    - {id: porta-portao, seg: [12, 17, 16, 17], tipo: porta, estado: trancada, cd: 12, nota: "Portão de chapa, trinco eletrônico (hack CD 12) ou ficha de ouro de Ruth"}
    - {id: porta-galpao, seg: [22, 9, 24, 9], tipo: porta, estado: aberta, cd: 9, nota: "Porta do galpão de Tavares"}
    - {id: muro-baixo, seg: [0, 10, 0, 12], tipo: janela, estado: fechada, cd: 12, nota: "Muro baixo, escalada DES CD 12 (entrada pelos fundos)"}
  luzes:
    - {x: 14, y: 18, raio: 6, cor: "#ff9100", intensidade: 0.5}
    - {x: 23, y: 5, raio: 7, cor: "#ffd180", intensidade: 0.6}
  ameacas:
    - {ator: capanga-caes, nome: "Capanga do portão 1", pos: [13, 18], oculto: false, nota: "Posto fixo, pedágio"}
    - {ator: capanga-caes, nome: "Capanga do portão 2", pos: [15, 18], oculto: false, nota: "Posto fixo, pedágio"}
    - {ator: atirador-caes, nome: "Olheiro", pos: [6, 4], oculto: false, nota: "No telhado do contêiner"}
    - {ator: tavares, nome: "Tavares", pos: [24, 4], oculto: false, nota: "Na bancada"}
  pcs_inicio: [[2, 19], [3, 19], [4, 19], [5, 19], [2, 18], [3, 18]]
  pins:
    - {pos: [14, 17], titulo: "Portão de chapa", pagina: "sala-1"}
    - {pos: [24, 5], titulo: "Bancada do Tavares", pagina: "sala-1"}
    - {pos: [20, 6], titulo: "Furgão e Kit de Emboscada", pagina: "sala-1"}
    - {pos: [27, 6], titulo: "Motos urbanas", pagina: "sala-1"}
  cobertura:
    - {nome: "Pilha de carcaças A", ret: [7, 12, 12, 14], bonus_ca: 2}
    - {nome: "Pilha de carcaças B", ret: [15, 11, 20, 13], bonus_ca: 2}
    - {nome: "Pilha de carcaças C", ret: [3, 14, 7, 16], bonus_ca: 2}
```


### Mapa 02: Posto Meia-Lua

```yaml
mapa:
  id: mapa-02
  nome: Posto Meia-Lua
  grade: {largura: 30, altura: 20}
  fundo: assets/maps/mapa-02-posto-meia-lua.webp
  paredes:
    - [0, 0, 30, 0]
    - [30, 0, 30, 20]
    - [30, 20, 0, 20]
    - [0, 20, 0, 0]
    - [2, 2, 12, 2]
    - [12, 2, 12, 9]
    - [12, 9, 8, 9]
    - [6, 9, 2, 9]
    - [2, 9, 2, 2]
    - [24, 2, 30, 2]
    - [24, 2, 24, 4]
    - [24, 6, 24, 8]
    - [24, 8, 30, 8]
    - [13, 12, 15, 12]
    - [17, 12, 20, 12]
    - [20, 12, 20, 14]
    - [20, 14, 17, 14]
    - [15, 14, 13, 14]
  portas:
    - {id: porta-lanchonete, seg: [6, 9, 8, 9], tipo: porta, estado: aberta, cd: 9, nota: "Entrada da lanchonete"}
    - {id: porta-oficina, seg: [24, 4, 24, 6], tipo: porta, estado: trancada, cd: 12, nota: "Oficina com a celula de reserva (DES CD 12 ou hack)"}
    - {id: escotilha-cela-a, seg: [15, 12, 17, 12], tipo: porta, estado: fechada, cd: 18, nota: "Escotilha da Cela A, lado da lanchonete (abre as 03:44 pelo Sargento)"}
    - {id: escotilha-cela-b, seg: [15, 14, 17, 14], tipo: porta, estado: fechada, cd: 18, nota: "Escotilha da Cela B, lado da estrada (abre as 03:46 pelo Sargento)"}
    - {id: porta-canil, seg: [13, 12, 13, 14], tipo: porta, estado: trancada, cd: 18, nota: "Porta traseira do canil (Cerbero em espera)"}
  luzes:
    - {x: 16, y: 13, raio: 9, cor: "#ffab00", intensidade: 0.7}
    - {x: 7, y: 5, raio: 6, cor: "#ff80ab", intensidade: 0.5}
  ameacas:
    - {ator: policial-urbano, nome: "Policial da Alfa 1", pos: [11, 15], oculto: false, nota: "Distraido, ao lado da Alfa"}
    - {ator: policial-urbano, nome: "Policial da Alfa 2", pos: [5, 4], oculto: false, nota: "No balcao da lanchonete"}
    - {ator: seu-jaci, nome: "Seu Jaci", pos: [8, 3], oculto: false, nota: "Atras do balcao"}
    - {ator: jararaca, nome: "Jararaca", pos: [16, 13], oculto: false, nota: "Blindado de custodia na baia 3, de lado"}
    - {ator: torre-50, nome: "Cabo Rufino na torre", pos: [17, 13], oculto: false, nota: "Domo do teto, escotilha aberta"}
    - {ator: sargento-teixeira, nome: "Sargento Teixeira", pos: [20, 11], oculto: false, nota: "Junto da cabine, vigia a troca, leva o cartao"}
    - {ator: motorista-jararaca, nome: "Eurico", pos: [19, 15], oculto: false, nota: "Tem a chave mecanica"}
    - {ator: cerbero, nome: "Cerbero (em espera)", pos: [13, 13], oculto: true, nota: "Frio e fechado no canil"}
    - {ator: policial-urbano, nome: "Policial da Beta 1", pos: [23, 14], oculto: false, nota: "Patrulha na saida"}
    - {ator: policial-urbano, nome: "Policial da Beta 2", pos: [25, 14], oculto: false, nota: "Patrulha na saida"}
  pcs_inicio: [[3, 17], [4, 17], [5, 17], [3, 18], [4, 18], [5, 18]]
  pins:
    - {pos: [16, 11], titulo: "Escotilha da Cela A (lado da lanchonete)", pagina: "sala-2"}
    - {pos: [16, 15], titulo: "Escotilha da Cela B (lado da estrada)", pagina: "sala-2"}
    - {pos: [12, 13], titulo: "Porta traseira do canil", pagina: "sala-2"}
    - {pos: [11, 14], titulo: "Entrada do fosso de manutencao", pagina: "sala-2"}
    - {pos: [18, 11], titulo: "Porta de dados do carregador", pagina: "sala-2"}
    - {pos: [27, 5], titulo: "Celula de potencia militar", pagina: "sala-2"}
    - {pos: [8, 4], titulo: "Balcao do Seu Jaci", pagina: "sala-2"}
  cobertura:
    - {nome: "Pátio de caminhões", ret: [1, 11, 7, 15], bonus_ca: 2}
    - {nome: "Balcão da lanchonete", ret: [3, 3, 11, 4], bonus_ca: 2}
    - {nome: "Pilone de recarga A", ret: [12, 11, 13, 12], bonus_ca: 2}
    - {nome: "Pilone de recarga B", ret: [21, 11, 22, 12], bonus_ca: 2}
```


### Mapa 03: Estrada Sem Luz

```yaml
mapa:
  id: mapa-03
  nome: Estrada Sem Luz
  grade: {largura: 36, altura: 24}
  fundo: assets/maps/mapa-03-estrada-sem-luz.webp
  paredes:
    - [0, 0, 36, 0]
    - [36, 0, 36, 24]
    - [36, 24, 0, 24]
    - [0, 24, 0, 0]
    - [0, 7, 18, 7]
    - [24, 7, 30, 7]
    - [30, 0, 30, 3]
    - [30, 5, 30, 7]
    - [30, 7, 36, 7]
    - [30, 17, 36, 17]
    - [0, 17, 8, 17]
    - [10, 17, 30, 17]
    - [2, 19, 6, 19]
    - [6, 19, 6, 23]
    - [2, 19, 2, 23]
    - [14, 19, 19, 19]
    - [21, 19, 26, 19]
    - [26, 19, 26, 23]
    - [14, 19, 14, 23]
  portas:
    - {id: rampa-aqueduto, seg: [18, 7, 24, 7], tipo: porta, estado: aberta, cd: 9, nota: "Rampa para a estrada de serviço do Aqueduto (rota furtiva)"}
    - {id: porta-manutencao, seg: [30, 3, 30, 5], tipo: porta, estado: trancada, cd: 12, nota: "Porta de manutencao do Tunel (hack CD 12 ou DES CD 12)"}
    - {id: beco-galpoes, seg: [8, 17, 10, 17], tipo: porta, estado: aberta, cd: 9, nota: "Beco entre galpoes"}
    - {id: porta-galpao-b, seg: [19, 19, 21, 19], tipo: porta, estado: fechada, cd: 12, nota: "Galpao B, esconderijo para veiculos"}
  luzes:
    - {x: 6, y: 12, raio: 5, cor: "#ffab00", intensidade: 0.4}
    - {x: 14, y: 12, raio: 6, cor: "#ff1744", intensidade: 0.6}
    - {x: 24, y: 12, raio: 5, cor: "#ffab00", intensidade: 0.4}
    - {x: 32, y: 12, raio: 4, cor: "#00e5ff", intensidade: 0.3}
  ameacas:
    - {ator: policial-urbano, nome: "Policial da Barreira 1", pos: [11, 10], oculto: false, nota: "Posto fixo, o mais velho"}
    - {ator: policial-urbano, nome: "Policial da Barreira 2", pos: [13, 14], oculto: false, nota: "Posto fixo, o mais novo"}
    - {ator: drone-falcao, nome: "Falcao", pos: [22, 3], oculto: false, nota: "Patrulha alta"}
  pcs_inicio: [[1, 11], [1, 12], [1, 13], [2, 11], [2, 12], [2, 13]]
  pins:
    - {pos: [12, 12], titulo: "Barreira da Guarda", pagina: "sala-3"}
    - {pos: [21, 7], titulo: "Rampa do Aqueduto", pagina: "sala-3"}
    - {pos: [31, 12], titulo: "Boca norte do Tunel", pagina: "sala-3"}
    - {pos: [30, 4], titulo: "Porta de manutencao", pagina: "sala-3"}
  cobertura:
    - {nome: "Cones e viatura da Barreira", ret: [11, 11, 14, 13], bonus_ca: 2}
    - {nome: "Carcaças da avenida", ret: [20, 10, 23, 12], bonus_ca: 2}
    - {nome: "Vans da Aegis na boca do Túnel", ret: [27, 10, 30, 14], bonus_ca: 2}
```


### Mapa 04: O Entroncamento do Túnel Pluvial

```yaml
mapa:
  id: mapa-04
  nome: Entroncamento do Tunel Pluvial
  grade: {largura: 36, altura: 24}
  fundo: assets/maps/mapa-04-tunel-pluvial.webp
  paredes:
    - [0, 0, 13, 0]
    - [23, 0, 36, 0]
    - [36, 0, 36, 24]
    - [36, 24, 23, 24]
    - [13, 24, 0, 24]
    - [0, 24, 0, 0]
    - [1, 6, 7, 6]
    - [7, 6, 7, 9]
    - [7, 11, 7, 14]
    - [7, 14, 1, 14]
    - [1, 14, 1, 6]
    - [29, 10, 35, 10]
    - [29, 10, 29, 14]
    - [29, 16, 29, 20]
    - [29, 20, 35, 20]
    - [35, 10, 35, 20]
    - [17, 5, 17, 7]
    - [17, 9, 17, 12]
    - [17, 12, 19, 12]
    - [19, 12, 19, 9]
    - [19, 7, 19, 5]
  portas:
    - {id: boca-norte, seg: [13, 0, 23, 0], tipo: porta, estado: aberta, cd: 9, nota: "Boca norte do Tunel, por onde entra o comboio"}
    - {id: saida-sul, seg: [13, 24, 23, 24], tipo: porta, estado: aberta, cd: 9, nota: "Saida sul para a Via Expressa 12"}
    - {id: porta-dutos, seg: [7, 9, 7, 11], tipo: porta, estado: fechada, cd: 9, nota: "Sala de dutos oeste (curto-circuito na complicacao 3)"}
    - {id: porta-bombas, seg: [29, 14, 29, 16], tipo: porta, estado: trancada, cd: 12, nota: "Casa de bombas leste"}
    - {id: porta-canil, seg: [17, 5, 19, 5], tipo: porta, estado: trancada, cd: 18, nota: "Canil do Cerbero (cartao no painel leste, emergencia apos 3 rodadas, ou tranca manual FOR CD 12)"}
    - {id: porta-cela-a, seg: [19, 7, 19, 9], tipo: porta, estado: trancada, cd: 18, nota: "Cela A (Daigo), lado leste. Cartao, chave do Eurico, cabo CD 15 ou brecha (HP 20, BL 3)"}
    - {id: porta-cela-b, seg: [17, 7, 17, 9], tipo: porta, estado: trancada, cd: 18, nota: "Cela B (Nest), lado oeste. Cartao, chave do Eurico, cabo CD 15 ou brecha (HP 20, BL 3)"}
  luzes:
    - {x: 18, y: 6, raio: 5, cor: "#ff1744", intensidade: 0.25}
    - {x: 18, y: 16, raio: 5, cor: "#ff1744", intensidade: 0.25}
    - {x: 10, y: 12, raio: 4, cor: "#ff1744", intensidade: 0.2}
    - {x: 26, y: 12, raio: 4, cor: "#ff1744", intensidade: 0.2}
    - {x: 18, y: 7, raio: 8, cor: "#ffab00", intensidade: 0.35}
  ameacas:
    - {ator: policial-urbano, nome: "Policial da Alfa 1", pos: [15, 15], oculto: false, nota: "Atordoado, atras da Alfa"}
    - {ator: policial-urbano, nome: "Policial da Alfa 2", pos: [20, 15], oculto: false, nota: "Atordoado, atras da Alfa"}
    - {ator: viatura-guarda, nome: "Viatura Alfa", pos: [18, 14], oculto: false, nota: "Avaria 1 (pneu), nariz no bloqueio"}
    - {ator: jararaca, nome: "Jararaca", pos: [18, 8], oculto: false, nota: "Blindado de custodia, de frente para o sul"}
    - {ator: torre-50, nome: "Torre .50 (Cabo Rufino)", pos: [18, 7], oculto: false, nota: "Ciclo: 3 rajadas e 1 recarga. Zona morta junto ao casco"}
    - {ator: sargento-teixeira, nome: "Sargento Teixeira", pos: [18, 11], oculto: false, nota: "Na cabine; sai na rodada 1 e vai ao painel leste [20,9]"}
    - {ator: motorista-jararaca, nome: "Eurico", pos: [17, 11], oculto: false, nota: "Tem a chave mecanica"}
    - {ator: cerbero, nome: "Cerbero", pos: [18, 5], oculto: true, nota: "Dorme no canil. Sai quando o Sargento usa o cartao ou apos 3 rodadas"}
    - {ator: droid-combate, nome: "Droid de combate 1", pos: [18, 6], oculto: true, nota: "So no ajuste Brutal. Sai com o Cerbero"}
    - {ator: droid-combate, nome: "Droid de combate 2", pos: [17, 6], oculto: true, nota: "So no ajuste Brutal. Sai com o Cerbero"}
    - {ator: daigo-okabe, nome: "Daigo Okabe (Cela A)", pos: [18, 9], oculto: true, nota: "Preso na Cela A, lado leste. Algemado, acordado"}
    - {ator: nest, nome: "Nest (Cela B)", pos: [17, 9], oculto: true, nota: "Torso sedado na Cela B, lado oeste, na cadeira de contencao"}
    - {ator: policial-urbano, nome: "Policial da Beta 1", pos: [16, 2], oculto: false, nota: "Chama o reforco na rodada 1"}
    - {ator: policial-urbano, nome: "Policial da Beta 2", pos: [20, 2], oculto: false, nota: "Chama o reforco na rodada 1"}
    - {ator: viatura-guarda, nome: "Viatura Beta", pos: [18, 1], oculto: false, nota: "Engata a re"}
    - {ator: drone-falcao, nome: "Falcao", pos: [30, 3], oculto: false, nota: "Paira, nao ataca"}
  pcs_inicio: [[12, 12], [14, 12], [26, 12], [27, 13], [22, 19], [14, 20]]
  pins:
    - {pos: [20, 9], titulo: "Painel leste (cartao libera o canil) e porta de servico (cabo, CD 15)", pagina: "sala-4"}
    - {pos: [20, 8], titulo: "Porta da Cela A (Daigo)", pagina: "sala-4"}
    - {pos: [16, 8], titulo: "Porta da Cela B (Nest)", pagina: "sala-4"}
    - {pos: [18, 4], titulo: "Porta traseira do canil", pagina: "sala-4"}
    - {pos: [18, 17], titulo: "Bloqueio (Furgao e carcacas)", pagina: "sala-4"}
    - {pos: [18, 12], titulo: "Passarela elevada (sobre a cabine)", pagina: "sala-4"}
  cobertura:
    - {nome: "Pilar NO", ret: [12, 6, 13, 7], bonus_ca: 2}
    - {nome: "Pilar NE", ret: [23, 6, 24, 7], bonus_ca: 2}
    - {nome: "Pilar SO", ret: [12, 18, 13, 19], bonus_ca: 2}
    - {nome: "Pilar SE", ret: [23, 18, 24, 19], bonus_ca: 2}
    - {nome: "Passarela elevada (vantagem de altura)", ret: [8, 11, 28, 12], bonus_ca: 2}
    - {nome: "Carcaças do bloqueio", ret: [14, 16, 22, 18], bonus_ca: 2}
    - {nome: "Zona morta oeste (casco)", ret: [16, 5, 17, 12], bonus_ca: 2}
    - {nome: "Zona morta leste (casco)", ret: [19, 5, 20, 12], bonus_ca: 2}
```


### Mapa 05: Saída Sul e Via Expressa 12

```yaml
mapa:
  id: mapa-05
  nome: Saida Sul e Via Expressa 12
  grade: {largura: 36, altura: 24}
  fundo: assets/maps/mapa-05-via-expressa.webp
  paredes:
    - [0, 0, 13, 0]
    - [23, 0, 36, 0]
    - [36, 0, 36, 24]
    - [36, 24, 0, 24]
    - [0, 24, 0, 0]
    - [14, 9, 16, 9]
    - [16, 9, 16, 13]
    - [16, 13, 14, 13]
    - [14, 13, 14, 9]
    - [20, 9, 22, 9]
    - [22, 9, 22, 13]
    - [22, 13, 20, 13]
    - [20, 13, 20, 9]
    - [2, 16, 10, 16]
    - [10, 16, 10, 20]
    - [10, 20, 2, 20]
    - [2, 20, 2, 16]
    - [26, 16, 34, 16]
    - [34, 16, 34, 20]
    - [34, 20, 26, 20]
    - [26, 20, 26, 16]
    - [13, 18, 24, 18]
    - [24, 18, 24, 22]
    - [13, 18, 13, 22]
  portas:
    - {id: saida-tunel, seg: [13, 0, 23, 0], tipo: porta, estado: aberta, cd: 9, nota: "Saida sul do Tunel (rampa alagada)"}
    - {id: cancela-pedagio, seg: [16, 11, 20, 11], tipo: porta, estado: fechada, cd: 12, nota: "Cancelas do pedagio (hack CD 12 ou pilotagem CD 12)"}
    - {id: galpao-docas, seg: [18, 18, 20, 18], tipo: porta, estado: aberta, cd: 9, nota: "Galpao das Docas, esconderijo possivel"}
  luzes:
    - {x: 18, y: 3, raio: 6, cor: "#ff6d00", intensidade: 0.5}
    - {x: 18, y: 11, raio: 6, cor: "#ff1744", intensidade: 0.4}
    - {x: 18, y: 20, raio: 6, cor: "#ff6d00", intensidade: 0.4}
  ameacas:
    - {ator: viatura-guarda, nome: "Viatura da Guarda 1", pos: [16, 1], oculto: false, nota: "Persegue"}
    - {ator: viatura-guarda, nome: "Viatura da Guarda 2", pos: [20, 1], oculto: false, nota: "Persegue"}
    - {ator: suv-aegis, nome: "SUV da Aegis", pos: [30, 9], oculto: false, nota: "Segue a Longe, sem atacar"}
    - {ator: drone-falcao, nome: "Falcao", pos: [26, 3], oculto: false, nota: "Paira alto"}
  pcs_inicio: [[15, 3], [16, 3], [17, 3], [18, 3], [19, 3], [20, 3]]
  pins:
    - {pos: [18, 2], titulo: "Lance 1: a rampa alagada", pagina: "sala-5"}
    - {pos: [18, 11], titulo: "Lance 2: a praca de pedagio", pagina: "sala-5"}
    - {pos: [18, 21], titulo: "Lance 3: as Docas", pagina: "sala-5"}
    - {pos: [30, 20], titulo: "Ponto de encontro (Mare / Aurora)", pagina: "sala-5"}
  cobertura:
    - {nome: "Guaritas do pedágio", ret: [14, 9, 22, 13], bonus_ca: 2}
    - {nome: "Contêineres oeste", ret: [2, 16, 10, 20], bonus_ca: 2}
    - {nome: "Contêineres leste", ret: [26, 16, 34, 20], bonus_ca: 2}
```
