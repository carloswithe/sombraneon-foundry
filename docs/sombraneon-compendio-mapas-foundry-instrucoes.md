# Instruções para o Claude Code: módulo Foundry "SombraNeon: Compêndio de Mapas Aleatórios"

*Gerado em 2026-11-12. Leia este arquivo inteiro antes de escrever qualquer código.*

## 0. Objetivo

Criar um **módulo do Foundry VTT** de id `sombraneon-compendio-mapas` para o sistema **SombraNeon**, que traga os **100 mapas** do catálogo como **cenas prontas para importar**, com um clique, em qualquer mesa. "Pronto para jogar" significa:

1. **Compêndio de Cenas** com as 100 cenas organizadas em 10 pastas (uma por categoria), cada uma com **fundo, grade de 100 px (1 casa = 1,5 m)**, miniatura e um marcador de **entrada dos runners**.
2. **Compêndio de Diários** com um guia de uso e **uma página por mapa** (descrição, áreas, cobertura, ganchos, ameaças típicas, link para a cena, imagem para mostrar aos jogadores).
3. **Compêndio de Tabelas de rolagem**: sorteio **d100** de mapa, **d10** de categoria, **d10** por categoria, **d8** por tipo de local de contrato e **d20** do pacote essencial. Os resultados são links para as cenas.
4. **Macros** opcionais: "Mapa aleatório" e "Importar mapa por categoria".
5. **Fase 2 opcional**: paredes geradas automaticamente a partir das faixas pretas da arte, sempre com conferência visual.
6. **README** de instalação e **relatório de verificação**.

**Escopo desta versão (decisão do usuário):** as cenas saem com **fundo e grade**, sem paredes, portas, luzes nem tokens. As paredes entram depois, pela Fase 2, mapa por mapa.

## 1. Entradas e fonte da verdade

| Arquivo ou pasta | Papel |
|---|---|
| `sombraneon-compendio-mapas.md` | **Fonte da verdade** de todo o texto: nomes, descrições, áreas, ganchos, ameaças, tabelas de sorteio. |
| `scripts/extrair_mapas.py` (Anexo B.1) | Transforma o catálogo em `trabalho/mapas.json`, com todos os campos de cada mapa. |
| `mapas/` e `thumbs/` | Arte final gerada pelo arquivo `sombraneon-compendio-mapas-geracao.md`. **Pode estar incompleta ou vazia**: o módulo precisa funcionar do mesmo jeito (placeholders). |
| Foundry VTT instalado e o sistema SombraNeon | Só para a Fase 0 (versão e id do sistema). Este módulo **não tem atores nem itens**. |

Regras de ouro:

- **Não invente conteúdo.** Todo texto de mapa vem do catálogo. Lacunas vão para o relatório.
- **Não altere o sistema.** O módulo só adiciona compêndios, assets, estilos e macros próprios.
- Textos em **português do Brasil, sem travessões** (nem em-dash nem en-dash) em tudo que você gerar: dados, README, relatório, mensagens.
- **Nunca sobrescreva arte** que já exista em `assets/maps/` e não seja placeholder (pode ser a arte final do usuário). O `montar_assets.py` já respeita isso.
- Use os **`_id` determinísticos** da seção 14 (função `fid`). Eles não mudam entre builds, então links e UUIDs continuam valendo.

## 2. Fase 0: reconhecimento (obrigatória)

1. Pergunte ao usuário (uma única vez, se não descobrir sozinho): o **caminho da instalação do Foundry** (a pasta que contém `resources/app`), a **pasta de dados** (`Data/`) e a **versão**. Procure em `Data/systems/*/system.json` o sistema SombraNeon (`id` ou `title` com "sombra" ou "neon") e anote o **id do sistema**.
2. **Leia o esquema real** da versão instalada, em `resources/app/common` (esquemas dos documentos e `constants.mjs`). Confirme, para a versão alvo, o nome exato de cada campo que a seção 6 usa (os nomes mudam entre v11, v12, v13 e v14):
   - Cena: grade (`grid`: tipo, `size`, `distance`, `units`), `background.src`, `thumb`, `padding`, `initial`, iluminação global e nível de escuridão (`environment` nas versões novas, `globalLight` e `darkness` nas antigas), `tokenVision`, exploração de névoa, `navigation`, `notes`, `walls`, `folder`, `sort`, `ownership`, `flags`.
   - Nota de mapa (`notes`): `x`, `y`, `text`, `texture`, `iconSize`, `fontSize`, `entryId` opcional.
   - Resultados de tabela (`RollTable.results`): os valores de `CONST.TABLE_RESULT_TYPES` para **texto**, **documento** e **compêndio**, e os campos `documentCollection` e `documentId`.
   - Página de diário: tipos `text` (`text.format` HTML) e `image` (`src`).
   - Macro: tipo `script`.
   - Pastas dentro de compêndios e `packFolders` no manifesto.
3. Grave **`MAPEAMENTO.md`** com uma tabela **campo deste plano, campo do Foundry instalado**, a versão do Foundry e do CLI, e as decisões tomadas.
4. **Teste de empacotamento (piloto):** monte um pacote de teste com **1 cena, 1 pasta e 1 tabela**, compile com `@foundryvtt/foundryvtt-cli` (`npx fvtt package pack`; confira os parâmetros em `--help`), descompile de volta para conferir e, se houver Foundry acessível, abra no mundo de teste. **Se funcionar, use o Plano A (compêndios compilados). Se não, use o Plano B (seção 12).** Registre a escolha.
5. Só então gere dados.

## 3. Estrutura do módulo

```
sombraneon-compendio-mapas/
  module.json
  README.md
  RELATORIO.md                 # ao final (seção 13)
  MAPEAMENTO.md                # da Fase 0
  package.json                 # scripts: build, unpack, validar
  lang/pt-BR.json
  styles/sombraneon-compendio-mapas.css
  scripts/
    main.mjs                   # macros e utilidades (seção 9), se feitas
    importar.mjs               # Plano B
  src/
    packs/cenas/*.yml          # 10 pastas e 100 cenas
    packs/diarios/*.yml        # 11 diários
    packs/tabelas/*.yml        # 14 tabelas
    packs/macros/*.yml         # 2 macros (opcionais)
    patches/paredes/*.yml      # Fase 2: paredes por mapa
  packs/                       # compêndios compilados (build)
  assets/
    maps/<arquivo>.webp        # 100 fundos (arte final ou placeholder)
    thumbs/<arquivo>.webp      # 100 miniaturas de 480 px
    placeholders.json          # ids que ainda são placeholders
  tools/
    validar.mjs                # verificações da seção 11
```

Os scripts de apoio (Anexo B) ficam **fora** do módulo, em `scripts/` da pasta de trabalho, ao lado de `trabalho/mapas.json`.

## 4. Preparação dos dados

1. Grave os scripts do **Anexo B** em `scripts/` da pasta de trabalho.
2. `pip install pillow numpy` (e, só para a Fase 2, `opencv-python-headless scikit-image`).
3. Extraia os mapas: `python3 scripts/extrair_mapas.py sombraneon-compendio-mapas.md trabalho/mapas.json` (deve imprimir `100 mapas`).
4. Monte os assets: `python3 scripts/montar_assets.py <pasta-do-modulo>`. Copia a arte final de `mapas/` e `thumbs/`, cria **placeholders** para o que faltar (grade tênue, coordenadas a cada 5 casas, nome do mapa e a **borda de entrada em laranja**) e grava `assets/placeholders.json`.
5. Confira: `python3 scripts/conferir_imagens.py <pasta-do-modulo>`. Todos os fundos precisam ter **exatamente** `largura x 100` por `altura x 100` pixels. Se uma arte final vier com tamanho diferente, **não use**: refaça com `finalizar_mapa.py` (arquivo de geração) ou mantenha o placeholder e registre no relatório.

## 5. `module.json`

Confirme os nomes de campo no manifesto da versão alvo (Fase 0). Modelo:

```json
{
  "id": "sombraneon-compendio-mapas",
  "title": "SombraNeon: Compêndio de Mapas Aleatórios",
  "description": "100 battlemaps cyberpunk em vista de cima para improviso, campanhas e aventuras. Cenas com grade de 1,5 m, diários, tabelas de sorteio e macros.",
  "version": "1.0.0",
  "authors": [{ "name": "Cacá" }],
  "compatibility": { "minimum": "<mínima>", "verified": "<versão do usuário>" },
  "packs": [
    { "name": "cenas", "label": "Mapas: Cenas", "path": "packs/cenas", "type": "Scene", "system": "<id do sistema>", "ownership": { "PLAYER": "NONE", "ASSISTANT": "OWNER" } },
    { "name": "diarios", "label": "Mapas: Diários", "path": "packs/diarios", "type": "JournalEntry", "system": "<id do sistema>", "ownership": { "PLAYER": "NONE", "ASSISTANT": "OWNER" } },
    { "name": "tabelas", "label": "Mapas: Tabelas de sorteio", "path": "packs/tabelas", "type": "RollTable", "system": "<id do sistema>", "ownership": { "PLAYER": "NONE", "ASSISTANT": "OWNER" } },
    { "name": "macros", "label": "Mapas: Macros", "path": "packs/macros", "type": "Macro", "system": "<id do sistema>", "ownership": { "PLAYER": "NONE", "ASSISTANT": "OWNER" } }
  ],
  "packFolders": [{ "name": "SombraNeon: Mapas", "sorting": "m", "packs": ["cenas", "diarios", "tabelas", "macros"] }],
  "styles": ["styles/sombraneon-compendio-mapas.css"],
  "esmodules": ["scripts/main.mjs"],
  "languages": [{ "lang": "pt-BR", "name": "Português (Brasil)", "path": "lang/pt-BR.json" }]
}
```

