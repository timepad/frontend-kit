import { FC, PropsWithChildren } from "react";

import { ITabsButtonPanelProps } from "./tabs-button.types";
import { useTabsButtonContext } from "./tabsButtonContext";

export const TabsButtonPanel: FC<PropsWithChildren<ITabsButtonPanelProps>> = ({
  value,
  className,
  children,
  hidden,
  ...rest
}) => {
  const { value: selectedValue } = useTabsButtonContext();
  const isSelected = selectedValue === value;

  return (
    <div
      {...rest}
      id={`panel-${value}`}
      role="tabpanel"
      className={className}
      aria-labelledby={`tab-${value}`}
      hidden={hidden ?? !isSelected}
    >
      {children}
    </div>
  );
};
