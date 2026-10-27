# 00. Leia primeiro

## 1. O que vamos construir

Dois pacotes de Foundry VTT que, juntos, entregam o SombraNeon jogável:

| Pacote | ID | Papel |
|---|---|---|
| Sistema | `sombraneon` | Regras, modelos de dados, fichas, automação e **compêndios de regras** (o que a ficha precisa para funcionar sozinha). |
| Módulo de compêndio | `sombraneon-compendium` | **Catálogo** para arrastar para a ficha: armas, armaduras, equipamento, implantes, veículos, ICE, fichas prontas e macros. |

O livro de regras completo está em `docs/sombraneon.md` (v0.3). Ele é a única fonte de verdade das regras e do conteúdo.

## 2. A experiência que define "pronto"

Estes são os critérios de aceite de alto nível, ditos pelo autor. Cada um tem cenário de teste em `06-FASES-E-TESTES.md`.

1. **Seletores automáticos na ficha.** O cabeçalho da ficha tem seletores de **Origem, Classe, Antecedente e Alinhamento** alimentados pelos compêndios. Escolher um item **preenche tudo que ele concede**: dado de vida, atributo-chave, proficiências, habilidades base, traços de origem, conhecimento do antecedente, gatilho de Edge, conjuração disponível (programas, protocolos ou Sets) e pacote inicial sugerido.
2. **Assistente de criação.** Um botão "Assistente de criação" conduz os 7 passos do capítulo 2 do livro (atributos, origem, classe, antecedente, alinhamento, cromo, equipamento), com rolagens automáticas, escolhas guiadas e revisão final. Ao concluir, a ficha está completa e jogável.
3. **Talentos pré-preenchidos.** No nível 1 e nos níveis 3, 5, 7 e 9, o botão de talento rola 2d6 na tabela da classe, **cria o item de talento na ficha** e aplica o efeito (inclusive escolhas, como "+2 em FOR, DES ou CON"). O botão "Subir de nível" faz o fluxo completo (nível, HP, talento, novo programa).
4. **Ataques automáticos.** A seção de ataques lista sozinha toda arma equipada, toda arma embutida em implante, armas naturais de mutação e o drone. Cada linha mostra bônus de ataque e dano **já calculados** (atributo, domínio de arma, implantes, talentos) e rola ataque e dano com críticos, vantagem e desvantagem.
5. **Arrastar e soltar funciona.** Arrastar uma **arma** do compêndio (ou de outro ator) para a ficha a adiciona, equipa se houver mãos livres, ocupa os slots certos e cria a linha de ataque. O mesmo vale para armadura (recalcula CA), equipamento (empilha consumíveis), implante (vai para o slot correto e recalcula ciberpsicose), programa, protocolo e Set (valida tier e limite conhecido).
6. **Tudo derivado é calculado.** Modificadores, CA, slots de equipamento, HP máximo, iniciativa, CD de programas, tier máximo, contagem e CD de ciberpsicose, XP do próximo nível. Nenhum desses valores é digitado à mão.
7. **Mecânicas viram botões.** Edge (gastar para rolar de novo), morrendo (rodadas e d20 por turno), descanso (8 h, ração, interrupção), Crash, Feedback e Alerta de hacking, Surto de ciberpsicose, hack de rua, testes com CD.

## 3. Hierarquia de fontes

Em caso de conflito, vale nesta ordem:

1. `docs/sombraneon.md` (regras e conteúdo).
2. Este conjunto de especificações (`docs/spec/`).
3. `docs/DECISIONS.md` (decisões que você tomou onde o livro é omisso, validadas pelo autor).
4. Boas práticas do Foundry v14 (documentação oficial).

Se o livro e a especificação divergirem, **o livro vence** e você registra a divergência em `docs/DECISIONS.md`.

## 4. Decisões técnicas já fechadas

