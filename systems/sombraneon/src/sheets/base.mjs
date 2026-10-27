import { ID, t, tpl, getDragEventData, enrichHtml, notify, confirm } from '../util.mjs';
import { signed } from '../logic/abilities.mjs';

const { HandlebarsApplicationMixin } = foundry.applications.api;

/** Texto de dica a partir de partes { label, value }. */
export const partsTooltip = (parts = []) => parts.map((p) => `${p.label} ${signed(p.value)}`).join('\n');

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
      window: { resizable: true },
      form: { submitOnChange: true, closeOnSubmit: false },
      actions: {
        tab: SNSheet.#tab,
        toggleEdit: SNSheet.#toggleEdit,
        editImage: SNSheet.#editImage,
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
      this.element.querySelectorAll('[data-action="tab"]').forEach((b) => b.classList.toggle('active', b.dataset.tab === this._tab));
    }

    static #toggleEdit() {
      this._editing = !this._editing;
      this.render();
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
      // seletores e campos que passam por lógica (não pelo formulário)
      el.querySelectorAll('[data-change]').forEach((input) => {
        input.addEventListener('change', (event) => {
          event.stopPropagation();
          this._onChangeAction?.(input.dataset.change, event, input);
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
