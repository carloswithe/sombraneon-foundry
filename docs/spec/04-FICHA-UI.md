# 04. Fichas, interface e estilo

A ficha de papel (`design/sombraneon-ficha.html`) é a referência de **identidade e de organização de informação**. A ficha do Foundry não é uma cópia dela: é a mesma linguagem visual com a interação de uma ficha digital (abas, seletores, botões que rolam).

## 1. Princípios

1. **Ler de relance.** Tudo que importa em combate (HP, CA, iniciativa, Edge, ataques) cabe na primeira aba, sem rolagem.
2. **Clique é ação.** Atributo rola teste, linha de ataque rola ataque, programa executa, Edge gasta no cartão. Edição é outra coisa (modo de edição).
3. **Dois modos.** **Jogo** (padrão): campos derivados somente leitura e botões ativos. **Edição** (cadeado no cabeçalho): permite digitar atributos base, XP, créditos, ajustes e textos livres. Mestre sempre pode editar.
4. **Mostre de onde veio.** Todo número calculado tem dica com a decomposição (`parts[]`).
5. **Nada de travessões** em nenhum texto de interface (regra do projeto).
6. **Funciona em tela pequena.** Largura mínima útil de 720 px; a janela é redimensionável; em largura menor, as colunas viram pilha.
7. **Acessível.** Contraste AA nos textos, foco visível, botões com `aria-label`, não depender só da cor (ícone mais texto).

## 2. Tokens visuais

Defina em `styles/tokens.css` (escopo `.sombraneon`):

```css
.sombraneon {
  --sn-bg:#05060b; --sn-panel:#0b0d16; --sn-panel-2:#111426;
  --sn-ink:#e9eef8; --sn-dim:#8892ae; --sn-line:#272d47;
  --sn-cyan:#19e3ff; --sn-mag:#ff2e88; --sn-yel:#ffe14a; --sn-grn:#3dff9a;
  --sn-danger:#ff4d4d; --sn-radius:2px; --sn-gap:8px;
  --sn-font-display:'Orbitron',sans-serif;      /* títulos, números grandes */
  --sn-font-body:'Rajdhani',sans-serif;         /* texto corrido, rótulos */
  --sn-font-mono:'Share Tech Mono',monospace;   /* valores, dados, CDs */
}
```

- Fundo escuro com **ciano** como cor de ação e **magenta** como cor de alerta e destaque secundário. **Amarelo** para avisos e Edge, **verde** para sucesso e cura.
- Painéis com borda de 1 px (`--sn-line`), cantos cortados (`clip-path` nos títulos de painel) e um leve brilho (`box-shadow` ciano a 20%) apenas em foco e ativos.
- Título de painel em Orbitron maiúsculo, 11 px, espaçamento largo, com uma barrinha ciano à esquerda (como na ficha de papel).
- Valores numéricos em Share Tech Mono; sinal de `+` sempre visível em bônus.
- **Fontes:** `@font-face` em `styles/fonts.css` apontando para `systems/sombraneon/fonts/*.woff2` (baixe os arquivos das famílias OFL; não use CDN). `font-display: swap`.
- Sem imagens pesadas. Ícones: SVGs simples em `assets/icons/` (cores herdam `currentColor`) ou ícones do core quando existirem. Se preferir uma fonte de ícones, use Font Awesome que já vem no Foundry.
- Respeitar `prefers-reduced-motion`: nenhuma animação além de transições de 120 ms.
- Compatível com os temas claro e escuro do Foundry: a ficha fixa seu próprio fundo escuro dentro da janela; a moldura do Foundry não é alterada.

## 3. Estrutura de arquivos de UI

