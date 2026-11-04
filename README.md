# SombraNeon para Foundry VTT

RPG cyberpunk de regras enxutas para runners numa cidade dominada por corporações. Inspirado em Shadowdark (livro v0.7 em `docs/sombraneon.md`, mais os compêndios de ameaças e de veículos e armamento em `docs/`).

Três pacotes, para **Foundry VTT v13 (build 351 ou mais novo)**:

| Pacote | ID | O que traz |
|---|---|---|
| Sistema | `sombraneon` | Fichas, regras automáticas e os compêndios de regras (classes, origens, antecedentes, alinhamentos, características e talentos, programas, tabelas e o livro). |
| Módulo | `sombraneon-compendium` | Catálogo para arrastar para a ficha: armas (inclusive pesadas e de cerco), armaduras, equipamento e explosivos, implantes, veículos, mechas e módulos, ICE e malware, 66 ameaças prontas, tabelas do Mestre, os dois compêndios companheiros como diários, fichas prontas, macros e a aventura pronta **Noite das Máscaras**. |
| Módulo da aventura | `sombraneon-carga-sem-nome` | Aventura pronta **CARGA SEM NOME** (extração, ataque a comboio e perseguição, 5 runners de nível 1): fichas, diários, 41 imagens e retratos, 5 mapas de mesa com paredes e tokens, tabelas e macros. Independente do módulo Compêndio. |

## Instalação

No Foundry, em **Sistemas de jogo > Instalar sistema**, cole no campo *URL do manifesto*:

```
https://github.com/carloswithe/sombraneon-foundry/releases/latest/download/system.json
```

Depois, em **Módulos de complemento > Instalar módulo**:

```
https://github.com/carloswithe/sombraneon-foundry/releases/latest/download/module.json
```

Para jogar a aventura **CARGA SEM NOME** (módulo independente, não precisa do Compêndio), instale também:

```
https://github.com/carloswithe/sombraneon-foundry/releases/latest/download/carga-sem-nome.json
```

Crie um mundo com o sistema SombraNeon e ative o módulo **SombraNeon: Compêndio** (e, se for jogar a aventura, **SombraNeon: CARGA SEM NOME**). A ficha não quebra sem o módulo, mas o assistente pula os passos de equipamento e implantes.

## Como usar

- **Criar personagem:** o assistente de criação abre sozinho ao criar um personagem (ou pelo botão da ficha). Ele segue os 7 passos do capítulo 2 do livro.
- **Seletores:** origem, classe, antecedente, alinhamento e gatilho de Edge preenchem habilidades, dado de vida, proficiências e conjuração.
- **Arrastar e soltar:** solte armas, armaduras, equipamento, implantes, programas, protocolos e Sets do compêndio em qualquer lugar da ficha. A compra segue a configuração "Compra ao soltar itens".
- **Ataques:** cada arma equipada, implante com arma, arma natural e o desarmado viram linhas com bônus e dano calculados. Clique ataca, Ctrl ou Alt abre as opções.
- **Mestre:** macros no compêndio do módulo (descanso em grupo, dar Edge, Alerta, gerador de Rede, gerador de missão, encontro por local, reação de facção, moral e iniciativa por grupo).
- **Ameaças:** os NPCs do compêndio trazem NA, CA, HP, Blindagem (BL), Moral e ataques prontos. A BL reduz o dano de armas comuns; armas com a propriedade Pesada (e explosões) ignoram. Moral Fanática ou "Sem medo" desliga o teste de moral.
- **Veículos:** a ficha mostra os veículos treinados (classe, antecedente e treino pago). Veículos, mechas, exoesqueletos e módulos são itens do módulo, com todos os números do compêndio; pilotagem e perseguição são rolagens manuais (d20 + DES + Manobra).

## Regras adicionais (opcionais)

O módulo traz o **Compêndio de Regras Adicionais** (`docs/sombraneon-regras-adicionais.md`) como diário em *Compêndios de Referência*, com as tabelas de **Efeito crítico** (2d6 e local 1d4) nas Tabelas do Mestre, as **PMB** (braço e perna, 150 cr) no Equipamento e os macros *Efeito crítico* e *Convalescer*. No sistema, em Configurações do jogo:

