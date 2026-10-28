# SOMBRANEON: COMPÊNDIO DE VEÍCULOS E ARMAMENTO

*Veículos leves, médios e pesados, armas pesadas, armas de cerco, explosivos e mechas*

> **Versão:** v0.2, companheiro do livro principal SombraNeon v0.6. Na v0.2, a regra de reparo em campo (2.8) passou a valer também para Androides.
> **Use junto com:** o livro principal (Capítulos 4, 8 e 10) e o Compêndio de Ameaças (fichas de inimigos, incluindo veículos e mechas hostis).

---

## Sumário

1. Visão geral
2. Regras de veículos
3. Veículos
4. Módulos
5. Armas pesadas pessoais
6. Explosivos e granadas
7. Armas de cerco e de veículo
8. Mechas
9. Veículos e mechas como ameaças
10. Quadro rápido

---

## 1. Visão geral

### 1.1 Categorias

Todo veículo pertence a uma categoria, que define o tamanho, a blindagem e o preço.

| Categoria | Tamanho | Exemplos | Blindagem típica | Preço |
|---|---|---|---|---|
| **Leve** | 1 a 4 pessoas | Motos, buggies, carros compactos, lanchas, hoverbikes | 0 a 1 | 1.000 a 15.000 cr |
| **Médio** | 4 a 8 pessoas | Vans, sedans blindados, SUVs táticos, aerocarros, helicópteros leves | 1 a 3 | 12.000 a 150.000 cr |
| **Pesado** | 8 pessoas ou mais, ou blindado de combate | Blindados de transporte, tanques, caminhões militares, helicópteros de ataque, VTOLs | 3 a 8 | 150.000 a 900.000 cr |
| **Mecha** | 1 piloto (ou uma tripulação) | Exoesqueletos, mechas leves, médios, pesados e colossos | 2 a 8 | 60.000 a 1.000.000 cr |

**Tipos de terreno:** cada veículo é **terrestre**, **aéreo** ou **aquático**. Veículos aéreos ignoram terreno difícil e obstáculos no chão. Veículos aquáticos só operam sobre a água.

### 1.2 Como ler uma ficha de veículo

| Campo | Significado |
|---|---|
| **CA** | Classe de armadura do veículo. |
| **HP** | Pontos de vida do veículo. A 0 HP, ele para. |
| **BL** | **Blindagem.** Reduz cada dano de armas comuns em BL. Armas **Pesadas** e explosões ignoram a Blindagem. |
| **Man.** | **Manobra.** Bônus somado aos testes de pilotagem e perseguição. |
| **Vel.** | **Velocidade:** Lenta, Normal, Rápida ou Muito rápida (veja 2.2). |
| **Ocup.** | **Ocupantes:** tripulação + passageiros. |
| **Carga** | Slots de carga que o veículo comporta (além dos ocupantes). |
| **Hardpoints** | Pontos de montagem de armas: **L** (leve), **M** (média) ou **P** (pesada). Uma arma ocupa um ponto do mesmo tamanho ou maior. |
| **Custo** | Preço de mercado legal, em créditos. |
| **Lic.** | **Licença:** C (civil), R (restrita), M (militar) ou I (ilegal). |

### 1.3 Acesso por classe

Cada classe é **treinada** em certas categorias. Quem é treinado pilota sem penalidade e usa as armas montadas. Quem é **destreinado** pilota com desvantagem nos testes de pilotagem e **não usa as armas montadas** do veículo (e não opera Mechas nem Pesados).

| Classe | Leves | Médios | Pesados | Mechas |
|---|---|---|---|---|
| **Solo** | Treinado | Treinado | Treinado | Treinado (exoesqueletos, mechas leves, médios e pesados) |
| **Netrunner** | Treinado | Destreinado | Destreinado | Destreinado |
| **Hyperdoc** | Treinado | Treinado | Destreinado | Destreinado |
| **Ghost** | Treinado | Treinado | Destreinado | Destreinado |
| **Rocker** | Treinado | Treinado | Destreinado | Destreinado |
| **Rigger** | Treinado | Treinado | Treinado | Treinado (todos, inclusive colossos) |

**Treino:** um runner pode se tornar treinado em uma categoria com **1 semana de downtime** e um custo em créditos: **3.000 cr** (Médios), **6.000 cr** (Pesados) ou **10.000 cr** (Mechas). Cada categoria exige um treino.

**Antecedentes que treinam:** Piloto de transporte (Leves, Médios e Pesados), Mecânico (Leves e Médios), Mercenário (Médios e Pesados). Um antecedente dá o treino na criação.

**Interface veicular (Rigger):** um Rigger com jack de interface pilota qualquer veículo ou mecha por link neural, com vantagem nos testes de pilotagem (livro principal, Capítulo 4).

### 1.4 Aquisição

- **Leves:** à venda nas lojas, nos concessionários e no Mercado do Sétimo Andar. Estão ao alcance de um grupo Rua ou Corp.
- **Médios:** à venda em concessionárias de luxo e corporativas. Estão ao alcance de um grupo Corp.
- **Pesados e Mechas:** só no mercado negro, por contrato ou como **butim Lendário** de uma missão Elite. A Companhia Lâmina Negra aluga alguns.

