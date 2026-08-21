import { type CSSProperties, type FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./tabbar.less";
import { Tab } from "./Tab";
import { TabbarContext } from "./tabbarContext";
import type { ITabbarProps } from "./tabbar.types";

const TabbarComponent: FC<ITabbarProps> = ({
  backgroundColor,
  children,
  className,
  shadow = true,
  showLabels = true,
  style,
  ...rest
}) => {
  const tabbarClassName = classNames(
    component("tabbar")({ shadow, "without-labels": !showLabels }),
    className,
  );
  const backgroundStyle = backgroundColor
    ? ({ "--tabbar-bg": backgroundColor } as CSSProperties)
    : undefined;

  return (
    <TabbarContext.Provider value={showLabels}>
      <nav
        aria-label="Основная навигация"
        className={tabbarClassName}
        style={{ ...backgroundStyle, ...style }}
        {...rest}
      >
        {children}
      </nav>
    </TabbarContext.Provider>
  );
};

export const Tabbar = Object.assign(TabbarComponent, { Tab });
