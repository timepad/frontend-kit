import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./divider.less";
import { IDividerProps } from "./divider.types";

export const Divider: FC<IDividerProps> = ({
  flow = "horizontal",
  className,
  ...rest
}) => {
  const dividerClassName = classNames(
    component("divider")({ [`flow-${flow}`]: true }),
    className,
  );

  return (
    <div
      className={dividerClassName}
      role="separator"
      aria-orientation={flow}
      {...rest}
    />
  );
};
