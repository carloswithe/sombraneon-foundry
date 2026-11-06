import { ID, t, tpl, getDragEventData, enrichHtml, notify, confirm } from '../util.mjs';
import { signed } from '../logic/abilities.mjs';

const { HandlebarsApplicationMixin } = foundry.applications.api;

/** Texto de dica a partir de partes { label, value }. */
export const partsTooltip = (parts = []) => parts.map((p) => `${p.label} ${signed(p.value)}`).join('\n');

/** Aplica dano ou cura digitado no campo de HP rápido e avisa quando as reduções mudaram o valor. */
export async function applyHpAmount(actor, field, mode, raw = false) {
  const typed = Math.floor(Math.abs(Number(field?.value)));
  if (!Number.isFinite(typed) || typed <= 0) {
    field?.focus();
    return notify('warn', 'Hp.NeedAmount');
  }
  const applied = mode === 'heal' ? await actor.applyHealing(typed) : await actor.applyDamage(typed, { raw });
  if (field) field.value = '';
  if (mode === 'heal') return notify('info', 'Hp.Healed', { name: actor.name, applied });
  return notify('info', applied === typed ? 'Hp.Damaged' : 'Hp.DamagedReduced', { name: actor.name, applied, typed });
}

/**
 * Comportamentos comuns das fichas: abas, arrastar e soltar, ações de linha e edição de listas.
 * @template {typeof foundry.applications.api.DocumentSheetV2} T
 * @param {T} Base
 */
