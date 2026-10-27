# 07. Prompts prontos para o Claude Code

Este arquivo é para **o autor**, não para o Claude Code. Copie e cole os blocos abaixo, um por vez.

## 1. Preparação (uma vez)

1. Crie um repositório vazio (GitHub ou local) e abra a pasta no terminal.
2. Descompacte este pacote na raiz do repositório. Deve existir: `CLAUDE.md`, `docs/spec/`, `design/sombraneon-ficha.html`.
3. Copie o livro de regras (`sombraneon.md`) para `docs/sombraneon.md`.
4. Se você tem os PDFs de referência (CyberDark, Dark Space, Shadowdark), coloque em `refs/` (a pasta fica fora do Git). O Claude Code **não deve copiar** o conteúdo deles.
5. Instale o Node 20 ou superior.
6. Decida onde fica seu Foundry de testes e anote o caminho da pasta de dados (algo como `.../FoundryVTT/Data`). Você vai usá-lo na Fase 0 (`FOUNDRY_DATA`).
7. Abra o Claude Code na raiz do repositório.

## 2. Prompt inicial (Fase 0)

```
Leia CLAUDE.md e todos os arquivos de docs/spec/ na ordem numérica antes de fazer qualquer coisa. Confirme que docs/sombraneon.md existe.

Quero construir, no Foundry VTT, o sistema "sombraneon" e o módulo de compêndio "sombraneon-compendium" para o meu RPG SombraNeon, seguindo exatamente essas especificações. O objetivo central é uma ficha o mais automática possível: seletores de origem, classe, antecedente e alinhamento que preenchem tudo, ataques que aparecem sozinhos, talentos rolados que viram itens na ficha, e arrastar armas, armaduras, implantes e programas do compêndio para a ficha funcionando com as regras do livro.

Vamos trabalhar por fases (docs/spec/06-FASES-E-TESTES.md). Execute agora SOMENTE a Fase 0.

Antes de escrever código, me faça as perguntas da Fase 0 (versão do Foundry, usuário e repositório do GitHub, nome do autor, licença) e me mostre a lista de decisões abertas (seção 7 do arquivo 06) com os padrões sugeridos, para eu aprovar ou mudar. Depois de aprovado, execute a fase, registre tudo em docs/DECISIONS.md, docs/API-NOTES.md e docs/ACCEPTANCE.md, e pare para eu testar no Foundry.

Regras que não podem ser quebradas: só use regras do livro; confirme cada API do Foundry na documentação oficial da versão alvo antes de usar; não escreva nenhum travessão em textos de interface, documentação ou mensagens; não copie texto de terceiros.
```

## 3. Prompts das fases seguintes

Use um por fase, **depois** de testar a fase anterior e corrigir o que precisar.

### Fase 1

```
Execute a Fase 1 (lógica pura e modelo de dados) conforme docs/spec/06-FASES-E-TESTES.md, seguindo docs/spec/02-MODELO-DE-DADOS.md. Escreva os testes antes do código (TDD), use todos os vetores de teste do arquivo 02 seção 6.5 e do arquivo 05 seção 11.6, e mantenha src/logic/ livre de globais do Foundry. Ao final rode lint, testes, build e validate, atualize docs/ACCEPTANCE.md com o roteiro manual da fase e liste as dúvidas abertas. Pare para eu testar.
```

### Fase 2

```
Execute a Fase 2 (conteúdo do sistema e pipeline) conforme docs/spec/06-FASES-E-TESTES.md e docs/spec/05-COMPENDIO.md. Comece pelo extrator do livro e pelo validador de contagens; depois gere os YAML de data/source/system/ a partir do extrator e complete a camada mecânica (modificadores, concessões, usos, handlers). Os IDs precisam ser determinísticos e o build precisa ser reprodutível. Não digite à mão texto do livro: ele vem da extração. Ao final, rode todos os comandos de verificação, atualize docs/ACCEPTANCE.md e pare para eu testar.
```

### Fase 3

```
Execute a Fase 3 (ficha, seletores, concessões e ataques) conforme docs/spec/06, docs/spec/03 seções 2 e 4, e docs/spec/04. Siga a identidade visual de design/sombraneon-ficha.html. Entregue o cabeçalho com os cinco seletores, o motor de concessões idempotente, as abas Resumo, Ataques, Posses e Cromo, e as linhas de ataque calculadas. Nenhuma string de interface fora de lang/. Ao final, rode a verificação, atualize docs/ACCEPTANCE.md e pare.
```

### Fase 4

```
Execute a Fase 4 (módulo de catálogo e arrastar e soltar) conforme docs/spec/06, docs/spec/03 seção 6 e docs/spec/05 seções 9 e 11. O critério principal: arrastar uma arma do compêndio para a ficha adiciona, equipa quando há mãos livres, ocupa os slots corretos e cria a linha de ataque; o mesmo vale para armadura, equipamento (empilhando), implante (slot e qualidade, ciberpsicose) e programa (tipo, tier e limite). A ficha precisa continuar funcionando sem o módulo. Ao final, rode a verificação, atualize docs/ACCEPTANCE.md com os cenários numéricos e pare.
```

