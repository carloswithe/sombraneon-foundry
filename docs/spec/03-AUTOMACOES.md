# 03. Automações

Este arquivo descreve **o comportamento** de cada automação: gatilho, algoritmo, regras do livro envolvidas, casos de borda e interface. Os dados que elas consomem estão em `02-MODELO-DE-DADOS.md`; o conteúdo, em `05-COMPENDIO.md`.

Regras gerais para todas as automações:

1. **Cálculo é puro, efeito é do Foundry.** A decisão (quanto, quando, se vale) mora em `src/logic/`; a escrita no documento, o chat e os diálogos moram em `src/automation/`.
2. **Quem executa.** Mudanças no próprio ator rodam no cliente do dono. Mudanças em **outros** atores (dano, cura, Edge, drone) passam pelo `SNSocket` e são executadas pelo **Mestre ativo** (`game.users.activeGM`). Sem Mestre ativo, mostre um aviso claro e não faça nada.
3. **Tudo que rola vai para o chat**, com a decomposição do bônus (de onde veio cada número). O jogador deve poder passar o mouse e entender o resultado.
4. **Toda automação tem um interruptor manual.** O jogador ou o Mestre pode sempre corrigir à mão (editar HP, desmarcar Crash, ajustar slots). Nenhuma automação trava a ficha.
5. **Textos de interface em `lang/`.** Aqui os textos são ilustrativos.

---

## 1. Atualização de valores derivados

Sem gatilho: é o `prepareDerivedData` descrito em `02` seção 6.4. Requisitos de interface:

- Cada valor derivado mostra uma **dica (tooltip)** com a decomposição (`ac.parts[]`, `attacks[].parts[]`, `slots.parts[]`, etc.).
- Valor sobrescrito por modificador de `set` ou por ajuste do Mestre aparece com marca visual (ícone de cadeado ou cor).
- `warnings[]` aparece como faixa discreta no topo da ficha, com ícone e texto, e some quando resolvido. Avisos nunca bloqueiam.

---

## 2. Seletores e concessões (classe, origem, antecedente, alinhamento)

Esta é a automação central da experiência "escolher e a ficha se preenche".

### 2.1 Seletores no cabeçalho

- Quatro campos no cabeçalho: **Origem, Classe, Antecedente, Alinhamento**. Cada um é um `<select>` agrupado e pesquisável (ou um combobox simples) alimentado pelos **índices dos compêndios do sistema** (`origens`, `classes`, `antecedentes`, `alinhamentos`), carregados uma vez no `ready` e guardados em `CONFIG.SOMBRANEON.indexes` (campos de índice: `name`, `img`, `system.identifier`).
- O antecedente aceita **três ações**: escolher da lista, **rolar d20** (botão de dado ao lado), ou digitar um nome livre (cria um item `background` vazio com o texto digitado, sem concessões).
- Um quinto seletor: **Gatilho de Edge** (lista dos 6 gatilhos do alinhamento escolhido, mais botão de dado 1d6). Fica desabilitado até haver alinhamento.
- Ao lado de cada seletor, um ícone de informação abre a descrição do item (Journal da regra ou a ficha do item) e um ícone de lixeira remove a seleção (com confirmação, ver 2.4).
- **Arrastar** um item de classe, origem, antecedente ou alinhamento para a ficha tem o mesmo efeito que escolher no seletor (ver seção 6).

### 2.2 `SNActor#applySelection(type, source)`

`source` pode ser um UUID de compêndio, um `Item` ou um índice. Passos:

1. **Resolver** o item de origem (`fromUuid`). Se não existir, notificação de erro e pare.
2. **Validar tipo.** `type` ∈ `class`, `origin`, `background`, `alignment`.
3. **Se já existe item do mesmo tipo** embutido:
   - Se for o **mesmo `identifier`**: não faça nada.
   - Senão: `DialogV2.confirm` ("Trocar Solo por Netrunner? As concessões de Solo serão removidas. Talentos rolados e itens comprados não são tocados."). Se cancelar, restaure o seletor.
   - Remova o item antigo **e todos os itens com `flags.sombraneon.grantedBy === antigo.id`** (ver 2.3). Talentos, itens comprados, programas escolhidos pelo jogador e implantes **não** são removidos (têm `grantedBy` vazio), exceto se tiverem sido concedidos por `choose` ou `roll` daquele item (esses carregam `grantedBy`).
4. **Criar** o item embutido (cópia do compêndio, `flags.sombraneon.sourceUuid` preenchido).
5. **Rodar o motor de concessões** (`GrantEngine.run(actor, sourceItem)`), seção 2.3.
6. **Efeitos colaterais por tipo:**
   - `class`: se `hp.rolls` estiver vazio, role o 1º dado de vida conforme a configuração `hpLevel1Mode` (`roll` = rola o dado da classe; `max` = valor máximo do dado). Se já houver rolagens e o dado de vida mudou (troca de classe), **pergunte**: "Manter as rolagens de HP ou re-rolar tudo?" (padrão: manter, convertendo o valor máximo do dado antigo no novo se `max`).
   - `alignment`: apague o gatilho de Edge escolhido (ele pertencia ao alinhamento antigo) e destaque o seletor de gatilho.
   - `origin`: se a origem pede escolhas (`needsChoices`), abra o diálogo correspondente (2.5).
7. **Atualize** `creation.step` se o assistente estiver aberto e emita um chat discreto opcional ("Fulano agora é Netrunner") apenas se a configuração `announceSelections` estiver ligada (padrão desligado).

### 2.3 Motor de concessões (`GrantEngine`)

Entrada: ator, item-fonte (classe, origem, antecedente ou alinhamento), nível alvo.

Para cada `grant` em `source.system.grants` com `grant.level <= actor.level` e **não presente** em `source.flags.sombraneon.grantsApplied` (lista de IDs de concessão já aplicadas):

| `kind` | Comportamento |
|---|---|
| `item` | Resolve `ref` (`<tipo>:<identifier>`) para um UUID de compêndio via índice (`CompendiumIndex.resolve(type, identifier)`). Cria o item embutido com `qty` e `flags.sombraneon.{grantedBy: source.id, grantId}`. Se já existir item com o mesmo `identifier` e `grantedBy` igual, ignore. Se o `ref` não resolver, registre aviso (`warnings`) e continue. |
| `choose` | Abre `ChoiceDialog` (lista com busca, imagens, descrições) com `count` escolhas obrigatórias do conjunto `from.type` filtrado por `from.filter`. Inclui só itens válidos (ex.: programas com `tier <= tierMax(level)`). Cada escolha vira item embutido com `grantedBy`. Se o jogador cancelar, a concessão fica **pendente** (aparece como "Escolhas pendentes" na ficha, com botão para retomar). |
| `roll` | Rola `count` vezes na RollTable `ref` (silencioso, sem chat), repetindo se o resultado já existir. Mostra um diálogo de revisão com o resultado e botão "Re-rolar" (1 re-rolagem grátis só se a configuração permitir; padrão desligada) e a opção "Escolher manualmente" quando o Mestre autoriza (checkbox). Cada resultado vira item embutido. |
| `prompt` | Pergunta o valor (texto, número ou lista curta) e grava em `source.system.choice[key]` ou em `actor.system.details`. |

Regras comuns:

- Itens criados por concessão guardam `flags.sombraneon.grantedBy` e `grantId`. A ficha os exibe com um selo "da classe" e **não deixa o jogador excluí-los individualmente** sem confirmação ("Este item veio de Solo").
- Se um item concedido tem `choices` (ex.: Domínio de arma pergunta a família), o `ChoiceDialog` é aberto logo após a criação, e a resposta é gravada em `system.choice`.
- `grantsApplied` evita reaplicar ao subir de nível: ao mudar `level`, o motor roda de novo e aplica só as concessões novas.
- Concessões que dependem de outra seleção (ex.: pacote inicial de uma classe) **não** entram aqui: o pacote inicial é oferecido pelo assistente e por um botão "Adicionar pacote inicial" na ficha (seção 3.9).
- Toda a rotina precisa ser **idempotente**: rodar duas vezes não duplica nada.

### 2.4 Remover seleção

O botão de lixeira ao lado do seletor pede confirmação e executa a mesma remoção do passo 3 de 2.2, sem criar um novo item. Programas, talentos e equipamentos sem `grantedBy` ficam.

### 2.5 Escolhas por origem

| Origem | Escolhas |
|---|---|
| **Nat** | Nenhuma escolha. Concede o traço **Ambicioso** (`talents.extra` +1), que aumenta o total de talentos a rolar no nível 1. |
| **Cromado** | `choose` de **2 implantes de qualidade Rua** (um por slot, slots distintos; o jogador escolhe o implante e o slot é o do implante). Instalados e gratuitos (não debitam créditos). Se o módulo `sombraneon-compendium` não estiver ativo, mostra um aviso fixo "Implantes iniciais pendentes" e o botão de retomar quando o módulo for ativado. |
| **Sintético** | Nenhuma escolha. Traços como itens `feature` com os modificadores listados em `05` seção 3. |
| **Biomod** | `roll` de **2 mutações** na tabela d20 (sem repetir). O diálogo oferece a opção "Mestre permitiu escolher 1": nesse caso o jogador escolhe 1 da lista de 20 e rola a outra. A opção só aparece para o Mestre marcar (checkbox visível apenas ao GM), nunca ao jogador sozinho. |

