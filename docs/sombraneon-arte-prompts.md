# SombraNeon: prompts de arte para tokens e ícones

Catálogo de **279 imagens** (mais 6 reaproveitadas) para os compêndios do módulo **SombraNeon: Compêndio** e da aventura **Carga Sem Nome**: ameaças, ICE e IAs, runners prontos, armas, armaduras, equipamento, implantes, veículos, mechas e módulos, e os itens das aventuras Noite das Máscaras e Carga Sem Nome. Gerado por `tools/art/build-prompts.mjs` a partir de `data/art/catalog.mjs`. Para mudar um prompt, edite o catálogo e rode o script de novo.

## 1. Direção de arte (a mesma dos livros)

Vetor 2D chapado, contorno preto grosso e liso, cinzas em blocos, sem hachura, sem degradê e sem textura de lápis. **Tudo em cinza, inclusive pele, rosto, mãos, cabelo, roupa e fundo, exceto uma única cor de destaque, intensa e brilhante, usada com parcimônia num ponto de foco.** Sem texto, letras, números ou logotipos.

Blocos fixos que entram em todo prompt:

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking.
Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.
No text, no lettering, no numbers, no logos, no watermark.
```

### Dois formatos

| Formato | Uso | Enquadramento | Pós-processamento |
|---|---|---|---|
| **token** | Atores: ameaças, ICE, IAs, runners, elenco | Retrato da cintura para cima (humanos) ou figura inteira (máquinas e criaturas), centrado, 75% do quadro, fundo cinza liso | Recorte circular com anel na cor de destaque (PNG/WebP 400 px). Serve de retrato **e** de token do ator |
| **item** | Armas, armaduras, equipamento, implantes, veículos, módulos, itens de aventura | Objeto único em três quartos, 75% do quadro, silhueta forte que lê em 64 px, fundo cinza liso | Redução para 512 px (WebP) |

Fundo: cinza claro chapado (`#CFCFD4`), sem degradê, sem chão e sem sombra projetada. Em geração: **1:1, 1K, Google Nano Banana 2.1 (Magnific)**, uma imagem por chamada.

### Cor de destaque por família

| Família | Cor | Observação |
|---|---|---|
| Armas brancas | blood red | |
| Armas de fogo, ferramentas | amber yellow | |
| Armas pesadas, de veículo, granadas, militares | hot orange | |
| Armaduras, decks, ciberneticos, IAs | electric cyan | |
| Médico e reparo, módulos de veículo, fauna, malware | acid green | |
| ICE, gangues | hot magenta | |
| Implantes neurais, cultos, festa | electric violet | |
| Lei e segurança, corporações | electric blue | |

## 2. Como gerar e instalar

1. Para cada linha, cole o prompt no Magnific (modelo Nano Banana 2.1, 1:1, 1K).
2. Salve com o nome do arquivo indicado na tabela, em `art-origem/<compêndio>/` (ex.: `art-origem/armas/faca.png`).
3. Rode `python tools/art/process-art.py` (recorta os tokens em círculo, reduz os ícones e grava em `modules/<pacote>/assets/arte/`).
4. Rode `npm run verify`. O mapeamento imagem -> documento está em `data/art/index.mjs`, aplicado na compilação dos compêndios.

## 3. Resumo

| Compêndio | Pacote | Formato | Imagens |
|---|---|---|---|
| Armas | Compêndio | item | 37 |
| Armaduras | Compêndio | item | 3 |
| Equipamento | Compêndio | item | 29 |
| Implantes (Cromo) | Compêndio | item | 28 |
| Veículos, Mechas e Drones | Compêndio | item | 58 |
| ICE e Malware | Compêndio | token | 17 |
| Ameaças | Compêndio | token | 66 |
| Fichas Prontas | Compêndio | token | 6 |
| Noite das Máscaras: Elenco e Inimigos | Compêndio | token | 1 |
| Noite das Máscaras: Runners Prontos | Compêndio | token | 6 |
| Noite das Máscaras: Itens e Butim | Compêndio | item | 16 |
| Carga Sem Nome: Ameaças | Carga Sem Nome | token | 4 |
| Carga Sem Nome: NPCs e aliados | Carga Sem Nome | token | 2 |
| Carga Sem Nome: Equipamentos | Carga Sem Nome | item | 4 |
| Carga Sem Nome: Tesouros e Prêmio | Carga Sem Nome | item | 2 |
| **Total** | | | **279** |

Reaproveitadas (sem gerar):

- `module/noite-elenco/seguranca-corporativa` usa a imagem de `module/ameacas/seguranca-corporativa`.
- `module/noite-elenco/drone-de-vigilancia` usa a imagem de `module/ameacas/drone-de-vigilancia`.
- `carga/carga-equipamentos/item-furgao-tavares` usa a imagem de `module/veiculos/van-de-carga`.
- `carga/carga-equipamentos/item-motos-tavares` usa a imagem de `module/veiculos/moto-urbana`.
- `carga/carga-equipamentos/item-granadas` usa a imagem de `module/equipamento/granada-de-fragmentacao`.
- `carga/carga-equipamentos/item-carga-demolicao` usa a imagem de `module/equipamento/carga-de-demolicao`.

Fora do escopo (já têm arte própria das aventuras): elenco e NPCs com retrato (Dona Ruth, Rex, Lívia, Teo, Nest, Daigo, Voss...), ameaças de Carga Sem Nome com arte, retratos dos runners de Carga, itens com arte (Cache de Ruth, Rosto Livre, Dossiê, Kit de Resgate etc.). Classes, origens, antecedentes, alinhamentos, características, talentos e programas continuam com os ícones do sistema.

## 4. Prompts

### 4.1 Armas (Compêndio)

**Armas brancas** · cor de destaque: blood red · formato: item

#### S001 · Faca

Arquivo: `arte/armas/faca.webp` · destino: `module/armas/faca`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a tactical combat knife with a serrated spine, wrapped grip and a short guard, lying diagonally. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on a thin glowing line along the cutting edge. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S002 · Soqueira

Arquivo: `arte/armas/soqueira.webp` · destino: `module/armas/soqueira`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy chrome knuckle duster with four finger holes and short studs on the front. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the studs on the front. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S003 · Bastão de choque

Arquivo: `arte/armas/bastao-de-choque.webp` · destino: `module/armas/bastao-de-choque`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a collapsible shock baton with a ribbed handle and a forked electrode tip. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the arc of current between the two electrode prongs. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S004 · Katana monofio

Arquivo: `arte/armas/katana-monofio.webp` · destino: `module/armas/katana-monofio`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a katana in a plain black wrapped hilt with a perfectly straight blade, a hairline monofilament edge. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the hairline edge glowing along the whole blade. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S005 · Marreta cibernética

Arquivo: `arte/armas/marreta-cibernetica.webp` · destino: `module/armas/marreta-cibernetica`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a two-handed sledgehammer with a block head, a hydraulic piston running up the shaft and a counterweight at the base. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the hydraulic piston. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Armas de fogo e inteligentes** · cor de destaque: amber yellow · formato: item

#### S006 · Pistola leve

Arquivo: `arte/armas/pistola-leve.webp` · destino: `module/armas/pistola-leve`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a slim compact handgun with a short barrel and a small magazine, side profile. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the muzzle. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S007 · Pistola pesada

Arquivo: `arte/armas/pistola-pesada.webp` · destino: `module/armas/pistola-pesada`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a large heavy handgun with a thick slide, a long barrel and a big magazine, side profile. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the muzzle and the front sight. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S008 · Submetralhadora

Arquivo: `arte/armas/submetralhadora.webp` · destino: `module/armas/submetralhadora`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a compact submachine gun with a long curved magazine, a folding stock and a short barrel, side profile. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the magazine window. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S009 · Escopeta

Arquivo: `arte/armas/escopeta.webp` · destino: `module/armas/escopeta`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a pump-action combat shotgun with a short barrel, a ribbed pump grip and a shell holder on the stock. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the shell holder shells. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S010 · Fuzil

Arquivo: `arte/armas/fuzil.webp` · destino: `module/armas/fuzil`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an assault rifle with a red-dot optic, a curved magazine and a short stock, side profile. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the optic lens. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S011 · Rifle de precisão

Arquivo: `arte/armas/rifle-de-precisao.webp` · destino: `module/armas/rifle-de-precisao`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a long precision sniper rifle with a big scope, a bipod folded under the barrel and a cheek rest, side profile. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the scope lens. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S012 · Arma inteligente

Arquivo: `arte/armas/arma-inteligente.webp` · destino: `module/armas/arma-inteligente`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a smart pistol with a small camera-eye module on top of the slide, a cable running to a wrist link and a floating holographic reticle in front. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the holographic reticle. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Armas pesadas pessoais** · cor de destaque: hot orange · formato: item

#### S013 · Metralhadora leve

Arquivo: `arte/armas/metralhadora-leve.webp` · destino: `module/armas/metralhadora-leve`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a belt-fed light machine gun with a bipod, a perforated barrel shroud and an ammunition box hanging below. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the ammunition belt. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S014 · Lança-granadas

Arquivo: `arte/armas/lanca-granadas.webp` · destino: `module/armas/lanca-granadas`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a revolver-style grenade launcher with a fat rotating drum, a short barrel and a pistol grip, side profile. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the grenade tips in the drum. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S015 · Lança-foguetes

Arquivo: `arte/armas/lanca-foguetes.webp` · destino: `module/armas/lanca-foguetes`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a shoulder-fired rocket launcher: a long open tube with a front flare, a rear venturi, a grip and a simple sight. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the rocket nose inside the tube. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S016 · Rifle anti-material

Arquivo: `arte/armas/rifle-anti-material.webp` · destino: `module/armas/rifle-anti-material`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an enormous anti-materiel rifle with a huge muzzle brake, a thick barrel, a bipod and a big scope, side profile. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the muzzle brake. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S017 · Minigun

Arquivo: `arte/armas/minigun.webp` · destino: `module/armas/minigun`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a six-barrel rotary minigun with a carry handle and a thick ammunition feed hose to a backpack drum. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the spinning barrel cluster tips. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S018 · Lança-chamas

Arquivo: `arte/armas/lanca-chamas.webp` · destino: `module/armas/lanca-chamas`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a flamethrower with two cylindrical fuel tanks on a back frame, a hose and a gun-like nozzle with a pilot flame. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the pilot flame at the nozzle. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S019 · Rifle de trilho portátil

Arquivo: `arte/armas/rifle-de-trilho-portatil.webp` · destino: `module/armas/rifle-de-trilho-portatil`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy portable railgun rifle with two parallel metal rails along the barrel, capacitor coils and a stock. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the capacitor coils between the rails. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S020 · Canhão de plasma portátil

