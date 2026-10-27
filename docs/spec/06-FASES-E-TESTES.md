# 06. Fases, testes e decisões abertas

Trabalhe **uma fase por vez**, em uma branch `fase-N-nome`. Ao fim de cada fase: todos os comandos de verificação passando, `docs/ACCEPTANCE.md` atualizado com o roteiro manual daquela fase, dúvidas abertas listadas, e **pare para o autor testar**. Você não consegue abrir o Foundry; por isso o roteiro manual precisa ser claro e curto.

Comando de verificação padrão (a cada commit): `npm run lint && npm test && npm run build:packs && npm run validate`.

## 1. Visão geral

| Fase | Nome | Resultado visível para o autor |
|---|---|---|
| 0 | Fundação | O sistema e o módulo aparecem no Foundry e carregam sem erro. |
| 1 | Lógica pura e modelo de dados | Nada novo na tela, mas todas as regras numéricas testadas. |
| 2 | Conteúdo do sistema e pipeline | Os compêndios do sistema aparecem cheios (classes, origens, programas, tabelas, livro). |
| 3 | Ficha, seletores, concessões e ataques | Escolher classe e origem preenche a ficha; ataques aparecem sozinhos. |
| 4 | Módulo de catálogo e arrastar e soltar | Arrastar arma, armadura, equipamento, implante e programa funciona. |
| 5 | Rolagens, talentos, nível, programas e Edge | Testes, talento por 2d6, subir de nível, executar programa, Edge. |
| 6 | Assistente e mecânicas de campanha | Assistente de criação, descanso, morte, ciberpsicose, imersão, drone, NPC, ICE, combate, fichas prontas. |
| 7 | Polimento e lançamento | Inglês, migrações, acessibilidade, releases e manifests. |

## 2. Fase 0: Fundação

**Perguntar ao autor (uma vez, antes de codar):**
1. Qual versão do Foundry ele usa? (padrão v14; ver `00` seção 4).
2. Nome do repositório e usuário do GitHub (`OWNER/REPO`), nome do autor para os manifests e licença do código.
3. Confirmar as decisões da seção 7 (ou aceitar os padrões).

**Tarefas**

1. Estrutura de pastas de `01-ARQUITETURA.md`; `package.json` (Node 20+, ESM), `eslint`, `prettier`, `vitest`, `@foundryvtt/foundryvtt-cli`, `js-yaml`, `marked` (ou equivalente), `ajv`.
2. `systems/sombraneon/system.json` e `modules/sombraneon-compendium/module.json` conforme os exemplos (confirme campos na documentação de manifests).
3. `sombraneon.mjs`: `Hooks.once('init')` registra `CONFIG.SOMBRANEON`, classes de documento vazias (`SNActor`, `SNItem`), sheets mínimas e o `game.sombraneon.api` vazio.
4. `tools/`: `link-dev.mjs` (symlink para `$FOUNDRY_DATA`), `validate.mjs` (esqueleto com a checagem de travessões), `build-packs.mjs` (esqueleto), `extract-book.mjs` (esqueleto).
5. `docs/API-NOTES.md` com todas as APIs do checklist da seção 8 de `01` (nome, link, assinatura confirmada, observações).
6. `docs/DECISIONS.md` e `docs/ACCEPTANCE.md` (modelos).
7. CI do GitHub Actions (lint, test, build, validate).
8. `.gitignore` (inclui `refs/`, `node_modules`, `dist`, `*.pdf`).

**Critérios de saída**

- `npm run lint`, `npm test` (pode haver 1 teste de sanidade) e `npm run validate` verdes.
- No Foundry: é possível criar um mundo com o sistema, ativar o módulo, criar um ator de cada tipo e um item de cada tipo sem erro no console. As fichas são mínimas.

**Roteiro manual F0:** criar mundo, ativar módulo, criar ator `character`, abrir ficha, criar item `weapon`, ver o console sem erros.

## 3. Fase 1: Lógica pura e modelo de dados

**Tarefas**

