import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { ICellContentProps } from "./cell.types";
import { CellRight } from "./CellRight";
import { CellText } from "./CellTextBlock";

const CellContentComponent: FC<ICellContentProps> = ({
  className,
  children,
  separator = false,
  ...rest
}) => {
  const contentClassName = classNames(
    component("cell", "content")({ separator }),
    className,
  );

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
