import { forwardRef } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./badge.less";
import { BadgeSize, IBadgeProps } from "./badge.types";
import { createTypographyComponent, Typography } from "../Typography";

export const Badge = forwardRef<HTMLSpanElement, IBadgeProps>(
  (
    {
      label,
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
    const { LabelComponent } = badgeLabel[size];

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
        <LabelComponent as="span" inheritColor>
          {label}
        </LabelComponent>

        {hasIcon && (
          <span aria-hidden="true" className={iconClassName}>
            {icon}
          </span>
        )}
      </span>
    );
  },
);

const badgeLabel: Record<
  BadgeSize,
  { LabelComponent: ReturnType<typeof createTypographyComponent> }
> = {
  s: {
    LabelComponent: createTypographyComponent(Typography.Caption, "C1 REGULAR"),
  },
  m: {
    LabelComponent: createTypographyComponent(Typography.Caption, "C1 SEMIBOLD"),
  },
  l: {
    LabelComponent: createTypographyComponent(Typography.Paragraph, "P4 SEMIBOLD"),
  },
};

Badge.displayName = "Badge";
