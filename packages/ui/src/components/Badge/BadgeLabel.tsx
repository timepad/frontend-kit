import { FC, ReactNode } from "react";
import { component } from "@frontend-kit/utils";

import { IBadgeProps } from "./badge.types";
import { Typography } from "../Typography";

interface IBadgeLabelProps {
  size: IBadgeProps["size"];
  children: ReactNode;
}

export const BadgeLabel: FC<IBadgeLabelProps> = ({ size, children }) => {
  const badgeLabelClassName = component("badge", "label")();

  if (size === "l") {
    return (
      <Typography.Paragraph
        tag="P4 SEMIBOLD"
        as="span"
        className={badgeLabelClassName}
      >
        {children}
      </Typography.Paragraph>
    );
  }

  if (size === "m") {
    return (
      <Typography.Caption
        tag="C1 SEMIBOLD"
        as="span"
        className={badgeLabelClassName}
      >
        {children}
      </Typography.Caption>
    );
  }

  return (
    <Typography.Caption
      tag="C1 REGULAR"
      as="span"
      className={badgeLabelClassName}
    >
      {children}
    </Typography.Caption>
  );
};
