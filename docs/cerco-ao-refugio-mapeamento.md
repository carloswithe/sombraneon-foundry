# Mapeamento: CERCO AO REFÚGIO para o sistema SombraNeon

Fase 0 das instruções (`docs/cerco-ao-refugio-foundry-instrucoes.md`, seção 2). O sistema SombraNeon (id `sombraneon`, v0.11.0, Foundry v13 build 351) está no próprio repositório, então o esquema foi lido do código: `systems/sombraneon/system.json`, `src/data/actor-data.mjs`, `src/logic/character.mjs`, a ficha `templates/actor/npc.hbs` e o módulo da Carga Sem Nome, usado como padrão de montagem. Não foi preciso o Plano B de dados.

**Tipos de Ator:** `character`, `npc`, `ice`, `drone`. **Tipos de Item:** `class`, `origin`, `background`, `alignment`, `feature`, `weapon`, `armor`, `gear`, `implant`, `program`.

## Runners (`character`)

| Campo da aventura | Campo do sistema | Observação |
|---|---|---|
| Nome de rua | `name` | |
| Origem, classe, antecedente, alinhamento | itens `origin`, `class`, `background`, `alignment` embutidos | Do catálogo do repositório, com as concessões de cada um. |
| Gatilho de Edge | item `feature` `gatilho-*` | |
| Nível, XP, Edge | `system.level` (1), `system.xp.value`, `system.edge.value` | |
| Drive, idiomas | `system.details.drive`, `.languages` | |
| Atributos | `system.abilities.<k>.base` | O valor da ficha menos o bônus do talento de atributo. |
| HP, CA, slots, ataques, veículos | derivados pelo sistema | Conferidos nos testes. |
| Créditos | `system.currency.credits` | |
| Talentos, programas, mutações | itens `feature` e `program` | `choice` guarda a escolha. |
| Cromo | itens `implant` instalados, qualidade `street` | Cabo: Jack de interface e Subderme blindada. |
| Equipamento | itens `weapon`, `armor`, `gear` | Carregadores, baterias e géis em `quantity`. |
| Como brilha e plano de equipamento | diário `00 Leia primeiro` | A aba Bio sai vazia (spoilers). |
| Versão de nível 2 | sem atores próprios | Os valores ficam no texto, como mandam as instruções. |

## Ameaças e NPCs (`npc`)

| Campo da aventura | Campo do sistema | Observação |
|---|---|---|
| NA | `system.level` | Civis NA 0. A Van de captura não tem NA: 0. |
| CA, HP | `system.ac`, `system.hp` | |
| BL | `system.armor` | Android de segurança 1 (Casco), Van 1. |
| MOV | `system.movement` | Texto. |
| Moral | `system.morale` | Fraca 18, Normal 15, Firme 12; "Sem medo" desliga o teste. |
| Alinhamento | `system.alignment` | |
| ATQ | `system.attacks[]` | A linha ATQ original também fica no texto. |
| Traços, "Nesta aventura", interpretação, segredo | `system.traits` (HTML) | Segredo em `section.secret`. |
| Arsenais do clímax | dois itens `feature` embutidos e o mesmo texto em `traits` | A ficha de NPC não mostra itens: o texto é o que o Mestre lê. |
| Vitrola, Pardal, "carga seis" | `flags.sombraneon-cerco-ao-refugio` | Em `iris`, `tomas`, `seu-altino` e na porta `porta-altino`. |

## Itens (`gear`)

| Campo da aventura | Campo do sistema |
|---|---|
| Categoria, XP | `flags.sombraneon.loot` e `flags.sombraneon-cerco-ao-refugio.butim` |
| Venda, slots, digital, onde está, como pegar | `flags.sombraneon-cerco-ao-refugio.butim` |
| Prêmio | `flags.sombraneon-cerco-ao-refugio.premio` e `system.uses` com 3 cargas |
| Descrição | `system.description` |

O conteúdo do Kit da Rede Aurora é um só item, com a tabela de quantidades e defeitos na descrição (o inventário pede 2 equipamentos).

## Cenas

| Campo do layout | Campo do Foundry |
|---|---|
| `grade` | `width`, `height` = casas x 100; grade quadrada de 100 px, 1,5 m |
| `paredes` | paredes comuns |
| `portas` | `door` 1, ou 2 se `secreta`; `ds` pelo estado; `cd` e `nota` em flags |
| `luzes` | `AmbientLight`, raio x 1,5 m |
| `ameacas` | um token por entrada, com o ator do compêndio |
| `pcs_inicio` | os seis runners |
| `pins` | notas ligadas à página `abertura` do diário da sala |
| `cobertura` | regiões e uma lista no diário da sala |

## Sem campo no sistema (o Mestre aplica à mão)

Defeitos do kit, redes e sedativo do Modo Captura, troca de modo do esquadrão, relógios da Coruja e da van, choque anti-sintético e scanner de série, ajudas dos doze, lances das rotas, embarque por minuto, armadilhas e cobertura. Todos estão no texto das fichas ou dos diários; Alerta, relógio, cronômetros, Coruja, luzes e armadilhas têm macro.
