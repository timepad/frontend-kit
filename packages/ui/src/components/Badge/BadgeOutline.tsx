import { FC } from "react";

import { BadgeBase } from "./Badge";
import { IBadgeVariantProps } from "./badge.types";

export const BadgeOutline: FC<IBadgeVariantProps> = (props) => (
  <BadgeBase variant="outline" {...props} />
);
