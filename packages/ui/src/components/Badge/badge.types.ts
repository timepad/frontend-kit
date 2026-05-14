import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  SVGProps,
} from "react";

/**
 * Размер бейджа.
 *
 * - **s** — компактный размер.
 * - **m** — стандартный размер.
 * - **l** — увеличенный размер.
 */
export type BadgeSize = "s" | "m" | "l";

/**
 * Вариант (дизайн-пресет) бейджа.
 */
export type BadgeVariant = "default" | "secondary" | "outline";

/**
 * Семантическое состояние бейджа.
 */
export type Appearance = "accent" | "positive" | "negative";

/**
 * Позиция иконки относительно текста.
 *
 * - **left** — иконка перед текстом
 * - **right** — иконка после текста
 */
export type IconPosition = "left" | "right";

type BaseBadgeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  label: string;
  variant?: BadgeVariant;
  appearance?: Appearance;
};

type SmallBadgeProps = {
  size: "s";
  icon?: never;
  iconPosition?: never;
};

type RegularBadgeProps = {
  size?: Exclude<BadgeSize, "s">;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
  iconPosition?: IconPosition;
};

export type IBadgeProps = BaseBadgeProps &
  (SmallBadgeProps | RegularBadgeProps);

type OmitDistributive<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;

export type IBadgeVariantProps = OmitDistributive<IBadgeProps, "variant">;