```
systems/sombraneon/
  templates/
    actor/character/        header.hbs  tab-resumo.hbs  tab-ataques.hbs  tab-cromo.hbs
                            tab-programas.hbs  tab-posses.hbs  tab-rede.hbs  tab-bio.hbs
    actor/npc.hbs  actor/ice.hbs  actor/drone.hbs
    item/                   base.hbs  class.hbs  origin.hbs  background.hbs  alignment.hbs
                            feature.hbs  weapon.hbs  armor.hbs  gear.hbs  implant.hbs  program.hbs
    apps/                   wizard/*.hbs  dialog-*.hbs  alert-tracker.hbs  choice.hbs
    chat/                   check.hbs attack.hbs damage.hbs cast.hbs rest.hbs levelup.hbs
                            info.hbs edge.hbs alert.hbs dying.hbs
    partials/               ability-card.hbs  stat-pill.hbs  panel.hbs  item-row.hbs
                            modifier-editor.hbs  effect-chip.hbs  tooltip-parts.hbs
  styles/  tokens.css  fonts.css  base.css  sheet.css  items.css  chat.css  wizard.css  apps.css
  src/sheets/  character-sheet.mjs  npc-sheet.mjs  ice-sheet.mjs  drone-sheet.mjs  item-sheet.mjs  base-sheet.mjs
```

Um arquivo CSS por área, importados em `system.json > styles`. Prefixo `sn-` em todas as classes. Nenhuma regra global fora de `.sombraneon`.

## 4. Ficha do personagem

Classe `SNCharacterSheet` (`HandlebarsApplicationMixin(ActorSheetV2)`), `static PARTS` por aba, `static TABS`, `static DEFAULT_OPTIONS` com `classes: ['sombraneon','sheet','actor','character']`, `position: { width: 860, height: 780 }`, `window: { resizable: true }`, `form: { submitOnChange: true }`. Confirme as chaves exatas em `docs/API-NOTES.md`.

### 4.1 Cabeçalho (sempre visível)

```
[retrato]  NOME DE RUA            NÍVEL [ 3 ] [Subir de nível]   XP 24 / 30 [▮▮▮▮▯]
           Origem [▼]  Classe [▼]  Antecedente [▼ 🎲]  Alinhamento [▼]  Gatilho [▼ 🎲]
           Drive: ________________________     [Assistente de criação] [🔒 Edição]
 HP  18 / 22  [- +]     CA 14 (?)     INIC +2 (vant.)     EDGE ◉     SLOTS 12/14     [Descansar]
```

- **Seletores** (seção 2 de `03`): os quatro mais o gatilho. Valor vazio mostra "Escolher origem" com realce ciano. Ao lado, ícone de informação.
- **Nível e XP:** o botão **Subir de nível** só aparece com `xp.ready`; com XP insuficiente, mostra a barra de progresso. Em modo Edição o jogador (ou o GM) altera nível e XP diretamente.
- **HP:** valor atual editável sempre (clique e digite, ou `-` e `+` com passo 1, Shift = 5), máximo calculado (tooltip com os dados de vida e CON). Barra de HP colorida (verde, amarelo, magenta, vermelho em 25%).
- **CA:** número grande com tooltip da decomposição; chip pequeno **Cobertura +2** (alterna `ac.cover`).
- **Iniciativa:** `+N` com ícone de vantagem se houver; clique rola iniciativa (no combate, rola para o combatente do token).
- **Edge:** marcador de fichas; botões **Entregar** e **Cumpri meu gatilho** num menu contextual.
- **Slots:** `usados / total`, barra e cor de aviso quando estourar.
- **Descansar** e **Alerta** (abre o rastreador) como atalhos.
- **Faixa de avisos** (`warnings[]`): linha única recolhível abaixo do cabeçalho.
- **Assistente de criação** aparece enquanto `creation.completed` for falso, com destaque pulsante suave.

### 4.2 Abas

| Aba | Conteúdo |
|---|---|
| **Resumo** | Atributos, defesa/combate, habilidades, talentos, ataques resumidos, estados. A aba de combate. |
| **Ataques** | Todas as linhas de ataque, drone, munição, proficiência, atalhos de macros. |
| **Cromo** | Os 4 slots corporais, contador de ciberpsicose, lista de implantes não instalados. |
| **Programas** | Programas, protocolos ou Sets conforme a classe (esconde para Solo e Ghost, mostra mensagem curta e a lista de talentos que dão algo parecido). Limites e tier máximo. |
| **Posses** | Equipamento (slots), armas, armadura, consumíveis, créditos, extrato, veículos. |
| **Rede** | Hack de rua, rastreador de Alerta, imersão, Firewall, ICE conhecidos (links). Só para quem tem deck ou jack; para os demais fica colapsada com o botão "Hack de rua". |
| **Bio** | Aparência, biografia, contatos, idiomas, Drive, objetivos do grupo, notas, reação por facção (tabela do alinhamento). |

