import { HTMLAttributes } from "react";

export type ScrollbarAxis = "auto" | "vertical" | "horizontal";

export interface IScrollbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ограничение оси прокрутки.
   * По умолчанию `auto` — браузер сам показывает нужные полосы.
   */
  axis?: ScrollbarAxis;
}
