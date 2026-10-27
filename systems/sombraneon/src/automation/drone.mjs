import { SN } from '../config.mjs';
import { ID, t, notify, uuidSync } from '../util.mjs';
import { SNSocket } from './socket.mjs';

async function dronesFolder() {
  let folder = game.folders.find((f) => f.type === 'Actor' && f.name === t('Drone.Folder'));
  if (!folder && game.user.isGM) folder = await Folder.create({ name: t('Drone.Folder'), type: 'Actor' });
  return folder ?? null;
}

/**
 * Cria o ator `drone` de um Rigger (livro 4.6): propriedade espelhada do dono, token amigável
 * e vínculo gravado em flags.sombraneon.droneUuid. Executado pelo Mestre (ou por quem pode criar atores).
 */
export async function createDrone(ownerUuid, kind = 'primary') {
  const owner = await fromUuid(ownerUuid);
  if (!owner || owner.type !== 'character') return null;
  const folder = await dronesFolder();
  const name = kind === 'auxiliary' ? t('Drone.AuxName', { name: owner.name }) : t('Drone.Name', { name: owner.name });
  const drone = await Actor.create({
    name,
    type: 'drone',
    img: `systems/${SN.id}/assets/icons/drone.svg`,
    folder: folder?.id ?? null,
    ownership: foundry.utils.deepClone(owner.ownership),
    system: { ownerUuid, kind },
    prototypeToken: { name, disposition: 1, actorLink: true, bar1: { attribute: 'hp' } }
  });
  await drone.update({ 'system.hp.value': drone.system.hp.max });
  await owner.setFlag(ID, kind === 'auxiliary' ? 'auxDroneUuid' : 'droneUuid', drone.uuid);
  return drone;
}

/** O ator tem a habilidade Drone voador mas ainda não tem o drone? */
export function needsDrone(actor) {
  if (actor.type !== 'character') return false;
  const has = actor.items.some((i) => i.type === 'feature' && i.system.automation === 'drone');
  if (!has) return false;
  const uuid = actor.getFlag(ID, 'droneUuid');
  return !uuid || !uuidSync(uuid);
}

export async function ensureDrone(actor, kind = 'primary') {
  if (kind === 'primary' && !needsDrone(actor)) return null;
  const res = actor.isOwner && game.user.can('ACTOR_CREATE') ? { ok: true, uuid: (await createDrone(actor.uuid, kind))?.uuid } : await SNSocket.request('createDrone', { ownerUuid: actor.uuid, kind });
  if (!res.ok) notify('warn', 'Warn.DroneFailed');
  return res;
}

/** Reconstruir o drone destruído: 250 cr e 1 descanso (livro 4.6). */
export async function rebuildDrone(drone) {
  const owner = uuidSync(drone.system.ownerUuid);
  if (!owner) return null;
  const cost = SN.droneRebuildCost;
  if (owner.system.currency.credits < cost) return notify('warn', 'Warn.NoCredits', { cost });
  await owner.update({ 'system.currency.credits': owner.system.currency.credits - cost });
  await drone.update({ 'system.destroyed': false, 'system.hp.value': drone.system.hp.max });
  await drone.setStatus('dead', false);
  return drone;
}

/** Instalar um módulo de drone (item gear de categoria drone-module) no drone. */
export async function installDroneModule(drone, item) {
  const data = item.toObject();
  delete data._id;
  const [created] = await drone.createEmbeddedDocuments('Item', [data]);
  return created;
}
