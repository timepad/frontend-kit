import { MouseEvent, DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * Размер модального окна.
 *
 * - **s** — компактное окно (до 440px), на мобильных — bottom sheet.
 * - **m** — среднее окно (до 600px), футер в режиме toolbar.
 * - **l** — широкое окно (до 960px), футер в режиме toolbar.
 * - **full** — максимальная ширина (до 1024px / почти на всю ширину viewport).
 */
export type ModalSize = "s" | "m" | "l" | "full";

/**
 * Выравнивание заголовка и подзаголовка в шапке.
 *
 * - **center** — по центру (по умолчанию).
 * - **start** — по левому краю (модификатор `align-start`).
 */
export type ModalHeaderAlign = "start" | "center";

/**
 * Направление раскладки футера для размера **s**.
 *
 * Для **m**, **l** и **full** футер всегда отображается как toolbar.
 *
 * - **column** — кнопки столбцом (layout `stack`).
 * - **row** — cancel/confirm в одну строку (layout `inline-actions`).
 */
export type ModalFooterDirection = "column" | "row";

/**
 * Внутреннее значение контекста {@link Modal}.
 * Пробрасывается в `Modal.Header`, `Modal.Body` и `Modal.Footer`.
 */
export interface IModalContextValue {
  /** Эффективный размер окна (на мобильных принудительно `s`). */
  size: ModalSize;
  /** Направление футера с учётом размера и мобильного режима. */
  footerDirection: ModalFooterDirection;
  /** Выравнивание текста в шапке. */
  headerAlign: ModalHeaderAlign;
  /** Мобильный режим (portrait, узкий viewport) — bottom sheet и drag-панель. */
  isMobileDevice: boolean;
  /** Верхняя граница-разделитель у футера (`box-shadow`). */
  withFooterDivider: boolean;
}

/** Обработчик клика по кнопкам модалки (close, back, footer actions). */
export type ButtonClickHandler = (
  event?: MouseEvent<HTMLButtonElement>,
) => void;

export interface IModalProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDialogElement>,
  HTMLDialogElement
> {
  isOpen: boolean;
  onClose?: ButtonClickHandler;
  size?: ModalSize;
  footerDirection?: ModalFooterDirection;
  headerAlign?: ModalHeaderAlign;
  /** Разделитель над футером. По умолчанию `false`. */
  withFooterDivider?: boolean;
  /** Размытие фона (`::backdrop`). По умолчанию `true`. */
  withBackdropBlur?: boolean;
}

/** Пропсы для {@link Modal.Header.BtnClose}. */
export interface IBtnCloseProps {
  onClose: ButtonClickHandler;
}

/** Пропсы для {@link Modal.Header.BtnBack}. */
export interface IBtnBackProps {
  onBack: ButtonClickHandler;
}

/**
 * Вариант раскладки футера, вычисляется из `size` и `footerDirection`.
 *
 * - **stack** — колонка кнопок (`s` + `column`).
 * - **inline-actions** — cancel и confirm в ряд (`s` + `row`).
 * - **toolbar** — сетка с back, before/after и группой кнопок (`m` / `l` / `full`).
 */
export type ModalFooterLayout = "stack" | "inline-actions" | "toolbar";