1. `src/logic/` completo e com testes (TDD), pelo menos: `abilities.mjs`, `hp.mjs`, `ac.mjs`, `slots.mjs`, `xp.mjs`, `casting.mjs` (inclui `tierMax`, `knownMax`, CD, Sets), `chrome.mjs` (ciberpsicose), `modifiers.mjs` (coleta, `when`, tokens, `mode`), `formulas.mjs` (avaliador seguro de fórmulas curtas, **sem `eval`**), `dice.mjs` (construção de fórmula com vantagem, crítico e dobra de dados), `advantage.mjs`, `combat.mjs` (CA do alvo, `ignoreArmor`, rajada), `economy.mjs` (preço, saldo, empilhar, slots por pilha), `rest.mjs`, `dying.mjs`, `drone.mjs`, `reaction.mjs`.
2. `src/data/` com todos os `TypeDataModel` de `02`. `migrateData` para a versão 1.
3. `SNActor#prepareDerivedData` e `SNItem` com a coleta de modificadores, **usando só funções de `logic/`**.
4. Vetores de teste de `02` seção 6.5 e quadro de pregens de `05` seção 11.6 implementados como testes.

**Critérios de saída**

- Cobertura de linhas em `src/logic/` acima de 90%.
- Todos os vetores passam. Um teste de propriedade confirma que `abilityMod` é monótona e que `armorClass` nunca é NaN.
- No Foundry: abrir um ator, ver (em uma ficha provisória) os derivados corretos para dados digitados à mão.

**Roteiro manual F1:** criar `character` com FOR 14, DES 12, CON 14, nível 1; ver `slots.max` 14, CA 11, `hp.max` calculado do `hp.rolls` digitado.

## 4. Fase 2: Conteúdo do sistema e pipeline

**Tarefas**

1. `tools/extract-book.mjs` completo; `data/extracted/*.json`.
2. YAML de `data/source/system/**` para todos os packs do sistema (`05` seções 3 a 8, 12), com a camada mecânica.
3. `tools/build-packs.mjs`: IDs determinísticos, pastas, `_key`, conversão Markdown para HTML, resolução de `ref:`, compilação com o CLI, ida e volta.
4. `tools/validate.mjs`: contagens (`05` seção 1), faixas das tabelas sem lacunas, referências resolvidas, `identifier` único, travessões, imagens existentes, soma dos pacotes iniciais, schema dos YAML.
5. `systems/sombraneon/packs/*` gerados e versionados (ou gerados no release, conforme decisão do autor; padrão: **versionados** para facilitar clonar e testar).
6. Ícones SVG básicos.

**Critérios de saída**

- `npm run build:packs` duas vezes seguidas gera conteúdo idêntico.
- `npm run validate` confere as 105 características, 45 programas, 17 tabelas, 6 classes, 4 origens, 20 antecedentes, 3 alinhamentos.
- No Foundry: os compêndios aparecem na barra lateral, cada tabela rola e devolve o item certo, o Journal abre com 10 páginas.

**Roteiro manual F2:** abrir cada compêndio e conferir 3 itens contra o livro; rolar `talentos-solo` 5 vezes e ver a faixa correta; rolar `mutacoes-biomod`; ler a página "Hacking e a Rede".

## 5. Fase 3: Ficha, seletores, concessões e ataques

**Tarefas**

1. `SNCharacterSheet` com cabeçalho, abas **Resumo, Ataques, Posses, Cromo** (Programas, Rede e Bio nas fases seguintes, mas já com `PARTS` vazias), modo Edição, avisos, dicas de decomposição, estilos e fontes (`04`).
2. Seletores de origem, classe, antecedente, alinhamento e gatilho de Edge (`03` seção 2), `applySelection`, `GrantEngine`, `ChoiceDialog`.
3. Linhas de ataque derivadas e `RollDialog`/`AttackDialog` básicos (apenas ataque e dano, com crítico), cartões de chat.
4. Edição de itens (`SNItemSheet`) para todos os tipos, com o editor de modificadores.
5. Equipar e desequipar (armas, armadura).

**Critérios de saída**

- Escolher **Solo** preenche d8, proficiências, Domínio de arma (pergunta família), Chassi, Resistente, Duro de matar, pacote inicial disponível por botão.
- Escolher **Netrunner** mostra Deck e Programas, e a aba Programas indica "0 / 2 conhecidos".
- Trocar de classe remove somente o que a classe antiga concedeu.
- Linhas de ataque aparecem com bônus e dano corretos ao equipar a Pistola pesada do Solo com Domínio `pistols` (ex.: +3 e d8+2 com Arma afinada, como em Brasa).
- Nenhuma string de UI hardcoded (o `validate` pesquisa por texto em `.hbs` e `.mjs` fora de `lang/`, com tolerância configurável).

