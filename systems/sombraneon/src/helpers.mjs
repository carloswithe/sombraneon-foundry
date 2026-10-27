import { t, tExists } from './util.mjs';
import { signed } from './logic/abilities.mjs';

/** Helpers do Handlebars. Os do núcleo (eq, ne, and, or, not...) são mantidos se já existirem. */
export function registerHelpers() {
  const H = Handlebars;
  const ensure = (name, fn) => {
    if (!H.helpers[name]) H.registerHelper(name, fn);
  };
  ensure('eq', (a, b) => a === b);
  ensure('ne', (a, b) => a !== b);
  ensure('gt', (a, b) => a > b);
  ensure('lt', (a, b) => a < b);
  ensure('gte', (a, b) => a >= b);
  ensure('lte', (a, b) => a <= b);
  ensure('not', (a) => !a);
  ensure('and', (...args) => args.slice(0, -1).every(Boolean));
  ensure('or', (...args) => args.slice(0, -1).some(Boolean));
  ensure('concat', (...args) => args.slice(0, -1).join(''));

  H.registerHelper('snSigned', (n) => signed(n));
  H.registerHelper('snT', (key, options) => (options?.hash && Object.keys(options.hash).length ? t(key, options.hash) : t(key)));
  H.registerHelper('snTx', (key) => (tExists(key) ? t(key) : key));
  H.registerHelper('snOr', (a, b) => a || b);
  H.registerHelper('snJson', (o) => JSON.stringify(o));
  H.registerHelper('snDragData', (kind, actorUuid, options) => JSON.stringify({ type: 'SombraNeon', kind, actorUuid, ...(options?.hash ?? {}) }));
  ensure('array', (...args) => args.slice(0, -1));
  ensure('capitalize', (s) => String(s ?? '').charAt(0).toUpperCase() + String(s ?? '').slice(1));
  H.registerHelper('snPct', (a, b) => (b > 0 ? Math.max(0, Math.min(100, Math.round((a / b) * 100))) : 0));
  H.registerHelper('snRepeat', (n, options) => {
    let out = '';
    for (let i = 0; i < n; i++) out += options.fn(i);
    return out;
  });
}