- Sem macros, remova o pack `macros`, o `esmodules` e `main.mjs`.
- O campo `system` restringe os compêndios ao SombraNeon. As cenas servem a qualquer sistema: se o usuário quiser usar em outro, ele remove essa linha (diga isso no README).

## 6. Cenas: Fase 1 (fundo e grade)

Uma cena por mapa, **100 no total**, no compêndio `cenas`. Campos (nomes exatos conforme `MAPEAMENTO.md`):

| Campo | Valor |
|---|---|
| `_id` | `fid("scene:<id>")`, por exemplo `scene:m001` (tabela da seção 14) |
| `name` | nome do mapa no catálogo (campo `nome` do `mapas.json`) |
| `folder` | `fid("folder:<cat>")`, a pasta da categoria |
| `sort` | número do mapa x 100 (ordem estável) |
| `width`, `height` | `px_w` e `px_h` do `mapas.json` (largura e altura em casas x 100) |
| `padding` | `0` (a imagem cobre a cena inteira, sem margem) |
| fundo | `modules/sombraneon-compendio-mapas/assets/maps/<arquivo>` |
| miniatura | `modules/sombraneon-compendio-mapas/assets/thumbs/<arquivo>` |
| grade | tipo **quadrada**, `size: 100`, `distance: 1.5`, `units: "m"` |
| `navigation` | `false` (ninguém quer 100 abas na barra de navegação) |
| visão de token | **desligada** (`tokenVision: false`), exploração de névoa desligada |
| iluminação | iluminação global **ligada** e escuridão **0** (a arte já traz a luz; sem paredes, a visão dinâmica só atrapalharia) |
| `walls`, `lights`, `tokens`, `tiles`, `drawings` | listas vazias |
| `ownership` | `{ "default": 0 }` |

**Marcador de entrada.** Cada cena recebe **uma nota de mapa** `Entrada dos runners`, sem link para diário (links de diário de compêndio não resolvem fora do mundo). Posição em pixels, a 50 px da borda indicada em `entrada`:

| `entrada` | x | y |
|---|---|---|
| sul | largura / 2 | altura - 50 |
| norte | largura / 2 | 50 |
| leste | largura - 50 | altura / 2 |
| oeste | 50 | altura / 2 |
| centro | largura / 2 | altura / 2 |

Use o ícone padrão de nota do Foundry instalado (confira que o arquivo existe).

**Flags** em `flags.sombraneon-compendio-mapas` de cada cena:

```yaml
id: m071
categoria: mil
grade: 36x24
ambiente: exterior        # exterior, interior, misto ou rede
luz: claro                # claro, penumbra ou escuro (informativo)
entrada: oeste
cor: neon orange
pacote: true
placeholder: false        # true enquanto o fundo for placeholder
paredes: nenhuma          # nenhuma, auto-v1 ou manual
```

Os valores vêm do `mapas.json`; `placeholder` vem de `assets/placeholders.json`.

**Pastas.** 10 pastas de cena no compêndio, com o nome da categoria (`cat_nome`), `sorting: "m"` e `_id` da seção 14. Ordem: rua, corp, lei, saude, noite, ind, trans, mil, sn, esp.

**Mapas da Rede (`m089` e `m090`).** São espaços virtuais, não lugares físicos. Cena normal, `ambiente: rede`, e **sem Fase 2** (paredes não fazem sentido).

## 7. Diários (compêndio `diarios`)

Onze entradas, todas com `ownership.default = 0` (só Mestre):

| `_id` | Nome | Páginas |
|---|---|---|
| `fid("journal:leia-primeiro")` | 00 Leia primeiro | uma página por seção do catálogo: **O que é**, **Como usar na mesa**, **Grade, escala e tamanhos**, **Tabelas de sorteio**, **Legenda da cor de destaque**, **Pacote essencial** (com links), **Direção de arte**, **Notas finais** |
| `fid("journal:<cat>")` (10) | 01 a 10, com o nome da categoria | **duas páginas por mapa** (abaixo) |

**Páginas de cada mapa** (na ordem do id):

1. **Texto**, nome `M071. Porta-aviões, convoo`, `text.format` HTML, `ownership` herdado. Conteúdo:

```html
<p><strong>Categoria:</strong> <cat_nome> &middot; <strong>Grade:</strong> 36 x 24 (3600 x 2400 px) &middot; <strong>Ambiente:</strong> exterior, luz clara &middot; <strong>Entrada:</strong> oeste &middot; <strong>Cor:</strong> Laranja néon</p>
<p>@UUID[Compendium.sombraneon-compendio-mapas.cenas.Scene.<_id da cena>]{Abrir a cena}</p>
<img src="modules/sombraneon-compendio-mapas/assets/thumbs/<arquivo>" alt="<nome>">
<h3>Descrição</h3><p>...</p>
<h3>Áreas e pontos de interesse</h3><table>...</table>
<h3>Cobertura e perigos</h3><p>...</p>
<h3>Ganchos de uso</h3><ol>...</ol>
<h3>Ameaças típicas</h3><p>...</p>
<details><summary>Prompt para regerar (Gemini)</summary><pre>...</pre></details>
```

2. **Imagem**, nome `Imagem: M071`, tipo `image`, `src` o fundo em `assets/maps/`. O Mestre usa "Mostrar aos jogadores" para revelar o mapa como handout.

Regras de conversão do catálogo: tabelas Markdown viram `<table>` com bordas leves; trechos em negrito viram `<strong>`; cada id de mapa (`m071`) citado nas tabelas do "Leia primeiro" vira `@UUID[...]{M071. Nome}` para a cena. Todo `@UUID` precisa resolver (seção 11).

**Estilos** (`styles/sombraneon-compendio-mapas.css`): tabelas dos diários com borda fina e cabeçalho em cinza, `details` com cursor de ponteiro. Nada que mexa na interface do Foundry fora do conteúdo dos diários.

## 8. Tabelas de rolagem (compêndio `tabelas`)

Quatorze tabelas, todas com `replacement: true`, `displayRoll: true`:

| `_id` | Nome | Fórmula | Resultados |
|---|---|---|---|
| `fid("table:d100")` | Mapa aleatório (d100) | `1d100` | 100 resultados, faixa `[n, n]`, apontando para a cena `mNNN` |
| `fid("table:categoria")` | Categoria de mapa (d10) | `1d10` | 10 resultados de **texto**: nome da categoria e faixa de mapas (por exemplo `Lei e ordem: m021 a m030`) |
| `fid("table:cat-<cat>")` (10) | Mapas: `<categoria>` (d10) | `1d10` | 10 resultados apontando para as cenas da categoria, na ordem |
| `fid("table:local")` | Local do contrato (d8) | `1d8` | 8 resultados de **texto**: tipo de local do livro e as cenas sugeridas, com `@UUID` para cada uma (tabela 4.2 do catálogo) |
| `fid("table:pacote")` | Pacote essencial (d20) | `1d20` | 20 resultados apontando para as cenas marcadas `pacote` |

- Resultado que aponta para cena: use o tipo **compêndio** (ou documento de compêndio, conforme a Fase 0) com `documentCollection: "sombraneon-compendio-mapas.cenas"` e `documentId` igual ao `_id` da cena. Se a versão exigir outro formato, siga `MAPEAMENTO.md`.
- O texto de cada resultado leva o **nome do mapa** (`M071. Porta-aviões, convoo`), para o cartão de chat ficar legível.
- A descrição de cada tabela explica como usar (por exemplo, "Role d10 para a categoria e depois d10 para o mapa").

## 9. Macros (opcional, só depois de tudo verificado)

Compêndio `macros`, tipo `script`, escopo do Mestre:

1. **Mapa aleatório (d100).** Rola a tabela `Mapa aleatório (d100)`, **importa a cena sorteada** do compêndio para o mundo (pasta "Mapas aleatórios", criada se não existir), publica um cartão de chat com **nome, descrição, entrada e ameaças típicas** (lidos do diário correspondente ou das flags) e pergunta se deve **ativar a cena**.
2. **Importar mapa por categoria.** Diálogo com a lista de categorias e, em seguida, dos mapas da categoria (com miniatura); importa o escolhido.

Regras comuns: nunca importar duas vezes a mesma cena (se já existir no mundo uma com `flags.sombraneon-compendio-mapas.id` igual, só a ativa); mensagens em português; sem dependência de outros módulos.

## 10. Fase 2 (opcional, experimental): paredes automáticas

Só **depois** de a Fase 1 estar verificada e **apenas para mapas com arte final** (não placeholder, não `m089`, não `m090`). O usuário escolheu "fundo e grade agora, paredes depois"; esta fase é o "depois".

