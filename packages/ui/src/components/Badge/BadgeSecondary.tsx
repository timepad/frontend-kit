import { FC } from "react";

import { BadgeBase } from "./Badge";
import { IBadgeVariantProps } from "./badge.types";

export const BadgeSecondary: FC<IBadgeVariantProps> = (props) => (
  <BadgeBase variant="secondary" {...props} />
);
