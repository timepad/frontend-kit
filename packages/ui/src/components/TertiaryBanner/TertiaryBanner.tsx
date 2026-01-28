import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./tertiary-banner.less";
import { Typography } from "../Typography";
import { ITertiaryBannerBaseProps } from "./tertiary-banner.types";
import { TertiaryBannerInfo } from "./TertiaryBannerInfo";
import { TertiaryBannerWarning } from "./TertiaryBannerWarning";
import { TertiaryBannerError } from "./TertiaryBannerError";
import { TertiaryBannerSuccess } from "./TertiaryBannerSuccess";

export const TertiaryBannerBase: FC<ITertiaryBannerBaseProps> = ({
  children,
  className,
  icon,
  variant,
  appearance = "base",
  ...props
}) => {
  const bannerClasses = classNames(
    component("tertiary-banner")({
      [appearance]: true,
    }),
    className,
  );

  const iconContainerClassName = component(
    "tertiary-banner",
    "icon-container",
  )();

  const iconClassName = component(
    "tertiary-banner",
    "icon",
  )({ [`${variant}`]: !!variant });

  const textClassName = component("tertiary-banner", "text")();

  return (
    <div className={bannerClasses} {...props}>
      {icon && (
        <div className={iconContainerClassName}>
          <div className={iconClassName} aria-hidden="true">
            {icon}
          </div>
        </div>
      )}
      <Typography.Caption className={textClassName} tag="C1 REGULAR">
        {children}
      </Typography.Caption>
    </div>
  );
};

export const TertiaryBanner = Object.assign(TertiaryBannerBase, {
  Info: TertiaryBannerInfo,
  Warning: TertiaryBannerWarning,
  Error: TertiaryBannerError,
  Success: TertiaryBannerSuccess,
});
