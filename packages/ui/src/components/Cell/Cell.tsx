import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./cell.less";
import { ICellProps } from "./cell.types";
import { CellLeft } from "./CellLeft";
import { CellContent } from "./CellContent";
import { CellText } from "./CellText";
import { CellCaption } from "./CellCaption";
import { CellRight } from "./CellRight";

const CellComponent: FC<ICellProps> = ({
  className,
  horizontalPadding = 0,
  align = "center",
  children,
  ...rest
}) => {
  const cellClassName = classNames(
    component("cell")({
      [`padding-${horizontalPadding}`]: true,
      [`align-${align}`]: true,
    }),
    className,
  );

  return (
    <div className={cellClassName} {...rest}>
      {children}
    </div>
  );
};

export const Cell = Object.assign(CellComponent, {
  Left: CellLeft,
  Content: CellContent,
  Text: CellText,
  Caption: CellCaption,
  Right: CellRight,
});
