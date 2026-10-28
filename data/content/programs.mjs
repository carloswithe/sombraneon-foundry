import { book, html, item, uses, NO_USES, splitBold, plain, slug, ICON } from './lib.mjs';

const MECH = {
  // Programas (Netrunner)
  choque: { damage: '1d6' },
  overload: { damage: '2d6' },
  'sobrecarga-neural': { damage: '4d6' },
  'apagar-rastro': { alertDelta: -1, automation: 'erase-trace' },
  colapso: { automation: 'collapse' },
  'eco-digital': { uses: uses(1, 'rest'), automation: 'eco-digital' },
  // Protocolos (Hyperdoc)
  nanocura: { healing: '1d6+@level' },
  'choque-cardiaco': { healing: '1d4' },
  'enxame-curativo': { healing: '1d4+@level' },
  regeneracao: { healing: '1d6' },
  'cura-em-massa': { healing: '2d6+@level' },
  'reconstrucao-total': { uses: uses(1, 'rest') },
  // Sets (Rocker)
  refrao: { healing: '1d6+@level' },
  solo: { damage: '1d6+@level', save: { ability: 'con', cd: 12, half: true } }
};

function rangeOf(text) {
  if (/Longe/.test(text)) return 'far';
  if (/Próxim/.test(text)) return 'near';
  if (/Perto/.test(text)) return 'close';
  return '';
}

function build({ kind, tier, name, text, folder, sort, section }) {
  const identifier = slug(name);
  const m = MECH[identifier] ?? {};
  return item({
    type: 'program',
    name,
    identifier,
    img: ICON(kind),
    folder,
    sort,
    source: `Livro v0.6, ${section}`,
    description: html(text),
    system: {
      kind,
      tier,
      range: rangeOf(text),
      effect: html(text),
      damage: m.damage ?? '',
      healing: m.healing ?? '',
      save: m.save ?? { ability: '', cd: 0, half: false },
      alertDelta: m.alertDelta ?? 0,
      uses: m.uses ?? NO_USES,
      crashed: false,
      automation: m.automation ?? ''
    }
  });
}

function tiers(section, kind, folderPrefix) {
  const out = [];
  for (let tier = 1; tier <= 5; tier++) {
    const t = book.table(section, `Tier ${tier}`);
    t.rows.forEach((row, i) => {
      out.push(
        build({
          kind,
          tier,
          name: plain(row[0]),
          text: row[1],
          folder: `${folderPrefix}: Tier ${tier}`,
          sort: tier * 1000 + (i + 1) * 100,
          section
        })
      );
    });
  }
  return out;
}

function sets() {
  const t = book.section('4.5').tables.find((x) => x.header[0] === 'Set');
  return t.rows.map((row, i) =>
    build({ kind: 'set', tier: 0, name: plain(row[0]), text: row[1], folder: 'Sets', sort: (i + 1) * 100, section: '4.5' })
  );
}

export const programItems = [...tiers('9.2', 'program', 'Programas'), ...tiers('9.3', 'protocol', 'Protocolos'), ...sets()];