**Como funciona.** `scripts/detectar_paredes.py` (Anexo B.4) separa as faixas pretas **grossas** (paredes) dos contornos finos (móveis), tira o esqueleto, simplifica em segmentos e fecha frestas pequenas. Grava `paredes/<id>.json` (segmentos em pixels da cena) e uma **sobreposição** em `revisao/paredes-<id>.png` com as paredes em magenta.

**Procedimento, mapa a mapa:**

1. `python3 scripts/detectar_paredes.py m021`.
2. **Abra a sobreposição** e confira: as paredes principais estão cobertas? Há segmentos falsos em móveis? Há grandes frestas em paredes que deveriam ser contínuas? Curvas (salas redondas) podem ficar com frestas pequenas.
3. Ajuste, se precisar: `--espessura-min` (mais alto ignora mais detalhes), `--tolerancia` (mais alto simplifica mais). Rode de novo.
4. **Aprove** só se a sobreposição for fiel. Mapa reprovado fica sem paredes e vai para a lista do relatório.
5. Aplique em `src/patches/paredes/<id>.yml` (um arquivo por mapa, **separado** da fonte da cena, para o build poder reaplicar e para o usuário poder desfazer). Cada segmento vira uma parede com `c: [x1, y1, x2, y2]` e os valores **normais** de bloqueio de movimento, visão, luz e som (use as constantes de `constants.mjs` da versão instalada, não números soltos).
6. Na cena aprovada: `flags...paredes: auto-v1`, `tokenVision: true`, exploração de névoa **ligada**, iluminação global **desligada** e escuridão conforme `luz` (claro 0, penumbra 0,35, escuro 0,6; confirme que o resultado fica legível com as paredes).
7. **Portas e janelas não são detectadas.** Não invente. Se o usuário quiser, uma passada manual com a imagem aberta marca portas (`door`), mas isso é trabalho do Mestre ou de uma segunda rodada pedida por ele.

**Limite de qualidade.** Resultado esperado: paredes retas e contínuas bem cobertas, curvas aproximadas, alguns segmentos a mais ou a menos. Mapa com mais de 700 segmentos ou com aviso de "poucas paredes" é suspeito: reprove e registre.

## 11. Verificação (`tools/validar.mjs`)

Rode e **cole o resultado no relatório**:

1. `module.json` válido; todos os `path` de packs, estilos e scripts existem.
2. **Contagens:** 100 cenas, 10 pastas de cena, 11 diários, 14 tabelas, 0 ou 2 macros.
3. Todo `@UUID` dos diários e das tabelas resolve para um documento existente. Todo `documentId` de resultado existe no pack `cenas`.
4. Todo caminho de imagem (fundo, miniatura, imagem de página) existe em `assets/`.
5. Cada cena: `width` e `height` iguais a `largura x 100` e `altura x 100` do catálogo; grade `size 100`, `distance 1.5`, `units "m"`; `padding 0`; 1 nota de entrada dentro dos limites da cena; `_id` igual ao da seção 14.
6. `python3 scripts/conferir_imagens.py <modulo>` sem erros (tamanho exato de cada fundo).
7. **Nenhum travessão** (em-dash ou en-dash) em nenhum arquivo do módulo.
8. `ownership` correto: tudo sem acesso de jogador.
9. Se houver Foundry acessível: ative o módulo num mundo de teste e registre se **ativa sem erro de console**, se as 100 cenas abrem, se a grade bate com a arte nos 3 mapas piloto, se as tabelas rolam e abrem a cena, se os diários abrem e os links funcionam. **Se não for possível rodar o Foundry, diga isso explicitamente** e liste o que ficou sem teste manual.

## 12. Build e Plano B

- **Plano A (compêndios compilados):** escreva as fontes em `src/packs/<pack>/*.yml` e compile com `@foundryvtt/foundryvtt-cli` (`fvtt package pack`). O CLI exige chaves de documento (`_key`) nas fontes; confira o formato descompilando o pacote piloto da Fase 0. Pastas dentro do compêndio são documentos `Folder` do mesmo pack.
- **Plano B (importação por script):** se o build falhar ou o formato não for aceito, entregue `scripts/importar.mjs` e `data/*.json` com os mesmos documentos. Uma macro "Importar Compêndio de Mapas" cria no mundo, via API (`Folder.create`, `Scene.create`, `JournalEntry.create`, `RollTable.create`), preservando `_id`. Documente qual plano foi usado.
- Registre no relatório a **versão do Foundry** e a **do CLI**.

## 13. README e relatório

**README.md** (para o Mestre, curto): instalar (copiar para `Data/modules/sombraneon-compendio-mapas` ou link simbólico), ativar no mundo, abrir o compêndio "Mapas: Cenas", **importar uma cena** (arrastar para a barra de cenas ou clique direito, "Importar"), usar as tabelas de sorteio, **trocar placeholders pela arte final** (mesmo nome de arquivo e mesmas dimensões em `assets/maps/`), **ajustar escala e posição do fundo** quando a arte de IA não bater exatamente com a grade (ferramenta de alinhamento de grade da cena: use as portas, que têm cerca de 1 casa, como referência), usar a Fase 2.

**RELATORIO.md**: o que foi gerado (contagens), decisões de mapeamento, **lacunas** (campos sem equivalente), quantos mapas estão com **arte final** e quantos com **placeholder**, o resultado da verificação (seção 11), o que **não foi testado**, e uma **checklist manual de 10 itens** para o Mestre fazer em 10 minutos.

## 14. Inventário (gerado a partir do catálogo)

### 14.1 Identificadores determinísticos

Função `fid(chave)` (arquivo `scripts/ids_foundry.py`, Anexo B.5): SHA-1 da chave, base 62, 16 caracteres. As chaves são `scene:<id>`, `folder:<cat>`, `journal:<nome>` e `table:<nome>`.

### 14.2 Pastas de cena e diários

| Tipo | _id | Chave | Nome | Conteúdo |
|---|---|---|---|---|
| Pasta de cenas | `kgV1tEUlWdY748W8` | folder:rua | Ruas e exteriores urbanos | m001 a m010 |
| Pasta de cenas | `5bUqAg7t5MYQqBSE` | folder:corp | Corporativo e comercial | m011 a m020 |
| Pasta de cenas | `XvtobdONmAein4kD` | folder:lei | Lei e ordem | m021 a m030 |
| Pasta de cenas | `C2BNodq2geWJ4eVg` | folder:saude | Saúde e ciência | m031 a m040 |
| Pasta de cenas | `9PM9r2h0EXw4GWDJ` | folder:noite | Moradia e vida noturna | m041 a m050 |
| Pasta de cenas | `YozTX8MRLia3yJ5k` | folder:ind | Indústria, porto e infraestrutura | m051 a m060 |
| Pasta de cenas | `S0VwwLUJ85mBCKYN` | folder:trans | Transporte e aeroportos | m061 a m070 |
| Pasta de cenas | `2UX70lmFGzKjIR2v` | folder:mil | Navios, plataformas e bases militares | m071 a m080 |
| Pasta de cenas | `cDFPpdOCJjQ0gwVe` | folder:sn | Cenários do universo SombraNeon | m081 a m090 |
| Pasta de cenas | `YFg9gr8Oq2bqNZGX` | folder:esp | Subsolo, periferia e locais especiais | m091 a m100 |
| Diário | `MEHWTIlu8eRpB2dn` | journal:leia-primeiro | 00 Leia primeiro | 8 páginas |
| Diário | `SQsliF4p1ufwLhKq` | journal:rua | 01 Ruas e exteriores urbanos | 20 páginas (texto e imagem de cada mapa) |
| Diário | `UikyF8N5Defdma2I` | journal:corp | 02 Corporativo e comercial | 20 páginas (texto e imagem de cada mapa) |
| Diário | `9Y4spDg6WBfuYptP` | journal:lei | 03 Lei e ordem | 20 páginas (texto e imagem de cada mapa) |
| Diário | `rZupDHXDheCQzJ9u` | journal:saude | 04 Saúde e ciência | 20 páginas (texto e imagem de cada mapa) |
| Diário | `2fsayrxvAL30Qolb` | journal:noite | 05 Moradia e vida noturna | 20 páginas (texto e imagem de cada mapa) |
| Diário | `7g6OS1U10qC2jCas` | journal:ind | 06 Indústria, porto e infraestrutura | 20 páginas (texto e imagem de cada mapa) |
| Diário | `pmGak5fbKoPFResK` | journal:trans | 07 Transporte e aeroportos | 20 páginas (texto e imagem de cada mapa) |
| Diário | `P94EDxnkGbg1oTWr` | journal:mil | 08 Navios, plataformas e bases militares | 20 páginas (texto e imagem de cada mapa) |
| Diário | `NCLzDsUjQQWdu99x` | journal:sn | 09 Cenários do universo SombraNeon | 20 páginas (texto e imagem de cada mapa) |
| Diário | `946cNLswvSsRAr9D` | journal:esp | 10 Subsolo, periferia e locais especiais | 20 páginas (texto e imagem de cada mapa) |

### 14.3 Tabelas