**Roteiro manual F3:** criar personagem, escolher Cromado/Solo/Fixer/Sobrevivência, ver cabeçalho e habilidades, criar uma arma à mão, equipar, rolar ataque, ver o chat; trocar a classe para Ghost e ver o que sai e o que fica.

## 6. Fase 4: Módulo de catálogo e arrastar e soltar

**Tarefas**

1. YAML de `data/source/module/**`: armas, armaduras, equipamento, implantes (28 com 3 qualidades e mecânica de `05` seção 9), veículos e módulos de drone. ICE e macros podem esperar a Fase 6.
2. Build e validação do módulo; `module.json` com os packs.
3. Roteador de soltura (`03` seção 6.1) e tratamentos de cada tipo (6.2 a 6.9), `PurchaseDialog`, empilhar, mãos, armadura exclusiva, implante por slot e qualidade, validação de programa.
4. Aba **Cromo** completa, aba **Programas** (lista e aprender), aba **Posses** (grade de slots, créditos, extrato).
5. Arrastar para a hotbar (macros de ataque e execução).
6. Comportamento **sem o módulo** (avisos, assistente pulando passos).

**Critérios de saída (cenário principal do pedido do autor)**

- Arrastar **Pistola pesada** do compêndio para a ficha: o item aparece, é equipado se houver mãos livres, ocupa 1 slot, a linha de ataque surge com bônus e dano corretos; o diálogo de compra (modo `ask`) funciona.
- Arrastar **Armadura corp pesada**: pergunta se troca a armadura equipada, recalcula a CA (15, sem DES).
- Arrastar **2 Carregadores**: empilha em 1 slot (2 por slot) e some ao existente.
- Arrastar **Subderme blindada** (qualidade Rua): vai ao slot Corpo, CA +1; arrastar outro implante de Corpo pergunta se substitui.
- Arrastar 3º e 4º implantes: aparece o aviso de ciberpsicose com CD 12 e 14.
- Arrastar **Ping** para um Solo: bloqueado por tipo de classe; para um Netrunner de nível 1: aceito; **Choque cardíaco** (tier 2) para Hyperdoc nível 1: bloqueado por tier (GM pode forçar).
- Com o módulo desativado, a ficha abre, não quebra e mostra o aviso.

**Roteiro manual F4:** repetir cada item acima com os valores esperados.

## 7. Decisões abertas e padrões

Estes pontos o livro não resolve. Confirme com o autor no início da Fase 0 (ou aceite os padrões) e registre em `docs/DECISIONS.md`.