- **Exaustão** (ligada por padrão): a ficha ganha um marcador de 0 a 6 (clique no nível, ou use - e +). Cada nível dá -1 em todos os testes de d20 (ataque, atributo, resistência, iniciativa e execução de programas), cair a 0 HP e apagar dá +1 nível, cada descanso bem-sucedido tira 1 e o nível 6 é morte. Ameaças e NPCs não usam. Dá para remover 2 níveis por descanso (variante em teste).
- **Efeito crítico** (desligado por padrão): quando um runner sofre um golpe de 10 ou mais de dano (gatilho 8, 10 ou 15), o sistema rola o 2d6 com o modificador do dano, o local e a coluna Carne ou Cromo, e posta no chat. O Choque dá +1 nível de Exaustão. Para NPCs nomeados e chefes, use o macro.
- **Procurado** e **Tempo livre** ficam como texto no compêndio: a mesa conduz.

## Aventura pronta: Noite das Máscaras

O módulo traz uma aventura de assalto para 4 runners de nível 1 (uma sessão de até 4 horas), num baile de máscaras numa torre corporativa. Tudo dela fica na pasta **Noite das Máscaras** do menu de compêndios, na ordem de uso:

1. **Livro da Aventura (Mestre):** comece pelo `00. Índice: onde achar tudo`. Ele lista, sala por sala, o elenco, os itens e o butim, com links diretos. O `01. Guia rápido da mesa` cabe numa tela, e o livro tem uma página por capítulo.
2. **Material dos Jogadores:** o que entregar à mesa (briefing, personas, armas na festa e escala do Alerta).
3. **Imagens:** um diário por imagem, com a arte, o texto para ler em voz alta e as notas do Mestre. Use *Mostrar aos jogadores* no diário.
4. **Cenários:** os panoramas de ambiente prontos para ativar como cena.
5. **Mapas de Mesa:** os dez mapas táticos já montados como Scene: grade de 1,5 m, paredes, portas (trancadas quando a aventura manda), luzes, regiões de cobertura e perigo, notas e tokens nas posições iniciais. Ao importar um mapa, o módulo cria no mundo os atores do elenco que a cena usa e liga os tokens a eles; os quatro marcadores *Runner* viram os personagens dos jogadores.
6. **Elenco e Inimigos:** NPCs em pastas por sala, incluindo o Rex.
7. **Runners Prontos:** seis fichas de nível 1, uma por classe. Escolha quatro e arraste para o mundo.
8. **Itens e Butim:** Cache de Ruth, máscaras, adereços e o butim, com o XP do Debrief.
9. **Tabelas:** persona do runner e pagamento.
10. **Macros:** os estados de cena (Alerta 4, apagão da Galeria, Mural e curto-circuito do Corredor, botão de pânico, trancas).

O texto da aventura fica em `docs/noite-das-mascaras.md`, o guia de imagens em `docs/noite-das-mascaras-imagens.md` e o guia dos mapas de mesa em `docs/noite-das-mascaras-scenes.md`. A geometria dos mapas (paredes, luzes, regiões e tokens, em pixels da própria imagem) fica em `data/content/adventure-maps-data.mjs`. Para acrescentar uma imagem, salve o arquivo em `modules/sombraneon-compendium/assets/noite-das-mascaras/` com o nome definido no guia (número, hífen e título, por exemplo `15-rex-modo-contencao.jpg`) e rode `npm run build:packs`. Para atualizá-lo, troque o arquivo e rode `npm run build:packs`.

## Aventura pronta: CARGA SEM NOME

Módulo próprio (`sombraneon-carga-sem-nome`), independente do Compêndio e da Noite das Máscaras: uma aventura de extração para 3 a 6 runners de nível 1 (uma sessão de até 4 horas). Um blindado de custódia com uma .50 no teto, um túnel sem luz, um robô de três cabeças e uma fuga com a cidade na sirene. Tudo fica na pasta **Carga Sem Nome** do menu de compêndios:

