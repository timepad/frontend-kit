import { HTMLAttributes } from "react";

export type DividerFlow = "horizontal" | "vertical";

/**
 * Вид разделителя.
 *
 * - **solid** — сплошная линия 1px.
 * - **dashed** — ряд кружков диаметром 4px. Шаг подгоняется под длину линии, чтобы кружки не обрезались.
 */
export type DividerVariant = "solid" | "dashed";

export interface IDividerProps extends HTMLAttributes<HTMLDivElement> {
  flow?: DividerFlow;
  variant?: DividerVariant;
}
