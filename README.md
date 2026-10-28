# SombraNeon para Foundry VTT

RPG cyberpunk de regras enxutas para runners numa cidade dominada por corporações. Inspirado em Shadowdark (livro v0.6 em `docs/sombraneon.md`, mais os compêndios de ameaças e de veículos e armamento em `docs/`).

Dois pacotes, para **Foundry VTT v13 (build 351 ou mais novo)**:

| Pacote | ID | O que traz |
|---|---|---|
| Sistema | `sombraneon` | Fichas, regras automáticas e os compêndios de regras (classes, origens, antecedentes, alinhamentos, características e talentos, programas, tabelas e o livro). |
| Módulo | `sombraneon-compendium` | Catálogo para arrastar para a ficha: armas (inclusive pesadas e de cerco), armaduras, equipamento e explosivos, implantes, veículos, mechas e módulos, ICE e malware, 66 ameaças prontas, tabelas do Mestre, os dois compêndios companheiros como diários, fichas prontas, macros e a aventura pronta **Noite das Máscaras**. |

## Instalação

No Foundry, em **Sistemas de jogo > Instalar sistema**, cole no campo *URL do manifesto*:

```
https://github.com/carloswithe/sombraneon-foundry/releases/latest/download/system.json
```

Depois, em **Módulos de complemento > Instalar módulo**:

```
https://github.com/carloswithe/sombraneon-foundry/releases/latest/download/module.json
```

Crie um mundo com o sistema SombraNeon e ative o módulo **SombraNeon: Compêndio**. A ficha não quebra sem o módulo, mas o assistente pula os passos de equipamento e implantes.

## Como usar

- **Criar personagem:** o assistente de criação abre sozinho ao criar um personagem (ou pelo botão da ficha). Ele segue os 7 passos do capítulo 2 do livro.
- **Seletores:** origem, classe, antecedente, alinhamento e gatilho de Edge preenchem habilidades, dado de vida, proficiências e conjuração.
- **Arrastar e soltar:** solte armas, armaduras, equipamento, implantes, programas, protocolos e Sets do compêndio em qualquer lugar da ficha. A compra segue a configuração "Compra ao soltar itens".
- **Ataques:** cada arma equipada, implante com arma, arma natural e o desarmado viram linhas com bônus e dano calculados. Clique ataca, Ctrl ou Alt abre as opções.
- **Mestre:** macros no compêndio do módulo (descanso em grupo, dar Edge, Alerta, gerador de Rede, gerador de missão, encontro por local, reação de facção, moral e iniciativa por grupo).
- **Ameaças:** os NPCs do compêndio trazem NA, CA, HP, Blindagem (BL), Moral e ataques prontos. A BL reduz o dano de armas comuns; armas com a propriedade Pesada (e explosões) ignoram. Moral Fanática ou "Sem medo" desliga o teste de moral.
- **Veículos:** a ficha mostra os veículos treinados (classe, antecedente e treino pago). Veículos, mechas, exoesqueletos e módulos são itens do módulo, com todos os números do compêndio; pilotagem e perseguição são rolagens manuais (d20 + DES + Manobra).

## Aventura pronta: Noite das Máscaras

O módulo traz uma aventura de assalto para 4 runners de nível 1 (uma sessão de até 4 horas), num baile de máscaras numa torre corporativa. Tudo dela fica na pasta **Noite das Máscaras** do menu de compêndios, na ordem de uso:

1. **Livro da Aventura (Mestre):** comece pelo `00. Índice: onde achar tudo`. Ele lista, sala por sala, o elenco, os itens e o butim, com links diretos. O `01. Guia rápido da mesa` cabe numa tela, e o livro tem uma página por capítulo.
2. **Material dos Jogadores:** o que entregar à mesa (briefing, personas, armas na festa e escala do Alerta).
3. **Elenco e Inimigos:** NPCs em pastas por sala, incluindo o Rex.
4. **Runners Prontos:** seis fichas de nível 1, uma por classe. Escolha quatro e arraste para o mundo.
5. **Itens e Butim:** Cache de Ruth, máscaras, adereços e o butim, com o XP do Debrief.
6. **Tabelas:** persona do runner e pagamento.

O texto da aventura fica em `docs/noite-das-mascaras.md`. Para atualizá-lo, troque o arquivo e rode `npm run build:packs`.

## Desenvolvimento

```
npm install
npm run verify        # sintaxe, testes, compêndios e validação
npm run release       # gera dist/system.zip, dist/module.zip e os manifests
```

O conteúdo vem de `docs/sombraneon.md` (tabelas e textos) mais a camada mecânica em `data/content/`. `npm run build:packs` compila os compêndios (LevelDB) com os IDs sempre iguais. Os testes rodam a lógica pura e um Foundry simulado (`tests/stub`); eles não substituem testar dentro do Foundry. A especificação original está em `docs/spec/`, e as decisões onde o livro é omisso estão em `docs/DECISIONS.md`.

## Licença e créditos

Código sob licença MIT. O conteúdo é do livro do autor. Fontes Orbitron, Rajdhani e Share Tech Mono sob SIL Open Font License. Antes de publicar o livro, confira a licença de terceiros do Shadowdark; por isso a marca não aparece nos títulos dos pacotes.
