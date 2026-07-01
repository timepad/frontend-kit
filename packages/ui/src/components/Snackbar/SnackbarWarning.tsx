import { FC } from "react";

import { SnackbarBase } from "./Snackbar";
import { IconWarningCircle24Fill } from "../../assets/icons";
import { ISnackbarBaseProps, ISnackbarVariantProps } from "./snackbar.types";

export const SnackbarWarning: FC<ISnackbarVariantProps> = ({ children, ...props }) => {
  return (
    <SnackbarBase
      {...({
        ...props,
        children,
        variant: "warning",
        icon: <IconWarningCircle24Fill />,
      } as ISnackbarBaseProps)}
    />
  );
};
