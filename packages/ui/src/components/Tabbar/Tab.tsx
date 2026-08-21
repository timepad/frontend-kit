import { type FC, useContext } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { Counter } from "../Counter";
import { Typography } from "../Typography";
import { TabbarContext } from "./tabbarContext";
import type { ITabProps } from "./tabbar.types";

export const Tab: FC<ITabProps> = (props) => {
  const showLabels = useContext(TabbarContext);
  const active = props.active ?? false;
  const notify = props.notify ?? false;

  const tabClassName = classNames(
    component("tabbar", "tab")({ active }),
    props.className,
  );
  const iconClassName = component("tabbar", "icon")();
  const iconGraphicClassName = component("tabbar", "icon-graphic")();
  const labelClassName = component("tabbar", "label")();
  const counterClassName = component("tabbar", "counter")();
  const notifyClassName = component("tabbar", "counter")({ notify: true });
  const ariaLabel =
    props["aria-label"] ?? getTabAriaLabel(props.label, props.counter, notify);

  const content = (
    <>
      <span className={iconClassName}>
        <span aria-hidden="true" className={iconGraphicClassName}>
          {props.icon}
        </span>
        {props.counter !== undefined && (
          <Counter
            aria-hidden="true"
            className={counterClassName}
            size="s"
            value={props.counter}
          />
        )}
        {notify && (
          <Counter aria-hidden="true" className={notifyClassName} size="xs" />
        )}
      </span>

      {showLabels && (
        <Typography.Caption
          as="span"
          className={labelClassName}
          tag={active ? "C1 SEMIBOLD" : "C1 REGULAR"}
        >
          {props.label}
        </Typography.Caption>
      )}
    </>
  );

  if (props.as === "a") {
    const {
      active,
      as,
      className,
      counter,
      icon,
      label,
      notify,
      ...linkProps
    } = props;

    return (
      <a
        {...linkProps}
        aria-current={active ? "page" : undefined}
        aria-label={ariaLabel}
        className={tabClassName}
      >
        {content}
      </a>
    );
  }

  const {
    active: buttonActive,
    as,
    className,
    counter,
    icon,
    label,
    notify: buttonNotify,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      aria-current={active ? "page" : undefined}
      aria-label={ariaLabel}
      className={tabClassName}
      type={type}
    >
      {content}
    </button>
  );
};

const getTabAriaLabel = (
  label: string,
  counter?: number,
  notify?: boolean,
): string => {
  if (counter !== undefined) {
    const normalizedCounter = Number.isFinite(counter)
      ? Math.max(0, Math.round(counter))
      : 0;

    return `${label}. Уведомления: ${normalizedCounter}`;
  }

  if (notify) return `${label}. Есть непрочитанные уведомления`;
  return label;
};
