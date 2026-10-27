import { SN } from '../config.mjs';

/** Modificador de atributo (livro 1.3). 1-3 = -4 ... 18 ou mais = +4. */
export function abilityMod(value) {
  const v = Math.floor(Number(value));
  if (!Number.isFinite(v)) return 0;
  if (v <= 3) return -4;
  for (const [min, max, mod] of SN.modTable) if (v >= min && v <= max) return mod;
  return 4;
}

/** Formata um bônus com sinal sempre visível. */
export function signed(n) {
  const v = Math.trunc(Number(n) || 0);
  return v >= 0 ? `+${v}` : `${v}`;
}