#### Resumo

- **Atributos:** seis cartões (FOR, DES, CON, INT, SAB, CAR) com valor e modificador grande. Clique rola o teste (abre a janela de teste se Alt/Ctrl; clique simples rola contra "Sem CD"). Em Edição, o valor base é editável e o cartão mostra o total quando há bônus de implante ("13 +2").
- **Defesa e combate:** CA, iniciativa, HP, slots, CD de execução (Netrunner/Hyperdoc/Rocker), tier máximo, contador de ciberpsicose.
- **Habilidades:** lista de itens `feature` de classe, origem e antecedente, com ícone, nome, ativação (passiva, ação, livre, reação) e usos (`3/3` por descanso, com `-` e `+`). Clique expande a descrição; botão **Usar** nas ativas com handler.
- **Talentos:** lista dos talentos rolados, agrupados por `identifier` (`×2`), contador de pendentes e botão **Rolar talento**.
- **Estados:** chips dos estados ativos (token e cartão), remoção pelo ícone.
- **Ataques resumidos:** as 3 primeiras linhas (as outras estão na aba Ataques).

#### Ataques

Tabela com colunas: imagem, nome, `+N` (ataque), dano, alcance, selos, ações. Abaixo: bloco **Munição** (carregadores, Recarregar), **Mira**, **Investida**. Seção **Drone** (se existir). Seção **Desarmado** sempre.

#### Cromo

Quatro cartões grandes (Neural, Corpo, Braços, Pernas), cada um com: slot, implante instalado (nome, qualidade com seletor `Rua | Corp | Militar`, efeito atual em 1 linha, o que a próxima qualidade acrescenta), ações (trocar, remover, atualizar qualidade), e drop zone "Solte um implante aqui". Painel lateral **Ciberpsicose**: contagem efetiva, ajuste de origem, CD, chance (informativo), botão **Testar**, tabela de Surto. Abaixo: "Implantes no inventário" (desinstalados).

#### Programas

Cabeçalho: "Programas conhecidos: 3 / 5, tier máximo 2, CD de execução base 11 + bônus". Lista agrupada por tier (colapsável). Cada linha: nome, tier, alcance, efeito resumido, estado (Pronto, Crash), botão **Executar**, e se `damage`/`healing`: fórmula. Botão **Aprender programa** (abre `ChoiceDialog`). Para Rocker: cada Set com "Pronto / Gasto". Para classes sem conjuração: painel informativo curto.

#### Posses

- **Slots:** grade de células numeradas, preenchida pelos itens na ordem (com cor por categoria), bordas de pilhas. A grade segue o estilo do cartão de equipamento da ficha de papel (dois blocos de colunas). Cada item aparece como linha embaixo da grade: nome, quantidade (`-` e `+`), slots ocupados, preço, equipar (armas/armadura), excluir.
- **Créditos:** campo, botões `+` e `-` com valor, extrato recolhível.
- **Divisão visual:** Armas, Armadura, Equipamento, Consumíveis, Veículos.
- **Drop zone** global do cartão (mas a janela inteira também aceita).

#### Rede

Duas colunas: à esquerda o **Rastreador de Alerta** (versão compacta do `AlertTracker`) e **Hack de rua** (CD 9/12/15, botão rola); à direita **Imersão**: botão Imergir/Sair, estado do Firewall com contagem regressiva, botão Pausar (GM), botão Feedback de rodada. Abaixo, atalhos: ICE (sorteio da tabela do Gerador de Rede, link para o compêndio).

### 4.3 Interações de arrastar (visuais)

