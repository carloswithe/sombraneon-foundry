import { isDiceFormula, safeEval } from './formulas.mjs';

/**
 * Motor de modificadores (02 seção 6). Funções puras.
 * Uma "fonte" é { label, modifiers: [...], choice: {...} }.
 */

export const MODES = ['add', 'set', 'flag', 'advantage', 'disadvantage', 'multiply', 'max', 'min'];

/** Troca {choice.x} na chave. Devolve null se a escolha ainda não foi feita. */
export function resolveKey(key, choice = {}) {
  let unresolved = false;
  const out = String(key ?? '').replace(/\{choice\.(\w+)\}/g, (_, name) => {
    const v = choice?.[name];
    if (v === undefined || v === null || v === '') {
      unresolved = true;
      return '';
    }
    return Array.isArray(v) ? String(v[0]) : String(v);
  });
  return unresolved ? null : out;
}

/** Junta os modificadores de várias fontes numa lista plana. */
export function gather(sources) {
  const list = [];
  const pending = [];
  for (const src of sources) {
    for (const m of src.modifiers ?? []) {
      const key = resolveKey(m.key, src.choice);
      if (key === null) {
        if (!pending.includes(src.label)) pending.push(src.label);
        continue;
      }
      list.push({
        key,
        mode: m.mode || 'add',
        value: m.value ?? '',
        when: m.when || '',
        label: m.label || '',
        source: src.label,
        choice: src.choice ?? {}
      });
    }
  }
  return { list, pending };
}

function expandArg(arg, choice) {
  return String(arg ?? '').replace(/@choice\.(\w+)/g, (_, name) => {
    const v = choice?.[name];
    return v === undefined || v === null ? '' : String(v);
  });
}

function hasProp(weapon, prop) {
  return Array.isArray(weapon?.properties) ? weapon.properties.includes(prop) : !!weapon?.properties?.has?.(prop);
}

function matchTerm(term, ctx, choice) {
  const idx = term.indexOf(':');
  const name = idx === -1 ? term : term.slice(0, idx);
  const arg = idx === -1 ? '' : expandArg(term.slice(idx + 1), choice);
  const values = arg.split('|').filter((v) => v !== '');
  const weapon = ctx.weapon ?? null;
  switch (name) {
    case 'noArmor':
      return !ctx.armorType;
    case 'armor':
      return values.some((v) => (v === 'any' ? !!ctx.armorType : ctx.armorType === v));
    case 'weapon':
      return values.some((v) => {
        if (!weapon) return false;
        if (v === 'melee' || v === 'ranged') return weapon.kind === v;
        if (v === 'twoHanded') return hasProp(weapon, 'twoHanded') || Number(weapon.hands) >= 2;
        return hasProp(weapon, v);
      });
    case 'family':
      return !!weapon && values.includes(weapon.family);
    case 'class':
      return values.includes(ctx.classId);
    case 'origin':
      return values.includes(ctx.originId);
    case 'unarmed':
      return !!ctx.unarmed;
    case 'incoming':
      return values.includes(ctx.incoming);
    case 'domain': {
      const domains = ctx.domains instanceof Set ? ctx.domains : new Set(ctx.domains ?? []);
      return !!weapon && domains.has(weapon.family);
    }
    case 'choice': {
      const [cname, cval = ''] = term.slice(idx + 1).split('=');
      return String(choice?.[cname] ?? '') !== '' && cval.split('|').includes(String(choice[cname]));
    }
    default:
      return false;
  }
}

/** Avalia a condição `when` (termos separados por &). Vazio = sempre. */
export function whenMatches(when, ctx = {}, choice = {}) {
  const s = String(when ?? '').trim();
  if (!s) return true;
  return s.split('&').every((t) => matchTerm(t.trim(), ctx, choice));
}

const active = (list, key, ctx) => list.filter((m) => m.key === key && whenMatches(m.when, ctx, m.choice));

function numericValue(m, rollData) {
  return safeEval(m.value, { ...rollData, choice: m.choice }, 0);
}

function partLabel(m) {
  return m.label && m.label !== m.source ? `${m.source}: ${m.label}` : m.source;
}

/** Soma os modificadores `add` numéricos de uma chave. */
export function sum(list, key, ctx = {}, rollData = {}) {
  const parts = [];
  let total = 0;
  for (const m of active(list, key, ctx)) {
    if (m.mode !== 'add' || isDiceFormula(m.value)) continue;
    const value = numericValue(m, rollData);
    if (!value) continue;
    total += value;
    parts.push({ label: partLabel(m), value });
  }
  return { total, parts };
}

/** Último modificador `set` de uma chave (ou undefined). */
export function setValue(list, key, ctx = {}) {
  const found = active(list, key, ctx).filter((m) => m.mode === 'set');
  return found.length ? String(found[found.length - 1].value) : undefined;
}

/** Produto dos modificadores `multiply` (padrão 1). */
export function multiplier(list, key, ctx = {}, rollData = {}) {
  return active(list, key, ctx)
    .filter((m) => m.mode === 'multiply')
    .reduce((acc, m) => acc * (numericValue(m, rollData) || 1), 1);
}

/** Fontes de uma flag (mode flag, ou qualquer modo sem valor). */
export function flagSources(list, key, ctx = {}) {
  return active(list, key, ctx)
    .filter((m) => m.mode === 'flag')
    .map(partLabel);
}

export function hasFlag(list, key, ctx = {}) {
  return flagSources(list, key, ctx).length > 0;
}

/** Fontes de vantagem e desvantagem para uma chave. */
export function advantageSources(list, key, ctx = {}) {
  const act = active(list, key, ctx);
  return {
    advantage: act.filter((m) => m.mode === 'advantage').map(partLabel),
    disadvantage: act.filter((m) => m.mode === 'disadvantage').map(partLabel)
  };
}

/** Dados somados (por exemplo, cast.heal = 1d4). `set` substitui os de modo `add`. */
export function diceFormula(list, key, ctx = {}) {
  const set = setValue(list, key, ctx);
  if (set !== undefined && isDiceFormula(set)) return set;
  return active(list, key, ctx)
    .filter((m) => m.mode === 'add' && isDiceFormula(m.value))
    .map((m) => String(m.value))
    .join(' + ');
}

/** Todas as chaves distintas que começam com um prefixo (para dicas de depuração). */
export function keysWithPrefix(list, prefix) {
  return [...new Set(list.filter((m) => m.key.startsWith(prefix)).map((m) => m.key))];
}
