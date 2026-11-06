# Changelog

## [Não lançado]

### Corrigido
- **A ficha não salvava o que era digitado** (biografia, contatos, nome, Drive e os demais campos do formulário): os templates das fichas (personagem, NPC, ICE, drone e item) tinham um `<form>` próprio dentro do formulário da janela, então os campos pertenciam ao form de dentro e o envio da janela levava dados vazios. O botão dizia "Salvo", mas nada era gravado. Agora a janela é o único formulário e o salvamento ao sair do campo e o botão Salvar gravam de verdade. Teste novo trava a regressão.

## [0.9.1] - 2026-11-06

### Corrigido
- **Fichas prontas sem spoiler:** a aba **Bio** das fichas prontas da Noite das Máscaras e da Carga Sem Nome agora vem sempre vazia (biografia, nome civil e demais campos). A persona da festa, o plano de armas, o papel e o laço ficam só nos diários da aventura.
- **Botão Salvar na ficha** (personagem e NPC): envia o formulário na hora e mostra "Salvo" em verde por dois segundos; fica amarelo enquanto houver texto digitado e ainda não enviado. A ficha continua salvando sozinha ao sair de cada campo, e agora cada salvamento também confirma no botão.

## [0.9.0] - 2026-11-04

**CARGA SEM NOME**: a segunda aventura pronta, como **módulo próprio** (`sombraneon-carga-sem-nome`), independente do Compêndio e da Noite das Máscaras.

### Adicionado
- **Módulo `sombraneon-carga-sem-nome`** (manifesto `carga-sem-nome.json`, zip `carga-sem-nome.zip` na release), com dez compêndios na pasta *Carga Sem Nome*:
  - **Diários** (11): Leia primeiro (visão geral, a verdade, as três pistas, ficha de missão, mapa de tempo, regras de ritmo), O Alerta, Briefing e FAQ (as 10 perguntas, handouts), as cinco salas (Para ler, desafio, disposição das ameaças, resoluções, complicações, pista, butim, se atrasar, imagens), Debrief, Cortes e ajuste de nível 3, Notas de teste. Contadores com caixas de marcar (relógio do Posto, Folga, ciclo da torre, relógio da Beta, cabeças do Cérbero, mostrador, faixas da perseguição). Segredos do Mestre em `section.secret`.
  - **Imagens** (41, um diário por imagem com a arte, o texto para ler e as notas) e **Cenas** (5 mapas de mesa: grade de 1,5 m, paredes medidas sobre a arte, portas com estado e CD, luzes, regiões de cobertura, zona morta da torre, pins ligados aos diários, tokens nas posições iniciais, vista inicial e navegação).
  - **Ameaças** (11), **NPCs e aliados** (8) e **Runners prontos** (6, com HP, CA e slots conferidos contra as fichas), **Equipamentos** (10) e **Tesouros e Prêmio** (6, 9 XP de butim), **Tabelas** (8) e **Macros** (23).
- **Script do módulo:** ao importar uma cena, cria no mundo os atores que ela usa, liga os tokens às fichas e os pins às páginas dos diários, e devolve o acesso de observador aos handouts (o Foundry zera a permissão ao importar). API dos macros: Alerta (usa o rastreador do sistema), relógio da história, cronômetro, relógio do Posto, Folga, torre .50, Viatura Beta, cabeças do Cérbero, mostrador Leve, Padrão e Brutal, luzes e apagão do Túnel, cartão no painel, Cela A e B.
- **Ferramentas:** o escopo `carga` em `tools/build-packs.mjs` (com `--only=carga`), a validação e o release do novo módulo, `tools/gen-carga-tokens.ps1` (tokens a partir da arte) e 44 testes em `tests/ui/carga.test.mjs`.
- **Documentos:** `docs/carga-sem-nome.md` (texto), `docs/carga-sem-nome-imagens.md`, `docs/carga-sem-nome-foundry-instrucoes.md`, `docs/carga-sem-nome-mapeamento.md` e `docs/carga-sem-nome-relatorio.md` (relatório de verificação, divergências e a checklist de 15 minutos para o Mestre).