### 2.6 Testes (Vitest) obrigatórios

`GrantEngine` precisa de testes sobre uma implementação do "mundo" simulada (interfaces mínimas: `createEmbedded`, `deleteEmbedded`, `resolve`, `prompt`): aplicar, reaplicar (idempotência), trocar de classe (remoção apenas do que tem `grantedBy`), pendência por cancelamento, `ref` inexistente.

---

## 3. Assistente de criação

`CreationWizard` (ApplicationV2). Abre pelo botão **"Assistente de criação"** na ficha (visível enquanto `creation.completed` for falso, e sempre disponível no menu do cabeçalho). Também abre automaticamente ao criar um personagem novo, se a configuração `openWizardOnCreate` estiver ligada (padrão ligada, só para o criador).

### 3.1 Princípios

- Segue **exatamente** os 7 passos do capítulo 2 do livro, mais uma tela de abertura, uma de talentos e uma de revisão.
- O estado fica em memória e é gravado no ator em `flags.sombraneon.wizardDraft` a cada passo (retomar depois). Nada é gravado no ator "de verdade" até **Concluir**; a conclusão aplica tudo numa sequência ordenada e idempotente.
- Toda rolagem do assistente é **silenciosa** (sem mensagem de chat). Ao concluir, uma única mensagem "Criação de <nome>" lista as rolagens (atributos, mutações, antecedente, gatilho, talento, créditos, HP).
- Cada passo tem **Voltar**, **Avançar** e, quando faz sentido, **Rolar** e **Escolher manualmente**. Rolar não impede escolher depois, exceto onde o livro obriga.
- Funciona sem o módulo de compêndio: os passos de cromo e equipamento mostram "Módulo de compêndio não encontrado" e permitem avançar vazios.

### 3.2 Tela 0: abertura

Nome do personagem, **nome de rua** (o campo `name` do ator é o nome de rua; o nome civil vai em `details.civilName` se informado), retrato. Texto curto explicando os passos.

### 3.3 Passo 1: atributos

- Botão **Rolar tudo**: seis rolagens de 3d6, **na ordem FOR, DES, CON, INT, SAB, CAR**, com animação curta. Mostra valor e modificador (tabela do livro).
- Regra: **"Se nenhum atributo ficar em 14 ou mais, o jogador pode rolar os seis de novo."** Quando a condição for verdadeira, aparece um aviso e o botão **Rolar de novo** (uma vez; a segunda rolagem vale, sem condição). Se a condição for falsa, o botão fica desabilitado com a explicação.
- Alternativa **Inserir valores** (configuração `wizardAllowManualAbilities`, padrão ligada para todos): campos numéricos 3 a 18 (o Mestre pode permitir mais por configuração).
- Não há reordenação de atributos (o livro diz "na ordem").

### 3.4 Passo 2: origem

Quatro cartões (nome, resumo, traços). Ao escolher: mostra as concessões em pré-visualização e executa os sub-passos da seção 2.5 (Cromado escolhe 2 implantes Rua; Biomod rola 2 mutações com tabela visível).

### 3.5 Passo 3: classe

Seis cartões (dado de vida, atributo-chave, armas, armaduras, descrição curta). Destaca o **atributo-chave** do personagem (mostra "Seu INT é 9 (-1): a classe usa INT" quando a combinação é ruim, **sem impedir**). Sub-passos por classe:

| Classe | Sub-passo |
|---|---|
| Solo | Escolher a **família de arma** do Domínio de arma. |
| Netrunner | Escolher **2 programas de tier 1**. |
| Hyperdoc | Escolher **2 protocolos de tier 1**. |
| Ghost | Nenhum. |
| Rocker | Escolher **3 Sets**. |
| Rigger | Nenhum (o drone é criado ao concluir). |

### 3.6 Passo 4: antecedente

Rolar **d20** ou escolher na lista de 20 (mostra o conhecimento). Campo **Contato** (texto livre). Opção "Outro (texto livre)".

### 3.7 Passo 5: alinhamento e gatilho de Edge

Três cartões (Controle, Sobrevivência, Liberdade) com o resumo e a equivalência com a ordem do Shadowdark. Depois, a lista dos **6 gatilhos** do alinhamento, para escolher ou **rolar 1d6**.

### 3.8 Passo 6: cromo

- **Cromado** já escolheu 2 implantes Rua (passo 2): mostra os slots ocupados.
- Todos podem **comprar implantes adicionais** com os créditos iniciais (o livro permite que o runner gaste o dinheiro inicial como quiser): lista filtrável por slot e qualidade, com preço (300, 1.000 ou 3.000 cr) e aviso "Instalar exige Hyperdoc com kit cirúrgico ou clínica (+10%)". Ao instalar, mostra o **contador de ciberpsicose** em tempo real ("2 implantes: sem teste. 3: SAB CD 12. 4: SAB CD 14") já considerando a origem.
- **Créditos iniciais:** ao entrar neste passo, role **2d6 x 100 cr** (uma vez; o valor persiste no rascunho). Os passos 6 e 7 gastam do mesmo valor. Mostra o saldo sempre.

### 3.9 Passo 7: equipamento

- Mostra o saldo e os **slots** (usados / total).
- Botão **Pacote sugerido da classe** (livro 8.6): adiciona os itens do pacote e debita o custo. Se o saldo for menor que o custo do pacote, mostra os itens que não cabem e deixa o jogador remover algum (o livro sugere ~700 cr como média e o pacote custa entre 550 e 680 cr). Avisa quando o pacote deixa "sobra" para carregadores, baterias ou implante.
- Botão **Kit de Runner** (opcional, 300 cr, 4 slots: rig utilitário, 3 rações, 2 baterias, lanterna, cabo de interface).
- **Loja manual:** lista pesquisável com abas (Armas, Armaduras, Equipamento; veículos ficam de fora), carrinho, total e saldo.
- Regras que o passo respeita: **uma armadura equipada**, **armas conforme as mãos**, **rig utilitário grátis na primeira unidade**, pilhas por slot (carregador, bateria, stim, firewall em 2 por slot), **ração obrigatória** (aviso se não houver nenhuma, pois descansar exige 1).
- O que sobrar vira `currency.credits`.
- Todos os itens do catálogo vêm do módulo; se ele não estiver ativo, o passo exibe aviso e permite "Pular" (a ficha segue vazia de equipamento).

### 3.10 Passo 8: talentos

Rola **2d6** na tabela de talentos da classe (e **mais uma vez** se a origem for Nat). Aplica a seção 8 (talentos). Mostra o resultado, resolve escolhas (família, atributo, programa) e permite **re-rolar** apenas se o Mestre liberar (checkbox só para GM).

### 3.11 Passo 9: revisão

Resumo completo: atributos, origem, classe, antecedente, alinhamento, gatilho, cromo, equipamento, talentos, e os **valores derivados calculados** (HP, CA, iniciativa, slots, CD de programas, contador de ciberpsicose). Campos finais: **Drive** (texto livre, com sugestões do livro como chips: caçar uma IA descontrolada, juntar créditos e cromo raros, subir na hierarquia da corporação, crescer na fama da rua, descobrir segredos e intrigas, simplesmente sobreviver), **aparência**, **idioma de rua** (todo runner fala o dialeto da cidade e mais um idioma de rua à escolha; o campo `details.languages` já vem com "Dialeto da cidade").

**Concluir** executa, nesta ordem:

1. Atributos (`abilities.*.base`) e nome.
2. `applySelection('origin')`, `('class')`, `('background')`, `('alignment')`, com `suppressPrompts: true` (as escolhas vêm do rascunho).
3. Concessões das escolhas do rascunho.
4. HP do nível 1 (rolagem registrada em `hp.rolls[0]`; `hp.value = hp.max`).
5. Itens comprados (com `purchase: false`, pois o saldo já foi calculado) e implantes instalados.
6. Talento(s).
7. `currency.credits`, `details.drive`, `details.languages`, contato.
8. Drone (Rigger), se aplicável (seção 14).
9. `creation.completed = true`, limpeza de `wizardDraft`, mensagem de chat resumida, e fechamento do assistente com a ficha aberta.

Se algo falhar no meio (ex.: pack indisponível), registre o erro, **não desfaça** o que já foi feito, deixe a ficha consistente e liste "Pendências" na ficha.

### 3.12 Testes

Roteiro manual em `06`; testes unitários da lógica pura do assistente (regra dos 14, custo do pacote, saldo, contagem de ciberpsicose).

---

## 4. Ataques

### 4.1 Linhas de ataque (`attacks[]`)

O ator **deriva** uma lista de linhas de ataque a partir de:

1. Cada `weapon` **equipado**.
2. Para cada arma com a propriedade `thrown`, uma linha extra "arremessar" (à distância, alcance Próximo, usa DES, perde `light` de FOR/DES).
3. Cada implante **instalado** cujo `tiers[quality].weapon` exista (arma retrátil, mão tática, garras de pressão, pernas de combate).
4. Cada `feature` com `weapon` (mutação Arma natural).
5. **Desarmado** (sempre presente): dado base `unarmedDie` (padrão `d4`, decisão registrada), modificado por `unarmed.die` (Garras Militar) e `damage.unarmed`.
6. O **drone** (se existir), numa seção separada do cartão da ficha.

Cada linha:

