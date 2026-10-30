# Noite das Máscaras: pacote de imagens para mesa virtual

Acompanha a aventura **Noite das Máscaras** (SombraNeon, one-shot de 4 horas). São **24 imagens** na ordem em que aparecem na sessão. Cada uma traz a descrição da cena, um texto narrativo para ler em voz alta (ou colar no chat) e um prompt pronto para gerar a arte.

## Como usar

- **Ordem:** as imagens seguem a ordem da mesa, da abertura à Fuga. O campo *Quando mostrar* diz o gatilho exato.
- **Para quem:** quase todas são para mostrar aos jogadores. As marcadas com cuidado entregam pistas, então confira o campo antes de soltar a imagem no VTT.
- **Proporção:** `16:9` para cenários (tela cheia ou pano de fundo), `3:4` para retratos de NPC, `3:2` para close de evidência e `1:1` para itens e ícones de inventário.
- **Texto narrativo:** foi escrito para durar de 15 a 30 segundos de leitura. Corte à vontade se a mesa estiver correndo atrás do relógio.
- **Pacote mínimo (8 imagens)**, se você tiver pouco tempo para gerar: nº 1, 4, 7, 12, 14, 15, 19 e 23.

## Legenda da cor de destaque

Cada imagem é preto e branco, com **uma única cor neon** num ponto de foco. A cor muda de acordo com o que a cena quer dizer, para os jogadores aprenderem a ler a paleta sem você explicar.

| Cor | O que significa na aventura |
|---|---|
| **Vermelho néon** | Tempo, perigo e Alerta: o relógio, o scanner, a granada, o crachá, Rex em Modo Letal, o vinho e o botão de pânico de Aragão, a meia-noite. |
| **Ciano elétrico** | Tecnologia e máscaras: hologramas, IA, o visor de Rex, o Rosto Livre, o núcleo de guarda. |
| **Verde tóxico** | A Obelisco: a marca nas máscaras e o Dossiê. Sempre que o verde aparecer, a conspiração está por perto. |
| **Dourado néon** | O Assistente da Diretora e os cinco suspeitos de máscara dourada. |
| **Magenta néon** | Teo Pixel e a luz de gravação do drone de selfie. |
| **Âmbar néon** | Faíscas e eletricidade: o curto-circuito do Mural. |

## O prompt base

