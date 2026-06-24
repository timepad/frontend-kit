import { HTMLAttributes } from "react";

export type DividerFlow = "horizontal" | "vertical";

export interface IDividerProps extends HTMLAttributes<HTMLDivElement> {
  flow?: DividerFlow;
}
