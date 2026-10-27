import { SN } from '../config.mjs';
import { t, esc, DialogV2 } from '../util.mjs';

const formData = (button) => new foundry.applications.ux.FormDataExtended(button.form).object;

const opts = (list, selected) =>
  list.map((o) => `<option value="${esc(o.value)}"${String(o.value) === String(selected) ? ' selected' : ''}>${esc(o.label)}</option>`).join('');

/**
 * Escolha de itens com busca. `options`: [{ value, label, img?, hint? }].
 * Devolve o valor escolhido (ou lista, com `multiple`), ou null se cancelado.
 */
export async function chooseDialog({ title, options, count = 1, multiple = false, hint = '', required = true }) {
  const type = multiple ? 'checkbox' : 'radio';
  const rows = options
    .map(
      (o, i) => `<label class="sn-choice" data-search="${esc(`${o.label} ${o.hint ?? ''}`.toLowerCase())}">
        <input type="${type}" name="choice" value="${esc(o.value)}"${!multiple && i === 0 ? ' checked' : ''}>
        ${o.img ? `<img src="${esc(o.img)}" alt="">` : ''}
        <span class="sn-choice-text"><strong>${esc(o.label)}</strong>${o.hint ? `<small>${esc(o.hint)}</small>` : ''}</span>
      </label>`
    )
    .join('');
  const content = `<div class="sombraneon sn-dialog">
    ${hint ? `<p class="sn-hint">${esc(hint)}</p>` : ''}
    ${options.length > 6 ? `<input type="search" class="sn-search" placeholder="${esc(t('Dialog.Search'))}">` : ''}
    ${multiple ? `<p class="sn-hint sn-count">${esc(t('Dialog.PickCount', { count }))}</p>` : ''}
    <div class="sn-choice-list">${rows || `<p class="sn-empty">${esc(t('Dialog.NoOptions'))}</p>`}</div>
  </div>`;
  const result = await DialogV2().wait({
    window: { title },
    position: { width: 460 },
    content,
    rejectClose: false,
    buttons: [
      {
        action: 'ok',
        label: t('Dialog.Confirm'),
        default: true,
        callback: (event, button) => {
          const form = button.form;
          const values = [...form.querySelectorAll('input[name="choice"]:checked')].map((e) => e.value);
          return { values };
        }
      },
      { action: 'cancel', label: t('Dialog.Cancel') }
    ],
    render: (event, dialog) => {
      const el = dialog.element ?? event.target?.element;
      const search = el?.querySelector('.sn-search');
      search?.addEventListener('input', () => {
        const q = search.value.trim().toLowerCase();
        el.querySelectorAll('.sn-choice').forEach((row) => (row.hidden = q !== '' && !row.dataset.search.includes(q)));
      });
      if (multiple) {
        const boxes = [...el.querySelectorAll('input[name="choice"]')];
        const update = () => {
          const picked = boxes.filter((b) => b.checked).length;
          boxes.forEach((b) => (b.disabled = !b.checked && picked >= count));
        };
        boxes.forEach((b) => b.addEventListener('change', update));
      }
    }
  });
  if (!result || typeof result !== 'object') return null;
  if (required && result.values.length === 0) return null;
  return multiple ? result.values : result.values[0] ?? null;
}

