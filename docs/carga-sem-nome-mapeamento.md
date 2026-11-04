# Mapeamento: CARGA SEM NOME para o sistema SombraNeon

Fase 0 das instruções (`docs/carga-sem-nome-foundry-instrucoes.md`, seção 2). O sistema SombraNeon (id `sombraneon`, v0.8.0, Foundry v13 build 351) estava no próprio repositório, então o esquema foi lido do código: `systems/sombraneon/system.json` (tipos de documento), `systems/sombraneon/src/data/actor-data.mjs` e `item-data.mjs` (modelos de dados), `logic/character.mjs` (derivação de CA, HP, slots e ataques) e os compêndios já existentes (Noite das Máscaras). Não foi preciso o Plano B de dados.

**Tipos de Ator:** `character`, `npc`, `ice`, `drone`. **Tipos de Item:** `class`, `origin`, `background`, `alignment`, `feature`, `weapon`, `armor`, `gear`, `implant`, `program`.

## Atores: runners (`character`)

| Campo da aventura | Campo do sistema | Observação |
|---|---|---|
| Nome de rua | `name` | |
| Origem | item `origin` embutido (`cromado`, `nat`, `biomod`, `replicante`, `android`) | As habilidades da origem entram pelas concessões (`grants`) do próprio item. |
| Classe | item `class` embutido | Idem; dado de vida e proficiências vêm da classe. |
| Nível, XP | `system.level` (1), `system.xp.value` (0) | |
| Antecedente | item `background` embutido | |
| Alinhamento | item `alignment` embutido | |
| Gatilho de Edge | item `feature` `gatilho-*` com `grantedBy: @alignment` | |
| Edge | `system.edge.value` (1 ficha) | |
| Drive | `system.details.drive` | Texto da ficha. |
| Atributos FOR a CAR | `system.abilities.<k>.base` | O talento de atributo (`atributo-*`, 2d6 = 8) soma +2 por modificador; a base guardada é o valor da ficha menos o bônus. |
| HP | `system.hp` (`rolls: [dado máximo]`) | O máximo é derivado: dado de vida máximo mais mod. de CON. |
| CA | derivada | Armadura equipada, DES e implantes/origem. |
| BL (Blindagem) | só NPC: `system.armor` | Runners não têm. |
| Slots | derivados | FOR (mínimo 10), mais mod. de CON para o Solo. |
| Créditos | `system.currency.credits` | O que sobra na ficha. |
| Talentos | itens `feature` com `flags.sombraneon.talentRoll` e `talentLevel` | `choice` guarda a escolha (atributo, programa). |
| Habilidades de classe e origem | itens `feature` concedidos | |
| Programas, protocolos, Sets | itens `program` | `choque`, `diagnostico`, `hype`, `estatica`, `solo` etc. |
| Mutações (Biomod) | itens `feature` (`tecnico-nato`, `sentidos-agudos`) com `grantedBy: @origin` | |
| Cromo por slot | itens `implant` com `installed: true`, `quality: street` | Tijolo: Subderme blindada (Corpo) e Arma retrátil (Braços). |
| Ataques | derivados das armas equipadas, dos implantes e do desarmado | `+2 d8+1`, `+3 d6` etc. conferem com a ficha. |
| Equipamento | itens `weapon`, `armor` e `gear` embutidos | Clonados do catálogo do repositório (sem marcas [F] e [C]). Carregador x2 e gel de reparo x2 em `quantity`. |
| Veículos treinados | derivado (`derived.vehicles`) | Bate com a ficha nas seis. |
| Papel e laço | `system.details.biography` | O laço (vantagem 1x por sessão) é texto: não é automatizado. |
| Ficha de personagem inteira (texto, "Como brilha", plano de armas) | `system.details.biography` | HTML. |
| Token | `prototypeToken` (vinculado, simpático, visão ligada) | |

**Sem campo no sistema:** o "laço" (vantagem condicional) e o Drive de NPC; ficam como texto.

## Atores: ameaças e NPCs (`npc`)

| Campo da aventura | Campo do sistema | Observação |
|---|---|---|
| NA | `system.level` | |
| CA, HP | `system.ac`, `system.hp.value` e `.max` | Nest (6 de 15) e Daigo (14 de 20) começam feridos, como na ficha. |
| BL | `system.armor` | Jararaca 5, Torre 3, Cérbero 2, Viatura 1, SUV 2. |
| MOV | `system.movement` | Texto ("Dobro Próximo (voa)", "Fixa (gira)"). |
| Moral | `system.morale` (`kind`, `cd`, `enabled`) | Firme = CD 12 (Sargento), Fraca 18, Normal 15 (convenção do sistema); "Sem medo" desliga o teste. |
| Alinhamento | `system.alignment` | |
| ATQ | `system.attacks[]` (nome, bônus, dano, alcance, notas, pesada) | Um item por ataque; a torre .50 é `heavy`. "2 ataques por rodada" e os efeitos vão em `notes`. |
| Traços, regras da casa, modos, gatilhos, Interpretação, Segredo | `system.traits` (HTML) | Texto integral da aventura; "Segredo (só Mestre)" em `section.secret`. |
| Saque | `system.loot` (HTML) | |
| Itens embutidos | `items[]` | Sargento: Cartão de comando. Cérbero: Núcleo do Cérbero. |
| Retrato | `img` | Arte do pacote quando existe (Ruth, Tavares, Jaci, Sargento, Daigo, Nest, Voss, Falcão, Torre, Cérbero, Jararaca em corte), senão o token. |
| Token prototype | `prototypeToken` | Hostil e sem vínculo nas ameaças; vinculado nos NPCs únicos; Nest e Daigo amigáveis; Cérbero 2 x 2; Jararaca 2 x 5 (4 x 10 no mapa 4); Torre 2 x 2; Viaturas e SUV 2 x 3. |

