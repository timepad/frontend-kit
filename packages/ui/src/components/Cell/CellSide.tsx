import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { ICellBaseProps } from "./cell.types";

type CellSideProps = ICellBaseProps & {
  side: "left" | "right";
};

export const CellSide: FC<CellSideProps> = ({
  side,
  className,
  children,
  ...rest
}) => {
  const sideClassName = classNames(component("cell", side)(), className);

  return (
    <div className={sideClassName} {...rest}>
      {children}
    </div>
  );
};
