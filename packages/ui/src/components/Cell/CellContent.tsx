import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { ICellContentProps } from "./cell.types";
import { CellText } from "./CellText";
import { CellCaption } from "./CellCaption";

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
  const textStackClassName = component("cell", "text-stack")();

  return (
    <div className={contentClassName} {...rest}>
      <div className={textStackClassName}>{children}</div>
    </div>
  );
};

export const CellContent = Object.assign(CellContentComponent, {
  Text: CellText,
  Caption: CellCaption,
});
