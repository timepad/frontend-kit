import { type FC, type KeyboardEvent } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./tabbar.less";
import { Tab } from "./Tab";
import { TabbarContext } from "./tabbarContext";
import type { ITabbarProps } from "./tabbar.types";

const TabbarComponent: FC<ITabbarProps> = ({
  children,
  className,
  onKeyDown,
  shadow = true,
  showLabels = true,
  ...rest
}) => {
  const tabbarClassName = classNames(
    component("tabbar")({ shadow, "without-labels": !showLabels }),
    className,
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled)',
      ),
    );
    const currentIndex = tabs.indexOf(event.target as HTMLButtonElement);
    if (currentIndex === -1) return;

    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      tabs[nextIndex]?.focus();
    }
  };

  return (
    <TabbarContext.Provider value={showLabels}>
      <div
        aria-label="Основная навигация"
        className={tabbarClassName}
        onKeyDown={handleKeyDown}
        role="tablist"
        {...rest}
      >
        {children}
      </div>
    </TabbarContext.Provider>
  );
};

export const Tabbar = Object.assign(TabbarComponent, { Tab });