A direção de arte é fixa em todas as imagens. Só mudam o **Subject** (a cena), a **cor de destaque**, o **foco** da cor e a **proporção** (`--ar`, que foi acrescentada por imagem).

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: [CENA]. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color ([COR]) used sparingly on [FOCO]. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar [PROPORÇÃO] --v 6.0 --style raw
```

## Dicas de geração

- **Parâmetros:** `--v 6.0 --style raw` e `--ar` são do Midjourney. Em outros geradores, apague os parâmetros do final e escolha a proporção na interface; o resto do texto funciona como está.
- **Texto dentro da imagem:** geradores erram letras e números (relógio, letreiros, a placa da vitrine). Se você quiser *00:00* ou *DESMASCARAMENTO* legíveis, escreva por cima no VTT ou num editor.
- **Mãos e dedos:** a imagem 8 (os cinco suspeitos) depende de mãos cromadas, taças e relógios. Gere algumas variações e escolha a que mostra os sinais corretos.
- **Rex nos dois modos:** gere primeiro o Modo Contenção (nº 15) e use essa imagem como referência de personagem (`--cref` no Midjourney v6) ao gerar o Modo Letal (nº 16), para o robô ficar reconhecível.
- **Cor de destaque fugindo do controle:** se o gerador colorir a cena inteira, acrescente ao fim do prompt `monochrome, only one color accent, everything else black ink on white paper`.

## Índice

| Nº | Imagem | Quando mostrar | Proporção | Cor |
|---|---|---|---|---|
| 1 | O Estúdio da Lumen na noite de Halloween | Abertura da sessão, antes do briefing. | `16:9` | Vermelho néon |
| 2 | Dona Ruth e a banca do Sétimo Andar | Briefing, quando Dona Ruth apresenta o trabalho. | `16:9` | Ciano elétrico |
| 3 | As seis máscaras-convite | Preparação, quando cada jogador escolhe a persona. | `3:2` | Ciano elétrico |
| 4 | O Saguão Vermelho | Início da Sala 1, 22:00. | `16:9` | Vermelho néon |
| 5 | O Mordomo | Sala 1, quando o Mordomo cumprimenta a persona do grupo. | `3:4` | Ciano elétrico |
| 6 | A doca de serviço | Sala 1, se o grupo escolher a doca de serviço (Ghost, Rigger). | `16:9` | Vermelho néon |
| 7 | O Baile no Anel | Início da Sala 2, 22:40. | `16:9` | Ciano elétrico |
| 8 | Os cinco suspeitos de máscara dourada | Sala 2, quando o grupo começar a procurar o Assistente. | `16:9` | Dourado néon |
| 9 | Teo Pixel | Sala 2, quando o grupo se aproxima de Teo no bar. | `3:4` | Magenta néon |
| 10 | O sorriso que não treme | Sala 2, quando o crachá é roubado ou entregue. É a pista da reviravolta. | `3:2` | Vermelho néon |
| 11 | O elevador de serviço e a Cache de Ruth | Início da Sala 3, na subida do elevador de serviço. | `16:9` | Vermelho néon |
| 12 | A Vitrine do Rosto Livre | Sala 3, ao abrirem as portas do 60º andar, 23:10. | `16:9` | Ciano elétrico |
| 13 | A Cerimônia das Luzes: a marca da Obelisco | Sala 3, durante o apagão. Mostre só quando alguém passar no teste de SAB CD 12. | `16:9` | Verde tóxico |
| 14 | O Corredor dos Rostos | Início da Sala 4, 23:35. | `16:9` | Ciano elétrico |
| 15 | Rex, Modo Contenção | Sala 4, ao revelar o Rex de perto ou ao iniciar o combate. | `3:4` | Ciano elétrico |
| 16 | Rex, Modo Letal | Sala 4, quando Rex chega à metade do HP ou o Alerta chega a 4. | `3:4` | Vermelho néon |
| 17 | O Mural em curto-circuito | Sala 4, quando alguém atirar no Mural de Rostos ou atrair Rex para perto da parede. | `16:9` | Âmbar néon |
| 18 | O Núcleo de guarda de Rex | Sala 4, se Rex for derrubado. Entregue como item de butim. | `1:1` | Ciano elétrico |
| 19 | O Cofre da Diretoria | Início da Sala 5, 23:50, quando a porta do cofre se abre. | `16:9` | Vermelho néon |
| 20 | Lívia Aragão | Sala 5, quando ela se apresenta e explica a armadilha. | `3:4` | Vermelho néon |
| 21 | O Rosto Livre | Sala 5, quando o grupo olha o Prêmio de perto. | `1:1` | Ciano elétrico |
| 22 | O Dossiê do Desmascaramento | Sala 5, se o grupo tentar “virar o jogo” ou baixar o Dossiê. | `3:2` | Verde tóxico |
| 23 | Meia-noite: o Desmascaramento | Quando o cronômetro zerar ou o Alerta chegar a 4. | `16:9` | Vermelho néon |
| 24 | A Fuga pelo Anel desmascarado | Fuga, lance 2: atravessar o Anel. | `16:9` | Vermelho néon |

---

## Abertura e briefing

### 1. O Estúdio da Lumen na noite de Halloween

| | |
|---|---|
| **Quando mostrar** | Abertura da sessão, antes do briefing. |
| **Para quem** | Jogadores |
| **Proporção** | `16:9` |
| **Cor de destaque** | Vermelho néon (o relógio) |

**Descrição da imagem**

Vista externa do Estúdio, a sede da Lumen: uma torre em forma de anel feito de telas gigantes, sobre a chuva da cidade. Fantasias de Halloween holográficas cobrem a fachada, aerocarros circulam em volta e um relógio colossal faz a contagem para o Desmascaramento.

**Texto narrativo** (ler em voz alta ou colar no chat)

> Esta noite a cidade inteira olha para cima. O Estúdio paira sobre os telhados como um halo de vidro e neon, cada tela do anel vestida de caveira, abóbora e sorriso de dente afiado. Aerocarros orbitam a torre feito vaga-lumes caros. No topo, um relógio do tamanho de um quarteirão conta os minutos até a meia-noite e, embaixo, em letras de luz, brilha uma palavra só: DESMASCARAMENTO. Quando o relógio zerar, todas as máscaras do baile vão cair. Vocês pretendem estar longe quando isso acontecer.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a colossal ring-shaped corporate tower made of giant screens looming over a rain-soaked megacity at night, Halloween decorations of grinning skull holograms and pumpkin lanterns along its facade, aerocars circling like fireflies, a huge clock face on top of the ring counting down to midnight. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the giant countdown clock on top of the ring. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** Coloque o “00:00” como texto no VTT. Geradores costumam errar números em relógios.

---

### 2. Dona Ruth e a banca do Sétimo Andar

| | |
|---|---|
| **Quando mostrar** | Briefing, quando Dona Ruth apresenta o trabalho. |
| **Para quem** | Jogadores |
| **Proporção** | `16:9` |
| **Cor de destaque** | Ciano elétrico (as máscaras) |

**Descrição da imagem**

Dona Ruth atrás da banca no Mercado do Sétimo Andar, entre fios, barracas de neon barato e fumaça de menta. Quatro máscaras holográficas sobre o balcão, um monte de credsticks e o olhar de quem já contou o seu dinheiro duas vezes.

**Texto narrativo** (ler em voz alta ou colar no chat)

> O Sétimo Andar cheira a solda quente e menta. Dona Ruth não levanta os olhos dos credsticks que conta, mas empurra quatro máscaras na direção de vocês com a ponta do dedo, como quem serve um café. A luz azul das máscaras acende o fundo dos olhos dela. “Quatro convites, quatro máscaras”, diz, soltando uma nuvem pálida de vapor. “Não tirem as máscaras. Elas são o passe de vocês.”

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a hard-faced middle-aged fixer woman behind a cluttered stall in a vertical black market, counting credit sticks, exhaling mint vapor from an e-cigarette, four ornate holographic party masks laid out on the counter, hanging wires and cheap neon stalls behind her. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the four glowing masks on the counter. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** Reuse no Encontro com Dona Ruth, no fim da aventura, quando o grupo volta à banca.

---

### 3. As seis máscaras-convite

| | |
|---|---|
| **Quando mostrar** | Preparação, quando cada jogador escolhe a persona. |
| **Para quem** | Jogadores (serve como carta de persona) |
| **Proporção** | `3:2` |
| **Cor de destaque** | Ciano elétrico (as órbitas dos olhos) |

**Descrição da imagem**

Fotografia de evidência com as seis máscaras alinhadas sobre um pano preto, da esquerda para a direita: caveira de neon (Cassius Vento), raposa de circuito (Dra. Marta Ibsen), abóbora de LED (Bruno Alcântara), gato de vidro (Yara K), prisma facetado (Nico Prisma) e mariposa de LED (Tereza Mares). Fios soltos e pequenos projetores de holograma nas bordas.

**Texto narrativo** (ler em voz alta ou colar no chat)

> Seis rostos de mentira esperam sobre o veludo. A caveira sorri de lado, a raposa tem veias de circuito, a abóbora pisca em ritmo de coração e o gato de vidro parece saber o que você vai fazer. Quando vocês pegam uma máscara, ela se molda ao rosto e apaga o seu. Daqui para a frente, vocês são outras pessoas.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: six ornate halloween party masks displayed in a row on black velvet like an evidence photograph, from left to right a neon skull, a circuit-board fox, an LED pumpkin, a glass cat, a faceted glass prism, a moth with LED wings, loose wires and tiny hologram projectors at the edges. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the glowing eye sockets of the masks. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 3:2 --v 6.0 --style raw
```

