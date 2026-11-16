#!/usr/bin/env python3
"""Junta as sobreposicoes de paredes (revisao/paredes-<id><sufixo>.png) numa folha para conferir varios mapas de uma vez.

Uso: python3 scripts/folha_paredes.py revisao/conf.png m001 m002 m003 m004 [--sufixo _b] [--colunas 2] [--largura 800]
"""
import argparse
import pathlib

from PIL import Image, ImageDraw


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("saida")
    ap.add_argument("ids", nargs="+")
    ap.add_argument("--sufixo", default="")
    ap.add_argument("--colunas", type=int, default=2)
    ap.add_argument("--largura", type=int, default=800)
    a = ap.parse_args()
    cel = []
    for i in a.ids:
        p = pathlib.Path("revisao") / f"paredes-{i}{a.sufixo}.png"
        im = Image.open(p).convert("RGB")
        im = im.resize((a.largura, round(im.size[1] * a.largura / im.size[0])))
        cel.append((i, im))
    alt = max(im.size[1] for _, im in cel) + 22
    cols = min(a.colunas, len(cel))
    lin = -(-len(cel) // cols)
    folha = Image.new("RGB", (cols * (a.largura + 8) + 8, lin * (alt + 8) + 8), (30, 30, 34))
    d = ImageDraw.Draw(folha)
    for n, (i, im) in enumerate(cel):
        x = 8 + (n % cols) * (a.largura + 8)
        y = 8 + (n // cols) * (alt + 8)
        folha.paste(im, (x, y + 20))
        d.text((x + 2, y + 4), i, fill=(255, 255, 255))
    folha.save(a.saida)
    print(a.saida, folha.size)


if __name__ == "__main__":
    main()
