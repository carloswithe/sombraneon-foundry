# Relatório: módulo CARGA SEM NOME

Gerado em 04/11/2026. Módulo `sombraneon-carga-sem-nome` para o sistema SombraNeon (v0.8.0), Foundry v13 (build 351). Fonte da verdade: `docs/carga-sem-nome.md`. Instruções seguidas: `docs/carga-sem-nome-foundry-instrucoes.md`.

## 1. O que foi gerado

| Compêndio (pack) | Documentos | O que tem |
|---|---|---|
| `carga-diarios` | 11 | 00 Leia primeiro (10 páginas), 01 O Alerta, 02 Briefing e FAQ (16 páginas: contratante, as 10 perguntas, handouts, papéis, equipamento, preparação), Sala 1 a Sala 5 (10 a 18 páginas cada), 08 Debrief, 09 Cortes e ajuste de nível, 10 Notas de teste. |
| `carga-imagens` | 41 | Um diário por imagem (35 imagens e 6 retratos): arte, "Para ler", notas do Mestre e o prompt. |
| `carga-cenas` | 5 | Os cinco mapas: 245 paredes e portas, 16 luzes, 34 regiões, 25 pins e 67 tokens. |
| `carga-ameacas` | 11 | Capanga, Atirador, Policial urbano, Sargento Teixeira, Falcão, Viatura, SUV da Aegis, Jararaca, Torre .50, Cérbero, Droid de combate. |
| `carga-npcs` | 8 | Ruth, Tavares, Seu Jaci, Eurico, Nest, Daigo, Voss, a Tesoureira. |
| `carga-runners` | 6 | Tijolo, Bit, Cinza, Cobra, Fumaça, Corvo (nível 1, 137 itens embutidos). |
| `carga-equipamentos` | 10 | Kit de Resgate, Furgão, motos, Tapete de Espinhos, granadas, Carga de Demolição, Maçarico, Manta Faraday, Rádio Interceptor, coletes da Ouroboros. |
| `carga-tesouros` | 6 | 5 tesouros e o Prêmio (Nest): 9 XP de butim. |
| `carga-tabelas` | 8 | Complicações das Salas 1 a 3, eventos do combate (Sala 4), complicações da fuga (Sala 5), Alerta (consulta), resoluções da perseguição, destino de Daigo. |
| `carga-macros` | 23 | Alerta, relógios, Folga, torre, Beta, Cérbero, mostrador, luzes e portas do Túnel, cartão, celas, montar tokens. |
| Imagens em `assets/` | 46 + 25 tokens | 35 imagens, 6 retratos e 5 mapas (jpg entregues) e 25 tokens PNG gerados por `tools/gen-carga-tokens.ps1`. |

Total: 129 documentos de topo em 10 compêndios, numa pasta de menu "Carga Sem Nome".

**Plano usado:** Plano A (compêndios compilados). O build usa o pipeline que o repositório já tem (`data/content/carga/*.mjs`, `tools/build-packs.mjs` com o escopo `carga`, `@foundryvtt/foundryvtt-cli` 3.0.5, `compilePack`). O Plano B (importação por script) não foi necessário. O módulo é independente: não depende do SombraNeon: Compêndio (só o recomenda) nem da Noite das Máscaras.

## 2. Decisões de mapeamento

Veja `docs/carga-sem-nome-mapeamento.md` (campo da aventura para campo do sistema). Resumo:

- Runners: atributos da ficha menos o bônus do talento (o talento soma de volta); HP, CA, slots, ataques e treino de veículos **derivados** pelo sistema e conferidos contra a ficha (seção 4).
- NPCs: números nos campos do sistema, texto integral em `traits`, segredos em `section.secret`.
- Butim: `flags.sombraneon.loot` (categoria e XP, como a Noite das Máscaras) e `flags.sombraneon-carga-sem-nome.butim` (venda, slots, digital, onde, como).
- Alerta: usa o rastreador do próprio sistema (`sombraneon.alert`); o macro só o sobe e desce e publica o texto da aventura para o Mestre.
- Permissões: Foundry **zera a permissão ao importar** de um compêndio; por isso o script devolve o acesso de observador aos handouts (e o Briefing e FAQ) ao importar, usando uma flag.