**Dica do Mestre:** Gere cada máscara também em separado, no formato 1:1, se quiser usar como ficha ou token do jogador.

---

## Sala 1: O Saguão Vermelho

### 4. O Saguão Vermelho

| | |
|---|---|
| **Quando mostrar** | Início da Sala 1, 22:00. |
| **Para quem** | Jogadores |
| **Proporção** | `16:9` |
| **Cor de destaque** | Vermelho néon (o tapete de LED) |

**Descrição da imagem**

O saguão do Estúdio com um tapete vermelho de LED, a fila de convidados fantasiados, o arco do scanner, duas Seguranças corporativas e um Drone de vigilância. Um relógio holográfico marca 22:00.

**Texto narrativo** (ler em voz alta ou colar no chat)

> O tapete vermelho desce pelo saguão como uma língua de neon. A fila é um desfile de pesadelos caros: caveiras que piscam, abóboras de circuito, rostos de vidro que trocam de expressão. No arco do portão, um scanner varre máscara por máscara, e duas Seguranças de terno escuro olham para as suas mãos antes de olhar para o seu rosto. Acima de tudo, o relógio: vinte e duas horas. Faltam duas para o fim da festa.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a grand corporate lobby with a long glowing LED red carpet, a queue of expensively costumed masked guests in neon skulls, circuit pumpkins and glass faces, a tall scanner archway, two armored corporate guards in dark suits, a hovering surveillance drone, a huge hologram clock above the gate. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the glowing LED carpet. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** Os jogadores vão perguntar sobre armas aqui. Tenha a seção 3 da aventura aberta.

---

### 5. O Mordomo

| | |
|---|---|
| **Quando mostrar** | Sala 1, quando o Mordomo cumprimenta a persona do grupo. |
| **Para quem** | Jogadores |
| **Proporção** | `3:4` |
| **Cor de destaque** | Ciano elétrico (as lentes dos olhos) |

**Descrição da imagem**

O Mordomo, IA holográfica do saguão: fraque impecável, luvas brancas, sorriso largo demais e olhos que são lentes de câmera.

**Texto narrativo** (ler em voz alta ou colar no chat)

