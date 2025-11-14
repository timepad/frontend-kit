import React, { FC, PropsWithChildren } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./typography.less";
import { ITypographyProps } from "./typography.types";
import { TypographyLead } from "./TypographyLead";
import { TypographyParagraph } from "./TypographyParagraph";
import { TypographyCaption } from "./TypographyCaption";
import { TypographyHeader } from "./TypographyHeader";

export const TypographyBase: FC<PropsWithChildren<ITypographyProps>> = ({
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
    // typography variant with size modifier: ctypography__paragraph ctypography__paragraph--2
    component(
      "typography",
      variant
    )({
      [`${size}`]: !!size,
    }),
    // font-weight, text-transform, font-family styles: ctypography ctypography--bold ctypography--font-accent ctypography--uppercase
    component("typography")({
      [fontWeight!]: true,
      [`font-${fontType}`]: true,
      uppercase: !!uppercase,
    }),
    className
  );

  return React.createElement(
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
