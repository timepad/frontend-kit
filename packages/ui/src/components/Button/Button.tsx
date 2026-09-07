import { ComponentType, FC, ReactNode } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./button.less";
import { ButtonSize, IButtonProps } from "./button.types";
import {
  CaptionVariantTag,
  ParagraphVariantTag,
  Typography,
} from "../Typography";

export const Button: FC<IButtonProps> = ({
  size = "m",
  variant = "primary",
  icon,
  iconPosition = "left",
  label,
  className,
  type = "button",
  ...rest
}) => {
  const hasIcon = !!icon;
  const { ButtonLabel, tag } = buttonLabel[size];

  const buttonClassName = classNames(
    // button variant: cbutton__primary
    component("button", variant)(),
    // button size: cbutton cbutton--size-m
    component("button")({
      [`size-${size}`]: true,
    }),
    className,
  );

  const contentClassName = component(
    "button",
    "content",
  )({ "icon-position-left": hasIcon && iconPosition === "left" });

  const iconClassName = component("button", "icon")();

  return (
    <button className={buttonClassName} type={type} {...rest}>
      <span className={contentClassName}>
        <ButtonLabel tag={tag} as="span" inheritColor>
          {label}
        </ButtonLabel>

        {hasIcon && (
          <span aria-hidden="true" className={iconClassName}>
            {icon}
          </span>
        )}
      </span>
    </button>
  );
};

const buttonLabel: Record<
  ButtonSize,
  {
    ButtonLabel: ComponentType<any>;
    tag:
      | Extract<ParagraphVariantTag, "P4 BOLD">
      | Extract<CaptionVariantTag, "C1 BOLD">;
  }
> = {
  s: { ButtonLabel: Typography.Caption, tag: "C1 BOLD" },
  m: {
    ButtonLabel: Typography.Paragraph,
    tag: "P4 BOLD",
  },
  l: {
    ButtonLabel: Typography.Paragraph,
    tag: "P4 BOLD",
  },
};
