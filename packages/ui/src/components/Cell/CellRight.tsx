import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { ICellBaseProps } from "./cell.types";

export const CellRight: FC<ICellBaseProps> = ({
  className,
  children,
  ...rest
}) => {
  const rightClassName = classNames(component("cell", "right")(), className);

  return (
    <div className={rightClassName} {...rest}>
      {children}
    </div>
  );
};