/** Janela de teste com chips de contexto (docs/spec/03, seção 5.2). */
export async function rollDialog({ title, ability = 'for', tags = [], knowledge = '', cd = '', allowedTags = SN.checkTags }) {
  const abilityOpts = SN.abilities.map((k) => ({ value: k, label: t(`Abilities.${k}`) }));
  const cdOpts = [
    { value: '', label: t('Roll.NoCd') },
    ...Object.entries(SN.difficulty).map(([k, v]) => ({ value: v, label: `${t(`Roll.Difficulty.${k}`)} (${v})` }))
  ];
  const chips = allowedTags
    .map(
      (tag) => `<label class="sn-chip"><input type="checkbox" name="tag" value="${tag}"${tags.includes(tag) ? ' checked' : ''}><span>${esc(t(`Tags.${tag}`))}</span></label>`
    )
    .join('');
  const content = `<div class="sombraneon sn-dialog sn-roll-dialog">
    <div class="sn-row">
      <label>${esc(t('Roll.Ability'))}<select name="ability">${opts(abilityOpts, ability)}</select></label>
      <label>${esc(t('Roll.Cd'))}<select name="cd">${opts(cdOpts, cd)}</select></label>
      <label>${esc(t('Roll.Bonus'))}<input type="number" name="bonus" value="0"></label>
    </div>
    ${knowledge ? `<label class="sn-chip sn-chip-knowledge"><input type="checkbox" name="knowledge"><span>${esc(t('Roll.Knowledge'))}: ${esc(knowledge)}</span></label>` : ''}
    <fieldset><legend>${esc(t('Roll.Context'))}</legend><div class="sn-chips">${chips}</div></fieldset>
    <div class="sn-row sn-mode">
      <label><input type="radio" name="mode" value="normal" checked> ${esc(t('Roll.Normal'))}</label>
      <label><input type="radio" name="mode" value="advantage"> ${esc(t('Roll.Advantage'))}</label>
      <label><input type="radio" name="mode" value="disadvantage"> ${esc(t('Roll.Disadvantage'))}</label>
    </div>
  </div>`;
  const data = await DialogV2().prompt({
    window: { title },
    position: { width: 520 },
    content,
    rejectClose: false,
    ok: {
      label: t('Roll.Roll'),
      callback: (event, button) => {
        const form = button.form;
        return {
          ability: form.elements.ability.value,
          cd: form.elements.cd.value ? Number(form.elements.cd.value) : null,
          bonus: Number(form.elements.bonus.value) || 0,
          mode: form.querySelector('input[name="mode"]:checked')?.value ?? 'normal',
          tags: [...form.querySelectorAll('input[name="tag"]:checked')].map((e) => e.value),
          knowledge: form.elements.knowledge?.checked ? knowledge : ''
        };
      }
    }
  });
  return data && typeof data === 'object' ? data : null;
}

/** Opções do ataque (docs/spec/03, seção 4.4). */
export async function attackDialog({ line, hasSneak, hasCharge, canTwin }) {
  const checks = [
    ['unaware', true, t('Attack.Unaware')],
    ['aim', line.properties?.includes('aim'), t('Attack.Aim')],
    ['sneak', hasSneak, t('Attack.Sneak')],
    ['charge', hasCharge, t('Attack.Charge')],
    ['twin', canTwin, t('Attack.Twin')],
    ['burst', line.properties?.includes('burst'), t('Attack.Burst')]
  ]
    .filter(([, show]) => show)
    .map(([key, , label]) => `<label class="sn-chip"><input type="checkbox" name="opt-${key}"><span>${esc(label)}</span></label>`)
    .join('');
  const content = `<div class="sombraneon sn-dialog">
    <div class="sn-chips">${checks}</div>
    <div class="sn-row sn-mode">
      <label><input type="radio" name="mode" value="normal" checked> ${esc(t('Roll.Normal'))}</label>
      <label><input type="radio" name="mode" value="advantage"> ${esc(t('Roll.Advantage'))}</label>
      <label><input type="radio" name="mode" value="disadvantage"> ${esc(t('Roll.Disadvantage'))}</label>
    </div>
    <label>${esc(t('Roll.Bonus'))}<input type="number" name="situational" value="0"></label>
  </div>`;
  const data = await DialogV2().prompt({
    window: { title: line.name },
    position: { width: 440 },
    content,
    rejectClose: false,
    ok: {
      label: t('Attack.Roll'),
      callback: (event, button) => {
        const f = button.form;
        const opt = (k) => !!f.elements[`opt-${k}`]?.checked;
        return {
          mode: f.querySelector('input[name="mode"]:checked')?.value ?? 'normal',
          options: {
            unaware: opt('unaware'),
            aim: opt('aim'),
            sneak: opt('sneak'),
            charge: opt('charge'),
            twin: opt('twin'),
            burst: opt('burst'),
            situational: Number(f.elements.situational.value) || 0
          }
        };
      }
    }
  });
  return data && typeof data === 'object' ? data : null;
}

