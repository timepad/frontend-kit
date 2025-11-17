import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./icon-button.less";
import { IconButtonVariant, IIconButtonProps } from "./icon-button.types";

export const IconButton: FC<IIconButtonProps> = (
  {
    size = "M",
    variant = "primary",
    icon,
    className,
    disabled,
    type = "button",
    buttonRef,
    ...rest
  },
) => {
  const isDisabled = !!disabled || variant === "disable";
  const iconBtnVariant: IconButtonVariant = isDisabled ? "disable" : variant;

  const iconButtonClassName = classNames(
    // button variant: cicon-button__primary
    component("icon-button", iconBtnVariant)(),
    // button size: cicon-button cicon-button--size-xs
    component("icon-button")({
      [`size-${size.toLowerCase()}`]: true,
    }),
    className
  );

  return (
    <button
      className={iconButtonClassName}
      type={type}
      disabled={isDisabled}
      ref={buttonRef}
      {...rest}
    >
      <div className={component("icon-button", "overlay")()} />

      <div className={component("icon-button", "content")()}>{icon}</div>
    </button>
  );
};
