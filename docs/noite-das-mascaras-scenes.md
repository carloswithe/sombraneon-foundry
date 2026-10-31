# Noite das Máscaras: scenes de mapa para mesa virtual

Acompanha a aventura **Noite das Máscaras** (SombraNeon, one-shot de 4 horas). Este arquivo lista os **scenes de mapa**, ou seja, as plantas vistas de cima onde os tokens se movem no Foundry VTT, com o contexto de cada um e um prompt para gerar a imagem **sem grid**. As 24 ilustrações do pacote de imagens continuam valendo para clima e narração. Este arquivo cuida só do que precisa de posicionamento de tokens.

## Como ler este arquivo

- **Scene** é um mapa top-down com paredes, cobertura e pontos de interesse legíveis. Os tokens (runners, Rex, Aragão, Seguranças, figurantes) entram depois, no Foundry. Por isso todo mapa é gerado **vazio de personagens**.
- **Sem grid:** nenhuma imagem leva grade desenhada. Você configura a grade no Foundry e ajusta a escala até o piso bater com a tabela de tamanhos.
- **Escala sugerida:** o SombraNeon mede distância por faixas (Perto, Próximo, Longe) e não fixa um tamanho de quadrado. Para a mesa virtual, uso **1 quadrado = 1,5 m**, **Perto = quadrado adjacente**, **Próximo = até 6 quadrados** e **Longe = além disso, à vista**. Se você já usa outra convenção, só troque os números da coluna de tamanho.
- **Estilo:** o mesmo do pacote de imagens: vetor 2D chapado, contornos pretos grossos, cinza liso e **uma única cor neon** num ponto de foco. As cores seguem a legenda do pacote: vermelho para tempo e perigo, ciano para tecnologia e máscaras, verde para a Obelisco, dourado para o Assistente, magenta para Teo Pixel e âmbar para faíscas.
- **Prioridade:** *Essencial* é o que a estrutura de cinco salas pede. *Recomendado* é a rota alternativa ou o desfecho que a aventura trata como cena de verdade. *Extra* é opcional e tem uma ilustração do pacote que já quebra o galho.

## Resumo: os scenes de que você precisa

| Nº | Scene | Sala e momento | Hora na história | Tamanho (quadrados) | Prioridade |
|---|---|---|---|---|---|
| 1 | Banca de Dona Ruth | Briefing e Encontro com Dona Ruth no fim | Antes de 22:00 e depois da fuga | 21 x 14 | Extra |
| 2 | Saguão Vermelho | Sala 1 | 22:00 | 30 x 20 | **Essencial** |
| 3 | Doca de Serviço | Sala 1, rota alternativa | 22:00 | 24 x 16 | Recomendado |
| 4 | Baile no Anel | Sala 2 | 22:40 | 36 x 24 | **Essencial** |
| 5 | Elevador de Serviço e a Cache | Subida entre as Salas 2 e 3 | Pouco antes de 23:10 | 6 x 4 | Extra |
| 6 | Galeria dos Troféus | Sala 3 | 23:10 | 32 x 18 | **Essencial** |
| 7 | Corredor dos Rostos | Sala 4 (combate com Rex) | 23:35 | 28 x 16 | **Essencial** |
| 8 | Cofre da Diretoria | Sala 5 e Fuga, lance 1 | 23:50 | 24 x 16 | **Essencial** |
| 9 | Anel Desmascarado | Fuga, lance 2 (variante do scene 4) | Depois de 00:00 | 36 x 24 | Extra |
| 10 | Rua em frente ao Estúdio | Fuga, lance 3 | Depois de 00:00 | 30 x 20 | Recomendado |

**Pacotes sugeridos**

| Pacote | Scenes | Quando usar |
|---|---|---|
| **Mínimo (5 mapas)** | 2, 4, 6, 7, 8 | Uma sala, um mapa. Cobre a estrutura Five Room inteira. |
| **Completo (7 mapas)** | Mínimo + 3 e 10 | Cobre a rota da doca (Ghost e Rigger) e a perseguição final nas ruas. |
| **Tudo (10 mapas)** | Completo + 1, 5 e 9 | Para a mesa que quer ficar no VTT do briefing ao Debrief. |

Se o tempo apertar (seção 11 da aventura), as Salas 1 e 3 viram uma rolagem cada, e os scenes 2, 3, 5 e 6 podem ficar de fora.

## O que não precisa de scene

| Momento | Por quê | O que usar |
|---|---|---|
| Fachada do Estúdio na abertura | Só clima, sem tokens | Imagem 1 do pacote |
| Debrief | Conversa e contagem de XP | A banca (scene 1) ou uma tela com as fichas |
| Fuga, lance 1 (sair do 62º) | As três saídas (escada de incêndio, duto, janela com cabo) estão no scene 8 | Scene 8 |
| Fuga, lance 2 (atravessar o Anel) | É o mesmo salão, com terreno difícil | Scene 4 com tokens de multidão, ou o scene 9 |
| Escada entre andares | Passagem abstrata, sem posição tática | Narração |
| Apagão da Sala 3 e Mural desligado da Sala 4 | São estados de luz, não mapas novos | Iluminação do Foundry (veja cada scene) |
| Rex em Modo Contenção e em Modo Letal | O mapa é o mesmo | Troque o token |

## Pontos de atenção da aventura que afetam os mapas