## 3. Lacunas e divergências

**Campos sem equivalente no sistema** (ficam como texto, o Mestre aplica à mão): o laço de cada runner, as partes do Jararaca (CA, HP e BL por parte), as três cabeças do Cérbero, o ciclo da torre, a zona morta, a Espera, a coleira, o EMP de uma vez só, a Manobra do Jararaca, a perseguição por faixas, a desvantagem das próteses de Nest e o "Man." do Furgão e das motos como regra de pilotagem (está no item, mas a pilotagem é manual).

**Números ausentes na aventura (não inventados):** o CD de Moral das ameaças que só têm a palavra (Fraca, Normal) usa a convenção do sistema (18 e 15); a aventura só dá CD para o Sargento (12) e o Cabo Rufino (9, no texto). Nest tem CA 10 como torso e 11 equipado: o campo guarda 11 (ficha da seção 12) e os dois estados estão nas notas. O Núcleo do Cérbero e o Cartão de comando estão embutidos nos atores só como "saque" (a aventura os põe no corpo deles).

**Divergências em relação às instruções:**

1. **Pipeline.** As instruções propõem `src/packs/*.yml`, `scripts/importar.mjs`, `tools/gerar_placeholders.py` e `tools/validar.mjs`. Foi usado o pipeline já existente no repositório (dados em módulos `.mjs`, `build-packs.mjs`, `validate.mjs` e testes do vitest), que produz os mesmos compêndios.
2. **Mapas medidos sobre a arte, não colocados sobre placeholders.** O Anexo A descreve cada planta em casas, mas a arte gerada não coincide linha a linha. Todas as paredes, portas, luzes, regiões, pins e tokens foram medidos sobre a própria arte (grade de conferência 1 x 1 e uma sobreposição desenhada para cada mapa). Mantêm-se do Anexo A as regras: ids das portas, estados, CDs, notas, quem fica onde, posições de partida. As principais diferenças, mapa a mapa:
   - **Mapa 1:** o muro da frente e o portão estão em y 14,4 (Anexo A: 17); a rua e o beco ocupam y 16 a 20. Os Capangas ficam em [13,16] e [16,16] (Anexo A: [13,18] e [15,18]). O galpão (x 17,7 a 29) e o muro baixo (oeste, y 9,5 a 12) batem. As pilhas de carcaças são cinco (o Anexo A tem três).
   - **Mapa 2:** a lanchonete está no canto noroeste (y 0,6 a 4,95), não em y 2 a 9; a oficina está no canto nordeste (x 25 a 29,4). O Jararaca está **na vertical** na arte (cabine ao norte, canil ao sul), com a escotilha da Cela A no flanco oeste (lado da lanchonete) e a da Cela B no flanco leste (lado da estrada); o Anexo A o põe na horizontal. O fosso sai da traseira, ao sul.
   - **Mapa 3:** a avenida ocupa y 8,7 a 15,6; a Rampa do Aqueduto é a curva da esquerda (x 4,5 a 7), não x 18 a 24; a Barreira (viatura atravessada) está em x 15,8 a 20,8; a boca do Túnel em x 31,7 a 34,5. As "vans da Aegis" e as "carcaças da avenida" do Anexo A **não existem na arte**: as regiões de cobertura estão marcadas "sem arte". Acrescentada a porta aberta `boca-tunel`.
   - **Mapa 4:** é o que mais bate com o Anexo A, com o blindado maior (x 16 a 20,1, em vez de 17 a 19) e a porta de serviço separada das celas (`porta-servico`, CD 15). A Viatura Beta e os dois policiais ficam na linha 0 do mapa (acima do canil), os dois runners do sul em [22,22] e [14,22] (as carcaças do bloqueio ocupam y 18,2 a 21,2).
   - **Mapa 5:** a via ocupa x 14,9 a 21,3. As cancelas são dois braços (`cancela-pedagio` e `cancela-pedagio-2`). O SUV espera na rampa do canal, os runners partem em y 5 (as Viaturas 2 x 3, em y 1 a 4) e o Falcão fica em [22,5].
   - Contagens por mapa: tokens 10, 16, 9, 22 e 10 (= ameaças e NPCs do Anexo A + 6 runners, conforme a validação 5 das instruções); pins 4, 7, 4, 6 e 4 e luzes 2, 2, 4, 5 e 3 (iguais ao inventário); portas 2, 5, 5, 8 e 4 (inventário: 3, 5, 4, 7 e 3), mais janelas (muro baixo, fachada da lanchonete). As diferenças são as portas e janelas que a arte pede (`boca-tunel`, `porta-servico`, `cancela-pedagio-2`, a fachada da lanchonete, o muro baixo como janela).
