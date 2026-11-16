# Compêndio de Mapas Aleatórios: relatório

*Montado em 2026-11-15, dentro do módulo `sombraneon-compendium`. Mapeamento e decisões em `docs/compendio-mapas-mapeamento.md`.*

## 1. O que foi gerado

| Item | Quantidade |
|---|---|
| Cenas (compêndio `mapas-cenas`) | **100**, em 10 pastas (uma por categoria) |
| Cenas com arte final | 100 (nenhum placeholder) |
| Cenas **com paredes automáticas** | **83** (6.954 segmentos, média de 84 por cena) |
| Cenas sem paredes | 17: 15 reprovadas na conferência e as 2 da Rede |
| Diários (`mapas-diarios`) | 11: o `00 Leia primeiro` (9 páginas) e um por categoria (20 páginas: texto e imagem de cada mapa) |
| Tabelas (`mapas-tabelas`) | 14: d100, categoria (d10), 10 por categoria (d10), local do contrato (d8) e pacote essencial (d20) |
| Macros (`mapas-macros`) | 2: *Mapa aleatório (d100)* e *Importar mapa por categoria* |
| Peso | assets 25 MB (23 MB de fundos e 2 MB de miniaturas) e 1 MB de compêndios |

Cada cena traz o fundo no tamanho `grade x 100 px`, grade quadrada de 100 px (1 casa = 1,5 m) e uma nota *Entrada dos runners* a 50 px da borda indicada. Não há tokens, portas, janelas nem luzes.

Dois acréscimos ao plano: o `Leia primeiro` tem uma 9ª página, **Cenas, paredes e macros neste módulo**, que explica o que vem montado; e as tabelas têm descrição de uso.

## 2. Fase 2: paredes

Método: `detectar_paredes.py` do plano, com `--limiar-preto 24 --massas` (duas opções acrescentadas, explicadas no mapeamento). Cada um dos 98 mapas físicos teve a sobreposição conferida a olho, em folhas de 4. **Aprovei só o que cobre as paredes principais e não inventa muita coisa.**

**Cena aprovada** (83): `tokenVision` e névoa ligados, iluminação global desligada, escuridão por tom de luz (claro 0, penumbra 0,35, escuro 0,6).
Por tom: claro 18 de 18, penumbra 41 de 53, escuro 24 de 29.

### Reprovados (ficam só com fundo e grade)

| Mapa | Motivo |
|---|---|
| m008, m020 | telhado: o parapeito é cinza escuro, não preto; sai incompleto ou vira ruído nos tanques e dutos |
| m009 | passarela: paredes parciais, o resto é a cidade vista abaixo |
| m010 | rodovia: só as grades laterais, as barreiras são cinza |
| m053 | pátio aberto: nenhuma faixa preta, 0 segmentos |
| m056 | subestação: cerca fina e cinza, só a casa de controle foi detectada |
| m057 | refinaria: poucas faixas pretas, segmentos falsos nas torres |
| m058 | oficina e desmanche: o galpão saiu bem, mas poças de óleo pretas e janelas de carros viraram dezenas de paredes falsas |
| m059 | estação de água: só os prédios pequenos, incompletos |
| m070 | pátio ferroviário: 5 segmentos |
| m079 | base militar: paredes parciais, 30% do preto |
| m081 | pátio de contêineres: o relevo cinza dos contêineres não gera faixa preta |
| m096 | estrada e posto: só a loja pequena, 10 segmentos |
| m097 | ponte: ruído nas ondas do rio |
| m098 | ferro-velho: centenas de segmentos falsos nas carcaças |
| m089, m090 | Rede: espaço virtual, sem Fase 2 por regra do plano |

Os 15 reprovados foram reprocessados com duas variantes de parâmetros e não melhoraram. Todos podem ganhar paredes à mão, ou numa segunda rodada com ajuste mapa a mapa.

### Limites das paredes aprovadas

