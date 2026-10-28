# SOMBRANEON

*RPG cyberpunk de regras enxutas, adaptado do Shadowdark*

> **Status:** v0.6, completo para o primeiro teste de mesa.
> **Referências de projeto:** Shadowdark (base de regras), CyberDark (slots de implante, Edge, alinhamentos) e Dark Space (estrutura de arquétipos, traços de espécie, motivações).
> **Compêndios companheiros:** *SombraNeon: Compêndio de Ameaças* (inimigos, facções, corporações, ameaças digitais, IAs e cultos) e *SombraNeon: Compêndio de Veículos e Armamento* (veículos, armas pesadas, armas de cerco e mechas).

**Decisões de projeto:**
- 6 classes: Solo, Netrunner, Hyperdoc, Ghost, Rocker, Rigger.
- 5 origens: Nat, Cromado, Replicante, Android, Biomod. **Sintético** é o termo de rua que cobre Replicantes e Androides.
- Fixer é um antecedente, não uma classe.
- Hacking usa a estrutura de magia do Shadowdark (programas por tier) mais um marcador de Alerta. Sem tríade e sem glitch.
- Cromo tem 4 slots corporais: Neural, Corpo, Braços e Pernas.
- Veículos em 4 categorias (Leve, Médio, Pesado e Mecha), com **acesso por classe** (4.7). Detalhes e fichas no Compêndio de Veículos e Armamento.
- Ameaças com **Nível de Ameaça (NA)** de 0 a 10, no Compêndio de Ameaças.
- Alinhamentos: Controle, Sobrevivência e Liberdade, cada um com gatilhos para ganhar Edge e modificadores de reação por facção.
- Um único recurso de grupo: o **Edge**.
- Economia: créditos (cr). **10 cr equivalem a 1 peça de ouro do Shadowdark.** Para usar tesouros e tabelas dele, multiplique o ouro por 10. Equipamento inicial: 2d6 x 100 cr.
- Progressão: o XP vem do **butim extraído** em missões (Sucata 0, Normal 1, Valioso 3, Lendário 10), como o tesouro do Shadowdark.

**Novidades desta versão:** veja as Notas de versão no final do documento.

---

## Sumário

1. Visão geral
2. Criação de personagem
3. Origens
4. Classes
5. Antecedentes
6. Alinhamentos
7. Cromo e implantes
8. Equipamento
9. Hacking e a Rede
10. Missões e progressão
11. Apêndice
12. Notas de versão

**Compêndios companheiros (arquivos separados):**
- *SombraNeon: Compêndio de Ameaças*
- *SombraNeon: Compêndio de Veículos e Armamento*

---

## 1. Visão geral

### 1.1 O jogo em um parágrafo

Você joga uma equipe de párias, chamados **runners**, numa cidade dominada por corporações, onde o corpo é mercadoria e a informação vale mais que sangue. O jogo é rápido, letal e feito para sessões de uma noite. As regras cabem em poucas páginas, e o **Mestre** decide o resto com bom senso.

### 1.2 A regra de ouro

Quando o resultado de uma ação é incerto e importa, role **d20 + modificador do atributo** e tente igualar ou superar uma **CD** (Classe de Dificuldade).

| Dificuldade | CD |
|---|---|
| Fácil | 9 |
| Normal | 12 |
| Difícil | 15 |
| Extrema | 18 |

- **Quando rolar:** só se houver risco, se a tarefa exigir perícia ou se o tempo for crítico. Se o runner é treinado e há calma, ele simplesmente consegue. Conversa vale mais que dado: argumentos bons dispensam teste.
- **20 natural:** sucesso crítico. Em ataque, acerta automaticamente e o dano dos dados é dobrado.
- **1 natural:** falha crítica. Em ataque, erra automaticamente.
- **Vantagem:** role 2d20 e fique com o melhor.
- **Desvantagem:** role 2d20 e fique com o pior.
- Vantagem e desvantagem não se acumulam, e uma cancela a outra.
- **Teste disputado:** os dois lados rolam, vence o maior resultado (empate, role de novo).

### 1.3 Atributos

Seis atributos, rolados com **3d6 na ordem**: FOR, DES, CON, INT, SAB, CAR.
Se nenhum atributo ficar em 14 ou mais, o jogador pode rolar os seis de novo.

| Valor | Mod |
|---|---|
| 1-3 | -4 |
| 4-5 | -3 |
| 6-7 | -2 |
| 8-9 | -1 |
| 10-11 | 0 |
| 12-13 | +1 |
| 14-15 | +2 |
| 16-17 | +3 |
| 18 ou mais | +4 |

Diferença entre INT e SAB: SAB é instinto, percepção e dados sensoriais. INT é lógica, análise e conhecimento técnico.

### 1.4 Combate

- **Iniciativa:** cada jogador rola d20 + mod. de DES e o Mestre rola 1d20 por grupo inimigo. Quem tirar mais age primeiro na rodada. Empate favorece os jogadores. A ordem se mantém até o fim do combate.
- **No seu turno:** você se move até o alcance **Próximo** e faz uma **ação** (atacar, executar um programa, usar um item). Se pular a ação, pode se mover Próximo de novo. Pequenas tarefas paralelas (dar uma ordem, levantar, ativar um aparelho) não custam a ação.
- **Alcances:** Perto (mão a mão, cerca de 1,5 m), Próximo (até cerca de 9 m, ou 30 pés) e Longe (dentro da linha de visão).
- **Ataque corpo a corpo:** d20 + mod. de FOR (ou DES com armas leves).
- **Ataque à distância:** d20 + mod. de DES.
- **Acerto:** o resultado iguala ou supera a **CA** do alvo.
- **CA base:** 10 + mod. de DES + armadura.
- **Dano:** role os dados da arma (ou do programa) e some bônus relevantes. Em acerto crítico, dobre os dados.
- **Surpresa:** quem surpreende o inimigo age um turno inteiro antes da iniciativa. Ataques contra alvos surpresos têm vantagem.
- **Cobertura:** alvo com pelo menos metade do corpo protegido ganha +2 de CA. Sem ver o alvo, não dá para atacá-lo.
- **Terreno difícil** (entulho, lama, fios): reduz o deslocamento à metade.
- **Nocaute:** em vez de matar, você pode deixar o alvo inconsciente ao levá-lo a 0 HP.
- **Moral:** quando metade do grupo inimigo cai (ou metade do HP de um inimigo solo), ele foge se falhar num teste de SAB CD 15. Em grupos grandes, o Mestre rola uma vez com o líder. As ameaças do Compêndio de Ameaças têm a própria Moral (Fraca CD 18, Normal CD 15, Firme CD 12, Fanática nunca foge).
- **Armas gêmeas:** a mesma arma em cada mão. Faça um único ataque, e em caso de acerto role o dano com vantagem.
- **Inimigos:** fichas, facções e encontros estão no *Compêndio de Ameaças*.
- **Veículos, mechas e armas pesadas:** pilotagem, perseguição, Blindagem e armas de cerco estão no *Compêndio de Veículos e Armamento*. A regra essencial: a **Blindagem (BL)** de um alvo reduz cada dano de armas comuns, e armas **Pesadas** e explosões a ignoram.

### 1.5 Pontos de vida e morte

- **HP no nível 1:** dado de vida da classe + mod. de CON (mínimo 1).
- **A cada nível:** role o dado de vida da classe + mod. de CON (mínimo 1) e some ao total.
- **0 HP:** você cai inconsciente e está **morrendo**. Role **1d4 + mod. de CON** (mínimo 1): é o número de rodadas que você ainda tem. No início de cada turno seu, role 1d20: um **20 natural** te traz de volta com 1 HP. Se qualquer cura te levar acima de 0, você acorda e não está mais morrendo.
- **Estabilizar:** teste de INT CD 15, alcance Perto, com kit médico (vantagem em orgânicos) ou kit de ferramentas (vantagem em Androides). O alvo continua inconsciente, mas não morre.
- **Morte:** quando o tempo acaba sem ajuda, o personagem se foi.

### 1.6 Evolução

- Nível máximo: **10**.
- Para subir do nível N para N+1 são necessários **N x 10 XP**.
- O XP vem do **butim que o grupo extrai** nas missões (Sucata 0, Normal 1, Valioso 3, Lendário 10) e de avanços no **Drive** pessoal e nos **objetivos do grupo** (Capítulo 2). Tudo está no Capítulo 10.
- Todas as classes rolam um **talento** no nível 1 e nos níveis **3, 5, 7 e 9**.

### 1.7 Edge

O **Edge** é a ficha de estilo e sorte do grupo.

- O Mestre dá uma ficha por feito de estilo, roleplay marcante ou audácia pura, funcionando ou não.
- Você só pode ter **1 ficha** por vez (algumas habilidades permitem mais).
- **Gaste** para repetir qualquer rolagem sua. O novo resultado vale.
- Você pode **entregar** sua ficha a outro runner.
- Seu **alinhamento** (Capítulo 6) traz um gatilho pessoal que recarrega sua ficha uma vez por descanso.
- **Quantidade por sessão:** numa sessão cinematográfica, o Mestre pode dar 2 ou 3 fichas por jogador. Numa sessão sombria e mortal, pode não dar nenhuma.

### 1.8 Tempo e descanso

- **Tempo real:** 1 minuto de mesa equivale a 1 minuto de jogo. Isso importa para a **bateria** e para o **Firewall** (Capítulos 8 e 9), que duram 1 hora de mesa. Se não for possível cronometrar, 1 hora de jogo equivale a 10 rodadas.
- **Descanso (reboot):** 8 horas em local seguro, consumindo 1 ração. Recupera todos os HP e restaura o que volta por descanso (programas e protocolos em Crash, Sets, habilidades de classe).
- **Interrupção:** cada interrupção estressante (combate, alarme, perseguição) exige teste de CON CD 12. Se falhar, a ração é gasta e você não recupera nada.
- **Qualidade da área:** o Mestre rola 1d6 (1 é um encontro aleatório) a cada 3 horas em área **Insegura**, a cada 2 em área **Arriscada** e a cada 1 em área **Mortal**. Em área **Segura** não há rolagem.

---

## 2. Criação de personagem

Sete passos:

1. **Atributos:** role 3d6 seis vezes, na ordem.
2. **Origem:** Nat, Cromado, Replicante, Android ou Biomod (Capítulo 3).
3. **Classe:** escolha uma das seis (Capítulo 4).
4. **Antecedente:** role d20 ou escolha (Capítulo 5).
5. **Alinhamento:** Controle, Sobrevivência ou Liberdade (Capítulo 6), e escolha ou role seu gatilho de Edge.
6. **Cromo:** instale os implantes de partida, se a origem permitir (Capítulo 7).
7. **Equipamento:** role **2d6 x 100 créditos** e compre o que couber (Capítulo 8). Há pacotes sugeridos por classe.

Depois: anote HP e CA, role o talento de nível 1 da classe, escolha um **nome de rua**, aparência e um **Drive**.

**Drive (objetivo pessoal):** combine com o Mestre um objetivo seu. Pode ser público ou segredo entre você e o Mestre. Avançar nele e cumpri-lo em jogo rende XP (10.4). Exemplos: caçar uma IA descontrolada, juntar créditos e cromo raros, subir na hierarquia da corporação, crescer na fama da rua, descobrir segredos e intrigas, simplesmente sobreviver.

**Objetivos do grupo:** no início da campanha, o grupo escolhe 2 objetivos compartilhados que definem o tom. Persegui-los rende XP (10.4). Role ou escolha:

| d6 | Objetivo do grupo |
|---|---|
| 1 | Derrubar uma corporação ou um executivo específico. |
| 2 | Proteger o bairro e as pessoas que moram nele. |
| 3 | Juntar créditos e cromo para sair da cidade. |
| 4 | Descobrir e expor um segredo corporativo. |
| 5 | Libertar sintéticos ou pessoas presas a contratos e códigos. |
| 6 | Sobreviver à próxima temporada, custe o que custar. |

**Idiomas:** todo runner fala o dialeto da cidade e mais um idioma de rua à escolha (japonês, inglês corporativo, código de gangue). Um antecedente ou talento pode dar outro.

---

## 3. Origens

Cada origem tem **traços próprios**. Não há modificadores de atributo.

### 3.1 Nat

O humano natural, ou quase: "Nat" vem de Natural. Corpo de carne, com pouco ou nenhum implante.

- **Corpo sem interface:** enquanto não tiver implante no slot Neural, hacks não conseguem te afetar diretamente.
- **Humanidade firme:** vantagem nos testes contra ciberpsicose.
- **Ambicioso:** role 1 talento extra no nível 1.

### 3.2 Cromado

Quem trocou carne por metal e nunca olhou para trás.

- **Instalação de fábrica:** começa com **2 implantes de qualidade Rua**, grátis, em slots à sua escolha.
- **Cromo estável:** conta 1 implante a menos ao verificar ciberpsicose.
- **Vulnerável:** desvantagem em testes de resistência contra hacking e EMP.

