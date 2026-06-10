import { InputHTMLAttributes, ReactNode } from "react";

/**
 * Размер радио-кнопки.
 *
 * - **s** — компактный (меньший кружок и отступы)
 * - **m** — стандартный (по умолчанию)
 * - **l** — крупный
 */
export type RadioSize = "s" | "m" | "l";

/**
 * Пропсы компонента Radio.
 *
 * Расширяет нативные атрибуты `<input type="radio">`, кроме `size`, `type`, `placeholder`.
 */
export interface IRadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "placeholder"
> {
  /** Размер радио-кнопки и подписи. По умолчанию `"m"`. */
  size?: RadioSize;
  /** Основная подпись (лейбл) рядом с кружком. Обязательный проп. */
  label: ReactNode;
  /** Дополнительный текст рядом с подписью. Отображается цветом tertiary. */
  extraLabel?: ReactNode;
  /** Визуальное состояние ошибки (красная обводка кружка). */
  isError?: boolean;
  /** Вспомогательный текст под подписью. */
  description?: ReactNode;
}
