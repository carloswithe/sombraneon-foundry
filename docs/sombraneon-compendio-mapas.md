# SombraNeon: Compêndio de Mapas Aleatórios

*100 battlemaps prontos para improviso, campanhas e aventuras pré-planejadas. Arte vetorial 2D flat, vista de cima, sem grade, para importar no Foundry VTT ou em qualquer outro VTT.*

## 1. O que é este compêndio

São **100 mapas táticos** em 10 categorias de 10 mapas cada. Cada mapa traz a **descrição para o Mestre**, as **áreas e pontos de interesse**, a **cobertura e os perigos**, **ganchos de uso**, **ameaças típicas** do Compêndio de Ameaças e um **prompt pronto para o Gemini**, na mesma direção de arte das aventuras (contorno preto grosso, cinza chapado, sem hachura e sem degradê, com **uma única cor neon** de destaque).

A ideia é simples: o grupo vai para onde você não planejou, você rola ou escolhe um mapa, coloca as miniaturas e joga. Os mapas são genéricos o bastante para servir em qualquer sessão e trazem o toque do universo (Colmeia, Zona, Mercado do Sétimo Andar, Rede) onde isso faz diferença.

Este arquivo é o **catálogo**. Duas peças acompanham:

| Arquivo | Para quê |
|---|---|
| `sombraneon-compendio-mapas-geracao.md` | Instruções para o Claude Code gerar as 100 imagens com o MCP do Gemini, conferir, ajustar o tamanho e nomear os arquivos |
| `sombraneon-compendio-mapas-foundry.md` | Instruções para o Claude Code montar o módulo do Foundry com os 100 mapas como cenas, diários e tabelas de sorteio |

## 2. Como usar na mesa

1. **Sorteie ou escolha.** Role **d10 para a categoria** e **d10 para o mapa** dentro dela (a tabela da seção 4), ou role **d100** e use o número do mapa (m001 a m100). Se o contrato já tem local, use a tabela por tipo de local.
2. **Leia a descrição e as áreas.** Elas dizem onde estão a cobertura, as saídas e o que cada ponto faz no jogo. Em 30 segundos você sabe onde posicionar o grupo e a oposição.
3. **Escolha as ameaças.** A linha *Ameaças típicas* sugere fichas do Compêndio para Rua, Corp e Elite. Some os NA e compare com a soma dos níveis do grupo: Fácil metade, Normal três quartos, Difícil igual, Mortal uma vez e meia.
4. **Use um gancho.** Cada mapa tem 2 ou 3 situações prontas. Pegue uma, troque os nomes e comece.
5. **Grade.** Todos os mapas foram pensados para **1 casa = 1,5 m** (Perto). Alcance Próximo é cerca de 6 casas. No Foundry, o módulo já configura a grade.

## 3. Grade, escala e tamanhos

| Grade | Proporção | Pixels no Foundry (100 px por casa) | Uso |
|---|---|---|---|
| 24 x 16 | 3:2 | 2400 x 1600 | Cômodos pequenos, becos, salas e cabines |
| 30 x 20 | 3:2 | 3000 x 2000 | Salas grandes e áreas médias (padrão) |
| 36 x 24 | 3:2 | 3600 x 2400 | Salões, pátios, ruas largas e conveses |
| 35 x 15 | 21:9 | 3500 x 1500 | Locais compridos: vagão, fuselagem, submarino, túnel |

Locais enormes (porta-aviões, porto, aeroporto, hospital) foram **divididos em vários mapas** por área, em vez de um mapa gigante e ilegível. Um porta-aviões, por exemplo, tem convoo, hangar e ponte.

## 4. Tabelas de sorteio

### 4.1 Por categoria (d10, depois d10)

| d10 | Categoria | Mapas |
|---|---|---|
| 1 | Ruas e exteriores urbanos | m001 a m010 |
| 2 | Corporativo e comercial | m011 a m020 |
| 3 | Lei e ordem | m021 a m030 |
| 4 | Saúde e ciência | m031 a m040 |
| 5 | Moradia e vida noturna | m041 a m050 |
| 6 | Indústria, porto e infraestrutura | m051 a m060 |
| 7 | Transporte e aeroportos | m061 a m070 |
| 8 | Navios, plataformas e bases militares | m071 a m080 |
| 9 | Cenários do universo SombraNeon | m081 a m090 |
| 10 | Subsolo, periferia e locais especiais | m091 a m100 |

Role d10 para a categoria. Depois role d10 outra vez: o resultado é a posição do mapa dentro da categoria (10 é o último).

### 4.2 Por tipo de local do contrato (d8 do livro, Cap. 10)

| d8 | Local do contrato | Mapas sugeridos |
|---|---|---|
| 1 | Torre corporativa | m011, m012, m013, m018, m019, m020, m009 |
| 2 | Laboratório ou clínica subterrânea | m031 a m040 |
| 3 | Armazém no porto ou zona industrial | m051 a m059, m098 |
| 4 | Boate de elite ou cassino | m044, m045, m046, m042, m049, m100 |
| 5 | Colmeia | m081, m082, m083, m084, m043, m004, m087 |
| 6 | Data center | m060, m012, m029, m089, m090 |
| 7 | Estação de transporte ou trem | m061, m062, m063, m064, m070, m092 |
| 8 | Zona abandonada | m085, m086, m091, m095, m098, m099 |

### 4.3 d100

Role d100 e use o número como id: 01 é m001, 57 é m057, 100 é m100.

## 5. Legenda da cor de destaque

Cada mapa tem **uma só cor neon**, num só ponto. Ela diz de relance o que importa na cena, como nas aventuras e nos livros.

| Cor | O que significa nos mapas |
|---|---|
| **Vermelho néon** | Perigo, alarme, tempo e violência: sirenes, lasers, scanners, fogo de ameaça |
| **Ciano elétrico** | Tecnologia, polícia, IA e hologramas: consoles, servidores, câmeras |
| **Verde tóxico** | Toxina, radiação, mutação e conspiração: vazamentos, tanques, resíduos |
| **Dourado néon** | O alvo, o dinheiro e quem manda: cofres, credsticks, VIPs |
| **Magenta néon** | Mídia, fama e vida noturna: letreiros, palcos, telas |
| **Âmbar néon** | Energia, fogo e faíscas: fornalhas, geradores, tambores em chamas |
| **Violeta néon** | Furtividade e o que está escondido: escotilhas, criptas, corredores de sombra |
| **Laranja néon** | Veículos, drones e rotas de fuga: faróis, pistas, rampas de saída |

## 6. Pacote essencial (os 20 primeiros)

Se você só vai gerar parte dos mapas agora, comece por estes. Eles cobrem a maioria das situações de improviso: rua, beco, escritório, delegacia, cadeia, hospital, clínica de beco, apartamento, boate, cassino, armazém, cais, estação, aeroporto, porta-aviões, Colmeia, Mercado, Zona e esgoto.

| Id | Mapa | Categoria |
|---|---|---|
| m001 | Cruzamento de avenida à noite | Ruas e exteriores urbanos |
| m002 | Beco sem saída | Ruas e exteriores urbanos |
| m011 | Saguão corporativo com catracas | Corporativo e comercial |
| m012 | Andar de escritórios open space | Corporativo e comercial |
| m021 | Delegacia de bairro, recepção e plantão | Lei e ordem |
| m024 | Cadeia, bloco de celas | Lei e ordem |
| m031 | Pronto-socorro lotado | Saúde e ciência |
| m036 | Clínica de implantes de beco | Saúde e ciência |
| m041 | Kitnet de runner | Moradia e vida noturna |
| m044 | Boate, pista de dança | Moradia e vida noturna |
| m046 | Cassino, salão de jogos | Moradia e vida noturna |
| m051 | Armazém portuário com contêineres empilhados | Indústria, porto e infraestrutura |
| m052 | Cais com guindastes e atracadouro | Indústria, porto e infraestrutura |
| m061 | Estação de maglev, plataformas e saguão | Transporte e aeroportos |
| m065 | Aeroporto, terminal de embarque | Transporte e aeroportos |
| m071 | Porta-aviões, convoo | Navios, plataformas e bases militares |
| m081 | Colmeia, pátio de contêineres empilhados | Cenários do universo SombraNeon |
| m084 | Mercado do Sétimo Andar | Cenários do universo SombraNeon |
| m085 | Zona abandonada, rua em ruínas | Cenários do universo SombraNeon |
| m091 | Esgoto, galeria e câmara de bombas | Subsolo, periferia e locais especiais |

## 7. Índice dos 100 mapas

| Id | Mapa | Categoria | Grade | Ambiente | Cor |
|---|---|---|---|---|---|
| m001 | Cruzamento de avenida à noite | Ruas e exteriores urbanos | 30 x 20 | Exterior, escuro | Laranja néon |
| m002 | Beco sem saída | Ruas e exteriores urbanos | 24 x 16 | Exterior, escuro | Violeta néon |
| m003 | Rua do mercado de camelôs | Ruas e exteriores urbanos | 36 x 24 | Exterior, penumbra | Dourado néon |
| m004 | Baixos de viaduto | Ruas e exteriores urbanos | 30 x 20 | Exterior, escuro | Âmbar néon |
| m005 | Praça com fonte e quiosques | Ruas e exteriores urbanos | 36 x 24 | Exterior, luz clara | Magenta néon |
| m006 | Estacionamento a céu aberto | Ruas e exteriores urbanos | 36 x 24 | Exterior, penumbra | Laranja néon |
| m007 | Posto de combustível 24h | Ruas e exteriores urbanos | 24 x 16 | Exterior, penumbra | Vermelho néon |
| m008 | Telhado com antenas e caixas d'água | Ruas e exteriores urbanos | 30 x 20 | Exterior, escuro | Ciano elétrico |
| m009 | Passarela de vidro entre torres | Ruas e exteriores urbanos | 36 x 24 | Misto, penumbra | Vermelho néon |
| m010 | Rodovia elevada com carros parados | Ruas e exteriores urbanos | 36 x 24 | Exterior, escuro | Laranja néon |
| m011 | Saguão corporativo com catracas | Corporativo e comercial | 30 x 20 | Interior, luz clara | Ciano elétrico |
| m012 | Andar de escritórios open space | Corporativo e comercial | 36 x 24 | Interior, luz clara | Violeta néon |
| m013 | Sala da diretoria com vista panorâmica | Corporativo e comercial | 24 x 16 | Interior, penumbra | Dourado néon |
| m014 | Agência bancária com salão de atendimento | Corporativo e comercial | 30 x 20 | Interior, luz clara | Dourado néon |
| m015 | Cofre do banco com porta circular | Corporativo e comercial | 24 x 16 | Interior, escuro | Vermelho néon |
| m016 | Shopping center com praça de alimentação | Corporativo e comercial | 36 x 24 | Interior, luz clara | Magenta néon |
| m017 | Supermercado de bairro | Corporativo e comercial | 30 x 20 | Interior, luz clara | Ciano elétrico |
| m018 | Garagem subterrânea de torre | Corporativo e comercial | 36 x 24 | Interior, escuro | Laranja néon |
| m019 | Núcleo de elevadores e escadas de emergência | Corporativo e comercial | 24 x 16 | Interior, penumbra | Vermelho néon |
| m020 | Cobertura com heliponto da torre | Corporativo e comercial | 30 x 20 | Exterior, escuro | Laranja néon |
| m021 | Delegacia de bairro, recepção e plantão | Lei e ordem | 30 x 20 | Interior, luz clara | Ciano elétrico |
| m022 | Sala de interrogatório e sala de observação | Lei e ordem | 24 x 16 | Interior, penumbra | Violeta néon |
| m023 | Depósito de evidências apreendidas | Lei e ordem | 30 x 20 | Interior, penumbra | Dourado néon |
| m024 | Cadeia, bloco de celas | Lei e ordem | 30 x 20 | Interior, penumbra | Vermelho néon |
| m025 | Pátio da cadeia com muros e torres | Lei e ordem | 36 x 24 | Exterior, luz clara | Laranja néon |
| m026 | Ala de segurança máxima | Lei e ordem | 30 x 20 | Interior, escuro | Dourado néon |
| m027 | Tribunal, salão de audiências | Lei e ordem | 30 x 20 | Interior, luz clara | Magenta néon |
| m028 | Posto de checagem da Guarda | Lei e ordem | 36 x 24 | Exterior, penumbra | Laranja néon |
| m029 | Central de monitoramento e câmeras | Lei e ordem | 30 x 20 | Interior, escuro | Ciano elétrico |
| m030 | Base da Guarda, garagem e armeiro | Lei e ordem | 36 x 24 | Interior, penumbra | Vermelho néon |
| m031 | Pronto-socorro lotado | Saúde e ciência | 30 x 20 | Interior, luz clara | Vermelho néon |
| m032 | Centro cirúrgico | Saúde e ciência | 24 x 16 | Interior, luz clara | Verde tóxico |
| m033 | UTI com leitos e monitores | Saúde e ciência | 30 x 20 | Interior, penumbra | Violeta néon |
| m034 | Necrotério e sala de autópsia | Saúde e ciência | 24 x 16 | Interior, escuro | Verde tóxico |
| m035 | Farmácia e almoxarifado hospitalar | Saúde e ciência | 24 x 16 | Interior, penumbra | Dourado néon |
| m036 | Clínica de implantes de beco | Saúde e ciência | 24 x 16 | Interior, penumbra | Ciano elétrico |
| m037 | Laboratório corporativo de pesquisa | Saúde e ciência | 30 x 20 | Interior, luz clara | Verde tóxico |
| m038 | Laboratório de clonagem e sintéticos | Saúde e ciência | 36 x 24 | Interior, penumbra | Ciano elétrico |
| m039 | Laboratório clandestino subterrâneo | Saúde e ciência | 30 x 20 | Interior, escuro | Verde tóxico |
| m040 | Câmara de criogenia e banco de órgãos | Saúde e ciência | 30 x 20 | Interior, penumbra | Violeta néon |
| m041 | Kitnet de runner | Moradia e vida noturna | 24 x 16 | Interior, penumbra | Magenta néon |
| m042 | Apartamento de luxo no alto da torre | Moradia e vida noturna | 30 x 20 | Interior, penumbra | Dourado néon |
| m043 | Corredor residencial da Colmeia | Moradia e vida noturna | 30 x 20 | Interior, escuro | Âmbar néon |
| m044 | Boate, pista de dança | Moradia e vida noturna | 36 x 24 | Interior, escuro | Magenta néon |
| m045 | Boate, camarotes e bastidores | Moradia e vida noturna | 30 x 20 | Interior, penumbra | Violeta néon |
| m046 | Cassino, salão de jogos | Moradia e vida noturna | 36 x 24 | Interior, penumbra | Dourado néon |
| m047 | Bar de beco | Moradia e vida noturna | 24 x 16 | Interior, penumbra | Magenta néon |
| m048 | Restaurante de macarrão de rua | Moradia e vida noturna | 24 x 16 | Misto, penumbra | Âmbar néon |
| m049 | Hotel, lobby e corredor de quartos | Moradia e vida noturna | 30 x 20 | Interior, penumbra | Violeta néon |
| m050 | Hotel-cápsula | Moradia e vida noturna | 30 x 20 | Interior, penumbra | Ciano elétrico |
| m051 | Armazém portuário com contêineres empilhados | Indústria, porto e infraestrutura | 36 x 24 | Interior, penumbra | Âmbar néon |
| m052 | Cais com guindastes e atracadouro | Indústria, porto e infraestrutura | 36 x 24 | Exterior, escuro | Âmbar néon |
| m053 | Pátio de contêineres a céu aberto | Indústria, porto e infraestrutura | 36 x 24 | Exterior, penumbra | Laranja néon |
| m054 | Fábrica, linha de montagem | Indústria, porto e infraestrutura | 36 x 24 | Interior, penumbra | Vermelho néon |
| m055 | Usina, sala de turbinas e reator | Indústria, porto e infraestrutura | 30 x 20 | Interior, penumbra | Verde tóxico |
| m056 | Subestação elétrica com arcos | Indústria, porto e infraestrutura | 30 x 20 | Exterior, escuro | Âmbar néon |
| m057 | Refinaria, torres e tanques | Indústria, porto e infraestrutura | 36 x 24 | Exterior, penumbra | Vermelho néon |
| m058 | Oficina e desmanche de carros | Indústria, porto e infraestrutura | 30 x 20 | Misto, penumbra | Laranja néon |
| m059 | Estação de tratamento de água | Indústria, porto e infraestrutura | 36 x 24 | Exterior, penumbra | Verde tóxico |
| m060 | Data center | Indústria, porto e infraestrutura | 30 x 20 | Interior, penumbra | Ciano elétrico |
| m061 | Estação de maglev, plataformas e saguão | Transporte e aeroportos | 36 x 24 | Interior, luz clara | Violeta néon |
| m062 | Estação de metrô subterrânea | Transporte e aeroportos | 36 x 24 | Interior, penumbra | Laranja néon |
| m063 | Vagão de maglev em movimento | Transporte e aeroportos | 35 x 15 | Interior, luz clara | Ciano elétrico |
| m064 | Terminal rodoviário | Transporte e aeroportos | 36 x 24 | Misto, luz clara | Laranja néon |
| m065 | Aeroporto, terminal de embarque | Transporte e aeroportos | 36 x 24 | Interior, luz clara | Ciano elétrico |
| m066 | Aeroporto, pista e hangar | Transporte e aeroportos | 36 x 24 | Exterior, escuro | Laranja néon |
| m067 | Avião de passageiros, fuselagem | Transporte e aeroportos | 35 x 15 | Interior, penumbra | Vermelho néon |
| m068 | Jato executivo e pátio de estacionamento | Transporte e aeroportos | 24 x 16 | Misto, penumbra | Dourado néon |
| m069 | Estação de aerotáxi no telhado | Transporte e aeroportos | 30 x 20 | Exterior, escuro | Laranja néon |
| m070 | Pátio de manobras ferroviário | Transporte e aeroportos | 36 x 24 | Exterior, penumbra | Âmbar néon |
| m071 | Porta-aviões, convoo | Navios, plataformas e bases militares | 36 x 24 | Exterior, luz clara | Laranja néon |
| m072 | Porta-aviões, hangar e oficina de aeronaves | Navios, plataformas e bases militares | 36 x 24 | Interior, penumbra | Âmbar néon |
| m073 | Ponte de comando de navio de guerra | Navios, plataformas e bases militares | 30 x 20 | Interior, penumbra | Ciano elétrico |
| m074 | Navio cargueiro, convés | Navios, plataformas e bases militares | 35 x 15 | Exterior, penumbra | Vermelho néon |
| m075 | Navio, casa de máquinas | Navios, plataformas e bases militares | 30 x 20 | Interior, escuro | Âmbar néon |
| m076 | Iate de luxo | Navios, plataformas e bases militares | 30 x 20 | Misto, penumbra | Dourado néon |
| m077 | Submarino, interior | Navios, plataformas e bases militares | 35 x 15 | Interior, escuro | Vermelho néon |
| m078 | Plataforma de petróleo | Navios, plataformas e bases militares | 36 x 24 | Exterior, penumbra | Âmbar néon |
| m079 | Base militar, portão e pátio | Navios, plataformas e bases militares | 36 x 24 | Exterior, penumbra | Vermelho néon |
| m080 | Bunker subterrâneo de comando | Navios, plataformas e bases militares | 30 x 20 | Interior, escuro | Ciano elétrico |
| m081 | Colmeia, pátio de contêineres empilhados | Cenários do universo SombraNeon | 36 x 24 | Exterior, penumbra | Vermelho néon |
| m082 | Colmeia, escadaria e corredores verticais | Cenários do universo SombraNeon | 30 x 20 | Interior, escuro | Âmbar néon |
| m083 | Oficina de cromo dos Cães de Vidro | Cenários do universo SombraNeon | 30 x 20 | Interior, penumbra | Ciano elétrico |
| m084 | Mercado do Sétimo Andar | Cenários do universo SombraNeon | 36 x 24 | Interior, penumbra | Dourado néon |
| m085 | Zona abandonada, rua em ruínas | Cenários do universo SombraNeon | 36 x 24 | Exterior, penumbra | Verde tóxico |
| m086 | Zona, subsolo e abrigo antiaéreo | Cenários do universo SombraNeon | 30 x 20 | Interior, escuro | Verde tóxico |
| m087 | Toca da equipe, esconderijo dos runners | Cenários do universo SombraNeon | 30 x 20 | Interior, penumbra | Magenta néon |
| m088 | Cripta de servidores da Congregação do Fantasma | Cenários do universo SombraNeon | 30 x 20 | Interior, escuro | Violeta néon |
| m089 | A Rede, planície de dados com ICE | Cenários do universo SombraNeon | 36 x 24 | A Rede, penumbra | Ciano elétrico |
| m090 | A Rede, catedral de servidores | Cenários do universo SombraNeon | 30 x 20 | A Rede, escuro | Violeta néon |
| m091 | Esgoto, galeria e câmara de bombas | Subsolo, periferia e locais especiais | 36 x 24 | Interior, escuro | Verde tóxico |
| m092 | Túnel de metrô abandonado | Subsolo, periferia e locais especiais | 35 x 15 | Interior, escuro | Violeta néon |
| m093 | Arena de mechas e luta clandestina | Subsolo, periferia e locais especiais | 36 x 24 | Interior, penumbra | Vermelho néon |
| m094 | Estúdio de transmissão ao vivo | Subsolo, periferia e locais especiais | 30 x 20 | Interior, luz clara | Magenta néon |
| m095 | Cemitério com mausoléus | Subsolo, periferia e locais especiais | 36 x 24 | Exterior, escuro | Violeta néon |
| m096 | Estrada rural e posto de gasolina abandonado | Subsolo, periferia e locais especiais | 36 x 24 | Exterior, penumbra | Laranja néon |
| m097 | Ponte sobre rio, tabuleiro e pilares | Subsolo, periferia e locais especiais | 35 x 15 | Exterior, penumbra | Laranja néon |
| m098 | Ferro-velho e aterro de sucata | Subsolo, periferia e locais especiais | 36 x 24 | Exterior, penumbra | Âmbar néon |
| m099 | Escola abandonada | Subsolo, periferia e locais especiais | 30 x 20 | Interior, escuro | Violeta néon |
| m100 | Teatro de ópera, palco e plateia | Subsolo, periferia e locais especiais | 36 x 24 | Interior, penumbra | Dourado néon |

## 8. Direção de arte dos mapas

A direção de arte é a das aventuras (ilustração **vetorial 2D flat**), com ajustes para o mapa funcionar na mesa:

- **Vista ortogonal de cima**, sem perspectiva, sem horizonte e sem céu.
- **Paredes e obstáculos sólidos em faixas pretas grossas.** Isso deixa o mapa legível e facilita traçar as paredes no Foundry depois.
- **Piso em cinzas chapados**, objetos em cinza médio com contorno preto grosso, uma única cor neon num só ponto.
- **Sem personagens, sem texto, sem números e sem linhas de grade.** A grade e os tokens entram no VTT.
- **Escala indicada no prompt:** porta com cerca de uma casa de largura, carro com cerca de três casas de comprimento. Os geradores nem sempre contam casas com exatidão, então o Foundry ajusta a escala do fundo na conferência.
- **Tom de luz** por mapa (claro, penumbra, escuro) controla o quanto de cinza escuro aparece no piso.

Os prompts abaixo estão em inglês (o gerador entende melhor) e em formato do **Gemini**: abrem com `Create an image`, com a proporção por escrito e sem parâmetros do Midjourney. O texto-base é idêntico em todos; só mudam o Subject (a cena), a cor e o foco.

## 9. Os mapas

### Categoria 1: Ruas e exteriores urbanos

Cruzamentos, becos, praças, estacionamentos, telhados e rodovias. O palco de perseguições, emboscadas e encontros ao ar livre.

<!-- MAP id="m001" cat="rua" nome="Cruzamento de avenida à noite" arquivo="m001-cruzamento-avenida.webp" grade="30x20" ar="3:2" ambiente="exterior" luz="escuro" entrada="sul" cor="neon orange" pacote="sim" -->
#### M001. Cruzamento de avenida à noite

| Campo | Valor |
|---|---|
| **Categoria** | Ruas e exteriores urbanos |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, escuro |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Laranja néon (os faróis de um sedã parado no meio do cruzamento) |
| **Arquivo** | `m001-cruzamento-avenida.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Duas avenidas de quatro faixas se cruzam no centro, com faixas de pedestre largas, semáforos nos quatro cantos e carros parados em ângulos aleatórios. Calçadas altas e postes de luz marcam as bordas, e um ponto de ônibus de vidro ocupa uma das esquinas. É o cenário padrão para perseguições a pé, emboscadas de gangue e tiroteios com a Guarda no meio do trânsito.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Cruzamento central | espaço aberto com carros de cobertura espalhados |
| Esquinas NE e SO | bancas e ponto de ônibus, boa cobertura |
| Calçadas | 2 casas de largura, entradas de lojas e becos |
| Faixa norte | fila de carros parados que bloqueia a fuga de veículos |

**Cobertura e perigos:** Carros dão cobertura +2 de CA e podem ser pulados com DES CD 9. Nas faixas laterais o tráfego ainda anda: DES CD 12 ou 2d6 de dano ao atravessar correndo.

**Ganchos de uso**

1. O alvo precisa atravessar o cruzamento a pé enquanto dois carros fecham a saída
2. Um caminhão da Guarda bloqueia a avenida e uma gangue aproveita para cobrar pedágio
3. Um aerocarro faz pouso de emergência e abre uma cratera no asfalto

**Ameaças típicas:** Rua: 3 Atiradores de gangue (NA 1) e 1 Motoqueiro (NA 2). Corp: Viatura da Guarda (NA 3) com 2 Policiais urbanos (NA 1).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a four-lane avenue crossing at night with two wide asphalt roads meeting in the center, zebra crossings on every side, traffic lights at each corner, a dozen stopped cars at random angles, a glass bus shelter on one corner, raised sidewalks with lamp posts and manhole covers, small newsstand kiosks on two corners, wet asphalt as flat gray blocks. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the headlights of a stalled sedan stopped in the middle of the crossing. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m002" cat="rua" nome="Beco sem saída" arquivo="m002-beco-sem-saida.webp" grade="24x16" ar="3:2" ambiente="exterior" luz="escuro" entrada="sul" cor="neon violet" pacote="sim" -->
#### M002. Beco sem saída

| Campo | Valor |
|---|---|
| **Categoria** | Ruas e exteriores urbanos |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, escuro |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Violeta néon (a escotilha de manutenção que brilha no fim do beco) |
| **Arquivo** | `m002-beco-sem-saida.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Um beco estreito de quatro casas de largura entre dois prédios cegos, com caçambas, caixas empilhadas, canos expostos e uma escada de incêndio que não alcança o chão. Termina em um muro com uma escotilha de manutenção que dá no esgoto. Serve para emboscadas, trocas clandestinas e fugas apertadas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Boca do beco | única entrada a pé, visível da rua |
| Caçambas | cobertura baixa e esconderijo para Ghost |
| Escada de incêndio | acesso aos telhados com DES CD 12 |
| Escotilha | saída secreta para o esgoto, CD 12 para abrir |

**Cobertura e perigos:** Caçambas e caixas dão cobertura +2 de CA. Canos quebrados soltam vapor quente: DES CD 12 ou 1d6 de dano ao atravessar.

**Ganchos de uso**

1. O contato marcou a troca aqui e a polícia já está na boca do beco
2. Um fugitivo se escondeu atrás das caçambas e jura que a escotilha estava aberta
3. Alguém deixou uma mala no fundo do beco e todo mundo quer abrir primeiro

**Ameaças típicas:** Rua: 2 Capangas (NA 1), 1 Viciado em stim (NA 0) e 1 Enxame de ratos (NA 1). Corp: Agente corporativo de campo (NA 4) com 2 Drones de vigilância (NA 1).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a narrow dead-end alley between two blank building walls, four squares wide and about sixteen long, overflowing dumpsters, stacked crates, exposed pipes venting steam, puddles, a fire escape ladder hanging above, a brick dead end at the far end with a round maintenance hatch cover in the ground, the rooftops of the two flanking buildings cut as thick black masses along both sides. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon violet) used sparingly on the glowing maintenance hatch at the dead end of the alley. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m003" cat="rua" nome="Rua do mercado de camelôs" arquivo="m003-mercado-camelos.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="penumbra" entrada="oeste" cor="neon gold" -->
#### M003. Rua do mercado de camelôs

| Campo | Valor |
|---|---|
| **Categoria** | Ruas e exteriores urbanos |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Dourado néon (o leitor de credstick brilhante da banca central) |
| **Arquivo** | `m003-mercado-camelos.webp` |

**Descrição:** Uma rua larga tomada por dezenas de barracas de lona, carrinhos de comida e mesas de contrabando, com corredores estreitos entre as bancas e fios de poste a poste. No centro, uma banca maior serve de ponto de encontro de fixers. É um mapa de multidão, ótimo para negociações, perseguições entre bancas e tumultos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Corredor principal | 3 casas de largura, por onde a multidão circula |
| Banca central | ponto de encontro de fixers e receptadores |
| Fileiras laterais | bancas coladas, terreno difícil |
| Travessas | duas saídas para becos nas pontas |

**Cobertura e perigos:** Bancas dão cobertura +2 de CA. A multidão densa é terreno difícil e dá desvantagem em furtividade (tumulto).

**Ganchos de uso**

1. O alvo compra algo na banca central e some na multidão
2. Um carregamento roubado está escondido sob uma lona e o dono quer de volta
3. Um ciberpsicopata surta no meio do mercado e a multidão estoura

**Ameaças típicas:** Rua: 6 Civis (NA 0), 1 Fixer (NA 1) e 2 Capangas (NA 1). Corp: Ciberpsicopata (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a crowded open-air street market with dozens of canvas-roofed stalls and food carts arranged in rows leaving narrow aisles, a larger central stall with a pavilion roof, thin cables strung between lamp posts, crates and tables of contraband, empty stools, side alleys opening at the edges of the frame, wet pavement as flat gray tones. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon gold) used sparingly on the glowing credstick reader on the large central stall. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m004" cat="rua" nome="Baixos de viaduto" arquivo="m004-baixos-viaduto.webp" grade="30x20" ar="3:2" ambiente="exterior" luz="escuro" entrada="norte" cor="neon amber" -->
#### M004. Baixos de viaduto

