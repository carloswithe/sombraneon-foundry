# 02. Modelo de dados e motor de regras

Todos os tipos usam `TypeDataModel` com `foundry.data.fields`. Os nomes abaixo são os **nomes de campo finais**. Tipos: `N` = NumberField inteiro, `S` = StringField, `B` = BooleanField, `H` = HTMLField, `A[x]` = ArrayField de x, `Set[x]` = SetField. Valores `initial` entre parênteses.

## 1. Convenções

- **`identifier`**: slug ASCII em minúsculas e hífens derivado do nome em pt-BR, sem acentos (`pistola-leve`, `jack-de-interface`, `sintetico`). É único por tipo de item e é a chave de referência entre dados. **Nunca referencie por nome ou por `_id` digitado.**
- Todo item tem `identifier`, `description` (H), `source` (S, ex.: "Livro v0.3, cap. 8.2") e `flags.sombraneon` livres para metadados.
- Valores calculados **não são armazenados**; vivem em `prepareDerivedData`. O que é armazenado é só o que o jogador decide ou rola.
- `flags.sombraneon.schemaVersion` guarda a versão do esquema para migrações.

## 2. Constantes (`CONFIG.SOMBRANEON`)

```js
abilities: ['for','des','con','int','sab','car']        // rótulos FOR, DES, CON, INT, SAB, CAR
difficulty: { easy: 9, normal: 12, hard: 15, extreme: 18 }
modTable: [[1,3,-4],[4,5,-3],[6,7,-2],[8,9,-1],[10,11,0],[12,13,1],[14,15,2],[16,17,3],[18,99,4]]
ranges: { close: '1,5 m', near: '9 m', far: 'linha de visão' }
maxLevel: 10; xpToNext: level => level * 10
tierMax: level => Math.min(5, Math.ceil(level / 2))
implantSlots: ['neural','body','arms','legs']             // Neural, Corpo, Braços, Pernas
implantQualities: { street: 300, corp: 1000, military: 3000 }   // custo em cr
creditsPerGold: 10
startingCredits: '2d6 * 100'
slotsBase: 10                                              // slots = max(10, FOR)
alert: { min: 0, max: 4 }
cyber: { threeSlots: 12, fourSlots: 14 }
reactionTable: ver tabelas (2d6)
weaponFamilies: ['blades','blunt','shock','pistols','smgs','shotguns','rifles','heavy','smart','unarmed']   // DECISÃO: o livro cita "lâminas, pistolas, armas pesadas, etc."; 'heavy' fica reservada (sem armas no catálogo v0.3); confirmar com o autor
unarmedDie: 'd4'                                           // DECISÃO: o livro não define o dano desarmado base
itemCategories (gear): ['general','tool','medical','ammo','battery','ration','stim','deck','firewall','nanokit','surgical','stage-rig','utility-rig','radio','light','cable','vehicle','drone-module']
```

## 3. Campos compartilhados

### 3.1 `ModifierData` (lista em `system.modifiers`)

| Campo | Tipo | Significado |
|---|---|---|
| `key` | S | Alvo do modificador (vocabulário na seção 6). |
| `mode` | S | `add` (padrão), `set`, `flag`, `advantage`, `disadvantage`, `multiply`, `max`, `min`. |
| `value` | S | Número ou **fórmula curta** com dados do ator (`@level`, `@abilities.con.mod`, `@choice`). Vazio para `flag`. Avaliada em `logic/formulas.mjs`. |
| `when` | S | Condição opcional (gramática na seção 6.2). Vazio = sempre. |
| `label` | S | Texto curto para a dica (tooltip) que explica de onde veio o bônus. |

### 3.2 `GrantData` (concessões de classe, origem, antecedente e alinhamento)

| Campo | Tipo | Significado |
|---|---|---|
| `kind` | S | `item` (cria item embutido), `choose` (jogador escolhe N de uma lista), `roll` (rola em tabela N vezes e aplica), `prompt` (pergunta algo e grava em `choice`). |
| `ref` | S | Para `item`: `<tipo>:<identifier>` (ex.: `feature:dominio-de-arma`). Para `roll`: identifier da tabela. |
| `level` | N (1) | Nível em que a concessão entra. |
| `qty` | N (1) | Quantidade (itens empilháveis). |
| `from` | SchemaField | Para `choose`: `{ type, filter }`, onde `filter` é um mapa simples (`{ tier: 1, kind: 'program' }`, `{ qualities: 'street' }`). |
| `count` | N (1) | Para `choose` e `roll`: quantas escolhas ou rolagens. |
| `key` | S | Onde gravar a escolha (`choice.family`, `choice.abilities`). |

