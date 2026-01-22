import { FC, ReactNode } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./button.less";
import { ButtonVariant, IButtonProps } from "./button.types";
import { Typography } from "../Typography";

export const Button: FC<IButtonProps> = ({
  size = "m",
  variant = "primary",
  icon,
  iconPosition = "left",
  label,
  className,
  disabled,
  type = "button",
  ...rest
}) => {
  const isDisabled = !!disabled || variant === "disable";
  const btnVariant: ButtonVariant = isDisabled ? "disable" : variant;
  const hasIcon = !!icon;

  const buttonClassName = classNames(
    // button variant: cbutton__primary
    component("button", btnVariant)(),
    // button size: cbutton cbutton--size-m
    component("button")({
      [`size-${size}`]: true,
    }),
    className,
  );

  return (
    <button
      className={buttonClassName}
      type={type}
      disabled={isDisabled}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={component("button", "hover-layer")()}
      />

      <span
        className={component(
          "button",
          "content",
        )({ "icon-position-left": hasIcon && iconPosition === "left" })}
      >
        <ButtonLabel size={size}>{label}</ButtonLabel>

        {hasIcon && (
          <span aria-hidden="true" className={component("button", "icon")()}>
            {icon}
          </span>
        )}
      </span>
    </button>
  );
};

interface IButtonLabelProps {
  size: IButtonProps["size"];
  children: ReactNode;
}

const ButtonLabel: FC<IButtonLabelProps> = ({ size, children }) => {
  const buttonLabelClassName = component("button", "label")();

  if (size === "m") {
    return (
      <Typography.Paragraph
        tag="P4 BOLD"
        as="span"
        className={buttonLabelClassName}
      >
        {children}
      </Typography.Paragraph>
    );
  }

  return (
    <Typography.Caption
      tag="C1 BOLD"
      as="span"
      className={buttonLabelClassName}
    >
      {children}
    </Typography.Caption>
  );
};
