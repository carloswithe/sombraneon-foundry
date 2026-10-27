# Decisões

Onde o livro (`docs/sombraneon.md`) é omisso ou diverge da especificação (`docs/spec/`).

| Tema | Decisão | Como mudar |
|---|---|---|
| Versão do Foundry | v13 (build 351). `compatibility.minimum` 13. A spec assumia v14. | `system.json`, `module.json` |
| Características | 99, não 105. As tabelas de talento do livro têm 3 talentos específicos por classe (2, 3-6 e 10-11), mais o "+2 em atributo" (7-9) e o resultado 12; a contagem da spec (4 por classe) não fecha. O livro vence. | `data/content/features.mjs` |
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
| Não implementado | `en.json`, migrações de mundo, botão "Sincronizar com o compêndio", escolha manual de mutação pelo Mestre, temporizador de bateria. | |
