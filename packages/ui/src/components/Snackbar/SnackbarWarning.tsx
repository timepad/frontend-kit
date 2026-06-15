import { FC } from "react";

import { SnackbarBase } from "./Snackbar";
import { IconWarningCircle24Fill } from "../../assets/icons";
import { ISnackbarVariantProps } from "./snackbar.types";

export const SnackbarWarning: FC<ISnackbarVariantProps> = ({
  children,
  ...props
}) => {
  return (
    <SnackbarBase
      variant="warning"
      icon={<IconWarningCircle24Fill />}
      {...props}
    >
      {children}
    </SnackbarBase>
  );
};
