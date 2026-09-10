import { FC, MouseEvent } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { ITabsButtonTabProps, TabsButtonSize } from "./tabs-button.types";
import { useTabsButtonContext } from "./tabsButtonContext";
import { createTypographyComponent, Typography } from "../Typography";
import { Counter } from "../Counter";
import { CounterSM } from "../Counter/counter.types";

export const TabsButtonTab: FC<ITabsButtonTabProps> = ({
  tabId,
  label,
  disabled,
  className,
  onClick,
  counter,
  notify,
  ...rest
}) => {
  const { activeTabId, setActiveTabId, size } = useTabsButtonContext();

  const isSelected = activeTabId === tabId;

  const LabelComponent = tabLabel[size];

  const tabClassName = classNames(
    component(
      "tabs-button",
      "tab",
    )({
      selected: isSelected,
      [`size-${size}`]: true,
    }),
    className,
  );

  const contentClassName = component("tabs-button", "tab-content")();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (!isSelected) {
      setActiveTabId(tabId);
    }
  };

  return (
    <button
      {...rest}
      type="button"
      role="tab"
      id={`tab-${tabId}`}
      className={tabClassName}
      disabled={disabled}
      aria-selected={isSelected}
      aria-controls={`panel-${tabId}`}
      onClick={handleClick}
    >
      <span className={contentClassName}>
        <LabelComponent as="span" inheritColor>
          {label}
        </LabelComponent>
        {counter !== undefined && (
          <Counter
            value={counter}
            size={counterSize[size]}
            {...(isSelected
              ? { appearance: "accent" }
              : { appearance: "custom", color: "var(--fk-text-secondary)" })}
          />
        )}
        {notify && <Counter size="xs" />}
      </span>
    </button>
  );
};

const counterSize: Record<TabsButtonSize, CounterSM> = {
  s: "s",
  m: "m",
  l: "m",
};

const tabLabel: Record<
  TabsButtonSize,
  ReturnType<typeof createTypographyComponent>
> = {
  s: createTypographyComponent(Typography.Paragraph, "P4 SEMIBOLD"),
  m: createTypographyComponent(Typography.Paragraph, "P3 SEMIBOLD"),
  l: createTypographyComponent(Typography.Header, "H4 BOLD"),
};