Arquivo: `arte/armas/canhao-de-plasma-portatil.webp` · destino: `module/armas/canhao-de-plasma-portatil`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a bulky shoulder plasma cannon with a wide glass-like chamber, cooling fins and a flared muzzle. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the plasma inside the chamber. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S021 · Lança-mísseis portátil

Arquivo: `arte/armas/lanca-misseis-portatil.webp` · destino: `module/armas/lanca-misseis-portatil`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a shoulder-fired guided missile launcher: a boxy tube, a folded guidance optic on the side and a battery pack. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the guidance optic. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S022 · Morteiro portátil

Arquivo: `arte/armas/morteiro-portatil.webp` · destino: `module/armas/morteiro-portatil`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a portable mortar: a short smooth tube on a round base plate with two bipod legs and a sight dial, a shell next to it. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the shell tip. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Armas de veículo e de cerco** · cor de destaque: hot orange · formato: item

#### S023 · Metralhadora leve (veículo)

Arquivo: `arte/armas/metralhadora-leve-veiculo.webp` · destino: `module/armas/metralhadora-leve-veiculo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a vehicle-mounted light machine gun on a swivel pintle post with an ammunition box and a small armor plate. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the muzzle flash hider. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S024 · Lança-granadas (veículo)

Arquivo: `arte/armas/lanca-granadas-veiculo.webp` · destino: `module/armas/lanca-granadas-veiculo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a vehicle-mounted automatic grenade launcher on a swivel mount with a round ammo drum. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the grenade drum. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S025 · Metralhadora pesada

Arquivo: `arte/armas/metralhadora-pesada.webp` · destino: `module/armas/metralhadora-pesada`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy machine gun on a pedestal mount with a shield plate, an ammo belt and a heavy barrel. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the ammo belt. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S026 · Canhão automático (30 mm)

Arquivo: `arte/armas/canhao-automatico-30-mm.webp` · destino: `module/armas/canhao-automatico-30-mm`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a 30 mm autocannon in a small stabilised turret with a long barrel and a belt feed. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the muzzle. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S027 · Lançador de foguetes

Arquivo: `arte/armas/lancador-de-foguetes.webp` · destino: `module/armas/lancador-de-foguetes`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a rocket pod with a grid of twelve round tubes on a swivel mount. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the rocket noses in the tubes. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S028 · Lançador de mísseis

Arquivo: `arte/armas/lancador-de-misseis.webp` · destino: `module/armas/lancador-de-misseis`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a twin missile rack on a swivel mount, two slender missiles with fins. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the missile seeker heads. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S029 · Canhão EMP

Arquivo: `arte/armas/canhao-emp.webp` · destino: `module/armas/canhao-emp`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a vehicle-mounted EMP cannon: a wide parabolic dish emitter with coils on an armored arm. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the emitter coil in the dish. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S030 · Canhão antiaéreo duplo

Arquivo: `arte/armas/canhao-antiaereo-duplo.webp` · destino: `module/armas/canhao-antiaereo-duplo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a twin anti-aircraft cannon on a rotating mount with two long parallel barrels and a gunner seat. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the two muzzles. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S031 · Lançador de mísseis SAM

Arquivo: `arte/armas/lancador-de-misseis-sam.webp` · destino: `module/armas/lancador-de-misseis-sam`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a surface-to-air missile launcher: four large missile canisters on a rotating platform, tilted upward. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the missile noses. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S032 · Morteiro pesado

Arquivo: `arte/armas/morteiro-pesado.webp` · destino: `module/armas/morteiro-pesado`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy vehicle mortar: a thick tube on a recoil cradle with a baseplate and shells stacked beside it. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the shell tips. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S033 · Canhão de tanque (120 mm)

Arquivo: `arte/armas/canhao-de-tanque-120-mm.webp` · destino: `module/armas/canhao-de-tanque-120-mm`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a tank gun: a long barrel with a muzzle brake and a thermal sleeve, emerging from a turret mantlet. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the muzzle brake. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S034 · Laser pesado

Arquivo: `arte/armas/laser-pesado.webp` · destino: `module/armas/laser-pesado`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy laser cannon on a turret with a large focusing lens, cooling radiators and thick power cables. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the focusing lens. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S035 · Canhão de trilho

Arquivo: `arte/armas/canhao-de-trilho.webp` · destino: `module/armas/canhao-de-trilho`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a massive vehicle railgun with two huge parallel rails, a capacitor bank and a mount ring. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the capacitor bank. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S036 · Obus autopropulsado

Arquivo: `arte/armas/obus-autopropulsado.webp` · destino: `module/armas/obus-autopropulsado`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a self-propelled howitzer gun: a long barrel with a bore evacuator and a muzzle brake raised on a cradle, with a short armored mount. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the muzzle brake. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S037 · Lançador múltiplo de foguetes

Arquivo: `arte/armas/lancador-multiplo-de-foguetes.webp` · destino: `module/armas/lancador-multiplo-de-foguetes`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a multiple rocket launcher: two rows of large rocket tubes on a tilted rack. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the rocket noses. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.2 Armaduras (Compêndio)

**Armaduras** · cor de destaque: electric cyan · formato: item

#### S038 · Jaqueta blindada

Arquivo: `arte/armaduras/jaqueta-blindada.webp` · destino: `module/armaduras/jaqueta-blindada`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an armored street jacket with a high collar, shoulder pads and stitched ballistic panels, hanging on an invisible hanger, front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on a thin glowing seam along the collar. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S039 · Colete tático

Arquivo: `arte/armaduras/colete-tatico.webp` · destino: `module/armaduras/colete-tatico`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a tactical plate-carrier vest with front plate, shoulder straps, modular pouches and a radio clip, front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the central plate edge. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S040 · Armadura corp pesada

Arquivo: `arte/armaduras/armadura-corp-pesada.webp` · destino: `module/armaduras/armadura-corp-pesada`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a full heavy corporate armor suit: helmet with a slit visor, chunky chest plate, shoulder guards, thigh and shin plates, standing on a stand. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the visor slit. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.3 Equipamento (Compêndio)

**Decks, firewall e nanokit** · cor de destaque: electric cyan · formato: item

#### S041 · Deck de rua

Arquivo: `arte/equipamento/deck-de-rua.webp` · destino: `module/equipamento/deck-de-rua`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a battered homemade cyberdeck: a thick case with an exposed circuit board, a cracked small screen, patchwork stickers (abstract shapes) and dangling cables. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the cracked screen. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S042 · Deck corp

Arquivo: `arte/equipamento/deck-corp.webp` · destino: `module/equipamento/deck-corp`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a sleek corporate cyberdeck: a slim aluminium slab with a thin keyboard row, a clean screen and a row of status lights. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the screen. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S043 · Deck militar

Arquivo: `arte/equipamento/deck-militar.webp` · destino: `module/equipamento/deck-militar`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a ruggedized military cyberdeck in an armored briefcase frame with rubber bumpers, a folded antenna and heavy port covers. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the screen. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S044 · Firewall

Arquivo: `arte/equipamento/firewall.webp` · destino: `module/equipamento/firewall`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a small shield-shaped data cartridge with a contact edge, being held ready for insertion. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the shield-shaped core. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S045 · Nanokit

Arquivo: `arte/equipamento/nanokit.webp` · destino: `module/equipamento/nanokit`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an open hard case with foam slots holding injector vials of silvery fluid and a pen-shaped nanite injector. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the vials. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Médico e reparo** · cor de destaque: acid green · formato: item

#### S046 · Kit cirúrgico

Arquivo: `arte/equipamento/kit-cirurgico.webp` · destino: `module/equipamento/kit-cirurgico`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a surgical case opened flat with scalpels, clamps, a bone saw and a small suture reel on a tray. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on one scalpel edge. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S047 · Kit médico

Arquivo: `arte/equipamento/kit-medico.webp` · destino: `module/equipamento/kit-medico`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a medical first aid bag with a zipper, a plus-shaped patch (no text), a strap and a bandage roll sticking out. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the plus-shaped patch. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S048 · Stim

Arquivo: `arte/equipamento/stim.webp` · destino: `module/equipamento/stim`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a stim auto-injector: a stubby pen-like injector with a clear window showing liquid and a safety cap. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the liquid in the window. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S049 · Gel de reparo

Arquivo: `arte/equipamento/gel-de-reparo.webp` · destino: `module/equipamento/gel-de-reparo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a squeezable tube of repair gel with a screw cap and a dollop of gel on the nozzle, next to a small metal patch. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the gel dollop. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S050 · PMB (braço)

Arquivo: `arte/equipamento/pmb-braco.webp` · destino: `module/equipamento/pmb-braco`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a basic mechanical prosthetic arm: a simple exposed-frame arm with a plain claw hand and a shoulder socket plate. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the shoulder socket joint. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S051 · PMB (perna)

Arquivo: `arte/equipamento/pmb-perna.webp` · destino: `module/equipamento/pmb-perna`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a basic mechanical prosthetic leg: an exposed-frame leg with a spring knee, a pylon shin and a flat foot, plus a thigh socket. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the knee joint. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Ferramentas e suprimentos** · cor de destaque: amber yellow · formato: item

#### S052 · Kit de ferramentas

Arquivo: `arte/equipamento/kit-de-ferramentas.webp` · destino: `module/equipamento/kit-de-ferramentas`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a rolled-open tool pouch holding wrenches, a lockpick set, a pry bar, a multitool and a small soldering pen. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the lockpick tips. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S053 · Rig de palco

Arquivo: `arte/equipamento/rig-de-palco.webp` · destino: `module/equipamento/rig-de-palco`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a portable stage rig: a compact synthesizer keyboard with knobs, a mic stand clip and a light bar on a folding stand. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the light bar. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S054 · Lanterna

Arquivo: `arte/equipamento/lanterna.webp` · destino: `module/equipamento/lanterna`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy tactical flashlight with a knurled body, a wide lens head and a wrist loop. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the beam coming out of the lens. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S055 · Bateria

Arquivo: `arte/equipamento/bateria.webp` · destino: `module/equipamento/bateria`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a rectangular heavy-duty power cell battery with terminals on top and a charge indicator window. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the charge indicator window. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S056 · Carregador

Arquivo: `arte/equipamento/carregador.webp` · destino: `module/equipamento/carregador`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a pistol magazine with a few cartridges next to it, side view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the cartridge tips. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S057 · Cabo de interface

Arquivo: `arte/equipamento/cabo-de-interface.webp` · destino: `module/equipamento/cabo-de-interface`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a coiled interface cable with a neural jack plug on both ends. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the jack plug tips. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S058 · Rádio

