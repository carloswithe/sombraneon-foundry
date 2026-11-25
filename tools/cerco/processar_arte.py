"""Instala a arte do Magnific no módulo CERCO AO REFÚGIO.

Uso:  python -I tools/cerco/processar_arte.py [--zip caminho-do-zip-do-projeto] [pasta-dos-originais]

--zip  : extrai o zip baixado do projeto no Magnific para os originais, usando tools/cerco/arte.json
         (os nomes dentro do zip terminam no identificador da criação).
Saídas : assets/img (cenas, WebP até 1920 px), assets/portraits (retratos dos runners),
         assets/maps (largura*100 x altura*100 px, alinhado à grade), assets/tokens (400 px,
         recorte circular com anel colorido, definido em arte.json -> tokens) e assets/items (512 px, recorte quadrado, arte.json -> icones).
"""
import io
import json
import sys
import zipfile
from pathlib import Path

from PIL import Image, ImageDraw

AQUI = Path(__file__).resolve().parent
MODULO = AQUI.parents[1] / 'modules/sombraneon-cerco-ao-refugio'
CFG = json.loads((AQUI / 'arte.json').read_text(encoding='utf-8'))
args = sys.argv[1:]
ZIP = None
if args[:1] == ['--zip']:
    ZIP, args = Path(args[1]), args[2:]
ORIG = Path(args[0]) if args else AQUI.parents[1].parent / 'sombraneon-arte/originais'

ANEL = {
    'amber': '#FFB300', 'red': '#FF2D55', 'orange': '#FF6D00', 'cyan': '#00E5FF',
    'magenta': '#FF2BD6', 'green': '#7CFF00', 'violet': '#9D4DFF', 'gold': '#FFD600',
}
PASTA = {'cena': 'cerco-cenas', 'retrato': 'cerco-retratos', 'mapa': 'cerco-mapas'}
TOKEN, SS = 400, 4


def original(item):
    return ORIG / PASTA[item['tipo']] / f"{item['arquivo']}.png"


def extrair(zip_path):
    with zipfile.ZipFile(zip_path) as z:
        nomes = [n for n in z.namelist() if not n.endswith('/')]
        for item in CFG['imagens']:
            achados = [n for n in nomes if Path(n).stem.endswith(item['criacao'])]
            if not achados:
                print('  ausente no zip:', item['arquivo'], item['criacao'])
                continue
            destino = original(item)
            if destino.exists():  # nunca sobrescreve um original (pode ter retoque local)
                continue
            destino.parent.mkdir(parents=True, exist_ok=True)
            Image.open(io.BytesIO(z.read(achados[0]))).convert('RGB').save(destino)


def fazer_token(src, cor):
    big = TOKEN * SS
    img = src.convert('RGBA').resize((big, big), Image.LANCZOS)
    mask = Image.new('L', (big, big), 0)
    pad = int(big * 0.012)
    ImageDraw.Draw(mask).ellipse((pad, pad, big - pad, big - pad), fill=255)
    out = Image.new('RGBA', (big, big), (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    d = ImageDraw.Draw(out)
    anel, preto = int(big * 0.045), int(big * 0.012)
    d.ellipse((pad, pad, big - pad, big - pad), outline=(8, 8, 12, 255), width=preto)
    d.ellipse((pad + preto, pad + preto, big - pad - preto, big - pad - preto), outline=cor, width=anel)
    dentro = pad + preto + anel
    d.ellipse((dentro, dentro, big - dentro, big - dentro), outline=(8, 8, 12, 255), width=preto)
    return out.resize((TOKEN, TOKEN), Image.LANCZOS)


def salvar(img, destino, **kw):
    destino.parent.mkdir(parents=True, exist_ok=True)
    img.save(destino, 'WEBP', method=6, **kw)


def main():
    if ZIP:
        extrair(ZIP)
    faltando, feitos = [], 0
    por_id = {i['id']: i for i in CFG['imagens']}
    for item in CFG['imagens']:
        src = original(item)
        # versao com retoque local tem prioridade sobre a saida direta do gerador
        if not src.exists():
            faltando.append(str(src))
            continue
        with Image.open(src) as im:
            im = im.convert('RGB')
            if item['tipo'] == 'mapa':
                w, h = CFG['grades'][item['id']]
                salvar(im.resize((w * 100, h * 100), Image.LANCZOS),
                       MODULO / 'assets/maps' / f"{item['arquivo']}.webp", quality=86)
            else:
                im.thumbnail((1920, 1920), Image.LANCZOS)
                pasta = 'portraits' if item['tipo'] == 'retrato' else 'img'
                salvar(im, MODULO / 'assets' / pasta / f"{item['arquivo']}.webp", quality=90)
        feitos += 1
    tokens = 0
    for t in CFG['tokens']:
        src = original(por_id[t['de']])
        if not src.exists():
            faltando.append(str(src))
            continue
        with Image.open(src) as im:
            w, h = im.size
            cx, cy, lado = t['cx'] * w, t['cy'] * h, t['lado'] * w
            x0 = min(max(cx - lado / 2, 0), w - lado)
            y0 = min(max(cy - lado / 2, 0), h - lado)
            corte = im.crop((round(x0), round(y0), round(x0 + lado), round(y0 + lado)))
            salvar(fazer_token(corte, ANEL[t['anel']]), MODULO / 'assets/tokens' / f"{t['id']}.webp", quality=92)
        tokens += 1
    for t in CFG.get('icones', []):
        src = original(por_id[t['de']])
        if not src.exists():
            faltando.append(str(src))
            continue
        with Image.open(src) as im:
            w, h = im.size
            lado = t['lado'] * w
            x0 = min(max(t['cx'] * w - lado / 2, 0), w - lado)
            y0 = min(max(t['cy'] * h - lado / 2, 0), h - lado)
            corte = im.convert('RGB').crop((round(x0), round(y0), round(x0 + lado), round(y0 + lado)))
            salvar(corte.resize((512, 512), Image.LANCZOS), MODULO / 'assets/items' / f"{t['id']}.webp", quality=90)
    print(f'{feitos} imagens instaladas, {tokens} tokens, {len(CFG.get("icones", []))} icones; {len(faltando)} faltando')
    for f in faltando:
        print('  falta', f)
    if faltando:
        sys.exit(1)


if __name__ == '__main__':
    main()
