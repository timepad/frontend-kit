import { FC } from "react";

import { SnackbarBase } from "./Snackbar";
import { ISnackbarCustomProps } from "./snackbar.types";

export const SnackbarCustom: FC<ISnackbarCustomProps> = ({
  icon,
  children,
  ...props
}) => {
  return (
    <SnackbarBase variant="custom" icon={icon} {...props}>
      {children}
    </SnackbarBase>
  );
};
