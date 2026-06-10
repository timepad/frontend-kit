import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./scrollbar.less";
import { IScrollbarProps } from "./scrollbar.types";

export const Scrollbar: FC<IScrollbarProps> = ({
  flow,
  className,
  children,
  ...rest
}) => {
  const scrollbarClassName = classNames(
    component("scrollbar")({ [`flow-${flow}`]: !!flow }),
    className,
  );

  return (
    <div className={scrollbarClassName} {...rest}>
      {children}
    </div>
  );
};