**Licença e legalidade:**

| Licença | O que exige |
|---|---|
| **C (civil)** | Compra livre. |
| **R (restrita)** | Preço +50%, e um contato (fixer ou teste de CAR CD 12). |
| **M (militar)** | Preço x3 no mercado negro, e um contato forte. Ou saque. |
| **I (ilegal)** | Só no mercado negro, com preço x2. A polícia confisca. |

**Aluguel:** 10% do preço por dia, para Leves e Médios civis. Pesados e Mechas só se alugam com contrato: 5% do preço por dia mais caução de 50%.

---

## 2. Regras de veículos

### 2.1 Pilotagem

Dirigir em situação calma não exige teste. Sob pressão (perseguição, combate, terreno ruim, tempestade, manobra arriscada), role **d20 + mod. de DES + Manobra** do veículo contra uma CD de 9, 12, 15 ou 18.

- **Falha:** o veículo perde uma faixa de distância (em perseguição) ou colide (d6 de dano ao veículo por categoria, e os ocupantes fazem DES CD 12 ou sofrem metade desse dano).
- **Destreinado:** desvantagem.
- **Dirigir e atacar:** o piloto pode atacar com uma arma leve de uma mão com desvantagem. Armas montadas exigem um atirador treinado (ou o próprio piloto, se tiver o módulo de controle).

### 2.2 Velocidade

| Velocidade | Deslocamento por turno em combate |
|---|---|
| **Lenta** | Próximo. |
| **Normal** | Dobro Próximo. |
| **Rápida** | Longe (qualquer ponto à vista). |
| **Muito rápida** | Longe duas vezes, ou sai de cena. |

Quem tem velocidade maior que o oponente ganha **vantagem** nos testes disputados de perseguição.

### 2.3 Perseguição

Quando um veículo foge de outro (ou de alguém a pé), use as **faixas de distância**: **Perto**, **Próximo**, **Longe** e **Fora de vista**.

1. A cada rodada, o perseguidor e o fugitivo rolam **d20 + DES + Manobra**, disputados.
2. O vencedor decide: o perseguidor **fecha** a distância em 1 faixa, ou o fugitivo **abre** a distância em 1 faixa. Se vence por **5 ou mais**, são 2 faixas.
3. Se o fugitivo chega a **Fora de vista**, ele escapa (a menos que o perseguidor tenha rastreio: drone, sensor ou GPS).
4. Em **Perto** ou **Próximo**, os ocupantes podem atacar o outro veículo ou seus ocupantes. Armas montadas atacam normalmente, e armas pessoais atacam com desvantagem.
5. O Mestre pode exigir um teste de pilotagem (CD 12) por obstáculo: tráfego, curva, ponte, túnel. Falhou: perde 1 faixa ou colide.

### 2.4 Combate com veículos

- **Atacar um veículo:** o ataque é contra a CA do veículo.
- **Blindagem (BL):** subtrai BL de cada dano de armas comuns (pistolas, fuzis, lâminas). Armas **Pesadas** e **explosões** ignoram a Blindagem.
- **Cobertura:** em veículos abertos (motos, buggies, hoverbikes) os ocupantes não têm cobertura. Em carros leves fechados têm +2 de CA. Em veículos Médios, Pesados e Mechas, os ocupantes têm **cobertura total** enquanto o veículo estiver acima de 0 HP, exceto contra armas Pesadas e explosões.
- **Ponto fraco:** um ataque à roda, esteira, rotor ou hélice tem desvantagem. Se causar dano igual ou maior que 5 HP, aplica **Avaria 1** (tabela abaixo).

### 2.5 Avarias

Quando um único ataque causa dano igual a **um quarto do HP máximo ou mais** (ou um crítico), role d6:

| d6 | Avaria |
|---|---|
| 1 | **Pneu, esteira ou rotor destruído:** Velocidade cai uma faixa; Manobra -2. |
| 2 | **Motor falha:** o veículo não acelera; perde a Velocidade mais alta até o reparo. |
| 3 | **Armas montadas inutilizadas** por 1d4 rodadas. |
| 4 | **Cabine atingida:** os ocupantes sofrem d6 de dano (DES CD 12 para metade). |
| 5 | **Incêndio:** 1d6 de dano ao veículo por rodada até apagar (ação, CD 12). |
| 6 | **Sistemas eletrônicos apagam** por 1d4 rodadas. Módulos param. |

### 2.6 Destruição

Ao chegar a 0 HP, o veículo para e fica inutilizável até ser reparado.

- Os ocupantes sofrem dano de acidente: **d6** (Leve), **2d6** (Médio), **3d6** (Pesado) ou **4d6** (Mecha). DES CD 12 para metade.
- Em **veículos aéreos**, o dano é dobrado (queda).
- Um veículo em chamas explode: 1 chance em 6 de explodir ao chegar a 0 HP, causando 3d6 em raio Perto.

### 2.7 Colisão e atropelamento

