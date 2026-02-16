import { InputHTMLAttributes, MouseEvent, ReactNode } from "react";
import type { MaskedInputProps } from "../MaskedInput";
import type { FormattedInputProps } from "../FormattedInput/FormattedInput";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: ReactNode;
  onClearField?: (event: MouseEvent<HTMLButtonElement>) => void;
  error?: ReactNode;
  description?: ReactNode;

  /** Слот для оверлея */
  fieldOverlay?: ReactNode;
}

// ============================================
// Phone Input
// ============================================

export type PhoneInputProps = Omit<
  MaskedInputProps,
  "mask" | "value" | "onValueChange"
> & {
  /** Значение телефона в формате +7XXXXXXXXXX (RAW value) */
  value?: string;

  /** Обработчик изменения значения (возвращает RAW value) */
  onValueChange?: (value: string) => void;

  /** Маска для телефона (по умолчанию +7 XXX XXX-XX-XX) */
  mask?: string;

  /** Предустановленный тип маски */
  phoneMaskType?: PhoneMaskType;
};

export type PhoneMaskType = "RU";

// ============================================
// Time Input
// ============================================

export type TimeInputProps = Omit<
  MaskedInputProps,
  "mask" | "value" | "onValueChange"
> & {
  /** Значение времени в формате HHMM (RAW value) */
  value?: string;

  /** Обработчик изменения значения (возвращает RAW value) */
  onValueChange?: (value: string) => void;
  
  label?: string;
};

// ============================================
// Time Range Input
// ============================================

export type TimeRangeInputProps = Omit<
  MaskedInputProps,
  "mask" | "value" | "onValueChange"
> & {
  /** Значение диапазона времени в формате "HHMM-HHMM" (RAW value) */
  value?: string;

  /** Обработчик изменения значения (возвращает RAW value) */
  onValueChange?: (value: string) => void;
  
  label?: string;
};

// ============================================
// Price Input
// ============================================

export type PriceInputProps = Omit<
  FormattedInputProps,
  "format" | "parse" | "suffixSlot" | "inputMode" | "emptyVisual"
> & {
  value?: string;
  onValueChange?: (value: string) => void;
  currencySymbol?: string;
  label?: string;
};

// ============================================
// Discount Input
// ============================================

export type DiscountInputProps = Omit<
  FormattedInputProps,
  "format" | "parse" | "suffixSlot" | "value" | "onValueChange"
> & {
  /** Значение скидки в процентах или рублях */
  value?: string;

  /** Обработчик изменения значения */
  onValueChange?: (value: string) => void;
  
  /** Тип скидки */
  discountType?: "percent" | "amount";
  
  label?: string;
};