### Para mundos existentes
- Nada muda no sistema nem no Compêndio. Para jogar, instale `carga-sem-nome.json` e ative o módulo no mundo.
- O módulo foi verificado por testes e pela validação dos compêndios, **não** dentro de um Foundry (veja o relatório): faça a checklist de 15 minutos antes da mesa.

## [0.8.0] - 2026-11-03

**Regras adicionais opcionais** (Compêndio de Regras Adicionais v0.1) no sistema e no módulo, com o **marcador de Exaustão na ficha**.

### Exaustão (sistema)
- **Marcador na ficha do personagem**, ao lado do Edge: níveis 1 a 5 e a caveira do 6 (morte). Clique num nível para marcá-lo, clique no nível atual para baixar um, ou use - e +. Mostra "-N em todos os testes" e fica laranja quando há Exaustão. Marcar o 6 pede confirmação.
- **Penalidade automática** de -1 por nível em todos os testes de d20: ataques (aparece como parcela "Exaustão" na linha de ataque), testes de atributo e de resistência, iniciativa e execução de programas, protocolos e Sets. Não afeta dano, dados de vida nem a rolagem de quem está morrendo.
- **Ganho automático:** cair a 0 HP e apagar dá +1 nível, por queda (inclui dano não letal que derruba). Filtro de dor e Duro de matar, que seguram em pé, não geram. No nível 6 o runner morre na hora, sem rodadas de morrendo.
- **Perda automática:** cada descanso bem-sucedido remove 1 nível (interrompido não remove). Configuração para remover 2 (variante de Toca melhor).
- Ameaças e NPCs não usam Exaustão. A regra pode ser desligada nas configurações do mundo.
- Macro **Convalescer (Exaustão)** para a ação de Tempo livre.

### Efeito crítico (sistema)
- Regra opcional, **desligada por padrão**. Um runner que sofre um golpe de 10 ou mais de dano (gatilho configurável: 8, 10 ou 15) rola o Efeito crítico: 2d6 com -1 para cada 10 de dano acima de 10, local por 1d4 (linhas de membro rolam de novo em Neural e Corpo), coluna Carne ou Cromo conforme o implante ou a PMB no local (Androides são cromo por inteiro), e o resultado vai para o chat com o estado do cromo (desligado, danificado, destruído). O Choque dá +1 nível de Exaustão.
- Macro **Efeito crítico (regra opcional)** para NPCs nomeados e chefes (rolam só se sobreviverem) ou para rolar à mão.

### Módulo
- **Compêndio de Regras Adicionais** como diário (9 capítulos) em Compêndios de Referência.
- **Tabelas do Mestre:** Efeito crítico (2d6, 11 linhas com Carne e Cromo) e Efeito crítico: local do golpe (1d4).
- **Equipamento:** PMB (braço) e PMB (perna), 150 cr, 0 slots. Equipamento agora tem 29 itens.
- **Macros:** Efeito crítico e Convalescer (14 no total).
- **Procurado** e **Tempo livre entre missões** entram como texto no diário, sem automação: a mesa conduz.

### Para mundos existentes
- Atualize o sistema e o módulo. A Exaustão vem ligada, com todos os personagens em 0. Se não quiser usar, desligue em Configurações do jogo.
- As regras adicionais continuam opcionais: combine na sessão zero o que usar.

## [0.7.0] - 2026-11-02

Livro **v0.7** no sistema e no módulo, e dano digitado direto nas fichas.

### Livro v0.7
- **Ataque com FOR ou DES:** a escolha vale só para armas corpo a corpo Leves e para armas Leves arremessadas (a faca, por exemplo). **Arma de fogo ataca sempre com DES**, inclusive a pistola leve, que deixou de ser Leve. A escolha manual de FOR/DES na ficha da arma agora só vale para corpo a corpo Leve e para Leve arremessada.
- **Gel de reparo** (8.5, novo): 100 cr, 2 por slot, recupera 1d6 HP de um Android (você ou alguém Perto), uso único. Categoria própria e ícone próprio; entra no Equipamento do módulo (27 itens) e no carrinho do assistente de criação (2 por slot).
- **Stim:** a nota agora diz que cura orgânicos e não funciona em Androides.
- **Rig utilitário:** definido como a mochila do runner (o primeiro continua sem ocupar slot).
- Textos do Livro de Regras, tabelas e compêndios regerados da v0.7 (3.4 Android, 8.1, 8.3, 8.5, 9.3, 11.2, 11.3 e o histórico de versões). Os rótulos de origem dos itens passam a citar "Livro v0.7".

