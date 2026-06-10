import { HTMLAttributes } from "react";

export type ScrollbarFlow = "horizontal" | "vertical";

export interface IScrollbarProps extends HTMLAttributes<HTMLDivElement> {
  flow?: ScrollbarFlow;
}
