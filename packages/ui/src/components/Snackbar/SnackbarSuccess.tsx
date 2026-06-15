import { FC } from "react";

import { SnackbarBase } from "./Snackbar";
import { IconCheckCircle24Fill } from "../../assets/icons";
import { ISnackbarVariantProps } from "./snackbar.types";

export const SnackbarSuccess: FC<ISnackbarVariantProps> = ({
  children,
  ...props
}) => {
  return (
    <SnackbarBase
      variant="success"
      icon={<IconCheckCircle24Fill />}
      {...props}
    >
      {children}
    </SnackbarBase>
  );
};
