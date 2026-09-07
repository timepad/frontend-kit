import { createElement, FC } from "react";

import { TypographyCaption } from "./TypographyCaption";
import { TypographyHeader } from "./TypographyHeader";
import { TypographyLead } from "./TypographyLead";
import { TypographyParagraph } from "./TypographyParagraph";
import {
  CaptionVariantTag,
  HeaderVariantTag,
  LeadVariantTag,
  ParagraphVariantTag,
} from "./configs";
import { ITypographyCommonProps } from "./typography.types";

export function createTypographyComponent(
  Component: typeof TypographyLead,
  tag: LeadVariantTag,
): FC<ITypographyCommonProps>;
export function createTypographyComponent(
  Component: typeof TypographyCaption,
  tag: CaptionVariantTag,
): FC<ITypographyCommonProps>;
export function createTypographyComponent(
  Component: typeof TypographyParagraph,
  tag: ParagraphVariantTag,
): FC<ITypographyCommonProps>;
export function createTypographyComponent(
  Component: typeof TypographyHeader,
  tag: HeaderVariantTag,
): FC<ITypographyCommonProps>;
export function createTypographyComponent(
  Component: FC<any>,
  tag: LeadVariantTag | CaptionVariantTag | ParagraphVariantTag | HeaderVariantTag,
): FC<ITypographyCommonProps> {
  return (props) => createElement(Component, { ...props, tag });
}