- **Portas e janelas não existem.** Toda parede bloqueia movimento, visão, luz e som por inteiro. Para abrir uma passagem, marque uma porta à mão na cena.
- **Segmentos a mais** (esperado pelo plano): janelas pretas de carros e hélices de aeronaves viram pequenos retângulos de parede (m004, m005, m071); entulho nos cantos do m085; balcões pretos do m044.
- **Segmentos na água** (m076): linhas ao longo das faixas de mar preto, fora do casco.
- **Cobertura parcial em exteriores** (m003, com 34% do preto, e m028): as paredes marcadas são fiéis, mas só cobrem prédios e guaritas, não cercas e barreiras cinza.
- **Paredes são contornos aproximados**: curvas viram polígonos, e há cantos com pequenos triângulos de fechamento (m040).
- A arte de IA não bate exatamente com a grade; se mudar escala ou posição do fundo, as paredes precisam acompanhar.

## 3. Verificação

Rodado na máquina de desenvolvimento, sem o Foundry:

| Verificação | Resultado |
|---|---|
| `npm run check` (sintaxe) | ok, 129 arquivos |
| `npm test` | **280 de 280** passam, 13 deles novos (`tests/ui/mapas-compendio.test.mjs`) |
| `npm run validate` | ok, 43 packs, 848 documentos |
| Contagens | 100 cenas, 10 pastas, 11 diários, 14 tabelas, 2 macros |
| Links | 476 `@UUID` e `documentUuid` conferidos nos packs compilados, **0 quebrados** |
| Cenas | `width` e `height` iguais a `grade x 100`; imagem do mesmo tamanho; grade 100 px, 1,5 m, `m`; `padding` 0; 1 nota dentro dos limites; todas as paredes dentro da cena |
| Imagens | `conferir_imagens.py`: 100 mapas, 100 com arte final, 0 erros |
| Travessões | nenhum nos dados do módulo (`validate.mjs`) |
| Acesso de jogador | cenas, diários, tabelas e macros sem acesso de jogador (`ownership default 0` e `NONE`) |

## 4. Não testado

**Nada foi aberto no Foundry.** Não havia Foundry instalado, então ficou sem teste:

- ativar o módulo no mundo e ver erros de console;
- abrir as 100 cenas, ver se a grade bate com a arte e se as paredes ficam no lugar;
- o formato `documentUuid` dos resultados de tabela (Foundry v13) e se a tabela abre a cena ao rolar;
- os dois macros (`sortearMapa` e `importarMapaPorCategoria` usam `importFromCompendium`, `DialogV2` e `ChatMessage.create`) e a legibilidade de cenas escuras com a iluminação global desligada;
- o esquema real (`resources/app/common`), que o plano pedia na Fase 0.

## 5. Checklist de 10 itens para o Mestre (10 minutos)

1. Atualize o módulo, ative no mundo e confira o console (F12): sem erros.
2. No menu de compêndios, a pasta **Mapas Aleatórios** tem 4 compêndios.
3. Em **Mapas: Cenas**, importe `M021. Delegacia de bairro` (arrastando ou pelo botão direito) e ative. A grade bate com os móveis (portas de uma casa)?
4. Com a cena ativa, as paredes ficam sobre as faixas pretas? Selecione as paredes (ferramenta de paredes) e confira.
5. Em um mapa escuro com paredes (por exemplo `M001`), o mapa é legível? Se ficar escuro demais, ligue *Iluminação global* na cena.
6. Importe um mapa sem paredes (`M008`): o fundo e a grade aparecem, visão desligada.
7. Role a tabela **Mapa aleatório (d100)**: o resultado é um link que abre a cena.
8. Rode o macro **Mapas: Mapa aleatório (d100)**: importa a cena para a pasta "Mapas aleatórios", posta o resumo só para o Mestre e pergunta se ativa.
9. Rode **Mapas: Importar mapa por categoria**: abre a categoria, depois os mapas com miniatura, e importa sem duplicar.
10. Abra um diário de categoria: o texto do mapa, o link "Abrir a cena" e a página de imagem funcionam; use *Mostrar aos jogadores* na imagem.

## 6. Próximos passos sugeridos

- Fazer a checklist acima no Foundry e me dizer o que não bateu.
- Paredes dos 15 mapas reprovados, à mão ou por segunda rodada.
- Portas nos mapas que o Mestre mais usar.
- Publicar: versão nova do módulo (por exemplo 0.10.0), `npm run release`, tag e release no GitHub. Isso não foi feito.
