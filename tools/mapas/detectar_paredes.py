#!/usr/bin/env python3
"""FASE 2 (opcional, experimental): detecta paredes pelas faixas pretas grossas do mapa.

Entrada: mapas/<arquivo>.webp (ja na escala final, 100 px por casa)
Saida:   paredes/<id>.json   segmentos [x1, y1, x2, y2] em pixels da cena
         revisao/paredes-<id>.png   sobreposicao em magenta para conferir a olho

Requisitos: pip install numpy opencv-python-headless scikit-image pillow

Uso: python3 scripts/detectar_paredes.py m001 [--espessura-min 0.18] [--tolerancia 0.12]
Portas e janelas NAO sao detectadas: o Mestre ou o Claude Code as marca depois, conferindo a imagem.

Opcoes acrescentadas (o padrao reproduz o comportamento original):
  --limiar-preto N   brilho (0 a 255) abaixo do qual um pixel conta como preto. Padrao 48. Em mapas escuros,
                     onde o asfalto ou o piso tambem e cinza muito escuro, use 20 a 28 para separar so o preto puro.
  --massas           massas pretas grandes (predios, blocos de paredes, mar) viram contorno em vez de esqueleto:
                     o esqueleto de um bloco largo e uma linha no meio dele, nao a parede.
"""
import argparse
import json
import pathlib
import sys

import cv2
import numpy as np
from PIL import Image
from skimage.morphology import skeletonize

VIZ = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]


def tracar(sk):
    """Converte um esqueleto binario em caminhos (listas de (x, y)). Nos: pontos com grau diferente de 2."""
    h, w = sk.shape
    pts = set(zip(*np.nonzero(sk)))  # (y, x)

    def vizinhos(p):
        y, x = p
        return [(y + dy, x + dx) for dy, dx in VIZ if (y + dy, x + dx) in pts]

    grau = {p: len(vizinhos(p)) for p in pts}
    nos = {p for p, g in grau.items() if g != 2}
    visitado_aresta = set()
    caminhos = []

    def andar(inicio, prox):
        cam = [inicio, prox]
        visitado_aresta.add((inicio, prox))
        visitado_aresta.add((prox, inicio))
        atual, anterior = prox, inicio
        while atual not in nos:
            candidatos = [v for v in vizinhos(atual) if v != anterior and (atual, v) not in visitado_aresta]
            if not candidatos:
                break
            nxt = candidatos[0]
            visitado_aresta.add((atual, nxt))
            visitado_aresta.add((nxt, atual))
            cam.append(nxt)
            anterior, atual = atual, nxt
            if atual == inicio:
                break
        return cam

    for n in nos:
        for v in vizinhos(n):
            if (n, v) not in visitado_aresta:
                caminhos.append(andar(n, v))
    for p in pts:  # lacos fechados sem nos
        if grau[p] == 2:
            for v in vizinhos(p):
                if (p, v) not in visitado_aresta:
                    caminhos.append(andar(p, v))
    return [[(x, y) for (y, x) in c] for c in caminhos if len(c) >= 2]


def ponto_em_segmento(p, a, b):
    ax, ay, bx, by = a[0], a[1], b[0], b[1]
    dx, dy = bx - ax, by - ay
    d2 = dx * dx + dy * dy
    if d2 == 0:
        return (ax, ay), float(np.hypot(p[0] - ax, p[1] - ay))
    t = max(0.0, min(1.0, ((p[0] - ax) * dx + (p[1] - ay) * dy) / d2))
    q = (ax + t * dx, ay + t * dy)
    return q, float(np.hypot(p[0] - q[0], p[1] - q[1]))


def fechar_pontas(segs, tol):
    """Puxa pontas soltas para o segmento mais proximo dentro de tol (fecha frestas em T e cantos)."""
    from collections import Counter
    cont = Counter()
    for s in segs:
        cont[(round(s[0]), round(s[1]))] += 1
        cont[(round(s[2]), round(s[3]))] += 1
    novos = [list(map(float, s)) for s in segs]
    for i, s in enumerate(novos):
        for k in (0, 2):
            p = (s[k], s[k + 1])
            if cont[(round(p[0]), round(p[1]))] > 1:
                continue
            melhor, dmin = None, tol
            for j, o in enumerate(novos):
                if i == j:
                    continue
                q, d = ponto_em_segmento(p, (o[0], o[1]), (o[2], o[3]))
                if d < dmin:
                    melhor, dmin = q, d
            if melhor is not None:
                s[k], s[k + 1] = melhor
    return novos


def tirar_pequenos(mascara, area_min):
    n, rot, st, _ = cv2.connectedComponentsWithStats(mascara, connectivity=8)
    for i in range(1, n):
        if st[i, cv2.CC_STAT_AREA] < area_min:
            mascara[rot == i] = 0
    return mascara


