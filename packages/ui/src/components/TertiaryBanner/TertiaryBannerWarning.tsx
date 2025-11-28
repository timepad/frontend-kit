import { FC } from "react";

import { TertiaryBannerBase } from "./TertiaryBanner";
import { IconWarningCircle24Fill } from "../../assets/icons";
import { ITertiaryBannerVariantProps } from "./tertiary-banner.types";

export const TertiaryBannerWarning: FC<ITertiaryBannerVariantProps> = ({ modifier, children, ...props }) => {
    return (
        <TertiaryBannerBase variant="warning" modifier={modifier} icon={<IconWarningCircle24Fill />} {...props} >
            {children}
        </TertiaryBannerBase>
    )
}
