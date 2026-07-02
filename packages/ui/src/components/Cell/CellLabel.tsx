import { FC, PropsWithChildren } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { Typography } from "../Typography";
import { ICellLabelProps } from "./cell.types";

export const CellLabel: FC<PropsWithChildren<ICellLabelProps>> = ({
  bold = true,
  className,
  children,
  ...rest
}) => {
  const labelClassName = classNames(component("cell", "label")(), className);

  return (
    <Typography.Paragraph
      tag={bold ? "P4 BOLD" : "P4 REGULAR"}
      className={labelClassName}
      {...rest}
    >
      {children}
    </Typography.Paragraph>
  );
};
