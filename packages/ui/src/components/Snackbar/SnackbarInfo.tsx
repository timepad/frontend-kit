import { FC } from "react";

import { SnackbarBase } from "./Snackbar";
import { IconInfoHexagon24Fill } from "../../assets/icons";
import { ISnackbarVariantProps } from "./snackbar.types";

export const SnackbarInfo: FC<ISnackbarVariantProps> = ({
  children,
  ...props
}) => {
  return (
    <SnackbarBase variant="info" icon={<IconInfoHexagon24Fill />} {...props}>
      {children}
    </SnackbarBase>
  );
};