**Sem campo no sistema (ficam em `traits`, o Mestre aplica à mão):** as partes do Jararaca (casco, portas, painel, cabine, cada uma com CA, HP e BL), as três cabeças do Cérbero (CA 16, HP 6, BL 1), o ciclo da torre, a zona morta, a Espera, a coleira, o EMP que atordoa só da primeira vez, a Manobra (Man.) do Jararaca, a perseguição por faixas e a desvantagem das próteses de Nest. Os dois estados de Nest (torso sedado e equipado) estão nas notas do ator.

## Itens

| Campo da aventura | Campo do sistema | Observação |
|---|---|---|
| Tipo `equipamento`, `tesouro`, `premio` | item `gear` | O sistema não tem tipo "butim". |
| Categoria (Sucata, Normal, Valioso), XP | `flags.sombraneon.loot = { category, xp }` e `flags.sombraneon-carga-sem-nome.butim` | Como a Noite das Máscaras. |
| Valor de venda, slots, digital, onde está, como pegar | `flags.sombraneon-carga-sem-nome.butim` (`venda`, `slots`, `digital`, `onde`, `como`) | |
| Prêmio | `flags.sombraneon-carga-sem-nome.premio = true` | |
| Slots do item | `system.slots` | Nest 0 (é uma pessoa, ocupa 1 assento); Kit de Resgate 3. |
| Preço | `system.price` | |
| Veículo (Furgão, motos) | `system.category: vehicle` + `system.vehicle` (CA, HP, BL, Manobra, velocidade, ocupantes, carga) | Motos: `quantity: 2`. |
| Granadas e carga de demolição | `system.category: explosive` | Granada EMP: nota no item das granadas. |
| Descrição | `system.description` (HTML) | O bloco do capítulo 13. |

## Cenas

| Campo do Anexo A | Campo do Foundry | Observação |
|---|---|---|
| `grade` (casas) | `width`, `height` = casas x 100 | 30 x 20 e 36 x 24. |
| Grade | `grid: { type: 1, size: 100, distance: 1.5, units: "m" }` | |
| `paredes` | `walls[].c` em pixels | Medidas sobre a arte (veja o relatório). |
| `portas` | parede com `door: 1`, `ds` 0 fechada, 1 aberta, 2 trancada | `cd`, `nota`, `id` e `tag` em `flags.sombraneon-carga-sem-nome`. |
| `tipo: janela` | parede com `sight: 0`, `light: 0` | Bloqueia movimento, deixa passar visão e luz. |
| `luzes` | `lights[]` | `dim` = raio x 1,5; `bright` = 30% disso; `alpha` = intensidade. |
| `ameacas` e `pcs_inicio` | `tokens[]` | Marcadores com o UUID do ator em `flags.sombraneon-carga-sem-nome.ref`; o script liga a atores do mundo ao importar. |
| `oculto` | `hidden: true` | Cérbero, droids, Daigo e Nest no mapa 4; Cérbero no mapa 2. |
| `pins` | `notes[]` | Ligados à página do diário pelo script (`flags.sombraneon-carga-sem-nome.pin`). |
| `cobertura` | `regions[]` (camada de regiões, só o Mestre) | Sem automação: o texto da região traz o "+2 de CA". |
| Visão | `tokenVision: true`, `fog.exploration: true`, `globalLight: false` | Escuridão-base por mapa (0,35 a 0,7). |
| Navegação | `navigation: true`, `navOrder`, `navName` ("1. Ferro-Velho Tavares") | |
| Vista inicial | `initial: { x, y, scale: 0.8 }` | Centrada na área de partida dos runners. |

## Estados e contadores (sem campo no sistema)

Alerta (usa o rastreador `sombraneon.alert` do sistema), relógio da história, Folga, relógio do Posto, ciclo da torre, rodadas da Beta, cabeças do Cérbero e mostrador Leve/Padrão/Brutal são regras da aventura: ficam em configurações do mundo do módulo (`sombraneon-carga-sem-nome`) e em contadores com caixas de marcar nos diários, sem automação de combate.