1. **Dois chapeleiros.** O texto cita o chapeleiro no Portão (suborno de 100 cr por arma, guarda-volumes) e outro na doca de serviço (a pista "antes do esperado" sai dele). Desenhei um balcão de chapelaria em cada um.
2. **O elevador de serviço fica no Anel.** A Cache de Ruth está atrás do painel de manutenção (código 3110) e o elevador só abre com o crachá nível 4. O mapa do Anel precisa mostrar essa porta discreta, longe dos elevadores principais.
3. **Porta do cofre e andares.** A Sala 4 põe a porta de cofre no fim do corredor do 61º, e a Sala 5 situa o cofre no 62º. Trate como a mesma porta: os jogadores não percebem a diferença, e o scene 8 começa onde a porta se abre.
4. **A fuga reaproveita mapas.** O lance 1 usa o scene 8, o lance 2 usa o scene 4 ou 9 e só o lance 3 pede um mapa novo (scene 10).
5. **Alerta 4 fecha elevadores.** Nos scenes 2 e 4, vale marcar as portas dos elevadores como travadas no Foundry quando o Alerta chegar a 4.

## O prompt base para mapas

A direção de arte é fixa. Em cada scene só mudam o **Subject**, a **cor de destaque**, o **foco** da cor e a **proporção**. Os prompts de cada scene abaixo já vêm preenchidos e prontos para colar.

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration of a tabletop RPG battle map, drawn in a strict top-down orthographic view looking straight down at the floor plan (90 degree overhead camera, no perspective, no isometric angle), inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, thick solid black bands for walls, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: [CENA]. The map is completely empty of characters and creatures, with NO grid, NO gridlines, NO tile pattern that reads as a grid, NO measuring marks, NO text, NO lettering, NO numbers, NO logos. Furniture, pillars and obstacles are clear flat top-down shapes so cover and open floor are easy to read, and doorways are clear gaps in the walls. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color ([COR]) used sparingly on [FOCO]. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. --ar [PROPORÇÃO] --no grid, gridlines, checkerboard, text, letters, numbers, people, characters, perspective, isometric, 3d render --v 6.0 --style raw
```

## Dicas de geração

- **Parâmetros:** `--ar`, `--no`, `--v 6.0` e `--style raw` são do Midjourney. Em outros geradores, apague os parâmetros do final, escolha a proporção na interface e mantenha o resto do texto.
- **Se vier em perspectiva ou isométrico:** acrescente `directly from above, flat floor plan, orthographic projection` logo antes de `Subject`.
- **Se aparecer grade ou piso quadriculado:** acrescente `plain smooth floor with no tile seams` ao Subject. Pisos com juntas regulares viram grade falsa e atrapalham o encaixe da grade real.
- **Se aparecerem pessoas ou letras:** gere de novo ou limpe no editor. Nomes, códigos e relógios entram pelo Foundry (Notes e Tiles), não pela imagem.
- **Paredes:** o prompt pede faixas pretas grossas justamente para você traçar as paredes do Foundry por cima sem adivinhar onde elas estão.
- **Escala:** gere, faça upscale e ajuste a escala da cena no Foundry até as colunas e portas ocuparem de 1 a 2 quadrados. A tabela de tamanhos é um alvo, não uma medida exata.
- **Consistência entre scenes 4 e 9:** gere o Anel primeiro e use a URL dele como image prompt no início do prompt do scene 9 (`--iw 2`), para a planta bater.
- **Voltar ao nanquim:** troque os blocos Art Direction, Color Scheme e Atmosphere pelos do pacote de imagens (seção "Voltar ao estilo nanquim") e mantenha Subject, restrições de grid e proporção.

---

## Abertura e briefing

### Scene 1: Banca de Dona Ruth

| | |
|---|---|
| **Sala e momento** | Briefing (25 min) e Encontro com Dona Ruth, no fim da aventura |
| **Hora na história** | Antes de 22:00 e depois da fuga |
| **Tamanho sugerido** | 21 x 14 quadrados (2100 x 1400 px a 100 px por quadrado) |
| **Proporção** | `3:2` |
| **Cor de destaque** | Ciano elétrico (as quatro máscaras no balcão) |
| **Prioridade** | Extra. A imagem 2 do pacote já cobre a cena. |

**Contexto**

É onde a aventura começa e termina. Dona Ruth entrega as quatro máscaras-convite, explica o plano das armas (Cache no elevador de serviço, código 3110) e avisa do Rex. No fim, é ela quem reage à transmissão: furiosa com o cliente, escondendo o grupo por uma noite ou empolgada com o Dossiê. Faz sentido como scene se você quiser os runners em pé diante da banca, escolhendo personas e comprando granadas na mesa virtual.

**O que o mapa precisa mostrar**

- Balcão comprido da banca com espaço para quatro máscaras sobre o tampo.
- Banqueta e prateleiras de cabos atrás do balcão, com cortina de acesso ao fundo.
- Corredor estreito do mercado, com barracas vizinhas de neon barato dos dois lados.
- Maços de fios pendurados, vistos de cima como linhas curvas chapadas.
- Espaço aberto na frente para os quatro runners ficarem lado a lado.

**Tokens em cena:** Dona Ruth, os quatro runners e, se ela chamar reforço (*Rede de contatos*), de 1 a 4 Capangas.

**Prompt**

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration of a tabletop RPG battle map, drawn in a strict top-down orthographic view looking straight down at the floor plan (90 degree overhead camera, no perspective, no isometric angle), inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, thick solid black bands for walls, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cramped black market stall in a vertical market, a long counter across the middle with four ornate party masks laid out on it and a few scattered credit sticks, a stool behind the counter, shelves full of coiled cables along the back wall, a curtained doorway at the back, a narrow aisle in front of the counter with cheap neon stalls on both sides drawn as small flat boxes, bundles of hanging wires seen from above as flat curved lines, plain smooth floor with no tile seams. The map is completely empty of characters and creatures, with NO grid, NO gridlines, NO tile pattern that reads as a grid, NO measuring marks, NO text, NO lettering, NO numbers, NO logos. Furniture, pillars and obstacles are clear flat top-down shapes so cover and open floor are easy to read, and doorways are clear gaps in the walls. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the four masks on the counter. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. --ar 3:2 --no grid, gridlines, checkerboard, text, letters, numbers, people, characters, perspective, isometric, 3d render --v 6.0 --style raw
```