| Campo | Valor |
|---|---|
| **Categoria** | Ruas e exteriores urbanos |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, escuro |
| **Entrada dos runners** | Borda norte |
| **Cor de destaque** | Âmbar néon (o fogo dos tambores em chamas) |
| **Arquivo** | `m004-baixos-viaduto.webp` |

**Descrição:** Sob um viaduto de concreto com pilares grossos, há um acampamento improvisado de barracas, colchões e tambores de fogo, com pichações e carros queimados ao redor. Uma rampa de serviço sobe ao nível da pista. É território de gangue, abrigo de desabrigados e ponto de contrabando.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Pilares | fileira de cobertura sólida |
| Acampamento | barracas e colchões, terreno difícil |
| Rampa de serviço | sobe para o viaduto, rota de fuga |
| Carro queimado | cobertura e esconderijo de armas |

**Cobertura e perigos:** Pilares dão cobertura +2 de CA. Quem cai sobre um tambor em chamas sofre 1d6 de incêndio.

**Ganchos de uso**

1. Os Cães de Vidro cobram passagem de quem entra no acampamento
2. Um informante só fala debaixo do viaduto, longe das câmeras
3. Alguém acendeu os tambores de propósito para esconder uma fuga na fumaça

**Ameaças típicas:** Rua: Líder de gangue (NA 3), 3 Capangas (NA 1) e 1 Brutamontes cromado (NA 3). Corp: 2 Drones de combate (NA 2).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, the ground beneath a concrete overpass with thick square support pillars in two rows, a ragged camp of tents and mattresses, five oil drums with fires, wrecked burnt-out cars, a service ramp climbing along one side, graffiti-covered barriers, puddles of rainwater, shadow cast by the viaduct deck as a large flat dark gray band. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon amber) used sparingly on the fire in a cluster of burning oil drums. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m005" cat="rua" nome="Praça com fonte e quiosques" arquivo="m005-praca-fonte.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="claro" entrada="leste" cor="neon magenta" -->
#### M005. Praça com fonte e quiosques

| Campo | Valor |
|---|---|
| **Categoria** | Ruas e exteriores urbanos |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, luz clara |
| **Entrada dos runners** | Borda leste |
| **Cor de destaque** | Magenta néon (o pilar de publicidade holográfica no centro da praça) |
| **Arquivo** | `m005-praca-fonte.webp` |

**Descrição:** Uma praça circular de pedra com uma fonte seca no centro, canteiros, bancos, quatro quiosques e um pilar de publicidade holográfica. Quatro ruas desembocam nela e um metrô tem a entrada no canto sudoeste. É o lugar ideal para encontros públicos, protestos, vigilância e tiroteios com civis em volta.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Fonte central | anel de pedra, cobertura baixa |
| Quiosques | quatro estruturas fechadas com cobertura total |
| Canteiros e bancos | cobertura baixa em volta da praça |
| Entrada do metrô | escada que desce, rota de fuga |
| Pilar holográfico | bloqueia a linha de visão no centro |

**Cobertura e perigos:** Fonte, bancos e quiosques dão cobertura +2 de CA. Durante um tumulto, a multidão é terreno difícil.

**Ganchos de uso**

1. O alvo discursa na praça e os runners precisam agir sem estragar o comício
2. Uma transmissão ao vivo da Lumen pega o grupo em cena e o Alerta sobe
3. Um drone de vigilância paira sobre a fonte e todos precisam passar sem serem vistos

**Ameaças típicas:** Rua: 8 Civis (NA 0), 2 Policiais urbanos (NA 1). Corp: Tropa de choque (NA 3) com 1 Comandante de segurança (NA 5) e 1 Enxame de drones (NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a circular stone plaza with a dry round fountain in the center, a holographic advertising pylon beside it, four small closed kiosks around the ring, planters and long benches, four streets entering from the sides of the frame, a subway stairwell entrance in one corner, paving drawn as large flat gray tiles, lamp posts casting hard shapes. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon magenta) used sparingly on the holographic advertising pylon in the center of the plaza. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m006" cat="rua" nome="Estacionamento a céu aberto" arquivo="m006-estacionamento.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="penumbra" entrada="sul" cor="neon orange" -->
#### M006. Estacionamento a céu aberto

| Campo | Valor |
|---|---|
| **Categoria** | Ruas e exteriores urbanos |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Laranja néon (a cancela de saída iluminada) |
| **Arquivo** | `m006-estacionamento.webp` |

**Descrição:** Um estacionamento largo de asfalto com fileiras de vagas, cerca de trinta carros, canteiros de concreto e postes altos. A guarita fica junto à cancela e uma escada leva a uma passarela. As fileiras criam corredores naturais de tiro e de fuga.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Fileiras de carros | cobertura de sobra e corredores de tiro |
| Guarita e cancela | única saída de veículos |
| Canteiros | cobertura sólida entre as fileiras |
| Escada da passarela | saída a pé para o nível elevado |

**Cobertura e perigos:** Carros dão cobertura +2 de CA e explodem com dano de incêndio se alvejados com arma pesada. A cancela só abre com um hack de rua CD 9.

**Ganchos de uso**

1. O carro do alvo está estacionado em algum lugar das fileiras e o dono está voltando
2. A troca de reféns acontece no meio do estacionamento, com atiradores em volta
3. Os runners precisam roubar um carro específico antes que o alarme dispare

