import { HTMLAttributes, PropsWithChildren } from "react";

export type CellHorizontalPadding = 0 | 8 | 12 | 16;

export type CellVerticalPadding = 0 | 4 | 10;

export type CellAlign = "center" | "top";

export interface ICellProps extends HTMLAttributes<HTMLDivElement> {
  horizontalPadding?: CellHorizontalPadding;
  verticalPadding?: CellVerticalPadding;
  align?: CellAlign;
  backgroundColor?: string;
  withSeparator?: boolean;
}

export type ICellBaseProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export const CELL_LABEL_TAGS = [
  "P3 REGULAR",
  "P4 REGULAR",
  "P3 SEMIBOLD",
] as const;

export type CellLabelTag = (typeof CELL_LABEL_TAGS)[number];

export interface ICellLabelProps extends HTMLAttributes<HTMLDivElement> {
  tag?: CellLabelTag;
}
