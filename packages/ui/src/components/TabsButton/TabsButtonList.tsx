import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { ITabsButtonListProps } from "./tabs-button.types";
import { useTabsButtonContext } from "./tabsButtonContext";

export const TabsButtonList: FC<PropsWithChildren<ITabsButtonListProps>> = ({
  className,
  overflow = "scroll",
  children,
  ...rest
}) => {
  const { activeTabId, size } = useTabsButtonContext();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overflow !== "scroll") return;

    const list = listRef.current;
    if (!list) return;

    const selectedTab = list.querySelector<HTMLElement>(
      '[role="tab"][aria-selected="true"]',
    );
    if (!selectedTab) return;

    scrollTabFullyIntoView(list, selectedTab);
  }, [overflow, activeTabId]);

  const listClassName = classNames(
    component(
      "tabs-button",
      "list",
    )({ [`overflow-${overflow}`]: true, [`size-${size}`]: true }),
    className,
  );

  return (
    <div {...rest} ref={listRef} role="tablist" className={listClassName}>
      {children}
    </div>
  );
};

const scrollTabFullyIntoView = (list: HTMLElement, tab: HTMLElement) => {
  const listRect = list.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();

  if (tabRect.left >= listRect.left && tabRect.right <= listRect.right) {
    return;
  }

  const offset =
    tabRect.left < listRect.left
      ? tabRect.left - listRect.left
      : tabRect.right - listRect.right;

  list.scrollTo({
    left: list.scrollLeft + offset,
    behavior: "smooth",
  });
};
