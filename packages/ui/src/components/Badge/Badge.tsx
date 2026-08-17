import { forwardRef } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./badge.less";
import { IBadgeProps } from "./badge.types";
import { BadgeLabel } from "./BadgeLabel";

export const Badge = forwardRef<HTMLSpanElement, IBadgeProps>(
  (
    {
      children,
      size = "m",
      variant = "primary",
      appearance = "accent",
      iconPosition = "left",
      icon,
      className,
      ...props
    },
    ref,
  ) => {
    const hasIcon = !!icon;

    const badgeClassName = classNames(
      component("badge", variant)({ [appearance]: true }),
      component("badge")({
        [`size-${size}`]: true,
        "has-icon": hasIcon,
        "icon-position-left": hasIcon && iconPosition === "left",
      }),
      className,
    );

    const iconClassName = component("badge", "icon")();

    return (
      <span className={badgeClassName} {...props} ref={ref}>
        <BadgeLabel size={size}>{children}</BadgeLabel>

        {hasIcon && (
          <span aria-hidden="true" className={iconClassName}>
            {icon}
          </span>
        )}
      </span>
    );
  },
);

Badge.displayName = "Badge";