> O mordomo se inclina na altura exata do seu ombro, e o fraque dele treme nas bordas, como uma televisão mal sintonizada. “Boa noite, doutora. E como foi a viagem a Lisboa?” Ele sorri mais do que um rosto deveria sorrir. Os olhos dele não piscam, e dentro de cada um deles gira devagar uma lente.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: an elegant holographic butler with a too-wide polite smile, impeccable tailcoat and white gloves, translucent glitching scanlines across his body, eyes like empty camera lenses, standing beside a scanner archway. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on his camera-lens eyes. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 3:4 --v 6.0 --style raw
```

**Dica do Mestre:** Quando o Mordomo disser que os convites “chegaram antes do esperado”, mostre esta imagem de novo, com o sorriso em destaque.

---

### 6. A doca de serviço

| | |
|---|---|
| **Quando mostrar** | Sala 1, se o grupo escolher a doca de serviço (Ghost, Rigger). |
| **Para quem** | Jogadores |
| **Proporção** | `16:9` |
| **Cor de destaque** | Vermelho néon (o feixe da câmera) |

**Descrição da imagem**

Doca de carga atrás da torre, de noite e sob chuva: carrinhos de buffet, caixas de decoração, um chapeleiro de uniforme fumando e a sombra de alguém se esgueirando com uma mochila entre as pilhas. Um drone pequeno paira sobre o muro.

**Texto narrativo** (ler em voz alta ou colar no chat)

> Atrás da torre, a festa é só barulho de caixote e ar quente de cozinha. Carrinhos de buffet molhados de chuva, um chapeleiro de uniforme com o cigarro na boca, uma esteira que corre vazia. Nenhum scanner aqui, só o feixe vermelho de uma câmera varrendo o pátio. Quem se mexer entre uma varredura e outra passa.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a rain-slick loading dock behind a skyscraper at night, catering trolleys and stacked crates of party decorations, a hat-check attendant in uniform smoking by the door, a shadowy figure slipping between crates with a duffel bag, a small drone hovering over the wall, a thin laser beam of a security camera sweeping the yard. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the sweeping laser beam of the security camera. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** Nesta rota não há scanner de armas, então o grupo leva o que quiser. Sem o Mordomo, o chapeleiro da doca murmura a pista “antes do esperado”.

---

## Sala 2: O Baile no Anel

### 7. O Baile no Anel

| | |
|---|---|
| **Quando mostrar** | Início da Sala 2, 22:40. |
| **Para quem** | Jogadores |
| **Proporção** | `16:9` |
| **Cor de destaque** | Ciano elétrico (a máscara da DJ) |

**Descrição da imagem**

O Anel, salão curvo de vidro sobre a cidade, com dançarinos mascarados, esqueletos holográficos flutuando sobre a pista, uma fila infinita no bar e uma DJ de máscara de gato no palco.

**Texto narrativo** (ler em voz alta ou colar no chat)

> O Anel é um corredor de vidro curvo com a cidade inteira aos seus pés, um mar de neon molhado de chuva. Acima da pista, esqueletos holográficos dançam sem peso, tropeçando uns nos outros. Do palco, uma DJ de máscara de gato de vidro empurra um set lento que faz o chão vibrar na sola dos pés. O relógio no palco marca vinte e duas e quarenta. Em algum lugar desta multidão, alguém de máscara dourada carrega o crachá que abre o cofre.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a curved glass ballroom high above a neon megacity, dozens of masked dancers on a crowded floor, holographic skeletons floating above them, a long bar with an endless queue, a DJ wearing a glass cat mask at a stage console. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the DJ's glass cat mask. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** Se Yara K (Rocker) for assumir o palco, reuse esta imagem e narre a troca de DJ.

---

### 8. Os cinco suspeitos de máscara dourada

| | |
|---|---|
| **Quando mostrar** | Sala 2, quando o grupo começar a procurar o Assistente. |
| **Para quem** | Jogadores, com cuidado: a imagem entrega os três sinais de uma vez |
| **Proporção** | `16:9` |
| **Cor de destaque** | Dourado néon (as cinco máscaras) |

**Descrição da imagem**

Cinco convidados de máscara dourada em fila solta: Corvo, Raposa, Caveira, Arlequim e Sol. Corvo e Raposa têm a mão esquerda cromada. O Corvo está de mãos vazias e confere o relógio. A Raposa segura uma taça. A Caveira também confere o relógio, mas segura uma taça. O Arlequim está de mãos vazias. O Sol cambaleia com uma garrafa. O Assistente é o Corvo.

**Texto narrativo** (ler em voz alta ou colar no chat)

> Cinco máscaras douradas passeiam pelo salão como se fossem donas dele: um corvo, uma raposa, uma caveira, um arlequim e um sol. Um deles está tão bêbado que a máscara escorrega no nariz. Qualquer um pode ser o Assistente da Diretora, e o crachá de acesso nível 4 está na lapela dele.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: five masked party guests standing in a loose line: a man in a golden raven mask with a chrome left hand, empty hands, checking his wristwatch; a woman in a golden fox mask with a chrome left hand holding a glass; a man in a golden skull mask checking his wristwatch while holding a glass; a figure in a golden harlequin mask with empty hands; a man in a golden sun mask swaying drunkenly with a bottle. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon gold) used sparingly on the five golden masks. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** Esta imagem entrega os três sinais de uma vez (mão cromada, não bebe, olha o relógio). Para manter o enigma, só a mostre depois que o grupo identificar o Corvo, ou revele os sinais pelas fontes da Sala 2: SAB CD 12 para a mão cromada, e Teo Pixel para “não bebe” e “olha o relógio”. Geradores erram mãos e dedos, então confira os sinais antes de usar.

---

### 9. Teo Pixel

| | |
|---|---|
| **Quando mostrar** | Sala 2, quando o grupo se aproxima de Teo no bar. |
| **Para quem** | Jogadores |
| **Proporção** | `3:4` |
| **Cor de destaque** | Magenta néon (a luz do drone de selfie) |

**Descrição da imagem**

Teo Pixel, influenciador bêbado e fofoqueiro, fantasiado de vampiro holográfico com capa solta, máscara erguida na testa, drinque na mão e um drone de selfie que o segue.

**Texto narrativo** (ler em voz alta ou colar no chat)

> Teo Pixel é uma explosão de glitter e má ideia. A capa de vampiro holográfico engancha em cada banqueta, a máscara descansa na testa e ele filma tudo com um drone de selfie que flutua sobre o ombro. Quando vê vocês, abre os braços como se fossem velhos amigos. “Pagam um drinque para o Teo? Eu sei quem não bebe nesta festa, e quem olha demais para o relógio.”

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a drunk fashion influencer in a glittering holographic vampire costume with a loose cape, mask pushed up on his forehead, smeared makeup and a wide grin, cocktail in hand, a small selfie drone hovering at his shoulder filming him. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon magenta) used sparingly on the recording light of the selfie drone. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 3:4 --v 6.0 --style raw
```

**Dica do Mestre:** Se um jogador estiver de Cassius Vento, Teo é o rival de feed dele. Mostre a imagem com um sorriso malicioso.

---

### 10. O sorriso que não treme

| | |
|---|---|
| **Quando mostrar** | Sala 2, quando o crachá é roubado ou entregue. É a pista da reviravolta. |
| **Para quem** | Jogadores (mostre depois do teste, quando alguém notar a falta de reação) |
| **Proporção** | `3:2` |
| **Cor de destaque** | Vermelho néon (o crachá) |

**Descrição da imagem**

Close de uma mão levantando um crachá de acesso nível 4 da lapela do Corvo dourado. A mão cromada dele não treme e o sorriso educado continua no rosto, embaixo do bico da máscara.

**Texto narrativo** (ler em voz alta ou colar no chat)

