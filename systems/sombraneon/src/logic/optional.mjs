/**
 * Regras adicionais opcionais (docs/sombraneon-regras-adicionais.md): Exaustão e Efeito crítico.
 * Lógica pura, testável sem Foundry.
 */

/* ------------------------------------------------------------------ */
/* Exaustão (capítulo 2)                                               */
/* ------------------------------------------------------------------ */

export const EXHAUSTION_MAX = 6;

/** Nível de Exaustão válido: inteiro de 0 a 6. */
export const clampExhaustion = (n) => Math.max(0, Math.min(EXHAUSTION_MAX, Math.floor(Number(n)) || 0));

/** Penalidade em todos os testes de d20. Os níveis não se somam: nível 3 é -3. O nível 6 é morte. */
export const exhaustionPenalty = (level) => clampExhaustion(level);

export const exhaustionDead = (level) => clampExhaustion(level) >= EXHAUSTION_MAX;

/* ------------------------------------------------------------------ */
/* Efeito crítico (capítulo 3)                                         */
/* ------------------------------------------------------------------ */

export const CRITICAL_TRIGGER = 10;

/** Modificador da rolagem de 2d6: -1 para cada 10 de dano acima de 10, no máximo -10. */
export function criticalModifier(damage) {
  const steps = Math.min(10, Math.max(0, Math.floor(Number(damage) / 10) - 1));
  return steps ? -steps : 0;
}

/** Locais do golpe (1d4). */
export const CRITICAL_LOCATIONS = ['neural', 'body', 'arms', 'legs'];

/**
 * A tabela de 2d6 (3.6). `where`: 'any' usa o local rolado, 'limb' só Braços ou Pernas (rola de novo se
 * cair Neural ou Corpo), 'neural' e 'body' têm local fixo, 'none' não usa local.
 * `chromeState`: o que acontece ao cromo do local.
 */
export const CRITICAL_ROWS = [
  {
    id: 'vital',
    max: 2,
    name: 'Ponto vital',
    where: 'neural',
    flesh: 'O alvo cai a 0 HP na hora e fica morrendo, mas só tem 1 rodada (não role 1d4 + CON). Se já estava a 0 HP, ou for NPC, morre.',
    chrome: 'Mesmo efeito, e o implante Neural fica destruído.',
    chromeState: 'destroyed'
  },
  {
    id: 'decepado',
    max: 3,
    name: 'Membro decepado',
    where: 'limb',
    flesh: 'Perde o membro e sangra como na Hemorragia (1d4 HP no início de cada turno seu) até estancar.',
    chrome: 'O membro cromado fica destruído. Sem sangue.',
    chromeState: 'destroyed'
  },
  {
    id: 'hemorragia',
    max: 4,
    name: 'Hemorragia',
    where: 'body',
    flesh: 'Perde 1d4 HP no início de cada turno seu, até alguém estancar (INT CD 12, alcance Perto, kit médico dá vantagem) ou você ser curado.',
    chrome: 'Mesma perda de HP (vazamento de fluido e faíscas) até estancar, e o implante de Corpo fica danificado.',
    chromeState: 'damaged'
  },
  {
    id: 'esmagado',
    max: 5,
    name: 'Membro esmagado',
    where: 'limb',
    flesh: 'Fratura exposta: o membro fica inutilizável até receber tratamento. Braço: solta o que segura. Perna: cai e só se arrasta até Perto.',
    chrome: 'O implante ou a PMB fica danificado: não funciona até ser consertado.',
    chromeState: 'damaged'
  },
  {
    id: 'abala',
    max: 6,
    name: 'Golpe que abala',
    where: 'any',
    flesh: 'Perde a próxima ação (pode se mover).',
    chrome: 'Em vez disso, o implante ou a PMB do local fica desligado até o próximo descanso.',
    chromeState: 'off-rest'
  },
  {
    id: 'ferido',
    max: 7,
    name: 'Membro ferido',
    where: 'limb',
    flesh: 'Desvantagem em testes que usem o membro, até o próximo descanso bem-sucedido.',
    chrome: 'Em vez disso, o implante ou a PMB fica desligado por 1 hora.',
    chromeState: 'off-hour'
  },
  {
    id: 'choque',
    max: 8,
    name: 'Choque',
    where: 'any',
    flesh: 'Ganha 1 nível de Exaustão. Sem a regra de Exaustão, ou para NPCs, tem desvantagem em tudo até o fim da cena.',
    chrome: 'Mesmo efeito, e o implante ou a PMB do local fica desligado por 1d4 rodadas.',
    chromeState: 'off-1d4',
    exhaustion: 1
  },
  {
    id: 'tonto',
    max: 9,
    name: 'Tonto',
    where: 'any',
    flesh: 'Desvantagem em ataques até o fim do seu próximo turno.',
    chrome: 'Mesmo efeito, e o cromo do local fica desligado por 1 rodada.',
    chromeState: 'off-1'
  },
  {
    id: 'derrubado',
    max: 10,
    name: 'Derrubado',
    where: 'none',
    flesh: 'Cai no chão e solta o que segura. Levantar custa o movimento.',
    chrome: 'Mesmo efeito.',
    chromeState: null
  },
  {
    id: 'sem-folego',
    max: 11,
    name: 'Sem fôlego',
    where: 'none',
    flesh: 'Só pode se mover ou agir no próximo turno (como a propriedade Atordoa).',
    chrome: 'Mesmo efeito.',
    chromeState: null
  },
  {
    id: 'escapou',
    max: Infinity,
    name: 'Escapou por pouco',
    where: 'none',
    flesh: 'Nada acontece.',
    chrome: 'Nada acontece.',
    chromeState: null
  }
];

/** Linha da tabela para o total (2d6 mais o modificador). 2 ou menos é o pior resultado; 12 ou mais, nada. */
export function criticalRow(total) {
  return CRITICAL_ROWS.find((r) => total <= r.max) ?? CRITICAL_ROWS.at(-1);
}

/** Estados do cromo atingido, com o texto do conserto (3.5 e 3.8). */
export const CHROME_STATES = {
  destroyed: 'Destruído: perdido. É preciso comprar outro pelo preço cheio. Se era um membro cromado, o membro some junto.',
  damaged: 'Danificado: não funciona até ser consertado (10% do custo do implante, Hyperdoc com kit cirúrgico ou clínica, 1 hora; PMB: 15 cr). Reinício de implante não resolve.',
  'off-rest': 'Desligado até o próximo descanso.',
  'off-hour': 'Desligado por 1 hora.',
  'off-1d4': 'Desligado por 1d4 rodadas.',
  'off-1': 'Desligado por 1 rodada.'
};