3. **Furgão e motos não são tokens.** A seção 16 fala em "atores de veículo na cena mapa-05", mas o inventário e a validação 5 fixam 4 tokens de ameaça nesse mapa. Seguiu-se o inventário: o Furgão e as motos são **itens** completos (`item-furgao-tavares`, `item-motos-tavares`); o Mestre os põe como tokens se quiser.
4. **Tabelas.** A Sala 5 só tem a tabela de complicações da fuga (que inclui a voz de Voss); as "complicações da Sala 5" e as "da fuga" são a mesma. Total: 5 tabelas d6, mais Alerta, perseguição e destino de Daigo.
5. **Arquivos de imagem.** O pacote traz `.jpg`; o guia cita `.webp`. Os caminhos usam os `.jpg` entregues (46 arquivos, 21 MB). Salvar a arte final com o mesmo nome base mantém tudo ligado.
6. **Tokens.** Em vez de placeholders de silhueta, os personagens com arte ganham um recorte circular da própria arte (anel colorido por papel); os sem arte, círculo escuro com iniciais; viaturas e SUV, um carro visto de cima; o Jararaca, um marcador transparente (o blindado já está desenhado no mapa).
7. **Imagens "Só Mestre" e handouts.** Handouts (img-01 a 05 e 09) com acesso de observador. Só Mestre (img-13, 29 e 31): o "Para ler" fica oculto. As demais seguem "Jogadores" no texto, mas ficam sem acesso até o Mestre usar "Mostrar aos jogadores" (a aventura as libera por gatilho de cena).
8. **Ajuste de nível 3.** Só está documentado (diário 09); não há atores Mk II, como as instruções mandam.

**Divergências entre os tokens e a tabela de ameaças:** nenhuma. A disposição das ameaças de cada sala concorda com os tokens (verificado em `tests/ui/carga.test.mjs`).

**Divergências na matemática das fichas:** nenhuma. HP, CA e slots das seis fichas batem com a conta escrita (10/13/19, 5/11/10, 7/11/10, 4/14/10, 7/12/10, 7/14/10), assim como os bônus de ataque (+2 d8+1, +3 d6 etc.) e o treino em veículos.

## 4. Verificação (seção 12 das instruções)

Rodado em 04/11/2026 com `npm run verify` (sintaxe, testes, build de todos os compêndios, validação):

```
Sintaxe ok em 123 arquivos.
Test Files  13 passed (13)
Tests       259 passed (259)      (44 novos em tests/ui/carga.test.mjs)
Gerando compêndios... (39 packs; os 10 do módulo: 11, 41, 5, 11, 8, 6, 10, 6, 8 e 23 documentos)
Validação ok: 39 packs, 721 documentos.
```

