import type { ReactNode, TextareaHTMLAttributes } from "react";

/**
 * Размер текстового поля.
 *
 * - **s** — компактный вариант (меньшая высота, используется в плотных интерфейсах)
 * - **m** — стандартный размер (по умолчанию)
 */
export type TextareaSize = "s" | "m";

interface BaseTextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "defaultValue"
> {
  value: string;
  onChange: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"];
  label: ReactNode;
  /**
   * Разрешает изменение размера textarea пользователем.
   *
   * - `true` — разрешён resize (по вертикали)
   * - `false` — фиксированный размер (по умолчанию)
   */
  resize?: boolean;
  size?: TextareaSize;
  error?: ReactNode;
}

interface TextareaWithDescription {
  description?: ReactNode;
  maxSymbols?: never;
}

interface TextareaWithCounter {
  maxSymbols: number;
  description?: never;
}

export type ITextareaProps = BaseTextareaProps &
  (TextareaWithDescription | TextareaWithCounter);