```
id, name, img, source ('weapon'|'thrown'|'implant'|'natural'|'unarmed'|'drone'), itemId,
kind ('melee'|'ranged'), range ('close'|'near'|'far'), hands, properties[],
ability ('for'|'des'), attackBonus, damageFormula, dice, ignoreArmor, stunOn,
magEmpty, parts[] (decomposição), warnings[]
```

### 4.2 Cálculo

- **Atributo do ataque.** Corpo a corpo usa **FOR**; à distância usa **DES**; arremesso usa DES. Arma com a propriedade `light` (corpo a corpo **ou** à distância; livro 8.1: "use FOR ou DES no ataque") usa o **maior** entre FOR e DES. O jogador pode forçar um deles em `weapon.abilityOverride` (padrão vazio = automático).
- **Bônus de ataque** = mod. do atributo + `weapon.attackBonus` + Σ `attack.all` + Σ `attack.<melee|ranged|unarmed>`, todos filtrados pelo `when` (ex.: `family:pistols`, `weapon:light`). Não existe bônus de nível ou de proficiência no livro.
- **Dano** = dados da arma + Σ `damage.all` + Σ `damage.<melee|ranged|unarmed>`. **O mod. de atributo não soma ao dano** (o livro diz "role os dados da arma e some bônus relevantes", e os bônus relevantes são os de domínio, mutação, implante e talento).
- **Domínio de arma** (Solo): modificadores `attack.all` e `damage.all` com `value = 1 + floor(@level / 2)` e `when = family:@choice.family`. **Arma afinada**: `+1` em acerto e dano `when = domain` (arma de qualquer domínio do ator).
- **Mutações:** Poderoso (+1 acerto e dano corpo a corpo), Mira biológica (+1 acerto e dano à distância), Arma natural (linha própria, d6).
- **Implantes:** tudo vem dos `modifiers` do implante instalado na qualidade atual. Exemplos do livro: Alvejador neural (+1 em ataques à distância; Militar também +1 de dano à distância), Mão de precisão Militar (+1 à distância), Garras de pressão (+1 e +2 de dano desarmado), Pernas de combate Militar (+1 em acerto desarmado).
- **Drone:** ver seção 14.
- **Aviso de proficiência.** Se a arma não está nas permissões da classe (`class.weapons`), `warnings` recebe "Sem proficiência", e a linha exibe um selo. **Não há penalidade** (decisão padrão; configurável em `proficiencyPenalty` com `warn` ou `none`).
- **Armas com `magEmpty`:** linha desabilitada com botão **Recarregar** (ver 4.6).

### 4.3 Interface da linha

Cada linha mostra: ícone, nome, `+N` de ataque, dano (`d8+2`), alcance, selos (Leve, Duas mãos, Rajada, Mira, Atordoa, Ignora CA, Sem proficiência) e três botões: **Atacar** (rola ataque e, se acertar com alvo selecionado, oferece dano), **Dano** (rola só dano), **Mostrar no chat**. Clique com Shift ignora a janela de opções e usa os padrões; clique com Ctrl/Cmd abre a janela de opções.

Arrastar a linha para a hotbar cria uma macro `SombraNeon.attack(actorUuid, attackId)`.

### 4.4 Janela de opções do ataque

Opções (todas com explicação em tooltip):

| Opção | Efeito |
|---|---|
| Vantagem / Desvantagem | Alternador. Fontes automáticas (modificadores, surpresa, estados) aparecem marcadas e travadas, com a origem. Vantagem e desvantagem **se anulam** e não se acumulam (livro 1.2). |
| Alvo desatento ou surpreso | Vantagem (livro 1.4). Marcado automaticamente se o alvo selecionado tem o estado Surpreso. |
| Ataque furtivo (Ghost) | Só aparece com a habilidade. Soma `1 + floor((nível - 1) / 2)` dados da arma ao dano. Requer alvo desatento, flanqueado ou pelas costas (o jogador confirma). |
| Mira | Consome um marcador "Mirou" no ator (flag temporária); o ataque seguinte ganha **+2**. Botão "Mirar" na linha (gasta a ação, só para armas com a propriedade `aim`). |
| Cobertura do alvo | Informativo. A CA do alvo selecionado já inclui o `ac.cover` dele. Se o atacante tem `flag.ignoreCover` (Alvejador neural Corp), o +2 não conta. |
| Armas gêmeas | Só para duas armas de uma mão iguais equipadas. Um único ataque; se acertar, dano com **vantagem** (2 rolagens, vale a maior). |
| Rajada | Só para armas com a propriedade `burst`. Uma rolagem de ataque vale para **todos os alvos no cubo Próximo**; a janela lista os tokens alvo e marca como acertados os que tiverem **CA ≤ resultado**. Consome 1 carregador (ver 4.6). Dano: padrão **rola uma vez por alvo** (configurável: `single`, uma rolagem para todos). |
| Investida | Aparece com Motor de sprint (Corp ou Militar). Soma `+1d4` (Corp) ou `+1d6` (Militar) ao dano corpo a corpo, se o jogador confirma que se moveu Próximo antes. |
| Bônus situacional | Número livre. |

### 4.5 Resolução do ataque

1. Monte a fórmula: `1d20` (ou `2d20kh` / `2d20kl`) `+ bônus`.
2. **20 natural** (o dado mantido): acerto automático e os **dados** do dano são dobrados (bônus fixos não dobram). **1 natural**: erro automático.
3. Se há alvo selecionado (ou alvos do usuário) e a configuração `showTargetResult` está ligada, compare com a **CA do alvo** (`ac.value` do ator do alvo, descontando `ignoreArmor` da arma: katana monofio, lâmina monofio, soco Militar; arma Militar listada em `ignoreArmor`). Mostre "Acerta CA 14" / "Erra".
4. Cartão de chat: bônus decomposto, resultado, crítico ou falha crítica, botões **Rolar dano** (com crítico já considerado), **Aplicar dano ao alvo** (via socket, respeitando `resist.*`), e se a arma tem `stunOn` (`nat20` ou `hit`) o selo "Atordoa o alvo" com botão para aplicar o estado.
5. Crítico no dano: use `Roll#alter(2, 0, { multiplyNumeric: false })` (confirme a assinatura em `docs/API-NOTES.md`) para dobrar a **quantidade de dados**, preservando bônus fixos. Teste unitário sobre o construtor de fórmulas em `logic/dice.mjs`.

### 4.6 Munição e recarga

- Armas com `usesMagazines: true` ligam o controle de **carregadores** (o livro: "você não conta tiros, conta carregadores").
- Em **1 natural** num ataque à distância com `usesMagazines`, marque `magEmpty = true`: "O carregador acabou". A linha fica desabilitada até **Recarregar**.
- **Recarregar** (1 ação e 1 carregador): reduz em 1 o primeiro item `gear` de categoria `ammo` com `quantity > 0`, limpa `magEmpty`. Sem carregadores, mostre "Sem carregadores" e mantenha `magEmpty`.
- **Rajada** consome **1 carregador** do inventário na hora (decisão registrada), sem necessidade de recarga se ainda houver. Se não houver carregador, o ataque não é permitido.
- **Bateria:** itens `gear` de categoria `battery` ou `light`/`deck` com `uses` têm um temporizador opcional de 1 hora (seção 12 reutiliza o mesmo serviço); fora do escopo da primeira versão além do contador manual.

### 4.7 Proficiência de armadura

Mesmo mecanismo de aviso: armadura fora de `class.armor` gera `warnings` ("Armadura pesada sem proficiência") sem penalidade.

### 4.8 Testes

Vitest para: escolha de atributo (leve usa o maior), soma de bônus por `when`, dobra de dados no crítico, rajada (quais alvos acertam), `magEmpty`, desarmado d4 e `unarmed.die`.

---

## 5. Testes e rolagens gerais

### 5.1 Serviço `SNRoll`

`SNRoll.check({ actor, ability, tags, cd, label, mode, extra })` monta, avalia e posta a rolagem. Regras do livro (1.2):

- `d20 + mod. do atributo` contra CD **9, 12, 15 ou 18** (ou sem CD, para o Mestre julgar).
- 20 natural = sucesso crítico; 1 natural = falha crítica.
- Vantagem: `2d20kh`; desvantagem: `2d20kl`. Se houver fonte de vantagem **e** de desvantagem, **anulam** e rola `1d20`.
- Teste disputado: o Mestre usa o botão "Disputado" no cartão do jogador; o cartão mostra "Role contra" e deixa o adversário rolar (empate, rolar de novo). Não há automação do lado do adversário além da rolagem simples.
- Rolagens são `Roll` padrão (compatível com Dice So Nice sem trabalho extra).

### 5.2 Janela de teste com chips de contexto

Abre por clique em um atributo, no nome de uma habilidade ou pelo botão **Testar** do cabeçalho. Contém:

- Seletor de atributo e de CD (Fácil 9, Normal 12, Difícil 15, Extrema 18, Sem CD).
- **Chips de contexto** (seção 6.3 de `02`): o jogador marca "Furtividade", "Hack de rua", "Escalada"... O sistema soma `check.<tag>` de todos os modificadores do ator para as etiquetas marcadas e mostra cada fonte (ex.: "Ghost: Fantasma, vantagem em furtividade").
- Chip **"Conhecimento"** com o texto do antecedente atual (`background.knowledge`). Marcá-lo concede **vantagem**; o Mestre decide se se aplica e pode desmarcar o chip pelo cartão.
- Alternadores de vantagem e desvantagem manuais e campo de bônus situacional.
- Botão **Rolar** e opções de modo de rolagem (público, privado, cego, próprio, as do core).

