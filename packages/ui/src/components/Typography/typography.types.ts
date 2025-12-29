import {
  DetailedHTMLProps,
  HTMLAttributes,
  LegacyRef,
  ReactHTML,
  ReactNode,
} from "react";

/**
 * High-level typography variants used by the base component.
 *
 * Each variant has its own allowed combination of:
 * - size
 * - fontType
 * - fontWeight
 */
export type TypographyVariant = "lead" | "header" | "paragraph" | "caption";

/**
 * Font weight modifiers supported by the typography system.
 * - **bold** – Strongest emphasis.
 * - **semi-bold** – Medium-strong emphasis.
 * - **medium** – Standard emphasis.
 * - **regular** – Default lightweight text.
 */
export type FontWeight = "bold" | "semi-bold" | "medium" | "regular";

/**
 * Font styling presets defined by the design system.
 * - **accent** – Uses the accent font (TT Backwards Sans).
 * - **regular** – Uses the base system font (Inter).
 */
export type FontType = "accent" | "regular";

/**
 * Size levels for Typography.
 * - **1** – Largest text.
 * - **2** – Medium text.
 * - **3** – Smallest text.
 * - **4** – Extra small text.
 */
export type Size = 1 | 2 | 3 | 4;

/**
 * Variant-specific definitions used to enforce correct
 * size levels, font-family and font-weight based on the selected typography variant.
 *
 * Each variant restricts the `size, fontType, fontWeight` props to the valid
 * numeric levels of that variant.
 */
export interface ILeadVariant {
  variant: Extract<TypographyVariant, "lead">;
  size: Exclude<Size, 4>;
  fontType: Extract<FontType, "accent">;
  fontWeight: Extract<FontWeight, "bold">;
}

export interface IHeaderVariant {
  variant: Extract<TypographyVariant, "header">;
  size: Size;
  fontType: FontType;
  fontWeight: Extract<FontWeight, "bold" | "medium">;
}

export interface IParagraphVariant {
  variant: Extract<TypographyVariant, "paragraph">;
  size: Size;
  fontType: Extract<FontType, "regular">;
  fontWeight: Exclude<FontWeight, "medium">;
}

export interface ICaptionVariant {
  variant: Extract<TypographyVariant, "caption">;
  size: Extract<Size, 1>;
  fontType: Extract<FontType, "regular">;
  fontWeight: Exclude<FontWeight, "medium">;
}

/**
 * Common props shared across all typography components.
 *
 * Includes:
 * - **children** – All renderable React content.
 * - **as** – Changes the rendered HTML tag (span, p, h1, etc.).
 * - **innerRef** – Forwarded ref to the underlying DOM element.
 * - **uppercase** – Transforms text to uppercase when true.
 *
 * Inherits all native HTMLElement attributes (id, className, onClick, etc.)
 */
export interface ITypographyCommonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  children: ReactNode;
  as?: keyof ReactHTML;
  innerRef?: LegacyRef<HTMLElement>;
  uppercase?: boolean;
}

export type ITypographyBaseProps = ITypographyCommonProps &
  (ILeadVariant | IHeaderVariant | IParagraphVariant | ICaptionVariant);