Arquivo: `arte/equipamento/radio.webp` · destino: `module/equipamento/radio`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a rugged handheld radio with a stub antenna, a speaker grille, a dial and a push-to-talk button. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the antenna tip. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S059 · Ração (3)

Arquivo: `arte/equipamento/racao.webp` · destino: `module/equipamento/racao`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: three flat sealed ration packs stacked in a fan, with a tear notch and simple abstract pictogram stripes (no text). Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on a stripe on the top pack. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S060 · Rig utilitário

Arquivo: `arte/equipamento/rig-utilitario.webp` · destino: `module/equipamento/rig-utilitario`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a utility rig: a tactical harness vest with a small backpack, belt pouches and carabiners, hanging flat. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the carabiners. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S061 · Kit de Runner

Arquivo: `arte/equipamento/kit-de-runner.webp` · destino: `module/equipamento/kit-de-runner`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an open duffel bag full of runner starter gear: a pistol grip, a rolled harness, a stim pen and a cable coil sticking out. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the stim pen. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Granadas e explosivos** · cor de destaque: hot orange · formato: item

#### S062 · Granada de fragmentação

Arquivo: `arte/equipamento/granada-de-fragmentacao.webp` · destino: `module/equipamento/granada-de-fragmentacao`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a classic fragmentation grenade with a segmented body, a spoon lever and a pin ring. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the pin ring. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S063 · Granada de atordoamento

Arquivo: `arte/equipamento/granada-de-atordoamento.webp` · destino: `module/equipamento/granada-de-atordoamento`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cylindrical stun grenade (flashbang) with a perforated body, a spoon lever and a pin ring. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the burst of light from the perforations. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S064 · Granada de fumaça

Arquivo: `arte/equipamento/granada-de-fumaca.webp` · destino: `module/equipamento/granada-de-fumaca`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a smoke grenade canister with a vented top, a pin ring and smoke curling up from it. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the pin ring. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S065 · Granada EMP

Arquivo: `arte/equipamento/granada-emp.webp` · destino: `module/equipamento/granada-emp`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an EMP grenade with a coil-wrapped body, crackling arcs of current around it and a pin ring. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the crackling arcs. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S066 · Granada de termita

Arquivo: `arte/equipamento/granada-de-termita.webp` · destino: `module/equipamento/granada-de-termita`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a thermite grenade with a thick cylindrical body, a vented cap and molten drips falling from it. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the molten drips. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S067 · Granada de gás

Arquivo: `arte/equipamento/granada-de-gas.webp` · destino: `module/equipamento/granada-de-gas`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a gas grenade canister with a hazard trefoil stripe (no text), a vented top and a pin ring, wisps of gas leaking. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the leaking wisps. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S068 · Carga de demolição

Arquivo: `arte/equipamento/carga-de-demolicao.webp` · destino: `module/equipamento/carga-de-demolicao`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a demolition charge: two bricks of plastic explosive strapped together with a detonator block, wires and a timer window (no digits). Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the detonator block. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S069 · Mina antipessoal

Arquivo: `arte/equipamento/mina-antipessoal.webp` · destino: `module/equipamento/mina-antipessoal`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a round anti-personnel landmine disc with a central pressure plate, three small prongs and a half-buried look. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the pressure plate. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.4 Implantes (Cromo) (Compêndio)

**Implantes neurais** · cor de destaque: electric violet · formato: item

#### S070 · Reflexos neurais

Arquivo: `arte/implantes/reflexos-neurais.webp` · destino: `module/implantes/reflexos-neurais`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a small neural reflex chip: a square processor with fine thread-like wires fanning out and pins along the bottom. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the chip core. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S071 · Alvejador neural

Arquivo: `arte/implantes/alvejador-neural.webp` · destino: `module/implantes/alvejador-neural`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic eye module with a targeting reticle ring and a small rangefinder lens. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the targeting reticle. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S072 · Potencializador mental

Arquivo: `arte/implantes/potencializador-mental.webp` · destino: `module/implantes/potencializador-mental`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a stylised brain-shaped circuit chip with a lightning-bolt boost notch and contacts. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the lightning-bolt notch. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S073 · Jack de interface

Arquivo: `arte/implantes/jack-de-interface.webp` · destino: `module/implantes/jack-de-interface`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a neural interface jack socket set in a metal plate behind a stylised ear, with a plug cable half inserted. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the socket opening. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S074 · Filtro de dor

Arquivo: `arte/implantes/filtro-de-dor.webp` · destino: `module/implantes/filtro-de-dor`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a small disc-shaped pain dampener implant with a spiral groove and fine wires, next to a short spine segment. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the spiral groove. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S075 · Olhos térmicos

Arquivo: `arte/implantes/olhos-termicos.webp` · destino: `module/implantes/olhos-termicos`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a pair of cybernetic eyes with segmented thermal lenses, joined by a bridge plate. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the two lenses. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S076 · Memória estendida

Arquivo: `arte/implantes/memoria-estendida.webp` · destino: `module/implantes/memoria-estendida`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a stack of three memory module slabs with a connector edge and a small label stripe (no text). Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the middle slab edge. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Implantes de corpo** · cor de destaque: acid green · formato: item

#### S077 · Subderme blindada

Arquivo: `arte/implantes/subderme-blindada.webp` · destino: `module/implantes/subderme-blindada`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a patch of armored subdermal plating: overlapping thin metal scales on a curved skin-like backing. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the plate seams. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S078 · Quadro cinético

Arquivo: `arte/implantes/quadro-cinetico.webp` · destino: `module/implantes/quadro-cinetico`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a kinetic frame: a lightweight exoskeletal rib-and-spine lattice that braces the torso. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the spine joints. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S079 · Coração cibernético

Arquivo: `arte/implantes/coracao-cibernetico.webp` · destino: `module/implantes/coracao-cibernetico`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic heart: a mechanical heart with pistons, pipes and a clear chamber. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the clear chamber. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S080 · Protocolo social

Arquivo: `arte/implantes/protocolo-social.webp` · destino: `module/implantes/protocolo-social`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a social protocol implant: a small voice-box and facial muscle driver, a throat module with a tiny speaker and fine wires. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the tiny speaker. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S081 · Contrapeso

Arquivo: `arte/implantes/contrapeso.webp` · destino: `module/implantes/contrapeso`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a counterweight implant: a compact dense metal block mounted on a spine bracket with load straps. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the mounting bracket. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S082 · Sistema de estimulantes

Arquivo: `arte/implantes/sistema-de-estimulantes.webp` · destino: `module/implantes/sistema-de-estimulantes`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a stimulant system: three small vial chambers connected by thin tubes to an injector node. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the vial fluid. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S083 · Pulmões filtrantes

Arquivo: `arte/implantes/pulmoes-filtrantes.webp` · destino: `module/implantes/pulmoes-filtrantes`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a pair of filtering lungs: two lung-shaped canisters with filter cartridges and tubing joined at a trachea piece. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the filter cartridges. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Implantes de braços** · cor de destaque: blood red · formato: item

#### S084 · Arma retrátil

Arquivo: `arte/implantes/arma-retratil.webp` · destino: `module/implantes/arma-retratil`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic forearm with a hidden short blade-gun slot opening, the blade half extended. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the extended blade. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S085 · Mão tática

Arquivo: `arte/implantes/mao-tatica.webp` · destino: `module/implantes/mao-tatica`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic hand with a pistol barrel emerging from the palm, fingers retracted. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the barrel in the palm. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S086 · Garras de pressão

Arquivo: `arte/implantes/garras-de-pressao.webp` · destino: `module/implantes/garras-de-pressao`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic hand with four heavy steel crushing claws and hydraulic tendons. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the hydraulic tendons. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S087 · Mão de precisão

Arquivo: `arte/implantes/mao-de-precisao.webp` · destino: `module/implantes/mao-de-precisao`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a slender cybernetic hand with fine tool-tipped fingers, a tiny magnifier lens and a micro screwdriver tip. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the micro tool tips. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S088 · Escudo cinético

Arquivo: `arte/implantes/escudo-cinetico.webp` · destino: `module/implantes/escudo-cinetico`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic forearm with an unfolded kinetic shield plate, an energy field outline around it. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the energy field outline. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S089 · Cabo-gancho

Arquivo: `arte/implantes/cabo-gancho.webp` · destino: `module/implantes/cabo-gancho`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic forearm with a grappling cable launcher, a magnetic anchor hook extended on a line. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the magnetic anchor hook. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S090 · Injetor embutido

Arquivo: `arte/implantes/injetor-embutido.webp` · destino: `module/implantes/injetor-embutido`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic forearm with a small flip-open injector bay holding a stim, a needle ready. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the stim vial. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Implantes de pernas** · cor de destaque: amber yellow · formato: item

#### S091 · Molas de salto

Arquivo: `arte/implantes/molas-de-salto.webp` · destino: `module/implantes/molas-de-salto`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a pair of cybernetic legs with big spring coils at the calves and shock-absorbing pistons. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the spring coils. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S092 · Motor de sprint

Arquivo: `arte/implantes/motor-de-sprint.webp` · destino: `module/implantes/motor-de-sprint`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic leg with a compact motor block at the hip and a drive belt running to the knee. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the motor block. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S093 · Passos silenciosos

Arquivo: `arte/implantes/passos-silenciosos.webp` · destino: `module/implantes/passos-silenciosos`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic leg ending in a padded, soft-soled foot with damping foam inserts at the heel and sole. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the damping inserts. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S094 · Estabilizadores

Arquivo: `arte/implantes/estabilizadores.webp` · destino: `module/implantes/estabilizadores`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic leg with gyroscopic stabiliser rings at the ankle and knee. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the gyroscopic rings. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S095 · Âncoras magnéticas

Arquivo: `arte/implantes/ancoras-magneticas.webp` · destino: `module/implantes/ancoras-magneticas`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic foot with magnetic anchor discs on the sole, sticking to a steel plate. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the magnetic discs. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S096 · Sub-rotina de passo