---

## Sala 1: O Saguão Vermelho

### Scene 2: Saguão Vermelho

| | |
|---|---|
| **Sala e momento** | Sala 1, 30 min |
| **Hora na história** | 22:00 |
| **Tamanho sugerido** | 30 x 20 quadrados (3000 x 2000 px) |
| **Proporção** | `3:2` |
| **Cor de destaque** | Vermelho néon (o tapete de LED) |
| **Prioridade** | **Essencial** |

**Contexto**

O Portão de Máscaras confere duas coisas, nesta ordem: a persona (o Mordomo faz uma pergunta pessoal) e o scanner (metal, pólvora, explosivos e números de série). O grupo escolhe o caminho: pela frente (CAR CD 12 em grupo), lista de convidados (hack CD 12, Backdoor ou Loop de câmera), suborno ao chapeleiro (300 cr e CAR CD 9), doca de serviço (scene 3) ou força. A força é desencorajada: 2 Seguranças e 1 Drone, e o Alerta vai a 4. O mapa serve para mostrar a fila, a distância entre o arco do scanner e os Seguranças e dar colunas de cobertura se a mesa partir para a briga. É também onde o Mordomo solta a primeira pista: "seus convites chegaram antes do esperado".

**O que o mapa precisa mostrar**

- Portas de vidro de entrada pela rua, na borda inferior.
- Tapete vermelho de LED saindo das portas direto até o arco do scanner (Portão de Máscaras).
- Cordões de veludo e postes dos dois lados do tapete, delimitando a fila.
- Pedestal de projetor do Mordomo, colado ao arco.
- Balcão curvo de chapelaria e recepção (chapeleiro: suborno e guarda de armas declaradas).
- Quatro colunas redondas espalhadas pelo salão (cobertura).
- Do outro lado do arco, o conjunto de elevadores de vidro na parede de fundo (levam ao Anel).
- Porta de serviço discreta na parede lateral (leva à doca, scene 3).
- Projetores de caveira e abóbora no piso, como decoração.

**Posições iniciais dos tokens**

- Quatro runners na fila, perto das portas.
- Duas Seguranças corporativas (NA 2), uma de cada lado do arco.
- Drone de vigilância (NA 1) pairando sobre o arco.
- Mordomo (IA, NA 0) como token fixo no pedestal.
- Chapeleiro atrás do balcão e de 8 a 10 convidados figurantes na fila.

**Estados e efeitos no Foundry**

- **Alerta 2:** mova uma Segurança para seguir o grupo de longe.
- **Alerta 3:** acrescente drones extras.
- **Alerta 4:** feche as portas dos elevadores (parede travada) e posicione as duas Seguranças que chegam em 1d4 rodadas.
- **Loop de câmera:** o scanner "limpo" dura 1 minuto. Use um aviso ou lembrete na mesa.

**Prompt**

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration of a tabletop RPG battle map, drawn in a strict top-down orthographic view looking straight down at the floor plan (90 degree overhead camera, no perspective, no isometric angle), inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, thick solid black bands for walls, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a grand corporate lobby, a wide rectangular hall with double glass entrance doors along the bottom edge, a long glowing LED red carpet running from the doors straight to a tall scanner archway at two thirds of the hall, velvet rope stanchions lining both sides of the carpet, a small pedestal projector beside the archway, a curved reception and hat-check counter against the left wall, a row of glass elevator doors along the top wall, a plain staff door in the left wall, four thick round pillars spread across the hall, large pumpkin and skull hologram projectors on the floor as decoration, plain polished stone floor with no tile seams. The map is completely empty of characters and creatures, with NO grid, NO gridlines, NO tile pattern that reads as a grid, NO measuring marks, NO text, NO lettering, NO numbers, NO logos. Furniture, pillars and obstacles are clear flat top-down shapes so cover and open floor are easy to read, and doorways are clear gaps in the walls. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the glowing LED carpet. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. --ar 3:2 --no grid, gridlines, checkerboard, text, letters, numbers, people, characters, perspective, isometric, 3d render --v 6.0 --style raw
```

---

### Scene 3: Doca de Serviço

| | |
|---|---|
| **Sala e momento** | Sala 1, rota alternativa (Ghost, Rigger) |
| **Hora na história** | 22:00 |
| **Tamanho sugerido** | 24 x 16 quadrados (2400 x 1600 px) |
| **Proporção** | `3:2` |
| **Cor de destaque** | Vermelho néon (a câmera de parede) |
| **Prioridade** | Recomendado |

**Contexto**

A doca de carga atrás da torre não tem scanner de armas: dá para levar o que quiser. O teste é furtividade, DES CD 12 em grupo, contra uma câmera que varre o pátio. Quem se mexe entre uma varredura e outra passa. Falhar sobe o Alerta em 1 e uma Segurança fica de olho. Sem o Mordomo, a pista da reviravolta sai pelo chapeleiro da doca, que murmura a mesma frase. O drone do Rigger distrai o Drone de vigilância. Como é uma cena de furtividade com várias posições possíveis, um mapa ajuda mais do que uma ilustração.

**O que o mapa precisa mostrar**

- Portão e muro baixo para o beco, na borda inferior (por onde o grupo chega).
- Baia de carga coberta com uma van de carga estacionada.
- Caixas, paletes e carrinhos de buffet em fileiras (esconderijos e cobertura).
- Esteira de carga vazia correndo ao longo de uma parede.
- Câmera de segurança presa à parede direita, com a lente em vermelho.
- Cantinho do chapeleiro, com banco e cinzeiro, ao lado da porta de serviço.
- Porta de serviço no alto do mapa, que leva à cozinha e ao Anel.
- Poças de chuva como formas chapadas.

**Posições iniciais dos tokens**

- Runners no portão do beco.
- Chapeleiro fumando junto da porta de serviço.
- Drone do Rigger sobre o muro.
- Segurança (NA 2) fora do mapa, entra no Alerta 2.

**Estados e efeitos no Foundry**

- Monte a câmera como uma luz ambiente giratória com cone vermelho, e a varredura vira o relógio da cena. A imagem leva só a câmera, sem o feixe, para você controlar o ritmo.
- Marque as caixas e os carrinhos como regiões de cobertura total para quem estiver escondido atrás delas.

**Prompt**

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration of a tabletop RPG battle map, drawn in a strict top-down orthographic view looking straight down at the floor plan (90 degree overhead camera, no perspective, no isometric angle), inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, thick solid black bands for walls, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a rain-slick loading dock yard behind a skyscraper at night, a low perimeter wall with a gate along the bottom edge, a covered loading bay on the left with a boxy cargo van parked inside, stacked crates and pallets in rows, catering trolleys lined up in the middle, an empty conveyor belt running along the right side of the bay, a wall-mounted security camera on the right wall, a small smoking nook with a bench and an ashtray stand beside a plain staff door at the top, shallow puddles drawn as flat shapes, plain smooth concrete ground with no tile seams. The map is completely empty of characters and creatures, with NO grid, NO gridlines, NO tile pattern that reads as a grid, NO measuring marks, NO text, NO lettering, NO numbers, NO logos. Furniture, pillars and obstacles are clear flat top-down shapes so cover and open floor are easy to read, and doorways are clear gaps in the walls. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the lens of the wall-mounted security camera. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. --ar 3:2 --no grid, gridlines, checkerboard, text, letters, numbers, people, characters, perspective, isometric, 3d render --v 6.0 --style raw
```

