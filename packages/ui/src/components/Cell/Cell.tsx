import { type CSSProperties, type FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./cell.less";
import { ICellProps } from "./cell.types";
import { CellLeft } from "./CellLeft";
import { CellContent } from "./CellContent";

const CellComponent: FC<ICellProps> = ({
  className,
  horizontalPadding = 0,
  align = "center",
  backgroundColor,
  style,
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

  const fillStyle = backgroundColor
    ? ({ "--cell-bg-color": backgroundColor } as CSSProperties)
    : undefined;

  const bodyClassName = component("cell", "body")();

  return (
    <div className={cellClassName} style={{ ...fillStyle, ...style }} {...rest}>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
};

export const Cell = Object.assign(CellComponent, {
  Left: CellLeft,
  Content: CellContent,
});
