import { DetailedHTMLProps, HTMLAttributes, LegacyRef, ReactHTML } from "react";

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
 * Size levels for the `lead` variant.it
 * - **1** – Largest lead text.
 * - **2** – Medium lead text.
 * - **3** – Smallest lead text.
 */
export type LeadSize = 1 | 2 | 3;

/**
 * Size levels for the `header` variant.
 * - **1** – Page title / largest header.
 * - **2** – Section title.
 * - **3** – Subsection title.
 * - **4** – Small header.
 */
export type HeaderSize = 1 | 2 | 3 | 4;

/**
 * Size levels for the `paragraph` variant.
 * - **1** – Large paragraph text.
 * - **2** – Default paragraph text.
 * - **3** – Small paragraph.
 * - **4** – Extra small paragraph.
 */
export type ParagraphSize = 1 | 2 | 3 | 4;

/**
 * Size level for the `caption` variant.
 * - **1** – Caption text (used for tiny labels, hints, footnotes).
 */
export type CaptionSize = 1;

/**
 * Common props shared across all typography components.
 *
 * @template TSize – Variant-specific size constraint
 *
 * Includes:
 * - **as** – Changes the rendered HTML tag (span, p, h1, etc.).
 * - **innerRef** – Forwarded ref to the underlying DOM element.
 * - **fontWeight** – Optional weight override.
 * - **uppercase** – Transforms text to uppercase when true.
 * - **fontType** – Selects accent/regular typeface.
 * - **size** – Variant-specific size level.
 *
 * Inherits all native HTMLElement attributes (id, className, onClick, etc.)
 */
export interface ITypographyCommonProps<TSize = undefined>
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  fontType?: FontType;
  fontWeight?: FontWeight;
  size?: TSize;
  as?: keyof ReactHTML;
  innerRef?: LegacyRef<HTMLElement>;
  uppercase?: boolean;
}
/**
 * Variant-specific definitions used to enforce correct
 * size levels based on the selected typography variant.
 *
 * Each variant restricts the `size` prop to the valid
 * numeric levels of that variant.
 */
type LeadVariant = { variant: "lead"; size?: LeadSize };
type HeaderVariant = { variant: "header"; size?: HeaderSize };
type ParagraphVariant = { variant: "paragraph"; size?: ParagraphSize };
type CaptionVariant = { variant: "caption"; size?: CaptionSize };

export type ITypographyProps = ITypographyCommonProps<
  LeadSize | HeaderSize | ParagraphSize | CaptionSize
> &
  (LeadVariant | HeaderVariant | ParagraphVariant | CaptionVariant);
