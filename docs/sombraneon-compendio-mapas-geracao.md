# Instruções para o Claude Code: gerar as 100 imagens do Compêndio de Mapas (Gemini via MCP)

*Gerado em 2026-11-12. Leia este arquivo inteiro antes de gerar a primeira imagem.*

## 0. Objetivo

Gerar as **100 imagens** do catálogo `sombraneon-compendio-mapas.md` com o **MCP do Gemini** que o usuário já tem instalado, conferir cada uma, e entregar:

1. `mapas/<id>-<slug>.webp`: os 100 mapas, cada um no **tamanho exato** `largura x 100` por `altura x 100` pixels (1 casa de grade = 100 px), prontos para o Foundry.
2. `thumbs/<id>-<slug>.webp`: miniaturas de 480 px de largura.
3. `trabalho/indice.csv` e `indice.json`: o que existe, o que falta, quantas tentativas cada mapa levou.
4. `bruto/`: todas as tentativas originais do Gemini (não apague).
5. `revisao/`: folhas de contato por categoria, para o usuário olhar tudo de uma vez.
6. `RELATORIO-GERACAO.md`: o que saiu, o que não saiu, o que revisar.

Este arquivo trata **só das imagens**. O módulo do Foundry está em `sombraneon-compendio-mapas-foundry.md` e consome a pasta `mapas/` que você produzir aqui.

## 1. Entradas e pasta de trabalho

| Arquivo | Papel |
|---|---|
| `sombraneon-compendio-mapas.md` | **Fonte da verdade.** Cada mapa tem um bloco `<!-- MAP ... -->` com os atributos (id, arquivo, grade, proporção, cor de destaque) e um **prompt em inglês pronto para o Gemini**. |
| MCP do Gemini | A ferramenta de geração de imagem (a Fase A descobre qual é). |

Pasta de trabalho (crie na raiz, ao lado do catálogo):

```
sombraneon-compendio-mapas.md
scripts/            # os 5 scripts do Anexo B (grave-os exatamente como estão)
trabalho/           # mapas.json, estado.json, MCP.md, log.md
bruto/              # tentativas originais: mNNN-t1.png, mNNN-t2.png ...
mapas/              # arquivos finais (webp, tamanho exato)
thumbs/             # miniaturas
revisao/            # folhas de contato
```

## 2. Regras de ouro

- **Não reescreva os prompts.** O texto-base é idêntico nos 100 e é a garantia de estilo uniforme. Só se muda um prompt de duas formas: (a) **sufixo corretivo** da seção 7.3, (b) **reescrita neutra** do trecho Subject quando o gerador recusar (seção 9). Registre toda alteração em `trabalho/log.md`.
- **Uma imagem por chamada**, em sequência. No máximo 2 chamadas simultâneas, e só se o MCP não reclamar de limite.
- **Nunca sobrescreva** um arquivo em `mapas/` que o usuário já aprovou. Refazer um mapa é decisão explícita (`estado_lote.py marcar mNNN refazer`).
- **Guarde tudo em `bruto/`**, inclusive as tentativas ruins. O usuário pode preferir a tentativa 1.
- **Não invente.** Se a ferramenta não existir, se a cota acabar ou se algo falhar de forma que você não entende, **pare e diga**. Não troque de gerador, não desenhe os mapas por código para "completar", não use outra chave de API.
- **Nada de segredos nos arquivos.** Não grave chaves, tokens nem caminhos pessoais em log ou relatório.
- **Textos em português do Brasil, sem travessões** (nem em-dash nem en-dash) em tudo que você escrever: log, relatório, mensagens.

## 3. Fase A: descobrir a ferramenta de imagem do MCP

1. Liste as ferramentas MCP disponíveis (comando `/mcp` ou a lista de ferramentas da sessão). Procure nomes ou descrições com `gemini`, `imagen`, `image`, `generate`.
2. Leia a **descrição e o esquema de parâmetros** da ferramenta de gerar imagem. Anote em `trabalho/MCP.md`:
   - nome exato da ferramenta e do servidor;
   - parâmetro do **prompt**;
   - parâmetro de **proporção** (`aspect_ratio` ou parecido) e valores aceitos (precisamos de `3:2` e `21:9`);
   - parâmetro de **resolução ou tamanho** (por exemplo 1K, 2K, 4K) e o **modelo**, se for escolhível;
   - se aceita **imagem de referência** (útil na seção 8);
   - **o que a ferramenta devolve**: caminho de arquivo salvo, base64, URL ou o próprio anexo de imagem; onde os arquivos caem em disco.
3. Escolha a **maior resolução** disponível sem custo extra absurdo (alvo: lado maior de 2048 px ou mais; as imagens finais têm 3000 a 3600 px de largura, e arte chapada sobe de escala bem, mas 1024 fica mole). Para testes rápidos, resolução menor serve.
4. Se a ferramenta tiver parâmetro de proporção, **passe-o também**, além de deixar a frase `Create an image in 3:2 landscape format.` no prompt (a frase fica; ela não faz mal).
5. **Se não houver nenhuma ferramenta de imagem do Gemini**: pare e diga ao usuário que o MCP não aparece nesta sessão, com a lista do que você encontrou. Não prossiga.
6. Defina como você vai **salvar o resultado como PNG sem perdas** em `bruto/<id>-t<N>.png` (N é o número da tentativa). Se a ferramenta já grava arquivo, mova ou converta; se devolve base64, decodifique; se devolve URL, baixe. Converta JPG ou WebP para PNG com Pillow antes de seguir.

## 4. Fase B: preparação

1. Grave os 5 scripts do **Anexo B** em `scripts/`, sem mudar o conteúdo.
2. Instale as dependências, se faltarem: `pip install pillow numpy`.
3. Extraia os mapas e crie o estado:

```bash
python3 scripts/extrair_mapas.py sombraneon-compendio-mapas.md trabalho/mapas.json
python3 scripts/estado_lote.py init trabalho/mapas.json
```

O primeiro comando precisa imprimir `100 mapas`. Se imprimir erros, o catálogo foi alterado: pare e mostre os erros.

4. Para ver o prompt de um mapa: `python3 scripts/extrair_mapas.py sombraneon-compendio-mapas.md --prompt m071`.
5. Crie `trabalho/log.md` com o cabeçalho `# Log de geração`.

## 5. Fase C: piloto de 3 mapas (obrigatório, com pausa)

Gere primeiro **três mapas que cobrem os casos difíceis**:

| Mapa | Por que está no piloto |
|---|---|
| `m001` Cruzamento de avenida à noite (30 x 20, exterior, escuro) | Exterior e cena escura, o caso mais comum |
| `m021` Delegacia de bairro, recepção e plantão (30 x 20, interior, claro) | Interior com paredes pretas e piso claro |
| `m063` Vagão de maglev em movimento (35 x 15, 21:9, interior, claro) | Proporção larga, o caso que mais falha |

