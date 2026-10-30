import fs from 'node:fs';

/** Largura e altura de um JPEG ou PNG, lendo só o cabeçalho. */
export function imageSize(file) {
  const buf = fs.readFileSync(file);
  if (buf.subarray(1, 4).toString('latin1') === 'PNG') return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
    i += 2 + buf.readUInt16BE(i + 2);
  }
  throw new Error(`Não consegui ler as dimensões de ${file}`);
}
