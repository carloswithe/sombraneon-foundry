# Decisões

Onde o livro (`docs/sombraneon.md`) é omisso ou diverge da especificação (`docs/spec/`).

| Tema | Decisão | Como mudar |
|---|---|---|
| Livro e compêndios | Fonte de verdade: livro v0.6 (`docs/sombraneon.md`), Compêndio de Ameaças v0.2 e Compêndio de Veículos e Armamento v0.2. Os dados do módulo são extraídos desses arquivos por `data/content/companions.mjs`. | Trocar os arquivos em `docs/` e rodar `npm run build:packs` |
| Versão do Foundry | v13 (build 351). `compatibility.minimum` 13. A spec assumia v14. | `system.json`, `module.json` |
| Origens (v0.6) | O Sintético virou duas origens, Replicante e Android (5 origens). "Sintético" ficou só como termo de rua (facções, objetivos). Automatizado no Android: sem ração, imunidade a veneno e doença (marcadas como flags), Casco de fábrica (+1 CA sem armadura), desvantagem contra hacking e EMP, 1 implante a menos na ciberpsicose, estimulantes bloqueados, protocolos de cura pela metade (arredondando para cima) e kit de ferramentas para estabilizar. Replicante: vantagem em CON contra veneno, doença e fadiga, escolha do Propósito de fábrica (guardada como flag, a vantagem é a critério do Mestre) e Memória plantada (1 uso por descanso). A pele cosmética, o reparo em campo (INT CD 12, 1d6 HP por hora) e o -2 de reação da lei ficam como texto e modificadores de reação. | `data/content/features.mjs`, `src/documents/actor.mjs` |
| Características | 107, não 105 (99 do livro v0.3, mais Interface veicular e Mecânico de campo do Rigger, mais 6 traços de origem novos do livro v0.6: Replicante e Android no lugar do Sintético). As tabelas de talento do livro têm 3 talentos específicos por classe (2, 3-6 e 10-11), mais o "+2 em atributo" (7-9) e o resultado 12; a contagem da spec (4 por classe) não fecha. O livro vence. | `data/content/features.mjs` |
| Aventura Noite das Máscaras | Fonte de verdade: `docs/noite-das-mascaras.md`. Packs próprios com prefixo `noite-` e uma pasta de compêndios (`packFolders`, Foundry v13) no módulo. O Mestre vê o livro, o elenco, os itens e as tabelas; os jogadores veem só o material deles e os runners (a propriedade do pack é NONE ou OBSERVER no manifesto). Os runners são montados com as mesmas concessões do sistema, com atributos que já incluem o talento (a base desfaz o bônus). O que passa pelo Portão vem empunhado primeiro; o que vem da Cache de Ruth entra depois, se houver mão livre, e leva a origem "cache" na marca do item. O Edge inicial é 1 (sessão cinematográfica). Rex é um NPC sem automação dos modos: Contenção e Letal, a porta dorsal, o Mural e o "Vivos, Rex" ficam no texto e nas notas de ataque. A Cache de Ruth é um item com `bundle`, que se divide nas granadas do catálogo. Cenas, mapas e playlists não estão incluídos. | `data/content/adventure.mjs`, `tools/lib/refs.mjs` |
| Imagens da aventura | O guia `docs/noite-das-mascaras-imagens.md` define as 24 imagens; só entram nos packs as que têm arquivo em `assets/noite-das-mascaras/`. Cada uma vira um diário só do Mestre (arte, texto para ler, notas e prompt). Panoramas 16:9 de ambiente viram Scene gridless; as imagens de pista (08 e 13) ficam só como diário. A arte também é retrato ou ícone dos NPCs e itens correspondentes. Cenários sem grade, paredes ou luzes: são ilustrações para mostrar à mesa. | `data/content/adventure-images.mjs` |
| Conteúdo | Fica em módulos JS (`data/content/`) com texto e tabelas extraídos do livro, em vez de YAML. | `data/content/` |
| HP retroativo | Sempre retroativo ao CON atual (sem configuração). | `logic/rules.mjs` |
| Dano desarmado | d4 (configurável). | Setting `unarmedDie` |
| Penalidade de proficiência | Só aviso. | Setting `proficiencyPenalty` |
| Rajada | Dano por alvo; consome 1 carregador. | Setting `burstDamage` |
| Alerta por evento | Um por evento. | Setting `alertStacking` |
| Firewall | Cronômetro em tempo real, com pausa do Mestre. | Setting `firewallTimer` |
| Compra ao soltar item | Pergunta a cada vez. | Setting `purchaseMode` |
| Duro de matar | A tentativa gasta o uso. | `automation/dying.mjs` |
| Mãos de armas | 1 mão, salvo as "Duas mãos" do livro. | Dados das armas |
| "Fuzis leves" do Rigger | Fuzil. | Dados da classe |
| Kit de Runner | "3 rações" é 1 pacote de 3 usos (fecha os 4 slots do livro). | `module-items.mjs` |
| Edge, reação e drone | Drone criado pelo Mestre (ou por quem pode criar atores) ao concluir o assistente ou importar a ficha. | `automation/drone.mjs` |
| Ameaças | NPC com NA no campo de nível. Ataques ligados por "e" viram linhas separadas (o Mestre escolhe). Traços e habilidades ficam como texto formatado. Moral Fanática e "Sem medo" desligam o teste. IAs são NPCs sem ataques, com Núcleo e servidor no texto. | `data/content/companions.mjs` |
| Blindagem | Só em NPCs (campo BL). Armas com a propriedade Pesada (`heavyWeapon`) ignoram; explosões e granadas são itens e não rolam dano automático. | `actor.applyDamage` |
| Veículos | Itens do módulo (gear, categoria Veículo) sem automação: pilotagem, perseguição, avarias (tabela) e treino pago são manuais. O treino em Leves, Médios, Pesados e Mechas é mostrado na ficha. Pilotar destreinado não é bloqueado nem rola com desvantagem sozinho. | `logic/character.mjs` |
| Exoesqueletos e mechas | Itens com os números do livro; FOR, slots extras e HP do exoesqueleto não são aplicados ao runner automaticamente. | Itens do módulo |
| Armas montadas | Itens (propriedade Montada, hardpoint e tripulação) sem controle de hardpoints. Ficam fora da loja do assistente. | Dados das armas |
| Sobrecarga | Desvantagem em testes de DES é automática. Deslocamento pela metade fica por conta da mesa. | `rolls.mjs` |
| XP e nível | O XP continua em campo manual; o Mestre conta o butim no Debrief. A sobra de XP segue a configuração "XP ao subir de nível". | Setting `xpOnLevelUp` |
| Não implementado | `en.json`, migrações de mundo, botão "Sincronizar com o compêndio", escolha manual de mutação pelo Mestre, temporizador de bateria. | |