Para cada um: gerar, salvar em `bruto/`, rodar `verificar_mapa.py`, abrir a imagem e aplicar o checklist visual (seção 7.2).

Depois:

1. **Calibre o verificador.** Veja as métricas dos três (`cinza`, `acento`, `preto`, `cores95`). Se uma imagem claramente boa recebeu falha ou aviso por limiar apertado demais, ajuste o dicionário `LIMITES` em `verificar_mapa.py` e anote a mudança em `trabalho/log.md`. Os limiares são ponto de partida, não verdade.
2. Finalize os aprovados (`finalizar_mapa.py`) e gere uma folha: `python3 scripts/folha_contato.py revisao/folha-piloto.png m001 m021 m063`.
3. **PARE e mostre ao usuário** a folha do piloto e as métricas. Pergunte (em uma mensagem só): o estilo está certo? A escala (portas com cerca de 1 casa) está aceitável? Posso seguir com os outros 97?
4. Só continue com o OK do usuário. Se ele pedir ajuste de estilo, aplique-o **na frase de arte do prompt-base de todos os mapas** de forma idêntica, regenere o piloto e peça o OK de novo.

## 6. Fase D: o lote

### 6.1 Ordem

1. O **pacote essencial** (20 mapas marcados `pacote="sim"`): `python3 scripts/estado_lote.py proximos 6 --pacote`.
2. Depois, **categoria por categoria**, na ordem do catálogo (rua, corp, lei, saude, noite, ind, trans, mil, sn, esp): `estado_lote.py proximos 6 --cat <cat>`.

Trabalhe em **grupos de 6 mapas**.

### 6.2 Passos de cada grupo

1. Para cada id do grupo: imprima o prompt, chame a ferramenta, salve `bruto/<id>-t<N>.png`, rode `estado_lote.py marcar <id> gerado` e `verificar_mapa.py <id> <arquivo>`.
2. Monte a folha do grupo: `folha_contato.py revisao/grupo.png <ids> --origem bruto`. **Abra a folha e olhe** (ela tem 3 colunas). Para qualquer mapa duvidoso, abra o PNG original em tamanho cheio.
3. Para cada mapa decida (seção 7): **aprovar**, **refazer** (com sufixo corretivo) ou **falhou** (após 3 tentativas).
4. Aprovados: `finalizar_mapa.py <id> bruto/<id>-t<N>.png` e `estado_lote.py marcar <id> aprovado`.
5. Registre uma linha por mapa em `trabalho/log.md`: id, tentativa escolhida, avisos do verificador, decisão, sufixo usado.

### 6.3 Limites, esperas e falhas

- Espere **2 segundos** entre chamadas.
- Erro de **limite de taxa ou cota** (429, "quota", "rate"): espera de 30 s, depois 60 s, depois 120 s. Na terceira falha seguida, **pare**, marque o estado e avise o usuário com o resumo (`estado_lote.py resumo`). Cota diária esgotada é motivo de parar, não de insistir.
- Erro de **recusa de conteúdo**: veja a seção 9.
- Erro de **rede** ou resposta vazia: 1 nova tentativa imediata; se repetir, trate como a regra de cota.
- **Máximo de 3 tentativas por mapa.** Na terceira reprovação marque `falhou` com a nota do motivo e **siga em frente**. Os `falhou` voltam no relatório para o usuário decidir.

### 6.4 Retomar depois de uma queda

O estado fica em `trabalho/estado.json`. Se a sessão cair, rode `estado_lote.py resumo` e continue de `proximos`. Mapas `gerado` sem decisão: reabra o `bruto` mais recente e decida.

### 6.5 Avisos ao usuário

- Depois do **pacote essencial (20)**: uma mensagem curta com a folha `revisao/folha-pacote.png` (todos os 20) e pergunta se quer ajustes antes de seguir.
- Depois de cada **categoria**: gere `revisao/folha-<cat>.png` com as miniaturas dos 10 (`--colunas 5`) e avise em uma linha. Não precisa esperar resposta, a menos que o usuário tenha pedido.

## 7. Controle de qualidade

### 7.1 Automático (`verificar_mapa.py`)

Mede proporção, resolução, proporção de pixels cinza, tamanho e matiz da cor de destaque, proporção de preto (paredes), número de cores (detecta gradiente e ruído) e periodicidade (detecta grade desenhada). **Falha** bloqueia a aprovação. **Aviso** exige que você olhe com atenção.

### 7.2 Visual (checklist obrigatório, por mapa)

1. **Vista de cima, ortogonal.** Sem perspectiva, sem fachadas, sem horizonte, sem céu, sem isometria.
2. **Sem personagens, criaturas ou rostos.**
3. **Sem texto, letras, números, logotipos.** (Placas devem estar em branco.)
4. **Sem linhas de grade** nem padrão de papel quadriculado sobre o mapa.
5. **Paredes e obstáculos sólidos em faixas pretas grossas**, bem mais grossas que o contorno dos móveis.
6. **Estilo:** cinzas chapados, contorno preto grosso, sem hachura, sem degradê, sem textura de lápis.
7. **Uma única cor neon**, usada pouco, no foco descrito (`foco_pt` na tabela do catálogo). Sem outras cores.
8. **A cena tem o que o catálogo descreve.** Confira as áreas listadas no bloco do mapa: se faltam duas ou mais áreas principais, refaça.
9. **Escala plausível:** porta com cerca de 1 casa, carro com cerca de 3 casas. Se tudo estiver gigante ou minúsculo, refaça.
10. **Imagem ocupa o quadro todo**, sem moldura, margem, vinheta nem borda branca.
11. **Legível:** dá para saber onde estão as saídas e por onde os grupos andam.

### 7.3 Sufixos corretivos

Quando um item do checklist falhar, **acrescente ao final do prompt original** a frase correspondente (e só ela). Se falharem dois itens, acrescente as duas. Nunca apague nem reordene o prompt original.