### Dano e cura digitados
- **Valor, Dano e Cura** nas fichas de jogador, ameaça, ICE e drone: digite o valor e aplique de uma vez, sem clicar de um em um. **Enter** no campo aplica como dano.
- O **Dano** segue as regras: a Blindagem da ameaça e as reduções da ficha valem, e uma notificação diz o quanto foi aplicado quando elas mudam o valor (a causa mais provável de "o dano não entrou" numa ameaça com Blindagem). **Shift** no Dano (ou Shift+Enter) aplica direto, sem reduções. A **Cura** soma até o máximo.
- Os botões - e + da ficha do jogador continuam, com Shift para 5.

### Para mundos existentes
- Atualize o sistema e o módulo. Uma pistola leve já no inventário mantém a propriedade Leve até ser arrastada de novo do compêndio, mas passa a atacar com DES de qualquer jeito.
- Pontos em aberto do livro: o Injetor embutido (7.4) guarda stims, que não funcionam em Androides, e o gel de reparo não entrou nos pacotes por classe nem no Kit de Runner.

## [0.6.0] - 2026-10-31

Os **mapas de mesa** da aventura Noite das Máscaras: dez Scenes prontos para jogar, conforme `docs/noite-das-mascaras-scenes.md`.

### Adicionado
- **Noite das Máscaras: Mapas de Mesa (10 Scenes):** Banca de Dona Ruth, Saguão Vermelho, Doca de Serviço, Baile no Anel, Elevador de Serviço e a Cache, Galeria dos Troféus, Corredor dos Rostos, Cofre da Diretoria, Anel Desmascarado e Rua em frente ao Estúdio, em pastas por sala. Cada um traz:
  - o tamanho da tabela do guia (de 6 x 4 a 36 x 24 quadrados) e grade quadrada de 100 px = 1,5 m;
  - paredes traçadas sobre a arte (cerca de 770 no total), portas e as trancas da aventura (elevadores no Alerta 4, porta da escada no apagão, painel da Cache com o código 3110, porta do cofre, elevador de serviço do Anel com o crachá nível 4);
  - luzes nas cores do guia (ciano, vermelho, âmbar), a câmera da Doca como luz giratória em cone, o Mural e o curto-circuito do Corredor, o botão de pânico de Aragão escondido;
  - regiões: cobertura total (caixas e carrinhos da Doca), colunas de vidro do Corredor (+2 de CA contra Taser, Rede e Metralhadora), faixas de parede do Mural (curto-circuito), multidão do Anel, terreno difícil do Anel Desmascarado, as três saídas da fuga no Cofre, a Isca da Galeria e o destino da fuga;
  - notas com os pontos de interesse e **tokens nas posições iniciais** (runners, Rex 2 x 2, Aragão, Drones, Seguranças, Teo Pixel, o Assistente, convidados e figurantes).
- **Tokens ligados às fichas:** ao importar um mapa, o módulo cria no mundo os atores do elenco que a cena usa (pasta *Noite das Máscaras*) e troca os marcadores por tokens ligados a eles. Os quatro marcadores *Runner* viram os personagens dos jogadores, na ordem dos nomes. Se faltar alguém, rode o macro *Noite: Montar tokens da cena*.
- **Noite das Máscaras: Macros (9):** estados de cena que viram um clique: travar os elevadores no Alerta 4, apagão da Galeria, Mural e curto-circuito do Corredor, botão de pânico de Aragão, e as trancas do crachá nível 4, do painel da Cache e da porta do cofre.
- **Guia dos mapas de mesa** (diário do Mestre, `02. Guia dos mapas de mesa`): o que já vem montado, o texto de cada mapa (contexto, o que mostrar, posições, estados), a lista de macros, o checklist e os prompts para gerar de novo. O índice e a caixa "Nesta cena" de cada sala do livro passam a linkar os mapas.
- A API do módulo (`game.modules.get('sombraneon-compendium').api`) expõe as funções usadas pelos macros.