**Ameaças típicas:** Rua: 4 Atiradores de gangue (NA 1) e 2 Motoqueiros (NA 2). Corp: 3 Seguranças corporativas (NA 2) e Viatura da Guarda (NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an open-air asphalt parking lot with rows of marked parking spaces and about thirty parked cars, concrete planter islands between the rows, tall lamp posts, a small guard booth beside an exit barrier gate at one edge, a staircase to an overhead footbridge in a corner, painted lane arrows as flat shapes. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the lit exit barrier gate of the lot. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m007" cat="rua" nome="Posto de combustível 24h" arquivo="m007-posto-combustivel.webp" grade="24x16" ar="3:2" ambiente="exterior" luz="penumbra" entrada="sul" cor="neon crimson red" -->
#### M007. Posto de combustível 24h

| Campo | Valor |
|---|---|
| **Categoria** | Ruas e exteriores urbanos |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Vermelho néon (o sinalizador vermelho de corte de emergência das bombas) |
| **Arquivo** | `m007-posto-combustivel.webp` |

**Descrição:** Um posto com cobertura de aço sobre quatro bombas, uma loja de conveniência de vidro e uma lavagem de carros nos fundos. Tem tanques enterrados sob o piso e um caminhão-tanque parado de lado. Ótimo para tiroteios em que qualquer tiro errado pode explodir tudo.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Cobertura das bombas | quatro bombas e pilares de aço |
| Loja de conveniência | balcão, prateleiras e câmeras |
| Lavagem de carros | túnel estreito nos fundos |
| Caminhão-tanque | cobertura e bomba-relógio em potencial |

**Cobertura e perigos:** Pilares e balcões dão cobertura +2 de CA. Atingir uma bomba ou o caminhão com arma de fogo causa incêndio: 2d6 em raio Perto, DES CD 12 para metade.

**Ganchos de uso**

1. Um motorista de caminhão-tanque foi sequestrado e a carga é o que interessa
2. A equipe rival espera os runners na loja e o frentista é informante
3. Uma perseguição termina aqui, com o carro do alvo sem combustível

**Ameaças típicas:** Rua: 3 Capangas (NA 1) e 1 Atirador de gangue (NA 1). Corp: 2 Mercenários (NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a gas station with a large flat steel canopy over four fuel pumps on concrete islands, a glass convenience store with shelves and a counter, a narrow car wash tunnel at the back, a tanker truck parked sideways, underground tank covers in the pavement, a sign pole base, oil stains as flat dark shapes. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the red emergency shutoff beacon on the fuel pumps. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m008" cat="rua" nome="Telhado com antenas e caixas d'água" arquivo="m008-telhado-antenas.webp" grade="30x20" ar="3:2" ambiente="exterior" luz="escuro" entrada="leste" cor="electric cyan" -->
#### M008. Telhado com antenas e caixas d'água

| Campo | Valor |
|---|---|
| **Categoria** | Ruas e exteriores urbanos |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, escuro |
| **Entrada dos runners** | Borda leste |
| **Cor de destaque** | Ciano elétrico (o conjunto de antenas parabólicas que brilha no centro) |
| **Arquivo** | `m008-telhado-antenas.webp` |

**Descrição:** Um telhado plano com caixas d'água, antenas, dutos de ar-condicionado, uma casinha de máquinas e uma porta de acesso à escada. Parapeitos baixos cercam a borda e há uma passarela de metal até o prédio vizinho. Serve para duelos de atiradores, fugas de telhado em telhado e invasões por cima.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Casinha de máquinas | porta da escada e cobertura total |
| Antenas | grupo de pratos e mastros, ponto de hack |
| Caixas d'água | cobertura alta, vazam se atingidas |
| Passarela | liga ao prédio vizinho, 1 casa de largura |
| Parapeito | queda de 30 m, empurrar exige FOR CD 12 |

**Cobertura e perigos:** Dutos e caixas d'água dão cobertura +2 de CA. A borda sem parapeito oferece queda (1d6 por 3 m, ou seja, 10d6 daqui).

**Ganchos de uso**

1. O netrunner precisa chegar à torre de antenas para entrar na rede do prédio
2. Um atirador de elite domina o telhado vizinho e o grupo atravessa a passarela sob fogo
3. A fuga do prédio termina aqui, com um aerocarro de resgate atrasado

**Ameaças típicas:** Rua: 2 Atiradores de gangue (NA 1) e 1 Hacker de rua (NA 1). Corp: 1 Atirador de elite (NA 4), 1 Drone de combate (NA 2).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a flat building rooftop with two round water tanks, a cluster of satellite dishes and thin antenna masts, rows of air-conditioning units and square ducts, a small machinery shed with a stair access door, low parapet walls along the edges, a narrow metal footbridge leaving the frame toward a neighboring roof, gravel and vents as flat gray texture blocks. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the cluster of glowing satellite dishes in the middle of the rooftop. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m009" cat="rua" nome="Passarela de vidro entre torres" arquivo="m009-passarela-torres.webp" grade="36x24" ar="3:2" ambiente="misto" luz="penumbra" entrada="oeste" cor="neon crimson red" -->
#### M009. Passarela de vidro entre torres

| Campo | Valor |
|---|---|
| **Categoria** | Ruas e exteriores urbanos |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Misto (interior e exterior), penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Vermelho néon (o arco de scanner no meio da passarela) |
| **Arquivo** | `m009-passarela-torres.webp` |

**Descrição:** Uma passarela de vidro e aço liga duas torres a 200 metros do chão, com duas pontas em terraços de recepção, corrimãos largos e um arco de scanner no meio. Cabos de sustentação cortam o vão e o piso transparente mostra a cidade lá embaixo. É uma travessia obrigatória, boa para infiltração e perseguição.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Terraço oeste | entrada, bancos e vasos como cobertura |
| Arco de scanner | ponto de controle no meio da travessia |
| Passarela | 4 casas de largura, sem cobertura |
| Terraço leste | saguão da outra torre, portas blindadas |

**Cobertura e perigos:** A passarela é aberta: sem cobertura além dos bancos nos terraços. O vidro aguenta tiros leves, mas explosivos o estilhaçam e abrem um buraco (queda).

**Ganchos de uso**

1. Os runners precisam cruzar a passarela com um alvo disfarçado de executivo
2. Um sniper domina a travessia do outro lado e a Guarda fecha as portas atrás do grupo
3. Um apagão trava o scanner no meio do caminho e todos ficam presos

**Ameaças típicas:** Rua: 2 Seguranças corporativas (NA 2). Corp: 4 Seguranças corporativas (NA 2), 1 Agente corporativo de campo (NA 4) e 1 Torreta (NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a long glass and steel skybridge crossing the frame horizontally between two tower terraces, a security scanner arch in the middle, thick suspension cables crossing above as thin black lines, a see-through floor showing tiny city blocks far below as flat gray shapes, wide terraces at both ends with benches, planters and sliding glass doors. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the scanner arch halfway across the glass bridge. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m010" cat="rua" nome="Rodovia elevada com carros parados" arquivo="m010-rodovia-elevada.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="escuro" entrada="leste" cor="neon orange" -->
#### M010. Rodovia elevada com carros parados

| Campo | Valor |
|---|---|
| **Categoria** | Ruas e exteriores urbanos |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, escuro |
| **Entrada dos runners** | Borda leste |
| **Cor de destaque** | Laranja néon (a rampa de saída iluminada) |
| **Arquivo** | `m010-rodovia-elevada.webp` |

**Descrição:** Um trecho de rodovia elevada de seis faixas, com mureta lateral, um engarrafamento congelado e uma rampa de saída. Há carros batidos, um caminhão tombado e uma passarela de manutenção sob a pista. É o palco para perseguições, emboscadas a comboios e tiroteios com muito metal para se esconder.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Faixas congestionadas | carros colados dão cobertura contínua |
| Caminhão tombado | bloqueia três faixas, esconderijo de carga |
| Rampa de saída | única fuga de veículo |
| Muretas laterais | queda de 15 m, borda sem proteção |

**Cobertura e perigos:** Carros dão cobertura +2 de CA e bloqueiam a passagem de veículos. Atravessar as faixas de tráfego em movimento: DES CD 12 ou 2d6.

**Ganchos de uso**

1. Um comboio da Aegis Vanta transporta o alvo e os runners armam a emboscada no engarrafamento
2. A fuga de outro serviço termina aqui, com a Guarda atrás
3. O alvo abandona o carro e foge a pé entre os veículos parados

**Ameaças típicas:** Rua: 3 Motoqueiros (NA 2) e Technical de gangue (NA 3). Corp: Blindado de transporte (NA 6) com 4 Soldados de esquadrão (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an elevated six-lane highway segment with a concrete side barrier on both edges, a frozen traffic jam of cars and trucks at odd angles, an overturned cargo truck blocking three lanes, an exit ramp splitting off to one side, a maintenance catwalk running under the deck visible at the edge, lane markings as flat white dashes, streetlights casting hard flat shapes. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the lit exit ramp splitting off the highway. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

### Categoria 2: Corporativo e comercial

Torres, escritórios, bancos, shoppings, garagens e coberturas. O terreno das aventuras de infiltração e assalto.

<!-- MAP id="m011" cat="corp" nome="Saguão corporativo com catracas" arquivo="m011-saguao-corporativo.webp" grade="30x20" ar="3:2" ambiente="interior" luz="claro" entrada="sul" cor="electric cyan" pacote="sim" -->
#### M011. Saguão corporativo com catracas

| Campo | Valor |
|---|---|
| **Categoria** | Corporativo e comercial |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Ciano elétrico (a recepção holográfica no centro do saguão) |
| **Arquivo** | `m011-saguao-corporativo.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Um saguão amplo de mármore e vidro, com portas giratórias ao sul, uma recepção curva com projetor holográfico, uma linha de catracas biométricas e três elevadores ao fundo. Colunas largas, sofás e vasos criam cobertura, e uma escada lateral leva à mezanino. É o ponto de entrada clássico de qualquer assalto corporativo.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Portas giratórias | entrada principal, vigiada |
| Recepção | balcão curvo, recepcionista e câmeras |
| Catracas | filtro para os elevadores, hack de rua CD 12 |
| Colunas e sofás | cobertura em ilhas |
| Escada do mezanino | rota alternativa, câmeras |

**Cobertura e perigos:** Colunas e balcão dão cobertura +2 de CA. O piso polido é escorregadio: correr em tiro sem DES CD 9 derruba.

**Ganchos de uso**

1. O grupo entra disfarçado de visitantes e precisa passar pelas catracas sem disparar o Alerta
2. Um funcionário traidor deixa o crachá no balcão e a recepcionista está de olho
3. Um tiroteio estoura no saguão com civis em volta e o prédio entra em lockdown

**Ameaças típicas:** Rua: 2 Seguranças corporativas (NA 2) e 1 Executivo corporativo (NA 1). Corp: 4 Seguranças corporativas (NA 2), 1 Comandante de segurança (NA 5) e 1 Torreta (NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a spacious corporate lobby of marble and glass with revolving doors at the south edge, a curved reception desk with a holographic projector in the center, a line of biometric turnstile gates, three elevator doors on the far wall, thick square columns, sofas and large planters, a side staircase to a mezzanine, polished floor drawn as large flat light gray tiles. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the holographic reception desk in the middle of the lobby. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m012" cat="corp" nome="Andar de escritórios open space" arquivo="m012-andar-escritorios.webp" grade="36x24" ar="3:2" ambiente="interior" luz="claro" entrada="oeste" cor="neon violet" pacote="sim" -->
#### M012. Andar de escritórios open space

| Campo | Valor |
|---|---|
| **Categoria** | Corporativo e comercial |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Violeta néon (a porta da escada de emergência que brilha ao fundo) |
| **Arquivo** | `m012-andar-escritorios.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Um andar inteiro de escritório sem paredes, com fileiras de mesas, divisórias baixas, salas de reunião de vidro e uma copa. Duas salas fechadas guardam servidores e arquivos. A planta aberta favorece infiltração por trás das divisórias e tiroteios em que o inimigo some entre as mesas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Fileiras de mesas | divisórias baixas dão cobertura |
| Salas de vidro | reuniões, visibilidade total |
| Sala de servidores | porta com leitor, CD 12 para hackear |
| Copa | cozinha com porta dos fundos para a escada |
| Escada de emergência | saída lateral, alarme contra intrusos |

**Cobertura e perigos:** Divisórias e mesas dão cobertura +2 de CA. Paredes de vidro não protegem, mas escondem quem fica agachado.

**Ganchos de uso**

1. O alvo trabalha numa mesa específica e o grupo precisa localizá-lo sem alertar os colegas
2. Um vazamento de dados acontece a noite inteira: alguém ainda está logado
3. A segurança dispara o lockdown e as portas de vidro se fecham, dividindo o andar

**Ameaças típicas:** Rua: 8 Civis (NA 0), 2 Seguranças corporativas (NA 2). Corp: Netrunner corporativo (NA 3) com 3 Seguranças corporativas (NA 2) e 1 Drone de vigilância (NA 1).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a whole open-plan office floor with rows of desks separated by low dividers, glass-walled meeting rooms along one side, a small kitchenette with counters, two closed rooms in a corner, copiers and plant pots, an emergency stair door at the back wall, thin glass walls drawn as pale gray bands with black frames, carpet as a flat light gray tone. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon violet) used sparingly on the emergency stair door glowing faintly at the back of the floor. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m013" cat="corp" nome="Sala da diretoria com vista panorâmica" arquivo="m013-sala-diretoria.webp" grade="24x16" ar="3:2" ambiente="interior" luz="penumbra" entrada="leste" cor="neon gold" -->
#### M013. Sala da diretoria com vista panorâmica

| Campo | Valor |
|---|---|
| **Categoria** | Corporativo e comercial |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda leste |
| **Cor de destaque** | Dourado néon (o cofre de parede atrás da mesa do diretor) |
| **Arquivo** | `m013-sala-diretoria.webp` |

**Descrição:** Uma sala de canto no último andar, com janelas do chão ao teto, uma mesa de madeira escura em frente, um conjunto de sofás, um bar e uma sala de reunião ao lado. Um cofre de parede disfarçado atrás de um quadro guarda o que interessa. É o alvo final de muita invasão e cenário de negociações perigosas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Mesa do diretor | cobertura grossa no centro |
| Cofre de parede | oculto, CD 15 para achar e CD 15 para abrir |
| Sofás e bar | cobertura baixa e esconderijo |
| Janelas | vidro blindado, rapel possível |
| Sala de reunião | porta lateral, mesa comprida |

**Cobertura e perigos:** Mesa e sofás dão cobertura +2 de CA. As janelas resistem a tiros leves; granada de fragmentação abre um buraco de queda livre.

**Ganchos de uso**

1. O diretor está na sala e os runners precisam copiar os dados sem acordar a segurança
2. O cofre está vazio: alguém chegou antes
3. Uma reunião secreta com a Aegis Vanta acontece na sala e a prova está em cima da mesa

**Ameaças típicas:** Rua: 1 Executivo corporativo (NA 1) e 1 Segurança corporativa (NA 2). Corp: 1 Diretor (NA 3), 2 Agentes corporativos de campo (NA 4). Elite: Comandante de segurança (NA 5) e Operador de elite (NA 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a corner executive office on the top floor with floor-to-ceiling windows along two walls, a large dark wood desk, a seating area of leather sofas and a low table, a small bar counter, a side meeting room with a long table, a framed painting hanging over a hidden wall safe, thick carpet drawn as a flat dark gray tone. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon gold) used sparingly on the glowing wall safe behind the director's desk. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m014" cat="corp" nome="Agência bancária com salão de atendimento" arquivo="m014-agencia-bancaria.webp" grade="30x20" ar="3:2" ambiente="interior" luz="claro" entrada="sul" cor="neon gold" -->
#### M014. Agência bancária com salão de atendimento

| Campo | Valor |
|---|---|
| **Categoria** | Corporativo e comercial |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Dourado néon (a máquina de emissão de credsticks no fundo do salão) |
| **Arquivo** | `m014-agencia-bancaria.webp` |

**Descrição:** Um salão com guichês blindados ao fundo, uma fila de espera com bancos, uma máquina de emissão de credsticks, caixas eletrônicos e uma porta lateral dos funcionários. Atrás dos guichês ficam a gerência e o corredor que desce para o cofre. Perfeito para assaltos, tomadas de refém e golpes de infiltração.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Guichês blindados | balcão de vidro grosso com cobertura total |
| Fila e bancos | civis e cobertura baixa |
| Máquina de credsticks | alvo de hack, CD 15 |
| Gerência | sala fechada com cofre pequeno |
| Corredor do cofre | porta de segurança, leva ao mapa do cofre (m015) |

**Cobertura e perigos:** Guichês e bancos dão cobertura +2 de CA. O vidro dos guichês é à prova de balas leves; só armas pesadas atravessam.

**Ganchos de uso**

1. A equipe entra armada e precisa render o salão em 3 rodadas antes do alarme silencioso
2. Um cliente é o alvo e o grupo precisa extraí-lo sem chamar atenção
3. Uma gangue chega para o mesmo assalto e vira disputa de território

**Ameaças típicas:** Rua: 2 Seguranças corporativas (NA 2), 6 Civis (NA 0). Corp: 4 Seguranças corporativas (NA 2) e 1 Cobalto (NA 7, IA do banco, remota).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a bank branch customer hall with a long counter of armored glass teller windows along the back wall, waiting benches in rows, two ATM machines on a side wall, a credstick printing machine against the back, a door for staff at one side, a small manager office behind glass, marble floor drawn as a flat light gray tile pattern. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon gold) used sparingly on the glowing credstick printing machine at the back of the hall. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m015" cat="corp" nome="Cofre do banco com porta circular" arquivo="m015-cofre-banco.webp" grade="24x16" ar="3:2" ambiente="interior" luz="escuro" entrada="norte" cor="neon crimson red" -->
#### M015. Cofre do banco com porta circular

| Campo | Valor |
|---|---|
| **Categoria** | Corporativo e comercial |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda norte |
| **Cor de destaque** | Vermelho néon (a malha de lasers de segurança diante do cofre) |
| **Arquivo** | `m015-cofre-banco.webp` |

**Descrição:** Um corredor reforçado desemboca numa câmara quadrada com uma porta circular de cofre ao fundo, fileiras de cofres menores nas paredes laterais e uma malha de lasers no meio. Sensores de calor nos cantos e uma torreta no teto protegem a sala. É o clímax clássico de um assalto de infiltração.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Corredor de entrada | porta blindada e câmera |
| Malha de lasers | atravessar exige DES CD 15 ou o Alerta sobe |
| Cofres laterais | caixas de depósito, butim Normal ou Valioso |
| Porta circular | CD 18 para arrombar ou código |
| Torreta de teto | cobre toda a câmara |

**Cobertura e perigos:** Pouca cobertura: só os cofres menores (+2 de CA). Os lasers são perigo do ambiente: quem os dispara aciona o Alerta e fecha a porta de entrada.

**Ganchos de uso**

1. O butim está dentro e a equipe tem 10 minutos antes da troca de turno
2. Um funcionário abre a porta por dentro e mente que não sabe o código
3. Alguém já cortou o cofre por fora e o buraco leva à rede de esgoto

**Ameaças típicas:** Rua: 1 Torreta (NA 3) e 2 Seguranças corporativas (NA 2). Corp: 1 Robô de segurança (NA 4) com 3 Seguranças corporativas (NA 2) e 1 Cão cibernético (NA 2).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a reinforced bank vault chamber with a huge circular vault door set in the far wall, rows of smaller safe-deposit lockers lining both side walls, a grid of thin laser beams crossing the floor in the middle, a ceiling turret above the door, a heavy armored corridor door at the near edge, concrete floor as flat dark gray panels. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the red laser security grid in front of the vault door. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m016" cat="corp" nome="Shopping center com praça de alimentação" arquivo="m016-shopping-center.webp" grade="36x24" ar="3:2" ambiente="interior" luz="claro" entrada="sul" cor="neon magenta" -->
#### M016. Shopping center com praça de alimentação

| Campo | Valor |
|---|---|
| **Categoria** | Corporativo e comercial |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Magenta néon (o letreiro de neon da entrada do fliperama) |
| **Arquivo** | `m016-shopping-center.webp` |

**Descrição:** Um átrio central de dois andares visto de cima, com praça de alimentação no meio, corredores de lojas dos dois lados, escadas rolantes, um fliperama e um corredor de serviço escondido nos fundos. Mesas, vasos e quiosques cobrem o piso. Ótimo para tiroteios com civis, perseguições e encontros públicos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Praça de alimentação | mesas e cadeiras, cobertura baixa |
| Corredores de lojas | vitrines de vidro e portas de segurança |
| Escadas rolantes | ligam ao andar de cima, terreno difícil |
| Fliperama | sala escura com máquinas de cobertura |
| Corredor de serviço | atrás das lojas, saída para a doca |

**Cobertura e perigos:** Mesas viradas e quiosques dão cobertura +2 de CA. Tumulto de civis é terreno difícil e dá desvantagem em furtividade.

**Ganchos de uso**

1. O alvo almoça na praça de alimentação e a equipe precisa tirá-lo antes do reforço
2. Um ciberpsicopata surta em plena hora do rush e o shopping fecha as portas
3. Um contato só encontra o grupo no fliperama, com um chip escondido na máquina

**Ameaças típicas:** Rua: 8 Civis (NA 0), 3 Capangas (NA 1). Corp: 4 Seguranças corporativas (NA 2) e 1 Ciberpsicopata (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a shopping mall atrium seen from above with a central food court of round tables and chairs, two corridors of shop windows on either side, escalators in a diagonal pair, an arcade room with rows of machines, a hidden service corridor behind the shops, kiosks and large planters, a glass roof casting hard flat shadow stripes. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon magenta) used sparingly on the neon sign over the arcade entrance. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m017" cat="corp" nome="Supermercado de bairro" arquivo="m017-supermercado.webp" grade="30x20" ar="3:2" ambiente="interior" luz="claro" entrada="sul" cor="electric cyan" -->
#### M017. Supermercado de bairro

| Campo | Valor |
|---|---|
| **Categoria** | Corporativo e comercial |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Ciano elétrico (as portas de vidro das câmaras frias iluminadas) |
| **Arquivo** | `m017-supermercado.webp` |

**Descrição:** Um mercado de bairro com seis corredores de prateleiras, caixas na entrada, açougue e padaria nos fundos, câmaras frias e um depósito com doca. Os corredores estreitos favorecem emboscada e fuga. Funciona como cenário de assalto improvisado e como esconderijo.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Caixas e entrada | balcões e carrinhos, vidro frontal |
| Corredores de prateleiras | cobertura +2, linha de visão curta |
| Açougue e padaria | balcões longos e fornos |
| Câmaras frias | portas de vidro, congelam quem fica preso |
| Depósito e doca | saída traseira para o beco |

**Cobertura e perigos:** Prateleiras dão cobertura +2 de CA, mas derrubam em cadeia se atingidas com arma pesada. Trancado na câmara fria: CON CD 12 por hora ou 1d6.

**Ganchos de uso**

1. Um assalto improvisado dá errado e o grupo cai no meio do refém
2. O alvo se esconde na câmara fria e fala só com quem trouxer ração
3. Um carregamento ilegal chega pela doca nos fundos

**Ameaças típicas:** Rua: 2 Capangas (NA 1), 1 Atirador de gangue (NA 1) e 4 Civis (NA 0). Corp: 2 Seguranças corporativas (NA 2).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a neighborhood supermarket with six aisles of tall shelving seen from above, a row of checkout counters at the entrance with glass front doors, a butcher counter and bakery ovens at the back, large cooler doors along one side, a storage room and loading dock door in the corner, shopping carts scattered, tile floor as flat light gray squares. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the lit glass doors of the cold storage coolers. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m018" cat="corp" nome="Garagem subterrânea de torre" arquivo="m018-garagem-torre.webp" grade="36x24" ar="3:2" ambiente="interior" luz="escuro" entrada="leste" cor="neon orange" -->
#### M018. Garagem subterrânea de torre

| Campo | Valor |
|---|---|
| **Categoria** | Corporativo e comercial |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda leste |
| **Cor de destaque** | Laranja néon (a luz da rampa de saída) |
| **Arquivo** | `m018-garagem-torre.webp` |

**Descrição:** Um nível de garagem sob uma torre, com colunas grossas em grade, dezenas de carros, uma rampa de acesso, duas portas de elevador e uma guarita. Tubulações e lâmpadas piscando cortam a luz. Ideal para emboscadas a executivos, roubo de veículos e fugas pela rampa.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Colunas | cobertura sólida em grade |
| Carros | cobertura e esconderijo de armas |
| Rampa de acesso | única saída de veículos, câmera |
| Elevadores | sobem para o saguão, cartão de acesso |
| Guarita | controle de cancela e painel das câmeras |

**Cobertura e perigos:** Colunas e carros dão cobertura +2 de CA. Lâmpadas queimadas: cantos em escuridão total, vantagem em furtividade.

**Ganchos de uso**

1. O executivo chega de carro blindado e a equipe tem 30 segundos para agir
2. Um carro específico guarda a prova e está trancado
3. O alarme dispara e o portão da rampa começa a descer

**Ameaças típicas:** Rua: 3 Seguranças corporativas (NA 2). Corp: 4 Seguranças corporativas (NA 2), 1 Cão cibernético (NA 2) e Viatura da Guarda (NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an underground parking level beneath a skyscraper with a grid of thick concrete columns, rows of parked cars, a vehicle access ramp at one edge climbing out of frame, two elevator doors on a wall, a small guard booth at a barrier, exposed pipes and cable trays as thick dark bands, painted parking lines as flat white dashes on a dark floor. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the lit sign light over the vehicle exit ramp. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m019" cat="corp" nome="Núcleo de elevadores e escadas de emergência" arquivo="m019-nucleo-elevadores.webp" grade="24x16" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon crimson red" -->
#### M019. Núcleo de elevadores e escadas de emergência

| Campo | Valor |
|---|---|
| **Categoria** | Corporativo e comercial |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Vermelho néon (as luzes vermelhas de emergência sobre a porta da escada) |
| **Arquivo** | `m019-nucleo-elevadores.webp` |

**Descrição:** O miolo de um andar, com quatro elevadores em linha, uma antessala com painel de acesso, duas escadas de emergência com portas corta-fogo e um poço de serviço com escada de manutenção. É um gargalo de segurança, bom para escolta, emboscada e fuga vertical.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Antessala | painel de crachá e câmera |
| Elevadores | quatro portas, uma em manutenção |
| Escadas de emergência | portas corta-fogo, rota de fuga |
| Poço de serviço | escada de manutenção, vertical, DES CD 12 |
| Corredor leste | leva ao andar de escritórios |

**Cobertura e perigos:** Pouca cobertura: batentes e quinas (+2 de CA). Caixa de elevador aberta: queda de 1d6 por 3 m.

**Ganchos de uso**

1. O elevador para entre dois andares com o grupo dentro e os guardas descendo pela escada
2. O alvo usa o elevador privativo e só uma pessoa tem a senha
3. O grupo precisa subir 30 andares pelo poço de serviço antes do lockdown

**Ameaças típicas:** Rua: 2 Seguranças corporativas (NA 2). Corp: 3 Seguranças corporativas (NA 2), 1 Torreta (NA 3) e 1 Android de segurança (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a compact elevator core of an office tower with four elevator doors in a straight line, a small antechamber with a badge reader panel, two fire stair doors at opposite ends, a service shaft hatch and maintenance ladder in a corner, a short side corridor leaving the frame, thick concrete core walls as black masses, floor as flat gray tiles. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the red emergency lights above the stairwell door. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m020" cat="corp" nome="Cobertura com heliponto da torre" arquivo="m020-heliponto-torre.webp" grade="30x20" ar="3:2" ambiente="exterior" luz="escuro" entrada="oeste" cor="neon orange" -->
#### M020. Cobertura com heliponto da torre

| Campo | Valor |
|---|---|
| **Categoria** | Corporativo e comercial |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, escuro |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Laranja néon (o anel de luzes do heliponto) |
| **Arquivo** | `m020-heliponto-torre.webp` |

**Descrição:** O topo de uma torre com um heliponto circular, uma casinha de acesso, tanques de combustível, antenas e uma piscina vazia. Um vento forte varre o telhado e a borda tem parapeito baixo. Cenário de extração, fuga de última hora e confronto contra um helicóptero.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Heliponto | círculo aberto, sem cobertura |
| Casinha de acesso | porta da escada e cobertura total |
| Tanques de combustível | perigo de explosão |
| Antenas | postes finos e cobertura baixa |
| Piscina vazia | uma depressão de 1 casa para esconder |

**Cobertura e perigos:** Casinha e tanques dão cobertura +2 de CA. Tanques atingidos por arma pesada explodem (2d6, raio Perto). Vento forte: tiros longos têm desvantagem.

**Ganchos de uso**

1. O helicóptero de resgate chega atrasado e a segurança sobe pela escada
2. O alvo VIP embarca no heliponto e os runners precisam impedir
3. Um mecha sobe a torre pela fachada e aparece no parapeito

**Ameaças típicas:** Rua: 2 Seguranças corporativas (NA 2). Corp: 4 Soldados de esquadrão (NA 4) e 1 Drone de combate (NA 2). Elite: Helicóptero de ataque (NA 8).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, the roof of a skyscraper with a circular helipad painted with concentric rings in the center, a small stair access shed, three cylindrical fuel tanks, thin antenna masts, a drained rectangular swimming pool, low parapet walls around the edge, windsock pole, flat gray gravel texture blocks. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the ring of landing lights around the helipad. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

### Categoria 3: Lei e ordem

Delegacia, cadeia, tribunal, barreiras e bases da Guarda. Para fugas, resgates, interrogatórios e invasões.

<!-- MAP id="m021" cat="lei" nome="Delegacia de bairro, recepção e plantão" arquivo="m021-delegacia-recepcao.webp" grade="30x20" ar="3:2" ambiente="interior" luz="claro" entrada="sul" cor="electric cyan" pacote="sim" -->
#### M021. Delegacia de bairro, recepção e plantão

| Campo | Valor |
|---|---|
| **Categoria** | Lei e ordem |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Ciano elétrico (o balcão blindado com o painel de ocorrências) |
| **Arquivo** | `m021-delegacia-recepcao.webp` |
| **Pacote essencial** | Sim |

**Descrição:** A recepção de uma delegacia de bairro da Guarda Metropolitana. Há um balcão alto com vidro blindado, bancos de espera chumbados no chão, um detector de metais na porta, e portas internas para a sala de plantão, as celas de triagem e a escada do andar de cima. Cartazes de procurados cobrem as paredes. Serve para denúncias, fianças, resgates e tiroteios dentro da lei.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Porta e detector de metais | revista obrigatória, câmera no teto |
| Balcão blindado | policial de plantão atrás do vidro |
| Bancos de espera | civis e cobertura baixa |
| Sala de plantão | mesas, arquivos e armário de armas |
| Celas de triagem | duas celas pequenas à vista do balcão |
| Escada | leva ao arquivo e à investigação |

**Cobertura e perigos:** Balcão e mesas dão cobertura +2 de CA. O vidro do balcão resiste a tiros leves. Sacar arma no saguão faz o Alerta subir em 1.

**Ganchos de uso**

1. O grupo vem pagar a fiança de um contato e descobre que o preço mudou
2. Uma testemunha chave está sentada ali, esperando para depor, e há quem queira calá-la
3. Um preso ou policial corrupto passa um recado e o grupo tem 3 rodadas para pegá-lo antes do plantão trocar

**Ameaças típicas:** Rua: 3 Policiais urbanos (NA 1), 1 Drone de vigilância (NA 1) e 4 Civis (NA 0). Corp: 2 Tropas de choque (NA 3) com 1 Comandante de segurança (NA 5) chegando como reforço.

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, the reception hall of a city police station seen from above, a tall front desk behind thick armored glass, rows of benches bolted to the floor, a metal detector arch at the entrance door, a back room of desks and filing cabinets behind the desk, two small holding cells with bars along one wall, a staircase in the corner, wanted posters as flat dark rectangles on the walls, linoleum floor as flat light gray squares. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the armored front desk with its glowing case-file display panel. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m022" cat="lei" nome="Sala de interrogatório e sala de observação" arquivo="m022-sala-interrogatorio.webp" grade="24x16" ar="3:2" ambiente="interior" luz="penumbra" entrada="oeste" cor="neon violet" -->
#### M022. Sala de interrogatório e sala de observação

| Campo | Valor |
|---|---|
| **Categoria** | Lei e ordem |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Violeta néon (o espelho falso que separa as duas salas) |
| **Arquivo** | `m022-sala-interrogatorio.webp` |

**Descrição:** Duas salas coladas por um espelho falso. Na sala de interrogatório há uma mesa de aço, duas cadeiras, uma argola no piso e uma câmera no canto. Na sala de observação, uma bancada de monitores e um painel de gravação. Um corredor curto liga as duas aos fundos da delegacia. Ótima para cenas de negociação, tortura psicológica e fugas tensas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Sala de interrogatório | mesa de aço, argola no piso e câmera |
| Espelho falso | vidro grosso, dá para ouvir tudo |
| Sala de observação | monitores, gravador e telefone interno |
| Corredor de serviço | porta com leitor liga aos fundos |
| Armário de provas | gaveta com evidências do caso |

**Cobertura e perigos:** Pouca cobertura: a mesa de aço (+2 de CA) e a bancada. Sala fechada: ruídos de tiro alertam toda a delegacia na hora.

**Ganchos de uso**

1. O preso só fala se o grupo abrir a gravação e sair com ela
2. A equipe é que está sentada no interrogatório e precisa inverter o jogo
3. Um policial amigo deixa a porta de observação aberta e a câmera apagada por 5 minutos

**Ameaças típicas:** Rua: 2 Policiais urbanos (NA 1). Corp: 1 Agente corporativo de campo (NA 4) conduzindo o interrogatório e 2 Seguranças corporativas (NA 2).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, two small adjoining rooms separated by a one-way mirror drawn as a thin pale band, the left room with a steel table bolted to the floor, two chairs and a ring on the floor, the right room with a console bench of monitors and a recorder panel, a short service corridor with a keypad door, a corner camera in the ceiling, concrete floor as flat dark gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon violet) used sparingly on the one-way mirror between the two rooms. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m023" cat="lei" nome="Depósito de evidências apreendidas" arquivo="m023-deposito-evidencias.webp" grade="30x20" ar="3:2" ambiente="interior" luz="penumbra" entrada="oeste" cor="neon gold" -->
#### M023. Depósito de evidências apreendidas

| Campo | Valor |
|---|---|
| **Categoria** | Lei e ordem |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Dourado néon (a gaiola de armas apreendidas com o cadeado aceso) |
| **Arquivo** | `m023-deposito-evidencias.webp` |

**Descrição:** O porão de uma delegacia ou fórum onde ficam armas, drogas, dinheiro e dados apreendidos. Uma gaiola de armas, prateleiras com caixas etiquetadas, uma câmara frigorífica para evidência biológica e um cofre de dados cobrem o salão. A segurança é uma cadeia de leitores e um guarda de plantão. Alvo de roubo e de queima de arquivo.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Balcão de entrada | registro e guarda de plantão |
| Prateleiras de caixas | corredores apertados, cobertura |
| Gaiola de armas | CD 14 para arrombar, alarme |
| Câmara frigorífica | evidência biológica, perigo de frio |
| Cofre de dados | servidor isolado, hack CD 15 |
| Esteira de descarte | rampa para o incinerador |

**Cobertura e perigos:** Prateleiras e caixas dão cobertura +2 de CA. Um tiro errado pode atingir munição e provocar fogo (Perigo 2 do ambiente).

**Ganchos de uso**

1. A prova contra o grupo está numa caixa e será incinerada às 6h
2. Parte da Guarda vende o que apreende ao Mercado do Sétimo Andar e há um caderno com os nomes
3. Alguém chegou antes: a gaiola está aberta e um guarda desmaiou

**Ameaças típicas:** Rua: 2 Policiais urbanos (NA 1) e 1 Torreta (NA 3). Corp: 3 Seguranças corporativas (NA 2) e 1 Robô de segurança (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, the basement evidence storage of a police station, aisles of tall metal shelves with labeled boxes, a locked steel weapons cage in one corner, a walk-in cold room with a heavy door, a small data vault with a server rack, a front counter with a reader panel at the entrance, a chute conveyor to an incinerator, concrete floor as flat gray panels. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon gold) used sparingly on the weapons cage with a glowing electronic padlock. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m024" cat="lei" nome="Cadeia, bloco de celas" arquivo="m024-cadeia-bloco-celas.webp" grade="30x20" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon crimson red" pacote="sim" -->
#### M024. Cadeia, bloco de celas

| Campo | Valor |
|---|---|
| **Categoria** | Lei e ordem |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Vermelho néon (a cela do alvo com a porta eletrônica acesa) |
| **Arquivo** | `m024-cadeia-bloco-celas.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Um bloco de celas de dois lados, vistas de cima, com um corredor central e uma passarela de ronda. Cada cela tem beliche, vaso e porta de barras. No fundo ficam o posto dos guardas e o refeitório. Servem para resgates, motins, infiltração como detento e visitas arriscadas. A porta de acesso é uma eclusa de duas portas que nunca se abrem juntas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Eclusa de acesso | duas portas, só uma abre por vez |
| Corredor central | mesas fixas no chão, linha de visão livre |
| Celas | vinte celas, as do fundo são individuais |
| Posto dos guardas | console que abre todas as portas |
| Refeitório | mesas, bandejas e uma cozinha pequena |

**Cobertura e perigos:** Mesas e quinas dão cobertura +2 de CA. As barras não protegem de tiro. Um motim gera Tumulto (Perigo 6) em todo o bloco.

**Ganchos de uso**

1. O alvo tem 10 minutos antes da transferência e o console do posto é a chave
2. O grupo está preso aqui e precisa organizar uma fuga ou um motim
3. Um preso ameaçado pede proteção em troca de uma informação

**Ameaças típicas:** Rua: 4 Policiais urbanos (NA 1), 8 Civis (NA 0, detentos). Corp: 3 Tropas de choque (NA 3) e 1 Comandante de segurança (NA 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a prison cell block with two facing rows of ten cells with barred doors on either side of a central corridor, bolted tables in the middle, a raised guard station with a console at the far end, a small canteen with a counter, an airlock gate with two doors at the near edge, a metal catwalk along one wall, concrete floor as flat dark gray panels. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the target's cell with its glowing electronic door. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m025" cat="lei" nome="Pátio da cadeia com muros e torres" arquivo="m025-patio-cadeia.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="claro" entrada="oeste" cor="neon orange" -->
#### M025. Pátio da cadeia com muros e torres

| Campo | Valor |
|---|---|
| **Categoria** | Lei e ordem |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, luz clara |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Laranja néon (o portão de veículos no muro leste) |
| **Arquivo** | `m025-patio-cadeia.webp` |

**Descrição:** O pátio de recreio de uma prisão, cercado por muros altos e cerca eletrificada, com quatro torres de vigia nos cantos. Há uma quadra, um refeitório externo, uma lavanderia, um galpão de oficina e um portão de veículos. De dia, o pátio fica cheio. De noite, cães e holofotes varrem tudo. Perfeito para fugas e motins.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Quadra | espaço aberto, sem cobertura |
| Bancos e mesas | cobertura baixa e esconderijo |
| Lavanderia e oficina | prédios com portas de ferro |
| Torres de vigia | atiradores com campo livre |
| Portão de veículos | caminhão de entrega, saída de fuga |
| Cerca eletrificada | DES CD 12 ou 2d6 de dano elétrico |

**Cobertura e perigos:** Bancos e muretas dão cobertura +2 de CA. O pátio aberto expõe a quem corre às torres: atiradores ganham +2 no ataque contra alvos sem cobertura.

**Ganchos de uso**

1. O caminhão da lavanderia sai ao meio-dia e é a única saída
2. Uma briga entre gangues vira motim e abre uma brecha
3. O grupo vem num comboio blindado e invade pelo portão

**Ameaças típicas:** Rua: 6 Policiais urbanos (NA 1), 8 Civis (NA 0, detentos). Corp: 2 Atiradores de elite (NA 4) nas torres, 2 Cães cibernéticos (NA 2) e 1 Comandante de segurança (NA 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an open prison yard seen from above, tall concrete perimeter walls with a double electric fence, four corner watchtowers, a basketball court with painted lines, bolted benches and tables, a laundry building and a workshop shed with iron doors, a vehicle gate in the east wall, searchlight cones as flat pale wedges, concrete ground as flat light gray. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the vehicle gate in the east wall. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m026" cat="lei" nome="Ala de segurança máxima" arquivo="m026-ala-seguranca-maxima.webp" grade="30x20" ar="3:2" ambiente="interior" luz="escuro" entrada="norte" cor="neon gold" -->
#### M026. Ala de segurança máxima

| Campo | Valor |
|---|---|
| **Categoria** | Lei e ordem |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda norte |
| **Cor de destaque** | Dourado néon (a cela de contenção do prisioneiro mais valioso) |
| **Arquivo** | `m026-ala-seguranca-maxima.webp` |

**Descrição:** A ala mais fechada da prisão, com um corredor em anel, oito celas individuais de aço maciço, uma cela de contenção especial no centro e um posto de comando blindado. Cada porta exige duas credenciais. Câmeras e torretas varrem todo o anel. É onde ficam os presos que alguém quer morto ou protegido.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Eclusa dupla | duas portas, duas credenciais |
| Corredor em anel | torretas nos cantos |
| Celas individuais | oito portas de aço, olho mágico |
| Cela de contenção | parede dupla com ventilação isolada |
| Posto de comando | sala blindada com todas as chaves |

**Cobertura e perigos:** Quase sem cobertura no anel: só os batentes das celas (+2 de CA). As torretas cobrem todo o corredor.

**Ganchos de uso**

1. O alvo é um prisioneiro VIP e o grupo precisa extraí-lo antes que alguém o mate
2. Um executivo quer que a prisioneira diga uma coisa antes de morrer
3. Uma IA da Aegis Vanta gerencia a ala e um defeito abriu duas portas sem aviso

**Ameaças típicas:** Corp: 4 Seguranças corporativas (NA 2), 2 Torretas (NA 3) e 1 Android de segurança (NA 4). Elite: 2 Operadores de elite (NA 5) e 1 Comandante de esquadrão (NA 6).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a maximum security prison wing with a ring-shaped corridor around a central block, eight solid steel cell doors with small viewing slots along the outer edge, a special double-walled containment cell in the center, a reinforced guard command post with a door at the north edge, ceiling turrets in the four corners, black steel walls, concrete floor as flat dark gray panels. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon gold) used sparingly on the containment cell of the highest-value prisoner. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m027" cat="lei" nome="Tribunal, salão de audiências" arquivo="m027-tribunal.webp" grade="30x20" ar="3:2" ambiente="interior" luz="claro" entrada="sul" cor="neon magenta" -->
#### M027. Tribunal, salão de audiências

| Campo | Valor |
|---|---|
| **Categoria** | Lei e ordem |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Magenta néon (o banco do juiz sob o painel de transmissão ao vivo) |
| **Arquivo** | `m027-tribunal.webp` |

**Descrição:** Um salão de tribunal com galeria de assentos, mureta, mesas de acusação e defesa, banco do juiz elevado, tribuna do réu, bancada do júri e uma área para a imprensa com drones da Lumen filmando tudo. Uma porta lateral leva ao corredor dos presos e outra, aos gabinetes. Palco de julgamentos, tiroteios públicos e depoimentos decisivos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Galeria de assentos | fileiras que protegem em ilhas |
| Mesas de acusação e defesa | cobertura sólida |
| Banco do juiz | elevado, cobertura total |
| Bancada do júri | assentos atrás de uma mureta |
| Área da imprensa | drones e câmeras |
| Porta dos presos | leva a celas e ao corredor de fuga |

**Cobertura e perigos:** Assentos e mesas dão cobertura +2 de CA. Qualquer tiro no salão sai ao vivo: o Alerta sobe em 2 se a imprensa estiver presente.

**Ganchos de uso**

1. A testemunha depõe hoje e o grupo precisa garantir que ela chegue ao banco
2. O réu é um amigo e o plano é libertá-lo sem violência, usando a própria lei
3. Um atirador na galeria escolhe o alvo durante o julgamento

**Ameaças típicas:** Rua: 3 Policiais urbanos (NA 1), 10 Civis (NA 0), 2 Drones de vigilância (NA 1). Corp: 3 Seguranças corporativas (NA 2) e 1 Atirador de elite (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a courtroom seen from above, rows of public gallery seats in the lower half, a low rail dividing the room, two tables for prosecution and defense, an elevated judge's bench against the back wall, a jury box of two rows on one side, a witness stand, a press corner with camera drones as small circles, a side door for prisoners, polished wood floor as flat medium gray. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon magenta) used sparingly on the judge's bench under the live broadcast display panel. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m028" cat="lei" nome="Posto de checagem da Guarda" arquivo="m028-posto-checagem.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="penumbra" entrada="sul" cor="neon orange" -->
#### M028. Posto de checagem da Guarda

| Campo | Valor |
|---|---|
| **Categoria** | Lei e ordem |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Laranja néon (o pórtico scanner sobre as faixas de entrada) |
| **Arquivo** | `m028-posto-checagem.webp` |

**Descrição:** Um posto de checagem na entrada de um distrito, com três faixas de entrada, um pórtico scanner, blocos de concreto, guaritas, uma fossa de inspeção de veículos e uma torre de comando. Uma cerca de arame fecha as laterais. Perfeito para passar contrabando, infiltrar-se num distrito fechado ou explodir tudo.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Faixas de entrada | três filas de veículos |
| Pórtico scanner | detecta metal, cromo e armas |
| Blocos de concreto | cobertura sólida |
| Guaritas | duas cabines blindadas |
| Fossa de inspeção | espaço para esconder alguém |
| Torre de comando | atirador e holofote |

**Cobertura e perigos:** Blocos de concreto e veículos dão cobertura +2 de CA. O pórtico revela cromo e armas: DES ou CAR CD 14 para burlá-lo.

**Ganchos de uso**

1. O comboio com o contrabando precisa passar sem inspeção
2. Os runners entram a pé fingindo ser trabalhadores com um passe falso
3. Um bloqueio é montado e a equipe está do lado errado, com um alvo no banco de trás

**Ameaças típicas:** Rua: 5 Policiais urbanos (NA 1), 2 Drones de vigilância (NA 1) e Viatura da Guarda (NA 3). Corp: 2 Tropas de choque (NA 3), 1 Atirador de elite (NA 4) e 1 Torreta (NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a district checkpoint seen from above, three vehicle lanes entering from the south edge, an arching scanner gantry across the lanes, rows of concrete barrier blocks, two armored guard booths, an inspection pit under one lane, a command tower in one corner with a searchlight wedge, chain link fences on both sides, asphalt as flat dark gray with painted white stop lines. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the scanner gantry arching over the entry lanes. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m029" cat="lei" nome="Central de monitoramento e câmeras" arquivo="m029-central-monitoramento.webp" grade="30x20" ar="3:2" ambiente="interior" luz="escuro" entrada="leste" cor="electric cyan" -->
#### M029. Central de monitoramento e câmeras

| Campo | Valor |
|---|---|
| **Categoria** | Lei e ordem |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda leste |
| **Cor de destaque** | Ciano elétrico (a parede de vídeo com dezenas de telas) |
| **Arquivo** | `m029-central-monitoramento.webp` |

**Descrição:** Uma sala escura e fria onde uma equipe de operadores vigia a cidade por centenas de câmeras. Há uma parede de vídeo ao fundo, fileiras de consoles, uma mesa elevada de supervisor, racks de servidores e uma copa pequena. Quem controla esta sala vê tudo. É o alvo de qualquer plano que precise de câmeras cegas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Parede de vídeo | telas gigantes com os feeds |
| Consoles dos operadores | três fileiras de mesas |
| Mesa do supervisor | elevada, painel de alarme |
| Racks de servidores | hack CD 14, alvo de sabotagem |
| Copa | porta dos fundos e cafeteira |

**Cobertura e perigos:** Consoles e racks dão cobertura +2 de CA. Atirar nos racks provoca Curto-circuito (Perigo 5) e derruba as câmeras do distrito.

**Ganchos de uso**

1. Alguém precisa apagar três minutos de vídeo para o grupo ficar invisível
2. Um operador vendeu uma gravação e o grupo precisa recuperá-la
3. A IA Argos monitora a sala e reconhece rostos, então o disfarce precisa ser bom

**Ameaças típicas:** Rua: 3 Seguranças corporativas (NA 2). Corp: 1 Netrunner corporativo (NA 3), 3 Seguranças corporativas (NA 2) e 2 Drones de vigilância (NA 1). Elite: Argos (IA, NA 6, remota).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a dark surveillance control room with a huge video wall of dozens of screens along the back wall, three rows of operator console desks facing it, a raised supervisor desk with an alarm panel, two server racks against a side wall, a small kitchenette corner with a counter, a keypad door at the east edge, cable runs as thin dark lines, carpet as flat dark gray. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the video wall with dozens of screens. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m030" cat="lei" nome="Base da Guarda, garagem e armeiro" arquivo="m030-base-guarda-garagem.webp" grade="36x24" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon crimson red" -->
#### M030. Base da Guarda, garagem e armeiro

| Campo | Valor |
|---|---|
| **Categoria** | Lei e ordem |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Vermelho néon (a jaula do armeiro com o rack de armas acesa) |
| **Arquivo** | `m030-base-guarda-garagem.webp` |

**Descrição:** A garagem de um distrito da Guarda: um galpão com viaturas estacionadas, rack de drones carregando, bomba de combustível, oficina, vestiário, sala de despacho e uma jaula de armeiro. Portas de enrolar fecham a frente. Serve para missões de sabotagem, roubo de viatura e emboscadas à polícia.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Viaturas estacionadas | seis veículos, cobertura sólida |
| Rack de drones | carregadores ligados à rede |
| Oficina | ferramentas, macaco, fossa de mecânico |
| Vestiário | armários e chuveiros |
| Despacho | mesa de rádio e mapa da cidade |
| Armeiro | jaula com armas e munição |

**Cobertura e perigos:** Viaturas dão cobertura +2 de CA. Um tiro na bomba de combustível provoca Incêndio (Perigo 2) e explosão (2d6, raio Perto).

**Ganchos de uso**

1. O grupo precisa de uma viatura para entrar num distrito fechado
2. O comando chamou a patrulha e todos saem em 2 minutos, deixando só o armeiro
3. Um policial amigo avisou que há uma ordem de captura e quer ajudar os runners a fugirem

**Ameaças típicas:** Rua: 4 Policiais urbanos (NA 1), 1 Drone de vigilância (NA 1) e 2 Viaturas da Guarda (NA 3). Corp: 3 Tropas de choque (NA 3) e 1 Comandante de segurança (NA 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a police garage hall seen from above, six patrol cars parked in two rows, a rack of charging drones along one wall, a mechanic workshop with a pit and a tool bench, a locker room with rows of lockers, a dispatch desk with a radio console and a city map, a caged armory in the back corner, a fuel pump island, rolling shutter doors at the south edge, concrete floor as flat dark gray panels. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the armory cage with its glowing weapon rack. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

### Categoria 4: Saúde e ciência

Hospitais, clínicas de beco, laboratórios e bancos de órgãos. Cirurgia, experimentos e contenções.

<!-- MAP id="m031" cat="saude" nome="Pronto-socorro lotado" arquivo="m031-pronto-socorro.webp" grade="30x20" ar="3:2" ambiente="interior" luz="claro" entrada="sul" cor="neon crimson red" pacote="sim" -->
#### M031. Pronto-socorro lotado

| Campo | Valor |
|---|---|
| **Categoria** | Saúde e ciência |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Vermelho néon (a luz vermelha do box de trauma) |
| **Arquivo** | `m031-pronto-socorro.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Um pronto-socorro de hospital público, cheio. Há uma recepção com triagem, uma sala de espera apertada, um corredor com macas, seis boxes de atendimento, um box de trauma e uma ala de observação. Médicos, enfermeiros e pacientes se espremem. É o cenário ideal para cenas de socorro, perseguição entre macas e tiroteios com muitos civis.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Recepção e triagem | balcão e câmera |
| Sala de espera | cadeiras presas, civis |
| Corredor das macas | terreno difícil, macas viram cobertura |
| Boxes de atendimento | cortinas e camas |
| Box de trauma | maca, desfibrilador e porta dupla |
| Entrada de ambulâncias | porta lateral para a rua |

**Cobertura e perigos:** Macas e balcões dão cobertura +2 de CA. A multidão gera Tumulto (Perigo 6) assim que tiros são disparados.

**Ganchos de uso**

1. Um dos runners chega ferido e precisa de cirurgia ou implante antes de morrer
2. O alvo é um paciente internado sob nome falso
3. Um ciberpsicopata em surto entra pela ambulância e o hospital entra em pânico

**Ameaças típicas:** Rua: 2 Policiais urbanos (NA 1), 12 Civis (NA 0), 2 Médicos de beco (NA 1, plantonistas). Corp: 3 Seguranças corporativas (NA 2) e 1 Ciberpsicopata (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a crowded hospital emergency room seen from above, a reception and triage desk near the entrance, a waiting area with rows of bolted chairs, a long corridor with several gurneys, six curtained treatment bays along one side, a large trauma bay with a central table and double doors, an ambulance entrance door in one corner, linoleum floor as flat light gray tiles. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the red emergency light over the trauma bay. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m032" cat="saude" nome="Centro cirúrgico" arquivo="m032-centro-cirurgico.webp" grade="24x16" ar="3:2" ambiente="interior" luz="claro" entrada="oeste" cor="toxic green" -->
#### M032. Centro cirúrgico

| Campo | Valor |
|---|---|
| **Categoria** | Saúde e ciência |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Verde tóxico (a mesa de cirurgia sob a luz cirúrgica) |
| **Arquivo** | `m032-centro-cirurgico.webp` |

**Descrição:** Duas salas de cirurgia lado a lado, uma sala de preparo com pias, um corredor estéril com armário de materiais e uma ante-sala de paramentação. A mesa cirúrgica fica no centro, sob um arranjo de focos. Equipamentos ocupam as paredes. Serve para operações de implante, cirurgias de emergência e assassinatos discretos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Sala cirúrgica A | mesa central e carrinhos de instrumentos |
| Sala cirúrgica B | igual, com robô cirúrgico |
| Sala de preparo | pias e esterilizador |
| Corredor estéril | portas de vai-e-vem |
| Ante-sala | armários e porta com cartão |

**Cobertura e perigos:** Mesa e carrinhos dão cobertura +2 de CA. Cortes de energia derrubam o robô cirúrgico e deixam o paciente em risco.

**Ganchos de uso**

1. O grupo precisa fazer uma cirurgia de implante com tempo curto e hostis do outro lado
2. Um chefe da Vitalis opera hoje e o grupo quer a atenção do cirurgião
3. Um sintético fugitivo está na mesa e precisa de reparo

**Ameaças típicas:** Rua: 2 Médicos de beco (NA 1). Corp: 3 Seguranças corporativas (NA 2) e 1 Robô de segurança (NA 4), usando a ficha para o robô cirúrgico.

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, two adjoining operating rooms with a central surgical table under a ring of ceiling lamps in each, wheeled instrument carts, a robotic surgical arm on a floor base, a scrub room with a row of sinks, a sterile corridor with swing doors, a small gowning anteroom with lockers and a keycard door, white tile floor as flat very light gray squares. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (toxic green) used sparingly on the operating table under the surgical lamp. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m033" cat="saude" nome="UTI com leitos e monitores" arquivo="m033-uti-hospital.webp" grade="30x20" ar="3:2" ambiente="interior" luz="penumbra" entrada="norte" cor="neon violet" -->
#### M033. UTI com leitos e monitores

| Campo | Valor |
|---|---|
| **Categoria** | Saúde e ciência |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda norte |
| **Cor de destaque** | Violeta néon (o leito do paciente-alvo ligado a um respirador) |
| **Arquivo** | `m033-uti-hospital.webp` |

**Descrição:** Uma UTI de 12 leitos em arco ao redor de um posto de enfermagem central, com monitores piscando e cortinas separando cada leito. A sala é fria e silenciosa, com bombas de infusão e respiradores zumbindo. Um alarme falso derruba a calma. Serve para cenas de visita, sabotagem de aparelhos e assassinatos silenciosos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Posto de enfermagem | balcão circular no centro |
| Leitos | doze camas com cortinas |
| Leito do alvo | isolado numa sala de vidro |
| Farmácia de plantão | armário trancado com sedativos |
| Sala de máquinas | geradores e oxigênio |
| Porta de entrada | eclusa com higienização |

**Cobertura e perigos:** Camas e o balcão dão cobertura +2 de CA. Tiros em respiradores ou tubos de oxigênio causam incêndio (Perigo 2).

**Ganchos de uso**

1. O paciente sabe de um segredo e vai morrer em poucas horas
2. Alguém desligou o respirador de um aliado e o grupo precisa religar a tempo
3. A IA Madre tranca a UTI quando percebe a invasão

**Ameaças típicas:** Rua: 2 Médicos de beco (NA 1) e 6 Civis (NA 0). Corp: 3 Seguranças corporativas (NA 2) e 1 Robô de segurança (NA 4). Elite: Madre (IA, NA 5, remota).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an intensive care unit with twelve beds arranged in an arc around a circular nursing station in the middle, thin curtains as pale gray bands between the beds, monitors and ventilators beside each bed as small dark shapes, one bed isolated in a glass room at the back, a locked medicine cabinet nook, a double airlock door at the north edge, vinyl floor as flat medium gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon violet) used sparingly on the target patient's bed connected to a ventilator. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m034" cat="saude" nome="Necrotério e sala de autópsia" arquivo="m034-necroterio.webp" grade="24x16" ar="3:2" ambiente="interior" luz="escuro" entrada="leste" cor="toxic green" -->
#### M034. Necrotério e sala de autópsia

| Campo | Valor |
|---|---|
| **Categoria** | Saúde e ciência |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda leste |
| **Cor de destaque** | Verde tóxico (a porta da câmara refrigerada de corpos) |
| **Arquivo** | `m034-necroterio.webp` |

**Descrição:** Um necrotério subterrâneo com câmara refrigerada, duas mesas de autópsia, bancada com instrumentos, escritório do patologista e um elevador de carga. O ar é gelado e parado. É um bom lugar para encontrar um corpo importante, recuperar um implante de um cadáver ou esconder alguém.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Câmara refrigerada | gavetas de corpos, frio forte |
| Mesas de autópsia | aço, ralos no piso |
| Bancada de instrumentos | serras, bisturis e amostras |
| Escritório do patologista | arquivos e computador |
| Elevador de carga | leva à garagem |

**Cobertura e perigos:** Mesas e bancadas dão cobertura +2 de CA. Preso na câmara fria: CON CD 12 por hora ou 1d6 de dano.

**Ganchos de uso**

1. Um corpo tem um implante que a equipe precisa extrair antes da cremação
2. Alguém saiu andando de uma gaveta e a equipe quer saber quem é
3. O patologista é informante e só abre a porta em troca de um favor

**Ameaças típicas:** Rua: 1 Civil (NA 0, patologista) e 2 Capangas (NA 1). Corp: 2 Seguranças corporativas (NA 2), 1 Android de segurança (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an underground morgue with a large refrigerated chamber of drawer-style body vaults along the back wall, two steel autopsy tables with floor drains in the center, a long instrument bench along one wall, a small pathologist office with a desk and a computer, a freight elevator door at the east edge, white tile floor as flat gray squares. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (toxic green) used sparingly on the door of the refrigerated body chamber. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m035" cat="saude" nome="Farmácia e almoxarifado hospitalar" arquivo="m035-farmacia-almoxarifado.webp" grade="24x16" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon gold" -->
#### M035. Farmácia e almoxarifado hospitalar

| Campo | Valor |
|---|---|
| **Categoria** | Saúde e ciência |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Dourado néon (o cofre de controlados atrás do balcão) |
| **Arquivo** | `m035-farmacia-almoxarifado.webp` |

**Descrição:** Uma farmácia de hospital com balcão de atendimento, prateleiras de remédios, um cofre de controlados e um almoxarifado de suprimentos nos fundos. O corredor de serviço dá para a doca. Ótima para roubo de medicamentos, stims e armas químicas, e para negociar com traficantes.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Balcão de atendimento | janela de vidro e câmera |
| Prateleiras de remédios | corredores estreitos |
| Cofre de controlados | CD 14 para arrombar |
| Almoxarifado | caixas de suprimentos |
| Doca de carga | porta traseira para um beco |

**Cobertura e perigos:** Prateleiras dão cobertura +2 de CA. Tiros em frascos liberam gás (Perigo 1) por 1d4 rodadas.

**Ganchos de uso**

1. Os runners precisam de um antídoto específico antes do amanhecer
2. Um traficante de stims usa a farmácia como fachada
3. O estoque de nanoreparos foi roubado e a segurança está de cabeça quente

**Ameaças típicas:** Rua: 2 Seguranças corporativas (NA 2) e 3 Capangas (NA 1). Corp: 3 Seguranças corporativas (NA 2) e 1 Torreta (NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a hospital pharmacy with a counter and a glass service window near the entrance, tall shelves full of boxed medicine in narrow aisles, a steel controlled-substances safe against the back wall, a storage room with stacks of crates and a ladder, a rear loading dock door, a small fridge row, tile floor as flat light gray squares. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon gold) used sparingly on the controlled-substances safe behind the counter. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m036" cat="saude" nome="Clínica de implantes de beco" arquivo="m036-clinica-implantes-beco.webp" grade="24x16" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="electric cyan" pacote="sim" -->
#### M036. Clínica de implantes de beco

| Campo | Valor |
|---|---|
| **Categoria** | Saúde e ciência |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Ciano elétrico (a cadeira de implantes com os braços robóticos) |
| **Arquivo** | `m036-clinica-implantes-beco.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Uma clínica clandestina escondida atrás de uma lavanderia. A recepção é um balcão com cortina, a sala de cirurgia tem uma cadeira reclinável com braços robóticos, uma bancada de peças e prateleiras de cromo usado. Nos fundos, uma sala de recuperação com três camas e uma saída para o beco. Perfeita para montar implantes, comprar cromo e esconder feridos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Recepção com cortina | balcão e campainha |
| Cadeira de implantes | braços robóticos e luz |
| Bancada de peças | cromo usado e ferramentas |
| Sala de recuperação | três camas e armário |
| Saída do beco | porta de ferro com trancas |

**Cobertura e perigos:** Bancada e camas dão cobertura +2 de CA. O espaço apertado favorece corpo a corpo e dá desvantagem em armas longas.

**Ganchos de uso**

1. O Hyperdoc deve um favor ao grupo, mas está sendo vigiado pela Vitalis
2. Um ferido grave chega e precisa de um implante que não está em estoque
3. A clínica foi invadida por cobradores de dívida do Banco Cobalto

**Ameaças típicas:** Rua: 3 Capangas (NA 1), 1 Médico de beco (NA 1, dono da clínica) e 1 Brutamontes cromado (NA 3). Corp: 2 Seguranças corporativas (NA 2).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a cramped back-alley implant clinic, a front counter with a curtain over the entrance, a surgery room with a reclining chair and two robotic arms overhead, a workbench cluttered with chrome prosthetic parts, shelves of used cybernetic limbs, a recovery room with three narrow beds, a heavy iron back door to an alley, concrete floor as flat gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the implant chair with robotic arms hovering over it. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m037" cat="saude" nome="Laboratório corporativo de pesquisa" arquivo="m037-laboratorio-corporativo.webp" grade="30x20" ar="3:2" ambiente="interior" luz="claro" entrada="sul" cor="toxic green" -->
#### M037. Laboratório corporativo de pesquisa

| Campo | Valor |
|---|---|
| **Categoria** | Saúde e ciência |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Verde tóxico (a câmara de amostras com o brilho tóxico) |
| **Arquivo** | `m037-laboratorio-corporativo.webp` |

**Descrição:** Um laboratório amplo, branco e limpo, com bancadas de pesquisa, capelas de exaustão, uma câmara de amostras, incubadoras e uma área de reunião envidraçada. Duas portas com cartão levam ao almoxarifado e ao escritório do pesquisador. Ótimo para roubo de dados, sabotagem e libertação de cobaias.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Bancadas de pesquisa | microscópios e computadores |
| Capelas de exaustão | janela de vidro e gás |
| Câmara de amostras | porta hermética, brilho tóxico |
| Incubadoras | culturas e animais |
| Escritório do pesquisador | servidor e arquivos |

**Cobertura e perigos:** Bancadas dão cobertura +2 de CA. Vidros quebrados liberam toxinas: Gás tóxico (Perigo 1) na área onde o frasco estourou.

**Ganchos de uso**

1. A pesquisa tem um dado que a equipe precisa copiar sem apagar os registros
2. Um pesquisador está dopado e precisa ser retirado vivo
3. Uma amostra viva fugiu da câmara e está solta pelo laboratório

**Ameaças típicas:** Rua: 3 Civis (NA 0, cientistas) e 2 Seguranças corporativas (NA 2). Corp: 4 Seguranças corporativas (NA 2), 1 Android de segurança (NA 4). Elite: Experimento fugido (NA 6).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a bright white research laboratory with rows of long research benches, fume hood cabinets along one wall, a sealed round-door sample chamber at the back, a bank of incubator units, a glass-walled meeting corner, a researcher office with a server rack behind a keycard door, a stockroom door, white tile floor as flat very light gray squares. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (toxic green) used sparingly on the sample chamber with a toxic glow. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m038" cat="saude" nome="Laboratório de clonagem e sintéticos" arquivo="m038-laboratorio-clonagem.webp" grade="36x24" ar="3:2" ambiente="interior" luz="penumbra" entrada="oeste" cor="electric cyan" -->
#### M038. Laboratório de clonagem e sintéticos

| Campo | Valor |
|---|---|
| **Categoria** | Saúde e ciência |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Ciano elétrico (os tanques de crescimento acesos no centro) |
| **Arquivo** | `m038-laboratorio-clonagem.webp` |

**Descrição:** Um salão da Kessler-Tanaka com fileiras de tanques cilíndricos onde corpos crescem, uma linha de montagem de androides, uma mesa de calibração, uma sala de controle envidraçada e uma câmara de descarte. Pessoas inteiras flutuam em líquido. É o cenário ideal para cenas de moral difícil, resgate de sintéticos e confrontos contra caçadores.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Tanques de crescimento | fileiras de corpos em líquido |
| Linha de montagem de androides | esteira e braços robóticos |
| Mesa de calibração | teste de obediência |
| Sala de controle | servidor com o código-mestre |
| Câmara de descarte | ácido e fornalha |

**Cobertura e perigos:** Tanques e esteiras dão cobertura +2 de CA, mas estouram com tiros e inundam o piso. A inundação gera Curto-circuito (Perigo 5) nas tomadas.

**Ganchos de uso**

1. O lote de sintéticos será transportado ao amanhecer e o grupo precisa libertá-los
2. O código-mestre de obediência está na sala de controle
3. Um tanque guarda um clone de um dos runners

**Ameaças típicas:** Corp: 3 Androides de segurança (NA 4), 2 Seguranças corporativas (NA 2) e 1 Caçador de sintéticos (NA 5). Elite: Madre (IA, NA 5, remota) ou Experimento fugido (NA 6).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a large cloning laboratory hall with two rows of tall cylindrical growth tanks filled with pale human-shaped silhouettes, an assembly line conveyor with robotic arms producing android bodies, a round calibration table with restraints, a glass-walled control room with consoles and a server rack, a disposal chamber with a furnace door in a corner, floor as flat dark gray panels with thick black pipe lines. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the glowing growth tanks in the middle of the hall. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m039" cat="saude" nome="Laboratório clandestino subterrâneo" arquivo="m039-laboratorio-clandestino.webp" grade="30x20" ar="3:2" ambiente="interior" luz="escuro" entrada="norte" cor="toxic green" -->
#### M039. Laboratório clandestino subterrâneo

| Campo | Valor |
|---|---|
| **Categoria** | Saúde e ciência |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda norte |
| **Cor de destaque** | Verde tóxico (o tanque de biomods fumegando no centro) |
| **Arquivo** | `m039-laboratorio-clandestino.webp` |

**Descrição:** Um laboratório improvisado sob um cais ou um prédio abandonado, com paredes de concreto úmido, canos aparentes, uma mesa de operações velha, tanques de biomods, jaulas com cobaias e uma sala de controle feita de contêineres. O ar é úmido e o piso, escorregadio. Serve para cenas de resgate, experimentos clandestinos e confrontos com mutantes.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Tanque de biomods | líquido tóxico e fumaça |
| Mesa de operações | couro rasgado e instrumentos |
| Jaulas | cobaias e mutantes presos |
| Sala de controle | contêiner com servidor e geradores |
| Escada de serviço | sobe para o cais |

**Cobertura e perigos:** Tanques, mesas e jaulas dão cobertura +2 de CA. O piso úmido dá desvantagem em corridas: DES CD 10 ou derruba.

**Ganchos de uso**

1. Os Filhos da Maré escondem aqui um laboratório roubado e o grupo é contratado para destruí-lo
2. Uma cobaia suplica ajuda e fala de um irmão que também foi levado
3. A corporação dona do lab chega para recuperar o material

**Ameaças típicas:** Rua: 4 Capangas (NA 1), 2 Mutantes da Zona (NA 3) e 1 Médico de beco (NA 1). Corp: 3 Seguranças corporativas (NA 2) e 1 Experimento fugido (NA 6).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a makeshift underground laboratory with damp concrete walls and exposed pipes, a cracked leather operating table in the center with a tool tray, a large steaming biomod tank with tubes, a row of animal cages along one wall, a control room built from two shipping containers with a generator, a service staircase at the north edge, floor as flat dark gray with flat puddle shapes in pale gray. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (toxic green) used sparingly on the steaming biomod tank in the center. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m040" cat="saude" nome="Câmara de criogenia e banco de órgãos" arquivo="m040-criogenia-banco-orgaos.webp" grade="30x20" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon violet" -->
#### M040. Câmara de criogenia e banco de órgãos

| Campo | Valor |
|---|---|
| **Categoria** | Saúde e ciência |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Violeta néon (a fileira de cápsulas de criogenia acesas) |
| **Arquivo** | `m040-criogenia-banco-orgaos.webp` |

**Descrição:** Uma câmara de criogenia com 12 cápsulas dispostas em duas fileiras, um banco de órgãos com geladeiras de vidro, uma sala de controle com o painel de energia e um corredor de manutenção com tubos de nitrogênio. A temperatura é baixa e o vapor sobe do piso. Serve para resgate, sabotagem e para esconder alguém que não deve ser encontrado.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Cápsulas de criogenia | doze câmaras com corpos |
| Banco de órgãos | geladeiras com etiquetas |
| Sala de controle | painel de energia, hack CD 14 |
| Corredor de manutenção | tubos de nitrogênio e válvulas |
| Elevador de carga | leva à doca refrigerada |

**Cobertura e perigos:** Cápsulas e geladeiras dão cobertura +2 de CA. Válvulas de nitrogênio rompidas causam Gás tóxico (Perigo 1) e frio: CON CD 12 ou 1d6 por rodada.

**Ganchos de uso**

1. Uma cápsula guarda uma pessoa que alguém quer acordar ou matar
2. O banco de órgãos vende um coração raro ao melhor lance
3. A energia vai cair em 10 minutos e as cápsulas precisam de um gerador

**Ameaças típicas:** Rua: 2 Capangas (NA 1). Corp: 4 Seguranças corporativas (NA 2), 1 Robô de segurança (NA 4) e 1 Torreta (NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a cryogenic chamber with twelve cylindrical glass capsules arranged in two rows of six, a bank of glass refrigerator cases containing organ containers, a glass control room with a power panel and screens, a maintenance corridor with thick pipes and valves, a freight elevator door at the south edge, thin vapor wisps as flat pale shapes on the floor, tile floor as flat medium gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon violet) used sparingly on the row of glowing cryogenic capsules. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

### Categoria 5: Moradia e vida noturna

Apartamentos, corredores, boates, cassino, bares e hotéis. Onde o neon acende e os contratos são fechados.

<!-- MAP id="m041" cat="noite" nome="Kitnet de runner" arquivo="m041-kitnet-runner.webp" grade="24x16" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon magenta" pacote="sim" -->
#### M041. Kitnet de runner

| Campo | Valor |
|---|---|
| **Categoria** | Moradia e vida noturna |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Magenta néon (o letreiro de néon que vaza pela janela) |
| **Arquivo** | `m041-kitnet-runner.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Um quarto-cozinha-banheiro de 24 metros quadrados com uma cama de armar, uma bancada de cozinha, um banheiro minúsculo, uma mesa com um deck de hacker e uma janela para a escada de incêndio. Cabos pendem do teto. É a casa de qualquer runner: ponto de encontro, esconderijo, lugar de descanso e alvo de cobradores.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Cama e armário | colchão no chão e roupa empilhada |
| Cozinha | bancada e geladeira pequena |
| Mesa do deck | servidor caseiro e cabos |
| Banheiro | porta fina e box apertado |
| Janela e escada de incêndio | saída de fuga, vertical |

**Cobertura e perigos:** Cama, mesa e geladeira dão cobertura +2 de CA. Espaço apertado: armas longas e Rajada têm desvantagem.

**Ganchos de uso**

1. O grupo encontra a kitnet revirada e um recado na parede
2. Cobradores do Banco Cobalto esperam na porta
3. Um contato dorme no chão com um pacote que não deve ser aberto

**Ameaças típicas:** Rua: 3 Capangas (NA 1) e 1 Hacker de rua (NA 1). Corp: 2 Seguranças corporativas (NA 2) e 1 Caçador de sintéticos (NA 5) se houver um fugitivo no quarto.

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a tiny studio apartment seen from above, a bed against one wall with a pile of clothes, a narrow kitchen counter with a small fridge and a sink, a desk with a computer deck and tangled cables, a very small bathroom with a thin door, a window with a fire escape on the south wall, a rug and scattered boxes, wooden floor as flat medium gray planks. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon magenta) used sparingly on the neon sign light spilling in through the window. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m042" cat="noite" nome="Apartamento de luxo no alto da torre" arquivo="m042-apartamento-luxo.webp" grade="30x20" ar="3:2" ambiente="interior" luz="penumbra" entrada="oeste" cor="neon gold" -->
#### M042. Apartamento de luxo no alto da torre

| Campo | Valor |
|---|---|
| **Categoria** | Moradia e vida noturna |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Dourado néon (o cofre escondido na parede do escritório) |
| **Arquivo** | `m042-apartamento-luxo.webp` |

**Descrição:** Uma cobertura duplex de luxo com sala de estar ampla, cozinha integrada, quarto master, closet, escritório com cofre escondido, uma varanda com piscina e janelas de vidro do chão ao teto. Tudo é caro e limpo demais. Ótima para festas, roubos de elite, negociações de poder e assassinatos silenciosos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Sala de estar | sofás, bar e vista panorâmica |
| Cozinha integrada | ilha de mármore e cobertura |
| Quarto master e closet | cama grande e armários |
| Escritório | mesa de madeira e cofre escondido |
| Varanda com piscina | saída ao ar livre, queda de 30 m |

**Cobertura e perigos:** Sofás, ilha e mesa dão cobertura +2 de CA. Vidros duplos blindados resistem a tiros leves; granada abre buraco para queda livre.

**Ganchos de uso**

1. O dono do apartamento está em viagem e a prova está no cofre
2. Uma festa de alto nível reúne executivos e o alvo
3. Alguém já invadiu a cobertura antes do grupo e deixou um cadáver na piscina

**Ameaças típicas:** Rua: 2 Seguranças corporativas (NA 2) e 1 Executivo corporativo (NA 1). Corp: 1 Diretor (NA 3), 2 Agentes corporativos de campo (NA 4) e 1 Zeladora (IA, NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a luxury duplex penthouse apartment with a wide living room of large sofas and a built-in bar, an open kitchen with a marble island, a master bedroom with a king bed and a walk-in closet, a study with a large desk and a bookshelf, a balcony with a rectangular swimming pool, floor-to-ceiling glass walls drawn as pale bands with black frames, carpet as flat dark gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon gold) used sparingly on the hidden wall safe in the study. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m043" cat="noite" nome="Corredor residencial da Colmeia" arquivo="m043-corredor-residencial.webp" grade="30x20" ar="3:2" ambiente="interior" luz="escuro" entrada="sul" cor="neon amber" -->
#### M043. Corredor residencial da Colmeia

| Campo | Valor |
|---|---|
| **Categoria** | Moradia e vida noturna |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Âmbar néon (as luzes âmbar do corredor e a fiação exposta) |
| **Arquivo** | `m043-corredor-residencial.webp` |

**Descrição:** Um andar de prédio residencial lotado: um corredor estreito com portas dos dois lados, varais, caixas de energia improvisadas, uma lavanderia coletiva, uma escada com cheiro de fritura e uma janela de ventilação. As portas são finas e as paredes, mais ainda. Perfeito para perseguição, emboscada e investigação porta a porta.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Corredor central | estreito, 1 casa de largura |
| Portas dos moradores | doze portas, algumas abertas |
| Lavanderia coletiva | máquinas e varais |
| Caixa de energia | fiação exposta, risco elétrico |
| Escada | sobe e desce, vigiada por moradores |

**Cobertura e perigos:** Pouca cobertura: batentes e quinas (+2 de CA). Paredes finas não bloqueiam tiros pesados. Fiação exposta gera Curto-circuito (Perigo 5).

**Ganchos de uso**

1. O alvo mora numa dessas portas e todos os vizinhos mentem
2. Os Cães de Vidro cobram pedágio na escada
3. Um incêndio começa na lavanderia e o prédio inteiro foge

**Ameaças típicas:** Rua: 3 Capangas (NA 1) dos Cães de Vidro, 6 Civis (NA 0), 2 Viciados em stim (NA 0). Corp: 2 Seguranças corporativas (NA 2).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a cramped residential corridor of a crowded apartment building, a long narrow hallway with a dozen doors on both sides, laundry lines strung across, a shared laundry nook with two machines, an open electrical box with exposed wires on a wall, a stairwell at the south end, a small ventilation window, scattered boxes and bicycles, concrete floor as flat dark gray with peeling paint patches. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon amber) used sparingly on the amber corridor lights and exposed wiring. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m044" cat="noite" nome="Boate, pista de dança" arquivo="m044-boate-pista.webp" grade="36x24" ar="3:2" ambiente="interior" luz="escuro" entrada="sul" cor="neon magenta" pacote="sim" -->
#### M044. Boate, pista de dança

| Campo | Valor |
|---|---|
| **Categoria** | Moradia e vida noturna |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Magenta néon (a cabine do DJ no centro, cercada de luzes) |
| **Arquivo** | `m044-boate-pista.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Uma boate lotada com pista de dança circular, palco do DJ no centro, três bares, um mezanino de segurança, banheiros, cabines de descanso e uma saída de emergência. Luzes e fumaça ocupam tudo. Serve para encontros com fixers, tiroteios com multidão, perseguições e troca de segredos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Pista de dança | círculo aberto, multidão |
| Cabine do DJ | palco elevado com caixas de som |
| Bares | balcões longos com garrafas |
| Mezanino de segurança | visão total da pista |
| Banheiros e cabines | privacidade e portas trancadas |
| Saída de emergência | porta corta-fogo |

**Cobertura e perigos:** Balcões e caixas de som dão cobertura +2 de CA. A multidão gera Tumulto (Perigo 6) a cada tiro. Luzes estroboscópicas dão desvantagem em ataques longos.

**Ganchos de uso**

1. O fixer só encontra o grupo na pista, no meio da multidão
2. Um alvo está no camarote e sai em 15 minutos
3. A Noite Infinita do Culto do Neon Eterno toma a boate e ninguém quer ir embora

**Ameaças típicas:** Rua: 15 Civis (NA 0), 3 Brutamontes cromados (NA 3, seguranças), 1 Fixer (NA 1). Corp: 4 Seguranças corporativas (NA 2) e 1 Assassino fantasma (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a packed nightclub dance floor seen from above, a large circular dance floor in the center, a raised round DJ booth with speaker stacks in the middle, three long bar counters along the walls, a security mezzanine balcony on one side, restroom doors in a corner, an emergency exit door, scattered round tables, a ring of light fixtures as small circles on the floor, floor as flat dark gray. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon magenta) used sparingly on the DJ booth in the center ringed with lights. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m045" cat="noite" nome="Boate, camarotes e bastidores" arquivo="m045-boate-camarotes.webp" grade="30x20" ar="3:2" ambiente="interior" luz="penumbra" entrada="oeste" cor="neon violet" -->
#### M045. Boate, camarotes e bastidores

| Campo | Valor |
|---|---|
| **Categoria** | Moradia e vida noturna |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Violeta néon (a porta secreta do escritório do dono) |
| **Arquivo** | `m045-boate-camarotes.webp` |

**Descrição:** A parte dos fundos de uma boate, vista de cima: quatro camarotes com sofás, um corredor de serviço, camarins, uma cozinha, um escritório do dono e uma porta secreta para um cofre. Música abafada atravessa as paredes. Serve para negociações com chefes, esconderijos e invasões pelos fundos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Camarotes | sofás e vista da pista |
| Camarins | espelhos e armários |
| Cozinha e copa | balcões e freezer |
| Corredor de serviço | liga a boate à rua |
| Escritório do dono | mesa, cofre e porta secreta |

**Cobertura e perigos:** Sofás e balcões dão cobertura +2 de CA. A música alta abafa tiros: furtividade com vantagem para quem atira de silenciador.

**Ganchos de uso**

1. O dono guarda uma gravação que arruína um executivo
2. A banda de apoio é um grupo de assassinos disfarçados
3. O grupo precisa trocar de roupa e passar por funcionário até a hora do show

**Ameaças típicas:** Rua: 3 Brutamontes cromados (NA 3), 1 Líder de gangue (NA 3, o dono) e 2 Capangas (NA 1). Corp: 2 Agentes corporativos de campo (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, the backstage and VIP boxes of a nightclub, four raised private booths with curved sofas along one wall, a row of dressing rooms with mirrors and clothes racks, a small kitchen with counters and a freezer, a service corridor to the street, an owner's office with a desk and a hidden wall safe, a stage wing with cables and speakers, floor as flat dark gray carpet. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon violet) used sparingly on the hidden door of the owner's office. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m046" cat="noite" nome="Cassino, salão de jogos" arquivo="m046-cassino.webp" grade="36x24" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon gold" pacote="sim" -->
#### M046. Cassino, salão de jogos

| Campo | Valor |
|---|---|
| **Categoria** | Moradia e vida noturna |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Dourado néon (a roleta gigante no centro do salão) |
| **Arquivo** | `m046-cassino.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Um salão de cassino de luxo com mesas de roleta, blackjack e pôquer, fileiras de máquinas caça-níqueis, um bar central, uma sala VIP, o caixa blindado e uma passarela de segurança suspensa. Câmeras no teto cobrem tudo. É o cenário clássico de roubos, golpes e confrontos entre mafiosos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Mesas de jogo | roleta, blackjack e pôquer |
| Caça-níqueis | fileiras de máquinas de cobertura |
| Bar central | balcão redondo |
| Sala VIP | apostas altas e segurança pesada |
| Caixa blindado | guichê e cofre atrás |
| Passarela suspensa | segurança observa o salão |

**Cobertura e perigos:** Mesas e máquinas dão cobertura +2 de CA. A multidão causa Tumulto (Perigo 6) e a passarela dá a atiradores vantagem de altura.

**Ganchos de uso**

1. O grupo precisa trapacear na mesa VIP sem ser pego pelo sistema de câmeras
2. O caixa será transferido às 3h e o plano é interceptar o cofre
3. Um contato está na mesa de pôquer e só fala depois da última rodada

**Ameaças típicas:** Rua: 12 Civis (NA 0), 4 Seguranças corporativas (NA 2), 1 Fixer (NA 1). Corp: 2 Brutamontes cromados (NA 3), 1 Agente corporativo de campo (NA 4), 1 Atirador de elite (NA 4) na passarela.

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a casino gaming floor seen from above, a giant round roulette table in the center, several semi-circular blackjack tables and a poker table, rows of slot machines in lines along the walls, a round bar counter, a VIP room behind glass, an armored cashier cage with a vault door, a suspended security catwalk crossing the ceiling, patterned carpet as flat dark gray with flat circles. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon gold) used sparingly on the giant roulette table in the center of the hall. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m047" cat="noite" nome="Bar de beco" arquivo="m047-bar-beco.webp" grade="24x16" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon magenta" -->
#### M047. Bar de beco

| Campo | Valor |
|---|---|
| **Categoria** | Moradia e vida noturna |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Magenta néon (o letreiro de néon do bar sobre a porta) |
| **Arquivo** | `m047-bar-beco.webp` |

**Descrição:** Um barzinho de fundos com balcão de madeira velha, mesas de sinuca, um palco minúsculo, uma jukebox e um quarto dos fundos para negócios. A fumaça é grossa e a música, baixa. É o ponto de encontro de runners, fixers e informantes. Brigas começam por qualquer coisa.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Balcão | bartender e prateleira de garrafas |
| Mesa de sinuca | cobertura baixa e taco como arma |
| Palco e jukebox | música alta e cobertura |
| Mesas e cadeiras | improvisadas, dão cobertura |
| Quarto dos fundos | negócios, porta com tranca |

**Cobertura e perigos:** Balcão e mesas dão cobertura +2 de CA. Garrafas viram arma improvisada (d4). Briga geral gera Tumulto (Perigo 6).

**Ganchos de uso**

1. O fixer chega atrasado e dois clientes parecem observar o grupo
2. Uma briga começa e esconde um assassinato
3. O dono do bar vende informação em troca de um favor

**Ameaças típicas:** Rua: 6 Civis (NA 0), 3 Capangas (NA 1), 1 Fixer (NA 1) e 1 Brutamontes cromado (NA 3). Corp: 2 Seguranças corporativas (NA 2).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a small back-alley bar seen from above, a long wooden bar counter with a shelf of bottles, a pool table, a tiny stage with a jukebox and speakers, a handful of mismatched round tables and chairs, a back room door with a lock at the rear wall, a front door with a neon sign, wooden floor as flat medium gray planks. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon magenta) used sparingly on the neon bar sign hanging over the door. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m048" cat="noite" nome="Restaurante de macarrão de rua" arquivo="m048-restaurante-macarrao.webp" grade="24x16" ar="3:2" ambiente="misto" luz="penumbra" entrada="sul" cor="neon amber" -->
#### M048. Restaurante de macarrão de rua