| Problema | Sufixo (em inglês, no fim do prompt) |
|---|---|
| Linhas de grade apareceram | `Correction: remove every grid line, graph paper pattern and tile grid overlay. The floor is plain flat gray without any square pattern.` |
| Texto, letras ou números | `Correction: remove all text, letters, numbers, labels and signs. Every sign and screen is a blank flat shape.` |
| Personagens ou criaturas | `Correction: the map is completely empty of people, characters, creatures and bodies. Only architecture and props.` |
| Perspectiva, 3D, isométrico | `Correction: strict orthographic plan view, the camera looks straight down, no isometric angle, no perspective, no depth, no cast shadows.` |
| Cores demais | `Correction: strictly flat grayscale everywhere except one single spot color used only on the described focus. Remove every other color.` |
| Cor de destaque grande ou espalhada | `Correction: the neon spot color covers only a very small area, a single small element. The rest is gray.` |
| Paredes finas | `Correction: walls must be very thick solid black bands, at least three times thicker than the outlines of furniture and props.` |
| Degradê, brilho, textura | `Correction: flat solid fills only, no gradients, no soft shadows, no glow, no texture, no noise.` |
| Escuro demais, preto demais | `Correction: lighter flat gray floors, keep pure black only for walls and thick outlines.` |
| Moldura, margem, vinheta | `Correction: the map fills the entire frame edge to edge, no border, no margin, no vignette, no frame.` |
| Escala errada | `Correction: scale the whole map so that a standard door is exactly one grid square wide and a car is about three grid squares long.` |
| Falta uma área principal | `Correction: the map must clearly show <ÁREA>.` (substitua <ÁREA> pela área em inglês, tirada do trecho Subject do prompt do mapa) |
| Estilo desenhado à mão, hachura | `Correction: clean vector shapes with smooth uniform black outlines, no crosshatching, no sketchy lines, no pencil or ink texture.` |

## 8. Consistência de estilo

- Se, ao longo do lote, o estilo derivar (traço mais fino, cinza mais claro, sombras), **volte a ancorar**: se a ferramenta aceitar **imagem de referência**, passe um mapa já aprovado (por exemplo `mapas/m001-...`) com a frase `Use the attached image only as a style reference for line weight and flat shading. Do not copy its layout.` no início da instrução, e registre no log que a referência foi usada.
- Não use referência no piloto (queremos ver o prompt puro) nem de forma sistemática sem necessidade: referência demais faz os mapas se parecerem entre si.

## 9. Casos especiais

**Proporção larga (21:9, grade 35 x 15).** Mapas: m063, m067, m074, m077, m092, m097. Peça sempre `21:9` na ferramenta. Se a ferramenta só aceitar 16:9, gere em 16:9 e deixe o `finalizar_mapa.py` cortar o centro (perde cerca de 24% e passa do limite padrão de 20%: use `--max-corte 0.26`) e **avise no relatório** que estes mapas foram cortados. Se só aceitar 1:1 ou 3:2, **pare** e pergunte ao usuário.

**Mapas virtuais da Rede (`ambiente="rede"`).** Mapas: m089, m090. São espaços abstratos: planície de dados e catedral de servidores. Aceite estilo mais geométrico, mas mantenha as mesmas regras (cinza, preto, uma cor, sem texto, sem grade desenhada).

**Recusa de conteúdo.** Alguns locais podem ser recusados por palavras sensíveis (necrotério, órgãos, tanques com figuras humanas, armas, celas, arena de luta). Nesse caso:

1. Reescreva **só o trecho da cena (Subject)** com termos neutros, sem mudar o bloco de arte nem a cor. Exemplos de troca: `human-shaped silhouettes` por `capsule-shaped pods`; `body vaults` por `metal storage drawers`; `organ containers` por `sample containers`; `weapons cage` por `equipment cage`; `fight arena` por `sports arena`; `prison` por `detention facility`.
2. Tente de novo. Registre a reescrita no log.
3. Se recusar de novo, marque `falhou` e siga.

**Imagem devolvida em outro formato ou tamanho.** Converta para PNG. Se a largura for menor que 1200 px, o verificador avisa: aceite no piloto, mas registre. Não use ferramentas de ampliação com IA sem pedir ao usuário.

**Arte quase boa.** Se um mapa tem um defeito pequeno (um objeto estranho num canto) e o resto está ótimo, **aprove e anote** em vez de gastar tentativas. O Mestre pode editar depois.

## 10. Finalização

Depois do lote (ou ao parar):

```bash
python3 scripts/estado_lote.py indice
python3 scripts/estado_lote.py resumo
```

Gere as folhas finais por categoria (`revisao/folha-<cat>.png`) com as miniaturas e escreva o `RELATORIO-GERACAO.md`.

### 10.1 Conteúdo do relatório

1. **Resultado:** quantos mapas aprovados, quantos `falhou`, quantos pendentes.
2. **Ferramenta usada:** nome da ferramenta MCP, parâmetros (resolução, modelo), data.
3. **Tentativas:** média por mapa e lista dos que precisaram de 3.
4. **Ajustes de prompt:** mapas com sufixo corretivo ou reescrita neutra (id, motivo).
5. **Mapas cortados** (proporção ajustada) e **mapas de baixa resolução**.
6. **Lista de revisão para o usuário:** os 10 mapas com mais avisos ou que você aprovou com ressalva.
7. **Próximo passo:** rodar o arquivo `sombraneon-compendio-mapas-foundry.md`, que usa a pasta `mapas/`.

## 11. Para refazer um mapa depois

```bash
python3 scripts/estado_lote.py marcar m071 refazer --nota "convoo com personagens"
```

Gere de novo (a tentativa seguinte vira `-t<N+1>`), aprove e finalize. O arquivo final anterior é substituído por `finalizar_mapa.py`. Se o módulo do Foundry já estiver montado, rode depois `scripts/montar_assets.py <pasta-do-modulo>` para copiar a nova arte.

## Anexo A: os 100 mapas

Grade em casas (1 casa = 1,5 m). Tamanho final em pixels = grade x 100. "Pacote" marca os 20 essenciais, que devem ser gerados primeiro.

