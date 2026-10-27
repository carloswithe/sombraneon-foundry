# 01. Arquitetura, manifestos e ferramentas

## 1. Estrutura do repositório (monorepo)

```
sombraneon-foundry/
  CLAUDE.md
  package.json                 scripts e devDependencies (Node 20+)
  eslint.config.mjs  .prettierrc  .editorconfig  .gitignore  LICENSE  README.md
  docs/                        (ver CLAUDE.md)
  design/sombraneon-ficha.html
  data/
    extracted/                 JSON gerado por tools/extract-book.mjs (versionado, para diff)
    source/                    YAML curado (autoridade). Subpastas system/ e module/, uma por pack (ver 05-COMPENDIO.md seção 2.2)
  tools/
    extract-book.mjs           parseia docs/sombraneon.md
    build-packs.mjs            data/source -> LevelDB (compilePack), sistema e módulo
    unpack-packs.mjs           LevelDB -> YAML (round trip)
    validate.mjs               contagens, IDs, referências, travessões, schema
    build-pregens.mjs          gera as 6 fichas prontas usando a lógica pura (05 seção 11.6)
    link-dev.mjs               symlink para $FOUNDRY_DATA
    release.mjs                zips e manifests em dist/
    lib/ids.mjs                geração de IDs determinísticos
  tests/
    logic/                     testes da lógica pura (Vitest)
    content/                   testes de conteúdo (contagens, referências)
    quench/                    lotes opcionais para o módulo Quench (integração no Foundry)
  systems/sombraneon/
    system.json
    sombraneon.mjs             entrada: importa ./src/index.mjs
    src/
      index.mjs                hooks init, setup, ready
      config.mjs               CONFIG.SOMBRANEON (constantes)
      settings.mjs             registro das configurações (03 seção 18)
      logic/                   LÓGICA PURA (sem globais do Foundry)
        abilities.mjs  hp.mjs  ac.mjs  slots.mjs  xp.mjs  modifiers.mjs  formulas.mjs
        dice.mjs  advantage.mjs  combat.mjs  casting.mjs  chrome.mjs  economy.mjs
        rest.mjs  dying.mjs  drone.mjs  reaction.mjs
      data/                    TypeDataModel
        actor/ character.mjs npc.mjs ice.mjs drone.mjs  shared.mjs
        item/  class.mjs origin.mjs background.mjs alignment.mjs feature.mjs
               weapon.mjs armor.mjs gear.mjs implant.mjs program.mjs  shared.mjs
        fields/ modifier.mjs grant.mjs
      documents/               SNActor, SNItem, SNCombat, SNCombatant, SNChatMessage helpers
      sheets/                  ActorSheetV2 e ItemSheetV2 (character, npc, ice, drone, item)
      apps/                    CreationWizard (assistente), ChoiceDialog, RollDialog, AttackDialog, PurchaseDialog,
                               RestDialog, LevelUpDialog, AlertTracker, ModifierEditor
      automation/              handlers por identifier (features, feedback, rejeição, implantes)
      chat/                    cartões de chat e delegação de cliques
      compendium/              lookup por identifier, índices, grants resolver
      hooks/                   hotbarDrop, combatTurnChange, preUpdateActor, ready checks
      migrations/
    templates/                 .hbs por parte da ficha
    styles/                    tokens.css fonts.css base.css sheet.css items.css chat.css wizard.css apps.css (04 seção 3)
    fonts/                     woff2 + licenças OFL
    assets/                    ícones SVG originais (status, tipos de item), retratos padrão
    lang/pt-BR.json  en.json
    packs/                     GERADO (LevelDB)
  modules/sombraneon-compendium/
    module.json
    lang/pt-BR.json
    assets/
    sombraneon-compendium.mjs  (mínimo: aviso se o sistema não for o sombraneon)
    packs/                     GERADO (LevelDB)
  .github/workflows/ci.yml  release.yml
```

Observação de nomenclatura: dentro do sistema, o código vai em `src/` (e não em `module/`) para não confundir com módulos do Foundry.

## 2. `system.json` (ponto de partida, verificar cada campo na API v14)

