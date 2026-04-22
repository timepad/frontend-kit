import { InputHTMLAttributes, ReactNode } from "react";

/**
 * Размер чекбокса.
 *
 * - **s** — компактный
 * - **m** — стандартный (по умолчанию)
 * - **l** — крупный
 */
export type CheckboxSize = "s" | "m" | "l";
// export type CheckboxCheckedState = boolean | "indeterminate";

/**
 * Пропсы компонента Checkbox.
 *
 * Расширяет нативные атрибуты `<input type="checkbox">`, кроме `size`, `type`, `placeholder`.
 */
export interface ICheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "placeholder"
> {
  /** Размер чекбокса и подписи. По умолчанию `"m"`. */
  size?: CheckboxSize;
  /** Основная подпись (лейбл) рядом с чекбоксом. Обязательный проп. */
  label: ReactNode;
  /** Дополнительный текст рядом с подписью. Отображается цветом tertiary. */
  extraLabel?: ReactNode;
  /** Визуальное состояние ошибки (красная обводка чекбокса). */
  isError?: boolean;
  /** Вспомогательный текст под подписью. */
  description?: ReactNode;
  /** Неопределенное состояние чекбокса. */
  indeterminate?: boolean;
}
