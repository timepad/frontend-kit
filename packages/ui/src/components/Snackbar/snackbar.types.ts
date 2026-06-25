import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export type SnackbarVariant = "info" | "warning" | "error" | "success" | "custom";

export type SnackbarActionButton = "button" | "icon-button";

type ISnackbarCommonProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "title"
> & {
  variant: SnackbarVariant;
  icon: ReactNode;
  title?: string;
  label: string;
  onActionClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

type SnackbarActionProps =
  | {
      actionButton?: undefined;
      actionLabel?: never;
      actionAriaLabel?: never;
    }
  | {
      actionButton: "button";
      actionLabel: string;
      actionAriaLabel?: never;
    }
  | {
      actionButton: "icon-button";
      actionAriaLabel?: string;
      actionLabel?: never;
    };

export type { SnackbarActionProps };

export type ISnackbarBaseProps = ISnackbarCommonProps & SnackbarActionProps;

export type ISnackbarVariantProps = Omit<ISnackbarCommonProps, "variant" | "icon"> & SnackbarActionProps;

export type ISnackbarCustomProps = Omit<ISnackbarCommonProps, "variant"> & SnackbarActionProps;