| Tema | Decisão |
|---|---|
| Versão alvo | Foundry VTT **v14** (`compatibility.minimum: "14"`, `verified: "14.369"`). Antes de começar, pergunte ao autor qual versão ele roda. Se for v13, ajuste `compatibility` e evite recursos exclusivos de v14. |
| Dados | `TypeDataModel` + `documentTypes` no `system.json`. Sem `template.json`. |
| Fichas | `ApplicationV2` + `HandlebarsApplicationMixin` (`ActorSheetV2` e `ItemSheetV2`). |
| Compêndios | LevelDB gerado por `@foundryvtt/foundryvtt-cli` (`compilePack`) a partir de YAML em `data/source/`. |
| Bônus de itens para o ator | **Motor próprio de modificadores** (`system.modifiers`), não Active Effects. Em v14 o modelo de transferência de Active Effects mudou (a transferência legada foi removida). O motor próprio é previsível, testável e independe dessa API. Active Effects ficam para condições e ajustes ad hoc do Mestre. |
| Referência entre itens | Por `identifier` (slug ASCII estável) e UUIDs determinísticos, nunca por nome. |
| Idioma | UI em pt-BR (principal), en depois. Identificadores de código em inglês. Nomes de itens em pt-BR. |
| Estilo | Identidade visual da ficha de papel (`design/sombraneon-ficha.html`): fundo escuro, ciano e magenta neon, fontes Orbitron, Rajdhani e Share Tech Mono (todas OFL, embutir os arquivos woff2 em `systems/sombraneon/fonts/`). |
| Testes | Vitest para lógica pura e validação de conteúdo. Roteiro manual para o que depende do Foundry. |

## 5. Divisão de conteúdo entre sistema e módulo

| Fica no **sistema** (a ficha depende disso) | Fica no **módulo** (catálogo para arrastar) |
|---|---|
| `classes`, `origens`, `antecedentes`, `alinhamentos` | `armas`, `armaduras`, `equipamento` |
| `caracteristicas` (habilidades de classe, traços de origem, talentos, mutações) | `implantes` (28, com 3 qualidades cada) |
| `programas` (programas, protocolos e Sets) | `veiculos` (veículos e módulos de drone) |
| `tabelas` (todas as RollTables do livro) | `ice` (5 ICEs como atores) |
| `regras` (o livro, em Journal) | `fichas-prontas` (6 runners nível 1) e `macros` |

Regra de ouro: **a ficha nunca quebra** se o módulo não estiver ativo. Sem o módulo, o assistente avisa e pula os passos de catálogo (equipamento e implantes iniciais), e a ficha continua editável manualmente. O sistema declara o módulo em `relationships.recommends`; o módulo exige o sistema em `relationships.systems`.

## 6. Como lidar com ambiguidade

O livro é enxuto de propósito. Quando ele for omisso:

1. Escolha a opção **mais simples e mais fiel ao espírito do livro**.
2. Torne-a **configurável** (setting do sistema) quando fizer sentido.
3. Registre em `docs/DECISIONS.md` no formato: contexto, opção escolhida, alternativas, como mudar.
4. As decisões que já sabemos que existem e a opção padrão sugerida estão na seção 7 de `06-FASES-E-TESTES.md`. Confirme-as com o autor no início da Fase 0.

## 7. Fora de escopo (por enquanto)

Arte própria de tokens e retratos, mapas e cenas, módulos de áudio, animações de combate, integração com Dice So Nice (deve funcionar sem ajuste, pois usamos `Roll` padrão), sistema de reputação por facção (apenas a tabela de reação do livro), geração procedural de runs. Nada disso deve ser construído sem pedido.

## 8. Licenciamento (importante antes de publicar)

- Código do sistema e do módulo: MIT (sugestão, confirmar com o autor).
- Conteúdo do livro: texto próprio do autor. O livro menciona que o Shadowdark tem licença de terceiros própria: **antes de publicar**, o autor deve conferir os termos e incluir a declaração de compatibilidade exigida. Até lá, **não use a marca "Shadowdark" no título dos pacotes**; mencione apenas na descrição como "inspirado em".
- Fontes (Orbitron, Rajdhani, Share Tech Mono): SIL Open Font License. Inclua os arquivos de licença em `systems/sombraneon/fonts/`.
- Nunca inclua os PDFs de referência (CyberDark, Dark Space) no repositório. Se estiverem na pasta, mantenha-os em `refs/` e no `.gitignore`.
