#!/usr/bin/env python3
"""Copia os mapas finais para o modulo e cria placeholders para os que ainda nao existem.

Uso: python3 scripts/montar_assets.py <pasta-do-modulo>
  le   mapas/<arquivo>.webp (e thumbs/<arquivo>.webp, ou gera a miniatura)
  grava <modulo>/assets/maps/<arquivo> e <modulo>/assets/thumbs/<arquivo>
  cria <modulo>/assets/maps/<arquivo> como PLACEHOLDER quando nao ha arte final
  registra os placeholders em <modulo>/assets/placeholders.json (nunca sobrescreve arte colocada a mao)
  --forcar recria os placeholders existentes
"""
import json
import pathlib
import shutil
import sys

from PIL import Image, ImageDraw, ImageFont

FONTES = ["DejaVuSans-Bold.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "Arial Bold.ttf",
          "/System/Library/Fonts/Supplemental/Arial Bold.ttf", "C:/Windows/Fonts/arialbd.ttf"]
ENTRADA_COR = (255, 140, 0)


def fonte(tam):
    for f in FONTES:
        try:
            return ImageFont.truetype(f, tam), True
        except OSError:
            continue
    return ImageFont.load_default(size=tam), False


def texto(t, acentos):
    if acentos:
        return t
    import unicodedata
    return unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()


def placeholder(m):
    W, H = m["px_w"], m["px_h"]
    im = Image.new("RGB", (W, H), (38, 38, 44))
    d = ImageDraw.Draw(im)
    for i in range(0, m["w"] + 1):
        d.line([(i * 100, 0), (i * 100, H)], fill=(112, 112, 124) if i % 5 == 0 else (62, 62, 72), width=3 if i % 5 == 0 else 1)
    for j in range(0, m["h"] + 1):
        d.line([(0, j * 100), (W, j * 100)], fill=(112, 112, 124) if j % 5 == 0 else (62, 62, 72), width=3 if j % 5 == 0 else 1)
    f_pq, ac = fonte(34)
    for i in range(5, m["w"], 5):
        d.text((i * 100 + 8, 8), str(i), fill=(200, 200, 210), font=f_pq)
    for j in range(5, m["h"], 5):
        d.text((8, j * 100 + 8), str(j), fill=(200, 200, 210), font=f_pq)
    esp = 40
    borda = {"sul": [0, H - esp, W, H], "norte": [0, 0, W, esp], "leste": [W - esp, 0, W, H], "oeste": [0, 0, esp, H],
             "centro": [W // 2 - 150, H // 2 + 200, W // 2 + 150, H // 2 + 240]}[m["entrada"]]
    d.rectangle(borda, fill=ENTRADA_COR)
    f_g, ac = fonte(110)
    f_m, _ = fonte(64)
    centro = W // 2
    d.text((centro, H // 2 - 170), texto("PLACEHOLDER", ac), fill=(235, 235, 240), font=f_g, anchor="mm")
    d.text((centro, H // 2 - 40), texto(f'{m["id"]}  {m["nome"]}', ac), fill=(235, 235, 240), font=f_m, anchor="mm")
    d.text((centro, H // 2 + 50), texto(f'grade {m["w"]} x {m["h"]}, 1 casa = 1,5 m, entrada: {m["entrada"]}', ac),
           fill=(190, 190, 200), font=f_m, anchor="mm")
    return im


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 1:
        print(__doc__)
        return 2
    modulo = pathlib.Path(args[0])
    mapas = json.loads(pathlib.Path("trabalho/mapas.json").read_text(encoding="utf-8"))
    dm, dt = modulo / "assets" / "maps", modulo / "assets" / "thumbs"
    dm.mkdir(parents=True, exist_ok=True)
    dt.mkdir(parents=True, exist_ok=True)
    reg_path = modulo / "assets" / "placeholders.json"
    ph = set(json.loads(reg_path.read_text(encoding="utf-8"))) if reg_path.exists() else set()
    finais, novos_ph, mantidos = 0, 0, 0
    for m in mapas:
        src = pathlib.Path("mapas") / m["arquivo"]
        alvo, th = dm / m["arquivo"], dt / m["arquivo"]
        if src.exists():
            shutil.copyfile(src, alvo)
            ts = pathlib.Path("thumbs") / m["arquivo"]
            if ts.exists():
                shutil.copyfile(ts, th)
            else:
                im = Image.open(src).convert("RGB")
                im.resize((480, round(480 * im.size[1] / im.size[0])), Image.LANCZOS).save(th, "WEBP", quality=80)
            ph.discard(m["id"])
            finais += 1
        elif alvo.exists() and m["id"] not in ph:
            mantidos += 1  # arte colocada a mao: nao tocar
        elif alvo.exists() and th.exists() and "--forcar" not in sys.argv:
            continue  # placeholder ja criado antes
        else:
            im = placeholder(m)
            im.save(alvo, "WEBP", quality=80, method=4)
            im.resize((480, round(480 * m["px_h"] / m["px_w"])), Image.LANCZOS).save(th, "WEBP", quality=75)
            ph.add(m["id"])
            novos_ph += 1
    reg_path.write_text(json.dumps(sorted(ph), indent=1), encoding="utf-8")
    print(f"{finais} arte final, {novos_ph} placeholders criados, {mantidos} arquivos manuais mantidos, "
          f"{len(ph)} placeholders no total")
    return 0


if __name__ == "__main__":
    sys.exit(main())
