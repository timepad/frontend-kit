import { type CSSProperties, type FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./cell.less";
import { ICellBaseProps, ICellProps } from "./cell.types";
import { CellSide } from "./CellSide";
import { CellContent } from "./CellContent";

const CellComponent: FC<ICellProps> = ({
  className,
  horizontalPadding = 0,
  verticalPadding = 0,
  align = "center",
  backgroundColor,
  withSeparator = false,
  style,
  children,
  ...rest
}) => {
  const cellClassName = classNames(
    component("cell")({
      [`padding-${horizontalPadding}`]: true,
      [`padding-vertical-${verticalPadding}`]: true,
      [`align-${align}`]: true,
    }),
    className,
  );

  const fillStyle = backgroundColor
    ? ({ "--cell-bg-color": backgroundColor } as CSSProperties)
    : undefined;

  const bodyClassName = component("cell", "body")({
    "with-separator": withSeparator,
  });

  return (
    <div className={cellClassName} style={{ ...fillStyle, ...style }} {...rest}>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
};

export const Cell = Object.assign(CellComponent, {
  Left: (props: ICellBaseProps) => <CellSide side="left" {...props} />,
  Content: CellContent,
});