---

## Sala 2: O Baile no Anel

### Scene 4: Baile no Anel

| | |
|---|---|
| **Sala e momento** | Sala 2, 35 min |
| **Hora na história** | 22:40 |
| **Tamanho sugerido** | 36 x 24 quadrados (3600 x 2400 px) |
| **Proporção** | `3:2` |
| **Cor de destaque** | Ciano elétrico (o console do palco) |
| **Prioridade** | **Essencial** |

**Contexto**

É o maior mapa da aventura e o mais social. O grupo precisa do crachá nível 4 do Assistente da Diretora, escondido entre cinco convidados de máscara dourada. Dois dos três sinais identificam o Corvo: não bebe, olha o relógio, mão esquerda cromada. As fontes: Teo Pixel (20 cr por um drinque), observação (SAB CD 12, de longe), câmeras do Anel (hack CD 12) e Ping (CD 11). Para pegar o crachá, há batedor de carteira, distração no palco (o Rocker, ou Yara K assumindo o palco), persuasão e clonagem. Quem deixou armas no Portão as recupera no guarda-volumes, e quem pediu Entrega aérea encontra o item na varanda leste. O elevador de serviço, com a Cache de Ruth atrás do painel, também fica aqui. Se atrasar, o Assistente vai ao banheiro e deixa o crachá no balcão.

**O que o mapa precisa mostrar**

- Salão curvo, em arco suave, com a parede de vidro externa voltada para a cidade, no alto do mapa.
- Pista de dança oval no centro.
- Palco elevado com console de DJ na extremidade oeste, com acesso livre pelos dois lados (o Rocker precisa subir).
- Balcão de bar curvo com banquetas, junto à parede interna.
- Mesas altas redondas e sofás baixos espalhados ao redor da pista (cobertura e esconderijo).
- Balcão de guarda-volumes com fileira de gavetas biométricas pequenas, ao lado das portas de entrada.
- Conjunto de elevadores principais perto da entrada.
- Porta do elevador de serviço, discreta, com um painelzinho de manutenção ao lado, no canto dos fundos.
- Varanda leste: passagem estreita aberta ao ar livre, com corrimão, na extremidade leste.
- Duas portas de banheiro e colunas estruturais espalhadas.

**Posições iniciais dos tokens (sugestão)**

| Token | Posição inicial |
|---|---|
| Corvo dourado (o Assistente) | Perto do palco, de costas para o bar, conferindo o relógio |
| Raposa dourada (investidor) | No bar |
| Caveira dourada (gerente da DJ) | Ao lado do console da DJ |
| Arlequim dourado (médico da Vitalis) | No sofá do lounge, de mãos vazias |
| Sol dourado (executivo bêbado) | Cambaleando na pista de dança |
| Teo Pixel | No bar, com o drone de selfie |
| DJ (máscara de gato de vidro) | No palco |
| Runners | Chegando pelas portas de entrada |

Complete com 15 a 20 convidados figurantes e uma Segurança de plantão perto dos elevadores. Ela passa a seguir o grupo no Alerta 2.

**Estados e efeitos no Foundry**

- **Yara K no palco:** troque o token da DJ pelo do Rocker.
- **Distração:** marque a região da pista como "multidão" para quem tentar passar despercebido.
- **Alerta 4:** feche as portas dos elevadores (parede travada).
- **Elevador de serviço:** a porta fica travada até alguém colocar o crachá nível 4. A Cache de Ruth é o scene 5.

