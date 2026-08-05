import { HTMLAttributes, type ReactHTML } from "react";

/**
 * Ось прокрутки.
 * - `auto` — обе оси по необходимости (`overflow: auto`)
 * - `vertical` / `horizontal` — ограничение одной оси
 */
export type ScrollbarAxis = "auto" | "vertical" | "horizontal";

export interface IScrollbarProps extends HTMLAttributes<HTMLElement> {
  /**
   * Ограничение оси прокрутки.
   * По умолчанию `auto` — браузер сам показывает вертикальную, горизонтальную
   * или обе полосы в зависимости от размеров контента.
   */
  axis?: ScrollbarAxis;
  /**
   * Корневой HTML-элемент. Позволяет применить стили скроллбара
   * к семантическому контейнеру (`section`, `aside` и т.п.) без лишней обёртки.
   * @default "div"
   */
  as?: keyof ReactHTML;
}