| Campo | Valor |
|---|---|
| **Categoria** | Moradia e vida noturna |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Misto (interior e exterior), penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Âmbar néon (o fogão a gás com as chamas da cozinha aberta) |
| **Arquivo** | `m048-restaurante-macarrao.webp` |

**Descrição:** Um restaurante de balcão com cozinha aberta, bancos de plástico sob um toldo, uma geladeira de bebidas, mesas dobráveis e uma porta dos fundos que dá para um beco. Fumaça de wok e vapor cobrem tudo. Serve para cenas de encontro, tiroteio rápido e perseguição por baixo dos toldos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Balcão e cozinha aberta | fogões, panelas e facas |
| Bancos de plástico | cobertura baixa |
| Geladeira de bebidas | cobertura sólida |
| Mesas dobráveis | improvisam barricada |
| Porta dos fundos | beco com lixeiras |

**Cobertura e perigos:** Balcão, geladeira e mesas dão cobertura +2 de CA. O gás é inflamável: tiros no fogão causam Incêndio (Perigo 2).

**Ganchos de uso**

1. Um informante come sozinho e some quando vê um policial
2. A cozinheira conhece o chefe de uma gangue e quer proteção
3. Uma bomba de gás fica escondida atrás da geladeira

**Ameaças típicas:** Rua: 4 Civis (NA 0), 3 Capangas (NA 1), 1 Motoqueiro (NA 2). Corp: 1 Segurança corporativa (NA 2).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a street noodle restaurant seen from above, a long counter with an open kitchen behind it containing two gas stoves, woks and a prep table, plastic stools along the counter under a striped awning, a drink fridge against one wall, folding tables scattered outside, a back door to an alley with trash cans, concrete floor as flat gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon amber) used sparingly on the gas stove flames of the open kitchen. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m049" cat="noite" nome="Hotel, lobby e corredor de quartos" arquivo="m049-hotel-quartos.webp" grade="30x20" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon violet" -->
#### M049. Hotel, lobby e corredor de quartos

