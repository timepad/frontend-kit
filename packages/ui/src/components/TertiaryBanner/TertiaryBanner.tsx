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
  modifier = "base",
  ...props
}) => {
  const bannerClasses = classNames(
    component("tertiary-banner")({
      [modifier]: true,
    }),
    className,
  );

  return (
    <div className={bannerClasses} {...props}>
      {icon && (
        <div className={component("tertiary-banner", "icon-container")()}>
          <div
            className={component(
              "tertiary-banner",
              "icon",
            )({ [`${variant}`]: !!variant })}
            aria-hidden="true"
          >
            {icon}
          </div>
        </div>
      )}
      <Typography.Caption
        className={component("tertiary-banner", "text")()}
        tag="C1 REGULAR"
      >
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