### Para o Mestre
- A visão dos tokens está ligada nos mapas: os jogadores veem o que o token deles vê, com as paredes e portas do mapa. Se preferir mesa aberta, desligue em Configurações da cena.
- Alguns mapas saíram do gerador com rótulos em inglês na arte (por exemplo ELEVERTOR e STAFF DEOR), que o prompt pedia sem texto. Não atrapalham o jogo; troque o arquivo em `assets/noite-das-mascaras/mapas/` se quiser a arte limpa.
- A porta de emergência do mapa 8 não aparece na arte: foi posta na parede de cima, à esquerda.

### Para mundos existentes
- Nada muda nos packs anteriores. Os dois packs novos (Mapas de Mesa e Macros) aparecem na pasta Noite das Máscaras ao atualizar o módulo.

## [0.5.1] - 2026-10-30

As quatro imagens que faltavam da aventura **Noite das Máscaras** entraram. Agora estão todas as 24 do guia.

### Adicionado
- **Imagens (de 20 para 24):** 15 (Rex, Modo Contenção), 21 (O Rosto Livre), 22 (O Dossiê do Desmascaramento) e 23 (Meia-noite, o Desmascaramento), cada uma com seu diário (arte, texto para ler, notas do Mestre e prompt).
- **Cenários (de 11 para 12):** Meia-noite, o Desmascaramento, para ativar como Scene.
- **Retratos e ícones:** Rex passa a usar o retrato do Modo Contenção, e os itens Rosto Livre e Dossiê do Desmascaramento ganham a arte como ícone.
- As quatro imagens foram reduzidas para no máximo 2000 px no lado maior, o mesmo padrão das outras, para o módulo não ficar pesado.

### Para mundos existentes
- Nada muda nos packs anteriores. Atualize o módulo e o sistema; os diários, o cenário e os ícones novos aparecem nos packs da pasta Noite das Máscaras.

## [0.5.0] - 2026-10-30

Imagens da aventura **Noite das Máscaras** dentro do módulo, importáveis direto no Foundry.

### Adicionado
- **Noite das Máscaras: Imagens (20):** um diário por imagem, em pastas por cena. Cada diário tem a arte, o texto para ler em voz alta e as notas do Mestre (quando mostrar, para quem, dica). As imagens que entregam pistas (os cinco suspeitos dourados e a marca da Obelisco) vêm marcadas com "Cuidado". Uma página traz o prompt, para gerar a arte de novo.
- **Noite das Máscaras: Cenários (11):** os panoramas de ambiente prontos para ativar como Scene (sem grade, do tamanho da imagem).
- **Retratos e ícones com a arte:** Dona Ruth, Mordomo, Assistente, Teo Pixel, Rex, Rex Mk II e Lívia Aragão, e os itens Cache de Ruth, Crachá nível 4, Réplica, Núcleo de guarda de Rex.
- O Índice e as caixas "Nesta cena" do livro passam a listar as imagens e os cenários, com links.
- As imagens ficam em `assets/noite-das-mascaras/` do módulo. As 24 imagens do guia estão definidas em `docs/noite-das-mascaras-imagens.md`, e o build inclui sozinho cada uma cujo arquivo existir. Ainda faltam os arquivos das imagens 15 (Rex, Modo Contenção), 21 (Rosto Livre), 22 (Dossiê) e 23 (Meia-noite).
- Suporte a Scene e a páginas de imagem nos compêndios; o validate confere que as imagens citadas existem.

### Para mundos existentes
- Nada muda nos packs anteriores. Os dois packs novos aparecem na pasta Noite das Máscaras ao atualizar o módulo.

## [0.4.0] - 2026-10-28

Aventura pronta **Noite das Máscaras** (assalto de nível 1, uma sessão de até 4 horas) no módulo de compêndio, com tudo organizado numa pasta própria do menu de compêndios.