| _id | Chave | Nome | Fórmula | Resultados |
|---|---|---|---|---|
| `QUdFpY9QoibnJaTf` | table:d100 | Mapa aleatório (d100) | 1d100 | 100, cena m001 a m100 |
| `Xt3kW9DW6l2rijy7` | table:categoria | Categoria de mapa (d10) | 1d10 | 10, texto |
| `QZH07gYExLK0oSvo` | table:cat-rua | Mapas: Ruas e exteriores urbanos (d10) | 1d10 | 10, cenas da categoria |
| `BiXW93O2TAa5Norl` | table:cat-corp | Mapas: Corporativo e comercial (d10) | 1d10 | 10, cenas da categoria |
| `BKLLYZUPMxBJln9d` | table:cat-lei | Mapas: Lei e ordem (d10) | 1d10 | 10, cenas da categoria |
| `A0xK6wxUM8ppT3Us` | table:cat-saude | Mapas: Saúde e ciência (d10) | 1d10 | 10, cenas da categoria |
| `JYvKTceB7CqaJ4ie` | table:cat-noite | Mapas: Moradia e vida noturna (d10) | 1d10 | 10, cenas da categoria |
| `h7mrvyQDnyoiaPV0` | table:cat-ind | Mapas: Indústria, porto e infraestrutura (d10) | 1d10 | 10, cenas da categoria |
| `KbpdG9bKdCsRcqc3` | table:cat-trans | Mapas: Transporte e aeroportos (d10) | 1d10 | 10, cenas da categoria |
| `BJePtcZrmWrY8VB5` | table:cat-mil | Mapas: Navios, plataformas e bases militares (d10) | 1d10 | 10, cenas da categoria |
| `90Eg1kcMeyPu1pWH` | table:cat-sn | Mapas: Cenários do universo SombraNeon (d10) | 1d10 | 10, cenas da categoria |
| `ErFc1RtA6p2ng5WG` | table:cat-esp | Mapas: Subsolo, periferia e locais especiais (d10) | 1d10 | 10, cenas da categoria |
| `ohZ4UlWJQRBKbUXa` | table:local | Local do contrato (d8) | 1d8 | 8, texto com links |
| `CT9ZtevAzNXjTtdv` | table:pacote | Pacote essencial (d20) | 1d20 | 20, cenas do pacote |

### 14.4 As 100 cenas

Tamanho em pixels = grade x 100. `Pacote` marca os 20 essenciais. Todas com `entrada` conforme o catálogo.

