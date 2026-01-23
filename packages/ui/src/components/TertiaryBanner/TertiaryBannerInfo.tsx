import { FC } from "react";

import { TertiaryBannerBase } from "./TertiaryBanner";
import { IconInfoCircle24Fill } from "../../assets/icons";
import { ITertiaryBannerVariantProps } from "./tertiary-banner.types";

export const TertiaryBannerInfo: FC<ITertiaryBannerVariantProps> = ({ appearance, children, ...props }) => {
    return (
        <TertiaryBannerBase variant="info" appearance={appearance} icon={<IconInfoCircle24Fill />} {...props}>
            {children}
        </TertiaryBannerBase>
    )
}