Chips pré-marcados vêm de atalhos nas habilidades da ficha (ex.: o botão de uma habilidade de classe já abre o teste com os chips certos).

### 5.3 Estados que dão vantagem ou desvantagem automáticos

Consultados por `logic/advantage.mjs`: estado do ator (`flags.sombraneon.nextActionDisadvantage` do Choque neural e do Enjoado, `quebrado`, `cego` em testes de percepção), modificadores `check.*` e `attack.*` com `mode: advantage|disadvantage`, e a regra "Sem deck, desvantagem" no hack de rua (seção 7.6).

### 5.4 Cartão de rolagem e Edge

Todo cartão de teste, ataque ou execução tem o botão **Gastar Edge** (aparece só para o dono do ator que tem `edge.value >= 1`). Ao clicar:

1. Confirmação rápida (ou direto, com configuração `confirmEdge` desligada).
2. `edge.value` -= 1 (atomicamente, pelo dono).
3. **Repete a rolagem inteira** com os mesmos parâmetros e posta um novo cartão; o antigo recebe `flags.sombraneon.superseded = true` e fica riscado. **O novo resultado vale** (livro 1.7).
4. **Ressonância (Rocker):** se houver no cenário um token de ator com a habilidade `resonance`, a janela de confirmação oferece "Ressonância: +1d6 ao novo resultado" (checkbox, desmarcada; o grupo decide se o Rocker estava Próximo). Soma 1d6 ao total novo.
5. Um cartão só pode ser rerrolado uma vez por gasto de Edge, mas o novo cartão também pode ser rerrolado se houver outra ficha.

### 5.5 Testes de grupo e Mestre

Macros do compêndio do módulo: **Teste rápido de grupo** (cada personagem do cenário rola o atributo escolhido contra uma CD), **Mostrar tabela de reação** (7.2) e **Rolar moral** (15.3).

---

## 6. Arrastar e soltar

Entrada: `SNCharacterSheet#_onDropItem(event, item)` (confirme a assinatura em v14 e a chamada de `fromCompendium`). Aplicável a **todas as abas** da ficha: a janela inteira é uma zona de soltura, com destaque visual (borda ciano pulsante e rótulo "Solte para adicionar") durante o arrasto.

### 6.1 Roteador

1. **Normalize**: obtenha o `Item` (de compêndio, de mundo ou de outro ator). Clone os dados, remova `_id`, `folder`, `ownership`, `sort`, e preencha `flags.sombraneon.sourceUuid`.
2. **Mesmo ator** (reordenar) → `_onSortItem`, nada mais.
3. **Pasta de itens** → processe cada item na ordem com as mesmas regras (um diálogo de compra para o conjunto).
4. Escolha o tratamento pelo `type` do item (6.2 a 6.9).
5. Depois de criar: rolar até a linha nova e piscar (500 ms) para dar feedback.
6. Se o ator não é `character`, aplique a versão **simples**: crie o item, sem compra, sem validação, sem equipar. Armas ainda geram linhas de ataque (o `npc` usa `level + attackBonus`).

### 6.2 `class`, `origin`, `background`, `alignment`

Chamam `applySelection` (seção 2.2). Soltar um item de outro tipo de seleção com o mesmo tipo troca (com confirmação).

### 6.3 `weapon`

1. **Compra** (6.10).
2. Cria o item embutido.
3. **Equipar automaticamente** se houver mãos livres: mãos em uso = Σ `hands` das armas equipadas (armas embutidas em implantes não contam). Máximo 2. Se sobrar mão suficiente, `equipped = true`. Se não, mantém desequipada e notifica "Sem mãos livres: desequipe uma arma".
4. Valida proficiência (aviso).
5. A linha de ataque aparece sozinha (seção 4). Se a arma `usesMagazines` e não há `gear` de categoria `ammo`, aviso discreto "Sem carregadores".
6. Slots: a arma ocupa `weapon.slots` mesmo desequipada (está carregada).

### 6.4 `armor`

1. Compra.
2. Cria o item.
3. Se **não há outra armadura equipada**, equipa. Se há, `DialogV2.confirm("Trocar a armadura equipada?")`: sim = desequipa a antiga (mantém no inventário) e equipa a nova; não = fica desequipada.
4. Valida proficiência e recalcula a CA (a ficha atualiza o valor e a decomposição).

### 6.5 `gear`

1. Compra.
2. **Empilhar**: se já existe item embutido com o mesmo `identifier` e `category` não única (`vehicle` e `deck` com `uses` próprios não empilham), some `quantity` ao existente em vez de criar outro. Para consumíveis com `uses` (ração: 3 usos por pacote), mantenha os usos do existente e some pacotes.
3. Categorias especiais:
   - `deck`, `nanokit`, `stage-rig`: habilitam conjuração (7.1).
   - `ration`: habilita o botão de descanso (seção 10).
   - `firewall`: habilita Imersão (seção 12).
   - `vehicle`: slots 0, apenas listado na aba de Posses.
   - `drone-module`: se há um drone, oferece "Instalar no drone" (soma ao drone; seção 14).
4. Aviso de teto de slots se estourar (`slots.over`), sem bloquear.

### 6.6 `implant`

1. **Qualidade**: `DialogV2` com Rua, Corp e Militar (preço de cada, texto do que cada uma acrescenta, vindo de `tiers.*.delta`). Se a origem for Cromado e ainda há implantes iniciais pendentes, a escolha de qualidade fica restrita a **Rua** e o custo é **zero**.
2. **Slot**: o do implante. Se já há um implante instalado no slot, `DialogV2.confirm("Substituir <antigo>?")`. Sim = o antigo vira `installed: false` (vai ao inventário, ocupa 0 slots) e o novo é instalado. Não = o novo é criado desinstalado.
3. **Compra**: preço da qualidade (+10% se marcar "Instalar em clínica"; Hyperdoc com kit cirúrgico instala de graça). A janela só debita se o modo de compra for `buy`.
4. Aplica o novo contador de ciberpsicose e mostra o aviso quando passar de 2 para 3 ou 4 ("SAB CD 12 ao fim de cada descanso").
5. Mudar a qualidade depois (seletor no próprio item, ou aumentando na ficha) recalcula tudo, sem recriar o item.
6. Se o implante tem `weapon`, a linha de ataque aparece (seção 4).

### 6.7 `program` (programa, protocolo, Set)

Validações (`logic/casting.mjs`):

1. `kind` compatível com a classe (`program` = Netrunner, `protocol` = Hyperdoc, `set` = Rocker). Incompatível = bloqueia (GM pode forçar).
2. `tier <= tierMax(level)` (Sets não têm tier). Acima = bloqueia (GM pode forçar) com a mensagem do livro "Tier máximo por nível".
3. `known.count < known.max`. Estourou = bloqueia com opção do GM.
4. Já conhecido (mesmo `identifier`) = ignora com aviso.
5. Passou: cria o item e atualiza os contadores.

Jogador sem permissão de forçar vê uma mensagem clara; o GM vê "Adicionar mesmo assim".

### 6.8 `feature`

Aceita sempre. Se tem `choices`, abre o `ChoiceDialog` após criar. Talentos arrastados à mão contam como rolados (consomem um "talento pendente"). Aviso se `requires` não é atendido.

### 6.9 Outros destinos e saída

- **Soltar um ator** (ICE, drone) numa ficha de personagem: ignora, exceto drone do mesmo dono (vincula).
- **Arrastar para fora** (hotbar): armas e linhas de ataque viram macros de ataque; programas viram macros de execução; itens viram macros "Usar".
- **Trocar entre fichas**: arrastar um item de uma ficha para outra **copia** (Shift = move, se o usuário tem permissão nas duas).
- **Estoque do mundo**: arrastar de um ator `npc` com itens (loot) funciona igual.

### 6.10 Modo de compra

Configuração `purchaseMode` (cliente por usuário, padrão `ask`): `free` (adiciona sem custo), `buy` (debita `currency.credits`), `ask` (pergunta a cada soltura).

- A pergunta: "Adicionar de graça" / "Comprar por N cr (saldo M)" / "Cancelar". Com saldo insuficiente, "Comprar" aparece desabilitado e com a diferença.
- Itens vindos de **outra ficha** nunca perguntam compra (é transferência).
- Itens concedidos por classe, origem, pacote inicial e assistente são **gratuitos** por definição (o assistente já debitou o pacote).
- Registre a compra no histórico da ficha (log em `flags.sombraneon.ledger`, últimas 50 operações: data, item, valor), visível numa seção "Extrato" da aba Posses. Útil para corrigir engano.

### 6.11 Equipar e desequipar

Checkbox "equipado" nas linhas de arma e armadura. Regras: armadura é exclusiva (equipar uma desequipa a outra); armas respeitam as 2 mãos (excedeu = aviso e recusa). Implantes têm "instalado" no lugar de "equipado".

### 6.12 Testes

Roteiro manual detalhado por tipo de item em `06`; testes unitários para: contagem de mãos, empilhamento, validação de programa (tier, limite, tipo), compra (saldo), slot de implante ocupado.

---

## 7. Execução de programas, protocolos e Sets

### 7.1 Requisitos

