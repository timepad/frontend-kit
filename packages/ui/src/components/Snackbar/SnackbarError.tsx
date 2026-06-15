import { FC } from "react";

import { SnackbarBase } from "./Snackbar";
import { IconCrossCircle24Fill } from "../../assets/icons";
import { ISnackbarVariantProps } from "./snackbar.types";

export const SnackbarError: FC<ISnackbarVariantProps> = ({
  children,
  ...props
}) => {
  return (
    <SnackbarBase variant="error" icon={<IconCrossCircle24Fill />} {...props}>
      {children}
    </SnackbarBase>
  );
};
