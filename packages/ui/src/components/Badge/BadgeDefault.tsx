import { FC } from "react";

import { BadgeBase } from "./Badge";
import { IBadgeVariantProps } from "./badge.types";

export const BadgeDefault: FC<IBadgeVariantProps> = (props) => (
  <BadgeBase variant="default" {...props} />
);