| ID | Tema | Padrão | Como mudar |
|---|---|---|---|
| D01 | Versão do Foundry | v14 (14.369). Se ele usa v13, ajuste `compatibility` e evite recursos exclusivos de v14. | `system.json` |
| D02 | HP retroativo ao CON atual | Sim | Setting `retroactiveHp` |
| D03 | Sobra de XP ao subir de nível | Mantém a sobra (`carry`) | Setting `xpOnLevelUp` |
| D04 | HP do nível 1 | Rola o dado de vida (como no Shadowdark) | Setting `hpLevel1Mode` |
| D05 | Famílias de arma e proficiência por classe | Tabela de `05` seção 4 | `data/source` das classes |
| D06 | Penalidade por falta de proficiência | Nenhuma, só aviso | Setting `proficiencyPenalty` |
| D07 | Dano desarmado base | d4 | Setting `unarmedDie` |
| D08 | Rajada | Dano rolado por alvo; consome 1 carregador do inventário | Setting `burstDamage` |
| D09 | Alerta por evento | Um incremento por evento (Crash, Feedback e Alarme somam) | Setting `alertStacking` |
| D10 | Rastreador de Alerta | Um por mundo, não por cena | Código do `AlertTracker` |
| D11 | Cronômetro do Firewall | Tempo real com pausa do Mestre | Setting `firewallTimer` |
| D12 | Compra ao soltar item | Pergunta a cada vez | Setting `purchaseMode` |
| D13 | Slots de implante removido no inventário | 0 slots | Setting `removedImplantsSlots` |
| D14 | Crítico e falha crítica de Set | Nenhum efeito especial | `data/source` dos Sets |
| D15 | Duro de matar | A tentativa gasta o uso mesmo se falhar | Handler `tough-as-nails` |
| D16 | Morrendo | N chances de d20 (N = resultado da rolagem de morte); 20 natural volta com 1 HP | Lógica `dying.mjs` |
| D17 | Mãos de armas | Uma mão salvo as marcadas "Duas mãos" no livro; embutidas em implante não contam | Dados das armas |
| D18 | "Fuzis leves" do Rigger | Fuzil | Dados da classe |
| D19 | Arma leve à distância | Usa o maior entre FOR e DES | Código de ataques |
| D20 | Segundo domínio | Mesmo bônus do primeiro, para outra família | Dados do talento |
| D21 | Créditos iniciais no assistente | Rolados ao entrar no passo de cromo e compartilhados com equipamento | Código do assistente |
| D22 | Resistente (Solo) | Vantagem nos testes de CON com etiquetas `resist-injury`, `resist-poison`, `resist-chrome` | Dados da habilidade |
| D23 | Corpo imerso | CA 5 enquanto imerso | Código de CA |
| D24 | Nome do pacote | Sem a marca "Shadowdark" nos títulos; só "inspirado em" na descrição | `system.json` |
| D25 | Licença do código e identidade do autor | MIT; nome e URL fornecidos pelo autor | `LICENSE`, manifests |
| D26 | Fichas prontas | Nomes e atributos de `05` seção 11.6 | `data/source/module/fichas-prontas` |
| D27 | Escolha livre do talento 12 | Diálogo com duas saídas (talento da tabela ou +2 pontos) | Handler |
| D28 | Pasta de Itens do sistema | Compêndios do sistema não são pré-importados no mundo | n/a |

## 8. Fase 5: Rolagens, talentos, nível, programas e Edge

**Tarefas**

1. `SNRoll` e `RollDialog` completos (chips, vantagem e desvantagem, CD), cartões, reroll por Edge e Ressonância (`03` seções 5 e 13).
2. Talentos: contagem, rolagem 2d6 na tabela da classe, escolhas, 12 (`03` seção 8).
3. Subir de nível: HP, XP, talento, programas, Sets (`03` seção 8.4).
4. Execução de programas, protocolos e Sets; Crash, Feedback, Rejeição; `AlertTracker`; Hack de rua (`03` seção 7).
5. Edge: contador, dar, entregar, gatilho com aprovação.
6. Socket e API para as operações restritas (`03` seção 17).
7. `applyDamage` e `applyHealing` com resistências.

**Critérios de saída**

- Rolar talento de Solo com resultado 8 pede o atributo e aplica +2; com 12 oferece as duas saídas.
- Netrunner com Deck executa Ping (CD 11); falha vira Crash e sobe o Alerta; 1 natural rola Feedback com a automação certa; Deck customizado absorve o primeiro Feedback.
- Sets: sucesso gasta o Set; falha não gasta.
- Subir de nível mostra o HP ganho, rola talento nos níveis 3, 5, 7 e 9 e abre o seletor de programa com tiers corretos.
- Gastar Edge repete a rolagem e o resultado novo vale.
- Dano aplicado por jogador a outro ator funciona via socket quando há Mestre ativo; com Mestre ausente, mostra aviso.

## 9. Fase 6: Assistente e mecânicas de campanha

**Tarefas**

1. `CreationWizard` completo (`03` seção 3), com rascunho, conclusão idempotente e mensagem final.
2. Descanso, morrendo, nocaute, ciberpsicose, imersão e Firewall, drone e talentos do Rigger (`03` seções 9 a 12 e 14).
3. Fichas de NPC, ICE e drone; 5 ICE do livro; combate: iniciativa, estados, moral, surpresa (`03` seção 15).
4. Macros do Mestre e `game.sombraneon.api` (`05` seção 10).
5. `tools/build-pregens.mjs` e as 6 fichas prontas conferidas contra o quadro de `05` seção 11.6.
6. Aba **Rede** e aba **Bio**.