```json
{
  "id": "sombraneon",
  "title": "SombraNeon",
  "description": "RPG cyberpunk de regras enxutas para runners numa cidade dominada por corporações.",
  "version": "0.1.0",
  "compatibility": { "minimum": "14", "verified": "14.369" },
  "authors": [{ "name": "Carlos Withe (Cacá)" }],
  "url": "https://github.com/OWNER/REPO",
  "manifest": "https://github.com/OWNER/REPO/releases/latest/download/system.json",
  "download": "https://github.com/OWNER/REPO/releases/download/v0.1.0/system.zip",
  "bugs": "https://github.com/OWNER/REPO/issues",
  "license": "LICENSE",
  "readme": "README.md",
  "media": [],
  "esmodules": ["sombraneon.mjs"],
  "styles": ["styles/tokens.css", "styles/fonts.css", "styles/base.css", "styles/sheet.css", "styles/items.css", "styles/chat.css", "styles/wizard.css", "styles/apps.css"],
  "languages": [{ "lang": "pt-BR", "name": "Português (Brasil)", "path": "lang/pt-BR.json" }],
  "initiative": "1d20 + @abilities.des.mod",
  "primaryTokenAttribute": "hp",
  "grid": { "type": 1, "distance": 1.5, "units": "m" },
  "documentTypes": {
    "Actor": { "character": {}, "npc": {}, "ice": {}, "drone": {} },
    "Item": {
      "class": {}, "origin": {}, "background": {}, "alignment": {}, "feature": {},
      "weapon": {}, "armor": {}, "gear": {}, "implant": {}, "program": {}
    }
  },
  "packs": [
    { "name": "classes",       "label": "Classes",                    "path": "packs/classes",       "type": "Item",        "system": "sombraneon" },
    { "name": "origens",       "label": "Origens",                    "path": "packs/origens",       "type": "Item",        "system": "sombraneon" },
    { "name": "antecedentes",  "label": "Antecedentes",               "path": "packs/antecedentes",  "type": "Item",        "system": "sombraneon" },
    { "name": "alinhamentos",  "label": "Alinhamentos",               "path": "packs/alinhamentos",  "type": "Item",        "system": "sombraneon" },
    { "name": "caracteristicas","label": "Características e Talentos","path": "packs/caracteristicas","type": "Item",       "system": "sombraneon" },
    { "name": "programas",     "label": "Programas, Protocolos e Sets","path": "packs/programas",    "type": "Item",        "system": "sombraneon" },
    { "name": "tabelas",       "label": "Tabelas",                    "path": "packs/tabelas",       "type": "RollTable",   "system": "sombraneon" },
    { "name": "regras",        "label": "Livro de Regras",            "path": "packs/regras",        "type": "JournalEntry","system": "sombraneon" }
  ],
  "relationships": {
    "recommends": [
      { "id": "sombraneon-compendium", "type": "module",
        "reason": "Catálogo de armas, armaduras, equipamento, implantes, ICE e fichas prontas." }
    ]
  },
  "flags": { "hotReload": { "extensions": ["css", "hbs", "json"], "paths": ["styles", "templates", "lang"] } }
}
```

Verificações obrigatórias (registrar em `docs/API-NOTES.md`):
- Forma exata de `documentTypes` (e se `htmlFields` é aceito por subtipo) em `DocumentTypesConfiguration`/`ServerSanitizationFields`.
- Campos de `packs` aceitos na v14 (`name`, `label`, `path`, `type`, `system`, `banner`; confirmar se `ownership` e `flags` ainda existem) e se `packFolders` é útil para agrupar.
- `media` é listado como obrigatório no tipo; confirme se o Foundry aceita `[]`. Se não, inclua uma entrada `cover`.
- `styles` como lista de strings ou de objetos `{src, layer}`; use a forma aceita.
- Chave de hot reload: confirme o formato atual.

## 3. `module.json`

```json
{
  "id": "sombraneon-compendium",
  "title": "SombraNeon: Compêndio",
  "description": "Armas, armaduras, equipamento, implantes, veículos, ICE, fichas prontas e macros para o sistema SombraNeon.",
  "version": "0.1.0",
  "compatibility": { "minimum": "14", "verified": "14.369" },
  "authors": [{ "name": "Carlos Withe (Cacá)" }],
  "media": [],
  "esmodules": ["sombraneon-compendium.mjs"],
  "languages": [{ "lang": "pt-BR", "name": "Português (Brasil)", "path": "lang/pt-BR.json" }],
  "packs": [
    { "name": "armas",         "label": "Armas",                "path": "packs/armas",         "type": "Item", "system": "sombraneon" },
    { "name": "armaduras",     "label": "Armaduras",            "path": "packs/armaduras",     "type": "Item", "system": "sombraneon" },
    { "name": "equipamento",   "label": "Equipamento",          "path": "packs/equipamento",   "type": "Item", "system": "sombraneon" },
    { "name": "implantes",     "label": "Implantes (Cromo)",    "path": "packs/implantes",     "type": "Item", "system": "sombraneon" },
    { "name": "veiculos",      "label": "Veículos e Drones",    "path": "packs/veiculos",      "type": "Item", "system": "sombraneon" },
    { "name": "ice",           "label": "ICE",                  "path": "packs/ice",           "type": "Actor","system": "sombraneon" },
    { "name": "fichas-prontas","label": "Fichas Prontas",       "path": "packs/fichas-prontas","type": "Actor","system": "sombraneon" },
    { "name": "macros",        "label": "Macros",               "path": "packs/macros",        "type": "Macro","system": "sombraneon" }
  ],
  "relationships": {
    "systems": [{ "id": "sombraneon", "type": "system", "compatibility": { "minimum": "0.1.0" } }]
  }
}
```

