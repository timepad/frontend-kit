import { HTMLAttributes, ReactNode } from "react";

/**
 * Пропсы компонента Accordion.
 *
 * Расширяет нативные атрибуты `<div>`.
 */
export interface IAccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Заголовок секции. Принимает текст или любой ReactNode, например Typography. */
  card: ReactNode;
  /** Содержимое раскрытой секции. */
  children?: ReactNode;
  /** Управляемое состояние раскрытия. */
  open?: boolean;
  /** Начальное состояние в неконтролируемом режиме. По умолчанию `false`. */
  defaultOpen?: boolean;
  /** Вызывается при изменении состояния раскрытия. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Цвет фона аккордеона.
   * Задаёт CSS-переменную `--fk-accordion-background`.
   */
  accordionBackground?: string;
}