**Prompt**

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration of a tabletop RPG battle map, drawn in a strict top-down orthographic view looking straight down at the floor plan (90 degree overhead camera, no perspective, no isometric angle), inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, thick solid black bands for walls, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a large curved glass ballroom forming a gentle arc, the long curved outer glass wall along the top edge, a narrow open-air balcony with a railing at the east end, a large oval dance floor in the center, a raised stage with a DJ console at the west end, a long curved bar counter with stools along the inner wall, many round high cocktail tables and low lounge sofas scattered around the dance floor, a coat and bag check counter with a row of small lockers beside the entrance doors at the bottom, a bank of glass elevators near the entrance, a plain service elevator door with a small maintenance panel in the back corner, two restroom doors, structural pillars here and there, plain smooth floor with no tile seams. The map is completely empty of characters and creatures, with NO grid, NO gridlines, NO tile pattern that reads as a grid, NO measuring marks, NO text, NO lettering, NO numbers, NO logos. Furniture, pillars and obstacles are clear flat top-down shapes so cover and open floor are easy to read, and doorways are clear gaps in the walls. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the DJ console and the stage. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. --ar 3:2 --no grid, gridlines, checkerboard, text, letters, numbers, people, characters, perspective, isometric, 3d render --v 6.0 --style raw
```

---

### Scene 5: Elevador de Serviço e a Cache

| | |
|---|---|
| **Sala e momento** | Subida entre as Salas 2 e 3 |
| **Hora na história** | Pouco antes de 23:10 |
| **Tamanho sugerido** | 6 x 4 quadrados (600 x 400 px) |
| **Proporção** | `3:2` |
| **Cor de destaque** | Vermelho néon (a luz de uma granada) |
| **Prioridade** | Extra. A imagem 11 do pacote já cobre a cena. |

**Contexto**

Com o crachá nível 4, o grupo sobe do Anel ao 60º pelo elevador de serviço. No caminho, abre o painel de manutenção (código 3110) e pega a Cache de Ruth: tudo o que as fichas marcam com [C], 2 granadas de fragmentação (2d6, raio Perto, ignoram a Blindagem) e 1 granada de fumaça. Não exige teste e leva 1 minuto. O momento importante é a divisão do equipamento: quem carrega as granadas será útil na Sala 4. Como é uma cena de inventário, vale como mini-mapa só se a mesa gostar de arrastar itens entre tokens.

**O que o mapa precisa mostrar**

- Cabine de carga pequena, com piso de aço.
- Painel de manutenção aberto na parede dos fundos, com teclado numérico.
- Mala de eletricista aberta no chão, com pistolas, carregadores e três esferas de granada.
- Cabos enrolados no canto e uma mancha de luz de teto como forma chapada.

**Tokens em cena:** os quatro runners, bem juntos.

**Prompt**

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration of a tabletop RPG battle map, drawn in a strict top-down orthographic view looking straight down at the floor plan (90 degree overhead camera, no perspective, no isometric angle), inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, thick solid black bands for walls, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: the cramped interior of a small freight elevator seen from above, a bare steel floor, thick black walls with a sliding door gap on the bottom edge, an opened maintenance panel in the back wall with a numeric keypad, an old electrician's bag open on the floor holding pistols, magazines and three round grenades, coiled cables in one corner, a soft pool of ceiling light drawn as a flat shape. The map is completely empty of characters and creatures, with NO grid, NO gridlines, NO tile pattern that reads as a grid, NO measuring marks, NO text, NO lettering, NO numbers, NO logos. Furniture, pillars and obstacles are clear flat top-down shapes so cover and open floor are easy to read, and doorways are clear gaps in the walls. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the indicator light of one grenade. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. --ar 3:2 --no grid, gridlines, checkerboard, text, letters, numbers, people, characters, perspective, isometric, 3d render --v 6.0 --style raw
```

---

## Sala 3: A Vitrine do 60º

### Scene 6: Galeria dos Troféus

| | |
|---|---|
| **Sala e momento** | Sala 3, 30 min |
| **Hora na história** | 23:10 |
| **Tamanho sugerido** | 32 x 18 quadrados (3200 x 1800 px) |
| **Proporção** | `16:9` |
| **Cor de destaque** | Ciano elétrico (a vitrine central) |
| **Prioridade** | **Essencial** |

**Contexto**

A galeria não tem guardas e a vitrine central é uma isca: um projetor com um sinalizador que avisa Aragão e o Rex quando alguém toca. Perceber a isca (SAB CD 12, Ping ou Rastrear CD 11, drone do Rigger ou Olhos térmicos automáticos) faz o Rex começar a Sala 4 em patrulha, e o grupo age primeiro. Pegar a isca sobe o Alerta em 1 e o Rex abre o combate com uma Rede magnética. As rotas reais são o terminal da galeria (hack CD 12, mostra o registro de acessos e a nota sobre o 61º), os cabos de energia no teto atrás da estátua (SAB CD 12 para seguir) e o Curador (CAR CD 12 ou 100 cr). Quando o grupo decide o que fazer, começa o apagão de 3 minutos (Cerimônia das Luzes): câmeras caem, fechaduras travam, e a porta da escada só abre com Backdoor CD 11, kit de ferramentas (INT CD 12) ou força (FOR CD 15). Durante o escuro, as máscaras mostram a marca da Obelisco.

**O que o mapa precisa mostrar**

- Portas do elevador de serviço na parede esquerda (chegada do grupo).
- Salão comprido com piso polido e vitrines de troféus e plintos de prêmios alinhados nas duas paredes longas.
- Telas apagadas nas paredes, como retângulos pretos chapados.
- Estátua de câmera de ouro em tamanho natural, num plinto redondo perto do fundo (cobertura), com um duto de energia grosso correndo pelo chão atrás dela e subindo pela parede.
- Vitrine central de vidro, num pequeno tablado redondo: a isca.
- Mesinha do Curador e um quiosque de terminal junto à parede direita.
- Porta da escada no canto superior direito.
- Janelas do chão ao teto na parede inferior, com chuva.

**Posições iniciais dos tokens**

- Quatro runners saindo do elevador.
- O Curador (civil, Fraca) na mesinha.
- Sem inimigos. Aragão e o Rex só aparecem pelo sinalizador.

**Estados e efeitos no Foundry**

| Estado | Como montar |
|---|---|
| **Normal** | Luz branca forte sobre a vitrine central e o resto em penumbra. |
| **Apagão (3 min reais)** | Escuridão total. Quem tem Olhos térmicos ou lanterna enxerga, os outros agem com desvantagem em tarefas visuais. Feche a porta da escada (parede travada). Câmeras caídas dão vantagem em furtividade. |
| **Pista da Obelisco** | Quando alguém passar em SAB CD 12, mostre a imagem 13 do pacote. |
| **Isca tocada** | Alerta +1 e narre o sinalizador. O Rex começa a Sala 4 com a Rede magnética. |

