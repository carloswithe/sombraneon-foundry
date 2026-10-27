# Changelog

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