def detectar(img_rgb, esp_min=0.18, tol=0.12, escala=0.5, limiar=48, massas=False):
    h0, w0 = img_rgb.shape[:2]
    pequena = cv2.resize(img_rgb, (round(w0 * escala), round(h0 * escala)), interpolation=cv2.INTER_AREA)
    v = pequena.max(axis=2)
    preto = (v < limiar).astype(np.uint8)
    k = max(3, int(round(esp_min * 100 * escala)) | 1)
    nucleo = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
    grosso = cv2.morphologyEx(preto, cv2.MORPH_OPEN, nucleo)
    grosso = cv2.morphologyEx(grosso, cv2.MORPH_CLOSE, nucleo)
    area_min = 0.25 * (100 * escala) ** 2
    grosso = tirar_pequenos(grosso, area_min)
    eps = tol * 100 * escala
    segs = []
    paraesqueleto = grosso
    if massas:
        # massa = parte do preto mais larga que ~1,1 casa; o que sobra (faixas finas) segue para o esqueleto
        k2 = int(round(1.1 * 100 * escala)) | 1
        nucleo2 = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k2, k2))
        miolo = cv2.morphologyEx(grosso, cv2.MORPH_OPEN, nucleo2)
        massa = cv2.dilate(miolo, nucleo2) & grosso
        paraesqueleto = tirar_pequenos((grosso & (1 - massa)).astype(np.uint8), area_min)
        # blocos compactos (pilares, colunas, caixas pretas de ate ~1,6 casa) tambem viram contorno: o esqueleto deles e um ponto
        n, rot, st, _ = cv2.connectedComponentsWithStats(paraesqueleto, connectivity=8)
        lado = 1.6 * 100 * escala
        for i in range(1, n):
            if st[i, cv2.CC_STAT_WIDTH] <= lado and st[i, cv2.CC_STAT_HEIGHT] <= lado:
                massa[rot == i] = 1
                paraesqueleto[rot == i] = 0
        cnts, _ = cv2.findContours(massa.astype(np.uint8), cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)
        for c in cnts:
            if len(c) < 8:
                continue
            ap = cv2.approxPolyDP(c, eps, True).reshape(-1, 2)
            for a, b in zip(ap, np.roll(ap, -1, axis=0)):
                if np.hypot(*(b - a)) >= 0.12 * 100 * escala:
                    segs.append([a[0], a[1], b[0], b[1]])
    sk = skeletonize(paraesqueleto.astype(bool))
    caminhos = tracar(sk)
    for c in caminhos:
        arr = np.array(c, dtype=np.int32).reshape(-1, 1, 2)
        ap = cv2.approxPolyDP(arr, eps, False).reshape(-1, 2)
        for a, b in zip(ap[:-1], ap[1:]):
            if np.hypot(*(b - a)) >= 0.12 * 100 * escala:
                segs.append([a[0], a[1], b[0], b[1]])
    segs = fechar_pontas(segs, 0.6 * 100 * escala)
    segs = [[round(v / escala) for v in s] for s in segs]
    segs = [s for s in segs if (s[0], s[1]) != (s[2], s[3])]
    cobertura = float(grosso.sum() / max(1, preto.sum()))
    return segs, cobertura


def sobrepor(img_rgb, segs, saida):
    im = Image.fromarray(img_rgb).convert("RGB")
    esc = 1600 / im.size[0]
    im = im.resize((1600, round(im.size[1] * esc)))
    arr = cv2.cvtColor(np.asarray(im), cv2.COLOR_RGB2BGR)
    for s in segs:
        cv2.line(arr, (round(s[0] * esc), round(s[1] * esc)), (round(s[2] * esc), round(s[3] * esc)), (255, 0, 255), 3)
    pathlib.Path(saida).parent.mkdir(parents=True, exist_ok=True)
    cv2.imwrite(str(saida), arr)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("id")
    ap.add_argument("--espessura-min", type=float, default=0.18, help="espessura minima da parede, em casas")
    ap.add_argument("--tolerancia", type=float, default=0.12, help="simplificacao do traco, em casas")
    ap.add_argument("--limiar-preto", type=int, default=48, help="brilho abaixo do qual o pixel conta como preto")
    ap.add_argument("--massas", action="store_true", help="contorna massas pretas grandes em vez de esqueletizar")
    ap.add_argument("--sufixo", default="", help="sufixo do arquivo de saida, para comparar variantes")
    a = ap.parse_args()
    mapas = json.loads(pathlib.Path("trabalho/mapas.json").read_text(encoding="utf-8"))
    m = next((x for x in mapas if x["id"] == a.id), None)
    if m is None:
        sys.exit("id nao encontrado")
    img = np.asarray(Image.open(pathlib.Path("mapas") / m["arquivo"]).convert("RGB"))
    if img.shape[1] != m["px_w"] or img.shape[0] != m["px_h"]:
        sys.exit("a imagem nao esta na escala final; rode finalizar_mapa.py antes")
    segs, cobertura = detectar(img, a.espessura_min, a.tolerancia, limiar=a.limiar_preto, massas=a.massas)
    comp = sum(np.hypot(s[2] - s[0], s[3] - s[1]) for s in segs) / 100
    metodo = "faixas-pretas-v1" + (f"+limiar{a.limiar_preto}" if a.limiar_preto != 48 else "") + ("+massas" if a.massas else "")
    avisos = []
    if len(segs) < 4:
        avisos.append("poucas paredes detectadas: o mapa pode ter paredes finas ou claras demais")
    if len(segs) > 700:
        avisos.append("muitos segmentos: possivel ruido; aumente --espessura-min ou --tolerancia")
    if cobertura < 0.35:
        avisos.append("menos de 35% do preto foi considerado parede: confira a sobreposicao")
    saida = pathlib.Path("paredes") / f'{m["id"]}{a.sufixo}.json'
    saida.parent.mkdir(exist_ok=True)
    saida.write_text(json.dumps({"id": m["id"], "metodo": metodo, "px": [m["px_w"], m["px_h"]],
                                 "paredes": segs, "avisos": avisos}, indent=1), encoding="utf-8")
    sobrepor(img, segs, pathlib.Path("revisao") / f'paredes-{m["id"]}{a.sufixo}.png')
    print(f'{m["id"]}: {len(segs)} segmentos, {comp:.0f} casas de parede, cobertura do preto {cobertura:.0%}')
    for av in avisos:
        print("AVISO:", av)


if __name__ == "__main__":
    main()
