# Compêndio de Mapas Aleatórios: mapeamento

Mapeamento entre o plano (`docs/sombraneon-compendio-mapas-foundry-instrucoes.md`) e o que foi construído dentro do módulo `sombraneon-compendium`. Plano usado: **A (compêndios compilados)**, com o `@foundryvtt/foundryvtt-cli` do repositório (`tools/build-packs.mjs`).

## Decisão de estrutura

O plano pedia um módulo novo, `sombraneon-compendio-mapas`. A decisão do usuário foi **incluir o compêndio no módulo existente**, `sombraneon-compendium`. Por isso:

| Plano | Aqui |
|---|---|
| módulo `sombraneon-compendio-mapas` | pacote existente `sombraneon-compendium` |
| packs `cenas`, `diarios`, `tabelas`, `macros` | `mapas-cenas`, `mapas-diarios`, `mapas-tabelas`, `mapas-macros` (prefixo `mapas-`, como `noite-` e `carga-`) |
| `packFolders` "SombraNeon: Mapas" | pasta "Mapas Aleatórios" no `module.json` |
| `src/packs/*.yml` e `src/patches/paredes/*.yml` | `data/content/mapas/index.mjs` (conteúdo), `catalogo.json` (extração do catálogo) e `paredes.json` (paredes aprovadas) |
| `tools/validar.mjs` | `tools/validate.mjs` do repositório, mais `tests/ui/mapas-compendio.test.mjs` |
| `lang/pt-BR.json`, `styles/*.css`, `scripts/main.mjs` próprios | reaproveita o `sombraneon-compendium.mjs`, onde ficam as duas funções dos macros |
| `fid()` (SHA-1, base 62) do plano | `docId()` do repositório (`tools/lib/ids.mjs`), que também é SHA-1 em base 62 com 16 caracteres, mas com outra semente. Os `_id` do inventário do plano **não** valem aqui; os daqui são estáveis entre builds |
| flags em `flags.sombraneon-compendio-mapas` | `flags.sombraneon-compendium.mapa` |

## Campos da cena (Foundry v13)

Os nomes de campo seguem os que o repositório já usa nos mapas de mesa da Noite das Máscaras (`noite-mapas`) e da Carga Sem Nome, que o `module.json` marca como verificados em 13.351. **Não havia Foundry instalado nesta máquina**, então o esquema real (`resources/app/common`) não foi lido: a Fase 0 do plano ficou por convenção do repositório, não por leitura do esquema.

| Campo do plano | Campo da cena compilada |
|---|---|
| grade quadrada, 100 px, 1,5 m | `grid: { type: 1, size: 100, distance: 1.5, units: 'm', color: '#000000', alpha: 0.25 }` |
| fundo | `background: { src, fit: 'fill' }` |
| miniatura | `thumb` |
| `padding` | `0` |
| `navigation` | `false` |
| visão de token | `tokenVision` |
| exploração de névoa | `fog.exploration` |
| iluminação global e escuridão | `environment.globalLight.enabled` e `environment.darknessLevel` |
| nota de entrada | `notes[0]` (`text: "Entrada dos runners"`, ícone `icons/svg/book.svg`, sem `entryId`) |
| paredes | `walls[].c = [x1, y1, x2, y2]`, com os valores padrão de bloqueio |
| resultado de tabela para cena | `type: 'document'` com `documentUuid` (`Compendium.sombraneon-compendium.mapas-cenas.Scene.<_id>`) |
| página de diário | `text` (`format: 1`, HTML) e `image` (`src`) |
| macro | `type: 'script'`, escopo `global` |

Se o formato de resultado de tabela (`documentUuid`) ou qualquer outro campo não bater com o Foundry real, é o primeiro lugar a olhar. Ver o relatório, seção "Não testado".

## Ferramentas

- `tools/build-packs.mjs`: o índice de referências passou a incluir as cenas de `mapas-cenas` (chave `Scene:m001`), o resultado de tabela aceita `label` e a tabela aceita `description`. Nova opção `--pack=nome1,nome2` recompila só esses packs.
- `tools/validate.mjs`: a cobertura de fórmulas aceita `1d10` e `1d100`.
- `tools/lib/image.mjs`: `imageSize` lê WebP.
- `tests/ui/aventura.test.mjs`: a pasta de packs do módulo agora tem duas entradas (Noite das Máscaras e Mapas Aleatórios).

## Fase 2: paredes

Os scripts vivem na pasta de trabalho da geração (`sombraneon-mapas/scripts/`), não no repositório. O `detectar_paredes.py` do plano foi usado, com duas opções acrescentadas (o padrão continua o original):

- `--limiar-preto N`: brilho abaixo do qual o pixel conta como preto (padrão 48). Em mapas escuros o asfalto e o piso também ficam abaixo de 48 e viravam "parede"; com 24 só o preto puro conta.
- `--massas`: massas pretas grandes (prédios, blocos de parede, mar) e blocos compactos (pilares, colunas) viram **contorno**. O esqueleto de um bloco largo é uma linha no meio dele, não a parede.

Todos os 98 mapas (exceto `m089` e `m090`) rodaram com `--limiar-preto 24 --massas`, e cada sobreposição foi conferida numa folha de 4 mapas. Os 15 reprovados ainda passaram por duas variantes (limiar 44; espessura mínima 0,32 com tolerância 0,2) e continuaram reprovados. Detalhes no relatório.

Cena **com** paredes (`flags.sombraneon-compendium.mapa.paredes: "auto-v1"`): `tokenVision` ligado, `fog.exploration` ligado, iluminação global desligada, escuridão por tom de luz (claro 0, penumbra 0,35, escuro 0,6). Cena **sem** paredes (`"nenhuma"`): visão desligada, névoa desligada, iluminação global ligada, escuridão 0.

## Scripts de apoio

Ficam em `tools/mapas/` (Python, `pip install pillow numpy opencv-python-headless scikit-image`): `extrair_mapas.py` (catálogo para `catalogo.json`), `detectar_paredes.py` (Fase 2, com as opções acrescentadas), `folha_paredes.py` (folha de conferência das sobreposições), `montar_assets.py` e `conferir_imagens.py`. Eles esperam rodar numa pasta de trabalho com `trabalho/mapas.json`, `mapas/` e `thumbs/` (a pasta da geração das imagens), não na raiz do repositório. Para regerar as paredes: rode `detectar_paredes.py <id> --limiar-preto 24 --massas`, confira `revisao/paredes-<id>.png` e atualize `data/content/mapas/paredes.json` só com os mapas aprovados.
