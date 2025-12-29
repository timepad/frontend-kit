import { createElement, FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./typography.less";
import { ITypographyBaseProps } from "./typography.types";
import { TypographyLead } from "./TypographyLead";
import { TypographyHeader } from "./TypographyHeader";
import { TypographyParagraph } from "./TypographyParagraph";
import { TypographyCaption } from "./TypographyCaption";

export const TypographyBase: FC<ITypographyBaseProps> = ({
  children,
  className,
  as = "div",
  fontWeight,
  size,
  uppercase,
  fontType,
  variant,
  innerRef,
  ...props
}) => {
  const typographyClassName = classNames(
    // typography variant with size modifier: ctypography__lead ctypography__lead--1
    component("typography", variant)({ [`${size}`]: !!size }),
    // font-weight, text-transform, font-family styles: ctypography ctypography--bold ctypography--font-accent ctypography--uppercase
    component("typography")({
      [fontWeight]: true,
      [`font-${fontType}`]: true,
      uppercase: !!uppercase,
    }),
    className
  );

  return createElement(
    as,
    { ref: innerRef, className: typographyClassName, ...props },
    children
  );
};

export const Typography = Object.assign(TypographyBase, {
  Lead: TypographyLead,
  Paragraph: TypographyParagraph,
  Caption: TypographyCaption,
  Header: TypographyHeader,
});