Arquivo: `arte/implantes/sub-rotina-de-passo.webp` · destino: `module/implantes/sub-rotina-de-passo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic leg with a small processor module on the thigh and fine wires running down to the joints, motion-blur ghost outlines of a sidestep. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the processor module. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S097 · Pernas de combate

Arquivo: `arte/implantes/pernas-de-combate.webp` · destino: `module/implantes/pernas-de-combate`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a pair of reinforced cybernetic combat legs with armored shin plates, steel-toed boots and strong hydraulic knees. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the knee hydraulics. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.5 Veículos, Mechas e Drones (Compêndio)

**Módulos de drone** · cor de destaque: electric cyan · formato: item

#### S098 · Sensor térmico

Arquivo: `arte/veiculos/sensor-termico.webp` · destino: `module/veiculos/sensor-termico`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a drone sensor module: a round thermal camera pod with a lens and mounting clamp, a heat-map style ring behind it. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the lens. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S099 · Compartimento de carga

Arquivo: `arte/veiculos/compartimento-de-carga.webp` · destino: `module/veiculos/compartimento-de-carga`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a drone cargo compartment: a small sealed box with a hinged lid half open, with a small package inside. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the package inside. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S100 · Placa de impacto

Arquivo: `arte/veiculos/placa-de-impacto.webp` · destino: `module/veiculos/placa-de-impacto`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a drone impact plate: a curved armor shell plate with bolts and a mounting bracket. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the bolts. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Veículos terrestres civis** · cor de destaque: amber yellow · formato: item

#### S101 · Scooter elétrica

Arquivo: `arte/veiculos/scooter-eletrica.webp` · destino: `module/veiculos/scooter-eletrica`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an electric kick scooter-moped with a small battery deck, a handlebar and small wheels, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the headlight. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S102 · Moto urbana

Arquivo: `arte/veiculos/moto-urbana.webp` · destino: `module/veiculos/moto-urbana`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an urban motorcycle with a naked frame, a small windscreen, an exposed engine and a round headlight, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the headlight. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S103 · Moto tática

Arquivo: `arte/veiculos/moto-tatica.webp` · destino: `module/veiculos/moto-tatica`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a tactical motorcycle with a low black fairing, armored side panels and a rifle holster, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the headlight. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S104 · Buggy de Zona

Arquivo: `arte/veiculos/buggy-de-zona.webp` · destino: `module/veiculos/buggy-de-zona`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a rugged wasteland buggy with a roll cage, fat tires, a bare engine and a welded scrap plate, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the roll cage lamp. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S105 · Carro compacto

Arquivo: `arte/veiculos/carro-compacto.webp` · destino: `module/veiculos/carro-compacto`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a small boxy city car with round headlights and a roof rack, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the headlights. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S106 · Carro esportivo

Arquivo: `arte/veiculos/carro-esportivo.webp` · destino: `module/veiculos/carro-esportivo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a low wedge-shaped sports car with a sleek canopy and a rear spoiler, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the underglow strip. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S107 · Van de carga

Arquivo: `arte/veiculos/van-de-carga.webp` · destino: `module/veiculos/van-de-carga`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a boxy cargo van with a sliding side door and a rear cargo box, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the headlights. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S108 · Caminhão de transporte

Arquivo: `arte/veiculos/caminhao-de-transporte.webp` · destino: `module/veiculos/caminhao-de-transporte`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy transport truck with a flat cab, a long cargo trailer box and big dual wheels, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the cab headlights. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S109 · Sedan executivo blindado

Arquivo: `arte/veiculos/sedan-executivo-blindado.webp` · destino: `module/veiculos/sedan-executivo-blindado`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a long armored executive sedan with thick tinted windows, a heavy grille without any emblem and bulky armor pillars, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the headlights. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S110 · SUV tático

Arquivo: `arte/veiculos/suv-tatico.webp` · destino: `module/veiculos/suv-tatico`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a tactical armored SUV with a roof light bar, a bull bar and a spare wheel, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the roof light bar. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S111 · Technical (caminhonete armada)

Arquivo: `arte/veiculos/technical-caminhonete-armada.webp` · destino: `module/veiculos/technical-caminhonete-armada`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a pickup truck with a heavy machine gun welded on the bed, scrap armor plates and a roof guard, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the machine gun muzzle. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Veículos aéreos e aquáticos** · cor de destaque: electric cyan · formato: item

#### S112 · Lancha

Arquivo: `arte/veiculos/lancha.webp` · destino: `module/veiculos/lancha`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a fast speedboat with a pointed hull, a small windshield and an outboard engine, throwing a spray, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the spray wake. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S113 · Hoverbike

Arquivo: `arte/veiculos/hoverbike.webp` · destino: `module/veiculos/hoverbike`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a hoverbike: a motorcycle-like body with two antigravity thruster pods under it instead of wheels, hovering above the ground, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the thruster pods glow. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S114 · Drone de transporte

Arquivo: `arte/veiculos/drone-de-transporte.webp` · destino: `module/veiculos/drone-de-transporte`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a large four-rotor transport drone carrying a cargo box slung underneath, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the four rotor rings. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S115 · Aerocarro civil

Arquivo: `arte/veiculos/aerocarro-civil.webp` · destino: `module/veiculos/aerocarro-civil`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a civilian flying car: a rounded car body with two small vertical lift fans on the sides and no wheels visible, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the lift fans. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S116 · Aerocarro corporativo

Arquivo: `arte/veiculos/aerocarro-corporativo.webp` · destino: `module/veiculos/aerocarro-corporativo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a luxury corporate flying car: a sleek elongated body with swept lift ducts and a tinted canopy, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the lift ducts. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S117 · Barco de patrulha

Arquivo: `arte/veiculos/barco-de-patrulha.webp` · destino: `module/veiculos/barco-de-patrulha`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a coastal patrol boat with a light bar, a small deck gun and a covered cabin, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the light bar. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S118 · Helicóptero leve

Arquivo: `arte/veiculos/helicoptero-leve.webp` · destino: `module/veiculos/helicoptero-leve`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a light helicopter with a bubble cockpit, a main rotor and a tail rotor, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the rotor disc edge. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Veículos militares** · cor de destaque: hot orange · formato: item

#### S119 · Caminhão militar

Arquivo: `arte/veiculos/caminhao-militar.webp` · destino: `module/veiculos/caminhao-militar`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a military 6x6 truck with a canvas-covered cargo bed, a heavy bumper and big tires, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the headlights. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S120 · Blindado de transporte (APC)

Arquivo: `arte/veiculos/blindado-de-transporte-apc.webp` · destino: `module/veiculos/blindado-de-transporte-apc`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an eight-wheeled armored personnel carrier with a boxy hull, a small remote weapon station and slit windows, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the weapon station barrel. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S121 · Tanque leve

Arquivo: `arte/veiculos/tanque-leve.webp` · destino: `module/veiculos/tanque-leve`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a light tank with a low hull, narrow tracks and a turret with a medium gun, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the gun muzzle. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S122 · Tanque pesado

Arquivo: `arte/veiculos/tanque-pesado.webp` · destino: `module/veiculos/tanque-pesado`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy main battle tank with a wide hull, thick track skirts and a big turret with a long gun, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the gun muzzle. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S123 · Plataforma de artilharia

Arquivo: `arte/veiculos/plataforma-de-artilharia.webp` · destino: `module/veiculos/plataforma-de-artilharia`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a tracked artillery platform with a large howitzer barrel raised on an armored mount, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the barrel muzzle brake. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S124 · Helicóptero de ataque

Arquivo: `arte/veiculos/helicoptero-de-ataque.webp` · destino: `module/veiculos/helicoptero-de-ataque`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an attack helicopter with a narrow tandem cockpit, stub wings with rocket pods and a chin cannon, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the chin cannon. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S125 · VTOL de assalto

Arquivo: `arte/veiculos/vtol-de-assalto.webp` · destino: `module/veiculos/vtol-de-assalto`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an assault VTOL aircraft with two large tilting ducted rotors, a broad fuselage and side door guns, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the ducted rotors. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S126 · Fragata costeira

Arquivo: `arte/veiculos/fragata-costeira.webp` · destino: `module/veiculos/fragata-costeira`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a coastal frigate warship with a pointed bow, a bow gun, a bridge tower and missile cells, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the bow gun. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Exoesqueletos e mechas** · cor de destaque: hot orange · formato: item

#### S127 · Exoesqueleto de carga

Arquivo: `arte/veiculos/exoesqueleto-de-carga.webp` · destino: `module/veiculos/exoesqueleto-de-carga`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a wearable cargo exoskeleton: an open lifting frame with hydraulic limbs, an operator seat harness and clamp hands, front three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the hydraulic pistons. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S128 · Exoesqueleto de combate

Arquivo: `arte/veiculos/exoesqueleto-de-combate.webp` · destino: `module/veiculos/exoesqueleto-de-combate`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a wearable combat exoskeleton with armor plates, an operator cage, a light weapon arm and hydraulic limbs, front three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the weapon arm. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S129 · Exoesqueleto pesado

Arquivo: `arte/veiculos/exoesqueleto-pesado.webp` · destino: `module/veiculos/exoesqueleto-pesado`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy wearable exoskeleton with thick armor, big shoulder guards, huge hydraulic fists and a closed visor, front three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the hydraulic fists. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S130 · Mecha de carga

Arquivo: `arte/veiculos/mecha-de-carga.webp` · destino: `module/veiculos/mecha-de-carga`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a four-metre cargo mecha: a boxy worker mech with a glass cockpit bubble, two heavy lifting arms and stubby legs, front three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the cockpit bubble. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S131 · Mecha de arena

Arquivo: `arte/veiculos/mecha-de-arena.webp` · destino: `module/veiculos/mecha-de-arena`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a three-and-a-half metre arena fighting mech with armored fists, a rounded helmet head and dented plates, front three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the head sensor. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S132 · Mecha Caminhante (leve)

Arquivo: `arte/veiculos/mecha-caminhante.webp` · destino: `module/veiculos/mecha-caminhante`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a light bipedal walker mech with reverse-jointed legs, a cockpit on top and a small cannon arm, front three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the cannon. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S133 · Mecha Aranha (leve)

Arquivo: `arte/veiculos/mecha-aranha.webp` · destino: `module/veiculos/mecha-aranha`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a light spider mech with four long articulated legs, a low armored cockpit body and a small gun, front three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the cockpit. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S134 · Mecha Cavalo (quadrúpede)

Arquivo: `arte/veiculos/mecha-cavalo.webp` · destino: `module/veiculos/mecha-cavalo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a quadruped mech shaped like a horse with four digitigrade legs, a rider cockpit on the back and a front cannon, three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the cockpit. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S135 · Mecha Sentinela (médio)

Arquivo: `arte/veiculos/mecha-sentinela.webp` · destino: `module/veiculos/mecha-sentinela`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a medium sentinel mech: a bipedal armored mech with a wide chest, a sensor head and twin shoulder cannons, front three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the sensor head. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S136 · Mecha Golias (pesado)