### Adicionado
- **Pasta "Noite das Máscaras"** no menu de compêndios (via `packFolders` do módulo), com seis packs na ordem de uso:
  - **Livro da Aventura (Mestre):** `00. Índice: onde achar tudo` (sala por sala, com links para elenco, itens, runners e tabelas), `01. Guia rápido da mesa` (pistas, mapa de tempo, regras de ritmo, Alerta e cortes) e o livro completo, com uma página por capítulo e uma caixa "Nesta cena: onde achar tudo" no fim de cada cena.
  - **Material dos Jogadores:** briefing de Dona Ruth, máscaras-convite e personas, armas na festa e escala do Alerta, já sem os segredos do Mestre.
  - **Elenco e Inimigos (10):** Dona Ruth, Mordomo, Segurança corporativa, Drone de vigilância, Assistente, Teo Pixel, Curador, **Rex** (ficha completa com modos Contenção e Letal), **Lívia Aragão** e o Rex Mk II do ajuste de nível 3, em pastas por sala.
  - **Runners Prontos (6):** Ferrugem (Solo), Pixel (Netrunner, Android), Agulha (Hyperdoc, Replicante), Sombra (Ghost, Biomod), Estática (Rocker) e Faísca (Rigger), com persona, máscara e adereço. Os números batem com as fichas impressas (HP, CA, slots, ataques e cura). O equipamento que passa pelo Portão vem empunhado, e o da Cache de Ruth vem marcado como tal.
  - **Itens e Butim (22):** Cache de Ruth (arraste para uma ficha para dividir nas granadas), pistola de polímero, embaralhador, pele cosmética, as seis máscaras holográficas, os adereços, o Prêmio Rosto Livre, o Dossiê, o Registro de acessos, o uísque, o Núcleo de Rex, o crachá nível 4 e a isca. O butim leva a categoria e o XP do Debrief.
  - **Tabelas (2):** persona do runner (d6) e pagamento por runner (d6 x 150 cr).
- Links entre documentos (`@Ref[pack/identificador]` e `@Pack[pack]`) resolvidos na compilação. Um link sem destino quebra o build.
- `npm run validate` agora confere que todo pack do conteúdo está declarado no manifesto, que as pastas citam packs existentes e que todos os links resolvem.
- Pastas dentro de Journals de compêndio.

### Para mundos existentes
- Nada muda nos packs anteriores. A pasta aparece sozinha ao atualizar o módulo. O módulo continua exigindo o sistema 0.3.0 ou mais novo (os runners usam as origens Android e Replicante).

## [0.3.0] - 2026-10-27

Atualização para o livro v0.6 e os compêndios de Ameaças v0.2 e de Veículos e Armamento v0.2.

### Alterado
- **Origens:** o Sintético foi dividido em **Replicante** (gente de carne cultivada) e **Android** (robô humanoide), então são 5 origens. "Sintético" continua como termo de rua. Características: 107.
- **Replicante:** Carne cultivada (vantagem em CON contra veneno, doença e fadiga), Propósito de fábrica (Combate, Infiltração, Companhia ou Labor, escolhido ao criar), Memória plantada (1 uso por descanso) e Registro.
- **Android:** Chassi (sem ração, imune a veneno e doença), Casco de fábrica, Interface nativa, Mente estável (1 implante a menos na ciberpsicose), Máquina e Visível. O assistente de criação já conta o ajuste de ciberpsicose do Android.
- **Máquina, automatizado:** estimulantes (Sistema de estimulantes e injetores) não funcionam em um Android, e protocolos de cura de Hyperdoc curam só metade, arredondando para cima. Estabilizar um Android dá vantagem com kit de ferramentas, no lugar do kit médico.
- **Ameaças (66):** Sintético de segurança virou Android de segurança, Sintético fugitivo virou Replicante fugitivo, e entraram Android fugitivo (NA 2) e Caçador de sintéticos (NA 5). Facções, organizações e tabelas de encontro seguem o livro. Ataques com "2 ataques por rodada" agora vêm com essa regra na nota, e não no nome.
- A ficha pronta Névoa passou a ser Android. Reparo em campo de Androides e pele cosmética (3.000 cr) estão no livro de regras e no compêndio de veículos.
- Biomod passou da seção 3.4 para a 3.5 (tabela de mutações).

### Corrigido
- `applyHealing` podia devolver 0 como valor curado em alguns casos (a diferença era calculada contra um objeto já atualizado).

### Para mundos existentes
- Personagens criados como Sintético continuam funcionando, pois mantêm os traços já copiados. Para usar as origens novas, troque a origem na ficha (o seletor de origem agora lista Replicante e Android).

## [0.2.1] - 2026-10-27

