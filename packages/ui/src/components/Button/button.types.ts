import { ButtonHTMLAttributes, ReactElement, RefObject, SVGProps } from "react";

/**
 * Button size options.
 * - **S**: Compact button, small text & padding.
 * - **M**: Default button size.
 */
export type ButtonSize = "S" | "M";

/**
 * Visual style (design variant) of the button.
 * Matches the design system semantics:
 * - **Primary**: Main action, high emphasis.
 * - **Primary Alternate**: Inverse version of primary.
 * - **Secondary**: Neutral, lower emphasis.
 * - **Negative**: Destructive actions (delete, remove, cancel).
 * - **Disable**: Visually disabled, non-interactive state.
 */
export type ButtonVariant =
  | "primary"
  | "primary-alternate"
  | "secondary"
  | "negative"
  | "disable";

/**
 * Icon placement relative to button text.
 * - **Left**: Icon appears before label.
 * - **Right**: Icon appears after label.
 */
export type IconPosition = "left" | "right";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
  iconPosition?: IconPosition;
  label?: string;
  buttonRef?: RefObject<HTMLButtonElement>;
}