### 3.3 `UsesData`

`{ max: N(0), value: N(0), per: S('') }`, onde `per` é `rest`, `day`, `scene` ou vazio. Descanso restaura `rest`; `day` é restaurado por botão do Mestre (ou ao fim do dia de jogo, se a configuração existir).

## 4. Atores

### 4.1 `character`

```
abilities.<for|des|con|int|sab|car>.base   N (10)   // valor rolado (3d6 na ordem). Derivado: .value e .mod
level                                       N (1)    // 1 a 10
xp.value                                    N (0)
hp.value                                    N (0)
hp.rolls                                    A[N]     // resultado cru do dado de vida de cada nível
hp.bonus                                    N (0)    // ajuste manual do Mestre
ac.cover                                    B (false)// +2 de CA (alternância na ficha)
ac.override                                 N | null // CA fixada pelo Mestre
edge.value                                  N (0)    // fichas de Edge em mãos
edge.triggerUsed                            B (false)// já recarregou por gatilho neste descanso
dying.active                                B (false)
dying.remaining                             N (0)    // rodadas restantes
dying.rolled                                N (0)    // total rolado ao cair
dying.stable                                B (false)// estabilizado: o contador para, segue inconsciente
currency.credits                            N (0)
slots.manualBonus                           N (0)    // ajuste manual do Mestre
details.civilName                           S
details.drive                               S
details.languages                           S
details.appearance                          H
details.biography                           H
details.contacts                            H
details.notes                               H
details.groupGoals                          H
network.immersed                            B (false)
network.deckFried                           B (false)  // Feedback 2
network.nanokitBroken                       B (false)  // Rejeição 5
network.traced                              B (false)  // Feedback 4
network.firewall.active                     B (false)
network.firewall.expiresAt                  N | null   // timestamp, ver 03 seção 12
creation.completed                          B (false)
creation.step                               N (0)
```

**Derivados** (somente leitura, em `prepareDerivedData`): `abilities.*.value`, `abilities.*.mod`, `hp.max`, `hp.hitDie`, `hp.pct`, `ac.value`, `ac.base`, `ac.parts[]` (para tooltip), `initiative.bonus`, `slots.max`, `slots.used`, `slots.over`, `xp.next`, `xp.ready`, `attacks[]`, `casting` (ver 4.5), `chrome` (ver 4.6), `edge.max`, `warnings[]` (proficiência, tier acima do máximo, slots estourados).

Seleções únicas (classe, origem, antecedente, alinhamento) **são itens embutidos** dos tipos `class`, `origin`, `background`, `alignment`. Máximo de um de cada. O gatilho de Edge escolhido é um item `feature` com `kind: 'edge-trigger'` embutido.

### 4.2 `npc`

`level N(1)`, `hp {value, max}`, `ac N(10)`, `initiative N(0)`, `morale { enabled B(true), mod N(0), cd N(15) }` (teste de moral: d20 + mod contra a CD; livro 1.4: SAB CD 15), `attacks A[{ name, bonus N, damage S, range S, notes S }]`, `traits H`, `loot H`, `credits N`. Itens embutidos do tipo `weapon` também geram ataques (mesma lógica do personagem, com bônus fixo `weapon.attackBonus` + `level`).

### 4.3 `ice`

`level N(1..5)`, `hp {value, max}`, `ac N`, `attack { name S, bonus N, damage S, count N(1), type S('neural') }`, `trick { name S, text H }`, `networkRole S`. Existem 5 ICEs no livro (seção 9.5); ver 05.

### 4.4 `drone`

