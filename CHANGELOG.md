# Changelog

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
