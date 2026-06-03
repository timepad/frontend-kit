import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { ICellBaseProps } from "./cell.types";

export const CellLeft: FC<ICellBaseProps> = ({
  className,
  children,
  ...rest
}) => {
  const leftClassName = classNames(component("cell", "left")(), className);

  return (
    <div className={leftClassName} {...rest}>
      {children}
    </div>
  );
};