Arquivo: `arte/veiculos/mecha-golias.webp` · destino: `module/veiculos/mecha-golias`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy goliath mech with massive plated legs, huge arms with a gun on each, a small head and shoulder missile racks, front three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the shoulder missile racks. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S137 · Mecha Titã (colosso)

Arquivo: `arte/veiculos/mecha-tita.webp` · destino: `module/veiculos/mecha-tita`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a colossal titan mech towering and monumental, with a fortress-like torso, giant cannons on both arms and a tiny glowing head sensor, low angle view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the head sensor. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Módulos de veículo** · cor de destaque: acid green · formato: item

#### S138 · Blindagem reforçada

Arquivo: `arte/veiculos/modulo-blindagem-reforcada.webp` · destino: `module/veiculos/modulo-blindagem-reforcada`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a stack of thick bolted armor plates with a mounting rail, one plate leaning against the stack. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the bolt heads. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S139 · Pneus e esteiras reforçados

Arquivo: `arte/veiculos/modulo-pneus-e-esteiras-reforcados.webp` · destino: `module/veiculos/modulo-pneus-e-esteiras-reforcados`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy reinforced tire with deep tread beside a short length of tank track, both studded. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the tread studs. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S140 · Motor turbo

Arquivo: `arte/veiculos/modulo-motor-turbo.webp` · destino: `module/veiculos/modulo-motor-turbo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a compact turbocharged engine block with a big snail-shaped turbine, intake pipes and exhaust flare. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the turbine. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S141 · Jammer e ECM

Arquivo: `arte/veiculos/modulo-jammer-e-ecm.webp` · destino: `module/veiculos/modulo-jammer-e-ecm`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a jammer box with three antennas and a radar-like dish emitting wavy concentric arcs. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the concentric arcs. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S142 · Interface neural

Arquivo: `arte/veiculos/modulo-interface-neural.webp` · destino: `module/veiculos/modulo-interface-neural`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a neural interface module: a control box with a jack socket and a cable ending in a neural plug, with a seat headrest cradle. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the jack socket. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S143 · Controle de armas integrado

Arquivo: `arte/veiculos/modulo-controle-de-armas-integrado.webp` · destino: `module/veiculos/modulo-controle-de-armas-integrado`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an integrated weapons control module: a pistol-grip joystick console linked by cables to a small weapon turret icon, a heads-up screen. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the heads-up screen. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S144 · Camuflagem térmica e óptica

Arquivo: `arte/veiculos/modulo-camuflagem-termica-e-optica.webp` · destino: `module/veiculos/modulo-camuflagem-termica-e-optica`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a camouflage module: a panel of hexagonal adaptive tiles fading to transparency at the edge. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the hexagonal tile glow. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S145 · Fumaça e chaff

Arquivo: `arte/veiculos/modulo-fumaca-e-chaff.webp` · destino: `module/veiculos/modulo-fumaca-e-chaff`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a smoke and chaff launcher: a row of four angled tubes with smoke puffs and glittering chaff strips escaping. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the chaff strips. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S146 · Blindagem anti-EMP

Arquivo: `arte/veiculos/modulo-blindagem-anti-emp.webp` · destino: `module/veiculos/modulo-blindagem-anti-emp`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an anti-EMP shielding module: a metal mesh cage box with a lightning bolt deflecting off it. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the deflected lightning bolt. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S147 · Cabine blindada

Arquivo: `arte/veiculos/modulo-cabine-blindada.webp` · destino: `module/veiculos/modulo-cabine-blindada`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an armored cockpit capsule with thick walls, a narrow slit window and a hatch ring. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the slit window. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S148 · Compartimento secreto

Arquivo: `arte/veiculos/modulo-compartimento-secreto.webp` · destino: `module/veiculos/modulo-compartimento-secreto`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a false-bottom secret compartment: a vehicle floor panel lifted at an angle to show a hidden cavity with a package inside. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the package inside the cavity. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S149 · Autonomia estendida

Arquivo: `arte/veiculos/modulo-autonomia-estendida.webp` · destino: `module/veiculos/modulo-autonomia-estendida`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an extended range module: a large fuel tank and a battery bank wired together, a gauge dial on top (no digits). Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the gauge needle. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S150 · Assentos extras

Arquivo: `arte/veiculos/modulo-assentos-extras.webp` · destino: `module/veiculos/modulo-assentos-extras`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: two folding extra seats with harness belts, shown folded out from a wall rail. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the harness buckles. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S151 · Reparo automático

Arquivo: `arte/veiculos/modulo-reparo-automatico.webp` · destino: `module/veiculos/modulo-reparo-automatico`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an auto-repair module: a compact box with two small articulated repair arms, a weld torch and a spray nozzle. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the weld torch spark. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S152 · Sensores

Arquivo: `arte/veiculos/modulo-sensores.webp` · destino: `module/veiculos/modulo-sensores`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a sensor mast with a radar dish, a thermal camera pod and small antennas. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the thermal camera lens. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S153 · Escudo energético

Arquivo: `arte/veiculos/modulo-escudo-energetico.webp` · destino: `module/veiculos/modulo-escudo-energetico`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an energy shield projector: a circular emitter on a short pylon projecting a hexagon-pattern dome outline. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the dome outline. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S154 · Propulsores de salto

Arquivo: `arte/veiculos/modulo-propulsores-de-salto.webp` · destino: `module/veiculos/modulo-propulsores-de-salto`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a pair of jump jet thruster nozzles on a mounting plate, blasting flames downward. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the flames. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S155 · Sistema de ejeção

Arquivo: `arte/veiculos/modulo-sistema-de-ejecao.webp` · destino: `module/veiculos/modulo-sistema-de-ejecao`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an ejection seat firing upward from a cockpit hatch, with a rocket motor under it and the canopy flying off. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the rocket motor flame. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.6 ICE e Malware (Compêndio)

**ICE do livro principal** · cor de destaque: hot magenta · formato: token

#### S156 · Sentinela

Arquivo: `arte/ice/sentinela.webp` · destino: `module/ice/sentinela`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a floating sentry program drawn as a hovering spherical eye with a single watchful pupil, a small antenna and a ring of tiny sensors. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the pupil. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S157 · Enxame

Arquivo: `arte/ice/enxame.webp` · destino: `module/ice/enxame`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a malicious computer virus drawn as a swirling swarm of many small angular cubes and spiked virus particles that glitch and multiply, a purely abstract digital organism with barbed spikes and fractured pixel fragments, absolutely no person, no human figure, no hands, no face. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on a few cubes and spike tips. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S158 · Cão de guarda

Arquivo: `arte/ice/cao-de-guarda.webp` · destino: `module/ice/cao-de-guarda`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a guard-dog program drawn as an angular robotic hound made of wireframe-like plates, jaws open, in an attack stance. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the jaw interior. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S159 · Executor

Arquivo: `arte/ice/executor.webp` · destino: `module/ice/executor`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an executor program drawn as a tall armored humanoid figure with a smooth featureless head and one oversized clenched fist. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the fist. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S160 · Muralha

Arquivo: `arte/ice/muralha.webp` · destino: `module/ice/muralha`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a wall program drawn as a massive golem built from stacked firewall bricks with two small glowing slit eyes. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the eye slits. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**ICE adicional** · cor de destaque: hot magenta · formato: token

#### S161 · Labirinto

Arquivo: `arte/ice/labirinto.webp` · destino: `module/ice/labirinto`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a labyrinth program drawn as a sphere made of maze walls with several false doorways. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on one real doorway. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S162 · Sanguessuga

Arquivo: `arte/ice/sanguessuga.webp` · destino: `module/ice/sanguessuga`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a leech program drawn as a fat cable-body creature latched onto a battery, a round toothed sucker mouth. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the toothed mouth. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S163 · Espelho

Arquivo: `arte/ice/espelho.webp` · destino: `module/ice/espelho`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a mirror program drawn as a tall faceted polygon with a mirror face reflecting a distorted copy of itself. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the reflected copy. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S164 · Cadeado

Arquivo: `arte/ice/cadeado.webp` · destino: `module/ice/cadeado`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a lock program drawn as a giant padlock wrapped in heavy chains with a keyhole eye. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the keyhole. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S165 · Caçador

Arquivo: `arte/ice/cacador.webp` · destino: `module/ice/cacador`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a hunter program drawn as a lean predator hound-like figure with long claws and a single tracking eye on a long snout. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the tracking eye. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S166 · Carrasco

Arquivo: `arte/ice/carrasco.webp` · destino: `module/ice/carrasco`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an executioner program drawn as a hooded tall figure with an empty dark face holding a large data axe. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the axe blade. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S167 · Hidra

Arquivo: `arte/ice/hidra.webp` · destino: `module/ice/hidra`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a hydra program drawn as three serpent heads made of thick cables rising from a single knot, jaws open. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the three heads' eyes. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Malware** · cor de destaque: acid green · formato: token

#### S168 · Spyware

Arquivo: `arte/ice/spyware.webp` · destino: `module/ice/spyware`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a spyware program drawn as a small insect-like bug with a single big camera lens eye and thin legs. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the lens. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S169 · Worm

Arquivo: `arte/ice/worm.webp` · destino: `module/ice/worm`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a worm program drawn as a long segmented worm made of square data blocks, curling. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the head segment. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S170 · Vírus de implante

Arquivo: `arte/ice/virus-de-implante.webp` · destino: `module/ice/virus-de-implante`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an implant virus drawn as a spiky virus particle shaped like a syringe tip, surrounded by tiny implant chips. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the needle tip. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S171 · Ransomware

Arquivo: `arte/ice/ransomware.webp` · destino: `module/ice/ransomware`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a ransomware program drawn as a heavy locked strongbox wrapped in a chain with a padlock and a glowing slot, a demanding open hand beneath it. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the padlock. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S172 · Bomba lógica

Arquivo: `arte/ice/bomba-logica.webp` · destino: `module/ice/bomba-logica`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a logic bomb program drawn as a round bomb with a fuse made of a circuit trace and a small sleeping eye on its surface. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the fuse tip. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.7 Ameaças (Compêndio)

**Gente da rua** · cor de destaque: amber yellow · formato: token

#### S173 · Civil

Arquivo: `arte/ameacas/civil.webp` · destino: `module/ameacas/civil`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an ordinary city dweller in a hooded raincoat clutching a plastic delivery bag, nervous posture, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on a small neon tag on the bag. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S174 · Viciado em stim

Arquivo: `arte/ameacas/viciado-em-stim.webp` · destino: `module/ameacas/viciado-em-stim`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a gaunt twitchy stim addict with huge wide eyes and trembling hands holding a dirty knife, empty injector tubes taped to the forearm, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the wide pupils. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S175 · Fixer

Arquivo: `arte/ameacas/fixer.webp` · destino: `module/ameacas/fixer`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a sharp-dressed fixer in a long coat holding a data slate with a smug half-smile and a small earpiece, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the earpiece. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S176 · Médico de beco

Arquivo: `arte/ameacas/medico-de-beco.webp` · destino: `module/ameacas/medico-de-beco`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a back-alley doctor in a stained apron and magnifier goggles holding a scalpel with a worn medical bag on the shoulder, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the goggle lenses. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S177 · Hacker de rua

Arquivo: `arte/ameacas/hacker-de-rua.webp` · destino: `module/ameacas/hacker-de-rua`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a hunched street hacker in an oversized hoodie typing on a battered cyberdeck balanced on one arm, a cable running to a neck jack, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the deck screen. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Gangues** · cor de destaque: hot magenta · formato: token

#### S178 · Capanga

Arquivo: `arte/ameacas/capanga.webp` · destino: `module/ameacas/capanga`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a gang thug in a patched studded jacket with a heavy brow and a cheap chrome jaw plate, holding a machete in one hand and a pistol in the other, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the chrome jaw plate. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S179 · Atirador de gangue

Arquivo: `arte/ameacas/atirador-de-gangue.webp` · destino: `module/ameacas/atirador-de-gangue`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a gang shooter in a bandana holding a submachine gun sideways at hip height, a bandolier of magazines across the chest, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the muzzle flash. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S180 · Motoqueiro

Arquivo: `arte/ameacas/motoqueiro.webp` · destino: `module/ameacas/motoqueiro`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a gang biker in a spiked leather jacket and goggles sitting on an urban motorcycle and swinging a chain, three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the motorcycle headlight. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S181 · Brutamontes cromado

Arquivo: `arte/ameacas/brutamontes-cromado.webp` · destino: `module/ameacas/brutamontes-cromado`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a huge hulking cyborg bruiser with steel fists, enormous chrome shoulders and a tiny head, swinging a cybernetic sledgehammer, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the cybernetic eye. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S182 · Líder de gangue

Arquivo: `arte/ameacas/lider-de-gangue.webp` · destino: `module/ameacas/lider-de-gangue`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a gang leader in a long coat with a studded collar and a scarred chrome cheek, a katana in one hand and a heavy pistol in the other, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the katana edge. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Lei e segurança** · cor de destaque: electric blue · formato: token

#### S183 · Policial urbano

Arquivo: `arte/ameacas/policial-urbano.webp` · destino: `module/ameacas/policial-urbano`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a patrol police officer in a bulletproof vest and a visored helmet holding a shock baton and a pistol, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric blue) used sparingly only on the helmet visor strip. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S184 · Segurança corporativa

Arquivo: `arte/ameacas/seguranca-corporativa.webp` · destino: `module/ameacas/seguranca-corporativa`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a corporate security guard in a dark suit with a ballistic vest under it, a radio earpiece and a pistol held low, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric blue) used sparingly only on the earpiece. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S185 · Tropa de choque

Arquivo: `arte/ameacas/tropa-de-choque.webp` · destino: `module/ameacas/tropa-de-choque`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a riot trooper in heavy armor behind a big transparent riot shield, holding an anti-riot shotgun, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric blue) used sparingly only on the shield edge. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S186 · Agente corporativo de campo

Arquivo: `arte/ameacas/agente-corporativo-de-campo.webp` · destino: `module/ameacas/agente-corporativo-de-campo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a corporate field agent in a sleek tailored suit with cybernetic eyes, a smart pistol in each hand and a katana sheathed on the back, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric blue) used sparingly only on the cybernetic eyes. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S187 · Atirador de elite

