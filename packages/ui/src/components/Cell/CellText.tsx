import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { Typography } from "../Typography";
import { ICellTextProps } from "./cell.types";

export const CellText: FC<ICellTextProps> = ({
  bold = true,
  className,
  children,
  ...rest
}) => {
  const textClassName = classNames(component("cell", "text")(), className);

  return (
    <Typography.Paragraph
      tag={bold ? "P4 BOLD" : "P4 REGULAR"}
      className={textClassName}
      {...rest}
    >
      {children}
    </Typography.Paragraph>
  );
};
