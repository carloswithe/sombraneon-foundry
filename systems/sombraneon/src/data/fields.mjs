/** Campos reutilizáveis dos modelos de dados (Foundry v13). */
const f = () => foundry.data.fields;

export const int = (initial = 0, extra = {}) => new (f().NumberField)({ required: true, nullable: false, integer: true, initial, ...extra });
export const num = (initial = 0, extra = {}) => new (f().NumberField)({ required: true, nullable: false, initial, ...extra });
export const nullableInt = () => new (f().NumberField)({ required: false, nullable: true, integer: true, initial: null });
export const str = (initial = '', extra = {}) => new (f().StringField)({ required: true, blank: true, nullable: false, initial, ...extra });
export const bool = (initial = false) => new (f().BooleanField)({ required: true, initial });
export const html = () => new (f().HTMLField)({ required: false, blank: true, initial: '' });
export const obj = () => new (f().ObjectField)({ required: true, nullable: false, initial: () => ({}) });
export const strArray = () => new (f().ArrayField)(new (f().StringField)({ required: true, blank: true }), { required: true, initial: () => [] });
export const numArray = () => new (f().ArrayField)(new (f().NumberField)({ required: true, nullable: false }), { required: true, initial: () => [] });

/** Modificador (docs/spec/02, seção 3.1). */
export const modifierSchema = () =>
  new (f().SchemaField)({
    key: str(),
    mode: str('add'),
    value: str(),
    when: str(),
    label: str()
  });
export const modifiers = () => new (f().ArrayField)(modifierSchema(), { required: true, initial: () => [] });

/** Uso limitado (docs/spec/02, seção 3.3). */
export const usesSchema = () =>
  new (f().SchemaField)({
    max: int(0),
    value: int(0),
    per: str('')
  });

/** Concessão (docs/spec/02, seção 3.2). */
export const grants = () =>
  new (f().ArrayField)(
    new (f().SchemaField)({
      kind: str('item'),
      ref: str(),
      level: int(1),
      qty: int(1),
      from: new (f().SchemaField)({ type: str(), filter: obj() }),
      count: int(1),
      key: str()
    }),
    { required: true, initial: () => [] }
  );

/** Escolhas que devem ser perguntadas ao adicionar o item. */
export const choices = () =>
  new (f().ArrayField)(
    new (f().SchemaField)({ key: str(), kind: str(), options: strArray() }),
    { required: true, initial: () => [] }
  );

export const weaponLineSchema = () =>
  new (f().SchemaField)(
    {
      name: str(),
      damage: str(),
      kind: str(),
      range: str(),
      family: str(),
      ignoreArmor: int(0),
      stunOn: str(),
      notes: str(),
      properties: strArray()
    },
    { required: false, nullable: true, initial: null }
  );