Arquivo: `arte/ameacas/atirador-de-elite.webp` · destino: `module/ameacas/atirador-de-elite`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a sniper kneeling with a long scoped precision rifle, urban tactical gear and a cap, three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric blue) used sparingly only on the scope lens. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S188 · Comandante de segurança

Arquivo: `arte/ameacas/comandante-de-seguranca.webp` · destino: `module/ameacas/comandante-de-seguranca`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a security commander in a long coat with a command headset, holding two heavy pistols, stern face, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric blue) used sparingly only on the headset. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Mercenários e militares** · cor de destaque: hot orange · formato: token

#### S189 · Mercenário

Arquivo: `arte/ameacas/mercenario.webp` · destino: `module/ameacas/mercenario`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a mercenary in mismatched tactical gear with a face-covering scarf holding an assault rifle at the ready, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the rifle optic. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S190 · Soldado de esquadrão

Arquivo: `arte/ameacas/soldado-de-esquadrao.webp` · destino: `module/ameacas/soldado-de-esquadrao`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a squad soldier in full tactical armor with a helmet and a thermal visor holding an assault rifle, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the thermal visor. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S191 · Operador de elite

Arquivo: `arte/ameacas/operador-de-elite.webp` · destino: `module/ameacas/operador-de-elite`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a special operations assassin in a sleek matte suit and balaclava holding two silenced pistols with a mono-blade at the hip, faint shimmer lines of optical camouflage around the body, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the camouflage shimmer lines. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S192 · Comandante de esquadrão

Arquivo: `arte/ameacas/comandante-de-esquadrao.webp` · destino: `module/ameacas/comandante-de-esquadrao`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a squad commander in heavy armor with an antenna on the helmet, holding a rifle with a grenade on the belt, pointing orders, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the helmet antenna. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S193 · Soldado de linha pesada

Arquivo: `arte/ameacas/soldado-de-linha-pesada.webp` · destino: `module/ameacas/soldado-de-linha-pesada`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy line soldier inside a hulking exoskeleton with a light machine gun mounted on one arm and a hydraulic fist on the other, three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the hydraulic pistons. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Cibernéticos, sintéticos e aberrações** · cor de destaque: electric cyan · formato: token

#### S194 · Ciberpsicopata

Arquivo: `arte/ameacas/ciberpsicopata.webp` · destino: `module/ameacas/ciberpsicopata`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a crazed cyberpsycho with far too much chrome, half-metal face, a wild grin and two blades extended from the forearms, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the glowing eye. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S195 · Ciborgue de combate

Arquivo: `arte/ameacas/ciborgue-de-combate.webp` · destino: `module/ameacas/ciborgue-de-combate`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a military combat cyborg, mostly military chrome, tactical hand-guns built into both palms and blade arms folded back, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the sensor eye. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S196 · Assassino fantasma

Arquivo: `arte/ameacas/assassino-fantasma.webp` · destino: `module/ameacas/assassino-fantasma`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a ghost assassin in a hooded dark bodysuit holding a silent blade, parts of the body fading into thin outline lines, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the fading outline. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S197 · Android de segurança

Arquivo: `arte/ameacas/android-de-seguranca.webp` · destino: `module/ameacas/android-de-seguranca`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a factory-made humanoid security android with a smooth matte faceplate, gray plated chassis and reinforced fists, standing at attention, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the scanning eye strip. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S198 · Replicante fugitivo

Arquivo: `arte/ameacas/replicante-fugitivo.webp` · destino: `module/ameacas/replicante-fugitivo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a runaway replicant that looks fully human, worn hoodie, a barcode-like tattoo on the neck (bars only, no digits), glancing over the shoulder, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the barcode tattoo. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S199 · Android fugitivo

Arquivo: `arte/ameacas/android-fugitivo.webp` · destino: `module/ameacas/android-fugitivo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a runaway domestic android in a stolen long coat and hat, visible seams at the joints and a plain faceplate, holding a heavy wrench, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the eye. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S200 · Caçador de sintéticos

Arquivo: `arte/ameacas/cacador-de-sinteticos.webp` · destino: `module/ameacas/cacador-de-sinteticos`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a synthetic hunter in a long trench coat holding a handheld scanner in one hand and a shock baton in the other, a heavy pistol on the belt, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the scanner screen. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S201 · Mutante da Zona

Arquivo: `arte/ameacas/mutante-da-zona.webp` · destino: `module/ameacas/mutante-da-zona`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a mutated wasteland dweller with elongated clawed arms, patchy plated skin and tattered clothes, a radiation hazard patch on the shoulder, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the glowing eyes. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S202 · Experimento fugido

Arquivo: `arte/ameacas/experimento-fugido.webp` · destino: `module/ameacas/experimento-fugido`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a lab experiment gone wild: a hulking body with three thrashing tentacles, broken lab restraints and tubes dangling from it, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the bioluminescent veins. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S203 · Abominação

Arquivo: `arte/ameacas/abominacao.webp` · destino: `module/ameacas/abominacao`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a giant abomination, a mass of flesh and metal filling the whole frame, many limbs, pipes, bolted plates and a cluster of eyes. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the cluster of eyes. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Máquinas** · cor de destaque: blood red · formato: token

#### S204 · Drone de vigilância

Arquivo: `arte/ameacas/drone-de-vigilancia.webp` · destino: `module/ameacas/drone-de-vigilancia`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a small flying surveillance drone: a spherical body with one large camera lens and four small rotors, three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the lens. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S205 · Drone de combate

Arquivo: `arte/ameacas/drone-de-combate.webp` · destino: `module/ameacas/drone-de-combate`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a compact armed combat drone with two ring rotors and an autocannon under the belly, three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the gun muzzle. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S206 · Enxame de drones

Arquivo: `arte/ameacas/enxame-de-drones.webp` · destino: `module/ameacas/enxame-de-drones`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a swirling cloud of tiny stinger micro-drones forming one buzzing swarm shape. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on a few sting tips. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S207 · Torreta

Arquivo: `arte/ameacas/torreta.webp` · destino: `module/ameacas/torreta`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a fixed machine-gun turret on a tripod pedestal with a sensor dome and an ammunition belt, three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the sensor dome. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S208 · Cão cibernético

Arquivo: `arte/ameacas/cao-cibernetico.webp` · destino: `module/ameacas/cao-cibernetico`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cybernetic guard dog with a steel jaw and exposed hydraulic legs, mid-lunge, side view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the eye. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S209 · Robô de segurança

Arquivo: `arte/ameacas/robo-de-seguranca.webp` · destino: `module/ameacas/robo-de-seguranca`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a bipedal security robot with a matte hull, a taser rod in one hand and a blocky head with a single visor slit, full figure. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the visor slit. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S210 · Robô pesado de combate

Arquivo: `arte/ameacas/robo-pesado-de-combate.webp` · destino: `module/ameacas/robo-pesado-de-combate`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy combat robot with an armored hull, two hand cannons and a shoulder missile pod, full figure. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the missile pod. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Fauna urbana** · cor de destaque: acid green · formato: token