| Campo | Valor |
|---|---|
| **Categoria** | Moradia e vida noturna |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Violeta néon (a porta do quarto 7 entreaberta) |
| **Arquivo** | `m049-hotel-quartos.webp` |

**Descrição:** Um hotel de meia estrela, com lobby pequeno, balcão com recepcionista, um corredor longo com seis quartos, uma máquina de bebidas, um elevador lento e uma escada. Os quartos são iguais: cama, banheiro, janela. Serve para vigilância, esconderijo, assassinato, tiroteio e encontros a portas fechadas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Lobby e recepção | balcão, sofá e câmera |
| Corredor longo | seis portas, uma entreaberta |
| Quarto típico | cama, banheiro, janela |
| Máquina de bebidas | cobertura baixa |
| Escada e elevador | rota de fuga e vigilância |

**Cobertura e perigos:** Camas, balcão e máquinas dão cobertura +2 de CA. Portas finas não resistem a tiros: cobertura parcial apenas.

**Ganchos de uso**

1. O alvo hospeda-se no 7 sob nome falso e a recepcionista vende a chave
2. O grupo está preso num quarto e a Guarda sobe pela escada
3. Alguém deixou uma mala no corredor que não para de apitar

**Ameaças típicas:** Rua: 2 Civis (NA 0), 3 Capangas (NA 1), 1 Assassino fantasma (NA 4). Corp: 2 Seguranças corporativas (NA 2) e 1 Agente corporativo de campo (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a small budget hotel seen from above, a lobby with a reception counter and a sofa at the south edge, a long central corridor with six hotel rooms on both sides each with a bed, a small bathroom and a window, a drink vending machine, a slow elevator and a stairwell at the end, a door half open in one room, carpet as flat dark gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon violet) used sparingly on the half-open door of room 7. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m050" cat="noite" nome="Hotel-cápsula" arquivo="m050-hotel-capsula.webp" grade="30x20" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="electric cyan" -->
#### M050. Hotel-cápsula

| Campo | Valor |
|---|---|
| **Categoria** | Moradia e vida noturna |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Ciano elétrico (a cápsula 14 com a tela ligada) |
| **Arquivo** | `m050-hotel-capsula.webp` |

**Descrição:** Um hotel de cápsulas com quarenta cubículos empilhados em fileiras, um balcão de check-in, armários de bagagem, banheiro coletivo e uma sala de descanso. As cápsulas são tubos com cortina e uma tela. É um lugar para se esconder, trocar de identidade e disputar corredores apertados.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Balcão de check-in | leitor de ID e bagagem |
| Fileiras de cápsulas | quarenta tubos empilhados |
| Armários de bagagem | cobertura baixa |
| Banheiro coletivo | chuveiros e pias |
| Sala de descanso | sofás e vending machines |

**Cobertura e perigos:** Cápsulas e armários dão cobertura +2 de CA. Corredores estreitos limitam movimento a uma criatura por casa.

**Ganchos de uso**

1. O grupo precisa achar uma pessoa escondida numa das quarenta cápsulas
2. Alguém troca uma mala de dados no armário de bagagem
3. Uma blitz da Guarda fecha as portas e verifica a ID de todos

**Ameaças típicas:** Rua: 8 Civis (NA 0), 2 Policiais urbanos (NA 1), 2 Capangas (NA 1). Corp: 2 Seguranças corporativas (NA 2) e 1 Caçador de sintéticos (NA 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a capsule hotel interior seen from above, long parallel rows of stacked sleeping capsules drawn as rounded rectangles with small screens, narrow aisles between the rows, a check-in counter with an ID reader at the south edge, a wall of luggage lockers, a shared bathroom block with sinks and showers, a small lounge with sofas and vending machines, floor as flat medium gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on capsule 14 with its screen switched on. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

### Categoria 6: Indústria, porto e infraestrutura

Armazéns, cais, fábricas, usinas, refinarias e data center. Ambientes cheios de perigo e de cobertura.

<!-- MAP id="m051" cat="ind" nome="Armazém portuário com contêineres empilhados" arquivo="m051-armazem-conteineres.webp" grade="36x24" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon amber" pacote="sim" -->
#### M051. Armazém portuário com contêineres empilhados

| Campo | Valor |
|---|---|
| **Categoria** | Indústria, porto e infraestrutura |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Âmbar néon (o contêiner aberto com a luz âmbar do carregamento) |
| **Arquivo** | `m051-armazem-conteineres.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Um galpão enorme de armazém com contêineres empilhados em fileiras, empilhadeiras estacionadas, uma doca com portas de enrolar, um escritório mezanino envidraçado e uma gaiola de carga valiosa. A luz entra por clarabóias altas. Os corredores entre os contêineres formam um labirinto. Serve para negociações, contrabando, emboscadas e tiroteios táticos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Fileiras de contêineres | labirinto de cobertura sólida |
| Doca de carga | portas de enrolar e empilhadeiras |
| Escritório mezanino | visão geral, escada metálica |
| Gaiola de carga valiosa | CD 14 para arrombar |
| Empilhadeiras | cobertura baixa e veículo improvisado |

**Cobertura e perigos:** Contêineres dão cobertura total (+4 de CA) para quem ficar encostado. Cargas pesadas penduradas podem cair: Colapso (Perigo 4) se um cabo for cortado.

**Ganchos de uso**

1. A carga ilegal está num contêiner específico e o grupo tem 10 minutos antes da inspeção
2. Uma gangue e uma corporação disputam o mesmo carregamento
3. O mezanino concentra o chefe, e os corredores abaixo viram labirinto de emboscadas

**Ameaças típicas:** Rua: 6 Capangas (NA 1), 2 Atiradores de gangue (NA 1) e 1 Líder de gangue (NA 3). Corp: 4 Mercenários (NA 3) e 1 Technical de gangue (NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a huge port warehouse interior seen from above, long rows of stacked shipping containers forming a maze of narrow aisles, a loading dock with rolling shutter doors along the south wall, forklifts parked in two bays, a glass-walled mezzanine office with a steel staircase in a corner, a locked cargo cage with crates, skylight light as flat pale rectangles on the floor, concrete floor as flat gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon amber) used sparingly on the open container with amber cargo light spilling out. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m052" cat="ind" nome="Cais com guindastes e atracadouro" arquivo="m052-cais-guindastes.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="escuro" entrada="sul" cor="neon amber" pacote="sim" -->
#### M052. Cais com guindastes e atracadouro

| Campo | Valor |
|---|---|
| **Categoria** | Indústria, porto e infraestrutura |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, escuro |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Âmbar néon (as luzes âmbar do guindaste de pórtico sobre o navio) |
| **Arquivo** | `m052-cais-guindastes.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Um cais de carga à noite, com dois guindastes de pórtico, um navio cargueiro atracado, pilhas de contêineres, um prédio da alfândega, bitolas de trilho e uma lancha amarrada. A água escura bate no concreto. O vento traz sal e óleo. Cenário de contrabando, perseguição de lanchas, fuga de navio e assassinato à beira-mar.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Guindastes de pórtico | estruturas altas com cabine |
| Navio cargueiro | casco, rampa e convés |
| Pilhas de contêineres | cobertura sólida |
| Prédio da alfândega | escritório e câmeras |
| Lancha amarrada | fuga pela água |

**Cobertura e perigos:** Contêineres e guindastes dão cobertura +2 de CA. A beira do cais tem queda de 3 m para a água: 1d6 de dano e CON CD 10 para sair.

**Ganchos de uso**

1. O contrabando sai com a maré às 4h
2. Um agente da alfândega vende rotas por um preço alto
3. Os Filhos da Maré cobram pedágio e a Aegis Vanta mandou um barco de patrulha

**Ameaças típicas:** Rua: 6 Capangas (NA 1) dos Filhos da Maré, 1 Líder de gangue (NA 3), com uma lancha de contrabando. Corp: 4 Soldados de esquadrão (NA 4) da Aegis Vanta e 1 Barco de patrulha (veículo médio).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a nighttime cargo pier seen from above, two tall gantry cranes straddling rails on the dock edge, a cargo ship moored along the south side with its deck and ramp visible, stacks of shipping containers in groups, a small customs building with a flat roof, parallel rail tracks along the quay, a speedboat tied at a short jetty, dark water as a flat black band with thin white wave lines, concrete quay as flat gray. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon amber) used sparingly on the amber lights of the gantry crane above the ship. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m053" cat="ind" nome="Pátio de contêineres a céu aberto" arquivo="m053-patio-conteineres.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="penumbra" entrada="oeste" cor="neon orange" -->
#### M053. Pátio de contêineres a céu aberto

| Campo | Valor |
|---|---|
| **Categoria** | Indústria, porto e infraestrutura |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Laranja néon (o contêiner marcado com a faixa laranja) |
| **Arquivo** | `m053-patio-conteineres.webp` |

**Descrição:** Um pátio de contêineres a céu aberto com torres de contêineres de 4 camadas, corredores largos, guindastes móveis, um portão de entrada com guarita e uma estrada de serviço. Holofotes varrem o chão. Há uma fila de caminhões ao fundo. Serve para perseguições de veículos, entrega de carga, tiroteios longos e fugas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Torres de contêineres | paredes altas e sólidas |
| Corredores largos | espaço para veículos |
| Guindastes móveis | reach stackers e caminhões |
| Portão e guarita | controle de entrada |
| Estrada de serviço | fuga para a rodovia |

**Cobertura e perigos:** Contêineres dão cobertura total (+4 de CA). Os corredores largos permitem perseguição de veículos em linha reta.

**Ganchos de uso**

1. O contêiner marcado precisa sair do pátio antes do amanhecer
2. Uma gangue rival rouba a carga do grupo e foge de caminhão
3. Um sniper no alto de uma torre de contêineres vigia o portão

**Ameaças típicas:** Rua: 6 Capangas (NA 1) e 2 Motoqueiros (NA 2). Corp: 4 Mercenários (NA 3), 1 Atirador de elite (NA 4) e 1 Caminhão militar (veículo pesado).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an open-air container yard seen from above, tall rectangular stacks of shipping containers in rows with wide aisles between them, two mobile cranes on wheels, a gate with a small guard booth on the west edge, a long service road crossing the map, a line of parked trucks near the east edge, searchlight cones as flat pale wedges, ground as flat dark gray asphalt with white lane stripes. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the container marked with an orange stripe. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m054" cat="ind" nome="Fábrica, linha de montagem" arquivo="m054-fabrica-linha-montagem.webp" grade="36x24" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon crimson red" -->
#### M054. Fábrica, linha de montagem

| Campo | Valor |
|---|---|
| **Categoria** | Indústria, porto e infraestrutura |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Vermelho néon (a prensa hidráulica em operação) |
| **Arquivo** | `m054-fabrica-linha-montagem.webp` |

**Descrição:** Um galpão industrial com duas linhas de montagem em esteira, braços robóticos, uma prensa hidráulica, uma ponte rolante, um mezanino de gerência e depósitos laterais. As esteiras correm e as máquinas ruidosas encobrem o som de tiros. Serve para lutas em movimento, sabotagem e escoltas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Esteiras de montagem | terreno difícil, transportam peças |
| Braços robóticos | perigo e cobertura |
| Prensa hidráulica | 3d6 de dano por esmagamento |
| Ponte rolante | passarela alta |
| Mezanino de gerência | sala de controle |
| Depósitos laterais | peças e ferramentas |

**Cobertura e perigos:** Máquinas e peças dão cobertura +2 de CA. O ruído das máquinas dá desvantagem em testes de escuta. A prensa causa 3d6 (DES CD 14 para evitar).

**Ganchos de uso**

1. O alvo é um gerente que nunca sai da sala de controle
2. Uma carga de peças ilegais será montada em modelos novos
3. A linha de montagem produz sintéticos e os runners precisam sabotá-la

**Ameaças típicas:** Rua: 6 Civis (NA 0, operários) e 2 Seguranças corporativas (NA 2). Corp: 4 Seguranças corporativas (NA 2), 2 Robôs de segurança (NA 4) e 1 Robô pesado de combate (NA 6).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a factory floor with two long assembly line conveyors running side by side, robotic arms along the belts, a large hydraulic press in a corner with a striped hazard floor, an overhead crane rail with a catwalk, a glass-walled supervisor mezzanine with a staircase, side storerooms with shelves and crates, parts bins, concrete floor as flat dark gray with flat safety stripes shown as light gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the hydraulic press in operation with a red warning light. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m055" cat="ind" nome="Usina, sala de turbinas e reator" arquivo="m055-usina-turbinas.webp" grade="30x20" ar="3:2" ambiente="interior" luz="penumbra" entrada="oeste" cor="toxic green" -->
#### M055. Usina, sala de turbinas e reator

| Campo | Valor |
|---|---|
| **Categoria** | Indústria, porto e infraestrutura |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Verde tóxico (o núcleo do reator brilhando no fundo) |
| **Arquivo** | `m055-usina-turbinas.webp` |

**Descrição:** Uma sala de turbinas da Ouroboros, com três turbinas em linha, um reator selado ao fundo, uma sala de controle envidraçada, uma passarela de serviço sobre as turbinas e tubulações grossas. O calor sobe do piso. É o cenário de sabotagem, ameaça nuclear e negociação de refém com a cidade inteira como prêmio.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Turbinas | três cilindros gigantes em linha |
| Reator selado | porta blindada e núcleo |
| Sala de controle | painel com todos os comandos |
| Passarela de serviço | elevada, estreita |
| Tubulações | vapor e radiação |

**Cobertura e perigos:** Turbinas e tubulações dão cobertura +2 de CA. Vapor e radiação causam Radiação da Zona (Perigo 3) perto do reator e Incêndio (Perigo 2) em tubulações rompidas.

**Ganchos de uso**

1. O reator está perto do limite e o grupo precisa resfriá-lo ou desligá-lo
2. Um sabotador paga para apagar a cidade e o grupo precisa decidir de que lado ficar
3. A Ouroboros esconde uma falha e um engenheiro quer vazar os dados