/** Compra ao soltar item (docs/spec/03, seção 6.10). Devolve 'free', 'buy' ou null. */
export async function purchaseDialog({ name, price, balance }) {
  const afford = balance >= price;
  const content = `<div class="sombraneon sn-dialog"><p>${esc(t('Purchase.Text', { name, price: format(price), balance: format(balance) }))}</p>${
    afford ? '' : `<p class="sn-warn">${esc(t('Purchase.Missing', { missing: format(price - balance) }))}</p>`
  }</div>`;
  const result = await DialogV2().wait({
    window: { title: t('Purchase.Title') },
    content,
    rejectClose: false,
    buttons: [
      { action: 'free', label: t('Purchase.Free'), callback: () => 'free' },
      { action: 'buy', label: t('Purchase.Buy', { price: format(price) }), default: afford, disabled: !afford, callback: () => 'buy' },
      { action: 'cancel', label: t('Dialog.Cancel') }
    ]
  });
  return result === 'free' || result === 'buy' ? result : null;
}

/** Qualidade do implante (Rua, Corp ou Militar) com preço e o que cada uma acrescenta. */
export async function qualityDialog({ implant, onlyStreet = false, balance = 0, mode = 'ask' }) {
  const rows = SN.qualityOrder
    .filter((q) => !onlyStreet || q === 'street')
    .map((q) => {
      const tier = implant.system.tiers[q];
      const price = onlyStreet ? 0 : SN.implantQualities[q];
      return `<label class="sn-choice"><input type="radio" name="quality" value="${q}"${q === 'street' ? ' checked' : ''}>
        <span class="sn-choice-text"><strong>${esc(t(`Quality.${q}`))} (${format(price)})</strong><small>${esc(tier.delta || tier.summary)}</small></span></label>`;
    })
    .join('');
  const content = `<div class="sombraneon sn-dialog"><div class="sn-choice-list">${rows}</div>
    <label class="sn-chip"><input type="checkbox" name="clinic"><span>${esc(t('Implant.Clinic'))}</span></label>
    <p class="sn-hint">${esc(t('Implant.SurgeryHint'))}</p>
    ${mode === 'free' || onlyStreet ? '' : `<p class="sn-hint">${esc(t('Purchase.Balance', { balance: format(balance) }))}</p>`}</div>`;
  const result = await DialogV2().prompt({
    window: { title: implant.name },
    content,
    rejectClose: false,
    ok: {
      label: t('Dialog.Confirm'),
      callback: (event, button) => ({
        quality: button.form.querySelector('input[name="quality"]:checked')?.value ?? 'street',
        clinic: !!button.form.elements.clinic.checked
      })
    }
  });
  return result && typeof result === 'object' ? result : null;
}

export async function selectPrompt({ title, label, options, selected }) {
  const content = `<div class="sombraneon sn-dialog"><label>${esc(label)}<select name="value">${opts(options, selected)}</select></label></div>`;
  const result = await DialogV2().prompt({
    window: { title },
    content,
    rejectClose: false,
    ok: { label: t('Dialog.Confirm'), callback: (event, button) => button.form.elements.value.value }
  });
  return typeof result === 'string' ? result : null;
}

export async function numberPrompt({ title, label, value = 0, min, max }) {
  const attrs = `${min !== undefined ? ` min="${min}"` : ''}${max !== undefined ? ` max="${max}"` : ''}`;
  const content = `<div class="sombraneon sn-dialog"><label>${esc(label)}<input type="number" name="value" value="${value}"${attrs}></label></div>`;
  const result = await DialogV2().prompt({
    window: { title },
    content,
    rejectClose: false,
    ok: { label: t('Dialog.Confirm'), callback: (event, button) => Number(button.form.elements.value.value) }
  });
  return Number.isFinite(result) ? result : null;
}

export const format = (n) => `${new Intl.NumberFormat('pt-BR').format(Number(n) || 0)} cr`;
export { formData, opts };