**Prompt**

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration of a tabletop RPG battle map, drawn in a strict top-down orthographic view looking straight down at the floor plan (90 degree overhead camera, no perspective, no isometric angle), inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, thick solid black bands for walls, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a silent corporate trophy gallery, a long rectangular hall with a polished plain floor, service elevator doors in the left wall, glass trophy display cases and award plinths lined along both long walls, dark blank wall screens drawn as flat black rectangles on the walls, a life-size golden camera statue on a round plinth near the back wall with a thick power conduit running along the floor behind it and up the wall, a single glass display case on a small round dais in the center of the hall, a small curator desk and a wall terminal kiosk near the right wall, a stairwell door in the top right corner, floor-to-ceiling windows along the bottom wall with rain streaks drawn as flat shapes, no tile seams. The map is completely empty of characters and creatures, with NO grid, NO gridlines, NO tile pattern that reads as a grid, NO measuring marks, NO text, NO lettering, NO numbers, NO logos. Furniture, pillars and obstacles are clear flat top-down shapes so cover and open floor are easy to read, and doorways are clear gaps in the walls. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the central glass display case. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. --ar 16:9 --no grid, gridlines, checkerboard, text, letters, numbers, people, characters, perspective, isometric, 3d render --v 6.0 --style raw
```

---

## Sala 4: O Corredor dos Rostos

### Scene 7: Corredor dos Rostos

| | |
|---|---|
| **Sala e momento** | Sala 4, 35 min (combate com Rex) |
| **Hora na história** | 23:35 |
| **Tamanho sugerido** | 28 x 16 quadrados (2800 x 1600 px) |
| **Proporção** | `16:9` |
| **Cor de destaque** | Ciano elétrico (o anel da porta do cofre) |
| **Prioridade** | **Essencial** |

**Contexto**

É o único combate inevitável da aventura. Rex (NA 4, CA 14, HP 26, BL 1) começa em Modo Contenção, que nocauteia, e passa ao Modo Letal aos 13 HP ou com o Alerta em 4. Não se hackeia: a saída tática é explosivo (granadas da Cache), flanco e **porta dorsal** (CA 16, só pelas costas ou pelo flanco, e quem abre pode tentar o reinício físico com CD 18), Solo do Rocker e o curto-circuito do Mural (2d6, ignora a Blindagem, atinge quem estiver Perto da parede, Rex inclusive). As duas colunas de vidro dão +2 de CA contra o Taser, a Rede e a Metralhadora. Desligar o Mural (hack CD 12) corta as imagens do duelo, mas deixa o corredor escuro, e Rex enxerga no escuro. Por isso o mapa precisa ser largo o bastante para flanquear, e as paredes precisam ser legíveis como zona de perigo.

**O que o mapa precisa mostrar**

- Entrada pela porta da escada, na extremidade oeste (por onde o grupo chega).
- Duas colunas de vidro grossas e quadradas, deslocadas uma da outra no meio do corredor.
- Faixa contínua de painéis holográficos de rostos nas duas paredes longas, projetando-se levemente para dentro, como um padrão repetido de contornos ovais de rosto.
- Porta de cofre enorme e redonda na extremidade leste.
- Placa de carregamento circular de aço no chão, na frente da porta, onde Rex fica.
- Piso de vidro liso, com espaço aberto dos dois lados para flanquear.

**Posições iniciais dos tokens**

- Quatro runners junto à porta da escada.
- Rex como token grande (2 x 2) sobre a placa de carregamento, de frente para o grupo.
- Se a isca da Sala 3 foi tocada, Rex já vem andando ao encontro do grupo e abre com a Rede magnética.
- Se a isca foi percebida, ele está em patrulha e o grupo age primeiro na rodada 1.
- Sem Seguranças neste mapa: se o Alerta chegar a 4 durante o combate, Aragão os segura e só o Rex passa ao Modo Letal.

**Estados e efeitos no Foundry**

| Estado | Como montar |
|---|---|
| **Mural ligado (padrão)** | Luz ciano suave ao longo das duas paredes. |
| **Mural desligado** | Apague as luzes do corredor. Quem não tem lanterna ou Olhos térmicos age com desvantagem em tudo que exija visão. Rex continua enxergando. |
| **Curto-circuito** | Âmbar piscando no trecho da parede atingido. Marque as duas faixas de parede (1 quadrado de largura) como regiões de perigo: DES CD 12 ou 2d6. Rex também sofre os 2d6 se estiver ali. |
| **Cobertura das colunas** | Marque as duas colunas como cobertura (+2 de CA contra Taser, Rede e Metralhadora, não vale contra golpes corpo a corpo). |
| **Modo Letal** | Troque o token de Rex e mostre a imagem 16 do pacote. |

**Prompt**

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration of a tabletop RPG battle map, drawn in a strict top-down orthographic view looking straight down at the floor plan (90 degree overhead camera, no perspective, no isometric angle), inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, thick solid black bands for walls, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a wide glass corridor almost like a long hall, a stairwell door at the west end, two thick square glass columns placed in the middle offset from each other, both long walls lined with a continuous band of small holographic face panels projecting slightly into the corridor and drawn as a repeating pattern of flat oval face outlines, a massive circular vault door with a heavy lock ring at the east end, a round steel charging plate on the floor in front of the vault door, plain smooth glass floor with no tile seams and open floor on both sides of the columns. The map is completely empty of characters and creatures, with NO grid, NO gridlines, NO tile pattern that reads as a grid, NO measuring marks, NO text, NO lettering, NO numbers, NO logos. Furniture, pillars and obstacles are clear flat top-down shapes so cover and open floor are easy to read, and doorways are clear gaps in the walls. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the lock ring of the vault door. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. --ar 16:9 --no grid, gridlines, checkerboard, text, letters, numbers, people, characters, perspective, isometric, 3d render --v 6.0 --style raw
```