### 3.3 Replicante

Gente fabricada: carne cultivada em tanque, memória gravada e um número de série atrás da orelha. Parece humano, sangra como humano e foi feito para servir a alguém. Hoje foge, trabalha por conta própria ou ainda espera ordens.

- **Carne cultivada:** vantagem nos testes de CON contra doença, veneno e fadiga. Você come, dorme e se cura como qualquer humano.
- **Propósito de fábrica:** escolha 1 ao criar: **Combate**, **Infiltração**, **Companhia** ou **Labor**. Você tem vantagem nos testes ligados a ele, a critério do Mestre (Combate: ataques corpo a corpo desarmados e iniciativa. Infiltração: furtividade e disfarce. Companhia: persuasão e leitura de pessoas. Labor: consertar, carregar e resistir a esforço).
- **Memória plantada:** 1 vez por descanso, repita um teste de conhecimento ou de lembrar algo em que você falhou. São lembranças que não são suas, mas funcionam.
- **Registro:** você tem um número de série, gravado no olho ou na nuca. Scanners médicos e de segurança te identificam como replicante. Polícia, segurança corporativa e executivos que saibam o que você é têm -2 na reação a você, e uma corporação pode reivindicar sua posse, um gancho de aventura à disposição do Mestre. Sem scanner, você passa por humano.

### 3.4 Android

Robô humanoide: chassi de liga, processador e uma mente que aprendeu a querer. Pode ser uma antiga unidade de segurança, doméstica ou industrial, hoje livre, foragida ou em busca do próprio dono.

- **Chassi:** você não precisa comer, beber, respirar ou dormir. Seu descanso é manutenção (as mesmas 8 horas, sem ração). Veneno e doença orgânica não te afetam.
- **Casco de fábrica:** +1 de CA enquanto não usar armadura.
- **Interface nativa:** você se conecta a decks, drones e terminais sem cabo, ao alcance Perto, e tem vantagem em hack de rua.
- **Mente estável:** conta 1 implante a menos ao verificar ciberpsicose (7.3).
- **Máquina:** desvantagem em testes de resistência contra hacking e EMP. Stims e o Sistema de estimulantes não funcionam em você, e protocolos de cura de Hyperdoc curam só metade. Em compensação, um aliado com **kit de ferramentas** pode te reparar em campo (INT CD 12, **1d6 HP por hora**, ou **2d6** se for um Rigger). O descanso comum continua restaurando seus HP.
- **Visível:** a menos que use uma **pele cosmética** (cerca de 3.000 cr, instalada por um Hyperdoc ou clínica), qualquer pessoa percebe que você é uma máquina. Polícia, segurança corporativa e executivos têm -2 na reação a você, e uma corporação pode reivindicar sua posse. Com a pele, só um scanner te denuncia.

**Sintético, o termo de rua:** a gíria da cidade chama Replicantes e Androides de **sintéticos**. Facções, leis e contratos dizem "sintético" quando não se importam com a diferença. Para as regras do livro, vale a origem específica, e o termo geral aparece em frases como "libertar sintéticos" e na tabela de reação por facção (6.2).

### 3.5 Biomod

Corpo reescrito por engenharia genética.

- **Genoma instável:** role **2 mutações** na tabela abaixo (se repetir, role de novo). Ou escolha 1 e role a outra, se o Mestre concordar.
- **Corpo rejeita cromo:** conta 1 implante a mais ao verificar ciberpsicose.

| d20 | Mutação |
|---|---|
| 1 | **Anfíbio:** respira água e ar e nada em velocidade total. |
| 2 | **Poderoso:** +1 em acerto e dano com armas corpo a corpo. |
| 3 | **Pele blindada:** +1 de CA enquanto não usar armadura. |
| 4 | **Comunicação oculta:** comunica-se em segredo (feromônios, ultrassom) com quem entende. |
| 5 | **Mira biológica:** +1 em acerto e dano com armas à distância. |
| 6 | **Sentidos agudos:** você não pode ser surpreendido. |
| 7 | **Arma natural:** garras, presas ou chifres com dano d6, com os quais você tem proficiência. |
| 8 | **Planador:** membranas permitem planar. Você não sofre dano de queda e se move Próximo durante a descida. Não ganha altura. |
| 9 | **Camuflagem:** 1 vez por dia, fique invisível por 3 rodadas. |
| 10 | **Faro de caçador:** 1 vez por dia, escolha uma presa. Você tem vantagem em todos os testes para rastreá-la. |
| 11 | **Adaptado a extremos:** meio dano de fogo e calor, ou de gelo e frio (escolha ao rolar). |
| 12 | **Técnico nato:** +1 em testes com tecnologia e máquinas. |
| 13 | **Afinidade com vivos e máquinas:** +1 em testes de interação com animais, drones e robôs. |
| 14 | **Resistência a choque e radiação:** meio dano de eletricidade (inclui EMP) e radiação. |
| 15 | **Filtro tóxico:** sobrevive em ambientes tóxicos e sofre meio dano de veneno. |
| 16 | **Escalador nato:** escala em velocidade total e reduz a CD de escalada em uma categoria. |
| 17 | **Braços extras:** 1 ação não ofensiva extra por turno e +2 slots de equipamento. |
| 18 | **Pernas extras:** move-se Próximo duas vezes no turno além da ação. A CD para te derrubar sobe uma categoria. |
| 19 | **Reflexos acelerados:** vantagem em iniciativa. |
| 20 | **Regeneração:** 1 vez por descanso, como ação, recupere 1d6 + nível HP. |

---

## 4. Classes

Cada classe tem: dado de vida, armas e armaduras, habilidades base e uma **tabela de talentos** (2d6).

**Como usar a tabela de talentos:** role 2d6 no nível 1 e nos níveis 3, 5, 7 e 9.
- Em **7-9**, escolha um dos atributos listados e some **+2** ao valor dele.
- Em **12**, escolha qualquer talento da tabela ou +2 pontos de atributo, divididos como quiser.
- Talentos repetidos se acumulam.

Os arquétipos das fichas do CyberDark (Ronin, Slicer, Breaker, Synthsmith, Echo, Codemancer) inspiraram os talentos das classes abaixo.

### 4.1 Solo

*Equivalente ao Guerreiro. O especialista em combate.*

- **Dado de vida:** d8.
- **Atributo-chave:** FOR ou DES.
- **Armas:** todas. **Armaduras:** todas.
- **Veículos:** treinado em Leves, Médios, Pesados e Mechas (4.7).

**Habilidades base:**
- **Domínio de arma:** escolha um tipo de arma (lâminas, pistolas, armas pesadas, etc.). Ganha +1 em acerto e dano, mais metade do seu nível (arredondando para baixo).
- **Chassi:** soma seu mod. de CON (se positivo) aos slots de equipamento.
- **Resistente:** vantagem em testes de CON para resistir a ferimentos, veneno e efeitos colaterais de cromo.
- **Duro de matar:** 3 vezes por descanso, ao cair a 0 HP, faça um teste de CON CD 15. Se passar, você fica de pé com 1 HP.

| 2d6 | Talento |
|---|---|
| 2 | **Segundo domínio:** domínio de outro tipo de arma. |
| 3-6 | **Arma afinada:** +1 em acerto e dano com armas do seu domínio. |
| 7-9 | **+2 em FOR, DES ou CON.** |
| 10-11 | **Armadura treinada:** +1 de CA com armaduras médias ou pesadas. |
| 12 | Escolha qualquer talento acima ou +2 pontos de atributo. |

### 4.2 Netrunner

*Equivalente ao Mago. O especialista em invasão.*

- **Dado de vida:** d4.
- **Atributo-chave:** INT.
- **Armas:** facas, pistolas leves, armas de choque. **Armaduras:** nenhuma.
- **Veículos:** treinado em Leves (4.7).

**Habilidades base:**
- **Deck:** você precisa de um deck para executar programas (Capítulo 8). Sem deck, sem programas.
- **Programas:** conhece **2 programas de tier 1** no nível 1 e aprende **1 novo programa por nível**.
- **Tier máximo por nível:** T1 (níveis 1-2), T2 (3-4), T3 (5-6), T4 (7-8), T5 (9-10).
- **Execução e falhas:** Capítulo 9.

| 2d6 | Talento |
|---|---|
| 2 | **Biblioteca:** aprende 1 programa extra. |
| 3-6 | **Programa afinado:** +1 para executar um programa à sua escolha. |
| 7-9 | **+2 em INT, DES ou CON.** |
| 10-11 | **Deck customizado:** seu deck absorve o primeiro Feedback de cada descanso. |
| 12 | Escolha qualquer talento acima ou +2 pontos de atributo. |

### 4.3 Hyperdoc

*Equivalente ao Clérigo. O especialista em corpo, nanotecnologia e implantes.*

- **Dado de vida:** d6.
- **Atributo-chave:** SAB.
- **Armas:** facas, pistolas leves, bastões. **Armaduras:** leves e médias.
- **Veículos:** treinado em Leves e Médios (4.7).

**Habilidades base:**
- **Nanokit:** você precisa de um nanokit (1 slot) para usar protocolos.
- **Protocolos:** funcionam como programas, mas usam **SAB** e a lista de protocolos. Conhece 2 de tier 1 no nível 1 e aprende 1 por nível, com a mesma tabela de tiers do Netrunner.
- **Primeiros socorros:** 1 vez por cena, estabilize um aliado a 0 HP sem teste e sem gastar protocolo.
- **Cirurgião:** pode instalar e remover implantes com um kit cirúrgico e 1 hora de trabalho.
- **Execução e falhas:** Capítulo 9.

| 2d6 | Talento |
|---|---|
| 2 | **Biblioteca clínica:** aprende 1 protocolo extra. |
| 3-6 | **Protocolo afinado:** +1 para executar um protocolo à sua escolha. |
| 7-9 | **+2 em SAB, INT ou CON.** |
| 10-11 | **Nanobots em enxame:** protocolos de cura curam +1d4 HP. |
| 12 | Escolha qualquer talento acima ou +2 pontos de atributo. |

### 4.4 Ghost

*Equivalente ao Ladrão. O especialista em infiltração.*

- **Dado de vida:** d4.
- **Atributo-chave:** DES.
- **Armas:** facas, pistolas leves, armas silenciadas, armas de uma mão. **Armaduras:** leves.
- **Veículos:** treinado em Leves e Médios (4.7).

**Habilidades base:**
- **Ataque furtivo:** ao atacar alvo desatento, flanqueado ou pelas costas, role **1 dado de arma extra**, e mais 1 a cada 2 níveis (níveis 3, 5, 7 e 9).
- **Fantasma:** vantagem em furtividade, escalada, disfarce, achar e desarmar sensores ou armadilhas, tarefas delicadas (arrombar, plantar, furtar) e hack de rua (Capítulo 9).
- **Edge de rua:** depois de cada descanso, se você não tiver uma ficha de Edge, ganhe uma.

| 2d6 | Talento |
|---|---|
| 2 | **Edge extra:** você pode guardar até 2 fichas de Edge. |
| 3-6 | **Exploit:** ao atacar ou hackear um alvo desatento, aplique 1 efeito por 1d4 rodadas à sua escolha: cego, imóvel, +1 dado de dano ou 1 implante desativado. |
| 7-9 | **+2 em DES, SAB ou CAR.** |
| 10-11 | **Camuflagem óptica:** 1 vez por descanso, some de câmeras e scanners por 1 hora. |
| 12 | Escolha qualquer talento acima ou +2 pontos de atributo. |

### 4.5 Rocker

*Equivalente ao Bardo. O especialista em carisma e performance.*

- **Dado de vida:** d6.
- **Atributo-chave:** CAR.
- **Armas:** facas, pistolas leves, armas de uma mão. **Armaduras:** leves.
- **Veículos:** treinado em Leves e Médios (4.7).

**Habilidades base:**
- **Rig de palco:** instrumento, sintetizador ou implante vocal (1 slot). Sem rig, sem Sets.
- **Sets:** conhece 3 Sets à sua escolha no nível 1 e aprende 1 novo nos níveis 4, 7 e 10. Cada Set pode ser usado **1 vez por descanso**, como ação, com teste de **d20 + CAR contra CD 12**. Em falha, o Set não é gasto.

| Set | Efeito |
|---|---|
| **Hype** | Aliados que te ouvem têm vantagem no próximo teste. |
| **Estática** | Até 1 + mod. de CAR inimigos têm desvantagem no próximo ataque ou teste. |
| **Refrão** | Aliados que te ouvem recuperam 1d6 + nível HP. |
| **Solo** | Um alvo Próximo que te ouça sofre 1d6 + nível de dano sônico (teste de CON CD 12 para metade). |
| **Cadência** | Aliados que te ouvem ganham +1 de CA até o fim da cena. |
| **Distorção** | Inimigos Próximos fazem teste de CON CD 12 ou ficam atordoados por 1 rodada. |