`ownerUuid S` (UUID do `character` dono), `kind S` (`primary` ou `auxiliary`), `destroyed B`, `modules` (itens `gear` embutidos de categoria `drone-module`). Derivados a partir do dono: `ac` (12 + módulos + talento), `hp.max = 4 + 2 * nível do dono` (+4 com talento Chassi reforçado), ataque `d20 + mod. de DES do dono (+1 com talento)`, dado de dano d4 (níveis 1 a 4), d6 (5 a 8), d8 (9 e 10). O drone auxiliar (talento Drone auxiliar) não ataca. Reconstruir custa 250 cr e 1 descanso.

### 4.5 `casting` (derivado do personagem)

```
kind            'program' | 'protocol' | 'set' | null        // da classe
ability         'int' | 'sab' | 'car' | null
known.max       2 + (level - 1) + extras                      // Netrunner e Hyperdoc (+ talentos "Biblioteca")
                3 + [níveis 4, 7, 10 alcançados] + extras     // Rocker (Sets)
known.count     itens `program` do tipo certo no ator
tierMax         tierMax(level)                                // Sets não usam tier
execBonus       mod. da habilidade + deck.bonus + jack + modificadores cast.*
cdBase          10 (programas e protocolos) ou 12 (Sets, fixo)
```

Regra de conjuração: `d20 + execBonus` contra `cdBase + tier` (Sets: contra 12).

### 4.6 `chrome` (derivado do personagem)

`slots: { neural, body, arms, legs }` (cada um com o item embutido ou `null`), `count` (implantes instalados), `adjust` (soma de `cyber.adjust`), `effective = count > 0 ? clamp(count + adjust, 0, 4) : 0`, `cd = effective >= 4 ? 14 : effective === 3 ? 12 : null`, `advantage` (se algum modificador `cyber.advantage`).

## 5. Itens

### 5.1 `class`

| Campo | Tipo | Notas |
|---|---|---|
| `hitDie` | S | `d4`, `d6` ou `d8`. |
| `keyAbilities` | Set[S] | `for`/`des`, `int`, `sab`, `car`, `des`. |
| `weapons` | SchemaField | `{ all: B, allowed: Set[S] }`. Cada token de `allowed` é uma **família** (`pistols`), um **identifier** de arma (`pistola-leve`) ou uma regra (`hands:1` = qualquer arma de uma mão). A arma é proficiente se casar com qualquer token. Tabela por classe em `05` seção 4. |
| `armor` | Set[S] | `none`, `light`, `medium`, `heavy`. |
| `casting` | SchemaField | `{ kind: S, ability: S, startKnown: N, perLevel: N, extraAtLevels: A[N], tierMaxByLevel: B }`. Ver 4.5. |
| `talentTable` | S | `identifier` da tabela (`talentos-solo`...). |
| `talentLevels` | A[N] | `[1,3,5,7,9]`. |
| `grants` | A[GrantData] | Concessões por nível (campo `level`). |
| `startingPackage` | A[{ ref S, qty N }] | Pacote inicial do livro (8.6), referências por `identifier`. |
| `modifiers` | A[ModifierData] | Modificadores da classe em si. |

### 5.2 `origin`

`grants` (inclui `choose` e `roll`), `modifiers`, `extraTalents N(0)` (Nat: +1), `cyberAdjust N(0)` (Cromado -1, Biomod +1), `cyberAdvantage B` (Nat), `needsChoices A[...]` (para o assistente saber o que perguntar: Cromado escolhe 2 implantes Rua e slots; Biomod rola 2 mutações).

### 5.3 `background`

`knowledge S` (o conhecimento que dá vantagem, texto curto), `contactPrompt S`, `rollIndex N` (posição no d20). O texto de contato é livre (jogador escreve).

### 5.4 `alignment`

`mapsTo S` (`order`, `neutral`, `chaos`, para compatibilidade com o Shadowdark), `edgeTriggerTable S` (identifier da tabela de 6 gatilhos), `reaction { police, execs, citizens, gangs, blackMarket, cults, punks, syntheticsFree }` (N cada, vindo da tabela 6.2 do livro).

### 5.5 `feature` (habilidade de classe, traço de origem, talento, mutação, gatilho de Edge)

