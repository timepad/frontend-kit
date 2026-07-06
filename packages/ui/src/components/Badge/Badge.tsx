import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./badge.less";
import { IBadgeProps } from "./badge.types";
import { BadgeLabel } from "./BadgeLabel";
import { BadgeSecondary } from "./BadgeSecondary";
import { BadgeOutline } from "./BadgeOutline";
import { BadgePrimary } from "./BadgePrimary";

export const BadgeBase: FC<IBadgeProps> = ({
  label,
  size = "m",
  variant = "primary",
  appearance = "accent",
  iconPosition = "left",
  icon,
  className,
  ...props
}) => {
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
    <div className={badgeClassName} {...props}>
      <BadgeLabel size={size}>{label}</BadgeLabel>

      {hasIcon && (
        <span aria-hidden="true" className={iconClassName}>
          {icon}
        </span>
      )}
    </div>
  );
};

export const Badge = Object.assign(BadgeBase, {
  Primary: BadgePrimary,
  Secondary: BadgeSecondary,
  Outline: BadgeOutline,
});
