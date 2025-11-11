import React, { ReactHTML } from "react";

/** Modifiers */
export type FontWeight = "bold" | "semi-bold" | "medium" | "regular";
export type FontType = "accent" | "regular"; // accent => TT Backwards Sans, regular => Inter

/** Variant-specific sizes */
export type LeadSize = 1 | 2 | 3;
export type HeaderSize = 1 | 2 | 3 | 4;
export type ParagraphSize = 1 | 2 | 3 | 4;
export type CaptionSize = 1;

/** Common props for all variants */
export interface ITypographyCommonProps<TSize = undefined>
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  as?: keyof ReactHTML;
  innerRef?: React.LegacyRef<HTMLElement>;
  fontWeight?: FontWeight;
  uppercase?: boolean;
  fontType?: FontType;
  size?: TSize;
}

/** Discriminated union for variant + correct sizes */
type LeadVariant = { variant: "lead"; size: LeadSize };
type HeaderVariant = { variant: "header"; size: HeaderSize };
type ParagraphVariant = { variant: "paragraph"; size: ParagraphSize };
type CaptionVariant = { variant: "caption"; size: CaptionSize };

export type ITypographyProps = ITypographyCommonProps<
  LeadSize | HeaderSize | ParagraphSize | CaptionSize
> &
  (LeadVariant | HeaderVariant | ParagraphVariant | CaptionVariant);
