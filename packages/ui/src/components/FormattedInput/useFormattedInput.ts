import { useMemo } from "react";
import type { ChangeEvent, FocusEvent } from "react";
import { getGhostText, getSuffix, limitRawLen } from "./useFormattedInput.helpers";
import type { UseFormattedInputParams } from "./useFormattedInput.types";

export type { FormattedInputSlot, FormattedInputSlotContext, UseFormattedInputParams } from "./useFormattedInput.types";

/**
 * Хук управления форматированным вводом:
 * конвертирует RAW <-> display, управляет пустым состоянием и обработчиками поля.
 *
 * @param params - Параметры форматирования, парсинга и поведения поля.
 * @returns Данные для рендера (`raw`, `display`, `ghostText`, `suffix`) и обработчики (`handlers`).
 */
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

  /** Ограниченное по `maxLen` RAW-значение. */
  const limitedRaw = useMemo(() => {
    return limitRawLen(raw, maxLen);
  }, [raw, maxLen]);

  /** Значение для отображения в `input.value`. */
  const display = useMemo(() => format(limitedRaw), [limitedRaw, format]);

  /** Флаг пустого RAW-значения. */
  const isEmpty = limitedRaw.length === 0;

  /** Контекст для слотов и внешней логики отображения. */
  const ctx = useMemo(
    () => ({ raw: limitedRaw, display, isEmpty }),
    [limitedRaw, display, isEmpty]
  );

  /** Текст overlay для пустого состояния. */
  const ghostText = getGhostText(isEmpty, showEmptyVisual, emptyVisual);

  /** Контент suffix-слота (если задан). */
  const suffix = getSuffix(suffixSlot, ctx);

  /**
   * Отправляет наружу новое RAW-значение с учётом ограничения `maxLen`.
   *
   * @param nextRaw - Следующее RAW-значение.
   */
  const emit = (nextRaw: string) => {
    const v = limitRawLen(nextRaw, maxLen);
    onValueChange(v);
  };

  /**
   * Обработчик изменения значения инпута.
   * Парсит `input.value` в RAW и эмитит наружу.
   */
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;
    emit(parse(e.target.value));
  };

  /**
   * Обработчик blur:
   * выполняет опциональную нормализацию RAW и эмитит изменение при необходимости.
   */
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