| Campo | Tipo | Notas |
|---|---|---|
| `kind` | S | `class`, `origin`, `talent`, `mutation`, `edge-trigger`, `background`, `other`. |
| `modifiers` | A[ModifierData] | Efeitos automáticos. |
| `uses` | UsesData | Para habilidades limitadas (Duro de matar, Regeneração...). |
| `activation` | S | `passive`, `action`, `free`, `reaction`. |
| `choice` | ObjectField | Escolhas feitas pelo jogador (`{ family: 'pistols' }`, `{ abilities: ['for'] }`, `{ program: 'ping' }`). Lida por `@choice.*` nos modificadores. |
| `choices` | A[{ key S, kind S, options A[S] }] | Descreve **o que perguntar** ao adicionar o item (ex.: Domínio de arma pergunta `family`). |
| `automation` | S | `identifier` do handler em `automation/registry.mjs` (vazio = só texto). |
| `stackable` | B | Talentos repetidos se acumulam (regra do livro). |
| `roll` | SchemaField \| null | `{ formula S, label S, healsSelf B }`: rolagem opcional do handler genérico `use` (ex.: Regeneração `1d6 + @level`). |
| `weapon` | SchemaField \| null | Arma natural (mutação Arma natural): `{ name S, damage S, kind S, range S, family S('unarmed'), notes S }`. Gera linha de ataque automática. |
| `requires` | { level N, class S, origin S } | Restrições opcionais. |

### 5.6 `weapon`

| Campo | Tipo | Notas |
|---|---|---|
| `kind` | S | `melee` ou `ranged`. |
| `family` | S | Uma de `weaponFamilies` (para Domínio de arma). |
| `damage` | S | Fórmula: `d6`, `d10`... |
| `range` | S | `close`, `near`, `far`. |
| `hands` | N (1) | 1 ou 2. |
| `slots` | N (1) | Slots de equipamento. |
| `price` | N | Em cr. |
| `properties` | Set[S] | `light`, `thrown`, `twoHanded`, `burst`, `aim`, `stun`. |
| `attackBonus` | N (0) | Ex.: arma inteligente +1. |
| `ignoreArmor` | N (0) | Ex.: katana monofio e armas Militares ignoram 1 de CA do alvo. |
| `stunOn` | S | `''`, `hit` ou `nat20` (bastão de choque atordoa em 20 natural). |
| `usesMagazines` | B | Armas de fogo e inteligentes. |
| `magEmpty` | B (false) | O carregador acabou (1 natural em ataque à distância). Limpa em Recarregar. |
| `abilityOverride` | S ('') | `''` automático, ou `for` / `des` para forçar o atributo do ataque corpo a corpo de arma leve. |
| `equipped` | B | Embutido no ator. |

### 5.7 `armor`

`ac N` (11, 13 ou 15), `addDex B` (true para leve e média; false para pesada), `type S` (`light`, `medium`, `heavy`), `slots N`, `price N`, `penalties Set[S]` (`stealth`, `swim`), `equipped B`. Só **uma** armadura equipada por vez.

### 5.8 `gear`

`category S` (ver constantes), `quantity N (1)`, `slots N (1)`, `perSlot N (1)` (quantos cabem em 1 slot: carregador, bateria, stim e firewall valem 2; ração 1 pacote), `freeFirst B` (rig utilitário: o primeiro não ocupa slot), `price N`, `bonus N (0)` (deck: 0, +1, +2 na execução), `uses UsesData`, `vehicle { passengers S, ac N, hp N, notes S }` (apenas categoria `vehicle`), `module { ac N, effect S }` (categoria `drone-module`).

### 5.9 `implant`

| Campo | Tipo | Notas |
|---|---|---|
| `slot` | S | `neural`, `body`, `arms`, `legs`. |
| `quality` | S | `street`, `corp`, `military`. Muda no item (seletor) e recalcula tudo. |
| `installed` | B | Instalado no slot. Removido fica no inventário com 0 slots. |
| `choice` | ObjectField | Escolhas do jogador para esta instância (`{ a: 'int' }`), descritas em `tiers.<q>.choices`. Lidas por `@choice.*`, `{choice.*}` e `when: choice:a=int`. |
| `tiers` | SchemaField | `{ street, corp, military }`, cada um `{ summary H, delta H, modifiers A[ModifierData], uses UsesData, weapon, choices }`. |

