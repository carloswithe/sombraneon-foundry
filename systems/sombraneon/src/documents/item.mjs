import { ID, tpl, renderTpl, enrichHtml, t } from '../util.mjs';
import { SN } from '../config.mjs';

export class SNItem extends Item {
  get identifier() {
    return this.system.identifier;
  }

  /** Informações de usos (feature, programa, gear ou implante na qualidade atual). */
  get usesInfo() {
    if (this.type === 'implant') {
      const q = this.system.quality;
      return { path: `system.tiers.${q}.uses`, uses: this.system.tiers[q]?.uses };
    }
    if (this.system.uses) return { path: 'system.uses', uses: this.system.uses };
    return { path: null, uses: null };
  }

  get hasUses() {
    return (this.usesInfo.uses?.max ?? 0) > 0;
  }

  /** Dados da qualidade atual do implante. */
  get tier() {
    return this.type === 'implant' ? this.system.tiers[this.system.quality] : null;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    if (this.type === 'implant') {
      const q = this.system.quality;
      this.system.current = this.system.tiers[q];
      this.system.price = SN.implantQualities[q] ?? 0;
    }
  }

  /** Mostra o item no chat (descrição, custo e botão de adicionar à ficha). */
  async toChat() {
    const description = await enrichHtml(this.system.description, { rollData: this.actor?.getRollData?.() ?? {}, relativeTo: this });
    const content = await renderTpl(tpl('chat/info.hbs'), {
      name: this.name,
      img: this.img,
      type: t(`Item.Types.${this.type}`),
      description,
      price: this.system.price ?? null,
      uuid: this.uuid,
      canAdd: !this.parent
    });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content,
      flags: { [ID]: { info: { uuid: this.uuid } } }
    });
  }
}