- **Palco:** vantagem em testes ligados a música, vídeo, podcast e apresentações em geral.
- **Fama:** vantagem em testes de CAR com quem te reconhece (o Mestre decide).
- **Ressonância:** quando você ou um aliado Próximo gasta uma ficha de Edge, some +1d6 ao novo resultado.

| 2d6 | Talento |
|---|---|
| 2 | **Setlist maior:** aprende 1 Set extra. |
| 3-6 | **Afinação:** +1 nos testes de um Set à sua escolha. |
| 7-9 | **+2 em CAR, DES ou INT.** |
| 10-11 | **Backing track:** 1 Set por descanso pode ser usado sem gastar sua ação. |
| 12 | Escolha qualquer talento acima ou +2 pontos de atributo. |

### 4.6 Rigger

*Equivalente ao Patrulheiro. O especialista em reconhecimento, com drone voador companheiro.*

- **Dado de vida:** d6.
- **Atributo-chave:** DES (INT para o drone).
- **Armas:** pistolas, fuzis leves, facas. **Armaduras:** leves e médias.
- **Veículos:** treinado em todas as categorias, inclusive Mechas e Colossos (4.7).

**Habilidades base:**
- **Drone voador:** você começa com um drone aéreo. Ele age no seu turno, **uma ação por rodada**, além da sua.

| Estatística do drone | Valor |
|---|---|
| CA | 12 |
| HP | 4 + 2 por nível |
| Deslocamento | Voa até Próximo por turno |
| Ataque | d20 + seu mod. de DES |
| Dano | d4 (níveis 1-4), d6 (5-8), d8 (9-10) |

  Se o drone chegar a 0 HP, é destruído. Reconstruí-lo custa **250 créditos e 1 descanso**.

- **Voo:** o drone ignora terreno difícil e obstáculos no chão, alcança tetos, janelas e dutos e sobrevoa abismos. Em troca, é barulhento (desvantagem em furtividade), carrega apenas 1 item pequeno e sofre programas e EMP como qualquer dispositivo.
- **Link:** você vê o que o drone vê e pode controlá-lo a distância Longe.
- **Batedor:** vantagem em iniciativa e em testes para perceber emboscadas.
- **Condutor:** vantagem em testes de pilotagem de veículos, mechas e drones.
- **Interface veicular:** com um jack de interface, você pilota qualquer veículo ou mecha por link neural e usa as armas montadas sem precisar de atirador. Seu drone serve de **observador** para armas de cerco: o primeiro disparo contra um alvo Distante não tem a desvantagem normal.
- **Mecânico de campo:** ao reparar um veículo ou um aliado Android, recupera **2d6 HP** por hora, no lugar de 1d6.

| 2d6 | Talento |
|---|---|
| 2 | **Drone auxiliar:** um segundo drone pequeno e voador (sensor), sem ataque. |
| 3-6 | **Armamento do drone:** +1 em acerto e dano do drone. |
| 7-9 | **+2 em DES, INT ou CON.** |
| 10-11 | **Chassi reforçado:** o drone ganha +4 HP e +1 de CA. |
| 12 | Escolha qualquer talento acima ou +2 pontos de atributo. |

### 4.7 Veículos e mechas

Veículos se dividem em quatro categorias: **Leve**, **Médio**, **Pesado** e **Mecha**. Cada classe é **treinada** em certas categorias, e isso decide quem pilota o quê.

| Classe | Leves | Médios | Pesados | Mechas |
|---|---|---|---|---|
| **Solo** | Treinado | Treinado | Treinado | Treinado (exoesqueletos, leves, médios e pesados) |
| **Netrunner** | Treinado | Destreinado | Destreinado | Destreinado |
| **Hyperdoc** | Treinado | Treinado | Destreinado | Destreinado |
| **Ghost** | Treinado | Treinado | Destreinado | Destreinado |
| **Rocker** | Treinado | Treinado | Destreinado | Destreinado |
| **Rigger** | Treinado | Treinado | Treinado | Treinado (todos, inclusive colossos) |

- **Treinado:** pilota sem penalidade e usa as armas montadas do veículo.
- **Destreinado:** pilota com desvantagem nos testes de pilotagem, não usa as armas montadas e **não opera Pesados nem Mechas**.
- **Treino:** qualquer runner pode se tornar treinado em uma categoria com **1 semana de downtime** e um custo: **3.000 cr** (Médios), **6.000 cr** (Pesados) ou **10.000 cr** (Mechas).
- **Antecedentes que treinam:** Piloto de transporte (Leves, Médios e Pesados), Mecânico (Leves e Médios) e Mercenário (Médios e Pesados). O treino vem na criação.

As fichas, as regras de pilotagem e perseguição e os mechas estão no *Compêndio de Veículos e Armamento*.

---

## 5. Antecedentes

O antecedente é o que você fazia antes. Ele dá **um conhecimento** (o Mestre concede vantagem nos testes em que isso faria diferença) e **um contato** na cidade. Role d20 ou escolha. Combinado com a classe, o antecedente muda o personagem: um Solo ex-segurança corp é bem diferente de um Solo ex-gangue. Os antecedentes **Piloto de transporte**, **Mecânico** e **Mercenário** também dão treino em veículos (4.7).

| d20 | Antecedente | Conhecimento |
|---|---|---|
| 1 | Médico de beco | Curativos improvisados e clínicas clandestinas. |
| 2 | Corretor de dados | Valor de informação e quem compra. |
| 3 | Entregador | Atalhos e rotas da cidade. |
| 4 | Ex-segurança corp | Protocolos e rotinas corporativas. |
| 5 | **Fixer** | Quem contrata, quem paga e quem trai. |
| 6 | Streamer | Público, cultura pop e redes sociais. |
| 7 | Mecânico | Veículos, máquinas e reparos. |
| 8 | Sobrevivente da Zona | Áreas abandonadas e perigos urbanos. |
| 9 | Hacker de garagem | Sistemas antigos e gambiarras. |
| 10 | Dealer de stims | Mercado negro de químicos e estimulantes. |
| 11 | Piloto de transporte | Veículos de carga e passageiros. |
| 12 | Ex-gangue | Sinais, território e códigos de rua. |
| 13 | **Mercenário** | Contratos de combate, equipamento de guerra e quem paga melhor. |
| 14 | Cozinheiro de rua | Boatos, fofocas e quem passa por ali. |
| 15 | Catador de sucata | Peças, valor de lixo e ruínas. |
| 16 | Atendente de clínica | Prontuários, cirurgias e implantes. |
| 17 | DJ de clube | A noite, seus donos e seus clientes. |
| 18 | Ex-policial corrupto | Leis, delegacias e favores devidos. |
| 19 | Cobrador de dívidas | Intimidação e quem deve a quem. |
| 20 | Ex-funcionário de laboratório | Pesquisa corporativa e segredos de projeto. |

---

## 6. Alinhamentos

O alinhamento mostra como você reage à máquina que governa a cidade. Ele se mapeia nos alinhamentos do Shadowdark, o que mantém compatibilidade com tabelas e monstros dele.

| Alinhamento | Equivale a | Em resumo |
|---|---|---|
| **Controle** | Ordem | Acredita em estruturas, protocolos e eficiência. Desvio é falha a corrigir. |
| **Sobrevivência** | Neutro | Não serve a ideologia nenhuma, só à resistência. Adapta-se, negocia, mata quando acuado. |
| **Liberdade** | Caos | Recusa vigilância, destino predeterminado e obediência corporativa. |

Trocar de alinhamento exige um ato dramático em jogo.

### 6.1 Gatilhos de Edge

No início, **escolha ou role 1d6** um gatilho da lista do seu alinhamento. Ele é o seu gatilho pessoal. Uma vez por descanso, se você cumprir esse gatilho de forma notável, recupere uma ficha de Edge (se não tiver). O Mestre decide quando o gatilho foi cumprido.

**Controle**

| d6 | Gatilho |
|---|---|
| 1 | **Executor:** fazer cumprir uma regra ou contrato, mesmo contra um aliado. |
| 2 | **Faxineiro:** destruir provas de falha ou corrupção corporativa. |
| 3 | **Caçador de rebeldes:** neutralizar um agente da Liberdade. |
| 4 | **Exemplo:** punir publicamente uma desobediência para servir de lição. |
| 5 | **Advogado do diabo:** resolver uma ameaça usando uma lei, cláusula ou contrato a seu favor. |
| 6 | **Exorcista:** neutralizar uma IA descontrolada ou um código corrompido. |

**Sobrevivência**

| d6 | Gatilho |
|---|---|
| 1 | **Catador:** barganhar, saquear ou roubar equipamento essencial para sobreviver. |
| 2 | **Provisor:** garantir abrigo, comida ou proteção para o grupo. |
| 3 | **Força do bando:** salvar um membro do grupo de um grande perigo. |
| 4 | **Cauteloso:** evitar um combate perigoso e sair ileso (fugir, recuar, se esconder). |
| 5 | **Oportunista:** aproveitar os recursos de outra pessoa, sem matá-la, para manter os seus. |
| 6 | **Camaleão:** fingir lealdade a um poder mais forte para escapar de uma ameaça. |

**Liberdade**

| d6 | Gatilho |
|---|---|
| 1 | **Libertador:** libertar alguém do controle corporativo ou de um código. |
| 2 | **Rebelde:** quebrar ou ignorar uma regra corporativa à vista de todos. |
| 3 | **Sabotador:** sabotar um sistema de vigilância ou rastreio. |
| 4 | **Código aberto:** compartilhar tecnologia ou dados proibidos. |
| 5 | **Agitador:** inspirar outros a resistir, com palavras ou atos. |
| 6 | **Quebra-correntes:** neutralizar um agente do Controle. |

### 6.2 Reação por facção

O alinhamento influencia como as facções reagem a você, mas só quando o NPC sabe qual é o seu alinhamento (por símbolos, reputação ou atitude). Quando você encontrar um NPC ou grupo cuja atitude é incerta, o Mestre rola **2d6 + modificador de alinhamento**.

| Facção | Controle | Sobrevivência | Liberdade |
|---|---|---|---|
| Polícia e segurança corporativa | +2 | 0 | -2 |
| Executivos e corporações | +2 | 0 | -2 |
| Cidadãos comuns | +1 | 0 | -1 |
| Gangues de rua | -1 | +1 | +1 |
| Mercado negro e fixers | -1 | +2 | 0 |
| Cultos e fanáticos de IA | -1 | 0 | +1 |
| Punks e hackers anarquistas | -2 | 0 | +2 |
| Sintéticos livres (Replicantes e Androides) e redes de refúgio | -1 | 0 | +2 |
| Mercenários e companhias privadas | 0 | +1 | 0 |

As facções, corporações e cultos nomeados da cidade (Guarda Metropolitana, Cães de Vidro, Banco Cobalto, Igreja do Cromo Sagrado e outras) estão no *Compêndio de Ameaças*, e cada um indica qual linha desta tabela usar.

| 2d6 | Reação |
|---|---|
| 2 ou menos | **Hostil:** ataca, denuncia ou expulsa. |
| 3-5 | **Desconfiado:** recusa ajuda ou cobra caro. |
| 6-8 | **Neutro:** ouve e negocia. |
| 9-11 | **Amigável:** ajuda se for barato. |
| 12 ou mais | **Prestativo:** ajuda de boa vontade e oferece algo a mais. |

---

## 7. Cromo e implantes

### 7.1 Os quatro slots

O corpo tem **4 slots de cromo**. Cada slot comporta **1 implante**.

| Slot | O que cobre |
|---|---|
| **Neural** | Cabeça, olhos, ouvidos, cérebro, interface. |
| **Corpo** | Tronco, pele, órgãos, esqueleto. |
| **Braços** | Ombros, braços e mãos. |
| **Pernas** | Quadris, pernas e pés. |

### 7.2 Qualidades

Cada implante existe em três qualidades. A qualidade Corp inclui o efeito Rua e acrescenta uma melhoria. A Militar inclui os dois anteriores e acrescenta outra melhoria. As tabelas abaixo mostram o que cada qualidade acrescenta.

| Qualidade | Custo |
|---|---|
| **Rua** | 300 cr |
| **Corp** | 1.000 cr |
| **Militar** | 3.000 cr |

Instalar ou remover exige um **Hyperdoc** (com kit cirúrgico) ou uma **clínica** (custo extra de 10%).

### 7.3 Ciberpsicose

Com **3 ou 4 slots ocupados**, ao fim de cada descanso faça um teste de **SAB**:
- **CD 12** com 3 slots ocupados.
- **CD 14** com 4 slots ocupados.

Falhou: você sofre um **Surto** (d6, o Mestre controla você por uma rodada).

