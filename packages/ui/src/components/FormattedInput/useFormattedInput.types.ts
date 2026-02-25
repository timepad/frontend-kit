import type { ReactNode } from "react";
import type { ValueFormatter, ValueParser } from "./formattedInputHelpers";

/** Контекст форматированного значения, доступный для slot-рендера. */
export type FormattedInputSlotContext = {
  raw: string;
  display: string;
  isEmpty: boolean;
};

/** Тип функции пользовательского слота справа от инпута. */
export type FormattedInputSlot = (ctx: FormattedInputSlotContext) => ReactNode;

/** Параметры хука `useFormattedInput`. */
export type UseFormattedInputParams = {
  /** RAW-значение поля. */
  value: string;
  /** Колбэк изменения RAW-значения. */
  onValueChange: (raw: string) => void;

  /** Функция форматирования RAW для отображения в `input.value`. */
  format?: ValueFormatter;
  /** Функция парсинга пользовательского ввода в RAW-значение. */
  parse?: ValueParser;

  /** Визуальный текст для пустого состояния (рисуется в overlay). */
  emptyVisual?: string;
  /** Показывать ли `emptyVisual`, когда RAW пустой. */
  showEmptyVisual?: boolean;

  /** Ограничение длины RAW (например, `maxDigits` для цены). */
  maxLen?: number;

  /** Нормализация RAW-значения на blur. */
  normalizeOnBlur?: (raw: string) => string;

  /** Кастомный suffix-слот. */
  suffixSlot?: FormattedInputSlot;

  disabled?: boolean;
  readOnly?: boolean;
};