`tiers.<q>.modifiers` lista o **conjunto total** de modificadores naquela qualidade (não deltas), porque o livro descreve Corp como "+2 no total" em vários casos. `delta` guarda o texto do que a qualidade acrescenta, para exibição. `weapon` (opcional) é `{ damage S, range S, ignoreArmor N, notes S }` e faz o implante aparecer automaticamente em Ataques. O preço vem de `implantQualities`.

Exemplo conceitual (Subderme blindada):

```yaml
slot: body
tiers:
  street:   { modifiers: [ { key: ac.bonus, value: "1" } ] }
  corp:     { modifiers: [ { key: ac.bonus, value: "2" } ] }
  military: { modifiers: [ { key: ac.bonus, value: "2" }, { key: crit.immune, mode: flag } ] }
```

### 5.10 `program` (programas, protocolos e Sets)

| Campo | Tipo | Notas |
|---|---|---|
| `kind` | S | `program` (Netrunner), `protocol` (Hyperdoc), `set` (Rocker). |
| `tier` | N | 1 a 5 (Sets: 0). |
| `range` | S | Texto curto (Próximo, Longe, alvo conectado). |
| `effect` | H | Texto do livro. |
| `damage` | S | Fórmula de dano, se houver (`1d6`, `2d6`, `4d6`, `1d6+@level` para Solo do Rocker). |
| `healing` | S | Fórmula de cura, se houver (`1d6+@level`, `1d4+@level`, `2d6+@level`). |
| `save` | { ability S, cd N, half B } | Para Set Solo (CON CD 12, metade). |
| `alertDelta` | N (0) | Para Apagar rastro (-1). |
| `uses` | UsesData | Para os que têm "1 uso por descanso" (Eco digital, Reconstrução total). O sucesso consome 1 uso. |
| `crashed` | B | Crash (programas e protocolos) ou gasto (Sets). Reinicia no descanso. |
| `automation` | S | Handler opcional. |

CD de execução: programa e protocolo `10 + tier`; Set `12`.

## 6. Motor de modificadores

### 6.1 Vocabulário de chaves

| Chave | Efeito | Observação |
|---|---|---|
| `abilities.<for\|des\|con\|int\|sab\|car>.value` | soma ao **valor** do atributo | Implantes e talentos "+2" (não ao modificador). |
| `ac.bonus` | soma à CA | Use `when: noArmor` para Sintético e Pele blindada. |
| `ac.melee` | soma à CA só contra ataques corpo a corpo | Mostrado como indicador separado (Escudo cinético). |
| `slots.bonus` | soma aos slots | Chassi (`@abilities.con.mod` se positivo), Contrapeso, Braços extras. |
| `hp.max` | soma ao HP máximo | Uso raro. |
| `initiative.bonus` | soma à iniciativa | |
| `initiative.advantage` | vantagem em iniciativa | Reflexos neurais, Reflexos acelerados, Batedor. |
| `initiative.first` | age antes de todos na 1ª rodada | Reflexos neurais Militar (handler). |
| `attack.all`, `attack.melee`, `attack.ranged`, `attack.unarmed` | soma ao ataque | `when: family:<id>` para domínio de arma. |
| `damage.all`, `damage.melee`, `damage.ranged`, `damage.unarmed` | soma ao dano | Idem. |
| `unarmed.die` | `set`: dado de dano desarmado | Garras Militar (`d8`). |
| `crit.immune` | acertos críticos contra você dão dano normal | Flag. |
| `check.<tag>` | soma, vantagem ou desvantagem em testes com a etiqueta | Etiquetas na seção 6.3. |
| `cast.bonus` | soma à execução de qualquer programa | Jack de interface Netrunner. |
| `cast.program.<identifier>` | soma à execução de um programa específico | Programa afinado, Protocolo afinado, Afinação (Sets). |
| `cast.known` | soma ao limite de itens conhecidos | Biblioteca, Biblioteca clínica, Setlist maior. |
| `cast.heal` | soma de dados à cura de protocolos | Nanobots em enxame (`1d4`). |
| `cyber.adjust` | soma à contagem de implantes na ciberpsicose | Cromado -1, Biomod +1. |
| `cyber.advantage` | vantagem no teste de ciberpsicose | Nat. |
| `edge.max` | soma ao máximo de fichas de Edge | Edge extra do Ghost. |
| `talents.extra` | rolagens extras de talento no nível 1 | Nat: Ambicioso. |
| `rest.noRation` | descansa sem gastar ração | Sintético. |
| `resist.<fire\|cold\|electric\|radiation\|poison>` | `multiply 0.5`: metade do dano | Mutações. |
| `dying.die` | `set`: dado da rolagem de morte (`d6`) | Coração cibernético Militar. |
| `reaction.<police\|execs>` | soma à reação da facção | Sintético: -2. |
| `damage.charge` | dado extra de dano corpo a corpo na **Investida** | Motor de sprint (`1d4` Corp, `1d6` Militar). Só entra se o jogador marca Investida no ataque. |
| `damage.reduce` | reduz todo dano sofrido em N | Corpo de ferro (aplicado pelo protocolo, temporário). |
| `drone.ac`, `drone.hp`, `drone.attack`, `drone.damage` | somam às estatísticas do drone | Chassi reforçado, Armamento do drone, Placa de impacto. Lidos pelo ator `drone` a partir do dono. |
| `flag.<nome>` | flag livre consultada por handlers | Ex.: `flag.ignoreCover`, `flag.notSurprised`, `flag.weaponDomain`. |