Algumas origens alteram a contagem: o Cromado e o Android contam 1 implante a menos, o Biomod conta 1 a mais. O Nat tem vantagem no teste. O Replicante segue a contagem normal.

| d6 | Surto |
|---|---|
| 1 | **Tremor:** desvantagem em ataques por 1 rodada. |
| 2 | **Fúria:** você ataca a criatura mais próxima. |
| 3 | **Paranoia:** desvantagem em testes sociais até o fim da cena. |
| 4 | **Dissociação:** você perde sua ação. |
| 5 | **Mudez:** você não consegue falar até o fim da cena. |
| 6 | **Apagão:** você desmaia por 1d4 rodadas. |

### 7.4 Implantes

Os bônus de atributo dos implantes somam ao valor do atributo (não ao modificador).

**Neural**

| Implante | Rua | Corp acrescenta | Militar acrescenta |
|---|---|---|---|
| **Reflexos neurais** | Vantagem em iniciativa. | +1 em testes de DES para evitar perigos. | Você age antes de todos na primeira rodada, se não for surpreendido. |
| **Alvejador neural** | +1 em ataques à distância. | Ignora o +2 de CA de cobertura parcial. | +1 de dano à distância. |
| **Potencializador mental** | +1 em INT ou SAB. | +1 também no outro atributo. | +2 em um dos dois e +1 no outro (no total). |
| **Jack de interface** | Conexão direta com decks e drones. Netrunners ganham +1 na execução de programas. | Executa programas ao alcance Longe sem cabo. | Vantagem no teste para continuar conectado quando seu corpo é ferido na imersão. |
| **Filtro de dor** | 1 vez por descanso, ao chegar a 0 HP, fique com 1 HP. | 2 vezes por descanso. | Imune a atordoamento e medo. |
| **Olhos térmicos** | Enxerga no escuro até Próximo. | Enxerga no escuro até Longe e vê calor através de fumaça. | Vantagem em testes para perceber e ignora desvantagem de escuridão e fumaça. |
| **Memória estendida** | Vantagem em testes de INT para lembrar ou analisar dados. | Grava e reproduz tudo que você viu e ouviu. | 1 vez por descanso, some +1d6 a um teste de INT. |

**Corpo**

| Implante | Rua | Corp acrescenta | Militar acrescenta |
|---|---|---|---|
| **Subderme blindada** | +1 de CA. | +2 de CA no total. | Acertos críticos contra você causam dano normal. |
| **Quadro cinético** | +1 em FOR ou DES. | +2 no atributo escolhido. | +1 no outro atributo. |
| **Coração cibernético** | +1 em CON. | +2 em CON no total. | Ao morrer, role 1d6 + mod. de CON no lugar de 1d4. |
| **Protocolo social** | +1 em CAR. | +2 em CAR no total. | Vantagem em testes de CAR contra quem te vê e ouve. |
| **Contrapeso** | +2 slots de equipamento. | +4 slots no total. | Vantagem em testes de FOR para levantar e carregar. |
| **Sistema de estimulantes** | 1 vez por descanso, recupera 1d6 + nível HP. | 2 vezes por descanso. | Ao ativar, ganha vantagem no próximo ataque. |
| **Pulmões filtrantes** | Imune a gases e toxinas inaláveis. | Vantagem em CON contra veneno e doença. | Respira em vácuo ou debaixo d'água por 10 minutos. |

**Braços**

| Implante | Rua | Corp acrescenta | Militar acrescenta |
|---|---|---|---|
| **Arma retrátil** | Arma de uma mão embutida (d6), escondida até ser ativada. Não ocupa slot e não pode ser desarmada. | Dano d8. | Lâmina monofio: ignora 1 de CA do alvo. |
| **Mão tática** | Pistola embutida (d6, Próximo). | Dano d8. | Alcance Longe. |
| **Garras de pressão** | Vantagem em testes de FOR com os braços e +1 de dano desarmado. | +2 de dano desarmado no total. | Soco desarmado d8 que ignora 1 de CA. |
| **Mão de precisão** | Vantagem em tarefas delicadas (arrombar, reparar). | Kit de ferramentas embutido, que não ocupa slot. | +1 em ataques à distância e vantagem para desarmar bombas e armadilhas. |
| **Escudo cinético** | +1 de CA contra ataques corpo a corpo. | +2 de CA contra corpo a corpo no total. | 1 vez por descanso, negue um ataque corpo a corpo que te acertaria. |
| **Cabo-gancho** | Cabo de 18 m com âncora magnética, serve de corda de segurança. | Puxa objetos leves e escala em velocidade total. | Prende e puxa um alvo até Perto (teste de FOR disputado). |
| **Injetor embutido** | Guarda 1 stim e o aplica sem gastar ação. | Guarda 2 stims. | Guarda 3 stims e cada um cura +1d4. |

**Pernas**

| Implante | Rua | Corp acrescenta | Militar acrescenta |
|---|---|---|---|
| **Molas de salto** | Salta o dobro e ignora queda de até 6 m. | Ignora queda de até 12 m. | Ignora queda de até 18 m e salta até Próximo na vertical. |
| **Motor de sprint** | Dobra o deslocamento (move-se Próximo duas vezes). | Investida: ao se mover Próximo antes de um ataque corpo a corpo, +1d4 de dano. | A investida causa +1d6. |
| **Passos silenciosos** | Vantagem em furtividade ao se mover. | Sensores de movimento têm desvantagem para te detectar. | 1 vez por descanso, invisível a sensores por 1 minuto. |
| **Estabilizadores** | Vantagem para não ser derrubado ou empurrado. | Ignora terreno difícil. | Imune a ser derrubado ou empurrado. |
| **Âncoras magnéticas** | Caminha e escala superfícies metálicas. | Caminha em tetos metálicos em velocidade total. | +1 de CA contra corpo a corpo enquanto preso a uma superfície metálica. |
| **Sub-rotina de passo** | 1 vez por dia, evita um ataque que acertaria você. | 1 vez por descanso. | 2 vezes por descanso. |
| **Pernas de combate** | Chutes causam d6 e dão vantagem em FOR para derrubar. | Chutes d8. | +1 em acerto desarmado e atordoa em 20 natural. |

---

## 8. Equipamento

### 8.1 Regras base

- **Créditos (cr):** moeda única e digital, guardada num credstick. Não ocupam slots. **10 cr equivalem a 1 peça de ouro do Shadowdark.**
- **Slots de equipamento:** igual ao seu valor de **FOR** (mínimo 10). O Solo soma o mod. de CON.
- **Itens pequenos:** onde indicado, vários itens ocupam 1 slot.
- **Rig utilitário:** o primeiro não ocupa slot.
- **Munição:** você não conta tiros, conta **carregadores**. Num **1 natural** em ataque à distância, o carregador acabou: recarregar custa 1 ação e 1 carregador.
- **Bateria:** lanternas, decks e olhos térmicos usam bateria. Cada bateria dura **1 hora real de mesa**. Trocar custa uma ação.
- **Propriedades de armas:**
  - **Leve:** use FOR ou DES no ataque.
  - **Arremessável:** pode ser lançada como ataque à distância.
  - **Duas mãos:** exige as duas mãos.
  - **Rajada:** em vez do ataque normal, uma única rolagem atinge todas as criaturas num cubo Próximo à frente, que tenham CA igual ou menor que o resultado. Gasta 1 carregador inteiro.
  - **Mira:** gaste uma ação para dar +2 no ataque seguinte.
  - **Atordoa:** o alvo atingido só pode se mover ou agir (um dos dois) na rodada seguinte.

### 8.2 Armas brancas

| Arma | Dano | Slots | Custo | Notas |
|---|---|---|---|---|
| Faca | d4 | 1 | 10 cr | Leve, arremessável |
| Soqueira | d4 | 1 | 10 cr | Leve |
| Bastão de choque | d6 | 1 | 100 cr | Leve, atordoa em 20 natural |
| Katana monofio | d8 | 1 | 250 cr | Ignora 1 de CA do alvo |
| Marreta cibernética | d10 | 2 | 150 cr | Duas mãos |

### 8.3 Armas de fogo e inteligentes

| Arma | Dano | Alcance | Slots | Custo | Notas |
|---|---|---|---|---|---|
| Pistola leve | d6 | Próximo | 1 | 100 cr | Leve |
| Pistola pesada | d8 | Próximo | 1 | 150 cr | |
| Submetralhadora | d6 | Próximo | 1 | 250 cr | Rajada |
| Escopeta | d10 | Próximo | 2 | 200 cr | Duas mãos |
| Fuzil | d10 | Longe | 2 | 300 cr | Duas mãos |
| Rifle de precisão | d12 | Longe | 2 | 600 cr | Duas mãos, mira |
| Arma inteligente | d6 | Próximo | 1 | 500 cr | +1 em acerto |

**Armas pesadas, explosivos e armas de cerco** (metralhadoras, lança-foguetes, canhões antiaéreos, artilharia) estão no *Compêndio de Veículos e Armamento*.

### 8.4 Armaduras

| Armadura | CA | Slots | Custo | Notas |
|---|---|---|---|---|
| Jaqueta blindada | 11 + DES | 1 | 250 cr | Leve |
| Colete tático | 13 + DES | 2 | 750 cr | Média, desvantagem em furtividade |
| Armadura corp pesada | 15 | 3 | 1.500 cr | Pesada, sem DES, desvantagem em furtividade e natação |

### 8.5 Equipamento geral

| Item | Custo | Slots | Notas |
|---|---|---|---|
| Deck de rua | 300 cr | 1 | Base para programas |
| Deck corp | 1.000 cr | 1 | +1 na execução de programas |
| Deck militar | 3.000 cr | 1 | +2 na execução de programas |
| Firewall | 100 cr | 2 por slot | Cartucho de proteção para a imersão total (9.7) |
| Nanokit | 150 cr | 1 | Necessário para protocolos |
| Kit cirúrgico | 400 cr | 1 | Para instalar e remover implantes |
| Kit médico | 200 cr | 1 | Vantagem para estabilizar orgânicos |
| Kit de ferramentas | 50 cr | 1 | Arrombar e reparar |
| Rig de palco | 200 cr | 1 | Instrumento ou sintetizador do Rocker |
| Lanterna | 100 cr | 1 | Usa bateria, ilumina até o dobro de Próximo |
| Bateria | 50 cr | 2 por slot | 1 hora de mesa |
| Carregador | 30 cr | 2 por slot | Munição de armas de fogo |
| Cabo de interface | 50 cr | 1 | Conexão física de rede |
| Stim | 100 cr | 2 por slot | Recupera 1d6 HP, uso único |
| Rádio | 200 cr | 1 | Alcance de cidade |
| Ração (3) | 50 cr | 1 | Sustenta 3 dias, necessária para descansar |
| Rig utilitário | 30 cr | 1 | O primeiro não ocupa slot |

### 8.6 Pacotes sugeridos por classe

Pensados para o valor médio de equipamento inicial (cerca de 700 cr). Se sobrar crédito, compre carregadores, baterias ou um implante.

| Classe | Itens | Custo |
|---|---|---|
| **Solo** | Pistola pesada, jaqueta blindada, faca, 2 carregadores, rig utilitário, ração | 550 cr |
| **Netrunner** | Deck de rua, pistola leve, carregador, cabo de interface, bateria, rig utilitário, ração | 610 cr |
| **Hyperdoc** | Nanokit, kit médico, pistola leve, faca, carregador, rig utilitário, ração | 570 cr |
| **Ghost** | Pistola leve, faca, jaqueta blindada, kit de ferramentas, lanterna, rig utilitário, ração | 590 cr |
| **Rocker** | Rig de palco, pistola leve, jaqueta blindada, faca, rig utilitário, ração | 640 cr |
| **Rigger** | Pistola leve, jaqueta blindada, rádio, kit de ferramentas, rig utilitário, ração (o drone é grátis) | 680 cr |

**Kit de Runner (opcional):** 300 cr, 4 slots. Contém rig utilitário, 3 rações, 2 baterias, lanterna e cabo de interface.

### 8.7 Veículos, mechas e módulos de drone

Veículos se dividem em quatro categorias. O *Compêndio de Veículos e Armamento* traz as fichas completas, os módulos, as regras de pilotagem e perseguição, e as armas pesadas.

| Categoria | Exemplos | Preço | Quem pilota (4.7) |
|---|---|---|---|
| **Leve** | Moto urbana (3.000 cr), carro compacto (8.000 cr), buggy, lancha, hoverbike | 1.000 a 15.000 cr | Todas as classes |
| **Médio** | Van de carga (12.000 cr), aerocarro civil (40.000 cr), SUV tático, helicóptero leve | 12.000 a 150.000 cr | Todas, menos Netrunner |
| **Pesado** | Blindado de transporte, tanque, helicóptero de ataque, VTOL | 150.000 a 900.000 cr | Solo e Rigger |
| **Mecha** | Exoesqueleto, mecha leve, médio, pesado e colosso | 60.000 a 1.000.000 cr | Solo e Rigger |