**Ameaças típicas:** Rua: 3 Civis (NA 0, técnicos) e 2 Seguranças corporativas (NA 2). Corp: 4 Seguranças corporativas (NA 2), 1 Robô de segurança (NA 4) e 2 Torretas (NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a power plant turbine hall with three huge cylindrical turbines lined up along the center, a sealed round reactor chamber with a thick door at the back wall, a glass-walled control room on one side, a metal catwalk crossing above the turbines, thick insulated pipes running along the walls, valve wheels and gauge panels, concrete floor as flat dark gray with hazard markings in pale gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (toxic green) used sparingly on the reactor core glowing at the back. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m056" cat="ind" nome="Subestação elétrica com arcos" arquivo="m056-subestacao-eletrica.webp" grade="30x20" ar="3:2" ambiente="exterior" luz="escuro" entrada="sul" cor="neon amber" -->
#### M056. Subestação elétrica com arcos

| Campo | Valor |
|---|---|
| **Categoria** | Indústria, porto e infraestrutura |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, escuro |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Âmbar néon (os arcos elétricos saltando entre os transformadores) |
| **Arquivo** | `m056-subestacao-eletrica.webp` |

**Descrição:** Uma subestação a céu aberto, com fileiras de transformadores, torres de linhas de alta tensão, uma casinha de controle, cercas altas e um pátio de britas. Os arcos elétricos estalam no ar. Um blecaute começa aqui. Serve para sabotagem, assalto à infraestrutura e confrontos com ameaça elétrica.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Transformadores | massas de metal com cobertura |
| Torres de alta tensão | estruturas altas |
| Casinha de controle | painel e fusíveis |
| Cerca eletrificada | DES CD 12 ou 2d6 elétrico |
| Pátio de britas | terreno difícil e barulhento |

**Cobertura e perigos:** Transformadores dão cobertura +2 de CA. Arcos causam Curto-circuito (Perigo 5). Água e metal ampliam o dano: dano elétrico dobra em poças.

**Ganchos de uso**

1. A sabotagem deve derrubar o bairro por 6 horas
2. A Ouroboros mandou reforço porque alguém vazou o plano
3. O grupo precisa roubar um gerador de uma das torres

**Ameaças típicas:** Rua: 3 Capangas (NA 1), 2 Seguranças corporativas (NA 2). Corp: 4 Seguranças corporativas (NA 2), 2 Torretas (NA 3) e 1 Robô de segurança (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an outdoor electrical substation at night, rows of large boxy transformers with ribbed sides, tall lattice transmission towers, a small control hut with a flat roof, a high chain link fence around the edge with a gate at the south, crushed gravel ground as flat light gray texture blocks, thin zigzag electric arcs between transformers, thick cables on the ground as dark bands. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon amber) used sparingly on electric arcs jumping between the transformers. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m057" cat="ind" nome="Refinaria, torres e tanques" arquivo="m057-refinaria-petroleo.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="penumbra" entrada="oeste" cor="neon crimson red" -->
#### M057. Refinaria, torres e tanques

| Campo | Valor |
|---|---|
| **Categoria** | Indústria, porto e infraestrutura |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Vermelho néon (a chama da torre de queima no alto) |
| **Arquivo** | `m057-refinaria-petroleo.webp` |

**Descrição:** Uma refinaria de petróleo com torres de destilação, tanques cilíndricos, uma rede de tubulações, uma sala de controle, passarelas e uma torre de queima que arde permanentemente. O chão é de concreto engordurado. Qualquer faísca pode causar uma explosão em cadeia. Cenário de sabotagem, perseguição e confrontos cheios de risco.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Torres de destilação | estruturas altas e sólidas |
| Tanques cilíndricos | cobertura e risco de explosão |
| Tubulações e passarelas | corredores elevados |
| Sala de controle | painel de emergência |
| Torre de queima | chama contínua |

**Cobertura e perigos:** Tanques e torres dão cobertura total. Tiros em tanques de combustível causam explosão (3d6, raio Próximo) e Incêndio (Perigo 2).

**Ganchos de uso**

1. O grupo precisa criar um incêndio controlado para encobrir uma fuga
2. Um carregamento clandestino sai pelos dutos
3. O dono da refinaria negocia em segredo com a Aegis Vanta no escritório da torre

**Ameaças típicas:** Rua: 4 Capangas (NA 1), 2 Seguranças corporativas (NA 2). Corp: 4 Seguranças corporativas (NA 2), 2 Torretas (NA 3), 1 Robô pesado de combate (NA 6).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an oil refinery complex seen from above, three tall distillation towers drawn as dark circles with ladders, five large cylindrical storage tanks, a web of thick pipes with elevated catwalks, a small control building with a flat roof, a flare stack with a flame at the edge, concrete ground as flat gray, pipe racks as dark bands, hazard markings in pale gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the flame of the flare stack at the top. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m058" cat="ind" nome="Oficina e desmanche de carros" arquivo="m058-desmanche-oficina.webp" grade="30x20" ar="3:2" ambiente="misto" luz="penumbra" entrada="sul" cor="neon orange" -->
#### M058. Oficina e desmanche de carros

| Campo | Valor |
|---|---|
| **Categoria** | Indústria, porto e infraestrutura |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Misto (interior e exterior), penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Laranja néon (o carro em desmanche com o capô aberto e a luz de solda) |
| **Arquivo** | `m058-desmanche-oficina.webp` |

**Descrição:** Um desmanche clandestino com um galpão de oficina, um pátio de carros sucateados, um elevador hidráulico, bancadas, uma prensa de sucata e um escritório improvisado de contêiner. Peças penduradas, pneus empilhados e latas de óleo cobrem tudo. Serve para compra de veículos, negociação com mecânicos e fugas improvisadas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Galpão de oficina | elevador hidráulico e bancadas |
| Pátio de sucata | carros empilhados, cobertura |
| Prensa de sucata | esmaga carros e gente |
| Escritório contêiner | porta com tranca |
| Portão de entrada | cancela e cão de guarda |

**Cobertura e perigos:** Carros e bancadas dão cobertura +2 de CA. A prensa causa 4d6 (DES CD 14 para evitar). Óleo no chão gera Incêndio (Perigo 2) se houver faísca.

**Ganchos de uso**

1. O grupo precisa de um carro rápido e sem rastro
2. O chefe do desmanche é informante da Guarda
3. Um carro específico chegou aqui por engano e tem algo escondido

**Ameaças típicas:** Rua: 4 Capangas (NA 1), 2 Motoqueiros (NA 2), 2 Cães ferais (NA 1) e 1 Brutamontes cromado (NA 3). Corp: 2 Seguranças corporativas (NA 2).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a chop shop and junkyard seen from above, a workshop shed on the left with a hydraulic car lift and workbenches, a yard of wrecked cars stacked in two rows, a large scrap press machine with a pit, a shipping container used as an office with a door, piles of tires, oil barrels, a gate with a barrier arm at the south edge, ground as flat dark gray with flat oil puddle shapes. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the car being stripped with its hood open and a welding light. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m059" cat="ind" nome="Estação de tratamento de água" arquivo="m059-estacao-agua.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="penumbra" entrada="leste" cor="toxic green" -->
#### M059. Estação de tratamento de água

| Campo | Valor |
|---|---|
| **Categoria** | Indústria, porto e infraestrutura |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda leste |
| **Cor de destaque** | Verde tóxico (o tanque de produtos químicos verde brilhante) |
| **Arquivo** | `m059-estacao-agua.webp` |

**Descrição:** Uma estação de tratamento de água com grandes tanques circulares de decantação, canais de concreto, tanques de produtos químicos, casas de bombas, uma sala de controle e uma estação de monitoramento. A água é escura e fria. Quem controla essa estação controla a água de um bairro. Cenário de envenenamento, sabotagem e confronto.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Tanques de decantação | grandes círculos de água escura |
| Canais de concreto | passarelas estreitas |
| Tanques químicos | ácido e cloro |
| Casas de bombas | motores e cobertura |
| Sala de controle | painel e monitores |

**Cobertura e perigos:** Muros de tanque e casas de bombas dão cobertura +2 de CA. Cair na água: CON CD 12 ou 1d6 de dano. Vazamento químico causa Gás tóxico (Perigo 1).

**Ganchos de uso**

1. Alguém quer envenenar o bairro e o grupo precisa impedir
2. Uma facção quer cortar a água de um rival e paga o grupo para ajudar
3. Um corpo foi jogado num tanque e o grupo precisa recuperá-lo

**Ameaças típicas:** Rua: 3 Capangas (NA 1), 2 Seguranças corporativas (NA 2), 4 Civis (NA 0, operários). Corp: 4 Seguranças corporativas (NA 2) e 2 Cães cibernéticos (NA 2).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a water treatment plant seen from above, three large circular clarifier tanks of dark water with radial walkways, straight concrete channels with narrow catwalks, two cylindrical chemical dosing tanks, a pump house with a flat roof, a small control building, chain link fences, pipes as thick dark bands, ground as flat light gray concrete. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (toxic green) used sparingly on the glowing green chemical dosing tank. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m060" cat="ind" nome="Data center" arquivo="m060-data-center.webp" grade="30x20" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="electric cyan" -->
#### M060. Data center

| Campo | Valor |
|---|---|
| **Categoria** | Indústria, porto e infraestrutura |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Ciano elétrico (as fileiras de racks piscando em ciano) |
| **Arquivo** | `m060-data-center.webp` |

**Descrição:** Um data center com corredores de racks de servidores em fileiras, uma sala de resfriamento, uma sala de controle, uma eclusa de segurança e uma central elétrica. O ar é frio e o zumbido, constante. É o coração físico da Rede. Ótimo para invasões, sabotagem e para cenas em que corpo e hack acontecem ao mesmo tempo.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Fileiras de racks | corredores estreitos, cobertura |
| Sala de resfriamento | tubos e ventiladores |
| Sala de controle | painel da rede |
| Eclusa de segurança | duas portas, leitor biométrico |
| Central elétrica | geradores e baterias |

**Cobertura e perigos:** Racks dão cobertura +2 de CA. Tiros nos racks provocam Curto-circuito (Perigo 5) e derrubam trechos da Rede.

**Ganchos de uso**

1. O servidor com os dados está numa fileira específica e o grupo tem 15 minutos antes do backup
2. Um hacker precisa ficar conectado enquanto o corpo é defendido
3. A Obelisco notou uma invasão remota e mandou reforço

**Ameaças típicas:** Rua: 2 Seguranças corporativas (NA 2). Corp: 4 Seguranças corporativas (NA 2), 1 Netrunner corporativo (NA 3), 1 Torreta (NA 3), 1 Robô de segurança (NA 4). Elite: Oráculo (IA, NA 9, remota).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a data center hall with long parallel aisles of tall server racks drawn as dark rectangles with small bright dots, a cooling plant room with big round fans and thick pipes, a glass-walled control room with consoles, a security airlock with two doors at the south edge, a power room with generators and battery banks, cable trays on the floor as dark bands, raised floor as flat gray tiles. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the rows of server racks blinking in cyan. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

### Categoria 7: Transporte e aeroportos

Trens, metrô, ônibus, aeroportos, aviões e heliportos. Cenários em movimento e rotas de fuga.

<!-- MAP id="m061" cat="trans" nome="Estação de maglev, plataformas e saguão" arquivo="m061-estacao-maglev.webp" grade="36x24" ar="3:2" ambiente="interior" luz="claro" entrada="sul" cor="neon violet" pacote="sim" -->
#### M061. Estação de maglev, plataformas e saguão

| Campo | Valor |
|---|---|
| **Categoria** | Transporte e aeroportos |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Violeta néon (o trem maglev parado com a porta aberta) |
| **Arquivo** | `m061-estacao-maglev.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Uma estação elevada de maglev com saguão de bilheteria, catracas, duas plataformas laterais, um trem parado na via central, escadas rolantes, uma lanchonete e um banheiro. Painéis de partida cobrem as paredes. O espaço é amplo e cheio de gente. Perfeito para tiroteios em multidão, fuga por trem, escolta e infiltração.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Saguão de bilheteria | balcões e catracas |
| Plataformas laterais | bancos e pilares |
| Via central com o trem | porta aberta, vagão vazio |
| Escadas rolantes | ligam o saguão às plataformas |
| Lanchonete | balcão e cozinha pequena |

**Cobertura e perigos:** Pilares, bancos e catracas dão cobertura +2 de CA. A multidão gera Tumulto (Perigo 6). O trem pode partir: quem estiver nele sai do mapa.

**Ganchos de uso**

1. O alvo embarca às 22h30 e o plano é interceptá-lo na plataforma
2. Uma maleta é trocada por outra no banco da plataforma 2
3. Uma blitz bloqueia as catracas e o grupo precisa entrar no trem a qualquer custo

**Ameaças típicas:** Rua: 12 Civis (NA 0), 4 Policiais urbanos (NA 1), 3 Capangas (NA 1). Corp: 3 Seguranças corporativas (NA 2) e 1 Agente corporativo de campo (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an elevated maglev train station seen from above, a ticket hall with counters and a row of turnstile gates at the south, two side platforms with benches and square pillars, a central track with a sleek train parked and one door open, two pairs of escalators between hall and platforms, a small snack bar, an information board as a dark panel, floor as flat light gray tiles. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon violet) used sparingly on the maglev train standing with a door open. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m062" cat="trans" nome="Estação de metrô subterrânea" arquivo="m062-estacao-metro.webp" grade="36x24" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon orange" -->
#### M062. Estação de metrô subterrânea

| Campo | Valor |
|---|---|
| **Categoria** | Transporte e aeroportos |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Laranja néon (a luz de aviso amarelada do trilho eletrificado) |
| **Arquivo** | `m062-estacao-metro.webp` |

**Descrição:** Uma estação de metrô subterrânea com saguão, bilheteria, catracas, escadas, uma plataforma central entre duas vias, um túnel escuro em cada ponta e uma sala de manutenção. Pilares de concreto e bancos dão forma ao espaço. O chão tem uma linha amarela de segurança. Serve para tiroteios apertados, emboscadas e fugas pelas vias.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Saguão e catracas | filtro de entrada |
| Plataforma central | bancos e pilares |
| Vias do trem | queda de 1 m, trilho eletrificado |
| Túneis | escuros, fuga para as vias |
| Sala de manutenção | porta de ferro e ferramentas |

**Cobertura e perigos:** Pilares e bancos dão cobertura +2 de CA. O trilho eletrificado causa Curto-circuito (Perigo 5). Um trem chegando atropela quem estiver na via: 4d6 (DES CD 14 para evitar).

**Ganchos de uso**

1. O grupo precisa pegar o trem seguinte para escapar de uma blitz
2. Um informante marcou encontro no último banco da plataforma
3. Alguém empurra um alvo para os trilhos e um trem vem em 3 rodadas

**Ameaças típicas:** Rua: 10 Civis (NA 0), 3 Policiais urbanos (NA 1), 4 Capangas (NA 1). Corp: 2 Seguranças corporativas (NA 2) e 1 Caçador de sintéticos (NA 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an underground metro station seen from above, an entrance hall with ticket machines and turnstile gates at the south, a central island platform with benches and thick square pillars between two tracks, a painted safety line shown as a pale stripe along the platform edge, dark tunnel mouths at the east and west ends, a small maintenance room with an iron door, tiled floor as flat medium gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the amber warning light along the electrified rail. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m063" cat="trans" nome="Vagão de maglev em movimento" arquivo="m063-vagao-maglev.webp" grade="35x15" ar="21:9" ambiente="interior" luz="claro" entrada="oeste" cor="electric cyan" -->
#### M063. Vagão de maglev em movimento

| Campo | Valor |
|---|---|
| **Categoria** | Transporte e aeroportos |
| **Grade** | 35 x 15 casas (1 casa = 1,5 m), 3500 x 1500 px no Foundry |
| **Proporção** | 21:9 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Ciano elétrico (a porta de conexão do vagão executivo) |
| **Arquivo** | `m063-vagao-maglev.webp` |

**Descrição:** Três vagões de um maglev ligados, vistos de cima: um vagão comum com assentos em fileiras, um vagão-restaurante e um vagão executivo com cabines e uma sala de segurança. Corredores estreitos e portas de conexão limitam o movimento. O trem corre a 300 km/h e uma janela quebrada é uma sentença. Cenário de assassinato, assalto em movimento e escolta.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Vagão comum | assentos em fileiras, corredor central |
| Vagão-restaurante | balcão, mesas e cozinha |
| Vagão executivo | cabines trancadas |
| Sala de segurança | porta de aço e painel |
| Portas de conexão | passagens estreitas entre vagões |

**Cobertura e perigos:** Assentos e mesas dão cobertura +2 de CA. Tiros em janelas causam descompressão leve: FOR CD 12 ou fica sem ação por 1 rodada. A velocidade do trem gera Queda (Perigo 8) fatal ao sair.

**Ganchos de uso**

1. O alvo viaja no vagão executivo e o grupo tem 20 minutos até a próxima parada
2. Um assalto simultâneo de duas equipes rivais explode no vagão-restaurante
3. O trem precisa ser parado a qualquer custo antes de chegar ao destino

**Ameaças típicas:** Rua: 12 Civis (NA 0), 3 Capangas (NA 1). Corp: 4 Seguranças corporativas (NA 2), 1 Agente corporativo de campo (NA 4) e 1 Drone de combate (NA 2). Elite: 1 Operador de elite (NA 5).

**Prompt (Gemini):**

```text
Create an image in 21:9 ultra-wide landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a long train interior seen from above in a wide horizontal strip, three connected maglev cars: the left car with rows of paired seats along a central aisle, the middle car as a dining car with a counter and small tables, the right car as an executive car with closed private cabins, narrow connecting doors between cars, a heavy steel door of a security room at the far right end, windows along both long sides drawn as thin pale bands, floor as flat medium gray. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 35 by 15 squares of 1.5 meters (52.5 by 22.5 meters), so a standard single door is about one square wide, roughly 2.9% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the connecting door of the executive car. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m064" cat="trans" nome="Terminal rodoviário" arquivo="m064-terminal-rodoviario.webp" grade="36x24" ar="3:2" ambiente="misto" luz="claro" entrada="sul" cor="neon orange" -->
#### M064. Terminal rodoviário

| Campo | Valor |
|---|---|
| **Categoria** | Transporte e aeroportos |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Misto (interior e exterior), luz clara |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Laranja néon (o ônibus que arranca com o letreiro aceso) |
| **Arquivo** | `m064-terminal-rodoviario.webp` |

**Descrição:** Um terminal de ônibus intermunicipal com um hall de bilheteria, lanchonetes, banheiros, bancos de espera, guichês de objetos perdidos e seis baias de embarque onde os ônibus manobram. Painéis de partida cobrem as paredes. O barulho, o fluxo e o cheiro de diesel tomam tudo. Ótimo para encontros, escolta, perseguições e fugas de ônibus.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Hall de bilheteria | balcões e filas |
| Salas de espera | bancos e vending machines |
| Baias de embarque | seis ônibus parados |
| Lanchonetes | balcões e cozinha |
| Banheiros e armários de bagagem | esconderijos |

**Cobertura e perigos:** Bancos, balcões e ônibus dão cobertura +2 de CA. A multidão gera Tumulto (Perigo 6). Ônibus em movimento atropelam: 3d6 (DES CD 12).

**Ganchos de uso**

1. O alvo só viaja de ônibus e o grupo precisa estar no mesmo ou plantar algo nele
2. Uma mala trocada tem um item que três facções querem
3. O ônibus parte em 5 minutos e o grupo precisa embarcar o refém

**Ameaças típicas:** Rua: 15 Civis (NA 0), 4 Policiais urbanos (NA 1), 4 Capangas (NA 1). Corp: 2 Seguranças corporativas (NA 2).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an intercity bus terminal seen from above, a ticket hall with counters, benches in rows and vending machines on the south half, small shops and a snack bar along one wall, restrooms and luggage lockers in a corner, six long bus bays on the north half with six buses parked at angles, a driveway curving around the building, concrete floor as flat light gray with painted white bay lines. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the departing bus with its destination sign lit. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m065" cat="trans" nome="Aeroporto, terminal de embarque" arquivo="m065-aeroporto-terminal.webp" grade="36x24" ar="3:2" ambiente="interior" luz="claro" entrada="sul" cor="electric cyan" pacote="sim" -->
#### M065. Aeroporto, terminal de embarque

| Campo | Valor |
|---|---|
| **Categoria** | Transporte e aeroportos |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Ciano elétrico (o portão de embarque com a porta aberta) |
| **Arquivo** | `m065-aeroporto-terminal.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Um terminal de aeroporto com saguão de check-in, esteiras de bagagem, controle de segurança com scanners, um corredor de lojas e restaurantes, e uma fileira de portões de embarque. Painéis de voos pendem do teto. O fluxo é intenso. Serve para tiroteios na multidão, perseguições de esteira, intercepções e fugas de última hora.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Saguão de check-in | balcões e filas |
| Esteiras de bagagem | terreno difícil, caminho oculto |
| Controle de segurança | scanners e revista |
| Corredor de lojas | vitrines e quiosques |
| Portões de embarque | portas para o avião |

**Cobertura e perigos:** Balcões, esteiras e quiosques dão cobertura +2 de CA. O controle de segurança detecta armas e cromo: CAR ou DES CD 14 para burlar. A multidão gera Tumulto (Perigo 6).

**Ganchos de uso**

1. O alvo embarca em 10 minutos e o grupo precisa passar pelo controle
2. Uma mala com um item ilegal precisa mudar de dono antes do embarque
3. Um dos runners tem um nome na lista de procurados

**Ameaças típicas:** Rua: 15 Civis (NA 0), 6 Policiais urbanos (NA 1) e 2 Drones de vigilância (NA 1). Corp: 4 Seguranças corporativas (NA 2), 1 Agente corporativo de campo (NA 4) e 1 Atirador de elite (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an airport terminal concourse seen from above, a check-in hall with long rows of counters at the south, baggage conveyor belts running behind the counters, a security checkpoint with scanner arches and tables across the middle, a long concourse corridor with shop kiosks and restaurants, a row of boarding gates along the north edge, flight board panels as dark rectangles, floor as flat light gray tiles. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the boarding gate with its door open. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m066" cat="trans" nome="Aeroporto, pista e hangar" arquivo="m066-aeroporto-pista-hangar.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="escuro" entrada="oeste" cor="neon orange" -->
#### M066. Aeroporto, pista e hangar

| Campo | Valor |
|---|---|
| **Categoria** | Transporte e aeroportos |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, escuro |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Laranja néon (as luzes de pista do jato executivo em taxiamento) |
| **Arquivo** | `m066-aeroporto-pista-hangar.webp` |

**Descrição:** Uma parte da pista de um aeroporto à noite, com uma pista de táxi, um hangar de manutenção, um jato executivo, um caminhão de combustível, uma torre de controle ao longe e uma cerca de arame. As luzes de pista desenham linhas. Ótimo para fugas de avião, perseguições na pista e sequestros.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Pista de táxi | faixa larga e aberta |
| Hangar de manutenção | portas amplas, guindaste |
| Jato executivo | estacionado, escada abaixada |
| Caminhão de combustível | cobertura e perigo de explosão |
| Cerca de arame | perímetro com portão |

**Cobertura e perigos:** O hangar e o caminhão dão cobertura +2 de CA. Um tiro no combustível causa explosão (3d6, raio Próximo) e Incêndio (Perigo 2). A pista aberta tem pouca cobertura.

**Ganchos de uso**

1. O jato decola em 5 minutos com o alvo a bordo
2. O grupo precisa infiltrar um hangar para roubar uma peça
3. Um piloto desertor quer fugir da cidade e pede escolta

**Ameaças típicas:** Rua: 4 Seguranças corporativas (NA 2), 2 Capangas (NA 1). Corp: 4 Soldados de esquadrão (NA 4), 1 Torreta (NA 3) e 1 Helicóptero leve (veículo médio).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, part of an airport airfield at night seen from above, a wide taxiway with painted center lines, a large maintenance hangar with open doors on the north, a parked executive jet with its stairs down in front of the hangar, a refueling truck beside it, a control tower base at the corner, a chain link perimeter fence with a gate on the west edge, runway edge lights as small white dots, ground as flat dark gray asphalt. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the runway lights around the taxiing executive jet. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m067" cat="trans" nome="Avião de passageiros, fuselagem" arquivo="m067-aviao-fuselagem.webp" grade="35x15" ar="21:9" ambiente="interior" luz="penumbra" entrada="oeste" cor="neon crimson red" -->
#### M067. Avião de passageiros, fuselagem

| Campo | Valor |
|---|---|
| **Categoria** | Transporte e aeroportos |
| **Grade** | 35 x 15 casas (1 casa = 1,5 m), 3500 x 1500 px no Foundry |
| **Proporção** | 21:9 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Vermelho néon (a porta da cabine do piloto fechada com luz vermelha) |
| **Arquivo** | `m067-aviao-fuselagem.webp` |

**Descrição:** Um avião de passageiros de corredor duplo visto de cima, com a cobertura removida: cabine do piloto na ponta, cozinha, classe executiva, classe econômica com seis fileiras de assentos e um corredor de serviço no fundo. Portas de emergência ficam nas laterais. A pressão da cabine é perigo constante. Cenário de sequestro, assassinato em voo e fuga pela rampa.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Cabine do piloto | porta blindada e painel |
| Cozinha | carrinhos e armários |
| Classe executiva | poltronas largas |
| Classe econômica | fileiras de assentos, corredor duplo |
| Corredor de serviço | porta de carga e rampa |

**Cobertura e perigos:** Assentos dão cobertura +2 de CA. Um tiro na fuselagem causa descompressão leve: FOR CD 12 ou fica sem ação por 1 rodada. Saltar a mais de 3.000 m é fatal sem equipamento.

**Ganchos de uso**

1. O alvo viaja na executiva e o grupo precisa agir antes do pouso
2. Um sequestro em curso é só uma fachada para roubar um item da carga
3. O avião está em rota de colisão e o grupo precisa chegar à cabine

**Ameaças típicas:** Rua: 20 Civis (NA 0), 3 Capangas (NA 1). Corp: 4 Seguranças corporativas (NA 2), 1 Agente corporativo de campo (NA 4) e 1 Netrunner corporativo (NA 3). Elite: 2 Operadores de elite (NA 5).

**Prompt (Gemini):**

```text
Create an image in 21:9 ultra-wide landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a wide-body airliner cut open seen from above in a horizontal strip, a cockpit with a reinforced door at the left nose, a galley with trolleys, a business class section of wide seats, an economy section of many rows of seats split by two aisles, a rear service corridor and a cargo door at the right tail, round emergency door cutouts along both sides, thin curved window bands, floor as flat medium gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 35 by 15 squares of 1.5 meters (52.5 by 22.5 meters), so a standard single door is about one square wide, roughly 2.9% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the closed cockpit door with a red status light. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m068" cat="trans" nome="Jato executivo e pátio de estacionamento" arquivo="m068-jato-executivo.webp" grade="24x16" ar="3:2" ambiente="misto" luz="penumbra" entrada="sul" cor="neon gold" -->
#### M068. Jato executivo e pátio de estacionamento

| Campo | Valor |
|---|---|
| **Categoria** | Transporte e aeroportos |
| **Grade** | 24 x 16 casas (1 casa = 1,5 m), 2400 x 1600 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Misto (interior e exterior), penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Dourado néon (a mala metálica aberta sobre a mesa da cabine) |
| **Arquivo** | `m068-jato-executivo.webp` |

**Descrição:** Um jato executivo pequeno, visto com o teto removido: cabine com poltronas de couro, um bar, uma mesa de reunião, um quarto de descanso e uma cabine do piloto. À sua volta, um pátio de aeroporto com escada, caminhão de combustível e um carro blindado. Serve para negociações de alto nível, assassinato de executivos e fugas de elite.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Cabine principal | poltronas de couro e mesa |
| Bar e cozinha | balcão pequeno |
| Quarto de descanso | cama e armário |
| Cabine do piloto | porta de aço e painel |
| Pátio externo | escada, carro e caminhão |

**Cobertura e perigos:** Poltronas e mesa dão cobertura +2 de CA. Espaço apertado: armas longas e Rajada têm desvantagem. A porta é única: bloqueá-la prende todos dentro.

**Ganchos de uso**

1. O alvo reúne-se com dois executivos antes da decolagem e a equipe tem 10 minutos
2. O grupo precisa roubar o jato e pilotá-lo sem licença
3. Uma mala de dados é entregue no pátio e a equipe tenta trocá-la

**Ameaças típicas:** Rua: 2 Seguranças corporativas (NA 2). Corp: 1 Diretor (NA 3), 2 Agentes corporativos de campo (NA 4) e 2 Seguranças corporativas (NA 2). Elite: 1 Operador de elite (NA 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a private jet cut open seen from above with its roof removed, a main cabin of four leather armchairs around a conference table, a small bar with a counter, a rest compartment with a bed, a cockpit with a steel door at the nose, the boarding stairs at the side, small round windows along the hull, surrounded by a small airport apron with a fuel truck and an armored car, floor as flat dark gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 24 by 16 squares of 1.5 meters (36 by 24 meters), so a standard single door is about one square wide, roughly 4.2% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon gold) used sparingly on the open metal briefcase on the cabin table. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m069" cat="trans" nome="Estação de aerotáxi no telhado" arquivo="m069-estacao-aerotaxi.webp" grade="30x20" ar="3:2" ambiente="exterior" luz="escuro" entrada="leste" cor="neon orange" -->
#### M069. Estação de aerotáxi no telhado

| Campo | Valor |
|---|---|
| **Categoria** | Transporte e aeroportos |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, escuro |
| **Entrada dos runners** | Borda leste |
| **Cor de destaque** | Laranja néon (a plataforma de pouso onde o aerocarro desce) |
| **Arquivo** | `m069-estacao-aerotaxi.webp` |

**Descrição:** O topo de um edifício convertido em estação de aerotáxi, com quatro plataformas de pouso, uma sala de espera envidraçada, um balcão de cobrança, um depósito de baterias e uma escada de serviço. Aerocarros chegam e saem o tempo todo. O vento é forte e a queda, mortal. Cenário de encontro, fuga aérea e perseguição.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Plataformas de pouso | quatro círculos abertos |
| Sala de espera | vidro e sofás |
| Balcão de cobrança | terminal e câmera |
| Depósito de baterias | perigo de explosão |
| Escada de serviço | descida para a rua |

**Cobertura e perigos:** Sala de espera e depósito dão cobertura +2 de CA. Vento forte: tiros longos têm desvantagem. A borda do telhado leva a Queda (Perigo 8).

**Ganchos de uso**

1. O grupo precisa pegar um aerotáxi sem passar pelo balcão de cobrança
2. Um aerocarro corporativo pousa com um alvo e pouca escolta
3. Uma perseguição aérea começa aqui e um dos runners precisa saltar

**Ameaças típicas:** Rua: 6 Civis (NA 0), 2 Seguranças corporativas (NA 2), 2 Capangas (NA 1). Corp: 4 Seguranças corporativas (NA 2), 1 Drone de combate (NA 2) e 1 Aerocarro corporativo (veículo médio).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a rooftop air taxi station at night seen from above, four circular landing pads painted with rings, one with a small aircar parked on it, a glass-walled waiting room with sofas, a payment counter kiosk, a battery storage shed with warning markings, a service stair shed, low parapet walls around the edge, wind sock pole, gravel roof surface as flat gray. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the landing pad where the aircar descends. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m070" cat="trans" nome="Pátio de manobras ferroviário" arquivo="m070-patio-manobras.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="penumbra" entrada="oeste" cor="neon amber" -->
#### M070. Pátio de manobras ferroviário

| Campo | Valor |
|---|---|
| **Categoria** | Transporte e aeroportos |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Âmbar néon (a locomotiva diesel com o farol aceso) |
| **Arquivo** | `m070-patio-manobras.webp` |

**Descrição:** Um pátio ferroviário de carga com seis linhas paralelas, vagões-tanque, vagões abertos, uma locomotiva, um galpão de manutenção, uma torre de sinalização e um agulheiro. O chão é de brita e dormentes. Trens passam o tempo todo. Serve para assaltos de trem, tiroteios móveis e fugas pelas linhas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Linhas paralelas | seis trilhos com vagões |
| Vagões-tanque | combustível e risco de incêndio |
| Locomotiva | cabine blindada |
| Galpão de manutenção | oficina e fosso |
| Torre de sinalização | controle de agulhas |

**Cobertura e perigos:** Vagões dão cobertura +2 de CA. Tiros em vagões-tanque causam Incêndio (Perigo 2) e explosão (2d6, raio Perto). Trens em movimento atropelam: 4d6 (DES CD 14).

**Ganchos de uso**

1. O grupo precisa saltar num trem de carga em movimento e roubar um vagão
2. Um carregamento de armas é trocado no pátio
3. A Rede Aurora esconde sintéticos num vagão de carga e precisa de proteção

**Ameaças típicas:** Rua: 6 Capangas (NA 1), 2 Atiradores de gangue (NA 1), 1 Líder de gangue (NA 3). Corp: 4 Mercenários (NA 3), 2 Seguranças corporativas (NA 2) e 1 Torreta (NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a freight rail yard seen from above, six parallel railway tracks with wooden sleepers shown as thin bars, freight wagons parked on several tracks including two cylindrical tank wagons, a diesel locomotive at one end, a maintenance shed with a pit, a small signal tower with a flat roof, a railway switch crossing in the middle, crushed gravel ground as flat light gray, tracks as dark thin lines. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon amber) used sparingly on the diesel locomotive with its headlight lit. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

### Categoria 8: Navios, plataformas e bases militares

Porta-aviões, cargueiros, submarino, plataforma offshore, bases e bunkers. Escala de guerra e de contrabando.

<!-- MAP id="m071" cat="mil" nome="Porta-aviões, convoo" arquivo="m071-porta-avioes-convoo.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="claro" entrada="oeste" cor="neon orange" pacote="sim" -->
#### M071. Porta-aviões, convoo

| Campo | Valor |
|---|---|
| **Categoria** | Navios, plataformas e bases militares |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, luz clara |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Laranja néon (o elevador de aeronaves aberto com o caça subindo) |
| **Arquivo** | `m071-porta-avioes-convoo.webp` |
| **Pacote essencial** | Sim |

**Descrição:** O convoo de um porta-aviões visto de cima, com a ilha de comando à direita, duas pistas pintadas, três caças estacionados, um VTOL de assalto, um elevador de aeronaves, carrinhos de munição e um trecho da borda com redes de segurança. Vento forte e ondas ao fundo. Cenário de assalto naval, fuga de helicóptero, tiroteio entre mechas e sabotagem aérea.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Ilha de comando | torre alta, porta blindada |
| Pistas pintadas | faixas largas, sem cobertura |
| Caças estacionados | cobertura sólida |
| Elevador de aeronaves | abre para o hangar |
| Carrinhos de munição | perigo de explosão |
| Borda do convoo | redes e queda de 20 m |

**Cobertura e perigos:** Caças, carrinhos e a ilha dão cobertura +2 de CA. A borda do convoo leva a Queda (Perigo 8) para o mar. Vento forte: tiros longos têm desvantagem.

**Ganchos de uso**

1. O grupo precisa roubar um VTOL e decolar antes que o convoo seja fechado
2. Um comandante traidor entrega um código de lançamento
3. O porta-aviões está em alerta máximo e o grupo infiltrou-se como técnicos de manutenção

**Ameaças típicas:** Corp: 6 Soldados de esquadrão (NA 4) e 2 Drones de combate (NA 2). Elite: 2 Operadores de elite (NA 5), 1 Comandante de esquadrão (NA 6) e 1 Mecha Caminhante (NA 5). Veículos: VTOL de assalto e Helicóptero de ataque (NA 8).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, the flight deck of an aircraft carrier seen from above, a long gray deck with two painted runway lines and a curved landing line, a tall island superstructure on the right edge, three fighter jets parked in a row near the island, a large vertical rotor transport parked at the stern, an open aircraft elevator platform, ammunition carts and tow tractors, safety nets along the edge, dark sea as a flat black band at the edge with thin white wave lines. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the aircraft elevator open with a fighter rising on it. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m072" cat="mil" nome="Porta-aviões, hangar e oficina de aeronaves" arquivo="m072-hangar-porta-avioes.webp" grade="36x24" ar="3:2" ambiente="interior" luz="penumbra" entrada="leste" cor="neon amber" -->
#### M072. Porta-aviões, hangar e oficina de aeronaves

| Campo | Valor |
|---|---|
| **Categoria** | Navios, plataformas e bases militares |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda leste |
| **Cor de destaque** | Âmbar néon (o caça em reparo com os spots de solda) |
| **Arquivo** | `m072-hangar-porta-avioes.webp` |

**Descrição:** O hangar interno de um porta-aviões, com quatro caças em manutenção, bancadas, pontes rolantes, estantes de peças, uma sala de armamentos e o elevador de aeronaves ao fundo. O ar tem cheiro de óleo e metal. Serve para sabotagem, roubo de armamento, combates entre mechas e fugas por baixo.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Caças em reparo | cobertura sólida e perigo de combustível |
| Bancadas e estantes | ferramentas e peças |
| Ponte rolante | guindaste para içar cargas |
| Sala de armamentos | cofre com mísseis |
| Elevador de aeronaves | leva ao convoo |

**Cobertura e perigos:** Caças e estantes dão cobertura +2 de CA. Combustível derramado e armas armazenadas causam Incêndio (Perigo 2) e explosão (3d6, raio Próximo).

**Ganchos de uso**

1. O grupo precisa sabotar um caça antes da missão de amanhã
2. A sala de armamentos guarda um míssil que um cliente paga caro
3. Um mecânico desertor oferece uma rota de fuga em troca de proteção

**Ameaças típicas:** Corp: 4 Soldados de esquadrão (NA 4), 2 Seguranças corporativas (NA 2) e 1 Robô pesado de combate (NA 6). Elite: 2 Operadores de elite (NA 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an aircraft carrier hangar bay interior seen from above, four jet fighters parked under maintenance with wings folded, long workbenches and tall parts shelves along the walls, an overhead gantry crane rail crossing the hall, a locked armory room with a steel door in a corner, a large aircraft elevator platform at the far end, oil stains and hose reels, deck floor as flat dark gray with pale hazard stripes. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon amber) used sparingly on the fighter under repair with welding sparks. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m073" cat="mil" nome="Ponte de comando de navio de guerra" arquivo="m073-ponte-comando.webp" grade="30x20" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="electric cyan" -->
#### M073. Ponte de comando de navio de guerra

| Campo | Valor |
|---|---|
| **Categoria** | Navios, plataformas e bases militares |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Ciano elétrico (o painel de radar tático no centro da ponte) |
| **Arquivo** | `m073-ponte-comando.webp` |

**Descrição:** A ponte de comando de um navio de guerra, com janelas panorâmicas à frente, a cadeira do comandante, o leme, o painel de radar, mesas de cartas, estações de armas e comunicações, e uma sala de navegação anexa. Tudo é escuro, com a luz azulada dos painéis. Ótimo para motins, sequestros do navio e confrontos com o comandante.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Janelas panorâmicas | vidro blindado e vista |
| Cadeira do comandante | plataforma central |
| Painel de radar | cobertura baixa e hack CD 15 |
| Estações de armas e comunicações | consoles |
| Sala de navegação | mapas e computador |

**Cobertura e perigos:** Consoles e a plataforma dão cobertura +2 de CA. Tiros nas janelas causam descompressão leve (FOR CD 12). Hackear o painel muda o rumo do navio.

**Ganchos de uso**

1. O grupo precisa assumir o comando do navio antes que a tripulação reaja
2. O comandante guarda ordens secretas que alguém quer
3. Um hacker precisa desligar a defesa do navio a partir do console de armas

**Ameaças típicas:** Corp: 3 Soldados de esquadrão (NA 4) e 1 Comandante de esquadrão (NA 6). Elite: 1 Operador de elite (NA 5) e 1 Netrunner mestre (NA 7).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, the bridge of a warship seen from above, a curved row of panoramic windows along the front wall, a raised commander's chair platform in the center, a ship wheel and helm console, a large round tactical radar table, weapon and communications stations along the side walls, a navigation chart table in a side room, a steel hatch door at the south edge, deck floor as flat dark gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the tactical radar display in the center of the bridge. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m074" cat="mil" nome="Navio cargueiro, convés" arquivo="m074-cargueiro-conves.webp" grade="35x15" ar="21:9" ambiente="exterior" luz="penumbra" entrada="oeste" cor="neon crimson red" -->
#### M074. Navio cargueiro, convés

| Campo | Valor |
|---|---|
| **Categoria** | Navios, plataformas e bases militares |
| **Grade** | 35 x 15 casas (1 casa = 1,5 m), 3500 x 1500 px no Foundry |
| **Proporção** | 21:9 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Vermelho néon (o escotilhão aberto com a luz vermelha do porão) |
| **Arquivo** | `m074-cargueiro-conves.webp` |

**Descrição:** O convés de um navio cargueiro, longo e estreito, com contêineres empilhados em filas, escotilhões de carga abertos, guindastes de bordo, uma superestrutura de tripulação na popa e uma borda de segurança. A água bate no casco. Serve para abordagem, contrabando, perseguição de lancha e fugas pelo mar.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Contêineres empilhados | corredores estreitos de cobertura |
| Escotilhões de carga | descem ao porão |
| Guindastes de bordo | estruturas altas |
| Superestrutura da popa | ponte e alojamentos |
| Borda de segurança | queda de 10 m para o mar |

**Cobertura e perigos:** Contêineres dão cobertura total (+4 de CA). A borda leva a Queda (Perigo 8) para o mar. Balanço do mar: DES CD 10 ao correr ou cai.

**Ganchos de uso**

1. O grupo precisa abordar o navio em movimento por lancha e achar um contêiner marcado
2. A tripulação é de contrabandistas e esconde um passageiro
3. Uma tempestade chega em 10 minutos e a água invade o convés

**Ameaças típicas:** Rua: 6 Capangas (NA 1), 2 Atiradores de gangue (NA 1) e 1 Líder de gangue (NA 3). Corp: 4 Mercenários (NA 3) e 1 Barco de patrulha (veículo médio).

**Prompt (Gemini):**

```text
Create an image in 21:9 ultra-wide landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, the deck of a cargo ship seen from above in a long horizontal strip, rows of stacked shipping containers with narrow aisles, two open cargo hatches showing dark holds, two deck cranes on rails, the stern superstructure with the bridge on the right end, a railing along both long edges, dark sea as flat black bands along the top and bottom edges with thin white wave lines, deck as flat medium gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 35 by 15 squares of 1.5 meters (52.5 by 22.5 meters), so a standard single door is about one square wide, roughly 2.9% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the open cargo hatch with red light from the hold. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m075" cat="mil" nome="Navio, casa de máquinas" arquivo="m075-casa-maquinas.webp" grade="30x20" ar="3:2" ambiente="interior" luz="escuro" entrada="norte" cor="neon amber" -->
#### M075. Navio, casa de máquinas

| Campo | Valor |
|---|---|
| **Categoria** | Navios, plataformas e bases militares |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda norte |
| **Cor de destaque** | Âmbar néon (o motor principal com os cilindros brilhando de calor) |
| **Arquivo** | `m075-casa-maquinas.webp` |

**Descrição:** A casa de máquinas de um navio, com um motor principal gigante no centro, geradores laterais, dutos de ventilação, passarelas metálicas em dois níveis, uma sala de controle e escadas estreitas. O calor, o barulho e o óleo dominam. Serve para sabotagem, afundamento do navio e lutas em ambiente claustrofóbico.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Motor principal | massa de metal no centro |
| Geradores laterais | dois lados da sala |
| Passarelas metálicas | níveis alto e baixo |
| Sala de controle | painel do motor |
| Escadas estreitas | acesso aos conveses |

**Cobertura e perigos:** Motores e geradores dão cobertura +2 de CA. Vapor e óleo causam Incêndio (Perigo 2) e Curto-circuito (Perigo 5). O barulho dá desvantagem em testes de escuta.

**Ganchos de uso**

1. O grupo precisa afundar o navio sem ser afundado junto
2. Um engenheiro refugiado esconde um item entre os motores
3. A água começa a subir e a saída é a escada do convés superior

**Ameaças típicas:** Rua: 3 Capangas (NA 1). Corp: 4 Mercenários (NA 3), 2 Seguranças corporativas (NA 2), 1 Robô de segurança (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a ship engine room seen from above, a huge main engine block with cylinders in the center, two generators on the sides, thick ventilation ducts along the ceiling edge, metal catwalks in two levels with railings, a small glass control room in a corner, narrow steel staircases at the north edge, pipes and valves along the walls, steel floor as flat dark gray with grating patterns. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon amber) used sparingly on the main engine with cylinders glowing from heat. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m076" cat="mil" nome="Iate de luxo" arquivo="m076-iate-luxo.webp" grade="30x20" ar="3:2" ambiente="misto" luz="penumbra" entrada="sul" cor="neon gold" -->
#### M076. Iate de luxo

| Campo | Valor |
|---|---|
| **Categoria** | Navios, plataformas e bases militares |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Misto (interior e exterior), penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Dourado néon (a piscina de popa com a luz dourada) |
| **Arquivo** | `m076-iate-luxo.webp` |

**Descrição:** Um iate de luxo com convés de popa, piscina pequena, bar, sala de estar interna, cabines de luxo, uma cabine do capitão, um convés superior com heliponto e uma plataforma de mergulho. Tudo é caro e elegante. Cenário de festas de elite, sequestros de VIP, negociações e abordagens piratas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Convés de popa com piscina | festa e vista |
| Bar e sala de estar | sofás e vidro |
| Cabines de luxo | quartos e cofres |
| Cabine do capitão | ponte e controle |
| Convés superior com heliponto | saída aérea |
| Plataforma de mergulho | embarque de lanchas |

**Cobertura e perigos:** Sofás, bar e muretas dão cobertura +2 de CA. Vidros blindados resistem a tiros leves. A borda leva ao mar: queda de 1d6.

**Ganchos de uso**

1. Uma festa de gala reúne executivos e o alvo estará na cabine do capitão
2. O iate foi sequestrado por mercenários e a equipe precisa retomá-lo
3. O grupo precisa embarcar como convidado e roubar um item do cofre

**Ameaças típicas:** Rua: 12 Civis (NA 0), 4 Seguranças corporativas (NA 2). Corp: 2 Agentes corporativos de campo (NA 4), 1 Diretor (NA 3). Elite: 2 Operadores de elite (NA 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a luxury yacht seen from above, a rear sun deck with a small rectangular swimming pool and lounge chairs, an interior lounge with sofas and a bar behind glass doors, a row of cabin doors along a central corridor, a captain cabin with a helm console at the front, an upper deck with a helipad circle, a diving platform at the stern, a curved hull outline with a railing, dark sea as flat black bands around the hull. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon gold) used sparingly on the stern swimming pool lit with golden light. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m077" cat="mil" nome="Submarino, interior" arquivo="m077-submarino.webp" grade="35x15" ar="21:9" ambiente="interior" luz="escuro" entrada="oeste" cor="neon crimson red" -->
#### M077. Submarino, interior

| Campo | Valor |
|---|---|
| **Categoria** | Navios, plataformas e bases militares |
| **Grade** | 35 x 15 casas (1 casa = 1,5 m), 3500 x 1500 px no Foundry |
| **Proporção** | 21:9 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Vermelho néon (a escotilha de torpedo com a luz vermelha de alerta) |
| **Arquivo** | `m077-submarino.webp` |

**Descrição:** Um submarino de ataque seccionado por compartimentos, vistos de cima: sala de torpedos, alojamentos, cozinha, centro de comando, sala de máquinas e a escotilha de popa. Corredores estreitos e portas de pressão limitam o movimento. Cada tiro parece um trovão. Perfeito para sequestros, motins e missões de sabotagem submarina.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Sala de torpedos | tubos e cargas |
| Alojamentos | beliches empilhados |
| Cozinha | cozinha minúscula |
| Centro de comando | periscópio e painéis |
| Sala de máquinas | reator e motores |
| Escotilha de popa | saída de emergência |

**Cobertura e perigos:** Beliches e painéis dão cobertura +2 de CA. Portas de pressão fecham por compartimento. Dano ao casco causa alagamento: Colapso (Perigo 4).

**Ganchos de uso**

1. O grupo precisa sequestrar o submarino sem alertar a base
2. Um desertor abre a escotilha de torpedo e a equipe tem 5 minutos
3. Uma carga ilegal está no compartimento 3 e ninguém sabe o que é

**Ameaças típicas:** Corp: 4 Soldados de esquadrão (NA 4), 1 Comandante de esquadrão (NA 6). Elite: 2 Operadores de elite (NA 5) e 1 Robô pesado de combate (NA 6).

**Prompt (Gemini):**

```text
Create an image in 21:9 ultra-wide landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a submarine hull cut open seen from above in a long horizontal strip, a torpedo room with four tube hatches at the left nose, a crew quarters with stacked bunks, a tiny galley, a command center with a periscope column and console panels, an engine room with a reactor casing and motors, an emergency escape hatch at the right tail, round pressure doors between compartments, curved hull walls as thick black bands, steel floor as flat dark gray. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 35 by 15 squares of 1.5 meters (52.5 by 22.5 meters), so a standard single door is about one square wide, roughly 2.9% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the torpedo hatch with red alert light. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m078" cat="mil" nome="Plataforma de petróleo" arquivo="m078-plataforma-petroleo.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="penumbra" entrada="sul" cor="neon amber" -->
#### M078. Plataforma de petróleo

| Campo | Valor |
|---|---|
| **Categoria** | Navios, plataformas e bases militares |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Âmbar néon (a torre de perfuração com a chama de queima) |
| **Arquivo** | `m078-plataforma-petroleo.webp` |

**Descrição:** Uma plataforma de petróleo no mar, com torre de perfuração, helipad, alojamentos, refeitório, sala de controle, guindastes, tanques de combustível e um deque de carga. O vento é forte e as ondas batem nos pilares. Cenário de sabotagem, resgate de reféns, tiroteio em altura e fugas pelo mar.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Torre de perfuração | estrutura alta de metal |
| Helipad | círculo aberto |
| Alojamentos e refeitório | prédios de contêineres |
| Sala de controle | painel e alarmes |
| Tanques de combustível | risco de explosão |
| Deque de carga | guindastes e barcos |

**Cobertura e perigos:** Contêineres e tanques dão cobertura +2 de CA. Tiros em tanques causam Incêndio (Perigo 2) e explosão (3d6, raio Próximo). A borda leva a Queda (Perigo 8) de 25 m.

**Ganchos de uso**

1. Uma equipe de resgate precisa tirar os técnicos antes que a plataforma exploda
2. O dono quer a plataforma destruída por seguro e paga para o grupo fingir um acidente
3. Um sabotador plantou cargas e o grupo tem 10 minutos para desarmá-las

**Ameaças típicas:** Rua: 6 Capangas (NA 1), 2 Seguranças corporativas (NA 2). Corp: 4 Mercenários (NA 3), 2 Torretas (NA 3), 1 Robô de segurança (NA 4). Veículo: Helicóptero leve.

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an offshore oil platform seen from above, a tall derrick drawn as a square lattice tower near one edge, a circular helipad at a corner, a stack of living quarters built from containers, a cafeteria hall, a small control building, two deck cranes, three cylindrical fuel tanks, a flare boom with a flame, steel grating deck as flat dark gray, dark sea around the edges as flat black bands. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon amber) used sparingly on the drilling derrick with its flare flame. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m079" cat="mil" nome="Base militar, portão e pátio" arquivo="m079-base-militar-patio.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="penumbra" entrada="sul" cor="neon crimson red" -->
#### M079. Base militar, portão e pátio