| Id | Nome | Grade | Proporção | Arquivo | Cor de destaque | Pacote |
|---|---|---|---|---|---|---|
| m001 | Cruzamento de avenida à noite | 30 x 20 | 3:2 | `m001-cruzamento-avenida.webp` | neon orange | sim |
| m002 | Beco sem saída | 24 x 16 | 3:2 | `m002-beco-sem-saida.webp` | neon violet | sim |
| m003 | Rua do mercado de camelôs | 36 x 24 | 3:2 | `m003-mercado-camelos.webp` | neon gold |  |
| m004 | Baixos de viaduto | 30 x 20 | 3:2 | `m004-baixos-viaduto.webp` | neon amber |  |
| m005 | Praça com fonte e quiosques | 36 x 24 | 3:2 | `m005-praca-fonte.webp` | neon magenta |  |
| m006 | Estacionamento a céu aberto | 36 x 24 | 3:2 | `m006-estacionamento.webp` | neon orange |  |
| m007 | Posto de combustível 24h | 24 x 16 | 3:2 | `m007-posto-combustivel.webp` | neon crimson red |  |
| m008 | Telhado com antenas e caixas d'água | 30 x 20 | 3:2 | `m008-telhado-antenas.webp` | electric cyan |  |
| m009 | Passarela de vidro entre torres | 36 x 24 | 3:2 | `m009-passarela-torres.webp` | neon crimson red |  |
| m010 | Rodovia elevada com carros parados | 36 x 24 | 3:2 | `m010-rodovia-elevada.webp` | neon orange |  |
| m011 | Saguão corporativo com catracas | 30 x 20 | 3:2 | `m011-saguao-corporativo.webp` | electric cyan | sim |
| m012 | Andar de escritórios open space | 36 x 24 | 3:2 | `m012-andar-escritorios.webp` | neon violet | sim |
| m013 | Sala da diretoria com vista panorâmica | 24 x 16 | 3:2 | `m013-sala-diretoria.webp` | neon gold |  |
| m014 | Agência bancária com salão de atendimento | 30 x 20 | 3:2 | `m014-agencia-bancaria.webp` | neon gold |  |
| m015 | Cofre do banco com porta circular | 24 x 16 | 3:2 | `m015-cofre-banco.webp` | neon crimson red |  |
| m016 | Shopping center com praça de alimentação | 36 x 24 | 3:2 | `m016-shopping-center.webp` | neon magenta |  |
| m017 | Supermercado de bairro | 30 x 20 | 3:2 | `m017-supermercado.webp` | electric cyan |  |
| m018 | Garagem subterrânea de torre | 36 x 24 | 3:2 | `m018-garagem-torre.webp` | neon orange |  |
| m019 | Núcleo de elevadores e escadas de emergência | 24 x 16 | 3:2 | `m019-nucleo-elevadores.webp` | neon crimson red |  |
| m020 | Cobertura com heliponto da torre | 30 x 20 | 3:2 | `m020-heliponto-torre.webp` | neon orange |  |
| m021 | Delegacia de bairro, recepção e plantão | 30 x 20 | 3:2 | `m021-delegacia-recepcao.webp` | electric cyan | sim |
| m022 | Sala de interrogatório e sala de observação | 24 x 16 | 3:2 | `m022-sala-interrogatorio.webp` | neon violet |  |
| m023 | Depósito de evidências apreendidas | 30 x 20 | 3:2 | `m023-deposito-evidencias.webp` | neon gold |  |
| m024 | Cadeia, bloco de celas | 30 x 20 | 3:2 | `m024-cadeia-bloco-celas.webp` | neon crimson red | sim |
| m025 | Pátio da cadeia com muros e torres | 36 x 24 | 3:2 | `m025-patio-cadeia.webp` | neon orange |  |
| m026 | Ala de segurança máxima | 30 x 20 | 3:2 | `m026-ala-seguranca-maxima.webp` | neon gold |  |
| m027 | Tribunal, salão de audiências | 30 x 20 | 3:2 | `m027-tribunal.webp` | neon magenta |  |
| m028 | Posto de checagem da Guarda | 36 x 24 | 3:2 | `m028-posto-checagem.webp` | neon orange |  |
| m029 | Central de monitoramento e câmeras | 30 x 20 | 3:2 | `m029-central-monitoramento.webp` | electric cyan |  |
| m030 | Base da Guarda, garagem e armeiro | 36 x 24 | 3:2 | `m030-base-guarda-garagem.webp` | neon crimson red |  |
| m031 | Pronto-socorro lotado | 30 x 20 | 3:2 | `m031-pronto-socorro.webp` | neon crimson red | sim |
| m032 | Centro cirúrgico | 24 x 16 | 3:2 | `m032-centro-cirurgico.webp` | toxic green |  |
| m033 | UTI com leitos e monitores | 30 x 20 | 3:2 | `m033-uti-hospital.webp` | neon violet |  |
| m034 | Necrotério e sala de autópsia | 24 x 16 | 3:2 | `m034-necroterio.webp` | toxic green |  |
| m035 | Farmácia e almoxarifado hospitalar | 24 x 16 | 3:2 | `m035-farmacia-almoxarifado.webp` | neon gold |  |
| m036 | Clínica de implantes de beco | 24 x 16 | 3:2 | `m036-clinica-implantes-beco.webp` | electric cyan | sim |
| m037 | Laboratório corporativo de pesquisa | 30 x 20 | 3:2 | `m037-laboratorio-corporativo.webp` | toxic green |  |
| m038 | Laboratório de clonagem e sintéticos | 36 x 24 | 3:2 | `m038-laboratorio-clonagem.webp` | electric cyan |  |
| m039 | Laboratório clandestino subterrâneo | 30 x 20 | 3:2 | `m039-laboratorio-clandestino.webp` | toxic green |  |
| m040 | Câmara de criogenia e banco de órgãos | 30 x 20 | 3:2 | `m040-criogenia-banco-orgaos.webp` | neon violet |  |
| m041 | Kitnet de runner | 24 x 16 | 3:2 | `m041-kitnet-runner.webp` | neon magenta | sim |
| m042 | Apartamento de luxo no alto da torre | 30 x 20 | 3:2 | `m042-apartamento-luxo.webp` | neon gold |  |
| m043 | Corredor residencial da Colmeia | 30 x 20 | 3:2 | `m043-corredor-residencial.webp` | neon amber |  |
| m044 | Boate, pista de dança | 36 x 24 | 3:2 | `m044-boate-pista.webp` | neon magenta | sim |
| m045 | Boate, camarotes e bastidores | 30 x 20 | 3:2 | `m045-boate-camarotes.webp` | neon violet |  |
| m046 | Cassino, salão de jogos | 36 x 24 | 3:2 | `m046-cassino.webp` | neon gold | sim |
| m047 | Bar de beco | 24 x 16 | 3:2 | `m047-bar-beco.webp` | neon magenta |  |
| m048 | Restaurante de macarrão de rua | 24 x 16 | 3:2 | `m048-restaurante-macarrao.webp` | neon amber |  |
| m049 | Hotel, lobby e corredor de quartos | 30 x 20 | 3:2 | `m049-hotel-quartos.webp` | neon violet |  |
| m050 | Hotel-cápsula | 30 x 20 | 3:2 | `m050-hotel-capsula.webp` | electric cyan |  |
| m051 | Armazém portuário com contêineres empilhados | 36 x 24 | 3:2 | `m051-armazem-conteineres.webp` | neon amber | sim |
| m052 | Cais com guindastes e atracadouro | 36 x 24 | 3:2 | `m052-cais-guindastes.webp` | neon amber | sim |
| m053 | Pátio de contêineres a céu aberto | 36 x 24 | 3:2 | `m053-patio-conteineres.webp` | neon orange |  |
| m054 | Fábrica, linha de montagem | 36 x 24 | 3:2 | `m054-fabrica-linha-montagem.webp` | neon crimson red |  |
| m055 | Usina, sala de turbinas e reator | 30 x 20 | 3:2 | `m055-usina-turbinas.webp` | toxic green |  |
| m056 | Subestação elétrica com arcos | 30 x 20 | 3:2 | `m056-subestacao-eletrica.webp` | neon amber |  |
| m057 | Refinaria, torres e tanques | 36 x 24 | 3:2 | `m057-refinaria-petroleo.webp` | neon crimson red |  |
| m058 | Oficina e desmanche de carros | 30 x 20 | 3:2 | `m058-desmanche-oficina.webp` | neon orange |  |
| m059 | Estação de tratamento de água | 36 x 24 | 3:2 | `m059-estacao-agua.webp` | toxic green |  |
| m060 | Data center | 30 x 20 | 3:2 | `m060-data-center.webp` | electric cyan |  |
| m061 | Estação de maglev, plataformas e saguão | 36 x 24 | 3:2 | `m061-estacao-maglev.webp` | neon violet | sim |
| m062 | Estação de metrô subterrânea | 36 x 24 | 3:2 | `m062-estacao-metro.webp` | neon orange |  |
| m063 | Vagão de maglev em movimento | 35 x 15 | 21:9 | `m063-vagao-maglev.webp` | electric cyan |  |
| m064 | Terminal rodoviário | 36 x 24 | 3:2 | `m064-terminal-rodoviario.webp` | neon orange |  |
| m065 | Aeroporto, terminal de embarque | 36 x 24 | 3:2 | `m065-aeroporto-terminal.webp` | electric cyan | sim |
| m066 | Aeroporto, pista e hangar | 36 x 24 | 3:2 | `m066-aeroporto-pista-hangar.webp` | neon orange |  |
| m067 | Avião de passageiros, fuselagem | 35 x 15 | 21:9 | `m067-aviao-fuselagem.webp` | neon crimson red |  |
| m068 | Jato executivo e pátio de estacionamento | 24 x 16 | 3:2 | `m068-jato-executivo.webp` | neon gold |  |
| m069 | Estação de aerotáxi no telhado | 30 x 20 | 3:2 | `m069-estacao-aerotaxi.webp` | neon orange |  |
| m070 | Pátio de manobras ferroviário | 36 x 24 | 3:2 | `m070-patio-manobras.webp` | neon amber |  |
| m071 | Porta-aviões, convoo | 36 x 24 | 3:2 | `m071-porta-avioes-convoo.webp` | neon orange | sim |
| m072 | Porta-aviões, hangar e oficina de aeronaves | 36 x 24 | 3:2 | `m072-hangar-porta-avioes.webp` | neon amber |  |
| m073 | Ponte de comando de navio de guerra | 30 x 20 | 3:2 | `m073-ponte-comando.webp` | electric cyan |  |
| m074 | Navio cargueiro, convés | 35 x 15 | 21:9 | `m074-cargueiro-conves.webp` | neon crimson red |  |
| m075 | Navio, casa de máquinas | 30 x 20 | 3:2 | `m075-casa-maquinas.webp` | neon amber |  |
| m076 | Iate de luxo | 30 x 20 | 3:2 | `m076-iate-luxo.webp` | neon gold |  |
| m077 | Submarino, interior | 35 x 15 | 21:9 | `m077-submarino.webp` | neon crimson red |  |
| m078 | Plataforma de petróleo | 36 x 24 | 3:2 | `m078-plataforma-petroleo.webp` | neon amber |  |
| m079 | Base militar, portão e pátio | 36 x 24 | 3:2 | `m079-base-militar-patio.webp` | neon crimson red |  |
| m080 | Bunker subterrâneo de comando | 30 x 20 | 3:2 | `m080-bunker-subterraneo.webp` | electric cyan |  |
| m081 | Colmeia, pátio de contêineres empilhados | 36 x 24 | 3:2 | `m081-colmeia-patio.webp` | neon crimson red | sim |
| m082 | Colmeia, escadaria e corredores verticais | 30 x 20 | 3:2 | `m082-colmeia-escadaria.webp` | neon amber |  |
| m083 | Oficina de cromo dos Cães de Vidro | 30 x 20 | 3:2 | `m083-oficina-cromo.webp` | electric cyan |  |
| m084 | Mercado do Sétimo Andar | 36 x 24 | 3:2 | `m084-mercado-setimo-andar.webp` | neon gold | sim |
| m085 | Zona abandonada, rua em ruínas | 36 x 24 | 3:2 | `m085-zona-rua-ruinas.webp` | toxic green | sim |
| m086 | Zona, subsolo e abrigo antiaéreo | 30 x 20 | 3:2 | `m086-zona-subsolo.webp` | toxic green |  |
| m087 | Toca da equipe, esconderijo dos runners | 30 x 20 | 3:2 | `m087-toca-equipe.webp` | neon magenta |  |
| m088 | Cripta de servidores da Congregação do Fantasma | 30 x 20 | 3:2 | `m088-cripta-servidores.webp` | neon violet |  |
| m089 | A Rede, planície de dados com ICE | 36 x 24 | 3:2 | `m089-rede-planicie-dados.webp` | electric cyan |  |
| m090 | A Rede, catedral de servidores | 30 x 20 | 3:2 | `m090-rede-catedral-servidores.webp` | neon violet |  |
| m091 | Esgoto, galeria e câmara de bombas | 36 x 24 | 3:2 | `m091-esgoto-tuneis.webp` | toxic green | sim |
| m092 | Túnel de metrô abandonado | 35 x 15 | 21:9 | `m092-tunel-metro-abandonado.webp` | neon violet |  |
| m093 | Arena de mechas e luta clandestina | 36 x 24 | 3:2 | `m093-arena-mechas.webp` | neon crimson red |  |
| m094 | Estúdio de transmissão ao vivo | 30 x 20 | 3:2 | `m094-estudio-transmissao.webp` | neon magenta |  |
| m095 | Cemitério com mausoléus | 36 x 24 | 3:2 | `m095-cemiterio.webp` | neon violet |  |
| m096 | Estrada rural e posto de gasolina abandonado | 36 x 24 | 3:2 | `m096-estrada-posto-abandonado.webp` | neon orange |  |
| m097 | Ponte sobre rio, tabuleiro e pilares | 35 x 15 | 21:9 | `m097-ponte-rio.webp` | neon orange |  |
| m098 | Ferro-velho e aterro de sucata | 36 x 24 | 3:2 | `m098-aterro-ferro-velho.webp` | neon amber |  |
| m099 | Escola abandonada | 30 x 20 | 3:2 | `m099-escola-abandonada.webp` | neon violet |  |
| m100 | Teatro de ópera, palco e plateia | 36 x 24 | 3:2 | `m100-teatro-opera.webp` | neon gold |  |

