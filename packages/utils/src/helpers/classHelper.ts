import { Preset, withNaming } from "@bem-react/classname";

/* Расшифровка пресета:
  n: префикс
  e: элемент
  m: модификатор
  v: значение

  Пример использования component:
  component('form', 'input')({error: true, ['input-type']: 'simple'}) =>
  "fk-cform__input fk-cform__input--error fk-cform__input--input-type_simple",
  где input — элемент, error: true — модификатор, type: 'simple' — значение
*/
export const defaultPreset: Preset = {
  e: "__",
  m: "--",
  v: "_",
};

const componentPreset: Preset = { ...defaultPreset, n: "fk-c" };
const layoutPreset: Preset = { ...defaultPreset, n: "fk-l" };

export const cn = withNaming(defaultPreset);

export const component = withNaming(componentPreset);
export const layout = withNaming(layoutPreset);
