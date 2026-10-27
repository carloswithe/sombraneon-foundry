/**
 * Módulo de catálogo do SombraNeon: os dados ficam nos compêndios (packs/).
 * Este arquivo só avisa se o sistema ativo não for o SombraNeon.
 */
Hooks.once('ready', () => {
  if (game.system.id !== 'sombraneon') {
    ui.notifications.warn(game.i18n.localize('SOMBRANEON_COMPENDIUM.WrongSystem'), { permanent: true });
  }
});