- **Atropelar um alvo a pé:** ataque contra a CA do alvo, com a Manobra do veículo. Dano: **2d6** (Leve), **3d6** (Médio), **4d6** (Pesado), **5d6** (Mecha). DES CD 12 para metade. O veículo sofre d6.
- **Colisão entre veículos:** cada um sofre **2d6 por categoria do outro veículo** (Leve 1, Médio 2, Pesado 3, Mecha 3). A Blindagem não reduz o dano de colisão.

### 2.8 Reparo

- **Em campo:** com kit de ferramentas, teste de INT CD 12 por hora: recupera **1d6 HP**. Um Rigger recupera **2d6 HP**. A mesma regra vale para reparar um **Android** (livro principal, 3.4).
- **Peças:** 20 cr por HP (Leve), 50 cr (Médio), 100 cr (Pesado) ou 200 cr (Mecha).
- **Oficina:** o preço das peças mais 50%. Reparo completo em 1 descanso.

### 2.9 Hacking em veículos

Veículos conectados podem ser invadidos. Para executar um programa (como **Sequestro**) contra um veículo, vença a **cibersegurança** dele:

| Veículo | CD |
|---|---|
| Civil | 12 |
| Corporativo | 15 |
| Militar | 18 |

Veículos **Pesados** e **Mechas** militares são protegidos por um **ICE de nível 3** integrado: é preciso vencê-lo antes de assumir o controle.

### 2.10 Armas de veículo e de cerco

- **Pesada:** a arma ignora a Blindagem dos alvos.
- **Raio:** o dano atinge todos os alvos no raio (Perto ou Próximo). DES CD 12 para metade.
- **Indireta:** dispara por cima de obstáculos, ignorando cobertura parcial, mas não cobertura total (como estar subterrâneo).
- **Guiada:** o ataque ignora cobertura, e a CA do alvo conta como 2 pontos menor.
- **Anti-aéreo:** +2 no ataque contra alvos aéreos e vantagem contra drones.
- **Distante:** o alvo está além da linha de visão do atirador. Exige um **observador** (drone, câmera ou batedor) que veja o alvo e transmita a posição. O **primeiro disparo** contra um alvo tem desvantagem; depois dele (acerto ou erro), os tiros seguintes não têm. Um drone do Rigger como observador dá vantagem.
- **Tripulação:** número mínimo de operadores para disparar.
- **Recarga:** em armas de cerco, recarregar custa 1 ação de cada tripulante.

---

## 3. Veículos

Veja o campo **Terreno** (T = terrestre, Ar = aéreo, Aq = aquático) e as legendas na seção 1.2.

### 3.1 Veículos leves

| Veículo | Terr. | CA | HP | BL | Man. | Vel. | Ocup. | Carga | Hardp. | Custo | Lic. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Scooter elétrica** | T | 11 | 6 | 0 | +2 | Normal | 1+1 | 2 | 0 | 1.000 cr | C |
| **Moto urbana** | T | 12 | 10 | 0 | +3 | Rápida | 1+1 | 2 | 0 | 3.000 cr | C |
| **Moto tática** | T | 13 | 12 | 0 | +4 | Muito rápida | 1+1 | 2 | 1L | 8.000 cr | R |
| **Buggy de Zona** | T | 12 | 15 | 1 | +2 | Rápida | 1+3 | 4 | 1L | 6.000 cr | C |
| **Carro compacto** | T | 11 | 20 | 0 | +1 | Normal | 1+3 | 6 | 0 | 8.000 cr | C |
| **Carro esportivo** | T | 12 | 18 | 0 | +3 | Muito rápida | 1+1 | 2 | 0 | 14.000 cr | C |
| **Lancha** | Aq | 11 | 18 | 0 | +1 | Rápida | 1+3 | 4 | 0 | 5.000 cr | C |
| **Hoverbike** | Ar | 13 | 12 | 0 | +4 | Muito rápida | 1+1 | 2 | 1L | 15.000 cr | R |
| **Drone de transporte** | Ar | 12 | 10 | 0 | +2 | Normal | 0 (remoto) | 8 | 0 | 2.500 cr | C |

**Notas:**
- **Motos, scooters, buggies e hoverbikes são abertos:** os ocupantes não têm cobertura.
- **Buggy de Zona:** ignora terreno difícil de ruínas e entulho.
- **Drone de transporte:** controlado por controle remoto, a até Longe. Transporta carga, não pessoas.

### 3.2 Veículos médios

