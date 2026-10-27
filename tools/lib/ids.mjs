import { createHash } from 'node:crypto';

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/** ID determinístico de 16 caracteres [A-Za-z0-9] (docs/spec/05, seção 2.3). */
export function stableId(seed) {
  let n = BigInt('0x' + createHash('sha1').update(seed).digest('hex'));
  let out = '';
  while (out.length < 16) {
    out += ALPHABET[Number(n % 62n)];
    n /= 62n;
  }
  return out;
}

export const docId = (pack, identifier) => stableId(`sombraneon:${pack}:${identifier}`);
export const subId = (pack, identifier, subkind, index) => stableId(`sombraneon:${pack}:${identifier}:${subkind}:${index}`);
export const folderId = (pack, name) => stableId(`sombraneon:${pack}:folder:${name}`);
