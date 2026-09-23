import { HTMLAttributes, ReactNode, MouseEventHandler } from "react";

/**
 * Пропсы компонента Accordion.
 *
 * Расширяет нативные атрибуты корневого `<div>`.
 * `onClick` относится к кнопке заголовка, а не к корню.
 */
export interface IAccordionProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onClick"
> {
  /**
   * Заголовок секции, рендерится внутри `<button>`.
   * Текст или любой ReactNode. Для Typography укажите `as="span"`.
   */
  card: ReactNode;
  /** Содержимое раскрытой секции. */
  children?: ReactNode;
  /**
   * Начальное состояние раскрытия.
   * Если передан `onOpenChange`, становится управляемым.
   * По умолчанию `false`.
   */
  open?: boolean;
  /** Вызывается при изменении состояния раскрытия. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Цвет фона карточек.
   * Задаёт CSS-переменную `--fk-accordion-background`.
   * По умолчанию — `--fk-bg-primary`.
   */
  accordionBackground?: string;
  /**
   * Разделяет заголовок и содержимое на две карточки
   * с пунктирным разделителем между ними.
   * По умолчанию `false`.
   */
  divider?: boolean;
  /** Обработчик клика по кнопке заголовка. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
