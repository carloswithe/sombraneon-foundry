import fs from 'node:fs';

/** Largura e altura de um WebP (lossy VP8, lossless VP8L ou estendido VP8X), lendo só o cabeçalho. */
function webpSize(buf) {
  const kind = buf.subarray(12, 16).toString('latin1');
  if (kind === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  if (kind === 'VP8L') {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (kind === 'VP8X') return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
  throw new Error('WebP desconhecido');
}

/** Largura e altura de um JPEG, PNG ou WebP, lendo só o cabeçalho. */
export function imageSize(file) {
  const buf = fs.readFileSync(file);
  if (buf.subarray(0, 4).toString('latin1') === 'RIFF' && buf.subarray(8, 12).toString('latin1') === 'WEBP') return webpSize(buf);
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