| Classe | Requisito | Ausente |
|---|---|---|
| Netrunner | `gear` categoria `deck` e deck não fritado (`network.deckFried = false`) | "Sem deck, sem programas." Bloqueia. |
| Hyperdoc | `gear` categoria `nanokit` e `network.nanokitBroken = false` | Bloqueia. |
| Rocker | `gear` categoria `stage-rig` (ou implante "rig vocal" quando o conteúdo prever) | "Sem rig, sem Sets." Bloqueia. |

Quando mais de um deck existe, usa o de **maior `bonus`** entre os não fritados.

### 7.2 Execução (programa e protocolo)

- Rolagem: `d20 + execBonus` contra **CD 10 + tier**. `execBonus` = mod. do atributo (INT para Netrunner, SAB para Hyperdoc) + `deck.bonus` (só Netrunner) + `cast.bonus` + `cast.program.<identifier>` + imersão (+1 se `network.immersed`).
- Vantagem e desvantagem pela mesma central (5.1).
- **Sucesso:** o efeito acontece. O cartão mostra o texto do livro e, se houver `damage` ou `healing`, botões **Rolar dano / cura** e **Aplicar** nos alvos (socket). O programa **continua disponível** (não é consumido), exceto os que têm `uses` (Eco digital, Reconstrução total: 1 uso por descanso).
- **20 natural:** "canal estável" (Netrunner) ou equivalente (Hyperdoc): dobre **um** efeito numérico. Se o programa tem dano ou cura, a rolagem dobra os **dados**; se não, o cartão mostra "Dobre a duração ou o alcance" como lembrete.
- **Falha:** o programa vira `crashed = true` até o descanso. Para **programas** (Netrunner), o Alerta sobe em 1 (9.4 do livro: "um programa entra em Crash"). Protocolos em Crash não mexem no Alerta.
- **1 natural:** além do Crash, role **d6**: **Feedback** (programa) ou **Rejeição** (protocolo), com automação por resultado (7.3 e 7.4). Cartão mostra a tabela e o resultado.
- Programa `crashed` aparece apagado na ficha, com botão "Restaurar" (manual) e o tooltip "Volta no próximo descanso".
- Hack em rede com **Alerta** sempre pergunta "Esta execução acontece numa invasão ativa?" quando o rastreador está parado; se estiver ativo, incrementa automaticamente (ver 7.5).

### 7.3 Tabela de Feedback (programas, d6)

| d6 | Efeito | Automação |
|---|---|---|
| 1 | Choque neural | Aplica **1d6** de dano ao próprio ator (via `applyDamage`) e define `flags.sombraneon.nextActionDisadvantage = true` (consumido pela próxima ação do ator). |
| 2 | Deck fritado | `network.deckFried = true`. Só volta no descanso. |
| 3 | Alarme | Alerta +1. |
| 4 | Rastreado | `network.traced = true`; cartão avisa ao Mestre ("o sistema descobre a localização do corpo"). Sem efeito mecânico. |
| 5 | Memória corrompida | Escolhe **outro programa** do ator (aleatório entre os não em Crash) e define `crashed = true`. Se não houver, nada. |
| 6 | Sobrecarga | **Todos** os programas do mesmo tier do usado viram `crashed = true`. |

**Deck customizado** (talento do Netrunner): se o ator tem a habilidade e `uses.value > 0` (1 por descanso), o **primeiro Feedback do descanso é absorvido**: não rola o d6, consome o uso e o cartão avisa. O Crash do programa continua.

### 7.4 Tabela de Rejeição (protocolos, d6)

| d6 | Efeito | Automação |
|---|---|---|
| 1 | O alvo sofre 1d4 de dano | Rola e aplica ao alvo selecionado (ou mostra o botão "Aplicar" se não há alvo). |
| 2 | O alvo fica enjoado | Estado **Enjoado** no alvo (desvantagem na próxima ação). |
| 3 | Você perde 1 protocolo adicional até o descanso | Outro protocolo do ator, aleatório e não em Crash, vira `crashed`. |
| 4 | Efeito invertido por 1 rodada | Cartão mostra a inversão: cura vira dano de 1d4, ou o inverso. Rola 1d4 e oferece aplicar. |
| 5 | Nanokit quebra | `network.nanokitBroken = true` até ser reparado (botão "Reparar", a critério do Mestre). |
| 6 | Nanobots fora de controle | O alvo sofre um **Surto**: role o d6 da tabela de ciberpsicose (seção 11) e poste. |

### 7.5 Alerta (rastreador de invasão)

`AlertTracker` (ApplicationV2 flutuante, abre pelo botão do cabeçalho ou macro "Alerta"). Estado em `game.settings` (mundo): `alert { value: 0..4, active: boolean, label: string }`. Alterações dos jogadores vão pelo socket ao Mestre ativo.

O Alerta **sobe em 1** quando (livro 9.4): hack de rua falha; programa entra em Crash; ocorre Feedback; o grupo faz barulho (botão manual "Barulho" no rastreador). Cada **evento** sobe em 1: um 1 natural gera Crash (+1) e Feedback (+1), e Feedback "Alarme" (+1), conforme a leitura literal do livro (decisão registrada, configurável em `alertStacking`).

Interface:

- Barra de 0 a 4 com cores (ciano a magenta), botões **+1**, **-1** (só GM), **Zerar**, **Nova invasão**.
- Ao chegar em **4**: mensagem de chat automática "O ICE ativo ataca. A segurança física chega em 1d4 rodadas (ou minutos)", com botão para o GM rolar o 1d4.
- **Apagar rastro** (Tier 1): ao ter sucesso, oferece "Reduzir Alerta em 1 (1 vez por invasão)". Controla `flags.sombraneon.alertErasedThisRun` zerando em Nova invasão.
- **Colapso** (Tier 5) com sucesso: Alerta vai a 4 automaticamente.
- O rastreador só incrementa se `active` estiver ligado; ao falhar um hack com rastreador desligado, pergunta "Iniciar invasão (Alerta 1)?".

### 7.6 Hack de rua

Botão **Hack de rua** no cartão de rede: abre a janela com CD (9 básico, 12 protegido, 15 corporativo) e rola `d20 + INT`.

- **Sem deck**: desvantagem automática.
- **Sem ferramenta alguma**: o livro diz que não é possível. Ferramenta = deck, cabo de interface ou implante Jack de interface. Para **Sintético** (interface nativa) a ferramenta é desnecessária. Sem nenhuma, a janela bloqueia com explicação e oferece "Rolar mesmo assim" apenas ao GM.
- Vantagem: Ghost (Fantasma), Sintético (Interface nativa). Desvantagem: nada além de "sem deck".
- **Falha:** Alerta +1 (se houver invasão ativa).

### 7.7 Sets do Rocker

- Rolagem: `d20 + CAR` contra **CD 12** (fixa). Bônus de `cast.program.<identifier>` (Afinação) soma.
- **Sucesso:** o Set é usado: `crashed = true` (significa "gasto") até o descanso. Cartão mostra o efeito do livro e **calcula valores**: Estática (máximo `1 + mod. de CAR` inimigos), Refrão (cura `1d6 + nível`, botão aplicar), Solo (dano sônico `1d6 + nível`, alvo faz CON CD 12 para metade; botão aplicar com opção "metade"), Cadência (+1 de CA até o fim da cena nos aliados; botão cria estado temporário), Distorção (CON CD 12 ou atordoado 1 rodada), Hype (aliados ganham vantagem no próximo teste; botão cria marcador).
- **Falha:** o Set **não** é gasto (livro 4.5).
- Não existe crítico ou falha crítica de Set no livro; 20 e 1 naturais têm o resultado comum (decisão registrada).
- **Backing track:** 1 Set por descanso sem gastar ação (`uses 1/rest`, apenas marca no cartão "sem gastar ação").

### 7.8 Cartão de execução

Mostra: nome, tier, CD, bônus decomposto, resultado, desfecho (sucesso, crítico, Crash, Feedback), efeito do livro (texto), botões de aplicar e o botão **Gastar Edge**.

### 7.9 Limites de conhecimento

`casting.known.max` e `tierMax` são exibidos na aba de Programas ("3 / 5 conhecidos, tier máximo 2"). Ao subir de nível, o botão **Aprender programa** (seção 8.5) abre o seletor.

### 7.10 Testes

Vitest para: `castingKnownMax` (todas as classes e níveis), `tierMax`, CD (`10 + tier`), regras de Feedback (aplicador sobre um "mundo" simulado), `deckAbsorb`, escolha do programa a crashar, alerta por evento.

---

## 8. Talentos e subir de nível

### 8.1 Contagem

`talentsEarned = |{ n ∈ class.talentLevels : n <= level }| + Σ talents.extra`. `talentsRolled` = quantidade de itens `feature` com `kind: talent` e `flags.sombraneon.talentRoll` presente. **Pendentes** = `earned - rolled`, exibido como contador com botão **Rolar talento**.

### 8.2 Rolagem