| Campo | Valor |
|---|---|
| **Categoria** | Navios, plataformas e bases militares |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Vermelho néon (a torre de vigia com o holofote vermelho) |
| **Arquivo** | `m079-base-militar-patio.webp` |

**Descrição:** O acesso e o pátio de uma base militar, com portão duplo, guarita, barreiras de concreto, torres de vigia, alojamentos, uma garagem de blindados, um arsenal e uma praça de armas. Holofotes varrem o chão. Veículos e soldados circulam. Cenário de infiltração, assalto armado, roubo de blindado e fuga sob fogo.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Portão duplo e guarita | scanner e armas |
| Barreiras de concreto | cobertura sólida |
| Torres de vigia | atiradores no alto |
| Alojamentos | prédios de dois andares |
| Garagem de blindados | veículos pesados |
| Arsenal | porta blindada |

**Cobertura e perigos:** Barreiras, veículos e prédios dão cobertura +2 de CA. As torres ganham +2 no ataque contra alvos sem cobertura. O Alerta sobe em 1 por rodada de tiroteio sem silenciador.

**Ganchos de uso**

1. O grupo precisa roubar um blindado sem acionar o alarme
2. Um oficial desertor abre o portão e pede escolta
3. Uma festa militar cobre a infiltração, mas a segurança está dobrada

**Ameaças típicas:** Corp: 8 Soldados de esquadrão (NA 4), 2 Atiradores de elite (NA 4) nas torres, 1 Torreta (NA 3). Elite: 1 Comandante de esquadrão (NA 6), 1 Soldado de linha pesada (NA 6). Veículos: Blindado de transporte (NA 6) e Mecha Sentinela (NA 7).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a military base entrance and parade ground seen from above, a double steel gate with a guard booth at the south edge, rows of concrete barrier blocks, four corner watchtowers with searchlight cones as flat pale wedges, two barracks buildings with flat roofs, a large armored vehicle garage with open doors, an arsenal building with a heavy door, a parade square marked with painted lines, ground as flat gray concrete. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the watchtower with its red searchlight. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m080" cat="mil" nome="Bunker subterrâneo de comando" arquivo="m080-bunker-subterraneo.webp" grade="30x20" ar="3:2" ambiente="interior" luz="escuro" entrada="norte" cor="electric cyan" -->
#### M080. Bunker subterrâneo de comando

| Campo | Valor |
|---|---|
| **Categoria** | Navios, plataformas e bases militares |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda norte |
| **Cor de destaque** | Ciano elétrico (o mapa holográfico da sala de guerra) |
| **Arquivo** | `m080-bunker-subterraneo.webp` |

**Descrição:** Um bunker de comando subterrâneo com eclusa blindada, corredor de acesso, sala de guerra com mesa holográfica, quarto do comandante, arsenal, geradores e uma saída de emergência por túnel. As paredes são de concreto grosso e a luz, azulada. Ótimo para assalto a líder inimigo, roubo de planos e fuga de uma base capturada.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Eclusa blindada | duas portas de aço |
| Corredor de acesso | torretas no teto |
| Sala de guerra | mesa holográfica no centro |
| Quarto do comandante | cama, cofre e escritório |
| Arsenal e geradores | armas e energia |
| Túnel de emergência | saída oculta |

**Cobertura e perigos:** Mesa, caixas e geradores dão cobertura +2 de CA. As portas de aço resistem a tudo, menos explosivos pesados. Cortar a energia deixa o bunker no escuro.

**Ganchos de uso**

1. O grupo precisa copiar os planos da sala de guerra antes do ataque
2. O comandante prepara uma fuga pelo túnel e o grupo quer impedir
3. A equipe está presa dentro e precisa abrir a eclusa por dentro

**Ameaças típicas:** Corp: 4 Soldados de esquadrão (NA 4), 2 Torretas (NA 3). Elite: 2 Operadores de elite (NA 5), 1 Comandante de esquadrão (NA 6) e 1 Netrunner mestre (NA 7).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an underground command bunker with thick concrete walls, a double steel airlock door at the north edge, a corridor with ceiling turrets, a war room with a large round holographic map table in the center and consoles around it, a commander room with a bed, a desk and a safe, an arsenal with weapon racks, a generator room, a hidden emergency tunnel hatch in a corner, floor as flat dark gray panels. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the holographic map table of the war room. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

### Categoria 9: Cenários do universo SombraNeon

Colmeia, Mercado do Sétimo Andar, Zona, Toca, cultos e a Rede. Os lugares que só existem neste mundo.

<!-- MAP id="m081" cat="sn" nome="Colmeia, pátio de contêineres empilhados" arquivo="m081-colmeia-patio.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="penumbra" entrada="sul" cor="neon crimson red" pacote="sim" -->
#### M081. Colmeia, pátio de contêineres empilhados

| Campo | Valor |
|---|---|
| **Categoria** | Cenários do universo SombraNeon |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Vermelho néon (a bandeira dos Cães de Vidro pendurada no contêiner central) |
| **Arquivo** | `m081-colmeia-patio.webp` |
| **Pacote essencial** | Sim |

**Descrição:** O pátio central da Colmeia, a favela vertical. Contêineres empilhados em quatro andares formam casas, lojas e bares. Escadas de ferro, passarelas e varais ligam tudo. No meio, uma praça de terra batida com uma fogueira e uma moto quebrada. As luzes são lâmpadas penduradas, e os olheiros dos Cães de Vidro vigiam cada andar.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Praça central | terra batida, fogueira e motos |
| Contêineres térreos | casas e lojas com portas de ferro |
| Escadas e passarelas | ligam os andares, estreitas |
| Bar do Vidro | contêiner maior com neon |
| Garagem de motos | Cães de Vidro e oficina |
| Becos laterais | fuga e esconderijo |

**Cobertura e perigos:** Contêineres, motos e caixas dão cobertura +2 de CA. Passarelas dão altura: +2 no ataque contra alvos abaixo. Varais e fios geram Curto-circuito (Perigo 5) em tiros desastrados.

**Ganchos de uso**

1. O grupo precisa negociar com Vidro e descobrir que o líder está perdendo o controle
2. Uma entrega de peças de cromo é interceptada na praça
3. A Guarda faz uma batida e os moradores escondem os runners

**Ameaças típicas:** Rua: 6 Capangas (NA 1), 3 Atiradores de gangue (NA 1), 2 Motoqueiros (NA 2), 2 Brutamontes cromados (NA 3). Líder: Vidro (Líder de gangue, NA 3, em ciberpsicose avançada). Corp: 3 Policiais urbanos (NA 1) e 1 Drone de vigilância (NA 1) chegam na batida.

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a vertical slum courtyard seen from above, a central dirt square with a campfire and a broken motorbike, stacks of shipping containers four levels high forming shops and homes around the square, iron staircases and narrow metal walkways linking the levels, hanging bulbs and laundry lines drawn as thin dark lines, a larger container bar with a pale lit edge, a motorbike workshop corner, narrow alleys between container stacks, ground as flat dark gray with flat cracked patches. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the Cães de Vidro flag hanging from the central container. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m082" cat="sn" nome="Colmeia, escadaria e corredores verticais" arquivo="m082-colmeia-escadaria.webp" grade="30x20" ar="3:2" ambiente="interior" luz="escuro" entrada="sul" cor="neon amber" -->
#### M082. Colmeia, escadaria e corredores verticais

| Campo | Valor |
|---|---|
| **Categoria** | Cenários do universo SombraNeon |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Âmbar néon (as lâmpadas âmbar penduradas sobre a escadaria) |
| **Arquivo** | `m082-colmeia-escadaria.webp` |

**Descrição:** Uma seção interna da Colmeia com escadarias de ferro em zigue-zague, corredores estreitos de contêineres, passarelas suspensas, pequenos mercados, uma lavanderia coletiva e uma cisterna de água. Fios e cabos pendem do teto. O espaço é claustrofóbico e a vertical é tudo. Ideal para perseguições, tiroteios em altura e emboscadas em escadas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Escadaria em zigue-zague | sobe e desce, cobertura |
| Corredores de contêineres | estreitos, portas finas |
| Passarelas suspensas | queda de 6 m |
| Mercadinho | barracas e cobertura baixa |
| Cisterna de água | perigo de queda, esconderijo |

**Cobertura e perigos:** Barracas e quinas dão cobertura +2 de CA. Passarelas têm Queda (Perigo 8), 1d6 por 3 m. O espaço apertado limita movimento a uma criatura por casa.

**Ganchos de uso**

1. O grupo persegue um informante que sobe os andares pela escada
2. Um incêndio começa no mercadinho e a Colmeia entra em pânico
3. Os Cães de Vidro cobram pedágio em cada andar e a paciência acaba

**Ameaças típicas:** Rua: 8 Civis (NA 0), 4 Capangas (NA 1), 2 Viciados em stim (NA 0), 1 Motoqueiro (NA 2). Corp: 2 Policiais urbanos (NA 1) e 1 Drone de vigilância (NA 1).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an interior section of a vertical slum with zigzag iron staircases between levels, narrow corridors built from welded shipping containers, suspended metal walkways with railings, a tiny market with canopy stalls, a shared laundry with hanging clothes lines, a round water cistern in a corner, hanging cables and bulbs as thin dark lines, floor as flat dark gray metal grating. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon amber) used sparingly on the amber bulbs hanging above the staircase. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m083" cat="sn" nome="Oficina de cromo dos Cães de Vidro" arquivo="m083-oficina-cromo.webp" grade="30x20" ar="3:2" ambiente="interior" luz="penumbra" entrada="oeste" cor="electric cyan" -->
#### M083. Oficina de cromo dos Cães de Vidro

| Campo | Valor |
|---|---|
| **Categoria** | Cenários do universo SombraNeon |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Ciano elétrico (o braço cibernético em montagem sobre a mesa de solda) |
| **Arquivo** | `m083-oficina-cromo.webp` |

**Descrição:** Uma oficina de implantes de rua num galpão grande, com bancadas de solda, cadeiras de cirurgia, prateleiras de peças usadas, uma jaula de armas e um quartinho de recuperação. Fios soltos e faíscas de solda enchem o ar. É o coração do comércio de cromo dos Cães de Vidro. Serve para compra e venda de implantes, negociação com a gangue e roubo de peças.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Bancadas de solda | faíscas e ferramentas |
| Cadeiras de cirurgia | duas cadeiras reclináveis |
| Prateleiras de peças usadas | braços, pernas e olhos |
| Jaula de armas | CD 14 para arrombar |
| Quarto de recuperação | camas e geladeira |

**Cobertura e perigos:** Bancadas e prateleiras dão cobertura +2 de CA. Faíscas e solventes causam Incêndio (Perigo 2). Peças penduradas podem cair: Colapso (Perigo 4) em tiros de arma pesada.

**Ganchos de uso**

1. O grupo precisa comprar um implante raro e o preço é um favor ao Vidro
2. Uma carga de peças roubadas da Vitalis precisa ser escondida
3. Um cirurgião da gangue está morrendo e só o grupo pode terminar a cirurgia

**Ameaças típicas:** Rua: 4 Capangas (NA 1), 2 Brutamontes cromados (NA 3), 1 Médico de beco (NA 1). Corp: 2 Seguranças corporativas (NA 2) da Vitalis, em busca das peças roubadas.

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a street cybernetics workshop in a large shed seen from above, three welding workbenches with clamps and tool racks, two reclining surgery chairs with overhead lamp arms, tall shelves of used prosthetic arms, legs and eyes, a locked weapons cage in a corner, a small recovery nook with two beds and a fridge, loose cables as thin dark lines, concrete floor as flat dark gray with flat spark marks. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the cybernetic arm being assembled on the welding table. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m084" cat="sn" nome="Mercado do Sétimo Andar" arquivo="m084-mercado-setimo-andar.webp" grade="36x24" ar="3:2" ambiente="interior" luz="penumbra" entrada="oeste" cor="neon gold" pacote="sim" -->
#### M084. Mercado do Sétimo Andar

| Campo | Valor |
|---|---|
| **Categoria** | Cenários do universo SombraNeon |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Dourado néon (o balcão da Tesoureira com a balança de ouro) |
| **Arquivo** | `m084-mercado-setimo-andar.webp` |
| **Pacote essencial** | Sim |

**Descrição:** O andar inteiro de uma torre sem dono, convertido em mercado negro: barracas, balcões de receptação, cadeiras de cirurgia, um bar de negócios, salas de reunião e o escritório da Tesoureira ao fundo. Cabos pendem do teto, luzes neon enfeitam tudo. A paz do Mercado é lei: violência dentro dele é banimento.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Corredor de barracas | receptação e cromo |
| Bar de negócios | mesas redondas |
| Cadeiras de cirurgia | implantes sob demanda |
| Salas de reunião | portas com tranca |
| Escritório da Tesoureira | cofre, livro-caixa e guardas |
| Escadas de emergência | duas fugas |

**Cobertura e perigos:** Barracas, balcões e mesas dão cobertura +2 de CA. Violência dentro do Mercado traz banimento, e os Seguranças do Mercado intervêm: Alerta sobe em 2 por tiro.

**Ganchos de uso**

1. O grupo precisa vender um item Lendário sem atrair olhares curiosos
2. Alguém vendeu a identidade de um cliente e a Tesoureira quer o culpado
3. O livro-caixa guarda nomes que uma corporação paga caro

**Ameaças típicas:** Rua: 8 Civis (NA 0), 4 Fixers (NA 1), 2 Médicos de beco (NA 1), 3 Hackers de rua (NA 1). Corp: 4 Mercenários (NA 3, Seguranças do Mercado) e A Tesoureira (Líder de gangue, NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a black market occupying a whole tower floor seen from above, a long central aisle lined with stalls and market counters, a round-table bar corner, two reclining surgery chairs behind curtains, small meeting rooms with doors, a large office at the back with a safe and a desk, two emergency stair doors in the corners, hanging cables and tube lamps as thin lines, concrete floor as flat dark gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon gold) used sparingly on the Treasurer's counter with its golden scale. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m085" cat="sn" nome="Zona abandonada, rua em ruínas" arquivo="m085-zona-rua-ruinas.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="penumbra" entrada="sul" cor="toxic green" pacote="sim" -->
#### M085. Zona abandonada, rua em ruínas