> O crachá desliza para fora da lapela sem resistência. Vocês esperam um sobressalto, uma mão no pulso, um grito. Nada. A mão cromada do Corvo não se mexe, e o sorriso continua exatamente onde estava, educado, paciente, quase satisfeito. Ele nem desvia o olhar para ver o que você pegou. É como roubar de uma estátua que sabe que está sendo roubada.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: close-up of a gloved hand lifting a glowing access badge from the lapel of a man in a golden raven mask, his chrome left hand perfectly still, a faint polite smile visible beneath the beak of his mask, a crowd of party guests behind him drawn in loose sketchy hatching. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the glowing access badge. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 3:2 --v 6.0 --style raw
```

**Dica do Mestre:** Quem notar a falta de reação ganha uma ficha de Edge.

---

## Sala 3: A Vitrine do 60º

### 11. O elevador de serviço e a Cache de Ruth

| | |
|---|---|
| **Quando mostrar** | Início da Sala 3, na subida do elevador de serviço. |
| **Para quem** | Jogadores |
| **Proporção** | `16:9` |
| **Cor de destaque** | Vermelho néon (a luz da granada) |

**Descrição da imagem**

Interior apertado de um elevador de carga, com o painel de manutenção aberto e uma mala de eletricista cheia de pistolas, carregadores, três granadas compactas e cabo enrolado. Um teclado mostra o código digitado.

**Texto narrativo** (ler em voz alta ou colar no chat)

> O elevador de serviço sobe sem som. Atrás do painel de manutenção, exatamente onde Dona Ruth disse, uma mala de eletricista de couro velho espera entre fios e fusíveis. Vocês digitam 3110, a data do Halloween, e as travas estalam. Lá dentro, tudo o que o scanner não deixaria entrar: pistolas, carregadores e três esferas pesadas do tamanho de um punho. “Coisa que estoura”, dissera Ruth.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: the cramped interior of a freight elevator with a maintenance panel opened to reveal a worn electrician's toolbag packed with pistols, magazines, three compact grenades and coiled cable, a keypad with glowing digits, a flickering ceiling light. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the indicator light on one grenade. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** É aqui que o grupo divide as 2 granadas de fragmentação e a de fumaça. Pergunte quem carrega o quê. O elevador só abre com o crachá nível 4.

---

### 12. A Vitrine do Rosto Livre

| | |
|---|---|
| **Quando mostrar** | Sala 3, ao abrirem as portas do 60º andar, 23:10. |
| **Para quem** | Jogadores |
| **Proporção** | `16:9` |
| **Cor de destaque** | Ciano elétrico (a máscara na vitrine) |

**Descrição da imagem**

A Galeria dos Troféus: prêmios, telas apagadas, uma câmera de ouro em tamanho natural e, no centro, uma vitrine iluminada com uma máscara de vidro sem rosto. É a isca.

**Texto narrativo** (ler em voz alta ou colar no chat)

> As portas se abrem para a Galeria dos Troféus, tão silenciosa que dá para ouvir a chuva batendo no vidro do 60º andar. Prêmios em fileira, telas apagadas, uma câmera de ouro em tamanho natural olhando para ninguém. No centro, sob uma luz branca e cruel, uma vitrine guarda uma máscara de vidro sem rosto. Não há guardas. Isso deveria ser bom.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a silent gallery of trophies and dark screens, a life-sized golden camera statue, at the center a lit glass display case holding a faceless glass mask under a harsh white spotlight, long shadows across the polished floor, no people. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the faceless glass mask inside the display case. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** A imagem não denuncia a isca. Se os jogadores desconfiarem de “fácil demais”, dê vantagem no teste de SAB CD 12.

---

### 13. A Cerimônia das Luzes: a marca da Obelisco

| | |
|---|---|
| **Quando mostrar** | Sala 3, durante o apagão. Mostre só quando alguém passar no teste de SAB CD 12. |
| **Para quem** | Só Mestre até o teste de SAB (depois, Jogadores) |
| **Proporção** | `16:9` |
| **Cor de destaque** | Verde tóxico (o obelisco) |

**Descrição da imagem**

A galeria às escuras, com a silhueta de quatro ladrões mascarados. As máscaras holográficas tremem e mostram por um instante uma marca: um obelisco fino e alto, brilhando em cada rosto.

**Texto narrativo** (ler em voz alta ou colar no chat)

> Tudo apaga. Câmeras, luzes, o zumbido do ar-condicionado. Por três minutos, só o escuro e a respiração de vocês. Então algo brilha à sua esquerda: a máscara do seu colega treme, falha como uma imagem ruim, e por um instante, no lugar do rosto de mentira, aparece um símbolo verde e fino, um obelisco. Some. Volta. Todas as máscaras fazem o mesmo, em silêncio, como se estivessem enviando uma mensagem.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a pitch black gallery with the silhouettes of four masked thieves standing close together, their holographic masks glitching and revealing for a moment a tall slim obelisk glyph that glows on each mask like a brand, faint glints on glass trophy cases. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon toxic green) used sparingly on the obelisk glyph glowing on each mask. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** O verde tóxico é a cor da Obelisco em todo o pacote. Quem decifrar o que o símbolo significa ganha uma ficha de Edge.

---

## Sala 4: O Corredor dos Rostos

### 14. O Corredor dos Rostos

| | |
|---|---|
| **Quando mostrar** | Início da Sala 4, 23:35. |
| **Para quem** | Jogadores |
| **Proporção** | `16:9` |
| **Cor de destaque** | Ciano elétrico (o visor de Rex) |

**Descrição da imagem**

O corredor de vidro do 61º andar, com centenas de rostos holográficos nas paredes virados para quem entra. No fundo, a porta do cofre e Rex, o robô de guarda, de smoking e máscara de caveira prateada. Duas colunas de vidro oferecem cobertura.

**Texto narrativo** (ler em voz alta ou colar no chat)

> A luz volta devagar. O corredor do 61º é todo de vidro, e das paredes centenas de rostos holográficos viram a cabeça ao mesmo tempo para olhar para vocês, sorrindo, chorando, gritando sem som. No fim do corredor, uma porta de cofre. Na frente dela, algo enorme de smoking e máscara de caveira prateada, com um visor azul aceso por trás. Ele não respira. Ele só estala os dedos de metal, um por um. “Intrusos detectados. Protocolo de contenção ativado. Por favor, não resistam.”

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a long glass corridor lined with hundreds of holographic faces on the walls all turned toward the viewer, two thick glass columns, at the end a massive vault door guarded by a hulking steel robot wearing a tuxedo jacket and a silver skull mask with a glowing visor behind it. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the robot's visor. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** Use como fundo da luta. As duas colunas de vidro dão cobertura (+2 de CA contra Taser, Rede e Metralhadora) e o Mural de Rostos cobre as paredes.

---

### 15. Rex, Modo Contenção

| | |
|---|---|
| **Quando mostrar** | Sala 4, ao revelar o Rex de perto ou ao iniciar o combate. |
| **Para quem** | Jogadores |
| **Proporção** | `3:4` |
| **Cor de destaque** | Ciano elétrico (o visor e o arco do taser) |

**Descrição da imagem**

Rex, Robô de Exclusão, em Modo Contenção: casco de aço fosco sob um smoking de gala e uma máscara de caveira prateada, taser na mão direita, lançador de rede no antebraço e as palmas abertas num gesto de cortesia assustadora.

**Texto narrativo** (ler em voz alta ou colar no chat)

> Rex gira o tronco inteiro de uma vez, sem articular o pescoço. O smoking se estica nos ombros largos demais e, por baixo do tecido, o casco range. Na mão direita, um taser estala azul. No antebraço esquerdo, o cano de um lançador de rede aponta para o chão, paciente. Ele abre as palmas num gesto quase gentil. “Protocolo de contenção ativado. Será mais fácil se vocês dormirem.”

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a hulking matte-steel guard robot wearing a stretched tuxedo jacket and a silver skull mask, a crackling electric taser in his right fist, a net launcher mounted on his left forearm, palms open in an eerily polite gesture, a glowing visor behind the mask. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the robot's visor and the arc of the taser. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 3:4 --v 6.0 --style raw
```