1. Rola **2d6** na RollTable da classe (`class.talentTable`), silenciosa ou com chat conforme `talentToChat` (padrão ligado).
2. Resolve o resultado:
   - **2, 3-6, 10-11:** o resultado aponta para um item `feature` de talento. Cria o item embutido (`flags.sombraneon.talentRoll = total`, `talentLevel`) e abre o `ChoiceDialog` se ele tiver `choices` (família de arma, programa afinado, Set afinado, etc.).
   - **7-9:** o item é um talento "+2 em atributo" com `choices: [{ key: 'abilities', options: ['for','des','con'] }]` (as opções vêm de cada classe). O jogador escolhe **um** atributo; o modificador `abilities.{choice.abilities}.value +2` entra em vigor.
   - **12:** o `ChoiceDialog` oferece duas saídas: **qualquer talento da tabela** (lista dos de 2, 3-6, 10-11 e o +2 de atributo) ou **+2 pontos de atributo, divididos como quiser** (dois incrementos livres: +2 em um atributo ou +1 em dois). A segunda saída cria um talento "Ajuste de atributo" com os modificadores resultantes.
3. **Talentos repetidos se acumulam**: nada de bloquear duplicatas. A ficha agrupa itens com o mesmo `identifier` e mostra `×2`.
4. **Nat** rola 1 talento a mais no nível 1.
5. Cartão de chat: "Fulano rolou 8 na tabela de talentos de Solo: +2 em DES".

### 8.3 Efeitos específicos dos talentos

Todos expressos em modificadores (nenhum handler), exceto onde o livro precisa de lógica:

| Talento | Representação |
|---|---|
| Segundo domínio (Solo) | Novo item "Domínio de arma" com `choice.family` própria; mesmos modificadores do primeiro. |
| Arma afinada (Solo) | `attack.all +1` e `damage.all +1` com `when: domain`. |
| Armadura treinada (Solo) | `ac.bonus +1` com `when: armor:medium|heavy`. |
| Biblioteca / Biblioteca clínica / Setlist maior | `cast.known +1`. |
| Programa afinado / Protocolo afinado / Afinação | `cast.program.@choice.program +1`; a escolha é um programa conhecido. |
| Deck customizado | Handler `deck-absorb` (7.3), `uses 1/rest`. |
| Nanobots em enxame | `cast.heal +1d4`. |
| Edge extra (Ghost) | `edge.max +1`. |
| Exploit (Ghost) | Handler `exploit`: no cartão de ataque ou hack contra alvo desatento, oferece escolher o efeito (cego, imóvel, +1 dado de dano, 1 implante desativado) e aplica o estado por 1d4 rodadas. |
| Camuflagem óptica (Ghost) | `uses 1/rest`, botão no cartão. |
| Backing track (Rocker) | `uses 1/rest` (7.7). |
| Drone auxiliar | Handler `aux-drone` (seção 14). |
| Armamento do drone | `drone.attack +1`, `drone.damage +1`. |
| Chassi reforçado | `drone.hp +4`, `drone.ac +1`. |

### 8.4 Subir de nível

Botão **Subir de nível** na ficha, habilitado quando `xp.ready`. Também há ajuste manual do nível (somente GM).

1. Pergunta de confirmação com o resumo do que vai acontecer.
2. `level += 1`. XP: se `xpOnLevelUp = carry` (padrão), `xp.value -= (level anterior * 10)`; se `reset`, zera.
3. **HP:** role o dado de vida da classe; ganho = `max(1, rolagem + mod. de CON)`. Salve a rolagem **crua** em `hp.rolls`. O HP atual sobe pelo ganho.
4. **Talento:** se o novo nível está em `class.talentLevels`, atualiza os pendentes e oferece rolar na hora.
5. **Programas, protocolos e Sets:** Netrunner e Hyperdoc aprendem **1 por nível**; Rocker aprende 1 nos níveis 4, 7 e 10. Abre o seletor com os itens permitidos (tier ≤ `tierMax(novo nível)`), mostrando destaque no que acabou de liberar (ex.: tier 2 no nível 3).
6. **Concessões novas:** roda `GrantEngine` (seção 2.3) para itens de classe com `level` maior.
7. Posta um cartão "Subiu para o nível N" com o resumo (HP ganho, talento, programa).

### 8.5 HP retroativo e dado de vida

O HP máximo é recalculado com o **mod. de CON atual** sobre todas as rolagens (decisão padrão `retroactiveHp = true`; desligue para congelar o ganho de cada nível no valor de quando foi rolado). O armazenamento de `hp.rolls` é a base.

### 8.6 Testes

Vitest: contagem de talentos pendentes, ganho de HP com mínimo 1, XP com sobra, programas aprendidos por nível e por classe, tabela 2d6 → faixa.

---

## 9. Morrendo, Duro de matar e Filtro de dor

### 9.1 Quando o HP chega a 0

Gatilho: hook `updateActor` observando `system.hp.value` passando de `> 0` para `<= 0` (para `character`). Executado **apenas pelo Mestre ativo**, para evitar duplicidade. Sem diálogos para o jogador (resolução automática com mensagem no chat), e com cada passo anotado no cartão.

Ordem:

1. **Filtro de dor** (implante, tem `uses`): se disponível, consome 1 uso, define HP = 1. Fim.
2. **Duro de matar** (Solo, 3 usos por descanso): se disponível, rola **CON CD 15** (com vantagem se tem **Resistente**: etiqueta `resist-injury`). Sucesso: HP = 1, consome 1 uso. Falha: consome o uso e segue para 3. (Decisão: a tentativa gasta o uso.)
3. **Morrendo:** `dying.active = true`; rola **1d4 + mod. de CON** (mínimo 1) ou o dado definido por `dying.die` (Coração cibernético Militar: **1d6**). `dying.remaining` = resultado; `dying.rolled` = resultado; `dying.stable = false`. Estado **Inconsciente** e **Morrendo** no token.

Ordem 1, 2, 3 é a padrão, mas se o ator tem os dois (1 e 2), o cartão informa qual foi usado e o jogador pode reclamar ao Mestre. Configuração `zeroHpOrder` não é necessária na v1.

### 9.2 Rodada do morrendo

Gatilho: `combatTurnChange` quando o combatente é um personagem com `dying.active && !dying.stable`. O Mestre ativo:

1. Rola **1d20**. **20 natural**: o personagem volta com **1 HP**, `dying.active = false`, remove os estados.
2. Senão: `dying.remaining -= 1`. Se chegar a 0: **morre** (estado Morto/Derrotado, mensagem de chat, `dying.active = false`).

O `remaining` representa o número de **chances** (turnos) que o personagem ainda tem. Fora de combate, o botão **Avançar rodada** no cartão do morrendo faz o mesmo passo.

### 9.3 Cura e estabilização

- Qualquer **cura** que leve o HP acima de 0 acorda o personagem (hook em `updateActor`): `dying.active = false`, remove estados. Ele recebe a cura normal.
- **Estabilizar:** botão "Estabilizar" no cartão do morrendo (qualquer jogador vê). Abre teste de **INT CD 15**, alcance Perto, com **kit médico** (vantagem em orgânicos; o cartão pergunta se o alvo é orgânico). Sucesso: `dying.stable = true` (o contador para; o alvo continua inconsciente, não morre). Usa o Primeiros socorros do Hyperdoc (1 por cena, sem teste e sem protocolo) por botão separado.
- **Choque cardíaco** (Tier 2): protocolo que, com sucesso, devolve 1d4 HP e acorda.
- **Ressuscitar** (Tier 3): alvo morto há menos de 1 minuto volta com 1 HP; exige botão manual do Mestre (o sistema não sabe há quanto tempo).

### 9.4 Nocaute

O diálogo de aplicar dano tem a caixa **Nocautear** (livro 1.4): ao chegar a 0, em vez do fluxo de morte, o alvo fica **Inconsciente** (sem `dying`). Para `npc`, `ice` e `drone` não há fluxo de morte: ao chegar a 0 ficam **Derrotados** (o drone vira `destroyed`).

### 9.5 Aplicar dano e cura

`SNActor#applyDamage(amount, { type, nonlethal, source })` e `applyHealing(amount)`:

- Dano aplica `resist.*` (multiplicador 0.5, arredondando para cima o dano final).
- Reduções fixas (`damage.reduce`, Corpo de ferro) são modificadores temporários do protocolo e entram aqui.
- Imersão: se `network.immersed`, dispara o teste de corpo ferido (12.4).
- Cura não passa do `hp.max`.

---

## 10. Descanso (reboot)

Botão **Descansar** na ficha. Também a macro "Descanso em grupo" para tokens selecionados.

### 10.1 Janela

Campos: **qualidade da área** (Segura, Insegura, Arriscada, Mortal; padrão vindo da configuração do cenário), **ração** (mostra quantas há; Sintético não gasta), **número de interrupções estressantes** (0, 1, 2...).

### 10.2 Procedimento

1. **Ração.** Sem ração e sem a regra `rest.noRation`: bloqueia ("Descansar exige 1 ração"), com opção do GM de ignorar. Com ração: consome 1 uso (pacote de 3 = 3 usos).
2. **Encontros.** Informa a cadência do livro: 1d6 a cada **3 h** em área Insegura, **2 h** em Arriscada, **1 h** em Mortal; **nenhuma** em Segura. Botão "Rolar encontros" rola `floor(8 / intervalo)` vezes 1d6 e mostra os resultados (1 = encontro aleatório) como um cartão para o Mestre.
3. **Interrupções.** Cada interrupção exige teste de **CON CD 12**. Qualquer falha: a ração é gasta e o personagem **não recupera nada**.
4. **Se o descanso vale**, restaure:
   - `hp.value = hp.max`.
   - Todos os `uses` com `per: rest` voltam ao máximo.
   - Programas e protocolos em Crash voltam (`crashed = false`). Sets voltam.
   - `network.deckFried = false`, `network.traced` mantém (o Mestre limpa), `network.nanokitBroken` mantém ("até ser reparado"; botão Reparar).
   - `edge.triggerUsed = false`.
   - **Ghost, Edge de rua:** se o ator tem a habilidade e `edge.value === 0`, ganha 1 ficha.
   - Limpa flags de turno (`nextActionDisadvantage`, `Mira`).
   - **Rigger:** se o drone está destruído, oferece **Reconstruir (250 cr)**: debita e restaura.
   - **Imersão:** se `network.immersed`, sai da Rede (descansar implica desconectar).
