/** Construção de fórmulas de rolagem (vantagem, crítico, rajada). Funções puras. */

/** Vantagem e desvantagem se anulam e não se acumulam (livro 1.2). */
export function resolveMode({ advantage = false, disadvantage = false } = {}) {
  if (advantage && disadvantage) return 'normal';
  if (advantage) return 'advantage';
  if (disadvantage) return 'disadvantage';
  return 'normal';
}

export function d20Term(mode) {
  if (mode === 'advantage') return '2d20kh';
  if (mode === 'disadvantage') return '2d20kl';
  return '1d20';
}

export function withBonus(base, bonus) {
  const n = Math.trunc(Number(bonus) || 0);
  if (n === 0) return base;
  return n > 0 ? `${base} + ${n}` : `${base} - ${Math.abs(n)}`;
}

export function d20Formula({ mode = 'normal', bonus = 0 } = {}) {
  return withBonus(d20Term(mode), bonus);
}

/** Dobra a quantidade de dados e preserva bônus fixos (crítico, livro 1.2). */
export function doubleDice(formula) {
  return String(formula).replace(/(\d*)d(\d+)/gi, (_, count, faces) => `${(count === '' ? 1 : Number(count)) * 2}d${faces}`);
}

/** Normaliza "d6" para "1d6". */
export function normalizeDie(die) {
  const s = String(die ?? '').trim();
  return /^d\d+$/i.test(s) ? `1${s}` : s;
}

/**
 * Monta a fórmula de dano.
 * @param {object} p
 * @param {string} p.dice       dado base da arma (d8, 2d6...)
 * @param {number} [p.bonus]    soma de bônus fixos
 * @param {string} [p.extraDice] dados extras (investida, furtivo): "1d4"
 * @param {boolean} [p.critical] dobra a quantidade de dados (não os bônus)
 * @param {boolean} [p.advantage] role com vantagem (armas gêmeas)
 */
export function damageFormula({ dice, bonus = 0, extraDice = '', critical = false, advantage = false } = {}) {
  let diceParts = [normalizeDie(dice)];
  if (extraDice) diceParts.push(...String(extraDice).split('+').map((s) => normalizeDie(s.trim())).filter(Boolean));
  let diceExpr = diceParts.filter(Boolean).join(' + ');
  if (critical) diceExpr = doubleDice(diceExpr);
  if (advantage && /^\d*d\d+$/i.test(diceExpr.trim())) {
    const m = /^(\d*)d(\d+)$/i.exec(diceExpr.trim());
    const count = (m[1] === '' ? 1 : Number(m[1])) * 2;
    diceExpr = `${count}d${m[2]}kh${m[1] === '' ? 1 : Number(m[1])}`;
  }
  return withBonus(diceExpr, bonus);
}

/** Resultado de ataque: 20 natural acerta, 1 natural erra, senão compara com a CA. */
export function attackOutcome({ natural, total, ac = null }) {
  if (natural === 20) return { hit: true, critical: true, fumble: false };
  if (natural === 1) return { hit: false, critical: false, fumble: true };
  if (ac === null || ac === undefined) return { hit: null, critical: false, fumble: false };
  return { hit: total >= ac, critical: false, fumble: false };
}

/** Rajada: uma rolagem atinge todos os alvos com CA igual ou menor que o resultado. */
export function burstHits(total, targets) {
  return targets.map((t) => ({ ...t, hit: total >= t.ac }));
}

/** Total do d20 descontando vantagem: devolve o dado mantido a partir dos resultados. */
export function keptD20(results, mode) {
  if (mode === 'advantage') return Math.max(...results);
  if (mode === 'disadvantage') return Math.min(...results);
  return results[0];
}