Confirmar o formato de `relationships.systems` (campos de `RelatedPackageData`: `id`, `type`, `manifest`, `compatibility`, `reason`). Se for necessário, acrescente também `requires` apontando para o sistema.

## 4. Ferramentas (Node 20+)

`package.json` (devDependencies sugeridas): `@foundryvtt/foundryvtt-cli`, `yaml`, `marked`, `vitest`, `eslint`, `prettier`, `archiver` (zips). Sem dependências de runtime.

| Script | Responsabilidade |
|---|---|
| `extract-book.mjs` | Lê `docs/sombraneon.md`, divide por capítulo/seção, converte tabelas Markdown em JSON (`data/extracted/*.json`) e gera o HTML das páginas do Journal. Detalhes em `05-COMPENDIO.md`. |
| `build-packs.mjs` | Para cada pack: lê `data/source/<pack>/**/*.yml`, mescla com o extraído (por `identifier`), gera `_id` determinístico, `_key` e `_stats`, grava um JSON/YAML temporário e chama `compilePack` do CLI para criar o LevelDB em `systems/sombraneon/packs/<pack>` ou `modules/sombraneon-compendium/packs/<pack>`. |
| `unpack-packs.mjs` | `extractPack` dos packs para uma pasta temporária. Usado em teste de round trip: `build -> unpack -> diff` deve ser vazio. |
| `validate.mjs` | Contagens esperadas (ver 05), IDs únicos e determinísticos, todo `grant` e toda referência de tabela resolve, travessões proibidos (U+2014 e U+2013) em `lang/`, `data/source/`, `docs/` e templates, schema dos YAMLs. Sai com código 1 em falha. |
| `link-dev.mjs` | Lê `FOUNDRY_DATA` e cria symlinks `Data/systems/sombraneon` e `Data/modules/sombraneon-compendium` apontando para as pastas do repositório. |
| `release.mjs` | Gera `dist/system.zip` e `dist/module.zip` (arquivos na **raiz do zip**, sem pasta pai), copia os manifests para `dist/` e injeta versão e URLs. |

CLI de compêndios: confirme na hora os comandos e opções do `@foundryvtt/foundryvtt-cli` (a API programática expõe `compilePack(src, dest, options)` e `extractPack(src, dest, options)`; opções documentadas incluem `yaml`, `log`, `recursive`, `transformEntry`, `omitVolatile`, `folders`). Prefira a API programática dentro de `tools/` em vez de shell.

## 5. Ciclo de desenvolvimento

1. O autor define `FOUNDRY_DATA` (pasta de dados do usuário do Foundry) e roda `npm run dev:link` uma vez.
2. `npm run build:packs` após qualquer mudança em `data/source/`.
3. CSS, templates `.hbs` e `lang/` recarregam sozinhos (hot reload). Código `.mjs` exige recarregar o mundo (F5).
4. Packs são recriados pelo build. **Reiniciar o Foundry** só é necessário ao adicionar um pack novo ao manifesto.
5. A cada fase, você atualiza `docs/ACCEPTANCE.md` com o roteiro manual (o autor testa dentro do Foundry e devolve o resultado).

## 6. CI e release (GitHub Actions)

- `ci.yml` em push e PR: `npm ci`, `lint`, `test`, `build:packs`, `validate`.
- `release.yml` em tag `v*`: roda o CI, executa `release`, cria o GitHub Release e anexa `system.json`, `system.zip`, `module.json`, `module.zip`. As URLs de `manifest` e `download` apontam para `releases/latest/download/...` e `releases/download/<tag>/...`.
- Peça ao autor o `OWNER/REPO` do GitHub e o nome de autor antes de fechar os manifests. Use placeholders até lá.

## 7. Convenções de código