**Critérios de saída**

- Do zero, um jogador cria um runner pelo assistente em menos de 5 minutos e termina com ficha completa e coerente com as regras (comparável a uma das fichas prontas).
- Descanso restaura HP, usos, programas e Sets, consome ração, respeita interrupção, rola ciberpsicose.
- Cair a 0 HP aciona Filtro de dor, Duro de matar ou morrendo, na ordem; as rodadas funcionam no combate; estabilizar funciona; cura acorda.
- Imersão: consome Firewall, CA do corpo 5, cronômetro, expulsão por corpo ferido.
- As 6 fichas prontas importadas batem com o quadro de valores esperados.

## 10. Fase 7: Polimento e lançamento

**Tarefas**

1. `lang/en.json` completo; seletor de idioma funcionando.
2. Migrações (`02` seção 8) e botão "Sincronizar com o compêndio".
3. Acessibilidade (foco, contraste, `aria-label`), modo de movimento reduzido, teste em tela estreita.
4. Desempenho (`04` seção 12).
5. `README.md` (instalação, uso, licença, créditos, "inspirado em Shadowdark" conforme D24), `CHANGELOG.md`, `LICENSE`.
6. Workflow de release: tag cria zips (arquivos na **raiz** do zip), `system.json` e `module.json` de release com URLs `manifest` e `download` corretas; anexa os assets.
7. Revisão final de todo o texto de interface e documentação: nenhum travessão, nenhuma string fora de `lang/`.
8. Revisão de conteúdo: comparar cada compêndio com o livro (o `validate` já compara; faça uma passada humana por amostragem).

**Critérios de saída**

- Instalação limpa pelo manifest em uma instância nova do Foundry funciona (sistema, depois módulo).
- Todo o roteiro de `ACCEPTANCE.md` passa.
- Nenhum erro ou aviso de depreciação no console durante um fluxo completo (criar, jogar, descansar).

## 11. Estratégia de testes

### 11.1 Unitários (Vitest)

Rodam em Node, sem Foundry. Arquivos em `tests/logic/*.test.mjs`. Vetores obrigatórios:

| Área | Casos mínimos |
|---|---|
| `abilityMod` | 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 30 |
| `slotsMax` | FOR 8; FOR 14; FOR 10 com `slots.bonus` +2; Solo FOR 14 CON 16 |
| `armorClass` | sem armadura DES +2; jaqueta; colete; pesada; cobertura; imersão (5); `ac.override` |
| `maxHp` | mínimo 1 por nível; CON negativo; `hp.bonus`; retroativo |
| `tierMax`, `castingKnownMax` | todos os níveis 1 a 10 para as três classes de conjuração |
| `cyberpsychosis` | combinações de contagem e ajuste (0 a 4, -1, 0, +1) |
| `dice` | vantagem, desvantagem, anulação, crítico dobrando só os dados, rajada |
| `modifiers` | `mode`, `when`, `choice`, tokens de chave, chave desconhecida |
| `economy` | pilhas por slot, rig utilitário, compra com saldo insuficiente |
| `dying` | `1d4 + CON` com mínimo 1, `dying.die` d6, contagem de chances |
| `rest` | restauração por `per`, ração de 3 usos, falha de interrupção |
| `drone` | HP, CA, dado por nível, talentos |
| `pregens` | os 6 quadros de `05` seção 11.6 |

### 11.2 Conteúdo (Vitest + `validate`)

Contagens, faixas de tabela, referências, duplicatas, travessões, pacotes iniciais, ida e volta de compilação e reprodutibilidade dos IDs.

### 11.3 Integração no Foundry (opcional, recomendado)

Se o autor instalar o módulo de testes **Quench** (verifique compatibilidade com a versão), registre lotes em `tests/quench/` que criam atores, soltam itens e conferem derivados. Não bloqueia nenhuma fase.

### 11.4 Manual

`docs/ACCEPTANCE.md` por fase, com passos numerados e **resultado esperado numérico**. Modelo:

```
## Fase N
### Cenário N.1: <nome>
Passos
1. ...
Resultado esperado
- HP 10, CA 13, 17 slots...
Observações / dúvidas
```

