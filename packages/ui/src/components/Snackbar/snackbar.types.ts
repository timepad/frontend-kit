import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export type SnackbarVariant = "info" | "warning" | "error" | "success" | "custom";

export type SnackbarAfter = "button" | "icon-button";

export interface ISnackbarBaseProps extends Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "title"
> {
  variant?: SnackbarVariant;
  icon?: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  after?: SnackbarAfter;
  actionLabel?: string;
  onAction?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  actionAriaLabel?: string;
}

export interface ISnackbarVariantProps extends Omit<
  ISnackbarBaseProps,
  "variant" | "icon"
> {}

export interface ISnackbarCustomProps extends Omit<
  ISnackbarBaseProps,
  "variant"
> {}