- **Pilotagem sob pressão:** d20 + mod. de DES + Manobra do veículo contra CD 12 (ou outra, a critério do Mestre).
- **Blindagem (BL):** reduz cada dano de armas comuns. Armas Pesadas e explosões ignoram.
- **Pesados e Mechas** são, na prática, **butim Lendário** de missões Elite, ou contratos de aluguel da Companhia Lâmina Negra.

| Módulo de drone (Rigger) | Custo | Efeito |
|---|---|---|
| Sensor térmico | 150 cr | O drone enxerga no escuro e vê calor. |
| Compartimento de carga | 100 cr | O drone carrega 1 item pequeno extra. |
| Placa de impacto | 200 cr | +1 de CA do drone. |

### 8.8 Custo de vida e serviços

Valores de referência na cidade. O Mestre ajusta por região: bairros de elite custam o dobro ou mais, bairros pobres custam menos, mas oferecem pior qualidade.

**Comida e bebida**

| Item | Custo |
|---|---|
| Refeição de rua | 10 cr |
| Refeição em restaurante comum | 50 cr |
| Restaurante de luxo (corp) | 300 cr |
| Drinque em bar de rua | 20 cr |
| Drinque em bar de luxo | 100 cr |

**Noite e lazer**

| Item | Custo |
|---|---|
| Entrada em boate de rua | 50 cr |
| Entrada em boate de elite | 300 cr (e fila ou lista) |
| Mesa VIP | 1.000 cr |
| Ingresso de show local | 80 cr |
| Noite de jogo ou aposta (entrada mínima) | 100 cr |

**Transporte**

| Item | Custo |
|---|---|
| Passagem de transporte público | 10 cr |
| Passe mensal | 150 cr |
| Táxi autônomo (corrida curta) | 100 cr |
| Aluguel de moto ou carro (por dia) | 300 cr |
| Passagem interzonas (trem expresso ou balsa) | 500 cr |

**Serviços**

| Serviço | Custo |
|---|---|
| Curativo e consulta em clínica de rua | 200 cr |
| Reparo ou remoção de implante | 10% do custo do implante |
| Pele cosmética para Android (Hyperdoc ou clínica) | 3.000 cr |
| Hacker de aluguel (tarefa simples) | 500 cr |
| Informante (boato) | 100 cr |
| Informante (dado valioso) | 500 cr ou mais |
| ID falso de rua | 800 cr |
| ID falso corporativo | 3.000 cr |
| Lavagem de créditos | 15% da quantia |
| Guarda-costas (por dia) | 400 cr |
| Mecânico (reparo de veículo ou drone) | 100 a 500 cr |
| Comissão de fixer | 10% do pagamento |

**Estilo de vida (por mês)**

| Estilo | Custo | Qualidade da área de descanso |
|---|---|---|
| Na rua | 0 cr | Arriscada |
| Cápsula ou cubículo | 300 cr | Insegura |
| Apartamento modesto | 1.200 cr | Segura |
| Apartamento confortável | 4.000 cr | Segura, com um contato útil na vizinhança |
| Cobertura ou torre corp | 15.000 cr ou mais | Segura, com +1 na reação de Controle |

---

## 9. Hacking e a Rede

### 9.1 Hack de rua

Qualquer personagem pode tentar hackear algo simples (porta, câmera, terminal).

- Role **d20 + INT** contra **CD 9, 12 ou 15** (sistema básico, protegido ou corporativo).
- **Sem deck**, desvantagem. Sem ferramenta alguma, não é possível.
- **Falhou:** o **Alerta** sobe em 1 (9.4).

### 9.2 Programas (Netrunner)

Programas são como as magias do Shadowdark.

- **Execução:** d20 + mod. de INT contra **CD 10 + tier do programa** (+ bônus do deck).
- **Alcance:** o alvo precisa estar na mesma rede local que você ou ao alcance Longe do seu deck.
- **Sucesso:** o programa roda e o efeito acontece.
- **20 natural:** o canal se estabiliza. Dobre um efeito numérico do programa (dano, duração ou alcance).
- **Falha:** o programa entra em **Crash** e só volta no próximo descanso.
- **1 natural:** **Feedback**. Role d6 na tabela abaixo e o programa também entra em Crash.

| d6 | Feedback |
|---|---|
| 1 | **Choque neural:** você sofre 1d6 de dano e fica com desvantagem na sua próxima ação. |
| 2 | **Deck fritado:** seu deck só volta a funcionar depois de um descanso. |
| 3 | **Alarme:** o Alerta sobe em 1. |
| 4 | **Rastreado:** o sistema descobre a localização do seu corpo. |
| 5 | **Memória corrompida:** outro programa seu entra em Crash. |
| 6 | **Sobrecarga:** todos os programas do mesmo tier entram em Crash. |

**Tier 1**

| Programa | Efeito |
|---|---|
| **Ping** | Revela dispositivos conectados, câmeras e ICE ao alcance Longe. |
| **Backdoor** | Abre uma porta, fechadura, cofre digital ou terminal comum, sem disparar alarme. |
| **Choque** | 1d6 de dano neural a um alvo conectado (implante, ciborgue, drone ou ICE) ao alcance Próximo. |
| **Ofuscar** | Câmeras e sensores ignoram você por 10 minutos. Acaba se você atacar ou executar outro programa. |
| **Rastrear** | Localiza a origem de um sinal ou de uma pessoa conectada até Longe e revela se é humano, ICE ou IA. |
| **Cegar sentido** | Um alvo com implante ótico ou auditivo ao alcance Próximo tem desvantagem em tudo que dependa desse sentido por 1d4 rodadas. |
| **Loop de câmera** | Faz um dispositivo mostrar ou emitir uma imagem ou mensagem falsa por 1 minuto. |
| **Apagar rastro** | Reduz o Alerta em 1. Só funciona 1 vez por invasão. |

**Tier 2**

| Programa | Efeito |
|---|---|
| **Sequestro** | Controla um dispositivo simples (câmera, porta, torreta, drone civil) por 10 minutos. |
| **Quebra-gelo** | O ICE alvo perde 2 de CA por 1 rodada. |
| **Overload** | 2d6 de dano a um alvo eletrônico ou ICE ao alcance Próximo. |
| **Subverter ICE** | Toma o controle de um ICE de nível 2 ou menor por 1d8 horas. Ele obedece a comandos básicos de sua função. Acaba se você ou aliados o ferirem. |
| **Jammer** | Bloqueia rádio e redes num cubo Próximo por 10 minutos. |
| **Falha de implante** | Desativa 1 implante de um alvo ao alcance Próximo por 1d4 rodadas. O alvo resiste com teste de CON CD 12. |

**Tier 3**

| Programa | Efeito |
|---|---|
| **Apagão** | Desliga luz e câmeras de uma área ou sala por 10 minutos. |
| **Clone** | Duplica uma credencial para uso em 1 hora. |
| **Cegar ICE** | O ICE alvo perde a ação de 1 rodada. |
| **Desligar** | Todo ICE de nível 3 ou menor num cubo Próximo desliga e fica dormente até ser reiniciado. |

**Tier 4**

| Programa | Efeito |
|---|---|
| **Sobrecarga neural** | 4d6 de dano a um alvo conectado ou ICE ao alcance Próximo. |
| **Mestre do prédio** | Assume o controle de todos os sistemas simples de um prédio (portas, câmeras, luzes, elevadores) por 10 minutos. |

**Tier 5**

| Programa | Efeito |
|---|---|
| **Colapso** | Derruba a rede local: todo ICE, dispositivo e conexão da região desligam por 1 hora. O Alerta vai a 4. |
| **Eco digital** | Cria uma cópia sua na Rede: por 1d4 rodadas você executa dois programas por rodada. 1 uso por descanso. |

### 9.3 Protocolos (Hyperdoc)

Funcionam como programas, com **SAB** no lugar de INT e o **nanokit** no lugar do deck. Os protocolos de cura têm alcance Perto ou Próximo, conforme o texto. Em um **Android**, eles curam apenas metade (arredonde para cima); o reparo com kit de ferramentas é a cura normal dele (3.4).

- **Falha:** o protocolo entra em Crash até o descanso.
- **20 natural:** dobre um efeito numérico do protocolo.
- **1 natural:** **Rejeição**, role d6 abaixo.

| d6 | Rejeição |
|---|---|
| 1 | O alvo sofre 1d4 de dano. |
| 2 | O alvo fica enjoado: desvantagem na próxima ação. |
| 3 | Você perde 1 protocolo adicional até o descanso. |
| 4 | O efeito é invertido por 1 rodada (cura vira dano de 1d4, ou o inverso). |
| 5 | Seu nanokit quebra até ser reparado. |
| 6 | Nanobots fora de controle: o alvo sofre um Surto. |

**Tier 1**

| Protocolo | Efeito |
|---|---|
| **Nanocura** | Cura 1d6 + nível HP de um alvo. |
| **Antídoto** | Neutraliza um veneno ou doença. |
| **Adrenalina** | O alvo tem vantagem no próximo ataque. |
| **Diagnóstico** | Revela HP atual, condições e implantes de um alvo. |
| **Analgesia** | Remove uma condição do alvo: atordoado, enjoado ou assustado. |
| **Reinício de implante** | Reativa um implante desativado ou em falha de um aliado. |

**Tier 2**

| Protocolo | Efeito |
|---|---|
| **Escudo nano** | O alvo ganha +2 de CA por 1 cena. |
| **Choque cardíaco** | Um aliado morrendo volta com 1d4 HP e acorda. |
| **Enxame curativo** | Cura 1d4 + nível HP a até 3 aliados Próximos. |
| **Sedativo nano** | Um alvo orgânico faz teste de CON CD 12 ou fica inconsciente por 1d4 rodadas. |
| **Vacina nano** | O alvo ignora efeitos de veneno e doença por 1 hora. |

**Tier 3**

| Protocolo | Efeito |
|---|---|
| **Regeneração** | O alvo recupera 1d6 HP por rodada durante 3 rodadas. |
| **Purga de código** | Remove um Surto ou efeito de ciberpsicose de um alvo. |
| **Ressuscitar** | Traz de volta alguém morto há menos de 1 minuto, com 1 HP. |

**Tier 4**

| Protocolo | Efeito |
|---|---|
| **Cura em massa** | Cura 2d6 + nível HP a todos os aliados Próximos. |
| **Corpo de ferro** | O alvo reduz todo dano sofrido em 2 por 1d4 rodadas. |

**Tier 5**

| Protocolo | Efeito |
|---|---|
| **Reconstrução total** | Restaura um aliado ao HP máximo e remove todas as condições. 1 uso por descanso. |

### 9.4 Alerta

Cada invasão tem um marcador de **Alerta de 0 a 4**. Ele substitui os glitches.

**O Alerta sobe em 1 quando:**
- um Hack de rua falha;
- um programa entra em Crash;
- ocorre um Feedback;
- o grupo faz barulho que o sistema possa detectar.

**Em 4:** o ICE ativo ataca e a segurança física chega em 1d4 rodadas (ou minutos, conforme a cena).

### 9.5 ICE

ICE (Intrusion Countermeasures Electronics) funciona como um monstro: tem nível, HP, CA, ataque e um truque.

| ICE | Nível | CA | HP | Ataque | Truque |
|---|---|---|---|---|---|
| **Sentinela** | 1 | 11 | 5 | Choque +2 (1d4 neural) | **Alarme:** ao ser atingido, o Alerta sobe em 1. |
| **Enxame** | 2 | 12 | 10 | 2 ataques +3 (1d4) em alvos diferentes | **Dispersão:** só sofre metade do dano de programas de alvo único. |
| **Cão de guarda** | 3 | 13 | 14 | Mordida +4 (1d8 neural) | **Rastreio:** ignora Ofuscar. |
| **Executor** | 4 | 14 | 22 | Golpe +5 (1d10 neural) | **Trava:** o alvo atingido faz teste de CON CD 12 ou 1 programa seu entra em Crash. |
| **Muralha** | 5 | 15 | 30 | 2 ataques +5 (1d6) | **Barreira:** só sofre dano de programas de tier 2 ou mais. |

Mais ICE (Labirinto, Sanguessuga, Espelho, Cadeado, Caçador, Carrasco e Hidra), malware, hackers inimigos, a resposta ao Alerta 4 e as IAs estão no *Compêndio de Ameaças* (Capítulos 5 e 6).

### 9.6 Gerador de Rede

Uma Rede tem de 3 a 5 nós. Para cada nó, role d6:

| d6 | Nó |
|---|---|
| 1 | **Firewall externo:** protegido por um ICE de nível 1 ou 2. |
| 2 | **Cofre de dados:** contém dados valiosos ou créditos. Protegido por um ICE de nível 2 ou 3. |
| 3 | **Sensores e câmeras:** hack de rua CD 12 para passar sem disparar o Alerta. |
| 4 | **Sala de servidores:** patrulhada por um ICE de nível 3 ou 4. |
| 5 | **Território hostil:** o Alerta sobe em 1 ao entrar. |
| 6 | **Nó vazio ou atalho:** sem perigo. Pode pular um nó. |

### 9.7 Imersão total e Firewall

Na imersão total, a mente do netrunner mergulha na Rede e age como um avatar.

- **Entrar:** com um deck e um jack de interface (ou um cabo de interface), gaste uma ação e um **Firewall**. Seu corpo cai inconsciente e fica indefeso (CA 5). Combine com o grupo quem vigia o seu corpo.
- **Na Rede:** você executa programas sem limite de alcance dentro daquela rede e ganha +1 na execução.
- **Firewall:** o cartucho protege sua conexão por **1 hora real de mesa**. Só um Firewall protege por vez (ativar outro reinicia o cronômetro). Sem Firewall ativo, você não pode entrar.
- **Quando o Firewall queima** com você dentro, você tem 1 rodada para sair. Depois disso, sofre um **Feedback** (d6) por rodada e todo ICE ataca você com vantagem.
- **Corpo ferido:** se o seu corpo sofrer dano durante a imersão, faça teste de CON CD 12 para continuar conectado. Se falhar, você é expulso e sofre 1d6 de dano neural.
- **Sair:** custa uma ação.

---

## 10. Missões e progressão

Em SombraNeon, ninguém cresce por matar inimigos. Cresce quem **entra, pega o que veio buscar e sai vivo**. É a lógica do Shadowdark transposta para a cidade: o XP vem do **butim que você leva de volta**, e o butim vale mais quanto mais perigoso foi pegá-lo.

### 10.1 O ciclo da missão

Toda sessão gira em torno de uma **missão**: um trabalho arriscado que alguém paga para ser feito. O ciclo tem cinco fases:

1. **Briefing:** o contratante apresenta o trabalho, o Prêmio e o pagamento. A equipe pode negociar (teste de CAR) e investigar antes de aceitar.
2. **Preparação:** a equipe compra equipamento, levanta informação (contatos, antecedentes, hack de rua) e monta o plano.
3. **Infiltração:** a equipe chega ao local e enfrenta o que há entre ela e o Prêmio.
4. **Extração:** a equipe sai com o butim. É a fase mais perigosa, porque **o XP só vale se o butim chegar em segurança**.
5. **Debrief:** na **Toca** (qualquer local de descanso Seguro), o grupo recebe o pagamento, conta o XP, vende o butim, sobe de nível e gasta créditos.

**Regra de ouro do Mestre:** a saída deve ser tão tensa quanto a entrada. Reforços, perseguição, um trecho sem cobertura, um prazo que estoura. Quem carrega o butim é o alvo número um.

### 10.2 Contratos

Para montar uma missão, escolha ou role: contratante (d6), tipo (d12), local (d8) e complicação (d8). Depois defina o **tier** (10.2.5).

#### 10.2.1 Contratante

| d6 | Contratante | Como paga |
|---|---|---|
| 1 | **Fixer de rua** | Paga o combinado, menos 10% de comissão. Se alguém do grupo tem o antecedente Fixer, não há comissão. |
| 2 | **Corporação, por intermediário** | Paga o combinado e nega tudo se der errado. |
| 3 | **Gangue ou facção** | Metade em créditos, metade em favores (um contato ou uma dívida a cobrar). |
| 4 | **Cliente privado** | Paga o combinado. O motivo é pessoal e o cliente costuma esconder algo. |
| 5 | **Rede de refúgio ou ativistas** | Paga metade do combinado, mas oferece abrigo seguro e um contato. |
| 6 | **Anônimo** | Paga metade adiantado. Ninguém sabe quem é. Role a complicação duas vezes e use as duas. |

#### 10.2.2 Tipo de missão e Prêmio

O **Prêmio** é o objetivo principal da missão, o que prova o sucesso.

| d12 | Tipo | Prêmio |
|---|---|---|
| 1 | **Extração** | A pessoa-alvo, viva, no ponto de encontro. |
| 2 | **Roubo de dados** | O arquivo ou a credencial, copiado e entregue. |
| 3 | **Roubo de objeto** | O protótipo, o implante ou a mala. |
| 4 | **Sabotagem** | A instalação destruída ou a rede derrubada, com prova (vídeo, log). |
| 5 | **Eliminação** | O alvo neutralizado, com prova. |
| 6 | **Escolta** | A pessoa ou a carga entregue no destino. |
| 7 | **Resgate** | O refém, o sintético ou o aliado, livre e em segurança. |
| 8 | **Recuperação** | O item, o veículo ou o corpo perdido, trazido de volta. |
| 9 | **Caça a recompensa** | O alvo capturado vivo e entregue. |
| 10 | **Investigação** | A resposta, com provas que o contratante aceite. |
| 11 | **Defesa** | O local ou a pessoa, de pé ao fim da noite. |
| 12 | **Entrega** | O pacote, intacto, nas mãos do destinatário. |

#### 10.2.3 Local

| d8 | Local |
|---|---|
| 1 | **Torre corporativa:** andares de escritórios, segurança pesada e câmeras. |
| 2 | **Laboratório ou clínica subterrânea:** pesquisa ilegal, cobaias e cofres. |
| 3 | **Armazém no porto ou zona industrial:** contêineres, guindastes e contrabando. |
| 4 | **Boate de elite ou cassino:** muita gente, câmeras, segurança discreta e armada. |
| 5 | **Colmeia:** favela vertical e mercado negro, cheia de olhos e atalhos. |
| 6 | **Data center:** corredores de servidores, ICE e sensores. |
| 7 | **Estação de transporte ou trem:** horário fixo e multidão. |
| 8 | **Zona abandonada:** ruínas, ratoeiras, gangues e coisas que ninguém explicou. |

#### 10.2.4 Complicação

| d8 | Complicação |
|---|---|
| 1 | **Traição:** o contratante quer se livrar da equipe ou não vai pagar. |
| 2 | **Rival:** outra equipe foi contratada para o mesmo trabalho. |
| 3 | **O alvo não é quem parece:** a pessoa ou o objeto esconde uma verdade que muda o jogo. |
| 4 | **Segurança reforçada:** mais guardas, ICE de um nível acima ou sensores extras. |
| 5 | **Relógio correndo:** a equipe tem 1 hora real de mesa, ou um evento marca a hora da saída. |
| 6 | **Polícia por perto:** uma patrulha ou uma operação cobre a região. |
| 7 | **Rastreador:** o Prêmio tem um rastreador, uma IA ou uma agenda própria. |
| 8 | **Inocente no caminho:** uma testemunha, um refém ou alguém que não devia estar ali. |

#### 10.2.5 Tier da missão

O tier mede o perigo e define o Prêmio e o pagamento. Ele não precisa seguir o nível do grupo à risca: uma equipe fraca pode topar um trabalho Corp, desde que saiba onde está se metendo.

| Tier | Níveis sugeridos | Oposição típica | Prêmio | Pagamento por runner |
|---|---|---|---|---|
| **Rua** | 1 a 2 | Gangues, seguranças privados, ICE de nível 1 e 2 | Normal ou Valioso | d6 x 150 cr |
| **Corp** | 3 a 5 | Segurança corporativa, mercenários, ICE de nível 2 a 4 | Valioso, às vezes Lendário | d6 x 500 cr |
| **Elite** | 6 a 10 | Esquadrões militares, ciborgues pesados, mechas, ICE de nível 4 e 5, IAs | Lendário | d6 x 1.500 cr |

As fichas dessa oposição, as facções, as corporações, as IAs, os cultos e os encontros por local estão no *Compêndio de Ameaças*. Veículos e mechas hostis estão no *Compêndio de Veículos e Armamento*.

### 10.3 Butim e Prêmio

**Butim** é qualquer coisa de valor que a equipe leva do local: dados, peças, armas, implantes, credenciais, pessoas. O Prêmio da missão é o butim principal. Todo o resto é **butim extra**.

#### 10.3.1 Categorias

Cada item de butim pertence a uma categoria, que define o XP e o valor de venda.

| Categoria | XP | Valor de venda | Peso | Exemplos |
|---|---|---|---|---|
| **Sucata** | 0 | até 100 cr | 0 a 1 slot | Credsticks quase vazios, armas velhas, peças soltas. |
| **Normal** | 1 | d10 x 100 cr | 1 slot | Arma boa, peça de deck, dados de mercado, joias, um implante Rua. |
| **Valioso** | 3 | d10 x 1.000 cr | 1 a 2 slots | Implante Corp, protótipo pequeno, dados corporativos, obra de arte. |
| **Lendário** | 10 | d6 x 10.000 cr | 2 a 4 slots | Implante Militar, IA, mecha ou veículo pesado, segredo que derruba uma corporação, base de dados mestre. |

O Mestre decide a categoria pela **importância narrativa**, não só pelo preço. Um vídeo que derruba um prefeito é Lendário, mesmo que não valha nada no mercado.

#### 10.3.2 Onde está o butim

- Quanto melhor o butim, mais difícil o acesso: atrás de ICE, cofre, guarda ou armadilha.
- Por **área importante** do local, o Mestre coloca 1 item de butim extra. Em missões Rua, itens Normal (às vezes um Valioso). Em Corp, itens Normal e Valioso. Em Elite, itens Valioso e Lendário.
- Sucata está em toda parte e serve só de cena e de troco.
- O Prêmio de um tipo sem objeto (Sabotagem, Eliminação, Defesa) vale como butim da categoria que o tier indica, desde que haja prova.

#### 10.3.3 Butim físico e digital

- **Físico:** ocupa os slots da tabela, somando-se ao resto do equipamento (Capítulo 8). Um runner que passa do limite de slots fica **sobrecarregado**: desvantagem em testes de DES e deslocamento reduzido à metade. O grupo pode dividir o peso, mas o runner que carrega o butim vira alvo.
- **Veículo ou mecha:** não ocupa slots, mas precisa ser **pilotado ou rebocado** para fora do local. O piloto precisa ser treinado (4.7), e a saída vira uma cena de perseguição (Compêndio de Veículos e Armamento, 2.3).
- **Digital:** não ocupa slots. Para copiar, o Netrunner (ou qualquer runner com deck) gasta uma ação conectado ao sistema, e o download leva rodadas: Normal 1 rodada, Valioso 1d4 rodadas, Lendário 1d6 rodadas. Ao iniciar um download Valioso ou Lendário, o **Alerta sobe em 1**. Interromper o download perde os dados.

#### 10.3.4 Extração

Butim **só conta** quando chega à Toca ou ao contratante.

- Se o runner que carrega o butim cai, o butim fica no chão. Outro runner pode pegá-lo.
- Se o runner morre, o butim cai com ele e pode ser saqueado.
- Butim destruído, roubado ou deixado para trás não rende XP.
- O XP é concedido na extração, **mesmo que o grupo venda, entregue ou use o butim depois**. Trair o contratante também não tira o XP, mas custa o pagamento e cria um inimigo.

### 10.4 XP e subir de nível

#### 10.4.1 Fontes de XP

| Fonte | XP |
|---|---|
| Cada item de butim extraído (incluindo o Prêmio) | Pela categoria: 0, 1, 3 ou 10 |
| **Drive** pessoal: avanço relevante | +1 (no máximo 1 por missão) |
| **Drive** pessoal: cumprido de vez | +3 (e o jogador escolhe um novo Drive) |
| **Objetivo do grupo**: avanço relevante | +1 para todos (no máximo 1 por missão) |
| **Objetivo do grupo**: concluído | +5 para todos (e o grupo escolhe um novo) |

- Os XP de butim e de Prêmio são concedidos **por inteiro a cada runner que participou da missão**. Não se divide.
- Um runner que ficou de fora da missão ganha **metade** do XP de butim e de Prêmio (arredondado para baixo) e nada de Drive.
- O XP é contado no **Debrief**, nunca no meio da missão.

#### 10.4.2 Subindo de nível

- Para subir do nível N para N+1 são necessários **N x 10 XP**.
- Ao subir, o XP **volta a zero**, e a sobra fica para o próximo nível. Só se sobe **1 nível por Debrief**.
- Subir de nível acontece **no Debrief**, em local seguro.

**Ao subir de nível:**
1. Role o **dado de vida** da classe + mod. de CON (mínimo 1) e some ao seu HP máximo.
2. Se for nível 3, 5, 7 ou 9, role um **talento** na tabela da classe.
3. Aplique os ganhos de classe da tabela abaixo.
4. Se for Netrunner ou Hyperdoc, aprenda **1 novo programa ou protocolo**, de qualquer tier que seu nível permita.

