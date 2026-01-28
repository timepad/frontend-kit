import { FC } from "react";

import { TertiaryBannerBase } from "./TertiaryBanner";
import { IconCheckCircle24Fill } from "../../assets/icons";
import { ITertiaryBannerVariantProps } from "./tertiary-banner.types";

export const TertiaryBannerSuccess: FC<ITertiaryBannerVariantProps> = ({ appearance, children, ...props }) => {
    return (
        <TertiaryBannerBase variant="success" appearance={appearance} icon={<IconCheckCircle24Fill />} {...props}>
            {children}
        </TertiaryBannerBase>
    )
}