1. **Diários da aventura (Mestre):** comece pelo `00 Leia primeiro` (visão geral, a verdade, as três pistas, ficha de missão, mapa de tempo). Depois o `01 O Alerta`, o `02 Briefing e FAQ` (as 10 perguntas, com as respostas para ler e os handouts), um diário por sala (`Sala 1` a `Sala 5`, cada um com o "Para ler", a disposição das ameaças, as resoluções, as complicações, o butim e o que fazer se atrasar), o `08 Debrief`, os cortes e o ajuste de nível 3, e as notas de teste. Os segredos do Mestre ficam em seções ocultas aos jogadores.
2. **Imagens e retratos:** um diário por imagem (41), com a arte, o texto para ler em voz alta e as notas. Os seis handouts do briefing já vêm com acesso de observador.
3. **Cenas (mapas de mesa):** os cinco mapas (Ferro-Velho Tavares, Posto Meia-Lua, Estrada Sem Luz, Túnel Pluvial, Via Expressa 12), com a grade de 1,5 m, paredes, portas (trancadas quando a aventura manda), luzes, regiões de cobertura, zona morta da torre e pilares, pins ligados aos diários e os tokens nas posições iniciais. Ao importar uma cena, o módulo cria no mundo os atores que ela usa (pasta *Carga Sem Nome*), liga os tokens a eles e liga os pins às páginas dos diários. Os seis runners prontos entram nas posições de partida: apague os que não usar e dê a propriedade dos outros aos jogadores.
4. **Ameaças (11), NPCs e aliados (8), Runners prontos (6):** fichas completas, com o texto integral dos traços, das regras da casa e dos segredos (o Cérbero com as três cabeças, o Jararaca com as partes, Nest com os dois estados).
5. **Equipamentos (10) e Tesouros e Prêmio (6):** o butim traz categoria, XP (9 no total), valor de venda, onde está e como pegar.
6. **Tabelas:** as complicações de cada sala, o Alerta (consulta), as resoluções da perseguição e o destino de Daigo.
7. **Macros (23):** Alerta +1 e -1 (usam o rastreador do sistema), relógio da história, cronômetro, relógio do Posto, Folga, torre .50, Viatura Beta, cabeças do Cérbero, mostrador Leve, Padrão e Brutal, luzes e apagão do Túnel, cartão no painel, Cela A e Cela B, e montar tokens da cena.

O texto da aventura fica em `docs/carga-sem-nome.md`, o guia das imagens em `docs/carga-sem-nome-imagens.md` e as instruções de montagem em `docs/carga-sem-nome-foundry-instrucoes.md`. O mapeamento do texto para os campos do sistema está em `docs/carga-sem-nome-mapeamento.md` e o relatório de verificação em `docs/carga-sem-nome-relatorio.md`. Os dados ficam em `data/content/carga/` e os mapas em `data/content/carga/maps-data.mjs` (em casas de grade, medidas sobre a arte).

**Trocar a arte:** salve o arquivo novo com o mesmo nome em `modules/sombraneon-carga-sem-nome/assets/` (`img/`, `maps/`, `portraits/`) e rode `npm run build:packs`. Para os mapas, mantenha a proporção 3:2: as paredes foram medidas sobre a arte atual, então uma arte nova pode pedir ajuste de escala e posição do fundo na cena. Os tokens (`assets/tokens/`) vêm de `tools/gen-carga-tokens.ps1` (Windows PowerShell); o script não sobrescreve um token que já existe.

## Desenvolvimento

```
npm install
npm run verify        # sintaxe, testes, compêndios e validação
npm run release       # gera dist/system.zip, dist/module.zip e os manifests
```

O conteúdo vem de `docs/sombraneon.md` (tabelas e textos) mais a camada mecânica em `data/content/`. `npm run build:packs` compila os compêndios (LevelDB) com os IDs sempre iguais. Os testes rodam a lógica pura e um Foundry simulado (`tests/stub`); eles não substituem testar dentro do Foundry. A especificação original está em `docs/spec/`, e as decisões onde o livro é omisso estão em `docs/DECISIONS.md`.

## Licença e créditos

Código sob licença MIT. O conteúdo é do livro do autor. Fontes Orbitron, Rajdhani e Share Tech Mono sob SIL Open Font License. Antes de publicar o livro, confira a licença de terceiros do Shadowdark; por isso a marca não aparece nos títulos dos pacotes.
