import { ButtonHTMLAttributes, ReactElement, SVGProps } from "react";

/**
 * Варианты размеров иконки-кнопки.
 *
 * - **xs** — ультракомпактная кнопка; обычно используется для icon-only контролов,
 *            тулбаров, второстепенных элементов интерфейса или в местах
 *            с жёсткими ограничениями по пространству.
 * - **s** — компактная кнопка.
 * - **m** — размер по умолчанию.
 */
export type IconButtonSize = "xs" | "s" | "m";

/**
 * Визуальный стиль (дизайн-вариант) кнопки.
 * Соответствует семантике дизайн-системы:
 *
 * - **primary** — основное действие, высокий приоритет.
 * - **primary-alternate** — инверсная версия primary (например, для тёмных фонов).
 * - **secondary** — нейтральный вариант, меньший акцент.
 * - **negative** — деструктивные действия (удаление, отмена и т.д.).
 * - **disable** — визуально отключённое, неинтерактивное состояние.
 * - **transparent** — минималистичная кнопка без фона для ненавязчивых
 *   встроенных действий; используется на плоских поверхностях или там,
 *   где иконка должна визуально «вписываться» в контент.
 */
export type IconButtonVariant =
  | "primary"
  | "primary-alternate"
  | "secondary"
  | "negative"
  | "disable"
  | "transparent";

/**
 * Доступное имя для компонента (используется скринридерами).
 *
 * Компонент должен иметь **одно** описание действия.
 *
 * Возможны два варианта:
 * - `ariaLabel` — текстовое описание (самый частый случай).
 * - `ariaLabelledby` — ссылка на `id` элемента с текстом в DOM.
 *
 * Нельзя:
 * - передавать оба свойства одновременно
 * - не передать ни одного
 *
 * Ограничение проверяется на уровне TypeScript.
 */
type AccessibleName =
  | { ariaLabel: string; ariaLabelledby?: never }
  | { ariaLabel?: never; ariaLabelledby: string };

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "aria-label" | "aria-labelledby"
>;

export type IIconButtonProps = NativeButtonProps &
  AccessibleName & {
    icon: ReactElement<SVGProps<SVGSVGElement>>;
    size?: IconButtonSize;
    variant?: IconButtonVariant;
  };
