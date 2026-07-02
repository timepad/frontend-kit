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

export interface ICellLabelProps extends HTMLAttributes<HTMLDivElement> {
  bold?: boolean;
}
