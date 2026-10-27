import { SN } from '../config.mjs';
import { ID } from '../util.mjs';

/**
 * Iniciativa (livro 1.4): d20 + DES; vantagem por modificadores; empate favorece os jogadores
 * (+0,01 para personagens e drones). Reflexos neurais Militar age antes de todos na 1ª rodada.
 */
export class SNCombatant extends Combatant {
  getInitiativeRoll(formula) {
    const actor = this.actor;
    let f = formula ?? CONFIG.Combat.initiative.formula;
    if (!actor) return new Roll(f);
    switch (actor.type) {
      case 'character': {
        const init = actor.sn?.initiative;
        f = `${init?.advantage ? '2d20kh' : '1d20'} + @initiative.bonus`;
        if (init?.first && !this.actor.statuses.has('surprised') && (this.combat?.round ?? 0) <= 1) f += ' + 100';
        f += ' + 0.01';
        break;
      }
      case 'drone':
        f = '1d20 + 0.01';
        break;
      case 'npc':
        f = '1d20 + @initiative';
        break;
      default:
        f = '1d20';
    }
    return new Roll(f, actor.getRollData());
  }
}

/** Remove o bônus da 1ª rodada (Reflexos neurais Militar) quando a rodada 2 começa. */
export function registerCombatHooks() {
  Hooks.on('combatRound', async (combat) => {
    if (!game.user.isGM || game.users.activeGM?.id !== game.user.id) return;
    const updates = combat.combatants.filter((c) => (c.initiative ?? 0) >= 100).map((c) => ({ _id: c.id, initiative: c.initiative - 100 }));
    if (updates.length) await combat.updateEmbeddedDocuments('Combatant', updates);
  });
}

export { SN, ID };
