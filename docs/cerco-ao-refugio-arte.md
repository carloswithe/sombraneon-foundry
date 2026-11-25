# Arte do CERCO AO REFÚGIO

Gerada em 24/11/2026 no Magnific (Google Nano Banana 2.1), projeto "SombraNeon Cerco ao Refúgio", com os prompts de `docs/cerco-ao-refugio-imagens.md`. Em 25/11/2026 entraram os retratos dos 13 atores que o arquivo de imagens não cobria, com prompts escritos a partir das fichas da aventura no mesmo estilo.

## Onde está cada coisa

| Pasta | Conteúdo |
|---|---|
| `assets/img/` | 25 imagens de cena, handout e item (`img-01` a `img-25`), até 1920 px |
| `assets/portraits/` | 19 retratos verticais: 6 runners (`ret-01` a `ret-06`) e 13 NPCs e ameaças, com o nome igual ao `id` do ator |
| `assets/maps/` | 6 fundos de cena, em `largura*100` por `altura*100` px |
| `assets/tokens/` | 37 tokens redondos com anel colorido, 400 px, nome igual ao `id` do ator |
| `assets/items/` | 4 ícones de item (512 px), recortados das imagens do kit, do embaralhador, do frasco e das passagens |
| `tools/cerco/arte.json` | manifesto: imagem, nome de arquivo, criação no Magnific, recorte e cor de cada token |
| `../sombraneon-arte/originais/cerco-*` (ao lado do repositório) | originais em PNG (fora do módulo) |

As pastas `assets/` são as de `modules/sombraneon-cerco-ao-refugio/`. Refazer a instalação: `python -I tools/cerco/processar_arte.py`

## Mapas

Foram gerados a partir de uma planta desenhada com o layout em grade da aventura, então paredes e portas já batem com a arte e não precisam de ajuste de escala ou posição. Retoques locais: portão leste reposicionado no mapa 01 e faixas brancas removidas nas bordas do mapa 03.

## Cores dos anéis

Runners pela classe (vermelho, ciano, verde, violeta, magenta, laranja). Kessler-Tanaka em verde. NPCs pela cor de destaque da imagem de onde saíram. Cães de Vidro e enxame de ratos em vermelho.

## Retratos e recortes

Todos os atores têm token. Os tokens `ruth`, `jonas`, `clarice`, `brandt`, `coruja`, `iris`, `tomas`, `bia`, `dona-nena`, `capanga`, `seguranca-corporativa`, `cao-cibernetico`, `drone-combate`, `drone-vigilancia`, `torreta` e `van-captura` são recortes de cenas, não retratos dedicados.