- Zona de soltura global: ao arrastar um item sobre a janela, aparece uma moldura ciano tracejada com o texto "Solte para adicionar à ficha".
- Zonas de soltura específicas (cartão de implante, lista de programas) mostram o rótulo do tipo aceito e rejeitam outros com ícone magenta.
- Reordenar linhas por arrastar (Posses) usa `_onSortItem` e grava `sort`.

### 4.4 Menus de contexto

Clique direito nas linhas: **Mostrar no chat**, **Editar item**, **Duplicar**, **Excluir**, mais ações por tipo (arma: Equipar, Recarregar; implante: Atualizar qualidade, Remover; programa: Restaurar; talento: Remover talento).

### 4.5 Formulário e persistência

- `submitOnChange: true` para campos simples. Campos que passam por lógica (HP atual, quantidade, usos) usam ações com `data-action`, não o formulário.
- Valores derivados nunca estão em `name="system..."`.
- Editor de texto rico para `details.*` com `<prose-mirror>` (verifique o elemento correto em v14 e registre em `API-NOTES.md`).

## 5. Fichas dos outros atores

### 5.1 NPC

Compacta (largura 520). Campos: nome, nível, HP, CA, iniciativa, moral, **ataques** (lista editável de `{ nome, bônus, dano, alcance, notas }`), traços (texto), saque, créditos. Botões: Rolar ataque (cartão de chat), Rolar iniciativa, Teste de moral. Aceita itens soltos (armas geram linhas, ver `03` seção 6.1).

### 5.2 ICE

Cartão de monstro: nível, CA, HP, ataque (bônus, dano, quantidade, tipo neural), **truque** (texto em destaque), função na rede. Botões: Atacar (um cartão por ataque), Aplicar truque (informativo). Alerta: botão "Alerta +1" quando o truque é "Alarme". Os 5 ICE do livro vêm prontos no módulo.

### 5.3 Drone

Descrito em `03` seção 14. Mostra dono (link), nível do dono, HP/CA/ataque/dano derivados, módulos instalados, estado Destruído e botão Reconstruir (dono).

## 6. Fichas de itens

Classe `SNItemSheet` com um template por tipo (`item/*.hbs`), cabeçalho comum (nome, imagem, tipo, `identifier` somente leitura com botão "Gerar do nome", `source`). Abas: **Descrição** (HTML rico), **Detalhes** (campos do tipo), **Modificadores** (quando existem), **Concessões** (classe/origem/antecedente/alinhamento), **Avançado** (flags, `automation`).

Pontos importantes:

- **Editor de modificadores** (`partials/modifier-editor.hbs`): tabela com `key` (select agrupado + campo livre), `mode`, `value`, `when`, `label`, botões de adicionar/remover/duplicar; validação em tempo real (chave desconhecida em amarelo, fórmula inválida em vermelho, `when` inválido em vermelho). Pré-visualização do efeito: "FOR +2".
- **Editor de concessões**: linhas com `kind`, `level`, `ref` com autocomplete (busca nos índices por `identifier`), `qty`, `from.filter` em chips.
- **Implante**: 3 colunas lado a lado (Rua, Corp, Militar), cada uma com `summary`, `delta`, modificadores, usos, arma e escolhas. Seletor de qualidade atual quando embutido em um ator.
- **Programa**: tier, alcance, efeito, dano/cura, teste de resistência, usos.
- **Arma e armadura**: campos do livro com ajuda. Pré-visualização de linha de ataque.
- Todos os campos mostram **dica do livro** (`lang` com o trecho de regra entre aspas curtas). Nunca cole mais do que uma frase.
- Itens de compêndio abrem **somente leitura** para jogadores, com botão "Adicionar à minha ficha".

## 7. Diálogos e aplicativos

Todos em `ApplicationV2` ou `DialogV2`.

| Aplicativo | Uso |
|---|---|
| `CreationWizard` | Assistente de criação (`03` seção 3). Janela 900 x 720, passos numerados no topo. |
| `ChoiceDialog` | Lista com busca, filtros e pré-visualização, `multiple` com limite. Reutilizado em concessões, programas, talentos, mutações, gatilhos. |
| `RollDialog` | Janela de teste com chips (`03` seção 5). |
| `AttackDialog` | Opções de ataque (`03` seção 4.4). |
| `PurchaseDialog` | Compra (adicionar de graça, comprar, cancelar) e escolha de qualidade de implante. |
| `RestDialog` | Janela de descanso. |
| `AlertTracker` | Rastreador flutuante do Alerta. |
| `LevelUpDialog` | Resumo e confirmação de subida de nível. |
| `ModifierEditor` | Editor de modificadores reutilizável (item e Active Effects do Mestre, quando útil). |

