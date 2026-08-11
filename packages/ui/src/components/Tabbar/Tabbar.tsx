import { type FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./tabbar.less";
import { Tab } from "./Tab";
import { TabbarContext } from "./tabbarContext";
import type { ITabbarProps } from "./tabbar.types";

const TabbarComponent: FC<ITabbarProps> = ({
  children,
  className,
  shadow = true,
  showLabels = true,
  ...rest
}) => {
  const tabbarClassName = classNames(
    component("tabbar")({ shadow, "without-labels": !showLabels }),
    className,
  );

  return (
    <TabbarContext.Provider value={showLabels}>
      <div
        aria-label="Основная навигация"
        className={tabbarClassName}
        role="tablist"
        {...rest}
      >
        {children}
      </div>
    </TabbarContext.Provider>
  );
};

export const Tabbar = Object.assign(TabbarComponent, { Tab });