5. **Ciberpsicose** (seção 11) é rolada ao fim, automaticamente, se `chrome.cd` não for nulo.
6. Cartão de chat "Fulano descansou": HP recuperado, o que voltou, ração gasta, resultado da ciberpsicose.

### 10.3 Grupo

A macro de grupo pede qualidade da área uma vez, roda os passos acima para cada ator selecionado e rola os encontros **uma vez** para o grupo.

### 10.4 Testes

Vitest: restauração de usos por `per`, ração (3 usos), falha na interrupção, Sintético sem ração, Ghost recarrega Edge somente se vazio.

---

## 11. Ciberpsicose

### 11.1 Contagem

`chrome.effective = clamp(count + adjust, 0, 4)` quando `count > 0`, onde `adjust` soma `cyber.adjust` (Cromado -1, Biomod +1). `chrome.cd = effective >= 4 ? 14 : effective === 3 ? 12 : null`.

### 11.2 Teste

Ao fim de cada descanso (e por botão manual **Testar ciberpsicose**), se `chrome.cd`: rola `d20 + mod. de SAB` contra a CD. **Nat** tem vantagem (`cyber.advantage`). Outros modificadores (`check.cyberpsychosis`) valem.

Falha: **Surto** (d6, tabela do livro 7.3), postado no chat:

| d6 | Surto | Automação |
|---|---|---|
| 1 | Tremor | Estado **Tremor** (desvantagem em ataques por 1 rodada), removido por `combatTurnChange` ou manualmente. |
| 2 | Fúria | Cartão: o Mestre controla; alvo mais próximo. |
| 3 | Paranoia | Estado até o fim da cena (removido manualmente ou por "Fim de cena"). |
| 4 | Dissociação | Cartão: perde a ação. |
| 5 | Mudez | Estado até o fim da cena. |
| 6 | Apagão | Rola 1d4 rodadas, estado **Inconsciente** pela duração. |

"O Mestre controla você por uma rodada" é apenas informativo. **Purga de código** (Tier 3) remove um Surto: botão no cartão do Surto para o Mestre.

### 11.3 Avisos

A ficha mostra o selo de ciberpsicose no cabeçalho do cromo: contagem efetiva, CD, e "sem risco" quando nulo. O diálogo de instalar implante avisa a mudança de risco antes de confirmar.

---

## 12. Imersão total e Firewall

### 12.1 Entrar

Botão **Imergir**. Requisitos: deck (não fritado), **conexão** (Jack de interface instalado ou cabo de interface no inventário; Sintético dispensa) e **Firewall** (`gear` categoria `firewall`, 2 por slot). O jogador confirma que gastou a ação e define "quem vigia o corpo" (campo livre no cartão). Ao entrar:

1. Consome 1 Firewall.
2. `network.immersed = true`, `network.firewall.active = true`, `network.firewall.expiresAt = now + 1 hora` (timer conforme a seção de configuração 12.5).
3. Aplica o estado **Imerso** (corpo inconsciente e indefeso; **CA do corpo = 5** na derivação enquanto `immersed`).
4. Cartão: "Fulano mergulhou na Rede. O corpo está indefeso (CA 5)."

Só um Firewall protege por vez: **ativar outro reinicia o cronômetro** (consome mais um Firewall e `expiresAt = now + 1 h`).

### 12.2 Na Rede

- Programas executam **sem limite de alcance** dentro da rede e com **+1** na execução (modificador condicionado a `network.immersed`).
- Botões da ficha continuam funcionando (a ficha não troca de modo).

### 12.3 Firewall queimando

O Mestre ativo mantém um timer (`setTimeout`, reagendado em `ready` e a cada atualização de `expiresAt`). Aos 5 minutos finais, aviso discreto para o dono. No fim:

- `network.firewall.active = false`.
- Se o ator está imerso: cartão "O Firewall queimou. Você tem 1 rodada para sair." Em combate, no turno seguinte (a partir de `combatTurnChange` do próprio ator, depois da rodada de graça), rola **Feedback d6 por rodada** (tabela 7.3) e marca "Todo ICE ataca você com vantagem". Fora de combate, botão **Rolar Feedback de rodada** no cartão.
- Se não está imerso, só encerra a proteção.

### 12.4 Corpo ferido

Hook: quando o ator imerso sofre dano (via `applyDamage` ou queda de HP), exige **CON CD 12** (vantagem se `check.stay-connected`, do Jack de interface Militar). Falha: **expulso** (`immersed = false`) e sofre 1d6 de dano neural.

### 12.5 Sair

Botão **Sair da Rede** (custa uma ação), define `immersed = false`, remove o estado Imerso. O Firewall, se ainda ativo, continua contando (não reembolsa).

### 12.6 Cronômetro

Configuração `firewallTimer`:

- `real` (padrão): `Date.now()` em milissegundos. O Mestre pode **pausar** o cronômetro (botão no cartão, útil em pausas da mesa): guarda `pausedAt` e, ao retomar, soma a duração da pausa.
- `worldTime`: usa `game.time.worldTime`, para campanhas que avançam o relógio do mundo.
- `manual`: sem contagem automática; o Mestre usa o botão "Queimar Firewall".

O mesmo serviço oferece, mais tarde, um temporizador para **Bateria** (1 hora de mesa) e a regra de equivalência "1 hora de jogo = 10 rodadas" (fora do escopo da v1; deixe a interface preparada).

### 12.7 Testes

Vitest: `expiresAt` com pausa, troca de Firewall, expulsão por corpo ferido (probabilidades fixas via rolagem injetada).

---

## 13. Edge

### 13.1 Contador na ficha

Marcador visual do cabeçalho: círculo com a ficha (ciano acesa, apagada vazia), tamanho conforme `edge.max` (padrão 1; Edge extra do Ghost: 2). Clique no marcador **não** gasta; Edge é gasto pelos cartões de rolagem (5.4) e pelo botão **Gastar Edge** em reações que o Mestre aceite (repetir qualquer rolagem do jogador, inclusive de Surto e de Feedback).

### 13.2 Conceder

- O Mestre tem o botão **Dar Edge** (macro para tokens selecionados, e botão na ficha para o GM). Ao conceder acima do máximo, o cartão avisa "já tem o máximo".
- **Entregar:** botão **Entregar Edge** na ficha do jogador com a ficha em mãos. Seleciona outro personagem do grupo (lista de personagens com dono ativo); passa pelo socket para o Mestre ativo executar a transferência (decrementa um, incrementa o outro, respeita o máximo do destino).
- **Gatilho pessoal:** botão **Cumpri meu gatilho** (visível quando `edge.value < edge.max` e `!edge.triggerUsed`). O jogador clica; um cartão **sussurrado ao Mestre** mostra o gatilho (texto do livro) com **Aprovar** e **Negar**. Aprovar: `edge.value += 1` e `edge.triggerUsed = true`. O livro diz que "o Mestre decide quando o gatilho foi cumprido": a decisão fica com o botão.
- **Ghost, Edge de rua** é tratado no descanso (seção 10).

### 13.3 Testes

Vitest: máximo, entrega, gatilho uma vez por descanso.

---

## 14. Drone do Rigger

### 14.1 Criação

A habilidade de classe **Drone voador** tem o handler `drone` com `onGrant`: cria um ator `drone` (via socket, se o usuário não puder criar atores) com:

- Nome "Drone de <nome do dono>", imagem padrão do sistema.
- `ownerUuid` do personagem; `kind: primary`.
- **Propriedade** (ownership) espelhada do dono (os mesmos usuários têm OWNER no drone).
- Pasta "Drones" (criada se não existir).
- Token com disposição amigável e vinculação de dados ativa.

E salva o UUID em `flags.sombraneon.droneUuid` no personagem. Se o personagem trocar de classe, o drone **não é apagado** (apenas desvinculado com aviso).

**Drone auxiliar** (talento): cria um segundo ator `drone` com `kind: auxiliary` (sensor, sem ataque).

### 14.2 Estatísticas derivadas (a partir do dono)

| Estatística | Cálculo |
|---|---|
| CA | 12 + Σ `drone.ac` (Chassi reforçado +1, Placa de impacto +1) |
| HP máximo | `4 + 2 * nível do dono` + Σ `drone.hp` (Chassi reforçado +4) |
| Ataque | `d20 + mod. de DES do dono` + Σ `drone.attack` (Armamento do drone +1) |
| Dano | d4 (níveis 1 a 4), d6 (5 a 8), d8 (9 e 10) + Σ `drone.damage` |
| Deslocamento | Voa até Próximo por turno (informativo) |

O drone atualiza quando o dono muda de nível ou de modificadores (o dono notifica o drone em `updateActor`, via `Actor#prepareDerivedData` do drone lendo o dono por UUID; use `foundry.utils.fromUuidSync` em dados derivados e re-renderize a ficha do drone no hook de atualização do dono).

