# Relatório: CERCO AO REFÚGIO

Montado em 25/11/2026 para Foundry v13 (build 351) e o sistema SombraNeon 0.12.0. **Plano A** (compêndios), com `@foundryvtt/foundryvtt-cli` 3.0.5.

## O que foi gerado

| Compêndio | Documentos |
|---|---|
| Diários da aventura | 12 |
| Imagens e retratos | 31 |
| Cenas | 6 |
| Ameaças | 12 |
| NPCs e os doze | 19 |
| Runners prontos | 6 |
| Equipamentos | 2 |
| Tesouros e Prêmio | 4 (3 tesouros e 1 Prêmio) |
| Tabelas | 7 |
| Macros | 14 |

Os números do inventário (seção 15 das instruções) batem. Os 328 links `@UUID` resolvem nos packs compilados.

## Decisões que divergem das instruções

- **Estrutura do repositório, como a Carga Sem Nome:** os dados ficam em `data/content/cerco/` (e não em `src/packs/*.yml` dentro do módulo), o build, a validação e o release são os do repositório, e os documentos ficam em `docs/`.
- **Versão:** `0.12.0`, a mesma dos outros pacotes, em vez de `1.0.0`.
- **Plano B:** não há `importar.mjs`, porque o build dos compêndios funcionou.
- **Retratos:** os arquivos de runner usam o nome do guia de imagens (`ret-01-torre.webp`).
- **Diários extras:** `01b Relógio da noite` e a página de escolha da rota dentro da Sala 5.
- **Torretas** entram como tokens amigáveis (a instrução geral pede hostil para `ameacas`).

## Divergências encontradas

| Onde | Divergência | O que foi feito |
|---|---|---|
| Slots do Cabo | A ficha soma 6; o sistema, 7 (arredonda cada meio slot para cima) | Não corrigido |
| Slots da Sutura | A ficha soma 7; o sistema, 8 (mesmo motivo) | Não corrigido |
| Ataques do Torre | A ficha lista escopeta, pistola e faca; o sistema só mostra a arma equipada | A escopeta começa equipada; as outras aparecem ao equipar |
| Mapa 3 | A tabela de disposição diz 2 torretas; o layout tem 1 | Segue o layout |
| Mapa 6 | A tabela tem o enxame de ratos na zona A; o layout não | Segue o layout (arraste o ator se quiser o token) |
| Mapa 1 | A tabela diz torretas "sem instalar"; o layout já as posiciona | Segue o layout: mova ou apague |

## Atenção antes da mesa (spoilers visíveis)

O layout marca estes tokens como `oculto: false`, então os jogadores os veem quando a área ficar visível. Oculte-os se quiser surpresa:

- **Mapa 6:** Dr. Hayashi (só às 04:57), os dois Androides (só em Alerta 4) e o drone da passarela.
- **Mapa 5:** Irmã Beatriz (só se estiver livre).

## Lacunas

- O sistema não tem automação para os itens listados em "Sem campo no sistema" do mapeamento.
- A ficha de NPC não mostra itens embutidos: os arsenais do clímax aparecem como texto nos traços.
- O registro de comando e o scanner da Coruja usam o ícone genérico (não há imagem deles no guia).
- A aventura não dá NA para a Van de captura (fica 0).

## Arte

Ver `docs/cerco-ao-refugio-arte.md`. Os 13 retratos que o guia não cobria foram escritos a partir das fichas: aparência, idade e o gênero de alguns são escolhas de montagem, não do texto. 16 tokens são recortes de cenas.

## Verificação (seção 12)

| Item | Resultado |
|---|---|
| 1. `module.json` e caminhos | ok (testes) |
| 2. Contagens | ok |
| 3. Links `@UUID` | ok (328, nenhum quebrado) |
| 4. Imagens existem | ok |
| 5. Cenas: limites, tokens, pins | ok |
| 6. Matemática dos runners | HP e CA batem; slots com as duas divergências acima |
| 7. Sem travessão | ok |
| 8. Permissões | ok; nenhuma nota "Mestre:" ou "Segredo" fora da seção secreta nas páginas dos jogadores |
| 9. Teste no Foundry | **não feito** (nenhum Foundry encontrado nesta máquina) |

`npx vitest run`: 303 testes passaram, 23 deles deste módulo. `node tools/validate.mjs`: ok (53 packs, 961 documentos), antes do último ajuste de texto das fichas e diários; depois dele os packs do módulo foram recompilados e conferidos, sem rodar a validação de novo. Os desenhos de paredes e tokens foram conferidos sobre a arte, fora do Foundry.

**Sem teste manual:** ativação do módulo, importação das cenas (ligação de tokens e pins), paredes bloqueando, luzes, escuridão, macros, rastreador de Alerta, abertura das fichas e dos diários.

## Checklist de 15 minutos para o Mestre

1. Ativar o módulo num mundo de teste e abrir o console (F12): sem erros.
2. Ver a pasta *Cerco ao Refúgio* no menu de compêndios, com os dez itens.
3. Importar o Mapa 1 e conferir se os tokens viram fichas e a pasta de atores aparece.
4. Clicar num pin: abre a página da sala.
5. Com um token de runner selecionado, andar até uma parede e uma porta: bloqueiam.
6. Conferir se a escuridão e as luzes dão visibilidade suficiente; se não, ligar a iluminação global.
7. Abrir a ficha do Torre e do Cabo: HP, CA e ataques.
8. Abrir a ficha do Brandt: os dois arsenais no texto.
9. Rodar *Cerco: Alerta +1* e *-1*.
10. Rodar *Cerco: Relógio +1 hora* e *Coruja: avançar o estágio*.
11. Importar o Mapa 5 e rodar *Cerco: Cripta: acender ou apagar as luzes*.
12. Entrar como jogador: vê o briefing e os handouts, e não vê as notas do Mestre.
