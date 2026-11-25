# Instruções para o Claude Code: módulo Foundry "CERCO AO REFÚGIO" (sistema SombraNeon)

*Gerado em 19/11/2026. Leia este arquivo inteiro antes de escrever qualquer código.*

## 0. Objetivo

Criar um **módulo de aventura do Foundry VTT** chamado **CERCO AO REFÚGIO** (id `sombraneon-cerco-ao-refugio`) para o sistema **SombraNeon** (id provável `sombraneon`, a confirmar na Fase 0), de forma que o Mestre instale, ative e jogue sem montar nada à mão. "Pronto para jogar" significa:

1. **Compêndios** com todas as fichas de **Ameaças**, **NPCs**, **Runners prontos**, **Equipamentos** e **Tesouros** (atores e itens do sistema, com imagens e descrições).
2. **Cenas** (uma por mapa) com **grade configurada, paredes, portas, luzes e tokens já posicionados**, e anotações (pins) ligadas aos diários.
3. **Diários (journals)** configurados: visão geral e verdades (só Mestre), um diário por sala com os blocos "Para ler", resoluções, complicações e disposição das ameaças, o FAQ do briefing e os handouts dos jogadores, a ficha de missão e o Debrief.
4. **Tabelas de rolagem** para as complicações de cada sala e para os efeitos do Alerta.
5. **README** de instalação e uso, e um **relatório de verificação**.

## 1. Entradas e fonte da verdade

| Arquivo | Papel |
|---|---|
| `cerco-ao-refugio-aventura.md` | **Fonte da verdade** de todo o conteúdo: texto, fichas, números, layouts de mapa. |
| `cerco-ao-refugio-imagens.md` | Lista de imagens e mapas com os **nomes de arquivo** que o módulo deve referenciar. |
| Pasta do sistema SombraNeon instalado | Esquema real de atores e itens (Fase 0). |

Regras de ouro:

- **Não invente nada.** Número, texto ou regra que não está na aventura vai para a lista de lacunas do relatório, não para o módulo.
- **Não altere o sistema.** O módulo só adiciona dados e, no máximo, macros e estilos próprios.
- Textos ficam em **português do Brasil**, exatamente como na aventura (sem travessões).
- Marcadores HTML da aventura (`<!-- ATOR ... -->`, `<!-- ITEM ... -->`, `<!-- IMG ... -->`, `<!-- MAP ... -->`, `<!-- FAQ -->`) delimitam cada elemento e dão o `id` estável. Use esses `id` como slugs.

## 2. Fase 0: reconhecimento do sistema (obrigatória, antes de gerar dados)

1. Pergunte ao usuário (uma única vez) o **caminho da pasta de dados do Foundry** e a **versão do Foundry** alvo, se não conseguir descobrir sozinho. Procure `Data/systems/*` por um sistema SombraNeon (`system.json` com `id` ou `title` contendo "sombra" ou "neon").
2. Leia `system.json`, `template.json` e/ou os `DataModel` (`module/data/*.mjs`), as fichas (`sheets`), os tipos de **Actor** e de **Item** declarados e quaisquer pacotes de exemplo.
3. Escreva `MAPEAMENTO.md` com uma tabela **campo da aventura para campo do sistema**: atributos (FOR, DES, CON, INT, SAB, CAR), HP, CA, BL (Blindagem), Edge, slots, créditos, nível, XP, classe, origem, antecedente, alinhamento, Drive, talentos, programas e protocolos, cromo por slot, ataques, traços, Moral, NA, MOV. Marque o que **não tem campo** no sistema.
4. **Se o sistema não estiver instalado ou não tiver esquema utilizável:** use o **Plano B de dados** (seção 9): tipos genéricos `character`, `npc` e `loot`/`item`, com a ficha completa em HTML na biografia ou na descrição, e avise no relatório. O módulo continua jogável.
5. Só depois de `MAPEAMENTO.md` pronto, gere dados.

## 3. Estrutura do módulo

