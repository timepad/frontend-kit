import { createElement, forwardRef } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./scrollbar.less";
import { IScrollbarProps } from "./scrollbar.types";

export const Scrollbar = forwardRef<HTMLElement, IScrollbarProps>(
  ({ as = "div", axis = "auto", className, children, ...rest }, ref) => {
    const scrollbarClassName = classNames(
      component("scrollbar")({
        [`axis-${axis}`]: axis !== "auto",
      }),
      className,
    );

    return createElement(
      as,
      { ref, className: scrollbarClassName, ...rest },
      children,
    );
  },
);

Scrollbar.displayName = "Scrollbar";
