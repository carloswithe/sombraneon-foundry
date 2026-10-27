/**
 * Avaliador seguro de fórmulas curtas (sem eval). Aceita números, @caminho.do.dado,
 * + - * /, parênteses e as funções floor, ceil, max, min, abs.
 */
const FUNCS = {
  floor: Math.floor,
  ceil: Math.ceil,
  abs: Math.abs,
  max: Math.max,
  min: Math.min
};

export function getPath(obj, path) {
  let cur = obj;
  for (const part of String(path).split('.')) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[part];
  }
  return cur;
}

function tokenize(src) {
  const tokens = [];
  const re = /\s*(?:(\d+(?:\.\d+)?)|@([A-Za-z_][\w.]*)|([A-Za-z_]\w*)|([-+*/(),]))/y;
  let pos = 0;
  while (pos < src.length) {
    re.lastIndex = pos;
    const m = re.exec(src);
    if (!m) {
      if (/^\s*$/.test(src.slice(pos))) break;
      throw new Error(`Fórmula inválida: "${src}"`);
    }
    pos = re.lastIndex;
    if (m[1] !== undefined) tokens.push({ t: 'num', v: Number(m[1]) });
    else if (m[2] !== undefined) tokens.push({ t: 'var', v: m[2] });
    else if (m[3] !== undefined) tokens.push({ t: 'id', v: m[3] });
    else tokens.push({ t: 'op', v: m[4] });
  }
  return tokens;
}

export function evalFormula(expr, data = {}) {
  if (typeof expr === 'number') return Number.isFinite(expr) ? expr : 0;
  const src = String(expr ?? '').trim();
  if (src === '') return 0;
  const tokens = tokenize(src);
  let i = 0;
  const peek = () => tokens[i];
  const next = () => tokens[i++];
  const isOp = (v) => peek()?.t === 'op' && peek().v === v;

  function primary() {
    const tk = next();
    if (!tk) throw new Error(`Fórmula incompleta: "${src}"`);
    if (tk.t === 'num') return tk.v;
    if (tk.t === 'var') {
      const raw = getPath(data, tk.v);
      const n = Number(raw);
      return Number.isFinite(n) ? n : 0;
    }
    if (tk.t === 'id') {
      const fn = FUNCS[tk.v];
      if (!fn || !isOp('(')) throw new Error(`Identificador desconhecido "${tk.v}" em "${src}"`);
      next();
      const args = [];
      if (!isOp(')')) {
        do args.push(expression());
        while (isOp(',') && next());
      }
      if (!isOp(')')) throw new Error(`Parêntese ausente em "${src}"`);
      next();
      return fn(...args);
    }
    if (tk.t === 'op' && tk.v === '(') {
      const v = expression();
      if (!isOp(')')) throw new Error(`Parêntese ausente em "${src}"`);
      next();
      return v;
    }
    if (tk.t === 'op' && tk.v === '-') return -unary();
    if (tk.t === 'op' && tk.v === '+') return unary();
    throw new Error(`Símbolo inesperado "${tk.v}" em "${src}"`);
  }
  function unary() {
    return primary();
  }
  function term() {
    let v = unary();
    while (isOp('*') || isOp('/')) {
      const op = next().v;
      const r = unary();
      v = op === '*' ? v * r : r === 0 ? 0 : v / r;
    }
    return v;
  }
  function expression() {
    let v = term();
    while (isOp('+') || isOp('-')) {
      const op = next().v;
      const r = term();
      v = op === '+' ? v + r : v - r;
    }
    return v;
  }
  const result = expression();
  if (i < tokens.length) throw new Error(`Fórmula inválida: "${src}"`);
  return result;
}

/** Verdadeiro se o texto contém uma expressão de dados (por exemplo, 1d4). */
export function isDiceFormula(value) {
  return /\d*d\d+/i.test(String(value ?? ''));
}

/** Avalia sem lançar: devolve `fallback` em caso de erro. */
export function safeEval(expr, data, fallback = 0) {
  try {
    return evalFormula(expr, data);
  } catch {
    return fallback;
  }
}
