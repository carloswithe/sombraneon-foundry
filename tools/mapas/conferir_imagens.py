#!/usr/bin/env python3
"""Confere as imagens do modulo: existencia, dimensoes exatas e miniaturas.

Uso: python3 scripts/conferir_imagens.py <pasta-do-modulo>
Sai com codigo 1 se algum mapa estiver ausente ou com tamanho diferente de largura*100 x altura*100.
"""
import json
import pathlib
import sys

from PIL import Image


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        return 2
    modulo = pathlib.Path(sys.argv[1])
    mapas = json.loads(pathlib.Path("trabalho/mapas.json").read_text(encoding="utf-8"))
    reg = modulo / "assets" / "placeholders.json"
    ph = set(json.loads(reg.read_text(encoding="utf-8"))) if reg.exists() else set()
    erros, finais = [], 0
    for m in mapas:
        p = modulo / "assets" / "maps" / m["arquivo"]
        t = modulo / "assets" / "thumbs" / m["arquivo"]
        if not p.exists():
            erros.append(f'{m["id"]}: falta {p}')
            continue
        tam = Image.open(p).size
        if tam != (m["px_w"], m["px_h"]):
            erros.append(f'{m["id"]}: tamanho {tam[0]}x{tam[1]}, esperado {m["px_w"]}x{m["px_h"]}')
        if not t.exists():
            erros.append(f'{m["id"]}: falta a miniatura')
        elif Image.open(t).size[0] != 480:
            erros.append(f'{m["id"]}: miniatura com largura diferente de 480')
        if m["id"] not in ph:
            finais += 1
    print(f"{len(mapas)} mapas conferidos: {finais} com arte final, {len(ph)} placeholders, {len(erros)} erros")
    for e in erros:
        print("ERRO:", e)
    return 1 if erros else 0


if __name__ == "__main__":
    sys.exit(main())
