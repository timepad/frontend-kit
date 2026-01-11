import type { ReactNode, TextareaHTMLAttributes } from "react";


export type TextareaSize = "s" | "m";

export interface ITextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  label: ReactNode;

  /**
   * Enables resize behavior for the textarea.
   *
   * - `true` — user can resize (usually vertical)
   * - `false` — textarea has fixed size (default)
   */
  resize?: boolean;

  /**
   * Size variant of the textarea.
   *
   * - **s** — compact
   * - **m** — default
   */
  size?: TextareaSize;

  /**
   * Helper text shown below the field.
   *
   * Displayed only when there is no `error`.
   */
  description?: ReactNode;

  /**
   * Error message shown below the field.
   *
   * If provided, it overrides `description`.
   * It also marks the textarea as invalid (`aria-invalid`).
   */
  error?: ReactNode;

  /**
   * Max allowed number of characters.
   *
   * - When `maxSymbols > 0`, a counter is shown.
   * - When user exceeds the limit, the counter becomes an error state.
   *
   * ⚠️ This prop does NOT prevent typing — it only adds visual feedback.
   * If you need to enforce the limit, do it in `onChange`.
   */
  maxSymbols?: number;
}
