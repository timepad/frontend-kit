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
  const elementClassNames = classNames(
    component(
      "typography",
      variant
    )({
      [`${size}`]: !!size,
    })
  );

  const commonClassNames = classNames(
    component("typography")({
      [fontWeight!]: !!fontWeight,
      uppercase: !!uppercase,
      [`font-${fontType}`]: !!fontType,
    }),
    elementClassNames,
    className
  );

  return React.createElement(
    as,
    { ref: innerRef, className: commonClassNames, ...props },
    children
  );
};

/** Compound export */
export const Typography = Object.assign(TypographyBase, {
  Lead: TypographyLead,
  Paragraph: TypographyParagraph,
  Caption: TypographyCaption,
  Header: TypographyHeader,
});