```
sombraneon-cerco-ao-refugio/
  module.json
  README.md
  RELATORIO.md                 # gerado ao final (seção 14)
  MAPEAMENTO.md                # gerado na Fase 0
  package.json                 # scripts: build, unpack, validar
  lang/pt-BR.json
  styles/sombraneon-cerco-ao-refugio.css     # caixa "Para ler", segredos, tabelas
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

- `id`: `sombraneon-cerco-ao-refugio`; `title`: "CERCO AO REFÚGIO"; `description`; `version`: `1.0.0`; `authors`.
- `compatibility`: `minimum`, `verified` (a versão do usuário) e, se desejar, `maximum`.
- `relationships.systems`: o sistema SombraNeon (id da Fase 0), tipo `system`.
- `packs`: um item por compêndio, com `name`, `label` (em português), `path` (`packs/<nome>`), `type` (`Actor`, `Item`, `JournalEntry`, `Scene` ou `RollTable`), `system` (id do sistema) e `ownership` (`PLAYER: "NONE"`, `ASSISTANT: "OWNER"`, para o conteúdo não vazar).
- `styles`, `esmodules` (somente se houver `main.mjs`) e `languages`.
- Pastas de compêndio (`folders` nos packs) por categoria: "Sala 1", "Sala 2" etc., "Runners", "Ameaças", "NPCs".

## 5. Convenções de dados

- **`_id` determinístico:** gere os `_id` de 16 caracteres alfanuméricos a partir do `id` (slug) com um hash estável (por exemplo, base62 do SHA-1). Assim, rebuilds não quebram links e os UUIDs ficam previsíveis: `Compendium.sombraneon-cerco-ao-refugio.<pack>.<Documento>.<_id>`.
- **Links cruzados:** converta menções a NPCs, itens, cenas e salas em `@UUID[...]{rótulo}` nos diários. Todo link precisa resolver (verificado na seção 12).
- **Flags de origem:** em cada documento, `flags.sombraneon-cerco-ao-refugio.fonte = "<seção da aventura>"` e `flags.sombraneon-cerco-ao-refugio.id = "<slug>"`.
- **Imagens:** use os nomes de arquivo do arquivo de imagens. Se a arte final ainda não existe, referencie o **placeholder** com o mesmo nome (seção 8.4), de modo que trocar a arte depois não exija editar dados.
- **Permissões:** conteúdo de Mestre com `ownership.default = 0` (nenhuma); handouts e páginas "para jogadores" com `ownership.default = 2` (observador); runners prontos com `default = 0` (o Mestre atribui aos jogadores).

## 6. Atores

### 6.1 Ameaças e NPCs (tipo de ator do sistema para criaturas e NPCs)

Para cada bloco `<!-- ATOR ... tipo="ameaca" -->` ou `tipo="npc"`:

- Preencha nome, NA, CA, HP (valor e máximo), BL, MOV, Moral, alinhamento e traços conforme o `MAPEAMENTO.md`.
- Ataques viram **itens embutidos** (arma/ataque) com bônus e dano, ou campos do sistema, o que o esquema pedir.
- Traços e habilidades especiais viram itens do tipo habilidade/traço (ou texto na descrição, se o sistema não tiver o tipo), **com o texto integral**, inclusive modos de combate (por exemplo, "Modo Contenção" e "Modo Letal") e gatilhos.
- Retrato (`img`) e **token prototype**: `texture.src` aponta para `assets/tokens/<id>.webp`; `disposition` -1 (hostil) para ameaças, 0 (neutro) ou 1 (amigável) para NPCs conforme a aventura; `actorLink` falso para ameaças genéricas (cada token com seu HP) e verdadeiro para NPCs únicos; tamanho (`width`/`height` em casas) conforme o porte.
- Biografia/descrição: aparência, motivação, o que sabe, segredo e a dica de interpretação, **somente visíveis ao Mestre**.

### 6.2 Runners prontos (tipo de ator para personagens jogáveis)

Para cada `<!-- ATOR ... tipo="runner" -->`:

- Preencha **todos** os campos da ficha: nome de rua, origem, classe, nível, XP, antecedente, alinhamento, gatilho de Edge, Drive, atributos, HP, CA, Edge, slots, talento, habilidades, programas ou protocolos ou Sets, cromo por slot, veículos treinados, créditos.
- Armas, armaduras, equipamento e kits viram **itens embutidos** (com slots, dano e alcance). O que a ficha marca como equipamento especial da missão (acesso, cache, disfarce) mantém a marca na descrição.
- **Recalcule e confira** CA, HP máximo, slots e bônus de ataque com as regras do sistema e registre divergências no relatório. Não corrija a aventura em silêncio.
- Token prototype com `actorLink` verdadeiro, visão ativada, `disposition` 1.
- Retrato vertical em `assets/portraits/<id>.webp`.

## 7. Itens

Para cada `<!-- ITEM ... -->` (`tipo` = `equipamento`, `tesouro` ou `premio`):

- Tipo de item do sistema adequado (arma, armadura, equipamento, implante, programa, butim). Sem tipo adequado, use o tipo genérico e preencha a descrição.
- **Butim** (`tesouro` e `premio`): grave **categoria** (Sucata, Normal, Valioso, Lendário), **XP**, valor de venda, slots, se é **digital** (e a regra de download), **onde está** e **como pegar**. O `premio` recebe a flag `flags.sombraneon-cerco-ao-refugio.premio = true`.
- Equipamentos: dano, alcance, slots, custo, efeito e quem o recebe (cache, disfarce, loja).
- Ícone em `assets/items/<id>.webp` (placeholder se não houver arte).

## 8. Cenas (uma por bloco MAP)

Cada bloco `<!-- MAP ... -->` traz um YAML `mapa:` com o layout em **casas de grade**. Esquema:

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
- **Paredes:** cada segmento vira uma parede com `c = [x1, y1, x2, y2] * 100`. Parede comum bloqueia movimento, visão, luz e som (valores `CONST.WALL_*` normais). **Portas** viram parede com `door: 1` (porta comum) ou `2` (secreta) e `ds: 0` (fechada), `1` (aberta) ou `2` (trancada), conforme `estado`. Janelas (`tipo: janela`) bloqueiam movimento mas deixam passar visão e luz. Guarde `cd` e `nota` em `flags.sombraneon-cerco-ao-refugio`.
- **Luzes:** cada item vira uma luz ambiente com `x`, `y` em pixels (casas vezes 100), raio em unidades de distância (`raio * 1,5`), cor e intensidade. Cenas escuras (`apagão`, `blecaute`) ganham um segundo estado documentado no diário (não crie cenas duplicadas).
- **Tokens de ameaça:** para cada item em `ameacas`, um token do ator `ator` (UUID do compêndio) em `pos * 100`, nome em `nome`, `hidden` conforme `oculto`, `disposition` hostil, e a `nota` em `flags.sombraneon-cerco-ao-refugio.nota`. Crie o ator a partir do compêndio com **dados do prototype**; ameaças genéricas repetidas viram tokens separados com HP independente.
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

- **"Para ler"** (blockquote) para `<blockquote class="para-ler">...</blockquote>`, estilizado em `styles/sombraneon-cerco-ao-refugio.css` (barra lateral na cor de destaque, fonte levemente maior).
- **Segredos do Mestre** (por exemplo, "A verdade") para `<section class="secret">...</section>`, de modo que mesmo páginas legíveis por jogadores não vazem.
- Tabelas Markdown para `<table>` com bordas leves; blocos de código (ficha de missão) para `<pre>`.
- **Imagens** com `<img src="modules/sombraneon-cerco-ao-refugio/assets/...">`.
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
- **Plano B (importação por script):** se o build de compêndios falhar ou a versão do Foundry não aceitar o formato, entregue `scripts/importar.mjs` mais um conjunto de arquivos `data/*.json`. Uma macro "Importar CERCO AO REFÚGIO" cria no mundo, via API (`Actor.create`, `Item.create`, `JournalEntry.create`, `Scene.create`, `RollTable.create`), os mesmos documentos, preservando `_id`. Documente qual plano foi usado.
- Registre no relatório a **versão do Foundry** e do **CLI** usadas.

## 14. README e relatório

**README.md** (para o Mestre, curto): como instalar (copiar para `Data/modules/sombraneon-cerco-ao-refugio` ou criar link simbólico), ativar no mundo, importar os compêndios (clique direito no compêndio, "Importar todos"), abrir a primeira cena, conceder propriedade dos runners aos jogadores, trocar placeholders pela arte final (nomes de arquivo e proporções), usar as macros opcionais.

**RELATORIO.md** (para o Mestre e para mim): o que foi gerado (contagens), decisões de mapeamento, **lacunas** (campos sem equivalente no sistema, números ausentes na aventura), **divergências** encontradas (matemática das fichas, tokens versus tabela de ameaças), resultado da verificação (seção 12), o que **não foi testado** e uma checklist manual de 12 itens para o Mestre fazer em 15 minutos.

## 15. Inventário desta aventura (gerado a partir de `cerco-ao-refugio-aventura.md`)

| Elemento | Quantidade |
|---|---|
| Ameaças (atores) | 12 |
| NPCs (atores) | 19 |
| Runners prontos (atores) | 6 |
| Equipamentos (itens) | 2 |
| Tesouros (itens) | 3 |
| Prêmio (item) | 1 |
| Cenas (mapas) | 6 |
| Imagens (arquivos em assets) | 31 |
| Salas (diários de sala) | 5 |
| Perguntas do FAQ (páginas de diário) | 10 |


### Atores e itens

**Atores**

| id | tipo | nome | seção da aventura |
|---|---|---|---|
| capanga | ameaca | CAPANGA, Cães de Vidro (NA 1) | 12. Ameaças e NPCs |
| atirador-gangue | ameaca | ATIRADOR DE GANGUE, Cães de Vidro (NA 1) | 12. Ameaças e NPCs |
| seguranca-corporativa | ameaca | SEGURANÇA CORPORATIVA, Kessler-Tanaka (NA 2) | 12. Ameaças e NPCs |
| drone-vigilancia | ameaca | DRONE DE VIGILÂNCIA, Kessler-Tanaka (NA 1) | 12. Ameaças e NPCs |
| drone-combate | ameaca | DRONE DE COMBATE, Kessler-Tanaka (NA 2) | 12. Ameaças e NPCs |
| cao-cibernetico | ameaca | CÃO CIBERNÉTICO, Kessler-Tanaka (NA 2) | 12. Ameaças e NPCs |
| brandt | ameaca | TEODORO BRANDT, Coordenador de Operações (NA 4) | 12. Ameaças e NPCs |
| coruja | ameaca | CORUJA, Caçadora de sintéticos (NA 5) | 12. Ameaças e NPCs |
| torreta | ameaca | TORRETA DA REDE AURORA (NA 3) | 12. Ameaças e NPCs |
| android-seguranca | ameaca | ANDROID DE SEGURANÇA, Kessler-Tanaka (NA 4) | 12. Ameaças e NPCs |
| enxame-ratos | ameaca | ENXAME DE RATOS (NA 1) | 12. Ameaças e NPCs |
| van-captura | ameaca | VAN DE CAPTURA, Kessler-Tanaka (Van de carga, Médio) | 12. Ameaças e NPCs |
| zaca | npc | ZACA, líder do Grupo de 5 (NA 4, aliado) | 12. Ameaças e NPCs |
| beatriz | npc | IRMÃ BEATRIZ, caseira (Civil, NA 0) | 12. Ameaças e NPCs |
| jonas | npc | JONAS TRILHO, ferroviário (Civil, NA 0) | 12. Ameaças e NPCs |
| clarice | npc | DRA. CLARICE, médica (Médico de beco, NA 1) | 12. Ameaças e NPCs |
| seu-altino | npc | SEU ALTINO, chefe da estação (Civil, NA 0) | 12. Ameaças e NPCs |
| hayashi | npc | DR. HAYASHI, Diretor de Pesquisa (Civil, NA 0) | 12. Ameaças e NPCs |
| ruth | npc | DONA RUTH, fixer do Mercado do Sétimo Andar (Fixer, NA 1) | 12. Ameaças e NPCs |
| ana-paz | npc | ANA PAZ, coordenadora da Rede Aurora (Fixer replicante, NA 1) | 12. Ameaças e NPCs |
| iris | npc | ÍRIS, Casal (Replicante de Companhia, NA 0) | 12. Ameaças e NPCs |
| tomas | npc | TOMÁS, Casal (Biomod, Técnico nato, NA 0) | 12. Ameaças e NPCs |
| dona-nena | npc | DONA NENA, Família (70 anos, Biomod, Sentidos agudos, NA 0) | 12. Ameaças e NPCs |
| antonio | npc | ANTÔNIO, Família (Biomod, Poderoso, NA 0) | 12. Ameaças e NPCs |
| luzia | npc | LUZIA, Família (Biomod, Adaptado a extremos, NA 0) | 12. Ameaças e NPCs |
| caio | npc | CAIO, Família (15 anos, Biomod, Escalador nato, NA 0) | 12. Ameaças e NPCs |
| bia | npc | BIA, Família (8 anos, Biomod, NA 0) | 12. Ameaças e NPCs |
| nzinga | npc | NZINGA, Grupo de 5 (Biomod, Mira biológica, NA 0) | 12. Ameaças e NPCs |
| tembo | npc | TEMBO, Grupo de 5 (Biomod, Anfíbio, NA 0) | 12. Ameaças e NPCs |
| graca | npc | GRAÇA, Grupo de 5 (Biomod, Faro de caçador, NA 0) | 12. Ameaças e NPCs |
| samora | npc | SAMORA, Grupo de 5 (17 anos, Biomod, Reflexos acelerados, NA 0) | 12. Ameaças e NPCs |
| torre | runner | Ficha 1: TORRE (Solo) | 15. Fichas prontas (nível 1, com versão nível 2) |
| cabo | runner | Ficha 2: CABO (Netrunner) | 15. Fichas prontas (nível 1, com versão nível 2) |
| sutura | runner | Ficha 3: SUTURA (Hyperdoc) | 15. Fichas prontas (nível 1, com versão nível 2) |
| veu | runner | Ficha 4: VÉU (Ghost) | 15. Fichas prontas (nível 1, com versão nível 2) |
| coro | runner | Ficha 5: CORO (Rocker) | 15. Fichas prontas (nível 1, com versão nível 2) |
| rotor | runner | Ficha 6: ROTOR (Rigger) | 15. Fichas prontas (nível 1, com versão nível 2) |

**Itens**

| id | tipo | nome | seção da aventura |
|---|---|---|---|
| item-kit-rede | equipamento | Kit da Rede Aurora (a casa, de segunda mão) | 13. Equipamentos, tesouros e Prêmio |
| item-embaralhador | equipamento | Embaralhador de série | 13. Equipamentos, tesouros e Prêmio |
| item-amostra-lote | tesouro | Amostra do Lote (frasco da Dra. Clarice) | 13. Equipamentos, tesouros e Prêmio |
| item-registro-brandt | tesouro | Registro de comando do Brandt | 13. Equipamentos, tesouros e Prêmio |
| item-scanner-coruja | tesouro | Scanner de série da Coruja | 13. Equipamentos, tesouros e Prêmio |
| item-os-doze | premio | Os Doze (o Prêmio, por grupo) | 13. Equipamentos, tesouros e Prêmio |


### Cenas (mapas)

| mapa | nome | grade (casas) | fundo | paredes | portas | luzes | tokens de ameaça | início dos runners | pins |
|---|---|---|---|---|---|---|---|---|---|
| mapa-01 | Igreja inteira | 36 x 24 | assets/maps/mapa-01-igreja-inteira.webp | 21 | 10 | 2 | 7 | 6 | 5 |
| mapa-02 | Pátio e portão | 30 x 20 | assets/maps/mapa-02-patio-portao.webp | 11 | 3 | 1 | 7 | 6 | 3 |
| mapa-03 | A nave por dentro | 24 x 16 | assets/maps/mapa-03-nave-por-dentro.webp | 13 | 6 | 2 | 6 | 6 | 4 |
| mapa-04 | A igreja sitiada | 36 x 24 | assets/maps/mapa-04-a-igreja-sitiada.webp | 21 | 10 | 2 | 9 | 6 | 5 |
| mapa-05 | A cripta | 30 x 20 | assets/maps/mapa-05-a-cripta.webp | 13 | 2 | 3 | 2 | 6 | 3 |
| mapa-06 | Estação do Cais | 30 x 20 | assets/maps/mapa-06-estacao-do-cais.webp | 16 | 5 | 2 | 12 | 6 | 5 |


## 16. Particularidades desta aventura

- **Chefe com modos (Brandt e o esquadrão):** o clímax (Sala 4) tem dois modos que valem para **todo o esquadrão** (Brandt, as 2 Seguranças corporativas e o Drone de combate). Crie dois itens embutidos em cada um desses atores: **"Arsenal: Modo Captura"** (munição de contenção, redes magnéticas, sedativo, cassetetes; a 0 HP o alvo **nocauteia**, sem estar morrendo; quem cai é levado à van) e **"Arsenal: Modo Descarte"** (armas letais; a 0 HP o alvo fica **morrendo**, 1d4 + CON rodadas; a igreja queima). O ator começa com o item do Modo Captura ativo. **A troca de modo é do Mestre** (Brandt "Operação em Descarte") e acontece quando **a van é destruída à vista de todos** ou **metade do esquadrão cai** (2 de 4). Não automatize: descreva o gatilho na ficha.
- **A Bia (alvo de captura):** única exceção do Modo Descarte: os Seguranças ainda tentam levá-la viva. Documente no diário da Sala 4 e no ator `bia`.
- **Estados de cena (mapa-04, a igreja sitiada):** `mapa-04` tem as **mesmas paredes e portas de `mapa-01`**. Crie as paredes uma vez e **duplique a cena**, mudando só os tokens (esquadrão, van no portão leste, torretas e barricadas). Documente o estado **Incêndio** (Modo Descarte) no diário da Sala 4 (nave e sacristia em chamas, perigo de fogo, fumaça), sem criar uma terceira cena. Em `mapa-05` (a cripta) as luzes já nascem apagadas (escuridão); lanterna e Olhos térmicos anulam a desvantagem.
- **Relógio da noite (tempo de história):** relógio de **21:00 a 05:04**. A **Preparação** tem cronômetro real de **30 minutos** (10 min de mesa por hora de história); quando zera, chega a Onda 1. As **chamadas da Ruth** são às **00:00, 03:00 e 04:30**. O **Expresso Interzonas** chega às **05:00** e fecha as portas às **05:04**. O embaralhador dura **40 minutos** (ligar às 04:25 cobre até 05:05). Documente no diário "Relógio" e crie uma macro "Avançar relógio" que soma minutos de história e mostra a hora.
- **Alerta (macro obrigatória, 0 a 4):** crie o marcador "Alerta" e a macro que sobe 1 e mostra o texto do nível. Textos exatos: **0:** Silêncio. A Kessler só tem o endereço. **1:** Nada visível, só para o Mestre: uma van passa devagar na rua e o drone marca a igreja. **2:** Um Drone de vigilância orbita a igreja. Testes de passar despercebido ficam com desvantagem, e a próxima onda chega informada. **3:** Barreira: a Kessler bloqueia o beco e liga um jammer. Rádios e o canal fechado da Ruth caem por 10 minutos. A Rota C passa a exigir um teste extra (CD 15) no primeiro lance. **4:** Resposta da corporação: o ataque principal (Sala 4) adianta em 1d4 rodadas, e 2 Androides de segurança vão para a Estação do Cais e esperam lá. **O Alerta 4 não encerra a aventura.** No clímax (Sala 4) o Alerta **não soma inimigos**.
- **Relógio da Coruja (Sala 4):** contador de **4 estágios**, avançando 1 a cada 2 rodadas (rodadas 2, 4, 6 e 8): 1 galeria do esgoto, 2 porta de ferro da cripta, 3 a cripta (`mapa-05`), 4 escada para a nave. Crie uma macro que avança o estágio e mostra a descrição. A Coruja **não é alvo** da Sala 4 enquanto não chega à cripta. Fora da conta de NA do clímax.
- **Relógio da van (Sala 4):** a van de captura **parte 3 rodadas depois da 1ª captura**. Registre a contagem no diário. Teto do clímax na **rodada 8** (Brandt diz "Operação comprometida" e recua, se o grupo está de pé).
- **Rotas A, B e C (Sala 5):** tempo de cada rota: **A 30 min** (cripta, queimada), **B 25 min** (túnel, queimada), **C 20 min** (fundos e passarela, limpa). Crie uma tabela "Rotas" com a hora de saída, o tempo e o estado (queimada ou limpa) e um diário de escolha. As Rotas A e B têm emboscada (NA 5); a C é limpa (mas o Alerta 3 exige um teste extra, CD 15, no primeiro lance).
- **Códigos e segredos (diário do Mestre, nunca em handout):** **"carga seis"** abre a porta do Seu Altino (flag no ator `seu-altino` e na parede `porta-altino` de `mapa-06`). **Vitrola** é a palavra-gatilho da Íris e **Pardal** é o contragatilho que o Tomás conhece (flags nos atores `iris` e `tomas`). A **verdade** (a Beatriz vendeu as rotas A e B; os doze passaram pelo andar -4; Hayashi quer a Bia de volta) ficam **só nos diários do Mestre**, com a marca "Só Mestre".
- **Handouts liberados aos jogadores:** na Sala 1 e no briefing, `img-01` (planta geral), `img-02` (os doze), `img-03` (organograma da Rede) e `img-04` (o kit), mais os seis retratos `ret-01` a `ret-06` quando cada jogador escolhe a ficha. `img-11` (terminal do escritório) é **Só Mestre**. Os demais são cenas e se mostram na hora indicada em "Quando mostrar".
- **Itens especiais:** `item-kit-rede` (kit de segunda mão: cada item traz o **defeito fixo** na descrição; o grupo pode fazer até **3 trocas**); `item-embaralhador` (40 minutos, cobre até 3 números de série em Perto: Íris, Véu e Rotor; **não engana** o scanner da Coruja nem o Registro dos Androides); `item-registro-brandt` (digital, sem subir o Alerta); `item-os-doze` (Prêmio **por grupo**: 3 XP para cada um dos três grupos que embarca inteiro, não se vende). Crie o Prêmio como item com 3 cargas.
- **Armadilhas (regra da casa):** as 4 armadilhas do kit disparam com **qualquer pessoa** que entre na casa marcada (DES CD 12 ou 2d6 em raio Perto). Crie um token "armadilha" por casa, marcável pelo Mestre. As **torretas** (NA 3, 2 no kit) têm defeito fixo (uma cobre 90 graus, a outra tem sensor ruim).
- **Tabelas extras:** cada sala tem uma tabela **Complicações d6** (Salas 1, 2, 3, 4 e 5). Crie uma RollTable por sala, nomeada "Complicações: Sala N". Não há tabela de rumores nem de encontros aleatórios.
- **Moral:** use os valores das fichas (Capangas e Atirador de gangue **Fraca, CD 18**; Seguranças e Drones **Normal ou Sem medo**; Brandt **Firme, CD 12** aos 7 HP ou quando as duas Seguranças caem). Sem automação: o Mestre rola.
- **Ajuste de nível:** **documente só no diário** (seção 14). Não crie atores "Mk II" nem variantes. A versão nível 3 (tier Corp) troca Capangas por Mercenários e a Coruja vira chefe de combate.
- **Riscos conhecidos (descrever no texto, não automatizar):** **Palavra de Íris** (SAB CD 15, ou CD 12 com o Tomás Perto; Sutura, Cabo e Coro têm respostas específicas); **nocaute sem morrendo** no Modo Captura; **sedativo e redes** do Modo Captura (efeitos de regra da casa); **Colapso** (granada de fragmentação perto da porta principal: DES CD 12 ou 2d6); **pagamento em terços** (d6 x 150 cr, menos 10% da Ruth, mais bônus de abrigo e contato); os **runners de nível 2 começam com 10 XP** (precisam de 20 no total).
- **Fichas prontas dos runners:** são **12 versões** (6 de nível 1 e 6 de nível 2). O módulo cria os 6 atores de nível 1. Os valores de nível 2 estão no texto de cada ficha ("nível 2: ..."); os PDFs e HTMLs oficiais das 12 versões ficam fora do módulo. Não inclua marcas [F] e [C]: esta aventura não tem checagem de armas.

## 17. Ordem de trabalho sugerida

1. Fase 0 e `MAPEAMENTO.md`. Pare e mostre ao usuário **só se** houver lacunas graves.
2. Esqueleto do módulo, `module.json`, estilos e `package.json`.
3. Atores (ameaças, NPCs, runners) e itens, com `_id` determinístico.
4. Placeholders de imagem e cenas (paredes, portas, luzes, tokens, pins).
5. Diários e tabelas de rolagem, com links `@UUID`.
6. Build dos compêndios (ou Plano B), validação e README.
7. Relatório final.
