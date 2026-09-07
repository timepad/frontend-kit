import { ComponentType, forwardRef } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./badge.less";
import { BadgeSize, IBadgeProps } from "./badge.types";
import {
  CaptionVariantTag,
  ParagraphVariantTag,
  Typography,
} from "../Typography";

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
    const { BadgeLabel, tag } = badgeLabel[size];

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
        <BadgeLabel tag={tag} as="span" inheritColor>
          {label}
        </BadgeLabel>

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
  {
    BadgeLabel: ComponentType<any>;
    tag:
      | Extract<ParagraphVariantTag, "P4 SEMIBOLD">
      | Extract<CaptionVariantTag, "C1 REGULAR" | "C1 SEMIBOLD">;
  }
> = {
  s: { BadgeLabel: Typography.Caption, tag: "C1 REGULAR" },
  m: {
    BadgeLabel: Typography.Caption,
    tag: "C1 SEMIBOLD",
  },
  l: {
    BadgeLabel: Typography.Paragraph,
    tag: "P4 SEMIBOLD",
  },
};

Badge.displayName = "Badge";