**Dica do Mestre:** Esta imagem vale como ficha visual do Rex. Mostre quando alguém tentar Ping ou hack e o programa retornar “sem sinal”.

---

### 16. Rex, Modo Letal

| | |
|---|---|
| **Quando mostrar** | Sala 4, quando Rex chega à metade do HP ou o Alerta chega a 4. |
| **Para quem** | Jogadores |
| **Proporção** | `3:4` |
| **Cor de destaque** | Vermelho néon (o visor) |

**Descrição da imagem**

O mesmo robô em Modo Letal: smoking rasgado nas costas, dois canhões de ombro abertos, lâminas monofio saindo dos punhos, máscara de caveira rachada e o visor em vermelho.

**Texto narrativo** (ler em voz alta ou colar no chat)

> Algo estala dentro do peito de Rex. O visor passa do azul ao vermelho, o smoking se rasga nas costas como uma pele velha e dois canhões de ombro se desdobram com um zumbido molhado de óleo. Das juntas dos punhos, lâminas finas deslizam para fora. “Protocolo de erradicação iniciado.” A voz dele ainda é a de um mordomo. Isso é o pior.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: the same hulking steel guard robot with his tuxedo jacket torn open down the back, two shoulder cannons unfolded, monofilament blades extended from his knuckles, silver skull mask cracked over a glowing red visor, steam and sparks venting from his joints, lunging toward the viewer. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the robot's glowing red visor. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 3:4 --v 6.0 --style raw
```

**Dica do Mestre:** Mostre ao lado da imagem do Modo Contenção. O contraste é o susto.

---

### 17. O Mural em curto-circuito

| | |
|---|---|
| **Quando mostrar** | Sala 4, quando alguém atirar no Mural de Rostos ou atrair Rex para perto da parede. |
| **Para quem** | Jogadores |
| **Proporção** | `16:9` |
| **Cor de destaque** | Âmbar néon (faíscas e arcos) |

**Descrição da imagem**

As faces holográficas da parede se estilhaçam em faíscas e arcos elétricos quando um painel explode. As sombras dos combatentes e a silhueta enorme de Rex se projetam no chão de vidro.

**Texto narrativo** (ler em voz alta ou colar no chat)

> O tiro acerta o Mural e cem rostos gritam ao mesmo tempo. A parede explode em faíscas, o holograma se desfaz em pixels e um arco de eletricidade corre pela moldura feito uma serpente. Todas as sombras do corredor dançam no chão: as de vocês, pequenas, e a dele, enorme, parada bem ao lado da parede que morde.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: holographic faces on a glass corridor wall shattering into pixels and arcing electricity from an exploded panel, violent sparks showering the floor, long dramatic shadows of small combatants and the huge silhouette of a robot cast across the glass floor. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon amber) used sparingly on the electric arcs and showering sparks. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** Quem estiver Perto da parede faz DES CD 12 ou sofre 2d6. Rex também sofre, se estiver ali.

---

### 18. O Núcleo de guarda de Rex

| | |
|---|---|
| **Quando mostrar** | Sala 4, se Rex for derrubado. Entregue como item de butim. |
| **Para quem** | Jogadores |
| **Proporção** | `1:1` |
| **Cor de destaque** | Ciano elétrico (o núcleo) |

**Descrição da imagem**

O peito aberto do robô caído, mostrando o núcleo de guarda: uma esfera de cristal presa por cabos e suportes, ainda piscando. Butim Normal, 1 XP, 1 slot.

**Texto narrativo** (ler em voz alta ou colar no chat)

> Rex cai de joelhos, e o peito dele se abre com um suspiro de pressão. Lá dentro, preso por cabos grossos como veias, um núcleo de cristal do tamanho de uma maçã ainda pulsa, devagar, como um coração que não entendeu que acabou. A Aegis Vanta pagaria muito para ter isso de volta. Ou para saber quem o arrancou.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: close-up of a fallen steel robot's open chest cavity revealing a crystal sphere core held by thick cables and brackets, a faint pulse of light inside it, torn tuxedo fabric, wisps of smoke, rivets and small plates on the casing. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the pulsing crystal core. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 1:1 --v 6.0 --style raw
```