| Veículo | Terr. | CA | HP | BL | Man. | Vel. | Ocup. | Carga | Hardp. | Custo | Lic. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Van de carga** | T | 11 | 30 | 1 | 0 | Normal | 1+5 | 20 | 0 | 12.000 cr | C |
| **Caminhão de transporte** | T | 11 | 50 | 1 | -1 | Lenta | 1+2 | 40 | 0 | 35.000 cr | C |
| **Sedan executivo blindado** | T | 13 | 40 | 3 | +1 | Rápida | 1+3 | 6 | 0 | 30.000 cr | R |
| **SUV tático** | T | 13 | 45 | 2 | 0 | Rápida | 1+5 | 10 | 1M | 25.000 cr | R |
| **Technical** (caminhonete armada) | T | 12 | 35 | 1 | 0 | Rápida | 1+4 | 10 | 1M | 28.000 cr | I |
| **Aerocarro civil** | Ar | 12 | 25 | 0 | +1 | Rápida | 1+3 | 6 | 0 | 40.000 cr | C |
| **Aerocarro corporativo** | Ar | 14 | 40 | 2 | +1 | Muito rápida | 1+3 | 6 | 1M | 120.000 cr | R |
| **Barco de patrulha** | Aq | 12 | 40 | 1 | 0 | Rápida | 2+6 | 10 | 1M | 45.000 cr | R |
| **Helicóptero leve** | Ar | 13 | 35 | 1 | 0 | Muito rápida | 1+4 | 6 | 1M | 150.000 cr | R |

**Notas:**
- **Van de carga:** a mais comum nas equipes. Cabe uma oficina móvel (kit de ferramentas e bancada).
- **Aerocarros:** exigem licença de voo (R) para uso em áreas controladas. Em áreas livres, o voo é permitido.
- **Technical:** só a gangue sabe de onde veio a metralhadora.

### 3.3 Veículos pesados

| Veículo | Terr. | CA | HP | BL | Man. | Vel. | Ocup. | Carga | Hardp. | Custo | Lic. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Caminhão militar** | T | 13 | 70 | 3 | -1 | Lenta | 1+10 | 30 | 1M | 150.000 cr | M |
| **Blindado de transporte (APC)** | T | 15 | 90 | 5 | -1 | Normal | 2+8 | 10 | 1M + 1L | 220.000 cr | M |
| **Tanque leve** | T | 16 | 120 | 6 | -2 | Normal | 3 | 4 | 1P + 1L | 400.000 cr | M |
| **Tanque pesado** | T | 17 | 180 | 8 | -3 | Lenta | 4 | 6 | 1P + 2M | 900.000 cr | M |
| **Plataforma de artilharia** | T | 14 | 100 | 4 | -2 | Lenta | 4 | 4 | 1P | 450.000 cr | M |
| **Helicóptero de ataque** | Ar | 15 | 80 | 3 | +1 | Muito rápida | 2 | 2 | 2M + 1P | 500.000 cr | M |
| **VTOL de assalto** | Ar | 15 | 110 | 4 | 0 | Muito rápida | 2+10 | 10 | 2M + 1P | 700.000 cr | M |
| **Fragata costeira** | Aq | 14 | 140 | 4 | -2 | Normal | 8+20 | 40 | 2M + 1P | 600.000 cr | M |

**Notas:**
- **Blindados e tanques:** os ocupantes têm cobertura total e só sofrem com armas Pesadas, explosões ou a destruição do veículo.
- **Plataforma de artilharia:** o hardpoint P carrega um obus ou lançador de foguetes múltiplo (7.2). Precisa de um observador.
- **Helicóptero de ataque e VTOL:** ignoram terreno e sobrevoam a cidade. Um acerto de arma Pesada pode causar Avaria 1 em um rotor.

---

## 4. Módulos

Módulos são modificações que se instalam em um veículo ou mecha. Cada veículo comporta **1 módulo por categoria** (Leve 1, Médio 2, Pesado 3, Mecha 3), mais os que o Mestre permitir.

O **custo** abaixo é o de um veículo **Leve**. Multiplique por **2** para Médio, **4** para Pesado e **3** para Mecha.

| Módulo | Efeito | Custo (Leve) |
|---|---|---|
| **Blindagem reforçada** | +1 de BL, -1 de Manobra. | 1.000 cr |
| **Pneus e esteiras reforçados** | Ignora a Avaria 1 (pneu, esteira ou rotor destruído). | 500 cr |
| **Motor turbo** | +1 de Manobra. 1 vez por cena, vantagem na disputa de perseguição por 3 rodadas. | 1.500 cr |
| **Jammer e ECM** | Mísseis guiados perdem a propriedade Guiada contra o veículo. +3 na CD de hack contra ele. | 1.000 cr |
| **Interface neural** | Permite pilotar por link neural (com jack de interface). +1 em pilotagem. Um Rigger tem vantagem. | 800 cr |
| **Controle de armas integrado** | O piloto usa as armas montadas sem precisar de atirador. | 1.500 cr |
| **Camuflagem térmica e óptica** | Sensores e câmeras têm desvantagem para detectar o veículo. Dura 1 hora por bateria. | 3.000 cr |
| **Fumaça e chaff** | 1 uso por cena: cobertura total por 1d4 rodadas contra visão e radar. | 400 cr |
| **Blindagem anti-EMP** | Imune a EMP. +2 na CD de hack. | 1.200 cr |
| **Cabine blindada** | O dano que os ocupantes sofrem na destruição cai uma categoria. | 1.500 cr |
| **Compartimento secreto** | Esconde 4 slots de carga. Achá-lo exige teste CD 15. | 500 cr |
| **Autonomia estendida** | Dobra a autonomia de combustível e bateria. | 400 cr |
| **Assentos extras** | +2 passageiros (+1 em Leves). | 300 cr |
| **Reparo automático** | Recupera 1 HP por rodada fora de combate. | 3.000 cr |
| **Sensores** | Visão térmica e radar: enxerga no escuro e detecta veículos até Longe. | 800 cr |
| **Escudo energético** | Absorve 5 x categoria de dano por cena (Leve 5, Médio 10, Pesado 15, Mecha 20). Recarrega com descanso. | 4.000 cr |
| **Propulsores de salto** (Mechas) | Salto de até Longe, ignorando terreno e obstáculos. 3 usos por descanso. | 2.500 cr |
| **Sistema de ejeção** | O piloto escapa da destruição sem sofrer o dano. | 1.000 cr |

