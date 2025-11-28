import { FC } from "react";

import { TertiaryBannerBase } from "./TertiaryBanner";
import { IconCrossCircle24Fill } from "../../assets/icons";
import { ITertiaryBannerVariantProps } from "./tertiary-banner.types";

export const TertiaryBannerError: FC<ITertiaryBannerVariantProps> = ({  modifier, children, ...props }) => {
    return (
        <TertiaryBannerBase variant="error" modifier={modifier} icon={<IconCrossCircle24Fill />} {...props}>
            {children}
        </TertiaryBannerBase>
    )
}
