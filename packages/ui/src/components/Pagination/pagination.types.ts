import { FC, HTMLAttributes, SVGProps } from "react";

import { IconPosition } from "../Button/button.types";
import {
  IconChevronLeft16Outline,
  IconChevronLeft24Outline,
  IconChevronRight16Outline,
  IconChevronRight24Outline,
  IconDots16Fill,
  IconDots24Fill,
} from "../../assets/icons";
import { PaginationItem } from "./pagination.helpers";

/**
 * Размер контролов пагинации.
 * Совпадает с размером `Button` и `IconButton`.
 *
 * - **s** — 32px, отступ между контролами 4px.
 * - **m** — 40px, отступ между контролами 6px.
 */
export type PaginationSize = "s" | "m";

export interface IPaginationProps extends HTMLAttributes<HTMLElement> {
  /**
   * Текущая страница.
   * Нумерация начинается с 1.
   */
  page: number;
  /** Общее количество страниц. */
  pageCount: number;
  /** Вызывается с номером выбранной страницы в диапазоне `1…pageCount`. */
  onPageChange: (page: number) => void;
  /**
   * Сколько номеров показывать слева и справа от текущей страницы.
   * Первая и последняя страницы всегда остаются видимыми.
   * Соседний пропуск из одной страницы показывается числом, а не многоточием.
   *
   * @default 1
   */
  siblingCount?: number;
  /** Блокирует переход между страницами. */
  disabled?: boolean;
  /**
   * Размер кнопок и отступа между ними.
   * @default "s"
   */
  size?: PaginationSize;
}

export interface IPaginationContextValue {
  page: number;
  pageCount: number;
  disabled: boolean;
  items: PaginationItem[];
  selectPage: (page: number) => void;
  size: PaginationSize;
}

/**
 * Содержимое кнопки «назад» или «вперёд».
 *
 * - без `label` — только шеврон
 * - `label` без `icon` — только текст
 * - `label` и `icon` — текст и шеврон
 */
export interface IPaginationStepProps {
  /** Текст кнопки. */
  label?: string;
  /**
   * Показывает шеврон рядом с текстом.
   * Без `label` шеврон показывается всегда.
   */
  icon?: boolean;
  /**
   * Имя для скринридера.
   * Имеет смысл для кнопки без текста: у текстовой имя берётся из `label`.
   */
  ariaLabel?: string;
}

export type PaginationDirection = "prev" | "next";

type PaginationIcon = FC<SVGProps<SVGSVGElement>>;

export const ellipsisIcon: Record<PaginationSize, PaginationIcon> = {
  s: IconDots16Fill,
  m: IconDots24Fill,
};

export const stepConfig: Record<
  PaginationDirection,
  {
    ariaLabel: string;
    iconPosition: IconPosition;
    icon: Record<PaginationSize, PaginationIcon>;
  }
> = {
  prev: {
    ariaLabel: "Previous page",
    iconPosition: "left",
    icon: {
      s: IconChevronLeft16Outline,
      m: IconChevronLeft24Outline,
    },
  },
  next: {
    ariaLabel: "Next page",
    iconPosition: "right",
    icon: {
      s: IconChevronRight16Outline,
      m: IconChevronRight24Outline,
    },
  },
};