---

## Sala 5: O Cofre da Diretoria e a Fuga

### Scene 8: Cofre da Diretoria

| | |
|---|---|
| **Sala e momento** | Sala 5, 40 min, e Fuga, lance 1 |
| **Hora na história** | 23:50 |
| **Tamanho sugerido** | 24 x 16 quadrados (2400 x 1600 px) |
| **Proporção** | `3:2` |
| **Cor de destaque** | Ciano elétrico (o Rosto Livre) |
| **Prioridade** | **Essencial** |

**Contexto**

O cronômetro de 10 minutos reais começa quando a porta se abre. Lívia Aragão (Diretor, NA 3, CA 13, HP 15, pistola pesada +4) espera sentada, calma, com 2 Drones de vigilância em volta e um botão de pânico na mesa: apertar equivale a Alerta 4 e traz 2 Seguranças em 1d4 rodadas. As escolhas do grupo são pegar o protótipo e correr, aceitar o acordo, arrancar a máscara, virar o jogo (hack CD 15 no terminal para redirecionar a transmissão ao Dossiê, 1d4 rodadas de download, Alerta +1) ou eliminar a Diretora. Se todos caíram no corredor, acordam amarrados aqui, com as armas numa bandeja. Depois da meia-noite, o lance 1 da Fuga também acontece neste mapa: sair do 62º por escada de incêndio, duto de manutenção ou janela com cabo (DES CD 12, Cabo-gancho e Molas de salto passam sem rolar).

**O que o mapa precisa mostrar**

- Sala branca e limpa, com a parede de vidro do chão ao teto sobre a cidade ocupando um lado inteiro.
- Porta de cofre pesada e redonda na parede esquerda (entrada do grupo).
- Mesa de reunião longa e brilhante no centro, com um pedestal redondo pequeno no meio do tampo, onde fica o Rosto Livre.
- Mesa executiva na cabeceira oposta à porta, onde Aragão está sentada, com o botão de pânico embutido no tampo.
- Parede de telas escuras no fundo, como retângulos chapados.
- Sofá baixo e armário de bebidas num canto.
- Terminal numa mesinha lateral (o hack do Dossiê e do redirecionamento).
- Três saídas da fuga: porta de emergência para a escada de incêndio, grelha do duto de manutenção ao nível do chão e janela com argola de ancoragem presa na base.

**Posições iniciais dos tokens**

- Quatro runners na porta do cofre (ou amarrados no centro, se caíram no corredor).
- Aragão na cabeceira da mesa executiva.
- Dois Drones de vigilância pairando ao lado dela.
- Seguranças entram pela porta do cofre 1d4 rodadas depois do Alerta 4.

**Estados e efeitos no Foundry**

- Coloque um pequeno marcador vermelho no tampo da mesa de Aragão para o botão de pânico. A imagem não leva o botão, para você poder esconder ou revelar.
- Troque a imagem das telas da parede pela transmissão quando o cronômetro zerar (use um Tile por cima).
- O cronômetro de 10 minutos corre fora do VTT. Um relógio visível na tela da mesa ajuda.

**Prompt**

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration of a tabletop RPG battle map, drawn in a strict top-down orthographic view looking straight down at the floor plan (90 degree overhead camera, no perspective, no isometric angle), inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, thick solid black bands for walls, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a stark white executive vault room, one entire side is a floor-to-ceiling glass wall overlooking a neon city, a heavy round vault door in the left wall, a long glossy conference table in the center with a small round pedestal in the middle of its top holding a translucent mask-shaped implant, an executive desk at the far head of the table, a wall of dark screens drawn as flat black rectangles on the back wall, a low sofa and a drinks cabinet in one corner, a small terminal on a side table, an emergency fire door in one wall, a maintenance duct grille set low in the opposite wall, a heavy anchor ring bolted at the base of the glass wall, plain smooth white floor with no tile seams. The map is completely empty of characters and creatures, with NO grid, NO gridlines, NO tile pattern that reads as a grid, NO measuring marks, NO text, NO lettering, NO numbers, NO logos. Furniture, pillars and obstacles are clear flat top-down shapes so cover and open floor are easy to read, and doorways are clear gaps in the walls. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the mask-shaped implant on its pedestal. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. --ar 3:2 --no grid, gridlines, checkerboard, text, letters, numbers, people, characters, perspective, isometric, 3d render --v 6.0 --style raw
```

---

## A Fuga

### Scene 9: Anel Desmascarado

| | |
|---|---|
| **Sala e momento** | Fuga, lance 2 (variante do scene 4) |
| **Hora na história** | Depois de 00:00 |
| **Tamanho sugerido** | 36 x 24 quadrados (3600 x 2400 px) |
| **Proporção** | `3:2` |
| **Cor de destaque** | Vermelho néon (as poças de luz dos holofotes dos drones) |
| **Prioridade** | Extra. Dá para usar o scene 4 com tokens de multidão. |

**Contexto**

Depois do Desmascaramento, mil convidados sem máscara entram em pânico. A travessia do Anel é um teste em grupo de CAR ou DES CD 12, com terreno difícil e furtividade com desvantagem (livro 2.8, perigo 6). Quem carrega o butim é o alvo, e se um runner cair, o butim fica no chão. O scene 4 serve se você só quiser pôr uma multidão de tokens por cima e uma região de terreno difícil. Esta variante existe para quem quer o visual do caos: máscaras quebradas no chão, mesas tombadas e luz de holofote.

**O que o mapa precisa mostrar**

- A mesma planta do scene 4 (use-o como image prompt).
- Máscaras quebradas e cacos espalhados pelo piso.
- Mesas altas e banquetas tombadas, taças derrubadas e serpentinas rasgadas.
- Alto-falantes caídos e poças de luz de holofote como formas chapadas.

**Tokens em cena:** os quatro runners, o portador do butim marcado, de 15 a 20 convidados em pânico (ou uma região de terreno difícil) e 2 Drones de câmera. Os 2 Seguranças (NA 4 no total) só aparecem no scene 10.

**Prompt**

Cole a URL do scene 4 no início do prompt e adicione `--iw 2` ao fim.

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration of a tabletop RPG battle map, drawn in a strict top-down orthographic view looking straight down at the floor plan (90 degree overhead camera, no perspective, no isometric angle), inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, thick solid black bands for walls, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: the same large curved glass ballroom layout after a chaotic mass unmasking, the dance floor, stage, curved bar, lounge sofas, locker counter and elevators kept in the same positions, with many broken holographic masks and shards scattered across the floor, overturned high cocktail tables and stools, spilled glasses, torn streamers, toppled speakers beside the stage, and several flat pools of floodlight on the floor, plain smooth floor with no tile seams. The map is completely empty of characters and creatures, with NO grid, NO gridlines, NO tile pattern that reads as a grid, NO measuring marks, NO text, NO lettering, NO numbers, NO logos. Furniture, pillars and obstacles are clear flat top-down shapes so cover and open floor are easy to read, and doorways are clear gaps in the walls. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the pools of floodlight on the floor. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. --ar 3:2 --no grid, gridlines, checkerboard, text, letters, numbers, people, characters, perspective, isometric, 3d render --v 6.0 --style raw
```

