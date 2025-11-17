import { ButtonHTMLAttributes, ReactElement, RefObject, SVGProps } from "react";

/**
 * Button size options.
 * - **XS**: Ultra-compact button, typically used for icon-only controls,
 *           toolbars, secondary UI chrome, or places with strict space limits.
 * - **S**: Compact button.
 * - **M**: Default button size.
 */
export type IconButtonSize = "XS" | "S" | "M";

/**
 * Visual style (design variant) of the button.
 * Matches the design system semantics:
 * - **Primary**: Main action, high emphasis.
 * - **Primary Alternate**: Inverse version of primary.
 * - **Secondary**: Neutral, lower emphasis.
 * - **Negative**: Destructive actions (delete, remove, cancel).
 * - **Disable**: Visually disabled, non-interactive state.
 * - **Transparent**: Minimal, background-less button for subtle inline actions;
 *                    typically used on flat surfaces or when the icon should appear
 *                    visually integrated with surrounding content.
 */
export type IconButtonVariant =
  | "primary"
  | "primary-alternate"
  | "secondary"
  | "negative"
  | "disable"
  | "transparent";

export interface IIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  buttonRef?: RefObject<HTMLButtonElement>;
}
