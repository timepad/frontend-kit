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
  overflow = "scroll",
  value,
  defaultValue = "",
  onValueChange,
  ...rest
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  const setValue = useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange],
  );

  const contextValue = useMemo(
    () => ({
      value: currentValue,
      setValue,
      size,
      overflow,
    }),
    [currentValue, setValue, size, overflow],
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
