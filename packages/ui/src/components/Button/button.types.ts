import { ButtonHTMLAttributes, ReactElement, RefObject, SVGProps } from "react";

/**
 * Button size options.
 * - **s**: Compact button, small text & padding.
 * - **m**: Default button size.
 */
export type ButtonSize = "s" | "m";

/**
 * Visual style (design variant) of the button.
 * Matches the design system semantics:
 * - **primary**: Main action, high emphasis.
 * - **primary-alternate**: Inverse version of primary.
 * - **secondary**: Neutral, lower emphasis.
 * - **negative**: Destructive actions (delete, remove, cancel).
 * - **disable**: Visually disabled, non-interactive state.
 */
export type ButtonVariant =
  | "primary"
  | "primary-alternate"
  | "secondary"
  | "negative"
  | "disable";

/**
 * Icon placement relative to button text.
 * - **left**: Icon appears before label.
 * - **right**: Icon appears after label.
 */
export type IconPosition = "left" | "right";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
  iconPosition?: IconPosition;
  buttonRef?: RefObject<HTMLButtonElement>;
}