Padrões:

- Enter confirma, Esc cancela. Foco inicial no primeiro controle útil.
- Botão primário em ciano, perigo em magenta.
- Todos mostram **por que** uma ação está desabilitada (tooltip ou linha de ajuda).
- Janelas empilhadas respeitam `z-index` do Foundry; não use modal próprio.

## 8. Cartões de chat

Estilo visual (`chat.css`): painel escuro com cabeçalho Orbitron, ícone do ator, linha do tempo. Cores por desfecho: sucesso ciano, falha magenta, crítico amarelo com brilho, falha crítica vermelho. Mostram o dado (2d20 com o descartado riscado), o total, a CD ou a CA, a decomposição do bônus em linha pequena, os botões de ação, e o botão **Gastar Edge**. Sem imagens pesadas. O `flavor` do `ChatMessage` leva o título da ação; o conteúdo vem de `templates/chat/*.hbs`.

## 9. Tokens, HUD e indicadores

- `primaryTokenAttribute: hp`; barra secundária opcional para **Edge** (`edge.value` max `edge.max`) como atributo de recurso, configurável.
- Estados no HUD (seção 15.4 de `03`).
- Ícone de **Cobertura** no HUD é opcional.

## 10. Internacionalização

- `lang/pt-BR.json` (principal), `lang/en.json` na última fase. Chaves em árvore: `SOMBRANEON.Sheet.Tabs.Summary`, `SOMBRANEON.Abilities.for.Label`, `SOMBRANEON.Roll.Advantage`, etc.
- **Regra:** nenhuma string de UI no código ou nos templates (`{{localize}}` sempre). Para textos de regra longos (descrições de item), o texto fica no **dado do item** (conteúdo do compêndio), não no `lang`.
- Plural e gênero: prefira rótulos neutros. Números formatados com `Intl.NumberFormat('pt-BR')`; créditos como `1.500 cr` (ponto de milhar).
- Validação de dashes: `npm run validate` falha se encontrar U+2014 ou U+2013 em `lang/`, `templates/` e `docs/`.

## 11. Estados vazios e mensagens

Todos os painéis vazios têm texto guia (ex.: "Nenhum programa ainda. Escolha sua classe ou arraste um programa aqui."). Mensagens de erro dizem **o que fazer** ("Ative o módulo Compêndio SombraNeon para escolher implantes"). Evite jargão técnico para o jogador.

## 12. Desempenho

- Renderize cada aba como `PART` própria e atualize só o que muda (`render({ parts: [...] })`).
- Índices de compêndio carregados uma vez; use `getIndex` com `fields` mínimos.
- Evite `prepareDerivedData` pesado: memoize a coleta de modificadores por `_id + _stats.modifiedTime`.
- Listas longas (seletor de equipamento com 80+ itens) com filtro e renderização incremental simples.

## 13. Critérios de aceite da UI

1. Abrir a ficha de um personagem novo mostra o cabeçalho com os 5 seletores vazios e o botão do assistente.
2. Escolher classe, origem, antecedente e alinhamento preenche habilidades, dado de vida, proficiências e conjuração sem nenhum clique extra.
3. A aba Ataques lista automaticamente cada arma equipada, com bônus e dano corretos, e atualiza ao mudar atributos, domínio ou implantes.
4. Arrastar uma arma, armadura, equipamento, implante ou programa do compêndio para qualquer lugar da janela funciona com os diálogos descritos em `03` seção 6.
5. Passar o mouse em CA, bônus de ataque, slots e HP máximo mostra de onde vêm os números.
6. A ficha continua utilizável com o módulo de compêndio desativado.
7. Nenhum travessão em nenhum texto.