| Nível | XP para o próximo | Talento | Tier máx. de programas | Marcos de classe |
|---|---|---|---|---|
| 1 | 10 | Sim (inicial) | T1 | Habilidades base. |
| 2 | 20 | | T1 | Solo: domínio de arma +1. |
| 3 | 30 | Sim | T2 | Ghost: +1 dado de ataque furtivo. |
| 4 | 40 | | T2 | Solo: domínio +1. Rocker: 4º Set. |
| 5 | 50 | Sim | T3 | Ghost: +1 dado furtivo. Rigger: dano do drone passa a d6. |
| 6 | 60 | | T3 | Solo: domínio +1. |
| 7 | 70 | Sim | T4 | Ghost: +1 dado furtivo. Rocker: 5º Set. |
| 8 | 80 | | T4 | Solo: domínio +1. |
| 9 | 90 | Sim | T5 | Ghost: +1 dado furtivo. Rigger: dano do drone passa a d8. |
| 10 | máximo | | T5 | Solo: domínio +1. Rocker: 6º Set. |

O drone do Rigger também ganha **+2 HP por nível**. O nível 10 é o teto: na maioria das campanhas, é a hora de um grande final.

#### 10.4.3 Runner novo

Se um personagem morre ou entra um novo jogador, o runner novo começa no **nível do runner mais fraco do grupo**, com 0 XP, **2d6 x 100 cr** e apenas os implantes que a origem dá. Se o grupo estiver num nível alto, o Mestre pode permitir que ele comece com um implante Rua a mais.

### 10.5 Pagamento, receptação e farra

#### 10.5.1 Pagamento

O pagamento é rolado uma vez, na tabela de tier (10.2.5), e vale **para cada runner**. Ele depende do desfecho:

| Desfecho | Pagamento |
|---|---|
| Prêmio entregue, no prazo e intacto | Integral. |
| Prêmio entregue com atraso, danificado ou com a missão exposta | Metade. |
| Prêmio perdido ou missão fracassada | Nada. |

Descontos e ajustes seguem a tabela de contratante (10.2.1).

#### 10.5.2 Receptação

O butim extra pode ser vendido pelo valor da categoria:

- **Para um fixer:** 50% do valor, sem complicação.
- **Direto a um comprador** (corporação, colecionador, gangue): 100% do valor, mas é preciso um contato, um teste de CAR CD 12 e o risco de o comprador trair ou denunciar.

O **Prêmio** não se vende: ele é entregue ao contratante e rende o pagamento. O grupo pode traí-lo e vender o Prêmio a outra pessoa, mas perde o pagamento e o contratante vira inimigo.

#### 10.5.3 Farra

*Regra opcional.* No Debrief, um runner pode gastar créditos numa noite de excessos: boate de elite, mesa VIP, compras, apostas, tatuagens, cromo estético. Veja a tabela de preços do Capítulo 8.

- **Custo:** nível x 500 cr.
- **Ganho:** 1 XP e uma rolagem na tabela abaixo.
- **Limite:** 1 farra por runner por Debrief.

| d6 | Resultado |
|---|---|
| 1 | **Ressaca brava:** desvantagem no primeiro teste da próxima missão. |
| 2 | **Encrenca:** alguém (gangue, segurança, ex) quer acertar contas. |
| 3 | **Contato novo:** o Mestre apresenta um contato útil. |
| 4 | **Boato quente:** o Mestre revela um gancho para a próxima missão. |
| 5 | **Noite de sorte:** o runner começa a próxima missão com 1 ficha de Edge. |
| 6 | **Noite perfeita:** 1 ficha de Edge e vantagem no primeiro teste da próxima missão. |

### 10.6 Investindo o ganho

Os créditos ganhos rendem poder de outras formas, sem passar pelo XP.

**Evoluir um implante:** pague a diferença de custo entre as qualidades, mais 10% de instalação (sem esse custo extra se um Hyperdoc fizer o serviço com kit cirúrgico).

| Evolução | Custo da diferença |
|---|---|
| Rua para Corp | 700 cr |
| Corp para Militar | 2.000 cr |
| Rua para Militar | 2.700 cr |

**Programas e protocolos avulsos:** um Netrunner ou Hyperdoc pode comprar, achar como butim ou copiar um cartucho com um programa. Aprender a partir de um cartucho exige um teste de **INT** (programa) ou **SAB** (protocolo) **CD 10 + tier**. O programa precisa estar no tier que o seu nível permite. Em falha, o cartucho queima.

| Tier | Preço do cartucho |
|---|---|
| T1 | 400 cr |
| T2 | 1.000 cr |
| T3 | 2.500 cr |
| T4 | 6.000 cr |
| T5 | 15.000 cr |

Um programa avulso aprendido assim **não substitui** o ganho por nível: é um programa extra.

**Outros investimentos:** armadura melhor, deck melhor, veículo (Leves e Médios estão ao alcance de um grupo Corp, Pesados e Mechas só em campanhas Elite), módulos de veículo e de drone, treino em novas categorias de veículo (4.7), aluguel de um apartamento seguro (que melhora a qualidade da área de descanso). Veja o Capítulo 8 e o *Compêndio de Veículos e Armamento*.

### 10.7 Ritmo de campanha

O ritmo se ajusta pelo butim. Para uma campanha mais curta, use categorias mais altas. Para uma mais longa, use mais Sucata e Normal.

| Tier | Níveis | XP típico por missão | Missões por nível |
|---|---|---|---|
| Rua | 1 a 2 | 5 a 8 | 2 a 4 |
| Corp | 3 a 5 | 10 a 16 | 3 a 5 |
| Elite | 6 a 10 | 20 a 40 | 2 a 4 |

Uma campanha completa, do nível 1 ao 10, leva cerca de **20 a 30 missões**.

### 10.8 Títulos de rua

A rua dá nomes a quem sobrevive. O título muda conforme o nível e adorna o nome de rua do runner. Ele não tem efeito mecânico, mas o Mestre pode usá-lo na reação de NPCs que conhecem o runner.

| Classe | Níveis 1 a 2 | Níveis 3 a 4 | Níveis 5 a 6 | Níveis 7 a 8 | Níveis 9 a 10 |
|---|---|---|---|---|---|
| **Solo** | Cão de rua | Mão armada | Matador de aluguel | Lâmina da cidade | Lenda do asfalto |
| **Netrunner** | Aprendiz de código | Invasor | Quebra-gelo | Mestre de redes | Arquiteto da Rede |
| **Hyperdoc** | Enfermeiro de beco | Curandeiro | Cirurgião de rua | Mestre dos nanos | Arquiteto da carne |
| **Ghost** | Ladrão de beco | Sombra | Fantasma | Espectro | Mito invisível |
| **Rocker** | Banda de garagem | Voz da quebrada | Estrela local | Ícone da rua | Hino da cidade |
| **Rigger** | Piloto de garagem | Operador | Condutor de enxame | Mestre dos céus | Senhor dos drones |

### 10.9 Exemplo de missão

**A Cobaia de Vidro**, para um grupo de quatro runners de nível 3 (um Solo, um Netrunner, um Ghost e um Hyperdoc Replicante).

**Rolagens:** contratante 2 (Corporação), tipo 1 (Extração), local 2 (Laboratório subterrâneo), complicação 3 (O alvo não é quem parece). Tier **Corp**. Pagamento rolado: 4, ou seja, 2.000 cr por runner.

**Briefing:** um intermediário da Kessler-Tanaka contrata a equipe para tirar uma pesquisadora, a Dra. Imai, de um laboratório clandestino e levá-la a um ponto de encontro. O que o intermediário não diz: a Dra. Imai é uma replicante em fuga, e a corporação a quer de volta como propriedade. O Hyperdoc Replicante do grupo reconhece o número de série dela como o de uma linha de produção parecida com a sua.

**Prêmio:** a Dra. Imai, categoria **Valioso** (3 XP).

**Butim extra:**
- Protótipo de implante Corp no cofre do laboratório: Valioso, 3 XP, 1 slot.
- Dados do servidor, copiados pelo Netrunner: Normal, 1 XP, digital. Ao iniciar a cópia, o Alerta sobe em 1.
- Pistola militar de um segurança: Normal, 1 XP, 1 slot.
- Dois credsticks quase vazios: Sucata, 0 XP.

**Extração:** a rampa de saída está bloqueada por uma patrulha. O grupo foge pelo duto de serviço, e o runner que carrega o protótipo precisa de um teste de DES CD 12 para não deixá-lo cair.

**Debrief, caminho A: entregar a Dra. Imai à corporação.**
- XP: 3 (Prêmio) + 3 (protótipo) + 1 (dados) + 1 (pistola) = **8 XP** por runner.
- Pagamento: 2.000 cr por runner.

**Debrief, caminho B: libertar a Dra. Imai numa rede de refúgio.**
- XP: os mesmos 8, porque o Prêmio chegou em segurança. O Hyperdoc Replicante avança o seu Drive (**+1 XP** só para ele) e o grupo avança o objetivo "Libertar sintéticos" (**+1 XP** para todos). Total: **9 XP** para a maioria e **10** para o Hyperdoc.
- Pagamento: nenhum. A Kessler-Tanaka passa a ser inimiga do grupo.

### 10.10 Ficha de missão (Mestre)

```
MISSÃO: ________________________   TIER: Rua / Corp / Elite
CONTRATANTE: ___________________   TIPO: ___________________
LOCAL: _________________________   COMPLICAÇÃO: ____________
PRÊMIO: ________________________   CATEGORIA: ______ (XP: __)
PAGAMENTO POR RUNNER: ________ cr  PRAZO: ___________________

OPOSIÇÃO: _____________________________________________________

BUTIM EXTRA (item | categoria | onde está | como pegar)
1 _____________________________________________________________
2 _____________________________________________________________
3 _____________________________________________________________
4 _____________________________________________________________

SAÍDA / EXTRAÇÃO: ______________________________________________
SE DER ERRADO: ________________________________________________
```

---

## 11. Apêndice

### 11.1 Ficha de personagem (modelo)

```
NOME DE RUA: ________________   ORIGEM: ________   CLASSE: ________
NÍVEL: __   XP: ____   ANTECEDENTE: ________________
ALINHAMENTO: ____________   GATILHO DE EDGE: ____________
DRIVE: ______________________________________________

FOR __ (__)   DES __ (__)   CON __ (__)
INT __ (__)   SAB __ (__)   CAR __ (__)

HP: __ / __     CA: __     EDGE: [ ]

TALENTOS: ___________________________________________
PROGRAMAS / PROTOCOLOS / SETS: _______________________
ATAQUES: ____________________________________________

CROMO     Neural: ________   Corpo: ________
          Braços: ________   Pernas: ________

EQUIPAMENTO (slots: __)
1 ____ 2 ____ 3 ____ 4 ____ 5 ____ 6 ____ 7 ____ 8 ____
9 ____ 10 ___ 11 ___ 12 ___ 13 ___ 14 ___ 15 ___ 16 ___

VEÍCULOS TREINADOS: Leves [ ]  Médios [ ]  Pesados [ ]  Mechas [ ]
VEÍCULO / DRONE: ______________________________________

CRÉDITOS: ______      CONTATOS: ________________________
```

### 11.2 Tabelas rápidas

- CDs: 9, 12, 15, 18.
- XP para subir: nível atual x 10. Butim: Sucata 0, Normal 1, Valioso 3, Lendário 10.
- Pagamento por runner: Rua d6 x 150 cr, Corp d6 x 500 cr, Elite d6 x 1.500 cr.
- Alcances: Perto (1,5 m), Próximo (9 m), Longe (linha de visão).
- Alerta: 0 a 4.
- Moral dos inimigos: Fraca CD 18, Normal CD 15, Firme CD 12, Fanática nunca foge.
- Encontro (soma dos NA contra a soma dos níveis do grupo): Fácil 1/2, Normal 3/4, Difícil 1x, Mortal 1,5x.
- Blindagem (BL): reduz o dano de armas comuns. Armas Pesadas e explosões ignoram.
- Pilotagem sob pressão: d20 + DES + Manobra contra CD 9/12/15/18.
- Morte: 1d4 + mod. de CON rodadas, 20 natural volta com 1 HP.
- Descanso: 8 horas e 1 ração.
- Edge: 1 ficha por vez, gasta para repetir uma rolagem.
- Programas e protocolos: d20 + atributo contra CD 10 + tier.
- Ciberpsicose: SAB CD 12 (3 slots) ou CD 14 (4 slots).

### 11.3 Mapa Shadowdark para SombraNeon