## 12. Cenários de aceite (base do `ACCEPTANCE.md`)

| Código | Cenário | Resultado esperado |
|---|---|---|
| A1 | Importar **Brasa** (Solo) | HP 10, CA 13, slots 17, Pistola pesada com +3 e d8+2, iniciativa com vantagem |
| A2 | Importar **Vetor** (Netrunner) | CA 11, execução +3, Ping +4, CD 11, 2 programas conhecidos, 1 slot de deck |
| A3 | Importar **Sutura** (Hyperdoc) | HP 7, CA 11, Nanocura cura 1d6 + 1 + 1d4 |
| A4 | Importar **Névoa** (Ghost) | CA 14, ataque +3 com furtivo +1d6 |
| A5 | Importar **Riff** (Rocker) | Set com d20 + 3 contra 12; Refrão +4 |
| A6 | Importar **Zangão** (Rigger) | Drone criado com CA 12, HP 6, ataque +3, dano d4+1 |
| B1 | Novo personagem, escolher classe e origem pelos seletores | Habilidades e proficiências preenchidas, pergunta de escolhas |
| B2 | Trocar de classe com itens comprados | Só as concessões antigas saem |
| B3 | Arrastar arma, armadura, equipamento, implante, programa | Fluxos da Fase 4 |
| B4 | Estourar slots | Aviso e destaque, sem bloqueio |
| C1 | Ataque com 20 natural | Dano com dados dobrados |
| C2 | Ataque com 1 natural à distância | `magEmpty`, linha desabilitada até Recarregar |
| C3 | Rajada em 3 alvos | Só os com CA ≤ resultado são marcados |
| C4 | Vantagem mais desvantagem | Anulam, rola 1d20 |
| C5 | Gastar Edge | Reroll, resultado novo vale, Edge cai para 0 |
| D1 | Execução de programa com falha | Crash; Alerta +1 |
| D2 | 1 natural em programa | Crash, Feedback d6, Alerta +1 do Crash e +1 do Feedback |
| D3 | Deck customizado | Primeiro Feedback absorvido |
| D4 | Set com falha | Set não gasto |
| E1 | Cair a 0 HP com Filtro de dor | HP 1, uso consumido |
| E2 | Cair a 0 HP sem proteção | Morrendo, rodadas = 1d4 + CON (mín. 1) |
| E3 | Turno do morrendo | d20; 20 natural volta com 1 HP; senão reduz |
| E4 | Estabilizar | INT CD 15; contador para |
| F1 | Descanso sem ração | Bloqueado (Sintético passa) |
| F2 | Descanso com interrupção e falha em CON 12 | Nada recuperado, ração gasta |
| F3 | Ciberpsicose com 3 implantes | Teste de SAB CD 12 ao fim do descanso |
| F4 | Ciberpsicose Cromado com 3 e Biomod com 2 | Cromado: sem teste; Biomod: CD 12 |
| G1 | Imergir e Firewall | CA do corpo 5, cronômetro, expulsão por dano |
| G2 | Subir de nível | HP ganho, talento nos níveis 3, 5, 7 e 9, programa novo |
| G3 | Assistente do zero | Ficha completa, coerente com regras |
| H1 | Módulo desativado | Ficha funciona; avisos claros |
| H2 | Dois jogadores e Mestre | Dano e Edge via socket; sem Mestre, aviso |

## 13. Riscos e mitigações

| Risco | Mitigação |
|---|---|
| API do Foundry mudou e o código usa nome antigo | Verificar cada API na documentação v14 e registrar em `API-NOTES.md`; testes de fumaça no Foundry a cada fase |
| Conteúdo divergente do livro | Extração e validação automática; revisão humana por amostragem |
| Complexidade de arrastar e soltar | Roteador único com tratadores por tipo; testes unitários dos pontos de decisão |
| Estado do assistente se perder | Rascunho em `flags`, conclusão idempotente |
| Sockets sem Mestre | Aviso e nenhuma ação |
| Desempenho com muitos modificadores | Memoização da coleta por documento |
| Regra ambígua trava o trabalho | Padrão da seção 7, registrar e seguir |
| Crescimento do escopo | Fora de escopo (`00` seção 7) só entra com pedido do autor |