| Id | _id da cena | Nome | Pasta | Grade | Pixels | Entrada | Ambiente | Luz | Cor | Pacote |
|---|---|---|---|---|---|---|---|---|---|---|
| m001 | `1KjZ7CJuRpG5FOOw` | Cruzamento de avenida à noite | rua | 30 x 20 | 3000 x 2000 | sul | exterior | escuro | neon orange | sim |
| m002 | `uasLnBSr8Z1JreMN` | Beco sem saída | rua | 24 x 16 | 2400 x 1600 | sul | exterior | escuro | neon violet | sim |
| m003 | `shlvEJrZLibV5p9g` | Rua do mercado de camelôs | rua | 36 x 24 | 3600 x 2400 | oeste | exterior | penumbra | neon gold |  |
| m004 | `RdQ6DrUt0RuVd3AV` | Baixos de viaduto | rua | 30 x 20 | 3000 x 2000 | norte | exterior | escuro | neon amber |  |
| m005 | `Gujr592NrPp0nNt8` | Praça com fonte e quiosques | rua | 36 x 24 | 3600 x 2400 | leste | exterior | claro | neon magenta |  |
| m006 | `e5hHFIVEwafspPz8` | Estacionamento a céu aberto | rua | 36 x 24 | 3600 x 2400 | sul | exterior | penumbra | neon orange |  |
| m007 | `11X13RBHWdDoJ54n` | Posto de combustível 24h | rua | 24 x 16 | 2400 x 1600 | sul | exterior | penumbra | neon crimson red |  |
| m008 | `xdFYPzVBp5L5RAEm` | Telhado com antenas e caixas d'água | rua | 30 x 20 | 3000 x 2000 | leste | exterior | escuro | electric cyan |  |
| m009 | `oIctx6kZOXc2ZK2m` | Passarela de vidro entre torres | rua | 36 x 24 | 3600 x 2400 | oeste | misto | penumbra | neon crimson red |  |
| m010 | `KC0iSxOI6Iwzixzp` | Rodovia elevada com carros parados | rua | 36 x 24 | 3600 x 2400 | leste | exterior | escuro | neon orange |  |
| m011 | `oUfIL33zIU13dUXj` | Saguão corporativo com catracas | corp | 30 x 20 | 3000 x 2000 | sul | interior | claro | electric cyan | sim |
| m012 | `VBoSFmsEXAwW629w` | Andar de escritórios open space | corp | 36 x 24 | 3600 x 2400 | oeste | interior | claro | neon violet | sim |
| m013 | `sOBFncQ658XEhjY2` | Sala da diretoria com vista panorâmica | corp | 24 x 16 | 2400 x 1600 | leste | interior | penumbra | neon gold |  |
| m014 | `UE850RlO4pU9gs5t` | Agência bancária com salão de atendimento | corp | 30 x 20 | 3000 x 2000 | sul | interior | claro | neon gold |  |
| m015 | `XUTh6V426e2hEXok` | Cofre do banco com porta circular | corp | 24 x 16 | 2400 x 1600 | norte | interior | escuro | neon crimson red |  |
| m016 | `xzqj0acRfvPRia4O` | Shopping center com praça de alimentação | corp | 36 x 24 | 3600 x 2400 | sul | interior | claro | neon magenta |  |
| m017 | `joqWJgJzdkfNRJ4S` | Supermercado de bairro | corp | 30 x 20 | 3000 x 2000 | sul | interior | claro | electric cyan |  |
| m018 | `tI4qWdGDELFop33k` | Garagem subterrânea de torre | corp | 36 x 24 | 3600 x 2400 | leste | interior | escuro | neon orange |  |
| m019 | `ZoyJQrGtjZvHWEbn` | Núcleo de elevadores e escadas de emergência | corp | 24 x 16 | 2400 x 1600 | sul | interior | penumbra | neon crimson red |  |
| m020 | `yvs3WdqOngsdf9ze` | Cobertura com heliponto da torre | corp | 30 x 20 | 3000 x 2000 | oeste | exterior | escuro | neon orange |  |
| m021 | `PZYTbhOYtbreDvs9` | Delegacia de bairro, recepção e plantão | lei | 30 x 20 | 3000 x 2000 | sul | interior | claro | electric cyan | sim |
| m022 | `zATE76FlMfb7Ch8u` | Sala de interrogatório e sala de observação | lei | 24 x 16 | 2400 x 1600 | oeste | interior | penumbra | neon violet |  |
| m023 | `mmnIXsjHJCrA963H` | Depósito de evidências apreendidas | lei | 30 x 20 | 3000 x 2000 | oeste | interior | penumbra | neon gold |  |
| m024 | `03KLlaywEU2erqPe` | Cadeia, bloco de celas | lei | 30 x 20 | 3000 x 2000 | sul | interior | penumbra | neon crimson red | sim |
| m025 | `s0UQWhIza9UxLCGE` | Pátio da cadeia com muros e torres | lei | 36 x 24 | 3600 x 2400 | oeste | exterior | claro | neon orange |  |
| m026 | `zNvuVyRSxgx4FYC3` | Ala de segurança máxima | lei | 30 x 20 | 3000 x 2000 | norte | interior | escuro | neon gold |  |
| m027 | `oiZt5QyDwWN7wIFH` | Tribunal, salão de audiências | lei | 30 x 20 | 3000 x 2000 | sul | interior | claro | neon magenta |  |
| m028 | `cq3TTlQhUyA4T1iM` | Posto de checagem da Guarda | lei | 36 x 24 | 3600 x 2400 | sul | exterior | penumbra | neon orange |  |
| m029 | `emQiReJD8ktqLFxD` | Central de monitoramento e câmeras | lei | 30 x 20 | 3000 x 2000 | leste | interior | escuro | electric cyan |  |
| m030 | `qIfnMvntp9UIzVmp` | Base da Guarda, garagem e armeiro | lei | 36 x 24 | 3600 x 2400 | sul | interior | penumbra | neon crimson red |  |
| m031 | `pxRKchvwfELezIST` | Pronto-socorro lotado | saude | 30 x 20 | 3000 x 2000 | sul | interior | claro | neon crimson red | sim |
| m032 | `F6aCUCS5glutn4CE` | Centro cirúrgico | saude | 24 x 16 | 2400 x 1600 | oeste | interior | claro | toxic green |  |
| m033 | `7MA3gJE35CorSyYD` | UTI com leitos e monitores | saude | 30 x 20 | 3000 x 2000 | norte | interior | penumbra | neon violet |  |
| m034 | `DufKrCB7CUwGkcr4` | Necrotério e sala de autópsia | saude | 24 x 16 | 2400 x 1600 | leste | interior | escuro | toxic green |  |
| m035 | `IjMzHEDPxb2MzrJp` | Farmácia e almoxarifado hospitalar | saude | 24 x 16 | 2400 x 1600 | sul | interior | penumbra | neon gold |  |
| m036 | `geMAkNJuWqP8KVvo` | Clínica de implantes de beco | saude | 24 x 16 | 2400 x 1600 | sul | interior | penumbra | electric cyan | sim |
| m037 | `e0I3OdOIjYCBdQmM` | Laboratório corporativo de pesquisa | saude | 30 x 20 | 3000 x 2000 | sul | interior | claro | toxic green |  |
| m038 | `LEQl98SledIt14j5` | Laboratório de clonagem e sintéticos | saude | 36 x 24 | 3600 x 2400 | oeste | interior | penumbra | electric cyan |  |
| m039 | `HlsPMuF29gEbHc4o` | Laboratório clandestino subterrâneo | saude | 30 x 20 | 3000 x 2000 | norte | interior | escuro | toxic green |  |
| m040 | `2F0a0caORRUhxhsL` | Câmara de criogenia e banco de órgãos | saude | 30 x 20 | 3000 x 2000 | sul | interior | penumbra | neon violet |  |
| m041 | `cyNlbt6lXSYnjBNc` | Kitnet de runner | noite | 24 x 16 | 2400 x 1600 | sul | interior | penumbra | neon magenta | sim |
| m042 | `U1uzSVBiV8365EqR` | Apartamento de luxo no alto da torre | noite | 30 x 20 | 3000 x 2000 | oeste | interior | penumbra | neon gold |  |
| m043 | `uWmD5Atk38yRv4ec` | Corredor residencial da Colmeia | noite | 30 x 20 | 3000 x 2000 | sul | interior | escuro | neon amber |  |
| m044 | `xqEkRzDwcWMeSTH0` | Boate, pista de dança | noite | 36 x 24 | 3600 x 2400 | sul | interior | escuro | neon magenta | sim |
| m045 | `maPhdBTvq5J7Djpi` | Boate, camarotes e bastidores | noite | 30 x 20 | 3000 x 2000 | oeste | interior | penumbra | neon violet |  |
| m046 | `0SJdI40PdlgFoxtB` | Cassino, salão de jogos | noite | 36 x 24 | 3600 x 2400 | sul | interior | penumbra | neon gold | sim |
| m047 | `X4EwNYMupOOJmMDh` | Bar de beco | noite | 24 x 16 | 2400 x 1600 | sul | interior | penumbra | neon magenta |  |
| m048 | `i6fvQzfDO7QFURzo` | Restaurante de macarrão de rua | noite | 24 x 16 | 2400 x 1600 | sul | misto | penumbra | neon amber |  |
| m049 | `nNJ9l9XR8d4FRZEW` | Hotel, lobby e corredor de quartos | noite | 30 x 20 | 3000 x 2000 | sul | interior | penumbra | neon violet |  |
| m050 | `JHcs5TOM2iF5F6Bx` | Hotel-cápsula | noite | 30 x 20 | 3000 x 2000 | sul | interior | penumbra | electric cyan |  |
| m051 | `12HcezTNZEjwn2iS` | Armazém portuário com contêineres empilhados | ind | 36 x 24 | 3600 x 2400 | sul | interior | penumbra | neon amber | sim |
| m052 | `TfCTofYbNT4ahGq0` | Cais com guindastes e atracadouro | ind | 36 x 24 | 3600 x 2400 | sul | exterior | escuro | neon amber | sim |
| m053 | `hhXA4FBSXd2jnShy` | Pátio de contêineres a céu aberto | ind | 36 x 24 | 3600 x 2400 | oeste | exterior | penumbra | neon orange |  |
| m054 | `HuWPQiDNijAuNWFz` | Fábrica, linha de montagem | ind | 36 x 24 | 3600 x 2400 | sul | interior | penumbra | neon crimson red |  |
| m055 | `t0cWa6Uci9xsV1H2` | Usina, sala de turbinas e reator | ind | 30 x 20 | 3000 x 2000 | oeste | interior | penumbra | toxic green |  |
| m056 | `wiFFbxIRPCWhqVnk` | Subestação elétrica com arcos | ind | 30 x 20 | 3000 x 2000 | sul | exterior | escuro | neon amber |  |
| m057 | `qcgfUCMBnZWxYjWt` | Refinaria, torres e tanques | ind | 36 x 24 | 3600 x 2400 | oeste | exterior | penumbra | neon crimson red |  |
| m058 | `2PKZskxbeSQtxywA` | Oficina e desmanche de carros | ind | 30 x 20 | 3000 x 2000 | sul | misto | penumbra | neon orange |  |
| m059 | `Q0H4MARjRUCIn51V` | Estação de tratamento de água | ind | 36 x 24 | 3600 x 2400 | leste | exterior | penumbra | toxic green |  |
| m060 | `Q7Nf90qtjUuYheNY` | Data center | ind | 30 x 20 | 3000 x 2000 | sul | interior | penumbra | electric cyan |  |
| m061 | `tGMlTXX5o9KdNvtG` | Estação de maglev, plataformas e saguão | trans | 36 x 24 | 3600 x 2400 | sul | interior | claro | neon violet | sim |
| m062 | `LZ8EMVbyx9o8RPJf` | Estação de metrô subterrânea | trans | 36 x 24 | 3600 x 2400 | sul | interior | penumbra | neon orange |  |
| m063 | `xKT0vtab7nytRfN4` | Vagão de maglev em movimento | trans | 35 x 15 | 3500 x 1500 | oeste | interior | claro | electric cyan |  |
| m064 | `OchRwnLKTi8btGj5` | Terminal rodoviário | trans | 36 x 24 | 3600 x 2400 | sul | misto | claro | neon orange |  |
| m065 | `BfJejbHxTaE4AIUS` | Aeroporto, terminal de embarque | trans | 36 x 24 | 3600 x 2400 | sul | interior | claro | electric cyan | sim |
| m066 | `hNvyppijQ5T4oc6N` | Aeroporto, pista e hangar | trans | 36 x 24 | 3600 x 2400 | oeste | exterior | escuro | neon orange |  |
| m067 | `zKMd5YfEDWs4abre` | Avião de passageiros, fuselagem | trans | 35 x 15 | 3500 x 1500 | oeste | interior | penumbra | neon crimson red |  |
| m068 | `fl79H4gCtmBxbo48` | Jato executivo e pátio de estacionamento | trans | 24 x 16 | 2400 x 1600 | sul | misto | penumbra | neon gold |  |
| m069 | `IfHLJgbA4l9CUGH3` | Estação de aerotáxi no telhado | trans | 30 x 20 | 3000 x 2000 | leste | exterior | escuro | neon orange |  |
| m070 | `oFVdZJoslCLkcZET` | Pátio de manobras ferroviário | trans | 36 x 24 | 3600 x 2400 | oeste | exterior | penumbra | neon amber |  |
| m071 | `QVfHjNnkaTXehLyZ` | Porta-aviões, convoo | mil | 36 x 24 | 3600 x 2400 | oeste | exterior | claro | neon orange | sim |
| m072 | `nt2rUrUK42o7JWNM` | Porta-aviões, hangar e oficina de aeronaves | mil | 36 x 24 | 3600 x 2400 | leste | interior | penumbra | neon amber |  |
| m073 | `qsTpXcvVRkIEpW7u` | Ponte de comando de navio de guerra | mil | 30 x 20 | 3000 x 2000 | sul | interior | penumbra | electric cyan |  |
| m074 | `HLcfN1VbvCHCroJI` | Navio cargueiro, convés | mil | 35 x 15 | 3500 x 1500 | oeste | exterior | penumbra | neon crimson red |  |
| m075 | `Cez5oHDnO5PrE0yq` | Navio, casa de máquinas | mil | 30 x 20 | 3000 x 2000 | norte | interior | escuro | neon amber |  |
| m076 | `QrnQrMOXkX8lv7Te` | Iate de luxo | mil | 30 x 20 | 3000 x 2000 | sul | misto | penumbra | neon gold |  |
| m077 | `h64Cvjqj1octZmC5` | Submarino, interior | mil | 35 x 15 | 3500 x 1500 | oeste | interior | escuro | neon crimson red |  |
| m078 | `FTfwqua4sFUvMbD2` | Plataforma de petróleo | mil | 36 x 24 | 3600 x 2400 | sul | exterior | penumbra | neon amber |  |
| m079 | `J8Uk9gPFicbAHIdz` | Base militar, portão e pátio | mil | 36 x 24 | 3600 x 2400 | sul | exterior | penumbra | neon crimson red |  |
| m080 | `Tj2PMhDSogs2kt8G` | Bunker subterrâneo de comando | mil | 30 x 20 | 3000 x 2000 | norte | interior | escuro | electric cyan |  |
| m081 | `bGyudNpd9z51robQ` | Colmeia, pátio de contêineres empilhados | sn | 36 x 24 | 3600 x 2400 | sul | exterior | penumbra | neon crimson red | sim |
| m082 | `HqcaaYOJaWQ72o5r` | Colmeia, escadaria e corredores verticais | sn | 30 x 20 | 3000 x 2000 | sul | interior | escuro | neon amber |  |
| m083 | `qlGRC43tNZv65Xmn` | Oficina de cromo dos Cães de Vidro | sn | 30 x 20 | 3000 x 2000 | oeste | interior | penumbra | electric cyan |  |
| m084 | `gK6qRkUuk2uQdShJ` | Mercado do Sétimo Andar | sn | 36 x 24 | 3600 x 2400 | oeste | interior | penumbra | neon gold | sim |
| m085 | `0bJxhv3OrVEPMn0z` | Zona abandonada, rua em ruínas | sn | 36 x 24 | 3600 x 2400 | sul | exterior | penumbra | toxic green | sim |
| m086 | `EpmHxOjcEhwxbC7Z` | Zona, subsolo e abrigo antiaéreo | sn | 30 x 20 | 3000 x 2000 | norte | interior | escuro | toxic green |  |
| m087 | `0CMFKba1DtJhugB2` | Toca da equipe, esconderijo dos runners | sn | 30 x 20 | 3000 x 2000 | sul | interior | penumbra | neon magenta |  |
| m088 | `9AuBbyIoJpqXLb6f` | Cripta de servidores da Congregação do Fantasma | sn | 30 x 20 | 3000 x 2000 | sul | interior | escuro | neon violet |  |
| m089 | `q72hUHtusvS0IYs2` | A Rede, planície de dados com ICE | sn | 36 x 24 | 3600 x 2400 | oeste | rede | penumbra | electric cyan |  |
| m090 | `wF9Xi9KC4Kwtn2RG` | A Rede, catedral de servidores | sn | 30 x 20 | 3000 x 2000 | sul | rede | escuro | neon violet |  |
| m091 | `b5yLKA21KrTE3m6d` | Esgoto, galeria e câmara de bombas | esp | 36 x 24 | 3600 x 2400 | norte | interior | escuro | toxic green | sim |
| m092 | `N601Agsb3BWmJFfi` | Túnel de metrô abandonado | esp | 35 x 15 | 3500 x 1500 | oeste | interior | escuro | neon violet |  |
| m093 | `uiHNBcfhR4SrBwX0` | Arena de mechas e luta clandestina | esp | 36 x 24 | 3600 x 2400 | sul | interior | penumbra | neon crimson red |  |
| m094 | `6hw6P23OFYPXIm0H` | Estúdio de transmissão ao vivo | esp | 30 x 20 | 3000 x 2000 | sul | interior | claro | neon magenta |  |
| m095 | `7lCdRthOOAZ9jU0F` | Cemitério com mausoléus | esp | 36 x 24 | 3600 x 2400 | sul | exterior | escuro | neon violet |  |
| m096 | `YmfZHwgTEHAVc74s` | Estrada rural e posto de gasolina abandonado | esp | 36 x 24 | 3600 x 2400 | oeste | exterior | penumbra | neon orange |  |
| m097 | `F2wevKMviY4IREBD` | Ponte sobre rio, tabuleiro e pilares | esp | 35 x 15 | 3500 x 1500 | oeste | exterior | penumbra | neon orange |  |
| m098 | `tWT3mdBdGAIfqgFi` | Ferro-velho e aterro de sucata | esp | 36 x 24 | 3600 x 2400 | sul | exterior | penumbra | neon amber |  |
| m099 | `NHLT8XfPiW1iJMYa` | Escola abandonada | esp | 30 x 20 | 3000 x 2000 | sul | interior | escuro | neon violet |  |
| m100 | `kvT9fQYbjZz3DOnf` | Teatro de ópera, palco e plateia | esp | 36 x 24 | 3600 x 2400 | sul | interior | penumbra | neon gold |  |