---

## 5. Armas pesadas pessoais

Estas armas podem ser carregadas por um runner, mas pedem esforço. A maioria exige as duas mãos e **3 ou mais slots**. Runners com **FOR menor que 12** usam armas pesadas com desvantagem, a menos que vistam um exoesqueleto (seção 8.1).

Convenções: veja a seção 2.10. **Pesada** significa que o ataque ignora a Blindagem do alvo.

| Arma | Dano | Alcance | Slots | Custo | Munição | Lic. | Notas |
|---|---|---|---|---|---|---|---|
| **Metralhadora leve** | d12 | Longe | 3 | 1.500 cr | Carregador, 30 cr | R | Duas mãos, Rajada. |
| **Lança-granadas** | 2d6, raio Perto | Longe | 2 | 1.200 cr | Granada, 100 cr | R | Pesada, duas mãos. |
| **Lança-foguetes** | 3d8, raio Perto | Longe | 3 | 2.000 cr | Foguete, 300 cr | M | Pesada, duas mãos. Recarregar custa 1 ação. **Rajada de fogo:** quem estiver Perto, atrás do atirador, sofre 2d6. Não use em ambiente fechado. |
| **Rifle anti-material** | 2d8 | Longe | 3 | 3.500 cr | Carregador, 60 cr | M | Pesada, mira, duas mãos. |
| **Minigun** | 2d6, Rajada | Longe | 4 | 5.000 cr | Caixa (4 cargas), 150 cr | M | Duas mãos. Exige FOR 15 ou exoesqueleto. Ativar o motor custa 1 ação. |
| **Lança-chamas** | 2d6 fogo | Próximo (cubo) | 3 | 1.800 cr | Tanque, 100 cr | R | Duas mãos. O alvo queima 1d6 por rodada por 1d4 rodadas (apagar custa uma ação). |
| **Rifle de trilho portátil** | 3d10 | Longe | 3 | 8.000 cr | Bateria (6 tiros), 400 cr | M | Pesada, duas mãos. Ignora cobertura parcial. |
| **Canhão de plasma portátil** | 3d8 fogo, raio Perto | Próximo | 3 | 12.000 cr | Célula (4 tiros), 500 cr | M | Pesada, duas mãos. |
| **Lança-mísseis portátil** | 4d8 | Longe | 3 | 6.000 cr | Míssil, 1.000 cr | M | Pesada, guiada, anti-aérea, duas mãos. |
| **Morteiro portátil** | 3d6, raio Próximo | Distante | 3 | 4.000 cr | Granada, 200 cr | M | Pesada, indireta, exige observador. Montar custa 1 ação. |

---

## 6. Explosivos e granadas

**Explosões ignoram a Blindagem.** Todas as granadas são arremessáveis até Próximo, e cabem **3 por slot**. Quem está no raio faz DES CD 12 para sofrer metade do dano (ou resistir ao efeito, se for outro).

| Item | Efeito | Custo |
|---|---|---|
| **Granada de fragmentação** | 2d6 de dano em raio Perto. | 100 cr |
| **Granada de atordoamento** | Raio Perto: CON CD 12 ou fica cego e surdo por 1d4 rodadas. | 80 cr |
| **Granada de fumaça** | Cubo Próximo: cobertura total por 10 rodadas (visão e infravermelho). | 50 cr |
| **Granada EMP** | Raio Perto: eletrônicos e implantes desativados por 1d4 rodadas. Implante: CON CD 12 para resistir. | 300 cr |
| **Granada de termita** | 3d6 de fogo em raio Perto. Queima 1d6 por rodada por 1d4 rodadas. Derrete fechaduras e armadura leve. | 250 cr |
| **Granada de gás** | Cubo Próximo: CON CD 12 ou o alvo fica incapacitado por 1d4 rodadas (sedativo) ou sofre 1d6 por rodada (tóxico). | 150 cr |
| **Carga de demolição** | 4d10 contra estruturas e portas, 2d6 em raio Próximo. Detona em 1d4 rodadas ou por controle remoto. | 500 cr |
| **Mina antipessoal** | 2d6 em raio Perto ao ser pisada. Detectar exige SAB CD 15; desarmar, INT CD 12. | 200 cr |

---

## 7. Armas de cerco e de veículo

Estas armas são montadas em veículos (nos **hardpoints**), em tripés ou em bases fixas. Têm **tripulação** mínima. Uma arma de tamanho **L** cabe em qualquer hardpoint; **M** cabe em hardpoints M ou P; **P** só em hardpoints P.