### Fase 5

```
Execute a Fase 5 (rolagens, talentos, nível, programas e Edge) conforme docs/spec/06 e docs/spec/03 seções 5, 7, 8, 13 e 17. Garanta vantagem e desvantagem que se anulam, crítico que dobra só os dados, reroll por Edge, Crash, Feedback, Rejeição, Alerta, subir de nível completo e as operações via socket. Ao final, rode a verificação, atualize docs/ACCEPTANCE.md e pare.
```

### Fase 6

```
Execute a Fase 6 (assistente e mecânicas de campanha) conforme docs/spec/06 e docs/spec/03 seções 3, 9 a 12, 14 e 15. Entregue o assistente de criação com rascunho, descanso, morrendo, ciberpsicose, imersão e Firewall, drone, fichas de NPC, ICE e drone, macros do Mestre, as 5 ICE e as 6 fichas prontas conferidas contra o quadro de docs/spec/05 seção 11.6. Ao final, rode a verificação, atualize docs/ACCEPTANCE.md e pare.
```

### Fase 7

```
Execute a Fase 7 (polimento e lançamento) conforme docs/spec/06. Inclua inglês, migrações, acessibilidade, desempenho, README, CHANGELOG, LICENSE e o workflow de release com manifests corretos. Faça uma varredura final de travessões, strings fora de lang/ e divergências com o livro. Ao final, me entregue um resumo e o passo a passo de instalação pelo manifest.
```

## 4. Prompts de apoio

### Reportar um erro do Foundry

```
Encontrei um problema no Foundry. Versão do Foundry: <versão>. Sistema: <versão>. Passos: <1, 2, 3>. Esperado: <o que deveria acontecer>. Aconteceu: <o que aconteceu>. Erro do console (F12): <cole aqui>. Investigue a causa raiz, confirme na documentação da API se algum nome mudou, corrija, adicione um teste que reproduza o erro quando for lógica pura, e atualize docs/ACCEPTANCE.md se o cenário não estava coberto.
```

### Ajustar uma regra

```
Quero mudar uma regra: <descreva>. Antes de mexer, me diga quais arquivos de docs/spec, data/source e src/logic são afetados e qual decisão de docs/DECISIONS.md muda. Depois altere livro e especificação se eu confirmar, atualize os dados, escreva ou ajuste os testes e rode a verificação.
```

### Adicionar conteúdo novo (item, programa, classe)

```
Adicione <novo item/programa/talento/classe> ao compêndio: <dados do livro>. Siga docs/spec/05-COMPENDIO.md: crie o YAML em data/source, use um identifier novo e estável, preencha a camada mecânica (modificadores, concessões, usos), atualize as contagens esperadas no validate, rode o build e me diga como testar no Foundry.
```

### Auditoria contra o livro

```
Faça uma auditoria completa do conteúdo contra docs/sombraneon.md: contagens, números (dano, custo, CA, slots, CDs, tiers), tabelas (faixas e resultados) e textos. Gere um relatório em docs/AUDITORIA.md com cada divergência (arquivo, campo, valor do livro, valor no conteúdo) e corrija as que forem erro de digitação. As que dependem de decisão minha, liste no fim.
```

### Revisão de código

```
Revise o código da última fase como revisor sênior de Foundry VTT: uso de APIs obsoletas, vazamentos de listeners, chamadas assíncronas sem await, permissões em operações via socket, desempenho de prepareDerivedData, strings fora de lang/, travessões e cobertura de testes de src/logic/. Liste os problemas por gravidade com arquivo e linha, corrija os de alta gravidade e me mostre o resto.
```

### Preparar a publicação

```
Prepare o lançamento da versão <X.Y.Z>: atualize versões em system.json, module.json e package.json, gere CHANGELOG, rode todos os comandos de verificação, gere os zips em dist/ com os arquivos na raiz do zip e confira os manifests. Me dê o passo a passo para criar a tag e a release no GitHub e para instalar pelo manifest em um Foundry limpo.
```

## 5. Dicas de condução

- **Uma fase por vez.** Teste no Foundry antes de pedir a seguinte. Isso evita construir sobre um erro.
- **Cole o erro inteiro.** O Claude Code não vê o seu Foundry; o texto do console é a melhor pista.
- **Peça decisões, não adivinhações.** Se algo no livro estiver vago, o Claude Code deve apresentar opções e o padrão, e você escolhe.
- **Branches e commits.** Peça uma branch por fase e um commit por tarefa; assim é fácil voltar atrás.
- **Backup do mundo de teste.** Faça uma cópia do mundo antes de aceitar migrações.
- **Não misture conteúdo de terceiros.** Se quiser tomar algo de outro sistema como referência, descreva a ideia e peça ao Claude Code para escrever o próprio código e texto.
