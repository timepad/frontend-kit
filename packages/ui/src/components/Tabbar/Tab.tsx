import { type FC, useContext } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { Counter } from "../Counter";
import { Typography } from "../Typography";
import { TabbarContext } from "./tabbarContext";
import type { ITabProps } from "./tabbar.types";

export const Tab: FC<ITabProps> = ({
  active = false,
  className,
  counter,
  disabled,
  icon,
  label,
  notify = false,
  type = "button",
  ...rest
}) => {
  const showLabels = useContext(TabbarContext);

  const tabClassName = classNames(
    component("tabbar", "tab")({ active }),
    className,
  );
  const iconClassName = component("tabbar", "icon")();
  const labelClassName = component("tabbar", "label")();
  const counterClassName = component("tabbar", "counter")();
  const notifyClassName = component("tabbar", "counter")({ notify: true });

  return (
    <button
      aria-label={label}
      aria-selected={active}
      className={tabClassName}
      disabled={disabled}
      role="tab"
      type={type}
      {...rest}
    >
      <span aria-hidden="true" className={iconClassName}>
        {icon}
        {counter !== undefined && (
          <Counter className={counterClassName} size="s" value={counter} />
        )}
        {notify && <Counter className={notifyClassName} size="xs" />}
      </span>

      {showLabels && (
        <Typography.Caption
          aria-hidden="true"
          className={labelClassName}
          tag={active ? "C1 SEMIBOLD" : "C1 REGULAR"}
        >
          {label}
        </Typography.Caption>
      )}
    </button>
  );
};