## Anexo B: scripts

Grave cada script em `scripts/` exatamente como está. Todos foram testados.

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

### B.2 `scripts/estado_lote.py`

```python
#!/usr/bin/env python3
"""Controla o andamento da geracao em trabalho/estado.json (permite retomar).

Comandos:
  init   trabalho/mapas.json            cria o estado (nao sobrescreve o que existe)
  proximos N [--pacote] [--cat rua]      lista os proximos N ids pendentes ou a refazer
  marcar mNNN status [--nota "texto"]    status: pendente, gerado, aprovado, refazer, falhou
  resumo                                 contagem por status e lista de problemas
  indice                                 grava trabalho/indice.csv e indice.json
"""
import argparse
import csv
import json
import os
import pathlib
import sys
import time

BASE = pathlib.Path("trabalho")
ESTADO = BASE / "estado.json"
MAPAS = BASE / "mapas.json"
STATUS = ("pendente", "gerado", "aprovado", "refazer", "falhou")


def ler(p):
    return json.loads(pathlib.Path(p).read_text(encoding="utf-8"))


def gravar_estado(est):
    tmp = ESTADO.with_suffix(".tmp")
    tmp.write_text(json.dumps(est, ensure_ascii=False, indent=2), encoding="utf-8")
    os.replace(tmp, ESTADO)


def cmd_init(args):
    mapas = ler(args.mapas)
    est = ler(ESTADO) if ESTADO.exists() else {}
    novos = 0
    for m in mapas:
        if m["id"] not in est:
            est[m["id"]] = {"status": "pendente", "tentativas": 0, "notas": [], "atualizado": None}
            novos += 1
    gravar_estado(est)
    print(f"{len(est)} mapas no estado ({novos} novos)")


def cmd_proximos(args):
    est = ler(ESTADO)
    mapas = {m["id"]: m for m in ler(MAPAS)}
    fila = [i for i, e in est.items() if e["status"] in ("pendente", "refazer")]
    if args.pacote:
        fila = [i for i in fila if mapas[i]["pacote"]]
    if args.cat:
        fila = [i for i in fila if mapas[i]["cat"] == args.cat]
    fila.sort()
    print(" ".join(fila[: args.n]))


def cmd_marcar(args):
    if args.status not in STATUS:
        sys.exit(f"status invalido: {args.status}")
    est = ler(ESTADO)
    if args.id not in est:
        sys.exit(f"id desconhecido: {args.id}")
    e = est[args.id]
    e["status"] = args.status
    if args.status == "gerado":
        e["tentativas"] += 1
    if args.nota:
        e["notas"].append(args.nota)
    e["atualizado"] = time.strftime("%Y-%m-%d %H:%M:%S")
    gravar_estado(est)
    print(args.id, args.status, "tentativas:", e["tentativas"])


def cmd_resumo(_):
    est = ler(ESTADO)
    cont = {s: 0 for s in STATUS}
    for e in est.values():
        cont[e["status"]] += 1
    print(" | ".join(f"{s}: {n}" for s, n in cont.items()), f"| total: {len(est)}")
    for s in ("refazer", "falhou"):
        ids = [i for i, e in est.items() if e["status"] == s]
        if ids:
            print(f"{s}:", " ".join(ids))


def cmd_indice(_):
    est = ler(ESTADO)
    mapas = ler(MAPAS)
    linhas = []
    faltando = []
    for m in mapas:
        e = est.get(m["id"], {})
        final = pathlib.Path("mapas") / m["arquivo"]
        thumb = pathlib.Path("thumbs") / m["arquivo"]
        existe = final.exists()
        if not existe:
            faltando.append(m["id"])
        linhas.append({
            "id": m["id"], "nome": m["nome"], "categoria": m["cat_nome"], "grade": m["grade"],
            "px": f'{m["px_w"]}x{m["px_h"]}', "arquivo": m["arquivo"], "existe": existe,
            "thumb": thumb.exists(), "status": e.get("status", "pendente"), "tentativas": e.get("tentativas", 0),
        })
    (BASE / "indice.json").write_text(json.dumps(linhas, ensure_ascii=False, indent=2), encoding="utf-8")
    with open(BASE / "indice.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(linhas[0].keys()))
        w.writeheader()
        w.writerows(linhas)
    print(f"indice gravado: {len(linhas) - len(faltando)} de {len(linhas)} arquivos finais existem")
    if faltando:
        print("sem arquivo final:", " ".join(faltando))


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sp = p.add_subparsers(dest="cmd", required=True)
    a = sp.add_parser("init"); a.add_argument("mapas"); a.set_defaults(f=cmd_init)
    a = sp.add_parser("proximos"); a.add_argument("n", type=int); a.add_argument("--pacote", action="store_true")
    a.add_argument("--cat"); a.set_defaults(f=cmd_proximos)
    a = sp.add_parser("marcar"); a.add_argument("id"); a.add_argument("status"); a.add_argument("--nota")
    a.set_defaults(f=cmd_marcar)
    a = sp.add_parser("resumo"); a.set_defaults(f=cmd_resumo)
    a = sp.add_parser("indice"); a.set_defaults(f=cmd_indice)
    args = p.parse_args()
    args.f(args)


if __name__ == "__main__":
    main()
```