export function SNSheetMixin(Base) {
  return class SNSheet extends HandlebarsApplicationMixin(Base) {
    /** Estado local de interface (aba ativa, modo de edição). */
    _tab = null;
    _editing = false;

    static DEFAULT_OPTIONS = {
      classes: ['sombraneon', 'sheet'],
      // A própria janela é o <form> (padrão das fichas de documento): os templates NÃO podem ter outro <form> na raiz,
      // senão os campos pertencem ao form de dentro e o envio da janela leva dados vazios (nada é salvo).
      tag: 'form',
      window: { resizable: true },
      form: { submitOnChange: true, closeOnSubmit: false },
      actions: {
        snTab: SNSheet.#tab,
        toggleEdit: SNSheet.#toggleEdit,
        saveSheet: SNSheet.#save,
        editImage: SNSheet.#editImage,
        hpApply: SNSheet.#hpApply,
        arrayAdd: SNSheet.#arrayAdd,
        arrayRemove: SNSheet.#arrayRemove
      }
    };

    get editing() {
      return this._editing || (this.document.isOwner && !this.constructor.PLAY_MODE);
    }

    /** Define a aba inicial. */
    get tab() {
      return this._tab ?? this.constructor.DEFAULT_TAB;
    }

    /* ---------- ações ---------- */

    static #tab(event, target) {
      this._tab = target.dataset.tab;
      this.element.querySelectorAll('[data-tab-panel]').forEach((p) => p.classList.toggle('active', p.dataset.tabPanel === this._tab));
      this.element.querySelectorAll('[data-action="snTab"]').forEach((b) => b.classList.toggle('active', b.dataset.tab === this._tab));
    }

    /**
     * Aplica o valor digitado ao HP: Dano segue as regras (Blindagem e reduções), Cura soma até o máximo.
     * Shift no botão de dano aplica direto, sem reduções.
     */
    static async #hpApply(event, target) {
      const box = target.closest('.sn-hp-quick');
      return applyHpAmount(this.document, box?.querySelector('[data-hp-amount]'), target.dataset.mode, event.shiftKey);
    }

    static #toggleEdit() {
      this._editing = !this._editing;
      this.render();
    }

    /**
     * Botão Salvar: envia o formulário agora (o que foi digitado e ainda não saiu do campo também entra)
     * e confirma na própria ficha. A ficha continua salvando sozinha ao sair de cada campo.
     */
    static async #save() {
      try {
        if (typeof this.submit === 'function') await this.submit();
        else (this.form ?? this.element?.querySelector('form'))?.requestSubmit?.();
      } catch (error) {
        console.error('SombraNeon | falha ao salvar a ficha', error);
        return notify('error', 'Sheet.SaveFailed');
      }
      this._markSaved();
      return notify('info', 'Sheet.SavedNotice', { name: this.document.name });
    }

    /** Todo envio do formulário (automático ou pelo botão) confirma "Salvo" no botão. */
    async _processSubmitData(event, form, submitData, options) {
      const result = await super._processSubmitData?.(event, form, submitData, options);
      this._markSaved();
      return result;
    }

    /** Mostra "Salvo" no botão por dois segundos (sobrevive a uma renderização que troque o botão). */
    _markSaved() {
      this._savedUntil = Date.now() + 2000;
      this._applySaveState();
      clearTimeout(this._savedTimer);
      this._savedTimer = setTimeout(() => this._applySaveState(), 2100);
    }

    /** Pinta o botão Salvar: pendente (digitado, não enviado), salvo (confirmado) ou normal. */
    _applySaveState() {
      const saved = (this._savedUntil ?? 0) > Date.now();
      for (const btn of this.element?.querySelectorAll?.('[data-action="saveSheet"]') ?? []) {
        const label = btn.querySelector('span');
        btn.dataset.idleLabel ??= label?.textContent ?? '';
        btn.classList.toggle('sn-saved', saved);
        btn.classList.toggle('sn-dirty', !saved && !!this._dirty);
        if (saved) this._dirty = false;
        if (label) label.textContent = saved ? btn.dataset.savedLabel : btn.dataset.idleLabel;
      }
    }

    static async #editImage(event, target) {
      const field = target.dataset.edit || 'img';
      const current = foundry.utils.getProperty(this.document._source, field);
      const FP = foundry.applications.apps?.FilePicker?.implementation ?? CONFIG.ux?.FilePicker ?? FilePicker;
      const fp = new FP({
        type: 'image',
        current,
        callback: (path) => this.document.update({ [field]: path })
      });
      return fp.browse();
    }

    /** Adiciona uma linha em uma lista (ArrayField) do documento. */
    static async #arrayAdd(event, target) {
      const path = target.dataset.array;
      const blank = JSON.parse(target.dataset.blank || '{}');
      const list = foundry.utils.deepClone(foundry.utils.getProperty(this.document._source, path) ?? []);
      list.push(blank);
      return this.document.update({ [path]: list });
    }

    static async #arrayRemove(event, target) {
      const path = target.dataset.array;
      const index = Number(target.dataset.index);
      const list = foundry.utils.deepClone(foundry.utils.getProperty(this.document._source, path) ?? []);
      list.splice(index, 1);
      return this.document.update({ [path]: list });
    }

    /* ---------- renderização ---------- */

    async _prepareContext(options) {
      const context = await super._prepareContext(options);
      return {
        ...context,
        actor: this.document.documentName === 'Actor' ? this.document : undefined,
        item: this.document.documentName === 'Item' ? this.document : undefined,
        system: this.document.system,
        editable: this.isEditable,
        editing: this.editing && this.isEditable,
        isGM: game.user.isGM,
        tab: this.tab
      };
    }

    async _onRender(context, options) {
      await super._onRender(context, options);
      const el = this.element;
      el.setAttribute('autocomplete', 'off');
      // seletores e campos que passam por lógica (não pelo formulário)
      el.querySelectorAll('[data-change]').forEach((input) => {
        input.addEventListener('change', (event) => {
          event.stopPropagation();
          this._onChangeAction?.(input.dataset.change, event, input);
        });
      });
      // HP rápido: o valor digitado não é dado do ator; Enter aplica como dano (Shift: direto)
      el.querySelectorAll('[data-hp-amount]').forEach((input) => {
        input.addEventListener('change', (event) => event.stopPropagation());
        input.addEventListener('keydown', (event) => {
          if (event.key !== 'Enter') return;
          event.preventDefault();
          event.stopPropagation();
          applyHpAmount(this.document, input, 'damage', event.shiftKey);
        });
      });
      // edição de listas (modificadores, concessões...)
      el.querySelectorAll('[data-array-field]').forEach((input) => {
        input.addEventListener('change', (event) => {
          event.stopPropagation();
          this.#onArrayField(input);
        });
      });
      // listas simples de texto (ArrayField de strings ou números)
      el.querySelectorAll('[data-list-path]').forEach((input) => {
        input.addEventListener('change', (event) => {
          event.stopPropagation();
          let values = String(input.value).split(',').map((s) => s.trim()).filter(Boolean);
          if (input.dataset.numeric) values = values.map(Number).filter((n) => Number.isFinite(n));
          this.document.update({ [input.dataset.listPath]: values });
        });
      });
      // botão Salvar: destaca quando há texto digitado que ainda não foi enviado
      if (!el._snDirty) {
        el._snDirty = true;
        el.addEventListener('input', (event) => {
          if (!event.target?.name) return;
          this._dirty = true;
          this._savedUntil = 0;
          this._applySaveState();
        });
      }
      this._applySaveState();
      // arrastar linhas
      el.querySelectorAll('[draggable="true"]').forEach((row) => {
        row.addEventListener('dragstart', (event) => this.#onDragRow(event, row));
      });
      // soltar em qualquer lugar da janela
      if (!el._snDnD) {
        el._snDnD = true;
        el.addEventListener('dragover', (event) => {
          if (!this.isEditable) return;
          event.preventDefault();
          el.classList.add('sn-dropping');
        });
        el.addEventListener('dragleave', (event) => {
          if (event.target === el || !el.contains(event.relatedTarget)) el.classList.remove('sn-dropping');
        });
        el.addEventListener('drop', (event) => {
          el.classList.remove('sn-dropping');
          return this._onDropSN(event);
        });
      }
    }

    #onArrayField(input) {
      const { arrayField: field, array: path, index } = input.dataset;
      const list = foundry.utils.deepClone(foundry.utils.getProperty(this.document._source, path) ?? []);
      const row = list[Number(index)];
      if (!row) return;
      let value = input.type === 'checkbox' ? input.checked : input.value;
      if (input.type === 'number') value = Number(value);
      if (input.dataset.list) {
        value = String(value).split(',').map((s) => s.trim()).filter(Boolean);
        if (input.dataset.numeric) value = value.map(Number).filter((n) => Number.isFinite(n));
      }
      if (input.dataset.json) {
        try {
          value = JSON.parse(value);
        } catch {
          return;
        }
      }
      foundry.utils.setProperty(row, field, value);
      return this.document.update({ [path]: list });
    }

    #onDragRow(event, row) {
      const raw = row.dataset.drag;
      if (raw) {
        event.dataTransfer.setData('text/plain', row.dataset.drag);
        return;
      }
      const id = row.dataset.itemId || row.closest('[data-item-id]')?.dataset.itemId;
      const item = id ? this.document.items?.get(id) : null;
      if (item) event.dataTransfer.setData('text/plain', JSON.stringify(item.toDragData()));
    }

    /** Arrastar e soltar: guarda por evento, pois o núcleo também liga seu próprio tratamento. */
    async _onDrop(event) {
      return this._onDropSN(event);
    }

    async _onDropSN(event) {
      if (event._snHandled) return;
      event._snHandled = true;
      if (!this.isEditable) return;
      event.preventDefault();
      const data = getDragEventData(event);
      if (!data?.type) return;
      if (data.type === 'Item') {
        const item = await Item.implementation.fromDropData(data);
        if (item) return this._dropItem(item);
      } else if (data.type === 'Folder') {
        const folder = await Folder.implementation.fromDropData(data);
        if (folder?.type === 'Item') {
          const items = await Promise.all(folder.contents.map((i) => (i instanceof Item ? i : fromUuid(i.uuid))));
          for (const item of items) await this._dropItem(item);
        }
      }
    }

    /** Sobrescrito pelas fichas. */
    async _dropItem(item) {
      return item;
    }

    async enrich(html) {
      return enrichHtml(html, { rollData: this.document.getRollData?.() ?? {}, relativeTo: this.document });
    }
  };
}

export { tpl, t, notify, confirm };
