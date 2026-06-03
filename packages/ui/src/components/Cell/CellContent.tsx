import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { ICellContentProps } from "./cell.types";

export const CellContent: FC<ICellContentProps> = ({
  className,
  children,
  separator = false,
  ...rest
}) => {

  const contentClassName = classNames(
    component("cell", "content")({ separator }),
    className,
  );
  const textStackClassName = component("cell", "text-stack")();

  return (
    <div className={contentClassName} {...rest}>
      <div className={textStackClassName}>{children}</div>
      {separator && <div className={component("cell", "separator")()} />}
    </div>
  );
};
