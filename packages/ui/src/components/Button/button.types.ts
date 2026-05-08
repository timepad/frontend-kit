import { ButtonHTMLAttributes, ReactElement, SVGProps } from "react";

/**
 * Варианты размера кнопки.
 * - **s**: Компактная кнопка (меньше текст и отступы).
 * - **m**: Размер по умолчанию.
 * - **l**: Кнопка для мобильных версий / модальных окон.
 */
export type ButtonSize = "s" | "m" | "l";

/**
 * Визуальный стиль (вариант дизайна) кнопки.
 * Соответствует семантике дизайн-системы:
 * - **primary**: Основное действие, максимальный акцент.
 * - **primary-alternate**: Инверсная версия primary (обычно для тёмных фонов).
 * - **secondary**: Нейтральная кнопка, меньший акцент.
 * - **negative**: Деструктивные действия (удалить, отменить, снять).
 * - **transparent**: Прозрачная.
 */
export type ButtonVariant =
  | "primary"
  | "primary-alternate"
  | "secondary"
  | "negative"
  | "transparent"

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