### 7.1 Armas montadas leves e médias

| Arma | Dano | Alcance | Tam. | Tripul. | Custo | Munição | Notas |
|---|---|---|---|---|---|---|---|
| **Metralhadora leve** (veículo) | d10 | Longe | L | 1 | 1.500 cr | Carregador, 30 cr | Rajada. |
| **Lança-granadas** (veículo) | 2d6, raio Perto | Longe | L | 1 | 1.500 cr | Granada, 100 cr | Pesada. |
| **Metralhadora pesada** | 2d8, Rajada | Longe | M | 1 | 2.500 cr | Carregador, 60 cr | Rajada. |
| **Canhão automático (30 mm)** | 3d8 | Longe | M | 1+1 | 15.000 cr | Caixa, 200 cr | Pesada. |
| **Lançador de foguetes** | 3d8, raio Perto | Longe | M | 1 | 8.000 cr | Foguete, 300 cr | Pesada. 4 foguetes por pod. |
| **Lançador de mísseis** | 4d8 | Longe | M | 1 | 20.000 cr | Míssil, 1.000 cr | Pesada, guiada. |
| **Canhão EMP** | Sem dano | Longe | M | 2 | 80.000 cr | Bateria, 1.000 cr | Raio Próximo: eletrônicos desativados por 1d4 rodadas. Implantes: CON CD 12. |

### 7.2 Artilharia e armas de cerco

| Arma | Dano | Alcance | Tam. | Tripul. | Custo | Munição | Notas |
|---|---|---|---|---|---|---|---|
| **Canhão antiaéreo duplo** | 3d10, Rajada | Longe | P | 2 | 40.000 cr | Caixa, 500 cr | Pesada, anti-aérea. Com radar, acerta alvos aéreos Distantes. |
| **Lançador de mísseis SAM** | 4d8 | Distante (aéreos) | P | 2 | 60.000 cr | Míssil, 3.000 cr | Pesada, guiada, anti-aérea. |
| **Morteiro pesado** | 3d8, raio Próximo | Distante | M | 2 | 25.000 cr | Granada, 400 cr | Pesada, indireta. |
| **Canhão de tanque (120 mm)** | 5d8, raio Perto | Longe | P | 2 | 90.000 cr | Projétil, 800 cr | Pesada. |
| **Laser pesado** | 3d10 | Longe | P | 2 | 90.000 cr | Bateria (10 tiros), 1.000 cr | Pesada. Ignora cobertura parcial. Num 1 natural, superaquece por 1d4 rodadas. |
| **Canhão de trilho** | 6d10 | Distante | P | 3 | 250.000 cr | Bateria (3 tiros), 2.000 cr | Pesada. Ignora cobertura parcial. Só como butim Lendário. |
| **Obus autopropulsado** | 6d8, raio Próximo | Distante | P | 4 | 400.000 cr | Projétil, 1.500 cr | Pesada, indireta. |
| **Lançador múltiplo de foguetes** | 4d8, raio Próximo em 2 pontos | Distante | P | 3 | 350.000 cr | Salva, 3.000 cr | Pesada, indireta. |

**Instalação:** montar uma arma de cerco em tripé ou base fixa leva 1 hora. Em veículo, a instalação em um hardpoint compatível leva 1 dia numa oficina.

### 7.3 Torreta sentinela autônoma

Uma torreta com sensor, bateria e uma IA simples. Dispara em quem não portar o transponder.

**CA** 14 | **HP** 20 | **BL** 2 | **MOV** Fixo | **Moral** Sem medo | **Custo** 12.000 cr | **Lic.** R
**ATQ:** 1 metralhadora pesada +5 (2d8, Longe, Rajada).
**Vigília:** detecta movimento em até Longe e ataca quem não portar o transponder.
**Hackeável:** hack CD 15.
**Máquina.** Instalação: 1 hora. Bateria: 1 dia.

---

## 8. Mechas

Mechas são máquinas de guerra pilotadas, grandes demais para as ruas e perfeitas para as batalhas. São caros, raros e quase sempre militares. Quem tem um mecha é alvo, ou pode ser o alvo mais rico da cidade.

### 8.1 Exoesqueletos

Um exoesqueleto é um mecha **vestível**: o runner o veste por cima do corpo.

| Exoesqueleto | CA | HP | BL | FOR | Slots extras | Hardp. | Custo | Lic. |
|---|---|---|---|---|---|---|---|---|
| **De carga** | 13 | 15 | 1 | +3 | +6 | 0 | 25.000 cr | R |
| **De combate** | 15 | 25 | 2 | +4 | +4 | 1M | 60.000 cr | M |
| **Pesado** | 16 | 40 | 3 | +4 | +4 | 1P | 120.000 cr | M |