### B.3 `scripts/verificar_mapa.py`

```python
#!/usr/bin/env python3
"""Verificacao automatica (heuristica) de uma imagem de mapa. Complementa, nao substitui, o olhar humano.

Uso: python3 scripts/verificar_mapa.py m071 bruto/m071-t1.png
Saida: JSON com ok, falhas, avisos e metricas. Codigo de saida 0 se nao houver falhas.
"""
import colorsys
import json
import math
import pathlib
import sys

import numpy as np
from PIL import Image

HUE = {  # tom esperado em graus, por cor de destaque
    "neon crimson red": 0, "neon orange": 25, "neon amber": 40, "neon gold": 48,
    "toxic green": 130, "electric cyan": 185, "neon violet": 275, "neon magenta": 315,
}
LIMITES = dict(
    min_largura=1200, corte_max=0.20, cinza_min_falha=0.80, cinza_min_aviso=0.92,
    acento_min=0.0015, acento_max_aviso=0.06, acento_max_falha=0.12,
    preto_min=0.03, preto_max=0.60, cores95_max=350, tol_hue=32,
)


def razao(ar):
    a, b = ar.split(":")
    return int(a) / int(b)


def hsv_arrays(rgb):
    x = rgb.astype(np.float32) / 255.0
    mx, mn = x.max(2), x.min(2)
    d = mx - mn
    s = np.where(mx > 0, d / np.maximum(mx, 1e-6), 0)
    r, g, b = x[..., 0], x[..., 1], x[..., 2]
    h = np.zeros_like(mx)
    m = d > 1e-6
    rm = m & (mx == r)
    gm = m & (mx == g) & ~rm
    bm = m & ~rm & ~gm
    h[rm] = ((g - b)[rm] / d[rm]) % 6
    h[gm] = (b - r)[gm] / d[gm] + 2
    h[bm] = (r - g)[bm] / d[bm] + 4
    return (h * 60.0) % 360.0, s, mx


def dist_hue(a, b):
    d = abs(a - b) % 360
    return min(d, 360 - d)


def periodicidade(perfil, lag):
    """Correlacao do perfil com ele mesmo deslocado em lag (e multiplos), 0..1."""
    p = perfil - perfil.mean()
    if p.std() < 1e-6 or lag < 4 or lag * 3 >= len(p):
        return 0.0
    melhor = 0.0
    for l in range(lag - 2, lag + 3):
        a, b = p[:-l], p[l:]
        den = a.std() * b.std()
        if den > 1e-9:
            melhor = max(melhor, float(np.mean(a * b) / den))
    return melhor


def analisar(mapa, caminho):
    L = LIMITES
    falhas, avisos = [], []
    img = Image.open(caminho)
    w0, h0 = img.size
    esperado = razao(mapa["ar"])
    atual = w0 / h0
    if abs(atual - esperado) / esperado > 0.005:
        corte = 1 - (esperado / atual if atual > esperado else atual / esperado)
        if corte > L["corte_max"]:
            falhas.append(f"proporcao {atual:.3f} difere de {mapa['ar']} e exigiria cortar {corte:.0%}")
        else:
            avisos.append(f"proporcao {atual:.3f}: sera cortado {corte:.0%} ao finalizar")
    if w0 < L["min_largura"]:
        avisos.append(f"baixa resolucao ({w0} px de largura)")
    img = img.convert("RGB")
    esc = 900 / max(img.size)
    if esc < 1:
        img = img.resize((round(w0 * esc), round(h0 * esc)), Image.LANCZOS)
    rgb = np.asarray(img)
    H, S, V = hsv_arrays(rgb)
    total = S.size
    cinza = float(np.mean(S < 0.18))
    acento_m = (S > 0.45) & (V > 0.45)
    acento = float(np.mean(acento_m))
    preto = float(np.mean(V < 0.16))
    if cinza < L["cinza_min_falha"]:
        falhas.append(f"muita cor fora do cinza ({1 - cinza:.0%} dos pixels coloridos)")
    elif cinza < L["cinza_min_aviso"]:
        avisos.append(f"cor fora do cinza em {1 - cinza:.0%} dos pixels")
    if acento > L["acento_max_falha"]:
        falhas.append(f"cor de destaque domina a imagem ({acento:.1%})")
    elif acento > L["acento_max_aviso"]:
        avisos.append(f"cor de destaque grande demais ({acento:.1%})")
    elif acento < L["acento_min"]:
        avisos.append(f"quase nenhum pixel de destaque ({acento:.3%})")
    hue_med = None
    if acento_m.sum() > 50:
        ang = np.deg2rad(H[acento_m])
        hue_med = float((math.degrees(math.atan2(np.sin(ang).mean(), np.cos(ang).mean()))) % 360)
        alvo = HUE.get(mapa["cor"])
        if alvo is not None and dist_hue(hue_med, alvo) > L["tol_hue"]:
            avisos.append(f"matiz do destaque {hue_med:.0f} graus, esperado perto de {alvo} ({mapa['cor']})")
    if not L["preto_min"] <= preto <= L["preto_max"]:
        avisos.append(f"proporcao de preto fora do esperado ({preto:.0%}): paredes finas ou imagem escura demais")
    q = (rgb >> 4).astype(np.int32)
    chave = (q[..., 0] << 8) | (q[..., 1] << 4) | q[..., 2]
    cont = np.sort(np.bincount(chave.ravel()))[::-1]
    cores95 = int(np.searchsorted(np.cumsum(cont), 0.95 * total) + 1)
    if cores95 > L["cores95_max"]:
        avisos.append(f"{cores95} cores para cobrir 95% da imagem: possivel gradiente, textura ou ruido")
    # margem branca ao redor (paredes pretas na borda sao normais em mapas fechados, entao so a branca alerta)
    b = max(2, round(0.012 * min(S.shape)))
    borda = np.concatenate([V[:b].ravel(), V[-b:].ravel(), V[:, :b].ravel(), V[:, -b:].ravel()])
    if np.mean(borda > 0.95) > 0.97:
        avisos.append("faixa externa branca: possivel margem ou moldura")
    # grade desenhada: picos periodicos no gradiente, com o passo de uma casa
    g = np.asarray(img.convert("L"), dtype=np.float32)
    gx = np.abs(np.diff(g, axis=1)).mean(0)
    gy = np.abs(np.diff(g, axis=0)).mean(1)
    px_casa_x = g.shape[1] / mapa["w"]
    px_casa_y = g.shape[0] / mapa["h"]
    per_x = periodicidade(gx, round(px_casa_x))
    per_y = periodicidade(gy, round(px_casa_y))
    if per_x > 0.55 and per_y > 0.55:
        avisos.append(f"possivel grade desenhada (periodicidade {per_x:.2f}/{per_y:.2f})")
    metricas = dict(largura=w0, altura=h0, proporcao=round(atual, 4), cinza=round(cinza, 4), acento=round(acento, 4),
                    hue_acento=None if hue_med is None else round(hue_med), preto=round(preto, 4), cores95=cores95,
                    periodicidade=[round(per_x, 2), round(per_y, 2)])
    return dict(id=mapa["id"], ok=not falhas, falhas=falhas, avisos=avisos, metricas=metricas)


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    mapas = json.loads(pathlib.Path("trabalho/mapas.json").read_text(encoding="utf-8"))
    mapa = next((m for m in mapas if m["id"] == sys.argv[1]), None)
    if mapa is None:
        print("id nao encontrado")
        return 2
    try:
        r = analisar(mapa, sys.argv[2])
    except Exception as e:  # arquivo corrompido, formato invalido
        r = dict(id=sys.argv[1], ok=False, falhas=[f"nao foi possivel abrir a imagem: {e}"], avisos=[], metricas={})
    print(json.dumps(r, ensure_ascii=False, indent=2))
    return 0 if r["ok"] else 1


if __name__ == "__main__":
    sys.exit(main())
```

