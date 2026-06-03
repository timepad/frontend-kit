import { HTMLAttributes, ReactNode } from "react";

export type CellHorizontalPadding = 0 | 8 | 16;

export type CellAlign = "center" | "top";

export interface ICellProps
  extends HTMLAttributes<HTMLDivElement> {
  horizontalPadding?: CellHorizontalPadding;
  align?: CellAlign;
}

export interface ICellBaseProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface ICellContentProps extends ICellBaseProps {
  separator?: boolean;
}

export interface ICellTextProps extends HTMLAttributes<HTMLDivElement> {
  bold?: boolean;
  children?: ReactNode;
}