- **Vestir:** 1 minuto. **Sair:** uma ação.
- **HP do exoesqueleto:** absorve o dano antes do runner, e a BL reduz o dano de armas comuns enquanto o exoesqueleto tiver HP. Reparos seguem a regra 2.8.
- **FOR:** usa o mod. de FOR do exoesqueleto (no lugar do seu) nos ataques corpo a corpo, em testes de força e para carregar.
- **Armas pesadas pessoais:** o exoesqueleto permite usá-las sem desvantagem.
- **Slots extras:** somam-se aos slots do runner.

### 8.2 Mechas pilotados

| Mecha | Tam. | CA | HP | BL | FOR | Golpe | Man. | Vel. | Piloto | Hardp. | Custo | Lic. |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Mecha de carga** | 4 m | 12 | 40 | 1 | +3 | 2d6 | -1 | Lenta | 1 | 0 (ferramentas) | 60.000 cr | C |
| **Mecha de arena** | 3,5 m | 14 | 45 | 2 | +3 | 2d6 | +1 | Normal | 1 | 2L | 90.000 cr | R |
| **Caminhante** (leve) | 4 m | 14 | 35 | 2 | +3 | 2d6 | +1 | Rápida | 1 | 1M + 1L | 150.000 cr | M |
| **Aranha** (leve) | 4 m | 14 | 40 | 2 | +3 | 2d6 | +1 | Normal | 1 | 1M | 250.000 cr | M |
| **Cavalo** (quadrúpede) | 5 m | 15 | 60 | 3 | +4 | 2d8 | 0 | Rápida | 1+1 | 1M + 1L | 300.000 cr | M |
| **Sentinela** (médio) | 6 m | 15 | 65 | 3 | +4 | 2d8 (Pesada) | 0 | Normal | 1 | 2M + 1L | 400.000 cr | M |
| **Golias** (pesado) | 9 m | 16 | 110 | 5 | +5 | 3d8 (Pesada) | -1 | Lenta | 1 (+1 artilheiro) | 2M + 1P | 1.000.000 cr | M |
| **Titã** (colosso) | 18 m | 17 | 220 | 8 | +6 | 4d10 (Pesada) | -2 | Lenta | 3 | 3P + 2M | Não é vendido | M |

**Notas:**
- **Aranha:** escala paredes e tetos em velocidade normal.
- **Cavalo:** o passageiro vai na garupa, exposto (sem cobertura).
- **Titã:** exige piloto, artilheiro e engenheiro. É butim Lendário, o tipo de coisa que muda a cidade.

### 8.3 Combate com mechas

- **Pilotar:** o piloto ocupa a cabine e tem **cobertura total** enquanto o mecha estiver acima de 0 HP. Move-se e age normalmente.
- **Ataque corpo a corpo:** d20 + FOR do mecha. Causa o dano do **Golpe**. Mechas Sentinela, Golias e Titã têm Golpe **Pesado** (ignora Blindagem).
- **Ataque à distância:** d20 + DES do piloto, com as armas montadas.
- **Pisotear:** ação. Cada alvo de tamanho humano Perto do mecha faz DES CD 12 ou sofre metade do dano do Golpe.
- **Agarrar:** teste disputado de FOR (do mecha contra o alvo). Se vencer, o alvo fica preso e sofre o dano do Golpe a cada rodada.
- **Acertos críticos** contra o mecha atingem a cabine: o piloto sofre d6.
- **Espaço:** mechas Leves e Médios ocupam o espaço Perto. Golias e Titã ocupam o espaço Próximo e passam por cima de obstáculos pequenos. Mechas Médios ou maiores **não passam por portas comuns**.
- **Ejeção:** o piloto pode sair do mecha com uma ação. Se o mecha estiver a 0 HP, DES CD 12 ou sofre 2d6.
- **Destruição:** ao chegar a 0 HP, o mecha paralisa. O piloto sofre **4d6** (DES CD 12 para metade), ou nada se tiver o módulo de ejeção.
- **Energia:** um mecha opera 6 horas por bateria. Trocar a bateria custa 1.000 cr e 10 minutos.

### 8.4 Módulos para mechas

Os módulos da seção 4 se aplicam. Mechas aceitam ainda os módulos **Propulsores de salto** e **Escudo energético**, e podem receber um **braço pesado** (um hardpoint M ocupado por uma ferramenta: martelo, garra, serra) que dá +1 no Golpe.

---

## 9. Veículos e mechas como ameaças

Para o Mestre: veículos e mechas hostis, com NA, ataques e traços.

#### Viatura da Guarda (NA 3)
Sedan leve de patrulha, com sirene e luz de aviso.
**CA** 13 | **HP** 35 | **BL** 1 | **MOV** Dobro Próximo | **Alinh.** Controle
**ATQ:** 1 metralhadora leve +4 (d10, Longe, Rajada), mais os ocupantes (2 Policiais urbanos).
**Sirene:** reforço de 1d4 policiais em 1d4 rodadas.

#### Technical de gangue (NA 3)
Caminhonete com uma metralhadora pesada soldada na caçamba.
**CA** 12 | **HP** 35 | **BL** 1 | **MOV** Dobro Próximo | **Alinh.** Sobrevivência
**ATQ:** 1 metralhadora pesada +4 (2d8, Longe, Rajada), mais 3 Capangas.

