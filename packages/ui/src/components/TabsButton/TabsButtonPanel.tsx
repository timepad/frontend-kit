import { FC, PropsWithChildren } from "react";

import { ITabsButtonPanelProps } from "./tabs-button.types";
import { useTabsButtonContext } from "./tabsButtonContext";

export const TabsButtonPanel: FC<PropsWithChildren<ITabsButtonPanelProps>> = ({
  tabId,
  className,
  children,
  hidden,
  ...rest
}) => {
  const { activeTabId } = useTabsButtonContext();
  const isSelected = activeTabId === tabId;

  return (
    <div
      {...rest}
      id={`panel-${tabId}`}
      role="tabpanel"
      className={className}
      aria-labelledby={`tab-${tabId}`}
      hidden={hidden ?? !isSelected}
    >
      {children}
    </div>
  );
};
