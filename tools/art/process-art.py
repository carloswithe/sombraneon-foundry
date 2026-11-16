"""Processa os originais do Magnific e grava a arte nos módulos do Foundry.

Uso:  python -I tools/art/process-art.py [pasta-dos-originais]

Entrada : <originais>/<compêndio>/<identifier>.png  (1024x1024, 1:1, vindos do Magnific)
Saída   : modules/<pacote>/assets/arte/<compêndio>/<identifier>.webp
  - token (atores): recorte circular com anel na cor de destaque, 400x400, WebP com transparência
  - item  (itens) : ícone quadrado 512x512, WebP

A lista de entradas, o formato e a cor de cada uma vêm de data/art/catalog.json
(gerado por node tools/art/build-prompts.mjs). As reaproveitadas (REUSE) são copiadas daqui.
"""
import json
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
ORIGINALS = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('C:/Users/pichau/Pessoal/sombraneon-arte/originais')
PACKAGES = {'module': 'modules/sombraneon-compendium', 'carga': 'modules/sombraneon-carga-sem-nome'}

RING = {
    'amber': '#FFB300', 'red': '#FF2D55', 'orange': '#FF6D00', 'cyan': '#00E5FF',
    'magenta': '#FF2BD6', 'green': '#7CFF00', 'violet': '#9D4DFF', 'blue': '#2F7BFF',
}
TOKEN_SIZE, ITEM_SIZE, SS = 400, 512, 4

# reaproveitadas: destino -> origem (mantidas em sincronia com data/art/catalog.mjs)
REUSE = [
    ('module/noite-elenco/seguranca-corporativa', 'module/ameacas/seguranca-corporativa'),
    ('module/noite-elenco/drone-de-vigilancia', 'module/ameacas/drone-de-vigilancia'),
    ('carga/carga-equipamentos/item-furgao-tavares', 'module/veiculos/van-de-carga'),
    ('carga/carga-equipamentos/item-motos-tavares', 'module/veiculos/moto-urbana'),
    ('carga/carga-equipamentos/item-granadas', 'module/equipamento/granada-de-fragmentacao'),
    ('carga/carga-equipamentos/item-carga-demolicao', 'module/equipamento/carga-de-demolicao'),
]


def make_token(src: Image.Image, color: str) -> Image.Image:
    big = TOKEN_SIZE * SS
    img = src.convert('RGBA').resize((big, big), Image.LANCZOS)
    mask = Image.new('L', (big, big), 0)
    d = ImageDraw.Draw(mask)
    pad = int(big * 0.012)
    d.ellipse((pad, pad, big - pad, big - pad), fill=255)
    out = Image.new('RGBA', (big, big), (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    d = ImageDraw.Draw(out)
    ring_w = int(big * 0.045)
    black_w = int(big * 0.012)
    # anel colorido, com filete preto por dentro e por fora
    d.ellipse((pad, pad, big - pad, big - pad), outline=(8, 8, 12, 255), width=black_w)
    d.ellipse((pad + black_w, pad + black_w, big - pad - black_w, big - pad - black_w), outline=color, width=ring_w)
    inner = pad + black_w + ring_w
    d.ellipse((inner, inner, big - inner, big - inner), outline=(8, 8, 12, 255), width=black_w)
    return out.resize((TOKEN_SIZE, TOKEN_SIZE), Image.LANCZOS)


def make_item(src: Image.Image) -> Image.Image:
    return src.convert('RGB').resize((ITEM_SIZE, ITEM_SIZE), Image.LANCZOS)


def main() -> None:
    catalog = json.loads((ROOT / 'data/art/catalog.json').read_text(encoding='utf-8'))
    made, missing = 0, []
    for e in catalog:
        src_file = ORIGINALS / e['pack'] / f"{e['id']}.png"
        if not src_file.exists():
            missing.append(str(src_file))
            continue
        dest = ROOT / PACKAGES[e['scope']] / 'assets' / e['file']
        dest.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(src_file) as im:
            if e['kind'] == 'token':
                make_token(im, RING[e['spot']]).save(dest, 'WEBP', quality=90, method=6)
            else:
                make_item(im).save(dest, 'WEBP', quality=88, method=6)
        made += 1
    # tokens redondos feitos a partir de retratos que já existem (recorte quadrado: topo do retrato em pé, centro do deitado)
    for t in json.loads((ROOT / 'data/art/portrait-tokens.json').read_text(encoding='utf-8')):
        src = ROOT / PACKAGES[t['scope']] / 'assets' / t['portrait']
        dest = ROOT / PACKAGES[t['scope']] / 'assets' / 'arte' / t['pack'] / f"{t['id']}.webp"
        if not src.exists():
            missing.append(str(src))
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(src) as im:
            im = im.convert('RGB')
            w, h = im.size
            top = int(h * 0.04) if h > w else 0
            left = 0 if h > w else (w - h) // 2
            side = min(w, h)
            make_token(im.crop((left, top, left + side, top + side)), RING[t['spot']]).save(dest, 'WEBP', quality=90, method=6)
        made += 1
    for to, frm in REUSE:
        t_scope, t_pack, t_id = to.split('/')
        f_scope, f_pack, f_id = frm.split('/')
        src = ROOT / PACKAGES[f_scope] / 'assets' / 'arte' / f_pack / f'{f_id}.webp'
        dest = ROOT / PACKAGES[t_scope] / 'assets' / 'arte' / t_pack / f'{t_id}.webp'
        if not src.exists():
            missing.append(str(src))
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(src, dest)
        made += 1
    print(f'{made} arquivos gravados; {len(missing)} faltando')
    for m in missing:
        print('  falta', m)
    if missing:
        sys.exit(1)


if __name__ == '__main__':
    main()
