import { FC } from "react";
import { component } from "@frontend-kit/utils";

import { Typography } from "../Typography";
import { TertiaryBannerBase } from "./TertiaryBanner";
import { IconCheckCircle24Fill } from "../../assets/icons";
import { ITertiaryBannerProps } from "./tertiary-banner.types";

export const TertiaryBannerSuccess: FC<ITertiaryBannerProps> = ({ variant = "base", children, ...props }) => {
    return (
        <TertiaryBannerBase variant={variant} {...props}>
            <IconCheckCircle24Fill className={component("tertiary-banner", "icon")()} color={variant === "base" ? "var(--dark-green)" : "var(--light-green)"} />
            <Typography.Caption className={component("tertiary-banner", "text")()} tag="C1 REGULAR">{children}</Typography.Caption>
        </TertiaryBannerBase>
    )
}
