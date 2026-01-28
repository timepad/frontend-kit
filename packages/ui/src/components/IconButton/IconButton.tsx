import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./icon-button.less";
import { IconButtonVariant, IIconButtonProps } from "./icon-button.types";

export const IconButton: FC<IIconButtonProps> = ({
  size = "m",
  variant = "primary",
  icon,
  className,
  disabled,
  ariaLabel,
  ariaLabelledby,
  type = "button",
  ...rest
}) => {
  const isDisabled = !!disabled || variant === "disable";
  const iconBtnVariant: IconButtonVariant = isDisabled ? "disable" : variant;

  const iconButtonClassName = classNames(
    // button variant: cicon-button__primary
    component("icon-button", iconBtnVariant)(),
    // button size: cicon-button cicon-button--size-xs
    component("icon-button")({
      [`size-${size}`]: true,
    }),
    className,
  );

  return (
    <button
      className={iconButtonClassName}
      type={type}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      {...rest}
    >
      <div className={component("icon-button", "hover-layer")()} />

      <div className={component("icon-button", "content")()}>{icon}</div>
    </button>
  );
};
