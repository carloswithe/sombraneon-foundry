#!/usr/bin/env python3
"""Extrai os mapas do catalogo (.md) para mapas.json.

Uso:
  python3 scripts/extrair_mapas.py sombraneon-compendio-mapas.md trabalho/mapas.json
  python3 scripts/extrair_mapas.py sombraneon-compendio-mapas.md --prompt m071
  python3 scripts/extrair_mapas.py sombraneon-compendio-mapas.md --ids
"""
import hashlib
import json
import pathlib
import re
import sys

RE_BLOCO = re.compile(r"<!-- MAP (?P<attrs>.*?) -->\n(?P<corpo>.*?)<!-- /MAP -->", re.S)
RE_ATTR = re.compile(r'(\w+)="([^"]*)"')
RE_DASH = re.compile("[—–]")


def campo(corpo, rotulo):
    m = re.search(r"\*\*" + re.escape(rotulo) + r":\*\* (.+)", corpo)
    return m.group(1).strip() if m else ""


def linha_tabela(corpo, rotulo):
    m = re.search(r"\| \*\*" + re.escape(rotulo) + r"\*\* \| (.+?) \|\n", corpo)
    return m.group(1).strip() if m else ""


def parse_bloco(attrs, corpo):
    a = dict(RE_ATTR.findall(attrs))
    w, h = (int(x) for x in a["grade"].split("x"))
    areas = []
    m = re.search(r"\*\*Áreas e pontos de interesse\*\*\n\n\| Área \| Função no jogo \|\n\|---\|---\|\n(.*?)\n\n", corpo, re.S)
    if m:
        for ln in m.group(1).splitlines():
            partes = [p.strip() for p in ln.strip().strip("|").split("|")]
            if len(partes) == 2:
                areas.append({"area": partes[0], "funcao": partes[1]})
    m = re.search(r"\*\*Ganchos de uso\*\*\n\n(.*?)\n\n", corpo, re.S)
    ganchos = [re.sub(r"^\d+\.\s*", "", x).strip() for x in m.group(1).splitlines()] if m else []
    m = re.search(r"```text\n(.*?)\n```", corpo, re.S)
    prompt = m.group(1).strip() if m else ""
    cor_linha = linha_tabela(corpo, "Cor de destaque")
    mc = re.match(r"(.+?) \((.+)\)$", cor_linha)
    return {
        "id": a["id"],
        "cat": a["cat"],
        "cat_nome": linha_tabela(corpo, "Categoria"),
        "nome": a["nome"],
        "arquivo": a["arquivo"],
        "slug": a["arquivo"][len(a["id"]) + 1:-len(".webp")],
        "grade": a["grade"],
        "w": w,
        "h": h,
        "px_w": w * 100,
        "px_h": h * 100,
        "ar": a["ar"],
        "ambiente": a["ambiente"],
        "luz": a["luz"],
        "entrada": a["entrada"],
        "cor": a["cor"],
        "cor_pt": mc.group(1) if mc else cor_linha,
        "foco_pt": mc.group(2) if mc else "",
        "pacote": a.get("pacote") == "sim",
        "descricao": campo(corpo, "Descrição"),
        "areas": areas,
        "cobertura": campo(corpo, "Cobertura e perigos"),
        "ganchos": ganchos,
        "ameacas": campo(corpo, "Ameaças típicas"),
        "prompt": prompt,
        "prompt_sha1": hashlib.sha1(prompt.encode("utf-8")).hexdigest()[:12],
    }


def extrair(caminho_md):
    texto = pathlib.Path(caminho_md).read_text(encoding="utf-8")
    mapas = [parse_bloco(m.group("attrs"), m.group("corpo")) for m in RE_BLOCO.finditer(texto)]
    return mapas


def validar(mapas):
    erros = []
    esperado = [f"m{i:03d}" for i in range(1, len(mapas) + 1)]
    if [m["id"] for m in mapas] != esperado:
        erros.append("ids fora de sequencia")
    arqs = [m["arquivo"] for m in mapas]
    if len(set(arqs)) != len(arqs):
        erros.append("arquivos repetidos")
    for m in mapas:
        i = m["id"]
        if not m["prompt"].startswith("Create an image in"):
            erros.append(f"{i}: prompt ausente ou malformado")
        if not m["areas"]:
            erros.append(f"{i}: sem areas")
        if not 2 <= len(m["ganchos"]) <= 3:
            erros.append(f"{i}: ganchos fora de 2 a 3")
        for k in ("descricao", "cobertura", "ameacas", "cat_nome", "foco_pt"):
            if not m[k]:
                erros.append(f"{i}: campo vazio {k}")
        if RE_DASH.search(json.dumps(m, ensure_ascii=False)):
            erros.append(f"{i}: travessao no texto")
    return erros


def main(argv):
    if len(argv) < 3:
        print(__doc__)
        return 2
    mapas = extrair(argv[1])
    if argv[2] == "--ids":
        print(" ".join(m["id"] for m in mapas))
        return 0
    if argv[2] == "--prompt":
        alvo = argv[3].lower()
        for m in mapas:
            if m["id"] == alvo:
                print(m["prompt"])
                return 0
        print("id nao encontrado", alvo)
        return 1
    erros = validar(mapas)
    if erros:
        print("ERROS:")
        for e in erros:
            print(" ", e)
        return 1
    saida = pathlib.Path(argv[2])
    saida.parent.mkdir(parents=True, exist_ok=True)
    saida.write_text(json.dumps(mapas, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{len(mapas)} mapas -> {saida}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
