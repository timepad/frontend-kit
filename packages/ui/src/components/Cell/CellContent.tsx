import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { ICellBaseProps } from "./cell.types";
import { CellRight } from "./CellRight";
import { CellText } from "./CellTextBlock";

const CellContentComponent: FC<ICellBaseProps> = ({
  className,
  children,
  ...rest
}) => {
  const contentClassName = classNames(component("cell", "content")(), className);

  return (
    <div className={contentClassName} {...rest}>
      {children}
    </div>
  );
};

export const CellContent = Object.assign(CellContentComponent, {
  Text: CellText,
  Right: CellRight,
});
