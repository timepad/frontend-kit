import { ButtonHTMLAttributes, ReactElement, RefObject, SVGProps } from "react";

/**
 * Button size options.
 * - **xs**: Ultra-compact button, typically used for icon-only controls,
 *           toolbars, secondary UI chrome, or places with strict space limits.
 * - **s**: Compact button.
 * - **m**: Default button size.
 */
export type IconButtonSize = "xs" | "s" | "m";

/**
 * Visual style (design variant) of the button.
 * Matches the design system semantics:
 * - **primary**: Main action, high emphasis.
 * - **primary-alternate**: Inverse version of primary.
 * - **secondary**: Neutral, lower emphasis.
 * - **negative**: Destructive actions (delete, remove, cancel).
 * - **disable**: Visually disabled, non-interactive state.
 * - **transparent**: Minimal, background-less button for subtle inline actions;
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
