import { useMemo } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import type { ValueFormatter, ValueParser } from "./formattedInput.utils";

type Slot = (ctx: { raw: string; display: string; isEmpty: boolean }) => React.ReactNode;

export type UseFormattedInputParams = {
  value: string;
  onValueChange: (raw: string) => void;

  format?: ValueFormatter;
  parse?: ValueParser;

  emptyVisual?: string;
  showEmptyVisual?: boolean;

  /** Ограничение raw (например maxDigits для цены) */
  maxLen?: number;

  /** Нормализация raw на blur */
  normalizeOnBlur?: (raw: string) => string;

  /** Слот */
  suffixSlot?: Slot;

  disabled?: boolean;
  readOnly?: boolean;
};

export const useFormattedInput = (params: UseFormattedInputParams) => {
  const {
    value,
    onValueChange,
    format = (r) => r,
    parse = (t) => t,
    emptyVisual = "",
    showEmptyVisual = true,
    maxLen,
    normalizeOnBlur,
    suffixSlot,
    disabled,
    readOnly,
  } = params;

  const raw = String(value ?? "");

  const limitedRaw = useMemo(() => {
    if (!maxLen) return raw;
    return raw.slice(0, maxLen);
  }, [raw, maxLen]);

  const display = useMemo(() => format(limitedRaw), [limitedRaw, format]);
  const isEmpty = limitedRaw.length === 0;

  const ctx = useMemo(
    () => ({ raw: limitedRaw, display, isEmpty }),
    [limitedRaw, display, isEmpty]
  );

  const ghostText = isEmpty && showEmptyVisual ? emptyVisual : null;

  const suffix = suffixSlot ? suffixSlot(ctx) : null;

  const emit = (nextRaw: string) => {
    const v = maxLen ? nextRaw.slice(0, maxLen) : nextRaw;
    onValueChange(v);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;
    emit(parse(e.target.value));
  };

  const onBlur: React.FocusEventHandler<HTMLInputElement> = (e: FocusEvent<HTMLInputElement>) => {
    if (!disabled && !readOnly && normalizeOnBlur) {
      const next = normalizeOnBlur(limitedRaw);
      if (next !== limitedRaw) emit(next);
    }
  };

  return {
    raw: limitedRaw,
    display,          // это кладём в input.value
    isEmpty,

    ghostText,        // это рисуем overlay'ем
    suffix,

    handlers: {
      onChange,
      onBlur,
    },
  };
};
