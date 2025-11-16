import { forwardRef } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./button.less";
import { ButtonVariant, IButtonProps } from "./button.types";

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      size = "M",
      variant = "primary",
      icon,
      iconPosition = "left",
      label,
      children,
      className,
      disabled,
      type = "button",
      ...rest
    },
    ref
  ) => {
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
        ref={ref}
        className={buttonClassName}
        type={type}
        disabled={isDisabled}
        {...rest}
      >
        <span className={component("button", "overlay")()} />

        <span className={component("button", "content")()}>
          {icon && iconPosition === "left" && icon}

          {hasChildren ? children : <span className={component("button", "label")()}>{label}</span>}

          {icon && iconPosition === "right" && icon}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