**Tokens na chave.** A `key` pode conter `{choice.<nome>}`, resolvido a partir de `system.choice` do item de origem na coleta (ex.: `abilities.{choice.abilities}.value`, `cast.program.{choice.program}`). Se a escolha ainda não foi feita, o modificador é ignorado e `warnings[]` ganha "Escolha pendente em <item>".

Chave desconhecida **não quebra nada**: aparece na dica do modificador e é ignorada pelo cálculo (log de aviso no console em modo debug).

### 6.2 Condições (`when`)

Gramática mínima, termos separados por `&` (E lógico): `noArmor`, `armor:light|medium|heavy|any`, `weapon:light|melee|ranged|twoHanded`, `family:<id>` ou `family:@choice.family`, `class:<id>`, `origin:<id>`, `unarmed`, `incoming:melee`, `domain` (a arma pertence a **qualquer** domínio do ator, isto é, família escolhida em um item com `flag.weaponDomain`). `choice:<nome>=<valor>` (a escolha do item de origem tem esse valor; ex.: `choice:a=for`). Valores aceitam alternativas com `|` (`armor:medium|heavy`). Implemente o avaliador em `logic/modifiers.mjs`, testado.

### 6.3 Etiquetas de teste (`check.<tag>`)

`stealth`, `climb`, `disguise`, `sensors`, `delicate`, `hack-street`, `resist-hack`, `resist-emp`, `cyberpsychosis`, `tech`, `recall`, `social`, `lift`, `piloting`, `track`, `avoid-danger`, `perceive`, `interact-machines`, `resist-injury`, `resist-poison`, `resist-disease`, `resist-chrome`, `disarm`, `stay-connected`, `perform`, `fame`, `ambush`, `strength-arms`, `avoid-knockdown`, `interact-machines` (animais, drones e robôs). O diálogo de rolagem de teste tem **chips de contexto** (o jogador marca "furtividade", "hack de rua"...) e o sistema aplica vantagem, desvantagem e bônus das etiquetas marcadas, mostrando de onde veio cada um.

### 6.4 Ordem de cálculo (`SNActor#prepareDerivedData`)