---

### Scene 10: Rua em frente ao Estúdio

| | |
|---|---|
| **Sala e momento** | Fuga, lance 3 |
| **Hora na história** | Depois de 00:00 |
| **Tamanho sugerido** | 30 x 20 quadrados (3000 x 2000 px) |
| **Proporção** | `3:2` |
| **Cor de destaque** | Vermelho néon (a ponta do tapete de LED) |
| **Prioridade** | Recomendado |

**Contexto**

É o único lance da fuga que pode virar combate: 2 Seguranças (NA 4 no total) vêm atrás, DES CD 12 em duas rodadas. Se os runners falharem, é combate Difícil ou largar o butim. O objetivo final é a banca de Dona Ruth, no sétimo andar do Mercado, então o mapa precisa de uma rota de saída clara para quem passa no teste. Quem carrega o butim é o alvo preferido dos Seguranças. Com a cidade assistindo à transmissão, os figurantes na rua também reagem.

**O que o mapa precisa mostrar**

- Calçada larga e praça no alto do mapa, com o tapete de LED vermelho descendo das portas da torre até o meio-fio.
- Rua de duas faixas, com marcações chapadas no asfalto molhado.
- Aerocarros estacionados como caixas planas (cobertura).
- Dois quiosques de comida de rua, um abrigo de ônibus e jardineiras.
- Pilares baixos de concreto (bollards) e postes de luz como círculos pequenos.
- Beco estreito do lado direito (rota de fuga).
- Entrada de escada para o Mercado do lado esquerdo (destino da fuga).
- Poças de chuva como formas chapadas.

**Posições iniciais dos tokens**

- Quatro runners saindo pela porta da torre, no alto do mapa.
- Duas Seguranças corporativas atrás deles.
- De 6 a 8 figurantes na calçada e drones de câmera sobrevoando.

**Prompt**

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration of a tabletop RPG battle map, drawn in a strict top-down orthographic view looking straight down at the floor plan (90 degree overhead camera, no perspective, no isometric angle), inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, thick solid black bands for walls, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a rain-slick city street at the foot of a giant tower, a wide sidewalk and plaza along the top edge with a glowing LED red carpet spilling from the tower doors down to the curb, a two-lane road with flat painted lane markings, several parked hover-cars drawn as boxy flat shapes, two street food kiosks, a bus shelter, planters and low concrete bollards, small circles for street lamps, a narrow side alley on the right, a stairwell entrance to an underground market on the left, shallow puddles drawn as flat shapes, plain smooth asphalt with no tile seams. The map is completely empty of characters and creatures, with NO grid, NO gridlines, NO tile pattern that reads as a grid, NO measuring marks, NO text, NO lettering, NO numbers, NO logos. Furniture, pillars and obstacles are clear flat top-down shapes so cover and open floor are easy to read, and doorways are clear gaps in the walls. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the end of the LED red carpet at the curb. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. --ar 3:2 --no grid, gridlines, checkerboard, text, letters, numbers, people, characters, perspective, isometric, 3d render --v 6.0 --style raw
```

---

## Checklist de montagem no Foundry

1. **Criar a cena** com a imagem, definir a grade (1 quadrado = 1,5 m) e a quantidade de quadrados da tabela de tamanhos. Ajuste a escala até colunas e portas ocuparem de 1 a 2 quadrados.
2. **Traçar as paredes** sobre as faixas pretas grossas e as portas nos vãos. Marque como travadas as portas que o Alerta fecha (elevadores, escada da Sala 3).
3. **Luzes:** use iluminação ambiente nas cenas escuras e luzes pontuais no vermelho, ciano e âmbar de cada cena. Os estados da Sala 3 (apagão) e da Sala 4 (Mural) são só mudanças de luz.
4. **Regiões:** crie regiões para cobertura, terreno difícil e zonas de perigo (parede do Mural no scene 7, multidão no scene 4).
5. **Tokens:** monte as fichas dos Seguranças, Drones, Rex e Aragão como actors prontos e arraste só na hora. Rex entra como token 2 x 2.
6. **Pistas e imagens:** deixe as ilustrações do pacote (imagens 13 e 16 em especial) abertas como popout para mostrar quando o teste passar.