#### Drone-aranha (NA 5)
Plataforma não tripulada de seis patas.
**CA** 15 | **HP** 40 | **BL** 2 | **MOV** Dobro Próximo (escala paredes) | **Alinh.** Controle
**ATQ:** 2 patas +6 (d8) e 1 metralhadora leve +6 (d10, Longe, Rajada).
**Máquina. Sem medo.**

#### Blindado de transporte (NA 6)
Veículo de assalto com porta traseira para 8 soldados.
**CA** 15 | **HP** 90 | **BL** 5 | **MOV** Dobro Próximo | **Alinh.** Controle
**ATQ:** 1 metralhadora pesada +7 (2d8, Longe, Rajada) e 1 lança-granadas +7 (2d6, raio Perto).
**Desembarque:** ao fim da rodada seguinte, 8 Soldados de esquadrão descem.

#### Mecha Caminhante (NA 5)
Mecha leve de duas pernas, rápido e frágil.
**CA** 14 | **HP** 35 | **BL** 2 | **MOV** Dobro Próximo | **Alinh.** Controle
**ATQ:** 1 metralhadora leve +6 (d10, Longe, Rajada) ou 1 golpe +6 (2d6).

#### Mecha Sentinela (NA 7)
Mecha médio de segurança de instalações.
**CA** 15 | **HP** 65 | **BL** 3 | **MOV** Próximo | **Alinh.** Controle
**ATQ:** 1 metralhadora pesada +7 (2d8, Longe, Rajada) ou 1 golpe +7 (2d8, Pesada).
**Pisotear:** DES CD 12 para metade do golpe, em alvos Perto.

#### Tanque leve (NA 8)
Esteiras, torre giratória e um canhão que se ouve a distância.
**CA** 16 | **HP** 120 | **BL** 6 | **MOV** Próximo | **Alinh.** Controle
**ATQ:** 1 canhão de tanque +8 (5d8, raio Perto, Longe, Pesada) e 1 metralhadora leve +8 (d10, Longe, Rajada).

#### Helicóptero de ataque (NA 8)
Voa sobre a cidade e escolhe seus alvos.
**CA** 15 | **HP** 80 | **BL** 3 | **MOV** Longe (voa) | **Alinh.** Controle
**ATQ:** 1 lançador de foguetes +8 (3d8, raio Perto, Longe, Pesada) e 1 metralhadora pesada +8 (2d8, Longe, Rajada).
**Rotor vulnerável:** um acerto de arma Pesada com 5 ou mais de dano causa Avaria 1.

#### Mecha Golias (NA 9)
Mecha pesado de guerra. Cada passo faz o chão tremer.
**CA** 16 | **HP** 110 | **BL** 5 | **MOV** Próximo | **Alinh.** Controle
**ATQ:** 1 canhão automático +9 (3d8, Longe, Pesada), 1 lançador de foguetes +9 (3d8, raio Perto, Longe, Pesada) e 1 golpe +9 (3d8, Pesada).
**Pisotear:** DES CD 12 para metade do golpe, em alvos Perto.
**Cabine exposta:** um 20 natural contra a cabine causa 3d6 ao piloto.

#### Mecha Titã (NA 10)
Colosso de 18 metros. Quando se move, o bairro inteiro sabe.
**CA** 17 | **HP** 220 | **BL** 8 | **MOV** Próximo | **Alinh.** Controle
**ATQ:** 2 canhões automáticos +10 (3d8, Longe, Pesada), 1 lançador múltiplo +10 (4d8, raio Próximo, Pesada) e 1 golpe +10 (4d10, Pesada).
**Escudo energético:** absorve 20 de dano por cena.
**Pisotear:** DES CD 12 para metade do golpe, em alvos Perto.
**Reator exposto:** um 20 natural contra o reator (CA 19) causa dano dobrado.

---

## 10. Quadro rápido

| Categoria | Faixa de preço | BL típica | Acesso |
|---|---|---|---|
| **Leve** | 1.000 a 15.000 cr | 0 a 1 | Todas as classes |
| **Médio** | 12.000 a 150.000 cr | 1 a 3 | Todas, menos Netrunner |
| **Pesado** | 150.000 a 900.000 cr | 3 a 8 | Solo e Rigger |
| **Mecha** | 60.000 a 1.000.000 cr | 2 a 8 | Solo e Rigger |

**Regras principais:**
- **Blindagem (BL):** reduz o dano de armas comuns. Armas **Pesadas** e **explosões** ignoram.
- **Pilotagem sob pressão:** d20 + DES + Manobra contra CD 9/12/15/18.
- **Perseguição:** disputa de d20 + DES + Manobra; o vencedor muda a distância em 1 faixa (2 se vencer por 5 ou mais).
- **Avaria:** dano de um quarto do HP ou mais em um ataque: d6 na tabela 2.5.
- **Destruição:** 0 HP, ocupantes sofrem d6 / 2d6 / 3d6 / 4d6 por categoria.
- **Distante:** exige observador. O primeiro tiro tem desvantagem.
- **Treino:** 1 semana e 3.000 cr (Médios), 6.000 cr (Pesados), 10.000 cr (Mechas).
