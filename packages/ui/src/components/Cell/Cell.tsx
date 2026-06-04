import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type FC,
  type ReactElement,
  type ReactNode,
} from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./cell.less";
import { ICellContentProps, ICellProps } from "./cell.types";
import { CellLeft } from "./CellLeft";
import { CellContent } from "./CellContent";
import { CellRight } from "./CellRight";

const renderBodyChildren = (children: ReactNode) => {
  let showSeparator = false;
  const bodyChildren: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === CellContent) {
      const { separator } = child.props as ICellContentProps;

      if (separator) {
        showSeparator = true;
      }

      bodyChildren.push(
        cloneElement(child as ReactElement<ICellContentProps>, { separator: false }),
      );
      return;
    }

    bodyChildren.push(child);
  });

  if (showSeparator) {
    bodyChildren.push(
      <div key="cell-separator" className={component("cell", "separator")()} />,
    );
  }

  return bodyChildren;
};

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
      <div className={bodyClassName}>{renderBodyChildren(children)}</div>
    </div>
  );
};

export const Cell = Object.assign(CellComponent, {
  Left: CellLeft,
  Content: CellContent,
  Right: CellRight,
});