| # | Verificação | Resultado |
|---|---|---|
| 1 | `module.json` válido, caminhos dos packs, estilo, script e idioma existem | ok (validate e teste) |
| 2 | Contagens batem com o inventário | ok (11, 8, 6, 10, 5 + 1 Prêmio, 5 cenas, 41 imagens, 5 salas, 10 perguntas) |
| 3 | Todo `@UUID` resolve | ok (o build falha se um `@Ref` não resolver; todo pin aponta para uma página que existe) |
| 4 | Todo caminho de imagem existe | ok (validate e teste) |
| 5 | Cenas: tudo dentro dos limites, tokens = ameaças + 6, todo token tem ator, todo pin tem página | ok |
| 6 | Conta dos runners (CA, HP, slots, ataques, veículos) | ok |
| 7 | Nenhum travessão | ok (validate varre `data/content`, o script, o CSS e o idioma; o build recusa) |
| 8 | Permissões: conteúdo do Mestre sem acesso de jogador, handouts com observador | ok nos dados; veja "não testado" para o que o Foundry faz ao importar |
| 9 | Teste num Foundry | **não feito** |

Conferência visual das cenas: para cada mapa foi desenhada uma sobreposição (paredes, portas por estado, luzes, regiões, tokens e pins) sobre a arte, e as paredes foram ajustadas até encaixar nos contornos.

## 5. O que não foi testado

**Não havia um Foundry instalado nesta máquina e nada foi aberto dentro dele.** Ficaram sem teste manual: a ativação do módulo sem erro de console, a abertura das cinco cenas, o bloqueio das paredes e das portas, o acendimento das luzes, a abertura dos diários e o clique nos links, a abertura da ficha dos runners e das ameaças, o script (importação de cena: criação dos atores no mundo, troca dos marcadores por tokens, ligação dos pins), os 23 macros (nenhum rodou de verdade; os testes só conferem que cada macro chama uma função que existe na API) e o comportamento do Foundry ao importar com permissões. Os diários usam caixas de marcar (`<input type="checkbox">`) cujo estado não é salvo (só marcação de mesa).

## 6. Checklist manual (15 minutos, 12 itens)

1. Instale o sistema e o módulo (`carga-sem-nome.json`), crie um mundo de teste e ative o módulo. Console sem erro? Sem o aviso "só funciona com o SombraNeon"?
2. Abra o menu de compêndios: a pasta **Carga Sem Nome** tem 10 compêndios? Os rótulos estão em português?
3. Abra o diário `00 Leia primeiro` e a página "A verdade": o fundo laranja do "Para ler" e a barra vermelha dos segredos aparecem?
4. Importe o diário `02 Briefing e FAQ` e, com um jogador logado, confira que ele vê as 10 perguntas e os handouts, mas não "O contratante" nem as notas "Mestre:".
5. Importe `Mapa 01` (arraste para Cenas). Foram criados os atores na pasta "Carga Sem Nome", os tokens estão ligados e os pins abrem as páginas do diário da Sala 1?
6. Ative o Mapa 01 e, com o token de um runner, confira: o portão está trancado, o galpão abre, o muro baixo bloqueia, as luzes acendem e a visão respeita as paredes.
7. Repita no Mapa 02: as escotilhas das celas e a porta do canil estão fechadas e trancadas, o Cérbero está oculto, e da janela da lanchonete se vê o pátio.
8. Importe o Mapa 04: o Cérbero, os dois droids, Daigo e Nest estão ocultos; rode `Carga: Cartão: usar no painel` (canil abre, Cérbero aparece) e `Carga: Cela B: abrir e revelar Nest`.
9. Rode `Carga: Alerta +1` quatro vezes: o painel de Alerta do sistema sobe e o cartão (só do Mestre) mostra o texto de cada nível; no 4, o aviso do reforço.
10. Rode `Carga: Torre .50: avançar o ciclo`, `Viatura Beta: +1 rodada`, `Cérbero: cabeça quebrada` e `Folga da Sala 3: -2 minutos`: os cartões aparecem só para o Mestre?
11. Arraste os runners (Tijolo, Bit, Cinza, Cobra, Fumaça, Corvo) para o mundo e abra cada ficha: HP, CA, slots e ataques batem com a ficha impressa? A ficha do Corvo não tem o jack de interface?
12. Rode `Carga: Túnel: apagão total (liga e desliga)` no Mapa 04 duas vezes: a escuridão vai a 1 e volta ao 0,7 do mapa? Se a escuridão-base estiver escura demais para a mesa, ligue a Iluminação global da cena ou ajuste o nível.