### B.4 `scripts/finalizar_mapa.py`

```python
#!/usr/bin/env python3
"""Converte uma imagem bruta do Gemini no arquivo final do mapa.

- recorta o centro se a proporcao diferir um pouco da esperada (limite: --max-corte, padrao 20%)
- redimensiona para largura*100 x altura*100 px (1 casa = 100 px)
- grava mapas/<arquivo>.webp e thumbs/<arquivo>.webp (480 px de largura)

Uso: python3 scripts/finalizar_mapa.py m071 bruto/m071-t1.png
"""
import argparse
import json
import pathlib
import sys

from PIL import Image


def carregar_mapa(mid):
    mapas = json.loads(pathlib.Path("trabalho/mapas.json").read_text(encoding="utf-8"))
    for m in mapas:
        if m["id"] == mid:
            return m
    sys.exit(f"id nao encontrado: {mid}")


def preparar(img, alvo_w, alvo_h, max_corte):
    """Devolve (imagem final, fracao cortada)."""
    img = img.convert("RGBA")
    fundo = Image.new("RGBA", img.size, (255, 255, 255, 255))
    img = Image.alpha_composite(fundo, img).convert("RGB")
    w, h = img.size
    r_alvo = alvo_w / alvo_h
    r_atual = w / h
    corte = 0.0
    if abs(r_atual - r_alvo) / r_alvo > 0.005:
        if r_atual > r_alvo:
            novo_w = round(h * r_alvo)
            corte = 1 - novo_w / w
            if corte > max_corte:
                raise ValueError(f"proporcao {r_atual:.3f} exige cortar {corte:.0%} (limite {max_corte:.0%})")
            x0 = (w - novo_w) // 2
            img = img.crop((x0, 0, x0 + novo_w, h))
        else:
            novo_h = round(w / r_alvo)
            corte = 1 - novo_h / h
            if corte > max_corte:
                raise ValueError(f"proporcao {r_atual:.3f} exige cortar {corte:.0%} (limite {max_corte:.0%})")
            y0 = (h - novo_h) // 2
            img = img.crop((0, y0, w, y0 + novo_h))
    return img.resize((alvo_w, alvo_h), Image.LANCZOS), corte


def main():
    p = argparse.ArgumentParser()
    p.add_argument("id")
    p.add_argument("bruto")
    p.add_argument("--max-corte", type=float, default=0.20)
    p.add_argument("--qualidade", type=int, default=88)
    args = p.parse_args()
    m = carregar_mapa(args.id)
    origem = Image.open(args.bruto)
    try:
        final, corte = preparar(origem, m["px_w"], m["px_h"], args.max_corte)
    except ValueError as e:
        sys.exit(f"ERRO {args.id}: {e}")
    saida = pathlib.Path("mapas") / m["arquivo"]
    miniatura = pathlib.Path("thumbs") / m["arquivo"]
    saida.parent.mkdir(exist_ok=True)
    miniatura.parent.mkdir(exist_ok=True)
    final.save(saida, "WEBP", quality=args.qualidade, method=6)
    th_w = 480
    th = final.resize((th_w, round(th_w * m["px_h"] / m["px_w"])), Image.LANCZOS)
    th.save(miniatura, "WEBP", quality=80, method=6)
    print(f'{args.id} ok: origem {origem.size[0]}x{origem.size[1]} -> {m["px_w"]}x{m["px_h"]}, '
          f"{saida.stat().st_size // 1024} KB, corte {corte:.1%}")


if __name__ == "__main__":
    main()
```