#### S211 · Enxame de ratos

Arquivo: `arte/ameacas/enxame-de-ratos.webp` · destino: `module/ameacas/enxame-de-ratos`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a surging swarm of sewer rats piled together into one heaving mass, many tails and teeth. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the glowing eyes of a few rats. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S212 · Cão feral

Arquivo: `arte/ameacas/cao-feral.webp` · destino: `module/ameacas/cao-feral`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a thin feral street dog with ribs showing and torn ears, snarling, side view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (acid green) used sparingly only on the eyes. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Corporações e hackers** · cor de destaque: electric blue · formato: token

#### S213 · Executivo corporativo

Arquivo: `arte/ameacas/executivo-corporativo.webp` · destino: `module/ameacas/executivo-corporativo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a corporate executive in an expensive suit with slicked-back hair and a confident smile, holding a compact pistol, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric blue) used sparingly only on the smart watch. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S214 · Diretor

Arquivo: `arte/ameacas/diretor.webp` · destino: `module/ameacas/diretor`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a corporate director in a long coat with a heavy pistol in hand, imposing posture, a ring of faint holographic lines around them, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric blue) used sparingly only on the holographic lines. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S215 · Netrunner corporativo

Arquivo: `arte/ameacas/netrunner-corporativo.webp` · destino: `module/ameacas/netrunner-corporativo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a corporate netrunner in a neat office uniform with a sleek corp deck strapped to the forearm and a neural cable at the temple, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric blue) used sparingly only on the deck display. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S216 · Netrunner mestre

Arquivo: `arte/ameacas/netrunner-mestre.webp` · destino: `module/ameacas/netrunner-mestre`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a master netrunner in a long cloak of cables with a military deck on the back and glowing jack ports along the neck and temples, hands raised mid-hack, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric blue) used sparingly only on the jack ports. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Cultos** · cor de destaque: electric violet · formato: token

#### S217 · Fiel

Arquivo: `arte/ameacas/fiel.webp` · destino: `module/ameacas/fiel`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cult follower in a plain robe with a small chrome pendant holding a rough knife, a devout stare, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the pendant. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S218 · Zelote

Arquivo: `arte/ameacas/zelote.webp` · destino: `module/ameacas/zelote`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cult zealot in a robe patched with armor plates holding a spiked baton and a pistol, a fanatical grin, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the spiked baton. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S219 · Sacerdote

Arquivo: `arte/ameacas/sacerdote.webp` · destino: `module/ameacas/sacerdote`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cult priest in an ornate robe holding a ritual staff, a halo-shaped ring implant glowing behind the head, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the halo ring. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S220 · Profeta

Arquivo: `arte/ameacas/profeta.webp` · destino: `module/ameacas/profeta`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a cult prophet with a tall crown-like headpiece of antennas, two ritual blades and arms spread wide, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the antenna crown. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**IAs** · cor de destaque: electric cyan · formato: token

#### S221 · Mordomo