## 15. Particularidades

- **Escala:** 1 casa = 100 px = 1,5 m ("Perto"). "Próximo" é cerca de 6 casas (9 m); "Longe" é linha de visão. Tamanhos de token não fazem parte deste módulo.
- **Quatro tamanhos de cena:** 24 x 16 (2400 x 1600), 30 x 20 (3000 x 2000), 36 x 24 (3600 x 2400) e 35 x 15 (3500 x 1500, proporção 21:9, para vagão, fuselagem, submarino, túnel, convés e ponte).
- **A arte de IA não bate exatamente com a grade.** O módulo entrega o fundo no tamanho certo e o Mestre ajusta escala e posição quando preciso. Não tente "consertar" a arte.
- **`luz` é informativa.** A cena usa iluminação global na Fase 1. Só a Fase 2, com paredes, liga visão e escuridão.
- **Cor de destaque** (`cor`) vai só nas flags; ela ajuda quem quiser filtrar ou estilizar.
- **Placeholders** têm borda de entrada em laranja e coordenadas a cada 5 casas, para o Mestre usar o mapa mesmo sem a arte.
- **Mapas da Rede** (`m089`, `m090`) não entram na Fase 2.
- **Tamanho do módulo:** registre no relatório o tamanho total de `assets/` (a arte final em webp costuma ficar entre 150 e 900 KB por mapa).

## 16. Ordem de trabalho sugerida

1. Fase 0, `MAPEAMENTO.md` e o teste de empacotamento. Pare e mostre ao usuário **só se** houver lacuna grave.
2. Preparação (seção 4): `mapas.json`, assets e placeholders.
3. Esqueleto do módulo: `module.json`, estilos, `package.json`, `lang`.
4. Pastas e as 100 cenas (seção 6), com as notas de entrada.
5. Diários (seção 7) e tabelas (seção 8).
6. Build (Plano A ou B) e verificação (seção 11).
7. Macros (seção 9), se houver tempo, e nova verificação.
8. README e relatório.
9. **Fase 2** (seção 10), só se o usuário pedir ou se sobrar tempo, mapa a mapa, com conferência visual.

## Anexo A: resumo dos tamanhos

| Grade (casas) | Pixels | Proporção | Mapas | Exemplos |
|---|---|---|---|---|
| 30 x 20 | 3000 x 2000 | 3:2 | 40 | m001, m004, m008, m011, m014, m017 e outros |
| 36 x 24 | 3600 x 2400 | 3:2 | 40 | m003, m005, m006, m009, m010, m012 e outros |
| 24 x 16 | 2400 x 1600 | 3:2 | 14 | m002, m007, m013, m015, m019, m022 e outros |
| 35 x 15 | 3500 x 1500 | 21:9 | 6 | m063, m067, m074, m077, m092, m097 |

## Anexo B: scripts

Grave em `scripts/` exatamente como estão. Todos foram testados. Os scripts `estado_lote.py`, `verificar_mapa.py`, `finalizar_mapa.py` e `folha_contato.py` ficam no arquivo de geração (`sombraneon-compendio-mapas-geracao.md`) e só são necessários para gerar as imagens.

### B.1 `scripts/extrair_mapas.py`

```python
#!/usr/bin/env python3
"""Extrai os mapas do catalogo (.md) para mapas.json.

Uso:
  python3 scripts/extrair_mapas.py sombraneon-compendio-mapas.md trabalho/mapas.json
  python3 scripts/extrair_mapas.py sombraneon-compendio-mapas.md --prompt m071
  python3 scripts/extrair_mapas.py sombraneon-compendio-mapas.md --ids
"""
import hashlib
import json
import pathlib
import re
import sys

RE_BLOCO = re.compile(r"<!-- MAP (?P<attrs>.*?) -->\n(?P<corpo>.*?)<!-- /MAP -->", re.S)
RE_ATTR = re.compile(r'(\w+)="([^"]*)"')
RE_DASH = re.compile("[\u2014\u2013]")


def campo(corpo, rotulo):
    m = re.search(r"\*\*" + re.escape(rotulo) + r":\*\* (.+)", corpo)
    return m.group(1).strip() if m else ""


def linha_tabela(corpo, rotulo):
    m = re.search(r"\| \*\*" + re.escape(rotulo) + r"\*\* \| (.+?) \|\n", corpo)
    return m.group(1).strip() if m else ""


def parse_bloco(attrs, corpo):
    a = dict(RE_ATTR.findall(attrs))
    w, h = (int(x) for x in a["grade"].split("x"))
    areas = []
    m = re.search(r"\*\*Áreas e pontos de interesse\*\*\n\n\| Área \| Função no jogo \|\n\|---\|---\|\n(.*?)\n\n", corpo, re.S)
    if m:
        for ln in m.group(1).splitlines():
            partes = [p.strip() for p in ln.strip().strip("|").split("|")]
            if len(partes) == 2:
                areas.append({"area": partes[0], "funcao": partes[1]})
    m = re.search(r"\*\*Ganchos de uso\*\*\n\n(.*?)\n\n", corpo, re.S)
    ganchos = [re.sub(r"^\d+\.\s*", "", x).strip() for x in m.group(1).splitlines()] if m else []
    m = re.search(r"```text\n(.*?)\n```", corpo, re.S)
    prompt = m.group(1).strip() if m else ""
    cor_linha = linha_tabela(corpo, "Cor de destaque")
    mc = re.match(r"(.+?) \((.+)\)$", cor_linha)
    return {
        "id": a["id"],
        "cat": a["cat"],
        "cat_nome": linha_tabela(corpo, "Categoria"),
        "nome": a["nome"],
        "arquivo": a["arquivo"],
        "slug": a["arquivo"][len(a["id"]) + 1:-len(".webp")],
        "grade": a["grade"],
        "w": w,
        "h": h,
        "px_w": w * 100,
        "px_h": h * 100,
        "ar": a["ar"],
        "ambiente": a["ambiente"],
        "luz": a["luz"],
        "entrada": a["entrada"],
        "cor": a["cor"],
        "cor_pt": mc.group(1) if mc else cor_linha,
        "foco_pt": mc.group(2) if mc else "",
        "pacote": a.get("pacote") == "sim",
        "descricao": campo(corpo, "Descrição"),
        "areas": areas,
        "cobertura": campo(corpo, "Cobertura e perigos"),
        "ganchos": ganchos,
        "ameacas": campo(corpo, "Ameaças típicas"),
        "prompt": prompt,
        "prompt_sha1": hashlib.sha1(prompt.encode("utf-8")).hexdigest()[:12],
    }


def extrair(caminho_md):
    texto = pathlib.Path(caminho_md).read_text(encoding="utf-8")
    mapas = [parse_bloco(m.group("attrs"), m.group("corpo")) for m in RE_BLOCO.finditer(texto)]
    return mapas


def validar(mapas):
    erros = []
    esperado = [f"m{i:03d}" for i in range(1, len(mapas) + 1)]
    if [m["id"] for m in mapas] != esperado:
        erros.append("ids fora de sequencia")
    arqs = [m["arquivo"] for m in mapas]
    if len(set(arqs)) != len(arqs):
        erros.append("arquivos repetidos")
    for m in mapas:
        i = m["id"]
        if not m["prompt"].startswith("Create an image in"):
            erros.append(f"{i}: prompt ausente ou malformado")
        if not m["areas"]:
            erros.append(f"{i}: sem areas")
        if not 2 <= len(m["ganchos"]) <= 3:
            erros.append(f"{i}: ganchos fora de 2 a 3")
        for k in ("descricao", "cobertura", "ameacas", "cat_nome", "foco_pt"):
            if not m[k]:
                erros.append(f"{i}: campo vazio {k}")
        if RE_DASH.search(json.dumps(m, ensure_ascii=False)):
            erros.append(f"{i}: travessao no texto")
    return erros


def main(argv):
    if len(argv) < 3:
        print(__doc__)
        return 2
    mapas = extrair(argv[1])
    if argv[2] == "--ids":
        print(" ".join(m["id"] for m in mapas))
        return 0
    if argv[2] == "--prompt":
        alvo = argv[3].lower()
        for m in mapas:
            if m["id"] == alvo:
                print(m["prompt"])
                return 0
        print("id nao encontrado", alvo)
        return 1
    erros = validar(mapas)
    if erros:
        print("ERROS:")
        for e in erros:
            print(" ", e)
        return 1
    saida = pathlib.Path(argv[2])
    saida.parent.mkdir(parents=True, exist_ok=True)
    saida.write_text(json.dumps(mapas, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{len(mapas)} mapas -> {saida}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
```

