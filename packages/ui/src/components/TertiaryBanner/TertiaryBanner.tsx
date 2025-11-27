import React, { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./tertiary-banner.less";
import { ITertiaryBannerBaseProps } from "./tertiary-banner.types";
import { TertiaryBannerInfo } from "./TertiaryBannerInfo";
import { TertiaryBannerWarning } from "./TertiaryBannerWarning";
import { TertiaryBannerError } from "./TertiaryBannerError";
import { TertiaryBannerSuccess } from "./TertiaryBannerSuccess";

export const TertiaryBannerBase: FC<ITertiaryBannerBaseProps> = ({
  children,
  className,
  variant,
}) => {

    const bannerClasses = classNames(
        component("tertiary-banner")({[variant]: true}),
        className
    );

  return (
      <div className={bannerClasses}>
          {children}
      </div>
  );
};

export const TertiaryBanner = Object.assign(TertiaryBannerBase, {
    Info: TertiaryBannerInfo,
    Warning: TertiaryBannerWarning,
    Error: TertiaryBannerError,
    Success: TertiaryBannerSuccess,
});
