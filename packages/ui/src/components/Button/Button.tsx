import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./button.less";
import { ButtonVariant, IButtonProps } from "./button.types";

export const Button: FC<IButtonProps> = ({
  size = "M",
  variant = "primary",
  icon,
  iconPosition = "left",
  label,
  children,
  className,
  disabled,
  type = "button",
  buttonRef,
  ...rest
}) => {
  const isDisabled = !!disabled || variant === "disable";
  const btnVariant: ButtonVariant = isDisabled ? "disable" : variant;

  const buttonClassName = classNames(
    // button variant: cbutton__primary
    component("button", btnVariant)(),
    // button size: cbutton cbutton--size-m
    component("button")({
      [`size-${size.toLowerCase()}`]: true,
    }),
    className
  );

  const hasChildren = children !== undefined && children !== null;

  return (
    <button
      className={buttonClassName}
      type={type}
      disabled={isDisabled}
      ref={buttonRef}
      {...rest}
    >
      <div className={component("button", "overlay")()} />

      <div className={component("button", "content")()}>
        {icon && iconPosition === "left" && icon}

        <span className={component("button", "label")()}>
          {hasChildren ? children : label}
        </span>

        {icon && iconPosition === "right" && icon}
      </div>
    </button>
  );
};