Arquivo: `arte/ameacas/mordomo.webp` · destino: `module/ameacas/mordomo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a polite domestic AI butler drawn as a slim chrome bust with a simple expressive display face and a floating white-gloved hand. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the display face. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S222 · Zeladora

Arquivo: `arte/ameacas/zeladora.webp` · destino: `module/ameacas/zeladora`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a caretaker building AI drawn as a gentle holographic bust made of fine wire lines holding a ring of keys, small camera eyes floating around it. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the keys. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S223 · Eco

Arquivo: `arte/ameacas/eco.webp` · destino: `module/ameacas/eco`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a fugitive AI drawn as a ghostly outline figure flickering between a small drone body and a speaker, repeated faint echo outlines trailing behind. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the echo outlines. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S224 · Madre

Arquivo: `arte/ameacas/madre.webp` · destino: `module/ameacas/madre`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a hospital AI drawn as a large matriarchal face on a wall screen with surgical robot arms reaching out and an IV drip beside it. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the face on the screen. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S225 · Argos

Arquivo: `arte/ameacas/argos.webp` · destino: `module/ameacas/argos`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a surveillance AI drawn as a face made of dozens of camera lenses arranged on a dark disc. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on one lens. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S226 · Cobalto

Arquivo: `arte/ameacas/cobalto.webp` · destino: `module/ameacas/cobalto`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a bank AI drawn as a cold geometric face on a round vault door, with concentric lock rings and coin-shaped eyes (no symbols or text). Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the coin-shaped eyes. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S227 · Oráculo

Arquivo: `arte/ameacas/oraculo.webp` · destino: `module/ameacas/oraculo`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a prediction AI drawn as a huge floating crystalline eye above a city grid, orbit rings around it. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric cyan) used sparingly only on the eye. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

**Veículos e mechas hostis** · cor de destaque: blood red · formato: token

#### S228 · Viatura da Guarda

Arquivo: `arte/ameacas/viatura-da-guarda.webp` · destino: `module/ameacas/viatura-da-guarda`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a city guard patrol car with a roof light bar and a push bar, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the light bar. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S229 · Technical de gangue

Arquivo: `arte/ameacas/technical-de-gangue.webp` · destino: `module/ameacas/technical-de-gangue`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a gang technical pickup with a heavy machine gun welded to the bed and scrap armor plates, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the machine gun muzzle. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S230 · Drone-aranha

Arquivo: `arte/ameacas/drone-aranha.webp` · destino: `module/ameacas/drone-aranha`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a spider-legged combat drone with six legs and a central gun pod, three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the gun pod. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S231 · Blindado de transporte

Arquivo: `arte/ameacas/blindado-de-transporte.webp` · destino: `module/ameacas/blindado-de-transporte`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an armored personnel carrier with a boxy hull and a remote weapon station, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the weapon station. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S232 · Mecha Caminhante

Arquivo: `arte/ameacas/mecha-caminhante.webp` · destino: `module/ameacas/mecha-caminhante`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a light bipedal walker mech with reverse-jointed legs and a small cannon arm, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the cannon. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S233 · Mecha Sentinela

Arquivo: `arte/ameacas/mecha-sentinela.webp` · destino: `module/ameacas/mecha-sentinela`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a medium sentinel mech with a wide chest, a sensor head and twin shoulder cannons, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the sensor head. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S234 · Tanque leve

Arquivo: `arte/ameacas/tanque-leve.webp` · destino: `module/ameacas/tanque-leve`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a light tank with narrow tracks and a turret with a medium gun, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the gun muzzle. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S235 · Helicóptero de ataque

Arquivo: `arte/ameacas/helicoptero-de-ataque.webp` · destino: `module/ameacas/helicoptero-de-ataque`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an attack helicopter with a tandem cockpit, stub wings with rocket pods and a chin cannon, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the chin cannon. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S236 · Mecha Golias

Arquivo: `arte/ameacas/mecha-golias.webp` · destino: `module/ameacas/mecha-golias`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a heavy goliath mech with massive plated legs, big gun arms and shoulder missile racks, three-quarter front view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the missile racks. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S237 · Mecha Titã

Arquivo: `arte/ameacas/mecha-tita.webp` · destino: `module/ameacas/mecha-tita`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a colossal titan mech with a fortress-like torso and giant cannons, low angle, towering. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the head sensor. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S238 · Torreta sentinela autônoma

Arquivo: `arte/ameacas/torreta-sentinela-autonoma.webp` · destino: `module/ameacas/torreta-sentinela-autonoma`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an autonomous sentinel turret: a tall armored pedestal with a rotating twin autocannon head and a camera dome. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (blood red) used sparingly only on the camera dome. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.8 Fichas Prontas (Compêndio)

**Runners prontos (uma por classe)** · cor de destaque: amber yellow · formato: token

#### S239 · Brasa

Arquivo: `arte/fichas-prontas/brasa.webp` · destino: `module/fichas-prontas/brasa`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: Brasa, a Solo: a broad-shouldered chromed street soldier with subdermal plating glinting through the cheek, a tactical vest and a heavy pistol held low, cautious eyes, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the chrome cheek plate. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S240 · Vetor

Arquivo: `arte/fichas-prontas/vetor.webp` · destino: `module/fichas-prontas/vetor`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: Vetor, a Netrunner: a lean natural human in a hoodie with a neural jack cable at the temple and a custom deck on the forearm, sly smile, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the deck screen. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S241 · Sutura

Arquivo: `arte/fichas-prontas/sutura.webp` · destino: `module/fichas-prontas/sutura`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: Sutura, a Hyperdoc: a biomod medic with a surgical apron over a jacket, magnifier goggles pushed up, an injector gun in hand and stitched scars, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the injector gun. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S242 · Névoa

Arquivo: `arte/fichas-prontas/nevoa.webp` · destino: `module/fichas-prontas/nevoa`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: Névoa, a Ghost: a sleek android courier in a hooded jacket with a smooth faceplate and visible joint seams, crouched ready to run, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the eye strip. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S243 · Riff

Arquivo: `arte/fichas-prontas/riff.webp` · destino: `module/fichas-prontas/riff`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: Riff, a Rocker: a natural-born club DJ and guitarist with spiky hair, a studded jacket and a portable synth-guitar slung across the chest, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the instrument's light strip. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S244 · Zangão

Arquivo: `arte/fichas-prontas/zangao.webp` · destino: `module/fichas-prontas/zangao`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: Zangão, a Rigger: a chromed mechanic pilot in coveralls with tool pockets, goggles on the forehead and two small drones hovering at the shoulders, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the two drones. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.9 Noite das Máscaras: Elenco e Inimigos (Compêndio)

**Elenco: O Curador** · cor de destaque: amber yellow · formato: token

#### S245 · O Curador

Arquivo: `arte/noite-elenco/o-curador.webp` · destino: `module/noite-elenco/o-curador`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a civil gallery guard in a neat uniform with a pin-on tag, passionate about art, holding a small tablet and standing next to a gallery pedestal, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the tablet screen. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.10 Noite das Máscaras: Runners Prontos (Compêndio)

**Runners da festa (retratos com a máscara na mão)** · cor de destaque: electric violet · formato: token

#### S246 · Ferrugem

Arquivo: `arte/noite-fichas/ferrugem.webp` · destino: `module/noite-fichas/ferrugem`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: Ferrugem, a Solo in a rented tuxedo too tight over a chrome frame, rusty chrome fingers holding a skull-shaped holographic mask at the hip, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the holographic skull mask. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S247 · Pixel

Arquivo: `arte/noite-fichas/pixel.webp` · destino: `module/noite-fichas/pixel`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: Pixel, a Netrunner android in a slim evening jacket with a faint seam line along the jaw, holding a pumpkin-shaped LED mask, a tablet under the arm, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the LED mask. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S248 · Agulha

Arquivo: `arte/noite-fichas/agulha.webp` · destino: `module/noite-fichas/agulha`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: Agulha, a replicant Hyperdoc in an elegant gown-like dress with a hidden surgical case and a fox-shaped circuit mask held in hand, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the circuit fox mask. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S249 · Sombra

Arquivo: `arte/noite-fichas/sombra.webp` · destino: `module/noite-fichas/sombra`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: Sombra, a biomod Ghost in dark formal wear with a glass cat-shaped holographic mask on the face, long gloves, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the glass cat mask. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S250 · Estática

Arquivo: `arte/noite-fichas/estatica.webp` · destino: `module/noite-fichas/estatica`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: Estática, a natural Rocker DJ in a sparkling jacket with a synth case slung on the shoulder and a prism-shaped glass mask held up, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the prism mask. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S251 · Faísca

Arquivo: `arte/noite-fichas/faisca.webp` · destino: `module/noite-fichas/faisca`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: Faísca, a chromed Rigger pilot in a formal pilot-executive suit with a moth-shaped LED mask on the face and a tiny folded drone brooch on the lapel, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the moth LED mask. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.11 Noite das Máscaras: Itens e Butim (Compêndio)

**Itens da festa** · cor de destaque: electric violet · formato: item

#### S252 · Pistola de polímero (descartável)

Arquivo: `arte/noite-itens/pistola-de-polimero.webp` · destino: `module/noite-itens/pistola-de-polimero`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a disposable polymer pistol: a translucent, stubby two-shot handgun with no metal parts, visibly one-use. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the muzzle. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S253 · Embaralhador

Arquivo: `arte/noite-itens/embaralhador.webp` · destino: `module/noite-itens/embaralhador`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a serial scrambler: a small pocket device with a ribbed casing, a clip, and a row of small switches, a thin signal wave coming out. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the signal wave. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S254 · Pele cosmética descartável

Arquivo: `arte/noite-itens/pele-cosmetica-descartavel.webp` · destino: `module/noite-itens/pele-cosmetica-descartavel`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a disposable cosmetic skin: a thin peel-off sheet of synthetic skin partly unrolled over a mannequin hand. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the peel edge. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S255 · Máscara holográfica (Caveira de neon)

Arquivo: `arte/noite-itens/mascara-caveira-de-neon.webp` · destino: `module/noite-itens/mascara-caveira-de-neon`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a holographic party mask shaped like a neon skull, a thin visor-type mask with a glowing outline. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the skull outline. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S256 · Máscara holográfica (Raposa de circuito)

Arquivo: `arte/noite-itens/mascara-raposa-de-circuito.webp` · destino: `module/noite-itens/mascara-raposa-de-circuito`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a holographic party mask shaped like a fox with circuit traces across the muzzle and ears. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the circuit traces. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S257 · Máscara holográfica (Abóbora de LED)

Arquivo: `arte/noite-itens/mascara-abobora-de-led.webp` · destino: `module/noite-itens/mascara-abobora-de-led`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a holographic party mask shaped like a pumpkin with a carved LED grin and eye holes. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the LED grin. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S258 · Máscara holográfica (Gato de vidro)

Arquivo: `arte/noite-itens/mascara-gato-de-vidro.webp` · destino: `module/noite-itens/mascara-gato-de-vidro`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a holographic party mask shaped like a cat, made of glass-like faceted planes with pointed ears. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the glass edges. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S259 · Máscara holográfica (Prisma de vidro)

Arquivo: `arte/noite-itens/mascara-prisma-de-vidro.webp` · destino: `module/noite-itens/mascara-prisma-de-vidro`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a holographic party mask shaped like a prism: a faceted triangular glass mask splitting light into stripes. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the light stripes. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S260 · Máscara holográfica (Mariposa de LED)

Arquivo: `arte/noite-itens/mascara-mariposa-de-led.webp` · destino: `module/noite-itens/mascara-mariposa-de-led`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a holographic party mask shaped like a moth with wing-like extensions made of LED strips. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the LED wing strips. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S261 · Bengala-bastão

Arquivo: `arte/noite-itens/bengala-bastao.webp` · destino: `module/noite-itens/bengala-bastao`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a fancy walking cane with a silver knob and a hidden shock baton electrode slot at the tip. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the electrode tip. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S262 · Charuteira (pistola de polímero)

Arquivo: `arte/noite-itens/charuteira.webp` · destino: `module/noite-itens/charuteira`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: an elegant cigar case, partly open, hiding a small disposable polymer pistol among the cigars. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the pistol grip. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S263 · Bisturis de cerâmica (3)

Arquivo: `arte/noite-itens/bisturis-de-ceramica.webp` · destino: `module/noite-itens/bisturis-de-ceramica`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: three ceramic scalpels fanned out of a slim leather case, white blades. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the blade edges. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S264 · Lâmina de cerâmica (bota)

Arquivo: `arte/noite-itens/lamina-de-ceramica.webp` · destino: `module/noite-itens/lamina-de-ceramica`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a high-heeled boot with a ceramic blade sliding out from the heel, next to the hidden blade. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the ceramic blade. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S265 · Broche (drone dobrado)

Arquivo: `arte/noite-itens/broche-drone.webp` · destino: `module/noite-itens/broche-drone`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a moth-shaped jewelry brooch that is a folded micro drone, with tiny rotor wings tucked in. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the tiny rotors. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S266 · Registro de acessos do crachá

Arquivo: `arte/noite-itens/registro-de-acessos-do-cracha.webp` · destino: `module/noite-itens/registro-de-acessos-do-cracha`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a data readout of access records: a floating translucent card with rows of lines and a highlighted row. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the highlighted row. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S267 · Uísque de barril de servidor

Arquivo: `arte/noite-itens/uisque-de-barril-de-servidor.webp` · destino: `module/noite-itens/uisque-de-barril-de-servidor`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a glass tumbler of whisky with a few ice cubes, next to a small oak barrel shaped like a server rack unit. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (electric violet) used sparingly only on the whisky. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.12 Carga Sem Nome: Ameaças (Carga Sem Nome)

**Cães de Vidro, Guarda e droid** · cor de destaque: hot magenta · formato: token

#### S268 · Capanga dos Cães de Vidro

Arquivo: `arte/carga-ameacas/capanga-caes.webp` · destino: `carga/carga-ameacas/capanga-caes`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a Glass Dogs gang thug with mismatched second-hand chrome limbs and proud scars, a patched jacket and a pistol, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the chrome limbs. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S269 · Atirador dos Cães de Vidro

Arquivo: `arte/carga-ameacas/atirador-caes.webp` · destino: `carga/carga-ameacas/atirador-caes`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a Glass Dogs gang shooter with a chrome arm and a bandana, aiming a submachine gun, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the chrome arm. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S270 · Policial urbano da Guarda

Arquivo: `arte/carga-ameacas/policial-urbano.webp` · destino: `carga/carga-ameacas/policial-urbano`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a city guard police officer in a clean uniform with a bulletproof vest, a visored helmet and a shock baton, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the helmet visor strip. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S271 · Droid de combate

Arquivo: `arte/carga-ameacas/droid-combate.webp` · destino: `carga/carga-ameacas/droid-combate`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a flat combat droid the size of a coffee table with two ring rotors, a weapon module under the belly and one unblinking eye, three-quarter view. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot magenta) used sparingly only on the unblinking eye. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.13 Carga Sem Nome: NPCs e aliados (Carga Sem Nome)

**NPCs** · cor de destaque: amber yellow · formato: token

#### S272 · Eurico (motorista do Jararaca)

Arquivo: `arte/carga-npcs/motorista-jararaca.webp` · destino: `carga/carga-npcs/motorista-jararaca`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: Eurico, a civilian truck driver in work overalls and a cap with tired eyes, gripping a steering wheel strap, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the cap badge. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S273 · A Tesoureira do Mercado

Arquivo: `arte/carga-npcs/tesoureira.webp` · destino: `carga/carga-npcs/tesoureira`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: the Treasurer of the Market: a precise middle-aged woman in a neat suit with a ledger tablet, a tight smile and cold eyes, a credit stick between her fingers, waist-up. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (amber yellow) used sparingly only on the credit stick. No global lighting spill, only sharp graphic highlights. Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges, so the image can be cropped into a circle. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.14 Carga Sem Nome: Equipamentos (Carga Sem Nome)

**Equipamentos** · cor de destaque: hot orange · formato: item

#### S274 · Maçarico de Brecha

Arquivo: `arte/carga-equipamentos/item-macarico-brecha.webp` · destino: `carga/carga-equipamentos/item-macarico-brecha`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a breaching torch: a pistol-grip cutting torch with a thin fuel hose, a tank and a small bright flame at the tip. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the flame. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S275 · Manta Faraday

Arquivo: `arte/carga-equipamentos/item-manta-faraday.webp` · destino: `carga/carga-equipamentos/item-manta-faraday`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a rolled Faraday blanket: a metallic mesh-lined blanket half unrolled with a wire-mesh texture. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the mesh sheen. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S276 · Rádio Interceptor da Guarda

Arquivo: `arte/carga-equipamentos/item-radio-interceptor.webp` · destino: `carga/carga-equipamentos/item-radio-interceptor`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a guard radio interceptor: a handheld scanner with a folded antenna, a headset jack and a small waveform screen. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the waveform screen. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S277 · Coletes e crachás da Ouroboros

Arquivo: `arte/carga-equipamentos/item-cracha-manutencao.webp` · destino: `carga/carga-equipamentos/item-cracha-manutencao`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: three maintenance vests with hanging ID badges, simple strips and a hard hat on top (no text, no logos). Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the badges. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

### 4.15 Carga Sem Nome: Tesouros e Prêmio (Carga Sem Nome)

**Tesouros** · cor de destaque: hot orange · formato: item

#### S278 · Célula de potência militar

Arquivo: `arte/carga-tesouros/item-celula-militar.webp` · destino: `carga/carga-tesouros/item-celula-militar`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a military power cell: a heavy rugged cylindrical battery with handles, thick terminals and a warning stripe (no text). Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the terminals. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```

#### S279 · Núcleo do Cérbero

Arquivo: `arte/carga-tesouros/item-nucleo-cerbero.webp` · destino: `carga/carga-tesouros/item-nucleo-cerbero`

```text
Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking. Subject: a robot core: a glowing sphere inside a protective cage frame with cooling fins and cables, extracted from a robot chest. Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (hot orange) used sparingly only on the sphere. No global lighting spill, only sharp graphic highlights. Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges. Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic. No text, no lettering, no numbers, no logos, no watermark.
```
