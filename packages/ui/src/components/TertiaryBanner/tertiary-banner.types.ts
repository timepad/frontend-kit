import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

/**
 *
 * Matches the design system semantics:
 * - **base**: .
 * - **inverted**: .
 */
export type TertiaryBannerVariant =
    | "base"
    | "inverted"

export interface ITertiaryBannerProps {
  variant?: TertiaryBannerVariant;
  children: ReactNode;
}

export interface ITertiaryBannerBaseProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  variant: TertiaryBannerVariant;
}
