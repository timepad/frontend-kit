import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./tabs-button.less";
import { ITabsButtonProps } from "./tabs-button.types";
import { TabsButtonContext } from "./tabsButtonContext";
import { TabsButtonList } from "./TabsButtonList";
import { TabsButtonTab } from "./TabsButtonTab";
import { TabsButtonPanel } from "./TabsButtonPanel";

const TabsButtonRoot: FC<PropsWithChildren<ITabsButtonProps>> = ({
  children,
  className,
  size = "m",
  activeTabId,
  defaultActiveTabId = "",
  onActiveTabChange,
  ...rest
}) => {
  const [uncontrolledActiveTabId, setUncontrolledActiveTabId] =
    useState(defaultActiveTabId);

  const isControlled = activeTabId !== undefined;
  const currentActiveTabId = isControlled
    ? activeTabId
    : uncontrolledActiveTabId;

  const setActiveTabId = useCallback(
    (nextTabId: string) => {
      if (!isControlled) {
        setUncontrolledActiveTabId(nextTabId);
      }
      onActiveTabChange?.(nextTabId);
    },
    [isControlled, onActiveTabChange],
  );

  const contextValue = useMemo(
    () => ({
      activeTabId: currentActiveTabId,
      setActiveTabId,
      size,
    }),
    [currentActiveTabId, setActiveTabId, size],
  );

  const rootClassName = classNames(component("tabs-button")(), className);

  return (
    <TabsButtonContext.Provider value={contextValue}>
      <div className={rootClassName} {...rest}>
        {children}
      </div>
    </TabsButtonContext.Provider>
  );
};

TabsButtonRoot.displayName = "TabsButton";

export const TabsButton = Object.assign(TabsButtonRoot, {
  List: TabsButtonList,
  Tab: TabsButtonTab,
  Panel: TabsButtonPanel,
});
