import { FC } from "react";

import { TertiaryBannerBase } from "./TertiaryBanner";
import { IconCrossCircle24Fill } from "../../assets/icons";
import { ITertiaryBannerVariantProps } from "./tertiary-banner.types";

export const TertiaryBannerError: FC<ITertiaryBannerVariantProps> = ({  appearance, children, ...props }) => {
    return (
        <TertiaryBannerBase variant="error" appearance={appearance} icon={<IconCrossCircle24Fill />} {...props}>
            {children}
        </TertiaryBannerBase>
    )
}
