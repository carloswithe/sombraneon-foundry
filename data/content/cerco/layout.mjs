/**
 * Leitor do YAML restrito dos blocos `mapa:` da aventura (capítulos 4 a 8): chaves de um nível, listas de
 * "[x1, y1, x2, y2]" e de mapas em linha "{chave: valor, ...}". Não é um leitor de YAML genérico.
 */

/** Valor em linha: [..], {..}, "texto", número, true/false ou palavra. */
function flow(text) {
  let i = 0;
  const space = () => {
    while (/\s/.test(text[i] ?? '')) i++;
  };
  const value = () => {
    space();
    const c = text[i];
    if (c === '[' || c === '{') {
      const end = c === '[' ? ']' : '}';
      const out = c === '[' ? [] : {};
      i++;
      for (;;) {
        space();
        if (text[i] === end) {
          i++;
          return out;
        }
        if (c === '[') out.push(value());
        else {
          const colon = text.indexOf(':', i);
          const key = text.slice(i, colon).trim();
          i = colon + 1;
          out[key] = value();
        }
        space();
        if (text[i] === ',') i++;
        else if (text[i] !== end) throw new Error(`Layout inválido: ${text}`);
      }
    }
    if (c === '"') {
      const end = text.indexOf('"', i + 1);
      const out = text.slice(i + 1, end);
      i = end + 1;
      return out;
    }
    const m = /^[^,\]}]+/.exec(text.slice(i));
    if (!m) throw new Error(`Layout inválido: ${text}`);
    i += m[0].length;
    const word = m[0].trim();
    if (word === 'true') return true;
    if (word === 'false') return false;
    return /^-?\d+(\.\d+)?$/.test(word) ? Number(word) : word;
  };
  return value();
}

export function parseLayout(yaml) {
  const out = {};
  let list = null;
  for (const line of yaml.split('\n')) {
    if (!line.trim() || line.trim() === 'mapa:') continue;
    const item = /^\s{4}-\s+(.*)$/.exec(line);
    if (item) {
      if (!list) throw new Error(`Item de lista fora de uma chave: ${line}`);
      list.push(flow(item[1].trim()));
      continue;
    }
    const key = /^\s{2}([a-z_]+):\s*(.*)$/.exec(line);
    if (!key) throw new Error(`Linha de layout não reconhecida: ${line}`);
    const [, name, rest] = key;
    if (!rest) {
      list = out[name] = [];
    } else {
      list = null;
      out[name] = /^[[{"]/.test(rest) ? flow(rest) : rest.trim();
    }
  }
  return out;
}
