import { ButtonHTMLAttributes, ReactElement, SVGProps } from "react";

/**
 * Варианты размера кнопки.
 * - **s**: Компактная кнопка (меньше текст и отступы).
 * - **m**: Размер по умолчанию.
 */
export type ButtonSize = "s" | "m";

/**
 * Визуальный стиль (вариант дизайна) кнопки.
 * Соответствует семантике дизайн-системы:
 * - **primary**: Основное действие, максимальный акцент.
 * - **primary-alternate**: Инверсная версия primary (обычно для тёмных фонов).
 * - **secondary**: Нейтральная кнопка, меньший акцент.
 * - **negative**: Деструктивные действия (удалить, отменить, снять).
 * - **disable**: Визуально “выключенное”, неинтерактивное состояние.
 */
export type ButtonVariant =
  | "primary"
  | "primary-alternate"
  | "secondary"
  | "negative"
  | "disable";

/**
 * Позиция иконки относительно текста кнопки.
 * - **left**: Иконка перед текстом.
 * - **right**: Иконка после текста.
 */
export type IconPosition = "left" | "right";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
  iconPosition?: IconPosition;
}
