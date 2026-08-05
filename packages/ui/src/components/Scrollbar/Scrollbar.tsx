import { forwardRef } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./scrollbar.less";
import { IScrollbarProps } from "./scrollbar.types";

export const Scrollbar = forwardRef<HTMLDivElement, IScrollbarProps>(
  ({ axis = "auto", className, children, ...rest }, ref) => {
    const scrollbarClassName = classNames(
      component("scrollbar")({
        [`axis-${axis}`]: axis !== "auto",
      }),
      className,
    );

    return (
      <div ref={ref} className={scrollbarClassName} {...rest}>
        {children}
      </div>
    );
  },
);

Scrollbar.displayName = "Scrollbar";
