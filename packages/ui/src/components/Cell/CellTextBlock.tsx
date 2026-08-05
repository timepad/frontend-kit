import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { ICellBaseProps } from "./cell.types";
import { CellLabel } from "./CellLabel";
import { CellCaption } from "./CellCaption";

export const CellTextBlock: FC<ICellBaseProps> = ({
  className,
  children,
  ...rest
}) => {
  const textClassName = classNames(component("cell", "text")(), className);

  return (
    <div className={textClassName} {...rest}>
      {children}
    </div>
  );
};

export const CellText = Object.assign(CellTextBlock, {
  Label: CellLabel,
  Caption: CellCaption,
});