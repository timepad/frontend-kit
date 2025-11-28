import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export type TertiaryBannerVariant =
    | "info"
    | "warning"
    | "error"
    | "success"

export type Modifier = "base" | "inverted"

export interface ITertiaryBannerBaseProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  variant?: TertiaryBannerVariant;
  modifier?: Modifier;
  icon?: ReactNode;
  children: ReactNode;
}

export interface ITertiaryBannerVariantProps extends Omit<ITertiaryBannerBaseProps, "variant" | "icon"> {}