### B.5 `scripts/folha_contato.py`

```python
#!/usr/bin/env python3
"""Monta uma folha de contato para revisao visual rapida.

Uso: python3 scripts/folha_contato.py revisao/folha-rua.png m001 m002 m003 ... [--colunas 3] [--origem thumbs|bruto]
Em 'thumbs' usa thumbs/<arquivo>; em 'bruto' usa o arquivo mais recente bruto/<id>-t*.png
"""
import argparse
import glob
import json
import pathlib
import unicodedata

from PIL import Image, ImageDraw, ImageFont


FONTES = ["DejaVuSans.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "Arial.ttf",
          "/System/Library/Fonts/Supplemental/Arial.ttf", "C:/Windows/Fonts/arial.ttf"]


def carregar_fonte(tam=22):
    """Devolve (fonte, aceita_acentos). Sem fonte TTF, cai na padrao e remove os acentos."""
    for f in FONTES:
        try:
            return ImageFont.truetype(f, tam), True
        except OSError:
            continue
    return ImageFont.load_default(size=tam), False


def sem_acento(t):
    return unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()


def achar(m, origem):
    if origem == "thumbs":
        p = pathlib.Path("thumbs") / m["arquivo"]
        return p if p.exists() else None
    achados = sorted(glob.glob(f"bruto/{m['id']}-t*.png"))
    return pathlib.Path(achados[-1]) if achados else None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("saida")
    ap.add_argument("ids", nargs="+")
    ap.add_argument("--colunas", type=int, default=3)
    ap.add_argument("--origem", choices=["thumbs", "bruto"], default="thumbs")
    a = ap.parse_args()
    mapas = {m["id"]: m for m in json.loads(pathlib.Path("trabalho/mapas.json").read_text(encoding="utf-8"))}
    larg, alt_leg, gap = 600, 40, 16
    celulas = []
    for i in a.ids:
        m = mapas[i]
        p = achar(m, a.origem)
        celulas.append((m, Image.open(p).convert("RGB") if p else None))
    alt_img = max(round(larg * m["px_h"] / m["px_w"]) for m, _ in celulas)
    cols = min(a.colunas, len(celulas))
    linhas = -(-len(celulas) // cols)
    W = cols * larg + (cols + 1) * gap
    H = linhas * (alt_img + alt_leg) + (linhas + 1) * gap
    folha = Image.new("RGB", (W, H), (30, 30, 34))
    d = ImageDraw.Draw(folha)
    fonte, acentos = carregar_fonte(22)
    for n, (m, img) in enumerate(celulas):
        x = gap + (n % cols) * (larg + gap)
        y = gap + (n // cols) * (alt_img + alt_leg + gap)
        if img is not None:
            h = round(larg * img.size[1] / img.size[0])
            folha.paste(img.resize((larg, h), Image.LANCZOS), (x, y))
        else:
            d.rectangle([x, y, x + larg, y + alt_img], outline=(200, 60, 60), width=3)
            d.text((x + 12, y + 12), "sem imagem", fill=(200, 60, 60), font=fonte)
        legenda = f'{m["id"]}  {m["nome"][:42]}'
        d.text((x, y + alt_img + 6), legenda if acentos else sem_acento(legenda), fill=(235, 235, 235), font=fonte)
    pathlib.Path(a.saida).parent.mkdir(parents=True, exist_ok=True)
    folha.save(a.saida)
    print(f"{a.saida}: {len(celulas)} mapas, {W}x{H}")


if __name__ == "__main__":
    main()
```