### Corrigido
- Fichas de ameaças, fichas prontas e outros atores dos compêndios não abriam, e fichas recém-criadas ficavam sem os valores derivados (HP, CA, slots, XP). Causa: o ator usava métodos privados que o Foundry chama durante a construção do documento (erro `Receiver must be an instance of class SNActor`). Trocados por métodos comuns, e o ambiente de testes agora reproduz essa ordem de construção.
- O botão Subir de nível agora aparece sempre (esmaecido enquanto falta XP). Antes só aparecia com o XP completo, então parecia que a mecânica não existia. O Mestre pode subir de nível a qualquer momento.

## [0.2.0] - 2026-10-27

Atualização para o livro v0.5 e os dois compêndios companheiros.

### Adicionado
- Livro v0.5: capítulo 10 (Missões e progressão) e notas de versão no livro de regras (12 páginas), geradores de missão (contratante, tipo, local, complicação) e Farra como tabelas, e a linha "Mercenários e companhias privadas" na reação por facção.
- Treino em veículos (4.7): Leves, Médios, Pesados e Mechas por classe e por antecedente (Piloto de transporte, Mecânico, Mercenário), com treino pago marcável na ficha. Rigger ganha Interface veicular e Mecânico de campo (101 características).
- Título de rua por classe e nível (10.8) na ficha.
- Sobrecarga (10.3.3): passar do limite de slots dá desvantagem em testes de DES.
- Blindagem (BL) nos NPCs: reduz o dano de armas comuns; propriedade de arma Pesada ignora. Moral por categoria (Fraca 18, Normal 15, Firme 12, Fanática nunca foge), NA, movimento e alinhamento na ficha de NPC.
- Módulo: 64 ameaças (46 fichas, 7 IAs, 10 veículos e mechas hostis e a torreta), ICE adicional e malware (17 no total), 26 veículos, 8 mechas, 3 exoesqueletos e 18 módulos de veículo, 10 armas pesadas pessoais, 15 armas montadas e de cerco, 8 explosivos, 17 tabelas do Mestre (perigos, encontros por local, NPC rápido, nomes de rua, IA, avarias) e os dois compêndios como diários de referência.
- Macros "Gerador de missão" e "Encontro por local".

### Corrigido
- O aviso de implante no mesmo slot mostrava o nome interno do slot (`arms`, `body`) e não dizia quais implantes colidiam. Agora mostra o slot em português e os nomes dos implantes em conflito, e a ficha ganhou o botão "Desinstalar os implantes que sobram". O aviso só aparece quando há de fato dois implantes instalados no mesmo slot; se ele surgir sem você ter instalado dois, procure um implante duplicado na aba Posses.

### Alterado
- Os veículos antigos do livro (moto, carro, van, aerocarro) agora vêm do compêndio de veículos, com CA, HP, BL, Manobra, velocidade, hardpoints e licença.

## [0.1.1] - 2026-10-27

### Corrigido
- Abas da ficha (Resumo, Ataques, Cromo...) não respondiam: a ação `tab` colidia com a ação do núcleo do Foundry v13. Renomeada para `snTab`.
- Botões do cabeçalho da janela (fechar, configurar...) apareciam como quadrados: a fonte do sistema sobrescrevia o Font Awesome.
- Rolagens das macros e dos cartões de evento (Rede, Reação, Moral, descanso, Feedback...) agora respeitam o modo de rolagem do chat (privado, às cegas, para si).

## [0.1.0] - 2026-10-27

Primeira versão.

### Adicionado
- Sistema `sombraneon` para Foundry v13: modelos de dados, fichas (personagem, NPC, ICE, drone, item), seletores com concessões, ataques derivados, arrastar e soltar, assistente de criação, rolagens com Edge, programas, protocolos e Sets (Crash, Feedback, Rejeição), Alerta, descanso, morrendo, ciberpsicose, imersão e Firewall, talentos, subir de nível e drone do Rigger.
- Compêndios do sistema: 6 classes, 4 origens, 20 antecedentes, 3 alinhamentos, 99 características e talentos, 45 programas, protocolos e Sets, 17 tabelas e o livro de regras.
- Módulo `sombraneon-compendium`: 12 armas, 3 armaduras, 18 itens de equipamento, 28 implantes, 7 veículos e módulos de drone, 5 ICE, 6 fichas prontas e 10 macros.