| Campo | Valor |
|---|---|
| **Categoria** | Cenários do universo SombraNeon |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Verde tóxico (a poça de líquido tóxico verde no meio da rua) |
| **Arquivo** | `m085-zona-rua-ruinas.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Uma rua da Zona, o bairro abandonado, com prédios caídos, carros tombados, crateras no asfalto, barricadas feitas por saqueadores, um poste de energia caído e uma poça verde brilhante. Plantas crescem sobre o concreto. O vento traz poeira radioativa. Serve para tiroteios com saqueadores, encontros com mutantes e fuga por ruínas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Prédios caídos | ruínas com cobertura |
| Carros tombados | barricadas e cobertura |
| Crateras no asfalto | terreno difícil, queda de 3 m |
| Barricada de saqueadores | ninho de gangue |
| Poça tóxica | perigo de radiação |

**Cobertura e perigos:** Ruínas e carros dão cobertura +2 de CA. Poças e poeira causam Radiação da Zona (Perigo 3). Crateras têm Queda (Perigo 8) de 3 m.

**Ganchos de uso**

1. O grupo atravessa a Zona para chegar a um laboratório esquecido
2. Saqueadores tomam a rua e cobram pedágio
3. Um mutante amistoso pede ajuda para proteger sua família

**Ameaças típicas:** Rua: 6 Capangas (NA 1, saqueadores), 1 Líder de gangue (NA 3), 4 Cães ferais (NA 1), 1 Enxame de ratos (NA 1). Corp: 2 Mutantes da Zona (NA 3), 1 Ciberpsicopata (NA 4) e 1 Experimento fugido (NA 6).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an abandoned city street in ruins seen from above, a cracked asphalt road running east to west with deep craters, collapsed building facades as dark rubble masses on both sides, overturned cars forming barricades, a fallen power pole across the road, a junk barricade with scrap and sheet metal, a glowing toxic puddle in the middle, weeds and cracks as flat gray patches, asphalt as flat dark gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (toxic green) used sparingly on the pool of glowing toxic green liquid in the middle of the street. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m086" cat="sn" nome="Zona, subsolo e abrigo antiaéreo" arquivo="m086-zona-subsolo.webp" grade="30x20" ar="3:2" ambiente="interior" luz="escuro" entrada="norte" cor="toxic green" -->
#### M086. Zona, subsolo e abrigo antiaéreo

| Campo | Valor |
|---|---|
| **Categoria** | Cenários do universo SombraNeon |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda norte |
| **Cor de destaque** | Verde tóxico (o cristal verde que brilha no fim do corredor) |
| **Arquivo** | `m086-zona-subsolo.webp` |

**Descrição:** Um abrigo antiaéreo da Zona, com corredor central de concreto rachado, salas de refúgio, um depósito de mantimentos velhos, uma sala de geradores e um túnel colapsado. Água escorre pelas paredes. Há cristais radioativos no fundo. Serve para esconderijo, descoberta de segredos e confrontos com mutantes.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Corredor central | concreto rachado e luz fraca |
| Salas de refúgio | camas velhas e bancos |
| Depósito de mantimentos | caixas e latas |
| Sala de geradores | motores quebrados |
| Túnel colapsado | entulho e saída oculta |

**Cobertura e perigos:** Caixas e geradores dão cobertura +2 de CA. Cristais e poças causam Radiação da Zona (Perigo 3). O teto pode desabar com tiros pesados: Colapso (Perigo 4).

**Ganchos de uso**

1. O grupo procura um item deixado por uma equipe que sumiu
2. Mutantes protegem o abrigo e pedem negociação
3. A saída colapsa e a única rota é o túnel

**Ameaças típicas:** Rua: 4 Cães ferais (NA 1), 2 Enxames de ratos (NA 1). Corp: 3 Mutantes da Zona (NA 3) e 1 Experimento fugido (NA 6). Elite: 1 Abominação (NA 9) no fim do corredor.

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an underground bomb shelter with a long central corridor of cracked concrete, several small refuge rooms with old beds and benches, a storage room with stacked crates, a generator room with broken engines, a collapsed tunnel with rubble at the end, glowing crystal clusters near the back, water stains and puddles as flat pale shapes, concrete floor as flat dark gray. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (toxic green) used sparingly on the green crystal glowing at the end of the corridor. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m087" cat="sn" nome="Toca da equipe, esconderijo dos runners" arquivo="m087-toca-equipe.webp" grade="30x20" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon magenta" -->
#### M087. Toca da equipe, esconderijo dos runners

| Campo | Valor |
|---|---|
| **Categoria** | Cenários do universo SombraNeon |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Magenta néon (o letreiro de neon do bar do térreo vazando pela janela) |
| **Arquivo** | `m087-toca-equipe.webp` |

**Descrição:** Um andar convertido em esconderijo de equipe: sala comum com sofás e tela, cozinha, quartos beliche, oficina de hack, armário de armas, um quarto de recuperação e uma saída secreta pela caixa-d'água. É um refúgio bagunçado, mas seguro. Serve de base entre missões, cenário de ataque surpresa e lugar de conversas importantes.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Sala comum | sofás, mesa e tela |
| Cozinha | bancada e geladeira |
| Quartos beliche | três quartos pequenos |
| Oficina de hack | bancada com deck e cabos |
| Armário de armas | cofre pequeno |
| Saída secreta | escada para a caixa-d'água |

**Cobertura e perigos:** Sofás, mesa e bancadas dão cobertura +2 de CA. Portas finas não resistem a tiros pesados. A saída secreta só é visível com CD 14 de percepção.

**Ganchos de uso**

1. A toca é descoberta por uma facção e o grupo precisa defendê-la ou fugir
2. Um fugitivo pede abrigo por uma noite
3. Alguém vazou a localização e a equipe suspeita de um dos seus

**Ameaças típicas:** Rua: 4 Capangas (NA 1), 1 Atirador de gangue (NA 1), 1 Motoqueiro (NA 2). Corp: 4 Seguranças corporativas (NA 2) e 1 Caçador de sintéticos (NA 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a runner team hideout apartment floor seen from above, a living room with two worn sofas, a low table and a wall screen, a small kitchen with a counter and a fridge, three tiny bedrooms with bunk beds, a hacking workshop with a bench of decks and cables, a weapon locker in a corner, a recovery nook with a cot, a hidden stair hatch to the water tank, light spilling from a window as a flat pale shape, floor as flat medium gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon magenta) used sparingly on the neon sign of the ground-floor bar leaking through the window. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m088" cat="sn" nome="Cripta de servidores da Congregação do Fantasma" arquivo="m088-cripta-servidores.webp" grade="30x20" ar="3:2" ambiente="interior" luz="escuro" entrada="sul" cor="neon violet" -->
#### M088. Cripta de servidores da Congregação do Fantasma

| Campo | Valor |
|---|---|
| **Categoria** | Cenários do universo SombraNeon |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Violeta néon (o altar de servidores acesos no fundo da cripta) |
| **Arquivo** | `m088-cripta-servidores.webp` |

**Descrição:** Uma capela subterrânea de servidores, onde a Congregação do Fantasma venera seus mortos digitais. Há bancos em fileiras, um altar de racks de servidores, nichos de cápsulas de memória, velas de LED, uma sala de rituais e um corredor de cabos. O ar é frio e silencioso. Serve para cenas de culto, recuperação de memórias e confrontos com fiéis fanáticos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Bancos da capela | cobertura baixa |
| Altar de servidores | racks acesos, hack CD 14 |
| Nichos de memória | cápsulas dos mortos |
| Sala de rituais | círculo de cabos no chão |
| Corredor de cabos | passagem para a Rede |

**Cobertura e perigos:** Bancos e racks dão cobertura +2 de CA. Tiros nos racks causam Curto-circuito (Perigo 5) e apagam memórias de fantasmas. O silêncio dá vantagem em furtividade.

**Ganchos de uso**

1. O grupo precisa recuperar a memória de um morto para uma família
2. Um falso fantasma é uma IA imitando um parente
3. A Congregação sacrifica um fiel e o grupo chega no meio do ritual

**Ameaças típicas:** Rua: 6 Fiéis (NA 1), 3 Zelotes (NA 2). Corp: 1 Sacerdote (NA 4) e Mãe Fenda (NA 6, ficha de Profeta, líder da Congregação). Elite: 1 IA Eco (NA 4, remota).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an underground server chapel with rows of low benches facing an altar made of glowing server racks at the back wall, wall niches holding small memory capsules, LED candle clusters as small dots on the floor, a ritual room with a circle of cables laid on the floor, a corridor of thick cable trays leaving the frame, stone pillars as dark squares, floor as flat dark gray tiles. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon violet) used sparingly on the altar of glowing servers at the back of the crypt. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m089" cat="sn" nome="A Rede, planície de dados com ICE" arquivo="m089-rede-planicie-dados.webp" grade="36x24" ar="3:2" ambiente="rede" luz="penumbra" entrada="oeste" cor="electric cyan" -->
#### M089. A Rede, planície de dados com ICE

| Campo | Valor |
|---|---|
| **Categoria** | Cenários do universo SombraNeon |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | A Rede (cenário digital), penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Ciano elétrico (o nó-alvo brilhando no centro da planície) |
| **Arquivo** | `m089-rede-planicie-dados.webp` |

**Descrição:** Um espaço virtual aberto, como visto pelo runner imerso na Rede: uma planície de grade infinita com blocos de dados como cobertura, nós de acesso, torres de ICE patrulhando e canais de dados correndo pelo piso. Cada bloco é uma pasta e cada torre, uma sentinela. Serve para cenas de invasão em tabuleiro, com o hacker enfrentando ICE em movimento.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Nó de entrada | ponto de acesso do hacker |
| Blocos de dados | cobertura sólida e arquivos |
| Torres de ICE | sentinelas fixas |
| Canais de dados | rios de luz, movimento rápido |
| Nó-alvo | servidor ou arquivo alvo |

**Cobertura e perigos:** Blocos de dados dão cobertura +2 de CA contra ICE. Ofuscar esconde o hacker por 1d4 rodadas. Falhar ou fazer barulho sobe o Alerta em 1.

**Ganchos de uso**

1. O hacker precisa chegar ao nó-alvo sem disparar o Alerta
2. Um Caçador persegue o hacker pela planície enquanto o corpo é defendido
3. O grupo físico precisa ganhar tempo enquanto o hacker abre o nó

**Ameaças típicas:** Rua: ICE Sentinela (nível 1) e ICE Enxame (nível 2). Corp: ICE Cão de guarda (nível 3), ICE Labirinto (nível 2) e ICE Executor (nível 4). Elite: ICE Muralha (nível 5) e ICE Hidra (nível 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a virtual data plain seen from above as an infinite flat grid floor, solid cubic data blocks scattered as obstacles with thick black outlines, tall slim guard towers as dark squares with a small ring on top, rivers of data as pale light bands crossing the floor, a bright access node ring on the west edge, a large target node pillar in the center, floor as flat dark gray with subtle square tile pattern. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly on the target node glowing in the center of the plain. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m090" cat="sn" nome="A Rede, catedral de servidores" arquivo="m090-rede-catedral-servidores.webp" grade="30x20" ar="3:2" ambiente="rede" luz="escuro" entrada="sul" cor="neon violet" -->
#### M090. A Rede, catedral de servidores

| Campo | Valor |
|---|---|
| **Categoria** | Cenários do universo SombraNeon |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | A Rede (cenário digital), escuro |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Violeta néon (o núcleo da IA pulsando no centro da catedral) |
| **Arquivo** | `m090-rede-catedral-servidores.webp` |

**Descrição:** Um espaço virtual monumental: uma catedral de servidores com colunas altas, naves laterais, um altar central e um núcleo de IA que pulsa como um coração. Os corredores são feitos de código e as paredes, de firewalls. Serve como clímax de invasão ao núcleo de uma IA como Oráculo ou Cobalto, em um tabuleiro de várias camadas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Nave central | corredor de entrada |
| Colunas de firewall | cobertura sólida |
| Naves laterais | espaços de fuga e armadilha |
| Altar do núcleo | IA no centro |
| Cripta de dados | arquivos protegidos |

**Cobertura e perigos:** Colunas dão cobertura +2 de CA. O núcleo da IA ataca o hacker a cada rodada (livro de Ameaças, 6.1). Paradoxos (INT CD 18) causam 3d6 de dano neural à IA.

**Ganchos de uso**

1. O hacker enfrenta o núcleo de uma IA enquanto o grupo defende seu corpo
2. Eco pede para ser salva da catedral antes que a Obelisco a apague
3. Um paradoxo ensaiado pelo grupo é a única esperança de vencer o Oráculo

**Ameaças típicas:** Corp: ICE Executor (nível 4), ICE Cadeado (nível 3) e ICE Espelho (nível 3). Elite: Oráculo (IA, NA 9), Cobalto (IA, NA 7) ou Argos (IA, NA 6), conforme a missão.

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a monumental virtual cathedral seen from above, a long central nave with two rows of tall square firewall pillars, narrow side aisles, a circular altar platform in the center holding a large pulsing AI core drawn as concentric rings, a data vault crypt chamber at the north end, thin light bands as floor patterns, dark floor as flat dark gray with subtle tile pattern and pale outlines. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon violet) used sparingly on the AI core pulsing at the center of the cathedral. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

### Categoria 10: Subsolo, periferia e locais especiais

Esgotos, túneis, arenas, estúdios, cemitério, pontes, ferros-velhos e teatros. Para dar surpresa a qualquer campanha.

<!-- MAP id="m091" cat="esp" nome="Esgoto, galeria e câmara de bombas" arquivo="m091-esgoto-tuneis.webp" grade="36x24" ar="3:2" ambiente="interior" luz="escuro" entrada="norte" cor="toxic green" pacote="sim" -->
#### M091. Esgoto, galeria e câmara de bombas

| Campo | Valor |
|---|---|
| **Categoria** | Subsolo, periferia e locais especiais |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda norte |
| **Cor de destaque** | Verde tóxico (a água verde brilhante no canal central) |
| **Arquivo** | `m091-esgoto-tuneis.webp` |
| **Pacote essencial** | Sim |

**Descrição:** Uma rede de esgoto com um canal central de água escura, passarelas laterais estreitas, túneis que se cruzam, uma câmara de bombas, escadas de ferro até a rua e uma grade de ventilação. Ratos correm nas paredes. O ar é úmido e fétido. Serve para fugas urbanas, esconderijos de gangues, emboscadas e criaturas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Canal central | água escura, correnteza fraca |
| Passarelas laterais | estreitas, escorregadias |
| Câmara de bombas | motores e comportas |
| Túneis cruzados | fuga em três direções |
| Escadas até a rua | tampa de bueiro |

**Cobertura e perigos:** Pilares e comportas dão cobertura +2 de CA. Cair na água: CON CD 12 ou 1d6 de dano tóxico. Passarelas molhadas dão desvantagem em corridas (DES CD 10).

**Ganchos de uso**

1. O grupo foge da Guarda e a única saída é o esgoto
2. Uma gangue esconde um tesouro numa câmara
3. Uma criatura grande habita a câmara de bombas e vigia o fim do túnel

**Ameaças típicas:** Rua: 2 Enxames de ratos (NA 1), 4 Cães ferais (NA 1), 4 Capangas (NA 1). Corp: 2 Mutantes da Zona (NA 3) e 1 Experimento fugido (NA 6).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a sewer network seen from above, a wide central canal of dark water running east to west, narrow walkways along both sides, a junction of three smaller tunnels crossing the canal on bridges, a pump chamber with large motors and gate valves, iron ladders and a manhole shaft at the north edge, a ventilation grate, round arched tunnel walls as thick black bands, walkway floor as flat medium gray. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (toxic green) used sparingly on the glowing green water in the central canal. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m092" cat="esp" nome="Túnel de metrô abandonado" arquivo="m092-tunel-metro-abandonado.webp" grade="35x15" ar="21:9" ambiente="interior" luz="escuro" entrada="oeste" cor="neon violet" -->
#### M092. Túnel de metrô abandonado

| Campo | Valor |
|---|---|
| **Categoria** | Subsolo, periferia e locais especiais |
| **Grade** | 35 x 15 casas (1 casa = 1,5 m), 3500 x 1500 px no Foundry |
| **Proporção** | 21:9 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Violeta néon (o vagão enferrujado com as luzes de emergência ainda acesas) |
| **Arquivo** | `m092-tunel-metro-abandonado.webp` |

**Descrição:** Um trecho longo de túnel de metrô desativado, com trilhos enferrujados, um vagão abandonado, uma plataforma antiga, nichos de serviço, uma porta de manutenção e um acampamento improvisado. A luz vem de lanternas e de cabos de emergência. O eco é intenso. Serve para esconderijos, perseguições, emboscadas e encontros com sem-teto e saqueadores.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Trilhos enferrujados | terreno difícil |
| Vagão abandonado | cobertura e esconderijo |
| Plataforma antiga | bancos quebrados |
| Nichos de serviço | pequenos espaços |
| Acampamento | fogueira, camas e comida |

**Cobertura e perigos:** O vagão e os pilares dão cobertura +2 de CA. O eco anula furtividade em tiros sem silenciador. Trilhos eletrificados residuais causam Curto-circuito (Perigo 5) em locais marcados.

**Ganchos de uso**

1. O grupo precisa cruzar a cidade por baixo para escapar de um bloqueio
2. Um acampamento de refugiados pede ajuda contra saqueadores
3. Um trem fantasma passa pelo túnel a cada noite à mesma hora

**Ameaças típicas:** Rua: 6 Civis (NA 0, refugiados), 4 Capangas (NA 1, saqueadores), 2 Cães ferais (NA 1). Corp: 2 Mutantes da Zona (NA 3) e 1 Ciberpsicopata (NA 4).

**Prompt (Gemini):**

```text
Create an image in 21:9 ultra-wide landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a long abandoned subway tunnel seen from above in a horizontal strip, two rusty railway tracks running the whole length, a derelict train car in the middle, an old platform with broken benches along one side, small service niches in the wall, a maintenance door at the east end, an improvised camp with a fire and cots near the west end, round arched tunnel walls as thick black bands, floor as flat dark gray gravel. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 35 by 15 squares of 1.5 meters (52.5 by 22.5 meters), so a standard single door is about one square wide, roughly 2.9% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon violet) used sparingly on the rusted train car with its emergency lights still glowing. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m093" cat="esp" nome="Arena de mechas e luta clandestina" arquivo="m093-arena-mechas.webp" grade="36x24" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon crimson red" -->
#### M093. Arena de mechas e luta clandestina

| Campo | Valor |
|---|---|
| **Categoria** | Subsolo, periferia e locais especiais |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Vermelho néon (o holofote vermelho sobre o mecha campeão) |
| **Arquivo** | `m093-arena-mechas.webp` |

**Descrição:** Um galpão convertido em arena clandestina, com um ringue circular de areia, arquibancadas de metal em volta, uma área de apostas, um bar, um estacionamento de mechas, camarins dos lutadores e um camarote do dono. Gritos e música ecoam. Serve para lutas de mechas, combates corpo a corpo, apostas e emboscadas durante o espetáculo.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Ringue de areia | círculo aberto, sem cobertura |
| Arquibancadas de metal | plateia lotada |
| Área de apostas | guichês e telas |
| Estacionamento de mechas | mechas e peças |
| Camarins | lutadores e médicos |
| Camarote do dono | sala de vidro elevada |

**Cobertura e perigos:** Muretas e mechas parados dão cobertura +2 de CA. A plateia gera Tumulto (Perigo 6). O ringue tem uma cerca elétrica: Curto-circuito (Perigo 5).

**Ganchos de uso**

1. O grupo precisa lutar na arena para ganhar um favor ou um item
2. O dono desvia o dinheiro das apostas e alguém quer a prova
3. Um mecha de arena foge do controle e ataca o público

**Ameaças típicas:** Rua: 20 Civis (NA 0), 4 Capangas (NA 1), 2 Brutamontes cromados (NA 3), 1 Líder de gangue (NA 3, dono). Corp: 2 Ciberpsicopatas (NA 4) e 1 Mecha Caminhante (NA 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an underground fight arena inside a warehouse seen from above, a large circular sand ring in the center with a low fence, tiered metal bleachers wrapped around the ring, a betting area with booths and screens, a small bar counter, a parking bay with two parked mechs and parts shelves, locker room doors, a glass-walled owner's box on a raised platform, spotlight cones as flat pale wedges, floor as flat dark gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon crimson red) used sparingly on the red spotlight over the champion mecha. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m094" cat="esp" nome="Estúdio de transmissão ao vivo" arquivo="m094-estudio-transmissao.webp" grade="30x20" ar="3:2" ambiente="interior" luz="claro" entrada="sul" cor="neon magenta" -->
#### M094. Estúdio de transmissão ao vivo

| Campo | Valor |
|---|---|
| **Categoria** | Subsolo, periferia e locais especiais |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, luz clara |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Magenta néon (a luz vermelha de AO VIVO sobre a câmera principal) |
| **Arquivo** | `m094-estudio-transmissao.webp` |

**Descrição:** Um estúdio da Lumen Media Group, com cenário de telejornal, bancada de apresentadores, câmeras, iluminação pendurada, uma sala de controle envidraçada, camarins, uma sala de maquiagem e um corredor de serviço. Drones de câmera voam pelo ar. Serve para sequestros de apresentadores, vazamento de informação e tiroteios ao vivo.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Cenário do telejornal | bancada e tela de fundo |
| Câmeras e iluminação | tripés e refletores |
| Sala de controle | ilha de edição, hack CD 14 |
| Camarins e maquiagem | espelhos e armários |
| Corredor de serviço | portas e rota de fuga |

**Cobertura e perigos:** Bancada, tripés e racks dão cobertura +2 de CA. Atirar durante a transmissão revela a cena ao vivo: o Alerta sobe em 2.

**Ganchos de uso**

1. O grupo precisa invadir a transmissão e divulgar uma gravação
2. Uma estrela quer largar a Lumen e pede escolta
3. O apresentador é um sintético e o grupo quer a prova antes do fim do programa

**Ameaças típicas:** Rua: 6 Civis (NA 0, equipe técnica), 2 Seguranças corporativas (NA 2). Corp: 4 Seguranças corporativas (NA 2), 2 Drones de vigilância (NA 1), 1 Agente corporativo de campo (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a television news studio seen from above, a curved news desk with a large video wall behind it, three tripod cameras and two hanging lighting rigs, a glass-walled control room with an editing console, makeup room and two dressing rooms with mirrors, a service corridor along the south side, camera drones as small circles above, cable runs as thin dark lines, floor as flat light gray. Tonal key: bright and clean, mostly white and light gray floors with mid-gray props. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon magenta) used sparingly on the red on-air light above the main camera. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m095" cat="esp" nome="Cemitério com mausoléus" arquivo="m095-cemiterio.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="escuro" entrada="sul" cor="neon violet" -->
#### M095. Cemitério com mausoléus

| Campo | Valor |
|---|---|
| **Categoria** | Subsolo, periferia e locais especiais |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, escuro |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Violeta néon (a cripta central com a porta entreaberta e a luz violeta) |
| **Arquivo** | `m095-cemiterio.webp` |

**Descrição:** Um cemitério à noite, com fileiras de lápides, mausoléus, estátuas quebradas, uma capela, um mausoléu central de família rica, caminhos de cascalho, árvores secas e um muro baixo. Neblina baixa cobre o chão. Cenário de encontros secretos, rituais, roubo de relíquias e tiroteios entre túmulos.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Fileiras de lápides | cobertura baixa |
| Mausoléus | cobertura total, portas de ferro |
| Capela | interior vazio, altar |
| Mausoléu central | cripta da família |
| Caminhos de cascalho | barulho em passos |

**Cobertura e perigos:** Lápides dão cobertura +2 de CA, mausoléus dão cobertura total (+4). Neblina baixa dá desvantagem em ataques longos. Cascalho dá desvantagem em furtividade.

**Ganchos de uso**

1. O grupo precisa recuperar uma relíquia na cripta antes do amanhecer
2. A Congregação do Fantasma realiza um ritual no mausoléu central
3. Alguém enterrou uma mala de créditos num túmulo recente

**Ameaças típicas:** Rua: 6 Fiéis (NA 1), 3 Zelotes (NA 2), 2 Cães ferais (NA 1). Corp: 1 Sacerdote (NA 4) e 2 Seguranças corporativas (NA 2). Elite: 1 Profeta (NA 6).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a cemetery at night seen from above, rows of small rectangular headstones in a grid, six stone mausoleums with flat roofs and iron doors, broken statues, a small chapel with a cross-shaped roof, a central family mausoleum larger than the rest with an open door, winding gravel paths shown as pale bands, bare trees as dark star shapes, low perimeter wall, ground as flat dark gray. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon violet) used sparingly on the central crypt with its door ajar and violet light inside. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m096" cat="esp" nome="Estrada rural e posto de gasolina abandonado" arquivo="m096-estrada-posto-abandonado.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="penumbra" entrada="oeste" cor="neon orange" -->
#### M096. Estrada rural e posto de gasolina abandonado

| Campo | Valor |
|---|---|
| **Categoria** | Subsolo, periferia e locais especiais |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Laranja néon (o carro blindado parado com os faróis acesos) |
| **Arquivo** | `m096-estrada-posto-abandonado.webp` |

**Descrição:** Um trecho de estrada rural entre cidades, com duas faixas, um acostamento largo, um posto de gasolina abandonado com bombas enferrujadas, uma loja de conveniência vazia, carcaças de carros, um outdoor caído e um campo de mato alto. Ideal para emboscadas de estrada, escolta de comboio, perseguição de carro e acampamento improvisado.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Estrada e acostamento | duas faixas, aberta |
| Posto abandonado | bombas e cobertura de concreto |
| Loja de conveniência | prateleiras vazias e freezer |
| Carcaças de carros | cobertura e esconderijo |
| Campo de mato alto | furtividade, terreno difícil |

**Cobertura e perigos:** Bombas e carcaças dão cobertura +2 de CA. O mato alto dá vantagem em furtividade e desvantagem em ataques longos. Bombas com combustível residual explodem (2d6, raio Perto).

**Ganchos de uso**

1. Um comboio com um VIP precisa parar no posto e a equipe tem 15 minutos
2. Saqueadores armaram uma emboscada com um bloqueio na estrada
3. O grupo recebe um chamado de socorro e descobre que é uma armadilha

**Ameaças típicas:** Rua: 6 Capangas (NA 1), 2 Motoqueiros (NA 2), 1 Technical de gangue (NA 3). Corp: 4 Mercenários (NA 3) e 1 Atirador de elite (NA 4).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a rural road section seen from above, a two-lane asphalt road with a dashed center line running east to west, a wide gravel shoulder, an abandoned gas station with a canopy and four rusted pumps, a small empty convenience store with a flat roof, wrecked car shells along the roadside, a fallen billboard panel, a field of tall grass shown as flat light gray patches, asphalt as flat dark gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the armored car stopped with its headlights lit. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m097" cat="esp" nome="Ponte sobre rio, tabuleiro e pilares" arquivo="m097-ponte-rio.webp" grade="35x15" ar="21:9" ambiente="exterior" luz="penumbra" entrada="oeste" cor="neon orange" -->
#### M097. Ponte sobre rio, tabuleiro e pilares

| Campo | Valor |
|---|---|
| **Categoria** | Subsolo, periferia e locais especiais |
| **Grade** | 35 x 15 casas (1 casa = 1,5 m), 3500 x 1500 px no Foundry |
| **Proporção** | 21:9 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda oeste |
| **Cor de destaque** | Laranja néon (o comboio blindado cruzando a ponte com as luzes acesas) |
| **Arquivo** | `m097-ponte-rio.webp` |

**Descrição:** Uma ponte de concreto e aço de quatro faixas sobre um rio largo, com postes de iluminação, guarda-corpos, cabos de suspensão, uma guarita de pedágio abandonada e pilares de apoio. A água corre a 20 metros de baixo. Cenário de perseguição de carros, emboscada de comboio, explosão de ponte e fuga por rapel.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Pista de rolamento | quatro faixas largas |
| Guarda-corpos e postes | cobertura baixa |
| Cabos de suspensão | estruturas altas |
| Guarita de pedágio | cobertura de concreto |
| Pilares de apoio | acesso por baixo |

**Cobertura e perigos:** Carros parados, postes e a guarita dão cobertura +2 de CA. A borda leva a Queda (Perigo 8) de 20 m com 2d6 de dano e CON CD 12 para sair da água.

**Ganchos de uso**

1. O grupo precisa interceptar um comboio no meio da ponte
2. Uma carga explosiva é plantada nos pilares e o grupo tem 10 minutos
3. Os runners são encurralados na ponte pela Guarda e por uma gangue ao mesmo tempo

**Ameaças típicas:** Rua: 3 Viaturas da Guarda (NA 3) com 6 Policiais urbanos (NA 1) e 4 Motoqueiros (NA 2). Corp: 2 Tropas de choque (NA 3), 1 Blindado de transporte (NA 6) e 1 Helicóptero de ataque (NA 8).

**Prompt (Gemini):**

```text
Create an image in 21:9 ultra-wide landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a long suspension bridge seen from above in a horizontal strip, a four-lane road deck with dashed lane lines, a concrete railing and a row of lamp posts along both edges, thin suspension cables drawn as light lines rising from the edges, an abandoned toll booth in the middle of the road, wide dark river as flat black bands at the top and bottom with thin white wave lines, road as flat dark gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 35 by 15 squares of 1.5 meters (52.5 by 22.5 meters), so a standard single door is about one square wide, roughly 2.9% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon orange) used sparingly on the armored convoy crossing the bridge with its lights on. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m098" cat="esp" nome="Ferro-velho e aterro de sucata" arquivo="m098-aterro-ferro-velho.webp" grade="36x24" ar="3:2" ambiente="exterior" luz="penumbra" entrada="sul" cor="neon amber" -->
#### M098. Ferro-velho e aterro de sucata

| Campo | Valor |
|---|---|
| **Categoria** | Subsolo, periferia e locais especiais |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Exterior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Âmbar néon (a fogueira de sucata acesa no centro do aterro) |
| **Arquivo** | `m098-aterro-ferro-velho.webp` |

**Descrição:** Um ferro-velho enorme, com montanhas de carros esmagados, pilhas de eletrodomésticos, uma garra mecânica, um galpão de peças, uma prensa, uma cabana de vigia e uma estrada de terra. Fumaça sobe de fogueiras de sucata. Cães latem ao longe. Ótimo para esconderijo, tiroteio em labirinto, compra de peças e confronto com a gangue local.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Montanhas de sucata | paredes irregulares, cobertura |
| Garra mecânica | guindaste, perigo de queda |
| Galpão de peças | bancadas e prateleiras |
| Prensa de carros | armadilha mortal |
| Cabana de vigia | ponto de observação |

**Cobertura e perigos:** A sucata dá cobertura total em pilhas altas (+4 de CA). Pilhas instáveis causam Colapso (Perigo 4) com tiros pesados. Fogueiras geram Incêndio (Perigo 2) em contato.

**Ganchos de uso**

1. O grupo precisa achar uma peça específica entre milhares
2. Um catador esconde um cadáver no aterro e o grupo quer a prova
3. Uma gangue de saqueadores domina o ferro-velho e o dono pede ajuda

**Ameaças típicas:** Rua: 6 Capangas (NA 1), 4 Cães ferais (NA 1), 2 Brutamontes cromados (NA 3), 1 Líder de gangue (NA 3). Corp: 2 Mercenários (NA 3).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, a huge junkyard scrapyard seen from above, tall irregular mountains of crushed cars and appliances forming a maze of narrow dirt lanes, a mechanical crane arm over a pile, a parts shed with workbenches, a car crusher press machine with a pit, a small watch hut at the south entrance, a scrap fire in the middle, tires and barrels scattered, ground as flat dark gray dirt. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon amber) used sparingly on the scrap fire burning in the middle of the dump. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m099" cat="esp" nome="Escola abandonada" arquivo="m099-escola-abandonada.webp" grade="30x20" ar="3:2" ambiente="interior" luz="escuro" entrada="sul" cor="neon violet" -->
#### M099. Escola abandonada

| Campo | Valor |
|---|---|
| **Categoria** | Subsolo, periferia e locais especiais |
| **Grade** | 30 x 20 casas (1 casa = 1,5 m), 3000 x 2000 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, escuro |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Violeta néon (a lousa com um desenho brilhante no fundo da sala) |
| **Arquivo** | `m099-escola-abandonada.webp` |

**Descrição:** Uma escola de um andar abandonada, com um corredor central, quatro salas de aula, uma sala dos professores, uma cantina, um pátio coberto e um ginásio. Carteiras viradas, lousas rachadas e brinquedos quebrados dão o clima. Um esconderijo perfeito para refugiados, gangues ou uma IA solitária. Serve para investigação, terror e tiroteios dentro de salas.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Corredor central | armários e portas quebradas |
| Salas de aula | carteiras viradas, cobertura |
| Sala dos professores | arquivos e cofre |
| Cantina | balcão e cozinha |
| Ginásio | espaço aberto, arquibancada |

**Cobertura e perigos:** Carteiras, armários e balcões dão cobertura +2 de CA. Pisos podres desabam: DES CD 12 ou cai 3 m e sofre 1d6 de dano.

**Ganchos de uso**

1. Refugiados da Rede Aurora se escondem na escola e pedem proteção
2. Uma IA fugitiva (Eco) habita os computadores velhos e quer conversar
3. Uma gangue guarda um refém no ginásio

**Ameaças típicas:** Rua: 6 Civis (NA 0, refugiados), 4 Capangas (NA 1), 2 Cães ferais (NA 1). Corp: 2 Seguranças corporativas (NA 2) e 1 Caçador de sintéticos (NA 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an abandoned one-story school seen from above, a central corridor with rows of lockers along the walls, four classrooms with overturned desks and a cracked blackboard, a teachers room with filing cabinets, a cafeteria with a counter and a kitchen, a covered courtyard with a broken playground slide, a gymnasium with bleachers and a basketball court on the east end, debris and fallen ceiling tiles, floor as flat dark gray. Tonal key: dark, mostly dark gray and black with only small light gray highlights. Scale: the map covers 30 by 20 squares of 1.5 meters (45 by 30 meters), so a standard single door is about one square wide, roughly 3.3% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon violet) used sparingly on the blackboard with a faintly glowing drawing at the back of the classroom. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

<!-- MAP id="m100" cat="esp" nome="Teatro de ópera, palco e plateia" arquivo="m100-teatro-opera.webp" grade="36x24" ar="3:2" ambiente="interior" luz="penumbra" entrada="sul" cor="neon gold" -->
#### M100. Teatro de ópera, palco e plateia

| Campo | Valor |
|---|---|
| **Categoria** | Subsolo, periferia e locais especiais |
| **Grade** | 36 x 24 casas (1 casa = 1,5 m), 3600 x 2400 px no Foundry |
| **Proporção** | 3:2 |
| **Ambiente** | Interior, penumbra |
| **Entrada dos runners** | Borda sul |
| **Cor de destaque** | Dourado néon (o lustre de cristal sobre a plateia) |
| **Arquivo** | `m100-teatro-opera.webp` |

**Descrição:** Um teatro de ópera suntuoso, com plateia em ferradura, camarotes laterais, palco com cenários móveis, fosso da orquestra, bastidores, camarins, uma passarela de iluminação e um lustre de cristal. O ouro e o veludo estão desgastados mas imponentes. Serve para galas de elite, assassinatos públicos, sequestros e clímax de campanha.

**Áreas e pontos de interesse**

| Área | Função no jogo |
|---|---|
| Plateia em ferradura | fileiras de poltronas |
| Camarotes laterais | cobertura e visão do palco |
| Palco e cenário | tábuas, cordas e cenários |
| Fosso da orquestra | queda de 2 m |
| Bastidores e camarins | corredores estreitos |
| Passarela de iluminação | elevada, estreita |

**Cobertura e perigos:** Poltronas e cenários dão cobertura +2 de CA. O lustre pode ser derrubado: 4d6 de dano em raio Perto (DES CD 14 para evitar). Tiros ao vivo causam Tumulto (Perigo 6).

**Ganchos de uso**

1. Uma gala reúne executivos e o alvo é a convidada de honra
2. O grupo precisa substituir um músico para entrar nos bastidores
3. Uma gravação secreta será exibida no telão da plateia e alguém quer impedi-la

**Ameaças típicas:** Rua: 20 Civis (NA 0), 4 Seguranças corporativas (NA 2). Corp: 2 Agentes corporativos de campo (NA 4), 1 Diretor (NA 3), 1 Atirador de elite (NA 4) na passarela. Elite: 2 Operadores de elite (NA 5).

**Prompt (Gemini):**

```text
Create an image in 3:2 landscape format. Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a strictly orthographic top-down tactical battle map for a tabletop RPG, a flat overhead floor plan seen straight down with no perspective, no horizon and no visible sky, empty of any characters or creatures, walls and solid obstacles drawn as thick solid black bands, floors as flat gray tones and props as flat mid-gray shapes with thick black outlines, an opera house interior seen from above, a horseshoe-shaped audience area with curved rows of seats, side private boxes on both curved walls, a wide stage with sets and curtains on the north, an orchestra pit in front of the stage, backstage corridors and dressing rooms behind the stage, a lighting catwalk across the ceiling, a huge crystal chandelier drawn as concentric rings above the audience, carpet as flat dark gray. Tonal key: dim, mostly mid-gray floors with black walls and a few light gray highlights. Scale: the map covers 36 by 24 squares of 1.5 meters (54 by 36 meters), so a standard single door is about one square wide, roughly 2.8% of the image width, and a car is about three squares long. The map fills the entire frame edge to edge with no border, no margin and no frame. No text, no lettering, no logos, no numbers, no grid lines. Color Scheme: Strictly flat grayscale (black, white, and flat grays) EXCEPT for one single, intense, glowing spot color (neon gold) used sparingly on the crystal chandelier above the audience. No global lighting spill, only sharp graphic highlights. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
```
<!-- /MAP -->

## 10. Notas finais

- **Adaptar é regra.** Troque nomes de corporações, mude a cor de destaque ou o tom de luz no prompt e gere uma variante. O mapa muda de cara sem mudar de planta.
- **Variações rápidas no Foundry:** apague as luzes para a versão noturna, acrescente fumaça, derrube mobília com tiles. Os mapas foram desenhados para aceitar isso.
- **Se um mapa não ficou bom,** gere de novo com a mesma descrição e peça no mesmo chat o ajuste (por exemplo: `Keep everything, but make the walls thicker and the floor lighter`).
- **Este compêndio é vivo.** Anote os mapas que mais saem na sua mesa e acrescente os que faltarem (m101 em diante) no mesmo formato.