### B.2 `scripts/montar_assets.py`

```python
#!/usr/bin/env python3
"""Copia os mapas finais para o modulo e cria placeholders para os que ainda nao existem.

Uso: python3 scripts/montar_assets.py <pasta-do-modulo>
  le   mapas/<arquivo>.webp (e thumbs/<arquivo>.webp, ou gera a miniatura)
  grava <modulo>/assets/maps/<arquivo> e <modulo>/assets/thumbs/<arquivo>
  cria <modulo>/assets/maps/<arquivo> como PLACEHOLDER quando nao ha arte final
  registra os placeholders em <modulo>/assets/placeholders.json (nunca sobrescreve arte colocada a mao)
  --forcar recria os placeholders existentes
"""
import json
import pathlib
import shutil
import sys

from PIL import Image, ImageDraw, ImageFont

FONTES = ["DejaVuSans-Bold.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "Arial Bold.ttf",
          "/System/Library/Fonts/Supplemental/Arial Bold.ttf", "C:/Windows/Fonts/arialbd.ttf"]
ENTRADA_COR = (255, 140, 0)


def fonte(tam):
    for f in FONTES:
        try:
            return ImageFont.truetype(f, tam), True
        except OSError:
            continue
    return ImageFont.load_default(size=tam), False


def texto(t, acentos):
    if acentos:
        return t
    import unicodedata
    return unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()


def placeholder(m):
    W, H = m["px_w"], m["px_h"]
    im = Image.new("RGB", (W, H), (38, 38, 44))
    d = ImageDraw.Draw(im)
    for i in range(0, m["w"] + 1):
        d.line([(i * 100, 0), (i * 100, H)], fill=(112, 112, 124) if i % 5 == 0 else (62, 62, 72), width=3 if i % 5 == 0 else 1)
    for j in range(0, m["h"] + 1):
        d.line([(0, j * 100), (W, j * 100)], fill=(112, 112, 124) if j % 5 == 0 else (62, 62, 72), width=3 if j % 5 == 0 else 1)
    f_pq, ac = fonte(34)
    for i in range(5, m["w"], 5):
        d.text((i * 100 + 8, 8), str(i), fill=(200, 200, 210), font=f_pq)
    for j in range(5, m["h"], 5):
        d.text((8, j * 100 + 8), str(j), fill=(200, 200, 210), font=f_pq)
    esp = 40
    borda = {"sul": [0, H - esp, W, H], "norte": [0, 0, W, esp], "leste": [W - esp, 0, W, H], "oeste": [0, 0, esp, H],
             "centro": [W // 2 - 150, H // 2 + 200, W // 2 + 150, H // 2 + 240]}[m["entrada"]]
    d.rectangle(borda, fill=ENTRADA_COR)
    f_g, ac = fonte(110)
    f_m, _ = fonte(64)
    centro = W // 2
    d.text((centro, H // 2 - 170), texto("PLACEHOLDER", ac), fill=(235, 235, 240), font=f_g, anchor="mm")
    d.text((centro, H // 2 - 40), texto(f'{m["id"]}  {m["nome"]}', ac), fill=(235, 235, 240), font=f_m, anchor="mm")
    d.text((centro, H // 2 + 50), texto(f'grade {m["w"]} x {m["h"]}, 1 casa = 1,5 m, entrada: {m["entrada"]}', ac),
           fill=(190, 190, 200), font=f_m, anchor="mm")
    return im


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 1:
        print(__doc__)
        return 2
    modulo = pathlib.Path(args[0])
    mapas = json.loads(pathlib.Path("trabalho/mapas.json").read_text(encoding="utf-8"))
    dm, dt = modulo / "assets" / "maps", modulo / "assets" / "thumbs"
    dm.mkdir(parents=True, exist_ok=True)
    dt.mkdir(parents=True, exist_ok=True)
    reg_path = modulo / "assets" / "placeholders.json"
    ph = set(json.loads(reg_path.read_text(encoding="utf-8"))) if reg_path.exists() else set()
    finais, novos_ph, mantidos = 0, 0, 0
    for m in mapas:
        src = pathlib.Path("mapas") / m["arquivo"]
        alvo, th = dm / m["arquivo"], dt / m["arquivo"]
        if src.exists():
            shutil.copyfile(src, alvo)
            ts = pathlib.Path("thumbs") / m["arquivo"]
            if ts.exists():
                shutil.copyfile(ts, th)
            else:
                im = Image.open(src).convert("RGB")
                im.resize((480, round(480 * im.size[1] / im.size[0])), Image.LANCZOS).save(th, "WEBP", quality=80)
            ph.discard(m["id"])
            finais += 1
        elif alvo.exists() and m["id"] not in ph:
            mantidos += 1  # arte colocada a mao: nao tocar
        elif alvo.exists() and th.exists() and "--forcar" not in sys.argv:
            continue  # placeholder ja criado antes
        else:
            im = placeholder(m)
            im.save(alvo, "WEBP", quality=80, method=4)
            im.resize((480, round(480 * m["px_h"] / m["px_w"])), Image.LANCZOS).save(th, "WEBP", quality=75)
            ph.add(m["id"])
            novos_ph += 1
    reg_path.write_text(json.dumps(sorted(ph), indent=1), encoding="utf-8")
    print(f"{finais} arte final, {novos_ph} placeholders criados, {mantidos} arquivos manuais mantidos, "
          f"{len(ph)} placeholders no total")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

### B.3 `scripts/conferir_imagens.py`

```python
#!/usr/bin/env python3
"""Confere as imagens do modulo: existencia, dimensoes exatas e miniaturas.

Uso: python3 scripts/conferir_imagens.py <pasta-do-modulo>
Sai com codigo 1 se algum mapa estiver ausente ou com tamanho diferente de largura*100 x altura*100.
"""
import json
import pathlib
import sys

from PIL import Image


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        return 2
    modulo = pathlib.Path(sys.argv[1])
    mapas = json.loads(pathlib.Path("trabalho/mapas.json").read_text(encoding="utf-8"))
    reg = modulo / "assets" / "placeholders.json"
    ph = set(json.loads(reg.read_text(encoding="utf-8"))) if reg.exists() else set()
    erros, finais = [], 0
    for m in mapas:
        p = modulo / "assets" / "maps" / m["arquivo"]
        t = modulo / "assets" / "thumbs" / m["arquivo"]
        if not p.exists():
            erros.append(f'{m["id"]}: falta {p}')
            continue
        tam = Image.open(p).size
        if tam != (m["px_w"], m["px_h"]):
            erros.append(f'{m["id"]}: tamanho {tam[0]}x{tam[1]}, esperado {m["px_w"]}x{m["px_h"]}')
        if not t.exists():
            erros.append(f'{m["id"]}: falta a miniatura')
        elif Image.open(t).size[0] != 480:
            erros.append(f'{m["id"]}: miniatura com largura diferente de 480')
        if m["id"] not in ph:
            finais += 1
    print(f"{len(mapas)} mapas conferidos: {finais} com arte final, {len(ph)} placeholders, {len(erros)} erros")
    for e in erros:
        print("ERRO:", e)
    return 1 if erros else 0