**Dica do Mestre:** Use como ícone do item no inventário do VTT.

---

## Sala 5: O Cofre da Diretoria

### 19. O Cofre da Diretoria

| | |
|---|---|
| **Quando mostrar** | Início da Sala 5, 23:50, quando a porta do cofre se abre. |
| **Para quem** | Jogadores |
| **Proporção** | `16:9` |
| **Cor de destaque** | Vermelho néon (o vinho na taça) |

**Descrição da imagem**

A sala branca do cofre, no 62º andar, com vidro do chão ao teto sobre a cidade. No centro, o Rosto Livre verdadeiro sobre a mesa. Lívia Aragão, sem máscara e vestida de branco, serve-se de vinho. Atrás dela, telas mostram o salão e o duelo do corredor em câmera lenta, e dois Drones de vigilância pairam ao redor.

**Texto narrativo** (ler em voz alta ou colar no chat)

> A porta do cofre se abre para uma sala tão branca que dói. O vidro vai do chão ao teto, e a cidade inteira brilha lá embaixo. Sobre a mesa, o Rosto Livre verdadeiro, vivo de luz. Do outro lado, sem máscara, uma mulher de branco gira uma taça de vinho. Atrás dela, as telas mostram o salão do Anel e vocês mesmos, minutos atrás, lutando no corredor em câmera lenta. “Chegaram cedo”, diz ela. “Eu apostei com meu assistente que seriam trinta minutos. Gostei do trailer.”

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a stark white vault room with floor-to-ceiling glass over a neon megacity, a gleaming translucent mask implant resting on a table, an elegant unmasked woman in a white suit sitting calmly and swirling a wine glass, a wall of screens behind her showing a ballroom and a slow motion fight, two small surveillance drones hovering beside her. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the wine in her glass. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** Inicie o cronômetro de 10 minutos reais assim que mostrar esta imagem.

---

### 20. Lívia Aragão

| | |
|---|---|
| **Quando mostrar** | Sala 5, quando ela se apresenta e explica a armadilha. |
| **Para quem** | Jogadores, quando ela se apresentar |
| **Proporção** | `3:4` |
| **Cor de destaque** | Vermelho néon (o botão de pânico) |

**Descrição da imagem**

Retrato de Lívia Aragão, Diretora de Conteúdo da Lumen: calorosa, elegante, sorriso gentil e olhos frios, com um dedo repousando sobre um botão de pânico embutido na mesa. Reflexo de telas minúsculas nos óculos.

**Texto narrativo** (ler em voz alta ou colar no chat)

> Lívia Aragão sorri como quem recebe velhos amigos. Calorosa, elegante, tranquila demais. O dedo indicador descansa sobre um botão vermelho embutido na mesa, como se fosse só um hábito. “Não precisam ficar nervosos. Vocês foram escolhidos por serem desconhecidos e descartáveis. Se forem sensatos, eu agradeço.”

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: portrait of an elegant warm-faced woman executive in a white suit, unmasked, a gentle smile with cold eyes, one finger resting on a recessed panic button set into a desk, reflections of tiny screens in her glasses. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the panic button. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 3:4 --v 6.0 --style raw
```

**Dica do Mestre:** O botão de pânico leva o Alerta a 4. Deixe-o visível para os jogadores calcularem o risco.

---

### 21. O Rosto Livre

| | |
|---|---|
| **Quando mostrar** | Sala 5, quando o grupo olha o Prêmio de perto. |
| **Para quem** | Jogadores |
| **Proporção** | `1:1` |
| **Cor de destaque** | Ciano elétrico (os filamentos e as rachaduras de luz) |

**Descrição da imagem**

O protótipo Rosto Livre, um implante neural em forma de máscara de vidro translúcido e microcircuitos, suspenso por cabos, com filamentos neurais finos como cabelos.

**Texto narrativo** (ler em voz alta ou colar no chat)

> O Rosto Livre flutua entre os cabos como uma segunda pele de vidro. Por dentro, filamentos finos como cabelo se movem sozinhos, procurando um rosto para vestir. Dizem que ele troca o seu rosto e a sua voz com um toque. É lindo e é assustador, e vale mais do que todas as suas vidas juntas.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a faceless mask-shaped neural implant prototype made of translucent glass and microcircuitry floating in a cradle of cables, hairline cracks of light across its surface, rows of tiny neural filaments reaching out like hair. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the neural filaments and cracks of light. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 1:1 --v 6.0 --style raw
```

**Dica do Mestre:** Use como ícone do Prêmio (Valioso, 3 XP).

---

### 22. O Dossiê do Desmascaramento

| | |
|---|---|
| **Quando mostrar** | Sala 5, se o grupo tentar “virar o jogo” ou baixar o Dossiê. |
| **Para quem** | Jogadores |
| **Proporção** | `3:2` |
| **Cor de destaque** | Verde tóxico (os fios e o obelisco) |

