import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { Typography } from "../Typography";
import { ICellBaseProps } from "./cell.types";

export const CellCaption: FC<ICellBaseProps> = ({
  className,
  children,
  ...rest
}) => {
  const captionClassName = classNames(
    component("cell", "caption")(),
    className,
  );

  return (
    <Typography.Caption tag="C1 REGULAR" className={captionClassName} {...rest}>
      {children}
    </Typography.Caption>
  );
};
