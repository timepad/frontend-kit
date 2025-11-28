import { FC } from "react";

import { TertiaryBannerBase } from "./TertiaryBanner";
import { IconInfoCircle24Fill } from "../../assets/icons";
import { ITertiaryBannerVariantProps } from "./tertiary-banner.types";

export const TertiaryBannerInfo: FC<ITertiaryBannerVariantProps> = ({ modifier = "base", children, ...props }) => {
    return (
        <TertiaryBannerBase variant="info" modifier={modifier} icon={<IconInfoCircle24Fill />} {...props}>
            {children}
        </TertiaryBannerBase>
    )
}
