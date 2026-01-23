import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

/**
 * Semantic variant of the banner.
 *
 * Controls:
 * - color accents (icon/text depending on styles)
 * - visual meaning (info / warning / error / success)
 *
 * In `TertiaryBannerBase` this value is also used to apply a variant modifier to the icon wrapper.
 */
export type TertiaryBannerVariant = "info" | "warning" | "error" | "success";

/**
 * Theme modifier of the banner.
 *
 * - **base** — default (light) style
 * - **inverted** — inverted (dark) style, intended for dark backgrounds
 */
export type Modifier = "base" | "inverted";

export interface ITertiaryBannerBaseProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  variant?: TertiaryBannerVariant;
  modifier?: Modifier;
  icon?: ReactNode;
  children: ReactNode;
}

export interface ITertiaryBannerVariantProps extends Omit<
  ITertiaryBannerBaseProps,
  "variant" | "icon"
> {}