if __name__ == "__main__":
    sys.exit(main())
```

### B.4 `scripts/detectar_paredes.py`

```python
#!/usr/bin/env python3
"""FASE 2 (opcional, experimental): detecta paredes pelas faixas pretas grossas do mapa.

Entrada: mapas/<arquivo>.webp (ja na escala final, 100 px por casa)
Saida:   paredes/<id>.json   segmentos [x1, y1, x2, y2] em pixels da cena
         revisao/paredes-<id>.png   sobreposicao em magenta para conferir a olho

Requisitos: pip install numpy opencv-python-headless scikit-image pillow

Uso: python3 scripts/detectar_paredes.py m001 [--espessura-min 0.18] [--tolerancia 0.12]
Portas e janelas NAO sao detectadas: o Mestre ou o Claude Code as marca depois, conferindo a imagem.
"""
import argparse
import json
import pathlib
import sys

import cv2
import numpy as np
from PIL import Image
from skimage.morphology import skeletonize

VIZ = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]


def tracar(sk):
    """Converte um esqueleto binario em caminhos (listas de (x, y)). Nos: pontos com grau diferente de 2."""
    h, w = sk.shape
    pts = set(zip(*np.nonzero(sk)))  # (y, x)

    def vizinhos(p):
        y, x = p
        return [(y + dy, x + dx) for dy, dx in VIZ if (y + dy, x + dx) in pts]

    grau = {p: len(vizinhos(p)) for p in pts}
    nos = {p for p, g in grau.items() if g != 2}
    visitado_aresta = set()
    caminhos = []

    def andar(inicio, prox):
        cam = [inicio, prox]
        visitado_aresta.add((inicio, prox))
        visitado_aresta.add((prox, inicio))
        atual, anterior = prox, inicio
        while atual not in nos:
            candidatos = [v for v in vizinhos(atual) if v != anterior and (atual, v) not in visitado_aresta]
            if not candidatos:
                break
            nxt = candidatos[0]
            visitado_aresta.add((atual, nxt))
            visitado_aresta.add((nxt, atual))
            cam.append(nxt)
            anterior, atual = atual, nxt
            if atual == inicio:
                break
        return cam

    for n in nos:
        for v in vizinhos(n):
            if (n, v) not in visitado_aresta:
                caminhos.append(andar(n, v))
    for p in pts:  # lacos fechados sem nos
        if grau[p] == 2:
            for v in vizinhos(p):
                if (p, v) not in visitado_aresta:
                    caminhos.append(andar(p, v))
    return [[(x, y) for (y, x) in c] for c in caminhos if len(c) >= 2]


def ponto_em_segmento(p, a, b):
    ax, ay, bx, by = a[0], a[1], b[0], b[1]
    dx, dy = bx - ax, by - ay
    d2 = dx * dx + dy * dy
    if d2 == 0:
        return (ax, ay), float(np.hypot(p[0] - ax, p[1] - ay))
    t = max(0.0, min(1.0, ((p[0] - ax) * dx + (p[1] - ay) * dy) / d2))
    q = (ax + t * dx, ay + t * dy)
    return q, float(np.hypot(p[0] - q[0], p[1] - q[1]))


def fechar_pontas(segs, tol):
    """Puxa pontas soltas para o segmento mais proximo dentro de tol (fecha frestas em T e cantos)."""
    from collections import Counter
    cont = Counter()
    for s in segs:
        cont[(round(s[0]), round(s[1]))] += 1
        cont[(round(s[2]), round(s[3]))] += 1
    novos = [list(map(float, s)) for s in segs]
    for i, s in enumerate(novos):
        for k in (0, 2):
            p = (s[k], s[k + 1])
            if cont[(round(p[0]), round(p[1]))] > 1:
                continue
            melhor, dmin = None, tol
            for j, o in enumerate(novos):
                if i == j:
                    continue
                q, d = ponto_em_segmento(p, (o[0], o[1]), (o[2], o[3]))
                if d < dmin:
                    melhor, dmin = q, d
            if melhor is not None:
                s[k], s[k + 1] = melhor
    return novos


def detectar(img_rgb, esp_min=0.18, tol=0.12, escala=0.5):
    h0, w0 = img_rgb.shape[:2]
    pequena = cv2.resize(img_rgb, (round(w0 * escala), round(h0 * escala)), interpolation=cv2.INTER_AREA)
    v = pequena.max(axis=2)
    preto = (v < 48).astype(np.uint8)
    k = max(3, int(round(esp_min * 100 * escala)) | 1)
    nucleo = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
    grosso = cv2.morphologyEx(preto, cv2.MORPH_OPEN, nucleo)
    grosso = cv2.morphologyEx(grosso, cv2.MORPH_CLOSE, nucleo)
    n, rot, st, _ = cv2.connectedComponentsWithStats(grosso, connectivity=8)
    area_min = 0.25 * (100 * escala) ** 2
    for i in range(1, n):
        if st[i, cv2.CC_STAT_AREA] < area_min:
            grosso[rot == i] = 0
    sk = skeletonize(grosso.astype(bool))
    caminhos = tracar(sk)
    eps = tol * 100 * escala
    segs = []
    for c in caminhos:
        arr = np.array(c, dtype=np.int32).reshape(-1, 1, 2)
        ap = cv2.approxPolyDP(arr, eps, False).reshape(-1, 2)
        for a, b in zip(ap[:-1], ap[1:]):
            if np.hypot(*(b - a)) >= 0.12 * 100 * escala:
                segs.append([a[0], a[1], b[0], b[1]])
    segs = fechar_pontas(segs, 0.6 * 100 * escala)
    segs = [[round(v / escala) for v in s] for s in segs]
    segs = [s for s in segs if (s[0], s[1]) != (s[2], s[3])]
    cobertura = float(grosso.sum() / max(1, preto.sum()))
    return segs, cobertura


def sobrepor(img_rgb, segs, saida):
    im = Image.fromarray(img_rgb).convert("RGB")
    esc = 1600 / im.size[0]
    im = im.resize((1600, round(im.size[1] * esc)))
    arr = cv2.cvtColor(np.asarray(im), cv2.COLOR_RGB2BGR)
    for s in segs:
        cv2.line(arr, (round(s[0] * esc), round(s[1] * esc)), (round(s[2] * esc), round(s[3] * esc)), (255, 0, 255), 3)
    pathlib.Path(saida).parent.mkdir(parents=True, exist_ok=True)
    cv2.imwrite(str(saida), arr)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("id")
    ap.add_argument("--espessura-min", type=float, default=0.18, help="espessura minima da parede, em casas")
    ap.add_argument("--tolerancia", type=float, default=0.12, help="simplificacao do traco, em casas")
    a = ap.parse_args()
    mapas = json.loads(pathlib.Path("trabalho/mapas.json").read_text(encoding="utf-8"))
    m = next((x for x in mapas if x["id"] == a.id), None)
    if m is None:
        sys.exit("id nao encontrado")
    img = np.asarray(Image.open(pathlib.Path("mapas") / m["arquivo"]).convert("RGB"))
    if img.shape[1] != m["px_w"] or img.shape[0] != m["px_h"]:
        sys.exit("a imagem nao esta na escala final; rode finalizar_mapa.py antes")
    segs, cobertura = detectar(img, a.espessura_min, a.tolerancia)
    comp = sum(np.hypot(s[2] - s[0], s[3] - s[1]) for s in segs) / 100
    avisos = []
    if len(segs) < 4:
        avisos.append("poucas paredes detectadas: o mapa pode ter paredes finas ou claras demais")
    if len(segs) > 700:
        avisos.append("muitos segmentos: possivel ruido; aumente --espessura-min ou --tolerancia")
    if cobertura < 0.35:
        avisos.append("menos de 35% do preto foi considerado parede: confira a sobreposicao")
    saida = pathlib.Path("paredes") / f'{m["id"]}.json'
    saida.parent.mkdir(exist_ok=True)
    saida.write_text(json.dumps({"id": m["id"], "metodo": "faixas-pretas-v1", "px": [m["px_w"], m["px_h"]],
                                 "paredes": segs, "avisos": avisos}, indent=1), encoding="utf-8")
    sobrepor(img, segs, pathlib.Path("revisao") / f'paredes-{m["id"]}.png')
    print(f'{m["id"]}: {len(segs)} segmentos, {comp:.0f} casas de parede, cobertura do preto {cobertura:.0%}')
    for av in avisos:
        print("AVISO:", av)


if __name__ == "__main__":
    main()
```

### B.5 `scripts/ids_foundry.py`

```python
#!/usr/bin/env python3
"""_id deterministico de 16 caracteres alfanumericos para documentos do Foundry.

Uso como modulo:  from ids_foundry import fid;  fid("scene:m001")
Uso na linha de comando: python3 scripts/ids_foundry.py scene:m001 folder:rua
"""
import hashlib
import sys

ALFABETO = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"


def fid(chave):
    n = int.from_bytes(hashlib.sha1(chave.encode("utf-8")).digest(), "big")
    s = ""
    while n and len(s) < 16:
        n, r = divmod(n, 62)
        s += ALFABETO[r]
    return s.ljust(16, "0")


if __name__ == "__main__":
    for c in sys.argv[1:]:
        print(c, fid(c))
```