| Shadowdark | SombraNeon |
|---|---|
| Ancestralidade | Origem |
| Guerreiro | Solo |
| Mago | Netrunner |
| Clérigo | Hyperdoc |
| Ladrão | Ghost |
| Bardo (fora do núcleo) | Rocker |
| Patrulheiro (fora do núcleo) | Rigger |
| Magias | Programas e Protocolos |
| Teste de conjuração | Execução (d20 + atributo vs CD 10 + tier) |
| Perder a magia em falha | Crash |
| Natural 1 do conjurador | Feedback ou Rejeição |
| Alinhamento (Ordem, Neutro, Caos) | Alinhamento (Controle, Sobrevivência, Liberdade) |
| Ficha de Sorte | Edge |
| Peças de ouro | Créditos (1 po = 10 cr) |
| Tocha de 1 hora real | Bateria e Firewall de 1 hora real |
| Slots de equipamento | Slots de equipamento |
| Itens mágicos | Implantes (4 slots corporais) |
| XP por tesouro (Poor 0, Normal 1, Fabulous 3, Legendary 10) | XP por butim (Sucata 0, Normal 1, Valioso 3, Lendário 10) |
| Tesouro carregado para fora da masmorra | Butim extraído para a Toca ou o contratante |
| Carousing (opcional) | Farra (opcional) |

### 11.4 Ideias futuras (opcionais)

- Aventura introdutória para a primeira sessão, usando o Capítulo 10 e os dois compêndios.
- Mapa e bairros da cidade, com um gerador de distritos.
- Cultura de rua: modas, gírias, estações de rádio e esportes (mechas de arena).
- Nível 0 (funil de recrutas), como o Gauntlet do Shadowdark e os Citizens do Dark Space.
- Reputação por facção e recompensas por cabeça, como no Dark Space.
- Tabelas de Feedback separadas por tier, caso o d6 único fique simples demais.
- Mais talentos por classe, para dar variedade na faixa 12 da tabela.

### 11.5 Nota de licença

Se o livro for publicado: conferir a licença de terceiros do Shadowdark e usar apenas texto próprio. Os textos do CyberDark e do Dark Space servem só de referência.

---

## 12. Notas de versão

### v0.6 (27/10/2026)

**Mudança principal:** a origem **Sintético** foi separada em duas: o **Replicante**, de natureza orgânica, e o **Android**, um robô humanoide. O jogo passou de 4 para **5 origens**. "Sintético" continua existindo como **termo de rua** que cobre as duas, e aparece em facções, objetivos e contratos.

**Novo**
- **3.3 Replicante:** gente fabricada, de carne cultivada. Traços **Carne cultivada** (vantagem em CON contra doença, veneno e fadiga), **Propósito de fábrica** (Combate, Infiltração, Companhia ou Labor, com vantagem nos testes ligados a ele), **Memória plantada** (repete 1 teste de conhecimento por descanso) e **Registro** (número de série, -2 de reação de lei e corporações que saibam, passa por humano sem scanner).
- **3.4 Android:** robô humanoide. Traços **Chassi** (não come, não dorme, imune a veneno e doença orgânica), **Casco de fábrica** (+1 CA), **Interface nativa**, **Mente estável** (conta 1 implante a menos na ciberpsicose), **Máquina** (desvantagem contra hacking e EMP, stims não funcionam, protocolos de cura curam metade, reparo em campo com kit de ferramentas) e **Visível** (só passa por humano com **pele cosmética**).
- Nota **"Sintético, o termo de rua"**, explicando por que facções e contratos ainda falam em sintéticos.
- **Pele cosmética para Android** na tabela de serviços (3.000 cr).

**Alterado no livro principal**
- **Cabeçalho, decisões de projeto e passo 2 da criação:** agora são 5 origens.
- **Biomod:** passou de 3.4 para **3.5**.
- **1.5 Estabilizar:** um kit de ferramentas estabiliza Androides, com vantagem.
- **Rigger:** o **Mecânico de campo** também repara um aliado Android com 2d6 HP por hora.
- **6.2 Reação por facção:** a linha de sintéticos livres passou a citar Replicantes e Androides.
- **7.3 Ciberpsicose:** o Android conta 1 implante a menos, como o Cromado. O Replicante usa a contagem normal.
- **9.3 Protocolos:** curam metade em um Android.
- **10.9 Exemplo de missão:** o Hyperdoc do grupo é um **Replicante**, e a Dra. Imai também.

**Compêndios (agora v0.2 cada um)**
- **Ameaças:** o *Sintético de segurança* virou **Android de segurança**, e o *Sintético fugitivo* virou **Replicante fugitivo**. Entraram o **Android fugitivo** (NA 2) e o **Caçador de sintéticos** (NA 5), com choque contra Interface nativa e scanner de série. A Kessler-Tanaka, a Rede Aurora, a Congregação do Fantasma, o Culto do Neon Eterno e as tabelas de encontro foram ajustados.
- **Veículos e Armamento:** o reparo em campo (2.8) também vale para Androides.

**O que muda na mesa em relação à v0.5**
- Quem jogava um Sintético escolhe agora entre Replicante (corpo de carne, sem implantes de fábrica, mais difícil de reconhecer) e Android (mais resistente e conectado, mas vulnerável a hacking e visível). Um Sintético da v0.5 pode virar Android: a única perda é a regra de "ignorar um efeito de fisiologia por dia", trocada por imunidade a veneno e doença.
- Um Android curado por Hyperdoc recupera metade. Para se recuperar bem em campo, precisa de um aliado com kit de ferramentas.

**Não mudou**
- Classes, antecedentes, alinhamentos, cromo e implantes, equipamento e preços, hacking, Edge, XP e progressão.

### v0.5 (27/10/2026)

**Mudança principal:** o jogo ganhou **dois compêndios companheiros**, em arquivos separados, e o livro principal passou a se conectar a eles: ameaças e oposição de um lado, veículos, armamento pesado e mechas do outro.

**Novo: *Compêndio de Ameaças* (v0.1)**
- Nível de Ameaça (NA), tabela de criação rápida, Moral por categoria, traços padrão, régua de encontros e oposição por tier de missão.
- 46 fichas: gente da rua, gangues, lei e segurança, mercenários e militares, ciborgues e aberrações, máquinas, fauna, executivos, hackers e cultistas.
- Perigos do ambiente e tabela de saque por NA.
- 7 facções, 7 corporações, 6 cultos, com ganchos de missão, segredos e relações entre eles.
- 7 ICE novos, 5 malwares, ataques a implantes por slot e respostas ao Alerta 4.
- 7 IAs de exemplo e um gerador de IAs.
- Encontros por local (d6 para cada um dos 8 locais do Capítulo 10), gerador de NPC e nomes de rua.

**Novo: *Compêndio de Veículos e Armamento* (v0.1)**
- 4 categorias de veículo (Leve, Médio, Pesado e Mecha) e a regra de **Blindagem (BL)**.
- Regras de pilotagem, perseguição por faixas de distância, avarias, destruição, colisão, reparo e hacking de veículos.
- 26 veículos, 18 módulos, 10 armas pesadas pessoais, 8 explosivos, 15 armas montadas e de cerco (incluindo canhões antiaéreos e artilharia) e a torreta sentinela autônoma.
- 3 exoesqueletos e 8 mechas, com regras de combate de mecha.
- 10 veículos e mechas como ameaças.

**Alterado no livro principal**
- **Cabeçalho, decisões de projeto e sumário:** apontam para os compêndios.
- **1.4 Combate:** Moral própria para as ameaças dos compêndios (Fraca, Normal, Firme e Fanática), remissões e a regra essencial de Blindagem.
- **Capítulo 4:** cada classe ganhou uma linha **Veículos**, e entrou a **seção 4.7, Veículos e mechas**, com o acesso por classe, o treino e os antecedentes que treinam.
- **Rigger:** o **Condutor** foi ampliado (mechas), e ganhou **Interface veicular** e **Mecânico de campo**.
- **Capítulo 5:** os antecedentes Piloto de transporte, Mecânico e Mercenário dão treino em veículos.
- **6.2 Reação por facção:** nova linha "Mercenários e companhias privadas" e remissão às facções nomeadas.
- **8.3 e 8.7:** remissão às armas pesadas, e a seção de veículos foi reescrita por categorias.
- **9.5 ICE:** remissão a ICE adicional, malware e IAs.
- **Capítulo 10:** a oposição Elite inclui mechas, o butim Lendário inclui mechas e veículos pesados (que precisam ser pilotados ou rebocados para fora), e os investimentos incluem veículos e treino.
- **Apêndice:** a ficha ganhou campos de veículos treinados e de veículo ou drone, as tabelas rápidas ganharam Moral, encontros e Blindagem, e as ideias futuras foram atualizadas.

**O que muda na mesa em relação à v0.4**
- Solo e Rigger passam a pilotar veículos pesados e mechas. As outras classes pilotam Leves e (quase todas) Médios.
- O Rigger ganha identidade de piloto e mecânico, além do drone.
- Inimigos têm Moral própria, e armas Pesadas e explosões ignoram Blindagem.

**Não mudou**
- Origens, alinhamentos, cromo e implantes, hacking básico, Edge, XP e progressão.

### v0.4 (27/10/2026)

**Mudança principal:** a progressão passou a ser por **missões e butim**, no estilo do tesouro do Shadowdark. Antes, o Mestre concedia XP por feitos. Agora o XP vem do que o grupo traz de volta em segurança.

**Novo**
- **Capítulo 10, Missões e progressão**, com:
  - Ciclo da missão em 5 fases: briefing, preparação, infiltração, extração e debrief (10.1).
  - Geradores de contrato: contratante (d6), tipo de missão e Prêmio (d12), local (d8) e complicação (d8), mais 3 tiers de perigo: Rua, Corp e Elite (10.2).
  - Butim e Prêmio: 4 categorias (Sucata 0 XP, Normal 1, Valioso 3, Lendário 10) com valor de venda e peso em slots, butim digital com download e Alerta, e regras de extração (10.3).
  - Fontes de XP, regras para subir de nível, tabela do nível 1 ao 10 e regra de runner novo (10.4).
  - Pagamento por tier, receptação do butim e Farra opcional (10.5).
  - Evolução de implantes e preços de cartuchos de programa (10.6).
  - Ritmo de campanha esperado, de 20 a 30 missões do nível 1 ao 10 (10.7).
  - Títulos de rua por classe e faixa de nível (10.8).
  - Missão de exemplo, "A Cobaia de Vidro" (10.9), e ficha de missão para o Mestre (10.10).
- Regra de **sobrecarga**: passar do limite de slots dá desvantagem em testes de DES e reduz o deslocamento à metade (10.3.3). Antes, o livro não dizia o que acontecia.

**Alterado**
- **1.6 Evolução:** saiu a regra "o Mestre concede 1, 3, 5 ou 10 XP por feito". Entrou o XP por butim, por Drive e por objetivos do grupo, com remissão ao Capítulo 10.
- **Capítulo 2:** o Drive e os objetivos do grupo agora apontam para as regras de XP do 10.4 (+1 por avanço, +3 ao cumprir o Drive, +5 ao concluir o objetivo do grupo).
- **Apêndice:** passou a ser o Capítulo 11, e as seções viraram 11.1 a 11.5.
- **11.2 Tabelas rápidas:** incluídas as linhas de XP, butim e pagamento por tier.
- **11.3 Mapa Shadowdark:** três linhas novas (XP por tesouro, tesouro levado para fora da masmorra, carousing e Farra).
- **11.4 Ideias futuras:** os títulos de rua saíram da lista, porque foram feitos. Entrou o capítulo do Mestre.
- **Cabeçalho e sumário:** status v0.4, decisão de projeto sobre progressão e novo capítulo no sumário.

**O que muda na mesa em relação à v0.3**
- O XP não é mais dado por feitos soltos: só conta butim extraído, mais os avanços de Drive e de objetivos do grupo.
- A fórmula continua sendo nível x 10 XP, mas agora o XP **volta a zero** ao subir (a sobra fica) e só se sobe **1 nível por Debrief**.
- Subir de nível passa a acontecer no Debrief, em local seguro.
- Missões Rua, Corp e Elite pagam por runner d6 x 150, d6 x 500 e d6 x 1.500 cr.

**Não mudou**
- Origens, classes, antecedentes, alinhamentos, cromo e implantes, equipamento e preços, hacking e a Rede.

### v0.3 (27/10/2026)

- O jogo recebeu o nome **SombraNeon**.
- A origem Carne virou **Nat**, e o **Sintético** ganhou mais habilidades.
- A tabela de mutações do Biomod virou um **d20**, baseada nos traços de espécie do Dark Space.
- Todos os preços foram multiplicados por 10, as armaduras foram reajustadas e entrou a tabela de custos de vida, serviços e lazer.
- Os implantes ganharam as versões Corp e Militar e 4 opções novas.
- Os gatilhos de Edge passaram para 6 por alinhamento, e entrou a tabela de reação por facção.
- Programas e protocolos foram completados, com mais opções nos tiers baixos.
- O drone do Rigger passou a **voar**.
- Imersão total e Firewall viraram regra do livro.
- O antecedente Técnico de rede foi trocado por Mercenário, e saíram todos os marcadores de pendência do texto.
