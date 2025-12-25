// input.types.ts
import type { InputHTMLAttributes } from "react";

export type ValidationContext = {
  raw: string;
  masked: string;
  isComplete: boolean;
};

export type ValidateOn = "change" | "blur" | "touched";

export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
  value?: string;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onClearField?: () => void;
  onValueChange?: (value: string) => void;

  /** Маска, например "99/мм" */
  mask?: string;

  /** Кастомная валидация поверх маски */
  validator?: (ctx: ValidationContext) => string | null;

  /**
   * Когда показывать ошибку валидатора:
   * - change: сразу при вводе
   * - blur: только после blur
   * - touched: после первого изменения
   */
  validateOn?: ValidateOn;

  /** Отдавать наружу masked вместо raw (обычно тебе нужно raw) */
  returnMasked?: boolean;
}