- ESM puro, `"use strict"` implícito, Prettier (largura 100, aspas simples), ESLint com a lista de globais do Foundry declarada à mão (sem tipos pesados).
- JSDoc nos tipos públicos. Nomes de arquivo em kebab-case. Constantes de regra em `src/config.mjs` sob `CONFIG.SOMBRANEON` e espelhadas em `src/logic/` (a lógica pura recebe constantes por parâmetro ou importa de `config.mjs` **sem** depender do Foundry).
- Handlers de automação registrados por `identifier` em um mapa (`automation/registry.mjs`). Item sem handler registrado apenas mostra a descrição.
- Nenhum `setTimeout` para sincronizar estado. Use hooks e `await`.
- Toda escrita em documento passa por métodos do `SNActor`/`SNItem` (por exemplo `actor.equipItem(id)`), não direto nos templates.
- Permissões: jogadores só alteram atores que possuem. Operações que precisam de GM (dar Edge a outro jogador, mexer no Alerta) usam socket com handler no GM ativo (`game.users.activeGM`). O manifesto precisa de `"socket": true` apenas se essa fase for implementada.
- Performance: nada de recalcular listas pesadas em cada render; `prepareDerivedData` deve ser O(itens). Índices de compêndio são carregados uma vez no `ready` e cacheados.

## 8. Checklist de APIs a verificar antes de codar (preencher `docs/API-NOTES.md`)

Para cada item: namespace correto no v14, assinatura, exemplo mínimo, e se há depreciação.

- Dados: `foundry.abstract.TypeDataModel`, `foundry.data.fields` (`SchemaField`, `NumberField`, `StringField`, `BooleanField`, `HTMLField`, `ArrayField`, `SetField`, `ObjectField`, `EmbeddedDataField`), `migrateData`, `prepareBaseData`/`prepareDerivedData`.
- Registro: `CONFIG.Actor.documentClass`, `CONFIG.Item.documentClass`, `CONFIG.Actor.dataModels`, `CONFIG.Item.dataModels`, `CONFIG.Actor.trackableAttributes`, `DocumentSheetConfig.registerSheet` e como desregistrar as fichas padrão.
- Aplicações: `ApplicationV2` (`DEFAULT_OPTIONS`, `PARTS`, `TABS`, `tabGroups`, `actions`, `form`, `_prepareContext`, `_preparePartContext`, `_onRender`, `_attachPartListeners`), `HandlebarsApplicationMixin`, `ActorSheetV2`, `ItemSheetV2`, `DialogV2` (`prompt`, `confirm`, `wait`).
- Arrastar e soltar: opção `dragDrop` da sheet, `DragDrop`, `_onDrop`, `_onDropItem`, `_onDropActor`, `_onDropFolder`, `_onSortItem`, leitura do payload (`TextEditor.getDragEventData`). Nota de release: em v14, soltar Item na ficha passa por `game.items.fromCompendium`; confirmar o efeito sobre `_id`, `flags` e `ownership` ao criar a cópia embutida.
- Rolagens: `Roll`, `evaluate`, avaliação de fórmulas curtas (`Roll.safeEval` ou `evaluateSync`), `Roll#alter` (dobrar dados em crítico), `toMessage`, `ChatMessage.create` com `rolls`, modos de rolagem (público, privado, cego, próprio), `2d20kh` e `2d20kl`.
- Tabelas: `RollTable#draw`, `RollTable#roll`, estrutura de `results` (`range`, tipo e referência a documento), criação de resultados com `flags`.
- Compêndios: `game.packs`, `pack.getIndex({fields})`, `pack.getDocument`, `fromUuid`, `fromUuidSync`, `Item.createDocuments` com `pack`.
- Hooks: `renderChatMessageHTML` (ou o equivalente atual), `combatTurnChange`, `preUpdateActor`, `updateActor`, `createActor`, `hotbarDrop`, `getChatMessageContextOptions`.
- Combate: `CONFIG.Combat.initiative`, ordenação de combatentes e desempate, `Combatant#getInitiativeRoll`.
- Estados: `CONFIG.statusEffects` (formato atual), `Actor#toggleStatusEffect`, `Actor#statuses`.
- Config: `game.settings.register` e `registerMenu`, `game.socket`, `game.i18n.localize` e `format`, renderização e pré-carregamento de templates Handlebars, registro de helpers.
- Utilitários: `foundry.utils` (`mergeObject`, `getProperty`, `setProperty`, `deepClone`, `randomID`, `equals`).
- Manifestos: campos citados na seção 2 e 3 deste arquivo.

Se alguma API da lista não existir ou tiver mudado, **pare e ajuste a especificação em `docs/DECISIONS.md`** antes de seguir, em vez de improvisar.