**Descrição da imagem**

O Dossiê do Desmascaramento, como um mural de conspiração holográfico: fotos, páginas tarjadas e fios ligando uma torre em anel (Lumen) a uma torre em obelisco (Obelisco). Quatro silhuetas desconhecidas no meio. Uma barra de download avança no canto.

**Texto narrativo** (ler em voz alta ou colar no chat)

> O arquivo abre como uma teia. Fotos de Aragão com executivos, contratos tarjados, mensagens entre a diretoria e uma equipe técnica que forjou a assinatura da Obelisco nas máscaras de vocês. Fios verdes ligam tudo a uma única linha: uma torre em forma de anel, uma torre em forma de obelisco e quatro silhuetas sem nome no meio. A barra de download avança, rodada por rodada.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a sprawling holographic conspiracy board floating over a terminal, photographs, redacted pages and torn contracts connected by thin strings linking a ring-shaped tower to a tall obelisk tower, four anonymous silhouettes in the middle, a download progress bar creeping in the corner. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon toxic green) used sparingly on the strings and the obelisk tower. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 3:2 --v 6.0 --style raw
```

**Dica do Mestre:** Redirecionar a transmissão exige hack de rua CD 15 no terminal. O download leva 1d4 rodadas e sobe o Alerta em 1 ao começar. Mostre a imagem de novo a cada rodada, com a barra mais cheia no VTT.

---

## Meia-noite e fuga

### 23. Meia-noite: o Desmascaramento

| | |
|---|---|
| **Quando mostrar** | Quando o cronômetro zerar ou o Alerta chegar a 4. |
| **Para quem** | Jogadores |
| **Proporção** | `16:9` |
| **Cor de destaque** | Vermelho néon (o relógio da meia-noite) |

**Descrição da imagem**

A fachada do Estúdio à meia-noite: o salão inteiro arrancando as máscaras na transmissão, rostos expostos nas telas gigantes e a cidade assistindo de milhares de janelas. As máscaras se desfazem em pixels.

**Texto narrativo** (ler em voz alta ou colar no chat)

> O relógio zera. Por um segundo o silêncio é total. Então o Estúdio inteiro acende em um único rosto: o de um convidado arrancando a máscara, e depois outro, e outro, mil rostos desfilando pelas telas gigantes enquanto as máscaras se desfazem em pixels. A cidade olha.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: a huge clock face reading midnight above the giant screens of a ring-shaped tower broadcasting a mass unmasking, a ballroom crowd tearing off holographic masks that dissolve into pixels, huge exposed faces filling the screens, countless tiny windows of a megacity below each glowing with the same broadcast. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the enormous midnight clock above the ring. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** Feche a narração conforme a tabela da Sala 5. Máscaras no rosto: “Na tela maior, quatro máscaras com a marca da Obelisco e uma palavra em letras de luz: LADRÕES.” Máscaras arrancadas ou Alerta 4: “E, entre mil rostos, a câmera encontra os de vocês, com nome e sobrenome.” Dossiê: “Então a tela maior muda, e a cidade lê o plano de Aragão, linha por linha.” Acordo: “A cidade vê exatamente o que a Diretora combinou.”

---

### 24. A Fuga pelo Anel desmascarado

| | |
|---|---|
| **Quando mostrar** | Fuga, lance 2: atravessar o Anel. |
| **Para quem** | Jogadores |
| **Proporção** | `16:9` |
| **Cor de destaque** | Vermelho néon (as luzes de gravação dos drones) |

**Descrição da imagem**

Os runners abrem caminho a cotoveladas em um mar de convidados desmascarados em pânico, entre máscaras quebradas no chão e drones com holofotes e câmeras.

**Texto narrativo** (ler em voz alta ou colar no chat)

> Mil rostos de repente reais, e nenhum sabe para onde correr. Máscaras quebradas estalam sob as botas de vocês. Drones com holofotes varrem o salão, e cada lente que passa quer um rosto. Quem carrega o butim sente cada olhar. Vocês só precisam chegar à rua, e é certo que os Seguranças virão atrás. A cidade inteira está vendo.

**Prompt**

```text
Art Direction: A gritty, old-school cyberpunk RPG illustration in a classic dark fantasy OSR style. Pure black and white pen and ink drawing, heavy crosshatching, stark chiaroscuro lighting, deep black shadows, retro zine aesthetic, highly detailed line art. Subject: masked thieves shoving through a tumultuous crowd of unmasked panicking partygoers in a curved glass ballroom, broken holographic masks scattered on the floor, floodlight drones sweeping, camera drones with red recording lights hovering above the crowd, one thief clutching a satchel to his chest. Color Scheme: Strictly grayscale and black ink, EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the red recording lights of the camera drones. Atmosphere: Gritty, lethal, high-contrast, traditional ink comic book style, raw and edgy, 1980s cyberpunk meets grimdark fantasy ink illustration. No smooth digital shading, only raw ink lines and bold spot color. --ar 16:9 --v 6.0 --style raw
```

**Dica do Mestre:** Lance 2 da Fuga: CAR ou DES CD 12, em grupo. Quem carrega o butim é o alvo. Mostre a imagem antes de pedir a rolagem.

---

## Quer mais imagens?

O mesmo prompt base serve para outras cenas. Troque só o **Subject**: por exemplo, os retratos dos seis runners prontos como tokens `1:1` (*a cyber-punk street samurai drawing a katana*, *a hacker jacked into a retro-terminal*), um close da Cache de Ruth aberta, ou o corredor do 61º visto de cima como mapa tático.