1. `prepareBaseData`: separar itens embutidos por tipo; localizar classe, origem, antecedente e alinhamento (o primeiro de cada tipo; se houver mais de um, gerar aviso).
2. Coletar modificadores de: itens `feature`, `class`, `origin`, `alignment`, implantes **instalados** (usando `tiers[quality].modifiers`), `gear` equipado que tenha efeito (deck) e Active Effects (o core já aplicou antes). Cada fonte vira `{ source, modifier }`.
3. Avaliar `value` das fórmulas com `rollData` (`level`, `abilities.*`, `choice`).
4. Atributos: `value = base + Σ add`, `mod = modFromTable(value)`.
5. Nível e XP: `xp.next = level * 10`, `xp.ready = xp.value >= xp.next`.
6. HP máximo: `Σ max(1, roll_i + conMod) + hp.bonus + Σ hp.max` (retroativo ao CON atual, ver decisões). Dado de vida vem da classe.
7. Slots: `max(10, FOR) + Σ slots.bonus + slots.manualBonus`. Usados: soma por pilha de `ceil(quantity / perSlot) * slots`, ignorando `freeFirst` na primeira unidade, ignorando implantes e armas embutidas.
8. CA: se `ac.override`, usar. Senão: com armadura equipada `armor.ac + (addDex ? DES : 0)`; sem armadura `10 + DES`. Somar `ac.bonus` (respeitando `when`) e `+2` se `ac.cover`. Se `network.immersed`, o corpo está indefeso: `ac.value = 5` (livro 9.7), registrado em `parts[]`. Guardar `parts[]` para o tooltip.
9. Iniciativa: `DES + initiative.bonus`, vantagem se houver `initiative.advantage`.
10. Ataques (`attacks[]`): ver `03-AUTOMACOES.md` seção 4.
11. Conjuração (`casting`) e cromo (`chrome`).
12. Edge: `edge.max = 1 + Σ edge.max`.
13. Avisos (`warnings[]`): armadura ou arma fora da proficiência, programa acima do tier máximo, mais itens conhecidos que o limite, slots estourados, mais de uma armadura equipada, mãos ocupadas além de 2.

### 6.5 Funções puras obrigatórias (assinaturas sugeridas) e vetores de teste

```js
abilityMod(value)                          // 3->-4, 5->-3, 7->-2, 9->-1, 11->0, 13->1, 15->2, 17->3, 18->4, 30->4
tierMax(level)                             // 1,2->1  3,4->2  5,6->3  7,8->4  9,10->5
xpToNext(level)                            // N*10
slotsMax({ forValue, bonuses })            // FOR 8 -> 10; FOR 14 -> 14; Solo FOR 14 CON 16 (+3) -> 17
armorClass({ dexMod, armor, bonuses, cover })   // sem armadura DES +2 -> 12; jaqueta 11+DES(+2) -> 13; pesada 15 (ignora DES) -> 15; +2 cobertura
maxHp({ rolls, conMod, bonus })            // rolls [5,3], CON -1 -> (4)+(2)=6; mínimo 1 por nível
castingKnownMax({ kind, level, extras })   // Netrunner nível 1 -> 2, nível 4 -> 5; Rocker nível 1 -> 3, nível 4 -> 4, nível 7 -> 5, nível 10 -> 6
cyberpsychosis({ count, adjust })          // (2,0) -> sem teste; (3,0) -> CD 12; (4,0) -> CD 14; (3,-1) -> sem teste; (3,+1) -> CD 14; (0,+1) -> sem teste
sneakAttackDice(level)                     // 1 + floor((level - 1) / 2): nível 1 -> 1, 3 -> 2, 5 -> 3, 9 -> 5
weaponMasteryBonus(level)                  // 1 + floor(level / 2): nível 1 -> 1, 2 -> 2, 4 -> 3, 10 -> 6
droneStats({ ownerLevel, desMod, mods })   // HP 4 + 2*nível; dado d4 (1-4), d6 (5-8), d8 (9-10)
dyingRounds({ roll, conMod })              // max(1, roll + conMod)
```

Escreva os testes **antes** do código de cada função (TDD), incluindo todos os vetores acima.

## 7. Registro de handlers (automações específicas)

`automation/registry.mjs` exporta um mapa `identifier -> { ... }`. Cada handler pode implementar os ganchos que fizerem sentido: `onUse(actor, item, options)`, `onRest(actor, item)`, `onZeroHp(actor, item)`, `onRoll(actor, rollContext)`, `onGrant(actor, item)`. Lista mínima de handlers: ver tabela em `05-COMPENDIO.md` seção 8.

## 8. Migrações

`src/migrations/` com funções `migrate(fromVersion, toVersion)` aplicadas no `ready` apenas pelo GM ativo, com aviso e backup sugerido. Registre a versão em `game.settings` (`schemaVersion`) e em `flags.sombraneon.schemaVersion` de cada documento. Em `TypeDataModel#migrateData`, trate renomeações de campo para que mundos antigos continuem abrindo.
