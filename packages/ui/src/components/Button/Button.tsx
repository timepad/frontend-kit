import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./button.less";
import { ButtonSize, IButtonProps } from "./button.types";
import { createTypographyComponent, Typography } from "../Typography";

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
  const { LabelComponent } = buttonLabel[size];

  const buttonClassName = classNames(
    // button variant: fk-cbutton__primary
    component("button", variant)(),
    // button size: fk-cbutton fk-cbutton--size-m
    component("button")({
      [`size-${size}`]: true,
    }),
    className,
  );

  const contentClassName = component(
    "button",
    "content",
  )({ "icon-position-left": hasIcon && iconPosition === "left" });

  const buttonLabelClassName = component("button", "label")();

  const iconClassName = component("button", "icon")();

  return (
    <button className={buttonClassName} type={type} {...rest}>
      <span className={contentClassName}>
        <LabelComponent
          as="span"
          className={buttonLabelClassName}
          inheritColor
        >
          {label}
        </LabelComponent>

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
  { LabelComponent: ReturnType<typeof createTypographyComponent> }
> = {
  s: {
    LabelComponent: createTypographyComponent(Typography.Caption, "C1 BOLD"),
  },
  m: {
    LabelComponent: createTypographyComponent(Typography.Paragraph, "P4 BOLD"),
  },
  l: {
    LabelComponent: createTypographyComponent(Typography.Paragraph, "P4 BOLD"),
  },
};