### 14.3 Uso

- Na ficha do **dono** há um cartão "Drone": HP, CA, botões **Atacar com o drone** (uma ação por rodada, além da do dono; o botão registra um marcador de ação do drone por rodada em combate), **Abrir ficha do drone** e **Reconstruir** (se destruído).
- Na ficha do **drone**: o mesmo, com os módulos instalados e uma lista de notas do livro (voo ignora terreno difícil, barulhento = desvantagem em furtividade, carrega 1 item pequeno, sofre programas e EMP como qualquer dispositivo, Link até Longe).
- **Destruído:** ao HP chegar a 0, `destroyed = true`, estado Derrotado. Reconstruir custa **250 cr e 1 descanso** (seção 10).
- **Módulos de drone** (`gear` categoria `drone-module`): arrastar um módulo para a ficha do drone ou instalar pelo botão aplica seus efeitos (Placa de impacto: +1 CA do drone; Sensor térmico e Compartimento de carga: texto informativo).

### 14.4 Testes

Vitest: HP, CA, dado de dano por nível, efeito dos talentos.

---

## 15. Combate

### 15.1 Iniciativa

- `CONFIG.Combat.initiative.formula = '1d20 + @initiative.bonus'` e `decimals = 2`.
- Override de `Combatant#getInitiativeRoll`: se o ator tem `initiative.advantage`, usa `2d20kh`; soma um desempate de **0,01 para personagens e drones** (livro: "empate favorece os jogadores").
- **Grupo inimigo:** "o Mestre rola 1d20 por grupo inimigo". Macro/botão **Rolar iniciativa por grupo**: combatentes `npc` com a mesma etiqueta `flags.sombraneon.group` recebem o mesmo resultado (configuração `groupInitiative`, desligada por padrão).
- **Reflexos neurais Militar** (age antes de todos na primeira rodada se não for surpreendido): ao iniciar o combate (`combatStart`), o combatente com a flag e sem o estado Surpreso recebe iniciativa `maior + 1` na rodada 1. Handler `neural-first`.
- **Sintético e Biomod (Reflexos acelerados):** vantagem na iniciativa pelos modificadores.

### 15.2 Surpresa

Estado **Surpreso** (livro 1.4: quem surpreende age um turno inteiro antes da iniciativa; ataques contra alvos surpresos têm vantagem). O Mestre marca o estado no token; o atacante vê "Alvo surpreso: vantagem" marcado e travado na janela de ataque. O estado se remove sozinho ao final do primeiro turno do combatente. Habilidade **Sentidos agudos** (mutação) ou `flag.notSurprised` impede o estado: o botão do Mestre avisa e pergunta se quer forçar.

### 15.3 Moral

- `npc.morale { enabled, mod, cd: 15 }`. Botão **Teste de moral** na ficha do NPC e macro: rola `d20 + mod` contra `cd`; falhou = foge (cartão).
- Detecção opcional: quando metade do grupo `npc` do combate está derrotada (ou um NPC solo chega à metade do HP), poste um cartão ao Mestre "Hora de testar a moral" com botão de rolar (uma vez com o líder). Configuração `moraleHint` (padrão ligada).

### 15.4 Estados

Conjunto em `CONFIG.statusEffects` (ícones do core quando existirem; fallback para SVGs simples em `assets/icons/`): Morto, Inconsciente, Morrendo, Atordoado, Cego, Imóvel, Enjoado, Assustado, Surpreso, Imerso, Derrubado, Invisível, Tremor. Cada um tem `description` curta no `lang`. Estados que modificam testes (Atordoado, Cego, Enjoado, Assustado) entram na central de vantagem e desvantagem como fontes travadas.

### 15.5 Cobertura

Alternador **Cobertura** na ficha do ator soma **+2 de CA** (`ac.cover`). Também aparece como botão rápido no token (hud) em v14 se a API permitir; opcional.

### 15.6 Terreno e movimento

Não automatizados (`grid.distance` 1,5 m apenas informa). Alcances (Perto, Próximo, Longe) são marcadores textuais; a ficha e as ajudas mostram os valores em metros.

---

## 16. Cartões de chat e hooks

Templates em `templates/chat/`: `check.hbs`, `attack.hbs`, `damage.hbs`, `cast.hbs`, `rest.hbs`, `levelup.hbs`, `info.hbs` (descrição de item), `edge.hbs`, `alert.hbs`, `dying.hbs`. Estado em `message.flags.sombraneon` (JSON simples: parâmetros da rolagem para o reroll por Edge, resultado, alvos, estados aplicados).

Interação:

- `Hooks.on('renderChatMessageHTML', ...)` liga os botões `[data-action]` (confirme o nome do hook em `docs/API-NOTES.md`).
- Cada botão confere **permissão** (dono do ator do cartão, ou GM) antes de agir; senão desabilita e mostra tooltip.
- Mensagens podem ser escondidas parcialmente (valores de dano só para o GM) conforme o modo de rolagem do core.
- Cartão de **item** ("Mostrar no chat") traz a descrição, o custo e o botão **Adicionar à minha ficha** para jogadores com personagem.

Hooks usados (verifique cada um): `init`, `i18nInit`, `setup`, `ready`, `updateActor`, `preUpdateActor`, `createItem`/`deleteItem` (recalcular avisos), `renderChatMessageHTML`, `combatStart`, `combatTurnChange`, `combatRound`, `hotbarDrop`, `getActorContextOptions` (menu de contexto), `renderSettings` (botão do Alerta).

---

## 17. Operações restritas ao Mestre e socket

`SNSocket` no canal `system.sombraneon`. Operações:

| Operação | Quem pede | Quem executa | Notas |
|---|---|---|---|
| `applyDamage` / `applyHealing` | qualquer jogador | GM ativo | Valida que o remetente tem visão do cartão. |
| `transferEdge`, `grantEdge` | jogador ou GM | GM ativo | Respeita o máximo. |
| `createDrone` | jogador (dono) | GM ativo | Cria o ator e espelha a propriedade. |
| `updateAlert` | jogador ou GM | GM ativo | Jogadores só podem subir o Alerta. |
| `requestTriggerApproval` | jogador | GM ativo (cartão) | Cartão sussurrado. |
| `restoreRest` | GM | GM | Descanso de grupo. |
| `restartFirewallTimer` | GM | GM | Reagendar `setTimeout`. |

Regras:

- Toda requisição leva `userId`, `requestId`, `payload`. O executor **revalida** permissão (nunca confia no remetente) e responde com `requestId` + resultado para o remetente atualizar a interface.
- Sem GM ativo: notificação "Nenhum Mestre ativo para executar esta ação" e nada é feito.
- Todas as operações são **idempotentes** ou carregam `requestId` para evitar duplicidade.

---

## 18. Configurações do sistema

Registradas em `src/settings.mjs`. Todas com nome e dica em `lang/`.

| Chave | Escopo | Padrão | Efeito |
|---|---|---|---|
| `hpLevel1Mode` | mundo | `roll` | HP do nível 1: rolar o dado de vida ou usar o valor máximo. |
| `xpOnLevelUp` | mundo | `carry` | Sobra de XP: `carry` ou `reset`. |
| `retroactiveHp` | mundo | `true` | HP recalculado com o CON atual. |
| `proficiencyPenalty` | mundo | `warn` | `warn` mostra aviso; `none` esconde. Não existe penalidade mecânica. |
| `unarmedDie` | mundo | `d4` | Dano desarmado base. |
| `burstDamage` | mundo | `perTarget` | `perTarget` ou `single`. |
| `alertStacking` | mundo | `literal` | `literal` (um incremento por evento) ou `single` (um por ação). |
| `firewallTimer` | mundo | `real` | `real`, `worldTime` ou `manual`. |
| `restRequiresRation` | mundo | `true` | Descanso gasta ração. |
| `autoCyberpsychosisOnRest` | mundo | `true` | Rola o teste ao fim do descanso. |
| `showTargetResult` | cliente | `true` | Compara o ataque com a CA do alvo selecionado. |
| `purchaseMode` | cliente | `ask` | `ask`, `free` ou `buy`. |
| `confirmEdge` | cliente | `true` | Pede confirmação ao gastar Edge. |
| `talentToChat` | mundo | `true` | Posta a rolagem de talento. |
| `wizardAllowManualAbilities` | mundo | `true` | Permite digitar atributos no assistente. |
| `openWizardOnCreate` | cliente | `true` | Abre o assistente ao criar personagem. |
| `announceSelections` | mundo | `false` | Mensagem ao trocar classe, origem etc. |
| `groupInitiative` | mundo | `false` | Iniciativa por grupo para NPCs. |
| `moraleHint` | mundo | `true` | Aviso de moral. |
| `removedImplantsSlots` | mundo | `0` | Slots de equipamento de um implante removido no inventário (padrão 0). |
| `debugModifiers` | cliente | `false` | Loga modificadores com chave desconhecida. |
| `schemaVersion` | mundo (oculta) | atual | Migrações. |

---

## 19. Ordem de implementação das automações

Referência cruzada com `06-FASES-E-TESTES.md`. A cadeia mínima para a experiência de aceite: **motor de modificadores (02) → seletores e concessões (2) → ataques (4) → arrastar e soltar (6) → assistente (3) → talentos e nível (8) → programas (7) → resto**.
